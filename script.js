let tabuleiro = ["", "", "", "", "", "", "", "", ""];
let jogadorAtual = "X";
let simboloEscolhido = "";
let jogoAtivo = true;
let pontos = { X: 0, O: 0, empate: 0 };

const combinacoesVencedoras = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const telaInicial   = document.getElementById("tela-inicial");
const telaJogo      = document.getElementById("tela-jogo");
const btnEscolherX  = document.getElementById("escolher-x");
const btnEscolherO  = document.getElementById("escolher-o");
const btnComecar    = document.getElementById("btn-comecar");
const celulas       = document.querySelectorAll(".celula");
const status        = document.getElementById("status");
const btnReiniciar  = document.getElementById("reiniciar");
const btnMenu       = document.getElementById("menu");
const pontosX       = document.getElementById("pontos-x");
const pontosO       = document.getElementById("pontos-o");
const pontosEmpate  = document.getElementById("pontos-empate");
const nomeJogador1  = document.getElementById("nome-jogador1");
const nomeJogador2  = document.getElementById("nome-jogador2");

btnEscolherX.addEventListener("click", () => {
  simboloEscolhido = "X";
  btnEscolherX.classList.add("selecionado");
  btnEscolherO.classList.remove("selecionado");
  btnComecar.disabled = false;
});

btnEscolherO.addEventListener("click", () => {
  simboloEscolhido = "O";
  btnEscolherO.classList.add("selecionado");
  btnEscolherX.classList.remove("selecionado");
  btnComecar.disabled = false;
});

btnComecar.addEventListener("click", () => {

  nomeJogador1.textContent = `Você (${simboloEscolhido})`;
  nomeJogador2.textContent = `Adversário (${simboloEscolhido === "X" ? "O" : "X"})`;

  telaInicial.classList.add("escondido");
  telaJogo.classList.remove("escondido");

  iniciarJogo();
});

function iniciarJogo() {
  tabuleiro = ["", "", "", "", "", "", "", "", ""];
  jogadorAtual = "X";
  jogoAtivo = true;
  status.textContent = `Vez do jogador ${jogadorAtual}`;
  celulas.forEach(c => {
    c.textContent = "";
    c.classList.remove("vencedora");
  });
}

celulas.forEach(celula => {
  celula.addEventListener("click", () => {
    const index = celula.getAttribute("data-index");

    if (tabuleiro[index] !== "" || !jogoAtivo) return;

    tabuleiro[index] = jogadorAtual;
    celula.textContent = jogadorAtual;

    const combinacaoVencedora = verificarVitoria();

    if (combinacaoVencedora) {
      combinacaoVencedora.forEach(i => {
        celulas[i].classList.add("vencedora");
      });

      status.textContent = `Jogador ${jogadorAtual} venceu! 🎉`;
      pontos[jogadorAtual]++;
      atualizarPlacar();
      jogoAtivo = false;
      return;
    }

    if (tabuleiro.every(casa => casa !== "")) {
      status.textContent = "Empate! 🤝";
      pontos.empate++;
      atualizarPlacar();
      jogoAtivo = false;
      return;
    }

    jogadorAtual = jogadorAtual === "X" ? "O" : "X";
    status.textContent = `Vez do jogador ${jogadorAtual}`;
  });
});

function verificarVitoria() {
  for (const combinacao of combinacoesVencedoras) {
    const [a, b, c] = combinacao;
    if (
      tabuleiro[a] !== "" &&
      tabuleiro[a] === tabuleiro[b] &&
      tabuleiro[b] === tabuleiro[c]
    ) {
      return combinacao; 
    }
  }
  return null;
}

function atualizarPlacar() {
  pontosX.textContent = pontos.X;
  pontosO.textContent = pontos.O;
  pontosEmpate.textContent = pontos.empate;
}

btnReiniciar.addEventListener("click", () => {
  iniciarJogo();
});

btnMenu.addEventListener("click", () => {
  pontos = { X: 0, O: 0, empate: 0 };
  atualizarPlacar();
  simboloEscolhido = "";
  btnEscolherX.classList.remove("selecionado");
  btnEscolherO.classList.remove("selecionado");
  btnComecar.disabled = true;

  telaJogo.classList.add("escondido");
  telaInicial.classList.remove("escondido");
});