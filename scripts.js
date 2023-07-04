const ul = document.querySelector('ul')
const input = document.querySelector('input')
const form = document.querySelector('form')
const li = document.createElement('li')

/*
// Não se preocupem com esse pedaço de código comentado! Vamos descomentá-lo quando tivermos acabado de construir a API.

// Função que carrega o conteúdo da API.
async function load() {
    // fetch está como await para evitar que entre num esquema de promisse e só devolva o conteúdo após a iteração qua acontece em seguida.
    const res = await fetch('http://localhost:3000/')
        .then(data => data.json())
    // Iterando no vetor com o conteúdo (JSON) que está vindo da API e adicionando-os no frontend.
    res.urls.map(({name, url}) => addElement({name, url}))
}
load()
*/

function addElement({ name, url }) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = url;
    a.textContent = name;
    li.appendChild(a);
    ul.appendChild(li);

    const button = document.createElement('button'); // Cria um novo elemento de botão <button>
    button.textContent = 'x'; // Define o conteúdo de texto do elemento de botão
    li.appendChild(button); // Adiciona o elemento de botão como filho do elemento de lista

    // Adiciona um ouvinte de eventos ao elemento de botão
    button.addEventListener('click', function() {
        const confirmDelete = confirm('Tem certeza de que deseja remover este elemento?');
        if (confirmDelete) {
            li.remove(); // Remove o elemento de lista correspondente
        }
    });
}



form.addEventListener('submit', (event) => {
    
    event.preventDefault()

    let { value } = input

    if (!value)
        return alert('Preencha o campo!')

    const [name, url] = value.split(',')

    if (!url)
        return alert('O texto não está formatado da maneira correta.')

    if (!/^http/.test(url))
        return alert('Digite a url da maneira correta.')

    addElement({ name, url })

    input.value = ''

})