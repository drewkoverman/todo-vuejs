//JSON object
var dataJSON = '[{ "id": "0", "title": "Model 1 App", "date": "10/01/2016", "desc": "Code Model 1 Web Application", "status": "done", "email": "koverm03@email.franklin.edu"}, {"id": "1","title": "Model 2 App","date": "10/03/2016","desc": "Write business lgic for the MVC controller","status": "in progress", "email": "test@test.com"}, {"id": "2","title": "Class Reminder","date": "10/10/2016","desc": "Reminder for Tuesday 8:00 class","status": "waiting", "email": "test@gmail.com"}]';

//Parse JSON object to toDos object
var toDos = JSON.parse(dataJSON);

var app = new Vue({
	el: '#todoCtrl',
	data: {
		id: "",
		title: "",
		date: new Date(),
		desc: "",
		email: "",
		status: "",
		todoid: "",
		index: 0,
		createBtn: true,
		updateBtn: false,
		todos: toDos
	},
	methods: {
		addTodo: function() {
			var id = $('table tbody tr').each(function() {
	    		$(this).attr('id', $(this).index() + 1);
	    	});

	    	this.todos.push({
	    		id: id.length,
	    		title: this.title,
	    		date: moment().format('MM/DD/YYYY'),
	    		desc: this.desc,
	    		email: this.email,
	    		status: this.status
	    	});

	    	this.title = null;
	    	this.desc = null;
	    	this.email = null;
	    	this.status = null;

	    	dataJSON = JSON.stringify(toDos);
		},

		getTodo: function(id) {
			var title= "";
			var email = "";
			var desc = "";
			var status = "";

			this.todos.forEach(function(todo,index) {
				if(id === todo.id) {
					id = todo.id;
					title = todo.title;
					email = todo.email;
					desc = todo.desc;
					status = todo.status;
				}
			});

			this.title = title;
			this.desc = desc;
			this.status = status;
			this.email = email;

			this.createBtn = false;
			this.updateBtn = true;
			this.todoid = id;
		},

		cancelUpdate: function() {
			this.title = null;
			this.desc = null;
			this.status = null;
			this.email = null;

			this.createBtn = true;
			this.updateBtn = false;
		},

		updateTodo: function(id) {
			this.todos.forEach(function(todo,index) {
				if(id === todo.id) {
					todo.title = $('#title').val();
					todo.desc = $('#desc').val();
					todo.status = $('#status').val();
					todo.email = $('#email').val();
				}
			});

			this.title = null;
			this.desc = null;
			this.status = null;
			this.email = null;

			this.createBtn = true;
			this.updateBtn = false;
		},

		deleteTodo: function(todo) {
			this.todos.$remove(todo);
			//this.todos.splice(this.index, 1);
		}
	}
});

var hero = new Vue({
	el: '.hero',
	data: {
		head: "Let's create a Task!",
		lead: "Web Application Tailored to WEBD335 Projects!",
		desc: "Create a todo!"
	}
});

var footer = new Vue({
	el: '#footer',
	data: {
		copy: 'Drew Koverman WEBD335 Lab 5',
		date: moment().format('YYYY')
	}
})