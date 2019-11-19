//-------------------------------------------- Window Change ---------------------------------------------------------//
/**
 * Update page on Width size
 */
$(document).ready(function () {
    // Scroll to top
    $('#to-top').on('click', function () {
        let hash = $(this).data('hash');
        if (hash) {
            $('html, body').animate({
                scrollTop: $(document.getElementById(hash)).offset().top
            }, 800, function () {
                window.location.hash = hash;
            });
        }
    });
});

// Check scrolling
window.onscroll = function () {
    scrollFunction()
};

/**
 * When the user scrolls down 20px from the top of the document, show the button
 */
function scrollFunction() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        document.getElementById('to-top').style.display = 'block';
    } else {
        document.getElementById('to-top').style.display = 'none';
    }
}

/*
 * This method is used for validation of the login form modal
 */
let modal = document.getElementById('LoginModal');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};


//--------------------------------------------- Leaflet Map ----------------------------------------------------------//
//
// let mymap = L.map('mapid').setView([35.166262, 33.32693], 16);
// let marker = L.marker([35.166262, 33.32693]).addTo(mymap);
//
// L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
//     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
//         '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © ' +
//         '<a href="https://www.mapbox.com/">Mapbox</a>',
//     maxZoom: 18,
//     id: 'mapbox.streets',
//     accessToken: 'pk.eyJ1IjoibWF2cm9zIiwiYSI6ImNrMzFvc2YwbDBhZmQzZXBnYmNwZmlpZ3UifQ.Tf5U3k-a8MdaJcQXkgOzmw'
// }).addTo(mymap);
//
// marker.bindPopup("<b>Fitness Factory Nicosia</b><br>Address : Pindou 4 <br> Egkomi 2409 .").openPopup();