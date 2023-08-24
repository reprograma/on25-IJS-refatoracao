function iniciaJogo(){

  if(nivelJogo == 1){
      tempoSegundo = 120;
  }else if(nivelJogo == 2){
    tempoSegundo = 60;
  }else{
    tempoSegundo = 30;
  }

if(nivel_jogo == 2){//2 facil -> 60 segs
    tempo_segundo = 60
}

if(nivel_jogo == 3){//3 dificil -> 30 segs
    tempo_segundo = 30
}

document.getElementById('cronometro').innerHTML = tempo_segundo;//inserindo segundos no span
var qtde_baloes = 80;
//quantidade de baloes


cria_baloes(qtde_baloes);

// imprimir qtde de baloes inteiros

document.getElementById('baloes_inteiros').innerHTML = qtde_baloes;
document.getElementById('baloes_estourados').innerHTML = 0;

contagem_tempo(tempo_segundo + 1)
}


function contagem_tempo(segundos){
  segundos = segundos - 1;

  if (segundos == -1) {
    clearTimeout(timerId); // para a execucao da funcao settimeout
    game_over();
    return false;
  }
  document.getElementById('cronometro').innerHTML = segundos;

  timerId = setTimeout("contagem_tempo("+segundos+")",1000);
}

function game_over(){
   remove_eventos_baloes();
  alert('AAAAAAAAh Acabou o tempo, voce nao conseguiu!')
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

function cria_baloes(qtde_baloes){
for(var i = 1; i<= qtde_baloes; i++){
    var balao = document.createElement("img");
    balao.src = "imagens/balao_azul_pequeno.png";
    balao.style.margin = '12px';
    balao.id = 'b' + i;
    balao.onclick = function () { estourar(this); };

    document.getElementById('cenario').appendChild(balao);
  }
}

function estourar(e){
  var id_balao = e.id;
  document.getElementById(id_balao).setAttribute("onclick","");
document.getElementById(id_balao).src = "imagens/balao_azul_pequeno_estourando.png";
pontuacao(-1);
}

function pontuacao(acao){
var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML;
var baloes_estourados = document.getElementById('baloes_estourados').innerHTML;

  baloesInteiros = parseInt(baloesInteiros);
  baloesEstourados = parseInt(baloesEstourados);

  baloesInteiros = baloesInteiros + acao;
  baloesEstourados = baloesEstourados - acao;

  document.getElementById('baloesInteiros').innerHTML = baloesInteiros;
  document.getElementById('baloesEstourados').innerHTML = baloesEstourados;
  situacaoJogo(baloesInteiros);
}

function situacaoJogo(baloesInteiros) {
  if (baloesInteiros == 0) {
    alert('UUUUHFA ,aha você conseguiu!');
    pararJogo();
  }
}

function pararJogo() {
  clearTimeout(timerId);
  window.location.href = "index.html";
}