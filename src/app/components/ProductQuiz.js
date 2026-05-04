"use client";
import { useState } from 'react';

export default function ProductQuiz({ close, setSeccion }) {
  const [paso, setPaso] = useState(0);
  const [respuestas, setRespuestas] = useState({});

  const preguntas = [
    {
      id: 'piel',
      titulo: "¿Cómo sientes tu piel al despertar?",
      opciones: [
        { label: "Con brillos y poros abiertos", valor: "Grasa" },
        { label: "Tirante y algo opaca", valor: "Seca" },
        { label: "Sensible o con rojeces", valor: "Sensible" },
        { label: "Equilibrada", valor: "Normal" }
      ]
    },
    {
      id: 'aroma',
      titulo: "¿Qué energía buscas hoy?",
      opciones: [
        { label: "Frescura y limpieza profunda", valor: "Fresco" },
        { label: "Calma y suavidad", valor: "Dulce" },
        { label: "Protección y ruda", valor: "Herbal" }
      ]
    }
  ];

  const finalizarQuiz = (valor) => {
    const nuevasRespuestas = { ...respuestas, [preguntas[paso].id]: valor };
    if (paso < preguntas.length - 1) {
      setRespuestas(nuevasRespuestas);
      setPaso(paso + 1);
    } else {
      // Lógica de recomendación simple
      close();
      setSeccion('catalogo');
    }
  };

  return (
    <div className="fixed inset-0 z-[800] bg-[#2D2A26]/60 backdrop-blur-md flex items-center justify-center p-6 animate-in fade-in duration-500">
      <div className="bg-[#FDFBF9] w-full max-w-2xl rounded-[3rem] p-12 relative overflow-hidden shadow-2xl">
        
        {/* Decoración del Scarbato */}
        <img src="/logosf.webp" className="absolute -top-10 -left-10 w-32 opacity-10 rotate-12" alt="" />
        
        <button onClick={close} className="absolute top-8 right-8 text-stone-400 hover:text-[#2D2A26] transition-colors">✕</button>

        <div className="space-y-10 relative z-10">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-bold tracking-[0.4em] text-[#7D8461] uppercase">Guía Alquímica</span>
            <h2 className="text-3xl font-serif text-[#2D2A26]">{preguntas[paso].titulo}</h2>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {preguntas[paso].opciones.map((opt, i) => (
              <button
                key={i}
                onClick={() => finalizarQuiz(opt.valor)}
                className="group p-6 border border-stone-100 bg-white rounded-2xl text-left hover:border-[#7D8461] hover:bg-[#7D8461]/5 transition-all flex justify-between items-center"
              >
                <span className="font-bold text-xs uppercase tracking-widest text-stone-500 group-hover:text-[#7D8461]">{opt.label}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-[#7D8461]">🐾</span>
              </button>
            ))}
          </div>

          <div className="flex justify-center gap-2">
            {preguntas.map((_, i) => (
              <div key={i} className={`h-1 rounded-full transition-all duration-500 ${paso === i ? 'w-8 bg-[#7D8461]' : 'w-2 bg-stone-200'}`}></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}