//city search click event to record the weather parameter in your city of choice
var youtubeVideos = [];

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
    console.log(data);
    var localVibe = data.list[0].weather[0].main;
    //sets the link for youtube api pull based on if the weather is encouraging relaxing or encouraging excitement
    if (localVibe == "Clouds" || localVibe == "Clear" || localVibe == "Snow") {
      var youtubeSRC =
        "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=summer_vibes_music&type=video&videoLicense=creativeCommon&videoEmbeddable=true&videoSyndicated=true&key=AIzaSyCdlZo2lbxsoVE0a4K6d8pB2Z66ypZR_40";
    }
    if (
      localVibe == "Thunderstorm" ||
      localVibe == "Drizzle" ||
      localVibe == "Rain"
    ) {
      var youtubeSRC =
        "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=rainy_day_music&type=video&videoLicense=creativeCommon&videoEmbeddable=true&videoSyndicated=true&key=AIzaSyCdlZo2lbxsoVE0a4K6d8pB2Z66ypZR_40";
    }
    //return youtubeSRC external ajax call, which will generate api data to randomly pick you a video based on weather parameters
    $("#weatherCity").text(data.city.name)
    $("#weatherCondition").text(localVibe)
    $("#weatherTemp").text(data.list[0].main.temp+"°"+"F")
    $("#weatherDate").text(data.list[0].dt_txt)
    $("#weatherFeels").text("The temperature vibe feels like "+data.list[0].main.feels_like+" °"+"F")


    $.ajax({
      url: youtubeSRC,
      method: "GET",
    }).then(function(data2){
      console.log(data2);
      var numberYt= Math.floor(Math.random()*25)
      console.log(numberYt)
      var youtubeTag = data2.items[numberYt].id.videoId
      console.log(youtubeTag);
      $("#youtubePlayer").attr("src","https://www.youtube.com/embed/"+youtubeTag);

      if(youtubeVideos.indexOf(youtubeTag)<0) {
        youtubeVideos.push(youtubeTag)
      }


      localStorage.setItem("video",JSON.stringify(youtubeVideos))
      return youtubeTag
    })





  });
});