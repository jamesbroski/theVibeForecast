//city search click event to record the weather parameter in your city of choice

$("#citySearchBtn").on("click", function () {
  event.preventDefault();
  var city = $("#cityInput").val();
  var searchURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&units=imperial&cnt=40&appid=d5da65a1b7938f90d55e1d6961ade256";
  $.ajax({
    url: searchURL,
    method: "GET",
  }).then(function (data) {
    console.log(data.list[0].weather[0].main);
    var localVibe = data.list[0].weather[0].main;
    //sets the link for youtube api pull based on if the weather is encouraging relaxing or encouraging excitement
    if (localVibe == "Clouds" || localVibe == "Clear" || localVibe == "Snow") {
      var youtubeSRC =
        "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=summer_day_vibes_mix&key=AIzaSyCdlZo2lbxsoVE0a4K6d8pB2Z66ypZR_40";
    }
    if (
      localVibe == "Thunderstorm" ||
      localVibe == "Drizzle" ||
      localVibe == "Rain"
    ) {
      var youtubeSRC =
        "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=chill_day_vibes_mix&key=AIzaSyCdlZo2lbxsoVE0a4K6d8pB2Z66ypZR_40";
    }
    //return youtubeSRC external ajax call, which will generate api data to randomly pick you a video based on weather parameters
  });
});
