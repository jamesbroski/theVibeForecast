//city search click event to record the weather parameter in your city of choice

/////Videos is the URL ending
var youtubeVideos = [];
//Titles is the video title
var youtubeTitles = [];

  if (localStorage.getItem("video") && localStorage.getItem("titles") !== null) {
    renderButtons();
  }

    function renderButtons() {
    savedVideos = JSON.parse(localStorage.getItem("titles"));
    savedTitles = JSON.parse(localStorage.getItem("video"))
    // $("#history").empty();
    $(savedVideos).each(function (i) {
      var savedButton = $("<button>").text(savedVideos[i])
      // .addClass("cityBtn");
      $("#yourHistory").append(savedButton);
    })
  }

///getItem from both arrays
//set text of button to Title
//.on(click) $(buttonid) => attr(src, youtubeVideos)



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
        "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=summer_vibes_music&type=video&videoLicense=creativeCommon&videoEmbeddable=true&videoSyndicated=true&key=AIzaSyBB3WDQrRoAkRslg1MadqX2pb6lWaSJcHo";
    }
    if (
      localVibe == "Thunderstorm" ||
      localVibe == "Drizzle" ||
      localVibe == "Rain"
    ) {
      var youtubeSRC =
        "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=rainy_day_music&type=video&videoLicense=creativeCommon&videoEmbeddable=true&videoSyndicated=true&key=AIzaSyBB3WDQrRoAkRslg1MadqX2pb6lWaSJcHo";
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
      var youtubeTitle =data2.items[numberYt].snippet.title
      console.log(youtubeTag);
      $("#youtubePlayer").attr("src","https://www.youtube.com/embed/"+youtubeTag);

      if(youtubeVideos.indexOf(youtubeTag)<0) {
        youtubeVideos.push(youtubeTag)
      }


      if(youtubeTitles.indexOf(youtubeTitle)<0) {
        youtubeTitles.push(youtubeTitle)
      }

      localStorage.setItem("video",JSON.stringify(youtubeVideos))
      localStorage.setItem("titles",JSON.stringify(youtubeTitles))


      localStorage.setItem("video",JSON.stringify(youtubeVideos))

      return youtubeTag
    })





  });
});