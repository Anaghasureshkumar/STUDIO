// ===== Featured Artworks =====
const artworks = [
  { title: "Sunrise Echo", artist: "Anita Rao", image: "images/art1.jpg" },
  { title: "Dream Forest", artist: "Ravi Menon", image: "images/art2.jpg" },
  { title: "Blue Horizon", artist: "Leena Das", image: "images/art3.jpg" },
  { title: "A Village", artist: "Anagha", image: "images/img5.jpg" },
  { title: "Sea and Sun", artist: "Safna", image: "images/art5.jpg" },
  { title: "Doodles", artist: "Riju Raj", image: "images/art6.jpg" },
  { title: "Dreams Tree", artist: "Aswin", image: "images/art4.jpg" }
];

const gallery = document.getElementById("artGallery");
artworks.forEach((art) => {
  const col = document.createElement("div");
  col.className = "col-md-3";
  col.innerHTML = `
    <div class="card shadow-sm">
      <img src="${art.image}" class="card-img-top" alt="${art.title}">
      <div class="card-body">
        <h5 class="card-title">${art.title}</h5>
        <p class="card-text text-muted">By ${art.artist}</p>
      </div>
    </div>`;
  gallery.appendChild(col);
});

// ===== Countdown =====
const targetDate = new Date("2025-12-25T00:00:00").getTime();
const countdown = document.getElementById('countdown');
setInterval(() => {
  const now = new Date().getTime();
  const distance = targetDate - now;
  if (distance < 0) {
    countdown.innerHTML = "🎉 Exhibition Live!";
    return;
  }
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  countdown.innerHTML = `${days} Days ${hours} Hrs ${mins} Min`;
}, 1000);

// ===== Subscribe Modal Auto Show =====
window.addEventListener("load", () => {
  setTimeout(() => {
    const modal = new bootstrap.Modal(document.getElementById("subscribeModal"));
    modal.show();
  }, 3000);
});

document.getElementById("subscribeForm").addEventListener("submit", (e) => {
  e.preventDefault();
  document.getElementById("subscribeMsg").style.display = "block";
  setTimeout(() => {
    const modal = bootstrap.Modal.getInstance(document.getElementById("subscribeModal"));
    modal.hide();
    document.getElementById("subscribeMsg").style.display = "none";
  }, 1500);
});
