Vue.component('paginate', VuejsPaginate)

const Home  = {
	data: function() {
		 return  {
			message: 'Top Shit News',
			allNews: [],
			listNews: [],
			hotNews: [],
			pageCount: 0,
			pageNum: 1,
			perPage: 10,
			lnStyle: false,
			opDisplay: false,
			iScroll: false,
		 }
    },
    methods: {
	    clickCallback: function(pageNum) {
	      this.pageNum = pageNum;
	    },
	    scrollChange: function() {
	      this.iScroll = !this.iScroll;
	      setTimeout(function(){ location.reload(); }, 300);
	    },
	    loadData() {      	
		    window.onscroll = () => {
		    	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
				    document.getElementById("myBtn").style.display = "block";
				  } else {
				    document.getElementById("myBtn").style.display = "none";
				  }
		      let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight + 600 >= document.documentElement.offsetHeight;
		      if (bottomOfWindow) {
		        this.pageNum++;
		      }
		    }
		}
	},
    watch: {
	    lnStyle: function() {
	    	localStorage.setItem("lnStyle", this.lnStyle);
	    },
	    opDisplay: function() {
	    	localStorage.setItem("opDisplay", this.opDisplay);
	    },
	    iScroll: function() {
	    	localStorage.setItem("iScroll", this.iScroll);
	    },
	    pageNum: function() {
	    	if (this.iScroll==false) {
	    		this.listNews = [];
	    	}
	    	for (i=(this.pageNum-1)*this.perPage; i<this.pageNum*this.perPage; i++) {
	    		if (this.allNews.length == i) {	    			
	    			break;
	    		}
				this.listNews.push(this.allNews[i]);
  			}
	    }
	},
    created: function () {
    	document.getElementsByClassName("loader-wrap")[0].style.display = "block";
  		document.getElementsByClassName("loader")[0].style.display = "block";
		this.lnStyle = localStorage.getItem("lnStyle");
	    this.lnStyle = (this.lnStyle == 'true');
	    this.opDisplay = localStorage.getItem("opDisplay");
	    this.opDisplay = (this.opDisplay == 'true');
	    this.iScroll = localStorage.getItem("iScroll");
	    this.iScroll = (this.iScroll == 'true');
	},
    mounted: function() {
   		axios
	      .get('https://1-dot-crawl-article96.appspot.com/posts')
	      .then(response => {
	      		this.allNews = response.data;
	      		this.hotNews = this.allNews.pop();
      			for (i=(this.pageNum-1)*this.perPage; i<this.pageNum*this.perPage; i++) {
  					this.listNews.push(this.allNews[i])
      			}		      	
		      	this.pageCount = Math.ceil((this.allNews.length)/this.perPage);
		      	if (this.iScroll==true) {
	      			this.loadData();
		      	}		      	
	      	}).finally(function() {
	      		document.getElementsByClassName("loader-wrap")[0].style.display = "none";
	      		document.getElementsByClassName("loader")[0].style.display = "none";
	      	})
    },
  template: `<div id="homeController" class="container content">
  	<div id="customize" class="customize" v-bind:class="opDisplay==true ? 'hide-customize' : '' ">
        <h6 class="mb-4">Select an option</h6>
        <button v-on:click="lnStyle=!lnStyle">News display style 
        	<span v-if="lnStyle==true" style="background: #42c2f4">ON</span>
        	<span v-else>Off</span>
        </button>
        <button v-on:click="scrollChange">Infinity scroll
        	<span v-if="iScroll==true" style="background: #42c2f4">ON</span>
        	<span v-else>Off</span>
        </button>
        <button v-on:click="opDisplay=!opDisplay">Hide options
        	<span v-if="opDisplay==true" style="background: #42c2f4">ON</span>
        	<span v-else>Off</span>
        </button>
    </div>
	<h3 class="hot-new-title"> {{message}} </h3>
	<div class="row">
		<div class="col-md-5 hot-news-wrapper">
			<router-link :to="{ name: 'post', params: { post: hotNews.link }}"><img class="hot-news" :src="hotNews.image" alt="error cmnr"></router-link>
		</div>
		<div class="col-md-7 hot-news-inshort">
			<router-link style="color: #000" :to="{ name: 'post', params: { post: hotNews.link }}">
				<h3 class="mt-2 mb-2" style="font-size: 30px">{{hotNews.title}}</h3>
				<span style="font-weight: 600">{{hotNews.author}}</span>
				<p class="mt-3">{{hotNews.description}}</p>
			</router-link
		</div>
	</div>
	<div class="more-new-title-wrap"><h5 class="more-new-title">Some more shit news</h5></div>
	<div class="list-news">
		<div v-for="item in listNews" style="transition: all 0.5s" class="ln-row mb-5"
		 v-bind:class="lnStyle==true ? 'ln-row-type2' : 'row' " v-bind:style="lnStyle==true ? 'padding-left: 30px' : '' ">
			<div class="col-md-4">
				<router-link :to="{ name: 'post', params: { post: item.link }}"><img :src="item.image" alt="error cmnr"></router-link>
			</div>
			<div class="col-md-8">
				<router-link style="color: #000" :to="{ name: 'post', params: { post: item.link }}">
					<h5 class="mt-3">{{item.title}}</h5>
					<span style="font-weight: 700; font-size: 12px">{{item.author}}</span>
					<p class="mt-3">{{item.description}}</p>
				</router-link>
			</div>
		</div>
	</div>
	<div style="clear: both"></div>
	<div v-if="iScroll==false" class="col-md-11">
		<template>
		  <paginate
		  	:click-handler="clickCallback"
		    :page-count="pageCount"
		    :page-range="3"
		    :margin-pages="2"	    
		    :prev-text="'Prev'"
		    :next-text="'Next'"
		    :container-class="'pagination'"
		    :prev-class="'page-item'"
		    :next-class="'page-item'"
		    :page-class="'page-item'"
		    :prev-link-class="'page-link'"
		    :next-link-class="'page-link'"
		    :page-link-class="'page-link'">
		  </paginate>
		</template>	
	</div>
</div>
</div>`,
}

const News = {
	data: function() {
		 return  {
			news: [],
		 }
    },
    created: function () {
    	document.getElementsByClassName("loader-wrap")[0].style.display = "block";
  		document.getElementsByClassName("loader")[0].style.display = "block";
  	},
	mounted: function() {
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
   		axios
	      .get('https://1-dot-crawl-article96.appspot.com/posts/detail?p=' + this.$route.params.post)
	      .then(response => {
	      		this.news = response.data;
	      	}).finally(function() {
	      		document.getElementsByClassName("loader-wrap")[0].style.display = "none";
	      		document.getElementsByClassName("loader")[0].style.display = "none";
	      	})
    },
  template: `<div class="container mt-5">
		<div class="row">
			<div class="col-sm-12 col-md-8">
				<h1>{{news.title}}</h1>
				<p>By <strong>{{news.author}}</strong></p>
			</div>
		</div>

		<div class="row mt-3">
			<div class="col-sm-12 col-md-8">
				<div class="des mb-3">{{news.description}}</div>
				<div v-html="news.content"> </div>
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

const Create = {
	data: function() {
		 return  {
		   showDm: false
		 }
    },
	mounted: function() {
		document.getElementsByClassName("loader-wrap")[0].style.display = "none";
  		document.getElementsByClassName("loader")[0].style.display = "none";
	},
	template: `
	<div>
		<div class="news-form mt-5">
			<h5 class="ml-1 mb-4">Feel free to contribute! Please be respectful.</h5>
			<h3 class="ml-1">Add News Link</h3>
			<div class="row mt-4">
				<div class="col-md-10 news-input-wrapper news-input-url">
					<input class="news-input" type="text" placeholder="Enter url">
				</div>
			</div>
			<div class="row mt-4">
				<div class="col-md-10 news-input-wrapper news-input-title">
					<input class="news-input" type="text" placeholder="Title selecter">
				</div>
			</div>
			<div class="row mt-4">
				<div class="col-md-10 news-input-wrapper news-input-content">
					<input class="news-input" type="text" placeholder="Content selector">
				</div>
			</div>
			<div class="row mt-4">
				<div class="col-md-10 news-input-wrapper news-input-remove">
					<input class="news-input" type="text" placeholder="Exception selector">
				</div>
			</div>
			<div class="col-md-10"><button v-on:click="showDm=!showDm" class="mt-4 live-demo">Live Demo</button></div>
		</div>

		<transition name="fade" mode="out-in">
			<div class="container" v-if="showDm">		
				<div class="live-demo-area mt-4">
					<p>ggwp</p>
					<p>ggwp</p>
					<p>ggwp</p>
					<p>ggwp</p>
					<p>ggwp</p>
				</div>
				<div class="col-md-5" style="margin-left:25.6%;"><button class="mt-4 live-demo">Save</button></div>
			</div>
		</transition>
	</div>`
}

const router = new VueRouter({
	routes: [
		{ path: '/', component: Home },
		{ path: '/news', component: Create },
		{ path: '/post/:post', component: News, name: 'post' },
	]
})

new Vue({
  router
}).$mount('#app')

