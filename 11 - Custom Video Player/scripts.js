/* Get Our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]'); /*1.querySelectorAll을 이용하여 속성명으로만 가져올수있음.*/
const ranges = player.querySelectorAll('.player__slider');

/* Build out functions */
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  /** 
   * 2. 자바스크립트 속성명 제어 :
   * 태그[속성명]=넣을값; 으로 설정가능
   * ex: vidioElement[name]='testVideoName';
   * 
   * 3. 자바스크립트 이벤트 트리거 :
   * 태그.이벤트명(); 
   * ex: clickElement.click();
   * */

  console.dir(video);
  console.dir(video['blur'])/** blur 이벤트 속성 */
  console.dir(video['click']())/**4. click 이벤트 속성으로 호출 후 실행*/
  console.dir(video['play'])
  /*5.해당태그의 이벤트를 가져옴.
    예를들어 클릭이벤트의 경우 on을 제외하고 가져오면됨, onclick->click이 됨.
   */
  video[method]();
  /*6. video[method] => video의 play속성을 가져온다.
   해당 속성의 함수를 실행 () */ 
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  console.log(icon);
  toggle.textContent = icon;
}

function skip() {
 video.currentTime += parseFloat(this.dataset.skip);/**7.데이터셋 태그사용 */
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

/* Hook up the event listeners */
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e)); /*2.mousedown이 참일 경우 scrub(e)함수를 실행함. */
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
