$(document).ready(function() {
    $(document).on('click', '#buttonRequest', function() {
        getFrase('frase1', '1', '2000')
        .then(resposta => {
            console.log(resposta);
            return getFrase('frase2', '2', '2000');
        })
        .then(resposta => {
            console.log(resposta);
            return getFrase('frase3', '3', '2000');
        })
        .then(() => {
            console.log('Eu serei o último a ser exibido');
        })
    });
});

function getFrase(id, nr, tempo) {
    Swal.fire({
        text: 'Aguarde...'
      })
    Swal.showLoading()

    let url = `https://api.adviceslip.com/advice`;

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            fetch(url)
            .then((response) => response.json())
            .then((data) => {
                $("#" + id).html(data.slip.advice)
                $("#" + id).append(' ID - ' + nr);
                resolve(data);
            })
            .then(() => {
                Swal.close();
            });
        }, tempo)
    });
}