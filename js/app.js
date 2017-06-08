var apiURL = "https://api.myjson.com/bins/q95f1";

var app = new Vue({
	el: '#app',
	data: {
		items: [],
		search: '',
		startingZip: '',
    startingCity: '',
    endingZip: '',
    endingCity: ''
	},
	mounted: function() {
		axios.get(apiURL).then(response => this.items = response.data);
	},
	computed: {
		filteredSearch: function() {
			return this.items.filter((item) => {
				return item.name.match(this.search)
			})
		}
	},
	watch: {
		startingZip: function() {
			this.startingCity = '';
			if (this.startingZip.length == 5) {
				this.lookupStartingZip();
			}
		},
		endingZip: function() {
			this.endingCity = '';
			if(this.endingZip.length == 5) {
				this.lookupEndingZip();
			}
		}
	},
	methods: {
		lookupStartingZip: _.debounce(function () {
			var app = this;
			app.startingCity = "Searching...";
			axios.get('http://ZiptasticAPI.com/' + app.startingZip).then(function (response) {
				app.startingCity = response.data.city + ', ' + response.data.state
			})
			.catch(function (error) {
				app.startingCity = "Invalid Zipcode";
			})
		}, 500),
		lookupEndingZip: _.debounce(function () {
			var app = this;
			app.endingCity = "Searching...";
			axios.get('http://ZiptasticAPI.com/' + app.endingZip).then(function (response) {
				app.endingCity = response.data.city + ', ' + response.data.state
			})
			.catch(function (error) {
				app.endingCity = "Invalid Zipcode";
			})
		}, 500)
	}
})
