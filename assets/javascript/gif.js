var itemsToSearch = ["cat", "dog"];

function renderButtons() {
    $("#buttonView").empty();

    for (var i = 0; i < itemsToSearch.length; i++) {


        var a = $("<button>");

        $(a).attr("class", "gif");

        a.attr("data-term", itemsToSearch[i]);

        a.text(itemsToSearch[i]);

        $("#buttonView").append(a);
    }


$("#addGif").on("click", function(event) {


    event.preventDefault();

    var gif = $("#gif-input").val().trim();

    itemsToSearch.push(gif);

    renderButtons();
});
}
renderButtons();



$(document).on("click", ".gif", function() {
    var searchTerm = $(this).attr("data-term");

    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        searchTerm + "&api_key=dc6zaTOxFJmzC&limit=10";


    $.ajax({
            url: queryURL,
            method: "GET"
        })

        .done(function(response) {

            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var resultDiv = $("<div>");

                var p = $("<p>").text("Rating: " + results[i].rating);
                var resultImage = $("<img>");

                resultImage.attr("src", results[i].images.fixed_height_still.url);
                resultImage.attr("data-still", results[i].images.fixed_height_still.url);
                resultImage.attr("data-animate", results[i].images.fixed_height.url);
                resultImage.attr("data-state", "still");
                resultImage.addClass("image");

                resultDiv.append(p);
                resultDiv.append(resultImage);

                $("#gifs-appear-hear").prepend(resultDiv);

            }

        });

});


$(document).on("click", ".image", function() {

    var state = $(this).attr("data-state");


    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
            $(this).attr("data-state", "still");
    }
});


