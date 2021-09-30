//const ProjetoList = document.querySelector()
const db = firebase.firestore()
// db.collection('Gerencia').get()
//     .then(snapshot => {

//         snapshot.docs.forEach(doc => {
//             console.log(doc.data())

//         })
//     })
//     .catch(err => {
//         console.log(err.message)
//     })

function salvarBD() {

    var encaminhamento = document.getElementById("primeiro").value;
    var importante = document.getElementById("ponto").value;
    var ReuniaoData = document.getElementById("data").value;
    var gerencia = document.getElementById("gerencia").value;
    var usuario = document.getElementById("NomeUsuario").value;

    var nomeProjeto = document.getElementById("data").value;
    var array = nomeProjeto.split("-");
    nomeProjeto = array[0];

    var um = document.querySelector('select');
    var dois = um.children[um.selectedIndex];
    var tres = dois.textContent;
    gerencia = tres;

    if (ReuniaoData === "" | gerencia === "" | usuario === "") {//Validação de campos em branco
        popup("Algum campo obrigatorio foi deixado em branco(*)")


    }
    else {
        if (encaminhamento === "" & importante === "") {//Validação de campos em branco
            popup("encaminhamentos ou Informações está vazio");
        }
        else {

            var texto = document.getElementById("primeiro").value;
            var vetorString = texto.split("\n");
            var tamanho = vetorString.length;
            var linha;
            var responsavel;
            var dataEncaminhamento;

            var teste = document.querySelector('input[name="inlineRadioOptions"]:checked').value;
            //Verificação se é ou nao ponto de controle
            var pontoControle;
            if (teste === "1") {
                pontoControle = "Sim"
                //document.getElementById("segundo").value += "*Ponto de Controle " + document.getElementById("data").value + "*\n";//SALVAR COMO SIM
            }
            else {
                pontoControle = "Nao"
                //document.getElementById("segundo").value += "*Reunião " + document.getElementById("data").value + "*\n";//SALVAR COMO NAO
            }

            if (encaminhamento !== "") {//verificação

                for (var i = 0; i < tamanho; i++) { //For principal que faz a varredura do da String
                    var aux = vetorString[i];

                    //primeira parte do texto - encaminhamentos escreve "- TEXTO. *"
                    var posicao = aux.indexOf("#"); //Busca a posição do primeiro '#' caso nao encontra retorna -1
                    if (posicao > -1) { // verifica se a posição é valida


                        linha = aux.substr(0, posicao); //SALVAR LINHA DO ENCMAINHAMENTO ATE O PRIMEIRO #

                        //segunda parte do texto, responsavel. Escreve "RESPONSAVEL. Prazo: DATA"
                        parte2 = aux.slice(posicao + 1);
                        var posicao = parte2.indexOf("#"); //Busca ca posição do segundo "#" caso nao encontra retorna -1
                        if (posicao > -1) {// verifica se a posição é valida

                            responsavel = parte2.substr(0, posicao);
                            if (parte2.substr(posicao + 1).toLowerCase().includes('hoje')) { //verificar
                                var data = new Date();
                                var dia = String(data.getDate()).padStart(2, '0');
                                var mes = String(data.getMonth() + 1).padStart(2, '0');
                                dataAtual = dia + "/" + mes;
                                dataEncaminhamento = dataAtual;
                            }
                            else {
                                dataEncaminhamento = parte2.substr(posicao + 1);
                            }

                        }
                        else {
                            responsavel = parte2;
                        }

                    }
                    else {
                        linha = aux;
                    }

                    db.collection("encaminhamento").add({
                        data: dataEncaminhamento,
                        nome_gerencia: gerencia,
                        nome_projeto: nomeProjeto,
                        ponto_controle: pontoControle,
                        texto: linha,
                        nome_responavel: responsavel,
                        nome_criador: usuario

                    })

                    // document.getElementById("segundo").value += linha;
                    // document.getElementById("segundo").value += "\n" + responsavel;
                    // document.getElementById("segundo").value += "\n" + dataEncaminhamento;
                    // document.getElementById("segundo").value += "\n" + gerencia;
                    // document.getElementById("segundo").value += "\n" + usuario;
                    // document.getElementById("segundo").value += "\n" + pontoControle;
                    // document.getElementById("segundo").value += "\n" + nomeProjeto;

                }
            }




            popup("Dados salvos")
        }
    }
}

function select() {
    var select = document.getElementById('gerencia');
    var chave = select.options[select.selectedIndex].value;

    db.collection('Gerencia').doc(chave).get()
        .then(function (doc) {

            const gerencia = doc.data()

            console.log(gerencia)

        })
        .catch(err => {
            console.log(err.message)
        })

    document.getElementById('reuniao').classList = gerencia
}