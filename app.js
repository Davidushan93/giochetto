document.getElementById('fetchImageBtn').addEventListener('click', fetchRandomImage);
document.getElementById('homeBtn').addEventListener('click', resetPage);

async function fetchRandomImage() {
    const apiKey = 'lWggYH5HoSeM5SMF3TnI9osBkExoLuxEBaPAwa5dq8rfpinGOeCX542y';  // La tua API Key di Pexels
    const query = document.getElementById('searchQuery').value.trim();
    let url;

    if (query === '') {
        const randomPage = Math.floor(Math.random() * 100) + 1; // Pagine random da 1 a 100
        url = `https://api.pexels.com/v1/curated?page=${randomPage}&per_page=1`;
    } else {
        url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=80`;
    }

    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': apiKey
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const images = data.photos;

        if (images.length === 0) {
            alert('Nessuna immagine trovata per questo termine di ricerca.');
            return;
        }

        const randomIndex = Math.floor(Math.random() * images.length);
        const randomImage = images[randomIndex].src.large;

        document.getElementById('randomImage').src = randomImage;
        document.getElementById('randomImage').alt = "Immagine random";
    } catch (error) {
        console.error('Fetch error:', error);
        alert('Si è verificato un errore durante la ricerca delle immagini.');
    }
}

function resetPage() {
    document.getElementById('searchQuery').value = '';
    document.getElementById('randomImage').src = '';
    document.getElementById('randomImage').alt = '';
}
