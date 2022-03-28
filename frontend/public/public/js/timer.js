  let time = 180;
  let min = "";//분
  let sec = "";//초
  setInterval(function(){
    min = parseInt( time / 60);//몫을 계산
    sec = time%60; //나머지를 계산

    document.getElementById("timer").innerHTML = `${min}분 ${sec}초` ;
    time--

    if(time<0){
      clearInterval; // setInterval 실행을 끝냄
      document.getElementById("timer").innerHTML = "시간초과";
    }    
  },1000);