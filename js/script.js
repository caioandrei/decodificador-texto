document.addEventListener('DOMContentLoaded', function () {
    const inputTexto = document.getElementById('texto');
    const btnCriptografar = document.querySelector('.criptografar');
    const btnDescriptografar = document.querySelector('.descriptografar');
    const inputResultado = document.getElementById('resultado');
    const btnCopiar = document.querySelector('.copiar');
    const mensagemDestaque = document.querySelector('.mensagem-destaque');

    function atualizarTextoResultado(texto) {
        inputResultado.value = texto;
    }

    function exibirMensagem(mensagem, tipo) {
        mensagemDestaque.innerHTML = `<p class="mensagem-${tipo}">${mensagem}</p>`;
    }

    function criptografarPalavra(palavra) {
        return palavra.replace(/e/g, 'enter')
            .replace(/i/g, 'imes')
            .replace(/a/g, 'ai')
            .replace(/o/g, 'ober')
            .replace(/u/g, 'ufat');
    }

    function descriptografarPalavra(palavraCriptografada) {
        return palavraCriptografada.replace(/enter/g, 'e')
            .replace(/imes/g, 'i')
            .replace(/ai/g, 'a')
            .replace(/ober/g, 'o')
            .replace(/ufat/g, 'u');
    }

    btnCriptografar.addEventListener('click', function () {

        inputResultado.select();

        try {
            document.execCommand('copy');
            mensagemDestaque.innerHTML = '<p class="mensagem-sucesso">Texto copiado para a área de transferência.</p>';
            inputResultado.classList.remove('texto-padrao'); // Remove a classe de texto padrão
            inputResultado.style.color = '#000'; // Muda a cor do texto para preto
        } catch (err) {
            mensagemDestaque.innerHTML = '<p class="mensagem-erro">Erro ao copiar o texto.</p>';
            console.error('Erro ao copiar o texto:', err);
        }

        const textoOriginal = inputTexto.value.trim();

        if (!/^[a-z]+$/.test(textoOriginal) || /[áéíóúâêîôûãõàèìòùäëïöü]/.test(textoOriginal)) {
            mensagemDestaque.innerHTML = '<p class="mensagem-erro">Por favor, utilize apenas letras minúsculas e evite acentos ou caracteres especiais.</p>';
            return;
        }

        const textoCriptografado = criptografarPalavra(textoOriginal);
        inputResultado.value = textoCriptografado;
        mensagemDestaque.innerHTML = '<p class="mensagem-sucesso">Criptografia concluída com sucesso.</p>';
    });

    btnDescriptografar.addEventListener('click', function () {
        const textoCriptografado = inputTexto.value.trim().toLowerCase();

        if (textoCriptografado) {
            const textoOriginal = descriptografarPalavra(textoCriptografado);
            inputResultado.value = textoOriginal;
            mensagemDestaque.innerHTML = '<p class="mensagem-sucesso">Descriptografia concluída com sucesso.</p>';
        } else {
            mensagemDestaque.innerHTML = '<p class="mensagem-erro">Por favor, insira um texto antes de descriptografar.</p>';
        }
    });

    btnCopiar.addEventListener('click', function () {
        inputResultado.select();

        try {
            document.execCommand('copy');
            mensagemDestaque.innerHTML = '<p class="mensagem-sucesso">Texto copiado para a área de transferência.</p>';
        } catch (err) {
            mensagemDestaque.innerHTML = '<p class="mensagem-erro">Erro ao copiar o texto.</p>';
            console.error('Erro ao copiar o texto:', err);
        }
    });
});