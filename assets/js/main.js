/*
	Astral by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var $window = $(window),
		$body = $('body'),
		$wrapper = $('#wrapper'),
		$main = $('#main'),
		$panels = $main.children('.panel'),
		$nav = $('#nav'), $nav_links = $nav.children('a');

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1680px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ '361px',   '736px'  ],
			xsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Nav.
		$nav_links
			.on('click', function(event) {

				var href = $(this).attr('href');

				// Not a panel link? Bail.
					if (href.charAt(0) != '#'
					||	$panels.filter(href).length == 0)
						return;

				// Prevent default.
					event.preventDefault();
					event.stopPropagation();

				// Change panels.
					if (window.location.hash != href)
						window.location.hash = href;

			});

	// Panels.

		// Initialize.
			(function() {

				var $panel, $link;

				// Get panel, link.
					if (window.location.hash) {

				 		$panel = $panels.filter(window.location.hash);
						$link = $nav_links.filter('[href="' + window.location.hash + '"]');

					}

				// No panel/link? Default to first.
					if (!$panel
					||	$panel.length == 0) {

						$panel = $panels.first();
						$link = $nav_links.first();

					}

				// Deactivate all panels except this one.
					$panels.not($panel)
						.addClass('inactive')
						.hide();

				// Activate link.
					// $link
					// 	.addClass('active');

				// Reset scroll.
					$window.scrollTop(0);

			})();

		// Hashchange event.
			$window.on('hashchange', function(event) {

				var $panel, $link;

				// Get panel, link.
					if (window.location.hash) {

				 		$panel = $panels.filter(window.location.hash);
						$link = $nav_links.filter('[href="' + window.location.hash + '"]');

						// No target panel? Bail.
							if ($panel.length == 0)
								return;

					}

				// No panel/link? Default to first.
					else {

						$panel = $panels.first();
						$link = $nav_links.first();

					}

				// Deactivate all panels.
					$panels.addClass('inactive');

				// Deactivate all links.
					$nav_links.removeClass('active');

				// Activate target link.
					// $link.addClass('active');

				// Set max/min height.
					$main
						.css('max-height', $main.height() + 'px')
						.css('min-height', $main.height() + 'px');

				// Delay.
					setTimeout(function() {

						// Hide all panels.
							$panels.hide();

						// Show target panel.
							$panel.show();

						// Set new max/min height.
							$main
								.css('max-height', $panel.outerHeight() + 'px')
								.css('min-height', $panel.outerHeight() + 'px');

						// Reset scroll.
							$window.scrollTop(0);

						// Delay.
							window.setTimeout(function() {

								// Activate target panel.
									$panel.removeClass('inactive');

								// Clear max/min height.
									$main
										.css('max-height', '')
										.css('min-height', '');

								// IE: Refresh.
									$window.triggerHandler('--refresh');

								// Unlock.
									locked = false;

							}, (breakpoints.active('small') ? 0 : 500));

					}, 250);

			});

	// IE: Fixes.
		if (browser.name == 'ie') {

			// Fix min-height/flexbox.
				$window.on('--refresh', function() {

					$wrapper.css('height', 'auto');

					window.setTimeout(function() {

						var h = $wrapper.height(),
							wh = $window.height();

						if (h < wh)
							$wrapper.css('height', '100vh');

					}, 0);

				});

				$window.on('resize load', function() {
					$window.triggerHandler('--refresh');
				});

			// Fix intro pic.
				$('.panel.intro').each(function() {

					var $pic = $(this).children('.pic'),
						$img = $pic.children('img');

					$pic
						.css('background-image', 'url(' + $img.attr('src') + ')')
						.css('background-size', 'cover')
						.css('background-position', 'center');

					$img
						.css('visibility', 'hidden');

				});

		}

})(jQuery);


class Contact {
	constructor(subject, message, name, gender, phone, email) {
	  this.subject = subject;
	  this.message = message;
	  this.name = name;
	  this.gender = gender;
	  this.phone = phone;
	  this.email = email;
	}
  }
  
  class UI {
	static displayContacts() {
	  const contacts = Store.getContacts();
	  contacts.forEach((contact) => UI.addContactToList(contact));
	}

	static addContactToList(contact) {
	  const list = document.querySelector('#contact-list');
	  const row = document.createElement('tr');
	  row.innerHTML = `
		<td>${contact.subject}</td>
		<td>${contact.message}</td>
		<td>${contact.name}</td>
		<td>${contact.gender}</td>
		<td>${contact.phone}</td>
		<td>${contact.email}</td>
		<td><a href="#" class="btn btn-sm delete"> X </a></td>
	  `;
	  list.appendChild(row);
	}
  
	static deleteContact(el) {
	  if(el.classList.contains('delete')) {     
		el.parentElement.parentElement.remove();
	  }
	}
  
	static showAlert(message, className) {
	  const div = document.createElement('div');
	  div.className = `alert alert-${className}`;
	  div.appendChild(document.createTextNode(message));
	  const msg = document.querySelector('.msg');
	  const form = document.querySelector('#contact-form');
	  msg.insertBefore(div, form);
	  setTimeout(() => document.querySelector('.alert').remove(), 3000);
	}
  
	static clearFields() {
	  document.querySelector('#subject').value = '';
	  document.querySelector('#message').value = '';
	  document.querySelector('#name').value = '';
	  document.querySelector('#gender').value = '';
	  document.querySelector('#phone').value = '';
	  document.querySelector('#email').value = '';
	}
  }
  
  class Store {
	static getContacts() {
	  let contacts;
	  if(localStorage.getItem('contacts') === null) {
		contacts = [];
	  } else {
		contacts = JSON.parse(localStorage.getItem('contacts'));
	  }
  
	  return contacts;
	}
  
	static addContact(contact) {
	  const contacts = Store.getContacts();
	  contacts.push(contact);
	  localStorage.setItem('contacts', JSON.stringify(contacts));
	}
  
	static removeContact(name) {
	  const contacts = Store.getContacts();
  
	  contacts.forEach((contact, index) => {
		if(contace.name === name) {
		  contacts.splice(index, 1);
		}
	  });
  
	  localStorage.setItem('contacts', JSON.stringify(contacts));
	}
  }
  
  document.addEventListener('DOMContentLoaded', UI.displayContacts);
  document.querySelector('#contact-form').addEventListener('submit', (e) => {
	e.preventDefault();
  
	const msg = document.querySelector('.msg');
	const subject = document.querySelector('#subject').value;
	const message = document.querySelector('#message').value;
	const name = document.querySelector('#name').value;
	const gender = document.querySelector('#gender').value;
	const phone = document.querySelector('#phone').value;
	const email = document.querySelector('#email').value;

  

	if(subject === '' || message === '' || name === '' || gender === '' || phone === '' || email === '') {
		msg.innerHTML = 'Please enter all fields';
	} else {

	  const contact = new Contact(subject, message, name, gender, phone, email);
	  UI.addContactToList(contact);
	  Store.addContact(contact);
	  //UI.showAlert('Added', 'success');
	  UI.clearFields();
	}
  });
  
  document.querySelector('#contact-list').addEventListener('click', (e) => {
	UI.deleteContact(e.target);
	Store.removeContact(e.target.parentElement.previousElementSibling.textContent);
	//UI.showAlert('Removed', 'success');
  });
  