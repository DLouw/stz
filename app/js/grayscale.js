(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 70)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
//  $('body').scrollspy({
//    target: '#mainNav',
//    offset: 100
//  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

})(jQuery); // End of use strict

$(document).ready(function(){
  
  $(".item-content").each(function(n, item){
    //var bg = $(item).attr("href");
//    $(item).find("a").css("background-image","url(../" + bg +")");
    $(item).css('background-image','url('+$(item).attr("href")+')');
    
    //var test = $(item).find("a");
    //$(item).find("a").attr(bg);
    //console.log($(item).attr("href"));
  });
  
  $('.slider').slick({
    arrows: false,
    dots: true,
    infinite: true,
    slidesPerRow: 2,
    rows: 2,
    responsive: [
    {
      breakpoint: 480,
      settings: {
        slidesPerRow: 2,
        rows: 2,
      }
    }]
  });
  
 $('.slider').slickLightbox({
    itemSelector: '> div > div > div > div > .slide > .item-wrapper > .item-content'
});
  
  //Contact from submission
    $('#contact-form').on('submit', function (e) {
            $("#alert-box").text("Submitting your info...");
            e.preventDefault();
            console.log("submitting it now");
            var url = "serverside/contactStoltz.php";
            // POST values in the background the the script URL
            $.ajax({
                type: "POST",
                url: url,
                data: $(this).serialize(),
                success: function (data)
                {

                    // we recieve the type of the message: success x danger and apply it to the 
                    var messageAlert = 'alert-' + data.type;
                    var messageText = data.message;
                    $("#alert-box").text("Message sent!");
                    $('#contact-form')[0].reset();
                        setTimeout(function(){
                            $("#alert-box").text("Request a consultation");
                        }, 1000);
                        
                }
            });

    });
    
});

function loaded(){
    $("body").removeClass("noscroll");
    $(".logo-live-mech").addClass("spin2");
    $("#mainNav").show();
    $(".loader").animate({opacity: 0}, 3000, function(){
        $(".loader").hide();
    })
}
