import { useState, useEffect, useMemo } from "react";

const AnimatedText = (): JSX.Element => {
  const baseText = "Find your next ";
  // Memoize words to avoid re-creation on each render
  const words = useMemo(() => ["destination", "paradise"], []);

  // State for managing the typing animation
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(words[0].length);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    // Function to handle typing and deleting logic
    const handleTyping = () => {
      if (isDeleting) {
        if (charIndex > 0) {
          // Delete one character at a time
          setTimeout(() => setCharIndex((prev) => prev - 1), 100);
        } else {
          // Switch to typing next word once deletion is complete
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      } else {
        if (charIndex < words[currentWordIndex].length) {
          // Type one character at a time
          setTimeout(() => setCharIndex((prev) => prev + 1), 150);
        } else {
          // Pause before starting deletion
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
