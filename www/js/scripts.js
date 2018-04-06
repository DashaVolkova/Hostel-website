(function( $ ) {

	$(function () {

		$( '.review_switch' ).each(function() {
			var $viewport = $( this ).find( '.review-viewport' ).fotorama({
					height: 122,
					nav: false,
					click: false,
					arrows: false,
					width: 780
				}),
				fotorama = $viewport.data( 'fotorama' );

			$( this ).find( '.review-button.left' ).on( 'click', function() {
				fotorama.show( '<' );
			});

			$( this ).find( '.review-button.right' ).on( 'click', function() {
				fotorama.show( '>' );
			});
		});

		$('input[placeholder], textarea[placeholder]').placeholder();

		$( '.rooms' ).each(function() {
			var $this = $( this ),
				$wrap = $this.find( '.rooms-wrap' ),
				$prev = $this.find( '.room-arrow.prev' ),
				$next = $this.find( '.room-arrow.next' ),
				$hg,
				swiper;

			if ( !$this.hasClass( 'autoplay' ) ) {
				$hg = $( '<div class="hidden_gallery"></div>' );
				$this.find( 'a' ).each(function() {
					$( this ).clone().appendTo( $hg );
				});
			}

			swiper = new Swiper( $wrap.get(0), {
				mode:'horizontal',
				loop: true,
				wrapperClass: 'rooms-conteiner',
				slideClass: 'room-slide',
				slidesPerView: 4,
				autoplay: $this.hasClass( 'autoplay' ) ? 3000 : false,
				speed: 1000
			});

			if ( !$this.hasClass( 'autoplay' ) ) {
				$this.find( 'a' ).each(function() {
					var $link = $( this ),
						$hlink = $hg.find( 'a' ).filter(function() {
							return $link.get( 0 ).href === this.href;
						});

					$link.on( 'click', function( evt ) {
						evt.preventDefault();
						$hlink.get(0).runGallery();
					});
				});
				$hg.appendTo( $this );
			}

			$prev.on( 'click', function() {
				swiper.swipePrev();
			});

			$next.on( 'click', function() {
				swiper.swipeNext();
			});

			$this.on({
				mouseenter: function() {
					swiper.stopAutoplay();
				},
				mouseleave: function() {
					swiper.startAutoplay();
				}
			});
		});

		$( '.new_large-content' ).each(function() {
			var $newsOne = $( this ),
				$gallery = $newsOne.parent().find( '.gallery' ),
				$links = $newsOne.find( 'a.new_large-photo' ).add( $gallery.find( 'a.large_new-photo' ) ),
				$hg = $( '<div class="hidden_gallery"></div>' );

				$links.clone().appendTo( $hg );

				$links.each(function() {
					var $link = $( this ),
						$hlink = $hg.find( 'a' ).filter(function() {
							return $link.get( 0 ).href === this.href;
						});

					$link.on( 'click', function( evt ) {
						evt.preventDefault();
						$hlink.get(0).runGallery();
					});
				});

				$hg.appendTo( $newsOne );
		});

		baguetteBox.run( '.hidden_gallery' );

		baguetteBox.run( '.gallery-small' );

		$( "input.contact--date" ).datepicker();

		jVForms.initialize({
	        notice: 'Error'
	    });

	});

})( jQuery );