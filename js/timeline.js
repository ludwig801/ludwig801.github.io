$(document).ready(function () {
    PlaceTimespans();
});

function PlaceTimespans() {
    var $timeline = $("timeline");
    $timeline.addClass("graphic");

    var mBegin = parseInt($timeline.attr("begin"));
    var mEnd = parseInt($timeline.attr("end"));
    var $entries = $($timeline.find("timeline-entry"));

    $entries.each(function (index) {
        CreateTimespanGraphic($entries, $($entries[index]), mBegin, mEnd);
    });
}

function CreateTimespanGraphic($entries, $entry, mBegin, mEnd) {
    var $target = GetTarget($entry);

    if ($target == undefined) {
        console.error("Timeline-entry target is undefined!");
        return false;
    }

    $target.find("span").css("display", "none");

    // Add Hover/Click Behaviour
    $entry.on("click", function () { OnClick($entries, $entry, $target) });
    $target.on("click", function () { OnClick($entries, $entry, $target) });

    $entry.on("mouseover", function () { OnMouseOver($entry, $target) });
    $target.on("mouseover", function () { OnMouseOver($entry, $target) });

    $entry.on("mouseleave", function () { OnMouseLeave($entry, $target) });
    $target.on("mouseleave", function () { OnMouseLeave($entry, $target) });

    // Add Bar Graphic
    var timespanData = ParseTimespan($entry, mBegin, mEnd);

    if (!timespanData.valid)
        return false;

    var $timespanGraphic = $(document.createElement("span"));
    $timespanGraphic.addClass("timespan");
    $timespanGraphic.addClass("graphic");
    $timespanGraphic.css("margin-left", timespanData.beginPerc + "%");
    $timespanGraphic.css("margin-right", (100 - timespanData.endPerc) + "%");
    $entry.append($timespanGraphic);

    // Add Tags
    var $tagLeft = $(document.createElement("span"));
    $tagLeft.attr("class", "tag tag-left");
    $tagLeft.html(timespanData.begin);

    $timespanGraphic.append($tagLeft);

    if (timespanData.end == timespanData.begin)
        return;

    var $tagRight = $(document.createElement("span"));
    $tagRight.attr("class", "tag tag-right");
    $tagRight.html(timespanData.end);

    $timespanGraphic.append($tagRight);
}

function ParseTimespan($entry, mBegin, mEnd) {
    var timespan = {};
    timespan.valid = true;

    var beginStr = $entry.attr("begin");
    var endStr = $entry.attr("end");

    if (beginStr == undefined || beginStr.length == 0) {
        console.error("Timelapse: begin is undefined.");
        timespan.valid = false;
    } else {
        timespan.begin = parseInt(beginStr);
        timespan.beginPerc = (timespan.begin - mBegin) / (mEnd - mBegin) * 100;

        if (endStr == undefined || endStr.length == 0) {
            console.log("Timelapse: end is undefined.");
            timespan.end = timespan.begin;
        } else {
            timespan.end = parseInt(endStr);
        }

        timespan.endPerc = Math.min(100, (timespan.end + 0.5 - mBegin) / (mEnd - mBegin) * 100);
    }

    timespan.delta = (timespan.begin - timespan.end);

    return timespan;
}

function OnClick($others, $base, $target) {
    $base.toggleClass("click");
    $target.toggleClass("click");
    $others.each(function (i) {
        var $elem = $($others[i]);
        var $target = GetTarget($elem);
        
        if($base[0] != $elem[0] && $target != undefined) {
            OnMouseLeave($elem, $target);
        }
    });
}

function OnMouseOver($base, $target) {
    $base.addClass("hover");
    $base.addClass("click");
    $target.addClass("hover");
    $target.addClass("click");
}

function OnMouseLeave($base, $target) {
    $base.removeClass("hover");
    $base.removeClass("click");
    $target.removeClass("hover");
    $target.removeClass("click");
}

function GetTarget($obj) {
    var $target = $($($obj.attr("target"))[0]);
    return $target;
}