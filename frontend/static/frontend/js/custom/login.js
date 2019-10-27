var x;
document.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("loginbutton").click();
  }
});

function onSignIn(googleUser){
    var profile = googleUser.getBasicProfile();
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID: " + profile.getId());
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());
    console.log("ID Token: " + id_token);

    myData = {
      email:profile.getEmail(),
      id_token: id_token
    };

    var url = "/api/social-login/"

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

    fetch(url, {
      method: "post",
      credentials: "same-origin",
      headers: {
          "X-CSRFToken": getCookie("csrftoken"),
          "Accept": "application/json",
          "Content-Type": "application/json"
      },
      body: JSON.stringify(myData)
    }).then(function(response) {
      if(response.status == 200){
        snackbarfunc("Login Successful")
      }
      else{
        snackbarfunc("Error Logging In")
        signOut()
      }
      return response.json();
    }).then(function(data) {
      console.log("Data is ok", data);
      if("token" in data){
        window.localStorage.setItem('m-calendar-token', data.token);
        window.location.href = "/dashboard";
      }
    }).catch(function(ex) {
      console.log("parsing failed", ex);
      console.log(url)
    });
}

function login_load(){
  var t = window.localStorage.getItem('m-calendar-token');
  if(t){
      window.location.href = "/dashboard";
  }
  else{
    var body = document.getElementById('body')
    body.style.display = "block";
  }
}

function login(){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    var url = document.getElementById("loginbutton").getAttribute('data-url');
    var button = document.getElementById("loginbutton")
    olderhtml = button.innerHTML
    button.innerHTML = '<i class="fa fa-circle-o-notch fa-spin"></i>&nbsp;&nbsp;Wait'
    button.disabled = true

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
      password: password
    }
    fetch(url, {
      method: "post",
      credentials: "same-origin",
      headers: {
          "X-CSRFToken": getCookie("csrftoken"),
          "Accept": "application/json",
          "Content-Type": "application/json"
      },
      body: JSON.stringify(myData)
    }).then(function(response) {
      data = response.json();
      if(response.status == 200){
        snackbarfunc("Login Successful")
      }
      else{
        snackbarfunc("Incorrect Credentials")
      }
      button.innerHTML = olderhtml
      button.disabled = false
      return data;
    }).then(function(obj) {
      console.log("Data is ok",obj);
      if("token" in obj){
        window.localStorage.setItem('m-calendar-token', obj.token);
        window.location.href = "/dashboard";
      }
      // console.log("Data is ok",obj.status);
    }).catch(function(ex) {
      console.log("parsing failed", ex);
      console.log(url)
    });
}

function snackbarfunc(string) {
  // Get the snackbar DIV
  var x = document.getElementById("snackbar");
  x.innerHTML = string
  // Add the "show" class to DIV
  x.className = "show";

  // After 3 seconds, remove the show class from DIV
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}
