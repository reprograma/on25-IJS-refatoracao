function iniciaJogo(){
  let url = window.location.search,
  nivelJogo = url.replace("?", ""),
  tempoSegundo = 0;

  const qtdeBaloes = 80;

  switch(parseInt(nivelJogo)){
    case 1:
      tempoSegundo = 120;
      break;
    case 2:
      tempoSegundo = 60;
      break;
    default:
      tempoSegundo = 30;
      break;
  }

  document.getElementById('cronometro').innerHTML = tempoSegundo;

  criaBaloes(qtdeBaloes);

  document.getElementById('baloesInteiros').innerHTML = qtdeBaloes;
  document.getElementById('baloesEstourados').innerHTML = 0;

  contagemTempo(tempoSegundo++);
}


function contagemTempo(segundos){
  segundos--;
  const negativeSeg = -1;

  if (segundos === negativeSeg) {
    clearTimeout(timerId);
    gameOver();
    return false;
  }

  document.getElementById('cronometro').innerHTML = segundos;
  timerId = setTimeout("contagemTempo("+segundos+")",1000);
}

function gameOver(){
  removeEventosBaloes();
  alert('AAAAAAAAh Acabou o tempo, voce nao conseguiu!')
}

function removeEventosBaloes() {
  let i = 1; 
  while(document.getElementById('b'+i)) {
    document.getElementById('b'+i).onclick = '';
    i++;
  }
}

function criaBaloes(qtdeBaloes){
  let balao;

  for(let i = 1; i<= qtdeBaloes; i++){
    balao = document.createElement("img");
    balao.src = "imagens/balao_azul_pequeno.png";
    balao.style.margin = '10px';
    balao.id = 'b'+i;
    balao.onclick = function(){ 
      estourar(this); 
    };

    document.getElementById('cenario').appendChild(balao);
  }
}

function estourar(event){
  let idBalao = event.id;
  document.getElementById(idBalao).setAttribute("onclick","");
  document.getElementById(idBalao).src = "imagens/balao_azul_pequeno_estourando.png";
  pontuacao(-1);
}

function pontuacao(acao){
  let baloesInteiros = document.getElementById('baloesInteiros').innerHTML;
  let baloesEstourados = document.getElementById('baloesEstourados').innerHTML;

  baloesInteiros = parseInt(baloesInteiros) + acao;
  baloesEstourados = parseInt(baloesEstourados) - acao;

  document.getElementById('baloesInteiros').innerHTML = baloesInteiros;
  document.getElementById('baloesEstourados').innerHTML = baloesEstourados;
  situacaoJogo(baloesInteiros);
}

function situacaoJogo(baloesInteiros){
  if (baloesInteiros === 0) {
    alert('UUUUHFA, aha você conseguiu!');
    pararJogo();
  }
}

function pararJogo(){
  clearTimeout(timerId);
}