document.addEventListener("DOMContentLoaded", () => {
    const contentEl = document.getElementById("content");

    // Load initial page
    let startPage = window.location.hash.replace("#", "");
    if (!startPage) startPage = "matpakke";

    loadContent(`pages/${startPage}.html`);

// highlight correct menu item after load
    setTimeout(() => {
        const active = document.querySelector(`[data-file="pages/${startPage}.html"]`);
        if (active) active.classList.add("active-link");
    }, 50);

    document.querySelectorAll(".section-header").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.getAttribute("data-toggle");
            const body = document.getElementById(id);
            if (!body) return;

            body.classList.toggle("open");
        });
    });

    // Sidebar links that load content
    function handleNavClick(el) {
        const file = el.getAttribute("data-file");
        const pageName = file.replace("pages/", "").replace(".html", "");

        if (!file) return;

        // Update URL
        window.location.hash = pageName;

        // Load content
        loadContent(file);

        // Highlight active
        document.querySelectorAll(".nav-link, .section-header-only")
            .forEach(link => link.classList.remove("active-link"));

        el.classList.add("active-link");
    }


    document.querySelectorAll(".nav-link, .section-header-only").forEach(el => {
        el.addEventListener("click", () => handleNavClick(el));
    });

    // Load HTML snippet into content area
    function loadContent(file) {
        fetch(file)
            .then(resp => {
                if (!resp.ok) {
                    throw new Error("Network response was not ok");
                }
                return resp.text();
            })
            .then(html => {
                contentEl.innerHTML = html;
            })
            .catch(() => {
                contentEl.innerHTML = "<p>Kunne ikke laste siden.</p>";
            });
    }

    window.addEventListener("hashchange", () => {
        const pageName = window.location.hash.replace("#", "");
        if (pageName) {
            loadContent(`pages/${pageName}.html`);
        }
    });

});
