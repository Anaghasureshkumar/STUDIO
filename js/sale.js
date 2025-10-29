// ===== ARTWORK DATA =====
const artworks = [
  { title: 'Sunrise Echo', artist: 'Anita Rao', price: 12000, category: 'Painting', image: 'images/img1.jpg', description: 'Acrylic on canvas, 24x18 inch' },
  { title: 'Forest Sketch', artist: 'Ravi Menon', price: 16000, category: 'Drawing', image: 'images/img2.jpg', description: 'Graphite on paper, 12x18 inch' },
  { title: 'Ocean Sculpture', artist: 'Divya Nair', price: 17000, category: 'Sculpture', image: 'images/img3.jpg', description: 'Clay sculpture, 10-inch tall' },
  { title: 'Digital Dreams', artist: 'Kiran Das', price: 5000, category: 'Digital', image: 'images/img4.jpg', description: 'Digital painting, 4K resolution' },
  { title: 'Abstract Colors', artist: 'Leena Das', price: 15000, category: 'Painting', image: 'images/img5.jpg', description: 'Oil painting, 36x24 inch' },
  { title: 'Anagha', artist: 'Anagha', price: 12000, category: 'Drawing', image: 'images/img6.jpg', description: 'Pencil Drawing, 24x18 inch' },
  { title: 'Safna', artist: 'Safna', price: 18000, category: 'Painting', image: 'images/art5.jpg', description: 'Acrylic on canvas, 24x18 inch' },
  { title: 'Aswin', artist: 'Aswin', price: 15000, category: 'Painting', image: 'images/art4.jpg', description: 'Oil painting, 36x24 inch' },
];

// ===== ELEMENTS =====
const gallery = document.getElementById('artGallery');
const searchInput = document.getElementById('artistSearch');
const priceFilter = document.getElementById('priceFilter');
const orderModal = new bootstrap.Modal(document.getElementById('orderModal'));
const orderTitle = document.getElementById('orderTitle');
const orderArtist = document.getElementById('orderArtist');
const orderPrice = document.getElementById('orderPrice');

// ===== FAVOURITE (LOCAL STORAGE) =====
let favourites = JSON.parse(localStorage.getItem('favourites')) || [];

// ===== RENDER FUNCTION =====
function renderGallery(items) {
  gallery.innerHTML = '';
  if (items.length === 0) {
    gallery.innerHTML = `<p class="text-center text-muted">No artworks found.</p>`;
    return;
  }

  items.forEach((art) => {
    const isFav = favourites.includes(art.title);
    const card = document.createElement('div');
    card.className = 'col-md-4 col-lg-3';
    card.innerHTML = `
      <div class="card h-100">
        <img src="${art.image}" class="card-img-top" alt="${art.title}">
        <div class="card-body">
          <h5 class="card-title">${art.title}</h5>
          <p class="text-muted mb-1">${art.artist}</p>
          <p class="price">₹${art.price.toLocaleString()}</p>
          <div class="d-flex justify-content-center align-items-center gap-3">
            <!-- 🛒 CART BUTTON -->
            <button class="btn btn-success btn-sm" onclick="bookArt('${art.title}','${art.artist}','₹${art.price}')">
              <i class="bi bi-cart-plus"></i>
            </button>
            <!-- ❤️ FAVOURITE -->
            <i class="bi ${isFav ? 'bi-heart-fill text-danger' : 'bi-heart'} fav-icon"
               onclick="toggleFavourite('${art.title}')" title="Add to Favourites"
               style="cursor:pointer;font-size:1.3rem;"></i>
            <!-- 📱 SHARE -->
            <a href="https://wa.me/?text=Check out this artwork: ${art.title} by ${art.artist} for ₹${art.price}! %0AFrom Anuzz ArtStudio"
               target="_blank" title="Share on WhatsApp">
              <i class="bi bi-whatsapp text-success" style="font-size:1.4rem;"></i>
            </a>
          </div>
        </div>
      </div>
    `;
    gallery.appendChild(card);
  });
}

// ===== TOGGLE FAVOURITE =====
function toggleFavourite(title) {
  if (favourites.includes(title)) {
    favourites = favourites.filter(fav => fav !== title);
  } else {
    favourites.push(title);
  }
  localStorage.setItem('favourites', JSON.stringify(favourites));
  renderGallery(filteredResults());
}

// ===== FILTER FUNCTION =====
function filteredResults() {
  const query = searchInput.value.toLowerCase();
  const priceOption = priceFilter.value;

  let minPrice = 0, maxPrice = Infinity;
  if (priceOption === 'below10000') {
    maxPrice = 10000;
  } else if (priceOption === '10000to15000') {
    minPrice = 10000;
    maxPrice = 15000;
  } else if (priceOption === 'above15000') {
    minPrice = 15000;
  }

  return artworks.filter(art =>
    (art.artist.toLowerCase().includes(query) || art.title.toLowerCase().includes(query)) &&
    art.price >= minPrice && art.price <= maxPrice
  );
}

// ===== LISTENERS =====
searchInput.addEventListener('input', () => renderGallery(filteredResults()));
priceFilter.addEventListener('change', () => renderGallery(filteredResults()));

// ===== BOOKING MODAL =====
function bookArt(title, artist, price) {
  orderTitle.value = title;
  orderArtist.value = artist;
  orderPrice.value = price;
  orderModal.show();
}

// ===== FORM SUBMIT =====
document.getElementById('orderForm').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('✅ Your booking has been placed successfully!');
  orderModal.hide();
  e.target.reset();
});

// ===== INITIAL LOAD =====
renderGallery(artworks);
