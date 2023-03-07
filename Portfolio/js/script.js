function globalListener() {
    const hamburger = document.querySelector(".hamburger"),
        menu = document.querySelector(".menu"),
        close = document.querySelector(".menu__close"),
        menuOverlay = document.querySelector(".menu__overlay"),
        menuList = document.querySelector(".menu__list");

    hamburger.addEventListener("click", () => {
        menu.classList.add("active");
    });

    close.addEventListener("click", () => {
        menu.classList.remove("active");
    });

    menuOverlay.addEventListener("click", () => {
        menu.classList.remove("active");
    });

    menuList.addEventListener("click", (e) => {
        if (e.target !== menuList) {
            menu.classList.remove("active");
        }
    });

    document.addEventListener("keydown", (e) => {
        if (menu.classList.contains("active") && e.key === "Escape") {
            menu.classList.remove("active");
        }
    });
}
globalListener();

const counters = document.querySelectorAll(".skills__progress-number"),
    lines = document.querySelectorAll(
        ".skills__progress-bar .skills__progress-yellow"
    );

counters.forEach((item, i) => {
    lines[i].style.width = item.innerHTML;
});
