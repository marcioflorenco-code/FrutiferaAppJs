//arrow function, onde sua função vai ser direcioada a calcular idade em meses
const calcularIdadeEmMeses = (dataPlantio) => {
    let dataInicial = new Date(dataPlantio);//converte a data de plantio em objeto
    let hoje = new Date();//pega a data atual do sistema
  
    let anos = hoje.getFullYear() - dataInicial.getFullYear();//calcula data atual em anos com a data de plantio
    let meses = hoje.getMonth() - dataInicial.getMonth();//calcula o mes atual com o mes do plantio
  
    return anos * 12 + meses; //(anos * 12) transforma anos em meses , (+ meses) vai soma os meses restantes
  };
  
  
  //arrow fuction , cria e inserir o card na tela
  const insertCard = (especie) => { 
  
    let container = document.getElementById('especiesContainer'); //puxa o container do HTML onde os cards serão inseridos
  
    let idadeMeses = calcularIdadeEmMeses(especie.dataPlantio); //calcula a idade da plantio em meses

  //cria o HTML do card
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
  
    container.insertAdjacentHTML("beforeend", card); //agrupa os cards
  };
  
  //buscar dados no localstorage
  let especies = JSON.parse(localStorage.getItem('especies')) ?? [];
  
  //percorre cada item dentro array
  for (let especie of especies) {
    insertCard(especie);
  }
  
  // capturar formulário
  let especieForm = document.getElementById('especieForm');
  
  //arrow function, onde ela e executada quando o formulário é enviado ,ela e responsavel por controla todo o processo de cadastro
  especieForm.onsubmit = (event) => { 

  //impede o recarregamento da página
    event.preventDefault();

  //captura os valores digitados no formulário
    let identificador = Date.now(); // cria um ID automático
    let nomePopular = document.getElementById('nomePopular').value;
    let nomeCientifico = document.getElementById('nomeCientifico').value;
    let producaoMedia = document.getElementById('producaoMedia').value;
    let dataPlantio = document.getElementById('dataPlantio').value;

  //cria um objeto com os dados
    let especieJson = {
      identificador,
      nomePopular,
      nomeCientifico,
      producaoMedia,
      dataPlantio,
    };
  
    especies.push(especieJson);//adiciona no final do array
  
    localStorage.setItem('especies', JSON.stringify(especies)); //salva no localstorage
  
    insertCard(especieJson); //cria o card na tela
  
    //reseta o formulário
    especieForm.reset();
  
    //funçao e fechar modal
    //puxa o modal
    let modalElement = document.getElementById('especieModal');

    //verifica se já existe um modal ativo
    let modal = bootstrap.Modal.getInstance(modalElement) 
                || new bootstrap.Modal(modalElement);
  
    modal.hide(); // Fecha o modal
  
    //toast de confirmaçao de frutifera cadastrada
    Toastify({
      text: 'FRUTIFERA SALVA COM SUCESSO !!!!!',
      className: 'info',
      style: {
        background: 'linear-gradient(to right, #03b000, #ce1818)',
      },
    }).showToast();
  };

