// ======================================================
// ELEMENTOS PRINCIPAIS DO HTML
// ======================================================

const algoritmo = document.getElementById("algoritmo");
const mensagem = document.getElementById("mensagem");
const resultado = document.getElementById("resultado");
const mensagemSistema = document.getElementById("mensagemSistema");


// ======================================================
// CAMPOS DAS CHAVES
// ======================================================

// OTP
const chaveOtp = document.getElementById("otpChave");

// César
const chaveCesar = document.getElementById("cesarChave");

// Vigenère
const chaveVigenere = document.getElementById("vigenereChave");

// Hill
const hill11 = document.getElementById("hill11");
const hill12 = document.getElementById("hill12");
const hill21 = document.getElementById("hill21");
const hill22 = document.getElementById("hill22");


// ======================================================
// ÁREAS VISUAIS DAS CHAVES
// ======================================================

const areaChaveOtp = document.getElementById("chaveOtp");
const areaChaveCesar = document.getElementById("chaveCesar");
const areaChaveVigenere = document.getElementById("chaveVigenere");
const areaChaveHill = document.getElementById("chaveHill");


// ======================================================
// MOSTRAR A CHAVE DO ALGORITMO SELECIONADO
// ======================================================

function mostrarChave() {

    // Esconde todas as áreas de chave
    areaChaveOtp.style.display = "none";
    areaChaveCesar.style.display = "none";
    areaChaveVigenere.style.display = "none";
    areaChaveHill.style.display = "none";


    // Mostra somente a chave escolhida
    if (algoritmo.value === "otp") {

        areaChaveOtp.style.display = "block";

    } else if (algoritmo.value === "cesar") {

        areaChaveCesar.style.display = "block";

    } else if (algoritmo.value === "vigenere") {

        areaChaveVigenere.style.display = "block";

    } else if (algoritmo.value === "hill") {

        areaChaveHill.style.display = "block";
    }
}


// Executa quando o usuário troca o algoritmo
algoritmo.addEventListener("change", mostrarChave);

// Executa quando a página abre
mostrarChave();


// ======================================================
// FUNÇÕES AUXILIARES
// ======================================================

// Verifica se um caractere é uma letra
function ehLetra(caractere) {

    return /^[A-Za-zÀ-ÿ]$/.test(caractere);
}


// Remove acentos das letras
function removerAcentos(texto) {

    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}


// Converte uma letra para número de 0 a 25
function letraParaNumero(letra) {

    return letra.toUpperCase().charCodeAt(0) - 65;
}


// Converte número de 0 a 25 para letra
function numeroParaLetra(numero) {

    return String.fromCharCode((numero % 26) + 65);
}


// ======================================================
// OTP - CRIPTOGRAFAR
// ======================================================

function criptografarOtp(mensagem, chave) {

    // Remove espaços da chave para trabalhar somente com letras
    chave = removerAcentos(chave).replace(/[^A-Za-z]/g, "");

    // Conta somente as letras da mensagem
    const quantidadeLetras = removerAcentos(mensagem)
        .replace(/[^A-Za-z]/g, "")
        .length;


    // A chave deve ter a mesma quantidade de letras
    if (chave.length !== quantidadeLetras) {

        return "ERRO: a chave OTP deve ter a mesma quantidade de letras da mensagem.";
    }


    let resultadoOtp = "";
    let posicaoChave = 0;


    // Percorre a mensagem
    for (let i = 0; i < mensagem.length; i++) {

        const caractere = mensagem[i];


        // Se não for letra, mantém o caractere
        if (!ehLetra(caractere)) {

            resultadoOtp += caractere;
            continue;
        }


        // Remove acento da letra
        const letraMensagem =
            removerAcentos(caractere).toUpperCase();

        const letraChave =
            chave[posicaoChave].toUpperCase();


        // Transforma as letras em números
        const mensagemNumero =
            letraParaNumero(letraMensagem);

        const chaveNumero =
            letraParaNumero(letraChave);


        // Soma módulo 26
        const novoNumero =
            (mensagemNumero + chaveNumero) % 26;


        // Converte novamente para letra
        resultadoOtp += numeroParaLetra(novoNumero);


        // Passa para o próximo caractere da chave
        posicaoChave++;
    }


    return resultadoOtp;
}


// ======================================================
// OTP - DESCRIPTOGRAFAR
// ======================================================

function descriptografarOtp(mensagem, chave) {

    chave = removerAcentos(chave).replace(/[^A-Za-z]/g, "");

    const quantidadeLetras = removerAcentos(mensagem)
        .replace(/[^A-Za-z]/g, "")
        .length;


    if (chave.length !== quantidadeLetras) {

        return "ERRO: a chave OTP deve ter a mesma quantidade de letras da mensagem.";
    }


    let resultadoOtp = "";
    let posicaoChave = 0;


    for (let i = 0; i < mensagem.length; i++) {

        const caractere = mensagem[i];


        if (!ehLetra(caractere)) {

            resultadoOtp += caractere;
            continue;
        }


        const letraMensagem =
            removerAcentos(caractere).toUpperCase();

        const letraChave =
            chave[posicaoChave].toUpperCase();


        const mensagemNumero =
            letraParaNumero(letraMensagem);

        const chaveNumero =
            letraParaNumero(letraChave);


        // Subtração módulo 26
        const novoNumero =
            (mensagemNumero - chaveNumero + 26) % 26;


        resultadoOtp += numeroParaLetra(novoNumero);

        posicaoChave++;
    }


    return resultadoOtp;
}


// ======================================================
// CÉSAR - CRIPTOGRAFAR
// ======================================================

function criptografarCesar(mensagem, deslocamento) {

    deslocamento = Number(deslocamento);

    let resultadoCesar = "";


    for (let i = 0; i < mensagem.length; i++) {

        const caractere = mensagem[i];


        if (!ehLetra(caractere)) {

            resultadoCesar += caractere;
            continue;
        }


        const letra =
            removerAcentos(caractere).toUpperCase();

        const numero =
            letraParaNumero(letra);


        const novoNumero =
            (numero + deslocamento) % 26;


        resultadoCesar += numeroParaLetra(novoNumero);
    }


    return resultadoCesar;
}


// ======================================================
// CÉSAR - DESCRIPTOGRAFAR
// ======================================================

function descriptografarCesar(mensagem, deslocamento) {

    deslocamento = Number(deslocamento);

    let resultadoCesar = "";


    for (let i = 0; i < mensagem.length; i++) {

        const caractere = mensagem[i];


        if (!ehLetra(caractere)) {

            resultadoCesar += caractere;
            continue;
        }


        const letra =
            removerAcentos(caractere).toUpperCase();

        const numero =
            letraParaNumero(letra);


        const novoNumero =
            (numero - deslocamento + 26) % 26;


        resultadoCesar += numeroParaLetra(novoNumero);
    }


    return resultadoCesar;
}


// ======================================================
// VIGENÈRE - CRIPTOGRAFAR
// ======================================================

function criptografarVigenere(mensagem, chave) {

    chave = removerAcentos(chave)
        .replace(/[^A-Za-z]/g, "")
        .toUpperCase();


    if (chave.length === 0) {

        return "ERRO: chave Vigenère inválida.";
    }


    let resultadoVigenere = "";
    let posicaoChave = 0;


    for (let i = 0; i < mensagem.length; i++) {

        const caractere = mensagem[i];


        // Mantém espaços e pontuação
        if (!ehLetra(caractere)) {

            resultadoVigenere += caractere;
            continue;
        }


        const letraMensagem =
            removerAcentos(caractere).toUpperCase();


        const numeroMensagem =
            letraParaNumero(letraMensagem);


        // Repete a chave quando necessário
        const letraChave =
            chave[posicaoChave % chave.length];


        const numeroChave =
            letraParaNumero(letraChave);


        const novoNumero =
            (numeroMensagem + numeroChave) % 26;


        resultadoVigenere +=
            numeroParaLetra(novoNumero);


        posicaoChave++;
    }


    return resultadoVigenere;
}


// ======================================================
// VIGENÈRE - DESCRIPTOGRAFAR
// ======================================================

function descriptografarVigenere(mensagem, chave) {

    chave = removerAcentos(chave)
        .replace(/[^A-Za-z]/g, "")
        .toUpperCase();


    if (chave.length === 0) {

        return "ERRO: chave Vigenère inválida.";
    }


    let resultadoVigenere = "";
    let posicaoChave = 0;


    for (let i = 0; i < mensagem.length; i++) {

        const caractere = mensagem[i];


        if (!ehLetra(caractere)) {

            resultadoVigenere += caractere;
            continue;
        }


        const letraMensagem =
            removerAcentos(caractere).toUpperCase();


        const numeroMensagem =
            letraParaNumero(letraMensagem);


        const letraChave =
            chave[posicaoChave % chave.length];


        const numeroChave =
            letraParaNumero(letraChave);


        const novoNumero =
            (numeroMensagem - numeroChave + 26) % 26;


        resultadoVigenere +=
            numeroParaLetra(novoNumero);


        posicaoChave++;
    }


    return resultadoVigenere;
}


// ======================================================
// HILL - MDC
// ======================================================

function mdc(a, b) {

    while (b !== 0) {

        const resto = a % b;

        a = b;

        b = resto;
    }

    return Math.abs(a);
}


// ======================================================
// HILL - INVERSO MODULAR
// ======================================================

function inversoModular(numero, modulo) {

    numero = ((numero % modulo) + modulo) % modulo;


    for (let i = 1; i < modulo; i++) {

        if ((numero * i) % modulo === 1) {

            return i;
        }
    }


    return null;
}


// ======================================================
// HILL - VALIDAÇÃO DA MATRIZ
// ======================================================

function obterMatrizHill() {

    return [
        [Number(hill11.value), Number(hill12.value)],
        [Number(hill21.value), Number(hill22.value)]
    ];
}


// ======================================================
// HILL - CRIPTOGRAFAR
// ======================================================

function criptografarHill(mensagem, matriz) {

    let texto =
        removerAcentos(mensagem)
        .replace(/[^A-Za-z]/g, "")
        .toUpperCase();


    if (texto.length === 0) {

        return "ERRO: a mensagem não possui letras.";
    }


    // Se tiver quantidade ímpar de letras,
    // adicionamos X para formar pares
    if (texto.length % 2 !== 0) {

        texto += "X";
    }


    const a = matriz[0][0];
    const b = matriz[0][1];
    const c = matriz[1][0];
    const d = matriz[1][1];


    const determinante =
        a * d - b * c;


    // A matriz precisa possuir inverso módulo 26
    if (mdc(determinante, 26) !== 1) {

        return "ERRO: essa matriz não possui inverso módulo 26.";
    }


    let resultadoHill = "";


    for (let i = 0; i < texto.length; i += 2) {

        const x1 =
            letraParaNumero(texto[i]);

        const x2 =
            letraParaNumero(texto[i + 1]);


        const y1 =
            (a * x1 + b * x2) % 26;

        const y2 =
            (c * x1 + d * x2) % 26;


        resultadoHill += numeroParaLetra(y1);
        resultadoHill += numeroParaLetra(y2);
    }


    return resultadoHill;
}


// ======================================================
// HILL - DESCRIPTOGRAFAR
// ======================================================

function descriptografarHill(mensagem, matriz) {

    let texto =
        removerAcentos(mensagem)
        .replace(/[^A-Za-z]/g, "")
        .toUpperCase();


    if (texto.length === 0) {

        return "ERRO: a mensagem não possui letras.";
    }


    if (texto.length % 2 !== 0) {

        return "ERRO: a mensagem criptografada deve possuir quantidade par de letras.";
    }


    const a = matriz[0][0];
    const b = matriz[0][1];
    const c = matriz[1][0];
    const d = matriz[1][1];


    const determinante =
        a * d - b * c;


    // Calcula o determinante módulo 26
    const determinanteModulo =
        ((determinante % 26) + 26) % 26;


    // Encontra o inverso do determinante
    const inversoDeterminante =
        inversoModular(determinanteModulo, 26);


    if (inversoDeterminante === null) {

        return "ERRO: essa matriz não possui inverso módulo 26.";
    }


    // Matriz inversa:
    //
    //        d  -b
    //  K⁻¹ = -c   a
    //
    // multiplicada pelo inverso do determinante


    const novoA =
        (d * inversoDeterminante) % 26;

    const novoB =
        (-b * inversoDeterminante) % 26;

    const novoC =
        (-c * inversoDeterminante) % 26;

    const novoD =
        (a * inversoDeterminante) % 26;


    let resultadoHill = "";


    for (let i = 0; i < texto.length; i += 2) {

        const y1 =
            letraParaNumero(texto[i]);

        const y2 =
            letraParaNumero(texto[i + 1]);


        let x1 =
            (novoA * y1 + novoB * y2) % 26;

        let x2 =
            (novoC * y1 + novoD * y2) % 26;


        if (x1 < 0) {
            x1 += 26;
        }

        if (x2 < 0) {
            x2 += 26;
        }


        resultadoHill += numeroParaLetra(x1);
        resultadoHill += numeroParaLetra(x2);
    }


    return resultadoHill;
}


// ======================================================
// BOTÃO CRIPTOGRAFAR
// ======================================================

const btnCriptografar =
    document.getElementById("btnCriptografar");


btnCriptografar.addEventListener("click", () => {

    const algoritmoSelecionado =
        algoritmo.value;

    const mensagemValor =
        mensagem.value.trim();


    // Verifica algoritmo
    if (algoritmoSelecionado === "") {

        alert("Selecione um algoritmo.");

        return;
    }


    // Verifica mensagem
    if (mensagemValor === "") {

        alert("Digite uma mensagem.");

        return;
    }


    let resultadoCriptografado;


    // ------------------------------------------
    // OTP
    // ------------------------------------------

    if (algoritmoSelecionado === "otp") {

        const chaveValor =
            chaveOtp.value.trim();


        if (chaveValor === "") {

            alert("Digite a chave OTP.");

            return;
        }


        resultadoCriptografado =
            criptografarOtp(
                mensagemValor,
                chaveValor
            );
    }


    // ------------------------------------------
    // CÉSAR
    // ------------------------------------------

    else if (algoritmoSelecionado === "cesar") {

        const chaveValor =
            chaveCesar.value;


        if (chaveValor === "") {

            alert("Digite o deslocamento.");

            return;
        }


        resultadoCriptografado =
            criptografarCesar(
                mensagemValor,
                chaveValor
            );
    }


    // ------------------------------------------
    // VIGENÈRE
    // ------------------------------------------

    else if (algoritmoSelecionado === "vigenere") {

        const chaveValor =
            chaveVigenere.value.trim();


        if (chaveValor === "") {

            alert("Digite a chave Vigenère.");

            return;
        }


        resultadoCriptografado =
            criptografarVigenere(
                mensagemValor,
                chaveValor
            );
    }


    // ------------------------------------------
    // HILL
    // ------------------------------------------

    else if (algoritmoSelecionado === "hill") {

        if (
            hill11.value === "" ||
            hill12.value === "" ||
            hill21.value === "" ||
            hill22.value === ""
        ) {

            alert("Preencha os quatro valores da matriz.");

            return;
        }


        const matriz =
            obterMatrizHill();


        resultadoCriptografado =
            criptografarHill(
                mensagemValor,
                matriz
            );
    }


    // Coloca o resultado no textarea
    resultado.value =
        resultadoCriptografado;
});


// ======================================================
// BOTÃO DESCRIPTOGRAFAR
// ======================================================

const btnDescriptografar =
    document.getElementById("btnDescriptografar");


btnDescriptografar.addEventListener("click", () => {

    const algoritmoSelecionado =
        algoritmo.value;

    const mensagemValor =
        mensagem.value.trim();


    // Verifica algoritmo
    if (algoritmoSelecionado === "") {

        alert("Selecione um algoritmo.");

        return;
    }


    // Verifica mensagem
    if (mensagemValor === "") {

        alert("Digite a mensagem criptografada.");

        return;
    }


    let resultadoDescriptografado;


    // ------------------------------------------
    // OTP
    // ------------------------------------------

    if (algoritmoSelecionado === "otp") {

        const chaveValor =
            chaveOtp.value.trim();


        if (chaveValor === "") {

            alert("Digite a chave OTP.");

            return;
        }


        resultadoDescriptografado =
            descriptografarOtp(
                mensagemValor,
                chaveValor
            );
    }


    // ------------------------------------------
    // CÉSAR
    // ------------------------------------------

    else if (algoritmoSelecionado === "cesar") {

        const chaveValor =
            chaveCesar.value;


        if (chaveValor === "") {

            alert("Digite o deslocamento.");

            return;
        }


        resultadoDescriptografado =
            descriptografarCesar(
                mensagemValor,
                chaveValor
            );
    }


    // ------------------------------------------
    // VIGENÈRE
    // ------------------------------------------

    else if (algoritmoSelecionado === "vigenere") {

        const chaveValor =
            chaveVigenere.value.trim();


        if (chaveValor === "") {

            alert("Digite a chave Vigenère.");

            return;
        }


        resultadoDescriptografado =
            descriptografarVigenere(
                mensagemValor,
                chaveValor
            );
    }


    // ------------------------------------------
    // HILL
    // ------------------------------------------

    else if (algoritmoSelecionado === "hill") {

        if (
            hill11.value === "" ||
            hill12.value === "" ||
            hill21.value === "" ||
            hill22.value === ""
        ) {

            alert("Preencha os quatro valores da matriz.");

            return;
        }


        const matriz =
            obterMatrizHill();


        resultadoDescriptografado =
            descriptografarHill(
                mensagemValor,
                matriz
            );
    }


    // Coloca o resultado no textarea
    resultado.value =
        resultadoDescriptografado;
});