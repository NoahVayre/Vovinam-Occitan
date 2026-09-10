// Base de données des techniques (à remplir avec ton contenu)
// Pour les vidéos YouTube, utilise le format d'intégration "embed" : https://www.youtube.com/embed/ID_DE_LA_VIDEO
const techniques = [
    {
        id: 1,
        nom: "Da Thang",
        type: "Percussion",
        ceinture: "Bleue",
        description: "Coup de pied direct de face. Frapper avec le bol du pied en armant bien le genou. Garder les poings en garde haute pendant toute la durée du mouvement.",
        video: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Remplace par l'URL embed de ta vidéo
    },
    {
        id: 2,
        nom: "Don Chan 1",
        type: "Ciseaux",
        ceinture: "Bleue 1 Cấp",
        description: "Ciseaux au niveau des jambes. Approche latérale, la jambe droite bloque la cheville adverse, la jambe gauche fauche au niveau du genou.",
        video: ""
    },
    {
        id: 3,
        nom: "Khởi Quyền",
        type: "Quyen",
        ceinture: "Bleue",
        description: "Premier enchaînement technique. Travailler les positions de base (Trung Binh Tan, Dinh Tan) et les blocages primaires.",
        video: ""
    }
];

// Gestion de la navigation entre les pages
const linkHome = document.getElementById('link-home');
const linkCatalog = document.getElementById('link-catalog');
const btnGoCatalog = document.getElementById('btn-go-catalog');
const homeSection = document.getElementById('home-section');
const catalogSection = document.getElementById('catalog-section');

function switchTab(showCatalog) {
    if (showCatalog) {
        homeSection.classList.remove('active-section');
        catalogSection.classList.add('active-section');
        linkHome.classList.remove('active');
        linkCatalog.classList.add('active');
        renderCards(); // Charger les cartes à l'ouverture du catalogue
    } else {
        catalogSection.classList.remove('active-section');
        homeSection.classList.add('active-section');
        linkCatalog.classList.remove('active');
        linkHome.classList.add('active');
    }
}

linkHome.addEventListener('click', (e) => { e.preventDefault(); switchTab(false); });
linkCatalog.addEventListener('click', (e) => { e.preventDefault(); switchTab(true); });
btnGoCatalog.addEventListener('click', () => switchTab(true));

// Rendu des cartes de techniques
const gridTechniques = document.getElementById('grid-techniques');
const searchInput = document.getElementById('search-input');
const filterBelt = document.getElementById('filter-belt');
const filterType = document.getElementById('filter-type');

function renderCards() {
    gridTechniques.innerHTML = '';
    
    const searchText = searchInput.value.toLowerCase();
    const beltValue = filterBelt.value;
    const typeValue = filterType.value;

    const filtered = techniques.filter(tech => {
        const matchText = tech.nom.toLowerCase().includes(searchText);
        const matchBelt = beltValue === 'Toutes' || tech.ceinture === beltValue;
        const matchType = typeValue === 'Tous' || tech.type === typeValue;
        return matchText && matchBelt && matchType;
    });

    if (filtered.length === 0) {
        gridTechniques.innerHTML = '<p>Aucune technique ne correspond à votre recherche.</p>';
        return;
    }

    filtered.forEach(tech => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${tech.nom}</h3>
            <div class="badges">
                <span class="badge badge-belt">${tech.ceinture}</span>
                <span class="badge badge-type">${tech.type}</span>
            </div>
            <p>${tech.description}</p>
            <i class="fa-solid fa-circle-play card-icon"></i>
        `;
        card.addEventListener('click', () => openModal(tech));
        gridTechniques.appendChild(card);
    });
}

// Écouteurs d'événements pour les filtres
searchInput.addEventListener('input', renderCards);
filterBelt.addEventListener('change', renderCards);
filterType.addEventListener('change', renderCards);

// Gestion de la fenêtre modale
const modal = document.getElementById('technique-modal');
const closeModalBtn = document.getElementById('close-modal');
const modalTitle = document.getElementById('modal-title');
const modalBelt = document.getElementById('modal-belt');
const modalType = document.getElementById('modal-type');
const modalText = document.getElementById('modal-text');
const modalIframe = document.getElementById('modal-iframe');

function openModal(tech) {
    modalTitle.textContent = tech.nom;
    modalBelt.textContent = tech.ceinture;
    modalType.textContent = tech.type;
    modalText.textContent = tech.description;
    
    // Gérer l'absence de vidéo
    if (tech.video && tech.video !== "") {
        modalIframe.src = tech.video;
        modalIframe.style.display = "block";
    } else {
        modalIframe.src = "";
        modalIframe.style.display = "none";
    }
    
    modal.style.display = 'flex';
}

function closeModal() {
    modal.style.display = 'none';
    modalIframe.src = ""; // Coupe la vidéo quand on ferme
}

closeModalBtn.addEventListener('click', closeModal);
window.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});
