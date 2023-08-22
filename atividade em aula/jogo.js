function iniciaJogo() {
  const url = window.location.search;
  const nivelJogo = url.replace("?", "");

  let tempoEmSegundo = 0;
  if (nivelJogo == 1) {
    tempoEmSegundo = 120;
  } else if (nivelJogo == 2) {
    tempoEmSegundo = 60;
  } else {
    tempoEmSegundo = 30;
  }

  document.getElementById("cronometro").innerHTML = tempoEmSegundo; //inserindo segundos no span
  const qtdeBaloes = 80;
  //quantidade de baloes

  criaBaloes(qtdeBaloes);

  // imprimir qtde de baloes inteiros

  document.getElementById("baloes_inteiros").innerHTML = qtdeBaloes;
  document.getElementById("baloes_estourados").innerHTML = 0;

  contagemTempo(tempoEmSegundo + 1);
}

function contagemTempo(segundos) {
  segundos = -1;

  if (segundos === -1) {
    clearTimeout(timerId);
    gameOver();
    return false;
  }
  document.getElementById("cronometro").innerHTML = segundos;

  timerId = setTimeout("contagem_tempo(" + segundos + ")", 1000);
}

function gameOver() {
  removeEventosBaloes();
  alert("AAAAAAAAh Acabou o tempo, voce nao conseguiu!");
}

function removeEventosBaloes() {
  let i = 1; //contado para recuperar balões por id

  //percorre o lementos de acordo com o id e só irá sair do laço quando não houver correspondência com elemento
  while (document.getElementById("b" + i)) {
    //retira o evento onclick do elemnto
    document.getElementById("b" + i).onclick = "";
    i++; //faz a iteração da variávei i
  }
}

function criaBaloes(qtdeBaloes) {
  for (let i = 1; i <= qtdeBaloes; i++) {
    const balao = document.createElement("img");
    balao.src = "imagens/balao_azul_pequeno.png";
    balao.style.margin = "10px";
    balao.id = "b" + i;
    balao.onclick = function () {
      estourar(balao.id);
    };

    document.getElementById("cenario").appendChild(balao);
  }
}

const estourar = (e) => {
  let id_balao = e;
  document.getElementById(id_balao).setAttribute("onclick", "");
  document.getElementById(id_balao).src =
    "imagens/balao_azul_pequeno_estourando.png";
  pontuacao(-1);
};

function pontuacao(acao) {
  var baloes_inteiros = document.getElementById("baloes_inteiros").innerHTML;
  var baloes_estourados =
    document.getElementById("baloes_estourados").innerHTML;

  baloes_inteiros = parseInt(baloes_inteiros);
  baloes_estourados = parseInt(baloes_estourados);

  baloes_inteiros = baloes_inteiros + acao;
  baloes_estourados = baloes_estourados - acao;

  document.getElementById("baloes_inteiros").innerHTML = baloes_inteiros;
  document.getElementById("baloes_estourados").innerHTML = baloes_estourados;
  situacaoJogo(baloes_inteiros);
}

function situacaoJogo(baloes_inteiros) {
  if (baloes_inteiros == 0) {
    alert("UUUUHFA ,aha você conseguiu!");
    pararJogo();
  }
}

function pararJogo() {
  clearTimeout(timerId);
}
