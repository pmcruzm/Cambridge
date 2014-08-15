/**********************
FUNCIONES JQUERY
Autor:Pedro de la Cruz
Fecha: 7-8-2014
Cliente: Cambridge University Press
***********************/


/**********************
VARIABLES
**********************/
var pag_slider=1;
var total_slider=0,width_scroll=0;




jQuery.noConflict();


jQuery(window).load(function(){});

jQuery(document).ready(function(){
	
	//Reiniciar Scroll a 0
	//jQuery('body').scrollTo( "0px", 0);
	jQuery(window).scroll(control_scroll);
	
	//Menú principal y submenús
	jQuery(document).on("mouseenter",".main-menu > li,.other-menu > li", function(e) {	
		jQuery('.main-menu li').removeClass('active');
		jQuery('.other-menu li').removeClass('active');
		jQuery('.desplegable-sub').removeClass('active');
		jQuery( this ).addClass('active');
		jQuery( this ).find('.desplegable-sub').addClass('active');
	}).on("mouseleave",".main-menu > li,.other-menu > li", function(e) {
		jQuery( this ).removeClass('active');
		jQuery( this ).find('.desplegable-sub').removeClass('active');
	});	
	
	//Menú multilanguage
	jQuery(document).on("mouseenter",".select-lang", function(e) {	
		jQuery('.main-menu li').removeClass('active');
		jQuery('.other-menu li').removeClass('active');
		jQuery('.desplegable-sub').removeClass('active');
		jQuery( this ).addClass('active');
		jQuery( this ).find('.desplegable-lang').addClass('active');
	}).on("mouseleave",".select-lang", function(e) {
		jQuery( this ).removeClass('active');
		jQuery( this ).find('.desplegable-lang').removeClass('active');
	});	
	
	//Menú mobile
	jQuery(document).on("mouseenter",".menu-mob", function(e) {	
		jQuery('.main-menu li').removeClass('active');
		jQuery('.other-menu li').removeClass('active');
		jQuery('.desplegable-sub').removeClass('active');
		jQuery( this ).addClass('active');
		jQuery( this ).find('.mobile-menus').addClass('active');
	}).on("mouseleave",".menu-mob", function(e) {
		jQuery( this ).removeClass('active');
		jQuery( this ).find('.mobile-menus').removeClass('active');
	});	
	
	//Desplegar menús enlaces mobile
	jQuery(document).on("click",".list-menu-mob ul li a", function(e) {
		e.preventDefault();
		console.log('click');
		var enlace=jQuery(this).attr('href');
		if(enlace=='#'){
			var submenus=jQuery(this).parent().find('ul');
			if (jQuery(submenus).is(":visible") ) {
				jQuery(submenus).hide();
			} else { 
				jQuery(submenus).show();
			}
		}else{
			top.location.href=enlace;
		}
	});
	
	
	//Comprobar que solo se carga en la home
	if ( jQuery("#slider").is(":visible") ) {
		
		//Ajustamos los bloques contenidos slider 
		total_slider=jQuery(".scroll-slider div[id^='slider_']").length;
		var width_slider=jQuery("#body-slider").width();
		var aux=total_slider*width_slider;
		jQuery(".scroll-slider").css('width',(total_slider*width_slider));
		jQuery(".inside-slider").css('width',(width_slider));
		
		//Galería de la Home
		var slider=jQuery('.bxslider').bxSlider({
						  touchEnabled:false,
						  pager: false
						});
										
	}
	
	//Avanzar a la siguiente pantalla slider
	jQuery(document).on("click",".arrow-next", function(e) {
		e.preventDefault();
		slider.goToNextSlide();
		if(total_slider==pag_slider+1){
			pag_slider=pag_slider+1; 
			//Movemos contenidos
			jQuery('#body-slider').stop().clearQueue().scrollTo(jQuery('#slider_'+pag_slider),400,{axis:'x',easing:'easeInOutExpo'});
			//Deshabilitamos siguiente
			jQuery('.arrow-next').css({visibility:'hidden'});
		}else{
			pag_slider=pag_slider+1;
			//Movemos contenidos
			jQuery('#body-slider').stop().clearQueue().scrollTo(jQuery('#slider_'+pag_slider),400,{axis:'x',easing:'easeInOutExpo'});
			//pintamos el bullet correspondiente
		}
		//pintamos el bullet correspondiente
		jQuery('#nav-slider ul li a').removeClass('active');
		jQuery('#nav-slider ul li a[rel='+pag_slider+']').addClass('active');
		//Habilitamos anterior
		console.log(pag_slider);
		jQuery('.arrow-prev').css({visibility:'visible'});	
	});	
		
	//Retroceder a la siguiente pantalla del slider 
	jQuery(document).on("click",".arrow-prev", function(e) {
		e.preventDefault();
			slider.goToPrevSlide();
			if(pag_slider-1==1){
				pag_slider=pag_slider-1;
				jQuery('#body-slider').stop().clearQueue().scrollTo(jQuery('#slider_'+pag_slider),400,{axis:'x',easing:'easeInOutExpo'});
				//Deshabilitamos siguiente
				jQuery('.arrow-prev').css({visibility:'hidden'});			
			}else{
				pag_slider=pag_slider-1;
				jQuery('#body-slider').stop().clearQueue().scrollTo(jQuery('#slider_'+pag_slider),400,{axis:'x',easing:'easeInOutExpo'});
				//pintamos el bullet correspondiente
			}
			//pintamos el bullet correspondiente
			jQuery('#nav-slider ul li a').removeClass('active');
			jQuery('#nav-slider ul li a[rel='+pag_slider+']').addClass('active');
			//Habilitamos siguiente
			console.log(pag_slider);
			jQuery('.arrow-next').css({visibility:'visible'});
	});
	
	//Cuando pulsas sobre uno de los bullets del slider de la home
	jQuery(document).on("click","#nav-slider ul li a", function(e) {
		e.preventDefault();
			var pag= jQuery(this).attr('rel');
			if(pag!=='next' && pag!='prev'){
				//Añadimos color al bullet 
				jQuery('#nav-slider ul li a').removeClass('active');
				jQuery(this).addClass('active');
				pag=parseInt(pag);
				//Comprobamos si es la primera página
				if(pag==1){
					slider.goToSlide(pag-1);
					jQuery('#body-slider').stop().clearQueue().scrollTo(jQuery('#slider_'+pag),400,{axis:'x',easing:'easeInOutExpo'});
					jQuery('.arrow-prev').css({visibility:'hidden'});
					jQuery('.arrow-next').css({visibility:'visible'});
				}else{
					//Comprobamos si es la última
					if(total_slider==pag){
						slider.goToSlide(pag-1);
						jQuery('#body-slider').stop().clearQueue().scrollTo(jQuery('#slider_'+pag),400,{axis:'x',easing:'easeInOutExpo'});
						jQuery('.arrow-prev').css({visibility:'visible'});
						jQuery('.arrow-next').css({visibility:'hidden'});
					}else{
						slider.goToSlide(pag-1);
						jQuery('#body-slider').stop().clearQueue().scrollTo(jQuery('#slider_'+pag),400,{axis:'x',easing:'easeInOutExpo'});
						jQuery('.arrow-prev').css({visibility:'visible'});
						jQuery('.arrow-next').css({visibility:'visible'});
					}
				}
				pag_slider=pag;
			}
	});
	
	//Resize videos youtube con Fitvids
	if ( jQuery(".video-youtube").is(":visible") ) {
		jQuery(".video-youtube").fitVids();
	}
	
	//Menú sidebar lateral
	jQuery(document).on("click",".block-submenus>ul>li>a", function(e) {
		e.preventDefault();
		jQuery('.block-submenus>ul>li').removeClass('active');
		jQuery(this).parent().addClass('active');
	});
	
	//Cambiar Alumno-Profesor componente producto
	jQuery(document).on("click",".select-comp a", function(e) {
		e.preventDefault();
		 if(!jQuery(this).hasClass('active')) {
		 	if(jQuery(this).hasClass('alumno')){
				jQuery(this).addClass('active');
				jQuery(this).parents('.select-comp').find('.profesor').removeClass('active')
				//Mostramos Bloque
				jQuery('.block-prof').stop().clearQueue().fadeOut(800,function(){
					jQuery('.block-alum').stop().clearQueue().fadeIn(800);
				});
				
			}else{
				jQuery(this).addClass('active');
				jQuery(this).parents('.select-comp').find('.alumno').removeClass('active')
				//Mostramos Bloque
				jQuery('.block-alum').stop().clearQueue().fadeOut(800,function(){
					jQuery('.block-prof').stop().clearQueue().fadeIn(800);
				});
			}	
		 }
	});
	
	//Evento para capturar el resize de la ventana 
	jQuery( window ).resize(function() {
		
		//Obtenemos altura y anchura del navegador
			var h_win=window.innerHeight;
			var w_win=window.innerWidth;
		//Si se es menor que 992px cerrar todos submenus y limpiar botones
		/*if(w_win<992){
			jQuery('.main-menu li').removeClass('active');
			jQuery('.mobile-menus').removeClass('active');
		}
		//Cerramos desplegables mobile 
		if(w_win>991){
		
		}*/
		 
		
	});
	
	
});


/*************************
FUNCIONES JAVASCRIPT
**************************/
//Función para capturar eventos scroll
function control_scroll(e){
  //Variable de scroll	
  scrollAmount = jQuery(window).scrollTop();
}