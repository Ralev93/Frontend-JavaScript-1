"use strict";
var books = [
			    {
			        "isbn": 60853980,
			        "title": "Good Omens: The Nice and Accurate Prophecies of Agnes Nutter, Witch",
			        "image_url": "https://d.gr-assets.com/books/1392528568m/12067.jpg",
			        "small_image_url": "https://d.gr-assets.com/books/1392528568s/12067.jpg",
			        "num_pages": 413,
			        "description": "&amp;lt;p&amp;gt;According to&amp;lt;em&amp;gt;The Nice and Accurate Prophecies of Agnes Nutter&amp;lt;/em&amp;gt;,&amp;lt;em&amp;gt;Witch&amp;lt;/em&amp;gt;&amp;&#35;40;the world&apos;s only&amp;lt;em&amp;gt;completely&amp;lt;/em&amp;gt;accurate book of prophecies, written in 1655, before she exploded&amp;&#35;41;, the world will end on a Saturday. Next Saturday, in fact. Just before dinner.&amp;lt;/p&amp;gt;&amp;lt;p&amp;gt;So the armies of Good and Evil are amassing, Atlantis is rising, frogs are falling, tempers are flaring. Everything appears to be going according to Divine Plan. Except a somewhat fussy angel and a fast-living demon—both of whom have lived amongst Earth&apos;s mortals since The Beginning and have grown rather fond of the lifestyle—are not actually looking forward to the coming Rapture.&amp;lt;/p&amp;gt;&amp;lt;p&amp;gt;And someone seems to have misplaced the Antichrist . . .&amp;lt;/p&amp;gt;",
			        "average_rating": 4.27
			    },
			    {
			        "isbn": "055215430X",
			        "title": "Night Watch",
			        "image_url": "https://d.gr-assets.com/books/1320518310m/47989.jpg",
			        "small_image_url": "https://d.gr-assets.com/books/1320518310s/47989.jpg",
			        "num_pages": 480,
			        "description": "&amp;lt;em&amp;gt;&apos;Don't put your trust in revolutions. They always come round again. That's why they're called revolutions. People die, and nothing changes.'&amp;lt;/em&amp;gt;&amp;lt;br&amp;gt;&amp;lt;br&amp;gt;For a policeman, there can be few things worse than a serial killer at loose in your city. Except, perhaps, a serial killer who targets coppers, and a city on the brink of bloody revolution. The people have found their voice at last, the flags and barricades are rising...And the question for a policeman, an officer of the law, adefender of the peace, is:&amp;lt;br&amp;gt;&amp;lt;br&amp;gt;Are you with them, or are you against them?",
			        "average_rating": 4.44
			    }
			];


$(document).ready(function() {
/*
	$.getJSON('http://localhost:3000/students', function(books, textStatus) {
      
  });*/
	//$("#btn btn-success").on("click", function() {
   		books.forEach(function (book) {
   			var toAppend = _.template($("#single-book-template").html(), book);
   			$(".row").append(toAppend);
   		});
   		

 // });

});