// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.getElementById('menuMobileToggle');
    const menuMobile = document.getElementById('menuMobile');
    const menuCloseBtn = document.getElementById('menuMobileClose');
    const searchBtn = document.querySelector('.search-btn');
    const mobileSearch = document.querySelector('.mobile-search');
    const body = document.body;

    // Menu Toggle
    menuBtn.addEventListener('click', function() {
        menuMobile.classList.add('active');
        body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    });

    menuCloseBtn.addEventListener('click', function() {
        menuMobile.classList.remove('active');
        body.style.overflow = ''; // Restore scrolling
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (menuMobile.classList.contains('active') && 
            !menuMobile.contains(e.target) && 
            !menuBtn.contains(e.target)) {
            menuMobile.classList.remove('active');
            body.style.overflow = '';
        }
    });

    // Search Toggle
    if (searchBtn && mobileSearch) {
        searchBtn.addEventListener('click', function() {
            mobileSearch.classList.toggle('active');
            if (mobileSearch.classList.contains('active')) {
                mobileSearch.querySelector('input').focus();
            }
        });

        // Close search when clicking outside
        document.addEventListener('click', function(e) {
            if (!searchBtn.contains(e.target) && 
                !mobileSearch.contains(e.target)) {
                mobileSearch.classList.remove('active');
            }
        });
    }

    // Handle mobile menu links
    const menuLinks = menuMobile.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuMobile.classList.remove('active');
            body.style.overflow = '';
        });
    });
});
