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

function contagemTempo(segundos) {
  segundos--;

if(nivel_jogo == 3){//3 dificil -> 30 segs
    tempo_segundo = 30
}

document.getElementById('cronometro').innerHTML = tempo_segundo;//inserindo segundos no span
var qtde_baloes = 80;
//quantidade de baloes


cria_baloes(qtde_baloes);

// imprimir qtde de baloes inteiros

document.getElementById('baloesInteiros').innerHTML = qtde_baloes;
document.getElementById('baloesEstourados').innerHTML = 0;

contagem_tempo(tempo_segundo + 1)
}


function contagem_tempo(segundos){
  segundos = segundos - 1;

  if (segundos == -1) {
    clearTimeout(timerId); // para a execucao da funcao settimeout
    game_over();
    return false;
  }
  document.getElementById("cronometro").innerHTML = segundos;
  timerId = setTimeout("contagemTempo(" + segundos + ")", 1000);
}

function gameOver() {
  pararJogo()
  removeEventosBaloes();
  alert("AAAAAAAAh Acabou o tempo, você não conseguiu!");
}

function remove_eventos_baloes() {
    var i = 1; //contado para recuperar balões por id

    //percorre o lementos de acordo com o id e só irá sair do laço quando não houver correspondência com elemento
    while(document.getElementById('b'+i)) {
        //retira o evento onclick do elemnto
        document.getElementById('b'+i).onclick = '';
        i++; //faz a iteração da variávei i
    }
}


function situacao_jogo(baloesInteiros){
  if (baloesInteiros == 0) {
    alert('UUUUHFA ,aha você conseguiu!');
    parar_jogo();


  }
}

function criaBaloes(quantidadeBaloes) {
  const cenario = document.getElementById("cenario");
  for (let i = 1; i <= quantidadeBaloes; i++) {
    let balao = document.createElement("img");
    balao.setAttribute("src", "imagens/balao_azul_pequeno.png");
    balao.classList.add("balaoPequeno");
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
    alert("UUUUFA, você conseguiu!");
    pararJogo();
  }
}

function pararJogo() {
  clearTimeout(timerId);
}
