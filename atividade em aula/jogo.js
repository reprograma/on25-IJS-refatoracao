function iniciaJogo() {
  const url = window.location.search;
  let nivelJogo = url.replace("?", "");

  let tempoSegundos = 0;

  if (nivelJogo === "1") {
    tempoSegundos = 120;
  } else if (nivelJogo === "2") {
    tempoSegundos = 60;
  } else {
    tempoSegundos = 30;
  }

  document.getElementById("cronometro").innerHTML = tempoSegundos;
  const quantidadeBaloes = 80;
  criaBaloes(quantidadeBaloes);
  document.getElementById("baloesInteiros").innerHTML = quantidadeBaloes;
  document.getElementById("baloesEstourados").innerHTML = 0;
  contagemTempo(tempoSegundos + 1);
}

function criaBaloes(quantidadeBaloes) {
  const cenario = document.getElementById("cenario");
  for (let i = 1; i <= quantidadeBaloes; i++) {
    let balao = document.createElement("img");
    balao.setAttribute("src", "imagens/balao_azul_pequeno.png");
    balao.setAttribute("id", `b${i}`);
    balao.addEventListener("click", estourar);
    cenario.appendChild(balao);
  }
}

function estourar(event) {
  this.setAttribute("src", "imagens/balao_azul_pequeno_estourando.png");
  this.removeEventListener("click", estourar);
  pontuacao(-1);
}

function pontuacao(acao) {
  let baloesInteiros = document.getElementById("baloesInteiros").innerHTML;
  let baloesEstourados = document.getElementById("baloesEstourados").innerHTML;

  baloesInteiros = parseInt(baloesInteiros);
  baloesEstourados = parseInt(baloesEstourados);

  baloesInteiros += acao;
  baloesEstourados -= acao;

  document.getElementById("baloesInteiros").innerHTML = baloesInteiros;
  document.getElementById("baloesEstourados").innerHTML = baloesEstourados;
  resultadoJogo(baloesInteiros);
}

function resultadoJogo(baloesInteiros) {
  if (baloesInteiros === 0) {
    youWin();
  }
}

function contagemTempo(segundos) {
  segundos--;
  if (segundos === -1) {
    clearTimeout(timerId);
    gameOver();
    return false;
  }
  document.getElementById("cronometro").innerHTML = segundos;
  timerId = setTimeout(() => contagemTempo(segundos), 1000);
}

function youWin() {
  pararJogo();
  removeEventosBaloes();
  alert("Você ganhou! Conseguiu estourar todos os balões a tempo!");
}

function gameOver() {
  pararJogo();
  removeEventosBaloes();
  alert("Que pena! Você não conseguiu estourar todos os balões a tempo!");
}

function removeEventosBaloes() {
  var i = 1;
  while (document.getElementById(`b${i}`)) {
    const balao = document.getElementById(`b${i}`);
    balao.removeEventListener("click", estourar);
    i++;
  }
}

function pararJogo() {
  clearTimeout(timerId);
}

window.onload = iniciaJogo;
