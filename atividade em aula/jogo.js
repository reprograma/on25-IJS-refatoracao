function iniciarJogo() {

  let url = window.location.search;
  let nivelJogo = url.replace("?", "");

  let tempoSegundos = 0;

  switch (parseInt(nivelJogo)) {
    case 1: tempoSegundos = 120;
      break;
    case 2: tempoSegundos = 60;
      break;
    case 3: tempoSegundos = 30;
      break;
    default: console.log('Número não existe');
  }


  document.getElementById('cronometro').innerHTML = tempoSegundos;
  const qtnBaloes = 80;



  criarBaloes(qtnBaloes);


  document.getElementById('baloes_inteiros').innerHTML = qtnBaloes;
  document.getElementById('baloes_estourados').innerHTML = 0;

  contarTempo(tempoSegundos + 1)

}


function contarTempo(segundos) {
  segundos = segundos - 1;

  if (segundos == -1) {
    clearTimeout(timerId);
    gameOver();
    return false;
  }
  document.getElementById('cronometro').innerHTML = segundos;

  timerId = setTimeout("contarTempo(" + segundos + ")", 1000);
}

function gameOver() {
  removerEventosBalao();
  alert('AAAAAAAAh! Acabou o tempo, você não conseguiu!')
}

function removerEventosBalao() {
  let i = 1;


  while (document.getElementById('b' + i)) {

    document.getElementById('b' + i).onclick = '';
    i++;
  }
}

function criarBaloes(qtnBaloes) {
  for (let i = 1; i <= qtnBaloes; i++) {
    let balao = document.createElement("img");
    balao.src = "imagens/balao_azul_pequeno.png";
    balao.style.margin = '10px';
    balao.id = 'b' + i;
    balao.onclick = function () { estourar(this); };

    document.getElementById('cenario').appendChild(balao);
  }
}

function estourar(e) {
  let id_balao = e.id;
  document.getElementById(id_balao).setAttribute("onclick", "");
  document.getElementById(id_balao).src = "imagens/balao_azul_pequeno_estourando.png";
  pontuacao(-1);
}

function pontuacao(acao) {
  let baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML;
  let baloes_estourados = document.getElementById('baloes_estourados').innerHTML;

  baloes_inteiros = parseInt(baloes_inteiros);
  baloes_estourados = parseInt(baloes_estourados);

  baloes_inteiros = baloes_inteiros + acao;
  baloes_estourados = baloes_estourados - acao;

  document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
  document.getElementById('baloes_estourados').innerHTML = baloes_estourados;
  situacao_jogo(baloes_inteiros);
}

function situacao_jogo(baloes_inteiros) {
  if (baloes_inteiros == 0) {
    alert('UUUUFA! Você conseguiu!');
    parar_jogo();


  }
}


function parar_jogo() {
  clearTimeout(timerId);
}