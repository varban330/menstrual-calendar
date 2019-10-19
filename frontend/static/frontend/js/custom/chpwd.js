function password_validation(){
  var password = document.getElementById("newpassword").value;
  var btn = document.getElementById("chpwdbtn")
  if(password.length < 8){
    btn.disabled = true;
    return false;
  }
  else{
    btn.disabled = false;
    return true;
  }
}

function passwordcheck(){
  var password = document.getElementById("newpassword").value;
  var repassword = document.getElementById("repassword").value;

  if(repassword != ""){
    if(password != repassword){
      document.getElementById("checker").innerHTML = "Passwords don't match";
      document.getElementById("checker").style.color = "red";
      return false;
    }
    else{
      document.getElementById("checker").innerHTML = "Passwords match";
      document.getElementById("checker").style.color = "green";
      return true;
    }
  }
  else{
    document.getElementById("checker").innerHTML = "Re-Enter New Password ";
    document.getElementById("checker").removeAttribute("style")
    return false
  }
}

function change_password(){
    var password = document.getElementById("password").value;
    var newpassword = document.getElementById("newpassword").value;
    var repassword = document.getElementById("repassword").value;

    if(password_validation() == false){
      md.showNotification('top','center', 'danger', "Passwords doesn't match requirements");
      return
    }

    if(passwordcheck() == false){
      md.showNotification('top','center', 'danger', "Passwords don't match");
      return
    }

    var url = document.getElementById("chpwdbtn").getAttribute('data-url');
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
      password: password,
      new_password: newpassword
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
        md.showNotification('top','center', 'success', "Password Change Successful")
      }
      else{
        md.showNotification('top','center', 'danger', "Incorrect Password Entered")
      }
      return response.json();
    }).then(function(data) {
      console.log("Data is ok", data);
    }).catch(function(ex) {
      console.log("parsing failed", ex);
      console.log(url)
    });
}
