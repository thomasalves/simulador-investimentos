/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/assets/css/style.css":
/*!**********************************!*\
  !*** ./src/assets/css/style.css ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://eqi-investimentos/./src/assets/css/style.css?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _assets_css_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assets/css/style.css */ \"./src/assets/css/style.css\");\n\r\n\r\nlet rendimentoEscolhido;\r\nlet indexacaoEscolhido;\r\n$(function() {\r\n    getIndicadores()\r\n})\r\nlet btnsimular = document.getElementById('simular')\r\nsimular.addEventListener('click', simular())\r\n\r\nfunction validateForm() {\r\n    let aporteInicial = document.getElementsByName(\"aporteInicial\")[0];\r\n    let aporteMensal = document.getElementsByName(\"aporteMensal\")[0];\r\n    let prazo = document.getElementsByName(\"prazo\")[0];\r\n    let rentabilidade = document.getElementsByName(\"rentabilidade\")[0];\r\n    let inputs = [aporteInicial, aporteMensal, prazo, rentabilidade];\r\n    let flag = false;\r\n    inputs.forEach(data => {\r\n        if(isNaN(parseFloat(data.value))){\r\n            document.getElementsByClassName(`valid${data.name}`)[0].style.display = 'block';\r\n            document.getElementById(data.name).style.color = 'red'\r\n            flag = false;\r\n        } else {\r\n            console.log(data);\r\n            document.getElementsByClassName(`valid${data.name}`)[0].style.display = 'none';\r\n            document.getElementById(data.name).style.color = 'black';\r\n            flag = true;\r\n        }\r\n    })\r\n    return flag;\r\n}\r\n\r\nasync function getIndicadores () {\r\n    const response = await fetch('http://localhost:3000/indicadores');\r\n    const indicadores = await response.json()\r\n    indicadores.forEach(index => {\r\n        if(index.nome === 'ipca') {\r\n            document.getElementById('ipca').value = index.valor;\r\n        } else {\r\n            document.getElementById('cdi').value = index.valor;\r\n            \r\n        }\r\n    })\r\n}\r\n\r\nasync function simular() {\r\n    tiposSimulacao();\r\n    if(validateForm()) {\r\n        const response = await fetch('http://localhost:3000/simulacoes');\r\n        const simulacao = await response.json()\r\n        simulacao.forEach(dados => {\r\n            if(dados.tipoIndexacao === indexacaoEscolhido && dados.tipoRendimento === rendimentoEscolhido) {\r\n                renderCards(dados);\r\n            }\r\n        })\r\n    } else {\r\n        console.log('error na simulação');\r\n    }\r\n}\r\n\r\nfunction tiposSimulacao() {\r\n    let tipoRendimento = document.getElementsByName('rendimento');\r\n    let tipoIndexacao = document.getElementsByName('indexacao');\r\n    for(let i = 0; i < tipoRendimento.length; i++) {\r\n        console.log(tipoRendimento[i].checked)\r\n        if(tipoRendimento[i].checked) {\r\n            rendimentoEscolhido = tipoRendimento[i].id\r\n\r\n        }\r\n    }\r\n    for(let i = 0; i < tipoIndexacao.length; i++) {\r\n        console.log(tipoIndexacao[i].checked)\r\n        if(tipoIndexacao[i].checked) {\r\n            indexacaoEscolhido = tipoIndexacao[i].id\r\n        }\r\n    }\r\n}   \r\n\r\nfunction renderCards(obj) {\r\n\r\n    document.getElementById('resultado').style.display = 'block';\r\n    document.getElementById('labelResultado').style.display = 'block'\r\n\r\n    const valorFinalBruto = document.getElementById('valorFinalBruto');\r\n    const aliquotaIr = document.getElementById('aliquotaIr');\r\n    const valorPagoIr = document.getElementById('valorPagoIr');\r\n    const valorFinalLiquido = document.getElementById('valorFinalLiquido');\r\n    const valorTotalInvestido = document.getElementById('valorTotalInvestido');\r\n    const ganhoLiquido = document.getElementById('ganhoLiquido');\r\n\r\n    limparCampos(valorFinalBruto)\r\n    limparCampos(aliquotaIr)\r\n    limparCampos(valorPagoIr)\r\n    limparCampos(valorFinalLiquido)\r\n    limparCampos(valorTotalInvestido)\r\n    limparCampos(ganhoLiquido)\r\n \r\n\r\n    labelValorBruto = document.createElement('label');\r\n    labelValorBruto.innerHTML = 'Valor Final Bruto';\r\n\r\n    const valorBruto = document.createElement('h5');\r\n    valorBruto.innerHTML = `R$ ${obj.valorFinalBruto}`;\r\n\r\n    labelAliquota = document.createElement('label');\r\n    labelAliquota.innerHTML = 'Alíquota do IR';\r\n\r\n    const aliquota = document.createElement('h5');\r\n    aliquota.innerHTML = `${obj.aliquotaIR}%`;\r\n\r\n    labelValorPagoIR = document.createElement('label');\r\n    labelValorPagoIR.innerHTML = 'Valor Pago em IR';\r\n\r\n    const ValorPagoIr = document.createElement('h5');\r\n    ValorPagoIr.innerHTML = `R$ ${obj.valorPagoIR}`;\r\n\r\n    labelFinalLiquido  = document.createElement('label');\r\n    labelFinalLiquido.innerHTML = 'Valor Final Líquido';\r\n\r\n    const finalLiquido = document.createElement('h5');\r\n    finalLiquido.innerHTML = `R$ ${obj.valorFinalLiquido}`;\r\n    finalLiquido.id = 'finalLiquido'\r\n\r\n    labelValorTotal = document.createElement('label');\r\n    labelValorTotal.innerHTML = 'Valor Total Investido';\r\n\r\n    const valorTotal = document.createElement('h5');\r\n    valorTotal.innerHTML = `R$ ${obj.valorTotalInvestido}`;\r\n\r\n    labelGanhoLiquido = document.createElement('label');\r\n    labelGanhoLiquido.innerHTML = 'Ganho Líquido';\r\n\r\n    const GanhoLiquido = document.createElement('h5');\r\n    GanhoLiquido.innerHTML = `R$ ${obj.ganhoLiquido}`;\r\n    GanhoLiquido.id = 'ganho'\r\n\r\n    valorFinalBruto.appendChild(labelValorBruto)\r\n    valorFinalBruto.appendChild(valorBruto);\r\n    aliquotaIr.appendChild(labelAliquota);\r\n    aliquotaIr.appendChild(aliquota);\r\n    valorPagoIr.appendChild(labelValorPagoIR);\r\n    valorPagoIr.appendChild(ValorPagoIr);\r\n    valorFinalLiquido.appendChild(labelFinalLiquido);\r\n    valorFinalLiquido.appendChild(finalLiquido);\r\n    valorTotalInvestido.appendChild(labelValorTotal);\r\n    valorTotalInvestido.appendChild(valorTotal);\r\n    ganhoLiquido.appendChild(labelGanhoLiquido);\r\n    ganhoLiquido.appendChild(GanhoLiquido);\r\n\r\n    rendeGrafico(obj.graficoValores)\r\n}\r\n\r\nfunction rendeGrafico (array) {\r\n    console.log(array.comAporte[1]);\r\n    var arrayComAporte = [];\r\n    var arraySemAporte = [];\r\n    for(let i=0; i<10; i++) {\r\n        arrayComAporte.push([array.comAporte[i]])\r\n        arraySemAporte.push([array.semAporte[i]])\r\n        console.log(array.comAporte[i])\r\n\r\n    }\r\n    console.log(arrayComAporte,arraySemAporte);\r\n\r\n\r\n    // Load the Visualization API and the corechart package.\r\n    google.charts.load('current', {'packages':['corechart']});\r\n\r\n    // Set a callback to run when the Google Visualization API is loaded.\r\n    google.charts.setOnLoadCallback(drawChart);\r\n\r\n    // Callback that creates and populates a data table,\r\n    // instantiates the pie chart, passes in the data and\r\n    // draws it.\r\n    function drawChart() {\r\n        // Create the data table.\r\n        var data = google.visualization.arrayToDataTable([\r\n            ['Tempo (meses)','Sem Aporte', 'Com Aporte'],\r\n            ['0', array.semAporte[0], array.comAporte[0]],\r\n            ['1', array.semAporte[1], array.comAporte[1]],\r\n            ['2', array.semAporte[2], array.comAporte[2]],\r\n            ['3', array.semAporte[3], array.comAporte[3]],\r\n            ['4', array.semAporte[4], array.comAporte[4]],\r\n            ['5', array.semAporte[5], array.comAporte[5]],\r\n            ['6', array.semAporte[6], array.comAporte[6]],\r\n            ['7', array.semAporte[7], array.comAporte[7]],\r\n            ['8', array.semAporte[8], array.comAporte[8]],\r\n            ['9', array.semAporte[9], array.comAporte[9]],\r\n            ['10', array.semAporte[10], array.comAporte[10]]\r\n          ]);\r\n\r\n        // Set chart options\r\n        var options = {\r\n            width: 800,\r\n            height: 200,\r\n            title: \"Projeção de Valores\",\r\n            legend: { position: 'bottom', maxLines: 4 },\r\n            bar: { groupWidth: '75%' },\r\n            isStacked: true,\r\n            vAxis: {\r\n                title: 'Valor (R$)'\r\n              },\r\n            hAxis: {\r\n                title: \"Tempo (meses)\"\r\n            }\r\n              \r\n          };\r\n        // Instantiate and draw our chart, passing in some options.\r\n        var chart = new google.visualization.ColumnChart(document.getElementById('grafico'));\r\n        chart.draw(data, options);\r\n    } \r\n}\r\n\r\n\r\nfunction limparCampos(parent) {\r\n    while(parent.firstChild){\r\n        parent.removeChild(parent.firstChild)\r\n    }\r\n}   \n\n//# sourceURL=webpack://eqi-investimentos/./src/main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.js");
/******/ 	
/******/ })()
;