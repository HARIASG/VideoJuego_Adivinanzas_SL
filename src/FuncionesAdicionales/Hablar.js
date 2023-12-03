let voice = new SpeechSynthesisUtterance();
let jarvis = window.speechSynthesis;

  
const playVoice = text => {
  // Reproduce la voz
  pauseVoice();
  stopVoice();
  voice.text = text;
  jarvis.speak(voice);
};

const stopVoice = () => {
  // Cancela la reproducción de la voz
  jarvis.cancel()
};

const pauseVoice = () => {
  // Pausa la reproducción de la voz
  jarvis.resume();
}

export {
    playVoice
}