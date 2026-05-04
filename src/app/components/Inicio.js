"use client";
import { useState } from 'react';

export default function Inicio({ setSeccion }) {
  const [slide, setSlide] = useState(0);
  const [mostrarPropiedades, setMostrarPropiedades] = useState(false);
  const [categoriaProp, setCategoriaProp] = useState('Bases');
  const [itemSeleccionado, setItemSeleccionado] = useState(null);

  const slides = [
    {
      titulo: "EL SECRETO BOTÁNICO",
      subtitulo: "Descubre las propiedades y beneficios de cada base, oleato, esencia y arcilla que cuida tu piel.",
      boton: "Explorar Ingredientes",
      img: "/bg-vademecum.webp",
      accion: () => setMostrarPropiedades(true)
    },
    {
      titulo: "PROMOCIÓN DEL MES",
      subtitulo: "Lleva 3 jabones artesanales por S/ 18.00",
      boton: "Ver Promoción",
      img: "/promo-bg.webp",
      accion: () => setSeccion('catalogo')
    }
  ];

  const contenidoVademecum = {
    Bases: [
      { nombre: "Arroz", img: null, info: "Aclarante y suavizante natural." }, 
      { nombre: "Carbón Activado", img: null, info: "Desintoxicante profundo para poros." }, 
      { nombre: "Avena", img: null, info: "Exfoliación suave y nutritiva." }, 
      { nombre: "Ruda y Romero", img: null, info: "Propiedades antisépticas y tónicas." }, 
      { nombre: "Cúrcuma", img: null, info: "Antiinflamatorio y antioxidante." }, 
      { nombre: "Canela", img: null, info: "Estimulante y revitalizante." }, 
      { nombre: "Café", img: null, info: "Activador de la circulación." }
    ],
    Esencias: [
      { nombre: "Chocolate", img: null }, 
      { nombre: "Vainilla", img: null }, 
      { nombre: "Romero", img: null }, 
      { nombre: "Orquídea", img: null }, 
      { nombre: "Canela", img: null }
    ],
    Aceites: [
      { nombre: "Oleato de Coco", img: "/Opepita.webp" },
      { nombre: "Oleato de Pepita de Uva", img: "/Opepita.webp" },
      { nombre: "Oleato de Rosas", img: "/Orosas.webp" },
      { nombre: "Oleato de Romero", img: "/Oromero.webp" },
      { nombre: "Oleato de Girasol", img: "/Ogirasol.webp" }
    ],
    // --- ARCILLAS ACTUALIZADAS CON TUS IMÁGENES Y PROPIEDADES ---
    Arcillas: [
      { nombre: "Arcilla Blanca", img: "/Ablanca.webp", info: "Suave y equilibrante." }, 
      { nombre: "Arcilla Verde", img: "/Averde.webp", info: "Controla el exceso de grasa." }, 
      { nombre: "Arcilla Rosa", img: "/Arosa.webp", info: "Hidrata y calma pieles sensibles." }, 
      { nombre: "Arcilla Chaco", img: "/Achaco.webp", info: "Poderosa arcilla purificante." }
    ]
  };

  const siguiente = () => setSlide((slide + 1) % slides.length);
  const anterior = () => setSlide((slide - 1 + slides.length) % slides.length);

  if (mostrarPropiedades) {
    return (
      <section className="space-y-16 animate-in fade-in duration-700 relative">
        <div className="flex flex-col md:flex-row justify-between items-center border-b pb-8 gap-6">
          <h2 className="text-6xl font-serif text-[#2D2A26]">Vademécum Natural</h2>
          <button 
            onClick={() => setMostrarPropiedades(false)} 
            className="text-xs font-bold uppercase tracking-[0.2em] border-2 border-stone-200 px-10 py-3 rounded-full hover:bg-stone-50 transition-all"
          >
            ← Volver al Inicio
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-4 border-b border-stone-100 pb-10">
          {Object.keys(contenidoVademecum).map((cat) => (
            <button
              key={cat}
              onClick={() => { setCategoriaProp(cat); setItemSeleccionado(null); }}
              className={`px-12 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                categoriaProp === cat 
                ? 'bg-[#7D8461] text-white shadow-xl scale-105' 
                : 'bg-white text-stone-400 border border-stone-100 hover:border-stone-200'
              }`}
            >
              {cat === 'Aceites' ? 'Oleatos' : cat}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {contenidoVademecum[categoriaProp].map((item, i) => (
            <div 
              key={i} 
              onClick={() => setItemSeleccionado(item)}
              className="bg-white rounded-[3rem] border border-stone-50 shadow-sm overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-500 flex flex-col h-full relative z-10"
            >
              <div className="aspect-square bg-stone-50 relative overflow-hidden flex-shrink-0 p-4 flex items-center justify-center">
                {item.img ? (
                  <img 
                    src={item.img} 
                    alt={item.nombre} 
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-1000"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-stone-300 font-serif italic text-sm p-4 text-center">
                    [Foto de {item.nombre}]
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
                    <span className="text-white text-[10px] font-bold uppercase tracking-widest bg-black/40 px-5 py-2 rounded-full backdrop-blur-md">Ver Imagen</span>
                </div>
              </div>

              <div className="p-6 sm:p-8 text-center bg-white flex-grow flex flex-col justify-center border-t border-stone-50 space-y-2">
                <p className="text-[#7D8461] text-[10px] font-bold uppercase tracking-[0.2em]">
                  {categoriaProp === 'Aceites' ? 'Oleato Botánico' : categoriaProp}
                </p>
                <h4 className="text-xl sm:text-2xl font-serif text-[#2D2A26] leading-tight">{item.nombre}</h4>
                {item.info && (
                  <p className="text-stone-400 text-sm italic pt-2 border-t border-stone-50 mt-2">{item.info}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* MODAL SOLO IMAGEN */}
        {itemSeleccionado && (
            <div 
                className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={() => setItemSeleccionado(null)}
            >
                <button 
                    onClick={() => setItemSeleccionado(null)} 
                    className="fixed top-6 right-8 text-white z-[210] hover:text-stone-300 transition-colors hover:scale-110 hover:rotate-90 duration-300 drop-shadow-lg"
                    aria-label="Cerrar imagen"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div 
                    className="relative w-auto h-auto max-w-6xl max-h-[90vh] rounded-[2rem] overflow-hidden shadow-2xl animate-in zoom-in-95 flex justify-center items-center"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="w-full h-full">
                        {itemSeleccionado.img ? (
                             <img src={itemSeleccionado.img} alt={itemSeleccionado.nombre} className="w-auto h-auto max-h-[90vh] max-w-full object-contain rounded-[2rem]" />
                        ) : (
                            <div className="w-[50vw] h-[50vh] flex items-center justify-center text-stone-300 font-serif italic text-3xl p-10 text-center bg-stone-100">
                                [Sin imagen disponible]
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )}

      </section>
    );
  }

  return (
    <section className="relative w-full h-[650px] rounded-[4rem] overflow-hidden bg-white shadow-sm group border border-stone-50">
      <div className="absolute inset-0 flex flex-col md:flex-row items-center px-12 lg:px-24 gap-8 lg:gap-16 transition-all duration-700">
        
        <div className="w-full md:w-1/2 space-y-6 lg:space-y-8 animate-in slide-in-from-left duration-700 z-10">
          <h2 className="text-5xl lg:text-6xl xl:text-7xl font-serif text-[#2D2A26] font-bold leading-tight uppercase tracking-tighter break-words">
            {slides[slide].titulo}
          </h2>
          <p className="text-xl lg:text-2xl text-stone-500 italic leading-relaxed">
            {slides[slide].subtitulo}
          </p>
          <button 
            onClick={slides[slide].accion}
            className="bg-[#7D8461] text-white px-10 py-5 lg:px-16 lg:py-6 rounded-full font-bold text-[10px] lg:text-xs tracking-[0.3em] uppercase shadow-2xl hover:bg-[#2D2A26] transition-all"
          >
            {slides[slide].boton}
          </button>
        </div>
        
        <div className="w-full md:w-1/2 h-full flex items-center justify-center py-12 md:p-12">
           <div className="w-full h-full bg-[#F4F5EF] rounded-[4rem] animate-in zoom-in duration-1000 flex items-center justify-center text-stone-300 font-serif italic text-2xl overflow-hidden relative shadow-inner">
             <img src={slides[slide].img} alt="Slide Background" className="w-full h-full object-cover" />
           </div>
        </div>
      </div>

      <button onClick={anterior} className="absolute left-6 lg:left-10 top-1/2 -translate-y-1/2 w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-2xl lg:text-3xl opacity-0 group-hover:opacity-100 transition-all hover:bg-white active:scale-95 z-20">‹</button>
      <button onClick={siguiente} className="absolute right-6 lg:right-10 top-1/2 -translate-y-1/2 w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-2xl lg:text-3xl opacity-0 group-hover:opacity-100 transition-all hover:bg-white active:scale-95 z-20">›</button>

      <div className="absolute bottom-8 lg:bottom-12 left-1/2 -translate-x-1/2 flex gap-4 z-20">
        {slides.map((_, i) => (
          <div key={i} className={`w-3 h-3 rounded-full transition-all ${slide === i ? 'bg-[#2D2A26] scale-125' : 'bg-[#2D2A26]/20'}`} />
        ))}
      </div>
    </section>
  );
} 