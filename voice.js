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
  startBtn.style.background = on ? 'teal' : 'indianred';
  on = !on;
}

recognition.onerror = (e) => {
  console.log(e)
}

const convertMsgs = (array) => {
  const newArray = array.map(utt => `<p class="previous-msg">${utt.charAt(0).toUpperCase() + utt.slice(1)}</p>`);
  if (array.length >= 2 && newArray[newArray.length - 1].length < 100) {
    newArray[newArray.length - 2] = newArray[newArray.length - 2].replace('</p>', ' ');
    newArray[newArray.length - 1] = newArray[newArray.length - 1].toLowerCase().replace('<p class="previous-msg">', '');
  }
  return newArray.join('');
};

const storeMsgs = (array) => array.map(utt => `<p>${utt}</p>`).join('');

let previousMsgsContent = [];

recognition.onresult = (event) => {
  const textContainer = document.querySelector('.old-speech');
  const msgContainer = document.querySelector('.current-speech');
  const utteranceList = event.results;

  const utterances = Object.values(utteranceList).map(utt => utt[0].transcript);

  if (!previousMsgsContent[0] || utterances[0].split(' ')[0] == previousMsgsContent[0].split(' ')[0] || utterances[0].split(' ')[0].includes(previousMsgsContent[0].split(' ')[0])) {
    console.log('refresh current msg');
    msgContainer.innerHTML = convertMsgs(utterances);
  } else if (utterances.length > 1) {
    console.log('storing msg');
    textContainer.insertAdjacentHTML('beforeend', storeMsgs(previousMsgsContent));
  }
  previousMsgsContent = utterances
  msgContainer.children[msgContainer.childElementCount - 1].scrollIntoView();
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
