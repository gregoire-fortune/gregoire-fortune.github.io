let lastScrollTop = 0;
const navbar = document.querySelector('.navbar'); // Assurez-vous que votre barre de navigation a la classe "navbar"

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        // Scroll vers le bas
        navbar.style.top = '-16.18vh'; // Cache la barre de navigation
    } else {
        // Scroll vers le haut
        navbar.style.top = '0';
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Évite les valeurs négatives
});