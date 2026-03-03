
import { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import "./App.css";
import holiMusic from "./assets/holi.mp3";

function App() {
  const [name] = useState("Gaurav Bhaiya");
  const [showWish, setShowWish] = useState(false);
  const [musicStarted, setMusicStarted] = useState(false);
  const audioRef = useRef(null);

  // Start music on first click anywhere
  useEffect(() => {
    const startMusic = () => {
      if (!musicStarted && audioRef.current) {
        audioRef.current.play().catch(() => {});
        setMusicStarted(true);
      }
    };

    window.addEventListener("click", startMusic);

    return () => {
      window.removeEventListener("click", startMusic);
    };
  }, [musicStarted]);

  // Confetti when wish appears
  useEffect(() => {
    if (showWish) {
      confetti({
        particleCount: 300,
        spread: 150,
        origin: { y: 0.6 },
      });

      setTimeout(() => {
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.4 },
        });
      }, 600);
    }
  }, [showWish]);

  const handleSubmit = () => {
    setShowWish(true);
  };

  return (
    <div className="container">
      {!showWish ? (
        <div className="card">
          <h1>🎨 Special Holi Wish 🌸</h1>
          <p className="hint">
            🎶 For the full experience, please click anywhere on the screen to
            enable music & colors
          </p>
          <button onClick={handleSubmit}>Reveal Wish 🎆</button>
        </div>
      ) : (
        <div className="wish">
          <h1>🎉 Happy Holi, {name}! 🎉</h1>
          <p>
            May your life be filled with vibrant colors,
            happiness, and endless success 🌈✨
          </p>
          <p className="signature">– From Dhruv 💻</p>
        </div>
      )}

      <audio ref={audioRef} loop>
        <source src={holiMusic} type="audio/mp3" />
      </audio>
    </div>
  );
}

export default App;