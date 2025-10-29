const canvas = document.getElementById('drawCanvas');
const ctx = canvas.getContext('2d');
let drawing = false;
let brushColor = '#000000';
let brushSize = 5;
let tool = 'pencil';

// ===== Drawing Functions =====
canvas.addEventListener('mousedown', () => drawing = true);
canvas.addEventListener('mouseup', () => {
  drawing = false;
  ctx.beginPath();
});
canvas.addEventListener('mousemove', draw);

function draw(e) {
  if (!drawing) return;

  ctx.lineWidth = brushSize;
  ctx.lineCap = 'round';

  if (tool === 'eraser') {
    ctx.strokeStyle = '#ffffff';
  } else {
    ctx.strokeStyle = brushColor;
  }

  if (tool === 'pencil') ctx.globalAlpha = 0.8;
  else ctx.globalAlpha = 1;

  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
}

// ===== Tool Buttons =====
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
