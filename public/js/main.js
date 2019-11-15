//-------------------------------------------- Window Change ---------------------------------------------------------//
/**
 * Update page on Width size
 */
$(document).ready(function() {
    // Scroll to top
    $('#to-top').on('click', function() {
        let hash = $(this).data('hash');
        if (hash) {
            $('html, body').animate({
                                        scrollTop: $(document.getElementById(hash)).offset().top
                                    }, 800, function() {
                window.location.hash = hash;
            });
        }
    });
});

// Check scrolling
window.onscroll = function() {
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