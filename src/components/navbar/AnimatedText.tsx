import { useState, useEffect, useMemo } from "react";

const AnimatedText = () => {
  const baseText = "Find your next ";
  const words = useMemo(() => ["destination", "paradise"], []); // Uses useMemo to prevent re-creation

  // const [displayText, setDisplayText] = useState(words[0]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(words[0].length);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const handleTyping = () => {
      if (isDeleting) {
        if (charIndex > 0) {
          setTimeout(() => setCharIndex((prev) => prev - 1), 100);
        } else {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      } else {
        if (charIndex < words[currentWordIndex].length) {
          setTimeout(() => setCharIndex((prev) => prev + 1), 150);
        } else {
          setTimeout(() => setIsDeleting(true), 1000);
        }
      }
    };

    handleTyping();
  }, [charIndex, isDeleting, currentWordIndex, words]);

  return (
    <div className='absolute top-20 left-1/2 transform -translate-x-1/2'>
      <h1 className='text-4xl font-bold text-white'>
        {baseText}
        <span className='text-green-100'>
          {words[currentWordIndex].slice(0, charIndex)}
        </span>
        <span className='animate-blink'>|</span>
      </h1>
    </div>
  );
};

export default AnimatedText;
