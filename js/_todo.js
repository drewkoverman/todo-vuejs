//JSON object
var dataJSON = '[{ "id": "0", "title": "Model 1 App", "date": "10/01/2016", "desc": "Code Model 1 Web Application", "status": "done", "email": "koverm03@email.franklin.edu"}, {"id": "1","title": "Model 2 App","date": "10/03/2016","desc": "Write business lgic for the MVC controller","status": "in progress", "email": "test@test.com"}, {"id": "2","title": "Class Reminder","date": "10/10/2016","desc": "Reminder for Tuesday 8:00 class","status": "waiting", "email": "test@gmail.com"}]';

//Parse JSON object to toDos object
var toDos = JSON.parse(dataJSON);

//variables for Hero Controller
var app = angular.module('todo', []);
var display = [];
var images = ['1.jpg', '2.jpg', '3.jpg', '4.jpg'];

/**
* AngularJS Element Directive that sets the copy & CTA button template for the Hero Banner Component
* @module app
* @directive herocopy
*/
app.directive("herocopy", function() {
	var h1 = "<h1><span><i class='glyphicon glyphicon-check'></i> Let's create a Task!</span></h1>";
	var lead = "<p class='lead'><span>Web Application Tailored to WEBD335 Projects!</span></p>"
	var desc = "<p><a href='#userForm' class='btn btn-cta'>Create a todo!</a></p>" 
                                 
    return {
    	template: h1 + lead + desc
    };
});

/**
* AngularJS Controller for todo list
* @module app
* @controller TodoController
* @methods addTodo, getTodo, updateTodo, cancelTodo, deleteTodo
*/
app.controller("TodoController", function($scope){

	//Local Scope variables
	$scope.todoList = toDos;
	$scope.createBtn = true;
	$scope.updateBtn = false;
	$scope.required = false;
	$scope.todoid = "";

	$scope.addTodo = function() {
		var id = $('table tbody tr').each(function() {
    		$(this).attr('id', $(this).index() + 1);
    	});

		toDos.push({
			id: id.length,
            title: $scope.user.desc,
            date: $scope.today = new Date(),
            desc: $scope.user.desc,
            email: $scope.user.email,
            status: $scope.user.status
		});

		console.log(toDos);

		dataJSON = JSON.stringify(toDos);

		$scope.user.title = "";
		$scope.user.desc = "";
		$scope.user.status = "";
		$scope.user.email = "";

		$scope.userForm.$setUntouched();
	}

	$scope.getTodo = function(id) {
		var title= "";
		var email = "";
		var desc = "";
		var status = "";

		angular.forEach(toDos, function(todo,index) {
			if(id === todo.id) {
				id = todo.id;
				title = todo.title;
				email = todo.email;
				desc = todo.desc;
				status = todo.status;
			}
		});	

		$('#title').val(title);
		$('#desc').val(desc);
		$('#email').val(email);
		$('#status').val(status);

		$scope.createBtn = false;
		$scope.updateBtn = true;
		$scope.todoid = id;
	}

	$scope.updateTodo = function(id) {
		angular.forEach(toDos, function(todo,index) {
			if(id === todo.id) {
				todo.title = $('#title').val();
				todo.desc = $('#desc').val();
				todo.status = $('#status').val();
				todo.email = $('#email').val();
			}
		});

		$('#title').val("");
		$('#desc').val("");
		$('#email').val("");
		$('#status').val("");

		$scope.updateBtn = false;
		$scope.createBtn = true;

		$scope.userForm.$setUntouched();
		
	}

	$scope.cancelUpdate = function() {
		$('#title').val("");
		$('#desc').val("");
		$('#email').val("");
		$('#status').val("");

		$scope.updateBtn = false;
		$scope.createBtn = true;
	}

	$scope.deleteTodo = function(index) {
		toDos.splice(index, 1);
	}
	
});

/**
* AngularJS Controller handles display the hero banner
* @module app
* @controller DisplayHero
*/
app.controller("DisplayHero", function() {
	var display = [];
	var images = ['1.jpg', '2.jpg', '3.jpg', '4.jpg'];
	$('.hero').css({'background-image': 'url(images/' + images[Math.floor(Math.random() * images.length)] + ')'});
});

/**
* AngularJS Controller handles display the footer and copyright/date info
* @module app
* @controller footer
*/
app.controller('footer', function($scope) {
	$scope.name = 'Drew Koverman';
	$scope.class = 'WEBD335';
	$scope.assignment = 'Lab 4';
	$scope.today = new Date();
});

            


