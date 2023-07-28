// var : 전역 변수 범위 또는 함수 범위
//       범위 내에서 업데이트 및 재선언 가능
// let : 블록 범위
//       범위 내에서 업데이트는 가능하지만 재선언은 불가능
// const : 블록 범위
//         범위 내에서 업데이트 및 재선언 불가능

//document.querySelector('#selectbox > option:checked'); // id를 기준으로, selectbox에서 현재 선택된 옵션 조회
//document.querySelector('#selectbox > option:checked').value; // id를 기준으로, selectbox에서 현재 선택된 옵션의 값(value) 조회
//document.querySelector('select[name="selectbox"] > option:checked').innerText; // name을 기준으로, selectbox에서 현재 선택된 옵션의 텍스트(text) 조회

function setClock(){ // 현재 시간 불러오기
    var dateInfo = new Date();
    var hour = modifyNumber(dateInfo.getHours());
    var min = modifyNumber(dateInfo.getMinutes());
    var sec = modifyNumber(dateInfo.getSeconds());
    var year = dateInfo.getFullYear();
    var month = dateInfo.getMonth()+1; //monthIndex를 반환해주기 때문에 1을 더해준다.
    var date = dateInfo.getDate();
    document.getElementById("time").innerHTML = hour + ":" + min  + ":" + sec;
    document.getElementById("date").innerHTML = year + "년 " + month + "월 " + date + "일";
}

function modifyNumber(time){ // 시간이 10 이하일 때 앞에 0을 붙이기
    if(parseInt(time)<10){
        return "0"+ time;
    }
    else
        return time;
}

window.onload = function(){ //창에 로드하여 붙이기
    setClock();
    setInterval(setClock,1000); //1초마다 setClock 함수 실행 | setInterval(반복 실행할 함수, 딜레이 시간)
    selectHour();
    selectMin();
    selectSec();
}

var balance = 100; //배터리 초기값
var battery = setInterval(function () { //1초마다 배터리 값 1씩 줄어듦
    balance -= 1;
    if(balance == 0){ //배터리 값이 0%가 되면 검은 화면으로 전환
        document.getElementById("balance").innerHTML = balance + "%";
        document.getElementById("balance").style.backgroundColor = "#000000";
        document.getElementById("body").style.backgroundColor = "#000000";
        clearInterval(battery);
    }
    else if(balance <= 20 && balance > 0){ // 배터리 값이 1~20%가 되면 배터리창 배경색이 빨간색으로 변화
        document.getElementById("balance").innerHTML = balance + "%";
        document.getElementById("balance").style.backgroundColor = "#FF0000";
    }
    else{ // 배터리 값이 100~21%일 때 배터리값 표시
        document.getElementById("balance").innerHTML = balance + "%";
    }
}, 1000);

//시 셀렉트박스
function selectHour(){ 
    var selectHourStart = 0;
    var selectHourEnd = 23;
    var selectHourOption = "";

    for(var selhour = selectHourStart ; selhour <= selectHourEnd; selhour++){
        if(selhour < 10){
            selectHourOption += "<option>" + "0" + selhour + "시" + "</option>";
        }
        else
            selectHourOption += "<option>" + selhour + "시" + "</option>";
    }
    document.getElementById("selhour").innerHTML = selectHourOption;
}

//분 셀렉트박스
function selectMin(){
    var selectMinStart = 0;
    var selectMinEnd = 59;
    var selectMinOption = "";

    for(var selmin = selectMinStart ; selmin <= selectMinEnd; selmin++){
        if(selmin < 10){
            selectMinOption += "<option>" + "0" + selmin + "분" + "</option>";
        }
        else
            selectMinOption += "<option>" + selmin + "분" + "</option>";
    }
    document.getElementById("selmin").innerHTML = selectMinOption;
}

//초 셀렉트 박스
function selectSec(){ 
    var selectSecStart = 0;
    var selectSecEnd = 59;
    var selectSecOption = "";

    for(var selsec = selectSecStart ; selsec <= selectSecEnd; selsec++){
        if(selsec < 10){
            selectSecOption += "<option>" + "0" + selsec + "초" + "</option>";
        }
        else
            selectSecOption += "<option>" + selsec + "초" + "</option>";
    }
    document.getElementById("selsec").innerHTML = selectSecOption;
}
//알람 시간 추가
function addAlarm(){
    if(document.getElementById("alarmlist").childElementCount < 3){ // 알람 리스트 자식의 수가 4개 미만이면
        var list = document.createElement('li'); // html 'li' 태그 만들기
        list.id = list;

        var delbtn = document.createElement('button');
        delbtn.type = 'button';
        delbtn.textContent= "삭제";
        delbtn.className = 'delbtn';

        list.innerHTML = document.querySelector('#selhour > option:checked').value + " " + document.querySelector('#selmin > option:checked').value + " "+ document.querySelector('#selsec > option:checked').value;
        list.appendChild(delbtn);
        alarmlist.appendChild(list);
    }
    else
    {
        alert('최대 3개의 알람을 설정할 수 있습니다.');
    }

    //삭제 버튼 이벤트 리스너
    delbtn.addEventListener('click', (event) => { 
        alarmlist.removeChild(event.currentTarget.parentNode)
    })
}