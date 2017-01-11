"use strict";
console.log("scoreboard loaded");

var DEFAULTSHEETID = '18qPsgedpcgEZjwNhp9EVqXLvSergBGrnrf8T6m9umEY'; 
var sstActiveSheetId = DEFAULTSHEETID; 

function scoreboardInit()
{
    var divBouldering = $("#divBouldering");

    if (divBouldering.length == 0) {
        console.log("can't locate divBouldering");
        return;
    }

    $("head")
        .append($('<style></style>')
        .load("/scoreboard/sst.css"));


    divBouldering
	.before($('<div id="sst-partialHTML" style="display:none;">')
	.load("/scoreboard/partialHTMLforSimpleScoring.html"));

    var contentArea = $('div.contentarea.content-container');
    contentArea.after($('<center><div id="divSheets" style="margin:5px 10px;display:none;"><iframe style="width: 100%; height: 700px;"></iframe></div>' +
        '<div id="sst-eventid-div">Event Id: <span id="sst-eventid-span"></span></div ><center>'));
	changeIframeSrc(DEFAULTSHEETID);

	setTimeout(waitForBoulderingTab, 1000);

	return;
}

function waitForBoulderingTab() {
    var divBouldering = $("#divBouldering");
    var divSheets = $("#divSheets");
    var divSST = $("#sst-partialHTML");

    if (divBouldering.length==0 || divSheets.length==0 || divSST.length==0) {
        console.log("Error: can't locate divBouldering or divSheets!");
        return;
    }

    if (divBouldering.attr('class') != 'tab-body active') {
        console.log("bouldering tab not enabled");
        //unforunately we have to poll until boudering tab is loaded. No real convenient way to get an div/onload event
        setTimeout(waitForBoulderingTab, 1000);
        return;
    }

	ScoringView(0);

    divSST.show(); //weird ScoringView doesn't work on this?
}

function changeIframeSrc(newSheetID) {
    var sstPREFIX_GOOGLESHEET_URL = "https://docs.google.com/spreadsheets/d/";
    var sstSUFFIX_GOOGLESHEET_URL = "/edit";

    $('#divSheets iframe').attr('src', sstPREFIX_GOOGLESHEET_URL + newSheetID + sstSUFFIX_GOOGLESHEET_URL);
}

function ScoringView(id) {
    console.log(id);
    switch(id) {
    case 1:
		$("#divBouldering").show();
		$('#pagetitle').show();
		$('#divIntro').show();
        $('div.footer-wrapper').show();
        $(".sst-controls").hide();
		$(".sst-round-category-selection").hide();
		$("#divSheets").hide();
		break;
    case 0:
		$("#divBouldering").hide();
		$('#pagetitle').hide();
		$('#divIntro').hide();
        $('div.footer-wrapper').hide();
        $(".sst-controls").show();
		$(".sst-round-category-selection").show();
		$("#divSheets").show();
		break;
    }
    $("#sst-eventid-span").text($("#divEvent #divTabHeaders").attr("data-eventid"));
}

if (window.attachEvent) {
    window.attachEvent('onload', scoreboardInit);
} else if (window.addEventListener) {
    window.addEventListener('load', scoreboardInit, false);
} else {
    document.addEventListener('load', scoreboardInit, false);
}

