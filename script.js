const toolbar = document.getElementById('toolbar');
const propreties = document.getElementById('properties'); 
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const lists = document.querySelectorAll('.shape');


const offsetX1 = canvas.offsetLeft;
const offsetX2 = window.innerWidth - propreties.offsetLeft;

const offsetY = canvas.offsetTop;

canvas.width = window.innerWidth - offsetX1 - offsetX2 ;
canvas.height = window.innerHeight - offsetY;
let isDrawing = false;
let startX, startY;
let shape = "line"

console.log(lists)

lists.forEach((li) => {


        li.addEventListener('click', () => {
             lists.forEach(item => item.style.color = '');
            li.style.color = 'red'; 
            console.log(li.textContent.toLowerCase())
            shape = li.textContent.toLowerCase()
        });
    });

function draw(e) {
    if (!isDrawing) return;
    if (shape === "line") {
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(e.offsetX, e.offsetY);
        // ctx.stroke();
    }else{
        ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    }


    
}

propreties.addEventListener('change', (e) => {
    // console.log(e.target.id)
    if (e.target.id === 'color') {
        ctx.strokeStyle = e.target.value;
    }
    if (e.target.id === 'width') {
        ctx.lineWidth = e.target.value;
    }
});

canvas.addEventListener('mousedown', (e)=>{
    isDrawing = true;
    startX = e.offsetX;
    startY = e.offsetY;
})

canvas.addEventListener('mouseup', ()=>{
    isDrawing = false;
    ctx.stroke()
    ctx.beginPath();
})

canvas.addEventListener('mousemove',draw)

