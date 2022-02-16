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
    tiposSimulacao();
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

    rendeGrafico(obj.graficoValores)
}

function rendeGrafico (array) {
    console.log(array.comAporte[1]);
    var arrayComAporte = [];
    var arraySemAporte = [];
    for(let i=0; i<10; i++) {
        arrayComAporte.push([array.comAporte[i]])
        arraySemAporte.push([array.semAporte[i]])
        console.log(array.comAporte[i])

    }
    console.log(arrayComAporte,arraySemAporte);


    // Load the Visualization API and the corechart package.
    google.charts.load('current', {'packages':['corechart']});

    // Set a callback to run when the Google Visualization API is loaded.
    google.charts.setOnLoadCallback(drawChart);

    // Callback that creates and populates a data table,
    // instantiates the pie chart, passes in the data and
    // draws it.
    function drawChart() {
        // Create the data table.
        var data = google.visualization.arrayToDataTable([
            ['Tempo (meses)','Sem Aporte', 'Com Aporte'],
            ['0', array.semAporte[0], array.comAporte[0]],
            ['1', array.semAporte[1], array.comAporte[1]],
            ['2', array.semAporte[2], array.comAporte[2]],
            ['3', array.semAporte[3], array.comAporte[3]],
            ['4', array.semAporte[4], array.comAporte[4]],
            ['5', array.semAporte[5], array.comAporte[5]],
            ['6', array.semAporte[6], array.comAporte[6]],
            ['7', array.semAporte[7], array.comAporte[7]],
            ['8', array.semAporte[8], array.comAporte[8]],
            ['9', array.semAporte[9], array.comAporte[9]],
            ['10', array.semAporte[10], array.comAporte[10]]
          ]);

        // Set chart options
        var options = {
            width: 800,
            height: 200,
            title: "Projeção de Valores",
            legend: { position: 'bottom', maxLines: 4 },
            bar: { groupWidth: '75%' },
            isStacked: true,
            vAxis: {
                title: 'Valor (R$)'
              },
            hAxis: {
                title: "Tempo (meses)"
            }
              
          };
        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.ColumnChart(document.getElementById('grafico'));
        chart.draw(data, options);
    } 
}


function limparCampos(parent) {
    while(parent.firstChild){
        parent.removeChild(parent.firstChild)
    }
}   