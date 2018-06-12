$(document).ready(function(){

  $(window).scroll(function() {
  var scroll = $(window).scrollTop();
  if (scroll >= 200) {
    $("nav").addClass("dark-nav");
    $(".nav-item a").css("color","white");
    //$(".nav-item a").removeClass("nav-link");
  } else {
    $("nav").removeClass("dark-nav");
    $(".nav-item a").css("color","black");
  }
})
})
