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
  name: 'myPCVM1',
  IDF: true,
  SCEP: true,
  os: "Windows 7 Enterprise SP1",
  lab: false,
  college: "IT"
},
{
  name: 'myPCVM2',
  IDF: true,
  SCEP: true,
  os: "Windows 7 Enterprise SP1",
  lab: false,
  college: "IT"
},
{
  name: 'mySOCVM1',
  IDF: true,
  SCEP: true,
  os: "Windows 7 Enterprise SP1",
  lab: false,
  college: "SOC"
},
{
  name: 'mySOCVM2',
  IDF: true,
  SCEP: true,
  os: "Windows 7 Enterprise SP1",
  lab: false,
  college: "SOC"
},
{
  name: 'mySAVM1',
  IDF: false,
  SCEP: true,
  os: "Windows 10 Enterprise Build 1607",
  lab: true,
  college: "SA"
},
{
  name: 'mySAVM2',
  IDF: false,
  SCEP: true,
  os: "Windows 10 Enterprise Build 1607",
  lab: true,
  college: "SA"
},
{
  name: 'mySAVM3',
  IDF: false,
  SCEP: true,
  os: "Windows 10 Enterprise Build 1607",
  lab: true,
  college: "SA"
},
{
  name: 'mySAVM4',
  IDF: false,
  SCEP: true,
  os: "Windows 10 Enterprise Build 1607",
  lab: false,
  college: "SA"
},
{
  name: 'myPCVM2',
  IDF: true,
  SCEP: true,
  os: "Windows 7 Enterprise SP1",
  lab: false,
  college: "IT"
},
{
  name: 'mylabVM2',
  IDF: false,
  SCEP: false,
  os: "Windows 10 Enterprise Build 1607",
  lab: false,
  college: "IT"
}];

(function(){

  var app = angular.module('computerReport', []);
  app.controller('ReportController', function(){
    this.computers = computers;
  });
  app.controller('TabController', function(){
    this.tab = 1;
    this.limit = 10;
    this.selectTab = function(setTab) {
      this.tab = setTab;
    }

    this.isSelected =  function(checkTab){
      return this.tab === checkTab;
    }
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
    if (arr[i].IDF || arr[i].lab) { count['idf']++; };
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
  goGraph('#idfChart', (count['idf']/computers.length)*100, 'blue', 'Identity Finder');
  goGraph('#scepChart', (count['scep']/computers.length)*100, 'green', 'SCEP / Antivirus' );
  goGraph('#labChart', (count['lab']/computers.length)*100, 'purple', "Lab Computers");
  $('#computerTable').DataTable({
    data: computers,
    bAutoWidth:false,
    columns: [
      { data: 'college' },
      { data: 'name' },
      { data: 'os'},
      { data: 'SCEP'},
      { data: 'IDF'},
      { data: 'lab'}
    ]
  });
  warningSet();
});

function warningSet(){
  //console.log("warningSet() Fired off");
  $("td").each(function(){
    //console.log("TD Value checked" + $(this).text());
    if($(this).text() === "true"){
      $(this).addClass("success");
    }
    if($(this).text() === "false"){
      $(this).addClass("danger");
    }
  });
}

function goGraph(el, percentage, myColor, myText){
  $(el).circliful({
    animation: 1,
    animationStep: 1,
    foregroundColor: myColor,
    percent: percentage,
    fontColor: '#000',
    fontSize: '40',
    halfCircle: true,
    text: myText
  })
}
