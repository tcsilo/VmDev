(function() {
    var app = angular.module("app", []);

    var Data = {};
    var showFeed = { Featured: true, Stories: false, Saved: false };

    app.controller("HomeController", ['$scope', 'jsonService', function($scope, jsonService) {
        var self = this;
        self.Data = Data;
        self.dataLoaded = false;

        function LoadRandomPosts(argument) {
        	self.dataLoaded = false;
        	var mxPost = Math.floor(Math.random() * Data.allPosts.length);
            var mnPost = Math.floor(Math.random() * mxPost);
            Data.posts = Data.allPosts.slice(mnPost, mxPost);
            LoadComments();
            self.dataLoaded = true;
        }

        function LoadComments() {
            Data.posts = Data.posts.map(function(arg) {
                var maxComments = Math.floor(Math.random() * 3);
                var nComment = 0;

                arg.comments = Data.comments.filter(function(com) {
                    if (com.postId == arg.id) {
                        nComment++;

                        return nComment <= maxComments;
                    } else
                        return false;
                });
                return arg;
            });
            Data.posts = Data.posts.map(function(arg) {
                return { data: arg, likes: 0, newComment: "" };
            });
        }

        jsonService.getPosts().then(function(payload) {
            Data.allPosts = payload.data;
            

            jsonService.getComments().then(function(payload) {
                // Data.allComments = payload.data;
                // Data.comments = Data.allComments.slice(0, 50);

                Data.Comments = payload.data;
                LoadComments();

                self.dataLoaded = true;
            }, function() {
                console.log("ERROR COMMENTS");
            });
        }, function() {
            console.log("ERROR POSTS");
        });

        this.Refresh = function() {
            var mxPost = Math.floor(Math.random() * Data.allPosts.length);
            var mnPost = Math.floor(Math.random() * mxPost);
            Data.posts = Data.allPosts.slice(mnPost, mxPost);
        };

        this.plusLikes = function(articulo) {
            articulo.likes++;
        };

        this.plusComment = function(articulo) {
            if (!articulo.newComment) {
                return "";
            }
            var nCmmt = {};
            for (var key in articulo.data.comments) {
                nCmmt[key] = "";
            }
            nCmmt.body = articulo.newComment;
            articulo.data.comments.push(nCmmt);
            articulo.newComment = "";
        };

    }]);

    app.controller('PostController', ['$http', function() {
        var self = this;
        self.status = "";
        self.btnText = "Post It!";
        self.PostStatusUpdate = function(status) {
            if (!self.status) {
                return "";
            }
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

    app.factory('jsonService', ['$http', function($http) {

        return {
            getPosts: function() {
                return $http.get('https://jsonplaceholder.typicode.com/posts');
            },
            getComments: function() {
                return $http.get('https://jsonplaceholder.typicode.com/comments');
            }
        };
    }]);

})();
