/* Navbar Shadow on Scroll */
window.addEventListener("scroll", () => {
    const nav = document.querySelector(".navbar");
    if (window.scrollY > 50) {
        nav.style.boxShadow = "0 5px 20px rgba(0,0,0,0.5)";
    } else {
        nav.style.boxShadow = "none";
    }
});