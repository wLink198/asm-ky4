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
	      		localStorage.setItem("allNews", JSON.stringify(this.allNews));

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
	      		document.body.scrollTop = 0;
				document.documentElement.scrollTop = 0;
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
					<h5 class="mt-3 news-tit" v-bind:title="item.title">{{item.title}}</h5>
					<span style="font-weight: 700; font-size: 12px">{{item.author}}</span>
					<p class="mt-3 news-des">{{item.description}}</p>
				</router-link>
			</div>
		</div>
	</div>
	<div style="clear: both"></div>
	<div v-if="iScroll==false" class="col-md-11 mt-3">
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
			allNews: [],
			iNews: [],
			randomNews: [],
			irray: [],
			icount: 3,
		 }
    },
    methods: {
	    rNews() {
	    	if (localStorage.getItem("icount")) {
	    		this.icount = localStorage.getItem("icount");
	    	}
	        const pickRandom = (arr,count) => {
			  let _arr = [...arr];
			  return[...Array(count)].map( ()=> arr.splice(Math.floor(Math.random() * arr.length), 1)[0] ); 
			}
			this.allNews = JSON.parse(localStorage.getItem("allNews"));
			for(let i=0; i<this.allNews.length; i++) { this.iNews.push(i) }
			this.irray = pickRandom(this.iNews, parseInt(this.icount));
			this.randomNews = [];
			this.irray.forEach(e => {
				this.randomNews.push(this.allNews[e])
			})
	    },
	    icountF() {
	    	document.getElementById("icountInput").disabled = true;
	    	if (this.icount < 1) { this.icount=1 }
    		if (this.icount > 9) { this.icount=9 }
	    	localStorage.setItem("icount", this.icount);
    		setTimeout(function(){ location.reload(); }, 300);
	    },
	    loadData() {
	    	document.getElementsByClassName("loader-wrap")[0].style.display = "block";
  			document.getElementsByClassName("loader")[0].style.display = "block";
	    	axios
	      .get('https://1-dot-crawl-article96.appspot.com/posts/detail?p=' + this.$route.params.post)
	      .then(response => {
	      		this.news = [];
	      		this.news = response.data;
	      	}).finally(function() {
	      		document.getElementsByClassName("loader-wrap")[0].style.display = "none";
	      		document.getElementsByClassName("loader")[0].style.display = "none";
	      	})
	    }
	},
	watch: {
	  "$route.params.post": {
	    handler(post) {
    	  this.rNews();
	      this.loadData();
	    },
	    immediate: true
	  }
	},
    created: function () {
    	document.getElementsByClassName("loader-wrap")[0].style.display = "block";
  		document.getElementsByClassName("loader")[0].style.display = "block";
  	},
	mounted: function() {	
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
		this.rNews();
   		this.loadData();
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
				<h4 class="random-news">Not So Related News</h4>
				<div class="mb-4 random-news-line"></div>

				<transition-group name="list" tag="div">
					<div v-for="item in randomNews" v-bind:key="item" class="row mb-3">
						<div class="col-4">
							<router-link :to="{ name: 'post', params: { post: item.link }}">
								<img :src="item.image" width="100%">
							</router-link>
						</div>
						<div class="col-8 content">
							<router-link :to="{ name: 'post', params: { post: item.link }}" class="random-news-title">{{item.title}}</router-link>
							<p>By <strong>{{item.author}}</strong></p>
						</div>
					</div>
				</transition-group>
				<div class="row">
					<div class="col-md-8 pt-2" style="font: 700 14px/18px arial; font-size:15px">Enter number of News ( < 10 ): </div>
					<div class="col-md-4">
						<input id="icountInput" type="number" class="form-control" placeholder="Enter a number" v-model="icount" v-on:change="icountF">
					</div>
				</div>
			</div>
		</div>
	</div>`
}

const Create = {
	data: function() {
		return  {
			showDm: false,
			dmData: {},
			dmmInput: {},
			dmInput: {},
			urlInput: '',
			blockInput: '',
			imageInput: '',
			desInput: '',
			titleInput: '',
			contentInput: '',
			authorInput: '',
			linkInput: '',
			bodyFormData: null,
			config: {
				headers: {
					'Content-Type': 'application/json',
				}
			},
			configSave: {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				}
			}
		}
    },
    watch: {
    	urlInput: function() {
    		this.dmInput['url'] = this.urlInput.split("/")[0] + "//" + this.urlInput.split("/")[2];
    		this.dmmInput['url'] = this.urlInput;		    		
    	},
    	blockInput: function() {
    		this.dmInput['block'] = this.blockInput;
    	},
    	imageInput: function() {
    		this.dmInput['image'] = this.imageInput;
    	},
    	desInput: function() {
    		this.dmInput['description'] = this.desInput;
    	},
    	titleInput: function() {
    		this.dmInput['title'] = this.titleInput;
    		this.dmmInput['title'] = this.titleInput;
    	},
    	contentInput: function() {
    		this.dmInput['content'] = this.contentInput;
    		this.dmmInput['description'] = this.contentInput;
    	},
    	authorInput: function() {
    		this.dmInput['author'] = this.authorInput;
    	},
    	linkInput: function() {
    		this.dmInput['link'] = this.linkInput;
    	}
    },
    methods: {
    	showDmm: function() {
    		this.showDm = true;
    		if (this.showDm==true) {
    			document.getElementsByClassName("loader-wrap")[0].style.display = "block";
  				document.getElementsByClassName("loader")[0].style.display = "block";
    			axios
				.post('https://1-dot-crawl-article96.appspot.com/posts', JSON.stringify(this.dmmInput), this.config)
				.then(response => {
					this.dmData = response.data;
				}).finally(function() {
					document.getElementById("live-demo-area").scrollIntoView();
					document.getElementsByClassName("loader-wrap")[0].style.display = "none";
  					document.getElementsByClassName("loader")[0].style.display = "none";
				})
    		}
    	},
    	submitDm: function() {
    		if (this.showDm==true) {
    			this.bodyFormData = new URLSearchParams();
		  		this.bodyFormData.append('url', this.urlInput);
				this.bodyFormData.append('block', this.blockInput);
				this.bodyFormData.append('content', this.contentInput);
				this.bodyFormData.append('description', this.description);
				this.bodyFormData.append('image', this.imageInput);
				this.bodyFormData.append('link', this.linkInput);
				this.bodyFormData.append('title', this.title);
				this.bodyFormData.append('author', this.authorInput);		
    			axios
				.post('https://1-dot-crawl-article96.appspot.com/admin/resource', this.bodyFormData, this.configSave)
				.then(response => {
					alert('GGWP!');
				})
    		}
    	}
    },
	mounted: function() {
		document.getElementsByClassName("loader-wrap")[0].style.display = "none";
  		document.getElementsByClassName("loader")[0].style.display = "none";	
	},
	template: `
	<div>
		<div class="container" style="margin: 40px auto 60px">
			<h2>List Links</h2>
			<table class="table demo-table mt-4">
			  <thead>
			    <tr>
			      <th scope="col">#</th>
			      <th scope="col">First</th>
			      <th scope="col">Last</th>
			      <th scope="col">Handle</th>
			    </tr>
			  </thead>
			  <tbody>
			    <tr>
			      <th scope="row">1</th>
			      <td>Mark</td>
			      <td>Otto</td>
			      <td>@mdo</td>
			    </tr>
			    <tr>
			      <th scope="row">2</th>
			      <td>Jacob</td>
			      <td>Thornton</td>
			      <td>@fat</td>
			    </tr>
			    <tr>
			      <th scope="row">3</th>
			      <td>Larry</td>
			      <td>the Bird</td>
			      <td>@twitter</td>
			    </tr>
			  </tbody>
			</table>
		</div>
		
		<div class="news-form mt-5">
			<h5 class="ml-1 mb-4">Feel free to contribute! Please be respectful.</h5>
			<h3 class="ml-1">Add News Link</h3>
				<div class="row">
					<div class="row mt-4 col-md-6">
						<div class="col-md-12 news-input-wrapper news-input-url">
							<input v-model="urlInput" class="news-input" type="text" placeholder="Url selector">
						</div>
					</div>
					<div class="row mt-4 col-md-6">
						<div class="col-md-12 news-input-wrapper news-input-block">
							<input v-model="blockInput" class="news-input" type="text" placeholder="Block selector">
						</div>
					</div>
				</div>
				<div class="row">
					<div class="row mt-4 col-md-6">
						<div class="col-md-12 news-input-wrapper news-input-image">
							<input v-model="imageInput" class="news-input" type="text" placeholder="Image selector">
						</div>
					</div>
					<div class="row mt-4 col-md-6">
						<div class="col-md-12 news-input-wrapper news-input-des">
							<input v-model="desInput" class="news-input" type="text" placeholder="Description selector">
						</div>
					</div>
				</div>
				<div class="row">
					<div class="row mt-4 col-md-6">
						<div class="col-md-12 news-input-wrapper news-input-title">
							<input v-model="titleInput" class="news-input" type="text" placeholder="Title selector">
						</div>
					</div>
					<div class="row mt-4 col-md-6">
						<div class="col-md-12 news-input-wrapper news-input-content">
							<input v-model="contentInput" class="news-input" type="text" placeholder="Content selector">
						</div>
					</div>
				</div>
				<div class="row">
					<div class="row mt-4 col-md-6">
						<div class="col-md-12 news-input-wrapper news-input-author">
							<input v-model="authorInput" class="news-input" type="text" placeholder="Author selector">
						</div>
					</div>
					<div class="row mt-4 col-md-6">
						<div class="col-md-12 news-input-wrapper news-input-link">
							<input v-model="linkInput" class="news-input" type="text" placeholder="Link selector">
						</div>
					</div>
				</div>
			<div class="col-md-10"><button v-on:click="showDmm" class="mt-4 live-demo">Live Demo</button></div>
		</div>

		<transition name="fade" mode="out-in">
			<div class="container" v-if="showDm">		
				<div id="live-demo-area" class="live-demo-area mt-4">
					<h3 class="mb-5 text-center">{{dmData.title}}</h3>
					<div class="live-demo-content" v-html="dmData.content"></div>
				</div>
				<div class="col-md-5" style="margin-left:25.6%;"><button v-on:click="submitDm" class="mt-4 live-demo">Save</button></div>
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

