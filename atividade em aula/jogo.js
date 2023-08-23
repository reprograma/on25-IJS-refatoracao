function iniciaJogo(){

var url = window.location.search;
var nivel_jogo = url.replace("?", "");

var tempo_segundo = 0;
switch(parseInt(nivel_jogo)){
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

document.getElementById('cronometro').innerHTML = tempo_segundo;//inserindo segundos no span
const qtde_baloes = 80;
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
    while(document.getElementById('balao'+ i)) {
        //retira o evento onclick do elemnto
        document.getElementById('balao'+ i).onclick = '';
        i++; //faz a iteração da variávei i
    }
}

function cria_baloes(qtde_baloes){
for(var i = 1; i<= qtde_baloes; i++){
    var balao = document.createElement("img");
    balao.src = "imagens/balao_azul_pequeno.png";
	balao.style.margin = '10px';
  balao.id = 'balao'+i;
  balao.onclick = function(){ estourar(this); };

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

  baloes_inteiros = parseInt(baloes_inteiros) + acao;
  baloes_estourados = parseInt(baloes_estourados) + acao;

// baloes_inteiros = baloes_inteiros + acao;
// baloes_estourados = baloes_estourados - acao;

// document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
// document.getElementById('baloes_estourados').innerHTML = baloes_estourados;
  situacao_jogo(baloes_inteiros);
}

function situacao_jogo(baloes_inteiros){
  if (baloes_inteiros == 0) {
    alert('UUUUHFA ,aha você conseguiu!');
    parar_jogo();


  }
}

function parar_jogo(){
  clearTimeout(timerId);
}
