(function () {
    var app = angular.module("app", []);
    
    app.controller("HomeController", ['$http', function ($http) {
        var self = this;
        self.listaArticulos = [{"titulo":"Nulla ac enim.","texto":"Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.","comentarios":["Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.","Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.","Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem."]}];
        
        $http.get('./data/MOCK_DATA.json').success(function (data) {
            self.listaArticulos = data;
        });
    }]);

	app.controller("TestController", ['$http', function ($http) {
        var self = this;
        self.list = {};
        self.postToShow = 5;

        self.LoadMorePosts = function(){
        	self.postToShow+=5;
        	
        };

        $http.get('https://jsonplaceholder.typicode.com/posts').success(function (data) {
            if(data.constructor === Array){
            	data.varType = "ArrayPlaced";
            	self.list = data;            	
            }
            else
            {
            	data.varType = "ArrayPushed";
            	self.list.push(data);            	
            }
            
        });
    }]);

    app.controller("PicChangeController", ['$http', function($http) {
        var self = this;
        self.imgIndex = 1;
        self.imgSource = "http://placehold.it/600/771796";
        self.changeImage = function(){
        	$http.get('http://jsonplaceholder.typicode.com/photos/'+self.imgIndex).success(function (data) {
            self.imgSource = data.url;
            self.imgIndex++;
        });
        };
    }]);

})();