function registrar() {
    let nome = inome.value.trim();
    let email = imail.value.trim();
    let telefone = itelefone.value.trim();
    let senha = isenha.value;
    let validacaoSenha = iconfirmacao.value;
    let flagError = false;

    if (nome == '') {
        div_result_nome.innerHTML = `Informe o seu nome completo`;
        flagError = true;
    } else if (nome.split(' ').filter(parte => parte != '').length < 2) {
        div_result_nome.innerHTML = `Informe nome e sobrenome`;
        flagError = true;
    } else {
        div_result_nome.innerHTML = ``;
    }

    if (email.includes('@') && email.includes('.com')) {
        div_result_mail.innerHTML = ``;
    } else {
        div_result_mail.innerHTML = `E-mail deve conter @ e .com`;
        flagError = true;
    }

    let somenteNumeros = true;
    for (let i = 0; i < telefone.length; i++) {
        if (!'0123456789'.includes(telefone[i])) {
            somenteNumeros = false;
        }
    }

    if (telefone.length != 11 || !somenteNumeros) {
        div_result_telefone.innerHTML = `Use DDD + 9 números, sem espaços`;
        flagError = true;
    } else {
        div_result_telefone.innerHTML = ``;
    }

    let tamanhoSenha = senha.length;
    let temMaiuscula = senha !== senha.toLowerCase();
    let temMinuscula = senha !== senha.toUpperCase();

    let contSimbolos = 0;
    let simbolos = '!@#$%&*()_+-=[]{};:,.<>?/|~';

    for (let i = 0; i < senha.length; i++) {
        if (simbolos.includes(senha[i])) {
            contSimbolos++;
        }
    }

    if (tamanhoSenha == 0) {
        div_result_senha.innerHTML = `Informe uma senha`;
        flagError = true;
    } else if (tamanhoSenha < 8) {
        div_result_senha.innerHTML = `A senha deve ter pelo menos 8 caracteres`;
        flagError = true;
    } else if (!temMaiuscula) {
        div_result_senha.innerHTML = `A senha deve conter pelo menos uma letra maiúscula`;
        flagError = true;
    } else if (!temMinuscula) {
        div_result_senha.innerHTML = `A senha deve conter pelo menos uma letra minúscula`;
        flagError = true;
    } else if (contSimbolos == 0) {
        div_result_senha.innerHTML = `A senha deve conter pelo menos um caractere especial`;
        flagError = true;
    } else {
        div_result_senha.innerHTML = ``;
    }

    if (validacaoSenha == '') {
        div_result_confirmacao_senha.innerHTML = `Confirme sua senha`;
        flagError = true;
    } else if (senha != validacaoSenha) {
        div_result_confirmacao_senha.innerHTML = `As senhas não conferem`;
        flagError = true;
    } else {
        div_result_confirmacao_senha.innerHTML = ``;
    }

    if (flagError) {
        return;
    }

    cadastrar();
}

function verSenha1() {
    if (isenha.type == 'password') {
        isenha.type = 'text';
        btn_ver1.innerHTML = 'OCULTAR';
    } else {
        isenha.type = 'password';
        btn_ver1.innerHTML = 'VER';
    }
}

function verSenha2() {
    if (iconfirmacao.type == 'password') {
        iconfirmacao.type = 'text';
        btn_ver2.innerHTML = 'OCULTAR';
    } else {
        iconfirmacao.type = 'password';
        btn_ver2.innerHTML = 'VER';
    }
}

function cadastrar() {
    var nomeVar = inome.value.trim();
    var emailVar = imail.value.trim();
    var telefoneVar = itelefone.value.trim();
    var senhaVar = isenha.value;
    var confirmacaoSenhaVar = iconfirmacao.value;

    if (
        nomeVar == "" ||
        emailVar == "" ||
        telefoneVar == "" ||
        senhaVar == "" ||
        confirmacaoSenhaVar == ""
    ) {
        mostrarPopup('Você precisa preencher todos os campos!');
        return false;
    }

    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nomeServer: nomeVar,
            emailServer: emailVar,
            telefoneServer: telefoneVar,
            senhaServer: senhaVar
        }),
    })
    .then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
            setTimeout(() => {
                window.location = "login.html";
            }, 1000);
        } else if (resposta.status == 409) {
            mostrarPopup("Já existe uma conta cadastrada com este e-mail.");
        } else {
            throw new Error("Houve um erro ao tentar realizar o cadastro!");
        }
    })
    .catch(function (erro) {
        mostrarPopup("Houve um erro ao tentar realizar o cadastro!");
        console.log(`#ERRO: ${erro}`);
    });

    return false;
}
