$(document).ready(function() {
    $(document).on('click', '#buttonRequest', function() {
        

        executa();
    });
});

async function executa() {
    try {
        await getFrase('frase1', '1', '9000');
        await getFrase('frase2', '2', '5000');
        await getFrase('frase3', '3', '2000');
    } catch (e) {
        console.log(e);
    }

    Swal.close();
}

function getFrase(id, nr, tempo) {
    let url = `https://api.adviceslip.com/advice`;

    Swal.close();
    Swal.fire({ text: 'Aguarde! Solicitando frase ' + nr + '...' })
    Swal.showLoading();

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(typeof id !== 'string') {
                reject('Caiu no erro');
                return;
            }

            fetch(url)
            .then((response) => response.json())
            .then((data) => {
                $("#" + id).html(data.slip.advice)
                $("#" + id).append(' ID - ' + nr);
            })
            .then(() => {
                resolve('Busca de frase concluída com sucesso!');
                return;
            })
            .catch(e => {
                console.log(e);
                
            });
        }, tempo);

    });
}