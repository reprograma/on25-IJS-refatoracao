//CRIAR CLASSES SE ACHAR NECESSÁRIO
// DELETAR OS COMENTÁRIOS QUANDO EU ENTENDER !!!

function iniciarJogo(){

    let url = window.location.search,
    nivelJogo = url.replace("?", ""),
    segundos = 0,
    qtdBaloes = 80;

    if(nivelJogo === "1") {
        segundos = 120
    } else if (nivelJogo === "2") {
        segundos = 60
    } else {
        segundos = 30
    }

    document.getElementById('cronometro').innerHTML = segundos; //modifica o valor do id (o cronometro para segundos)

    criarBaloes(qtdBaloes);
    document.getElementById('baloes_inteiros').innerHTML = qtdBaloes;
    document.getElementById('baloes_estourados').innerHTML = 0;

    contagemSegundos(segundos++)
}


function contagemSegundos(segundos){
    segundos = segundos - 1;

    if (segundos === -1) {
        clearTimeout(timerId);
        gameOver();
        return false;
    }

    document.getElementById('cronometro').innerHTML = segundos;

    timerId = setTimeout("contagemSegundos("+segundos+")",1000);
}

function gameOver(){
    removerBaloes();
    alert('AAAAAAAAH! Acabou o tempo, você não conseguiu desta vez!');
}

function removerBaloes() {
    let baloes = 1; //contado para recuperar balões por id

    //percorre o elemento de acordo com o id e só irá sair do laço quando não houver correspondência com elemento
    while(document.getElementById('b'+baloes)) {
        //retira o evento onclick do elemento
        document.getElementById('b'+baloes).onclick = '';
        baloes++;
    }
}

function criarBaloes(qtdBaloes){
    for(let i = 1; i<= qtdBaloes; i++){
        let balao = document.createElement("img");
        balao.src = "imagens/balao_azul_pequeno.png";
	    balao.style.margin = '10px';
        balao.id = 'b'+i;
        balao.onclick = function(){ estourar(this); };

        document.getElementById('cenario').appendChild(balao);
    }
}

function estourar(e){
    let id_balao = e.id;
    document.getElementById(id_balao).setAttribute("onclick","");
    document.getElementById(id_balao).src = "imagens/balao_azul_pequeno_estourando.png";
    pontuacao(-1);
}

function pontuacao(acao){
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

function situacao_jogo(baloes_inteiros){
    if (baloes_inteiros == 0) {
        alert('UHUUUUL! Você conseguiu!');
        parar_jogo();
    }
}

function parar_jogo(){
    clearTimeout(timerId);
}

module.exports = { iniciarJogo };