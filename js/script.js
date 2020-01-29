// AIzaSyA7oumBxW3itETifVGLvRuReKMqUEx9YLU
// My You tube API key


$(document).ready(function(){
	var key='AIzaSyD3q1-z98HWe-xM3te-F6pwpfiYnqz4hbI';
	var playlistId='PL2fnLUTsNyq7A335zB_RpOzu7hEUcSJbB';
	var URL='GET https://www.googleapis.com/youtube/v3/playlistItems';

	var opitons={
		part: 'snippet',
		key: key,
		maxResult: 20,
		playlistId: playlistId
	}

	loadVids();

	function loadVids(){
		$.getJSON(URL,opitons,function(data){
			console.log(data);
			var id=data.items[0].snippet.resourceId.videoId;
			mainVid(id);
			resultsLoop(data);
		})
	}

	function mainVid(id){
		$('#vedio').html(`<iframe  class="showoff" 
			src="https://www.youtube.com/${id}" 
			frameborder="0" 
			allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
			allowfullscreen></iframe>`
		);
	}

	function resultsLoop(data){
		$.each(data.items, function(i,item){
			var thumb=item.snippet.thumbnails.medium.url;
			var title=item.snippet.tilte;
			var desc=item.snippet.description.substring(0,100);
			var vid=item.snippet.resourceId.videoId;

			$('main').append(`
				<article class="item" data-key="${vid}">
					<img src="${thumb}" class="thumb">
					<div class="details">
						<h4>${title}</h4>
						<p>${desc}</p>
					</div>
				</article>
			`);
		});
	}

	$('main').on('click','article',function(){
		var id=$(this).attr('data-key');
		mainVid(id);
	});
});