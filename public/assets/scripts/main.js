$(document).ready(function(){

  
  

  /* Testimonial Slick slider */
  $( '.testimonial-slider' ).slick({
    slidesToShow    : 3,
    slidesToScroll  : 1,
    autoplay        : true,
    autoplaySpeed   : 7000,
    dots            : true,
    arrows          : true,
    prevArrow       : "<button type='button' class='slick-prev pull-left'><i class='fas fa-arrow-alt-left'></i></button>",
    nextArrow       : "<button type='button' class='slick-next pull-right'><i class='fas fa-arrow-alt-right'></i></button>",
    regionLabel     : 'thumbnails carousel',
    centerMode      : true,
    centerPadding   : "0px",
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow    : 3,
          slidesToScroll  : 1,
          arrows          : false,
          prevArrow       : "",
          nextArrow       : "",
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow    : 1,
          slidesToScroll  : 1,
          arrows          : false,
          prevArrow       : "",
          nextArrow       : "",
        }
      }
    ]
  });


  /* Match Height */
  jQuery( '.howitwork-sec .left-box' ).matchHeight({
    byRow:true
  });
  jQuery( '.book-test-sec .tabbing .tab-boxes' ).matchHeight({
    byRow:true
  });
  jQuery( '.book-test-sec .tabbing .tab-boxes h6' ).matchHeight({
    byRow:true
  });
  jQuery( '.book-test-sec .tab-boxes .small-desc' ).matchHeight({
    byRow:true
  });
  jQuery( '.book-test-sec .tab-content .test-box' ).matchHeight({
    byRow:true
  });
  jQuery( '.book-test-sec .tab-content .test-box .package-name' ).matchHeight({
    byRow:true
  });
  jQuery( '.testimonial-sec .testi-box' ).matchHeight({
    byRow:true
  });
  jQuery( '.testimonial-sec .testi-box .test-name' ).matchHeight({
    byRow:true
  });
  jQuery( '.testimonial-sec .testi-box .desc' ).matchHeight({
    byRow:true
  });


  var windowSize = $(window).width();
  if ( windowSize < 1200 ) {
    jQuery( '.site-header .parent-menu' ).on('click', function () {
      jQuery( this ).find( '.sub-menu' ).slideToggle( 'slow' );
    });
  }



  // Slot Popup
  jQuery( '.slots-popup .checkboxes-data #none-people' ).click(function() {
    jQuery( '#select-dates' ).removeClass('invisible');
    jQuery( '#select-dates' ).addClass('visible');
    jQuery( '#no-more-one' ).addClass('invisible');
    jQuery( '#no-more-one' ).removeClass('visible');
  });
  jQuery( '.slots-popup .checkboxes-data #one-more' ).click(function() {
    jQuery( '#no-more-one' ).removeClass('invisible');
    jQuery( '#no-more-one' ).addClass('visible');
    jQuery( '#select-dates' ).removeClass('visible');
    jQuery( '#select-dates' ).addClass('invisible');
  });


});





// Hover Button Js

