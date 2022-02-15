let rendimentoEscolhido;
let indexacaoEscolhido;
$(function() {
    getIndicadores()
})

function validateForm() {
    let aporteInicial = document.getElementsByName("aporteInicial")[0];
    let aporteMensal = document.getElementsByName("aporteMensal")[0];
    let prazo = document.getElementsByName("prazo")[0];
    let rentabilidade = document.getElementsByName("rentabilidade")[0];
    let inputs = [aporteInicial, aporteMensal, prazo, rentabilidade];
    let flag = false;
    inputs.forEach(data => {
        if(isNaN(parseFloat(data.value))){
            document.getElementsByClassName(`valid${data.name}`)[0].style.display = 'block';
            document.getElementById(data.name).style.color = 'red'
            flag = false;
        } else {
            console.log(data);
            document.getElementsByClassName(`valid${data.name}`)[0].style.display = 'none';
            document.getElementById(data.name).style.color = 'black';
            flag = true;
        }
    })
    return flag;
}

async function getIndicadores () {
    const response = await fetch('http://localhost:3000/indicadores');
    const indicadores = await response.json()
    indicadores.forEach(index => {
        if(index.nome === 'ipca') {
            document.getElementById('ipca').value = index.valor;
        } else {
            document.getElementById('cdi').value = index.valor;
            
        }
    })
}



async function simular() {
    let validacao = validateForm();
    tiposSimulacao();
    let rendimento = document.getElementsByName('rendimento');
    let tipoIndexacao = document.getElementsByName('indexacao');
    console.log(rendimento, tipoIndexacao)
    if(validateForm()) {
        const response = await fetch('http://localhost:3000/simulacoes');
        const simulacao = await response.json()
        simulacao.forEach(dados => {
            if(dados.tipoIndexacao === indexacaoEscolhido && dados.tipoRendimento === rendimentoEscolhido) {
                renderCards(dados);
            }
        })
    } else {
        console.log('error na simulação');
    }
}

function tiposSimulacao() {
    let tipoRendimento = document.getElementsByName('rendimento');
    let tipoIndexacao = document.getElementsByName('indexacao');
    for(let i = 0; i < tipoRendimento.length; i++) {
        console.log(tipoRendimento[i].checked)
        if(tipoRendimento[i].checked) {
            rendimentoEscolhido = tipoRendimento[i].id
        }
    }
    for(let i = 0; i < tipoIndexacao.length; i++) {
        console.log(tipoIndexacao[i].checked)
        if(tipoIndexacao[i].checked) {
            indexacaoEscolhido = tipoIndexacao[i].id
        }
    }
}   

function renderCards(obj) {

    document.getElementById('resultado').style.display = 'block';
    document.getElementById('labelResultado').style.display = 'block'

    const valorFinalBruto = document.getElementById('valorFinalBruto');
    const aliquotaIr = document.getElementById('aliquotaIr');
    const valorPagoIr = document.getElementById('valorPagoIr');
    const valorFinalLiquido = document.getElementById('valorFinalLiquido');
    const valorTotalInvestido = document.getElementById('valorTotalInvestido');
    const ganhoLiquido = document.getElementById('ganhoLiquido');

    limparCampos(valorFinalBruto)
    limparCampos(aliquotaIr)
    limparCampos(valorPagoIr)
    limparCampos(valorFinalLiquido)
    limparCampos(valorTotalInvestido)
    limparCampos(ganhoLiquido)
 

    labelValorBruto = document.createElement('label');
    labelValorBruto.innerHTML = 'Valor Final Bruto';

    const valorBruto = document.createElement('h5');
    valorBruto.innerHTML = `R$ ${obj.valorFinalBruto}`;

    labelAliquota = document.createElement('label');
    labelAliquota.innerHTML = 'Alíquota do IR';

    const aliquota = document.createElement('h5');
    aliquota.innerHTML = `${obj.aliquotaIR}%`;

    labelValorPagoIR = document.createElement('label');
    labelValorPagoIR.innerHTML = 'Valor Pago em IR';

    const ValorPagoIr = document.createElement('h5');
    ValorPagoIr.innerHTML = `R$ ${obj.valorPagoIR}`;

    labelFinalLiquido  = document.createElement('label');
    labelFinalLiquido.innerHTML = 'Valor Final Líquido';

    const finalLiquido = document.createElement('h5');
    finalLiquido.innerHTML = `R$ ${obj.valorFinalLiquido}`;
    finalLiquido.id = 'finalLiquido'

    labelValorTotal = document.createElement('label');
    labelValorTotal.innerHTML = 'Valor Total Investido';

    const valorTotal = document.createElement('h5');
    valorTotal.innerHTML = `R$ ${obj.valorTotalInvestido}`;

    labelGanhoLiquido = document.createElement('label');
    labelGanhoLiquido.innerHTML = 'Ganho Líquido';

    const GanhoLiquido = document.createElement('h5');
    GanhoLiquido.innerHTML = `R$ ${obj.ganhoLiquido}`;
    GanhoLiquido.id = 'ganho'

    valorFinalBruto.appendChild(labelValorBruto)
    valorFinalBruto.appendChild(valorBruto);
    aliquotaIr.appendChild(labelAliquota);
    aliquotaIr.appendChild(aliquota);
    valorPagoIr.appendChild(labelValorPagoIR);
    valorPagoIr.appendChild(ValorPagoIr);
    valorFinalLiquido.appendChild(labelFinalLiquido);
    valorFinalLiquido.appendChild(finalLiquido);
    valorTotalInvestido.appendChild(labelValorTotal);
    valorTotalInvestido.appendChild(valorTotal);
    ganhoLiquido.appendChild(labelGanhoLiquido);
    ganhoLiquido.appendChild(GanhoLiquido);
}

function limparCampos(parent) {
    while(parent.firstChild){
        parent.removeChild(parent.firstChild)
    }
}   