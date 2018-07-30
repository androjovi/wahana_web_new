
$(document).ready(function(){
/*
  $(window).scroll(function() {
  var scroll = $(window).scrollTop();
  if (scroll >= 200) {
    $("nav").addClass("dark-nav");
    $(".nav-item a").css("color","white");
    $(".fa").css("color","white")
    //$(".nav-item a").removeClass("nav-link");
  } else {
    $("nav").removeClass("dark-nav");
    $(".nav-item a").css("color","black");
    $(".fa").css("color","black")
    $(".nav-item a").hover(
   function () {
     $(this).addClass("trun");
   },
   function () {
       $(this).removeClass("trun");
     })
  }
})
*/
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
})

//Script untuk screenshot hasil tariff
$(document).ready(function(){

})
var htmlSource = $('#testing')[0];
$('#btnDownload').on("click", function() {
  htmlSource.scrollIntoView()
  html2canvas(htmlSource, {
    async : true,
    allowTaint : true,
   onrendered: function(canvas) {

     // document.body.appendChild(canvas);
     return Canvas2Image.saveAsPNG(canvas);
   }
 });
  })

//Script untuk screenshot hasil tracking
function downloadingtrack(){
var htmlSource2 = $('#testing2')[0];
$("#massku").removeAttr("style")

htmlSource2.scrollIntoView()
html2canvas(htmlSource2, {
  allowTaint : true,
  logging : true,
  useCORS : true,
  foreignObjectRendering : true,

 onrendered: function(canvas) {
   // document.body.appendChild(canvas);
/*
   canvas.id = "h2canvas";
              document.body.appendChild( canvas );
              var canvas = document.getElementById("h2canvas");

          var ctx = canvas.getContext("2d");

          var img = new Image();
          img.onload = function() {
            ctx.drawImage(this, 0, 0);
          }
          img.src = "https:///assets/theme/assets/img/logo_wahana.png";                         /// draw image 1:1 @ [0, 0]

/*
   var ctx = canvas.getContext("2d");       // get 2D context of canvas

   ctx.textBaseline = "top";                // start with drawing text from top
   ctx.font = "15px swanse";            // set a font and size
   ctx.fillStyle = "black";                   // set a color for the text
   ctx.fillText("", 10, 260);       // draw the text at some position (x, y)

   */
   return Canvas2Image.saveAsPNG(canvas);
   //saveAs(document.getElementById("h2canvas").toDataURL(), 'result-lacak-pengiriman.png');
 },
});
}
function saveAs(uri, filename) {
  var link = document.createElement('a');
  if (typeof link.download === 'string') {
    link.href = uri;
    link.download = filename;

    //Firefox requires the link to be in the body
    document.body.appendChild(link);

    //simulate click
    link.click();

    //remove the link when done
    document.body.removeChild(link);
  } else {
    window.open(uri);
  }
}
$( "#modalTracking" ).mouseover(function() {
$("#massku").attr("style","height:450px;overflow:auto;")
});





$(document).ajaxStart(function() { Pace.restart(); });
$(document).ready(function(){

  paceOptions = {
ajax: true, //
document: true, //
eventLag: true, //
};
})


var myLat;
var myLng;
var markers = [];
$(document).ready(function(){
startGeolocation();
/*
$("#moreMaps").click(function(){
  document.getElementById("counter").stepUp(5)
  console.log($("#counter").val())
})
*/
});

function startGeolocation()
{
if (navigator.geolocation) {
navigator.geolocation.getCurrentPosition(showPosition, showError);
} else {
// Browser doesn't support Geolocation
$('#alertModal #myModalLabel').html('Error');
$('#alertModal .modal-body').html('Your browser not support maps geolocation!');
$('#alertModal').modal('show');
}
}

function showError(error) {
// alert("Error Mengambil Data Map");
console.log(error);
}

function showPosition(position) {
myLat = position.coords.latitude;
myLng = position.coords.longitude;
 //console.log(myLat+" "+myLng);
getLocation(myLat, myLng, 5);
}

function getLocation(myLat, myLng, radius){
  if ($("#counter").val() == 5){
  $.post( "https://weblib.wahana.com/Ajaxx/getLokasiAgenNew",
  {'radius':5, 'lat':myLat, 'long':myLng, 'limit': 5},
  function() {}).done(function(data){
  // console.log(data);

  setMarker(JSON.parse(data), myLat, myLng);
  });
  }
  var czount= 10
  $("#moreMaps").click(function(){
    $(".list-alamat").empty()
//document.getElementById("counter").stepUp(5)
//var rcr =  parseInt($("#counter").val())
czount += 5
$("#cnt").html(czount-5 +"&nbsp;")
//console.log(czount)
$("#counter1").val(czount)
$.post( "https://weblib.wahana.com/Ajaxx/getLokasiAgenNew",
{'radius':5, 'lat':myLat, 'long':myLng, 'limit': czount},
function() {}).done(function(data){
// console.log(data);
setMarker(JSON.parse(data), myLat, myLng);
});
})
}

function setMarker(location , lat, lng){
var map = new google.maps.Map(document.getElementById('map'), {
zoom: 13,
center: new google.maps.LatLng(lat,lng),
mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: true,
    mapTypeControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER
    },
});

var markerPusat = {
url: 'https://weblib.wahana.com/assets/images/wahana/pusat2.png', // url
scaledSize: new google.maps.Size(40, 40), // scaled size
};

var beachMarker = new google.maps.Marker({
position: {lat: -6.282506, lng: 106.760984},
map: map,
icon: markerPusat
});


var infowindow = new google.maps.InfoWindow();

beachMarker.addListener('mouseup', function() {
infowindow.setContent('Kantor Pusat PT. Wahana Prestasi Logistik');
infowindow.open(map, beachMarker);
});

var markerHere = {
url: 'https://weblib.wahana.com/assets/images/wahana/marker.png', // url
scaledSize: new google.maps.Size(40, 40), // scaled size
};

var hereMarker = new google.maps.Marker({
position: {lat: lat, lng: lng},
map: map,
icon: markerHere
});


var infowindow2 = new google.maps.InfoWindow();

hereMarker.addListener('mouseup', function() {
infowindow2.setContent('You Are Here');
infowindow2.open(map, hereMarker);
});

var i;
for (i = 0; i < location.length; i++) {
setMarkers(i, location[i], lat, lng, map, infowindow2);
// console.log(location[0]);
}
}

function setMarkers(item, location, lat, lng, map, infowindow)
{
var marker;
var markerAgen = {
url: 'https://weblib.wahana.com/assets/images/wahana/agen2.png', // url
scaledSize: new google.maps.Size(40, 40), // scaled size
};

var mylat = parseFloat(location.Latitude);
var mylng = parseFloat(location.Longitude);

marker = new google.maps.Marker({
position: new google.maps.LatLng(mylat, mylng),
icon: markerAgen
});

markers.push(marker);
markers[item].setMap(map);
marker.addListener('mouseup', function() {
toggleBounce(this);
});
/*
jam_buka = new Date()
jam_tutup = new Date()
current_jam = new Date()
jam_buka.setHours(09,0,0)
jam_tutup.setHours(18,0,0)
current_jam.setHours(location.Jam[0]+location.Jam[1],location.Jam[3]+location.Jam[4],0)
*/
//console.log(current_jam)
//current_jam.setHours(07,0,0)
//console.log(location.Jam)
var hour = location.Jam
var staT
if (hour >= 9 && hour < 18){
  staT = "<span class='buka'>Buka</span>"
}else{
  staT = "<span class='tutup'>Tutup</span>"
}
marker.addListener('mouseup', function() {
infowindow.setContent(location.Nama+"<br>"+location.ATRBEP02+"<br>"+staT+" &nbsp;09:00 - 18:00");
infowindow.open(map, marker);
});

var distance;
// $.post( "https://weblib.wahana.com/Ajaxx/getDistance",
//   {'lat':lat, 'long':lng,
//     'lat1':mylat, 'long1':mylng},
//       function() {}).done(function(dist){
//         distance = dist;
var string = "<li onmouseover='toggleHover("+item+")' data-location='"+item+"' class='list-item-alamat' style='padding:0px;'> \
    <div class=' nama-tempat'>"+location.Nama+"</div> \
    <div class='col-lg-12 col-md-12 col-sm-12 col-xs-12 directions-tempat'> \
    <div data-lng1='"+mylng+"' data-lat1='"+mylat+"' data-lat='"+lat+"' data-lng='"+lng+"' onClick='getDirection(this)' class='divDirect'> \
    <img class='img-responsive img-arah' src='https://weblib.wahana.com/assets/theme/assets/img/wahana/find-10.png' alt='direction'/>  \
    <div class='direction-label'>PETUNJUK ARAH</div> \
    <div class=' alamat-tempat'>"+location.ATRBEP02+"</div> \
    <div class=' email-tempat'>"+location.ATRBEP04+"</div> \
    <div class=' telepon-tempat'>"+location.ATRBEP03+"</div> \
    <div class=' jarak-tempat'>"+location.distance_in_km+" Km</div> \
    </div> </div> </li><br> ";
$('ul.list-alamat').append(string);
// });
}

function toggleHover(key){
toggleBounce(markers[key]);
}

function toggleBounce(mark) {
mark.setAnimation(google.maps.Animation.BOUNCE);
setTimeout(function(){ mark.setAnimation(null); }, 2250);
}
function getDirection(t){
var lat = $(t).data("lat");
var lng = $(t).data("lng");
var lat1 = $(t).data("lat1");
var lng1 = $(t).data("lng1");
var from = '';
var to = '';
from+=lat+','+lng;
to+=lat1+','+lng1;
Direction(from.toString(), to.toString());
}

function Direction(from, to) {
var directionsService = new google.maps.DirectionsService;
var directionsDisplay = new google.maps.DirectionsRenderer;
var map = new google.maps.Map(document.getElementById('map'), {
zoom: 7,
center: {lat: -6.282506, lng: 106.760984}
});
directionsDisplay.setMap(map);

calculateAndDisplayRoute(directionsService, directionsDisplay, from, to);
}

function calculateAndDisplayRoute(directionsService, directionsDisplay, from, to) {
directionsService.route({
  origin: from,
  destination: to,
travelMode: google.maps.TravelMode.DRIVING
}, function(response, status) {
if (status === google.maps.DirectionsStatus.OK) {
  // change routes
  var far = response.routes[0].legs[0].distance.value;
  var duration = response.routes[0].legs[0].duration.text;
  far = (far/1000).toFixed(1);
  var result = "<div class='btn btn-primary btn-sm' style='background-color:red;border-radius:0px;border: 1px solid red;' onClick='startGeolocation1()'>BACK</div><br><br>";
  var ui ="<div class='btn btn-primary btn-sm' style='background-color:red;border-radius:0px;border: 1px solid red;' onClick='startGeolocation1()'>BACK</div><br>";
  var result = result + "" + far + " Km - " + duration +"<br>";

  for (var i =0; i < response.routes[0].legs[0].steps.length; i++){
      result+=response.routes[0].legs[0].steps[i].instructions+"<br>"
  }

  $('ul.list-alamat').html(result+"<br>"+ui);
  directionsDisplay.setDirections(response);
} else {
  $('#alertModal #myModalLabel').html('Error');
  $('#alertModal .modal-body').html('Directions request failed due to ' + status);
  $('#alertModal').modal('show');
}
});
}

function startGeolocation1()
{
$('ul.list-alamat').html("");
startGeolocation();
}



/*
$(document).ready(function(){
$("#getKab").prop("disabled", false);
})
*/




//Tampilkan Propinsi
function formatState (state) {
if (!state.id) {
return state.text;
}
var state1 = state.text;
return state1;
};
function selection(state) {
return state.text;
}
function makeSelect2prop(data) {
$('#getProp').select2({
  data: data,
  placeholder : "Masukkan Kota Propinsi",
  width: '100%',
  templateSelection: selection,
  templateResult: formatState,
  escapeMarkup: function (state) {
      return state;
  },
});
}
$(document).ready(function(){
$.ajax({
type: "get",
dataType: "json",
async: true,
url: "https://weblib.wahana.com/Ajaxx/getProp",
success: function (data) {
  //console.log(data)

    makeSelect2prop(data);
}
});
})
$('#getProp').on('select2:select', function (e) {
var data = e.params.data;
$("#propID").val(data.id)
$("#propID").attr("data-name",data.text)

if ($("#propID").val() == "9471049272"){
  $("#singapore").removeAttr("style")
  $("#getSingapore").prop("disabled", "true")
  var h = 9471054522
  $("#dataTujuanSing").val(h)
  $("#s1").css("display", "none")
  $("#s2").css("display", "none")
  $("#s3").css("display", "none")
  $("#propID").val("")
  $("#kabID").val("")
  $("#kecID").val("")
  $("#kelID").val("")

  $("#kabID").attr("data-name","")
  $("#kecID").attr("data-name","")
  $("#kelID").attr("data-name","")
  $("#dataTujuanId").val("")
  $("#dataTujuanId").attr("data-name","")
  //$("#getProp").change(function(){
  function formatState (state) {
  if (!state.id) {
  return state.text;
  }
  var state1 = state.text;
  return state1;
  };
  function selection(state) {
  return state.text;
  }
  function makeSelect2sing(data) {
  $('#getSingapore').select2({
    data: data,
    allowClear:true,
    placeholder : "Masukkan Kota Singapore",
    width: '100%',
    templateSelection: selection,
    templateResult: formatState,
    escapeMarkup: function (state) {
        return state;
    },
  });
  }
  $(document).ready(function(){
  $.ajax({
  type: "get",
  dataType: "json",
  async: true,
  //data : "idKec="+$("#kabID").val(),
  //data : "idSing=9471054522",
  url: "https://weblib.wahana.com/Ajaxx/getKotaSingapore",
  success: function (data) {
    //console.log(data)

      makeSelect2sing(data);
  }
  });
  //})
  $('#getSingapore').on('select2:select', function (e) {
  var data = e.params.data;
  $("#dataTujuanId").val(data.id)
  $("#dataTujuanId").attr("data-name",data.text)
  });
  })
}else{
  $("#singapore").css("display", "none")
  $("#s1").removeAttr("style")
  $("#s2").removeAttr("style")
  $("#s3").removeAttr("style")
  $("#dataTujuanSing").val("")
}

});



  $("#getProp").change(function(){
    $(document).ready(function(){
      $("#getKab").empty()
      $("#getKab").html("<option>Pilih Kabupaten / Kota</option>")
    if ($("#propID").val() == "2222"){
      function formatState (state) {
      if (!state.id) {
      return state.text;
      }
      var state1 = state.text;
      return state1;
      };
      function selection(state) {
      return state.text;
      }
      function makeSelect2kab(data) {
      $('#getKab').select2({
        data: data,
        allowClear: true,
        placeholder : "Masukkan Kota Propinsi",
        width: '100%',
        templateSelection: selection,
        templateResult: formatState,
        escapeMarkup: function (state) {
            return state;
        },
      });
      }
      $(document).ready(function(){
      $.ajax({
      type: "post",
      dataType: "json",
      async: true,
      url: "https://weblib.wahana.com/Ajaxx/getKotaJabodetabek",
      success: function (data) {
        //console.log(data)

          makeSelect2kab(data);
      }
      });
      })
      $('#getKab').on('select2:select', function (e) {
      var data = e.params.data;
      $("#kabID").val(data.id)
      $("#kabID").attr("data-name",data.text)
      });
    }else{
      function formatState (state) {
      if (!state.id) {
      return state.text;
      }
      var state1 = state.text;
      return state1;
      };
      function selection(state) {
      return state.text;
      }
      function makeSelect2kab(data) {
      $('#getKab').select2({
        data: data,
        allowClear: true,
        placeholder : "Masukkan Kabupaten",
        width: '100%',
        templateSelection: selection,
        templateResult: formatState,
        escapeMarkup: function (state) {
            return state;
        },
      });
      }
      $(document).ready(function(){
      $.ajax({
      type: "post",
      dataType: "json",
      async: true,
      data : "idKab="+$("#propID").val(),
      url: "https://weblib.wahana.com/Ajaxx/getKab",
      success: function (data) {
        //console.log(data)

          makeSelect2kab(data);
      }
      });
      })
      $('#getKab').on('select2:select', function (e) {
      var data = e.params.data;
      $("#kabID").val(data.id)
      $("#kabID").attr("data-name",data.text)
      });
    }
  })
  })

  /*
  Beautiful your console
  */
  // Define your custom commands and emoji
  // Define your custom commands and emoji
var commands = [
  [ "myface", "😨"],
  [ "poop", "💩"]
];

(function() {
  if(!window.console) return;

  // Create custom commands
  commands.forEach(function(command) {
    window.console[command[0]] = function() {

      // Second argument is size, default is 11px
      var size = 11;
      if(arguments.length > 1) {
        size = [].pop.call(arguments);
      }

      // Get arguments as a string
      var args = Array.prototype.slice.call(arguments).toString().split(',').join(',');

      // Log to the console with emoji
      console.log("%c" + args + " " + command[1], "font-size: " + size + "px");
    }
  });
})();




//Function select2
function select2dropdown(id,placeHolder,typeAjax,dataTypeAjax,dataSend,url,tampungan){
  try{
  function formatState (state) {
  if (!state.id) {
  return state.text;
  }
  var state1 = state.text;
  return state1;
  };
  function selection(state) {
  return state.text;
  }
  function makeSelect2(data) {
  $(id).select2({
    data: data,
    allowClear:true,
    placeholder : placeHolder,
    width: '100%',
    templateSelection: selection,
    templateResult: formatState,
    escapeMarkup: function (state) {
        return state;
    },
  });
  }
  $(document).ready(function(){
  $.ajax({
  type: typeAjax,
  dataType: dataTypeAjax,
  allowClear:true,
  async: true,
  data : dataSend,
  url: url,
  success: function (data) {
    //console.log(data)

      makeSelect2(data);
  }
  });
  })
  $(id).on('select2:select', function (e) {
  var data = e.params.data;
  $(tampungan).val(data.id)
  $(tampungan).attr("data-name",data.text)
  });
}catch(err){
  console.log(err)
}
}


//Tampilkan Kec
$("#getKab").change(function(){
  //var t = select2dropdown("#getKec","Masukkan Kecamatan","post","json","idKec="+$("#kabID").val(),"https://weblib.wahana.com/Ajaxx/getKec","#kecID")
  $("#getKec").empty()
  $("#getKec").html("<option>Pilih Kecamatan</option>")
  $("#getProp").change(function(){
    $("#getKec").empty()
    $("#getKec").html("<option>Pilih Kecamatan</option>")
  })

function formatState (state) {
if (!state.id) {
return state.text;
}
var state1 = state.text;
return state1;
};
function selection(state) {
return state.text;
}
function makeSelect2kec(data) {
$('#getKec').select2({
  data: data,
  allowClear:true,
  placeholder : "Masukkan Kecamatan",
  width: '100%',
  templateSelection: selection,
  templateResult: formatState,
  escapeMarkup: function (state) {
      return state;
  },
});
}
$(document).ready(function(){
$.ajax({
type: "post",
dataType: "json",
allowClear:true,
async: true,
data : "idKec="+$("#kabID").val(),
url: "https://weblib.wahana.com/Ajaxx/getKec",
success: function (data) {
  //console.log(data)

    makeSelect2kec(data);
}
});
})
$('#getKec').on('select2:select', function (e) {
var data = e.params.data;
$("#dataTujuanId").val(data.id)
$("#dataTujuanId").attr("data-name",data.text)
});

})



/*
//Tampilkan Kel
$("#getKec").change(function(){
function formatState (state) {
if (!state.id) {
return state.text;
}
var state1 = state.text;
return state1;
};
function selection(state) {
return state.text;
}
function makeSelect2kel(data) {
$('#getKel').select2({
  data: data,
  allowClear:true,
  placeholder : "Masukkan Kota Propinsi",
  width: '100%',
  templateSelection: selection,
  templateResult: formatState,
  escapeMarkup: function (state) {
      return state;
  },
});
}
$(document).ready(function(){
$.ajax({
type: "post",
dataType: "json",
async: true,
data : "idKel="+$("#kecID").val(),
url: "https://weblib.wahana.com/Ajaxx/getKel",
success: function (data) {
  //console.log(data)
  console.log(data)
    makeSelect2kel(data);
}
});
})
$('#getKel').on('select2:select', function (e) {
var data = e.params.data;
$("#dataTujuanId").val(data.id)
$("#dataTujuanId").attr("data-name",data.text)
});
})
*/


function formatState (state) {
if (!state.id) {
return state.text;
}
var state1 = state.text;
return state1;
};
function selection(state) {
return state.text;
}
function makeSelect2(data) {
$('#calculateFrom').select2({
  data: data,
  placeholder : "Masukkan Kota Asal",
  width: '100%',
  templateSelection: selection,
  templateResult: formatState,
  escapeMarkup: function (state) {
      return state;
  },
});
}
$(document).ready(function(){
$.ajax({
type: "POST",
dataType: "json",
async: true,
url: "https://weblib.wahana.com/Ajaxx/getTariffNodeOriginNew",
success: function (data) {
  //console.log(data)
    makeSelect2(data);
}
});
})
$('#calculateFrom').on('select2:select', function (e) {
var data = e.params.data;
$("#dataAsalId").attr("data-id",data.id)
$("#dataAsalId").val(data.text)

});


//Reset Cek tarif

$(document).ready(function(){
  $(".makke").click(function(){
  $("#propID").val("")
  $("#kabID").val("")
  $("#kecID").val("")
  $("#kelID").val("")

  $("#propID").attr("data-name","")
  $("#kabID").attr("data-name","")
  $("#kecID").attr("data-name","")
  $("#kelID").attr("data-name","")

  //is gone
  $("#getKab").empty()
  $("#getKec").empty()
  $("#getKel").empty()
  $("#getProp").empty()

  $("#getProp").html("<option>Pilih Propinsi</option>")
  //Tampilkan Propinsi
  function formatState (state) {
  if (!state.id) {
  return state.text;
  }
  var state1 = state.text;
  return state1;
  };
  function selection(state) {
  return state.text;
  }
  function makeSelect2prop(data) {
  $('#getProp').select2({
    data: data,
    placeholder : "Masukkan Kota Propinsi",
    width: '100%',
    templateSelection: selection,
    templateResult: formatState,
    escapeMarkup: function (state) {
        return state;
    },
  });
  }
  $(document).ready(function(){
  $.ajax({
  type: "get",
  dataType: "json",
  async: true,
  url: "https://weblib.wahana.com/Ajaxx/getProp",
  success: function (data) {
    //console.log(data)

      makeSelect2prop(data);
  }
  });
  })
  $('#getProp').on('select2:select', function (e) {
  var data = e.params.data;
  $("#propID").val(data.id)
  $("#propID").attr("data-name",data.text)

  if ($("#propID").val() == "9471049272"){
    $("#singapore").removeAttr("style")
    $("#getSingapore").prop("disabled", "true")
    var h = 9471054522
    $("#dataTujuanSing").val(h)
    $("#s1").css("display", "none")
    $("#s2").css("display", "none")
    $("#s3").css("display", "none")
    $("#propID").val("")
    $("#kabID").val("")
    $("#kecID").val("")
    $("#kelID").val("")

    $("#kabID").attr("data-name","")
    $("#kecID").attr("data-name","")
    $("#kelID").attr("data-name","")
    $("#dataTujuanId").val("")
    $("#dataTujuanId").attr("data-name","")
    //$("#getProp").change(function(){
    function formatState (state) {
    if (!state.id) {
    return state.text;
    }
    var state1 = state.text;
    return state1;
    };
    function selection(state) {
    return state.text;
    }
    function makeSelect2sing(data) {
    $('#getSingapore').select2({
      data: data,
      allowClear:true,
      placeholder : "Masukkan Kota Singapore",
      width: '100%',
      templateSelection: selection,
      templateResult: formatState,
      escapeMarkup: function (state) {
          return state;
      },
    });
    }
    $(document).ready(function(){
    $.ajax({
    type: "get",
    dataType: "json",
    async: true,
    //data : "idKec="+$("#kabID").val(),
    //data : "idSing=9471054522",
    url: "https://weblib.wahana.com/Ajaxx/getKotaSingapore",
    success: function (data) {
      //console.log(data)

        makeSelect2sing(data);
    }
    });
    //})
    $('#getSingapore').on('select2:select', function (e) {
    var data = e.params.data;
    $("#dataTujuanId").val(data.id)
    $("#dataTujuanId").attr("data-name",data.text)
    });
    })

  }else{
    $("#singapore").css("display", "none")
    $("#s1").removeAttr("style")
    $("#s2").removeAttr("style")
    $("#s3").removeAttr("style")
    $("#dataTujuanSing").val("")
  }

  });
  })
  /*
  $("#getProp").change(function(){
    $("#getKab").empty()
    $("#getKec").empty()
    $("#getKel").empty()
  })
  */
})


function remove_duplicates_safe(arr) {
var seen = {};
var ret_arr = [];
for (var i = 0; i < arr.length; i++) {
  if (!(arr[i] in seen)) {
      ret_arr.push(arr[i]);
      seen[arr[i]] = true;
  }
}
return ret_arr;

}
$(document).ready(function(){
  $("#calculateTo").click(function(){
if ($("#dataAsalId").val().length == 0){
  swal({
    type: 'error',
    title: 'Oops...',
    html: 'Kota Asal Belum Diisi',
  })
  return false;
}

})
})
/*
      $('#calculateTo').keydown(function(e) {
            var from  = $("#dataAsalId").val();
            if(from.length == 0){
              swal({
                type: 'error',
                title: 'Oops...',
                html: 'Data Anda Belum Lengkap',
              })
                  return false;
                }
        });
*/


        function getDataOrigin(callback){
            $.post("https://weblib.wahana.com/Ajaxx/getTariffNodeOriginNew", {}, function(data){
                // console.log(data);
                callback(data);
            });
        }

        // alert(getDataOrigin(returnData));

        function autoCompletee(){
          getDataOrigin(function(data1) {
          data=JSON.parse(data1);
          var dataArray = $.map(data, function(value, key) {
            return {
              value: value,
              data: key
            };
          });
/*
          $('#calculateFrom').autocomplete({
            minChars: 3,
            deferRequestBy: 250,
            noCache : true,
            lookup: dataArray,
            onSelect: function (suggestion) {
                $("#dataAsalId").val(suggestion.data);
            }
          });
*/
          var options, a;

          $('#calculateTo').autocomplete({
              noCache : true,
              minChars: 3,
              dataType : "json",
              deferRequestBy: 250,
              serviceUrl: "https://weblib.wahana.com/Ajaxx/getTariffNodeDestinationNew",
              params: {
                  'originNodeId': function() {
                      return $('#dataAsalId').attr("data-id");
                  },
                  'constraint': function() {
                      return $('#calculateTo').val();
                  },
                  'service': function() {
                      return 7
                  }
              },
              transformResult: function(response) {

               if(response.length ==0){

              var service =7;
              var dataAsal  = $("#calculateFrom").val();
              var dataTujuan  = $("#calculateTo").val();

              if(service=='7'){
                servicekirim='Normal';
              }else if(service=='5'){
                servicekirim='Prioritas';
              }else{
                 servicekirim='Khusus';
              }

                // $('#alertModal .modal-body').html('Kota Asal  Tujuan Tidak Tersedia');
                // $('#alertModal').modal('show');


               }else{
                  return {
                      suggestions: $.map(response, function(value, key) {
                        return {
                          value: value,
                          data: key
                        };
                      })
                  };
                }
              },
              onSelect: function (suggestion) {
                  $("#dataTujuanId").val(suggestion.data);
              }
          });
          });
        }
        autoCompletee();
        function clearcalculate(){
          $("#dataAsalId").val('');
          $("#dataTujuanId").val('');
          $("#calculateTo").val('');
          $("#calculateFrom").val('');
          $("#calculateWeight").val('');

          $("#calculateLength").val('');
          $("#calculateWidth").val('');
          $("#calculateHeight").val('');


        }


        function calculate(){
        var from 	= $("#dataAsalId").attr("data-id");
        var to 		= $("#dataTujuanId").val();
        var wide 	= $("#calculateWide").val();
        var height 	= $("#calculateHeight").val();
        var weight 	= $("#calculateWeight").val();
        var length 	= $("#calculateLength").val();
        var dataAsal 	= $("#dataAsalId").val();
        var kecID = $("#dataTujuanId").val()
        var singapore = $("#dataTujuanSing").val()
        var dataTujuan 	= $("#propID").attr("data-name")+","+$("#kabID").attr("data-name")+","+$("#dataTujuanId").attr("data-name")
        var service =$("#service").val();
        if ($("#dataTujuanSing").val() == 9471054522){
          dataTujuan = $("#propID").attr("data-name")
        }

        if(service=='7'){
        servicekirim='Normal';
        }else if(service=='5'){
        servicekirim='Prioritas';
        }else{
        servicekirim='Khusus';
        }

        var pesan_error = []
        var ll = false
        var getTotal = length * wide * height / 6000
        if (weight > 50){
          pesan_error.push("<p>Berat Tidak Boleh Lebih Dari <b>50 Kg</b></p>")
          ll = true
        }
        if (length > 180){
          pesan_error.push("<p>Panjang Tidak Boleh Lebih Dari <b>180 CM</b></p>")
          ll = true
        }
        if ( wide > 180 ){
          pesan_error.push("<p>Lebar Tidak Boleh Lebih Dari <b>180 CM</b></p>")
          ll = true
        }
        if (height > 180){
          pesan_error.push("<p>Tinggi Tidak Boleh Lebih Dari <b>180 CM</b></p></p>")
          ll = true
        }
        if (getTotal > 80){
          pesan_error.push("<p>Berat Volumetrik Tidak Boleh Lebih Dari <b>80 Kg</b></p>")
          ll = true
        }
        if (ll == true){
          swal({
            type: 'error',
            title: 'Oops...',
            html: " "+pesan_error.join('\n')+" ",
          })

          return false;
        }

        if ($("#dataTujuanSing").val() == 9471054522 && weight > 30){
          swal({
            type: 'error',
            title: 'Oops...',
            html: '<b>Untuk Tujuan Singapore Berat Tidak Boleh Lebih Dari 30 Kg</b>',
          })
          console.log("31")
        return false;
        }
        if(weight.length == 0 || from.length == 0 || dataAsal.length == 0){
          swal({
            type: 'error',
            title: 'Oops...',
            html: '<b>Data Anda Belum Lengkap </b>',
          })
        return false;
        }
$.ajax({
  url: "https://weblib.wahana.com/Ajaxx/getTarifHomeNew2",
  type: "post",
  data :   {'from':from, 'to':to,'height':height,'weight':weight,'length':length,'dataAsal':dataAsal,'dataTujuan':dataTujuan, 'wide':wide,'service':service, 'kecID':kecID, 'singaporeID':singapore },
  beforeSend : function(){
    $("#spinnercek").removeClass("hidden")
    $("#cek").addClass("disabled")
  },
  success : function(data){
    if (data != 0) {
      //console.log(dataTujuan)
      //console.log(from)
      //console.log(parseInt(getTotal))
      $("#exampleModal").modal("show")
        $('#first-visible').html(data);
        $("#uv").val(length+"x"+wide+"x"+height)
        var bv
        if (parseInt(getTotal) < 1){
          $("#bv").val(parseInt(1))
          bv = parseInt(1)
        }else{
            $("#bv").val(parseInt(getTotal))
            bv = parseInt(getTotal)
        }
        if (bv < weight){
          //var e = numeral(parseInt(weight) * parseInt($("#hpg").attr("data-number"))).format('0,0')
          //$("#th").val(e)
          //$("#ket").html("* Berat yang digunakan adalah <span class='text-red'>Berat Timbangan</span>")
          $("#ket").html("* Tarif Dihitung Berdasarkan <span class='text-red'>Berat</span>")
        }else if(bv > weight){
          //r = numeral(parseInt(getTotal) * parseInt($("#hpg").attr("data-number"))).format('0,0')
          //$("#th").val(r)
          //$("#ket").html("* Berat yang digunakan adalah <span class='text-red'>Berat Volumetrik</span>")
          $("#ket").html("* Tarif Dihitung Berdasarkan <span class='text-red'>Dimensi</span>")
        }else if (weight == bv){
          //$("#th").val($("#tf").val())
          $("#ket").html("* Tarif Dihitung Berdasarkan <span class='text-red'>Berat</span>")
        }

        $("#bkg").val(weight)

      }
      else {
        swal({
          type: 'error',
          title: 'Oops...',
          html: "Layanan Tidak Tersedia",
        })

      }
      $("#spinnercek").addClass("hidden")
      $("#cek").removeClass("disabled")
  }
})
/*
        $.post( "https://weblib.wahana.com/Ajaxx/getTarifHomeNew",
        {'from':from, 'to':to,'height':height,'weight':weight,'length':length,'dataAsal':dataAsal,'dataTujuan':dataTujuan, 'wide':wide,'service':service },
            function() {}).done(function(data){
              if (data != 0) {

                console.log(dataTujuan)
                console.log(from)
                $("#exampleModal").modal("show")
                $("#bv").val(height)
                $("#uv").val(wide+"x"+length+"x"+weight)
                  $('#first-visible').html(data);
                }
                else {
                  alert("Layanan tidak tersedia")
                  console.log(dataAsal)
                  console.log(from)
                }
        })
*/
        }
        // reset calculate
        function resetCalculate(){
        $.get("https://weblib.wahana.com/Ajaxx/resetCalculate", { }, function(data) {
        $('#first-visible').html(data);
        autoCompletee();
        });
        }



// ajax lacak pengiriman
// ajax lacak pengiriman
function trackShiping(){
      var ttk   = $("#ttk").val();
      var t;
      if(ttk.length == 0){
       alert('data anda belum lengkap!');
       return false;
      }
      t = ttk
      regexnya = new RegExp('^[a-zA-Z0-9 ,.-]+$')
      if (!regexnya.test(t)){
        swal({
          type: 'error',
          title: 'Oops...',
          html: '<b>Masukkan Resi Yang Valid Dan Dipisah Dengan Spasi</b>',
        })
        return false
      }
      var chara_split
      chara_split = t.split(/\.|-|,|=|~|\s/)
      var i;
      var data;
var b = 0
      var stat_resi = false
      var err_resi = []
      for (i=0; i < chara_split.length; i++){
      if (chara_split.length > 10){
        swal({
          type: 'error',
          title: 'Oops...',
          html: 'Nomor Resi Tidak Boleh Dari 10',
        })
        return false;
      }
      $.ajax({
        url : "https://weblib.wahana.com/index.php/Ajaxx/getTtkNew2",
        type: "post",
        data : 'ttk='+ ttk,
        success: function(data){

          $("#modalTracking").modal("show")
          $('#tab-tracking').tab("show");
          $(".modal-body-track").html(data)
          $("#mass").attr("src","data:image/png;base64,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AAAAAAAAAAAAAAAANCJ0AAAAAAAAAAAAAAAAAAAAGhE6AAAAAAAAAAAAAAAAAAAAjQgdAAAAAAAAAAAAAAAAAACARoQOAAAAAAAAAAAAAAAAAABAI0IHAAAAAAAAAAAAAAAAAACgEaEDAAAAAAAAAAAAAAAAAADQiNABAAAAAAAAAAAAAAAAAABoROgAAAAAAAAAAAAAAAAAAAA0InQAAAAAAAAAAAAAAAAAAAAaEToAAAAAAAAAAAAAAAAAAACNCB0AAAAAAAAAAAAAAAAAAIBGhA4AAAAAAAAAAAAAAAAAAEAjQgcAAAAAAAAAAAAAAAAAAKARoQMAAAAAAAAAAAAAAAAAANCI0AEAAAAAAAAAAAAAAAAAAGhE6AAAAAAAAAAAAAAAAAAAADQidAAAAAAAAAAAAAAAAAAAABoROgAAAAAAAAAAAAAAAAAAAI0IHQAAAAAAAAAAAAAAAAAAgEaEDgAAAAAAAAAAAAAAAAAAQCNCBwAAAAAAAAAAAAAAAAAAoBGhAwAAAAAAAAAAAAAAAAAA0IjQAQAAAAAAAAAAAAAAAAAAaEToAAAAAAAAAAAAAAAAAAAANCJ0AAAAAAAAAAAAAAAAAAAAGhE6AAAAAAAAAAAAAAAAAAAAjQgdAAAAAAAAAAAAAAAAAACARoQOAAAAAAAAAAAAAAAAAABAI0IHAAAAAAAAAAAAAAAAAACgEaEDAAAAAAAAAAAAAAAAAADQiNABAAAAAAAAAAAAAAAAAABoROgAAAAAAAAAAAAAAAAAAAA0InQAAAAAAAAAAAAAAAAAAAAaEToAAAAAAAAAAAAAAAAAAACNCB0AAAAAAAAAAAAAAAAAAIBGhA4AAAAAAAAAAAAAAAAAAEAjQgcAAAAAAAAAAAAAAAAAAKARoQMAAAAAAAAAAAAAAAAAANCI0AEAAAAAAAAAAAAAAAAAAGhE6AAAAAAAAAAAAAAAAAAAADQidAAAAAAAAAAAAAAAAAAAABoROgAAAAAAAAAAAAAAAAAAAI0IHQAAAAAAAAAAAAAAAAAAgEaEDgAAAAAAAAAAAAAAAAAAQCNCBwAAAAAAAAAAAAAAAAAAoBGhAwAAAAAAAAAAAAAAAAAA0IjQAQAAAAAAAAAAAAAAAAAAaEToAAAAAAAAAAAAAAAAAAAANCJ0AAAAAAAAAAAAAAAAAAAAGhE6AAAAAAAAAAAA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AAAASCJ0AAAAAAAAAAAAAAAAAAAAkggdAAAAAAAAAAAAAAAAAACAJEIHAAAAAAAAAAAAAAAAAAAgidABAAAAAAAAAAAAAAAAAABIInQAAAAAAAAAAAAAAAAAAACSCB0AAAAAAAAAAAAAAAAAAIAkQgcAAAAAAAAAAAAAAAAAACCJ0AEAAAAAAAAAAAAAAAAAAEgidAAAAAAAAAAAAAAAAAAAAJIIHQAAAAAAAAAAAAAAAAAAgCRCBwAAAAAAAAAAAAAAAAAAIInQAQAAAAAAAAAAAAAAAAAASCJ0AAAAAAAAAAAAAAAAAAAAkggdAAAAAAAAAAAAAAAAAACAJEIHAAAAAAAAAAAAAAAAAAAgidABAAAAAAAAAAAAAAAAAABIInQAAAAAAAAAAAAAAAAAAACSCB0AAAAAAAAAAAAAAAAAAIAkQgcAAAAAAAAAAAAAAAAAACCJ0AEAAAAAAAAAAAAAAAAAAEgidAAAAAAAAAAAAAAAAAAAAJIIHQAAAAAAAAAAAAAAAAAAgCRCBwAAAAAAAAAAAAAAAAAAIInQAQAAAAAAAAAAAAAAAAAASCJ0AAAAAAAAAAAAAAAAAAAAkggdAAAAAAAAAAAAAAAAAACAJEIHAAAAAAAAAAAAAAAAAAAgidABAAAAAAAAAAAAAAAAAABIInQAAAAAAAAAAAAAAAAAAACSCB0AAAAAAAAAAAAAAAAAAIAkQgcAAAAAAAAAAAAAAAAAACCJ0AEAAAAAAAAAAAAAAAAAAEgidAAAAAAAAAAAAAAAAAAAAJIIHQAAAAAAAAAAAAAAAAAAgCRCBwAAAAAAAAAAAAAAAAAAIInQAQAAAAAAAAAAAAAAAAAASCJ0AAAAAAAAAAAAAAAAAAAAkggdAAAAAAAAAAAAAAAAAACAJEIHAAAAAAAAAAAAAAAAAAAgidABAAAAAAAAAAAAAAAAAABIInQAAAAAAAAAAAAAAAAAAACSCB0AAAAAAAAAAAAAAAAAAIAkQgcAAAAAAAAAAAAAAAAAACCJ0AEAAAAAAAAAAAAAAAAAAEgidAAAAAAAAAAAAAAAAAAAAJIIHQAAAAAAAAAAAAAAAAAAgCRCBwAAAAAAAAAAAAAAAAAAIInQAQAAAAAAAAAAAAAAAAAASCJ0AAAAAAAAAAAAAAAAAAAAkggdAAAAAAAAAAAAAAAAAACAJEIHAAAAAAAA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")
          //$("#nav-home-tab [href='#tab0']").addClass("active show")
          $(".tab-content #tab0").addClass("active show")
          $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            e.preventDefault();

            var ref = $(this).attr('href').replace('#', '');

            //$(".tab-content #"+ref).toggleClass('active show').siblings().removeClass('active show');

        });
          $('.modal-body .nav').tab("show");
          $("#spinnertrack").addClass("hidden")
          $("#track").removeClass("disabled")
        },
        beforeSend: function(){
          $("#spinnertrack").removeClass("hidden")
          $("#track").addClass("disabled")
        }
      })
      /*
       $.post( "https://weblib.wahana.com/index.php/Ajaxx/getTtkNew",
           {'ttk':chara_split[i] },
               function() {}).done(function(data){
                 if (data != 0) {

                            var mapObj = {
                             "Delivered":"Terkirim",
                             'No TTK':"No Resi",
                             "Date":"Tanggal",
                             "Received by" : "Diterima Oleh",
                             "From":"Dari",
                             "To":"Ke",
                             //Replace day
                             "Monday": "Senin",
                             "Tuesday": "Selasa",
                             "Wednesday": "Rabu",
                             "Thursday":"Kamis",
                             "Friday": "Jumat",
                             "Saturday": "Sabtu",
                             "Sunday": "Minggu",
                          };
                          str = data.replace(/Delivered|No TTK|Date|From|To|Received by|Thursday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday/gi, function(matched){
                            return mapObj[matched];
                          });
                   $("#modalTracking").modal("show");
                   ups = '<a class="nav-item nav-link" id="nav-home-tab" data-toggle="tab" href="#nav'+b+'" role="tab" aria-controls="nav-home" aria-selected="true">'+chara_split[b]+'</a>'
                   cont = '<div class="tab-pane fade" id="nav'+b+'" role="tabpanel" aria-labelledby="nav-profile-tab">'+str+'</div>'
                   $("#nav-tab").append(ups)
                   $("#nav-tabContent").append(cont)

                   $('a[href="#nav0"]').addClass('active show');
                   $('div[id="nav0"]').addClass('active show');
                   b++
                 }
                 else {

                  alert("Resi Tidak Valid")
                 }
       })
       */
      }
      $("#nav-tab").empty()
      $("#nav-tabContent").empty()

      if (stat_resi == true){
        alert("Nomo resi anda salah")
      }
}



var myLatLng = {lat: -6.282462,lng: 106.761225}
function renderMap() {

  var map = new google.maps.Map(document.getElementById('mapss'), {
zoom: 15,
center: myLatLng
});
var markerPusat = {
url: 'https://weblib.wahana.com/assets/images/wahana/pusat2.png', // url
scaledSize: new google.maps.Size(40, 40), // scaled size
};
var marker = new google.maps.Marker({
position: myLatLng,
map: map,
icon : markerPusat
});
    }

 google.maps.event.addDomListener(window, 'load', renderMap);

 $(document).ready(function(){
   $("#getDir").attr("href","https://www.google.com/maps?saddr=Current+Location&daddr="+myLatLng['lat']+','+myLatLng['lng'])

 })


$(document).ready(function(){
$("#btnSave2").click(function() {
    html2canvas($("#widget"), {
      onrendered: function(canvas) {
        saveAs(canvas.toDataURL(), 'canvas.png');
      }
    });
  });
$("#masss").attr("src","data:image/png;base64,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AAAAAAAAAAAAAAAANCJ0AAAAAAAAAAAAAAAAAAAAGhE6AAAAAAAAAAAAAAAAAAAAjQgdAAAAAAAAAAAAAAAAAACARoQOAAAAAAAAAAAAAAAAAABAI0IHAAAAAAAAAAAAAAAAAACgEaEDAAAAAAAAAAAAAAAAAADQiNABAAAAAAAAAAAAAAAAAABoROgAAAAAAAAAAAAAAAAAAAA0InQAAAAAAAAAAAAAAAAAAAAaEToAAAAAAAAAAAAAAAAAAACNCB0AAAAAAAAAAAAAAAAAAIBGhA4AAAAAAAAAAAAAAAAAAEAjQgcAAAAAAAAAAAAAAAAAAKARoQMAAAAAAAAAAAAAAAAAANCI0AEAAAAAAAAAAAAAAAAAAGhE6AAAAAAAAAAAAAAAAAAAADQidAAAAAAAAAAAAAAAAAAAABoROgAAAAAAAAAAAAAAAAAAAI0IHQAAAAAAAAAAAAAAAAAAgEaEDgAAAAAAAAAAAAAAAAAAQCNCBwAAAAAAAAAAAAAAAAAAoBGhAwAAAAAAAAAAAAAAAAAA0IjQAQAAAAAAAAAAAAAAAAAAaEToAAAAAAAAAAAAAAAAAAAANCJ0AAAAAAAAAAAAAAAAAAAAGhE6AAAAAAAAAAAAAAAAAAAAjQgdAAAAAAAAAAAAAAAAAACARoQOAAAAAAAAAAAAAAAAAABAI0IHAAAAAAAAAAAAAAAAAACgEaEDAAAAAAAAAAAAAAAAAADQiNABAAAAAAAAAAAAAAAAAABoROgAAAAAAAAAAAAAAAAAAAA0InQAAAAAAAAAAAAAAAAAAAAaEToAAAAAAAAAAAAAAAAAAACNCB0AAAAAAAAAAAAAAAAAAIBGhA4AAAAAAAAAAAAAAAAAAEAjQgcAAAAAAAAAAAAAAAAAAKARoQMAAAAAAAAAAAAAAAAAANCI0AEAAAAAAAAAAAAAAAAAAGhE6AAAAAAAAAAAAAAAAAAAADQidAAAAAAAAAAAAAAAAAAAABoROgAAAAAAAAAAAAAAAAAAAI0IHQAAAAAAAAAAAAAAAAAAgEaEDgAAAAAAAAAAAAAAAAAAQCNCBwAAAAAAAAAAAAAAAAAAoBGhAwAAAAAAAAAAAAAAAAAA0IjQAQAAAAAAAAAAAAAAAAAAaEToAAAAAAAAAAAAAAAAAAAANCJ0AAAAAAAAAAAAAAAAAAAAGhE6AAAAAAAAAAAA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AAAASCJ0AAAAAAAAAAAAAAAAAAAAkggdAAAAAAAAAAAAAAAAAACAJEIHAAAAAAAAAAAAAAAAAAAgidABAAAAAAAAAAAAAAAAAABIInQAAAAAAAAAAAAAAAAAAACSCB0AAAAAAAAAAAAAAAAAAIAkQgcAAAAAAAAAAAAAAAAAACCJ0AEAAAAAAAAAAAAAAAAAAEgidAAAAAAAAAAAAAAAAAAAAJIIHQAAAAAAAAAAAAAAAAAAgCRCBwAAAAAAAAAAAAAAAAAAIInQAQAAAAAAAAAAAAAAAAAASCJ0AAAAAAAAAAAAAAAAAAAAkggdAAAAAAAAAAAAAAAAAACAJEIHAAAAAAAAAAAAAAAAAAAgidABAAAAAAAAAAAAAAAAAABIInQAAAAAAAAAAAAAAAAAAACSCB0AAAAAAAAAAAAAAAAAAIAkQgcAAAAAAAAAAAAAAAAAACCJ0AEAAAAAAAAAAAAAAAAAAEgidAAAAAAAAAAAAAAAAAAAAJIIHQAAAAAAAAAAAAAAAAAAgCRCBwAAAAAAAAAAAAAAAAAAIInQAQAAAAAAAAAAAAAAAAAASCJ0AAAAAAAAAAAAAAAAAAAAkggdAAAAAAAAAAAAAAAAAACAJEIHAAAAAAAAAAAAAAAAAAAgidABAAAAAAAAAAAAAAAAAABIInQAAAAAAAAAAAAAAAAAAACSCB0AAAAAAAAAAAAAAAAAAIAkQgcAAAAAAAAAAAAAAAAAACCJ0AEAAAAAAAAAAAAAAAAAAEgidAAAAAAAAAAAAAAAAAAAAJIIHQAAAAAAAAAAAAAAAAAAgCRCBwAAAAAAAAAAAAAAAAAAIInQAQAAAAAAAAAAAAAAAAAASCJ0AAAAAAAAAAAAAAAAAAAAkggdAAAAAAAAAAAAAAAAAACAJEIHAAAAAAAAAAAAAAAAAAAgidABAAAAAAAAAAAAAAAAAABIInQAAAAAAAAAAAAAAAAAAACSCB0AAAAAAAAAAAAAAAAAAIAkQgcAAAAAAAAAAAAAAAAAACCJ0AEAAAAAAAAAAAAAAAAAAEgidAAAAAAAAAAAAAAAAAAAAJIIHQAAAAAAAAAAAAAAAAAAgCRCBwAAAAAAAAAAAAAAAAAAIInQAQAAAAAAAAAAAAAAAAAASCJ0AAAAAAAAAAAAAAAAAAAAkggdAAAAAAAAAAAAAAAAAACAJEIHAAAAAAAA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")

});var commands = [
  [ "myface", "😊"],
  [ "poop", "💩"]
];

(function() {
  if(!window.console) return;

  // Create custom commands
  commands.forEach(function(command) {
    window.console[command[0]] = function() {

      // Second argument is size, default is 11px
      var size = 11;
      if(arguments.length > 1) {
        size = [].pop.call(arguments);
      }

      // Get arguments as a string
      var args = Array.prototype.slice.call(arguments).toString().split(',').join(',');

      // Log to the console with emoji
      console.log("%c" + args + " " + command[1], "font-size: " + size + "px");
    }
  });
})();

console.myface("Thanks", 50);
