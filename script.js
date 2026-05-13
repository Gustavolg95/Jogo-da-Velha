let tabuleiro = ["", "", "", "", "", "", "", "", ""];
let jogadorAtual = "X";
let jogoAtivo = true;

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

const celulas = document.querySelectorAll(".celula");
const status = document.getElementById("status");
const botaoReiniciar = document.getElementById("reiniciar");

celulas.forEach(celula => {
  celula.addEventListener("click", () => {
    const index = celula.getAttribute("data-index");

    if (tabuleiro[index] !== "" || !jogoAtivo) return;

    tabuleiro[index] = jogadorAtual;
    celula.textContent = jogadorAtual;

    if (verificarVitoria()) {
      status.textContent = `Jogador ${jogadorAtual} venceu!`;
      jogoAtivo = false;
      return;
    }

    if (tabuleiro.every(casa => casa !== "")) {
      status.textContent = "Empate!";
      jogoAtivo = false;
      return;
    }

    jogadorAtual = jogadorAtual === "X" ? "O" : "X";
    status.textContent = `Vez do jogador ${jogadorAtual}`;
  });
});

function verificarVitoria() {
  return combinacoesVencedoras.some(combinacao => {
    const [a, b, c] = combinacao;
    return (
      tabuleiro[a] !== "" &&
      tabuleiro[a] === tabuleiro[b] &&
      tabuleiro[b] === tabuleiro[c]
    );
  });
}

botaoReiniciar.addEventListener("click", () => {
  tabuleiro = ["", "", "", "", "", "", "", "", ""];
  jogadorAtual = "X";
  jogoAtivo = true;
  status.textContent = "Vez do jogador X";
  celulas.forEach(celula => (celula.textContent = ""));
});