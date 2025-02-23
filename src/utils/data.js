/** the advanced animation available parameters and defaults  */
export const actionsTemplate = [
	{
		actionLabel: 'Keyframe (duration in ms)',
		action: 'duration',
		valueType: 'int',
		valueDefault: '500',
	},
	{
		actionLabel: 'Opacity',
		action: 'opacity',
		valueType: 'int',
		valueDefault: '1',
	},
	{
		actionLabel: 'translateY',
		action: 'translateY',
		valueType: 'string',
		valueDefault: '100px',
	},
	{
		actionLabel: 'translateX',
		action: 'translateX',
		valueType: 'string',
		valueDefault: '100px',
	},
	{
		actionLabel: 'translateZ',
		action: 'translateZ',
		valueType: 'string',
		valueDefault: '100px',
	},
	{
		actionLabel: 'Rotate',
		action: 'rotate',
		valueType: 'string',
		valueDefault: '45deg',
	},
	{
		actionLabel: 'rotateY',
		action: 'rotateY',
		valueType: 'string',
		valueDefault: '45deg',
	},
	{
		actionLabel: 'rotateX',
		action: 'rotateX',
		valueType: 'string',
		valueDefault: '45deg',
	},
	{
		actionLabel: 'rotateZ',
		action: 'rotateZ',
		valueType: 'string',
		valueDefault: '45deg',
	},
	{
		actionLabel: 'Scale',
		action: 'scale',
		valueType: 'number',
		valueDefault: '1.5',
	},
	{
		actionLabel: 'Background',
		action: 'background',
		valueType: 'color',
		valueDefault: '#000',
	},
	{
		actionLabel: 'Color',
		action: 'color',
		valueType: 'color',
		valueDefault: '#f00',
	},
	{
		actionLabel: 'CSS Animation',
		action: 'cssAnimation',
		valueType: 'string',
		valueDefault: 'fadeIn 5s linear 2s infinite alternate',
	},
];

export const cssAnimationsEasings = [
	{
		label: 'Linear',
		value: 'linear',
	},
	{
		label: 'Ease',
		value: 'ease',
	},
	{
		label: 'Ease-in',
		value: 'ease-in',
	},
	{
		label: 'Ease-out',
		value: 'ease-out',
	},
	{
		label: 'Ease-in-out',
		value: 'ease-in-out',
	},
];

export const animationEasings = [
	{
		label: 'Linear',
		value: 'linear',
	},
	{
		label: 'Elastic (low)',
		value: 'easeInElastic(1, .3)',
	},
	{
		label: 'Elastic (mid)',
		value: 'easeInElastic(1, .6)',
	},
	{
		label: 'Elastic (high)',
		value: 'easeInElastic(2, 1)',
	},
	{
		label: 'easeInQuad',
		value: 'easeInQuad',
	},
	{
		label: 'easeOutQuad',
		value: 'easeOutQuad',
	},
	{
		label: 'easeInOutQuad',
		value: 'easeInOutQuad',
	},
	{
		label: 'easeOutInQuad',
		value: 'easeOutInQuad',
	},
	{
		label: 'easeInCubic',
		value: 'easeInCubic',
	},
	{
		label: 'easeOutCubic',
		value: 'easeOutCubic',
	},
	{
		label: 'easeInOutCubic',
		value: 'easeInOutCubic',
	},
	{
		label: 'easeOutInCubic',
		value: 'easeOutInCubic',
	},

	{
		label: 'easeInSine',
		value: 'easeInSine',
	},
	{
		label: 'easeOutSine',
		value: 'easeOutSine',
	},
	{
		label: 'easeInOutSine',
		value: 'easeInOutSine',
	},
	{
		label: 'easeOutInSine',
		value: 'easeOutInSine',
	},

	{
		label: 'easeInExpo',
		value: 'easeInExpo',
	},
	{
		label: 'easeOutExpo',
		value: 'easeOutExpo',
	},
	{
		label: 'easeInOutExpo',
		value: 'easeInOutExpo',
	},
	{
		label: 'easeOutInExpo',
		value: 'easeOutInExpo',
	},
];

export const animationTypes = [
	{
		label: 'Animation',
		value: 'sscAnimation',
		default: {
			animationEnter: 'fadeIn',
			animationLeave: 'fadeOut',
			intersection: 75,
			easing: 'linear',
			duration: 0,
			delay: 0,
			reiterate: true,
			stagger: 'none',
		},
	},
	{
		label: 'Parallax',
		value: 'sscParallax',
		default: {
			direction: 'y',
			level: 1,
			speed: 1,
			motion: 50,
			reiterate: true,
		},
	},
	{
		label: 'Scroll Timeline',
		value: 'sscScrollTimeline',
		default: {
			duration: 400,
			triggerHook: 0.2,
			reiterate: true,
		},
	},
	{
		label: 'Scroll Timeline child',
		value: 'sscTimelineChild',
		default: {
			offset: 0,
			delay: 0,
			duration: 1000,
			reiterate: true,
			easing: 'linear',
		},
	},
	{
		label: 'Image 360',
		value: 'ssc360',
		default: {
			spinRatio: 1,
			control: 'pointer', // drag
			reiterate: true,
		},
	},
	{
		label: 'Image Zoom',
		value: 'sscImageZoom',
		default: {
			zoom: 1,
			reiterate: true,
		},
	},
	{
		label: 'Video scroll-driven playback',
		value: 'sscVideoScroll',
		default: {
			playbackRatio: 1,
			reiterate: true,
		},
	},
	{
		label: 'Video Parallax',
		value: 'sscVideoParallax',
		default: {
			playbackRatio: 1,
			reiterate: true,
		},
	},
	{
		label: 'Video play on screen',
		value: 'sscVideoFocusPlay',
		default: {
			reiterate: true,
		},
	},
	{
		label: 'Svg Path Animation',
		value: 'sscSvgPath',
		default: {
			duration: 5000,
			delay: 500,
			intersection: 80,
			reiterate: true,
			easing: 'easeInOutExpo',
		},
	},
	{
		label: 'Custom animation',
		value: 'sscSequence',
		default: {
			duration: 2000,
			delay: 500,
			intersection: 80,
			reiterate: true,
			easing: 'easeInOutQuad',
		},
	},
	{
		label: 'ScrollJacking',
		value: 'sscScrollJacking',
		default: {
			intersection: 10,
			duration: 800,
			delay: 500,
			reiterate: true,
			easing: 'easeOutExpo',
		},
	},
	{
		label: 'Counter',
		value: 'sscCounter',
		default: {
			duration: 8000,
			delay: 0,
			reiterate: true,
			easing: 'easeInOutExpo',
			target: 'number',
		},
	},
	{
		label: 'Text Stagger',
		value: 'sscTextStagger',
		default: {
			duration: 5000,
			delay: 1000,
			reiterate: true,
			easing: 'easeInOutQuad',
			preset: 'default',
			splitBy: 'letter',
			intersection: 80,
		},
	},
	{
		label: 'Screen Jump',
		value: 'sscScreenJump',
		default: {
			target: 'none',
		},
	},
	{
		label: 'Navigator',
		value: 'sscNavigator',
		default: {},
	},
];

export const animationList = [
	{
		label: 'No Animation',
		value: false,
	},
	{
		label: 'bounce',
		value: 'bounce',
	},
	{
		label: 'flash',
		value: 'flash',
	},
	{
		label: 'pulse',
		value: 'pulse',
	},
	{
		label: 'rubberBand',
		value: 'rubberBand',
	},
	{
		label: 'shakeX',
		value: 'shakeX',
	},
	{
		label: 'shakeY',
		value: 'shakeY',
	},
	{
		label: 'headShake',
		value: 'headShake',
	},
	{
		label: 'swing',
		value: 'swing',
	},
	{
		label: 'tada',
		value: 'tada',
	},
	{
		label: 'wobble',
		value: 'wobble',
	},
	{
		label: 'jello',
		value: 'jello',
	},
	{
		label: 'heartBeat',
		value: 'heartBeat',
	},
	{
		label: 'hinge',
		value: 'hinge',
	},
	{
		label: 'jackInTheBox',
		value: 'jackInTheBox',
	},
	{
		label: 'rollIn',
		value: 'rollIn',
	},
	{
		label: 'rollOut',
		value: 'rollOut',
	},

	// Back
	{
		label: 'backInDown',
		value: 'backInDown',
	},
	{
		label: 'backInLeft',
		value: 'backInLeft',
	},
	{
		label: 'backInRight',
		value: 'backInRight',
	},
	{
		label: 'backInUp',
		value: 'backInUp',
	},
	{
		label: 'backOutDown',
		value: 'backOutDown',
	},
	{
		label: 'backOutLeft',
		value: 'backOutLeft',
	},
	{
		label: 'backOutRight',
		value: 'backOutRight',
	},
	{
		label: 'backOutUp',
		value: 'backOutUp',
	},

	// Bouncing
	{
		label: 'bounceIn',
		value: 'bounceIn',
	},
	{
		label: 'bounceInDown',
		value: 'bounceInDown',
	},
	{
		label: 'bounceInLeft',
		value: 'bounceInLeft',
	},
	{
		label: 'bounceInRight',
		value: 'bounceInRight',
	},
	{
		label: 'bounceInUp',
		value: 'bounceInUp',
	},
	{
		label: 'bounceOut',
		value: 'bounceOut',
	},
	{
		label: 'bounceOutDown',
		value: 'bounceOutDown',
	},
	{
		label: 'bounceOutLeft',
		value: 'bounceOutLeft',
	},
	{
		label: 'bounceOutRight',
		value: 'bounceOutRight',
	},
	{
		label: 'bounceOutUp',
		value: 'bounceOutUp',
	},

	// Fade
	{
		label: 'fadeIn',
		value: 'fadeIn',
	},
	{
		label: 'fadeInDown',
		value: 'fadeInDown',
	},
	{
		label: 'fadeInDownBig',
		value: 'fadeInDownBig',
	},
	{
		label: 'fadeInLeft',
		value: 'fadeInLeft',
	},
	{
		label: 'fadeInLeftBig',
		value: 'fadeInLeftBig',
	},
	{
		label: 'fadeInRight',
		value: 'fadeInRight',
	},
	{
		label: 'fadeInRightBig',
		value: 'fadeInRightBig',
	},
	{
		label: 'fadeInUp',
		value: 'fadeInUp',
	},
	{
		label: 'fadeInUpBig',
		value: 'fadeInUpBig',
	},
	{
		label: 'fadeInTopLeft',
		value: 'fadeInTopLeft',
	},
	{
		label: 'fadeInTopRight',
		value: 'fadeInTopRight',
	},
	{
		label: 'fadeInTopRight',
		value: 'fadeInTopRight',
	},
	{
		label: 'fadeInBottomLeft',
		value: 'fadeInBottomLeft',
	},
	// fade exit
	{
		label: 'fadeOut',
		value: 'fadeOut',
	},
	{
		label: 'fadeOutDown',
		value: 'fadeOutDown',
	},
	{
		label: 'fadeOutDownBig',
		value: 'fadeOutDownBig',
	},
	{
		label: 'fadeOutLeft',
		value: 'fadeOutLeft',
	},
	{
		label: 'fadeOutLeftBig',
		value: 'fadeOutLeftBig',
	},
	{
		label: 'fadeOutRight',
		value: 'fadeOutRight',
	},
	{
		label: 'fadeOutRightBig',
		value: 'fadeOutRightBig',
	},
	{
		label: 'fadeOutUp',
		value: 'fadeOutUp',
	},
	{
		label: 'fadeOutUpBig',
		value: 'fadeOutUpBig',
	},
	{
		label: 'fadeOutTopLeft',
		value: 'fadeOutTopLeft',
	},
	{
		label: 'fadeOutTopRight',
		value: 'fadeOutTopRight',
	},
	{
		label: 'fadeOutTopRight',
		value: 'fadeOutTopRight',
	},
	{
		label: 'fadeOutBottomLeft',
		value: 'fadeOutBottomLeft',
	},

	// Lightspeed
	{
		label: 'lightSpeedInRight',
		value: 'lightSpeedInRight',
	},
	{
		label: 'lightSpeedInLeft',
		value: 'lightSpeedInLeft',
	},
	{
		label: 'lightSpeedOutRight',
		value: 'lightSpeedOutRight',
	},
	{
		label: 'lightSpeedOutLeft',
		value: 'lightSpeedOutLeft',
	},

	// Zooming
	{
		label: 'zoomIn',
		value: 'zoomIn',
	},
	{
		label: 'zoomInDown',
		value: 'zoomInDown',
	},
	{
		label: 'zoomInLeft',
		value: 'zoomInLeft',
	},
	{
		label: 'zoomInRight',
		value: 'zoomInRight',
	},
	{
		label: 'zoomInUp',
		value: 'zoomInUp',
	},
	{
		label: 'zoomOut',
		value: 'zoomOut',
	},
	{
		label: 'zoomOutDown',
		value: 'zoomOutDown',
	},
	{
		label: 'zoomOutLeft',
		value: 'zoomOutLeft',
	},
	{
		label: 'zoomOutRight',
		value: 'zoomOutRight',
	},
	{
		label: 'zoomOutUp',
		value: 'zoomOutUp',
	},

	// Sliding
	{
		label: 'slideInDown',
		value: 'slideInDown',
	},
	{
		label: 'slideInLeft',
		value: 'slideInLeft',
	},
	{
		label: 'slideInRight',
		value: 'slideInRight',
	},
	{
		label: 'slideInUp',
		value: 'slideInUp',
	},
	{
		label: 'slideOutDown',
		value: 'slideOutDown',
	},
	{
		label: 'slideOutLeft',
		value: 'slideOutLeft',
	},
	{
		label: 'slideOutRight',
		value: 'slideOutRight',
	},
	{
		label: 'slideOutUp',
		value: 'slideOutUp',
	},
];

export const textStaggerPresets = {
	default: [
		{
			translateY: [ '1em', 0 ],
			translateZ: 0,
		},
	],
	expo: [
		{
			scale: [ 15, 1 ],
			opacity: [ 0, 1 ],
		},
	],
	domino: [
		{
			rotateY: [ -90, 0 ],
			transformOrigin: '0 0',
		},
	],
	ghosting: [
		{
			translateX: [ 40, 0 ],
			translateZ: 0,
		},
		{
			translateX: [ 0, -30 ],
			opacity: [ 1, 0 ],
		},
	],
	elasticIn: [
		{
			scale: [ 0, 1 ],
			elasticity: 1200,
		},
	],
	rain: [
		{
			translateY: [ '-2em', 0 ],
			scaleX: [ 0, 1 ],
			opacity: [ 0, 1 ],
		},
	],
	snake: [
		{
			scaleX: [ 0, 1 ],
			translateY: [ '1em', 0 ],
			translateX: [ '.5em', 0 ],
			translateZ: 0,
			rotateZ: [ 90, 0 ],
			transformOrigin: '100% 50%',
		},
	],
};

export const textStaggerPresetsNames = [];
Object.keys( textStaggerPresets ).map( ( item ) =>
	textStaggerPresetsNames.push( {
		label: item,
		value: item,
	} )
);
