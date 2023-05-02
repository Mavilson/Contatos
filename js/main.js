let lista = localStorage.getItem("minhaLista");

const formulario = document.querySelector("form");
const ulContatos = document.getElementById("contatos");

if (lista) {
    lista = JSON.parse(lista);
} else {
    lista = [];
}

listar();

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();
    let novaPessoa = new Object();
    novaPessoa.nome = this.nome.value;
    novaPessoa.telefone = this.telefone.value;
    if (this.id.value !== "" && this.id.value >=0) {
        lista[this.id.value] = novaPessoa;
    } else {
        lista.push(novaPessoa);
    }

    this.reset();
    this.id.value = null;

    salvar();

    listar();
})

function listar() {
    ulContatos.innerHTML = "";
    lista.forEach((item,key) => {
        linha = document.createElement('li');

        let botoes = `<button onClick="excluir(${key})">[Excluir]</button>
                      <button onClick="editar(${key})">[Editar]</button>`

        linha.innerHTML = "Nome: " + item.nome + " Telefone: " + item.telefone + botoes;
        ulContatos.appendChild(linha);
    });
}

function excluir(id) {
    formulario.reset();
    lista.splice(id, 1);
    salvar();
    listar();
}

function editar(id) {
    formulario.id.value = id;
    formulario.nome.value = lista[id].nome;
    formulario.telefone.value = lista[id].telefone;
}

function salvar() {
    localStorage.setItem("minhaLista", JSON.stringify(lista));
}