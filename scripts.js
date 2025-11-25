document.addEventListener("DOMContentLoaded", () => {
    const contentEl = document.getElementById("content");

    // Load initial page
    loadContent("pages/matpakke.html");

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
        if (!file) return;

        loadContent(file);

        // Highlight active
        document
            .querySelectorAll(".nav-link, .section-header-only")
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
});
