// Film Verileri, Fragmanlar ve Gerçek İzleme Linkleri
const MOVIES_DATA = [
    {
        id: 1,
        title: "Interstellar",
        genre: "Bilim Kurgu",
        year: "2014",
        rating: "8.7",
        image: "https://unsplash.com",
        trailer: "https://youtube.com",
        watch_url: "https://ornekizleme-sitesi.com", // BURAYA GERÇEK FİLM LİNKİNİ YAZACAKSIN
        desc: "İnsanlığın geleceği tehlikeye girdiğinde, bir grup astronot yaşanabilir yeni bir gezegen bulmak için solucan deliğinden geçerek uzayda sınırları zorlar."
    },
    {
        id: 2,
        title: "The Dark Knight",
        genre: "Aksiyon",
        year: "2008",
        rating: "9.0",
        image: "https://unsplash.com",
        trailer: "https://youtube.com",
        watch_url: "https://ornekizleme-sitesi.com", // BURAYA GERÇEK FİLM LİNKİNİ YAZACAKSIN
        desc: "Batman, Gotham şehrini kaosa sürüklemeye çalışan gizemli ve acımasız suçlu Joker ile karşı karşıya geldiğinde en büyük adalet sınavını verir."
    },
    {
        id: 3,
        title: "Inception",
        genre: "Bilim Kurgu",
        year: "2010",
        rating: "8.8",
        image: "https://unsplash.com",
        trailer: "https://youtube.com",
        watch_url: "https://ornekizleme-sitesi.com",
        desc: "Çok yetenekli bir hırsız olan Dom Cobb, insanların rüya gördüğü sırada bilinçaltının derinliklerindeki sırları çalmakta uzmandır."
    }
];

const movieGrid = document.getElementById('movie-grid');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const listTitle = document.getElementById('list-title');
const modal = document.getElementById('movie-modal');
const closeModal = document.getElementById('close-modal');
const modalBody = document.getElementById('modal-body');

// İlk yükleme
displayMovies(MOVIES_DATA);

function displayMovies(movies) {
    movieGrid.innerHTML = "";
    if(movies.length === 0) {
        movieGrid.innerHTML = `<p style="grid-column: 1/-1; text-align:center; color:var(--text-muted);">Aradığınız kriterde film bulunamadı.</p>`;
        return;
    }

    movies.forEach(movie => {
        const card = document.createElement('div');
        card.classList.add('movie-card');
        card.innerHTML = `
            <img src="${movie.image}" alt="${movie.title}">
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <div class="movie-meta">
                    <span>${movie.year} | ${movie.genre}</span>
                    <span class="rating"><i class="fa-solid fa-star"></i> ${movie.rating}</span>
                </div>
            </div>
        `;
        card.addEventListener('click', () => openMovieDetail(movie));
        movieGrid.appendChild(card);
    });
}

// Detay Penceresi ve "Filmi İzle" Butonu Entegrasyonu
function openMovieDetail(movie) {
    modalBody.innerHTML = `
        <div class="video-container">
            <iframe id="trailer-video" src="${movie.trailer}?autoplay=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        </div>
        <div class="modal-desc">
            <h2>${movie.title}</h2>
            <div style="margin-bottom: 15px;">
                <span class="badge">${movie.genre}</span>
                <span style="margin-left:15px; color:#ffb400; font-weight:bold;"><i class="fa-solid fa-star"></i> ${movie.rating}</span>
                <span style="margin-left:15px; color:var(--text-muted);">${movie.year}</span>
            </div>
            <p>${movie.desc}</p>
            
            <!-- YENİ EKLENEN FİLMİ İZLE BUTONU -->
            <a href="${movie.watch_url}" target="_blank" class="btn btn-primary" style="margin-top: 20px; display: inline-flex; align-items: center; gap: 8px; text-decoration: none;">
                <i class="fa-solid fa-circle-play"></i> Filmi Full İzle
            </a>
        </div>
    `;
    modal.style.display = "flex";
}

function openHeroTrailer() {
    openMovieDetail(MOVIES_DATA[0]);
}

function filterGenre(genreName) {
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => link.classList.remove('active'));
    if(event) event.target.classList.add('active');

    if(genreName === 'Tümü') {
        listTitle.innerText = "Tüm Filmler";
        displayMovies(MOVIES_DATA);
    } else {
        listTitle.innerText = `${genreName} Türündeki Filmler`;
        const filtered = MOVIES_DATA.filter(m => m.genre === genreName);
        displayMovies(filtered);
    }
}

function handleSearch() {
    const query = searchInput.value.toLowerCase().trim();
    if(query !== "") {
        listTitle.innerText = `"${query}" İçin Arama Sonuçları`;
        const filtered = MOVIES_DATA.filter(m => 
            m.title.toLowerCase().includes(query) || m.genre.toLowerCase().includes(query)
        );
        displayMovies(filtered);
    } else {
        listTitle.innerText = "Tüm Filmler";
        displayMovies(MOVIES_DATA);
    }
}

searchBtn.addEventListener('click', handleSearch);
searchInput.addEventListener('keyup', (e) => { if(e.key === 'Enter') handleSearch(); });

function stopAndCloseModal() {
    const iframe = document.getElementById('trailer-video');
    if (iframe) {
        iframe.setAttribute('src', '');
    }
    modal.style.display = "none";
}

closeModal.addEventListener('click', stopAndCloseModal);
window.addEventListener('click', (e) => { if(e.target === modal) stopAndCloseModal(); });
