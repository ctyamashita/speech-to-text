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
const textContainer = document.querySelector('.speech');

recognition.onresult = (event) => {
  const utteranceList = event.results;
  const latestUtterance = utteranceList[utteranceList.length-1];
  const speechRecognition = latestUtterance[latestUtterance.length-1];
  // Update text object with speech recognition transcription
  const transcript  = speechRecognition.transcript;
  console.log(utteranceList)
  const utterances = Object.values(utteranceList).map(utterance => utterance[0].transcript)
  const previousMsgs = document.querySelectorAll('.bubble');
  const previousMsgsContent = [];
  previousMsgs.forEach(msg => previousMsgsContent.push(msg.innerText));
  // const lastMsg = previousMsgs[previousMsgs.length - 1];
  // const lastMsgFirstWord = lastMsg.innerText.split(' ')[0];
  // const firstUtteranceWord = utterances[0].split(' ')[0];

  // console.log(utterances);
  // lastMsg.innerHTML = utterances.join(' ');
  // if (speechRecognition.isFinal) textContainer.insertAdjacentHTML('beforeend', `<p class="bubble">${transcript}</p>`);
  const convertMsgs = (array) => array.map(utt => `<p class="bubble">${utt}</p>`);
  const msgs = convertMsgs(utterances);

  textContainer.innerHTML = msgs.join('');
}

recognition.onend = () => {
  if (on) recognition.start();
}

recognition.onaudioend = () => {
  console.log('stop talking');
}
recognition.onspeechstart = () => {
  console.log('begin talking')
}
