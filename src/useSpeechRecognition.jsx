import { useState, useEffect } from 'react';

const useSpeechRecognition = () => {
  const [transcript, setTranscript] = useState('');
  const [listening, setListening] = useState(false);

  let recognition = null;

  useEffect(() => {
    recognition = new window.webkitSpeechRecognition(); // Create a new instance of SpeechRecognition
    
    // Set language to support English and Japanese
    recognition.lang = 'en-US, ja-JP';

    // Event listeners
    recognition.onresult = (event) => {
      const currentTranscript = event.results[0][0].transcript;
      setTranscript(currentTranscript);
      checkForKamuyi(currentTranscript);
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

  const checkForKamuyi = (currentTranscript) => {
    // Check for English words
    if (currentTranscript.toLowerCase().includes('kamui')) {
      console.log('kamui detected')
      
    }

    
  };

  return { transcript, startListening, stopListening, resetTranscript };
};

export default useSpeechRecognition;
