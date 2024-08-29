const toolbar = document.getElementById("toolbar");
const propreties = document.getElementById("properties");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const lists = document.querySelectorAll(".shape");
const modeDrawer = document.querySelectorAll(".mode");

const offsetX1 = canvas.offsetLeft;
const offsetX2 = window.innerWidth - propreties.offsetLeft;

const offsetY = canvas.offsetTop;

canvas.width = window.innerWidth - offsetX1 - offsetX2;
canvas.height = window.innerHeight - offsetY;
let isDrawing = false;
let startX, startY;

let shapes = [];

//all eventListener in the canvas
canvas.addEventListener("mousedown", handleMouseDown);
canvas.addEventListener("mousemove", handleMouseMove);
canvas.addEventListener("mouseup", handleMouseUp);
canvas.addEventListener("click", handleCanvasClick);


//the eventListener when he press down the mouse
function handleMouseDown(e) {
  //verify if the mode is drawing before 
  if (mode == "drawing") {
    isDrawing = true;
    startX = e.offsetX;
    startY = e.offsetY;
  } else {
    isDrawing = false;
  }
}

function handleMouseMove(e) {
  if (isDrawing && mode=="drawing") {
    const currentX = e.offsetX;
    const currentY = e.offsetY;

    // Clear canvas before drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Redraw existing shapes
    redrawShapes();

    // Draw the current shape
    ctx.strokeRect(startX, startY, currentX - startX, currentY - startY);
  }
}

function handleMouseUp(e) {
  // verify if the mouse has moved before finalizing the shape
  if (isDrawing && startX != e.offsetX && startY != e.offsetY) {
    const endX = e.offsetX;
    const endY = e.offsetY;

    // Add the finalized shape to the shapes array
    shapes.push({
      x: startX,
      y: startY,
      width: endX - startX,
      height: endY - startY,
    });
  }

  // Stop drawing
  isDrawing = false;
}




// function handleCanvasClick(e){
//    console.log(shapes)

//   shapes.forEach((shape) => {
//     if (
//       e.offsetX > shape.x &&
//       e.offsetX < shape.x + shape.width &&
//       e.offsetY > shape.y &&
//       e.offsetY < shape.y + shape.height
//     ) {
//       // Select the shape
//       selectedShape = shape;
//     //   ctx.clearRect(shape.x, shape.y, shape.width, shape.height);
//     //   ctx.strokeStyle = "red";
//     //   ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
//     } else {
//       ctx.clearRect(shape.x, shape.y, shape.width, shape.height);
//       ctx.strokeStyle = "black";
//       ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
//     }
//   });
// }


// Function to redraw all shapes on the canvas
function redrawShapes() {
  shapes.forEach((shape) => {
    ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
  });
}



















// Event listener for mouse down - start drawing
canvas.addEventListener("mousedown", (e) => {
  // isDrawing = true;
  if (mode == "drawing") {
    isDrawing = true;
    startX = e.offsetX;
    startY = e.offsetY;
  } else {
    isDrawing = false;
  }
});

// Event listener for mouse move - update shape as mouse moves
canvas.addEventListener("mousemove", (e) => {
  if (isDrawing) {
    const currentX = e.offsetX;
    const currentY = e.offsetY;

    // Clear canvas before drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Redraw existing shapes
    redrawShapes();

    // Draw the current shape
    ctx.strokeRect(startX, startY, currentX - startX, currentY - startY);
  }
});

// Event listener for mouse up - finalize shape
canvas.addEventListener("mouseup", (e) => {
  // verify if the mouse has moved before finalizing the shape
  if (isDrawing && startX != e.offsetX && startY != e.offsetY) {
    const endX = e.offsetX;
    const endY = e.offsetY;

    // Add the finalized shape to the shapes array
    shapes.push({
      x: startX,
      y: startY,
      width: endX - startX,
      height: endY - startY,
    });
  }

  // Stop drawing
  isDrawing = false;
});

// Function to redraw all shapes on the canvas
function redrawShapes() {
  shapes.forEach((shape) => {
    ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
  });
}

// Identify the selected shapes

// let isMoving = false;

let moveStartX, moveStartY, selectedShape;

canvas.addEventListener("click", (e) => {

  console.log(shapes)

  shapes.forEach((shape) => {
    if (
      e.offsetX > shape.x &&
      e.offsetX < shape.x + shape.width &&
      e.offsetY > shape.y &&
      e.offsetY < shape.y + shape.height
    ) {
      // Select the shape
      selectedShape = shape;
    //   ctx.clearRect(shape.x, shape.y, shape.width, shape.height);
    //   ctx.strokeStyle = "red";
    //   ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
    } else {
      ctx.clearRect(shape.x, shape.y, shape.width, shape.height);
      ctx.strokeStyle = "black";
      ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
    }
  });
});

// Add event listeners once
if(!isDrawing){
    canvas.addEventListener("mousedown", (e) => {
        if (selectedShape) {
          moveStartX = e.offsetX;
          moveStartY = e.offsetY;
          console.log(moveStartX, moveStartY)
          // Set the cursor to move
          canvas.style.cursor = "move";
        }
      });
      
      canvas.addEventListener("mouseup", (e) => {
        if (selectedShape) {
            const moveEndx= e.offsetX;
            const moveEndy= e.offsetY;
            // console.log(moveEndx, moveEndy)
            console.log(moveStartX, moveStartY)
            // console.log(selectedShape.x, selectedShape.y)
            selectedShape.x += moveEndx - moveStartX;
            selectedShape.y += moveEndy - moveStartY;
            // console.log(selectedShape.x, selectedShape.y)
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const index = shapes.indexOf(selectedShape);
            // console.log(shapes[index])
            shapes[index] = selectedShape;
            // console.log(shapes[index])
            redrawShapes();
            ctx.strokeStyle = "black";  
            ctx.strokeRect(selectedShape.x, selectedShape.y, selectedShape.width, selectedShape.height);

          canvas.style.cursor = "default";
          
          selectedShape = null; // Reset the selected shape
        }
      });
      
      canvas.addEventListener("mousemove", (e) => {
        if (selectedShape) {
          canvas.style.cursor = "move";
      
          const currentX = e.offsetX - moveStartX;
          const currentY = e.offsetY - moveStartY;
      
          // Clear canvas before drawing
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        
          
        //   shapes[index]
      
          // Redraw existing shapes
          shapes.forEach(shape => {
            if (shape !== selectedShape) {
              ctx.strokeStyle = "black";
              ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
            }
          });

      
          // Move and redraw the selected shape
          ctx.strokeStyle = "red";
          ctx.strokeRect(
            selectedShape.x + currentX,
            selectedShape.y + currentY,
            selectedShape.width,
            selectedShape.height
          );
        }
      
      });
      
}

// get the selected mode
let mode;
modeDrawer.forEach((li) => {
  li.addEventListener("click", () => {
    modeDrawer.forEach((item) => (item.style.color = ""));
    li.style.color = "red";
    mode = li.textContent.toLowerCase();

    // console.log(shape)
  });
});
