const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.lang = 'en-US';
recognition.interimResults = true;
recognition.maxAlternatives = 1;

let on = false;

recognition.onstart = () => {
  const startBtn = document.querySelector('.start-btn');
  startBtn.innerHTML = on ? 'Start' : 'Stop';
  on = true;
}

let lastMsg = '';

recognition.onresult = (e) => {
  const text = e.results[0][0].transcript;
  const textContainer = document.querySelector('.speech');
  const previousMsgs = textContainer.querySelectorAll('.bubble');
  const lastAdded = previousMsgs[previousMsgs.length - 1];
  lastMsg = lastAdded.innerHTML;
  const sameMsgStart = (lastMsg.split(' ')[0] === text.split(' ')[0] || lastMsg.split(' ')[1] === text.split(' ')[1] || lastMsg.split(' ')[2] === text.split(' ')[2]);
  const sameStartLetter = lastMsg.split('').slice(0,2) === text.split('').slice(0,2);

  if (sameMsgStart || sameStartLetter) {
    lastAdded.innerHTML = text;
  } else {
    const msg = `<p class="bubble">${text}</p>`;
    textContainer.insertAdjacentHTML('beforeend', msg);
  }

}

recognition.onerror = (e) => {
  console.log(e)
}

// recognition.onend = () => {
//   console.log('restart voice recognition');
//   if (on) recognition.start();
// };
