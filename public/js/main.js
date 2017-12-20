let frase = $(".frase").text();
let tamanho = frase.split(" ").length;

let numeroPalavrasText = $("#informacoes__numero--palavras")
numeroPalavrasText.text(tamanho);

let campo = $("#campo-digitacao");
campo.on("input", function(){
    let numeroCaracteres = campo.val().length;
    let numeroPalavras = campo.val().split(/\S+/).length - 1;

    $("#campo-digitacao__numero--caracteres").text(numeroCaracteres);
    $("#campo-digitacao__numero--palavras").text(numeroPalavras);
});

campo.one("focus", function(){
    let tempoRestante = 15;
    let idInterval = setInterval(function(){    
        $("#informacoes__tempo").text(tempoRestante);    
        if(tempoRestante <= 0){
            campo.attr("disabled", true);
            clearInterval(idInterval);
        }
        tempoRestante--;
    }, 1000);
});
