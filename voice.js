const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.lang = 'en-US';
recognition.interimResults = true;
recognition.maxAlternatives = 1;

let on = false;

const toggleRecognition = () => {
  const startBtn = document.querySelector('.start-btn');
  on ? recognition.abort() : recognition.start();
  startBtn.innerHTML = on ? 'Start' : 'Stop';
  on = !on;
}

recognition.onerror = (e) => {
  console.log(e)
}


let lastMsg = '';

recognition.onresult = (event) => {
  const textContainer = document.querySelector('.speech');
  const previousMsgs = document.querySelectorAll('.bubble');
  const utteranceList = event.results;
  const latestUtterance = utteranceList[utteranceList.length-1];
  const speechRecognition = latestUtterance[latestUtterance.length-1];

  // Update text object with speech recognition transcription
  const transcript  = speechRecognition.transcript.toLowerCase();

  const lastMsg = previousMsgs[previousMsgs.length - 1];
  lastMsg.innerText = transcript;

  if (latestUtterance.isFinal) {
    const newMsg = `<p class="bubble"></p>`;
    textContainer.insertAdjacentHTML('beforeend', newMsg);
  }
}
