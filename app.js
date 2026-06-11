/* ==========================================================================
   Drank Barber ERP Application Logic - Vanilla JS
   ========================================================================== */

// --- SEED DATA (DADOS INICIAIS DE TESTE) ---
const SEED_MEMBROS = [
    { id: "m-1", nome: "Fernando Martins", cpf: "111.111.111-11", telefone: "(75) 99999-1111", email: "fernando@drank.com.br", cargo: "admin", data_admissao: "2025-01-15", status: "ativo", taxa_comissao: 50, senha: "admin123" },
    { id: "m-2", nome: "Cavin Piterson", cpf: "222.222.222-22", telefone: "(75) 99999-2222", email: "cavin@drank.com.br", cargo: "barbeiro", data_admissao: "2025-02-10", status: "ativo", taxa_comissao: 40, senha: "cavin123" },
    { id: "m-3", nome: "Karina Souza", cpf: "333.333.333-33", telefone: "(75) 99999-3333", email: "karina@drank.com.br", cargo: "barbeiro", data_admissao: "2025-03-20", status: "ativo", taxa_comissao: 45, senha: "karina123" },
    { id: "m-4", nome: "Drank Barbeiro", cpf: "444.444.444-44", telefone: "(75) 99999-4444", email: "drank_b@drank.com.br", cargo: "barbeiro", data_admissao: "2025-01-01", status: "ativo", taxa_comissao: 50, senha: "drank123" },
    { id: "m-5", nome: "Bruno Auxiliar", cpf: "555.555.555-55", telefone: "(75) 99999-5555", email: "bruno@drank.com.br", cargo: "auxiliar", data_admissao: "2025-05-01", status: "ativo", taxa_comissao: 10, senha: "bruno123" },
    { id: "m-6", nome: "Lucas Gestor", cpf: "666.666.666-66", telefone: "(75) 99999-6666", email: "lucas@drank.com.br", cargo: "gerente", data_admissao: "2025-05-15", status: "ativo", taxa_comissao: 0, senha: "gestor123" }
];

const SEED_SERVICOS = [
    { id: "s-1", nome: "Cabelo", descricao: "Corte de cabelo degrade, social ou tesoura", valor_base: 50.00, tempo_estimado: 30, categoria: "cabelo", ativo: true },
    { id: "s-2", nome: "Barba", descricao: "Barba com toalha quente e terapia de óleos", valor_base: 40.00, tempo_estimado: 25, categoria: "barba", ativo: true },
    { id: "s-3", nome: "Cabelo + Barba", descricao: "Combo completo de cabelo e barba", valor_base: 80.00, tempo_estimado: 50, categoria: "cabelo", ativo: true },
    { id: "s-4", nome: "Sobrancelha", descricao: "Limpeza de sobrancelha na navalha", valor_base: 20.00, tempo_estimado: 15, categoria: "complementar", ativo: true },
    { id: "s-5", nome: "Pezinho", descricao: "Acabamento de pezinho do cabelo", valor_base: 15.00, tempo_estimado: 10, categoria: "complementar", ativo: true }
];

const SEED_PRODUTOS = [
    { id: "p-1", nome: "Pomada Matte BeardBrand", marca: "BeardBrand", categoria: "pomada", preco_venda: 65.00, preco_compra: 30.00, estoque: 8, unidade: "unid", ativo: true },
    { id: "p-2", nome: "Óleo Premium Beard", marca: "BeardBrand", categoria: "oleo", preco_venda: 55.00, preco_compra: 25.00, estoque: 2, unidade: "unid", ativo: true },
    { id: "p-3", nome: "Shampoo Cabelo & Corpo", marca: "Drank Lab", categoria: "oleo", preco_venda: 45.00, preco_compra: 18.00, estoque: 15, unidade: "unid", ativo: true }
];

// Helper para gerar datas recentes
function getRecentDate(daysAgo, hour = 14) {
    const d = new Date();
    d.setDate(d.getDate() - daysAgo);
    d.setHours(hour, 0, 0, 0);
    return d.toISOString();
}

const SEED_LANCAMENTOS = [
    { id: "l-1", team_member_id: "m-2", service_id: "s-3", quantidade: 1, valor: 80.00, data_hora: getRecentDate(0, 10), observacao: "Cliente regular", cancelado: false, motivo_cancelamento: "" },
    { id: "l-2", team_member_id: "m-2", service_id: "s-1", quantidade: 1, valor: 50.00, data_hora: getRecentDate(0, 13), observacao: "", cancelado: false, motivo_cancelamento: "" },
    { id: "l-3", team_member_id: "m-3", service_id: "s-3", quantidade: 1, valor: 80.00, data_hora: getRecentDate(1, 15), observacao: "Combo promocional", cancelado: false, motivo_cancelamento: "" },
    { id: "l-4", team_member_id: "m-4", service_id: "s-1", quantidade: 1, valor: 50.00, data_hora: getRecentDate(2, 9), observacao: "", cancelado: false, motivo_cancelamento: "" },
    { id: "l-5", team_member_id: "m-2", service_id: "s-2", quantidade: 1, valor: 40.00, data_hora: getRecentDate(3, 11), observacao: "Barba rápida", cancelado: false, motivo_cancelamento: "" },
    { id: "l-6", team_member_id: "m-3", service_id: "s-4", quantidade: 1, valor: 20.00, data_hora: getRecentDate(3, 16), observacao: "", cancelado: false, motivo_cancelamento: "" },
    { id: "l-7", team_member_id: "m-4", service_id: "s-2", quantidade: 1, valor: 40.00, data_hora: getRecentDate(5, 17), observacao: "", cancelado: false, motivo_cancelamento: "" },
    { id: "l-8", team_member_id: "m-2", service_id: "s-1", quantidade: 1, valor: 50.00, data_hora: getRecentDate(10, 14), observacao: "", cancelado: false, motivo_cancelamento: "" },
    { id: "l-9", team_member_id: "m-3", service_id: "s-3", quantidade: 1, valor: 80.00, data_hora: getRecentDate(15, 11), observacao: "", cancelado: false, motivo_cancelamento: "" },
    { id: "l-10", team_member_id: "m-4", service_id: "s-3", quantidade: 1, valor: 80.00, data_hora: getRecentDate(20, 16), observacao: "Cabelo + barba completo", cancelado: false, motivo_cancelamento: "" }
];

const SEED_VENDAS = [
    { id: "v-1", product_id: "p-1", quantidade: 1, preco_venda: 65.00, total: 65.00, team_member_id: "m-2", data: getRecentDate(0, 10), observacao: "" },
    { id: "v-2", product_id: "p-2", quantidade: 1, preco_venda: 55.00, total: 55.00, team_member_id: "m-3", data: getRecentDate(1, 15), observacao: "" },
    { id: "v-3", product_id: "p-3", quantidade: 2, preco_venda: 45.00, total: 90.00, team_member_id: "m-4", data: getRecentDate(4, 12), observacao: "" }
];

// --- APP STATE ---
let state = {
    membros: [],
    servicos: [],
    produtos: [],
    lancamentos: [],
    vendas: [],
    config: {
        activeUserId: "gestor", // "gestor" ou id do membro
        sheetsUrl: import.meta.env.VITE_SHEETS_URL || "",
        limiteEstoqueBaixo: 3
    }
};

// --- DATA INITIALIZATION & STORE ---
function initApp() {
    if (localStorage.getItem("drank_state")) {
        try {
            state = JSON.parse(localStorage.getItem("drank_state"));

            // Garante uso do sheetsUrl definido no .env
            if (import.meta.env.VITE_SHEETS_URL) {
                state.config.sheetsUrl = import.meta.env.VITE_SHEETS_URL;
            }

            // Evita ficar sem membros e trancado fora do app (caso sincronize com planilha vazia)
            if (!state.membros || state.membros.length === 0) {
                state.membros = [...SEED_MEMBROS];
            }

            // Corrige Fernando Martins cargo antigo de gerente para admin se necessário
            const fernando = state.membros.find(m => m.id === "m-1");
            if (fernando && fernando.cargo === "gerente") {
                fernando.cargo = "admin";
            }

            // Garante que o Lucas Gestor esteja no estado carregado
            if (!state.membros.some(m => m.id === "m-6")) {
                state.membros.push({ id: "m-6", nome: "Lucas Gestor", cpf: "666.666.666-66", telefone: "(75) 99999-6666", email: "gestor@drank.com.br", cargo: "gerente", data_admissao: "2025-05-15", status: "ativo", taxa_comissao: 0, senha: "gestor123" });
            }

            // Migração de estado antigo: garante senhas para todos os membros
            let stateUpdated = false;
            if (state && state.membros) {
                state.membros.forEach(m => {
                    if (!m.senha) {
                        const seedMatch = SEED_MEMBROS.find(sm => sm.id === m.id || sm.email.toLowerCase() === m.email.toLowerCase());
                        m.senha = seedMatch ? seedMatch.senha : "123456";
                        stateUpdated = true;
                    }
                });
            }
            if (stateUpdated) {
                saveState();
            }
        } catch (e) {
            console.error("Erro ao ler localStorage, reiniciando dados.", e);
            resetToSeed();
        }
    } else {
        resetToSeed();
    }

    // Define datas padrão nos inputs customizados (início do mês atual até hoje)
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const formatDateYMD = (d) => {
        const offset = d.getTimezoneOffset();
        const localDate = new Date(d.getTime() - (offset * 60 * 1000));
        return localDate.toISOString().split('T')[0];
    };

    ["dashboard-date-start", "barber-date-start", "manager-date-start"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = formatDateYMD(firstDay);
    });
    ["dashboard-date-end", "barber-date-end", "manager-date-end"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = formatDateYMD(now);
    });

    // Verifica sessão ativa de login
    const activeSession = sessionStorage.getItem("active_user_id");
    const loginScreen = document.getElementById("login-screen");

    if (activeSession) {
        state.config.activeUserId = activeSession;
        if (loginScreen) loginScreen.classList.add("hidden");
    } else {
        state.config.activeUserId = null;
        if (loginScreen) loginScreen.classList.remove("hidden");
    }

    // Atualiza hora da barra de status simulada
    updateStatusTime();
    setInterval(updateStatusTime, 30000);

    // Inicializa ícones
    lucide.createIcons();

    // Vincula Event Listeners
    setupEventHandlers();

    // Renderiza UI
    renderAll();

    // Sincroniza em segundo plano ao iniciar para carregar contas reais da planilha
    silentSyncAtStartup();
}

async function silentSyncAtStartup() {
    const url = state.config.sheetsUrl;
    if (!url) return;
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            let updated = false;
            if (data.membros) {
                state.membros = data.membros.length > 0 ? data.membros : [...SEED_MEMBROS];
                updated = true;
            }
            if (data.servicos) {
                state.servicos = data.servicos;
                updated = true;
            }
            if (data.produtos) {
                state.produtos = data.produtos;
                updated = true;
            }
            if (data.lancamentos) {
                state.lancamentos = data.lancamentos;
                updated = true;
            }
            if (data.vendas) {
                state.vendas = data.vendas;
                updated = true;
            }
            if (updated) {
                saveState();
                renderAll();
            }
        }
    } catch (e) {
        console.error("Falha na sincronização silenciosa ao iniciar:", e);
    }
}

function resetToSeed() {
    state.membros = [...SEED_MEMBROS];
    state.servicos = [...SEED_SERVICOS];
    state.produtos = [...SEED_PRODUTOS];
    state.lancamentos = [...SEED_LANCAMENTOS];
    state.vendas = [...SEED_VENDAS];
    if (!state.config) {
        state.config = {
            activeUserId: "gestor",
            sheetsUrl: import.meta.env.VITE_SHEETS_URL || "",
            limiteEstoqueBaixo: 3
        };
    }
    saveState();
}

function saveState() {
    localStorage.setItem("drank_state", JSON.stringify(state));
}

function updateStatusTime() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const timeEl = document.getElementById("status-time");
    if (timeEl) timeEl.textContent = timeStr;
}

// --- GOOGLE SHEETS SYNC LOGIC ---
async function syncWithGoogleSheets() {
    const url = state.config.sheetsUrl;
    if (!url) {
        showToast("Insira a URL do Google Apps Script nas configurações.", "error");
        return;
    }

    showToast("Sincronizando dados com o Google Sheets...", "info");

    try {
        // GET para carregar dados do Sheets
        const response = await fetch(url);
        if (!response.ok) throw new Error("Erro na rede.");

        const data = await response.json();

        // Mapeia abas para o estado local
        if (data.membros) state.membros = data.membros;
        if (data.servicos) state.servicos = data.servicos;
        if (data.produtos) state.produtos = data.produtos;
        if (data.lancamentos) state.lancamentos = data.lancamentos;
        if (data.vendas) state.vendas = data.vendas;

        saveState();
        renderAll();
        showToast("Planilha sincronizada com sucesso!", "success");
    } catch (error) {
        console.error(error);
        showToast("Falha na sincronização. Verifique a URL ou permissões.", "error");
    }
}

async function postToSheets(aba, action, rowData, id = null) {
    const url = state.config.sheetsUrl;
    if (!url) return; // Se não houver planilha configurada, ignora silenciosamente (roda offline)

    try {
        const payload = {
            action: action,
            aba: aba,
            data: rowData
        };
        if (id) payload.id = id;

        // Envia como text/plain para evitar preflight (OPTIONS) de CORS no Apps Script
        const response = await fetch(url, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "text/plain",
            },
            body: JSON.stringify(payload)
        });
        const resJson = await response.json();
        if (resJson.success) {
            console.log("Planilha atualizada via POST:", resJson.message);
        } else {
            console.warn("Planilha retornou aviso:", resJson.message);
        }
    } catch (e) {
        console.error("Falha ao salvar no Google Sheets:", e);
        showToast("Gravado offline. Falha ao enviar para Planilha Google.", "info");
    }
}

// --- NOTIFICATIONS & TOASTS ---
function showToast(message, type = "info") {
    // Remove toast anterior se houver
    const prevToast = document.querySelector(".toast-msg");
    if (prevToast) prevToast.remove();

    const toast = document.createElement("div");
    toast.className = `toast-msg toast-${type}`;

    let iconName = "info";
    if (type === "success") iconName = "check-circle";
    if (type === "error") iconName = "alert-circle";

    toast.innerHTML = `
        <i data-lucide="${iconName}" class="icon-${type === 'success' ? 'green' : type === 'error' ? 'red' : 'cyan'}"></i>
        <span class="toast-text">${message}</span>
    `;

    document.body.appendChild(toast);
    lucide.createIcons();

    setTimeout(() => {
        toast.style.animation = "fadeOut 0.3s forwards";
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

// --- EVENT HANDLERS ---
function setupEventHandlers() {
    // 1. Navigation Tabs Swapping
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach(item => {
        item.addEventListener("click", () => {
            const target = item.getAttribute("data-target");
            switchTab(target);
        });
    });

    // 2. Launch FAB floating button
    document.getElementById("quick-action-fab").addEventListener("click", () => {
        openModal("modal-launcher");
    });

    // 3. Segmented control for launcher (Serviço vs Venda de Produto)
    document.getElementById("segment-service").addEventListener("click", () => {
        toggleLauncherSegment("service");
    });
    document.getElementById("segment-product").addEventListener("click", () => {
        toggleLauncherSegment("product");
    });

    // 4. Modal Closures
    const closeBtns = document.querySelectorAll(".close-modal-btn");
    closeBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const modal = e.currentTarget.closest(".modal-backdrop");
            if (modal) closeModal(modal.id);
        });
    });

    // 5. Success Screen Closure
    document.getElementById("close-success-btn").addEventListener("click", () => {
        document.getElementById("success-screen").classList.add("hidden");
    });

    // 6. Settings Modal Open
    document.getElementById("open-settings-btn").addEventListener("click", () => {
        // Pre-fill settings inputs
        document.getElementById("settings-sheets-url").value = state.config.sheetsUrl || "";
        document.getElementById("settings-stock-limit").value = state.config.limiteEstoqueBaixo || 3;

        // Popular seletor de roles
        const selectRole = document.getElementById("settings-role-select");
        selectRole.innerHTML = `
            <option value="admin">Administrador (Fernando)</option>
            <option value="m-6">Gestor (Lucas)</option>
        `;
        state.membros.forEach(m => {
            if (m.status === "ativo" && m.cargo === "barbeiro") {
                selectRole.innerHTML += `<option value="${m.id}">${m.nome} (Barbeiro)</option>`;
            }
        });
        selectRole.value = state.config.activeUserId;

        openModal("modal-settings");
    });

    // 7. Settings Save / Role switcher change
    document.getElementById("settings-role-select").addEventListener("change", (e) => {
        state.config.activeUserId = e.target.value;
        saveState();
        renderAll();
        showToast("Nível de acesso alterado!", "info");
    });

    document.getElementById("settings-sheets-url").addEventListener("change", (e) => {
        state.config.sheetsUrl = e.target.value.trim();
        saveState();
    });

    document.getElementById("settings-stock-limit").addEventListener("change", (e) => {
        state.config.limiteEstoqueBaixo = parseInt(e.target.value) || 3;
        saveState();
        renderAll();
    });

    // 8. Sincronização Google Sheets
    document.getElementById("sync-sheets-btn").addEventListener("click", () => {
        syncWithGoogleSheets();
    });

    // 9. Demo Actions
    document.getElementById("demo-load-btn").addEventListener("click", () => {
        if (confirm("Deseja resetar o banco de dados local para os dados de teste iniciais?")) {
            resetToSeed();
            renderAll();
            closeModal("modal-settings");
            showToast("Dados de demonstração restaurados!", "success");
        }
    });

    document.getElementById("demo-clear-btn").addEventListener("click", () => {
        if (confirm("ATENÇÃO: Deseja apagar TODOS os registros locais da barbearia?")) {
            state.membros = [];
            state.servicos = [];
            state.produtos = [];
            state.lancamentos = [];
            state.vendas = [];
            saveState();
            renderAll();
            closeModal("modal-settings");
            showToast("Todos os dados foram apagados.", "error");
        }
    });

    // 10. Dashboard Period Selection
    document.getElementById("dashboard-period").addEventListener("change", () => {
        renderDashboard();
    });
    document.getElementById("dashboard-date-start").addEventListener("change", () => renderDashboard());
    document.getElementById("dashboard-date-end").addEventListener("change", () => renderDashboard());

    // 10b. Dashboard Timeline Metric Selection
    const timelineMetricSelect = document.getElementById("timeline-metric-select");
    if (timelineMetricSelect) {
        timelineMetricSelect.addEventListener("change", () => {
            renderDashboard();
        });
    }

    // 11. Manager Period Selection
    document.getElementById("manager-period-select").addEventListener("change", () => {
        renderBarberMenu();
    });
    document.getElementById("manager-date-start").addEventListener("change", () => renderBarberMenu());
    document.getElementById("manager-date-end").addEventListener("change", () => renderBarberMenu());

    // 11b. Barber Period Selection
    document.getElementById("barber-period-select").addEventListener("change", () => {
        renderBarberMenu();
    });
    document.getElementById("barber-date-start").addEventListener("change", () => renderBarberMenu());
    document.getElementById("barber-date-end").addEventListener("change", () => renderBarberMenu());

    // 11c. Close Collaborator History Modal
    document.getElementById("close-staff-history-btn").addEventListener("click", () => {
        closeModal("modal-staff-history");
    });

    // 12. Search inputs
    document.getElementById("service-search-input").addEventListener("input", (e) => {
        renderServices(e.target.value);
    });

    document.getElementById("product-search-input").addEventListener("input", (e) => {
        renderProducts(e.target.value);
    });

    // 13. CRUD: Novo Serviço Modal Open
    document.getElementById("add-service-btn").addEventListener("click", () => {
        document.getElementById("service-modal-title").textContent = "Novo Serviço";
        document.getElementById("service-edit-id").value = "";
        document.getElementById("form-service").reset();
        openModal("modal-service");
    });

    // 14. CRUD: Novo Produto Modal Open
    document.getElementById("add-product-btn").addEventListener("click", () => {
        document.getElementById("product-modal-title").textContent = "Novo Produto";
        document.getElementById("product-edit-id").value = "";
        document.getElementById("form-product").reset();
        openModal("modal-product");
    });

    // 15. CRUD: Novo Membro Modal Open
    document.getElementById("add-member-btn").addEventListener("click", () => {
        document.getElementById("member-modal-title").textContent = "Novo Colaborador";
        document.getElementById("member-edit-id").value = "";
        document.getElementById("form-member").reset();
        document.getElementById("member-admissao").value = new Date().toISOString().split('T')[0];
        openModal("modal-member");
    });

    // 16. Form Submission: Lançar Serviço
    document.getElementById("form-launch-service").addEventListener("submit", (e) => {
        e.preventDefault();
        submitLaunchService();
    });

    // 17. Form Submission: Vender Produto
    document.getElementById("form-launch-sale").addEventListener("submit", (e) => {
        e.preventDefault();
        submitLaunchSale();
    });

    // 18. Form Submission: Cadastrar/Editar Membro
    document.getElementById("form-member").addEventListener("submit", (e) => {
        e.preventDefault();
        submitMemberForm();
    });

    // 19. Form Submission: Cadastrar/Editar Serviço
    document.getElementById("form-service").addEventListener("submit", (e) => {
        e.preventDefault();
        submitServiceForm();
    });

    // 20. Form Submission: Cadastrar/Editar Produto
    document.getElementById("form-product").addEventListener("submit", (e) => {
        e.preventDefault();
        submitProductForm();
    });

    // 21. Form Submission: Login
    const formLogin = document.getElementById("form-login");
    if (formLogin) {
        formLogin.addEventListener("submit", (e) => {
            e.preventDefault();
            submitLoginForm();
        });
    }

    // 22. Header Button: Logout
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            logoutUser();
        });
    }
}

function switchTab(viewId) {
    const views = document.querySelectorAll(".view-tab");
    views.forEach(view => view.classList.remove("active"));

    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach(item => item.classList.remove("active"));

    const targetView = document.getElementById(viewId);
    if (targetView) targetView.classList.add("active");

    const targetNav = document.querySelector(`.nav-item[data-target="${viewId}"]`);
    if (targetNav) targetNav.classList.add("active");

    // Recalcula dados da aba ao entrar
    if (viewId === "view-dashboard") renderDashboard();
    if (viewId === "view-services") renderServices();
    if (viewId === "view-products") renderProducts();
    if (viewId === "view-barber-menu") renderBarberMenu();
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove("hidden");

        // Se for o modal de lançamento, preenche os seletores dinamicamente
        if (modalId === "modal-launcher") {
            prefillLauncherOptions();
        }
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add("hidden");
}

function toggleLauncherSegment(segment) {
    const serviceBtn = document.getElementById("segment-service");
    const productBtn = document.getElementById("segment-product");
    const serviceForm = document.getElementById("form-launch-service");
    const saleForm = document.getElementById("form-launch-sale");

    if (segment === "service") {
        serviceBtn.classList.add("active");
        productBtn.classList.remove("active");
        serviceForm.classList.remove("hidden");
        saleForm.classList.add("hidden");
    } else {
        serviceBtn.classList.remove("active");
        productBtn.classList.add("active");
        serviceForm.classList.add("hidden");
        saleForm.classList.remove("hidden");
    }
}

// Preenche opções nos selects de lançamentos
function prefillLauncherOptions() {
    const selectBarberService = document.getElementById("launch-service-barber");
    const selectBarberSale = document.getElementById("launch-sale-barber");
    const selectService = document.getElementById("launch-service-item");
    const selectProduct = document.getElementById("launch-sale-product");

    // Seleciona barbeiros ativos (oculta administradores das opções de lançamentos)
    const activeBarbers = state.membros.filter(m => m.status === "ativo" && m.cargo !== "admin");

    let barbersHtml = "";
    activeBarbers.forEach(b => {
        barbersHtml += `<option value="${b.id}">${b.nome}</option>`;
    });

    selectBarberService.innerHTML = barbersHtml;
    selectBarberSale.innerHTML = barbersHtml;

    // Se o usuário logado for um barbeiro, seleciona automaticamente ele como padrão
    if (state.config.activeUserId !== "gestor") {
        selectBarberService.value = state.config.activeUserId;
        selectBarberSale.value = state.config.activeUserId;

        // Se for barbeiro normal, oculta/trava opção de lançar para outros se exigido, mas deixa selecionar.
        // O PRD diz: "Cada barbeiro pode lançar seus próprios serviços, e que o gerente pode lançar para qualquer barbeiro"
        // Para simplificar, pré-selecionamos o barbeiro logado.
    }

    // Seleciona serviços ativos
    let servicesHtml = '<option value="">-- Selecione o Serviço --</option>';
    state.servicos.filter(s => s.ativo).forEach(s => {
        servicesHtml += `<option value="${s.id}" data-price="${s.valor_base}">${s.nome} (R$ ${s.valor_base.toFixed(2)})</option>`;
    });
    selectService.innerHTML = servicesHtml;

    // Seleciona produtos ativos e em estoque
    let productsHtml = '<option value="">-- Selecione o Produto --</option>';
    state.produtos.filter(p => p.ativo).forEach(p => {
        const stockText = p.estoque <= 0 ? " (SEM ESTOQUE)" : ` (Estoque: ${p.estoque})`;
        productsHtml += `<option value="${p.id}" data-price="${p.preco_venda}" ${p.estoque <= 0 ? 'disabled' : ''}>${p.nome} - R$ ${p.preco_venda.toFixed(2)}${stockText}</option>`;
    });
    selectProduct.innerHTML = productsHtml;

    // Preenche data e hora atual no formato datetime-local
    const now = new Date();
    const pad = (n) => n.toString().padStart(2, '0');
    const localDateTime = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;

    document.getElementById("launch-service-date").value = localDateTime;
    document.getElementById("launch-sale-date").value = localDateTime;

    // Reseta valores customizados
    document.getElementById("launch-service-custom-price").value = "";
    document.getElementById("launch-service-qty").value = 1;
    document.getElementById("launch-sale-qty").value = 1;
    document.getElementById("launch-service-obs").value = "";
    document.getElementById("launch-sale-obs").value = "";
}

// --- RENDER FUNCTIONS ---

function renderAll() {
    updateActiveProfileHeader();
    renderDashboard();
    renderServices();
    renderProducts();
    renderBarberMenu();
}

function updateActiveProfileHeader() {
    const profileNameEl = document.getElementById("active-profile-name");
    const navText = document.getElementById("nav-barber-text");
    const settingsBtn = document.getElementById("open-settings-btn");
    const navBarber = document.getElementById("nav-barber-menu");

    const activeId = state.config.activeUserId;
    const currentUser = state.membros.find(m => m.id === activeId || (activeId === "admin" && m.cargo === "admin") || (activeId === "gestor" && m.cargo === "gerente"));

    if (activeId === "admin" || (currentUser && currentUser.cargo === "admin")) {
        const name = currentUser ? currentUser.nome : "Administrador";
        profileNameEl.textContent = `${name} (Administrador)`;
        if (navText) navText.textContent = "Equipe";
        if (settingsBtn) settingsBtn.classList.remove("hidden");
        if (navBarber) navBarber.classList.remove("hidden");
    } else if (activeId === "gestor" || (currentUser && currentUser.cargo === "gerente")) {
        const name = currentUser ? currentUser.nome : "Gestor";
        profileNameEl.textContent = `${name} (Gestor)`;
        if (navText) navText.textContent = "Equipe";
        if (settingsBtn) settingsBtn.classList.add("hidden");
        if (navBarber) navBarber.classList.remove("hidden");
    } else {
        if (currentUser) {
            profileNameEl.textContent = `${currentUser.nome} (${currentUser.cargo})`;
            if (navText) navText.textContent = "Meu Painel";
            if (settingsBtn) settingsBtn.classList.add("hidden");
        } else {
            profileNameEl.textContent = "Simulação";
            if (settingsBtn) settingsBtn.classList.add("hidden");
        }
    }
}

// Filtra registros pelo período selecionado
function filterByPeriod(records, dateField, period, prefixId = "dashboard") {
    const now = new Date();
    let minDate = new Date();
    let maxDate = new Date();

    if (period === "hoje") {
        minDate.setHours(0, 0, 0, 0);
    } else if (period === "semana") {
        // Pega segunda-feira desta semana
        const day = now.getDay();
        const diff = now.getDate() - day + (day === 0 ? -6 : 1);
        minDate.setDate(diff);
        minDate.setHours(0, 0, 0, 0);
    } else if (period === "mes") {
        minDate.setDate(1);
        minDate.setHours(0, 0, 0, 0);
    } else if (period === "ano") {
        minDate.setMonth(0, 1);
        minDate.setHours(0, 0, 0, 0);
    } else if (period === "custom") {
        const startVal = document.getElementById(`${prefixId}-date-start`).value;
        const endVal = document.getElementById(`${prefixId}-date-end`).value;

        minDate = startVal ? new Date(startVal + "T00:00:00") : new Date(0);
        maxDate = endVal ? new Date(endVal + "T23:59:59") : new Date();

        return records.filter(r => {
            const recordDate = new Date(r[dateField]);
            return recordDate >= minDate && recordDate <= maxDate;
        });
    }

    return records.filter(r => {
        const recordDate = new Date(r[dateField]);
        return recordDate >= minDate && recordDate <= now;
    });
}

function renderDashboard() {
    const period = document.getElementById("dashboard-period").value;

    // Show/hide campos customizados de data
    const customDatesEl = document.getElementById("dashboard-custom-dates");
    if (period === "custom") {
        customDatesEl.classList.remove("hidden");
    } else {
        customDatesEl.classList.add("hidden");
    }

    const activeId = state.config.activeUserId;
    const currentUser = state.membros.find(m => m.id === activeId || (activeId === "admin" && m.cargo === "admin") || (activeId === "gestor" && m.cargo === "gerente"));
    const isGestorOrAdmin = activeId === "admin" || activeId === "gestor" || (currentUser && (currentUser.cargo === "admin" || currentUser.cargo === "gerente"));

    // Filtra lançamentos e vendas ativos (não cancelados)
    let activeLancamentos = state.lancamentos.filter(l => !l.cancelado);
    let activeVendas = state.vendas;

    // Se o barbeiro estiver visualizando, ele só vê os próprios números
    if (!isGestorOrAdmin) {
        activeLancamentos = activeLancamentos.filter(l => l.team_member_id === activeId);
        activeVendas = activeVendas.filter(v => v.team_member_id === activeId);
    }

    const periodLancamentos = filterByPeriod(activeLancamentos, "data_hora", period, "dashboard");
    const periodVendas = filterByPeriod(activeVendas, "data", period, "dashboard");

    // Faturamento de serviços
    let totalServicos = 0;
    periodLancamentos.forEach(l => {
        totalServicos += parseFloat(l.valor) * parseInt(l.quantidade);
    });

    // Faturamento de produtos
    let totalProdutos = 0;
    periodVendas.forEach(v => {
        totalProdutos += parseFloat(v.total);
    });

    const faturamentoTotal = totalServicos + totalProdutos;

    // Custos (comissões e preço de custo de produtos)
    let totalComissoes = 0;

    // Comissão sobre serviços
    periodLancamentos.forEach(l => {
        const barbeiro = state.membros.find(m => m.id === l.team_member_id);
        const taxa = barbeiro ? barbeiro.taxa_comissao : 50;
        totalComissoes += (parseFloat(l.valor) * parseInt(l.quantidade)) * (taxa / 100);
    });

    // Custos de compra e comissões sobre produtos
    let totalCustoProdutos = 0;
    let totalLucroBrutoProdutos = 0;
    periodVendas.forEach(v => {
        const prod = state.produtos.find(p => p.id === v.product_id);
        const custoUnit = prod ? parseFloat(prod.preco_compra || 0) : 0;
        const totalCusto = custoUnit * parseInt(v.quantidade);
        totalCustoProdutos += totalCusto;
        totalLucroBrutoProdutos += (parseFloat(v.total) - totalCusto);

        // Se houver comissão sobre venda de produto (simulamos 10% padrão para o barbeiro que vendeu)
        if (v.team_member_id) {
            totalComissoes += parseFloat(v.total) * 0.10;
        }
    });

    const lucroLiquido = faturamentoTotal - totalComissoes - totalCustoProdutos;

    // Atualiza KPIs na tela
    document.getElementById("kpi-faturamento-total").textContent = formatBRL(faturamentoTotal);
    document.getElementById("kpi-faturamento-sub").textContent = `${periodLancamentos.length} atendimentos + ${periodVendas.length} vendas`;
    document.getElementById("kpi-valor-servicos").textContent = formatBRL(totalServicos);
    document.getElementById("kpi-qtd-servicos").textContent = `${periodLancamentos.length} lançamentos`;
    document.getElementById("kpi-valor-produtos").textContent = formatBRL(totalProdutos);
    document.getElementById("kpi-qtd-produtos").textContent = `${periodVendas.length} produtos vendidos`;
    document.getElementById("kpi-lucro-estimado").textContent = formatBRL(lucroLiquido);

    // Gestor/Gerente Extended Views and KPIs
    const gestorKPIs = document.getElementById("gestor-extended-kpis");
    const gestorSecs = document.getElementById("gestor-sections");

    if (isGestorOrAdmin) {
        if (gestorKPIs) gestorKPIs.classList.remove("hidden");
        if (gestorSecs) gestorSecs.classList.remove("hidden");

        // KPI: Lucro real sobre produtos (faturamento produtos - custo compra)
        document.getElementById("kpi-lucro-produtos").textContent = formatBRL(totalLucroBrutoProdutos);
        document.getElementById("kpi-lucro-produtos-sub").textContent = `${periodVendas.length} produtos vendidos`;

        // KPI: Ticket Médio (Faturamento Total / Lançamentos Atendimentos)
        const ticketMedio = periodLancamentos.length > 0 ? (faturamentoTotal / periodLancamentos.length) : 0;
        document.getElementById("kpi-ticket-medio").textContent = formatBRL(ticketMedio);

        // Renderiza Rendimento por Profissional (Ranking de Barbeiros)
        renderBarberRanking(periodLancamentos, periodVendas);

        // Renderiza Linha do Tempo de Atividades
        renderBusinessTimeline(periodLancamentos, periodVendas);
    } else {
        if (gestorKPIs) gestorKPIs.classList.add("hidden");
        if (gestorSecs) gestorSecs.classList.add("hidden");
    }

    // Ajusta o progresso do anel circular (Meta de R$ 5.000 para hoje, R$ 10.000 semana, R$ 25.000 mês, R$ 200.000 ano)
    let meta = 25000;
    if (period === "hoje") meta = 1500;
    if (period === "semana") meta = 7000;
    if (period === "ano") meta = 150000;

    const percent = Math.min((faturamentoTotal / meta) * 100, 100);

    // Circunferência do círculo (r=70) é 2 * PI * 70 = 439.8
    const circ = 439.8;
    const offset = circ - (percent / 100) * circ;

    const ringBar = document.getElementById("dashboard-progress-ring");
    if (ringBar) {
        ringBar.style.strokeDashoffset = offset;
    }

    renderComparisonGraph(period);
    renderInsights();
}

function renderInsights() {
    const container = document.getElementById("insights-container");
    container.innerHTML = "";

    let insights = [];

    // 1. Alerta de estoque baixo
    const limite = state.config.limiteEstoqueBaixo;
    const produtosBaixos = state.produtos.filter(p => p.ativo && p.estoque <= limite);

    produtosBaixos.forEach(p => {
        const text = p.estoque === 0
            ? `<strong>Alerta de Estoque:</strong> O produto "${p.nome}" acabou!`
            : `<strong>Estoque Baixo:</strong> Restam apenas ${p.estoque} unidades de "${p.nome}".`;
        insights.push({
            type: "warning",
            icon: "alert-triangle",
            text: text
        });
    });

    // 2. Barbeiro Destaque (Faturamento de Serviços no mês atual)
    const activeLancamentos = state.lancamentos.filter(l => !l.cancelado);
    const lancamentosMes = filterByPeriod(activeLancamentos, "data_hora", "mes");

    const faturamentoPorBarbeiro = {};
    lancamentosMes.forEach(l => {
        faturamentoPorBarbeiro[l.team_member_id] = (faturamentoPorBarbeiro[l.team_member_id] || 0) + (parseFloat(l.valor) * parseInt(l.quantidade));
    });

    let topBarbeiroId = null;
    let topFaturamento = 0;
    for (const bId in faturamentoPorBarbeiro) {
        if (faturamentoPorBarbeiro[bId] > topFaturamento) {
            topFaturamento = faturamentoPorBarbeiro[bId];
            topBarbeiroId = bId;
        }
    }

    if (topBarbeiroId && topFaturamento > 0) {
        const barbeiro = state.membros.find(m => m.id === topBarbeiroId);
        if (barbeiro) {
            insights.push({
                type: "success",
                icon: "award",
                text: `<strong>Desempenho:</strong> ${barbeiro.nome} é o destaque do mês com ${formatBRL(topFaturamento)} em serviços!`
            });
        }
    }

    // 3. Insight Informativo Geral
    if (insights.length === 0) {
        insights.push({
            type: "info",
            icon: "sparkles",
            text: "<strong>Tudo em dia!</strong> O estoque está saudável e os lançamentos estão sendo computados em tempo real."
        });
    }

    // Injeta na tela
    insights.forEach(ins => {
        const el = document.createElement("div");
        el.className = `insight-item ${ins.type}`;
        el.innerHTML = `
            <i data-lucide="${ins.icon}" class="insight-icon icon-${ins.type === 'success' ? 'green' : ins.type === 'warning' ? 'red' : 'cyan'}"></i>
            <span>${ins.text}</span>
        `;
        container.appendChild(el);
    });

    lucide.createIcons();
}

function renderServices(searchQuery = "") {
    const container = document.getElementById("services-list-container");
    container.innerHTML = "";

    const filtered = state.servicos.filter(s => {
        if (!s.ativo) return false;
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return s.nome.toLowerCase().includes(q) || s.categoria.toLowerCase().includes(q);
    });

    if (filtered.length === 0) {
        container.innerHTML = `<div class="item-subtitle" style="text-align:center; padding: 20px;">Nenhum serviço encontrado.</div>`;
        return;
    }

    filtered.forEach(s => {
        const card = document.createElement("div");
        card.className = "item-card";

        let iconName = "scissors";
        if (s.categoria === "barba") iconName = "smile"; // Lucide smile ou user
        if (s.categoria === "complementar") iconName = "sparkles";

        card.innerHTML = `
            <div class="item-card-left" onclick="editService('${s.id}')">
                <div class="item-icon-box">
                    <i data-lucide="${iconName}" class="icon-cyan"></i>
                </div>
                <div class="item-details">
                    <span class="item-title">${s.nome}</span>
                    <span class="item-subtitle">${s.descricao}</span>
                    <span class="item-meta">${s.tempo_estimado} min • Categoria: ${s.categoria}</span>
                </div>
            </div>
            <div class="item-card-right">
                <span class="item-price">${formatBRL(s.valor_base)}</span>
                <span class="badge ${s.ativo ? 'badge-green' : 'badge-red'}">${s.ativo ? 'Ativo' : 'Inativo'}</span>
            </div>
        `;
        container.appendChild(card);
    });

    lucide.createIcons();
}

function renderProducts(searchQuery = "") {
    const container = document.getElementById("products-list-container");
    container.innerHTML = "";

    const filtered = state.produtos.filter(p => {
        if (!p.ativo) return false;
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return p.nome.toLowerCase().includes(q) || p.marca.toLowerCase().includes(q);
    });

    if (filtered.length === 0) {
        container.innerHTML = `<div class="item-subtitle" style="text-align:center; padding: 20px;">Nenhum produto encontrado.</div>`;
        return;
    }

    const lowStockLimit = state.config.limiteEstoqueBaixo;

    filtered.forEach(p => {
        const card = document.createElement("div");
        card.className = "item-card";

        const isLowStock = p.estoque <= lowStockLimit;
        const stockBadgeClass = p.estoque === 0
            ? 'badge-red'
            : isLowStock ? 'badge-red' : 'badge-green';
        const stockText = p.estoque === 0 ? "Sem estoque" : `Estoque: ${p.estoque} ${p.unidade}`;

        card.innerHTML = `
            <div class="item-card-left" onclick="editProduct('${p.id}')">
                <div class="item-icon-box">
                    <i data-lucide="package" class="icon-purple"></i>
                </div>
                <div class="item-details">
                    <span class="item-title">${p.nome}</span>
                    <span class="item-subtitle">Marca: ${p.marca} • Categoria: ${p.categoria}</span>
                    <span class="item-meta">Custo: ${formatBRL(p.preco_compra || 0)}</span>
                </div>
            </div>
            <div class="item-card-right">
                <span class="item-price">${formatBRL(p.preco_venda)}</span>
                <span class="badge ${stockBadgeClass}">${stockText}</span>
            </div>
        `;
        container.appendChild(card);
    });

    lucide.createIcons();
}

function renderBarberMenu() {
    const subBarber = document.getElementById("subview-barber-private");
    const subManager = document.getElementById("subview-manager");

    const activeId = state.config.activeUserId;
    const currentUser = state.membros.find(m => m.id === activeId || (activeId === "admin" && m.cargo === "admin") || (activeId === "gestor" && m.cargo === "gerente"));
    const isGestorOrAdmin = activeId === "admin" || activeId === "gestor" || (currentUser && (currentUser.cargo === "admin" || currentUser.cargo === "gerente"));

    if (isGestorOrAdmin) {
        subBarber.classList.add("hidden");
        subManager.classList.remove("hidden");
        renderManagerDashboard();
    } else {
        subBarber.classList.remove("hidden");
        subManager.classList.add("hidden");
        renderBarberDashboard();
    }
}

// RENDER: PAINEL PRIVADO DO BARBEIRO
function renderBarberDashboard() {
    const barberId = state.config.activeUserId;
    const user = state.membros.find(m => m.id === barberId);
    if (!user) return;

    // Inciais do Avatar
    const initials = user.nome.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    document.getElementById("barber-avatar-initials").textContent = initials;
    document.getElementById("barber-profile-name").textContent = user.nome;
    document.getElementById("barber-profile-role").textContent = user.cargo.toUpperCase();

    // Filtra lançamentos e vendas do barbeiro pelo período selecionado
    const period = document.getElementById("barber-period-select").value;

    // Show/hide campos customizados de data do barbeiro
    const customDatesEl = document.getElementById("barber-custom-dates");
    if (period === "custom") {
        customDatesEl.classList.remove("hidden");
    } else {
        customDatesEl.classList.add("hidden");
    }

    const activeLanc = state.lancamentos.filter(l => !l.cancelado && l.team_member_id === barberId);
    const monthLanc = filterByPeriod(activeLanc, "data_hora", period, "barber");

    const activeSales = state.vendas.filter(v => v.team_member_id === barberId);
    const monthSales = filterByPeriod(activeSales, "data", period, "barber");

    // Contadores de Cortes e Vendas
    document.getElementById("barber-stat-cortes").textContent = monthLanc.length;
    document.getElementById("barber-stat-produtos").textContent = monthSales.length;

    // Cálculo da Comissão
    let valorCortes = 0;
    monthLanc.forEach(l => {
        valorCortes += parseFloat(l.valor) * parseInt(l.quantidade);
    });

    let comissaoCortes = valorCortes * (user.taxa_comissao / 100);

    let valorVendas = 0;
    monthSales.forEach(v => {
        valorVendas += parseFloat(v.total);
    });
    // Barbeiros ganham 10% sobre vendas de produtos
    let comissaoVendas = valorVendas * 0.10;

    const comissaoTotal = comissaoCortes + comissaoVendas;
    document.getElementById("barber-commission-amount").textContent = formatBRL(comissaoTotal);

    // Lista de Lançamentos Recentes
    const historyContainer = document.getElementById("barber-personal-history");
    historyContainer.innerHTML = "";

    // Junta lançamentos e vendas para exibir em ordem cronológica reversa
    const items = [];
    monthLanc.forEach(l => {
        const serv = state.servicos.find(s => s.id === l.service_id);
        items.push({
            tipo: "servico",
            nome: serv ? serv.nome : "Serviço",
            data: l.data_hora,
            valor: parseFloat(l.valor) * parseInt(l.quantidade),
            comissao: (parseFloat(l.valor) * parseInt(l.quantidade)) * (user.taxa_comissao / 100),
            desc: `${l.quantidade}x atend. • ${formatDate(l.data_hora)}`
        });
    });

    monthSales.forEach(v => {
        const prod = state.produtos.find(p => p.id === v.product_id);
        items.push({
            tipo: "produto",
            nome: prod ? prod.nome : "Produto",
            data: v.data,
            valor: parseFloat(v.total),
            comissao: parseFloat(v.total) * 0.10,
            desc: `${v.quantidade}x prod. • ${formatDate(v.data)}`
        });
    });

    // Ordena por data decrescente
    items.sort((a, b) => new Date(b.data) - new Date(a.data));

    if (items.length === 0) {
        historyContainer.innerHTML = `<div class="item-subtitle" style="text-align:center; padding: 15px;">Nenhum lançamento no mês.</div>`;
        return;
    }

    // Exibe os top 8 itens
    items.slice(0, 8).forEach(item => {
        const el = document.createElement("div");
        el.className = "item-card";
        el.style.padding = "10px 14px";
        el.innerHTML = `
            <div class="item-card-left">
                <div class="item-icon-box" style="width: 32px; height: 32px;">
                    <i data-lucide="${item.tipo === 'servico' ? 'scissors' : 'package'}" class="${item.tipo === 'servico' ? 'icon-cyan' : 'icon-purple'}" style="width: 14px; height: 14px;"></i>
                </div>
                <div class="item-details">
                    <span class="item-title" style="font-size: 13px;">${item.nome}</span>
                    <span class="item-subtitle" style="font-size: 11px;">${item.desc}</span>
                </div>
            </div>
            <div class="item-card-right">
                <span class="item-price" style="font-size: 13px; color: var(--color-green);">+ ${formatBRL(item.comissao)}</span>
                <span class="item-meta" style="font-size: 10px;">Comissão</span>
            </div>
        `;
        historyContainer.appendChild(el);
    });

    lucide.createIcons();
}

// RENDER: PAINEL DO GESTOR (Visualiza comissão de todos, pagamentos e gerencia equipe)
function renderManagerDashboard() {
    const period = document.getElementById("manager-period-select").value;

    // Show/hide campos customizados de data do gestor
    const customDatesEl = document.getElementById("manager-custom-dates");
    if (period === "custom") {
        customDatesEl.classList.remove("hidden");
    } else {
        customDatesEl.classList.add("hidden");
    }

    const activeLanc = state.lancamentos.filter(l => !l.cancelado);
    const periodLanc = filterByPeriod(activeLanc, "data_hora", period, "manager");

    const periodSales = filterByPeriod(state.vendas, "data", period, "manager");

    // 1. Renderiza lista de pagamentos de comissões por barbeiro
    const payoutContainer = document.getElementById("manager-payout-list");
    payoutContainer.innerHTML = "";

    // Filtra membros que são prestadores (barbeiros, aprendizes, auxiliares) e que não sejam Administradores
    const activeStaff = state.membros.filter(m => m.status === "ativo" && m.cargo !== "apoio" && m.cargo !== "admin");

    activeStaff.forEach(m => {
        const staffLanc = periodLanc.filter(l => l.team_member_id === m.id);
        const staffSales = periodSales.filter(v => v.team_member_id === m.id);

        let valorServicos = 0;
        staffLanc.forEach(l => {
            valorServicos += parseFloat(l.valor) * parseInt(l.quantidade);
        });

        let comissaoServicos = valorServicos * (m.taxa_comissao / 100);

        let valorProdutos = 0;
        staffSales.forEach(v => {
            valorProdutos += parseFloat(v.total);
        });
        let comissaoProdutos = valorProdutos * 0.10;

        const comissaoTotal = comissaoServicos + comissaoProdutos;

        const card = document.createElement("div");
        card.className = "payout-card glass-card";
        card.innerHTML = `
            <div class="payout-top">
                <span class="payout-name">${m.nome} (${m.cargo})</span>
                <span class="payout-amount">${formatBRL(comissaoTotal)}</span>
            </div>
            <div class="payout-actions">
                <span class="payout-stats">${staffLanc.length} cortes • ${staffSales.length} produtos</span>
                <div style="display:flex; gap:8px;">
                    <button class="action-btn-mini" style="padding: 4px 8px; font-size: 11px;" onclick="viewStaffHistory('${m.id}')">
                        <i data-lucide="history" style="width:12px; height:12px;"></i> Histórico
                    </button>
                    <button class="btn-pay-action" onclick="registerPayout('${m.id}', ${comissaoTotal})">
                        Pagar
                    </button>
                </div>
            </div>
        `;
        payoutContainer.appendChild(card);
    });

    // 2. Renderiza lista de equipe cadastrada para edição/exclusão (oculta administradores)
    const teamContainer = document.getElementById("manager-team-list");
    teamContainer.innerHTML = "";

    state.membros.forEach(m => {
        if (m.cargo === "admin") return; // Oculta o administrador da listagem pública de gerenciamento
        const card = document.createElement("div");
        card.className = "item-card";
        card.innerHTML = `
            <div class="item-card-left" onclick="editMember('${m.id}')">
                <div class="item-icon-box">
                    <i data-lucide="user" class="icon-cyan"></i>
                </div>
                <div class="item-details">
                    <span class="item-title">${m.nome}</span>
                    <span class="item-subtitle">Cargo: ${m.cargo} • Comissão: ${m.taxa_comissao}%</span>
                    <span class="item-meta">Admissão: ${formatDateOnly(m.data_admissao)}</span>
                </div>
            </div>
            <div class="item-card-right">
                <span class="badge ${m.status === 'ativo' ? 'badge-green' : 'badge-red'}">${m.status}</span>
                <button class="action-btn-mini" style="margin-top: 4px; padding: 2px 6px; font-size: 10px;" onclick="toggleMemberStatus('${m.id}')">
                    ${m.status === 'ativo' ? 'Inativar' : 'Ativar'}
                </button>
            </div>
        `;
        teamContainer.appendChild(card);
    });

    lucide.createIcons();
}

// --- CORE ACTIONS & SUBMISSIONS ---

// Registrar pagamento simulado
function registerPayout(memberId, amount) {
    const member = state.membros.find(m => m.id === memberId);
    if (!member || amount <= 0) return;

    if (confirm(`Confirmar o repasse de ${formatBRL(amount)} para ${member.nome}?`)) {
        showToast(`Comissão de ${formatBRL(amount)} paga com sucesso para ${member.nome}!`, "success");
        // Em um sistema real, isso registraria uma transação de fluxo de caixa (débito).
    }
}

// Alternar status de colaborador (Inativar sem apagar histórico)
function toggleMemberStatus(id) {
    const m = state.membros.find(x => x.id === id);
    if (!m) return;

    m.status = m.status === "ativo" ? "inativo" : "ativo";
    saveState();
    renderAll();
    showToast(`Status de ${m.nome} alterado para ${m.status}.`, "info");

    // Envia POST para planilha
    postToSheets("Membros", "atualizar_linha", m, m.id);
}

// Submeter Lançamento de Serviço
function submitLaunchService() {
    const selectBarber = document.getElementById("launch-service-barber");
    const selectService = document.getElementById("launch-service-item");
    const qtyInput = document.getElementById("launch-service-qty");
    const customPriceInput = document.getElementById("launch-service-custom-price");
    const dateInput = document.getElementById("launch-service-date");
    const obsInput = document.getElementById("launch-service-obs");

    if (!selectService.value) {
        alert("Por favor, selecione um serviço.");
        return;
    }

    const selectedOption = selectService.options[selectService.selectedIndex];
    const basePrice = parseFloat(selectedOption.getAttribute("data-price"));
    const finalPrice = customPriceInput.value ? parseFloat(customPriceInput.value) : basePrice;

    const entry = {
        id: "l-" + Date.now(),
        team_member_id: selectBarber.value,
        service_id: selectService.value,
        quantidade: parseInt(qtyInput.value) || 1,
        valor: finalPrice,
        data_hora: new Date(dateInput.value).toISOString(),
        observacao: obsInput.value.trim(),
        usuario_id: state.config.activeUserId,
        cancelado: false,
        motivo_cancelamento: ""
    };

    state.lancamentos.push(entry);
    saveState();

    // Sucesso modal feedback
    closeModal("modal-launcher");
    showSuccessScreen("Lançamento de serviço registrado!");

    renderAll();

    // Envia POST para Sheets
    postToSheets("Lancamentos", "adicionar_linha", entry);
}

// Submeter Lançamento de Venda de Produto
function submitLaunchSale() {
    const selectProduct = document.getElementById("launch-sale-product");
    const qtyInput = document.getElementById("launch-sale-qty");
    const selectBarber = document.getElementById("launch-sale-barber");
    const dateInput = document.getElementById("launch-sale-date");
    const obsInput = document.getElementById("launch-sale-obs");

    if (!selectProduct.value) {
        alert("Por favor, selecione um produto.");
        return;
    }

    const prod = state.produtos.find(p => p.id === selectProduct.value);
    if (!prod) return;

    const qty = parseInt(qtyInput.value) || 1;
    if (prod.estoque < qty) {
        alert(`Estoque insuficiente! Apenas ${prod.estoque} unidades disponíveis.`);
        return;
    }

    // Deduz estoque
    prod.estoque -= qty;

    const sale = {
        id: "v-" + Date.now(),
        product_id: selectProduct.value,
        quantidade: qty,
        preco_venda: prod.preco_venda,
        total: prod.preco_venda * qty,
        team_member_id: selectBarber.value,
        data: new Date(dateInput.value).toISOString(),
        observacao: obsInput.value.trim(),
        usuario_id: state.config.activeUserId
    };

    state.vendas.push(sale);
    saveState();

    // Envia movimentação de estoque/produto para Sheets
    postToSheets("Produtos", "atualizar_linha", prod, prod.id);

    // Sucesso modal
    closeModal("modal-launcher");
    showSuccessScreen("Venda de produto registrada e estoque atualizado!");

    renderAll();

    // Envia POST para Sheets
    postToSheets("Vendas", "adicionar_linha", sale);
}

function showSuccessScreen(msg) {
    document.getElementById("success-message").textContent = msg;
    document.getElementById("success-screen").classList.remove("hidden");
}

// CRUD: Salvar Colaborador (Add/Edit)
function submitMemberForm() {
    const id = document.getElementById("member-edit-id").value;
    const nome = document.getElementById("member-nome").value.trim();
    const cpf = document.getElementById("member-cpf").value.trim();
    const telefone = document.getElementById("member-telefone").value.trim();
    const email = document.getElementById("member-email").value.trim();
    const senha = document.getElementById("member-senha").value.trim();
    const cargo = document.getElementById("member-cargo").value;
    const comissao = parseFloat(document.getElementById("member-comissao").value) || 0;
    const admissao = document.getElementById("member-admissao").value;
    const status = document.getElementById("member-status").value;

    const activeId = state.config.activeUserId;
    const currentUser = state.membros.find(m => m.id === activeId || (activeId === "admin" && m.cargo === "admin") || (activeId === "gestor" && m.cargo === "gerente"));
    const isGestor = activeId === "gestor" || (currentUser && currentUser.cargo === "gerente");

    if (isGestor && cargo === "admin") {
        showToast("Gestores não possuem permissão para cadastrar Administradores.", "error");
        return;
    }

    const dataMember = {
        nome, cpf, telefone, email, cargo,
        taxa_comissao: comissao,
        data_admissao: admissao,
        status,
        senha: senha || "123456" // fallback
    };

    if (id) {
        // Edit mode
        const index = state.membros.findIndex(m => m.id === id);
        if (index !== -1) {
            // Se for gestor e o colaborador que está sendo editado for admin, bloqueia
            if (isGestor && state.membros[index].cargo === "admin") {
                showToast("Gestor não possui permissão para editar Administradores.", "error");
                return;
            }
            state.membros[index] = { ...state.membros[index], ...dataMember };
            showToast("Colaborador atualizado!", "success");
            postToSheets("Membros", "atualizar_linha", state.membros[index], id);
        }
    } else {
        // Add mode
        const newMember = {
            id: "m-" + Date.now(),
            user_id: "u-" + Date.now(),
            ...dataMember
        };
        state.membros.push(newMember);
        showToast("Colaborador cadastrado!", "success");
        postToSheets("Membros", "adicionar_linha", newMember);
    }

    saveState();
    closeModal("modal-member");
    renderAll();
}

// CRUD: Salvar Serviço (Add/Edit)
function submitServiceForm() {
    const id = document.getElementById("service-edit-id").value;
    const nome = document.getElementById("service-nome").value.trim();
    const descricao = document.getElementById("service-descricao").value.trim();
    const valor = parseFloat(document.getElementById("service-valor").value) || 0;
    const tempo = parseInt(document.getElementById("service-tempo").value) || 30;
    const categoria = document.getElementById("service-categoria").value;
    const compartilhado = document.getElementById("service-compartilhado").value === "sim";

    const dataService = {
        nome, descricao, valor_base: valor, tempo_estimado: tempo, categoria, ativo: true
    };

    if (id) {
        const index = state.servicos.findIndex(s => s.id === id);
        if (index !== -1) {
            state.servicos[index] = { ...state.servicos[index], ...dataService };
            showToast("Serviço atualizado!", "success");
            postToSheets("Servicos", "atualizar_linha", state.servicos[index], id);
        }
    } else {
        const newService = {
            id: "s-" + Date.now(),
            ...dataService
        };
        state.servicos.push(newService);
        showToast("Serviço cadastrado com sucesso!", "success");
        postToSheets("Servicos", "adicionar_linha", newService);
    }

    saveState();
    closeModal("modal-service");
    renderAll();
}

// CRUD: Salvar Produto (Add/Edit)
function submitProductForm() {
    const id = document.getElementById("product-edit-id").value;
    const nome = document.getElementById("product-nome").value.trim();
    const marca = document.getElementById("product-marca").value.trim();
    const categoria = document.getElementById("product-categoria").value;
    const precoVenda = parseFloat(document.getElementById("product-preco-venda").value) || 0;
    const precoCompra = parseFloat(document.getElementById("product-preco-compra").value) || 0;
    const estoque = parseInt(document.getElementById("product-estoque").value) || 0;
    const unidade = document.getElementById("product-unidade").value;

    const dataProduct = {
        nome, marca, categoria, preco_venda: precoVenda, preco_compra: precoCompra, estoque, unidade, ativo: true
    };

    if (id) {
        const index = state.produtos.findIndex(p => p.id === id);
        if (index !== -1) {
            state.produtos[index] = { ...state.produtos[index], ...dataProduct };
            showToast("Produto atualizado!", "success");
            postToSheets("Produtos", "atualizar_linha", state.produtos[index], id);
        }
    } else {
        const newProduct = {
            id: "p-" + Date.now(),
            ...dataProduct
        };
        state.produtos.push(newProduct);
        showToast("Produto cadastrado com sucesso!", "success");
        postToSheets("Produtos", "adicionar_linha", newProduct);
    }

    saveState();
    closeModal("modal-product");
    renderAll();
}

// --- EDIT HANDLERS (Populate Modals) ---

window.editMember = function (id) {
    const activeId = state.config.activeUserId;
    const currentUser = state.membros.find(m => m.id === activeId || (activeId === "admin" && m.cargo === "admin") || (activeId === "gestor" && m.cargo === "gerente"));
    const isGestorOrAdmin = activeId === "admin" || activeId === "gestor" || (currentUser && (currentUser.cargo === "admin" || currentUser.cargo === "gerente"));

    if (!isGestorOrAdmin) return;
    const m = state.membros.find(x => x.id === id);
    if (!m) return;

    const isGestor = activeId === "gestor" || (currentUser && currentUser.cargo === "gerente");

    // Gestor não pode editar outro Admin
    if (isGestor && m.cargo === "admin") {
        showToast("Gestor não possui permissão para editar Administradores.", "error");
        return;
    }

    document.getElementById("member-modal-title").textContent = "Editar Colaborador";
    document.getElementById("member-edit-id").value = m.id;
    document.getElementById("member-nome").value = m.nome;
    document.getElementById("member-cpf").value = m.cpf;
    document.getElementById("member-telefone").value = m.telefone;
    document.getElementById("member-email").value = m.email;
    document.getElementById("member-senha").value = m.senha || "";

    // Controla opções de cargo para o gestor (ele não pode mudar alguém para Admin)
    const selectCargo = document.getElementById("member-cargo");
    const optionAdmin = selectCargo.querySelector('option[value="admin"]');
    if (isGestor) {
        if (optionAdmin) optionAdmin.disabled = true;
    } else {
        if (optionAdmin) optionAdmin.disabled = false;
    }

    document.getElementById("member-cargo").value = m.cargo;
    document.getElementById("member-comissao").value = m.taxa_comissao;
    document.getElementById("member-admissao").value = m.data_admissao.split('T')[0];
    document.getElementById("member-status").value = m.status;

    openModal("modal-member");
};

window.editService = function (id) {
    const activeId = state.config.activeUserId;
    const currentUser = state.membros.find(m => m.id === activeId || (activeId === "admin" && m.cargo === "admin") || (activeId === "gestor" && m.cargo === "gerente"));
    const isGestorOrAdmin = activeId === "admin" || activeId === "gestor" || (currentUser && (currentUser.cargo === "admin" || currentUser.cargo === "gerente"));

    if (!isGestorOrAdmin) return;
    const s = state.servicos.find(x => x.id === id);
    if (!s) return;

    document.getElementById("service-modal-title").textContent = "Editar Serviço";
    document.getElementById("service-edit-id").value = s.id;
    document.getElementById("service-nome").value = s.nome;
    document.getElementById("service-descricao").value = s.descricao;
    document.getElementById("service-valor").value = s.valor_base;
    document.getElementById("service-tempo").value = s.tempo_estimado;
    document.getElementById("service-categoria").value = s.categoria;
    document.getElementById("service-compartilhado").value = "sim"; // Simplificado

    openModal("modal-service");
};

window.editProduct = function (id) {
    const activeId = state.config.activeUserId;
    const currentUser = state.membros.find(m => m.id === activeId || (activeId === "admin" && m.cargo === "admin") || (activeId === "gestor" && m.cargo === "gerente"));
    const isGestorOrAdmin = activeId === "admin" || activeId === "gestor" || (currentUser && (currentUser.cargo === "admin" || currentUser.cargo === "gerente"));

    if (!isGestorOrAdmin) return;
    const p = state.produtos.find(x => x.id === id);
    if (!p) return;

    document.getElementById("product-modal-title").textContent = "Editar Produto";
    document.getElementById("product-edit-id").value = p.id;
    document.getElementById("product-nome").value = p.nome;
    document.getElementById("product-marca").value = p.marca;
    document.getElementById("product-categoria").value = p.categoria;
    document.getElementById("product-preco-venda").value = p.preco_venda;
    document.getElementById("product-preco-compra").value = p.preco_compra || 0;
    document.getElementById("product-estoque").value = p.estoque;
    document.getElementById("product-unidade").value = p.unidade;

    openModal("modal-product");
};

// --- GESTOR EXTRA RENDERING FUNCTIONS ---

function renderBarberRanking(lancamentos, vendas) {
    const container = document.getElementById("ranking-barbers-container");
    container.innerHTML = "";

    // Mapeia rendimentos de barbeiros (oculta administradores do ranking)
    const rendimentos = {};
    state.membros.forEach(m => {
        if (m.status === "ativo" && m.cargo !== "apoio" && m.cargo !== "admin") {
            rendimentos[m.id] = { nome: m.nome, total: 0 };
        }
    });

    // Faturamento serviços
    lancamentos.forEach(l => {
        if (rendimentos[l.team_member_id]) {
            rendimentos[l.team_member_id].total += parseFloat(l.valor) * parseInt(l.quantidade);
        }
    });

    // Faturamento vendas produtos
    vendas.forEach(v => {
        if (v.team_member_id && rendimentos[v.team_member_id]) {
            rendimentos[v.team_member_id].total += parseFloat(v.total);
        }
    });

    // Converte para array e ordena
    const arr = Object.values(rendimentos).sort((a, b) => b.total - a.total);
    const maxRendimento = arr.length > 0 ? Math.max(...arr.map(r => r.total), 1) : 1;

    if (arr.length === 0) {
        container.innerHTML = `<span class="item-subtitle" style="text-align:center;">Sem rendimentos no período.</span>`;
        return;
    }

    arr.forEach(r => {
        const pct = (r.total / maxRendimento) * 100;
        const el = document.createElement("div");
        el.className = "ranking-item";
        el.innerHTML = `
            <div class="ranking-info">
                <span class="ranking-name">${r.nome}</span>
                <span class="ranking-val">${formatBRL(r.total)}</span>
            </div>
            <div class="ranking-bar-bg">
                <div class="ranking-bar-fill" style="width: ${pct}%"></div>
            </div>
        `;
        container.appendChild(el);
    });
}

function renderBusinessTimeline(lancamentos, vendas) {
    const container = document.getElementById("gestor-business-timeline");
    container.innerHTML = "";

    const items = [];
    lancamentos.forEach(l => {
        const serv = state.servicos.find(s => s.id === l.service_id);
        const m = state.membros.find(x => x.id === l.team_member_id);
        items.push({
            tipo: "servico",
            nome: serv ? serv.nome : "Serviço",
            colaborador: m ? m.nome : "Colaborador",
            data: l.data_hora,
            valor: parseFloat(l.valor) * parseInt(l.quantidade),
            desc: `${l.quantidade}x atend. por ${m ? m.nome : 'desconhecido'}`
        });
    });

    vendas.forEach(v => {
        const prod = state.produtos.find(p => p.id === v.product_id);
        const m = state.membros.find(x => x.id === v.team_member_id);
        items.push({
            tipo: "produto",
            nome: prod ? prod.nome : "Produto",
            colaborador: m ? m.nome : "Colaborador",
            data: v.data,
            valor: parseFloat(v.total),
            desc: `${v.quantidade}x prod. vendido por ${m ? m.nome : 'desconhecido'}`
        });
    });

    // Ordena decrescente por data
    items.sort((a, b) => new Date(b.data) - new Date(a.data));

    if (items.length === 0) {
        container.innerHTML = `<div class="item-subtitle" style="text-align:center; padding: 20px;">Nenhuma atividade no período.</div>`;
        return;
    }

    // Mostra os top 12 lançamentos na timeline
    items.slice(0, 12).forEach(item => {
        const el = document.createElement("div");
        el.className = "timeline-item";
        el.innerHTML = `
            <div class="timeline-icon-wrapper">
                <i data-lucide="${item.tipo === 'servico' ? 'scissors' : 'package'}" class="${item.tipo === 'servico' ? 'icon-cyan' : 'icon-purple'}"></i>
            </div>
            <div class="timeline-body">
                <span class="timeline-title">${item.nome}</span>
                <span class="timeline-desc">${item.desc}</span>
                <span class="timeline-time">${formatDate(item.data)}</span>
            </div>
            <div class="timeline-side">
                <span class="timeline-value text-green">+ ${formatBRL(item.valor)}</span>
            </div>
        `;
        container.appendChild(el);
    });

    lucide.createIcons();
}

function viewStaffHistory(staffId) {
    const member = state.membros.find(m => m.id === staffId);
    if (!member) return;

    document.getElementById("staff-history-title").textContent = `Lançamentos de ${member.nome}`;
    const listEl = document.getElementById("staff-history-list");
    listEl.innerHTML = "";

    const period = document.getElementById("manager-period-select").value;

    const activeLanc = state.lancamentos.filter(l => !l.cancelado && l.team_member_id === staffId);
    const staffLanc = filterByPeriod(activeLanc, "data_hora", period, "manager");

    const activeSales = state.vendas.filter(v => v.team_member_id === staffId);
    const staffSales = filterByPeriod(activeSales, "data", period, "manager");

    const items = [];
    staffLanc.forEach(l => {
        const serv = state.servicos.find(s => s.id === l.service_id);
        items.push({
            tipo: "servico",
            nome: serv ? serv.nome : "Serviço",
            data: l.data_hora,
            valor: parseFloat(l.valor) * parseInt(l.quantidade),
            comissao: (parseFloat(l.valor) * parseInt(l.quantidade)) * (member.taxa_comissao / 100),
            desc: `${l.quantidade}x atend. (${formatDate(l.data_hora)})`
        });
    });

    staffSales.forEach(v => {
        const prod = state.produtos.find(p => p.id === v.product_id);
        items.push({
            tipo: "produto",
            nome: prod ? prod.nome : "Produto",
            data: v.data,
            valor: parseFloat(v.total),
            comissao: parseFloat(v.total) * 0.10,
            desc: `${v.quantidade}x prod. (${formatDate(v.data)})`
        });
    });

    items.sort((a, b) => new Date(b.data) - new Date(a.data));

    if (items.length === 0) {
        listEl.innerHTML = `<div class="item-subtitle" style="text-align:center; padding: 20px;">Nenhuma atividade no período para este colaborador.</div>`;
    } else {
        items.forEach(item => {
            const el = document.createElement("div");
            el.className = "timeline-item";
            el.style.background = "rgba(255, 255, 255, 0.01)";
            el.innerHTML = `
                <div class="timeline-icon-wrapper">
                    <i data-lucide="${item.tipo === 'servico' ? 'scissors' : 'package'}" class="${item.tipo === 'servico' ? 'icon-cyan' : 'icon-purple'}"></i>
                </div>
                <div class="timeline-body">
                    <span class="timeline-title">${item.nome}</span>
                    <span class="timeline-desc">${item.desc}</span>
                    <span class="timeline-time" style="color:var(--color-green);">Comissão: ${formatBRL(item.comissao)}</span>
                </div>
                <div class="timeline-side">
                    <span class="timeline-value">+ ${formatBRL(item.valor)}</span>
                </div>
            `;
            listEl.appendChild(el);
        });
    }

    openModal("modal-staff-history");
    lucide.createIcons();
}

window.viewStaffHistory = viewStaffHistory;

// --- DYNAMIC GRAPH COMPARATIVE (Hoje vs Ontem, Semana vs Semana Passada, Mês vs Mês Anterior) ---

function getPreviousPeriodData(metric, activePeriod) {
    let minDate = new Date();
    let maxDate = new Date();
    const now = new Date();

    if (activePeriod === "hoje") {
        minDate.setDate(now.getDate() - 1);
        minDate.setHours(0, 0, 0, 0);
        maxDate.setDate(now.getDate() - 1);
        maxDate.setHours(23, 59, 59, 999);
    } else if (activePeriod === "semana") {
        const day = now.getDay();
        const diff = now.getDate() - day + (day === 0 ? -6 : 1) - 7;
        minDate.setDate(diff);
        minDate.setHours(0, 0, 0, 0);
        maxDate.setDate(diff + 6);
        maxDate.setHours(23, 59, 59, 999);
    } else if (activePeriod === "mes") {
        minDate.setMonth(now.getMonth() - 1, 1);
        minDate.setHours(0, 0, 0, 0);
        maxDate = new Date(now.getFullYear(), now.getMonth(), 0);
        maxDate.setHours(23, 59, 59, 999);
    } else if (activePeriod === "ano") {
        minDate.setFullYear(now.getFullYear() - 1, 0, 1);
        minDate.setHours(0, 0, 0, 0);
        maxDate.setFullYear(now.getFullYear() - 1, 11, 31);
        maxDate.setHours(23, 59, 59, 999);
    } else {
        const startVal = document.getElementById("dashboard-date-start").value;
        const endVal = document.getElementById("dashboard-date-end").value;
        if (startVal && endVal) {
            const currentStart = new Date(startVal + "T00:00:00");
            const currentEnd = new Date(endVal + "T23:59:59");
            const diffDays = Math.ceil((currentEnd - currentStart) / (1000 * 60 * 60 * 24));
            minDate = new Date(currentStart);
            minDate.setDate(currentStart.getDate() - diffDays);
            maxDate = new Date(currentEnd);
            maxDate.setDate(currentEnd.getDate() - diffDays);
        } else {
            return 0;
        }
    }

    const activeId = state.config.activeUserId;
    const currentUser = state.membros.find(m => m.id === activeId || (activeId === "admin" && m.cargo === "admin") || (activeId === "gestor" && m.cargo === "gerente"));
    const isGestorOrAdmin = activeId === "admin" || activeId === "gestor" || (currentUser && (currentUser.cargo === "admin" || currentUser.cargo === "gerente"));

    let prevLancamentos = state.lancamentos.filter(l => {
        const d = new Date(l.data_hora);
        return !l.cancelado && d >= minDate && d <= maxDate;
    });

    let prevVendas = state.vendas.filter(v => {
        const d = new Date(v.data);
        return d >= minDate && d <= maxDate;
    });

    if (!isGestorOrAdmin) {
        prevLancamentos = prevLancamentos.filter(l => l.team_member_id === activeId);
        prevVendas = prevVendas.filter(v => v.team_member_id === activeId);
    }

    if (metric === "faturamento") {
        let fat = 0;
        prevLancamentos.forEach(l => fat += parseFloat(l.valor) * parseInt(l.quantidade));
        prevVendas.forEach(v => fat += parseFloat(v.total));
        return fat;
    } else if (metric === "servicos") {
        return prevLancamentos.length;
    } else if (metric === "vendas") {
        let prodQty = 0;
        prevVendas.forEach(v => prodQty += parseInt(v.quantidade));
        return prodQty;
    } else if (metric === "lucro") {
        let fat = 0;
        let comissoes = 0;
        let custos = 0;
        prevLancamentos.forEach(l => {
            const valor = parseFloat(l.valor) * parseInt(l.quantidade);
            fat += valor;
            const b = state.membros.find(x => x.id === l.team_member_id);
            comissoes += valor * ((b ? b.taxa_comissao : 50) / 100);
        });
        prevVendas.forEach(v => {
            fat += parseFloat(v.total);
            const prod = state.produtos.find(p => p.id === v.product_id);
            custos += (prod ? parseFloat(prod.preco_compra || 0) : 0) * parseInt(v.quantidade);
            comissoes += parseFloat(v.total) * 0.10;
        });
        return (fat - comissoes - custos);
    }
    return 0;
}

function renderComparisonGraph(period) {
    const metricSelect = document.getElementById("timeline-metric-select");
    const metric = metricSelect ? metricSelect.value : "faturamento";

    const activeId = state.config.activeUserId;
    const currentUser = state.membros.find(m => m.id === activeId || (activeId === "admin" && m.cargo === "admin") || (activeId === "gestor" && m.cargo === "gerente"));
    const isGestorOrAdmin = activeId === "admin" || activeId === "gestor" || (currentUser && (currentUser.cargo === "admin" || currentUser.cargo === "gerente"));

    let activeLanc = state.lancamentos.filter(l => !l.cancelado);
    let activeVendas = state.vendas;

    if (!isGestorOrAdmin) {
        activeLanc = activeLanc.filter(l => l.team_member_id === activeId);
        activeVendas = activeVendas.filter(v => v.team_member_id === activeId);
    }

    const curLanc = filterByPeriod(activeLanc, "data_hora", period, "dashboard");
    const curVendas = filterByPeriod(activeVendas, "data", period, "dashboard");

    let curVal = 0;
    if (metric === "faturamento") {
        curLanc.forEach(l => curVal += parseFloat(l.valor) * parseInt(l.quantidade));
        curVendas.forEach(v => curVal += parseFloat(v.total));
    } else if (metric === "servicos") {
        curVal = curLanc.length;
    } else if (metric === "vendas") {
        curVendas.forEach(v => curVal += parseInt(v.quantidade));
    } else if (metric === "lucro") {
        let fat = 0;
        let comissoes = 0;
        let custos = 0;
        curLanc.forEach(l => {
            const valor = parseFloat(l.valor) * parseInt(l.quantidade);
            fat += valor;
            const b = state.membros.find(x => x.id === l.team_member_id);
            comissoes += valor * ((b ? b.taxa_comissao : 50) / 100);
        });
        curVendas.forEach(v => {
            fat += parseFloat(v.total);
            const prod = state.produtos.find(p => p.id === v.product_id);
            custos += (prod ? parseFloat(prod.preco_compra || 0) : 0) * parseInt(v.quantidade);
            comissoes += parseFloat(v.total) * 0.10;
        });
        curVal = fat - comissoes - custos;
    }

    const prevVal = getPreviousPeriodData(metric, period);
    let diffPercent = 0;
    let trendClass = "trend-up";
    let trendIcon = "trending-up";
    let signStr = "+";

    if (prevVal > 0) {
        diffPercent = ((curVal - prevVal) / prevVal) * 100;
    } else if (curVal > 0) {
        diffPercent = 100;
    }

    if (diffPercent < 0) {
        trendClass = "trend-down";
        trendIcon = "trending-down";
        signStr = "";
    }

    const formatFn = (metric === "faturamento" || metric === "lucro") ? formatBRL : (v) => `${v} unid`;
    const graphContainer = document.getElementById("comparison-graph-container");
    const maxVal = Math.max(curVal, prevVal, 1);
    const curBarPct = (curVal / maxVal) * 100;
    const prevBarPct = (prevVal / maxVal) * 100;

    let periodLabel = "Anterior";
    if (period === "hoje") periodLabel = "Ontem";
    if (period === "semana") periodLabel = "Semana Passada";
    if (period === "mes") periodLabel = "Mês Anterior";
    if (period === "ano") periodLabel = "Ano Passado";

    graphContainer.innerHTML = `
        <div class="comparison-bar-row">
            <div class="comparison-label-row">
                <span>Período Atual</span>
                <span class="comparison-val-bold">${formatFn(curVal)}</span>
            </div>
            <div class="comparison-bar-track">
                <div class="comparison-bar-fill-current" style="width: ${curBarPct}%"></div>
            </div>
        </div>
        <div class="comparison-bar-row">
            <div class="comparison-label-row">
                <span>${periodLabel}</span>
                <span>${formatFn(prevVal)}</span>
            </div>
            <div class="comparison-bar-track">
                <div class="comparison-bar-fill-previous" style="width: ${prevBarPct}%"></div>
            </div>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-top: 4px;">
            <span style="font-size:11px; color:var(--text-muted);">Métricas calculadas do negócio</span>
            <div class="trend-badge ${trendClass}">
                <i data-lucide="${trendIcon}" style="width:12px; height:12px;"></i>
                <span>${signStr}${diffPercent.toFixed(1)}%</span>
            </div>
        </div>
    `;

    lucide.createIcons();
}

// --- AUTHENTICATION & LOGIN FLOW ---

function submitLoginForm() {
    const emailInput = document.getElementById("login-email").value.trim().toLowerCase();
    const passwordInput = document.getElementById("login-password").value.trim();

    const user = state.membros.find(m => m.email.toLowerCase() === emailInput && m.status === "ativo");

    if (user && user.senha === passwordInput) {
        let targetUserId = user.id;

        if (user.cargo === "admin") targetUserId = "admin";
        if (user.cargo === "gerente" && user.id === "m-6") targetUserId = "gestor";

        sessionStorage.setItem("active_user_id", targetUserId);
        state.config.activeUserId = targetUserId;
        document.getElementById("login-screen").classList.add("hidden");
        document.getElementById("form-login").reset();

        const labelRole = user.cargo === "admin" ? "Administrador" : user.cargo === "gerente" ? "Gestor" : "Colaborador";
        showToast(`Bem-vindo, ${user.nome} (${labelRole})!`, "success");

        renderAll();

        if (user.cargo === "barbeiro") {
            switchTab("view-barber-menu");
        } else {
            switchTab("view-dashboard");
        }
        return;
    }

    showToast("E-mail ou senha incorretos ou conta inativa.", "error");
}

function logoutUser() {
    sessionStorage.removeItem("active_user_id");
    state.config.activeUserId = null;
    document.getElementById("login-screen").classList.remove("hidden");
    showToast("Sessão encerrada com sucesso.", "info");
}

// --- UTILITY FORMATTERS ---
function formatBRL(value) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

function formatDate(isoString) {
    const d = new Date(isoString);
    return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
}

function formatDateOnly(isoString) {
    if (!isoString) return "";
    const d = new Date(isoString);
    return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
}

// --- BOOTSTRAP ---
window.onload = initApp;
