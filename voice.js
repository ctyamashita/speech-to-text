// Speech Recognition

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
// recognition.continuous = true;
recognition.lang = 'en-US';
recognition.interimResults = true;
recognition.maxAlternatives = 1;

const textContainer = document.querySelector('.old-speech');
const msgContainer = document.querySelector('.current-speech');

let on = false;

const toggleRecognition = () => {
  const startBtn = document.querySelector('.start-btn');
  on ? recognition.abort() : recognition.start();
  startBtn.innerHTML = on ? '<i class="fa-solid fa-circle-play"></i>' : '<i class="fa-solid fa-circle-pause"></i>';
  startBtn.style.background = on ? 'linear-gradient(teal,cadetblue)' : 'linear-gradient(indianred,salmon)';
  on = !on;
}

const scrollToLastMsg = () => {
  const lastCurrentMsg = msgContainer.children[msgContainer.childElementCount - 1];
  const lastStoredMsg = textContainer.children[msgContainer.childElementCount - 1];
  lastCurrentMsg ? lastCurrentMsg.scrollIntoView() : (lastStoredMsg ? lastStoredMsg.scrollIntoView() : console.log('No last message'))
}

const storeMsgs = (string) => `<p onclick="readMsg(this)">${(string[0].toUpperCase() + string.slice(1)).replaceAll(' question mark', '?').replaceAll(' exclamation point', '!').replaceAll(' period', '.')}${string.slice(-1) !== '.' ? '.' : ''}</p>`;

const convertMsgs = (string) => `<p>${string}</p>`;

recognition.onresult = (event) => {
  const utteranceList = event.results; //object
  const utterances = Object.values(utteranceList);

  const finalUtt = []
  const utt = []

  utterances.forEach((utterance) => {
    const utteranceContent = utterance[0].transcript.trim();
    utterance.isFinal ? finalUtt.push(utteranceContent) : utt.push(utteranceContent);
  })
  if (finalUtt.length > 0) textContainer.insertAdjacentHTML('beforeend', storeMsgs(finalUtt.join(' ')));
  msgContainer.innerHTML = utt.length > 0 ? convertMsgs(utt.join(' ')) : '';
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
