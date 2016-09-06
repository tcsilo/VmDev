(function() {
        var app = angular.module("app", []);

        var Data = {};

        app.controller("HomeController", ['$http', '$scope', function($http, $scope) {
            var self = this;
            self.Data = Data;
            // self.Data.posts = [{ "likes": 0, "titulo": "Nulla ac enim.", "texto": "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.", "comentarios": ["Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.", "Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.", "Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem."] }];
            var comments = {};

            $http.get('https://jsonplaceholder.typicode.com/posts').success(function(data) {

                self.Data.posts = data.slice(0, 10);
            });

            $http.get('https://jsonplaceholder.typicode.com/comments').success(function(data) {
                comments = data;

                self.Data.posts = self.Data.posts.map(function(arg) {
                    var maxComments = Math.floor(Math.random() * 3);
                    var nComment = 0;

                    arg.comments = comments.filter(function(com) {
                        if (com.postId == arg.id) {
                            nComment++;

                            return nComment <= maxComments;
                        } else
                            return false;
                    });
                    return arg;
                });
                self.Data.posts = self.Data.posts.map(function(arg) {
                    return { data: arg, likes: 0, newComment: "" };
                });

            });

            this.plusLikes = function(articulo) {
                // console.log(articulo);
                articulo.likes++;
            };

            this.plusComment = function(articulo) {
                // console.log(articulo);
                if (!articulo.newComment) {return "";}
                var nCmmt = {};
                for (var key in articulo.data.comments) {
                    nCmmt[key] = "";
                }
                nCmmt.body = articulo.newComment;
                articulo.data.comments.push(nCmmt);
                articulo.newComment = "";
            };

            // $http.get('MOCK_DATA.json')
            //  .success(function(data) {
            //      console.log("Success");
            //      // this.Data.posts = data;              
            //  })
            //  .error(function() {
            //      console.log("Failure");
            //         // this.Data.posts = [{ "titulo": "Nulla ac enim.", "texto": "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.", "comentarios": ["Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.", "Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.", "Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem."] }];               
            //     });
        }]);

        app.controller('PostController', ['$http', function() {
                var self = this;
                self.status = "";
                self.btnText = "Post It!";
                self.PostStatusUpdate = function(status) {
                    if (!self.status) {return "";}
                    Data.posts.unshift({
                            data: {
                                title: "New Post!",
                                body: self.status,
                                comments: []
                            },
                            likes: 0,
                            newComment: ""                   
                        }); 
                        self.status = "";
                    };
                }]);

        })();
