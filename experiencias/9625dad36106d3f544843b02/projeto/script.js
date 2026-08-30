// Mensagem do botão principal
function mostrarMensagem() {

    alert(
        "⚽ O futebol não é apenas um jogo...\n\n" +
        "É paixão, emoção, amizade e memórias que ficam para sempre! 🔥"
    );
}


// Mensagem personalizada
function enviarMensagem() {

    const nome = document.getElementById("nome").value;
    const resultado = document.getElementById("resultado");

    if (nome.trim() === "") {

        resultado.textContent =
            "⚠️ Escreve primeiro o nome do teu amigo!";

        resultado.style.color = "#ffcc00";

        return;
    }

    resultado.textContent =
        `⚽ ${nome}, estás preparado para o próximo jogo? 🔥`;

    resultado.style.color = "#25e879";

    document.getElementById("nome").value = "";
}


// Efeito quando fazemos scroll
window.addEventListener("scroll", function () {

    const header = document.querySelector("header");

    if (window.scrollY > 50) {
        header.style.background = "rgba(3, 10, 7, 0.98)";
    } else {
        header.style.background = "rgba(3, 10, 7, 0.9)";
    }

});
