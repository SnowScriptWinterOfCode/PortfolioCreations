document.addEventListener("DOMContentLoaded", function() {
    window.addEventListener("scroll", function() {
        var scrollY = window.scrollY || document.documentElement.scrollTop;

        if (scrollY > 500) {
            document.querySelector('.scroll-up-btn').classList.add("show");
        } else {
            document.querySelector('.scroll-up-btn').classList.remove("show");
        }
    });

    document.querySelector('.scroll-up-btn').addEventListener("click", function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

