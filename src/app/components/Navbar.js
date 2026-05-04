"use client";
import { useState } from 'react';

export default function Navbar({ seccion, setSeccion, cantidad }) {
  const [menuMovil, setMenuMovil] = useState(false);

  const menuItems = [
    { id: 'inicio', label: 'INICIO' },
    { id: 'catalogo', label: 'CATÁLOGO' },
    { id: 'personalizar', label: 'PERSONALIZAR' },
    { id: 'comprar', label: 'CÓMO COMPRAR' },
    { id: 'cuidados', label: 'CUIDADOS' },
    { id: 'faq', label: 'PREGUNTAS' },
    { id: 'historia', label: 'HISTORIA' },
    { id: 'contacto', label: 'CONTACTO' }
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-stone-100 px-8 py-6 flex justify-between items-center relative">
      <div className="flex items-center gap-5 cursor-pointer" onClick={() => setSeccion('inicio')}>
        <img src="/logo.webp" alt="Logo" className="w-16 h-16 rounded-full shadow-sm" />
        <div className="flex flex-col">
          <h1 className="font-serif text-2xl font-bold tracking-tight text-[#2D2A26]">CASA SCARBATO</h1>
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#7D8461] font-bold">La alquimia de lo natural</p>
        </div>
      </div>

      <div className="hidden lg:flex gap-8 text-[10px] xl:text-[11px] uppercase tracking-[0.2em] font-bold text-stone-400">
        {menuItems.map(item => (
          <button 
            key={item.id} 
            onClick={() => setSeccion(item.id)} 
            className={`hover:text-[#7D8461] transition-all pb-2 border-b-2 font-bold tracking-widest ${seccion === item.id ? 'text-[#7D8461] border-[#7D8461]' : 'border-transparent'}`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-6">
        <button onClick={() => setSeccion('carrito')} className="relative text-2xl hover:scale-110 transition-transform">
          🛒 <span className="absolute -top-2 -right-2 bg-[#7D8461] text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center border-2 border-white font-bold">{cantidad}</span>
        </button>
        <button onClick={() => setMenuMovil(!menuMovil)} className="lg:hidden text-2xl">{menuMovil ? '✕' : '☰'}</button>
      </div>
      
      {menuMovil && (
        <div className="absolute top-full left-0 w-full bg-[#FDFBF9] p-6 flex flex-col gap-4 lg:hidden shadow-xl border-b animate-in slide-in-from-top-2">
          {menuItems.map(item => (
            <button key={item.id} onClick={() => { setSeccion(item.id); setMenuMovil(false); }} className="text-left py-4 border-b border-stone-100 uppercase font-bold text-xs tracking-widest">{item.label}</button>
          ))}
        </div>
      )}
    </nav>
  );
}