function formatar() { //Função responsavel por fazer a formatação do texto e escrever no texto formatado
    // Declaração de variaveis para validação
    var link = document.getElementById("link").value;
    var pauta = document.getElementById("pauta").value;
    var ReuniaoData = document.getElementById("data").value;
    var gerencia = document.getElementById("GerenciaPauta").value;

    if (ReuniaoData === "" | gerencia === "") {//Validação de campos em branco
        popup("Algum campo obrigatorio foi deixado em branco(*)")

    }
    else {
        if (link === "" & pauta === "") {//Validação de campos em branco
            popup("Link ou Pauta esta vazio");
        }
        else {
            document.getElementById("formatado").value = "";
            var texto = document.getElementById("link").value;
            var vetorString = texto.split("\n");
            var tamanho = vetorString.length;

            var teste = document.querySelector('input[name="inlineRadioOptions"]:checked').value;
            //Verificação se é ou nao ponto de controle
            if (teste === "1") {
                document.getElementById("formatado").value += "*Ponto de Controle " + document.getElementById("Projeto").value + " - " + document.getElementById("data").value + "*\n";
            }
            else {
                document.getElementById("formatado").value += "*Reunião " + document.getElementById("Projeto").value + " - " + document.getElementById("data").value + "*\n";
            }
            if (link !== "") {
                texto = document.getElementById("link").value;
                if (texto.indexOf("https") > -1) {


                    document.getElementById("formatado").value += "\n*Link:* "; //Caso sim, escreve o titulo e dps "- TEXTO"
                    document.getElementById("formatado").value += texto + "\n";
                }
                else {
                    document.getElementById("formatado").value += "\n*Local:* ";
                    document.getElementById("formatado").value += texto + "\n";
                }


            }
            document.getElementById("formatado").value += "\n*Horário:* " + document.getElementById("hora").value + "\n";
            if (document.getElementById("pauta").value != "") {//Verifica se escreveu algo no segundo quadrao
                document.getElementById("formatado").value += "\n*Pauta:*\n"; //Caso sim, escreve o titulo e dps "- TEXTO"
                texto = document.getElementById("pauta").value;
                vetorString = texto.split("\n");
                tamanho = vetorString.length;
                for (var i = 0; i < tamanho; i++) {

                    document.getElementById("formatado").value += "- " + vetorString[i] + "\n";

                }
            }

            if (document.getElementById("Participante").value != "") {//Verifica se escreveu algo
                document.getElementById("formatado").value += "\n*Participantes:*\n"; //Caso sim, escreve o titulo e dps "- TEXTO"
                texto = document.getElementById("Participante").value;
                vetorString = texto.split("\n");
                tamanho = vetorString.length;
                for (var i = 0; i < tamanho; i++) {

                    document.getElementById("formatado").value += "- " + vetorString[i] + "\n";

                }
            }
        }
    }
}


function popup(texto) { //função popup de aviso na tela
    alert(texto);
}

function copiar() { //função copiar
    const texto = document.getElementById('formatado');
    texto.select();
    document.execCommand('copy');
    alert("Texto Copiado");

}
function limpar() { //função limpar tela onde reseta os valores e desativas os quadros novamente
    document.getElementById("GerenciaPauta").value = "";
    document.getElementById("link").value = "";
    document.getElementById("pauta").value = "";
    document.getElementById("formatado").value = "";
    document.getElementById("data").value = "";
    document.getElementById("reuniaosPauta").value = "";
    document.getElementById("adicional").value = "";
    document.getElementById("Participante").value = "";
    document.getElementById("Projeto").value = "";
    document.getElementById("hora").value = "";

    document.getElementById("reuniaosPauta").disabled = true;
    document.getElementById("data").disabled = true;
    document.getElementById("link").disabled = true;
    document.getElementById("pauta").disabled = true;
    document.getElementById("formatado").disabled = true;
    document.getElementById("Participante").disabled = true;
    document.getElementById("Projeto").disabled = true;
    document.getElementById("hora").disabled = true;



}

function datas() { //Pega a data atual no formato DD/MM
    var data = new Date();
    var dia = String(data.getDate()).padStart(2, '0');
    var mes = String(data.getMonth() + 1).padStart(2, '0');
    dataAtual = dia + "/" + mes;
    document.getElementById("data").value = dataAtual;
}

function escreve() { //Escreve na tela "Projeto - Data" o projeto seleciado e a data
    var texto = document.getElementById('reuniaosPauta').options[document.getElementById('reuniaosPauta').selectedIndex].innerText;


    if (texto === 'Outra') { //caso o projeto seja 'outra' esreve somente '- DATA'
        document.getElementById("Projeto").value = '';
    }
    else {
        document.getElementById("Projeto").value = texto;
    }

}

function envio() { //Função de enviar via whatsapp

    var texto = document.getElementById("formatado").value;
    if (texto === "") {
        popup("ERRO, 'Texto Formatado' encontra-se em branco");
    }
    else {
        texto = window.encodeURIComponent(texto);
        window.open("https://api.whatsapp.com/send?1=pt_BR&text=" + texto, "_blank");
    }

}

function habilita() { //funçao para habilitar os quadros na tela inicial
    document.getElementById("reuniaosPauta").disabled = false;
    document.getElementById("data").disabled = false;
    document.getElementById("link").disabled = false;
    document.getElementById("pauta").disabled = false;
    document.getElementById("formatado").disabled = false;
    document.getElementById("hora").disabled = false;
    document.getElementById("Projeto").disabled = false;
    document.getElementById("Participante").disabled = false;


}

function Muda() {//troca os projetos de acordo com a gerencia

    var select = document.getElementById('GerenciaPauta');
    var selectSetor = document.getElementById('reuniaosPauta');

    var value = select.options[select.selectedIndex].value;

    //remove itens
    var length = selectSetor.options.length;
    var i;
    for (i = selectSetor.options.length - 1; i >= 0; i--) {
        selectSetor.remove(i);
    }

    var inicial = document.createElement('option');
    inicial.value = "";
    inicial.text = "-Selecione o Projeto-";
    selectSetor.add(inicial);
    if (value == '1') {

        fetch('GMPG.txt')
            .then(response => response.text())
            .then(text => {
                const array = text.split("\r\n");
                const Select = document.getElementById("reuniaosPauta");
                array.forEach((array) => {
                    option = new Option(array, array);
                    Select.options[Select.options.length] = option;
                })


            });

    }

    if (value == '2') {

        fetch('GMPS.txt')
            .then(response => response.text())
            .then(text => {
                const array = text.split("\r\n");
                const Select = document.getElementById("reuniaosPauta");
                array.forEach((array) => {
                    option = new Option(array, array);
                    Select.options[Select.options.length] = option;
                })


            });
    }

    if (value == '3') {

        fetch('GEMPIDE.txt')
            .then(response => response.text())
            .then(text => {
                const array = text.split("\r\n");
                const Select = document.getElementById("reuniaosPauta");
                array.forEach((array) => {
                    option = new Option(array, array);
                    Select.options[Select.options.length] = option;
                })


            });

    }

}

function NovaJanela() {
    location.href = "index.html"
}

function Principal() {
    location.href = "encaminhamento.html"
}

function Salvar() {

}