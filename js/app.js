var apiURL = '[{"id":1,"name":"Jane Doe","email":"jane.doe@example.com","type":"One Bedroom Apt","destination":"New York, NY","orginal":"Dayton, OH","date":"4/4/16","felxibility":true},{"id":2,"name":"Bob Doe","email":"bob.doe@test.com","type":"Two Bedroom Apt","destination":"Boston, MA","orginal":"Columbus, OH","date":"1/4/16","felxibility":false},{"id":3,"name":"Drew Koverman","email":"drew.koverman@email.franklin.edu","type":"Condo","destination":"Centerville, OH","orginal":"Miamisburg, OH","date":"11/12/15","felxibility":true},{"id":4,"name":"Walter White","email":"walter.white@imtheonewhoknocks.com","type":"One Bedroom Apt","destination":"Albnay, NH","orginal":"Albuquerque, NM","date":"8/23/16","felxibility":true},{"id":5,"name":"Greg Roman","email":"greg.roman@something.com","type":"Home","destination":"Columbus, OH","orginal":"Sidney, OH","date":"5/12/16","felxibility":false},{"id":6,"name":"Tracy Giron","email":"tracy.giron@test.com","type":"Condo","destination":"Chicago, IL","orginal":"Virginia Beach, VA","date":"11/20/16","felxibility":false},{"id":7,"name":"Rick Grimes","email":"stuff@stuff.com","type":"Studio","destination":"Chicago, IL","orginal":"Virginia Beach, VA","date":"11/20/16","felxibility":false}]';
apiURL = JSON.parse(apiURL);

Vue.component('app-list', {
	data: function() {
		return {
			items: apiURL
		}
	},
	template: '<tr v-for="item in filteredItems | filterBy searchText"> <td>{{ item.name }}</td><td>{{ item.email }}<td>{{ item.type }}</td><td>{{ item.destination }}</td><td>{{ item.orginal }}</td> <td>{{ item.date }}</td><td>{{ item.felxibility }}</td></tr>'
});

var app = new Vue({
	el: '#app',
	data: {
		items: apiURL
	}
})