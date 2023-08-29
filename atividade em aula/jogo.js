function iniciaJogo() {
  const url = window.location.search;
  let nivelJogo = url.replace("?", "");

  let tempoSegundos = 0;

  switch (nivelJogo) {
    case "1":
      tempoSegundos = 120;
      break;
    case "2":
      tempoSegundos = 60;
      break;
    case "3":
      tempoSegundos = 30;
      break;
    default:
      tempoSegundos = 0;
      break;
  }

  document.getElementById("cronometro").innerHTML = tempoSegundos;
  const quantidadeBaloes = 80;

  criaBaloes(quantidadeBaloes);

  document.getElementById("baloesInteiros").innerHTML = quantidadeBaloes;
  document.getElementById("baloesEstourados").innerHTML = 0;

  contagemTempo(tempoSegundos + 1);
}

function contagemTempo(segundos) {
  segundos--;

  if (segundos === -1) {
    clearTimeout(timerId);
    gameOver();
    return false;
  }
  document.getElementById("cronometro").innerHTML = segundos;

  timerId = setTimeout("contagemTempo(" + segundos + ")", 1000);
}

function gameOver() {
  removeEventosBaloes();
  alert("AAAAAAAAh Acabou o tempo, voce nao conseguiu!");
}

function removeEventosBaloes() {
  let i = 1;
  while (document.getElementById("balao" + i)) {
    document.getElementById("balao" + i).onclick = "";
    i++;
  }
}

function criaBaloes(quantidadeBaloes) {
  const modeloBalao = document.getElementById("balaoPequeno");
  for (let i = 1; i <= quantidadeBaloes; i++) {
    const balao = modeloBalao.cloneNode(true);
    balao.id = "balao" + i;
    balao.addEventListener("click", function () {
      estourar(this);
    });
    document.getElementById("cenario").appendChild(balao);
  }
}

function estourar(event) {
  let id_balao = event.id;
  document.getElementById(id_balao).setAttribute("onclick", "");
  document.getElementById(id_balao).src =
    "imagens/balao_azul_pequeno_estourando.png";
  pontuacao(-1);
}

function pontuacao(acao) {
  let baloesInteiros = document.getElementById("baloesInteiros").innerHTML;
  let baloesEstourados = document.getElementById("baloesEstourados").innerHTML;

  baloesInteiros = parseInt(baloesInteiros);
  baloesEstourados = parseInt(baloesEstourados);

  baloesInteiros = baloesInteiros + acao;
  baloesEstourados = baloesEstourados - acao;

  document.getElementById("baloesInteiros").innerHTML = baloesInteiros;
  document.getElementById("baloesEstourados").innerHTML = baloesEstourados;
  resultadoJogo(baloesInteiros);
}

function resultadoJogo(baloesInteiros) {
  if (baloesInteiros === 0) {
    alert("UUUUHFA ,aha você conseguiu!");
    pararJogo();
  }
}

function pararJogo() {
  clearTimeout(timerId);
}
