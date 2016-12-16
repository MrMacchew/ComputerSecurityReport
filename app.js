(function(){
  var computers = [{
    name: 'Executioner01',
    IDF: true ,
    SCEP: true ,
    lab: false,
    college: 'CTS'
  },
  {
    name: 'myVM1',
    IDF: false ,
    SCEP: false,
    lab: true,
    college: "IT"
  }];

  var app = angular.module('computerReport', []);
  app.controller('ReportController', function(){
    this.computers = computers;
  });
})();
