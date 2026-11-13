// Subtitle data — timed captions
const subtitles = {
  video1: [
    { time: 0, text: "Let's pronounce the word: hat" },
    { time: 2, text: "Step 1 — /h/: breathe out gently" },
    { time: 5, text: "Step 2 — /æ/: open your mouth wide" },
    { time: 8, text: "Tongue forward and low. Lips relaxed." },
    { time: 11, text: "Step 3 — /t/: tongue tip taps behind upper teeth" },
    { time: 13, text: "All together — hat!" },
    { time: 14, text: "Great job!" }
  ],
  video2: [
    { time: 0, text: "Side view — watch the jaw move" },
    { time: 2, text: "Start with mouth closed — /h/" },
    { time: 4, text: "Open wide for /æ/ — jaw drops down" },
    { time: 8, text: "Notice the tongue stays low and forward" },
    { time: 11, text: "Raise tongue tip to finish — /t/" },
    { time: 14, text: "/h/ + /æ/ + /t/ = hat" }
  ],
  video3: [
    { time: 0, text: "Close-up — watch the lips and jaw" },
    { time: 2, text: "/h/ — lips relaxed, slightly apart" },
    { time: 4, text: "/æ/ — mouth opens wide, lips NOT rounded" },
    { time: 8, text: "This is NOT a smile — just open and relaxed" },
    { time: 11, text: "/t/ — tongue tip touches the top of your mouth" },
    { time: 14, text: "Try it with me: hat" }
  ]
};

// Step-by-step timing per video
const stepTimings = {
  video1: [
    { step: 1, time: 0 },
    { step: 2, time: 3 },
    { step: 3, time: 10 },
    { step: 4, time: 13 }
  ],
  video2: [
    { step: 1, time: 0 },
    { step: 2, time: 3 },
    { step: 3, time: 10 },
    { step: 4, time: 13 }
  ],
  video3: [
    { step: 1, time: 0 },
    { step: 2, time: 3 },
    { step: 3, time: 10 },
    { step: 4, time: 13 }
  ]
};

// Elements
const video = document.getElementById('main-video');
const subtitleText = document.getElementById('subtitle-text');
const tabButtons = document.querySelectorAll('.tab-btn');
const steps = document.querySelectorAll('.step');

// Current video
let currentVideo = 'video1';

// Switch between videos
tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active tab
    tabButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Change video source
    currentVideo = btn.dataset.video;
    const videoPath = `videos/${currentVideo.replace('video', 'video')}-${
      currentVideo === 'video1' ? 'front' :
      currentVideo === 'video2' ? 'profile' : 'closeup'
    }.mp4`;
    
    video.src = videoPath;
    video.load();
    subtitleText.textContent = "Click play to start...";
  });
});

// Update subtitles based on current time
video.addEventListener('timeupdate', () => {
  const currentTime = video.currentTime;
  const subs = subtitles[currentVideo];
  
  // Find the right subtitle
  let activeSub = subs[0];
  for (let i = 0; i < subs.length; i++) {
    if (currentTime >= subs[i].time) {
      activeSub = subs[i];
    }
  }
  subtitleText.textContent = activeSub.text;
  
  // Update step highlight
  const timings = stepTimings[currentVideo];
  let activeStep = 1;
  for (let i = 0; i < timings.length; i++) {
    if (currentTime >= timings[i].time) {
      activeStep = timings[i].step;
    }
  }
  
  steps.forEach(step => {
    const stepNum = parseInt(step.dataset.step);
    step.classList.toggle('active', stepNum === activeStep);
  });
});

// Reset subtitles when video ends
video.addEventListener('ended', () => {
  subtitleText.textContent = "Play again to review!";
});
