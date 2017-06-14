var apiURL = "https://api.myjson.com/bins/q95f1";

Vue.component('navigation', {
	template: '#navigation'
});

Vue.component('hero-banner', {
	template: '#hero-banner',
	props: ['title', 'desc']
});

Vue.component('frameworks', {
	template: '#frameworks',
	props: ['title']
});

Vue.component('footer-component', {
	template: '#footer-component',
	props: ['year', 'owner'],
	filters: {
		YYYY: function (date) {
			return moment(date).format('YYYY');
		}
	}
});

Vue.component('leads', {
	template: '#leads-template',
	props: ['item']
});

Vue.component('order-form', {
	template: '#order-form'
})

var app = new Vue({
	el: '#app',
	data: {
		items: [],
		title: 'Ready for a <strong>Stress-Free</strong> Move?',
		desc: 'HouseCraft will take all the stress out of moving. The <strong>moving</strong> app will determine to make your move smoothly.',
		search: '',
		movingDate: new Date(),
		fullName: '',
		email: '',
		flex: 'yes',
		dwellingType: '',
		startingZip: '',
    startingCity: '',
    endingZip: '',
    endingCity: '',
		date: new Date()
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
		}, 500),

		addItem: function() {
				var id = $('table tbody tr').each(function() {
					$(this).attr('id', $(this).index() + 1);
				});

				this.items.push({
					id: id.length,
					name: this.fullName,
					email: this.email,
					type: this.dwellingType,
					destination: this.endingCity,
					orginal: this.startingCity,
					date: this.movingDate,
					felxibility: this.flex
				});

				this.fullName = null;
				this.email = null;
				this.dwellingType = null;
				this.endingCity = null;
				this.startingCity = null;
				this.movingDate = null;
				this.flex = null;

		},

		deleteItem: function(item) {
			this.items.splice(item, 1);
		}
	}
});
