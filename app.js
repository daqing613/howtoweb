$(document).ready(function() {
	// Get client IP address on page load
	$.getJSON("https://api.ipify.org?format=json", function(data) {
		var ipAddress = data.ip;
		getLocationDetails(ipAddress);
	});

	// Handle form submission
	$("#search-form").submit(function(event) {
		event.preventDefault();
		var ipAddress = $("#search-input").val();
		getLocationDetails(ipAddress);
	});

	function getLocationDetails(ipAddress) {
		$.getJSON("https://ipapi.co/" + ipAddress + "/json/", function(data) {
			// Display search results
			$("#search-results").show();
			$("#search-results-body").empty();
			$("#search-results-body").append("<tr><td>" + data.ip + "</td><td>" + data.country_name + "</td><td>" + data.region + "</td><td>" + data.city + "</td><td>" + data.org + "</td><td>" + data.latitude + "</td><td>" + data.longitude + "</td></tr>");
			// Save search history to local storage
			var history = JSON.parse(localStorage.getItem("history")) || [];
			history.push(data);
			localStorage.setItem("history", JSON.stringify(history));
			// Display search history
			$("#search-history-body").empty();
			for (var i = 0; i < history.length; i++) {
				$("#search-history-body").append("<tr><td>" + history[i].ip + "</td><td>" + history[i].country_name + "</td><td>" + history[i].region + "</td><td>" + history[i].city + "</td><td>" + history[i].org + "</td><td>" + history[i].latitude + "</td><td>" + history[i].longitude + "</td></tr>");
			}
		}).fail(function() {
			alert("Invalid IP address. Please try again.");
		});
	}

	// Load search history from local storage on page load
	var history = JSON.parse(localStorage.getItem("history")) || [];
	$("#search-history-body").empty();
	for (var i = 0; i < history.length; i++) {
		$("#search-history-body").append("<tr><td>" + history[i].ip + "</td><td>" + history[i].country_name + "</td><td>" + history[i].region + "</td><td>" + history[i].city + "</td><td>" + history[i].org + "</td><td>" + history[i].latitude + "</td><td>" + history[i].longitude + "</td></tr>");
	}
});
