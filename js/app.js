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
		$('.songplayer').height(350);
		$('.songplayer').html("<iframe src='https://embed.spotify.com/?uri=" + $(this).attr('id') + "' height='300' width='500'>");
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
	var result = "<div class='albumline'>" + album.name;
	result += "<div class='albumimage'> <img height='150' class='albumcover' album='" + album.name +"' id=" + album.id + " src='" + album.images[1].url + "'> </div> </div>";
	return result;
}

function albumClicked(album, id) {
	var tracks = "<p class='artisttitle'>" + artist + "</p>";
	tracks += "<p class='albumtitle'>" + album + "</p>";
	$('.tracklist').html(tracks);
	getTracks(id);
	
}

function showTracks(track) {
	var result = "<p class='tracknum'> <img class='playsong' src='images/play.svg' id=" + track.uri + ">" + track.track_number + " - <span class='songtitle'>" + track.name + "</span> </p>" 
	return result;
}