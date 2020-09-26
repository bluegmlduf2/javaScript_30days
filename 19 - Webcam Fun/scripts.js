const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d'); //canvas에 이미지를 그리기 위해서 꼭 필요한 context객체
const record = document.querySelector('.record');
const snap = document.querySelector('.snap');


// var url=URL.createObjectURL(blob); //브라우저에 저장된 해당 blob(오디오,비디오,이미지)을 다운로드할수있는 URL을 생성한다.

/**
 * 전체적인 흐름
 * 웹캠 -> 비디오 -> 캔버스 -> 촬영버튼클릭 -> a태그>img태그생성 -> 다운로드
 */

//웹캠->비디오객체
function initVideo() {
    let = navigator.mediaDevices.getUserMedia({
            audio: false,
            video: true
        })
        .then(stream => {
            //console.log(stream);
            video.srcObject = stream; //웹캠에서 저장된 스트림 -> 비디오객체
            video.play();
            console.dir(video);
        })
        .catch(err =>
            console.error('카메라 접근 권한을 확인해주세요.', err)
        );
}

function videoToCanv() {
    let vWidth = video.videoWidth;
    let vHeight = video.videoHeight;
    canvas.width = vWidth;
    canvas.height = vHeight;

    //setTimeout()->해당초에 한번만 실행, setInterval() ->해당초의 간격으로 실행
    //0.016초에 한번씩 video->canvas로 이미지를 옮겨준다.
    setInterval(function () {
        //drawImage(이미지,시작점x,시작점y,넓이,높이).. 캔버스에 그려넣을 이미지 설정
        ctx.drawImage(video, 0, 0, vWidth, vHeight);
        let pixels = ctx.getImageData(0, 0, vWidth, vHeight); //캔버스에서 이미지를 픽셀형태로 가져온다.
        //console.log(pixels) //해당가져온 화면의 이미지가 pixel형태로 저장됨

        //pixels=redEffect(pixels);//붉은 필터 효과
        pixels=rgbSplit(pixels);
        
        ctx.putImageData(pixels, 0, 0);
    }, 16)

}
//사진찍기 버튼
function takePhoto(){
    //사진찍을때 나는 소리
    snap.currentTime=0; //소리 시작점 0으로 설정
    snap.play(); //소리 재생

    //사진저장
    let aTag=document.createElement('a');
    let data=canvas.toDataURL('image/jpeg')//DATA를 URL형식으로 저장한다. canvas안의 화면을 image형태로 저장하고 형식은 jpg다.
    aTag.href=data; 
    //여기까지 a태그 설정.

    aTag.setAttribute('download', 'yourPhoto');//다운로드시 파일명
    aTag.innerHTML = `<img src="${data}" alt="thumnailPhoto" />`;//a태그 내부에 섬네일이미지 태그를 넣어준다
    record.insertBefore(aTag, record.firstChild);//해당 record div에 완성된 데이터저장이 가능한 a태그를 삽입한다.

}

initVideo();

video.addEventListener('canplay', videoToCanv); //canplay 이벤트. video가 play되기 전에 발생




/**
 *  카메라 효과 이벤트
 */
function redEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        //저장된 이미지 화면은 총 1228800의 픽셀을 가진다. 하나의 픽셀마다 0~255의 RGB코드르 가진다.
        //예를들어 1번픽셀에서 254의 RGB코드를 받았다면 아래의 for문을 거치면 ->402가 된다
        pixels.data[i + 0] = pixels.data[i + 0] + 200; // RED
        pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // Blue
    }
    return pixels;
}

//픽셀의 위치를 바꾼다.
//예를들어 1번픽셀의 위치는 1번이다. 그러나 이를 -150 하여 RGB중 R을 150번째 이전의 픽셀위치로 변경하는것이다.
function rgbSplit(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i - 150] = pixels.data[i + 0]; // RED
        pixels.data[i + 500] = pixels.data[i + 1]; // GREEN
        pixels.data[i - 550] = pixels.data[i + 2]; // Blue
    }
    return pixels;
}

function greenScreen(pixels) {
    const levels = {};

    document.querySelectorAll('.rgb input').forEach((input) => {
        levels[input.name] = input.value;
    });

    for (i = 0; i < pixels.data.length; i = i + 4) {
        red = pixels.data[i + 0];
        green = pixels.data[i + 1];
        blue = pixels.data[i + 2];
        alpha = pixels.data[i + 3];

        if (red >= levels.rmin &&
            green >= levels.gmin &&
            blue >= levels.bmin &&
            red <= levels.rmax &&
            green <= levels.gmax &&
            blue <= levels.bmax) {
            // take it out!
            pixels.data[i + 3] = 0;
        }
    }

    return pixels;
}