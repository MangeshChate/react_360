import { useState, useEffect } from 'react';

const useSpeechRecognition = () => {
  const [transcript, setTranscript] = useState('');
  const [listening, setListening] = useState(false);

  let recognition = null;

  useEffect(() => {
    recognition = new window.webkitSpeechRecognition(); // Create a new instance of SpeechRecognition

    // Event listeners
    recognition.onresult = (event) => {
      const currentTranscript = event.results[0][0].transcript;
      setTranscript(currentTranscript);
    };

    recognition.onend = () => {
      if (listening) {
        recognition.start(); // Restart recognition if it's still supposed to be active
      }
    };

    // Start recognition
    if (listening) {
      recognition.start();
    }

    // Cleanup function
    return () => {
      if (recognition) {
        recognition.stop(); // Stop recognition when component unmounts
      }
    };
  }, [listening]);

  const startListening = () => {
    setListening(true);
  };

  const stopListening = () => {
    setListening(false);
    if (recognition) {
      recognition.stop();
    }
  };

  const resetTranscript = () => {
    setTranscript('');
  };

  return { transcript, startListening, stopListening, resetTranscript };
};

export default useSpeechRecognition;
