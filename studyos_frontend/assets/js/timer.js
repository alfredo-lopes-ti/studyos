/* ==========================================================================
   STUDYOS - CORE INTELLIGENCE: POMODORO TIMER (TIMER.JS)
   ========================================================================== */

// 1. MAPEAMENTO DOS ELEMENTOS DO DOM (Sua interface na memória do JS)
const display = document.getElementById('pomodoro-display');
const btnStart = document.getElementById('btn-start');
const btnPause = document.getElementById('btn-pause');

// 2. VARIÁVEIS DE ESTADO DO SISTEMA (Gerenciamento de contexto)
let timerId = null;
let timeLeft = 25 * 60; // 25 minutos convertidos em segundos (1500s)
let isRunning = false;

// 3. FUNÇÃO DE ATUALIZAÇÃO VISUAL (Render)
function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    // Formata com o zero à esquerda se for menor que 10 (ex: 09:05)
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    display.textContent = `${formattedMinutes}:${formattedSeconds}`;
}

// 4. LÓGICA DO CRONÔMETRO REGRESSIVO
function startTimer() {
    if (isRunning) return; // Proteção: impede cliques duplicados que aceleram o tempo

    isRunning = true;
    btnStart.textContent = "Rodando...";
    btnStart.style.backgroundColor = "var(--accent-success)";

    timerId = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
        } else {
            // O tempo acabou (Ciclo de foco concluído)
            clearInterval(timerId);
            timerId = null;
            isRunning = false;
            timeLeft = 25 * 60; // Reinicia o contador
            updateDisplay();
            alert("🔥 Ciclo Pomodoro concluído! Hora de um descanso curto.");
            btnStart.textContent = "Iniciar";
            btnStart.style.backgroundColor = "var(--accent-primary)";
        }
    }, 1000); // Executa a cada 1 segundo (1000ms)
}

function pauseTimer() {
    if (!isRunning) return;

    clearInterval(timerId);
    timerId = null;
    isRunning = false;

    btnStart.textContent = "Retomar";
    btnStart.style.backgroundColor = "var(--accent-primary)";
}

// 5. ESCUTADORES DE EVENTOS (Interação com o Usuário)
btnStart.addEventListener('click', startTimer);
btnPause.addEventListener('click', pauseTimer);

// Inicializa o visor assim que o script carrega
updateDisplay();