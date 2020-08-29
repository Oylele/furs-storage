'use strict';

/**
 * Bulma. Get all elements.
 * ---------------------------------------------------------------------------------------------------------------------
 */

function bulmaGetAll(selector) {
	return Array.prototype.slice.call(document.querySelectorAll(selector), 0);
}

/**
 * Bulma. Get element ID.
 * ---------------------------------------------------------------------------------------------------------------------
 */

function bulmaGetElID(id) {
	return document.getElementById(id);
}

/**
 * Bulma. Dropdowns.
 * ---------------------------------------------------------------------------------------------------------------------
 */

function bulmaDropdowns() {
	const $dropdowns = bulmaGetAll('.dropdown:not(.is-hoverable)');

	if ($dropdowns.length > 0) {
		$dropdowns.forEach(function ($el) {
			$el.addEventListener('click', function (event) {
				event.stopPropagation();
				$el.classList.toggle('is-active');
			});
		});

		document.addEventListener('click', function (event) {
			closeDropdowns();
		});
	}

	// Close dropdowns.
	function closeDropdowns() {
		$dropdowns.forEach(function ($el) {
			$el.classList.remove('is-active');
		});
	}

	document.addEventListener('keydown', function (event) {
		let e = event || window.event;
		if (e.key === 27) {
			closeDropdowns();
		}
	});
}

/**
 * Bulma. Toggles.
 * ---------------------------------------------------------------------------------------------------------------------
 */

function bulmaToggles() {
	const $burgers = bulmaGetAll('.burger');

	if ($burgers.length > 0) {
		$burgers.forEach(function ($el) {
			$el.addEventListener('click', function () {
				const target = $el.dataset.target;
				const $target = bulmaGetElID(target);
				$el.classList.toggle('is-active');
				$target.classList.toggle('is-active');
			});
		});
	}
}

/**
 * Bulma. Modals.
 * ---------------------------------------------------------------------------------------------------------------------
 */

function bulmaModals() {
	const rootEl = document.documentElement;
	const $modals = bulmaGetAll('.modal');
	const $modalButtons = bulmaGetAll('.modal-button');
	const $modalCloses = bulmaGetAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .ext-modal-button-close');

	if ($modalButtons.length > 0) {
		$modalButtons.forEach(function ($el) {
			$el.addEventListener('click', function () {
				const target = $el.dataset.target;
				openModal(target);
			});
		});
	}

	if ($modalCloses.length > 0) {
		$modalCloses.forEach(function ($el) {
			$el.addEventListener('click', function () {
				closeModals();
			});
		});
	}

	// Open modal.
	function openModal(target) {
		const $target = bulmaGetElID(target);
		rootEl.classList.add('is-clipped');
		$target.classList.add('is-active');
	}

	// Close modal.
	function closeModals() {
		rootEl.classList.remove('is-clipped');
		$modals.forEach(function ($el) {
			$el.classList.remove('is-active');
		});
	}

	// Key function.
	document.addEventListener('keydown', function (event) {
		const e = event || window.event;
		if (e.key === 27) {
			closeModals();
		}
	});
}

/**
 * Bulma. Run Functions.
 * ---------------------------------------------------------------------------------------------------------------------
 */

document.addEventListener('DOMContentLoaded', function () {
	bulmaDropdowns();
	bulmaToggles();
	bulmaModals();
});
