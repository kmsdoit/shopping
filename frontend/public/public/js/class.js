let icon_eyes = document.getElementById('icon_eyes');
let icon_eyes2 = document.getElementById('icon_eyes2');

window.onload = function(){  
  icon_eyes.onclick = function(){
    this.classList.toggle('active');
    
    if(icon_eyes.classList.contains('active')){
      this.classList.replace('fa-eye','fa-eye-slash')
      document.getElementById("user_password").setAttribute("type", "password")
    }else{
      this.classList.replace('fa-eye-slash','fa-eye')
      document.getElementById("user_password").setAttribute("type", "text")
    }

  } 
  
  icon_eyes2.onclick = function(){
    this.classList.toggle('active');
    
    if(icon_eyes2.classList.contains('active')){
      this.classList.replace('fa-eye','fa-eye-slash')
      document.getElementById("password_confirm").setAttribute("type", "password")
    }else{
      this.classList.replace('fa-eye-slash','fa-eye')
      document.getElementById("password_confirm").setAttribute("type", "text")
    }

  }

}
