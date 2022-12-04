$(document).ready(function() {
    $(document).on('click', '#buttonRequest', function() {
        getFrase('frase1', '1', '9000')
        .then(() => {
            return getFrase('frase2', '2', '5000')
            .then(() => {
                return getFrase('frase3', '3', '2000');
            });
        })
        .then(() => {
            console.log('Eu serei o último a ser exibido');
        })
    });
});

function getFrase(id, nr, tempo) {
    Swal.close();
    Swal.fire({ text: 'Aguarde! Solicitando frase ' + nr + '...' })
    Swal.showLoading()

    let url = `https://api.adviceslip.com/advice`;

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            fetch(url)
            .then((response) => response.json())
            .then((data) => {
                $("#" + id).html(data.slip.advice)
                $("#" + id).append(' ID - ' + nr);
                return data;
            })
            .then((data) => {
                Swal.close();
                resolve(data);
            });
        }, tempo)
    });
}