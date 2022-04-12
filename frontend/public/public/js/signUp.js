  let user_password = document.getElementById("user_password")
  let password_confirm = document.getElementById("password_confirm")
  let user_email = document.getElementById("user_email")
  let user_id = document.getElementById("user_id")
  let user_name = document.getElementById("user_name")

  const confirmPw = () => {

    if (user_password.value == password_confirm.value) {
      // 패스워드 확인 input hide
      // button도 hide (둘을 묶어서 하는게 좋을듯 )
      //user_email show + focus()
      document.getElementById("pwMsg").innerHTML = "비밀번호 일치"
      user_email.focus();
    } else {
      document.getElementById("pwMsg").innerHTML = "비밀번호 불일치"//나중에는 창 만들어야지
      user_password.value = '';
      user_password.focus();
      password_confirm.value = '';
    }

  }
  const sendMail = async () => {
    document.getElementById("timer").innerHTML = ""

    let emailObj = {
      "user_email": user_email.value
    }

    let url = "http://localhost:3000/api/AuthEmail"

    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailObj)

    }).then(response => {
      return response.json();//response 를 json 형태로 반환하겠다.
    })
      .then(parsedRes => {
        //console.log(parsedRes.number);
        alert("전송완료")
        let time = 180;
        let min = "";//분
        let sec = "";//초

        const timer = () => {
          setInterval(() => {
            min = parseInt(time / 60);//몫을 계산
            sec = time % 60; //나머지를 계산
            document.getElementById("timer").innerHTML = `${min}분 ${sec}초`;
            time--

            if (time < 0) {
              document.getElementById("timer").innerHTML = "시간초과";
              clearInterval; // setInterval 실행을 끝냄   
            }
            // setInterval 실행을 끝냄   
          }, 1000);
          
        }
        timer();


        setTimeout(() => {
          document.getElementById("send_mail_btn").innerHTML = "메일 재전송";
          document.getElementById("send_mail_btn").disabled = false;
        }, 180000);

        const confirmMailBtn = document.querySelector("#confirm_num_btn")

        confirmMailBtn.addEventListener('click', (e) => {
          if(document.querySelector("#confirm_num").value == Number(parsedRes.number)){
            alert('인증완료');
            //전송버튼 어둡게 되고 안눌리게
            getElementById("confirm_num_btn").innerHTML = "인증완료"
            //확인버튼 어둡게 되고 안눌리게
            }else{
              alert('인증번호가 일치하지 않습니다');
              confirm_num = '';
              confirm_num.focus();
            }

        });


      });
    //setTimeout() 일정시간이 지난 후 특정 코드를 딱 1번 실행

    document.getElementById("send_mail_btn").innerHTML = "already sent!"
    document.getElementById("send_mail_btn").disabled = true;
    // document.getElementById("send_mail_btn");

  }

  const submitSignUp = () => {
    let url = "http://localhost:3000/api/users/register"
    console.log(user_id.value)

    const objectInfo = {
      "user_id" : String(user_id.value),
      "user_password" : String(user_password.value),
      "user_name" : String(user_name.value),
      "user_email" : String(user_email.value)
    }

  fetch(url,{
    method: "POST",
    headers: {
      "Content-Type" : 'application/json',
    },
        body: JSON.stringify(objectInfo)
      }).then(response => response.json())
        .then(parsedRes => {
            console.log(parsedRes)
            alert("저장완료")
        }).catch((error) => {
            alert("실패");
            console.log(error)
        });
}
