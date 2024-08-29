const toolbar = document.getElementById("toolbar");
const propreties = document.getElementById("properties");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const lists = document.querySelectorAll(".option");
const modeDrawer = document.querySelectorAll(".mode");

// to know what type of shape will be draw
let shapeToDraw = ''

// to know if we have to draw or not
let isDrawing = false;

// to know the start position of the shape
let startX, startY;

//all shape we have
let shapes = [];

// the shape selected by the user
let selectedShape = null;



//set canvas width and height
canvas.width =  propreties.offsetLeft - canvas.offsetLeft;
canvas.height = window.innerHeight - canvas.offsetTop;


//all eventListener in the canvas
canvas.addEventListener("mousedown", handleMouseDown);
canvas.addEventListener("mousemove", handleMouseMove);
canvas.addEventListener("mouseup", handleMouseUp);
// canvas.addEventListener("click", handleCanvasClick);


// To get the shape to draw
lists.forEach((list)=>{
  list.addEventListener('click', (e)=>{
    shapeToDraw = list.textContent.toLocaleLowerCase();
  })
})


// to get the coordinate of the mouse when we click on the canvas
// only when we want to shape
function handleMouseDown(e) {
  //verify if the mode is drawing before 
  if (shapeToDraw == 'rectangle' || shapeToDraw == 'circle' || shapeToDraw == 'line' || shapeToDraw == 'polygon' ) {
    isDrawing = true;
    startX = e.offsetX;
    startY = e.offsetY;
  } else {
    isDrawing = false;
    toGetSelectedShape(e)
  }
}


// to get where the mouse is moving on to make the animation smoth
function handleMouseMove(e) {
  if (isDrawing) {
    const currentX = e.offsetX;
    const currentY = e.offsetY;

    // Clear canvas before drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Redraw existing shapes
    redrawShapes();

    // Draw the current shape
    drawShape(startX,startY,currentX, currentY);
    
  }
}


// when we finish moving or mouse we have the end of drawing and we can stop drawing the curent shape
function handleMouseUp(e) {
  // verify if the mouse has moved before finalizing the shape
  if (isDrawing && startX != e.offsetX && startY != e.offsetY) {
    const endX = e.offsetX;
    const endY = e.offsetY;

    // Add the finalized shape to the shapes array depending on the type
    if(shapeToDraw === 'rectangle'){
      shapes.push({
        x: startX,
        y: startY,
        width: endX - startX,
        height: endY - startY,
        type : shapeToDraw
      });
    }else if(shapeToDraw =='circle'){
      shapes.push({
        x: startX,
        y: startY,
        radius: Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)),
        type : shapeToDraw
      });
    }else if(shapeToDraw == 'line'){
      shapes.push({
        x1: startX,
        y1: startY,
        x2: endX,
        y2: endY,
        type : shapeToDraw
      });
    }else if(shapeToDraw == 'polygon'){
      shapes.push({
        x1: startX,
        y1: startY,
        x2: endX,
        y2: endY,
        type : shapeToDraw
      });
    }
   
  }

  // Stop drawing
  isDrawing = false;
}

//drawing the curent shape depending on what type we chose
function drawShape(beginX=startX, beginY=startY, currentX, currentY){
  if(shapeToDraw === 'rectangle'){
    ctx.strokeRect(beginX, beginY, currentX - beginX, currentY - beginY);
  }else if(shapeToDraw =='circle'){
    ctx.beginPath();
    ctx.arc(beginX, beginY, Math.sqrt(Math.pow(currentX - beginX, 2) + Math.pow(currentY - beginY, 2)), 0, 2 * Math.PI);
    ctx.stroke()
  }else if(shapeToDraw == 'line'){
    ctx.beginPath();
    ctx.moveTo(beginX, beginY);
    ctx.lineTo(currentX, currentY);
    ctx.stroke();
  }else if(shapeToDraw == 'polygon'){
    ctx.beginPath();
    ctx.moveTo(beginX, beginY);
    ctx.lineTo(currentX, currentY);
    ctx.lineTo(beginX * 2 - currentX, currentY);
    ctx.lineTo(beginX, beginY);
    ctx.closePath();
    ctx.stroke();
  }
}

// when a new shape is drawing we have to clear the canvas 
// this function is to redrawing each shapes we have previously
function redrawShapes() {
  shapes.forEach((shape) => {
    if(shape.type === 'rectangle'){
      ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
    }else if(shape.type === 'circle'){
      ctx.beginPath();
      ctx.arc(shape.x, shape.y, shape.radius, 0, 2 * Math.PI);
      ctx.stroke();
    }else if(shape.type === 'line'){
      ctx.beginPath();
      ctx.moveTo(shape.x1, shape.y1);
      ctx.lineTo(shape.x2, shape.y2);
      ctx.stroke();
    }else if(shape.type === 'polygon'){
      ctx.beginPath();
      ctx.moveTo(shape.x1, shape.y1);
      ctx.lineTo(shape.x2, shape.y2);
      ctx.lineTo(shape.x1 * 2 - shape.x2, shape.y2);
      ctx.lineTo(shape.x1, shape.y1);
      ctx.closePath();
      ctx.stroke();
    }
  });
}

function toGetSelectedShape(e){
  shapes.forEach((shape) => {
    if(shape.type === 'rectangle'){
      if (
        e.offsetX > shape.x &&
        e.offsetX < shape.x + shape.width &&
        e.offsetY > shape.y &&
        e.offsetY < shape.y + shape.height
      ){
        ctx.clearRect(shape.x, shape.y, shape.width, shape.height);
        ctx.strokeStyle = "red";
        ctx.strokeRect(shape.x, shape.y, shape.width, shape.height)
        selectedShape = shape;
      }
    }if(shape.type === 'circle'){
      if (
        Math.sqrt(Math.pow(e.offsetX - shape.x, 2) + Math.pow(e.offsetY - shape.y, 2)) <= shape.radius
      ){
        ctx.clearRect(shape.x, shape.y, shape.width, shape.height);
        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.arc(shape.x, shape.y, shape.radius, 0, 2 * Math.PI);
        ctx.stroke();
        selectedShape = shape;
      }
    }if(shape.type === 'line'){
      const dx = shape.x2 - shape.x1;
      const dy = shape.y2 - shape.y1;
      const length = Math.sqrt(dx * dx + dy * dy);
      const unitX = dx / length;
      const unitY = dy / length;
      const distance = Math.abs((e.offsetX - shape.x1) * unitY - (e.offsetY - shape.y1) * unitX);
      if (distance <= 2) {
        ctx.clearRect(shape.x, shape.y, shape.width, shape.height);
        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.moveTo(shape.x1, shape.y1);
        ctx.lineTo(shape.x2, shape.y2);
        ctx.stroke();
        selectedShape = shape;
      }
    }if(shape.type === 'polygon'){
      const dx1 = shape.x2 - shape.x1;
      const dy1 = shape.y2 - shape.y1;
      const length1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
      const unitX1 = dx1 / length1;
      const unitY1 = dy1 / length1;
      const distance1 = Math.abs((e.offsetX - shape.x1) * unitY1 - (e.offsetY - shape.y1) * unitX1);
      if (distance1 <= 2) {
        ctx.clearRect(shape.x, shape.y, shape.width, shape.height);
        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.moveTo(shape.x1, shape.y1);
        ctx.lineTo(shape.x2, shape.y2);
        ctx.lineTo(shape.x1 * 2 - shape.x2, shape.y2);
        ctx.lineTo(shape.x1, shape.y1);
        ctx.closePath();
        ctx.stroke();
        selectedShape = shape;
      }
    }



    else {
        ctx.clearRect(shape.x, shape.y, shape.width, shape.height);
        ctx.strokeStyle = "black";
        ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
        // selectedShape = null;
    }
  });
  console.log(selectedShape);
}