const ul = document.querySelector('ul');
const input = document.querySelector('input');
const form = document.querySelector('form');

// Função que carrega o conteúdo da API.
async function load() {
  const res = await fetch('http://localhost:3000/')
    .then(data => data.json());
  res.urls.map(({ name, url }) => addElement({ name, url }));
}

load();

function addElement({ name, url }) {
  const li = document.createElement('li');
  const a = document.createElement("a");
  const trash = document.createElement("span");

  a.href = url;
  a.innerHTML = name;
  a.target = "_blank";

  trash.innerHTML = "x";
  trash.onclick = () => removeElement(trash);

  ul.append(li);
  li.append(a);
  li.append(trash);

  // Enviar a URL para o servidor back-end
  sendURLToBackend({ name, url });
}

async function sendURLToBackend({ name, url }) {
  try {
    const response = await fetch('http://localhost:3000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, url })
    });

    if (response.ok) {
      console.log('URL adicionada com sucesso!');
    } else {
      console.log('Erro ao adicionar URL');
    }
  } catch (error) {
    console.error('Erro ao enviar URL para o servidor:', error);
  }
}

function removeElement(element) {
  if (confirm('Tem certeza que deseja deletar?')) {
    element.parentNode.remove();
    const urlToRemove = element.previousSibling.href;
    deleteURLFromBackend(urlToRemove);
  }
}

async function deleteURLFromBackend(urlToRemove) {
  try {
    const response = await fetch(`http://localhost:3000/?del=true&url=${encodeURIComponent(urlToRemove)}`, {
      method: 'POST'
    });

    if (response.ok) {
      console.log('URL removida com sucesso!');
    } else {
      console.log('Erro ao remover URL');
    }
  } catch (error) {
    console.error('Erro ao enviar solicitação de remoção para o servidor:', error);
  }
}

