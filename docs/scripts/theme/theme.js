'use strict';

/**
 * Theme. ScrollToID.
 * ---------------------------------------------------------------------------------------------------------------------
 */

function scrollToID(element = '.ext-scroll') {
	const button = $(element);
	const container = $('html,body');

	button.on('click', (function (e) {
		e.preventDefault();
		container.animate({
			scrollTop: $(this.hash).offset().top
		}, 500);
	}));
}

/**
 * Theme. ScrollToTop.
 * ---------------------------------------------------------------------------------------------------------------------
 */

function scrollToTop() {
	$(window).on('scroll', function (element = '#scrollToTop') {
		const button = element;

		if ($(this).scrollTop() > 400) {
			$(button).fadeIn();
		} else {
			$(button).fadeOut();
		}
	});
}

/**
 * Theme. Clipboard.
 * ---------------------------------------------------------------------------------------------------------------------
 */

function clipBoard(element = '.ext-clipboard') {
	const clipboard = new ClipboardJS(element);

	clipboard.on('success', function (e) {
		e.clearSelection();
	});
}

/**
 * Theme. Particles JS.
 * ---------------------------------------------------------------------------------------------------------------------
 */

function particlesJS(element, file) {
	particlesJS.load(element, file);
}

/**
 * Theme. Page Indicator.
 * ---------------------------------------------------------------------------------------------------------------------
 */

function pageIndicator(status = 'loading') {
	let icon, out;

	switch (status) {
		case 'loading':
			icon = 'fas fa-cog fa-spin';
			break;
		case 'success':
			icon = 'fas fa-check-circle';
			break;
		case 'error':
			icon = 'fas fa-exclamation-triangle';
			break;
		case 'complete':
			icon = 'fas fa-check-circle';
			break;
		default:
			icon = '';
	}

	out = '<div id="page-indicator-' + status + '" class="page-indicator"><span class="icon"><i class="' + icon + ' fa-lg"></i></span></div>';

	$('.page-indicator').remove();
	$('body').append(out);
}

/**
 * Theme. QR Code.
 * ---------------------------------------------------------------------------------------------------------------------
 */

function qrCode(id, text, width = '') {
	let element = document.getElementById(id);
	let data = element.getAttribute(text);
	QRCode.toCanvas(element, data, {
		width: width,
	})
}

/**
 * Theme. Location.
 * ---------------------------------------------------------------------------------------------------------------------
 */

function winLocation(type) {
	let location = window.location;
	let href = location.href;
	let hash = location.hash;
	let host = location.hostname;
	let path = location.pathname;
	let protocol = location.protocol;
	let out;

	switch (type) {
		case 'href':
			out = href;
			break;
		case 'hash':
			out = hash;
			break;
		case 'host':
			out = host;
			break;
		case 'path':
			out = path;
			break;
		case 'protocol':
			out = protocol;
			break;
		default:
			out = '';
	}

	return out;
}