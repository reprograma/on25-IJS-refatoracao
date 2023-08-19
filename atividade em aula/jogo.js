function iniciaJogo() {
  let 
    url = window.location.search,
    nivelJogo = parseInt(url.replace("?", "")),
    tempoSegundo = 0,
    qtdeBaloes = 80;

  switch(nivelJogo) {
    case 1:
      tempoSegundo = 120;
      break
    case 2:
      tempoSegundo = 60;
      break
    case 3:
      tempoSegundo = 30;
      break
  }

  document.getElementById('cronometro').innerHTML = tempoSegundo;

  criaBaloes(qtdeBaloes);

  document.getElementById('baloesInteiros').innerHTML = qtdeBaloes;
  document.getElementById('baloesEstourados').innerHTML = 0;

  contagemTempo(tempoSegundo + 1);
}


function contagemTempo(segundos) {
  segundos--;

  if (segundos === -1) {
    clearTimeout(timerId);
    gameOver();
    return false;
  }

  document.getElementById('cronometro').innerHTML = segundos;

  timerId = setTimeout(`contagemTempo(${segundos})`,1000);
}

function gameOver() {
  removeEventosBaloes();
  alert('AAAAAAAAh Acabou o tempo, voce nao conseguiu!')
  window.location.reload()
}

function removeEventosBaloes() {
    let i = 1;

    while(document.getElementById('b' + i)) {
      document.getElementById('b' + i).onclick = '';
      i++;
    }
}

function criaBaloes(qtdeBaloes) {
  for(let i = 1; i<= qtdeBaloes; i++){
    let balao = document.createElement("img");
    balao.src = "imagens/balao_azul_pequeno.png";
    balao.style.margin = '12px';
    balao.id = 'b' + i;
    balao.onclick = function(){ estourar(this); };

    document.getElementById('cenario').appendChild(balao);
  }
}

function estourar(e) {
  let idBalao = e.id;

  document.getElementById(idBalao).setAttribute("onclick","");
  document.getElementById(idBalao).src = "imagens/balao_azul_pequeno_estourando.png";
  pontuacao(-1);
}

function pontuacao(acao) {
  let 
    baloesInteiros = document.getElementById('baloesInteiros').innerHTML,
    baloesEstourados = document.getElementById('baloesEstourados').innerHTML;

  baloesInteiros = parseInt(baloesInteiros);
  baloesEstourados = parseInt(baloesEstourados);

  baloesInteiros = baloesInteiros + acao;
  baloesEstourados = baloesEstourados - acao;

  document.getElementById('baloesInteiros').innerHTML = baloesInteiros;
  document.getElementById('baloesEstourados').innerHTML = baloesEstourados;
  situacaoJogo(baloesInteiros);
}

function situacaoJogo(baloesInteiros) {
  if (baloesInteiros === 0) {
    alert('UUUUHFA ,aha você conseguiu!');
    pararJogo();
  }
}

function pararJogo() {
  clearTimeout(timerId);
  window.location.href = 'index.html'
}
