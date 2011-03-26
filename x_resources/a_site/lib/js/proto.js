/*!
*
 * Notate - Web based note taking application v0.0.1 (alpha)
 * http://notate.liknaitzky.com/
 *
 * Copyright 2010, Bryan Reedy
 *
 */
    
$(document).ready (function () {
  
        $( ".controllable" ).draggable();
        $(".controllable").resizable();
        

        
        $(".button").click(function (e) {
            runPrototype(e);
        });
        
        function runPrototype(e) {
            var controllables = $(".controllable");
            var output = $("#prototype_output");
            $("<p/>", {text: "Prototyper Data"})
            output.empty();
            output.append($("<p/>", {text: "Prototyper Data"}));
            controllables.each(function (i) {
                var h = $(this).height(); 
                var w = $(this).width();
                var t = $(this).position().top;
                var l = $(this).position().left;
                output.append($("<h4/>", {text: $(this).attr("id")}));
                output.append($("<p/>", {html: "h: " + h + "<br/>w: " + w + "<br/>t: " + t + "<br/>l: " + l}));
            });
            $("#prototype_panel").append(output);
        }
        
// Popup Box
  // open on click
    $('span.popup_link').click (function (e) {
      var link = $(this).attr('name');
      //alert('Link with name: ' + link);
      var offset = 10;
        var mx = e.pageX-5;
        var my = e.pageY+5;
        var popup = $(".popup_box[name=" +link+ "]").clone();
        popup.css("position", "absolute");
        popup.css("top", my);
        popup.css("left", mx);
        popup.click(function () {
          popup.remove();
        });
        $(this).click(function () {
          popup.remove();
        });
        popup.removeClass("inv");
        $(this).parent().parent().append(popup);
        //createNote(mx,my,200,140, notetextDefault);
        /*assignDraggable();*/
    });
    
// SET TITLE
    function setTitle(note, text) {
        textLength = text.length;
        if (textLength > 18) {
            var title = text.substr(0, 18) + "...";
        }
        else {
            var title = text;
        }
        note.find("#title").text(title);
    }
    
// CREATE NOTE FUNCTION
    function createNote(mx, my, mw, mh, mv) {
        var newNote = $("#master").clone();
        newNote.attr('id', 'note_' + nCount);
        newNote.css('top', my);
        newNote.css('left', mx);
        newNote.find(".noteBody").css('width', mw);
        newNote.find(".noteBody").css('height', mh);
        newNote.find(".noteTextArea").text(mv);
        newNote.css('z-index', nTop);
        /* Close Control */
        newNote.children(".noteHeader").children("#noteControl").children("#close").click(function () {
            var note = $(this).parent().parent().parent();
            $("#debug").text("Note " + note.attr("id") + " should close.");
            if (closeWarning == 'true') {
                if (note.data("min") == true) {
                    /*note.children(".noteBody").animate({"height": note.data('min_pH')}, "slow");*/
                    note.children(".noteBody").css('height', note.data('min_pH'));
                }
                var newDialogMask = $("#dialogMask").clone();
                var closeDialog = $("#closeDialog");
                var newDialog = closeDialog.clone();
                var noteP = note.position();
                /* X calculation */
                var noteW = note.innerWidth();
                var dialogW = closeDialog.outerWidth();
                var dialogX = (noteW - dialogW)/2;
                /* Y calculation */
                var noteH = note.height();
                var dialogH = closeDialog.height();
                var dialogY = (noteH - dialogH)/2;
                /* Set x,y for newDialog */
                newDialog.css("left", dialogX);
                newDialog.css("top", '25px');
                
                /* OK function */
                var okButton = newDialog.children().children("[name='ok']");
                okButton.click( function () {
                    var note = $(this).parents(".note");
                    var mask = note.children("#dialogMask");
                    var dialog = note.children("#closeDialog");
                    var warning = dialog.find("#dialogWarning");
                    if (warning.is(':checked')) {
                        closeWarning = 'false';
                        localStorage['warning_f'] = closeWarning;
                    }
                    dialog.remove();
                    mask.remove();
                    note.remove();
                });
                /*Cancel function*/
                var cancelButton = newDialog.children().children("[name='cancel']");
                cancelButton.click( function () {
                    $("#debug").text("Cancel clicked.");
                    var note = $(this).parents(".note");
                    var mask = note.children("#dialogMask");
                    var dialog = note.children("#closeDialog");
                    dialog.remove();
                    mask.remove();
                    note.find(".ui-resizable-handle").removeClass("inv");
                        
                });
                newDialogMask.removeClass("inv");
                newDialog.removeClass("inv");
                note.children(".noteBody").children(".ui-resizable-handle").addClass("inv");
                note.append(newDialogMask);
                note.append(newDialog);
            }
            else {
                note.remove();
            }
        });
        /* Minimize Control */
        newNote.children(".noteHeader").children("#noteControl").children("#minimize").click(function () {
            var note = $(this).parent().parent().parent();
            var text = note.children('.noteBody');
            if (note.data("min") == false) {
                if (note.data('max') == false) {
                    note.data("min_pH", text.css("height"));
                }
                text.animate({"height": "0px"},'slow');
                note.data("min", true);
                text.resizable("destroy");
            }
            else {
                if (note.data('max') == false) {
                    text.animate({"height": note.data('min_pH')}, "slow");
                }
                else {
                    var border = note.outerWidth() - note.innerWidth();
                    var wW = $(window).width();
                    var wH = $(window).height() - note.children(".noteHeader").outerHeight() - $("#pageHeader").outerHeight() - border;
                    
                    text.animate({"height": wH}, "slow");
                }
                note.data("min", false);
                text.resizable({ 
                    minHeight: 125,
                    minWidth: 200,
                    disabled: false
                });
                text.children('.noteTextArea').focus();
            }
        });
        /* Maximize Control */
        newNote.children(".noteHeader").children("#noteControl").children("#maximize").click(function () {
            var note = $(this).parent().parent().parent();
            var noteBody = note.children(".noteBody");
            if (note.data('max') == true) {
                note.css({
                    'top': note.data('pY'),
                    'left': note.data('pX')
                });
                noteBody.css({
                    'width': note.data('pW'),
                    'height': note.data('max_pH')
                });
                note.data('max', false);
                
                if (note.data('max_pH') != '0px') {
                    noteBody.resizable({ 
                        minHeight: 125,
                        minWidth: 200,
                    });
                    note.data("min", false);
                    noteBody.children('.noteTextArea').focus();
                }
                else {
                    note.data("min", true);
                }
                note.draggable({ containment: 'parent'});
                
            }
            else {
                note.data('max_pH', noteBody.css("height"));
                note.data('pW', noteBody.css("width"));
                note.data('pX', note.css("left"));
                note.data('pY', note.css("top"));
                
                
                var border = note.outerWidth() - note.innerWidth();
                $("#debug").text("Note Height: " + note.children(".noteHeader").height() + "Note Inner Height: " + note.children(".noteHeader").innerHeight() + "Note Outer Height: " + note.children(".noteHeader").outerHeight());
                var wW = $(window).width();
                var wH = $(window).height() - note.children(".noteHeader").outerHeight() - $("#pageHeader").outerHeight() - border;
                
            
                note.css({
                    'top': '0px',
                    'left': '0px'
                });
                noteBody.css({
                    'width': wW-border,
                    'height': wH
                });
            /*    noteBody.animate({
                    width: wW,
                    height: wH,
                    },'slow');*/
                note.data('max', true);
                note.data('min', false);
                noteBody.resizable("destroy");
                note.draggable("destroy");
                noteBody.children('.noteTextArea').focus();
            }
        });
        /* Assign Focus */
        newNote.mousedown(function(){
            if ($(this).css("z-index") < nTop-1) {
                $(this).css("z-index", nTop);
                nTop ++;
                if (nTop > nMax) {
                    resetNoteOrder();
                }
            }
            
        });
        newNoteTextArea = newNote.find(".noteTextArea");
        newNoteTextArea.attr('id', 'noteTextArea_' + nCount);
        newNoteTextArea.focus(function(){  
            if($(this).attr("value") == notetextDefault) $(this).attr("value", ""); 
        });
        newNoteTextArea.blur(function () {
            if ($(this).attr("value") == "") {
                $(this).attr("value", notetextDefault);
            }
            else {
                var text = $(this).attr("value");
                var note = $(this).parents(".note");
                setTitle(note, text);
            }
        });
        newNote.data("min", false);
        newNote.data("max", false);
        if (mv == notetextDefault) {
            setTitle(newNote, 'Note ' + (nCount + 1));
        }
        else {
            setTitle(newNote, mv);
        }
        newNote.appendTo("#pageBody");
        newNote.children(".noteBody").resizable({ 
            minHeight: 125,
            minWidth: 200,
            disabled: false
        });
        nCount++;
        nTop++;
        newNote.draggable({ containment: 'parent'});
        newNoteTextArea.focus();
    }
    
    $(window).unload( function () {
    if (persistence == 'true') {
        var notes=[];
        $(".note").each(function (i) {
            //
            var note = $(this)
            var pos = note.position();
            if (note.data('max') == true) {
                var x = note.data("pX");
                var y = note.data("pY");
                var h = note.data("max_pH");
                var w = note.data("pW");
            }
            else {
                var x = pos.left;
                var y = pos.top;
                if (note.data('min') == true) {
                    var h = note.data("min_pH");
                }
                else {
                    var h = note.find(".noteBody").css("height");
                }
                var w = note.find(".noteBody").css("width");    
            } 
            var t = note.find('.noteTextArea').val();
            var id = note.attr("id");
            //alert(id);
            if (id != "master" && id != null) {
            //alert(id);
                notes[i] = new Array (6);
                notes[i][0] = id;
                notes[i][1] = x;
                notes[i][2] = y;
                notes[i][3] = w;
                notes[i][4] = h;
                notes[i][5] = t;
            }
        });
        
        //alert(notes.length);
        
            localStorage['storedNotes']=JSON.stringify(notes);
        }
            // Get them back out
            //var storedNames=JSON.parse(localStorage['names']);
        
    });
    function resetNoteOrder() {
        
    }

    
});

// COOKIE SETTER/GETTER/CHECKER
    function checkCookie() {
        //alert("checkCookie");
        persistence=getCookie('persistence');
        if (persistence!=null && persistence!="") {
            //alert('Persistence set to:  ' + persistence);
        }
        else {
            setCookie('persistence','true',365);
          }
    }
        function getCookie(c_name)
{
    //alert("getCookie: " + document.cookie.length);
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(c_name + "=");
  if (c_start!=-1)
    {
    c_start=c_start + c_name.length+1;
    c_end=document.cookie.indexOf(";",c_start);
    if (c_end==-1) c_end=document.cookie.length;
    return unescape(document.cookie.substring(c_start,c_end));
    }
  }
return "";
}

function setCookie(c_name,value,expiredays) {
    //alert("setCookie");
    var exdate=new Date();
    exdate.setDate(exdate.getDate()+expiredays);
    document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toUTCString());
}

