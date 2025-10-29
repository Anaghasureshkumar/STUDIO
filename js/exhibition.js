document.addEventListener("DOMContentLoaded", () => {
  const galleryRow = document.querySelector(".gallery-section .row");

  // Randomly shuffle gallery images every 2 seconds
  function shuffleElements(container) {
    const cards = Array.from(container.children);
    const shuffled = cards.sort(() => Math.random() - 0.5);
    container.innerHTML = "";
    shuffled.forEach(card => container.appendChild(card));
  }
  setInterval(() => shuffleElements(galleryRow), 2000);

  // === Falling Icons Animation ===
  const icons = ["🖌️", "✏️", "🎨", "🖍️", "🖋️"];
  const container = document.querySelector(".falling-icons");

  function createFallingIcon() {
    const icon = document.createElement("span");
    icon.classList.add("falling-icon");
    icon.textContent = icons[Math.floor(Math.random() * icons.length)];
    icon.style.left = Math.random() * 100 + "vw";
    icon.style.fontSize = Math.random() * 20 + 20 + "px";
    icon.style.animationDuration = Math.random() * 3 + 4 + "s";
    container.appendChild(icon);
    setTimeout(() => icon.remove(), 7000);
  }

  setInterval(createFallingIcon, 400);
});
