/* ==========================================================================
   STUDYOS - DASHBOARD INTELLIGENCE: CHECKLIST & STORAGE (DASHBOARD.JS)
   ========================================================================== */

// 1. MAPEAMENTO DOS ELEMENTOS (Busca todos os checkboxes da tela)
const checkboxes = document.querySelectorAll('.task-checkbox');

// 2. FUNÇÃO PARA SALVAR O ESTADO NO NAVEGADOR
function saveChecklistState() {
    const checklistState = {};
    updateProgressBars();

    // Passa por cada checkbox e guarda se ele está marcado (true) ou não (false)
    checkboxes.forEach(checkbox => {
        checklistState[checkbox.value] = checkbox.checked;
    });

    // Converte o objeto de Javascript em Texto (JSON) para conseguir salvar no LocalStorage
    localStorage.setItem('studyos_checklist', JSON.stringify(checklistState));
    console.log("💾 Estado do checklist salvo localmente:", checklistState);
}

// 3. FUNÇÃO PARA CARREGAR O ESTADO SALVO (Executada ao abrir a página)
function loadChecklistState() {
    const savedData = localStorage.getItem('studyos_checklist');

    // Se não houver nada salvo ainda (primeira vez abrindo o app), interrompe a função
    if (!savedData) return;

    // Converte o texto JSON de volta para um objeto Javascript utilizável
    const checklistState = JSON.parse(savedData);

    // Passa por todos os checkboxes da tela e aplica o estado recuperado
    checkboxes.forEach(checkbox => {
        if (checklistState[checkbox.value] !== undefined) {
            checkbox.checked = checklistState[checkbox.value];
        }
    });
}

// 4. ESCUTADORES DE EVENTOS (Monitora quando o usuário clica em qualquer tarefa)
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', saveChecklistState);
});

// 5. INICIALIZAÇÃO AUTOMÁTICA
// Assim que a página carrega, lê o banco local para marcar o que já estava feito
loadChecklistState();

/* ==========================================================================
   STUDYOS - EVOLUÇÃO: PROGRESSO DINÂMICO (ADICIONAR AO DASHBOARD.JS)
   ========================================================================== */

// 1. FUNÇÃO PARA ATUALIZAR AS BARRAS DE PROGRESSO VISUAIS
function updateProgressBars() {
    // Mapeia quais tarefas do checklist controlam quais matérias
    const materiasConfig = {
        'java': { fillClass: '.fill-java', textId: '#pct-java' },
        'sql': { fillClass: '.fill-sql', textId: '#pct-sql' },
        'csharp': { fillClass: '.fill-csharp', textId: '#pct-csharp' }
    };

    // Passa por cada matéria configurada
    checkboxes.forEach(checkbox => {
        const config = materiasConfig[checkbox.value];

        // Se a tarefa atual corresponder a uma barra de progresso
        if (config) {
            const barFill = document.querySelector(config.fillClass);
            const percentText = document.querySelector(config.textId);

            if (barFill && percentText) {
                // Se a missão foi concluída, progresso vai para 100%. Se não, fica em 30% (base de estudos)
                const novoProgresso = checkbox.checked ? 100 : 30;

                // Modifica o CSS em tempo real (Aproveitando a animação 'transition' que criamos no CSS)
                barFill.style.width = `${novoProgresso}%`;
                percentText.textContent = `${novoProgresso}%`;

                // Muda a cor do texto da porcentagem para dar um feedback visual premium
                percentText.style.color = checkbox.checked ? "var(--accent-success)" : "var(--text-muted)";
            }
        }
    });
}

// 2. INTEGRAR COM O FLUXO EXISTENTE
// Vamos modificar as funções que já tínhamos para que elas chamem a atualização da barra

// Atualize o seu escutador de eventos antigo para incluir a nova função:
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        saveChecklistState();
        updateProgressBars(); // <--- Nova linha inserida aqui
    });
});