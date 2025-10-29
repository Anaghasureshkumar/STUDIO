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

  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  ctx.lineWidth = brushSize;
  ctx.lineCap = 'round';

  ctx.strokeStyle = (tool === 'eraser') ? '#ffffff' : brushColor;
  ctx.globalAlpha = (tool === 'pencil') ? 0.8 : 1.0;

  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);
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
