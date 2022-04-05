//모든 button 한번씩 눌러야 signup button 눌렀을때 동작하게
// let count = 0;
// count > 3
let user_password = document.getElementById("user_password")
let password_confirm = document.getElementById("password_confirm")
let user_email = document.getElementById("user_email")
let user_id = document.getElementById("user_id")
let user_name = document.getElementById("user_name")

  //스코프가 이해되어야 함 ㅜ value를 남발하지 않기 .. 
 //tab 키를 눌러서 email input으로 focus되었을 때 패스워드 확인하는 방법?

const confirmPw = () => {
  
  if( user_password.value == password_confirm.value){
    // 패스워드 확인 input hide
    // button도 hide (둘을 묶어서 하는게 좋을듯 )
    //user_email show + focus()
    user_email.focus();
  }else{
    alert('비밀번호가 일치하지 않습니다.')//나중에는 창 만들어야지
    user_password.value = '';
    user_password.focus();
    password_confirm.value = '';
  }

}



  const sendMail = async() => {

    let emailObj = {
      "user_email":user_email.value
    }

    let emailString = JSON.stringify(emailObj)//왜 stringify 쓰는지 알기
    // console.log(emailString)

    let url = "http://localhost:3000/api/AuthEmail"

    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },//json으로 보내줌
      body: emailString

    }).then(response => {return response.json();
      })
      .then(parsedRes => {console.log(parsedRes);
        alert("전송완료")
      });

    


  
    setTimeout(()=>{
        

        },180000);
    //setTimeout() 일정시간이 지난 후 특정 코드를 딱 1번 실행
  

  getElementById("send_mail_btn").innerHTML = "메일 재전송";
  }

const confirmMail = () => {
  
  //let mailing_num = fetch() 에서 받아야 함 ?!

  setInterval(() => {

    if( confirm_num == /* 전송된 6자리 숫자값 */){
    alert('인증완료');
    //전송버튼 어둡게 되고 안눌리게
    getElementById("confirm_num_btn").innerHTML = "인증완료"
    //확인버튼 어둡게 되고 안눌리게
    }else{
      alert('❌❌❌❌❌');
      confirm_num = '';
      confirm_num.focus();
    }

 

  },180000)
}
  


  

const submitSignUp = () => {
  
  const objectInfo = {
    "user_id" : user_id.value,
    "user_password" : user_password.value,
    "user_email" : user_email.value,
    "user_name" : user_name
  }
  // console.log(user_id.value)

  
  // console.log(objectInfo)

  //여기서 fetching?? post 방식

}


