import { Moon, Sun } from "lucide-react"; // Icônes pour le mode sombre/clair
import { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import TodoForm from "./TodoForm";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Gestion de la détection de la taille de l'écran
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Gestion de l'application du mode sombre
  useEffect(() => {
    document.body.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  // Détermination de l'image d'arrière-plan
  const imageSrc = isMobile
    ? isDarkMode
      ? "images/bg-mobile-dark.jpg"
      : "images/bg-mobile-light.jpg"
    : isDarkMode
    ? "images/bg-desktop-dark.jpg"
    : "images/bg-desktop-light.jpg";

  return (
    <>
      <div className="relative w-screen h-56">
        {/* Image d'arrière-plan */}
        <img
          src={imageSrc}
          alt="Image d'arrière-plan"
          className="w-full h-full object-cover"
        />

        {/* Contenu de la bannière */}
        <div className="absolute top-0 left-0 w-full flex flex-col items-center justify-center gap-4 mt-20 ">
          <div 
         className="flex px-32 md:px-10 justify-between items-center w-[750px] sm:w-[400px]"
          >
            {/* Titre */}
            <h1 className="text-2xl font-bold sm:text-xl sm:w-20 -ml-1">
              T O D O
            </h1>

            {/* Bouton de changement de mode avec espacement */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="focus:outline-none ml-6 sm:ml-4"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Formulaire TODO */}
          <TodoForm />
        </div>
      </div>

      {/* Pied de page */}
      <div className="mt-8">
        <Footer />
      </div>
    </>
  );
}
