var pic_url = "string"

function setTableData(data){
  console.log(data)
  var fname = document.getElementById("fname_label");
  var lname = document.getElementById("lname_label");
  var ctime = document.getElementById("cycle_label");
  var ltime = document.getElementById("duration_label");
  fname.innerHTML = data["fname"]
  lname.innerHTML = data["lname"]
  ltime.innerHTML = data["ltime"]
  ctime.innerHTML = data["ctime"]
}

function previewFile() {
  var preview = document.getElementById('picture');
  var file    = document.getElementById('profile-pic').files[0];
  var reader  = new FileReader();

  reader.addEventListener("load", function () {
    preview.src = reader.result;
  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }
}

function fetch_profile(){
  var username = document.getElementById("username")
  var email = document.getElementById("email")
  var fname = document.getElementById("fname")
  var lname = document.getElementById("lname")
  var ctime = document.getElementById("ctime")
  var ltime = document.getElementById("ltime")
  var fileInput = document.getElementById("picture")
  // files is a FileList object (similar to NodeList)
  var url = "/api/profile/"
  var t = window.localStorage.getItem('m-calendar-token');
  if(t){
      var token = `Token ${t}`
  }
  else{
    md.showNotification('top','center', 'danger', "Sorry profile could'nt be fetched")
    return;
  }

  fetch(url, {
    method: "get",
    credentials: "same-origin",
    headers: {
        "Authorization": token,
    }
    }).then(function(response) {
    if(response.status != 200){
      md.showNotification('top','center', 'danger', "Sorry profile could'nt be fetched")
    }
    return response.json();
  }).then(function(data) {
    console.log("Data is ok", data);
    username.value = data["username"]
    email.value = data["email"]
    fname.value = data["fname"]
    lname.value = data["lname"]
    ltime.value = data["ltime"]
    ctime.value = data["ctime"]
    fileInput.src = data["profile_pic"]
    setTableData(data)
    // var cols = document.getElementsByClassName(bmd-label-floating);
    // for(i=0; i<cols.length; i++) {
    //   cols[i].style.top = -1rem;
    //   cols[i].style.left = 0;
    // }
  }).catch(function(ex) {
    console.log("parsing failed", ex);
    console.log(url)
  });
}


function update_profile(){
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var ctime = document.getElementById("ctime").value;
    var ltime = document.getElementById("ltime").value;
    var fileInput = document.getElementById("picture").getAttribute("src");

// files is a FileList object (similar to NodeList)
    var url = "/api/profile/"
    // var url = document.getElementById("update_profile_btn").getAttribute('data-url');
    function getCookie(name) {
      var cookieValue = null;
      if (document.cookie && document.cookie != '') {
          var cookies = document.cookie.split(';');
          for (var i = 0; i < cookies.length; i++) {
              var cookie = jQuery.trim(cookies[i]);
              // Does this cookie string begin with the name we want?
              if (cookie.substring(0, name.length + 1) == (name + '=')) {
                  cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                  break;
              }
          }
      }
      return cookieValue;
    }
    var myData = {
      username: username,
      email:email,
      fname:fname,
      lname:lname,
      ctime:ctime,
      ltime:ltime,
      profile:fileInput
    }

    var t = window.localStorage.getItem('m-calendar-token');
    if(t){
        var token = `Token ${t}`
    }
    else{
      return;
    }

    fetch(url, {
      method: "post",
      credentials: "same-origin",
      headers: {
          "Authorization": token,
          "X-CSRFToken": getCookie("csrftoken"),
          "Accept": "application/json",
          "Content-Type": "application/json"
      },
      body: JSON.stringify(myData)
    }).then(function(response) {
      if(response.status == 200){
        md.showNotification('top','center', 'success', "Update Successful")
      }
      else{
        md.showNotification('top','center', 'danger', "Sorry profile could'nt be updated")
      }
      return response.json();
    }).then(function(data) {
      console.log("Data is ok", data);
      setTableData(data);
    }).catch(function(ex) {
      console.log("parsing failed", ex);
      console.log(url)
    });
}

function hover(element) {
  pic_url = element.getAttribute('src')
  element.setAttribute('src', 'http://res.cloudinary.com/do8xzkgcs/image/upload/v1571930886/koybp47efnsldn1afztc.png');
}

function unhover(element) {
  element.setAttribute('src', pic_url);
}
