// Conjunto dados para montar dinamicamente as estruras dos cards
import informacoesCards from './dataset/informacao.js';

// arrow function , onde essa função recebe um objeto "informacoesCard"  e monta um card usando template string.
let createInformacoesCard = (informacoesCard) => {
  let card = `<div class="col">
          <div class="card h-100">
            <img src="${informacoesCard.url}" class="card-img-top" style="height: 220px; object-fit: cover;" alt="${informacoesCard.titulo}">
            <div class="card-body  d-flex flex-column">
              <h5 class="card-title">${informacoesCard.titulo}</h5>
              <p class="card-text">${informacoesCard.subtitulo}</p>
              <a href="./cadastro.html" class="btn btn-primary">Consultar</a>
            </div>
          </div>
        </div>`;

  return card;
};

//arrow function,onde essa função recebe o HTML do card já criado
let addInformacaoCard = (card) => {
// Pega o elemento onde os cards serão inseridos
  let informacoesCardsRow = document.getElementById('informacoesCardsRow');

// Adiciona no final, sem apagar o que já existe
  informacoesCardsRow.insertAdjacentHTML('beforeend', card);
};

// arrow function , essa função percorre o array importado
let loadInformacoesCards = () => {
  for (let informacoesCard of informacoesCards) {
    let card = createInformacoesCard(informacoesCard);
    addInformacaoCard(card);
  }
};

// carrega os cards , quando carrega a pagina completa
window.onload = loadInformacoesCards;
