let canvas = document.getElementById("canvas");

canvas.width = 0.98 * window.innerWidth;
canvas.height = window.innerHeight;

var io = io.connect("http://localhost:8080/");

let ctx = canvas.getContext("2d");

let x;
let y;
let mouseDown=false;
let dataChannel;

window.onmousedown=(e)=>{
    ctx.moveTo(x,y);
    if (dataChannel !== undefined) {
        dataChannel.send(JSON.stringify({ down: { x, y } }));
      } else {
        //console.log("not defined");
      }
    mouseDown=true;
}
window.onmouseup=(e)=>{
    mouseDown=false;
}

io.on("ondraw",({x,y})=>{
    ctx.lineTo(x,y);
    ctx.stroke();
})

io.on("ondown",({x, y})=>{
    ctx.moveTo(x,y);
})

window.onmousemove=(e)=>{
    x=e.clientX;
    y=e.clientY;
    if(mouseDown){
        dataChannel.send(JSON.stringify({ draw: { x, y } }));
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}
