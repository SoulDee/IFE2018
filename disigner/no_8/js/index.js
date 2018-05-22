var aAnimation = lottie.loadAnimation({
  container: document.getElementById("bm"), 
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'data.json'
});

aAnimation.play();