function login(){
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    var url = document.getElementById("loginbutton").getAttribute('data-url');
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
