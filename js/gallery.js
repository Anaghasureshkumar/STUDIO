const artworks = [
  { title: 'Village', artist: 'Anita Rao', category: 'Painting', image: 'images/img1.jpg', description: 'Acrylic on canvas, 24x18 inch' },
  { title: 'Forest Sketch', artist: 'Ravi Menon', category: 'Drawing', image: 'images/img2.jpg', description: 'Graphite on paper, 12x18 inch' },
  { title: 'Ocean Sculpture', artist: 'Divya Nair', category: 'Sculpture', image: 'images/img3.jpg', description: 'Clay sculpture, 10-inch tall' },
  { title: 'Digital Dreams', artist: 'Kiran Das', category: 'Digital', image: 'images/img4.jpg', description: 'Digital painting, 4K resolution' },
  { title: 'Abstract Colors', artist: 'Leena Das', category: 'Drawing', image: 'images/img5.jpg', description: 'Pencil drawing, 36x24 inch' },
  { title: 'Clay Vase', artist: 'Maya Balan', category: 'Other', image: 'images/img6.jpg', description: 'Pen drawings' },
  { title: 'Sunrise Echo', artist: 'Anital', category: 'Painting', image: 'images/art1.jpg', description: 'Oil Painting, 24x18 inch' },
  { title: 'Dream Forest', artist: 'Ravi Menon', category: 'Painting', image: 'images/art2.jpg', description: 'Water Painting, 24x18 inch' },
  { title: 'Blue Horizon', artist: 'Leena Das', category: 'Digital', image: 'images/art3.jpg', description: 'Digital painting, 4K resolution' },
  { title: 'Dream Girl', artist: 'Anagha', category: 'Painting', image: 'images/slide5.jpg', description: 'Acrylic on canvas, 24x18 inch' },
  { title: 'The Sea and Sky', artist: 'Safna', category: 'Painting', image: 'images/art5.jpg', description: 'Acrylic on canvas, 24x18 inch' },
  { title: 'Doddle', artist: 'Riju Raj', category: 'Other', image: 'images/art6.jpg', description: 'Pen drawings' },
  { title: 'Blue Tree', artist: 'Aswin', category: 'Painting', image: 'images/art4.jpg', description: 'Oil painting, 36x24 inch' }
];

const galleryGrid = document.getElementById('galleryGrid');

function displayArtworks(list) {
  galleryGrid.innerHTML = '';
  list.forEach((art, index) => {
    galleryGrid.innerHTML += `
      <div class="col-md-4 mb-4 gallery-item" data-category="${art.category}" data-artist="${art.artist}">
        <div class="card art-card shadow-sm text-center">
          <img src="${art.image}" class="card-img-top" alt="${art.title}">
          <div class="card-body">
            <h5 class="card-title">${art.title}</h5>
            <p class="text-muted">${art.artist}</p>
            <button class="btn btn-outline-warning btn-sm" data-bs-toggle="modal" data-bs-target="#artModal${index}">View Details</button>
          </div>
        </div>
      </div>

      <div class="modal fade" id="artModal${index}" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content bg-dark text-light">
            <div class="modal-body text-center">
              <img src="${art.image}" class="img-fluid mb-3 rounded">
              <h4>${art.title}</h4>
              <p class="text-muted">${art.artist}</p>
              <p>${art.description}</p>
            </div>
          </div>
        </div>
      </div>
    `;
  });
}

displayArtworks(artworks);

let currentCategory = 'all';

function filterCategory(category) {
  currentCategory = category;
  applyFilters();

  document.querySelectorAll('.filter-btns .btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
}

function applyFilters() {
  const selected = document.getElementById('combinedFilter').value;
  document.querySelectorAll('.gallery-item').forEach(item => {
    const artistName = item.dataset.artist;
    const itemCategory = item.dataset.category;
    let show = true;

    if (currentCategory !== 'all' && itemCategory !== currentCategory) show = false;
    if (selected !== 'all' && artistName !== selected) show = false;

    item.style.display = show ? 'block' : 'none';
  });
}

document.getElementById('combinedFilter').addEventListener('change', applyFilters);
