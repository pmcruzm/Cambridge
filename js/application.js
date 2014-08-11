/**********************
FUNCIONES JQUERY
Autor:Pedro de la Cruz
Fecha: 7-8-2014
Cliente: Cambridge University Press
***********************/


/**********************
VARIABLES
**********************/

jQuery.noConflict();


jQuery(window).load(function(){});

jQuery(document).ready(function(){
	
	//Menú principal y submenús
	jQuery(document).on("mouseenter",".main-menu > li", function(e) {	
		jQuery('.main-menu li').removeClass('active');
		jQuery( this ).addClass('active');
		jQuery( this ).find('.desplegable-sub').addClass('active');
	}).on("mouseleave",".main-menu > li", function(e) {
		//jQuery( this ).removeClass('active');
		jQuery( this ).find('.desplegable-sub').removeClass('active');
	});	
	
	jQuery(document).on("mouseenter",".desplegable-sub", function(e) {	
		jQuery( this ).parent().addClass('active');
	}).on("mouseleave",".main-menu li", function(e) {
		jQuery( this ).removeClass('active');
		jQuery( this ).parent().removeClass('active');
	});	
	
	//Comprobar que solo se carga en la home
	if ( jQuery("#slider").is(":visible") ) {
		//Galería de la Home
		var slider=jQuery('.bxslider').bxSlider({
						  /*mode: 'horizontal',
						  infiniteLoop: true,
						  easing: 'easeInOutExpo',
						  auto: true,
						  autoHover: true,
						  autoControls: false,
						  useCSS: false,*/
						  pager: false,
						});
	}
	
	
});