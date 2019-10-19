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
