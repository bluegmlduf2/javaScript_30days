let countdown;
const timerDisplay = document.querySelector('.display__time-left');// 남은 시간 표시할 곳
const endTime = document.querySelector('.display__end-time');// 끝나는 시간 표시할 곳
const buttons = document.querySelectorAll('[data-time]'); //각 버튼의 dom의 data-time에 초를 저장함

//타이머 메인함수
function timer(seconds) {
  // clear any existing timers
  clearInterval(countdown);//setInterval함수의 초기화

  const now = Date.now(); //반환형은 timeStamp
  const then = now + (seconds * 1000); //timeStamp + (입력한sec에 대한 timeStamp)
  displayTimeLeft(seconds);
  displayEndTime(then);

  //1초에 한번씩 동작
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    // check if we should stop it!
    if(secondsLeft < 0) {
      clearInterval(countdown);//남은 시간이 0초보다 적을때, 현재 setInterval이벤트를 종료
      return;
    }
    // display it
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60); //분
  const remainderSeconds = seconds % 60; //초
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`; //화면에 표시
  document.title = display; //탭의 제목에 남은시간 표시
  timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const adjustedHour = hour > 12 ? hour - 12 : hour; //24시간을 12시간제로 표시
  const minutes = end.getMinutes();
  endTime.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) { //document.dom의name.addEvent
  e.preventDefault();
  const mins = this.minutes.value;
  console.log(mins);
  timer(mins * 60);
  this.reset(); //inputBox 초기화 
});
