const button = document.getElementById("revealBtn");
const ticket = document.getElementById("ticket");
const sound = document.getElementById("magicSound");

button.addEventListener("click", () => {

    // Vibração no celular
    if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200]);
    }

    // Som
    sound.play();

    // Esconde botão
    button.style.display = "none";

    // Mostra ticket
    ticket.classList.remove("hidden");

    // Pequeno delay pra animação ficar suave
    setTimeout(() => {
        ticket.classList.add("show");
    }, 100);

    // Inicia confetes
    startConfetti();

});


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