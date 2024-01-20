import { useState } from "react";
import imgHero from "../assets/hero-image-wr.jpg";
import { ModeToggle } from "./mode-toggle";
import audioSrc from "@/assets/audio/practice-make-perfect-ronaldo.mp3";
function Header() {
  const [audioPlayed, setAudioPlayed] = useState(false);

  /* Algunas politicas de los navegadores no dejan reproducir contenido multimedia sin interacción previa del usuario */
  const audio = new Audio(audioSrc);
  function playAudio() {
    if (audioPlayed) return;
    audio.volume = 0.5;
    audio.play();
    audio.onended = () => {
      audio.remove();
      setAudioPlayed(true);
    };
  }

  /* useEffect(() => {
    if (audioPlayed) return;
  }, [audioPlayed]); */

  return (
    <header
      onClick={() => {
        playAudio();
      }}
      style={{
        backgroundImage: `url(${imgHero})`,
      }}
      className="w-full min-h-40 md:min-h-60 
      bg-cover bg-center 
      flex items-center  justify-center gap-5"
    >
      <div className="flex gap-3 items-center fade-down">
        <h1
          className="font-bold  
        text-shadow
       
        text-3xl md:text-5xl text-white "
        >
          {" "}
          <strong className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            English
          </strong>{" "}
          Notes
        </h1>
        <ModeToggle />
      </div>
    </header>
  );
}

export { Header };
