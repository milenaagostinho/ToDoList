const inputTarefa = document.querySelector("#novaTarefa"); 
const selectPrioridade = document.querySelector("select.form-select"); 
const botaoAdicionar = document.querySelector("#adicionar"); 
const tabelaBody = document.querySelector("table tbody"); 

let linhaSelecionada = null;

function adicionarTarefa() {
    const tarefa = inputTarefa.value;
    const prioridadeNivel = selectPrioridade.selectedIndex;
    const prioridadeTag = selectPrioridade.options[prioridadeNivel].text;

    if (tarefa == "" || prioridadeNivel == 0) {
        alert(
            "Por favor, preencha uma tarefa e selecione sua prioridade para adicionar uma nova tarefa."
        );
        return;
    }

    const tr = document.createElement("tr");

    const tdTarefa = document.createElement("td");
    tdTarefa.textContent = tarefa;

    const tdPrioridade = document.createElement("td");
    const spanBadge = document.createElement("span");
    spanBadge.textContent = prioridadeTag;

    switch (prioridadeTag) {
        case "Alta":
            spanBadge.classList.add("badge", "bg-danger");
            break;
        case "Média":
            spanBadge.classList.add("badge", "bg-warning", "text-dark");
            break;
        case "Baixa":
            spanBadge.classList.add("badge", "bg-success");
            break;
    }

    tdPrioridade.appendChild(spanBadge);

    const tdConcluir = document.createElement("td");
    const btnConcluir = document.createElement("button");
    btnConcluir.textContent = "Concluir";
    btnConcluir.classList.add("btn", "btn-success");
    tdConcluir.appendChild(btnConcluir);

    tr.appendChild(tdTarefa);
    tr.appendChild(tdPrioridade);
    tr.appendChild(tdConcluir);
    tabelaBody.appendChild(tr);

    btnConcluir.addEventListener("click", () => {
        linhaSelecionada = tr;
        const modal = new bootstrap.Modal(
            document.getElementById("confirmarModal")
        );
        modal.show();
    });

    inputTarefa.value = "";
    selectPrioridade.selectedIndex = 0;
}

document.querySelector("#confirmarConclusao").addEventListener("click", () => {
    if (linhaSelecionada) {
        linhaSelecionada.remove();
        linhaSelecionada = null;
    }

    const audio = document.getElementById("audioEeeee");
    if (audio) {
        audio.currentTime = 0;
        audio.play();
    }

    if (window.confetti) {
        confetti({
            particleCount: 120,
            spread: 90,
            origin: { y: 0.1 },
            startVelocity: 40,
            colors: [
                '#e0b3ff', 
                '#fff6b3', 
                '#b3ffd1', 
                '#ffb3b3', 
                '#a259c4',
                '#ffffff',   
            ],
        });
    }
    const modalEl = bootstrap.Modal.getInstance(
        document.getElementById("confirmarModal")
    );
    modalEl.hide();
});

botaoAdicionar.addEventListener("click", () => {
    adicionarTarefa();
});