function profile_completion(){
  var element = document.getElementById("profile_label")
  var url = "/api/profile-completion/"
  var t = window.localStorage.getItem('m-calendar-token');
  if(t){
      var token = `Token ${t}`
  }
  else{
    md.showNotification('top','center', 'danger', "Sorry.... Error Loading....")
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
      md.showNotification('top','center', 'danger', "Sorry.... Error Loading....")
    }
    return response.json();
  }).then(function(data) {
    console.log("Data is ok", data);
    element.innerHTML = data["value"] + "%"
  }).catch(function(ex) {
    console.log("parsing failed", ex);
    console.log(url)
  });
}

function load_func(){
  logged_check()
  profile_completion()
}

function profile_load_func(){
  logged_check()
  fetch_profile()
}

function logout_func(){
  localStorage.removeItem('m-calendar-token');
  window.location.href = "/login";
}

function logged_check(){
  var url = "/api/logged-in/";
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
  console.log("hello")
  var t = window.localStorage.getItem('m-calendar-token');
  if(t){
      var token = `Token ${t}`
  }
  else{
    window.location.href = "/login";
  }

  fetch(url, {
    method: "get",
    credentials: "same-origin",
    headers: {
        "Authorization": token,
    }
  }).then(function(response) {
    if(response.status == 200){
      var body = document.getElementById('body')
      body.style.display = "block";
      var loader = document.getElementById('preloader')
      loader.style.display = "none";
    }
    else{
      localStorage.removeItem('m-calendar-token');
      window.location.href = "/login";
    }
    return response.json();
  }).then(function(data) {
    console.log("Data is ok", data);
  }).catch(function(ex) {
    console.log("parsing failed", ex);
    console.log(url)
  });
}
