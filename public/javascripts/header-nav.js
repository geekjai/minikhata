/**
 * Display Header Menu
 */
(function ($) {
  'use strict'

  var $mainHeader   = $('.main-header')
  $mainHeader.addClass( "navbar navbar-expand navbar-white navbar-light" );

  var $leftNav = $('<ul />', {
    class: 'navbar-nav'
  })

  $mainHeader.append($leftNav)

  $leftNav.append(
    "<li class='nav-item'><a class='nav-link' data-widget='pushmenu' href='#' role='button'><i class='fas fa-bars'></i></a></li>"
  )
  //Home
  $leftNav.append(
    "<li class='nav-item d-none d-sm-inline-block'><a href='/' class='nav-link'>Home</a></li>"
  )
  //Purchase
  $leftNav.append(
    "<li class='nav-item d-none d-sm-inline-block'><a href='/purchases/viewPurchases' class='nav-link'>Purchase</a></li>"
  )
/*
  var $rightNav = $('<ul />', {
    class: 'navbar-nav ml-auto'
  })
  $mainHeader.append($rightNav)
  $rightNav.append(
    "<li class='nav-item'><a class='nav-link' data-widget='control-sidebar' data-slide='true' href='#' role='button'><i class='fas fa-th-large'></i></a></li>"
  )*/
})(jQuery)
