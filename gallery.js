document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.classList.add('lightbox');
    document.body.appendChild(lightbox);

    lightbox.innerHTML = `
        <span class="lightbox-close">&times;</span>
        <img class="lightbox-content">
        <a class="lightbox-prev">&#10094;</a>
        <a class="lightbox-next">&#10095;</a>
    `;

    const lightboxContent = lightbox.querySelector('.lightbox-content');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const lightboxPrev = lightbox.querySelector('.lightbox-prev');
    const lightboxNext = lightbox.querySelector('.lightbox-next');

    let currentIndex = -1;

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            lightbox.style.display = 'block';
            lightboxContent.src = item.querySelector('img').src;
            currentIndex = index;
        });
    });

    lightboxClose.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    lightboxPrev.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = galleryItems.length - 1;
        }
        lightboxContent.src = galleryItems[currentIndex].querySelector('img').src;
    });

    lightboxNext.addEventListener('click', () => {
        if (currentIndex < galleryItems.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        lightboxContent.src = galleryItems[currentIndex].querySelector('img').src;
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });
});
