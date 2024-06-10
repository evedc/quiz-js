/*VARIAVEIS DE CONTROLE DO JOGO*/
let perguntasFeitas = [];


//PERGUNTAS DO JOGO
const perguntas = [
    {
        pergunta: "Qual é o nome completo da personagem interpretada por Jennifer Aniston?",
        respostas: ["Rachel Green", "Rachel Geller", "Rachel Buffay", "Rachel Bing"],
        correta: "resp0"
    },
    {
        pergunta: "Quantas vezes Ross se casou durante a série?",
        respostas: ["Uma vez", "Duas vezes", "Três vezes", "Quatro vezes"],
        correta: "resp2"
    },
    {
        pergunta: "Qual era o nome do café onde os personagens frequentemente se encontravam?",
        respostas: ["Central Park", "Central Perk", "Central Café", "Central Coffee"],
        correta: "resp1"
    },
    {
        pergunta: "Qual é o nome do irmão gêmeo de Phoebe?",
        respostas: ["Frank Buffay Jr.", "Joey Buffay", "David Buffay", "Mike Buffay"],
        correta: "resp0"
    },
];

var qtdPerguntas = perguntas.length - 1;

gerarPergunta(qtdPerguntas);

function gerarPergunta(maxPerguntas) {


    let aleatorio = (Math.random() * maxPerguntas).toFixed();
    aleatorio = Number(aleatorio);
    console.log("A pergunta sorteada foi a:  " + aleatorio);

    if (!perguntasFeitas.includes(aleatorio)) {

        perguntasFeitas.push(aleatorio);

        var p_selecionada = perguntas[aleatorio].pergunta;
        console.log(p_selecionada);

        $("#pergunta").html(p_selecionada);
        $("#pergunta").attr('data-indice', aleatorio);

        for (var i = 0; i < 4; i++) {
            $("#resp" + i).html(perguntas[aleatorio].respostas[i]);
        }

        var pai = $("respostas");
        var botoes = pai.children();
        for (var i = 1; i < botoes.length; i++) {
            pai.append(botoes.eq(Math.floor(Math.random() * botoes.length)));
        }
    } else {
        console.log('A pergunta já foi feita. Sorteando novamente...');
        if (perguntasFeitas.length < qtdPerguntas + 1) {
            return gerarPergunta(maxPerguntas);
        } else {
            console.log('Acabaram as perguntas!');
            $("#quiz").addClass("oculto");
            $("#mensagem").html("Uhuu, você venceu!! Acertou todas as perguntas!");
            $("#status").removeClass("oculto");
        }
    }
}

$(".resposta").click(function () {
    if ($("#quiz").attr("data-status") !== "travado") {

        resetaBotoes();

        $(this).addClass('selecionada');
    }
});

$("#confirm").click(function () {
    var indice = $("#pergunta").attr("data-indice");
    var respCerta = perguntas[indice].correta;
    $(".resposta").each(function () {

        if ($(this).hasClass('selecionada')) {
            var respostaEscolhida = $(this).attr("id");
            if (respCerta == respostaEscolhida) {
                // alert('Parabéns! Você acertou :)');
                proximaPergunta();
            } else {
                // alert('Que pena, você errou! :(')
                $("#quiz").attr("data-status", "travado");
                $("confirm").addClass("oculto");
                $("#" + respCerta).addClass("correta");
                $("#" + respostaEscolhida).removeClass("selecionada");
                $("#" + respostaEscolhida).addClass("errada");

                setTimeout(function () {
                    gameOver();
                }, 4000);
            };

        }
    });

});

function newGame() {
    $("confirm").removeClass("oculto");
    $("#quiz").attr("data-status", "ok");
    perguntasFeitas = [];
    resetaBotoes();
    gerarPergunta(qtdPerguntas);
    $("#quiz").removeClass("oculto");
    $("#status").addClass("oculto");

}

function proximaPergunta() {
    resetaBotoes();
    gerarPergunta(qtdPerguntas);
}
function resetaBotoes() {
    $(".resposta").each(function () {
        if ($(this).hasClass("selecionada")) {
            $(this).removeClass("selecionada");
        }
        if ($(this).hasClass("correta")) {
            $(this).removeClass("correta");
        }
        if ($(this).hasClass("errada")) {
            $(this).removeClass("errada");
        }

    });

}

function gameOver() {
    $("#quiz").addClass("oculto");
    $("#mensagem").html("Game over!");
    $("#status").removeClass("oculto");
}

$("#novoJogo").click(function () {
    newGame();
});