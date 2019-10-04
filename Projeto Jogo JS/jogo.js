var timerId = null // varialvel que armazena a chamada da funçao timeout

function iniciaJogo(){

	var url = window.location.search;
	
	var nivel_jogo = url.replace("?", "");

	var tempo_segundos = 0;

	if(nivel_jogo == 1){ // 1 facil 120 segundos
		tempo_segundos = 120;
	} 
	if(nivel_jogo == 2){ // 2 normal 60 segundos
		tempo_segundos = 60;
	} 
	if(nivel_jogo == 3){// 3 dificil 30 segundos
		tempo_segundos = 30;
	} 

	// inserindo segundos no span

	document.getElementById('cronometro').innerHTML = tempo_segundos;

	// quantidade de bolões
	var qtde_baloes = 80;
	
	criar_baloes(qtde_baloes);

	//imeprimeir qtd baloes inteiros
	document.getElementById('baloes_inteiros').innerHTML = qtde_baloes;
	document.getElementById('baloes_estourados').innerHTML = 0;

	contagem_tempo(tempo_segundos + 1); // + 1 para sempre começar do valor certo, nao menos

	}

function contagem_tempo(segundos){

	segundos = segundos -1;

	if(segundos == -1 ){
		clearTimeout(timerId);// para a execuça da funçao settimeout
		gamer_over();
		return false;
	}

	document.getElementById('cronometro').innerHTML = segundos;

	timerId = setTimeout("contagem_tempo("+segundos+")", 1000);

}

function gamer_over(){
	remover_eventos_baloes();

	alert("Fim de jogo, voce é muito ruim");
}

function criar_baloes(qtde_baloes){

	for(var i = 1; i <= qtde_baloes; i++){

		var balao = document.createElement("img");
		balao.src = "imagens/balao_azul_pequeno.png";
		balao.style.margin = "10px";
		balao.id = 'b'+i;
		balao.onclick = function(){ estourar(this);}

		document.getElementById("cenario").appendChild(balao);
	}
}
function estourar(e){
	var id_balao = e.id;

	document.getElementById(id_balao).setAttribute("onclick","")
	document.getElementById(id_balao).src = "imagens/balao_azul_pequeno_estourado.png";

	pontuacao(-1);

}

function remover_eventos_baloes(){
	var i = 1; //contado para recuperar balões por id

	//percorre o lementos de acordo com o id e só irá sair do laço quando nã
	while(document.getElementById('b'+i)){
		document.getElementById('b'+i).onclick ="";
		i++;
	}
}

function pontuacao(acao){

	var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML;
	var baloes_estourados = document.getElementById('baloes_estourados').innerHTML;

	baloes_inteiros = parseInt(baloes_inteiros);
	baloes_estourados = parseInt(baloes_estourados);

	baloes_inteiros = baloes_inteiros + acao; // baloes_inteiros + -1
	baloes_estourados = baloes_estourados - acao; // baloes_estourados - -1

	document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
	document.getElementById('baloes_estourados').innerHTML = baloes_estourados;

	situcao_jogo(baloes_inteiros, baloes_estourados);


}

function situcao_jogo(baloes_inteiros, baloes_estourados){
	if(baloes_inteiros == 0){
		alert('ganho');
		parar_jogo();
	}
}

function parar_jogo(){
	clearTimeout(timerId);
}