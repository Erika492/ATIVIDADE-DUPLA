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

function addElement({ name, url }) { // Cria um novo elemento de lista <li>
    const li = document.createElement('li')
    const a = document.createElement('a') // Cria um novo elemento de âncora <a>
    a.href = url; // Define o atributo href do elemento de âncora com o valor da variável 'url'
    a.textContent = name // Define o conteúdo de texto do elemento de âncora com o valor da variável 'name'
    li.appendChild(a)// Adiciona o elemento de âncora como filho do elemento de lista
    ul.appendChild(li)// Adiciona o elemento de lista como filho de um elemento 'ul' (pressupõe-se que 'ul' já existe no HTML)
  }
  
  
function removeElement() {
    const li = document.querySelector(`li[data-name="${name}"]`);
    if (li) {
        ul.removeChild(li)
    }
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