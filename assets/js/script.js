// assets/js/script.js

document.addEventListener('DOMContentLoaded', () => {
    // ... (Mantenha as funções populateValuePropositions, populateList, populateSimpleList inalteradas) ...

    // Função para popular a seção de Propostas de Valor
    function populateValuePropositions() {
        const grid = document.getElementById('value-proposition-grid');
        grid.innerHTML = ''; // Limpa o conteúdo existente

        // Itera sobre os dados de propostas de valor
        data.valuePropositions.forEach((vp, index) => {
            const problemId = `problem-${index}`;
            const solutionId = `solution-${index}`;
            
            // Cria o card do problema
            const problemCard = document.createElement('div');
            problemCard.id = problemId;
            problemCard.className = 'bg-white p-6 rounded-lg shadow-md value-card cursor-pointer transform hover:scale-102'; // Adiciona classes de hover
            problemCard.innerHTML = `
                <h4 class="font-bold text-lg text-rose-600 mb-2">Problema</h4>
                <p class="text-slate-600">${vp.problem}</p>
            `;

            // Cria o card da solução
            const solutionCard = document.createElement('div');
            solutionCard.id = solutionId;
            solutionCard.className = 'bg-white p-6 rounded-lg shadow-md value-card transform hover:scale-102'; // Adiciona classes de hover
            solutionCard.innerHTML = `
                <h4 class="font-bold text-lg text-emerald-600 mb-2">Solução</h4>
                <p class="text-slate-600">${vp.solution}</p>
            `;

            // Adiciona eventos para realçar o card de solução ao passar o mouse sobre o problema
            problemCard.addEventListener('mouseenter', () => {
                document.getElementById(solutionId).style.borderColor = '#10B981'; // Cor verde para a borda
                document.getElementById(solutionId).style.backgroundColor = '#F0FDF4'; // Fundo verde claro
            });
            problemCard.addEventListener('mouseleave', () => {
                document.getElementById(solutionId).style.borderColor = 'transparent';
                document.getElementById(solutionId).style.backgroundColor = 'white';
            });

            // Adiciona os cards ao grid
            grid.appendChild(problemCard);
            grid.appendChild(solutionCard);
        });
    }

    // Função para popular listas com título e ícone
    function populateList(elementId, content) {
        const container = document.getElementById(elementId);
        // Mapeia os itens para criar elementos de lista com ícones
        let listItems = content.items.map(item => `<li class="flex items-start"><span class="mr-2 text-blue-500">▪</span><span>${item}</span></li>`).join('');
        container.innerHTML = `
            <h4 class="text-2xl font-bold text-slate-800 mb-4 flex items-center">
                <span class="text-2xl mr-3">${content.icon}</span> ${content.title}
            </h4>
            <ul class="space-y-3 text-slate-600">${listItems}</ul>
        `;
    }
    
    // Função para popular listas simples (como custos e receitas)
    function populateSimpleList(elementId, items) {
        const container = document.getElementById(elementId);
        // Mapeia os itens para criar elementos de lista simples
        container.innerHTML = items.map(item => `<li class="flex items-start"><span class="mr-2 text-slate-400">▪</span><span>${item}</span></li>`).join('');
    }

    // Chama as funções para popular o conteúdo dinâmico
    populateValuePropositions();
    populateList('key-activities', data.keyActivities);
    populateList('key-resources', data.keyResources);
    populateList('key-partners', data.keyPartners);
    populateList('channels', data.channels);
    populateList('customer-relationships', data.customerRelationships);
    populateSimpleList('cost-structure', data.costStructure);
    populateSimpleList('revenue-streams', data.revenueStreams);

    // Configuração e renderização do gráfico de Segmentos de Clientes
    const ctx = document.getElementById('customerSegmentsChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar', // Tipo de gráfico: barras
        data: {
            labels: data.customerSegments.labels.map(label => label.split(' ')), // Rótulos dos segmentos
            datasets: [{
                label: 'Nível de Foco', // Legenda do dataset
                data: data.customerSegments.data, // Dados do gráfico
                backgroundColor: [ // Cores de fundo das barras
                    'rgba(59, 130, 246, 0.8)', // Azul
                    'rgba(16, 185, 129, 0.8)', // Verde
                    'rgba(249, 115, 22, 0.8)', // Laranja
                    'rgba(139, 92, 246, 0.8)', // Roxo
                    'rgba(234, 179, 8, 0.8)'  // Amarelo
                ],
                borderColor: [ // Cores das bordas das barras
                    'rgb(59, 130, 246)',
                    'rgb(16, 185, 129)',
                    'rgb(249, 115, 22)',
                    'rgb(139, 92, 246)',
                    'rgb(234, 179, 8)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y', // Eixo das barras: horizontal
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false // Esconde a legenda
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return ` Foco: ${context.raw}%`; // Formato do tooltip para o label
                        },
                        title: function(context) {
                            return context[0].label.replace(/,/g, ' '); // Formato do tooltip para o título
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    max: 100, // Escala máxima do eixo X
                    ticks: {
                        callback: function(value) {
                            return value + "%"; // Adiciona "%" aos ticks do eixo X
                        }
                    },
                    grid: {
                        display: false // Remove as linhas de grade do eixo X
                    }
                },
                y: {
                    ticks: {
                        autoSkip: false,
                        font: {
                            size: 14 // Aumenta o tamanho da fonte dos rótulos do eixo Y
                        }
                    },
                    grid: {
                        color: '#E2E8F0' // Cor da linha de grade do eixo Y
                    }
                }
            }
        }
    });

    // Lógica para o menu mobile
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden'); // Alterna a visibilidade do menu mobile
    });
    
    // Esconde o menu mobile ao clicar em um link
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // Lógica para realçar o link de navegação ativo ao rolar a página
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('main section');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Verifica se a posição de rolagem está dentro da seção atual
            if (pageYOffset >= sectionTop - 100) { // Ajuste de 100px para ativar antes de chegar exatamente no topo
                current = section.getAttribute('id');
            }
        });
        
        // Remove a classe 'active' de todos os links e adiciona ao link da seção atual
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // --- Lógica do Modal de Autenticação ---
    const authModal = document.getElementById('auth-modal');
    const loginButton = document.getElementById('login-button');
    const loginButtonMobile = document.getElementById('login-button-mobile');
    const closeModalButton = document.getElementById('close-modal-button');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const toggleAuthButton = document.getElementById('toggle-auth-button');
    const toggleAuthMessage = document.getElementById('toggle-auth-message');
    const modalTitle = document.getElementById('modal-title');

    // Abre o modal de login
    loginButton.addEventListener('click', () => {
        authModal.classList.remove('hidden');
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
        modalTitle.textContent = 'Entrar';
        toggleAuthMessage.textContent = 'Não tem uma conta?';
        toggleAuthButton.textContent = 'Cadastre-se';
        if (!mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden'); // Fecha o menu mobile se estiver aberto
        }
    });

    loginButtonMobile.addEventListener('click', () => {
        authModal.classList.remove('hidden');
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
        modalTitle.textContent = 'Entrar';
        toggleAuthMessage.textContent = 'Não tem uma conta?';
        toggleAuthButton.textContent = 'Cadastre-se';
        if (!mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden'); // Fecha o menu mobile se estiver aberto
        }
    });

    // Fecha o modal
    closeModalButton.addEventListener('click', () => {
        authModal.classList.add('hidden');
    });

    // Fecha o modal ao clicar fora dele
    authModal.addEventListener('click', (e) => {
        if (e.target === authModal) {
            authModal.classList.add('hidden');
        }
    });

    // Alterna entre formulário de login e cadastro
    toggleAuthButton.addEventListener('click', () => {
        if (loginForm.classList.contains('hidden')) {
            // Ir para Login
            loginForm.classList.remove('hidden');
            registerForm.classList.add('hidden');
            modalTitle.textContent = 'Entrar';
            toggleAuthMessage.textContent = 'Não tem uma conta?';
            toggleAuthButton.textContent = 'Cadastre-se';
        } else {
            // Ir para Cadastro
            loginForm.classList.add('hidden');
            registerForm.classList.remove('hidden');
            modalTitle.textContent = 'Cadastre-se';
            toggleAuthMessage.textContent = 'Já tem uma conta?';
            toggleAuthButton.textContent = 'Entrar';
        }
    });

    // Simulação de envio de formulários
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita o recarregamento da página
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        console.log('Tentativa de Login:', { email, password });
        alert('Login simulado! Email: ' + email + ' Senha: ' + password);
        authModal.classList.add('hidden'); // Fecha o modal após simulação
        loginForm.reset(); // Limpa o formulário
    });

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita o recarregamento da página
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        console.log('Tentativa de Cadastro:', { name, email, password });
        alert('Cadastro simulado! Nome: ' + name + ' Email: ' + email + ' Senha: ' + password);
        authModal.classList.add('hidden'); // Fecha o modal após simulação
        registerForm.reset(); // Limpa o formulário
        // Após cadastrar, pode ser útil redirecionar para o login
        toggleAuthButton.click(); 
    });
});