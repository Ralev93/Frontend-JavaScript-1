
//var querryAjax = function (url, type, data)

$(document).ready(function() {
	"use strict"

	function Student(name, facultyNumber, courses) {
		this.getName = function() {
			return name;
		};
		this.getFacultyNumber = function() {
			return facultyNumber;
		};
		this.getCourses = function() {
			return courses;
		};
	};

	Student.prototype.createStudent = function() { // more like addStudent
	//	querryAjax("student", "POST", )

		$.ajax({
				url: "http://localhost:3030/student",
			  type: "POST",
			  data: JSON.stringify({
			       "name": this.getName(),
			       "facultyNumber": this.getFacultyNumber(),
			       "courses": this.getCourses()
			      }),
			 	contentType: "application/JSON"
			});
		};

	Student.prototype.updateStudent = function(newName, newCourses) {
		$.ajax({
			url: "http://localhost:3030/student",
		  type: "POST",
		  data: JSON.stringify({
		       "name": newName,
		       "facultyNumber": this.getFacultyNumber(),
		       "courses": newCourses
		      }),
		 	contentType: "application/JSON"
		});
	};

	Student.prototype.deleteStudent = function() {
		$.ajax({
			url: "http://localhost:3030/student/" + this.getFacultyNumber(),
			type: "DELETE",
			contentType: "application/JSON"
		});
	};

	Student.prototype.list = function() {
		$.ajax({
			url:"http://localhost:3030/student/"  + this.getFacultyNumber(),
			type: "GET"
		}).done(function (data) {
				logData();
			});
	}

	var listStudents = function() {
		$.ajax({
			url: "http://localhost:3030/students",
		  type: "GET"
		}).done(function(data) {
				console.log(data);
    	   logData(data);
		 	 });
		};

	var deleteStudent = function(facultyNumber) {
			$.ajax({
			url: "http://localhost:3030/student/" + facultyNumber,
			type: "DELETE",
			contentType: "application/JSON"
		});
	}

	var logData = function(data) {
		var source   = $("#entry-template").html(),
			template = Handlebars.compile(source),
		  context = {'students': data},
			html    = template(context);

			$("#student-table-body").append(html);
	}

	$(".create").on("click", function () {
		var
			name = prompt("Name: "),
			facultyNumber = prompt("Number: "),
			courses = prompt("Courses: ").split(",");

		var student = new Student(name, facultyNumber, courses);

		student.createStudent();
		student.list();

	});

	$(".delete").on("click", function () {
		var number = prompt("Enter a faculty number");
		deleteStudent(number);



	});

	$(".listing").on("click", function () {
		listStudents();
	});

});
