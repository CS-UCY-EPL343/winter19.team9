// -------------------------------------------- Window Change
// ---------------------------------------------------------// Check scrolling
window.onscroll = function() {
  scrollFunction();
};

/**
 * When the user scrolls down 20px from the top of the document, show the
 * button and NavBar Background
 */
function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    if (screen.width > 500) {
      document.getElementById('to-top').style.display = 'block';
      document.getElementById('mainNav').style.backgroundColor = '#353535';
    } else {
      document.getElementById('to-top').style.display = 'none';
      document.getElementById('mainNav').style.backgroundColor = 'transparent';
    }
  } else {
    document.getElementById('to-top').style.display = 'none';
    document.getElementById('mainNav').style.backgroundColor = 'transparent';
  }
}

/*
 * This method is used for validation of the login form modal
 */
let modal = document.getElementById('LoginModal');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};