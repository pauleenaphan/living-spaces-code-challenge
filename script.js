function getTmrDate() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0]; // yyyy-mm-dd format
}

$.ajax({
    url: `https://api.tvmaze.com/schedule?country=US&date=${getTmrDate()}`,
    type: "GET",
    datetype: "json",
    success: function(response){
        let shows = []
        // Loops thru the first 24 responses then pushes those to shows arr
        let i = 0;
        while(shows.length < 24){
            // Checks if the show has an image
            if(response[i].show.image){
                shows.push(response[i].show);
            }
            i++;
        }
        loadTmrShows(shows);
    },
    error: function(error){
        console.error("Error getting shows", error);
    }
})

// Loads tmr shows 
function loadTmrShows(shows){
    // Adds each tmr shows img to container
    for(let i = 0; i < shows.length; i++){
        $(".tmrShowContainer").append(`<img src=${shows[i].image.medium} alt="${shows[i].name}">  </img>`)
    }
}
