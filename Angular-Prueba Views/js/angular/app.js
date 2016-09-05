(function() {
    var app = angular.module("app", []);

    var Data = {};

    function newComment(likes, titulo, texto, comentarios) {
        return { "data": { "likes": likes, "titulo": titulo, "texto": texto, "comentarios": comentarios }, "newComment": "" };
    }

    app.controller("HomeController", ['$http', '$scope', function($http, $scope) {
        var self = this;
        self.Data = Data;
        self.Data.posts = [{ "likes": 0, "titulo": "Nulla ac enim.", "texto": "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.", "comentarios": ["Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.", "Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.", "Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem."] }];
        var comments = {};

        $http.get('https://jsonplaceholder.typicode.com/posts').success(function(data) {
            self.Data.posts = data.slice(0, 10);
        });

        $http.get('https://jsonplaceholder.typicode.com/comments').success(function(data) {
            comments = data;

            self.Data.posts = self.Data.posts.map(function(arg) {
                var maxComments = Math.floor(Math.random() * 3);
                var nComment = 0;
                console.log("nc:"+nComment+"mc:"+maxComments);
                arg.comments = comments.filter(function(com) {
                    if (nComment < maxComments) {
                        nComment++;
                        return com.postId === arg.id;
                    } else
                        return false;
                });
                return arg;
            });
            self.Data.posts = self.Data.posts.map(function(arg) {
                return { data: arg, likes:0, newComment: "" };
            });

            console.log("Data.posts with auxs");
            console.log(self.Data.posts);

        });

        this.plusLikes = function(articulo) {
            // console.log(articulo);
            articulo.likes++;
        };

        this.plusComment = function(articulo) {
            // console.log(articulo);
            articulo.data.comments.push(articulo.newComment);
            articulo.newComment = "";
        };

        // $http.get('MOCK_DATA.json')
        // 	.success(function(data) {
        // 		console.log("Success");
        //     	// this.Data.posts = data;            	
        // 	})
        // 	.error(function() {
        // 		console.log("Failure");
        //         // this.Data.posts = [{ "titulo": "Nulla ac enim.", "texto": "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.", "comentarios": ["Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.", "Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.", "Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem."] }];            	
        //     });
    }]);

    app.controller('PostController', ['$http', function() {
        var self = this;
        self.status = "";
        self.btnText = "Post It!";
        self.PostStatusUpdate = function(status) {
            Data.posts.data.unshift(newComment(0, "New Post", self.status, []));
            self.status = "";
        };
    }]);

})();
