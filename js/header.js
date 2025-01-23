document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const closeMenu = document.getElementById('closeMenu');
    const navMenu = document.getElementById('navMenu');
    const searchToggle = document.querySelector('.search-toggle');
    const searchBar = document.getElementById('searchBar');
    const closeSearch = document.querySelector('.close-search');
    const sectionsToggle = document.getElementById('sectionsToggle');
    const sectionsMenu = document.getElementById('sectionsMenu');
    const closeSections = document.getElementById('closeSections');

    // Variables pour le touch
    let touchStartX = 0;
    let touchEndX = 0;

    // Toggle menu principal
    menuToggle.addEventListener('click', () => {
        navMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    closeMenu.addEventListener('click', () => {
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Toggle menu des sections
    sectionsToggle.addEventListener('click', (e) => {
        e.stopPropagation(); // Empêche la propagation au document
        sectionsMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    closeSections.addEventListener('click', () => {
        sectionsMenu.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Toggle barre de recherche
    searchToggle.addEventListener('click', () => {
        searchBar.classList.add('active');
    });

    closeSearch.addEventListener('click', () => {
        searchBar.classList.remove('active');
    });

    // Gestion des clics en dehors
    document.addEventListener('click', (e) => {
        // Pour le menu principal
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }

        // Pour le menu des sections
        if (sectionsMenu.classList.contains('active') && 
            !sectionsMenu.querySelector('.sections-content').contains(e.target) && 
            !sectionsToggle.contains(e.target)) {
            sectionsMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Gestion des swipes
    navMenu.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    navMenu.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX < -50) { // Swipe vers la droite
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    sectionsMenu.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    sectionsMenu.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) { // Swipe vers la gauche
            sectionsMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Menu mobile avec sections
    const menuBtn = document.querySelector('.menu-btn');
    const sectionsMenuMobile = document.querySelector('.sections-menu');
    const closeBtn = document.querySelector('.close-sections');

    menuBtn.addEventListener('click', () => {
        console.log('Menu button clicked');
        sectionsMenu.style.display = 'block';
        sectionsMenu.querySelector('.sections-content').style.transform = 'translateX(0)';
    });

    closeBtn.addEventListener('click', () => {
        sectionsMenu.querySelector('.sections-content').style.transform = 'translateX(100%)';
        setTimeout(() => {
            sectionsMenu.style.display = 'none';
        }, 300);
    });
}); 