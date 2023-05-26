// Speech Recognition

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
// recognition.continuous = true;
recognition.lang = 'en-US';
recognition.interimResults = true;
recognition.maxAlternatives = 1;

const savedMessagesContainer = document.querySelector('.saved-speech');
const currentMsgContainer = document.querySelector('.current-speech');

let on = false;

const toggleRecognition = () => {
  const startBtn = document.querySelector('.start-btn');
  const header = document.querySelector('.header');
  on ? recognition.abort() : recognition.start();
  startBtn.innerHTML = on ? '<i class="fa-solid fa-circle-play"></i>' : '<i class="fa-solid fa-circle-pause"></i>';
  startBtn.style.background = on ? 'teal' : 'indianred';
  header.style.background = on ? 'teal' : 'indianred';
  on = !on;
}

const scrollToLastMsg = () => {
  const lastCurrentMsg = currentMsgContainer.children[currentMsgContainer.childElementCount - 1];
  const lastStoredMsg = savedMessagesContainer.children[currentMsgContainer.childElementCount - 1];
  lastCurrentMsg ? lastCurrentMsg.scrollIntoView() : (lastStoredMsg ? lastStoredMsg.scrollIntoView() : console.log('No last message'))
}

const storeMsgs = (string) => `<p onclick="readMsg(this)">${(string[0].toUpperCase() + string.slice(1)).replaceAll(' question mark', '?').replaceAll(' exclamation point', '!').replaceAll(' period', '.')}${string.slice(-1) !== '.' ? '.' : ''}</p>`;

const convertMsg = (string) => `<p>${string}</p>`;

const convertMsgs = (array) => array.map(string => `<p>${string}</p>`).join('');

recognition.onresult = (event) => {
  const utteranceList = event.results; //object
  const utterances = Object.values(utteranceList);

  const finalUtt = []
  const currentUtt = []

  utterances.forEach((utterance) => {
    const utteranceContent = utterance[0].transcript.trim();
    utterance.isFinal ? finalUtt.push(utteranceContent) : currentUtt.push(utteranceContent);
  })
  if (finalUtt.length > 0) savedMessagesContainer.insertAdjacentHTML('beforeend', storeMsgs(finalUtt.join(' ')));
  if (navigator.userAgent.match(/iPhone/i)) {
    currentMsgContainer.innerHTML = currentUtt.length > 0 ? convertMsgs(currentUtt) : '';
  } else {
    currentMsgContainer.innerHTML = currentUtt.length > 0 ? convertMsg(currentUtt.join(' ')) : '';
  }
  scrollToLastMsg();
}

recognition.onend = () => on ? recognition.start() : recognition.abort();

// recognition.onerror = (e) => console.log(e);

// recognition.onaudioend = () => {
//   console.log('stop talking');
// }
// recognition.onspeechstart = () => {
//   console.log('begin talking')
// }

const readMsg = (el) => {
  const utterance = new SpeechSynthesisUtterance(el.innerText);
  speechSynthesis.speak(utterance);
}
