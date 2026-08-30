// Menu para telemóvel
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    if (navLinks.classList.contains("active")) {
        menuBtn.textContent = "✕";
    } else {
        menuBtn.textContent = "☰";
    }
});


// Fechar o menu quando clicamos num link
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuBtn.textContent = "☰";
    });
});


// Pequena animação quando os elementos aparecem no ecrã
const cards = document.querySelectorAll(
    ".game-card, .friend-card, .gallery img"
);

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    },
    {
        threshold: 0.15
    }
);

cards.forEach(card => {
    card.classList.add("hidden");
    observer.observe(card);
});


// Efeito de clique nas imagens da galeria
document.querySelectorAll(".gallery img").forEach(image => {

    image.addEventListener("click", () => {

        const overlay = document.createElement("div");

        overlay.style.position = "fixed";
        overlay.style.inset = "0";
        overlay.style.background = "rgba(0,0,0,0.9)";
        overlay.style.display = "flex";
        overlay.style.alignItems = "center";
        overlay.style.justifyContent = "center";
        overlay.style.zIndex = "9999";
        overlay.style.cursor = "pointer";

        const bigImage = document.createElement("img");

        bigImage.src = image.src;

        bigImage.style.maxWidth = "90%";
        bigImage.style.maxHeight = "90%";
        bigImage.style.borderRadius = "15px";
        bigImage.style.boxShadow = "0 0 50px rgba(139,92,246,0.5)";

        overlay.appendChild(bigImage);
        document.body.appendChild(overlay);

        overlay.addEventListener("click", () => {
            overlay.remove();
        });
    });
});


Adiciona também isto no final do style.css para a animação do JavaScript funcionar:

.hidden {
    opacity: 0;
    transform: translateY(30px);
    transition: 0.7s ease;
}

.show {
    opacity: 1;
    transform: translateY(0);
}