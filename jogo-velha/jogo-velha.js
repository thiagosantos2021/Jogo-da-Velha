const jogador1 = "X" //Indiana-Pacers-logo.png;
const jogador2 = "O" //Memphis-Grizzlies-logo.png;
var jogadorVez = jogador1;
var gameOver = false;

atualizaJogador();
iniciandoQuadrados();

function atualizaJogador() {
    if (gameOver) {
        return;
    }
    if (jogadorVez == jogador1) {
        var jogador = document.querySelectorAll("div#jogadorSelecionado img")[0];
        jogador.setAttribute("src", "Indiana-Pacers-logo.png");
    } else {
        var jogador = document.querySelectorAll("div#jogadorSelecionado img")[0];
        jogador.setAttribute("src", "Memphis-Grizzlies-logo.png");
    }
}

function iniciandoQuadrados() {
    var quadrados = document.getElementsByClassName("quadrado");
    for (var i = 0; i < quadrados.length; i++) {
        quadrados[i].addEventListener("click", function () {
            if (gameOver) {
                return;
            }
            if (this.getElementsByTagName("img").length == 0) {
                if (jogadorVez == jogador1) {
                    this.innerHTML = "<img src='Indiana-Pacers-logo.png' height='40px'>";
                    this.setAttribute("jogada", jogador1);
                    jogadorVez = jogador2;
                } else {
                    this.innerHTML = "<img src='Memphis-Grizzlies-logo.png' height='40px'>";
                    this.setAttribute("jogada", jogador2);
                    jogadorVez = jogador1;
                }
                atualizaJogador();
                verificaVencedor();
            }
        });
    }
}

async function verificaVencedor() {
    var quadrados = document.getElementsByClassName('quadrado');
    var IdQuadrados = [];
    var vencedor = "";
    var empate = 0;

    for (var i = 0; i < quadrados.length; i++) {
        IdQuadrados[i] = quadrados[i].getAttribute("jogada");
    }

    empate = IdQuadrados.indexOf("");

    if ((IdQuadrados[0] == IdQuadrados[1] && IdQuadrados[0] == IdQuadrados[2] && IdQuadrados[0] != "") || (IdQuadrados[0] == IdQuadrados[3] &&  IdQuadrados[0] == IdQuadrados[6] && IdQuadrados[0] != "") || (IdQuadrados[0] == IdQuadrados[4] && IdQuadrados[0] == IdQuadrados[8] && IdQuadrados[0] != "")) {
        vencedor = IdQuadrados[0];
    } else if ((IdQuadrados[4] == IdQuadrados[1] && IdQuadrados[4] == IdQuadrados[7] && IdQuadrados[4] != "") || (IdQuadrados[4] == IdQuadrados[5] && IdQuadrados[4] == IdQuadrados[2] && IdQuadrados[4] != "") || (IdQuadrados[4] == IdQuadrados[2] && IdQuadrados[4] == IdQuadrados[6] && IdQuadrados[4] != "")) {
        vencedor = IdQuadrados[4];
    } else if ((IdQuadrados[8] == IdQuadrados[5] && IdQuadrados[8] == IdQuadrados[2] && IdQuadrados[8] != "") || (IdQuadrados[8] == IdQuadrados[7] && IdQuadrados[8] == IdQuadrados[6] && IdQuadrados[8] != "")) {
        vencedor = IdQuadrados[8];
    } else if (empate == -1) {
        gameOver = true;
        await sleep(50);
        alert("Não Houve Vencedor, Jogo Empatado!")

        var valorStyle = "color: white; background: blue;"; 
        var btnRecomecar = document.getElementById('btnRecomecar'); btnRecomecar.removeAttribute("disabled"); 
        btnRecomecar.setAttribute("style", valorStyle); 
        btnRecomecar.addEventListener('click', function () { 
        window.location.reload(); 
        }); 
    }

    if (vencedor != "") {
        gameOver = true;
        await sleep(50);
        alert("O vencedor foi o: '" + vencedor + "'");

        var valorStyle = "color: white; background: blue;"; 
        var btnRecomecar = document.getElementById('btnRecomecar'); btnRecomecar.removeAttribute("disabled"); 
        btnRecomecar.setAttribute("style", valorStyle); 
        btnRecomecar.addEventListener('click', function () { 
        window.location.reload(); 
        });
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
