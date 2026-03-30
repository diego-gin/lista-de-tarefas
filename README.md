# Descrição:
O projeto consiste em uma Lista de tarefas (To-do list) com visual agradável, minimalista e usabilidade fluída promovendo uma boa experiência de uso.

# Tecnologias usadas:
HTML5: Estrutura da página, formulário de cadastro, barra de busca e lista de tarefas.
CSS3: Estilização utilizando variáveis, layout dos componentes e responsividade.
JavaScript: Lógica de aplicação: Adicionar, editar, remover, buscar tarefas e persistência via localStorage.

# Estrutura dos arquivos:
Os arquivos estão estruturados de forma simples, um arquivo index.html, um arquivo style.css e um arquivo script.js.

# Funcionalidades do projeto:
A lista de tarefas contém 3 campos de input: Título da tarefa (obrigatório), descrição da tarefa e seleção de prioridade (baixa, média e alta). Quando criada uma tarefa, ela surge no espaço abaixo em forma de card, contendo, além dos dados principais, o horário de criação e botões de edição e exclusão. Logo acima da seção de tarefas há um campo para filtrar as tarefas por título. Ao clicar em uma tarefa, ela fica marcada, sinalizando que foi completa. O projeto possui visual leve, agradável e animações sutis. O projeto está otimizado para mobile.

# Como os dados são salvos:
Os dados são salvos utilizando o localStorage do navegador. Cada mudança na lista o JSON.stringify converte o array para texto e o salva. Ao carregar a página, o JSON.parse converte o texto para array novamente.

# Como abrir o projeto:
Abrir o arquivo index.html ou acessar via github pages.

# Créditos:
Para o design desse projeto, me inspirei na UI de um jogo Coreano, por isso criei um elemento de texto do lado superior direito, é a tradução de Lista de tarefas para Coreano. Fontes importadas do Google Fonts.
