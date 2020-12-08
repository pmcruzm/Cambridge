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
var n_course_b=1;
var slider_destc;
var act_player=0;

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


function loadAnalytics() {

	//GTM
	(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
	new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
	j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
	'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
	})(window,document,'script','dataLayer','GTM-5F9T9CL');


	//Facebook Pixel
	!function(f,b,e,v,n,t,s)
	{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
	n.callMethod.apply(n,arguments):n.queue.push(arguments)};
	if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
	n.queue=[];t=b.createElement(e);t.async=!0;
	t.src=v;s=b.getElementsByTagName(e)[0];
	s.parentNode.insertBefore(t,s)}(window,document,'script',
	'https://connect.facebook.net/en_US/fbevents.js');
	fbq('init', '1648852078670494');
	fbq('track', 'PageView');
}


jQuery(window).load(function(){

	//Ajustar altura bloques categoria listado-courses
	if (jQuery('.listado-courses').is(":visible") ) {
		//align_top_box('.listado-courses div.block-product');
		jQuery('.listado-courses').each(function() {
			align_top_box(jQuery(this).find('div.block-product'));
		});
	}

	//Ajustar altura bloques categoria listado-supplementary
	if (jQuery('.listado-supplementary').is(":visible") ) {
		//align_top_box('.listado-supplementary div.block-product');
		jQuery('.listado-supplementary').each(function() {
			align_top_box(jQuery(this).find('div.block-product'));
		});
	}

	//Ajustar altura bloques categoria listado-supplementary
	if (jQuery('.listado-test').is(":visible") ) {
		//align_top_box('.listado-test div.block-product');
		jQuery('.listado-test').each(function() {
			align_top_box(jQuery(this).find('div.block-product'));
		});
	}

	//Ajustar altura bloques de course supplementary
	if (jQuery('.cont-course-sup').is(":visible") ) {
		jQuery('.cont-course-sup .list-courses-sup').each(function() {
			align_top_box(jQuery(this).find('div.block-product'));
		});
	}

	//Menú flotante ficha nueva de producto
	if (jQuery('.new-product').is(":visible") ) {
		var d_ficha=jQuery('.ficha-producto').offset().top;
		jQuery('.float-colum-menu').css({top:Math.round(d_ficha)-220});
	}

	//Ajustar altura bloques recursos productos
	if (jQuery('.box-recursos').is(":visible") ) {
		jQuery('.box-recursos div.inside-recurso').removeAttr('style');
		//Listado cursos
		var heights = jQuery('.box-recursos div.inside-recurso').map(function ()
		{
			return jQuery(this).height();
		}).get(),
		//Obtenemos tamaño max de los cuadros
		maxHeight = Math.max.apply(null, heights);
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

	//Igualar todos los bloques de exámenes home
	if (jQuery('.list-home-exams').is(":visible") ) {
		//Listado cursos
		var heights = jQuery('.list-home-exams a.block-h-exam').map(function ()
		{
			return jQuery(this).outerHeight();
		}).get(),
		//Obtenemos tamaño max de los cuadros
		maxHeight = Math.max.apply(null, heights);
		jQuery('.list-home-exams .block-h-exam').each(function() {
			jQuery(this).css('height',maxHeight);
		});
	}

	//Igualar todos los bloques cards de la home
	if (jQuery('.bottom-box').is(":visible") ) {
		//Listado cursos
		var heights = jQuery('.bottom-box div.thumbnails').map(function ()
		{
			return jQuery(this).outerHeight();
		}).get(),
		//Obtenemos tamaño max de los cuadros
		maxHeight = Math.max.apply(null, heights);
		jQuery('.bottom-box div.thumbnails').each(function() {
			jQuery(this).css('height',maxHeight);
		});
	}

	//Cargamos la galería del Blog después de cargar los datos
	if ( jQuery("#slider").is(":visible") ) {
		if ( jQuery(".box-d-blog").length>0) {
			//Obtenemos altura y anchura del navegador
			var w_win=window.innerWidth;
			if(w_win<992){
				if(w_win<481){
				//Galería destacdos blog
				slider_destc=jQuery('.bxslider-destacados').bxSlider({
									  pager: true,
									  infiniteLoop: true,
									  useCSS: false,
									  adaptiveHeight: false,
									  auto: true,
									  autoHover: true,
									  controls: false,
									  pause: 5000,
									  speed:800,
									  onSlideBefore: function(slideElement, oldIndex, newIndex){
									  },
									  onSlideAfter: function(slideElement, oldIndex, newIndex){
									  },
									  onSlideNext: function(slideElement, oldIndex, newIndex){
									  },
									  onSlidePrev: function(slideElement, oldIndex, newIndex){
									  },
									});
				}else{
					//Galería destacdos blog
					slider_destc=jQuery('.bxslider-destacados').bxSlider({
										  pager: true,
										  infiniteLoop: true,
										  useCSS: false,
										  adaptiveHeight: false,
										  auto: true,
										  autoHover: true,
										  controls: false,
										  minSlides: 2,
										  maxSlides: 2,
										  slideWidth: 450,
										  slideMargin: 0,
										  pause: 5000,
										  speed:800,
										  onSlideBefore: function(slideElement, oldIndex, newIndex){
										  },
										  onSlideAfter: function(slideElement, oldIndex, newIndex){
										  },
										  onSlideNext: function(slideElement, oldIndex, newIndex){
										  },
										  onSlidePrev: function(slideElement, oldIndex, newIndex){
										  },
										});
				}
			}else{
				//Galería destacdos blog
				slider_destc=jQuery('.bxslider-destacados').bxSlider({
									  pager: true,
									  infiniteLoop: true,
									  useCSS: false,
									  adaptiveHeight: false,
									  auto: true,
									  autoHover: true,
									  controls: false,
									  pause: 5000,
									  speed:800,
									  onSlideBefore: function(slideElement, oldIndex, newIndex){
									  },
									  onSlideAfter: function(slideElement, oldIndex, newIndex){
									  },
									  onSlideNext: function(slideElement, oldIndex, newIndex){
									  },
									  onSlidePrev: function(slideElement, oldIndex, newIndex){
									  },
									});
			}
		}
	}

});

jQuery(document).ready(function(){

	//Miramos si la cookie de aceptación está creada
	if(jQuery.cookie('cambridge') == 'acepta'){
		//Ocultamos info cookies
		jQuery('.block-cookies').hide();

		loadAnalytics()
	}else{
		jQuery('.block-cookies').show();
	}


	//Añadimos clase a los menús que no tienen hijos
	jQuery('#top-header ul.main-menu li').each(function() {
		if(jQuery(this).find('.desplegable-sub').length ==0){
			jQuery(this).addClass('no-submenu');
		}
	});

	//Cargar título del cuadro de contacto
	/*if (jQuery('.info-office').is(":visible") ) {
		var name_prov=jQuery('.opc-offices a span').html();
		var language=jQuery('html').attr('lang');
		//Añadimos título y mostramos el cuadro actual
		if(language=="es"){
			jQuery('.info-city-office:first').prepend( "<h4 class='titul_office'>Oficina para "+name_prov+":</h4>");
		}else{
			jQuery('.info-city-office:first').prepend( "<h4 class='titul_office'>Office for "+name_prov+":</h4>" );
		}
	}*/

	//Menú flotante ficha nueva de producto
	if (jQuery('.new-product').is(":visible") ) {
		var d_ficha=jQuery('.ficha-producto').offset().top;
		jQuery('.float-colum-menu').css({top:Math.round(d_ficha)-220});
	}

	//Flechas custom curso_sup.html
	if (jQuery('.opc_levels').is(":visible") ) {
		//Pintamos la flecha up por defecto
		var image_up=up_svg('#bfb9b9');
		var encoded = window.btoa(image_up);
		//jQuery('.opc_levels a span').css('background-image', 'url(data:image/svg+xml;base64,'+encoded+')');
		jQuery('.opc_levels a').css('background-image', 'url(data:image/svg+xml;base64,'+encoded+')');
		//Pintamos la flecha down
		//Obtenemos el color
		var color;
		if(jQuery('#custom-color').length>0){
			color=jQuery('#custom-color').attr('data-color');
			if(color==""){color='#47b6c7';}
		}else{
			color='#47b6c7';
		}
		var image_down=down_svg(color);
		var encoded = window.btoa(image_down);
		jQuery('.opc_levels a.active').css('background-image', 'url(data:image/svg+xml;base64,'+encoded+')');
	}

	//Flechas custom componentes.html
	if (jQuery('.select-comp').is(":visible") ) {
		//Pintamos la flecha up por defecto
		var image_up=up_svg_large('#bfb9b9');
		var encoded = window.btoa(image_up);
		jQuery('.select-comp a').css('background-image', 'url(data:image/svg+xml;base64,'+encoded+')');

		//Pintamos la flecha down
		//Obtenemos el color
		var color;
		if(jQuery('#custom-color').length>0){
			color=jQuery('#custom-color').attr('data-color');
			if(color==""){color='#47b6c7';}
		}else{
			color='#47b6c7';
		}
		var image_down=down_svg_large(color);
		var encoded = window.btoa(image_down);
		jQuery('.select-comp h3 a.active').css('background-image', 'url(data:image/svg+xml;base64,'+encoded+')');

	}

	//Buscar caracter % y reemplazarlo por candado
	if(jQuery('.pill-w-table').is(":visible") ){
		jQuery('.pill-w-table td p').each(function() {
			var texto=jQuery(this).html();
			var salida="";
			if(texto.indexOf('(@)')){
				salida = texto.replace('(@)','<span class="candado">k</span>');
			}else{
				salida=texto;
			}
			jQuery(this).html(salida);
		});
	}

	//Ajustar título de cabecera
	if (jQuery('.cab-page .container h1').is(":visible") ) {
		var altura_h1=jQuery('.cab-page .container h1').height();
		jQuery('.cab-page .container h1').css('margin-top', -(altura_h1/2));
	}

	//Reiniciar Scroll a 0
	jQuery('body').scrollTo( "0px", 0,function(){
		//Pillar anclas de la url si las hay
		var hash = window.location.hash.substring(1);
		if(hash!=""){//
			if(jQuery('.select-comp').is(":visible") ) {
				//buscamos si es de alumno o de profesor
				if(jQuery('.block-alum').find('#'+hash).length>0){
					//Si es alumno
					jQuery('body').stop().clearQueue().scrollTo(jQuery('#'+hash),800,{axis:'y',easing:'easeInOutExpo',offset: -50});
				}else{
				//Si es profesor
				//Pintamos la flecha up por defecto
				var image_up=up_svg_large('#bfb9b9');
				var encoded = window.btoa(image_up);
				jQuery('.alumno').css('background-image', 'url(data:image/svg+xml;base64,'+encoded+')');
				jQuery('.profesor').addClass('active');
				//Pintamos la flecha down
				var color;
				if(jQuery('#custom-color').length>0){
					color=jQuery('#custom-color').attr('data-color');
					if(color==""){color='#47b6c7';}
				}else{
					color='#47b6c7';
				}
				var image_down=down_svg_large(color);
				var encoded = window.btoa(image_down);
				jQuery('.profesor').css('background-image', 'url(data:image/svg+xml;base64,'+encoded+')');
				jQuery('.alumno').removeClass('active');
					jQuery('.block-alum').stop().clearQueue().fadeOut(400,function(){
						jQuery('.block-prof').stop().clearQueue().fadeIn(400,function(){
							jQuery('body').stop().clearQueue().scrollTo(jQuery('#'+hash),800,{axis:'y',easing:'easeInOutExpo',offset: -50});
						});
					});
				}
			}else{
				jQuery('body').stop().clearQueue().scrollTo(jQuery('#'+hash),800,{axis:'y',easing:'easeInOutExpo'});
			}
		}
	});
	jQuery(window).scroll(control_scroll);

	//Obtenemos altura y anchura del navegador
	var h_win=window.innerHeight;
	var w_win=window.innerWidth;

	//Obtenemos ancho clase container y ajustamos flecha up
	w_container=jQuery('.container').width();
	if(w_win<481){
		jQuery('.up-window').css({marginLeft:(w_container-60)});
	}else{
		jQuery('.up-window').css({marginLeft:(w_container-50)});
	}

	//Menú principal y submenús
	jQuery(document).on("mouseenter",".main-menu > li,.other-menu > li,.mobile-tab > li", function(e) {
		jQuery('.main-menu li').removeClass('active');
		jQuery('.other-menu li').removeClass('active');
		jQuery('.desplegable-sub').removeClass('active');
		jQuery('.other-menu li').removeClass('active-right');
		jQuery('.desplegable-sub').removeClass('active-right');
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

	//Evitar fallo en el botón derecho del ratón
	jQuery(document).on("mousedown",".other-menu .desplegable-sub", function(e) {
		jQuery( this ).addClass('active-right');
		jQuery( this ).parent().addClass('active-right');
	});

	//Menú multilanguage eventos táctiles
	jQuery(document).on('touchstart',".other-menu > li > a", function(e) {
		e.preventDefault();
		if(!jQuery(this).parent().hasClass('active')){
			jQuery('.other-menu li').removeClass('active');
			jQuery('.desplegable-sub').removeClass('active');
			jQuery('.mobile-tab li').removeClass('active');
			jQuery('.mobile-menus').removeClass('active');

			//Cambiar iconos de menus mobile
			jQuery('.menu-mob > a').each(function(){
				var attr = jQuery(this).attr('rel');
				if (typeof attr !== typeof undefined && attr !== false) {
					var clase_act_o=jQuery( this ).attr('rel');
					jQuery( this ).removeClass().addClass(clase_act_o).removeAttr('rel');
				}
			});
			//Cambiar iconos de otras opciones
			jQuery('.other-menu >li > a').each(function(){
				var attr = jQuery(this).attr('rel');
				if (typeof attr !== typeof undefined && attr !== false) {
					var clase_act_o=jQuery( this ).attr('rel');
					jQuery( this ).removeClass().addClass(clase_act_o).removeAttr('rel');
				}
			});

			//Añadimos el icono de cerrar
			var clase_act=jQuery( this ).attr('class');
			jQuery( this ).removeClass().addClass('glyphicon custom-close').attr('rel',clase_act);

			jQuery( this ).parent().addClass('active');
			jQuery( this ).parent().find('.desplegable-sub').addClass('active');
		}else{
			var clase_final=jQuery( this ).attr('rel');
			jQuery( this ).removeClass().addClass(clase_final).removeAttr('rel');
			//Cambiar iconos de otras opciones
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
			//Añadimos el icono de cerrar
			var clase_act=jQuery( this ).attr('class');
			jQuery( this ).removeClass().addClass('glyphicon custom-close').attr('rel',clase_act);
			//Cambiar iconos de otras opciones
			jQuery('.other-menu >li > a').each(function(){
				var attr = jQuery(this).attr('rel');
				if (typeof attr !== typeof undefined && attr !== false) {
					var clase_act_o=jQuery( this ).attr('rel');
					jQuery( this ).removeClass().addClass(clase_act_o).removeAttr('rel');
				}
			});

			jQuery( this ).parent().addClass('active');
			jQuery( this ).parent().find('.mobile-menus').addClass('active');
		}else{
			var clase_final=jQuery( this ).attr('rel');
			jQuery( this ).removeClass().addClass(clase_final).removeAttr('rel');
			//Cambiar iconos de otras opciones
			jQuery( this ).parent().removeClass('active');
			jQuery( this ).parent().find('.mobile-menus').removeClass('active');
		}
	});

	//Desplegar menús enlaces mobile
	jQuery(document).on("click",".list-menu-mob ul li a", function(e) {
		e.preventDefault();
		var tipo = jQuery(this).parent().index();
		var enlace=jQuery(this).attr('href');
		if(jQuery(this).hasClass('open')){
			top.location.href=enlace;
		}else{
			if(jQuery(this).parent().find('ul').length > 0) {
				var submenus=jQuery(this).parent().find('ul');
				jQuery(this).addClass('open');
				if (jQuery(submenus).is(":visible") ) {
					jQuery(submenus).stop().clearQueue().slideToggle(600);
					jQuery(this).parent().removeClass('active');
				} else {
					//Buscamos el cuadro que esté abierto y lo cerramos
					var cerrar=jQuery('.list-menu-mob ul li.active');
					jQuery(submenus).css({display:'none'}).slideDown(600,function(){jQuery(this).parent().addClass('active');});
					jQuery(cerrar).find('ul').stop().clearQueue().slideToggle(600,function(){jQuery(cerrar).removeClass('active');});
					jQuery(cerrar).find('a').removeClass('open');
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
	jQuery(document).on("change",".desplg_cities select", function(e) {
		e.preventDefault();

		var text_prov=jQuery(".desplg_cities select option:selected").text();
		var opc_prov=jQuery(this).val();

		//Reemplazamos en el botón y cerramos desplegable
		jQuery('.opc-offices').removeClass('active');
		jQuery('.desplg_cities').stop().clearQueue().slideToggle(400);
		jQuery('.opc-offices a span').html(text_prov);
		//jQuery('.opc-offices a span').html(capitaliseFirstLetter(text_prov));

		//Recorremos todos los cuadros hasta encontrar
		//una coincidencia.
		jQuery('.info-city-office').each(function() {
			var list_pro=jQuery(this).attr('data-provinces');
			var array_prov=list_pro.split("|");
			//var language=jQuery('html').attr('lang');
			if(array_prov.indexOf(opc_prov)!=-1){
				//Cerramos todos los cuadros
				jQuery('.info-city-office').hide();
				//jQuery( ".titul_office" ).remove();
				//Añadimos título y mostramos el cuadro actual
				/*if(language=="es"){
					jQuery(this).prepend( "<h4 class='titul_office'>Oficina para "+capitaliseFirstLetter(text_prov)+":</h4>");
				}else{
					jQuery(this).prepend( "<h4 class='titul_office'>Office for "+capitaliseFirstLetter(text_prov)+":</h4>" );
				}*/
				jQuery(this).show();
				return false;
			}
		});
	});

	//Cargamos el slider de video de Journey
	if ( jQuery(".cont_slider_journey").is(":visible") ) {
		jQuery("#gallery_journey").unitegallery({
				theme_skin:"bottom-text",
				height:500
			});
	}


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
						  pager: true,
						  mode:'fade',
						  infiniteLoop: true,
						  useCSS: false,
						  auto: true,
					  	  autoHover: true,
						  controls: false,
						  pause: 5000,
						  speed:800,
						  adaptiveHeight:true,
						  onSlideBefore: function(slideElement, oldIndex, newIndex){
							  jQuery(slideElement).find('img').css('top','-20px').animate({top:0},1400,'easeInOutQuad');
							  jQuery('.bxslider').children().eq(oldIndex).find('img').animate({top:5},600, 'easeInQuad');
						  },
						  onSlideAfter: function(slideElement, oldIndex, newIndex){
						  },
						  onSlideNext: function(slideElement, oldIndex, newIndex){
						  },
						  onSlidePrev: function(slideElement, oldIndex, newIndex){
						  },
						});

			if ( jQuery(".box-d-blog").length>0) {
				//Leemos los contenidos del Blog vía JSON
				var data_blog='q='+ Math.random();
				jQuery.ajax({
					url: 'https://blog.cambridge.es/?json=get_posts&page=0&callback=?',
					type: 'POST',
					async: true,
					dataType: 'json',
					data: data_blog,
					success: function(data){
								//console.log(data);
								//Limpiamos mapa y clasificación
								for (var x = 0; x < data.posts.length; x++) {
									jQuery('<li><div class="box-destacado"><div class="single_featured"><div class="box_featured_img"><a href="'+data.posts[x].url+'"><img src="'+data.posts[x].thumbnail_images.full.url+'"></a></div><h4><a href="'+data.posts[x].url+'">'+data.posts[x].title+'</a></h4>'+data.posts[x].excerpt+'</div></div></li>').appendTo( ".bxslider-destacados" );
									//console.log(data.posts[x].slug);
									//jQuery("#votaciones_"+data.posts[x].id_ong).find('p').html(String(data[x].votos));
								}
							}
				});
			}

	}


	//Avanzar a la siguiente pantalla slider
	jQuery(document).on("click",".arrow-next", function(e) {
		e.preventDefault();
		touch_gall=1;
		slider.goToNextSlide();
		var current = slider.getCurrentSlide();
		pag_slider=parseInt(current+1);
		//Movemos contenidos
		jQuery('#body-slider').stop().clearQueue().scrollTo(jQuery('#slider_'+pag_slider),400,{axis:'x',easing:'easeOutBounce'});
		//pintamos el bullet correspondiente
		jQuery('#nav-slider ul li a').removeClass('active');
		jQuery('#nav-slider ul li a[rel='+pag_slider+']').addClass('active');
	});

	//Retroceder a la siguiente pantalla del slider
	jQuery(document).on("click",".arrow-prev", function(e) {
		e.preventDefault();
			touch_gall=1;
			slider.goToPrevSlide();
			var current = slider.getCurrentSlide();
			pag_slider=parseInt(current+1);
			jQuery('#body-slider').stop().clearQueue().scrollTo(jQuery('#slider_'+pag_slider),400,{axis:'x',easing:'easeInBounce'});
			//pintamos el bullet correspondiente
			jQuery('#nav-slider ul li a').removeClass('active');
			jQuery('#nav-slider ul li a[rel='+pag_slider+']').addClass('active');
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
				slider.goToSlide(pag-1);
				jQuery('#body-slider').stop().clearQueue().scrollTo(jQuery('#slider_'+pag),400,{axis:'x',easing:'easeInOutExpo'});
				pag_slider=pag;
			}
	});

	//Resize videos youtube con Fitvids
	if ( jQuery(".video-youtube").is(":visible") ) {
		jQuery(".video-youtube").fitVids();
	}

	//Cambiar Alumno-Profesor componente producto
	jQuery(document).on("click",".select-comp a", function(e) {
		e.preventDefault();
		 if(!jQuery(this).hasClass('active')) {
		 	if(jQuery(this).hasClass('alumno')){
				//Pintamos la flecha up por defecto
				var image_up=up_svg_large('#bfb9b9');
				var encoded = window.btoa(image_up);
				jQuery('.profesor').css('background-image', 'url(data:image/svg+xml;base64,'+encoded+')');
				jQuery(this).addClass('active');
				//Pintamos la flecha down
				var color;
				if(jQuery('#custom-color').length>0){
					color=jQuery('#custom-color').attr('data-color');
					if(color==""){color='#47b6c7';}
				}else{
					color='#47b6c7';
				}
				var image_down=down_svg_large(color);
				var encoded = window.btoa(image_down);
				jQuery(this).css('background-image', 'url(data:image/svg+xml;base64,'+encoded+')');
				jQuery(this).parents('.select-comp').find('.profesor').removeClass('active');
				//Mostramos Bloque
				jQuery('.block-prof').stop().clearQueue().fadeOut(800,function(){
					jQuery('.block-alum').stop().clearQueue().fadeIn(800);
				});

			}else{
				//Pintamos la flecha up por defecto
				var image_up=up_svg_large('#bfb9b9');
				var encoded = window.btoa(image_up);
				jQuery('.alumno').css('background-image', 'url(data:image/svg+xml;base64,'+encoded+')');
				jQuery(this).addClass('active');
				//Pintamos la flecha down
				var color;
				if(jQuery('#custom-color').length>0){
					color=jQuery('#custom-color').attr('data-color');
					if(color==""){color='#47b6c7';}
				}else{
					color='#47b6c7';
				}
				var image_down=down_svg_large(color);
				var encoded = window.btoa(image_down);
				jQuery(this).css('background-image', 'url(data:image/svg+xml;base64,'+encoded+')');
				jQuery(this).parents('.select-comp').find('.alumno').removeClass('active');
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
		//console.log('dentro');
		jQuery('.opc-filter').stop().clearQueue().slideToggle(600);
	});

	//Cuando pulsas sobre poster frame de un video
	jQuery(document).on("click",".poster-frame a", function(e) {
		e.preventDefault();
		jQuery( this ).parent().fadeOut(400,function(){
		jQuery( this ).parent().find('#player').show();
			if(act_player==0){
			 act_player=1;
			  player = new YT.Player('player', {
				events: {
						'onReady': onPlayerReady,
						'onStateChange': onPlayerStateChange
					  }
			  });
			}else{
				player.playVideo();
			}
		});
	});

	//Comprobar que solo se carga en corpus
	if ( jQuery(".content-corpus").is(":visible") ) {
		var slider_corpus=jQuery('.bxslider_corpus').bxSlider({
						  pager: false,
						  infiniteLoop: true,
						  useCSS: false,
						  adaptiveHeight:true,
						  controls: false
						  });
	}

	//Comprobar que solo se carga en app y cargar todas las galerias
	if ( jQuery(".content-apps").is(":visible") ) {
		//slider-app
		jQuery('.list-apps .slider-app').each(function() {
			var id_gall=jQuery(this).find('ul').attr('class');
			//console.log(id_gall);
			jQuery('.'+id_gall).bxSlider({
								pager: true,
								infiniteLoop: false,
								useCSS: false,
								adaptiveHeight:true,
								hideControlOnEnd:true,
								speed:400
			});
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

			//Llamamos a la función de validar (id formulario y contenedor errores)
			var result=validate_form('#contact-form');
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

			//Llamamos a la función de validar (id formulario y contenedor errores)
			var result=validate_form('#register-form');
			if(result==1){
				event.preventDefault();
				send_reg=0;
			}

		}
	});

	//Envío de formulario de contacto
	jQuery(document).on("submit","#event-form", function(event) {
		if(send_form==0){
			send_reg=1;

			//Llamamos a la función de validar (id formulario y contenedor errores)
			var result=validate_form('#event-form');
			if(result==1){
				event.preventDefault();
				send_reg=0;
			}
		}
	});

	//Envío de formulario de página de búsqueda
	jQuery(document).on("submit","#formulario-search-pag", function(event) {
		if(send_form==0){
			send_reg=1;
			//Comprobar al menos 3 caracteres
			var txt_s=jQuery('#formulario-search-pag').find('#campo_busqueda').val();
			if(txt_s.length<3){
				jQuery('#formulario-search-pag').find('#campo_busqueda').addClass('error');
				event.preventDefault();
				send_reg=0;
			}
		}
	});

	//Envío de formulario de búsqueda cabecera
	jQuery(document).on("submit","#formulario-search", function(event) {
		if(send_form==0){
			send_reg=1;
			//Comprobar al menos 3 caracteres
			var txt_s=jQuery('#formulario-search').find('#campo_busqueda').val();
			if(txt_s.length<3){
				jQuery('#formulario-search').find('#campo_busqueda').addClass('error');
				event.preventDefault();
				send_reg=0;
			}
		}
	});


	//Botón redirige a formulario en LABS
	jQuery(document).on("click",".camb-labs .titul-round", function(event) {
		event.preventDefault();
		jQuery('body').stop().clearQueue().scrollTo(jQuery('.titul-form-reg'),600,{axis:'y',easing:'easeInOutExpo'});
	});

	//Envío de formulario de Newsletter
	jQuery(document).on("submit","#newsletter-form", function(event) {
		if(send_form==0){
			send_reg=1;

			//Llamamos a la función de validar (id formulario y contenedor errores)
			var result=validate_form('#newsletter-form');
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

	//Eliminar marco de error centre details
	jQuery(document).on('focus','.centre-d-c input[type=checkbox]',function(event){
		event.preventDefault();
			if(jQuery(this).parents('.centre-d-c').find('h4').hasClass('error')){
				jQuery(this).parents('.centre-d-c').find('h4').removeClass('error');
			}
	});

	//Eliminar marco de error teacher details
	jQuery(document).on('focus','.teacher-p input[type=checkbox]',function(event){
		event.preventDefault();
			if(jQuery(this).parents('.teacher-p').find('h5').hasClass('error')){
				jQuery(this).parents('.teacher-p').find('h5').removeClass('error');
			}
	});

	//Eliminar marco de error Course Books
	jQuery(document).on('focus','#coursebook_1',function(event){
		event.preventDefault();
			if(jQuery(this).parents('.course-book').find('h5').hasClass('error')){
				jQuery(this).parents('.course-book').find('h5').removeClass('error');
			}
	});

	//Mostrar más libros en Course Boooks
	jQuery(document).on('click','.btn-mobile-course-book a',function(event){
		event.preventDefault();
		n_course_b++;
		jQuery('.book_'+n_course_b).addClass('active').show();
		if(n_course_b==4){
			jQuery('.btn-mobile-course-book').hide();
		}
	});

	//Ajustar altura bloques recursos productos
	if (jQuery('.box-recursos').is(":visible") ) {

		//Listado cursos
		var heights = jQuery('.box-recursos div.inside-recurso').map(function ()
		{
			return jQuery(this).height();
		}).get(),
		//Obtenemos tamaño max de los cuadros
		maxHeight = Math.max.apply(null, heights);
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

	//Mostrar menú lateral mobile
	jQuery(document).on('click','#submenus-mob-prodct > a',function(event){
		event.preventDefault();
		if(!jQuery(this).parent().hasClass('active')){
			jQuery(this).parent().addClass('active');
			jQuery(this).parent().find('ul').stop().clearQueue().slideToggle(400);
		}else{
			var padre=jQuery(this).parent();
			jQuery(this).parent().find('ul').stop().clearQueue().slideToggle(400,function(){jQuery(padre).removeClass('active');});
		}

	});

	//Añadir etiquetas p dentro de li key-features
	if (jQuery('.key-features').is(":visible") ) {
		 jQuery('.key-features li').each(function() {
		 	var txt=jQuery(this).html();
			jQuery(this).html('<p>'+txt+'</p>');
		 });
	}

	//Añadir etiquetas p dentro de li english-f-spanish
	if (jQuery('.english-f-spanish').is(":visible") ) {
		 jQuery('.english-f-spanish li').each(function() {
		 	var txt=jQuery(this).html();
			jQuery(this).html('<p>'+txt+'</p>');
		 });
	}

	//Añadir etiquetas p dentro de li contenido-cefs
	if (jQuery('.contenido-cefs').is(":visible") ) {
		 jQuery('.contenido-cefs li').each(function() {
		 	var txt=jQuery(this).html();
			jQuery(this).html('<p>'+txt+'</p>');
		 });
	}

	//Añadir etiquetas p dentro de li caption-catalogo
	if (jQuery('.caption-catalogo').is(":visible") ) {
		 jQuery('.caption-catalogo li').each(function() {
		 	var txt=jQuery(this).html();
			jQuery(this).html('<p>'+txt+'</p>');
		 });
		 //Añadimos elemento para degradado final del bloque
		 jQuery( "<div class='degradado'></div>" ).insertAfter( ".caption-catalogo ul" );
	}

	//Añadir etiquetas p dentro de li block-submenus
	if (jQuery('.block-submenus').is(":visible") ) {
		 jQuery('.block-submenus>ul>li>ul>li').each(function() {
			var txt=jQuery(this).html();
			jQuery(this).html('<p>'+txt+'</p>');
		 });
	}

	//Añadir etiquetas p dentro de li cont-camb-en-teach
	if (jQuery('.cont-camb-en-teach').is(":visible") ) {
		 jQuery('.cont-camb-en-teach li').each(function() {
		 	var txt=jQuery(this).html();
			jQuery(this).html('<p>'+txt+'</p>');
		 });
	}

	//Aceptar cookies en el cuadro
	jQuery(document).on('click','.btn-accept',function(event){
		event.preventDefault();
		jQuery('.block-cookies').fadeOut(600,function(){
			//Creamos la cookie de aceptación
			jQuery.cookie('cambridge', 'acepta', { expires: 365 * 10 ,path: '/' });

			loadAnalytics();
		});
	});

	//Cuando pulsamos sobre un enlace de recursos
	jQuery(document).on("click",".inside-recurso + a", function(e) {
		e.preventDefault();
		var enlace=jQuery(this).attr('href');
		jQuery("html, body").stop().clearQueue().scrollTo(jQuery(enlace),600,{axis:'y',easing:'easeInOutExpo',offset: -50});

	});

	//Cambiar bloques en cursos suplementary
	jQuery(document).on("click",".opc_levels a", function(e) {
		e.preventDefault();
		var opcion = jQuery(this).index();
		opcion++;//Equipararlo con numeración bloques
		//Obtenemos index del bloque abierto
		var block_open = jQuery('.opc_levels a.active').index();
		block_open++;
		//Eliminamos active
		jQuery('.opc_levels a').removeClass('active');
		var image_up=up_svg('#bfb9b9');
		var encoded = window.btoa(image_up);
		jQuery('.opc_levels a').css('background-image', 'url(data:image/svg+xml;base64,'+encoded+')');
		jQuery(this).addClass('active');
		var color;
		if(jQuery('#custom-color').length>0){
			color=jQuery('#custom-color').attr('data-color');
			if(color==""){color='#47b6c7';}
		}else{
			color='#47b6c7';
		}
		var image_down=down_svg(color);
		var encoded = window.btoa(image_down);
		jQuery('.opc_levels a.active').css('background-image', 'url(data:image/svg+xml;base64,'+encoded+')');
		//Cerramos un bloque y mostramos el siguiente
		jQuery('.level_'+block_open).stop().clearQueue().fadeOut(200,function(){
			//Eliminamos el height residual
			jQuery('.level_'+opcion).find('div.block-product').each(function() {
				jQuery(this).removeAttr('style');
			});
			jQuery('.level_'+opcion).css('opacity',0).show();
			align_top_box(jQuery('.level_'+opcion).find('div.block-product'));
			jQuery('.level_'+opcion).animate({opacity: 1},200);
		});

	});

	if (jQuery('.opc_levels').is(":visible") && getUrlParam('tab')) {
		jQuery('.opc_levels').find('a[href="#'+getUrlParam('tab')+'"]').trigger('click');
	}

	//Cerrar cuadro info cookies
	jQuery(document).on('click','.close_c',function(event){
		event.preventDefault();
		jQuery('.block-cookies').fadeOut(600);
	});

	//Enlaces examenes
	jQuery(document).on('click','.block_enl_subexams a',function(event){
		event.preventDefault();
		var direc=jQuery(this).attr('href');
		jQuery("html, body").stop().clearQueue().scrollTo(jQuery(direc).find('.info_single_exam h2'),600,{axis:'y',easing:'easeInOutExpo',offset: -50});
	});

	//Desplegar otros productos página nueva productos
	jQuery(document).on('click',".other_products", function(e) {
		e.preventDefault();
		if(!jQuery(".float-colum-menu .hide-menu-float").hasClass('active')){
			jQuery(".float-colum-menu .hide-menu-float").addClass('active');
			jQuery(".float-colum-menu .hide-menu-float").stop().clearQueue().hide().css({opacity:1}).slideToggle(400);
		}else{
			jQuery(".float-colum-menu .hide-menu-float").removeClass('active');
			jQuery(".float-colum-menu .hide-menu-float").stop().clearQueue().slideToggle(400);
		}
	});

	// Desplegable selector de nivel en cursos
	if( jQuery('#course-additional-materials-selector').length ) {

		var customColor = jQuery('#custom-color').data('color');

		if( customColor ) {
			var shadeColor = window.shadeColor(customColor, -20);
			jQuery('#course-additional-materials-selector').css({
				backgroundColor: shadeColor,
				borderColor: shadeColor
			}).parent().css({
				backgroundColor: shadeColor,
				borderColor: shadeColor
			});
		}

		jQuery(document).on('change','#course-additional-materials-selector',function(event){
			if( jQuery(this).val() ) {
				window.location = jQuery(this).val()
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
		if(w_win<481){
			jQuery('.up-window').css({marginLeft:(w_container-60)});
		}else{
			jQuery('.up-window').css({marginLeft:(w_container-50)});
		}

		//Fix version mobile slider home
		if ( jQuery("#slider").is(":visible") ) {
			//Ajustamos los bloques contenidos slider
			total_slider=jQuery(".scroll-slider div[id^='slider_']").length;
			var width_slider=jQuery("#body-slider").width();
			var aux=total_slider*width_slider;
			jQuery(".scroll-slider").css('width',(total_slider*width_slider));
			jQuery(".inside-slider").css('width',(width_slider));
		}

		//Ajustar título de cabecera
		if (jQuery('.cab-page .container h1').is(":visible") ) {
			var altura_h1=jQuery('.cab-page .container h1').height();
			jQuery('.cab-page .container h1').css('margin-top', -(altura_h1/2));
		}

		//Igualar todos los bloques cards de la home
		if (jQuery('.bottom-box').is(":visible") ) {
			jQuery('.bottom-box div.thumbnails').removeAttr('style');
			//Listado cursos
			var heights = jQuery('.bottom-box div.thumbnails').map(function ()
			{
				return jQuery(this).outerHeight();
			}).get(),
			//Obtenemos tamaño max de los cuadros
			maxHeight = Math.max.apply(null, heights);
			jQuery('.bottom-box div.thumbnails').each(function() {
				jQuery(this).css('height',maxHeight);
			});
		}

		//Menú flotante ficha nueva de producto
		if (jQuery('.new-product').is(":visible") ) {
			var d_ficha=jQuery('.ficha-producto').offset().top;
			jQuery('.float-colum-menu').css({top:Math.round(d_ficha)-220});
		}

		//Resize modulo Blog home
		if ( jQuery("#slider").is(":visible") ) {
			if ( jQuery(".box-d-blog").length>0) {
				//Obtenemos altura y anchura del navegador
				var w_win=window.innerWidth;
				if(w_win<992){
					if(w_win<481){
					//Galería destacdos blog
					slider_destc.reloadSlider({
										  minSlides: 1,
										  maxSlides: 1,
										  pager: true,
										  infiniteLoop: true,
										  useCSS: false,
										  adaptiveHeight: false,
										  auto: true,
										  autoHover: true,
										  controls: false,
										  pause: 5000,
										  speed:800,
										});
					}else{
						//Galería destacdos blog
						slider_destc.reloadSlider({
											  minSlides: 2,
											  maxSlides: 2,
											  slideWidth: 450,
											  slideMargin: 0,
											  pager: true,
											  infiniteLoop: true,
											  useCSS: false,
											  adaptiveHeight: false,
											  auto: true,
											  autoHover: true,
											  controls: false,
											  pause: 5000,
											  speed:800,
											});
					}
				}else{
					//Galería destacdos blog
					slider_destc.reloadSlider({
										  minSlides: 1,
										  maxSlides: 1,
										  pager: true,
										  infiniteLoop: true,
										  useCSS: false,
										  adaptiveHeight: false,
										  auto: true,
										  autoHover: true,
										  controls: false,
										  pause: 5000,
										  speed:800,
										});
				}
			}
		}

	});

	//Seleccionar los checkbox buttom al hacer click en el texto (Filter exams)
	jQuery(document).on("click","#form-filter .checkbox span", function(e) {
		e.preventDefault();
		if (jQuery(this).parents('.checkbox').find('input[type=checkbox]').prop("checked")){
		 	jQuery('#form-filter .checkbox span').not(this).parents('.checkbox').find('input[type=checkbox]').prop('checked', false);
		}else{
			jQuery('#form-filter .checkbox span').not(this).parents('.checkbox').find('input[type=checkbox]').prop('checked', false);
		}
	});

	//Seleccionar los checkbox buttom (Filter exams)
	jQuery(document).on("change","#form-filter input[type=checkbox]", function(e) {
		e.preventDefault();
		if (jQuery(this).prop("checked")){
		 	jQuery('#form-filter input[type=checkbox]').not(this).prop('checked', false);
		}else{
			jQuery('#form-filter input[type=checkbox]').not(this).prop('checked', false);
		}
	});

	//Mover pie examenes(exam_bottom)
	jQuery(document).on("click",".exam_bottom", function(e) {
		e.preventDefault();
		var enlace=jQuery(this).attr('href');
		jQuery("html, body").stop().clearQueue().scrollTo(jQuery(enlace),600,{axis:'y',easing:'easeInOutExpo',offset: -50});
	});

	//Previene link de idioma actual
	jQuery(document).on("click",".active-lang a", function(e) {
		e.preventDefault();
	});

	//Previene link de idioma actual
	jQuery( ".resource-module table a" ).on( "click", function(e) {
		e.preventDefault();
	//comprueba que la url es externa y por lo tanto ha de abrirse en ventana nueva:
		if( jQuery(this).attr('href').indexOf("http") === 0 ) {
			//Link externo
			window.open(jQuery(this).attr('href'), "_blank");
		}else{
			//Link interno
			 window.open(jQuery(this).attr('href'),"_self");
		}
	});

	//Enlaces laterales
	jQuery(document).on("mouseenter",".block-submenus>ul>li.active ul li a", function(e) {
		jQuery( this ).parents('li').css({color:'#9f999f'});
	}).on("mouseleave",".block-submenus>ul>li.active ul li a", function(e) {
		jQuery( this ).parents('li').css({color:'#bbb5bb'});
	});


	if (jQuery('.container-infografias').is(":visible") ) {
		//lightbox-boxer de infografías en Cambridge Monitor
		jQuery(".container-infografias .thumbnail-img a").boxer({
			fixed: true,
			formatter: function ($target) {
				var $item = $target.closest(".thumbnails");
				var link  = $target.attr("data-share-link");
				var share_label  = $target.attr("data-share-label");
				var title = $item.find(".caption h4").text().trim();
				var desc  = $item.find(".caption div").text().trim();
				var link_tw = 'https://www.twitter.com/share?text='+encodeURIComponent('Cambridge infografía:')+'&url='+link;
				var link_fb = 'https://www.facebook.com/sharer.php?u='+encodeURIComponent(link);
				var share_block = share_label + ' <a href="'+link_tw+'" class="fa fa-twitter link-share"></a> <a href="'+link_fb+'" class="fa fa-facebook link-share"></a>';
				return '<div class="title">' + title + '</div><div class="caption">' + desc + '</div><div class="share">' + share_block + '</div>';
			}
		});
	}

	if (jQuery('.side-menu').is(":visible") ) {
		 jQuery('.side-menu>ul>li>ul>li').each(function() {
			var txt=jQuery(this).html();
			jQuery(this).html('<p>'+txt+'</p>');
		 });
	}
	//Enlaces laterales
	jQuery(document).on("mouseenter",".side-menu>ul>li.active ul li a", function(e) {
		jQuery( this ).parents('li').css({color:'#9f999f'});
	}).on("mouseleave",".side-menu>ul>li.active ul li a", function(e) {
		jQuery( this ).parents('li').css({color:'#bbb5bb'});
	});

	if( jQuery().lazyload ){
		jQuery("img.lazy").lazyload({
			effect : "fadeIn"
		});
	}

	if( jQuery(".container-infografias").size() > 0 )
	{
		//click en compartir abre popup
		jQuery(document).on("click","a.link-share", function(e) {
			e.preventDefault();
			var popup = window.open(jQuery(this).attr('href'),'share','width=600,height=350');
			popup.focus();
		});

		var thumbsSelector = ".content-cambridge-monitor .thumbnails";

		if( jQuery(".container-infografias").attr('data-paginated') == "true" ) {

			var firstShowElements = parseInt(jQuery(".container-infografias").attr('data-first-showed'));
			var pageShowElements = parseInt(jQuery(".container-infografias").attr('data-show-more'));

			if( jQuery(thumbsSelector).parent().size() > firstShowElements ) {

				//ocultamos los elementos mayores al definido como página incial
				jQuery(thumbsSelector).parent().filter(":gt("+(firstShowElements-1)+")").hide();

				//mostramos el "ver más"
				jQuery(".content-cambridge-monitor .show-more").show();

				jQuery(document).on("click",".content-cambridge-monitor .show-more a", function(e) {
					e.preventDefault();

					//mostramos la siguiente página
					jQuery(thumbsSelector).parent().filter(":hidden").filter(":lt("+pageShowElements+")").show();

					//si ya no quedan más infografías que mostrar ocultamos el "ver más"
					if( jQuery(thumbsSelector).parent().filter(":hidden").size() == 0) {
						jQuery(".content-cambridge-monitor .show-more").hide();
					}

					//disparamos el evento scroll para acualizar el "up-window"
					jQuery(window).trigger("scroll");
				});

			}
		}

	}



});


/*************************
FUNCIONES JAVASCRIPT
**************************/

//Función para capturar eventos scroll
function control_scroll(e){
  //Variable de scroll
  var scrollAmount = jQuery(window).scrollTop();
  var h_foot=jQuery('#footer').height();
  var w_win=window.innerWidth;


  //Aparece flecha top
  if(scrollAmount>500){
		if (!jQuery('.up-window').is(":visible") ) {
			jQuery('.up-window').stop().clearQueue().fadeIn(400);
			if(jQuery(window).scrollTop() + jQuery(window).height() > jQuery(document).height() - h_foot + 20) {
			var despl=jQuery(window).scrollTop() + jQuery(window).height() - (jQuery(document).height() - h_foot)
				jQuery('.up-window').css({bottom:(20+despl)});
		   }else{
				jQuery('.up-window').css({bottom:20});
		   }
		}else{
			if(jQuery(window).scrollTop() + jQuery(window).height() > jQuery(document).height() - h_foot) {
			var despl=jQuery(window).scrollTop() + jQuery(window).height() - (jQuery(document).height() - h_foot)
				jQuery('.up-window').css({bottom:(20+despl)});
		   }else{
				jQuery('.up-window').css({bottom:20});
		   }
		}
   }else{
   		jQuery('.up-window').stop().clearQueue().fadeOut(400);
   }


	if (jQuery('.new-product').is(":visible") ) {
	   //Página de producto nuevo
		var d_ficha=jQuery('.ficha-producto').offset().top;
	    if(scrollAmount>d_ficha){
			if (jQuery('.new-product').is(":visible") ) {
				if(w_win>767){
					if(jQuery(window).scrollTop() + jQuery(window).height() > jQuery(document).height() - h_foot + 400) {
						jQuery('.float-colum-menu').css({top:-300,position:'fixed'});
					}else{
						jQuery('.float-colum-menu').css({top:30,position:'fixed'});
					}
				}
			}
	   }else{
		   if(w_win>767){
	   			jQuery('.float-colum-menu').css({top:Math.round(d_ficha)-220,position:'absolute'});
		   }
	   }
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


function shadeColor(color, percent) {

    var R = parseInt(color.substring(1,3),16);
    var G = parseInt(color.substring(3,5),16);
    var B = parseInt(color.substring(5,7),16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R<255)?R:255;
    G = (G<255)?G:255;
    B = (B<255)?B:255;

    var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
    var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
    var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

    return "#"+RR+GG+BB;
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
	   event.target.seekTo(0);
	   event.target.stopVideo();
	   jQuery('.poster-frame').fadeIn(400);
       //event.target.playVideo();
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

		//Obtener el tamaño de los caption
		var heights_cap = jQuery(id).map(function ()
		{
			return jQuery(this).find('.caption-product').outerHeight();
		}).get(),
		//Obtenemos tamaño max de los cuadros
		maxHeight_cap = Math.max.apply(null, heights_cap);
		//Recorremos todos los cuadros e igualamos los caption
		 jQuery(id).each(function() {
			var altura_cap=jQuery(this).find('.caption-product').outerHeight();
			if(altura_cap < maxHeight_cap){
				jQuery(this).find('.caption-product').css('height',maxHeight_cap);
			}
		 });

		 //Listado cursos
		var heights = jQuery(id).map(function ()
		{
			return jQuery(this).outerHeight();
		}).get(),
		//Obtenemos tamaño max de los cuadros
		maxHeight = Math.max.apply(null, heights);
		 //Recorremos nuevamente por si no se han equiparado
		 //con el cambio de caption
		  jQuery(id).each(function() {
		  	var altura=jQuery(this).outerHeight();
			if(altura<maxHeight){
				var total=maxHeight-altura;
				jQuery(this).css('paddingTop',total);
			}
		  });
		  jQuery(id).css('height',maxHeight);
}

//Funcion para validar genéricamnete un formulario
function validate_form(id){

	var form = jQuery(id);

	form.find(".errores").html("");

	var hasErrors = false;
	var errorsArr = [];

		//Busca todos los campos requeridos de texto
			if(form.find('.validation-rule-empty').length > 0){
				var error_empty=0;
				form.find('.validation-rule-empty').each(function() {
					var res_campo=jQuery(this).val();
					if(res_campo==""){
						error_empty=1;
						jQuery(this).addClass('error').val('');
					}
				});
			}

			//Busca todos los campos requeridos de mail
			if(form.find('.validation-rule-mail').length > 0){
				var error_mail=0;
				form.find('.validation-rule-mail').each(function() {
					var res_campo=jQuery(this).val();
					if((res_campo=="") || (res_campo!="" && validateEmail(res_campo)==false) ){
						error_mail=1;
						jQuery(this).addClass('error').val('');
					}
				});
			}

			//Busca todos los campos requeridos de codigo postal
			if(form.find('.validation-rule-postcode').length > 0){
				var error_postcode=0;
				form.find('.validation-rule-postcode').each(function() {
					var f = jQuery(this);
					if( f.val().length != f.attr('maxlength') ){
						error_postcode=1;
						jQuery(this).addClass('error').val('');
					}
					// Si existe selector de provincia pero el código no coincide
					// con los dos primeros dígitos del código postal:
					var prov_select = form.find('select[name$="[province]"]').first();
					if( prov_select.length && prov_select.val() != f.val().substr(0, 2) ){
						error_postcode=1;
						jQuery(this).addClass('error').val('');
					}
				});
			}

			//Busca todos los campos requeridos checkbox
			if(form.find('.validation-rule-checkbox').length > 0){
				var error_checkbox=0;
				form.find('.validation-rule-checkbox').each(function() {
					if(!jQuery(this).prop("checked")){
						error_checkbox=1;
						jQuery(this).addClass('error');
					}
				});
			}

			//Busca todos los campos requeridos checkbox-multiple
			if(form.find('.validation-rule-checkbox-multiple').length > 0){
				var error_checkbox_multiple = 0;
				form.find('.validation-rule-checkbox-multiple').each(function() {
					var me = jQuery(this);
					if (me.find('input[type="checkbox"]:checked').length == 0) {
						me.find('input[type="checkbox"]').addClass('error')
						error_checkbox_multiple=1;
					} else {
						me.find('input[type="checkbox"]').removeClass('error')
					}
				});
			}

			//Busca todos los campos requeridos de select
			form.find('.validation-rule-select').each(function() {
				var res_campo=jQuery(this).val();
				if((res_campo=="")){

					hasErrors = true;

					jQuery(this).parents('.custom-select').addClass('error');

					var error = jQuery(this).data('error-msg');

					if( error && error != '' ) {
						errorsArr.push(error)
					}
				}
			});

			//Validación checkboxes "Course Offered" en "Centre Details"
			if (jQuery('.centre-d-c').is(":visible") ) {
				var error_checkbox_centre=1;
				form.find('.centre-d-c input[type=checkbox]').each(function() {
					if(jQuery(this).prop("checked")){
						error_checkbox_centre=0;
					}

				});
				if(error_checkbox_centre==1){
					form.find('.centre-d-c h4').addClass('error');
				}
			}

			//Validación checkboxes "Course Offered" en "Centre Details"
			if (jQuery('.teacher-p').is(":visible") ) {
				var error_checkbox_teacher=1;
				form.find('.teacher-p input[type=checkbox]').each(function() {
					if(jQuery(this).prop("checked")){
						error_checkbox_teacher=0;
					}

				});
				if(error_checkbox_teacher==1){
					form.find('.teacher-p h5').addClass('error');
				}
			}

			//Validación campos en "Course Book"
			if (jQuery('.course-book').is(":visible") ) {
				var error_course_book=0;
					var res_campo=form.find('#coursebook_1').val();
					if((res_campo=="")){
						error_course_book=1;
					}
					if(error_course_book==1){
						form.find('.course-book h5').addClass('error');
					}
			}


			//Error general campos vacíos
			if(error_empty==1 || error_checkbox_centre==1 || error_checkbox_teacher==1 || error_course_book==1 || error_checkbox_multiple==1){
				var message=form.attr('data-error-msg');
				jQuery('.errores').append('<p>'+message+'</p>');
			}

			if(error_checkbox==1){
				var message=form.find('.validation-rule-checkbox').attr('data-error-msg');
				jQuery('.errores').append('<p>'+message+'</p>');
			}

			if(error_postcode==1){
				var message=form.find('.validation-rule-postcode').attr('data-error-msg');
				jQuery('.errores').append('<p>'+message+'</p>');
			}

			if(error_mail==1){
				var message=form.find('.validation-rule-mail').attr('data-error-msg');
				jQuery('.errores').append('<p>'+message+'</p>');
			}

			if(errorsArr.length){
				for(var i = 0; i < errorsArr.length; i++) {
					jQuery('.errores').append('<p>'+errorsArr[i]+'</p>');
				}
			}

			//Salida
			if(hasErrors || error_empty==1 || error_checkbox==1 || error_checkbox_multiple==1 || error_postcode==1 || error_mail==1){
				return 1;
			}else{
				return 0;
			}
}

//Funcion para pintar svg up
function up_svg(color){
	return '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="72px" height="9px" viewBox="0 383.74 595.279 74.41" enable-background="new 0 383.74 595.279 74.41" xml:space="preserve"><g><g><polygon fill="'+color+'" points="595.28,458.15 355.514,458.15 297.64,408.543 239.766,458.15 0,458.15 0,441.614 231.498,441.614 297.64,383.74 363.782,441.614 595.28,441.614"/></g></g></svg>';
}

//Funcion para pintar svg up
function down_svg(color){
	return '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"  width="72px" height="9px" viewBox="0 0 595.279 74.41" enable-background="new 0 0 595.279 74.41" xml:space="preserve"><g><g><polygon fill="'+color+'" points="0,0 239.765,0 297.639,49.607 355.513,0 595.28,0 595.28,16.536 363.782,16.536 297.639,74.41 231.498,16.536 0,16.536"/></g></g></svg>';
}

//Funcion para pintar svg up
function up_svg_large(color){
	return '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="872px" height="9px" viewBox="-1568.974 0 3733.228 74.41" enable-background="new -1568.974 0 3733.228 74.41" xml:space="preserve"><g><g><polygon fill="'+color+'" points="2164.254,74.41 355.514,74.41 297.64,24.803 239.766,74.41 -1568.974,74.41 -1568.974,57.874 231.498,57.874 297.64,0 363.782,57.874 2164.254,57.874"/></g></g></svg>'
}

//Funcion para pintar svg up
function down_svg_large(color){
	return '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="872px" height="9px" viewBox="-1544.88 0 3685.039 74.41" enable-background="new -1544.88 0 3685.039 74.41" xml:space="preserve"><g><g><polygon fill="'+color+'" points="-1544.88,0 239.765,0 297.639,49.607 355.513,0 2140.159,0 2140.159,16.536 363.782,16.536 297.639,74.41 231.498,16.536 -1544.88,16.536"/></g></g></svg>';
}

//Convertir nombres provincias
function capitaliseFirstLetter(string)
{
	return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function getUrlParam(name, url) {
	if (! url ) url = location.href;
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp( regexS );
	var results = regex.exec( url );
	return results == null ? null : results[1];
}


/*
 *
 * PARTNERS LIST
 *
 */

(function(window, $, tableElemQuery){

    var tableCont      = $(tableElemQuery);
    var centres        = tableCont.find('table tbody tr');
    var noResults      = $('.partners-centres-no-results');
    var pickerProvince = $('.partner-picker-province');
    var pickerType     = $('.partner-picker-type');


    noResults.html( noResults.data('html') );


    var filter = function(centreProvinceId, centreTypeId) {
        //console.log("FILTER", centreProvinceId, centreTypeId)

        var visibleCentresCount = 0;

        centres.each(function(){

            var item = $(this).first();
            var itemVisible = true;

            if( centreProvinceId && centreProvinceId != item.data('zip').toString().substr(0,2) ) {
                itemVisible = false;
            }

            if( centreTypeId && centreTypeId != item.data('centre-type') ) {
                itemVisible = false;
            }

            if( itemVisible ) {
                item.removeClass('hide');
                visibleCentresCount++;
            } else {
                item.addClass('hide');
            }

        });

        tableCont.toggleClass('hide', visibleCentresCount == 0);
        noResults.toggleClass('hide', visibleCentresCount != 0);

        pickerProvince.children().first().prop('disabled',true).addClass('hide');
        pickerType.prop('disabled',false).removeClass('disabled');
    }

    pickerProvince.add(pickerType).on('change', function(e){
        filter( pickerProvince.val() , pickerType.val() )
    });

})(window, jQuery, '.partners-centres');




/*
 *
 * PARTNERS MAPS
 *
 */

(function(window, $, mapElemQuery){

    var map;
    var mapEl;
    var markers;
    var markerCluster;
    var infoWindow;
    var bounds;

    function init() {

        mapEl      = $(mapElemQuery);
        bounds     = new google.maps.LatLngBounds();
        infoWindow = new google.maps.InfoWindow({maxWidth: 200});

        map = new google.maps.Map(mapEl.get(0), {
            styles: googleMapsStyle01,
            center: {lat:parseFloat('37.27926724418999'),lng:parseFloat('-4.365527739664799')},
            zoom: 5
        });

        var centresList = mapEl.data('centres');
        var markersList = [];

        $.each(centresList, function(index, centre) {
            var id = centre.id;

            var position = {lat:parseFloat( centre.lat ),lng:parseFloat( centre.lng )}
            var marker = new google.maps.Marker({
                position: position,
                title: centre.name
            });

            marker.addListener('click', function(event) {
               infoWindow.setContent( getInfoWindowContent( centre ) );
               infoWindow.open(map, this);
            });

            bounds.extend(position);

            markersList[id] = marker;
        });

/*
        centresList.on('click', 'a[data-bx-show-in-map]', function(e){
            var id     = $(e.target).closest('tr[data-id]').data('id');
            var marker = markersList[id]

            map.setCenter( marker.getPosition() );
            map.setZoom(16)

            new google.maps.event.trigger(marker, 'click');
        });
*/
        if( markersList.length ) {
            var markers = Object.keys(markersList).map(function (key) { return markersList[key]; });
            markerCluster = new MarkerClusterer(map, markers, {gridSize:15, imagePath: mapEl.data('image-path')});
            //map.fitBounds(bounds);
        }

    }

    function getInfoWindowContent(centre) {

        var content = '<b>' + centre.name + '</b><br>' + centre.address + '<br>' + centre.postal_code + ' ' + centre.city;

        if( centre.url && centre.url != '' ) {
            content+= '<br><a href="'+centre.url+'" target="_blank">Web</a>';
        }

        return content;
    }

    window.partnersMap = {
        init: init,
        getMap: function(){return map;}
    };

})(window, jQuery, '.partners-map');



/*
 * https://mapstyle.withgoogle.com
 * https://snazzymaps.com/style/61/blue-essence
 */

var googleMapsStyle01 = [
    {
        "featureType": "landscape.natural",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#e0efef"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "hue": "#1900ff"
            },
            {
                "color": "#c0e8e8"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 100
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "lightness": 700
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#7dcdcd"
            }
        ]
    }
];
