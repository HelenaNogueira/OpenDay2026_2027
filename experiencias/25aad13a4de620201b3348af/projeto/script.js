const estilos = [
    {
        nome: "🔥 Hip-Hop",
        frase: "Tens energia e atitude. O Hip-Hop combina contigo!"
    },

    {
        nome: "🩰 Ballet",
        frase: "Elegância, precisão e dedicação. O Ballet é a tua vibe!"
    },

    {
        nome: "❤️ Salsa",
        frase: "Gostas de ritmo e diversão. Salsa é a escolha certa!"
    },

    {
        nome: "⚡ Breakdance",
        frase: "Gostas de desafios e movimentos impressionantes!"
    },

    {
        nome: "✨ Dança Contemporânea",
        frase: "Criatividade e liberdade são a tua praia!"
    },

    {
        nome: "🎵 K-Pop",
        frase: "Coreografias, música e energia. K-Pop combina contigo!"
    }
];


function escolherDanca() {

    const numeroAleatorio =
        Math.floor(Math.random() * estilos.length);

    const estilo =
        estilos[numeroAleatorio];

    const resultado =
        document.getElementById("resultado");


    resultado.innerHTML = `
        <div class="resultado-danca">
            ${estilo.nome}
            <br>

            <small>
                ${estilo.frase}
            </small>
        </div>
    `;
}