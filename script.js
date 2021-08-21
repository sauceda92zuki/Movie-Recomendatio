
$(function(){
	getResponce()
})

$("#button-search").click(function(){
	getResponce()
})

const getResponce=()=>{
	const category = $("#ddn-category :selected").val();
	const country = $("#ddn-country :selected").val();
	const service = $("#ddn-stream :selected").val();
	
	fetch(`https://streaming-availability.p.rapidapi.com/search/basic?country=${country}&service=${service}&type=movie&genre=${category}&page=1&language=en`, {
		"method": "GET",
		"headers": {
			"x-rapidapi-key": "8a4020d265msh42cabf6254ba581p114934jsne620a89acddd",
			"x-rapidapi-host": "streaming-availability.p.rapidapi.com"
		}
	})
	.then(response => response.json())
	.then((data)=>{
		console.log(data)
		appendResponse(data.results);

	})
	.catch(err => {
		console.error(err);
	});
	
}

const appendResponse=(data)=>{
	const ranking = $("#ddn-ranking :selected").val();
	
	let markup;
	if($('#movie-container').has('div').length>0){
		$('#movie-container').empty();
	};
	console.log(sortDataByRanking(data,ranking));

	sortDataByRanking(data,ranking).map(movie=>{
		const {title,overview,imdbVoteCount,year,imdbRating}=movie;
		const url = movie.posterURLs[154];
		markup= buildMarkup(url,title,overview,imdbVoteCount,imdbRating/10,year);
	$('#movie-container').append(markup);
	})
}

const sortDataByRanking=(data,ranking)=>{
	let sortedData=[];
	data.map(movie=>{
		if(movie.imdbRating/10>=ranking){
			sortedData.push(movie);
		}
	})
	return sortedData
}

const buildMarkup=(url,title,overview,votes,rating,year)=>{
	return `<div class="movie-card">
	<div class="columns">
	  <div class="column is-one-quarter">
		<img style="display: block;" class="mx-auto" src=${url} alt="">
	  </div>
	  <div class="column is-four-fifth">
		<h3 class="sub-heading1 mb-2">${title}</h3>
		<p class="text-long">${overview}</p>
		  <div class="columns">
			<div class="column is-one-fifth">
				<h3 class="sub-heading2 mt-3">Year: <span>${year}</span></h3>
			</div>
			<div class="column is-one-fifth">
			  <h3 class="sub-heading2 mt-3">Rating: <span>${rating}/10</span></h3>
			</div>
			<div class="column is-one-fifth">
			  <h3 class="sub-heading2 mt-3">Votes: <span>${votes}</span></h3>
			</div>
		  </div>
	  </div>
	</div>
  </div>`
}