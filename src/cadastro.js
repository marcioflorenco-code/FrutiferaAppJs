// Função para calcular idade em meses
const calcularIdadeEmMeses = (dataPlantio) => {
    let dataInicial = new Date(dataPlantio);
    let hoje = new Date();
  
    let anos = hoje.getFullYear() - dataInicial.getFullYear();
    let meses = hoje.getMonth() - dataInicial.getMonth();
  
    return anos * 12 + meses;
  };
  
  // Inserir card no container
  const insertCard = (especie) => {
  
    let container = document.getElementById('especiesContainer');
  
    let idadeMeses = calcularIdadeEmMeses(especie.dataPlantio);
  
    let card = `
      <div class="col-md-4 mb-4">
        <div class="card shadow h-100">
          <div class="card-body">
            <span class="badge bg-secondary mb-2">
                ID: ${especie.identificador}
            </span>
            <h5 class="card-title">${especie.nomePopular}</h5>
            <h6 class="card-subtitle mb-2 text-muted">
              ${especie.nomeCientifico}
            </h6>
            <p class="card-text">
              <strong>Produção:</strong> ${especie.producaoMedia} Kg <br>
              <strong>Plantio:</strong> ${especie.dataPlantio} <br>
              <strong>Idade:</strong> ${idadeMeses} meses
            </p>
          </div>
        </div>
      </div>
    `;
  
    container.insertAdjacentHTML("beforeend", card);
  };
  
  // Buscar dados no LocalStorage
  let especies = JSON.parse(localStorage.getItem('especies')) ?? [];
  
  // Renderizar página
  for (let especie of especies) {
    insertCard(especie);
  }
  
  // Capturar formulário
  let especieForm = document.getElementById('especieForm');
  
  especieForm.onsubmit = (event) => {
    event.preventDefault();
  
    let identificador = Date.now(); // cria um ID automático
    let nomePopular = document.getElementById('nomePopular').value;
    let nomeCientifico = document.getElementById('nomeCientifico').value;
    let producaoMedia = document.getElementById('producaoMedia').value;
    let dataPlantio = document.getElementById('dataPlantio').value;
  
    let especieJson = {
      identificador,
      nomePopular,
      nomeCientifico,
      producaoMedia,
      dataPlantio,
    };
  
    especies.push(especieJson);
  
    localStorage.setItem('especies', JSON.stringify(especies));
  
    insertCard(especieJson);
  
    // Reseta o formulário
    especieForm.reset();
  
    // Fechar modal
    let modalElement = document.getElementById('especieModal');
    let modal = bootstrap.Modal.getInstance(modalElement) 
                || new bootstrap.Modal(modalElement);
  
    modal.hide();
  
    // Toast
    Toastify({
      text: 'FRUTIFERA SALVA COM SUCESSO !!!!!',
      className: 'info',
      style: {
        background: 'linear-gradient(to right, #03b000, #ce1818)',
      },
    }).showToast();
  };