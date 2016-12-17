var computers = [{
  name: 'Executioner01',
  IDF: true ,
  SCEP: true ,
  os: "Windows 7 Enterprise SP1",
  lab: false,
  college: 'CTS'
},
{
  name: 'mylabVM1',
  IDF: false ,
  SCEP: false,
  os: "Windows 7 Enterprise SP1",
  lab: true,
  college: "IT"
},
{
  name: 'mylabVM2',
  IDF: false,
  SCEP: true,
  os: "Windows 10 Enterprise Build 1607",
  lab: true,
  college: "IT"
}];

(function(){

  var app = angular.module('computerReport', []);
  app.controller('ReportController', function(){
    this.computers = computers;
  });
})();

function getCount(arr){
  count = { 'scep' : 0,
            'idf' : 0,
            'lab' : 0 };
  for ( var i in arr) {
    //console.log("SCEP count: " + count['scep']);
    //console.log(arr[i].SCEP);
    if (arr[i].SCEP) {
      count['scep'] += 1;
    };
    if (arr[i].lab) { count['lab']++; };
    if (arr[i].IDF) { count['idf']++; };
  };
  return count;
}


$( document ).ready(function(){
  /*$("#idfChart").circliful({
    animation: 1,
    animationStep: 1,
    backgroundColor: '#000',
    foregroundColor: 'blue',
    percent:48.2,
    halfCircle: 1,
    fontColor: '#000',
    fontSize: '40'
  });*/
  count = getCount(computers);
  goGraph('#idfChart', count['idf']* 10, 'blue');
  goGraph('#scepChart', count['scep']* 10, 'green' );
  goGraph('#labChart', count['lab'] * 10, 'purple');
  $('#computerTable').DataTable({
    data: computers,
    columns: [
      { data: 'college' },
      { data: 'name' },
      { data: 'os'},
      { data: 'SCEP'},
      {  data: 'IDF'}
    ]
  });
});

function goGraph(el, percentage, myColor){
  $(el).circliful({
    animation: 1,
    animationStep: 1,
    backgroundColor: '#000',
    foregroundColor: myColor,
    percent: percentage,
    fontColor: '#000',
    fontSize: '40'
  })
}
