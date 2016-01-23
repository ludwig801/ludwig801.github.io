var screenWidth, screenHeight;

$(document).ready(function () {
    UpdateDimensions();

    var tabs = $("#tabs").find("nav").find("ul").children("li");
    var links = $("section").find("a");

    for (var i = 0; i < links.length; i++) {
        var link = $(links[i]);
        link.on("click", function () {
            var href = $(this).attr("href");
            if (href[0] == '#') {
                var title = $(this).attr("title");
                GoTo(tabs, href, title);
            }
        });
    }
});

function GoTo(tabs, nextID, nextTitle) {
    var currentID;
    var nextTab;

    for (var i = 0; i < tabs.length; i++) {
        var tab = $(tabs[i]);
        if (tab.hasClass("active")) {
            tab.removeClass("active");
            currentID = tab.find("a").attr("href");
        }
        else if (tab.find("a").attr("href") == nextID) {
            tab.addClass("active");
        }
    }

    UpdateDimensions();
    var currentSection = $(currentID);
    var nextSection = $(nextID);
    var currenTabDescr = $("#current-tab");
    var timeout = 250;

    currentSection.fadeOut(timeout);
    setTimeout(function () {
        currentSection.removeClass("active");
        currentSection.addClass("hidden");
        nextSection.fadeIn(timeout);
        nextSection.addClass("active");
        nextSection.removeClass("hidden");
        currenTabDescr.html(nextTitle);
    }, timeout);
}

function UpdateDimensions() {
    screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
}