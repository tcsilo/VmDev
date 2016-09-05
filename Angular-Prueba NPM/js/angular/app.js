(function() {
    var app = angular.module("app", []);

    var Data = {};

    app.controller("HomeController", ['$http', function($http) {
        var self = this;
        self.listaArticulos = [{ "titulo": "Nulla ac enim.", "texto": "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.", "comentarios": ["Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.", "Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.", "Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem."] }];

        $http.get('./data/MOCK_DATA.json').success(function(data) {
            self.listaArticulos = data;
        });
    }]);

    app.controller("TestController", ['$http', function($http) {
        var self = this;
        self.postData = Data;
        self.postData.posts = {};
        self.postData.comments = {};
        self.postData.postToShow = 5;

        self.postData.LoadMorePosts = function() {
            self.postData.postToShow += 5;

        };

        $http.get('https://jsonplaceholder.typicode.com/posts').success(function(data) {
            if (data.constructor === Array) {
                self.postData.posts = data.slice(0, 10);
            } else {
                self.postData.posts.push(data);
            }
        });


        $http.get('https://jsonplaceholder.typicode.com/comments').success(function(data) {
            if (data.constructor === Array) {
                self.postData.comments = data.slice(0, 10);
            } else {
                self.postData.comments.push(data);
            }

        });
        // Data = self.postData;
    }]);

    app.controller('PostController', ['$http', function() {
        var self = this;
        self.status = "";
        self.imgSource = {};
        self.PostStatusUpdate = function(status) {
            Data.posts.unshift({
                "userId": "30",
                "id": "30",
                "title": "New status update!",
                "body": self.status,
                "image": ""
            });
            self.status = "";
            var f = document.getElementById('myInput').files[0];
            console.log(f);

            var r = new FileReader();
            r.onloadend = function(e) {
                var data = e.target.result;
                self.imgSource = data;
            };
            // r.readAsBinaryString(f);
            r.readAsDataURL(f);
        };
    }]);

    app.controller("PicChangeController", ['$http', function($http) {
        var self = this;
        self.imgIndex = 1;
        self.imgSource = "http://placehold.it/600/771796";
        self.changeImage = function() {
            $http.get('http://jsonplaceholder.typicode.com/photos/' + self.imgIndex).success(function(data) {
                self.imgSource = data.url;
                self.imgIndex++;
            });
        };
    }]);

})();
