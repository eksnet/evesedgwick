
jQuery(document).ready(function() {
	processNotesElements();
	processGlosses();
});


/*
 * Convert cite elements to numbered anchors/links.
 * Test with http://localhost/EBR5/thread/imagenarrative/diegetic
 */
function processNotesElements() {
	// Create a container for the notes below the body. Include a heading.
	if (jQuery(".node-essay .field-name-body cite.note").length > 0) {
		jQuery(".node-essay .field-name-body").append('<div id="notes"><h2>Notes</h2></div>');
	}
	// Move cite elements to the notes container, wrap each in
	// its own div element, and create the two-way anchor links.
	jQuery(".node-essay .field-name-body cite.note").each(function(index, element) { 
		var noteNumber = index + 1;
		var elem = jQuery(element);
		elem.before('<a href="#note_'+noteNumber+'" id="note_ref_'+noteNumber+'" name="note_ref_'+noteNumber+'" class="scroll note-ref">'+noteNumber+'</a>');
		elem.appendTo("#notes");
		elem.wrap('<div class="note"></div>');
		elem.before('<a id="note_'+noteNumber+'" name="note_'+noteNumber+'" href="#note_ref_'+noteNumber+'" class="scroll note">'+noteNumber+'</a> ');
	});
	// Optional: add smooth scrolling to notes anchor links to avoid
	// abrupt jumping from essay body to notes and back again.
	jQuery(".scroll").click(function(event){
		event.preventDefault();
		var offset = jQuery(jQuery(this).attr('href')).offset().top;
		jQuery('html, body').animate({scrollTop:offset}, 1000);
	});
}

/*
 * Move glosses from sidebar block into inline containers and links.
 */
function processGlosses() {
	// for each gloss element in sidebar
	jQuery("#block-views-essay-glosses-block .node-gloss").each(function(index, glossElement) { 
		jQuery(glossElement).find(".field-name-field-gloss-path").each(function(i, pathElement) {
			// retrieve value of "path" field
			var path = jQuery(pathElement).find(".field-items .field-item").text();
			// hide the path field from the gloss
			jQuery(pathElement).hide();
			jQuery(".node-essay .field-name-body p:eq("+path+")").each(function(j, paragraphElement) {
				// Insert the gloss container at the end of the paragraph after closing </p> tag
				var container = jQuery('<p class="gloss-container" id="gloss-container-'+path+'"></p>');
				container.insertAfter(jQuery(paragraphElement));
				container.append(glossElement);
				container.hide();
				// Insert the show glosses link at the end of the paragraph
				jQuery(paragraphElement).append(' <a href="#" class="toggle-glosses" id="toggle-glosses-'+path+'" onClick="toggleGlossContainerVisibility('+path+'); return false;">&lt;</a>');
				/*
				// Move the show glosses link to the right margin
				var linkElement = jQuery(paragraphElement).find("a.toggle-glosses");
				var linkPos = linkElement.position();
				var paraPos = jQuery(paragraphElement).position();
				var paraWidth = jQuery(paragraphElement).outerWidth();
				var paraHeight = jQuery(paragraphElement).outerHeight();
				linkElement.css({
				        position: "relative",
				        left: (paraPos.left + paraWidth - linkPos.left + 20) + "px",
				    });
				*/
			});
		});
	});	
	// Hide what's left of the glosses block
	jQuery("#block-views-essay-glosses-block").hide();
	// Add gloss-create link to all paragraphs in essay
	// TODO
}

function toggleGlossContainerVisibility(path) {
	var elem = jQuery('#gloss-container-'+path);
	var linkElem = jQuery('#toggle-glosses-'+path);
	if (elem.is(":visible")) {
		elem.slideUp("fast");
		linkElem.text(window.clickedText);
	} else {
		elem.slideDown("fast");
		window.clickedText = linkElem.text();
		linkElem.text('X');
	}
}