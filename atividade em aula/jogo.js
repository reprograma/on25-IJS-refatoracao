function iniciaJogo() {

  const url = window.location.search;
  let nivelJogo = url.replace("?", "");

  const qtdeBaloes = 80;
  let tempoSegundo = 0;

  switch (nivelJogo) {
    case '1':

      tempoSegundo = 120;
      break;
    case '2':

      tempoSegundo = 60;
      break;
    case '3':

      tempoSegundo = 30;
      break;
    default:
      alert('Fim de jogo');
  }

  document.getElementById('cronometro').innerHTML = tempoSegundo;//inserindo segundos no span

  criaBaloes(qtdeBaloes);

  // imprimir qtde de baloes inteiros

  document.getElementById('baloes_inteiros').innerHTML = qtdeBaloes;
  document.getElementById('baloes_estourados').innerHTML = 0;

  contagemTempo(tempoSegundo + 1)
}


function contagemTempo(segundos) {
  segundos -= 1;

  if (segundos === -1) {
    clearTimeout(timerId); // para a execucao da funcao settimeout
    gameOver();
    return false;
  }
  document.getElementById('cronometro').innerHTML = segundos;

  timerId = setTimeout('contagemTempo(' + segundos + ')', 1000);
}

function gameOver() {
  removeEventosBaloes();
  alert('AAAAAAAAh Acabou o tempo, voce nao conseguiu!')
}

function removeEventosBaloes() {
  var i = 1; //contado para recuperar balões por id

  //percorre o lementos de acordo com o id e só irá sair do laço quando não houver correspondência com elemento
  while (document.getElementById('b' + i)) {
    //retira o evento onclick do elemnto
    document.getElementById('b' + i).onclick = '';
    i++; //faz a iteração da variávei i
  }
}

function criaBaloes(qtdeBaloes) {
  for (var i = 1; i <= qtdeBaloes; i++) {
    var balao = document.createElement('img');
    balao.src = 'imagens/balao_azul_pequeno.png';
    balao.style.margin = '10px';
    balao.id = 'b' + i;
    balao.onclick = function () {
      estourar(this);
    };

    document.getElementById('cenario').appendChild(balao);
  }
}

function estourar(e) {
  var id_balao = e.id;
  document.getElementById(id_balao).setAttribute("onclick", "");
  document.getElementById(id_balao).src = "imagens/balao_azul_pequeno_estourando.png";
  pontuacao(-1);
}

function pontuacao(acao) {
  var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML;
  var baloes_estourados = document.getElementById('baloes_estourados').innerHTML;

  baloes_inteiros = parseInt(baloes_inteiros);
  baloes_estourados = parseInt(baloes_estourados);
  baloes_inteiros = baloes_inteiros + acao;
  baloes_estourados = baloes_estourados - acao;

  document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
  document.getElementById('baloes_estourados').innerHTML = baloes_estourados;
  situacaoJogo(baloes_inteiros);
}

function situacaoJogo(baloes_inteiros) {
  if (baloes_inteiros === 0) {
    alert('UUUUHFA ,aha você conseguiu!');
    pararJogo();
  }
}

function pararJogo() {
  clearTimeout(timerId);
}
