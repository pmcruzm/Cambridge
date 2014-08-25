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
var w_container=0;
var touch_gall=0;
var send_form=0;

// Player Youtube Asíncrono
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;

//Eventos para dispositivos móviles
var ua = navigator.userAgent,
event = (ua.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i)) ? "touchstart" : "click";
var device='none';
if(ua.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i)){
	device='yes';
}



jQuery.noConflict();


jQuery(window).load(function(){
	
	//Ajustar altura bloques categoria listado-courses 
	if (jQuery('.listado-courses').is(":visible") ) {
		align_top_box('.listado-courses div.block-product');
	}
	
	//Ajustar altura bloques categoria listado-supplementary 
	if (jQuery('.listado-supplementary').is(":visible") ) {	 
		align_top_box('.listado-supplementary div.block-product');
	}
	
	//Ajustar altura bloques categoria listado-supplementary 
	if (jQuery('.listado-test').is(":visible") ) {	 
		align_top_box('.listado-test div.block-product');
	}
	
});

jQuery(document).ready(function(){
	
	//Reiniciar Scroll a 0
	//jQuery('body').scrollTo( "0px", 0);
	jQuery(window).scroll(control_scroll);
	
	//Obtenemos ancho clase container y ajustamos flecha up
	w_container=jQuery('.container').width();
	jQuery('.up-window').css({marginLeft:(w_container-50)});
	
	//Menú principal y submenús
	jQuery(document).on("mouseenter",".main-menu > li,.other-menu > li,.mobile-tab > li", function(e) {	
		jQuery('.main-menu li').removeClass('active');
		jQuery('.other-menu li').removeClass('active');
		jQuery('.desplegable-sub').removeClass('active');
		jQuery( this ).addClass('active');
		jQuery( this ).find('.desplegable-sub').addClass('active');
	}).on("mouseleave",".main-menu > li,.other-menu > li,.mobile-tab > li", function(e) {
		jQuery( this ).removeClass('active');
		jQuery( this ).find('.desplegable-sub').removeClass('active');
	});	
	
	//Menú multilanguage
	jQuery(document).on("mouseenter",".select-lang", function(e) {	
		jQuery('.main-menu li').removeClass('active');
		jQuery('.other-menu li').removeClass('active');
		jQuery('.desplegable-sub').removeClass('active');
		jQuery( this ).addClass('active');
		jQuery( this ).find('.desplegable-sub').addClass('active');
	}).on("mouseleave",".select-lang", function(e) {
		jQuery( this ).removeClass('active');
		jQuery( this ).find('.desplegable-sub').removeClass('active');
	});
	
	//Menú multilanguage eventos táctiles
	jQuery(document).on('touchstart',".other-menu li > a", function(e) {	
		e.preventDefault();
		if(!jQuery(this).parent().hasClass('active')){
			jQuery('.other-menu li').removeClass('active');
			jQuery('.desplegable-sub').removeClass('active');
			jQuery('.mobile-tab li').removeClass('active');
			jQuery('.mobile-menus').removeClass('active');
			jQuery( this ).parent().addClass('active');
			jQuery( this ).parent().find('.desplegable-sub').addClass('active');	
		}else{
			jQuery( this ).parent().removeClass('active');
			jQuery( this ).parent().find('.desplegable-sub').removeClass('active');
		}
	});
	
	//Menú mobile responsive
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
	
	//Menú mobile eventos táctiles
	jQuery(document).on('touchstart',".menu-mob > a", function(e) {	
		e.preventDefault();
		if(!jQuery(this).parent().hasClass('active')){
			jQuery('.other-menu li').removeClass('active');
			jQuery('.desplegable-sub').removeClass('active');
			jQuery( this ).parent().addClass('active');
			jQuery( this ).parent().find('.mobile-menus').addClass('active');	
		}else{
			jQuery( this ).parent().removeClass('active');
			jQuery( this ).parent().find('.mobile-menus').removeClass('active');
		}
	});
	
	//Desplegar menús enlaces mobile
	jQuery(document).on("click",".list-menu-mob ul li a", function(e) {
		e.preventDefault();
		var tipo = jQuery(this).parent().index();
		var enlace=jQuery(this).attr('href');
		if(enlace=='#'){
			var submenus=jQuery(this).parent().find('ul');
			if (jQuery(submenus).is(":visible") ) {
				jQuery(submenus).hide();
			} else { 
				jQuery('.list-menu-mob ul li ul').hide();
				jQuery(submenus).show();
				//Cambiamos banners según contenido 
				switch (tipo){
					case 0:
						jQuery('.banner-nosotros').show();
						jQuery('.banner-catalogo').hide();
						jQuery('.banner-teacher').hide();
					break;
					case 1:
						jQuery('.banner-nosotros').hide();
						jQuery('.banner-catalogo').show();
						jQuery('.banner-teacher').hide();
					break;
					case 2:
						jQuery('.banner-nosotros').hide();
						jQuery('.banner-catalogo').hide();
						jQuery('.banner-teacher').show();
					break;
				}
			}
		}else{
			top.location.href=enlace;
		}
	});
	
	
	//Menú Offices Contact
	jQuery(document).on('click',".opc-offices a", function(e) {	
		e.preventDefault();
		if(!jQuery(this).parent().hasClass('active')){
			jQuery( this ).parent().addClass('active');
			jQuery( this ).parent().find('.desplg_cities').stop().clearQueue().slideToggle(400);
		}else{
			jQuery( this ).parent().removeClass('active');
			jQuery( this ).parent().find('.desplg_cities').stop().clearQueue().slideToggle(400);
		}
	});
	
	//Cuando se pulsa sobre una ciudad de sales office
	jQuery(document).on("click",".desplg_cities li", function(e) {	
		e.preventDefault();
		var ciudad=jQuery(this).html();
		var indice=jQuery(this).index();
		jQuery('.opc-offices a span').html(ciudad);
		jQuery('.info-city-office').removeClass('active');
		jQuery('#office_'+indice).addClass('active');
		jQuery('.opc-offices').find('.desplg_cities').stop().clearQueue().slideToggle(400,function(){
			jQuery('.opc-offices').removeClass('actives')
		});
		
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
						  pager: false,
						  infiniteLoop: false,
						  useCSS: false,
						  onSlideNext: function(slideElement, oldIndex, newIndex){
							  //alert('OnSlidenext-'+touch_gall); 
							  if(device=='yes' && (touch_gall!=1)){
									if(newIndex!=(pag_slider+1)){
										pag_slider=parseInt(newIndex+1);
										if(pag_slider==1){
											//slider.goToSlide(pag_slider-1);
											jQuery('#body-slider').stop().clearQueue().scrollTo(jQuery('#slider_'+pag_slider),400,{axis:'x',easing:'easeInOutExpo'});
											jQuery('.arrow-prev').css({visibility:'hidden'});
											jQuery('.arrow-next').css({visibility:'visible'});
										}else{
											//Comprobamos si es la última
											if(total_slider==pag_slider){
												//slider.goToSlide(pag_slider-1);
												jQuery('#body-slider').stop().clearQueue().scrollTo(jQuery('#slider_'+pag_slider),400,{axis:'x',easing:'easeInOutExpo'});
												jQuery('.arrow-prev').css({visibility:'visible'});
												jQuery('.arrow-next').css({visibility:'hidden'});
											}else{
												//slider.goToSlide(pag_slider-1);
												jQuery('#body-slider').stop().clearQueue().scrollTo(jQuery('#slider_'+pag_slider),400,{axis:'x',easing:'easeInOutExpo'});
												jQuery('.arrow-prev').css({visibility:'visible'});
												jQuery('.arrow-next').css({visibility:'visible'});
											}
										}
										//pintamos el bullet correspondiente
										jQuery('#nav-slider ul li a').removeClass('active');
										jQuery('#nav-slider ul li a[rel='+pag_slider+']').addClass('active');
									}
							  }
							  touch_gall=0;
						 	
						  },
						  onSlidePrev: function(slideElement, oldIndex, newIndex){
							 //alert('onSlidePrev-'+touch_gall); 
							 if(device=='yes' && (touch_gall!=1)){
								if(pag_slider!=(newIndex)){
									pag_slider=parseInt(newIndex+1);
									
									if(pag_slider==1){
										//slider.goToSlide(pag_slider-1);
										jQuery('#body-slider').stop().clearQueue().scrollTo(jQuery('#slider_'+pag_slider),400,{axis:'x',easing:'easeInOutExpo'});
										jQuery('.arrow-prev').css({visibility:'hidden'});
										jQuery('.arrow-next').css({visibility:'visible'});
									}else{
										//Comprobamos si es la última
										if(total_slider==pag_slider){
											//slider.goToSlide(pag_slider-1);
											jQuery('#body-slider').stop().clearQueue().scrollTo(jQuery('#slider_'+pag_slider),400,{axis:'x',easing:'easeInOutExpo'});
											jQuery('.arrow-prev').css({visibility:'visible'});
											jQuery('.arrow-next').css({visibility:'hidden'});
										}else{
											//slider.goToSlide(pag_slider-1);
											jQuery('#body-slider').stop().clearQueue().scrollTo(jQuery('#slider_'+pag_slider),400,{axis:'x',easing:'easeInOutExpo'});
											jQuery('.arrow-prev').css({visibility:'visible'});
											jQuery('.arrow-next').css({visibility:'visible'});
										}
									}
								
									//pintamos el bullet correspondiente
									jQuery('#nav-slider ul li a').removeClass('active');
									jQuery('#nav-slider ul li a[rel='+pag_slider+']').addClass('active');
								}
							}
							touch_gall=0;
						  },
						});
										
	}
	
	//Avanzar a la siguiente pantalla slider
	jQuery(document).on("click",".arrow-next", function(e) {
		e.preventDefault();
		touch_gall=1;
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
		jQuery('.arrow-prev').css({visibility:'visible'});	
	});	
		
	//Retroceder a la siguiente pantalla del slider 
	jQuery(document).on("click",".arrow-prev", function(e) {
		e.preventDefault();
			touch_gall=1;
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
				touch_gall=1;
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
		var actual=jQuery(this);
		if(!jQuery(this).parent().hasClass('active')) {
			var cerrar=jQuery('.block-submenus>ul>li.active>ul');
			jQuery(actual).parent().addClass('active').find('ul').css({display:'none'}).slideDown(600);
			//Cerramos bloque abierto
			jQuery(cerrar).parent().addClass('type-light').find('ul').stop().clearQueue().slideToggle(600,function(){jQuery(cerrar).removeClass('active');jQuery(cerrar).parent().removeClass('active').removeClass('type-light');});
		}
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
	
	//Subir al top de la ventana 
	jQuery(document).on("click",".up-window", function(e) {
		e.preventDefault();
		jQuery("html, body").stop().clearQueue().animate({scrollTop:0}, '800', 'easeInOutExpo');
		
	});
	
	//Menú Filtros
	jQuery(document).on("click",".filter-exams>p>span", function(e) {	
		e.preventDefault();
	console.log('dentro');
		jQuery('.opc-filter').stop().clearQueue().slideToggle(600);
	});
	
	//Cuando pulsas sobre poster frame de un video
	jQuery(document).on("click",".poster-frame a", function(e) {
		e.preventDefault();
		jQuery( this ).parent().fadeOut(400,function(){
		jQuery( this ).parent().find('#player').show();	
			  player = new YT.Player('player', {
				events: {
						'onReady': onPlayerReady,
						'onStateChange': onPlayerStateChange
					  }
			  });	
		});
	});
	
	//Comprobar que solo se carga en la home
	if ( jQuery(".content-corpus").is(":visible") ) {
		var slider_corpus=jQuery('.bxslider_corpus').bxSlider({
						  pager: false,
						  infiniteLoop: true,
						  useCSS: false,
						  adaptiveHeight:true,
						  });
	}
	
	//Anterior galería Corpus
	jQuery(document).on("click",".prev_corpus", function(e) {
		e.preventDefault();
		slider_corpus.goToPrevSlide();
	});
	
	//Siguiente galería Corpus
	jQuery(document).on("click",".next_corpus", function(e) {
		e.preventDefault();
		slider_corpus.goToNextSlide();	
	});
	
	
	//Seleccionar los radio buttom al hacer click en el texto
	jQuery(document).on("click",".radio span", function(e) {
		e.preventDefault();
		jQuery(this).parent().find('input[type=radio]').prop( "checked", true );
	});
	
	//Seleccionar los checkbox buttom al hacer click en el texto
	jQuery(document).on("click",".checkbox span", function(e) {
		e.preventDefault();
		jQuery(this).parents('.checkbox').find('input[type=checkbox]').removeClass('error');	
		if (jQuery(this).parents('.checkbox').find('input[type=checkbox]').prop("checked")){
			jQuery(this).parents('.checkbox').find('input[type=checkbox]').prop( "checked", false );
		}else{
			jQuery(this).parents('.checkbox').find('input[type=checkbox]').prop( "checked", true );
		}
	});
	
	//Envío de formulario de contacto
	jQuery(document).on("submit","#contact-form", function(event) {
		if(send_form==0){
			send_reg=1;
			//Limpiamos errores si no es la primera vez
			jQuery(".errores-contact").html("");
			
			//Llamamos a la función de validar (id formulario y contenedor errores) 
			var result=validate_form('#contact-form','.errores-contact');
			if(result==1){
				event.preventDefault();
				send_reg=0;
			}
		}
	});
	
	//Envío de formulario de LABS
	jQuery(document).on("submit","#register-form", function(event) {
		if(send_form==0){
			send_reg=1;
			//Limpiamos errores si no es la primera vez
			jQuery(".errores-register").html("");
			
			//Llamamos a la función de validar (id formulario y contenedor errores) 
			var result=validate_form('#register-form','.errores-register');
			if(result==1){
				event.preventDefault();
				send_reg=0;
			}
			
		}
	});
	
	//Envío de formulario de Newsletter
	jQuery(document).on("submit","#newsletter-form", function(event) {
		if(send_form==0){
			send_reg=1;
			//Limpiamos errores si no es la primera vez
			jQuery(".errores-newsletter").html("");
			
			//Llamamos a la función de validar (id formulario y contenedor errores) 
			var result=validate_form('#newsletter-form','.errores-newsletter');
			if(result==1){
				event.preventDefault();
				send_reg=0;
			}
		}
	});
	
	//Eliminar marco de error cuando se hace click sobre un input con error
	jQuery(document).on('focus','form input,form textarea,form input[type=checkbox]',function(event){
		event.preventDefault();
		if(jQuery(this).attr('type')!='submit'){
			if(jQuery(this).hasClass('error')){	
				jQuery(this).removeClass('error');	
			}
		}
	});
	
	//Eliminar marco de error select
	jQuery(document).on('focus','form select',function(event){
		event.preventDefault();
		//Caso del select
		if(jQuery(this).parents('.custom-select').hasClass('error')){
			jQuery(this).parents('.custom-select').removeClass('error');	
		}
	
	});
	
	//Comprobar que solo se carga en corpus
	if ( jQuery("#content-corpus").is(":visible") ) {
		 var mySVGsToInject = document.querySelectorAll('img.img-svg');
		  // Do the injection
		  SVGInjector(mySVGsToInject);
	}
	
	//Ajustar altura bloques recursos productos 
	if (jQuery('.box-recursos').is(":visible") ) {
		
		//Listado cursos
		var heights = jQuery('.box-recursos div.inside-recurso').map(function ()
		{
			return jQuery(this).height();
		}).get(),
		//Obtenemos tamaño max de los cuadros 
		maxHeight = Math.max.apply(null, heights);
		console.log(maxHeight);
		//Recorremos todos los cuadros 
		 jQuery('.box-recursos div.inside-recurso').each(function() {
		 	var altura=jQuery(this).height();
			jQuery(this).attr('rel',altura);
			if(altura<maxHeight){
				jQuery(this).css({height:maxHeight});
			}else{
				jQuery(this).css({height:maxHeight});
			}
		 });
	}
	
	//Evento para capturar el resize de la ventana 
	jQuery( window ).resize(function() {
		
		//Obtenemos altura y anchura del navegador
		var h_win=window.innerHeight;
		var w_win=window.innerWidth;
		
		//Obtenemos ancho clase container y ajustamos flecha up
		w_container=jQuery('.container').width();
		jQuery('.up-window').css({marginLeft:(w_container-50)});
		
	});
	
	
});


/*************************
FUNCIONES JAVASCRIPT
**************************/

//Función para capturar eventos scroll
function control_scroll(e){
  //Variable de scroll	
  var scrollAmount = jQuery(window).scrollTop();
  var h_foot=jQuery('#footer').height();
  
  //Aparece flecha top
  if(scrollAmount>500){
		if (!jQuery('.up-window').is(":visible") ) {
			jQuery('.up-window').stop().clearQueue().fadeIn(400);
			if(jQuery(window).scrollTop() + jQuery(window).height() > jQuery(document).height() - h_foot + 20) {
			var despl=jQuery(window).scrollTop() + jQuery(window).height() - (jQuery(document).height() - h_foot)
			//console.log(despl);
				jQuery('.up-window').css({bottom:(20+despl)});
		   }else{
				jQuery('.up-window').css({bottom:20});
		   }  
		}else{
			if(jQuery(window).scrollTop() + jQuery(window).height() > jQuery(document).height() - h_foot) {
			var despl=jQuery(window).scrollTop() + jQuery(window).height() - (jQuery(document).height() - h_foot)
			//console.log(despl);
				jQuery('.up-window').css({bottom:(20+despl)});
		   }else{
				jQuery('.up-window').css({bottom:20});
		   } 
		}
   }else{
   		jQuery('.up-window').stop().clearQueue().fadeOut(400);
   }
   //jQuery('.marcador').html(scrollAmount);
}

function validateEmail(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
} 

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

// autoplay video Youtube
function onPlayerReady(event) {
	if(device!='yes'){
        event.target.playVideo();
	}
}

// when video ends Youtube
function onPlayerStateChange(event) {        
   if(event.data === 0) {            
           //Cuando acaba el video
    }
}

//Marcar errores de formulario
function errores_form(id,tipo){
	if(tipo=='text'){
		jQuery(id).val('').addClass('error');
	}else{
		jQuery(id).addClass('error');
		document.getElementById(id.substring(1)).value='';
	}
}

//Función para alinear top los cuadros
function align_top_box(id){
		//Listado cursos
		var heights = jQuery(id).map(function ()
		{
			return jQuery(this).height();
		}).get(),
		//Obtenemos tamaño max de los cuadros 
		maxHeight = Math.max.apply(null, heights);
		//console.log(maxHeight);
		//Recorremos todos los cuadros 
		 jQuery(id).each(function() {
		 	var altura=jQuery(this).height();
			if(altura<maxHeight){
				var total=maxHeight-altura;
				jQuery(this).css('paddingTop',total);
			}
		 });
}

//Funcion para validar genéricamnete un formulario
function validate_form(id,contenedor){
		//Busca todos los campos requeridos de texto
			if(jQuery(id).find('.validation-rule-empty').length > 0){
				var error_empty=0;
				var txt_empty="";
				jQuery(id).find('.validation-rule-empty').each(function() {
					var res_campo=jQuery(this).val();
					if(res_campo==""){
						error_empty=1;
						jQuery(this).addClass('error').val('');
					}
					
				});
			}
			
			//Busca todos los campos requeridos de mail
			if(jQuery(id).find('.validation-rule-mail').length > 0){
				var error_mail=0;
				var txt_mail="";
				jQuery(id).find('.validation-rule-mail').each(function() {
					var res_campo=jQuery(this).val();
					if((res_campo=="") || (res_campo!="" && validateEmail(res_campo)==false) ){
						error_mail=1;
						jQuery(this).addClass('error').val('');
					}
					
				});
			} 
			
			//Busca todos los campos requeridos de codigo postal
			if(jQuery(id).find('.validation-rule-postcode').length > 0){
				var error_postcode=0;
				var txt_postcode="";
				jQuery(id).find('.validation-rule-postcode').each(function() {
					var res_campo=jQuery(this).val();
					if((res_campo=="") || (res_campo!="" && isNumber(res_campo)==false) ){
						error_postcode=1;
						jQuery(this).addClass('error').val('');
					}
					
				});
			} 
			
			//Busca todos los campos requeridos checkbox
			if(jQuery(id).find('.validation-rule-checkbox').length > 0){
				var error_checkbox=0;
				var txt_checkbox="";
				jQuery(id).find('.validation-rule-checkbox').each(function() {
					if(!jQuery(this).prop("checked")){
						error_checkbox=1;
						jQuery(this).addClass('error');
					}
					
				});
			} 
			
			//Busca todos los campos requeridos de codigo postal
			if(jQuery(id).find('.validation-rule-select').length > 0){
				var error_select=0;
				var txt_select="";
				jQuery(id).find('.validation-rule-select').each(function() {
					var res_campo=jQuery(this).val();
					if((res_campo=="")){
						error_select=1;
						jQuery(this).parents('.custom-select').addClass('error');
					}
					
				});
			} 
			
			//Error general campos vacíos
			if(error_empty==1 || error_checkbox==1){
				var message=jQuery(id).attr('data-error-msg');
				jQuery(contenedor).append('<p>'+message+'</p>');
			}
			if(error_postcode==1){
				var message=jQuery(id).find('.validation-rule-postcode').attr('data-error-msg');
				jQuery(contenedor).append('<p>'+message+'</p>');
			}
			
			if(error_mail==1){
				var message=jQuery(id).find('.validation-rule-mail').attr('data-error-msg');
				jQuery(contenedor).append('<p>'+message+'</p>');
			}
			
			if(error_select==1){
				var message=jQuery(id).find('.validation-rule-select').attr('data-error-msg');
				jQuery(contenedor).append('<p>'+message+'</p>');
			}
			
			//Salida
			if(error_empty==1 || error_checkbox==1 || error_postcode==1 ||error_mail || error_select==1){
				return 1;
			}else{
				return 0;
			}
}

