const button = document.getElementById("revealBtn");

const ticket = document.getElementById("ticket");

const sound = document.getElementById("magicSound");

const loading = document.getElementById("loading");

const progress = document.getElementById("progress");

const loadingText = document.getElementById("loadingText");


/* =========================
   BOTÃO PRINCIPAL
========================= */

button.addEventListener("click", () => {

    // Vibração no celular
    if (navigator.vibrate) {

        navigator.vibrate([200, 100, 200]);

    }

    // Esconde botão
    button.style.display = "none";

    // Mostra loading
    loading.classList.remove("hidden");

    // Inicia carregamento fake
    startLoading();

});


/* =========================
   LOADING FAKE
========================= */

function startLoading() {

    let width = 0;

    const texts = [

        "Validando bilhete dourado...",
        "Consultando Willy Wonka...",
        "Preparando recompensa...",
        "Abrindo portões da fábrica...",
        "Confirmando chocolate premiado...",
        "Resultado encontrado..."

    ];

    let textIndex = 0;

    const interval = setInterval(() => {

        width += Math.random() * 18;

        progress.style.width = width + "%";

        // Troca mensagens
        loadingText.innerText = texts[textIndex];

        textIndex++;

        if (textIndex >= texts.length) {

            textIndex = 0;

        }

        // Finaliza loading
        if (width >= 100) {

            clearInterval(interval);

            setTimeout(() => {

                // Esconde loading
                loading.classList.add("hidden");

                // Mostra ticket
                showTicket();

            }, 1000);

        }

    }, 500);

}


/* =========================
   MOSTRAR TICKET
========================= */

function showTicket() {

    // Toca música somente agora
    sound.play();

    // Mostra ticket
    ticket.classList.remove("hidden");

    // Delay suave
    setTimeout(() => {

        ticket.classList.add("show");

    }, 100);

    // Inicia confete
    startConfetti();

}


/* =========================
   CONFETTI
========================= */

const canvas = document.getElementById("confetti");

const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;

canvas.height = window.innerHeight;

let confettis = [];

function createConfetti() {

    for (let i = 0; i < 150; i++) {

        confettis.push({

            x: Math.random() * canvas.width,

            y: Math.random() * canvas.height - canvas.height,

            size: Math.random() * 8 + 3,

            speed: Math.random() * 3 + 2,

            color: `hsl(${Math.random() * 50 + 30}, 100%, 50%)`,

            rotation: Math.random() * 360

        });

    }

}

function drawConfetti() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    confettis.forEach((confetti, index) => {

        ctx.save();

        ctx.translate(confetti.x, confetti.y);

        ctx.rotate(confetti.rotation);

        ctx.fillStyle = confetti.color;

        ctx.fillRect(

            -confetti.size / 2,
            -confetti.size / 2,

            confetti.size,
            confetti.size

        );

        ctx.restore();

        confetti.y += confetti.speed;

        confetti.rotation += 0.05;

        if (confetti.y > canvas.height) {

            confettis.splice(index, 1);

        }

    });

    requestAnimationFrame(drawConfetti);

}

function startConfetti() {

    createConfetti();

    drawConfetti();

}


/* =========================
   RESPONSIVIDADE
========================= */

window.addEventListener("resize", () => {

    canvas.width = window.innerWidth;

    canvas.height = window.innerHeight;

});