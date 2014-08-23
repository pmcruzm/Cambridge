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
	
	//Ajustar altura bloques categoria
	if (jQuery('.content-categoria').is(":visible") ) {
		
		//Listado cursos
		var heights = jQuery('.listado-courses div.block-product').map(function ()
		{
			return jQuery(this).height();
		}).get(),
		//Obtenemos tamaño max de los cuadros 
		maxHeight = Math.max.apply(null, heights);
		//console.log(maxHeight);
		//Recorremos todos los cuadros 
		 jQuery('.listado-courses div.block-product').each(function() {
			jQuery(this).attr('rel',altura);
		 	var altura=jQuery(this).height();
			jQuery(this).attr('rel',altura);
			if(altura<maxHeight){
				var total=maxHeight-altura;
				jQuery(this).attr('rel',altura);
				jQuery(this).css('paddingTop',total);
			}
		 });
		 
		 //Listado Supplementary
		var heights = jQuery('.listado-supplementary div.block-product').map(function ()
		{
			return jQuery(this).height();
		}).get(),
		//Obtenemos tamaño max de los cuadros 
		maxHeight = Math.max.apply(null, heights);
		//Recorremos todos los cuadros 
		 jQuery('.listado-supplementary div.block-product').each(function() {
		 	var altura=jQuery(this).height();
			if(altura<maxHeight){
				var total=maxHeight-altura;
				jQuery(this).css('padding-top',total);
			}
		 });
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
	jQuery(document).on("mouseenter",".filter-exams", function(e) {	
		jQuery( this ).find('.opc-filter').stop().clearQueue().slideToggle(600);
	}).on("mouseleave",".filter-exams", function(e) {
		jQuery( this ).find('.opc-filter').stop().clearQueue().slideToggle(600);
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
		if (jQuery(this).parent().find('input[type=checkbox]').prop("checked")){
			jQuery(this).parent().find('input[type=checkbox]').prop( "checked", false );
		}else{
			jQuery(this).parent().find('input[type=checkbox]').prop( "checked", true );
		}
	});
	
	//Envío de formulario de contacto
	jQuery(document).on("submit","#contact-form", function(event) {
		event.preventDefault();
		if(send_form==0){
			send_reg=1;
			var f_subject_c = jQuery("#subject_c").val();
			var f_message_c = document.getElementById('message_c').value;
			var f_name_c = jQuery("#name_c").val();
			var f_lastname_c = jQuery("#lastname_c").val();
			var f_email_c = jQuery("#email_c").val();
			var f_name_c_c = jQuery("#name_c_c").val();	
			var f_street_c = jQuery("#street_c").val();	
			var f_post_code_c = jQuery("#post_code_c").val();	
			
			
			if(f_subject_c!="" && f_message_c!="" && f_name_c!="" && f_lastname_c!="" && (f_email_c!="" && validateEmail(f_email_c)) && f_name_c_c!="" &&  f_street_c!="" &&   (f_post_code_c!="" && isNumber(f_post_code_c)) ){			
				//Si todo esté OK lanzamos ruta AJAX
				send_reg=0;
				console.log('q='+ Math.random()+'&subject='+f_subject_c+'&message='+f_message_c+'&name_c='+f_name_c+'&lastname_c='+f_lastname_c+'&email_c='+f_email_c+'&f_name_c_c='+f_name_c_c+'&f_street_c='+f_street_c+'&f_post_code_c='+f_post_code_c);		
				/*jQuery.ajax({
						url: ajaxurl,
						type: 'POST',
						async: true,
						data: 'action=f_register&'+data_var1,
						dataType: 'html',
						success: function(msg1){
								
								}
				});*/
			}else{
				if(f_subject_c==""){errores_form('#subject_c','text');}	
				if(f_message_c==""){errores_form('#message_c','textarea');}	
				if(f_name_c==""){errores_form('#name_c','text');}	
				if(f_lastname_c==""){errores_form('#lastname_c','text');}	
				if((f_email_c=="") || (f_email_c!="" && validateEmail(f_email_c)==false)){errores_form('#email_c','text');}	
				if(f_name_c_c==""){errores_form('#name_c_c','text');}	
				if(f_street_c==""){errores_form('#street_c','text');}	
				if((f_post_code_c=="") || (f_post_code_c!="" && isNumber(f_post_code_c)==false)){errores_form('#post_code_c','text');}	
				send_reg=0;
			}
		}
	});
	
	//Eliminar marco de error cuando se hace click sobre un input con error
	jQuery(document).on('focus','#contact-form input,#contact-form textarea',function(event){
		event.preventDefault();
		if(jQuery(this).attr('type')!='submit'){
			if(jQuery(this).hasClass('error')){	
				jQuery(this).removeClass('error');	
			}
		}
	});
	
	//Comprobar que solo se carga en corpus
	if ( jQuery("#content-corpus").is(":visible") ) {
		 var mySVGsToInject = document.querySelectorAll('img.img-svg');
		  // Do the injection
		  SVGInjector(mySVGsToInject);
	}
	
	//Opción select filtro exams
	/*jQuery(document).on("click",".opc-filter input[type=checkbox]", function(e) {
		e.preventDefault();
		if(jQuery(this).is(':checked')){
			console.log('true');
			
			jQuery(this).attr('rel');
			jQuery(this).parent().find('span').addClass('active');
		}else{
			console.log('false');
			jQuery(this).removeAttr('rel');
			jQuery(this).parent().find('span').removeClass('active');
		}
	});	*/
	
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

