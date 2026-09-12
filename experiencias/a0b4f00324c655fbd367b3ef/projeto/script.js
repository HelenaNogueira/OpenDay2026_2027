let jogos = 0;

        function maisUmJogo() {
            jogos++;

            document.getElementById("contador").textContent = jogos;

            if (jogos === 5) {
                alert("Já foram 5! 😂 Mas podemos jogar mais um...");
            }

            if (jogos === 10) {
                alert("10 JOGOS?! Tu realmente gostas de badminton! 🏸🔥");
            }
        }


        const frases = [
            '"Um ponto de cada vez. 🏸"',
            '"Treina como se fosse uma final."',
            '"Velocidade. Precisão. Vitória."',
            '"O volante nunca para... e eu também não!"',
            '"A melhor terapia é uma raquete e um campo."',
            '"Se houver um campo, eu estou lá."',
            '"Não é obsessão. É paixão pelo badminton. 😂"',
            '"Smash primeiro. Perguntas depois. 🔥"'
        ];


        function novaFrase() {
            const frase =
                frases[Math.floor(Math.random() * frases.length)];

            document.getElementById("fraseTexto").textContent = frase;
        }