$(document).ready(function(){
  $('#lenght').val(16)
  var hashContent = $("#hashContent");
  var generateBtn = $( "#generateBtn" );
  var copyBtn = $( "#copyBtn" );
  var form = $('.form');

  footerDate();

  form.submit(function() {
    return false;
  })

  generateBtn.click(function(){
    var hash = $.base64.btoa(CryptoJS.SHA256($("#prefix").val() + $("#service").val().toLowerCase() + $("#suffix").val()))
    if ($('#lenght').val() == 0) {
      hashContent.val(hash);
    } else {
      hashContent.val(hash.slice(0, $('#lenght').val()/2) + hash.slice(-$('#lenght').val()/2 ,hash.length));

      // If password not in viewport, scroll
      var hashContentTop = hashContent.offset().top;
      var hashContentBottom = hashContent.offset().top + hashContent.outerHeight();
      var screenBottom = $(window).scrollTop() + $(window).innerHeight();
      var screenTop = $(window).scrollTop();
      if (!((screenBottom > hashContentTop) && (screenTop < hashContentBottom))) {
        $([document.documentElement, document.body]).animate({
          scrollTop: hashContent.offset().top - 30
        }, 500);
      }
    }
  });

  copyBtn.click(function(e) {;
    var el = hashContent[0];
    var oldContentEditable = el.contentEditable,
        oldReadOnly = el.readOnly,
        range = document.createRange();

    el.contentEditable = true;
    el.readOnly = false;
    range.selectNodeContents(el);

    var s = window.getSelection();
    s.removeAllRanges();
    s.addRange(range);

    el.select();
    el.setSelectionRange(0, 999999); // A big number, to cover anything that could be inside the element.

    el.contentEditable = oldContentEditable;
    el.readOnly = oldReadOnly;

    document.execCommand('copy');
    hashContent.val('');

    $('.toast').toast('show');
  });

  // REGISTER SERVICE WORKER
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js',
    {
      scope: '/'
    })
    .then(function(registration) {
      console.log('Registration successful, scope is:', registration.scope);
    })
    .catch(function(error) {
      console.log('Service worker registration failed, error:', error);
    });
  }
});

function footerDate() {
  var date = new Date()
  $('#currentYear').html(' - '  + date.getFullYear())
}
