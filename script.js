//Garante a persistência de dados

let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

function salvarLocal() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

//Limpa a lista, verifica se há tarefas e monta a estrutura da tarefa

function listarTarefas(lista = tarefas) {
    const ul = document.getElementById("minhaLista");
    ul.innerHTML = "";

    if (lista.length === 0) {
        let aviso = document.querySelector(".sem-resultados");
        if (!aviso) {
            aviso = document.createElement("p");
            aviso.className = "sem-resultados";
            aviso.textContent = "Nenhuma tarefa encontrada.";
            ul.after(aviso);
        }
        aviso.style.display = "block";
        return;
    }

    const aviso = document.querySelector(".sem-resultados");
    if (aviso) aviso.style.display = "none";

    lista.forEach(tarefa => {
        const indiceReal = tarefas.indexOf(tarefa);
        const li = document.createElement("li");
        if (tarefa.concluido) li.classList.add("marcado");

        li.innerHTML = `
            <span class="primaria">${tarefa.titulo}</span>
            ${tarefa.descricao ? `<span class="descricao">${tarefa.descricao}</span>` : ""}
            <div class="tarefa-rodape">
                ${tarefa.data       ? `<span class="data">Criado em ${tarefa.data}</span>` : ""}
                ${tarefa.prioridade ? `<span class="prioridade prioridade-${tarefa.prioridade}">${capitalizar(tarefa.prioridade)}</span>` : ""}
            </div>
            <div class="grupo-acoes">
                <span class="editar" title="Editar tarefa">✎</span>
                <span class="fechar" title="Excluir tarefa">×</span>
            </div>
        `;

        li.querySelector(".editar").onclick = e => { e.stopPropagation(); editarTarefa(indiceReal); };
        li.querySelector(".fechar").onclick = e => { e.stopPropagation(); excluirTarefa(indiceReal); };

        li.addEventListener("click", e => {
            if (e.target.closest(".grupo-acoes")) return;
            tarefas[indiceReal].concluido = !tarefas[indiceReal].concluido;
            salvarLocal();
            listarTarefas(buscaAtiva());
        });

        ul.appendChild(li);
    });
}

//Adicionar uma tarefa

function submeterTarefa() {
    const titulo = document.getElementById("inputTitulo").value.trim();
    const descricao = document.getElementById("inputDescricao").value.trim();
    const prioridade = document.getElementById("setPrioridade").value;
    const indice = document.getElementById("index").value;

    if (!titulo) { alert("Você precisa escrever um título!"); return; }

    if (indice === "") {
        const data = new Date().toLocaleString("pt-BR", {
            day: "2-digit", month: "2-digit", year: "numeric",
            hour: "2-digit", minute: "2-digit"
        }).replace(",", " às");

        tarefas.push({ titulo, descricao, prioridade, data, concluido: false });
    } 
    else {
        tarefas[indice] = { ...tarefas[indice], titulo, descricao, prioridade };
        document.getElementById("index").value = "";
        document.querySelector("#botaoAdicionar").textContent = "Adicionar";
    }

    salvarLocal();
    listarTarefas();
    limparCampos();
}

//Função de edição e exclusão de tarefa

function editarTarefa(indice) {
    const tarefa = tarefas[indice];
    document.getElementById("inputTitulo").value = tarefa.titulo;
    document.getElementById("inputDescricao").value = tarefa.descricao;
    document.getElementById("setPrioridade").value = tarefa.prioridade;
    document.getElementById("index").value = indice;

    document.querySelector("#botaoAdicionar").textContent = "Salvar edição";
    document.getElementById("inputTitulo").focus();
}

function excluirTarefa(indice) {
    tarefas.splice(indice, 1);
    salvarLocal();
    listarTarefas(buscaAtiva());
}

function limparCampos() {
    ["inputTitulo", "inputDescricao", "setPrioridade"].forEach(id => document.getElementById(id).value = "");
}

//Filtra o array de tarefas pelo título

function buscaAtiva() {
    const termo = document.getElementById("campoBusca").value.trim().toLowerCase();
    return termo ? tarefas.filter(t => t.titulo.toLowerCase().includes(termo)) : tarefas;
}

document.getElementById("campoBusca").addEventListener("input", () => listarTarefas(buscaAtiva()));


//Envia tarefa pressionando enter

document.getElementById("inputTitulo").addEventListener("keypress", e => {
    if (e.key === "Enter") submeterTarefa();
});


//Capitaliza a primeira letra de uma string

function capitalizar(str) {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
}

listarTarefas();
