/*!
 * SSC 0.0.1
 * The javascript frontend script of ssc
 * 2022
 * Project Website: http://codekraft.it
 *
 * @version 0.0.1
 * @license GPLv3.
 * @author Erik
 *
 * @file The scc animation frontend scripts.
 */

// UTILITY
import { options } from '../ssc';
import { getElelementData } from '../utils/fn';
import { delay, scrollDirection, screenBodyClass } from '../utils/utils';

// MODULES
import video360Controller from './modules/image360';
import jumpToScreen from './modules/screenJumper';
import imageScaleController from './modules/imageScale';
import videoWheelController from './modules/videoWheel';
import videoFocusPlay from './modules/videoFocus';
import scrollJacking from './modules/scrollJacking';
import textStagger from './modules/textStagger';
import textAnimated from './modules/textEffects';
import animationSvgPath from './modules/svgPath';
import handleAnimation from './modules/itemAnimate';
import navigator from './modules/navigator';
import {
	itemParallaxed,
	parallax,
	parallaxController,
} from './modules/itemParallax';
import animationSequence from './modules/itemCustomAnimation';
import videoParallaxController from './modules/videoParallax';
import {
	addToTimeline,
	initTimeline,
	enableScrollMagicIndicators,
} from './modules/timeline';

/**
 * This object holds the window data to avoid unnecessary calculations
 * and has 2 properties: viewHeight and lastScrollPosition.
 *
 * @typedef {Object} windowData
 * @property {number} viewHeight         - window.innerHeight alias
 * @property {number} lastScrollPosition - window.scrollY alias
 * @property {string} direction          - the scroll direction (up|down)
 */
export const windowData = {
	viewHeight: window.innerHeight,
	pageHeight: document.body.scrollHeight,
	lastScrollPosition: window.scrollY,
	direction: undefined,
};

/**
 * on load and on hashchange (usually on history back/forward)
 */
export const jumpToHash = () => {
	if ( typeof window.location.hash !== 'undefined' ) {
		// GOTO
		console.log( window.location.hash );
	}
};
window.addEventListener( 'load', jumpToHash );
window.addEventListener( 'hashchange', jumpToHash );

/**
 * The main frontend plugin script
 * collects all the elements with the class "ssc" and applies the animation to them
 *
 * @class _ssc
 *
 */
export default class _ssc {
	constructor() {
		this.options = options;

		/**
		 * Store the touch position
		 *
		 * @typedef {Object} touchPos
		 * @property {number} x - the touch start x position
		 * @property {number} y - the touch start y position
		 */
		this.touchPos = {
			x: false,
			y: false,
		};

		// the ssc enabled elements found in this page it's not an array but a nodelist (anyhow we can iterate with foreach so at the moment is fine)
		this.collected = [];

		// will hold the intersection observer
		this.observer = [];
		this.initMutationObserver = this.initMutationObserver.bind( this );

		// MODULES
		this.video360Controller = video360Controller;
		this.jumpToScreen = jumpToScreen;
		this.imageScaleController = imageScaleController;
		this.videoWheelController = videoWheelController;
		this.videoFocusPlay = videoFocusPlay;
		this.textStagger = textStagger;
		this.textAnimated = textAnimated;
		this.animationSvgPath = animationSvgPath;
		this.initTimeline = initTimeline;
		this.navigator = navigator;

		// Screen jacking - evil as eval
		this.scrollJacking = scrollJacking;

		this.sequenceAnimations = [];
		this.animationSequence = animationSequence;

		// The standard animation (animate.css)
		this.animations = [];
		this.handleAnimation = handleAnimation.bind( this );

		// Video playback controlled by scroll Y position
		this.videoParallaxController = videoParallaxController.bind( this );

		// Parallax Items
		this.itemParallaxed = itemParallaxed;
		this.parallax = parallax.bind( this );
		this.parallaxController = parallaxController.bind( this );

		this.init();
	}

	/**
	 * It waits 250 milliseconds for resize to be completely done,
	 * then updates the windowData object with the current window height and scroll position
	 *
	 * @param {number} waitFor
	 */
	updateScreenSize( waitFor = 250 ) {
		( async () =>
			await ( () => console.warn( 'Old Screensize', windowData ) ) )()
			.then( () => {
				return delay( waitFor );
			} )
			.then( () => {
				windowData.viewHeight = window.innerHeight;
				windowData.lastScrollPosition = window.scrollY;
				this.updateAnimationPosition();
				console.warn( 'New Screensize', windowData );
				return windowData;
			} );
	}

	/**
	 * Detach an element from screen control
	 *
	 * @param {IntersectionObserverEntry} el - the element to unmount
	 */
	static unmount = ( el ) => el.unWatch;

	/**
	 * Inject the animate.css stylesheet if needed
	 * maybe it may seem like an unconventional method but
	 * this way this (quite heavy) file is loaded only there is a need
	 *
	 * @param {HTMLCollection} collected - the object with the collection of animated items
	 */
	applyAnimateCssStylesheet = ( collected ) => {
		const hasAnimate = Object.values( collected ).filter(
			( observed ) => observed.sscItemData.sscAnimation === 'sscAnimation'
		);
		if ( hasAnimate ) {
			const animateCSS = document.createElement( 'link' );
			animateCSS.rel = 'stylesheet';
			animateCSS.id = 'ssc_animate-css';
			animateCSS.href =
				'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';
			document.head.appendChild( animateCSS );
		}
	};

	/**
	 * Updates the position of the animated item.
	 * if the item has not the position it's a child, and it doesn't need to be updated
	 */
	updateAnimationPosition = () =>
		this.animations.forEach( ( item ) =>
			item.position ? item.updatePosition() : null
		);

	/**
	 * After collecting all the animation-enabled elements
	 * this function prepares them by applying css styles and classes
	 *
	 * @param    {(IntersectionObserverEntry|dataset)} el
	 * @param    {number}                              index
	 *
	 * @typedef sscItem - the ssc item
	 * @property {dataset}                             dataset                   - The item dataset (used to store animation options)
	 * @property {number}                              dataset.sscItem           - add the sscItem property to each item
	 * @property {string}                              dataset.sscProps          - the item options
	 * @property {string}                              dataset.sscSequence       - the scc animation used for the "itemCustomAnimation"
	 * @property {?string}                             dataset.sscSequence.scene - the scene sequence data
	 *
	 * @property {Function}                            unWatch                   - remove from observed items
	 * @property {Object}                              sscItemData               - a copy of the dataset
	 * @property {string}                              sscItemData.sscItem       - the ssc id
	 * @property {Object}                              sscItemOpts               - the scc general animation parameters
	 * @property {?Object}                             sscScene                  - the scc animation used for the "timeline"
	 */
	addMetaToCollected = ( el, index ) => {
		// add data-ssc-item="n" to each item
		el.dataset.sscItem = index;

		el.unWatch = () => this.observer.unobserve( el );

		el.sscItemData = el.dataset;

		el.sscItemOpts = el.dataset.sscProps
			? getElelementData( el.dataset.sscProps, 'data' )
			: null;

		el.sscSequence =
			el.dataset && el.dataset.sscSequence
				? getElelementData( el.dataset.sscSequence, 'style' )
				: null;

		el.sscScene =
			el.dataset && el.dataset.sscSequence && el.dataset.sscSequence.scene
				? el.dataset.sscSequence.scene
				: null;

		// scroll animated video needs custom settings
		if (
			[
				'sscVideoParallax',
				'sscVideoScroll',
				'sscVideoFocusPlay',
				'ssc360',
			].includes( el.sscItemData.sscAnimation )
		) {
			/** @property {HTMLVideoElement} videoEL - Video element inside a "video-animated" block */
			const videoEl = el.querySelector( 'video' );
			if ( videoEl ) {
				videoEl.autoplay = false;
				videoEl.controls = false;
				videoEl.loop = false;
				videoEl.muted = true;
				videoEl.playsinline = true;
				videoEl.preload = 'auto';
				videoEl.pause();
			}
			el.classList.add( 'ssc-video' );
		}

		switch ( el.sscItemData.sscAnimation ) {
			case 'sscScrollJacking':
				Object.assign( el.style, {
					minHeight: 'calc(100vh + 2px)',
					width: '100%',
					paddingTop: 0,
					paddingBottom: 0,
					margin: 0,
				} );
				break;
			case 'sscParallax':
				this.itemParallaxed[ el.sscItemData.sscItem ] = el;
				break;
			case 'sscScrollTimeline':
				el.querySelectorAll( '.ssc' ).forEach( ( timelineChild ) => {
					timelineChild.classList.add( 'ssc-timeline-child' );
					timelineChild.dataset.timelineDuration =
						el.sscItemOpts.duration;
				} );
				break;
			case 'sscTimelineChild': // init ScrollMagic scene
				el.classList.add( 'ssc-timeline-scene' );
				break;
			case 'sscAnimation': // init ScrollMagic scene
				el.classList.add( 'ssc-animated' );
				break;
		}
	};

	// Main.js
	// Screen Control Initialization
	init = () => {
		if ( 'IntersectionObserver' in window ) {
			/** this is mandatory because animation could exit from left or right*/
			document.body.style.overflowX = 'hidden';

			const page = options.container || document.body;

			this.collected = page.querySelectorAll( '.ssc' );
			console.log( 'SSC ready' );

			this.observer = new window.IntersectionObserver(
				this.screenControl,
				{
					root: null,
					rootMargin: options.rootMargin,
					threshold: options.threshold,
				}
			);

			/**
			 * Animated items - Let's start the intersection observer
			 *
			 * @typedef collected - the collection of animated elements
			 * @property {Object} collected - the animated item collection
			 */
			this.collected.forEach( function ( el, index ) {
				this.addMetaToCollected( el, index );

				if ( el.sscItemData.sscAnimation === 'sscScrollTimeline' ) {
					// init ScrollMagic
					addToTimeline( el );
				} else {
					// watch the elements to detect the screen margins intersection
					this.observer.observe( el );
				}
			}, this );

			// injects animate.css stylesheet
			this.applyAnimateCssStylesheet( this.collected );

			const isAdmin = document.body.classList.contains( 'logged-in' );
			if ( isAdmin ) {
				enableScrollMagicIndicators();
			}

			this.initTimeline();

			// start parallax
			this.parallax();

			// if the window has in the page url an anchor scroll target, get it then jump to that element
			if ( window.location.hash ) {
				const destination = window.location.hash.substring( 1 );
				// get the element by its id
				const destinationY =
					document.getElementById( destination ).offsetTop;
				// scroll to the element
				window.scrollTo( {
					top: destinationY,
					behavior: 'smooth',
				} );
			}

			this.jumpToScreen(
				document.querySelectorAll( '.ssc-screen-jumper' )
			);

			// watch for new objects added to the DOM
			this.interceptor( options.container );

			this.updateScreenSize();

			// update the screen size if necessary
			window.addEventListener( 'resize', screenBodyClass );
			window.addEventListener( 'scroll', screenBodyClass );
		} else {
			console.warn( 'IntersectionObserver could not enabled' );
		}
	};

	sscAnimation = ( entry ) => {
		// this item is entering or leaving the view
		if ( entry.target.action ) {
			switch ( entry.target.sscItemData.sscAnimation ) {
				case 'sscParallax':
					this.parallaxController( entry ); // yup
					break;
				case 'sscAnimation':
					this.handleAnimation( entry );
					break;
				case 'sscSequence':
					this.animationSequence( entry, entry.target.action );
					break;
				case 'sscSvgPath':
					this.animationSvgPath( entry, entry.target.action ); // yup (missing some options)
					break;
				case 'sscScrollJacking':
					this.scrollJacking( entry );
					break;
				case 'sscNavigator':
					this.navigator( entry );
					break;
				case 'sscCounter':
					this.textAnimated( entry );
					break;
				case 'sscVideoFocusPlay':
					this.videoFocusPlay( entry ); // yup, but needs to be inline and muted
					break;
				case 'sscVideoParallax':
					this.videoParallaxController( entry );
					break;
				case 'sscVideoScroll':
					this.videoWheelController( entry );
					break;
				case 'ssc360':
					this.video360Controller( entry );
					break;
				case 'sscImageZoom':
					this.imageScaleController( entry ); // NO
					break;
				case 'sscTextStagger':
					this.textStagger( entry );
					break;
				default:
					// 🥱 miss
					break;
			}
		}
	};

	updateItemData = ( entry ) => {
		const elCenter =
			( entry.boundingClientRect.top + entry.boundingClientRect.bottom ) /
			2;

		// stores the direction from which the element appeared
		entry.target.dataset.intersection =
			windowData.viewHeight / 2 > elCenter ? 'up' : 'down';

		/**
		 * @description check if the current "is Intersecting" has been changed, eg if was visible and now it isn't the element has left the screen
		 */
		if ( entry.isIntersecting !== entry.target.dataset.visible ) {
			if ( typeof entry.target.dataset.visible === 'undefined' ) {
				entry.target.action = 'enter';
			} else {
				entry.target.action = entry.isIntersecting ? 'enter' : 'leave';
			}
		} else {
			entry.target.action = '';
		}

		/**
		 * @description If the item contains the class "ssc-focused",
		 * add a class to the body element when the element is in view.
		 * Will be useful to show and hide the "back to top" button or show/hide the header.
		 */
		if ( entry.target.classList.contains( 'ssc-focused' ) ) {
			if ( entry.isIntersecting ) {
				document.body.classList.add( 'ssc-focus-' + entry.target.id );
			} else {
				document.body.classList.remove(
					'ssc-focus-' + entry.target.id
				);
			}
		}

		// is colliding with borders // used next loop to detect if the object is inside the screen
		entry.target.dataset.visible = entry.isIntersecting ? 'true' : 'false';
	};

	/**
	 * @param {IntersectionObserverEntry[]} entries - the Intersection observer item collection
	 */
	screenControl = ( entries ) => {
		// set the scroll direction to body dataset
		scrollDirection( true );

		entries.forEach( ( entry ) => {
			/** @member {IntersectionObserverEntry} entry  */
			if ( entry.target.dataset.lock ) {
				return true;
			}

			this.updateItemData( entry );

			this.sscAnimation( entry );
		} );

		screenBodyClass();
	};

	initMutationObserver( mutationsList, mutationObserver ) {
		//for every mutation
		mutationsList.forEach( ( mutation ) => {
			//for every added element
			mutation.addedNodes.forEach( ( node ) => {
				// Check if we appended a node type that isn't
				// an element that we can search for images inside,
				// like a text node.
				if ( typeof node.getElementsByTagName !== 'function' ) {
					return;
				}

				const objCollection = node.querySelectorAll( '.ssc' );

				if ( objCollection.length ) {
					objCollection.forEach( function ( el ) {
						this.addMetaToCollected( el, this.collected.length );

						// watch the elements to detect the screen margins intersection
						return this.observer.observe( el );
					} );
				}
			} );
		} );
	}

	/**
	 * Create an observer instance linked to the callback function,
	 * then start observing the target node for configured mutations.
	 *
	 * The first line of the function creates an instance of the MutationObserver class, which is a built-in JavaScript class.
	 * The second line of the function starts observing the target node for configured mutations
	 *
	 * @param {HTMLElement} content - The element to watch for changes.
	 */
	interceptor( content ) {
		// Create an observer instance linked to the callback function
		this.mutationObserver = new window.MutationObserver(
			this.initMutationObserver
		);

		// Start observing the target node for configured mutations
		this.mutationObserver.observe( content, {
			attributes: false,
			childList: true,
			subtree: true,
		} );
	}
}
