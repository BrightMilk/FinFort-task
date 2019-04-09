function getJSONData(path) {

    data = $.ajax({
        type: "POST",
        url: path,
        async: false,
        dataType: "json"
    }).responseJSON;

    return data;

}

function isCorrect(data) {

    try {

        if (!$.isPlainObject(data)) {
            throw new Error("Isn't an object!");
        }

        if ($.isEmptyObject(data)) {
            throw new Error("Empty object!");
        }

        return true;
    }
    catch(e) {
        alert("Error! " + e.message);
    }

}

function generateMarkup(data) {
    var elemTable = $("<table>").addClass("table table-striped table-dark");
    elemTable.append(addTableHeader(Object.keys(data[0])));
    $.each(data, function(key, value) {
        elemTable.append(addTableRow(value));
    });
    if ($(".table").length == 0) {
        $(".col").append(elemTable);
    }
}

function addTableHeader(header) {
    var thead = $("<thead>");
    var tr = $("<tr>");
    $.each(header, function(key, value) {
        tr.append("<th>" + value + "</th>");
    });
    return thead.append(tr);
}

function addTableRow(obj) {
    var row = $("<tr>");
    row.append("<td>" + obj.id + "</td>");
    row.append("<td>" + changeDateFormat(obj.date) + "</td>");
    row.append("<td>" + obj.title + "</td>");
    return row;
}

function changeDateFormat(date) {

    var newDate = new Date(date);
    var options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    };
    return newDate.toLocaleString("ru", options);

}

$(document).ready(function() {

    var url = "data.json";

    $(".btn-warning").on("click", function() {
       data = getJSONData(url);
       if (isCorrect(data)) {
            generateMarkup(data.items);
        }
    });

});