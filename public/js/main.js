let tempoPadrao = 15; // Variavel criada para facilitar o reset
let tempoRestante = tempoPadrao; //Tempo Restante vai ser incrementada no inicio do jogo
let campo = $("#campo-digitacao");


$(document).ready(function(){
    atualizaTamanhoFrase();
    inicializaCronometro();
    inicializaContadores();
    inicializaMarcadores();
    $("#campo-digitacao__btn--reiniciar").click(reiniciaJogo);
});

function atualizaTamanhoFrase(){
    let frase = $(".frase").text();
    let tamanho = frase.split(" ").length;
    let numeroPalavrasText = $("#informacoes__numero--palavras")
    numeroPalavrasText.text(tamanho);
}

function inicializaContadores(){
    campo.on("input", function(){
        let numeroCaracteres = campo.val().length;
        let numeroPalavras = campo.val().split(/\S+/).length - 1;
    
        $("#campo-digitacao__numero--caracteres").text(numeroCaracteres);
        $("#campo-digitacao__numero--palavras").text(numeroPalavras);
    });
}

function inicializaCronometro(){
    campo.one("focus", function(){
        let idInterval = setInterval(function(){    
            $("#campo-digitacao__btn--reiniciar").attr("disabled", true);
            $("#informacoes__tempo").text(tempoRestante);    
            if(tempoRestante <= 0){
                finalizaJogo(idInterval);
            }
            tempoRestante--;
        }, 1000);
    });
}

function finalizaJogo(idInterval){
    campo.attr("disabled", true);
    clearInterval(idInterval);
    $("#campo-digitacao__btn--reiniciar").attr("disabled", false);    
    campo.addClass("campo-desativado");
    inserePlacar();
}

function inicializaMarcadores(){
    let frase = $(".frase").text();
    
    campo.on("input", function(){
        let digitado = campo.val();
        let comparavel = frase.substr(0, digitado.length);
    
        if(digitado == comparavel){
            campo.attr("id","campo-certo");
            $("#campo-errado").remove();
        }else{
            campo.attr("id", "campo-errado");    
            $("#campo-certo").remove();
        }
    });    
}

$("#campo-digitacao__btn--reiniciar").click(reiniciaJogo);

function reiniciaJogo(){
    campo.val("");
    campo.attr("disabled", false);
    tempoRestante = tempoPadrao;
    
    $("#informacoes__tempo").text(tempoRestante);    
    $("#campo-digitacao__numero--caracteres").text(0);
    $("#campo-digitacao__numero--palavras").text(0);
    $("#campo-digitacao__btn--reiniciar").attr("disabled", true);
    campo.removeClass("campo-desativado");
    $("#campo-certo").removeAttr("id", "campo-certo");
    $("#campo-errado").removeAttr("id", "campo-errado");
    $("textarea").attr("id", "campo-digitacao");
    
    inicializaCronometro();
}   

function inserePlacar(){
    let corpoTabela = $(".placar").find("tbody");
    let nPalavras = $("#campo-digitacao__numero--palavras").text();
    let nCaracteres = $("#campo-digitacao__numero--caracteres").text();
    let usuario = "Eduardo";

    let trLinha = document.createElement("tr");
    let tdLinhaNome = document.createElement("td");
    let tdLinhaPalavras = document.createElement("td");    
    let tdRemover = document.createElement("td");
    let aRemove = document.createElement("a");
    let iRemove = document.createElement("i");
    
    iRemove.classList.add("material-icons");
    iRemove.classList.add("small");
    iRemove.textContent = "delete";

    aRemove.appendChild(iRemove);
    tdRemover.setAttribute("id", "campo-digitacao__botao--remover");
    aRemove.setAttribute("href", "#");

    tdLinhaNome.textContent = usuario;
    tdLinhaPalavras.textContent = nPalavras;
   
    tdRemover.appendChild(aRemove);

    trLinha.appendChild(tdLinhaNome);
    trLinha.appendChild(tdLinhaPalavras);
    trLinha.appendChild(tdRemover);
    
    corpoTabela.prepend(trLinha);

    removerLinha();
}

function removerLinha(){
    $("#campo-digitacao__botao--remover").on("click", function(e){
        e.preventDefault();
        $(this).parent().remove();
    });
}