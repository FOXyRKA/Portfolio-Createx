if (document.querySelector(".video-block")) {
  const videoBlock = document.querySelector(".video-block");
  const video = videoBlock.querySelector("video");
  const playBtn = document.querySelector(".video-block__play");
  playBtn.addEventListener("click", () => {
    videoBlock.classList.add("video-block--playted");
    video.play();
    video.controls = true;
    playBtn.classList.add("video-block__play--playted");
  });
  video.onplay = function () {
    // console.log("Play");
  };
  video.onpause = function () {
    // console.log( "Stop" );
    // videoBlock.classList.remove("video-block--playted");
    // video.play();
    // video.controls = false;
    // playBtn.classList.remove("video-block__play--playted");
  };
}
