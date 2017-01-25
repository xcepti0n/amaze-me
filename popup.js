
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("linkbelowprice").addEventListener("click",  hideit);
});

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById("linkform").addEventListener("click",refresh_and_hide);
});
document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.local.get("key", function (obj) {
     // alert(JSON.stringify(obj.key));
      obj=obj.key;
      document.getElementById("divi1").innerHTML=obj.divi1.toString();
      document.getElementById("divi2").innerHTML=obj.divi2.toString();
      document.getElementById("divi3").innerHTML=obj.divi3.toString();
      document.getElementById("divi4").innerHTML=obj.divi4.toString();
      document.getElementById("i1").value=obj.i1.toString();
      document.getElementById("i2").value=obj.i2.toString();
      document.getElementById("i3").value=obj.i3.toString();
      document.getElementById("i4").value=obj.i4.toString();
    }); 
  //uploads the data into repective divs
  //alert("data cant be loaded right now\n Thank you for understanding");
});
function hideit(e){
var divform = document.getElementById("divform");
if (divform.style.display != 'none') {
      divform.style.display = 'none';
  }
  else {
      divform.style.display = 'block';
  }
}
function refresh_and_hide(e){

  for (i=1;i<5;i++)
  {
     var textfield=document.getElementById("i"+i);
     var divfield = document.getElementById("divi"+i);
     
      // req.open("GET","http://127.0.0.1:4000/q?url="+textfield.value , true);
      // req.send();
      var values;
      chrome.storage.local.get("key", function (obj) {
          values=obj["i"+i];
      });
      if(textfield.value && textfield.value!=values)
      {
        divfield.innerHTML=httpGet("http://127.0.0.1:4000/q?url="+textfield.value);
      }// defined above
      // Create the callback:
    //   req.onreadystatechange = function() {
    //   if (req.readyState != 4) return; // Not there yet
    //   if (req.status != 200) {
    //     // Handle request failure here...
    //     return;
    //   }
    //   // Request successful, read the response
    //   var resp = req.responseText;
    //   divfield.innerHTML=resp;
    //   alert(resp+"");
    //   // ... and use it as needed by your app.
    // }
  }
  
  saveChanges();
  hideit(e);
} 
function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send(null);
    var json_text=JSON.parse(xmlHttp.responseText);
    // alert(json_text.price);
    return json_text.title+"<br>"+json_text.type+" "+json_text.price;
}
function saveChanges() {
      // Get a value saved in a form.
      var divi1 = document.getElementById("divi1").innerHTML;
      var divi2 = document.getElementById("divi2").innerHTML;
      var divi3 = document.getElementById("divi3").innerHTML;
      var divi4 = document.getElementById("divi4").innerHTML;
      var i1=document.getElementById("i1").value;
      var i2=document.getElementById("i2").value;
      var i3=document.getElementById("i3").value;
      var i4=document.getElementById("i4").value;
      // Check that there's some code there.
      // Save it using the Chrome extension storage API.
      var jsonfile = {};
    jsonfile['key']= {'divi1': divi1,'divi2': divi2,
        'divi3': divi3,'divi4': divi4,'i1':i1,'i2':i2,'i3':i3,
        'i4':i4};
      chrome.storage.local.clear();  
      chrome.storage.local.set(jsonfile, function() {
        // Notify that we saved.
       // message('Settings saved');
     //  alert(JSON.stringify(jsonfile));
      });
     
    }

