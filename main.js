const Home  = {
	data: function() {
	     return  {
	       message: 'Top Shit News'
	     }
    },
    mounted: function() {
    	var r = confirm("Press a button!");
		if (r == true) {
		  readTextFile("test.txt");
		} else {
		  alert("You pressed Cancel!");
		}
    	function readTextFile(file)
		{
		    var rawFile = new XMLHttpRequest();
		    rawFile.open("GET", file, false);
		    rawFile.onreadystatechange = function ()
		    {
		        if(rawFile.readyState === 4)
		        {
		            if(rawFile.status === 200 || rawFile.status == 0)
		            {
		                var allText = rawFile.responseText;
		                consoloe.log(allText)
		            }
		        }
		    }
		    rawFile.send(null);
		}	
    },
  template: `<div id="homeController" class="container content">
	<h3 class="hot-new-title"> {{message}} </h3>
	<div class="row">
		<div class="col-md-5 hot-news-wrapper">
			<img class="hot-news" src="test.jpg" alt="">
		</div>
		<div class="col-md-7 hot-news-inshort">
			<h3 class="mt-4 mb-3" style="font-size: 30px">News Title</h3>
			<span style="font-weight: 600">Author-Date-Blabla</span>
			<p class="mt-5">Porn makes up most of the Internet. It's everywhere. Trying Googling anything with Safe Search off and you won't make it very far without stumbling upon a whole world of porn. Naturally some people were ahead of the curve and build an empire around this porn. These men, chuck full of ingenuity and testosterone, created Pornhub.

But there's much much more to the site than meets the eye. Did you know that Pornhub funds cancer research? Or that they plan to send porn stars to space? Or that the founder sold the company in 2010 and it's now part of the largest porn empire in existence? How about that women make up 24% of the traffic on average? Or that viewership falls on nearly every major holiday? 

There's so much to learn about the Pornhub company and the insights into the human psyche they've uncovered by tracking our traffic over the years. These are the things you didn't know about Pornhub.</p>
		</div>
	</div>
	<div class="more-new-title-wrap"><h5 class="more-new-title">Some more shit news</h5></div>
	<div class="list-news">
		<div class="row mb-5">
			<div class="col-md-3">
				<img src="https://demo.tagdiv.com/newspaper/wp-content/uploads/2015/04/snowboard-218x150.jpg" alt="">
			</div>
			<div class="col-md-8">
				<h4>Title</h4>
				<span style="font-weight: 700; font-size: 12px">Author-Date-Blabla</span>
				<p class="mt-3">Calvin Klein known for launching the careers of such svelte models as Brooke Shields and Kate Moss to cast a model who deviates from the...</p>
			</div>
		</div>
	</div>
	<div class="row mb-5">
		<div class="col-md-3">
			<img src="https://demo.tagdiv.com/newspaper/wp-content/uploads/2015/04/snowboard-218x150.jpg" alt="">
		</div>
		<div class="col-md-8">
			<h4>Title</h4>
			<span style="font-weight: 700; font-size: 12px">Author-Date-Blabla</span>
			<p class="mt-3">Calvin Klein known for launching the careers of such svelte models as Brooke Shields and Kate Moss to cast a model who deviates from the...</p>
		</div>
	</div>
	<div class="row mb-5">
		<div class="col-md-3">
			<img src="https://demo.tagdiv.com/newspaper/wp-content/uploads/2015/04/snowboard-218x150.jpg" alt="">
		</div>
		<div class="col-md-8">
			<h4>Title</h4>
			<span style="font-weight: 700; font-size: 12px">Author-Date-Blabla</span>
			<p class="mt-3">Calvin Klein known for launching the careers of such svelte models as Brooke Shields and Kate Moss to cast a model who deviates from the...</p>
		</div>
	</div>	
</div>`,
}

const News = {
  template: `<div class="container mt-3">
		<div class="row">
			<div class="col-sm-12 col-md-8">
				<h1>WordPress News Magazine Charts the Most Fashionable New York Women</h1>
				<p>By <strong>Thong</strong> - <span>17/1/1112</span></p>
			</div>
		</div>

		<div class="row mt-3">
			<div class="col-sm-12 col-md-8">
				<div class="des mb-3">Bộ Ngoại giao cho rằng Thủ tướng Lý Hiển Long không phản ánh khách quan lịch sử khi phát biểu Việt Nam "xâm lược" Campuchia.</div>
				<p>Trong bài viết trên Facebook hôm 31/5 nhằm chia buồn việc cựu thủ tướng Thái Lan Prem Tinsulanonda qua đời, Thủ tướng Singapore Lý Hiển Long có những phát biểu đề cập tới mối quan hệ giữa Việt Nam với Campuchia và ASEAN trong thập niên 1980.</p>
				<p>Trong bài viết trên Facebook hôm 31/5 nhằm chia buồn việc cựu thủ tướng Thái Lan Prem Tinsulanonda qua đời, Thủ tướng Singapore Lý Hiển Long có những phát biểu đề cập tới mối quan hệ giữa Việt Nam với Campuchia và ASEAN trong thập niên 1980.</p>
				<p>Trong bài viết trên Facebook hôm 31/5 nhằm chia buồn việc cựu thủ tướng Thái Lan Prem Tinsulanonda qua đời, Thủ tướng Singapore Lý Hiển Long có những phát biểu đề cập tới mối quan hệ giữa Việt Nam với Campuchia và ASEAN trong thập niên 1980.</p>
				<p>Trong bài viết trên Facebook hôm 31/5 nhằm chia buồn việc cựu thủ tướng Thái Lan Prem Tinsulanonda qua đời, Thủ tướng Singapore Lý Hiển Long có những phát biểu đề cập tới mối quan hệ giữa Việt Nam với Campuchia và ASEAN trong thập niên 1980.</p>
				<p>Trong bài viết trên Facebook hôm 31/5 nhằm chia buồn việc cựu thủ tướng Thái Lan Prem Tinsulanonda qua đời, Thủ tướng Singapore Lý Hiển Long có những phát biểu đề cập tới mối quan hệ giữa Việt Nam với Campuchia và ASEAN trong thập niên 1980.</p>
			</div>
			<div class="col-sm-12 col-md-4">
				<h4 class="random-news">Random News</h4>
				<div class="mb-4 random-news-line"></div>

				<div class="row mb-3">
					<div class="col-4">
						<a href="">
							<img src="https://i.kym-cdn.com/entries/icons/original/000/000/091/TrollFace.jpg" width="100%">
						</a>
					</div>
					<div class="col-8 content">
						<a class="random-news-title" href="#">Lý Hiển Long có những phát 5 nhằm chia buồn việ 5 nhằm chia buồn việ</a>
						<span>12/21/2222</span>
					</div>
				</div>
				<div class="row mb-3">
					<div class="col-4">
						<a href="">
							<img src="https://i.kym-cdn.com/entries/icons/original/000/000/091/TrollFace.jpg" width="100%">
						</a>
					</div>
					<div class="col-8 content">
						<a class="random-news-title" href="#">Lý Hiển Long có những phát 5 nhằm chia buồn việ 5 nhằm chia buồn việ</a>
						<span>12/21/2222</span>
					</div>
				</div>
				<div class="row mb-3">
					<div class="col-4">
						<a href="">
							<img src="https://i.kym-cdn.com/entries/icons/original/000/000/091/TrollFace.jpg" width="100%">
						</a>
					</div>
					<div class="col-8 content">
						<a class="random-news-title" href="#">Lý Hiển Long có những phát 5 nhằm chia buồn việ 5 nhằm chia buồn việ</a>
						<span>12/21/2222</span>
					</div>
				</div>
			</div>

		</div>
	</div>`
}

const Create {
	template: `
	
	`
}

const router = new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/news', component: News },
  ]
})

new Vue({
  router
}).$mount('#app')

