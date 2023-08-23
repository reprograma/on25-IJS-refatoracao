function iniciaJogo() {
  let url = window.location.search;
  let nivel_jogo = url.replace("?", "");

  const tempo_segundo = nivel_jogo == 1 ? 120 : nivel_jogo == 2 ? 60 : 30;

  document.getElementById("cronometro").innerHTML = tempo_segundo; //inserindo segundos no span
  let qtde_baloes = 80;

  cria_baloes(qtde_baloes);
  document.getElementById("baloes_inteiros").innerHTML = qtde_baloes;
  document.getElementById("baloes_estourados").innerHTML = 0;

  contagem_tempo(tempo_segundo +1);
}

function escolherNivel() {
  var nivel_jogo = document.getElementById("nivel_jogo").value;
  window.location.href = "jogo.html?" + nivel_jogo;
}

function contagem_tempo(segundos) {
  segundos = segundos - 1;

  if (segundos === -1) {
    clearTimeout(timerId); // para a execucao da funcao settimeout
    game_over();
    return false;
  }
  document.getElementById("cronometro").innerHTML = segundos;


  timerId = setTimeout(() => contagem_tempo(segundos), 1000);
}

function game_over() {
  remove_eventos_baloes();
  alert("AAAAAAAAh Acabou o tempo, você não conseguiu!");
}

function remove_eventos_baloes() {
  let i = 1;

  while (document.getElementById("b" + i)) {
    document.getElementById("b" + i).onclick = "";
    i++;
  }
}

function atribuirEvento(balao) {
  balao.onclick = function() {
    estourar(balao);
  };
}

function cria_baloes(qtde_baloes) {
  for (let i = 1; i <= qtde_baloes; i++) {
    const idBalao = "b" + i;
    const balao = document.createElement("img");
    balao.src = "imagens/balao_azul_pequeno.png";
    balao.style.margin = "10px";
    balao.id = idBalao;

    atribuirEvento(balao);

    cenario.appendChild(balao);
  }
}

function estourar(e) {
  e.onclick = null; // sem onclick evita cliques repetidos
  e.src = "imagens/balao_azul_pequeno_estourando.png";
  pontuacao(-1);
}

function pontuacao(acao) {
  let baloes_inteiros = document.getElementById("baloes_inteiros").innerHTML;
  let baloes_estourados =
    document.getElementById("baloes_estourados").innerHTML;

  baloes_inteiros = parseInt(baloes_inteiros);
  baloes_estourados = parseInt(baloes_estourados);

  baloes_inteiros = baloes_inteiros + acao;
  baloes_estourados = baloes_estourados - acao;

  document.getElementById("baloes_inteiros").innerHTML = baloes_inteiros;
  document.getElementById("baloes_estourados").innerHTML = baloes_estourados;
  situacao_jogo(baloes_inteiros);
}

function situacao_jogo(baloes_inteiros) {
  if (baloes_inteiros === 0) {
    alert("UUUUHFA ,aha você conseguiu!");
    parar_jogo();
  }
}

function parar_jogo() {
  clearTimeout(timerId);
}
