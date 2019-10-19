function passwordcheck(){
  var password = document.getElementById("password").value;
  var repassword = document.getElementById("repassword").value;

  if(repassword != ""){
    if(password != repassword){
      document.getElementById("checker").innerHTML = "highlight_off";
      document.getElementById("checker").style.color = "red";
      return false;
    }
    else{
      document.getElementById("checker").innerHTML = "done_all";
      document.getElementById("checker").style.color = "green";
      return true;
    }
  }
  else{
    document.getElementById("checker").innerHTML = "autorenew";
    document.getElementById("checker").removeAttribute("style")
    return false
  }
}

function register(){
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var repassword = document.getElementById("repassword").value;

    if(passwordcheck() == false){
      snackbarfunc("Passwords don't match");
      return
    }

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
      email: email,
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
      if(response.status == 200){
        snackbarfunc("Registration Successful")
      }
      else{
        snackbarfunc("Fill all Details Correctly")
      }
      return response.json();
    }).then(function(data) {
      console.log("Data is ok", data);
      window.localStorage.setItem('m-calendar-token', data.token);
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
