var artist = '';

$(function () {

	$('#artist-search').submit(function(event) {
		event.preventDefault();
		$('.results').html('');
		artist = $('#query').val();
		getRequest(artist);
	});

	$('body').on('click', '.albumcover', function() {
		var thealbum = $(this).attr('album');
		var albumid = $(this).attr('id');
		albumClicked(thealbum, albumid);	
	});

	$('body').on('click', '.playsong', function() {
		$('.songplayer').html("<iframe src='https://embed.spotify.com/?uri=" + $(this).attr('id') + "' height='420' width='315'>");
	});
	
})

function getRequest(artist) {
	var query = "artist:'"+artist+"'";
	console.log(query);

	$.ajax({
		url: "https://api.spotify.com/v1/search",
		data: {
			q: query,
			type: 'album',
			market: 'US'
		},

	})
	.done(function(result) {
		$.each(result.albums.items, function (i, item) {
			var album = showAlbum(item);
			$('.results').append(album);
		})
	})
}

function getTracks(albumid) {
	$.ajax({
		url: "https://api.spotify.com/v1/albums/" + albumid + "/tracks"
	})
	.done(function(result) {
		$.each(result.items, function (i, item) {
			var trackind = showTracks(item);
			$('.tracklist').append(trackind);
		})
	})
	
}

function showAlbum(album) {
	var result = "<p> Album: " + album.name + "</p>";
	result += "<p> <img class='albumcover' album='" + album.name +"' id=" + album.id + " src='" + album.images[1].url + "'> </p>";
	return result;
}

function albumClicked(album, id) {
	var tracks = "<p>" + artist + "</p>";
	tracks += "<p> Track List for " + album + "</p>";
	$('.tracklist').html(tracks);
	getTracks(id);
	
}

function showTracks(track) {
	var result = "<p> <img class='playsong' src='images/play.svg' id=" + track.uri + "> Track " + track.track_number + ": <a href='" + track.external_urls.spotify + "'>" + track.name + "</a> </p>" 
	return result;
}