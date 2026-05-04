"use client";
import { useState, useEffect, useRef } from 'react';

// Importaciones de componentes
import Navbar from './components/Navbar';
import Inicio from './components/Inicio';
import Catalogo from './components/Catalogo';
import Personalizar from './components/Personalizar';
import Comprar from './components/Comprar';
import Cuidados from './components/Cuidados';
import Faq from './components/Faq';
import Historia from './components/Historia';
import Contacto from './components/Contacto';
import Carrito from './components/Carrito';
import Confianza from './components/Confianza';
import WspFlotante from './components/WspFlotante';
import Footer from './components/Footer';
import SplashScreen from './components/SplashScreen';
import ProductQuiz from './components/ProductQuiz';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [seccion, setSeccion] = useState('inicio');
  const [carrito, setCarrito] = useState([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [asomado, setAsomado] = useState(false);
  const cursorRef = useRef(null);
  const idleTimer = useRef(null);

  const infoPiel = {
    Grasa: { desc: "Exceso de sebo y brillos.", arcillas: ["Verde"], color: "bg-blue-50" },
    Mixta: { desc: "Zona T con brillo, mejillas secas.", arcillas: ["Blanca"], color: "bg-yellow-50" },
    Seca: { desc: "Sensación de tirantez y falta de brillo.", arcillas: ["Rosa"], color: "bg-orange-50" },
    Sensible: { desc: "Tendencia a rojeces e irritaciones.", arcillas: ["Blanca"], color: "bg-pink-50" },
    Normal: { desc: "Piel equilibrada y saludable.", arcillas: ["Blanca"], color: "bg-green-50" }
  };

  const productos = [
    { 
      id: 1, 
      nombre: "Jabón de Carbón Activado", 
      piel: ["Piel grasa", "Piel mixta"], 
      img: "/carbon.webp", 
      info: "Un imán natural diseñado para purificar profundamente, absorbiendo toxinas y excesos de tu piel.",
      beneficios: [
        "Atrae y retiene toxinas",
        "Controla grasa e impurezas",
        "Desintoxicación profunda"
      ]
    },
    { 
      id: 2, 
      nombre: "Jabón de Arroz", 
      piel: ["Piel sensible", "Piel seca", "Piel normal"], 
      img: "/arroz.webp", 
      info: "El secreto de una piel de porcelana: ilumina, suaviza y revela tu tono natural.",
      beneficios: [
        "Ilumina y unifica el tono",
        "Atenúa manchas con uso constante",
        "Suavidad y brillo natural"
      ]
    },
    { 
      id: 3, 
      nombre: "Jabón de Avena", 
      piel: ["Piel sensible", "Piel seca"], 
      img: "/avena.webp", 
      info: "Una caricia calmante y nutritiva para las pieles que buscan alivio y una hidratación profunda.",
      beneficios: [
        "Calma irritaciones y picazón",
        "Limpieza delicada diaria",
        "Hidrata y suaviza la piel"
      ]
    },
    { 
      id: 4, 
      nombre: "Jabón de Ruda y Romero", 
      piel: ["Piel grasa", "Piel mixta"], 
      img: "/ruda.webp", 
      info: "Poderosa alquimia herbal que combate imperfecciones y revitaliza tu circulación corporal.",
      beneficios: [
        "Antiséptico y antibacteriano",
        "Ayuda con granos y espinillas",
        "Ideal para pies y cuerpo"
      ]
    },
    { 
      id: 5, 
      nombre: "Jabón de Cúrcuma", 
      piel: ["Piel normal", "Piel sensible", "Piel mixta"], 
      img: "/curcuma.webp", 
      info: "Oro botánico que unifica el tono mientras calma rojeces gracias a su poder antioxidante.",
      beneficios: [
        "Antiinflamatorio y antioxidante",
        "Bueno para acné leve y rojeces",
        "Ilumina y unifica el tono"
      ]
    },
    { 
      id: 6, 
      nombre: "Jabón de Canela", 
      piel: ["Piel grasa", "Piel normal"], 
      img: "/canela.webp", 
      info: "Un estímulo cálido y energizante que activa tu circulación y cuida la higiene de tus manos y cuerpo.",
      beneficios: [
        "Estimula la circulación (Calor)",
        "Acción antibacteriana",
        "Ideal para cuerpo y manos"
      ]
    },
    { 
      id: 7, 
      nombre: "Jabón de Café y Arroz", 
      piel: ["Piel grasa", "Piel mixta"], 
      img: "/cafe.webp", 
      info: "Exfoliante renovador rico en antioxidantes para combatir el paso del tiempo y alisar tu piel.",
      beneficios: [
        "Elimina células muertas",
        "Combate el envejecimiento",
        "Piel más lisa y luminosa",
        "No recomendado para piel sensible" // Nueva viñeta de advertencia
      ]
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    const moveCursor = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        const elementUnder = document.elementFromPoint(e.clientX, e.clientY);
        const isInteractive = elementUnder?.closest('button, a, select, input, label, .interactive');
        const emoji = cursorRef.current.querySelector('.huella-emoji');
        if (emoji) {
          if (isInteractive) {
            emoji.style.transform = 'scale(2) rotate(15deg)';
            emoji.style.filter = 'sepia(1) saturate(3) drop-shadow(0 0 10px rgba(125, 132, 97, 0.4))';
          } else {
            emoji.style.transform = 'scale(1) rotate(0deg)';
            emoji.style.filter = 'none';
          }
        }
      }
      setAsomado(false);
      clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => setAsomado(true), 12000);
    };
    if (!loading) window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [loading]);

  if (loading) return <SplashScreen />;

  return (
    <main className="min-h-screen bg-[#FDFBF9] text-[#43403B] relative overflow-x-hidden">
      <style jsx global>{`
        * { cursor: none !important; }
        button, a, select, input, label, .interactive {
          transition: all 0.3s ease !important;
        }
        button:hover, a:hover, .interactive:hover {
          transform: scale(1.02) !important;
        }
        .huella-container { position: fixed; top: 0; left: 0; pointer-events: none; z-index: 10000; will-change: transform; }
        .huella-emoji { transition: transform 0.2s ease, filter 0.3s ease; display: block; }
      `}</style>

      <div ref={cursorRef} className="huella-container">
        <span className="huella-emoji text-3xl select-none absolute -translate-x-1/2 -translate-y-1/2">🐾</span>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar seccion={seccion} setSeccion={setSeccion} cantidad={carrito.length} />
        <div className="flex-grow max-w-7xl mx-auto px-10 py-12 w-full">
          {seccion === 'inicio' && <Inicio setSeccion={setSeccion} setShowQuiz={setShowQuiz} />}
          {seccion === 'catalogo' && <Catalogo productos={productos} agregarAlCarrito={(p) => setCarrito([...carrito, p])} />}
          {seccion === 'personalizar' && <Personalizar infoPiel={infoPiel} agregarAlCarrito={(p) => setCarrito([...carrito, p])} />}
          {seccion === 'comprar' && <Comprar setSeccion={setSeccion} />}
          {seccion === 'cuidados' && <Cuidados />}
          {seccion === 'faq' && <Faq />}
          {seccion === 'historia' && <Historia setSeccion={setSeccion} />}
          {seccion === 'contacto' && <Contacto />}
          {seccion === 'carrito' && <Carrito carrito={carrito} setCarrito={setCarrito} setSeccion={setSeccion} />}
          <Confianza />
        </div>
        <Footer setSeccion={setSeccion} />
      </div>

      {showQuiz && <ProductQuiz close={() => setShowQuiz(false)} setSeccion={setSeccion} />}
      <WspFlotante />
    </main>
  );
}