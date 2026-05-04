"use client";
import { useState, useEffect, useRef } from 'react';

export default function Personalizar({ infoPiel, agregarAlCarrito }) {
  const [p, setP] = useState(null); 
  const [c, setC] = useState({ base: '', arc: '', esc: '', ace: '', cant: 1 });
  const [modalOpen, setModalOpen] = useState(false);
  const [oleatoOpen, setOleatoOpen] = useState(false);
  const [hoverBase, setHoverBase] = useState(null);

  // Referencia para detectar clics fuera del menú de oleatos
  const oleatoRef = useRef(null);

  // Efecto para cerrar el menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (oleatoRef.current && !oleatoRef.current.contains(event.target)) {
        setOleatoOpen(false);
      }
    };

    if (oleatoOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [oleatoOpen]);

  const fotosPiel = {
    Grasa: '/Pgrasa.webp',
    Mixta: '/Pmixta.webp',
    Seca: '/Pseca.webp',
    Sensible: '/Psensible.webp',
    Normal: '/Pnormal.webp'
  };

  const PRECIOS = {
    base: 7.00,
    esencia: 1.50,
    aceites: {
      "Oleato de Coco": 1.50,
      "Oleato de Pepita de Uva": 1.50,
      "Oleato de Romero": 2.00,
      "Oleato de Rosas": 2.50,
      "Oleato de Girasol": 2.00
    }
  };

  const REGLAS = {
    Grasa: { arcillas: ['Verde', 'Chaco'], esencias: ['Chocolate', 'Romero', 'Vainilla', 'Orquídea'], bases: ['Carbón Activado', 'Ruda y Romero', 'Canela', 'Café y Arroz'] },
    Mixta: { arcillas: ['Blanca', 'Verde', 'Rosa'], esencias: ['Chocolate', 'Romero', 'Vainilla', 'Orquídea'], bases: ['Carbón Activado', 'Ruda y Romero', 'Cúrcuma', 'Café y Arroz'] },
    Seca: { arcillas: ['Blanca', 'Rosa'], esencias: ['Chocolate', 'Romero', 'Vainilla', 'Orquídea'], bases: ['Arroz', 'Avena'] },
    Sensible: { arcillas: ['Blanca', 'Rosa'], esencias: ['Chocolate', 'Romero', 'Vainilla', 'Orquídea'], bases: ['Arroz', 'Avena', 'Cúrcuma'] },
    Normal: { arcillas: ['Blanca', 'Verde', 'Rosa', 'Chaco'], esencias: ['Chocolate', 'Romero', 'Vainilla', 'Orquídea'], bases: ['Arroz', 'Cúrcuma', 'Canela'] }
  };

  const infoArcillas = [
    { id: 'Blanca', d: 'Suave, equilibrante' }, { id: 'Verde', d: 'Controla grasa' },
    { id: 'Rosa', d: 'Hidrata y calma' }, { id: 'Chaco', d: 'Purificante' }
  ];

  const infoBases = {
    "Arroz": "Esencia de pureza: aclara y suaviza el tono natural de la piel.",
    "Carbón Activado": "Poder detox: atrae impurezas y limpia los poros en profundidad.",
    "Avena": "Caricia botánica: calma e hidrata con una exfoliación imperceptible.",
    "Ruda y Romero": "Alquimia protectora: revitaliza con sus propiedades antisépticas.",
    "Cúrcuma": "Luz natural: potente antiinflamatorio que devuelve la vitalidad.",
    "Canela": "Energía cálida: estimula la circulación con un aroma revitalizante.",
    "Café y Arroz": "Doble ritual: exfolia intensamente mientras unifica y suaviza.",
    "Café": "Activador vital: estimula y tonifica mediante una exfoliación profunda."
  };

  const calc = () => {
    let t = PRECIOS.base;
    if (c.esc) t += PRECIOS.esencia;
    if (c.ace) t += PRECIOS.aceites[c.ace] || 0;
    return t;
  };

  const cerrarAlquimia = () => {
    setModalOpen(false);
    setOleatoOpen(false);
    setHoverBase(null);
    setP(null);
    setC({ base: '', arc: '', esc: '', ace: '', cant: 1 });
  };

  return (
    <section className="space-y-24 animate-in fade-in duration-700">
      <div className="text-center space-y-6">
        <h2 className="text-7xl font-serif text-[#2D2A26]">Personalización</h2>
        <p className="text-2xl text-stone-500 italic">Selecciona tu tipo de piel para iniciar la alquimia</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        {Object.keys(infoPiel).map(piel => (
          <button key={piel} onClick={() => { setP(piel); setModalOpen(true); }} 
            className="p-10 rounded-[4rem] border-2 transition-all hover:scale-105 bg-white border-stone-100 shadow-sm hover:shadow-xl group flex flex-col items-center">
            <div className="w-32 h-32 lg:w-40 lg:h-40 mb-8 rounded-full overflow-hidden border-4 border-white shadow-md group-hover:shadow-lg transition-all duration-500">
              <img src={fotosPiel[piel]} alt={piel} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
            <h4 className="font-bold text-sm lg:text-base uppercase tracking-[0.2em] text-[#2D2A26]">Piel {piel}</h4>
          </button>
        ))}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8 bg-black/40 backdrop-blur-md animate-in fade-in" onClick={cerrarAlquimia}>
          <div className="bg-[#FDFBF9] w-full max-w-7xl rounded-[4rem] shadow-2xl flex flex-col md:flex-row overflow-hidden relative animate-in zoom-in-95 max-h-[95vh]" onClick={(e) => e.stopPropagation()}>
            
            <button onClick={cerrarAlquimia} className="absolute top-10 right-10 text-4xl text-stone-300 hover:text-[#2D2A26] transition-colors z-[210]">✕</button>

            <div className="md:w-1/3 bg-stone-100 p-10 lg:p-14 flex flex-col justify-between border-r border-stone-200">
              <div className="space-y-12">
                <div className="flex items-center gap-4">
                    <span className="bg-[#7D8461] text-white px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em]">Tu Fórmula</span>
                    <span className="text-2xl">🐾</span>
                </div>
                <h3 className="text-7xl font-serif text-[#2D2A26] leading-none">Piel<br/>{p}</h3>
                
                <div className="space-y-6 pt-10">
                  {['base', 'arc', 'esc', 'ace'].map((key, i) => (
                    <div key={key} className="flex items-center gap-5">
                      <div className={`w-3 h-3 rounded-full transition-all duration-500 ${c[key] ? 'bg-[#7D8461] scale-125' : 'bg-stone-300'}`} />
                      <p className={`text-xs font-bold uppercase tracking-[0.15em] ${c[key] ? 'text-[#2D2A26]' : 'text-stone-400'}`}>
                        {i+1}. {c[key] || (key==='base'?'Base Botánica':key==='arc'?'Arcilla Mineral':key==='esc'?'Esencia Vital':'Oleato')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-8 rounded-[3rem] shadow-md border border-stone-50 text-center">
                <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">Inversión Final</p>
                <p className="text-4xl font-serif text-[#2D2A26]">S/ {(calc() * c.cant).toFixed(2)}</p>
              </div>
            </div>

            <div className="md:w-2/3 p-12 lg:p-20 overflow-y-auto space-y-20 bg-white/50">
              
              <div className="space-y-10">
                <h4 className="text-4xl font-serif text-[#7D8461]">1. Base Botánica</h4>
                <div className="flex flex-col lg:flex-row gap-10 items-start">
                  <div className="grid grid-cols-2 gap-4 w-full lg:w-3/5">
                    {REGLAS[p].bases.map(b => (
                      <button key={b} 
                        onClick={() => setC({...c, base: b})}
                        onMouseEnter={() => setHoverBase(b)}
                        onMouseLeave={() => setHoverBase(null)}
                        className={`p-8 rounded-[2rem] border-2 font-bold text-[10px] uppercase tracking-[0.2em] transition-all duration-500 ${c.base === b ? 'border-[#7D8461] bg-[#7D8461]/5 text-[#2D2A26]' : 'border-stone-100 text-stone-400 hover:border-stone-200'}`}>
                        {b}
                      </button>
                    ))}
                  </div>

                  <div className="w-full lg:w-2/5 min-h-[150px] relative">
                    <div className={`transition-all duration-700 ease-out p-8 rounded-[2.5rem] bg-[#F4F5EF] border border-stone-100 space-y-4 ${hoverBase ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'}`}>
                      <p className="text-[#7D8461] text-[10px] font-bold uppercase tracking-widest">Propiedades</p>
                      <h5 className="font-serif text-2xl text-[#2D2A26] italic">{hoverBase}</h5>
                      <p className="text-stone-500 text-sm leading-relaxed italic">{infoBases[hoverBase]}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-10">
                <h4 className="text-4xl font-serif text-[#7D8461]">2. Arcilla Mineral</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {infoArcillas.filter(a => REGLAS[p].arcillas.includes(a.id)).map(a => (
                    <label key={a.id} className={`flex items-center gap-6 p-8 rounded-[2.5rem] border-2 cursor-pointer transition-all duration-500 ${c.arc === a.id ? 'border-[#7D8461] bg-white shadow-md' : 'border-stone-100 opacity-60'}`}>
                      <input type="radio" checked={c.arc === a.id} className="accent-[#7D8461] w-5 h-5" onChange={() => setC({...c, arc: a.id})} />
                      <div>
                        <p className="text-lg font-bold text-[#2D2A26]">Arcilla {a.id}</p>
                        <p className="text-xs text-stone-400 italic">{a.d}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 pt-10 border-t border-stone-100">
                <div className="space-y-8">
                  <h4 className="text-3xl font-serif text-[#7D8461] flex items-center gap-3">
                    3. Esencia
                    <span className="text-xs font-bold text-[#7D8461]/60">+ S/ 1.50</span>
                  </h4>
                  <div className="flex flex-col gap-4">
                    {REGLAS[p].esencias.map(e => (
                      <label key={e} className={`flex items-center gap-4 text-base font-bold cursor-pointer group p-2 rounded-xl transition-colors ${c.esc === e ? 'bg-[#7D8461]/5 text-[#7D8461]' : 'text-[#2D2A26]'}`}>
                        <input type="radio" checked={c.esc === e} className="accent-[#7D8461] w-5 h-5" onChange={() => setC({...c, esc: e})} />
                        <span className="group-hover:text-[#7D8461] transition-colors">{e}</span>
                      </label>
                    ))}
                    <label className={`flex items-center gap-4 text-sm font-bold cursor-pointer p-2 rounded-xl transition-colors ${c.esc === '' ? 'bg-[#7D8461]/5 text-[#7D8461]' : 'text-stone-300'}`}>
                        <input type="radio" checked={c.esc === ''} className="accent-[#7D8461] w-5 h-5" onChange={() => setC({...c, esc: ''})} />
                        Sin Esencia
                    </label>
                  </div>
                </div>

                <div className="space-y-8">
                  <h4 className="text-3xl font-serif text-[#7D8461]">4. Oleato</h4>
                  <div className="relative" ref={oleatoRef}>
                    <div onClick={() => setOleatoOpen(!oleatoOpen)} className="w-full p-6 rounded-[2rem] border-2 border-stone-100 bg-stone-50 font-serif italic text-lg text-[#2D2A26] flex items-center justify-between cursor-pointer hover:border-[#7D8461] transition-all">
                      <span className="truncate">{c.ace || "Ninguno"}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-6 h-6 text-[#7D8461] transition-transform ${oleatoOpen ? 'rotate-180' : ''}`}><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
                    </div>
                    {oleatoOpen && (
                      <div className="absolute top-full left-0 w-full mt-2 bg-white border border-stone-100 rounded-[2rem] shadow-xl overflow-hidden z-[300]">
                        <div 
                          onClick={() => { setC({...c, ace: ''}); setOleatoOpen(false); }} 
                          className={`p-4 text-sm border-b border-stone-50 cursor-pointer italic transition-colors ${c.ace === '' ? 'bg-[#7D8461]/10 text-[#7D8461]' : 'text-stone-400 hover:bg-stone-50'}`}
                        >
                          Ninguno
                        </div>
                        {Object.keys(PRECIOS.aceites).map(aceite => (
                          <div 
                            key={aceite} 
                            onClick={() => { setC({...c, ace: aceite}); setOleatoOpen(false); }} 
                            className={`px-6 py-4 font-serif italic text-base border-b border-stone-50 last:border-0 flex justify-between cursor-pointer transition-colors group ${c.ace === aceite ? 'bg-[#7D8461]/10 text-[#7D8461]' : 'text-[#2D2A26] hover:bg-[#7D8461]/5'}`}
                          >
                            <span className="group-hover:text-[#7D8461]">{aceite}</span>
                            <span className="text-xs font-bold text-[#7D8461]">+ S/ {PRECIOS.aceites[aceite].toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-10 border-t border-stone-100 flex items-center justify-between gap-8">
                <div className="flex items-center bg-stone-100 rounded-full px-8 py-4 gap-8 font-bold text-2xl">
                    <button onClick={() => setC({...c, cant: Math.max(1, c.cant - 1)})}>-</button>
                    <span className="text-xl min-w-[2ch] text-center">{c.cant}</span>
                    <button onClick={() => setC({...c, cant: c.cant + 1})}>+</button>
                </div>
                <button 
                  disabled={!c.base || !c.arc}
                  onClick={() => {
                    agregarAlCarrito({ uniqueId: `custom-${Date.now()}`, nombre: `Jabón Alquimia: ${c.base}`, precio: calc(), cantidad: c.cant, detalles: c });
                    cerrarAlquimia();
                  }}
                  className={`flex-grow py-6 rounded-full font-bold uppercase text-[10px] tracking-[0.3em] transition-all active:scale-95 ${(!c.base || !c.arc) ? 'bg-stone-200 text-stone-400' : 'bg-[#2D2A26] text-white hover:bg-[#7D8461]'}`}
                >
                  {!c.base ? 'Selecciona tu Base' : !c.arc ? 'Elige una Arcilla' : 'Añadir al Carrito'}
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
}