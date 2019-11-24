(
    function() {
        'use strict';
        window.addEventListener('load', function() {
            // console.log('clicked');
            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            let forms = document.getElementsByClassName('needs-validation');
            // Loop over them and prevent submission
            // noinspection JSUnusedLocalSymbols
            let validation = Array.prototype.filter.call(forms, function(form) {
                form.addEventListener('submit', function(event) {
                    if (form.checkValidity() === false) {
                        event.preventDefault();
                        //event.stopPropagation();
                    } else {
                        //sendMail();
                    }
                    form.classList.add('was-validated');
                }, false);

            });
        }, false);

    })();

function sendMail() {
    let link;
    link = 'mailto: louis.4949@hotmail.com'
           + '?cc=apoullis79@gmail.com'
           + '&subject=' + escape('Fitness Factory Customer Message')
           + '&body=' + escape(document.getElementById('message').value + '\n\nCustomer Info\n--------------------\n' +
           'Name: ' + document.getElementById('name').value + '\n' + 'Phone: ' + document.getElementById('phone').value
           + '\nE-mail: ' +
           document.getElementById('email').value);
    window.location.href = link;
}