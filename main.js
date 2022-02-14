function validateForm() {
    let aporteInicial = document.getElementsByName("aporteInicial")[0];
    let aporteMensal = document.getElementsByName("aporteMensal")[0];
    let prazo = document.getElementsByName("prazo")[0];
    let rentabilidade = document.getElementsByName("rentabilidade")[0];
    let inputs = [aporteInicial, aporteMensal, prazo, rentabilidade];
    console.log(inputs);


    inputs.forEach(data => {
        if(isNaN(parseFloat(data.value))){
            console.log(data.name)
            document.getElementsByClassName(`valid${data.name}`)[0].style.display = 'block';
            document.getElementById(data.name).style.color = 'red'
            return false;
        } else {
            console.log(data);
            document.getElementsByClassName(`valid${data.name}`)[0].style.display = 'none';
            let label = document.getElementById(data.name).style.color = 'black';
            console.log(label)
            return true;
        }

    })
}