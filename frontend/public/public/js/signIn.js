
  let user_id = document.getElementById("user_id")
  let user_password = document.getElementById("user_password")
  let user_email = document.getElementById("user_email")
  let user_name = document.getElementById("user_name")
userNameParser
  const submitSignIn = () => {
    //fetch post 방식 
    // result : ok 나와야 성공
    const infoArray = [
      {
        "id": user_id,
        "pw": user_password,
        "name": user_name,
        "email": user_email
      }
    ]
  }

//이메일 형식을 입력했는지
//숫자나 문자만 입력했는지
//비번에 영어 대문자가 들어있는지
//이런 것들을 검사 -> 정규식 이용


// 해야할일
// 1. yarn 설치
// 3000/api-docs 