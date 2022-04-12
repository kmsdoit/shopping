
let user_id = document.getElementById("user_id")
let user_password = document.getElementById("user_password")
let user_email = document.getElementById("user_email")
let user_name = document.getElementById("user_name")

// userNameParser

const submitSignIn = () => {
  //fetch post 방식 
  fetch("http://localhost:3000/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
      },
    body: JSON.stringify({
      "user_id": String(user_id.value),
      "user_password": String(user_password.value)
    })

  })
    .then((res) => res.json() )
    .then((resData) => {
      // console.log(resData);
      console.log(resData);JSON.stringify({
        "user_id": String(user_id),
        "user_password": String(user_password)
      })
    })
    .catch((err) => {
      console.log(JSON.stringify({
        "user_id": String(user_id),
        "user_password": String(user_password)
      }));
      alert("실패");

    });
  // result : ok 나와야 성공

}

//이메일 형식을 입력했는지
//숫자나 문자만 입력했는지
//비번에 영어 대문자가 들어있는지
//이런 것들을 검사 -> 정규식 이용


// 해야할일
// 1. yarn 설치
// 3000/api-docs

 // const infoArray = [
  //   {
  //     "id": user_id,
  //     "pw": user_password,
  //     "name": user_name,
  //     "email": user_email
  //   }
  // ]