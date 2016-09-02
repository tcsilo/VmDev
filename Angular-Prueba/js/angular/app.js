(function () {
    var app = angular.module("app", []);
    
    app.controller("HomeController", ['$http', function ($http) {
        var self = this;
        self.listaArticulos = [{"titulo":"Nulla ac enim.","texto":"Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.\n\nPraesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.","comentarios":["Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.","Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.","Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem."]}];
        
        $http.get('./data/MOCK_DATA.json').success(function (data) {
            self.listaArticulos = data;
        });
    }]);
})();