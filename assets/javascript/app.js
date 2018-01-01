//Array of Topics 

		var topics = ["Kendrick Lamar", "Jay Z", "J Cole", "Andre Benjamin", "Nas"];
		

		function renderButtons() {

			//prevent repeat buttons upon button push
			$("#buttons-view").empty(); 

       	// Loop through the array of movies, then generate buttons for each movie in the array
         
          for(var i = 0; i < topics.length; i++) {
          	//create buttons 
            var y = $("<button>");
            //add a class to images
            y.addClass("image");
            //add data attribute 
            y.attr("data-pic", topics[i]);
            //button text 
            y.text(topics[i]); 
            //add button to div
            $("#buttons-view").append(y); 
		  }
		}


	//Create function for user input 
	$("#add-gif").on("click", function(event) {
	event.preventDefault(); 

		//grab input from the textbox
		var giph = $("input").val().trim(); 

		//giph topic added to array
		topics.push(giph); 

		renderButtons(); 
	});
		

	function displayGIF() {

		//remove any previous gifs before adding new gifs 
		$('#gifs').empty(); 


		var giphName = $(this).attr("data-pic");

		var api_key = "dc6zaTOxFJmzC";  
		
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + giphName + "&api_key=" + api_key + "&limit=10";

 		$.ajax({
 			url: queryURL, 
 			method: "GET"

 		}).done(function(response) {

 			//Loop through the ten gifs 
 			for(var x = 0; x < response.data.length; x++) {

 				
			//retrieve the URL for images (still)
			var imgURL= response.data[x].images.downsized_still.url;

			//retrieve the URL for images(motion)
			var motionURL = response.data[x].images.downsized.url;

			var showGif = $('<img>');
			
			console.log(imgURL);


			showGif.attr('src', imgURL);
			showGif.addClass("giphy");
			showGif.attr("data-state", "still");
			showGif.attr("data-still", imgURL); 
			showGif.attr("data-motion", motionURL);
			
			//append image stills
			$('#gifs').append(showGif);

			//Grab rating info
			var rating = response.data[x].rating;

			console.log(rating);

			// create an element to display rating
			var info = $("<p>"); 

			info.text(rating); 
			
			
          	
          	// Displays the rating
   			$('#gifs').append
   			('Rating:' + rating);
			   

		
			
			} 
 		}) 
 	}


 	function playPauseGifs() {

 		var state = $(this).attr("data-state");
 		//check gifs data-state 
 		if(state === "still") {
 			$(this).attr("src", $(this).attr("data-motion"));
       		
       		$(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        
        $(this).attr("data-state", "still");
  }
}

 		
 		
 		



 			





 			

 			


	$(document).on("click", ".image", displayGIF); 
	 $(document).on("click", ".giphy", playPauseGifs);

	renderButtons();
