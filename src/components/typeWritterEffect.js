import { React, useState, useEffect } from 'react';

const TypeWriterEffect = (textToType, delay, loop) => {
  const [text, setText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    if (currentIndex < textToType.length) {
      setTimeout(() => {
        setText(text + textToType[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, delay);
    } else if (loop) {
      setText('');
      setCurrentIndex(0);
    }
  }, [currentIndex]);
  
  return <div>{text}</div>;
};

export default TypeWriterEffect;
