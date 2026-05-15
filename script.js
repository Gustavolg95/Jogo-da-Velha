let tabuleiro = [];
let jogadorAtual = "X";
let simboloEscolhido = "";
let nivelEscolhido = "";
let dificuldadeEscolhida = ""; // "facil", "medio" ou "dificil"
let tamanhoTabuleiro = 3;
let combinacoesVencedoras = [];
let jogoAtivo = true;
let pontos = { X: 0, O: 0, empate: 0 };
let simboloIA = ""; // será "X" ou "O", o oposto do jogador
let modoJogo = ""; // "ia" ou "2p"

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
const btnModoIA = document.getElementById("modo-ia");
const btnModo2P = document.getElementById("modo-2p");
const btnDificFacil   = document.getElementById("dific-facil");
const btnDificMedio   = document.getElementById("dific-medio");
const btnDificDificil = document.getElementById("dific-dificil");
const labelDificuldade       = document.getElementById("label-dificuldade");
const escolhaDificuldade     = document.getElementById("escolha-dificuldade");

function atualizarBotaoComecar() {
  const nivelOk = modoJogo === "2p" || (nivelEscolhido !== "" && dificuldadeEscolhida !== "");
  btnComecar.disabled = !(modoJogo && simboloEscolhido && nivelOk);
}

function limparSelecaoNivel() {
  btnNivelFacil.classList.remove("selecionado");
  btnNivelMedio.classList.remove("selecionado");
  btnNivelDificil.classList.remove("selecionado");
  // Reseta a dificuldade ao trocar de tamanho
  dificuldadeEscolhida = "";
  btnDificFacil.classList.remove("selecionado");
  btnDificMedio.classList.remove("selecionado");
  btnDificDificil.classList.remove("selecionado");
}

btnNivelFacil.addEventListener("click", () => {
  nivelEscolhido = "facil"; // 3x3
  limparSelecaoNivel();
  btnNivelFacil.classList.add("selecionado");
  mostrarDificuldade();
  atualizarBotaoComecar();
});

btnNivelMedio.addEventListener("click", () => {
  nivelEscolhido = "medio"; // 4x4
  limparSelecaoNivel();
  btnNivelMedio.classList.add("selecionado");
  mostrarDificuldade();
  atualizarBotaoComecar();
});

btnNivelDificil.addEventListener("click", () => {
  nivelEscolhido = "dificil"; // 5x5
  limparSelecaoNivel();
  btnNivelDificil.classList.add("selecionado");
  mostrarDificuldade();
  atualizarBotaoComecar();
});

// Mostra os botões de dificuldade só se for modo IA
function mostrarDificuldade() {
  if (modoJogo === "ia" && nivelEscolhido !== "") {
    labelDificuldade.classList.remove("escondido");
    escolhaDificuldade.classList.remove("escondido");
  } else {
    labelDificuldade.classList.add("escondido");
    escolhaDificuldade.classList.add("escondido");
  }
}

function limparSelecaoDificuldade() {
  btnDificFacil.classList.remove("selecionado");
  btnDificMedio.classList.remove("selecionado");
  btnDificDificil.classList.remove("selecionado");
}

btnDificFacil.addEventListener("click", () => {
  dificuldadeEscolhida = "facil";
  limparSelecaoDificuldade();
  btnDificFacil.classList.add("selecionado");
  atualizarBotaoComecar();
});

btnDificMedio.addEventListener("click", () => {
  dificuldadeEscolhida = "medio";
  limparSelecaoDificuldade();
  btnDificMedio.classList.add("selecionado");
  atualizarBotaoComecar();
});

btnDificDificil.addEventListener("click", () => {
  dificuldadeEscolhida = "dificil";
  limparSelecaoDificuldade();
  btnDificDificil.classList.add("selecionado");
  atualizarBotaoComecar();
});

btnModoIA.addEventListener("click", () => {
  modoJogo = "ia";
  btnModoIA.classList.add("selecionado");
  btnModo2P.classList.remove("selecionado");

  // Mostra as opções de nível (só faz sentido contra IA)
  document.getElementById("escolha-nivel").style.display = "flex";
  
  // Reseta o tamanho e dificuldade ao trocar de modo
  nivelEscolhido = "";
  dificuldadeEscolhida = "";
  limparSelecaoNivel();
  limparSelecaoDificuldade();

  // Esconde dificuldade até o jogador escolher o tamanho
  labelDificuldade.classList.add("escondido");
  escolhaDificuldade.classList.add("escondido");

  atualizarBotaoComecar();
});

btnModo2P.addEventListener("click", () => {
  modoJogo = "2p";
  btnModo2P.classList.add("selecionado");
  btnModoIA.classList.remove("selecionado");

  // Esconde e ignora o nível no modo 2 jogadores
  document.getElementById("escolha-nivel").style.display = "flex";

  // Esconde a dificuldade (não faz sentido no 2 jogadores)
  labelDificuldade.classList.add("escondido");
  escolhaDificuldade.classList.add("escondido");
  dificuldadeEscolhida = ""; // reseta dificuldade
  limparSelecaoDificuldade();

  nivelEscolhido = "";
  limparSelecaoNivel();

  atualizarBotaoComecar();
});

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
  simboloIA = simboloEscolhido === "X" ? "O" : "X";

  telaInicial.classList.add("escondido");
  telaJogo.classList.remove("escondido");

  iniciarJogo();
});

let ultimoVencedor = ""; // guarda quem venceu a última rodada

function iniciarJogo() {
  tamanhoTabuleiro = nivelEscolhido === "medio" ? 4 : nivelEscolhido === "dificil" ? 5 : 3;
  tabuleiro = Array(tamanhoTabuleiro * tamanhoTabuleiro).fill("");

  // Se houve um vencedor na rodada anterior, ele começa
  jogadorAtual = ultimoVencedor || simboloEscolhido || "X";

  jogoAtivo = true;
  status.textContent = `Vez do jogador ${jogadorAtual}`;
  combinacoesVencedoras = gerarCombinacoesVencedoras(tamanhoTabuleiro);
  gerarTabuleiro();
  atualizarPlacar();


  // Se for modo IA e a IA começa a rodada, ela joga automaticamente
  if (modoJogo === "ia" && jogadorAtual === simboloIA) {
    jogoAtivo = false;
    setTimeout(() => {
      jogadaIA();
      jogoAtivo = true;
    }, 600); // delay um pouco maior para o jogador perceber que a rodada começou
  }
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
    ultimoVencedor = jogadorAtual; // salva o vencedor
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

  // Se for modo IA e agora é a vez da IA, ela joga
  if (modoJogo === "ia" && jogadorAtual === simboloIA) {
    jogoAtivo = false; // trava o tabuleiro enquanto a IA "pensa"
    setTimeout(() => {
      jogadaIA();
      jogoAtivo = true;
    }, 400); // pequeno delay para parecer mais natural
  }
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

  labelDificuldade.classList.add("escondido");
  escolhaDificuldade.classList.add("escondido");
  btnDificFacil.classList.remove("selecionado");
  btnDificMedio.classList.remove("selecionado");
  btnDificDificil.classList.remove("selecionado");
  telaJogo.classList.add("escondido");
  telaInicial.classList.remove("escondido");
});

// ══════════════════════════════
// INTELIGÊNCIA ARTIFICIAL
// ══════════════════════════════

function jogadaIA() {
  let index;

  if (dificuldadeEscolhida === "facil") {
    index = jogadaAleatoria();
  } else if (dificuldadeEscolhida === "medio") {
    index = jogadaMedia();
  } else {
    index = jogadaMinimax();
  }

  if (index === null || index === undefined) return;

  tabuleiro[index] = simboloIA;
  atualizarCelula(index);

  const combinacaoVencedora = verificarVitoria();

  if (combinacaoVencedora) {
    marcarVencedora(combinacaoVencedora);
    status.textContent = `Jogador ${simboloIA} venceu! 🎉`;
    pontos[simboloIA]++;
    atualizarPlacar();
    ultimoVencedor = simboloIA;
    atualizarPlacar();
    jogoAtivo = false;
    return;
  }

  if (tabuleiro.every(casa => casa !== "")) {
    status.textContent = "Empate! 🤝";
    pontos.empate++;
    ultimoVencedor = "";
    atualizarPlacar();
    jogoAtivo = false;
    return;
  }

  jogadorAtual = simboloEscolhido; // volta a vez para o humano
  status.textContent = `Vez do jogador ${jogadorAtual}`;
  jogoAtivo = true;
}

// ── Nível Fácil: posição aleatória ──
function jogadaAleatoria() {
  const livres = tabuleiro
    .map((val, i) => val === "" ? i : null)
    .filter(i => i !== null);

  if (livres.length === 0) return null;

  return livres[Math.floor(Math.random() * livres.length)];
}

// ── Nível Médio: vence se puder, bloqueia se precisar, senão aleatório ──
function jogadaMedia() {
  // Tenta vencer
  const vitoria = encontrarJogadaVencedora(simboloIA);
  if (vitoria !== null) return vitoria;

  // Tenta bloquear o jogador humano
  const bloqueio = encontrarJogadaVencedora(simboloEscolhido);
  if (bloqueio !== null) return bloqueio;

  // Senão, aleatório
  return jogadaAleatoria();
}

// Acha uma posição que complete uma combinação vencedora para o símbolo dado
function encontrarJogadaVencedora(simbolo) {
  for (const combinacao of combinacoesVencedoras) {
    const valores = combinacao.map(i => tabuleiro[i]);
    const qtdSimbolo = valores.filter(v => v === simbolo).length;
    const qtdVazio   = valores.filter(v => v === "").length;

    // Se tiver (tamanho - 1) símbolos e 1 vazio, pode completar
    if (qtdSimbolo === combinacao.length - 1 && qtdVazio === 1) {
      return combinacao[valores.indexOf("")];
    }
  }
  return null;
}

// ── Nível Difícil: algoritmo Minimax ──
function jogadaMinimax() {
  // Minimax só é viável no 3x3
  if (tamanhoTabuleiro > 3) return jogadaMedia();

  let melhorPontuacao = -Infinity;
  let melhorIndex = null;

  for (let i = 0; i < tabuleiro.length; i++) {
    if (tabuleiro[i] !== "") continue;

    tabuleiro[i] = simboloIA;
    const pontuacao = minimax(tabuleiro, 0, false);
    tabuleiro[i] = "";

    if (pontuacao > melhorPontuacao) {
      melhorPontuacao = pontuacao;
      melhorIndex = i;
    }
  }

  return melhorIndex;
}

function minimax(tab, profundidade, isMaximizando) {
  // Verifica se alguém ganhou
  for (const combinacao of combinacoesVencedoras) {
    const primeiro = tab[combinacao[0]];
    if (!primeiro) continue;
    if (combinacao.every(i => tab[i] === primeiro)) {
      // IA ganhou = positivo, humano ganhou = negativo
      return primeiro === simboloIA ? 10 - profundidade : profundidade - 10;
    }
  }

  // Empate
  if (tab.every(c => c !== "")) return 0;

  if (isMaximizando) {
    // Vez da IA — quer maximizar
    let melhor = -Infinity;
    for (let i = 0; i < tab.length; i++) {
      if (tab[i] !== "") continue;
      tab[i] = simboloIA;
      melhor = Math.max(melhor, minimax(tab, profundidade + 1, false));
      tab[i] = "";
    }
    return melhor;
  } else {
    // Vez do humano — quer minimizar
    let melhor = Infinity;
    for (let i = 0; i < tab.length; i++) {
      if (tab[i] !== "") continue;
      tab[i] = simboloEscolhido;
      melhor = Math.min(melhor, minimax(tab, profundidade + 1, true));
      tab[i] = "";
    }
    return melhor;
  }
}