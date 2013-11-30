jQuery(document).ready( function($) 
{
	$("#nav > li").each(function () {
		var width = $(this).width(); // width of li
		
		var child_width = $(this).children("ul").width();
		
		if (child_width < width) $(this).children("ul").width(width);
	});
});
