const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function calendar_builder(){
  var table = document.getElementById("calendar")
  table.innerHTML = ''
  var today = document.getElementById("today")
  var month = document.getElementById("month")
  var year = document.getElementById("year")
  var d = new Date();
  today.innerHTML = 'Today: '+d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear();
  if(month.value == -1 && year.value == 1969){
    month.value = d.getMonth();
    year.value = d.getFullYear();
  }
  else{
    d = new Date(year.value,month.value, 1)
  }
  var date = new Date(d.getFullYear(), d.getMonth(), 01)
  var day = date.getDay()
  var i
  var row = table.insertRow(0);
  var z=-(day) + 1;
  for(i=0; i<day; i++){
    var cell = row.insertCell(i);
    cell.innerHTML ='<i>' + new Date(d.getFullYear(), d.getMonth(), z).getDate() + '</i>';
    z++;
  }
  var k = 0;
  for(i=1; i<=new Date(d.getFullYear(), d.getMonth()+1, 0).getDate();i++){
    var y = new Date(d.getFullYear(), d.getMonth(), i)
    x = y.getDay()
    if(x==6){
      cell = row.insertCell(x)
      cell.innerHTML = '<b>' + y.getDate() + '</b>'
      k=k+1;
      row = table.insertRow(k);
    }
    else{
      cell = row.insertCell(x)
      cell.innerHTML ='<b>' + y.getDate() + '</b>'
    }
    cell.classList.add("text-primary")
  }
  var v = new Date(d.getFullYear(), d.getMonth()+1, 0).getDay()
  var l = 1;
  for(i=v+1; i<=6;i++){
    cell = row.insertCell(i);
    cell.innerHTML = '<i>' + l + '</i>';
    l=l+1;
  }
}

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

function dashboard_load_func(){
  calendar_builder()
  logged_check()
  profile_completion()
}

function other_load_func(){
  logged_check()
  profile_completion()
}

function profile_load_func(){
  logged_check()
  fetch_profile()
}

function logout_func(){
  if (confirm("Are you sure you want to logout?...")) {
    localStorage.removeItem('m-calendar-token');
    window.location.href = "/login";
  }
  else{
    return
  }
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
