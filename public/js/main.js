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
                campo.attr("disabled", true);
                clearInterval(idInterval);
                $("#campo-digitacao__btn--reiniciar").attr("disabled", false);    
                campo.addClass("campo-desativado");
            }
            tempoRestante--;
        }, 1000);
    });
}

function inicializaMarcadores(){
    let frase = $(".frase").text();
    
    campo.on("input", function(){
        let digitado = campo.val();
        let comparavel = frase.substr(0, digitado.length);
    
        if(digitado == comparavel){
            campo.attr("id","campo-certo");
            ("#campo-errado").remove();
        }else{
            campo.attr("id", "campo-errado");    
            ("#campo-certo").remove();
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
    ("#campo-certo").remove();
    ("#campo-errado").remove();
    
    inicializaCronometro();
}   