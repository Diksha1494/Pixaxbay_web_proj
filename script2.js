const apiKey =  '46115776-7820fd8cd29eed6c8d960e44e';
const gallery = document.getElementById('gallery');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalInfo = document.getElementById('modal-info');

async function fetchImages() {
    try {
        const response = await fetch(`https://pixabay.com/api/?key=${apiKey}&image_type=photo&per_page=30`);
        const data = await response.json();
        displayImages(data.hits);
    } catch (error) {
        console.error('Error fetching images:', error);
        gallery.innerHTML = '<p>Error loading images. Please try again later.</p>';
    }
}

function displayImages(images) {
    gallery.innerHTML = images.map(image => `
        <img src="${image.webformatURL}" alt="${image.tags}" onclick="openModal('${image.largeImageURL}', '${image.tags}', '${image.user}')">
    `).join('');
}

function openModal(imageUrl, tags, user) {
    modal.style.display = 'flex';
    modalImg.src = imageUrl;
    modalInfo.innerHTML = `<h2>${tags}</h2>
    <p>By: ${user}</p>`;
}

function closeModal() {
    modal.style.display = 'none';
}


fetchImages();
