// Image Gallery Functionality

const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.querySelector('.lightbox');
const lightboxImg = lightbox.querySelector('img');
const closeBtn = lightbox.querySelector('.close');
const prevBtn = lightbox.querySelector('.prev');
const nextBtn = lightbox.querySelector('.next');
const filterButtons = document.querySelectorAll('.filter');
const searchInput = document.querySelector('#searchInput');
let currentIndex = 0;
let filteredItems = Array.from(galleryItems);
let currentCategory = 'all';
let searchTerm = '';

// Update gallery based on filters and search
function updateGallery() {
    const search = searchTerm.trim().toLowerCase();
    filteredItems = Array.from(galleryItems).filter(item => {
        const category = item.dataset.category.toLowerCase();
        const alt = item.querySelector('img').alt.toLowerCase();
        const matchesCategory = currentCategory === 'all' || category === currentCategory;
        // Show if search is empty and matches category, or if search matches alt or category
        if (search === '') {
            return matchesCategory;
        } else {
            return (alt.includes(search) || category.includes(search));
        }
    });

    galleryItems.forEach(item => {
        item.style.display = filteredItems.includes(item) ? '' : 'none';
    });

    // Ensure currentIndex is valid
    if (currentIndex >= filteredItems.length) {
        currentIndex = 0;
    }
}

// Filter functionality
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        currentCategory = button.dataset.category;
        updateGallery();
    });
});

// Search functionality
searchInput.addEventListener('input', (e) => {
    searchTerm = e.target.value;
    updateGallery();
});

// Lightbox functionality
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        // Only open if item is visible (filtered)
        if (filteredItems.includes(item)) {
            currentIndex = filteredItems.indexOf(item);
            showLightbox();
        }
    });
});

function showLightbox() {
    if (filteredItems.length > 0 && currentIndex >= 0) {
        lightboxImg.src = filteredItems[currentIndex].querySelector('img').src;
        lightbox.style.display = 'flex';
    }
}

closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

prevBtn.addEventListener('click', () => {
    if (filteredItems.length > 0) {
        currentIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
        showLightbox();
    }
});

nextBtn.addEventListener('click', () => {
    if (filteredItems.length > 0) {
        currentIndex = (currentIndex + 1) % filteredItems.length;
        showLightbox();
    }
});

// Close lightbox when clicking outside image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'flex') {
        if (e.key === 'ArrowLeft') {
            prevBtn.click();
        } else if (e.key === 'ArrowRight') {
            nextBtn.click();
        } else if (e.key === 'Escape') {
            closeBtn.click();
        }
    }
});

// Initial gallery update
updateGallery();
