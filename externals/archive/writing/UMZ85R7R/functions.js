//--Notice of Copyright --//
/*
Copyright (C) 2003, Juxta Media LLC
All rights reserved.
Reproduction or use of code contained herein is strictly prohibited without
the expressed permission of Juxta Media LLC.

Under no circumstances shall this copyright notice be removed from this file.
*/
//--End Notice --//

function openDimWindow(file,winname, width, height) {
	if (!winname) winname = 'win1';
	dimension="toolbar=yes,status=no,location=no,scrollbars=yes,resizable=no,width="+width+",height="+height; 
	window.open(file, winname, dimension);
}

function openWindow(file,winname) {
	var width = 600;
	var height = 500;
	openDimWindow(file,winname, width, height);
}

function archiveJob(file) {
	vMsg = 'Was this job filled through Bookjobs.com?\n\nClick Ok for Yes and Cancel for No.';
	if (confirm(vMsg)) 
		location=file+'&prmFilled=1'; 
	else 
		location=file;
}

function deleteConfirm( theURL) {
	if (confirm('Are you absolutely sure you wish to delete this record?  This is not recoverable.')) 
		top.location.href = theURL;
}

function bookmarkThis(url, desc) {
	if ((navigator.appName == "Microsoft Internet Explorer") && (parseInt(navigator.appVersion) >= 4) && (navigator.platform != "MacPPC")) {
		window.external.addFavorite(url, desc);
	}
	else {
		var msg = "Please hit";
		if (navigator.appName == "Netscape") 
			msg += " (CTRL-D) to add to your bookmark.";
		else if (navigator.platform == "MacPPC")
			msg += " (Apple-D) to add to your favorites.";
		else 
			msg += " the \"Favorites\" item in the menu bar to add to your favorites.";
		alert(msg);
	}
}

function ImageLoad( theImageName, theOnSrc, theOffSrc) {
	if (document.images) {
	  eval(theImageName + "on = new Image()");
	  eval(theImageName + "off = new Image()");
	  eval(theImageName + "on.src = '" + theOnSrc + "'");
	  eval(theImageName + "off.src = '" + theOffSrc + "'");
	}
}
function ImageOn( theImageName) {
  if (document.images) {
    document.images[theImageName].src = eval(theImageName + "on.src");
  }
}
function ImageOff( theImageName) {
  if (document.images) {
    document.images[theImageName].src = eval(theImageName + "off.src");
  }
}



// MENU FUNCTIONS
// Nearly Pure CSS Drop-Down Menus
// By http://koivi.com/css-menus/
activateMenu = function(nav) {
	if(document.all && document.getElementById(nav).currentStyle){
		// only MSIE supports document.all
		var navroot = document.getElementById(nav);

		// Get all the list items within the menu
		var lis=navroot.getElementsByTagName("LI");
		for(i=0;i<lis.length;i++){
			// If the LI has another menu level
			if(lis[i].lastChild.tagName=="UL"){
				// assign the function to the LI
				lis[i].onmouseover=function(){
					// display the inner menu
					this.lastChild.style.display="block";
				}
				lis[i].onmouseout=function(){
					this.lastChild.style.display="none";
				}
			}
		}
	}
}

// FORM DEFAULT / CLEAR VALUES
// Allows for a form input field to display a default value that disappears when the field is
// clicked on. We use this in the search box.
var clearInputValue = Array();
function clearInput(thisObj) {
	if(!clearInputValue[thisObj]) {
		clearInputValue[thisObj] = thisObj.value;
		thisObj.value = "";
		thisObj.style.color = "black";
	}
}
function replaceInput(thisObj) {
	if(thisObj.value == "") {
		thisObj.value = clearInputValue[thisObj];
		thisObj.style.color = "#999999";
		clearInputValue[thisObj]= false;
	}
}