let frase = $(".frase").text();
let tamanho = frase.split(" ").length;

let numeroPalavrasText = $("#informacoes__numero--palavras")

numeroPalavrasText.text(tamanho);

console.log(tamanho);