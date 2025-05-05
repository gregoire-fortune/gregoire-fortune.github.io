fetch("/html/footer.html")
    .then(response => response.text())
    .then(data => {
        const footer = document.getElementById("footer");
        footer.innerHTML = data;
        
        // Détecter la page actuelle
        const currentPage = window.location.pathname;

        // Ajouter une classe spécifique en fonction de la page
        switch (true) {
            case currentPage.includes("/index.html"):
            navbar.classList.add("foot-home-page");
            break;
            case currentPage.includes("/html/about.html"):
            navbar.classList.add("foot-about-page");
            break;
            case currentPage.includes("/html/projects.html"):
            navbar.classList.add("foot-projects-page");
            break;
            case currentPage.includes("/html/hobbies.html"):
            navbar.classList.add("foot-hobbies-page");
            break;
            case currentPage.includes("/html/contact.html"):
            navbar.classList.add("foot-contact-page");
            break;
            case currentPage.includes("/html/cv.html"):
            navbar.classList.add("foot-cv-page");
            break;
        }
    });