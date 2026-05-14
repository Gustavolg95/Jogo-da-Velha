let tabuleiro = [];
let jogadorAtual = "X";
let simboloEscolhido = "";
let nivelEscolhido = "";
let tamanhoTabuleiro = 3;
let combinacoesVencedoras = [];
let jogoAtivo = true;
let pontos = { X: 0, O: 0, empate: 0 };

const telaInicial   = document.getElementById("tela-inicial");
const telaJogo      = document.getElementById("tela-jogo");
const btnEscolherX  = document.getElementById("escolher-x");
const btnEscolherO  = document.getElementById("escolher-o");
const btnNivelFacil = document.getElementById("nivel-facil");
const btnNivelMedio = document.getElementById("nivel-medio");
const btnNivelDificil = document.getElementById("nivel-dificil");
const btnComecar    = document.getElementById("btn-comecar");
const tabuleiroElement = document.getElementById("tabuleiro");
const status        = document.getElementById("status");
const btnReiniciar  = document.getElementById("reiniciar");
const btnMenu       = document.getElementById("menu");
const pontosX       = document.getElementById("pontos-x");
const pontosO       = document.getElementById("pontos-o");
const pontosEmpate  = document.getElementById("pontos-empate");
const nomeJogador1  = document.getElementById("nome-jogador1");
const nomeJogador2  = document.getElementById("nome-jogador2");

function atualizarBotaoComecar() {
  btnComecar.disabled = !(simboloEscolhido && nivelEscolhido);
}

function limparSelecaoNivel() {
  btnNivelFacil.classList.remove("selecionado");
  btnNivelMedio.classList.remove("selecionado");
  btnNivelDificil.classList.remove("selecionado");
}

btnEscolherX.addEventListener("click", () => {
  simboloEscolhido = "X";
  btnEscolherX.classList.add("selecionado");
  btnEscolherO.classList.remove("selecionado");
  atualizarBotaoComecar();
});

btnEscolherO.addEventListener("click", () => {
  simboloEscolhido = "O";
  btnEscolherO.classList.add("selecionado");
  btnEscolherX.classList.remove("selecionado");
  atualizarBotaoComecar();
});

btnNivelFacil.addEventListener("click", () => {
  nivelEscolhido = "facil";
  limparSelecaoNivel();
  btnNivelFacil.classList.add("selecionado");
  atualizarBotaoComecar();
});

btnNivelMedio.addEventListener("click", () => {
  nivelEscolhido = "medio";
  limparSelecaoNivel();
  btnNivelMedio.classList.add("selecionado");
  atualizarBotaoComecar();
});

btnNivelDificil.addEventListener("click", () => {
  nivelEscolhido = "dificil";
  limparSelecaoNivel();
  btnNivelDificil.classList.add("selecionado");
  atualizarBotaoComecar();
});

btnComecar.addEventListener("click", () => {
  nomeJogador1.textContent = `Você (${simboloEscolhido})`;
  nomeJogador2.textContent = `Adversário (${simboloEscolhido === "X" ? "O" : "X"})`;

  telaInicial.classList.add("escondido");
  telaJogo.classList.remove("escondido");

  iniciarJogo();
});

function iniciarJogo() {
  tamanhoTabuleiro = nivelEscolhido === "medio" ? 4 : nivelEscolhido === "dificil" ? 5 : 3;
  tabuleiro = Array(tamanhoTabuleiro * tamanhoTabuleiro).fill("");
  jogadorAtual = simboloEscolhido || "X";
  jogoAtivo = true;
  status.textContent = `Vez do jogador ${jogadorAtual}`;
  combinacoesVencedoras = gerarCombinacoesVencedoras(tamanhoTabuleiro);
  gerarTabuleiro();
  atualizarPlacar();
}

function gerarTabuleiro() {
  const tamanhoCelula = tamanhoTabuleiro === 3 ? 100 : tamanhoTabuleiro === 4 ? 85 : 70;
  tabuleiroElement.style.gridTemplateColumns = `repeat(${tamanhoTabuleiro}, ${tamanhoCelula}px)`;
  tabuleiroElement.style.gridTemplateRows = `repeat(${tamanhoTabuleiro}, ${tamanhoCelula}px)`;
  tabuleiroElement.innerHTML = "";

  for (let i = 0; i < tabuleiro.length; i++) {
    const celula = document.createElement("div");
    celula.classList.add("celula");
    celula.dataset.index = i.toString();
    tabuleiroElement.appendChild(celula);
  }
}

function gerarCombinacoesVencedoras(tamanho) {
  const combinacoes = [];

  for (let linha = 0; linha < tamanho; linha++) {
    const linhaAtual = [];
    for (let coluna = 0; coluna < tamanho; coluna++) {
      linhaAtual.push(linha * tamanho + coluna);
    }
    combinacoes.push(linhaAtual);
  }

  for (let coluna = 0; coluna < tamanho; coluna++) {
    const colunaAtual = [];
    for (let linha = 0; linha < tamanho; linha++) {
      colunaAtual.push(linha * tamanho + coluna);
    }
    combinacoes.push(colunaAtual);
  }

  const diagonalPrincipal = [];
  const diagonalSecundaria = [];

  for (let i = 0; i < tamanho; i++) {
    diagonalPrincipal.push(i * tamanho + i);
    diagonalSecundaria.push(i * tamanho + (tamanho - 1 - i));
  }

  combinacoes.push(diagonalPrincipal, diagonalSecundaria);
  return combinacoes;
}

function atualizarPlacar() {
  if (simboloEscolhido === "O") {
    pontosX.textContent = pontos.O;
    pontosO.textContent = pontos.X;
  } else {
    pontosX.textContent = pontos.X;
    pontosO.textContent = pontos.O;
  }
  pontosEmpate.textContent = pontos.empate;
}

function verificarVitoria() {
  for (const combinacao of combinacoesVencedoras) {
    const primeiro = tabuleiro[combinacao[0]];
    if (!primeiro) continue;
    if (combinacao.every(index => tabuleiro[index] === primeiro)) {
      return combinacao;
    }
  }
  return null;
}

function atualizarCelula(index) {
  const celula = tabuleiroElement.querySelector(`.celula[data-index="${index}"]`);
  if (celula) celula.textContent = tabuleiro[index];
}

function marcarVencedora(combinacao) {
  combinacao.forEach(index => {
    const celula = tabuleiroElement.querySelector(`.celula[data-index="${index}"]`);
    if (celula) celula.classList.add("vencedora");
  });
}

tabuleiroElement.addEventListener("click", event => {
  if (!jogoAtivo) return;
  const celula = event.target.closest(".celula");
  if (!celula) return;

  const index = Number(celula.dataset.index);
  if (tabuleiro[index] !== "") return;

  tabuleiro[index] = jogadorAtual;
  atualizarCelula(index);

  const combinacaoVencedora = verificarVitoria();

  if (combinacaoVencedora) {
    marcarVencedora(combinacaoVencedora);
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