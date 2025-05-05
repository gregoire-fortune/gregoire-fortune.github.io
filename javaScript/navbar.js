fetch("/html/navbar.html")
    .then(response => response.text())
    .then(data => {
        const navbar = document.getElementById("navbar");
        navbar.innerHTML = data;

        // Détecter la page actuelle
        const currentPage = window.location.pathname;

        // Ajouter une classe spécifique en fonction de la page
        switch (true) {
            case currentPage.includes("/index.html"):
            navbar.classList.add("home-page");
            break;
            case currentPage.includes("/html/about.html"):
            navbar.classList.add("about-page");
            break;
            case currentPage.includes("/html/projects.html"):
            navbar.classList.add("projects-page");
            break;
            case currentPage.includes("/html/hobbies.html"):
            navbar.classList.add("hobbies-page");
            break;
            case currentPage.includes("/html/contact.html"):
            navbar.classList.add("contact-page");
            break;
            case currentPage.includes("/html/cv.html"):
            navbar.classList.add("cv-page");
            break;
        }
    });