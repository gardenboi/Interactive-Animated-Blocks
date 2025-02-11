import anime from 'animejs';
import ScrollMagic from 'scrollmagic';
import { ScrollMagicPluginIndicator } from 'scrollmagic-plugins';

export const timelines = [];

/** Creating a new instance of the ScrollMagic controller. */
const scrollMagic = new ScrollMagic.Controller();

/**
 * It enables the ScrollMagic indicators plugin.
 */
export function enableScrollMagicIndicators() {
	console.log( 'scrollMagic ScrollMagicPluginIndicator enabled' );
	ScrollMagicPluginIndicator( ScrollMagic );
}

/**
 * It adds an element to the timelines object
 *
 * @param {HTMLElement} el - The element that is being added to the timeline.
 */
export function addToTimeline( el ) {
	timelines[ el.sscItemData.sscItem ] = el;
}

/**
 * For each timeline element, call the scrollTimeline function.
 */
export function initTimeline() {
	timelines.forEach( ( el ) => scrollTimeline( el ) );
}

/**
 * It creates a ScrollMagic scene for each timeline element,
 * and then binds the timeline animation to the scene progress
 *
 * @param {HTMLElement} el - The element that is being animated.
 */
function scrollTimeline( el ) {
	el.classList.add( 'ssc-timeline' );
	el.style.maxWidth = '100%';

	// Add timeline for each element
	const timeline = anime.timeline( { autoplay: false } );

	el.querySelectorAll( '.ssc-timeline-scene' ).forEach( ( scenes ) => {
		const sceneData = JSON.parse( scenes.sscItemData.scene );
		const sceneOpts = scenes.sscItemOpts;
		sceneOpts.duration = parseInt( sceneOpts.duration, 10 );
		sceneOpts.delay = parseInt( sceneOpts.delay, 10 );

		const offset = parseInt( sceneOpts.offset, 10 );
		const sceneOffset =
			// eslint-disable-next-line no-nested-ternary
			offset !== 0
				? offset > 0
					? '+=' + offset
					: '-=' + offset
				: false;

		// loop foreach object of the json (each object is a scene of the element timeline)
		Object.values( sceneData ).forEach( ( scene ) => {
			timeline.add(
				{
					targets: scenes,
					duration: sceneOpts.duration,
					delay: sceneOpts.delay,
					easing: scenes.sscItemOpts.easing,
					...scene,
				},
				sceneOffset
			);
		} );
	} );

	/**
	 * Create a scene
	 *
	 * @module ScrollMagic
	 *
	 * @function ScrollMagic.Scene
	 */
	timelines[ el.sscItemData.sscItem ] = new ScrollMagic.Scene( {
		triggerElement: el,
		duration: el.sscItemOpts.duration,
		triggerHook: el.sscItemOpts.triggerHook || 0.25,
		addIndicators: true,
	} )
		// bind animation timeline with anime.js animation progress
		.on( 'progress', ( event ) => {
			timeline.seek( timeline.duration * event.progress );
		} )
		.setPin( el )
		.addTo( scrollMagic );
}
