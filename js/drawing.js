const canvas = document.getElementById('drawCanvas');
const ctx = canvas.getContext('2d');
let drawing = false;
let brushColor = '#000000';
let brushSize = 5;
let tool = 'pencil';

// ===== Resize Canvas Responsively =====
function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// ===== Start & Stop Drawing =====
function startDraw(e) {
  drawing = true;
  draw(e);
}
function stopDraw() {
  drawing = false;
  ctx.beginPath();
}

// ===== Main Draw Function =====
function draw(e) {
  if (!drawing) return;

  const rect = canvas.getBoundingClientRect();
  let x, y;

  if (e.touches) {
    // Touch input
    x = e.touches[0].clientX - rect.left;
    y = e.touches[0].clientY - rect.top;
  } else {
    // Mouse input
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;
  }

  ctx.lineWidth = brushSize;
  ctx.lineCap = 'round';
  ctx.strokeStyle = (tool === 'eraser') ? '#ffffff' : brushColor;
  ctx.globalAlpha = (tool === 'pencil') ? 0.8 : 1;

  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);
}

// ===== Mouse + Touch Events =====
canvas.addEventListener('mousedown', startDraw);
canvas.addEventListener('mouseup', stopDraw);
canvas.addEventListener('mouseout', stopDraw);
canvas.addEventListener('mousemove', draw);

canvas.addEventListener('touchstart', startDraw);
canvas.addEventListener('touchend', stopDraw);
canvas.addEventListener('touchcancel', stopDraw);
canvas.addEventListener('touchmove', draw);

// ===== Tools =====
document.getElementById('pencilBtn').addEventListener('click', () => tool = 'pencil');
document.getElementById('brushBtn').addEventListener('click', () => tool = 'brush');
document.getElementById('eraserBtn').addEventListener('click', () => tool = 'eraser');

// ===== Color Picker =====
document.getElementById('colorPicker').addEventListener('input', (e) => {
  brushColor = e.target.value;
});

// ===== Brush Size =====
document.getElementById('brushSize').addEventListener('input', (e) => {
  brushSize = e.target.value;
});

// ===== Clear Canvas =====
document.getElementById('clearBtn').addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// ===== Save Drawing =====
document.getElementById('saveBtn').addEventListener('click', () => {
  const image = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = image;
  link.download = 'my_drawing.png';
  link.click();
});
