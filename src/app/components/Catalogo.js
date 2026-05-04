"use client";
import { useState } from 'react';

export default function Catalogo({ productos, agregarAlCarrito }) {
  const [filtro, setFiltro] = useState('Todos');
  const [sel, setSel] = useState(null);
  const [opc, setOpc] = useState({ arc: '', esc: '', ace: '', cant: 1 });

  const arcillas = [
    { id: 'Blanca', d: 'Suave, equilibrante' }, { id: 'Verde', d: 'Controla grasa' },
    { id: 'Rosa', d: 'Hidrata y calma' }, { id: 'Chaco', d: 'Purificante' }
  ];

  const PRECIOS = {
    base: 7.00,
    esencia: 1.50,
    aceites: {
      "Coco": 1.50,
      "Pepita de uva": 1.50,
      "Rosas": 2.50,
      "Girasol": 2.00,
    }
  };

  const calcPrecio = () => {
    let t = PRECIOS.base;
    if (opc.esc) t += PRECIOS.esencia;
    if (opc.ace) t += PRECIOS.aceites[opc.ace];
    return t;
  };

  // Función auxiliar para cerrar el modal y resetear opciones
  const cerrarModal = () => {
    setSel(null);
    setOpc({ arc: '', esc: '', ace: '', cant: 1 });
  };

  return (
    <section className="space-y-24">
      {sel && (
        // 1. EL OVERLAY (FONDO OSCURO) AHORA CIERRA EL MODAL AL HACER CLIC
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-stone-900/40 backdrop-blur-md"
          onClick={cerrarModal} 
        >
          {/* 2. EL CONTENEDOR PRINCIPAL EVITA QUE LOS CLICS DENTRO CIERREN EL MODAL (stopPropagation) */}
          <div 
            className="bg-[#FDFBF9] w-full max-w-6xl rounded-[3rem] sm:rounded-[4rem] shadow-2xl flex flex-col md:flex-row overflow-hidden animate-in zoom-in-95 max-h-[95vh] sm:max-h-none relative"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* --- BOTÓN DE CERRAR REPOSICIONADO (Absoluto en la esquina) --- */}
            <button 
                onClick={cerrarModal} 
                className="absolute top-6 right-6 sm:top-10 sm:right-10 text-3xl sm:text-4xl text-stone-300 hover:text-[#2D2A26] transition-colors z-50"
            >
                ✕
            </button>
            {/* ------------------------------------------------------------- */}

            <div className="md:w-1/2 relative hidden sm:block">
              <img src={sel.img} className="w-full h-full object-cover" alt="" />
              <div className="absolute top-10 left-10 bg-[#7D8461] text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest">✨ Personalizable</div>
            </div>
            
            <div className="w-full md:w-1/2 p-8 sm:p-12 md:p-16 space-y-8 overflow-y-auto max-h-[95vh] sm:max-h-[90vh] bg-[#FDFBF9] flex flex-col">
              
              {/* El encabezado ya no necesita el botón aquí */}
              <div className="space-y-4 mt-4 sm:mt-0 pr-8 sm:pr-0">
                  <h3 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[#2D2A26] leading-tight">{sel.nombre}</h3>
                  <p className="text-xl sm:text-2xl text-stone-500 italic leading-relaxed">{sel.info}</p>
              </div>

              <div className="bg-white p-8 sm:p-10 rounded-[2.5rem] border border-stone-100 space-y-4">
                <p className="font-bold text-sm uppercase tracking-widest text-[#7D8461]">Beneficios:</p>
                <ul className="flex flex-col gap-3">
                  {Array.isArray(sel.beneficios) ? sel.beneficios.map((b, i) => (
                    <li key={i} className="text-lg sm:text-xl text-stone-500 leading-relaxed flex items-start gap-3">
                      <span className="text-[#7D8461] text-lg mt-1">✦</span> <span>{b}</span>
                    </li>
                  )) : (
                    <li className="text-lg sm:text-xl text-stone-500 leading-relaxed">{sel.beneficios}</li>
                  )}
                </ul>
              </div>

              <div className="flex flex-wrap gap-4 items-center justify-center sm:justify-start">
                <span className="text-xs text-stone-400 font-bold uppercase pt-1">Ideal para:</span>
                {sel.piel.map(p => <span key={p} className="bg-white border px-6 py-2 rounded-full text-xs font-bold uppercase text-stone-500">{p}</span>)}
              </div>

              <div className="text-4xl sm:text-5xl font-serif text-[#7D8461] text-center py-4">
                S/ 7.00
              </div>

              <div className="bg-stone-50/50 p-8 sm:p-10 rounded-[3rem] border border-stone-100 space-y-10 flex-grow">
                <h4 className="text-xl font-bold flex items-center gap-3">✨ Personaliza tu Jabón</h4>
                <div className="space-y-8">
                  
                  <div>
                    <p className="text-sm font-bold text-stone-400 uppercase tracking-widest mb-6">Arcilla (opcional)</p>
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
                      {arcillas.map(a => (
                        <label 
                          key={a.id} 
                          className={`flex items-center gap-4 p-5 bg-white rounded-3xl border cursor-pointer hover:border-[#7D8461] transition-all
                            ${opc.arc === a.id ? 'border-[#7D8461] shadow-sm' : 'border-stone-100'}`}
                          onClick={(e) => {
                            e.preventDefault(); 
                            setOpc({...opc, arc: opc.arc === a.id ? '' : a.id});
                          }}
                        >
                          <input type="radio" checked={opc.arc === a.id} readOnly className="accent-[#7D8461] w-5 h-5 flex-shrink-0" />
                          <div><p className="text-sm sm:text-base font-bold text-[#2D2A26]">Arcilla {a.id}</p><p className="text-xs text-stone-400">{a.d}</p></div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 pt-6 border-t border-stone-100">
                    
                    <div className="space-y-6">
                      <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">Esencia (+ S/ 1.50)</p>
                      <div className="flex flex-col gap-4">
                        {['Chocolate', 'Romero', 'Vainilla', 'Orquídea'].map(e => (
                          <label 
                            key={e} 
                            className="flex items-center gap-4 text-sm sm:text-base font-bold cursor-pointer group"
                            onClick={(ev) => {
                              ev.preventDefault();
                              setOpc({...opc, esc: opc.esc === e ? '' : e});
                            }}
                          >
                            <input type="radio" checked={opc.esc === e} readOnly className="accent-[#7D8461] w-5 h-5 flex-shrink-0" /> 
                            <span className="group-hover:text-[#7D8461] transition-colors">{e}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-6">
                      <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">Aceite Adicional</p>
                      <div className="flex flex-col gap-4">
                        {Object.keys(PRECIOS.aceites).map(a => (
                          <label 
                            key={a} 
                            className="flex items-center text-sm sm:text-base font-bold cursor-pointer group w-full"
                            onClick={(ev) => {
                              ev.preventDefault();
                              setOpc({...opc, ace: opc.ace === a ? '' : a});
                            }}
                          >
                            <input type="radio" checked={opc.ace === a} readOnly className="accent-[#7D8461] w-5 h-5 mr-3 flex-shrink-0" /> 
                            
                            <div className="flex-grow flex justify-between items-center">
                              <span className="group-hover:text-[#7D8461] transition-colors pr-2 leading-tight">{a}</span>
                              <span className="text-xs text-[#7D8461] whitespace-nowrap font-bold">+ S/ {PRECIOS.aceites[a].toFixed(2)}</span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              <div className="flex flex-col xl:flex-row xl:items-center justify-between pt-8 border-t border-stone-100 gap-6 mt-auto">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 block mb-1">Total a pagar</span>
                  <div className="text-3xl sm:text-4xl font-serif text-[#2D2A26] whitespace-nowrap">S/ {(calcPrecio() * opc.cant).toFixed(2)}</div>
                </div>
                
                <div className="flex items-center gap-4 sm:gap-6 w-full xl:w-auto">
                  <div className="flex items-center justify-between bg-stone-100 rounded-full p-1.5 sm:p-2 w-36 sm:w-40 font-bold text-xl">
                    <button 
                      onClick={() => setOpc({...opc, cant: Math.max(1, opc.cant - 1)})} 
                      className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full hover:bg-stone-200 hover:text-[#7D8461] active:scale-90 transition-all cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-base sm:text-lg flex-grow text-center">{opc.cant}</span>
                    <button 
                      onClick={() => setOpc({...opc, cant: opc.cant + 1})} 
                      className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full hover:bg-stone-200 hover:text-[#7D8461] active:scale-90 transition-all cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                  
                  <button onClick={() => {
                    agregarAlCarrito({
                      ...sel, 
                      uniqueId: `${sel.id}-${opc.arc}-${opc.esc}-${opc.ace}-${Date.now()}`, 
                      precio: calcPrecio(), 
                      cantidad: opc.cant, 
                      extras: opc
                    });
                    cerrarModal();
                  }} className="flex-grow xl:flex-grow-0 bg-[#2D2A26] text-white px-8 py-4 sm:px-12 sm:py-5 rounded-full font-bold uppercase text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.3em] shadow-xl hover:bg-[#7D8461] transition-all whitespace-nowrap text-center">
                    Añadir
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      <div className="text-center space-y-10">
        <h2 className="text-5xl sm:text-7xl font-serif text-[#2D2A26]">Catálogo Artesanal</h2>
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 px-4">
          {['Todos', 'Grasa', 'Mixta', 'Seca', 'Sensible', 'Normal'].map(f => (
            <button key={f} onClick={() => setFiltro(f)} className={`px-6 sm:px-10 py-3 sm:py-4 rounded-full text-[10px] sm:text-xs font-bold tracking-widest border-2 transition-all ${filtro === f ? 'bg-[#7D8461] text-white border-[#7D8461]' : 'bg-white text-stone-400 border-stone-100 hover:border-stone-200'}`}>{f.toUpperCase()}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-16">
        {productos.filter(p => filtro === 'Todos' || p.piel.some(s => s.toLowerCase().includes(filtro.toLowerCase()))).map(p => (
          <div key={p.id} className="group bg-white rounded-[3rem] sm:rounded-[4rem] overflow-hidden border border-stone-50 hover:shadow-2xl transition-all cursor-pointer relative" onClick={() => setSel(p)}>
            <div className="aspect-[4/5] overflow-hidden relative">
              <img src={p.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="" />
              <div className="absolute top-6 sm:top-8 left-6 sm:left-8 bg-[#7D8461] text-white px-4 py-2 rounded-full text-[9px] font-bold uppercase tracking-widest shadow-lg">✨ Personalizable</div>
              <div className="absolute bottom-6 sm:bottom-10 right-6 sm:right-10 bg-white/95 px-6 sm:px-8 py-2 sm:py-3 rounded-3xl font-serif font-bold text-xl sm:text-2xl shadow-xl">S/ 7.00</div>
            </div>
            <div className="p-10 sm:p-14 text-center space-y-6">
              <h3 className="text-3xl sm:text-4xl font-serif text-[#2D2A26] leading-tight">{p.nombre}</h3>
              <p className="text-stone-400 text-sm sm:text-base leading-relaxed line-clamp-2">
                {Array.isArray(p.beneficios) ? p.beneficios.join(" • ") : p.beneficios}
              </p>
              <p className="text-[#7D8461] text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] pt-4">Personalizar Jabón</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}