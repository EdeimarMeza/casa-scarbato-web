"use client";
import { useState, useEffect } from 'react';

export default function Home() {
  const [seccion, setSeccion] = useState('inicio');
  const [carrito, setCarrito] = useState([]);
  const [filtroPiel, setFiltroPiel] = useState('Todos');
  const [personalizado, setPersonalizado] = useState({ piel: "", arcilla: "", esencia: "" });
  
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [notificacion, setNotificacion] = useState({ visible: false, mensaje: '' });
  const [menuMovil, setMenuMovil] = useState(false);
  const [cargado, setCargado] = useState(false);

  useEffect(() => {
    const carritoGuardado = localStorage.getItem('carritoCasaScarbato');
    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado));
    }
    setCargado(true);
  }, []);

  useEffect(() => {
    if (cargado) {
      localStorage.setItem('carritoCasaScarbato', JSON.stringify(carrito));
    }
  }, [carrito, cargado]);

  const productos = [
    { id: 1, nombre: "Jabón de Carbón Activado", info: "El carbón activado atrae y retiene toxinas, grasa e impurezas.", piel: ["Grasa", "Mixta"], beneficios: ["Purificante", "Limpieza Profunda"], img: "/carbon.webp" },
    { id: 2, nombre: "Jabón de Arroz", info: "Ilumina y unifica el tono de la piel, ayuda a atenuar manchitas con uso constante.", piel: ["Sensible", "Seca", "Normal"], beneficios: ["Iluminador", "Suavizante"], img: "/arroz.webp" },
    { id: 3, nombre: "Jabón de Avena", info: "Calma irritaciones y picazón, limpieza delicada para uso diario, hidrata y suaviza.", piel: ["Sensible", "Seca"], beneficios: ["Calmante", "Hidratante"], img: "/avena.webp" },
    { id: 4, nombre: "Jabón de Ruda y Romero", info: "Antiséptico y antibacteriano, ayuda con granitos y estimula la circulación.", piel: ["Grasa", "Mixta"], beneficios: ["Antibacteriano", "Estimulante"], img: "/ruda.webp" },
    { id: 5, nombre: "Jabón de Cúrcuma", info: "Antiinflamatorio y antioxidante, ilumina y unifica el tono, bueno para rojeces.", piel: ["Normal", "Mixta", "Sensible"], beneficios: ["Antiinflamatorio", "Antioxidante"], img: "/curcuma.webp" },
    { id: 6, nombre: "Jabón de Canela", info: "Estimula la circulación (sensación de calor), aroma cálido, ideal para cuerpo.", piel: ["Grasa", "Normal"], beneficios: ["Energizante", "Aroma cálido"], img: "/canela.webp" },
    { id: 7, nombre: "Jabón de Café y Arroz", info: "Exfoliante rico en antioxidantes. Elimina células muertas dejando la piel lisa.", piel: ["Normal", "Mixta"], beneficios: ["Exfoliante", "Renovador"], img: "/cafe.webp" }
  ];

  const infoPiel = {
    Grasa: { desc: "Piel con exceso de sebo, poros dilatados y tendencia a brillar.", arcillas: ["Verde", "Chaco"], color: "bg-blue-50 border-blue-100" },
    Mixta: { desc: "Zona T grasa (frente, nariz, mentón) y mejillas normales o secas.", arcillas: ["Blanca", "Verde"], color: "bg-yellow-50 border-yellow-100" },
    Seca: { desc: "Piel que se siente tirante, con tendencia a descamarse.", arcillas: ["Rosa", "Blanca"], color: "bg-orange-50 border-orange-100" },
    Sensible: { desc: "Piel reactiva, propensa a rojeces e irritaciones.", arcillas: ["Rosa", "Blanca"], color: "bg-pink-50 border-pink-100" },
    Normal: { desc: "Piel equilibrada, sin exceso de grasa ni sequedad.", arcillas: ["Blanca"], color: "bg-green-50 border-green-100" }
  };

  const agregarAlCarrito = (p) => {
    const uniqueId = p.id ? `prod-${p.id}` : `custom-${p.piel}-${p.arcilla}`;
    setCarrito(prev => {
      const existe = prev.find(item => item.uniqueId === uniqueId);
      if (existe) {
        return prev.map(item => item.uniqueId === uniqueId ? { ...item, cantidad: item.cantidad + 1 } : item);
      } else {
        return [...prev, { ...p, uniqueId, cantidad: 1 }];
      }
    });
    setProductoSeleccionado(null);
    setNotificacion({ visible: true, mensaje: `🌿 ${p.nombre} añadido al pedido` });
    setTimeout(() => setNotificacion({ visible: false, mensaje: '' }), 3000);
  };

  const cambiarCantidad = (uniqueId, delta) => {
    setCarrito(prev => prev.map(item => {
      if (item.uniqueId === uniqueId) {
        return { ...item, cantidad: Math.max(1, item.cantidad + delta) };
      }
      return item;
    }));
  };

  const eliminarProducto = (uniqueId) => {
    if(confirm("¿Deseas eliminar este jabón?")) {
      setCarrito(prev => prev.filter(item => item.uniqueId !== uniqueId));
    }
  };

  const calcularTotal = () => carrito.reduce((total, item) => total + (item.cantidad * 7), 0);

  const enviarWhatsApp = () => {
    let msg = `*Hola Casa Scarbato! Quisiera hacer un pedido:*%0A%0A`;
    carrito.forEach((item) => {
      msg += `*${item.cantidad}x ${item.nombre}*`;
      if(item.arcilla) msg += ` (Arcilla ${item.arcilla})`;
      msg += `%0A`;
    });
    msg += `%0A*Total: S/ ${calcularTotal()}.00*%0A_Coordinamos el pago y la entrega._`;
    window.open(`https://wa.me/51916278938?text=${msg}`, '_blank');
  };

  return (
    <main className="min-h-screen bg-[#FDFBF9] text-[#43403B] antialiased relative">
      <a href="https://wa.me/51916278938" target="_blank" className="fixed bottom-6 right-6 z-[150] bg-[#25D366] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
        <span className="text-3xl">💬</span>
      </a>

      {notificacion.visible && (
        <div className="fixed bottom-10 right-24 z-[200] animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="bg-[#2D2A26] text-white px-8 py-5 rounded-2xl shadow-2xl border border-[#7D8461]/30">
            <p className="font-bold text-sm tracking-wide">{notificacion.mensaje}</p>
          </div>
        </div>
      )}

      <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-stone-100 px-8 py-6 flex justify-between items-center">
        <div className="flex items-center gap-5 cursor-pointer" onClick={() => setSeccion('inicio')}>
          <img src="/logo.webp" alt="Logo" className="w-16 h-16 rounded-full shadow-sm" />
          <div className="flex flex-col">
            <h1 className="font-serif text-2xl font-bold tracking-tight text-[#2D2A26]">CASA SCARBATO</h1>
            <p className="text-xs uppercase tracking-[0.4em] text-[#7D8461] font-bold">La alquimia de lo natural</p>
          </div>
        </div>
        <div className="hidden md:flex gap-12 text-sm uppercase tracking-[0.2em] font-bold text-stone-400">
          {['inicio', 'catálogo', 'personalizar', 'contacto'].map(s => (
            <button key={s} onClick={() => setSeccion(s)} className={`hover:text-[#7D8461] transition-all pb-2 border-b-2 ${seccion === s ? 'text-[#7D8461] border-[#7D8461]' : 'border-transparent'}`}>{s.charAt(0).toUpperCase() + s.slice(1)}</button>
          ))}
        </div>
        <div className="flex items-center gap-6">
          <button onClick={() => setSeccion('carrito')} className="relative text-2xl">
            🛒 <span className="absolute -top-2 -right-2 bg-[#7D8461] text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center border-2 border-white font-bold">{carrito.reduce((acc, item) => acc + item.cantidad, 0)}</span>
          </button>
          <button onClick={() => setMenuMovil(!menuMovil)} className="md:hidden text-2xl">☰</button>
        </div>
        {menuMovil && (
          <div className="absolute top-full left-0 w-full bg-[#FDFBF9] border-b border-stone-200 p-6 flex flex-col gap-4 md:hidden shadow-xl">
            {['inicio', 'catálogo', 'personalizar', 'contacto'].map(s => (
              <button key={s} onClick={() => { setSeccion(s); setMenuMovil(false); }} className="text-left py-3 border-b border-stone-100 uppercase tracking-widest text-xs font-bold">{s.charAt(0).toUpperCase() + s.slice(1)}</button>
            ))}
          </div>
        )}
      </nav>

      <div className="max-w-7xl mx-auto px-8 py-16">
        {seccion === 'inicio' && (
          <section className="flex flex-col items-center text-center space-y-14 animate-in fade-in zoom-in duration-1000">
            <img src="/logosf.webp" className="w-80 h-80 object-contain drop-shadow-xl" alt="Casa Scarbato" />
            <h2 className="text-6xl font-serif text-[#2D2A26] italic">Nuestra Historia</h2>
            <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-stone-100 max-w-3xl">
              <p className="text-stone-500 text-xl leading-relaxed font-light italic">"Casa Scarbato nace del cariño por lo simple, lo natural y lo bien hecho. Cada jabón es elaborado artesanalmente, con calma y dedicación."</p>
            </div>
            <button onClick={() => setSeccion('catálogo')} className="bg-[#2D2A26] text-white px-16 py-5 rounded-full text-xs font-bold uppercase tracking-[0.3em] hover:bg-[#7D8461] transition-all">Explorar Catálogo</button>
          </section>
        )}

        {seccion === 'catálogo' && (
          <section className="space-y-20">
            <div className="text-center space-y-6">
              <h2 className="text-5xl font-serif text-[#2D2A26]">Catálogo Artesanal</h2>
              <div className="flex flex-wrap justify-center gap-4">
                {['Todos', 'Grasa', 'Mixta', 'Seca', 'Sensible', 'Normal'].map(f => (
                  <button key={f} onClick={() => setFiltroPiel(f)} className={`px-8 py-3 rounded-full text-xs font-bold border-2 transition-all ${filtroPiel === f ? 'bg-[#7D8461] text-white border-[#7D8461]' : 'bg-white text-stone-400 border-stone-100'}`}>{f.toUpperCase()}</button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
              {productos.filter(p => filtroPiel === 'Todos' || p.piel.includes(filtroPiel)).map(p => (
                <div key={p.id} className="group bg-white rounded-[3rem] overflow-hidden border border-stone-50 hover:shadow-2xl transition-all cursor-pointer" onClick={() => setProductoSeleccionado(p)}>
                  <div className="aspect-[4/5] overflow-hidden relative">
                    <img src={p.img} alt={p.nombre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute bottom-8 right-8 bg-white/95 px-6 py-2 rounded-2xl font-serif font-bold text-xl shadow-lg">S/ 7.00</div>
                  </div>
                  <div className="p-12 text-center space-y-6">
                    <h3 className="text-3xl font-serif text-[#2D2A26]">{p.nombre}</h3>
                    <button onClick={(e) => { e.stopPropagation(); agregarAlCarrito(p); }} className="w-full border-2 border-[#2D2A26] py-5 rounded-[2rem] text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#2D2A26] hover:text-white transition-all">Añadir</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {seccion === 'contacto' && (
          <section className="max-w-6xl mx-auto space-y-16">
            <h2 className="text-5xl font-serif text-[#2D2A26] text-center">Contacto</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="bg-white p-12 rounded-[3rem] shadow-sm space-y-8 text-center md:text-left">
                <h3 className="text-3xl font-serif mb-8 border-b pb-6 text-[#2D2A26]">Información</h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-6 p-6 bg-green-50 rounded-[2rem] border border-green-100">
                    <img src="/wtsp.webp" alt="WhatsApp" className="w-14 h-14 object-contain" />
                    <div><p className="text-xs font-bold text-green-700 uppercase">WhatsApp</p><p className="text-xl font-bold">+51 916 278 938</p></div>
                  </div>
                  <div className="flex items-center gap-6 p-6 bg-pink-50 rounded-[2rem] border border-pink-100">
                    <img src="/inst.webp" alt="Instagram" className="w-14 h-14 object-contain" />
                    <div><p className="text-xs font-bold text-pink-700 uppercase">Instagram</p><p className="text-xl font-bold">@CasaScarbato</p></div>
                  </div>
                </div>
              </div>
              <div className="bg-[#7D8461] text-white p-16 rounded-[3rem] text-center flex flex-col items-center justify-center space-y-8">
                <img src="/wtsp.webp" alt="WhatsApp" className="w-20 h-20 brightness-0 invert" />
                <h3 className="text-4xl font-serif italic italic">¡Escríbenos!</h3>
                <button onClick={enviarWhatsApp} className="w-full bg-white text-[#7D8461] py-6 rounded-2xl font-bold uppercase text-xs shadow-xl">WhatsApp</button>
              </div>
            </div>
          </section>
        )}

        {seccion === 'carrito' && (
          <section className="max-w-3xl mx-auto bg-white p-16 rounded-[4rem] shadow-2xl">
            <h2 className="text-4xl font-serif mb-12 text-center text-[#2D2A26]">Tu Pedido</h2>
            {carrito.length === 0 ? (
              <p className="text-center text-stone-400 italic text-xl py-12">Carrito vacío...</p>
            ) : (
              <div className="space-y-10">
                {carrito.map((item) => (
                  <div key={item.uniqueId} className="flex justify-between items-center border-b pb-8">
                    <div>
                      <p className="font-bold text-lg text-[#2D2A26]">{item.nombre}</p>
                      <p className="text-xs text-[#7D8461] font-bold uppercase mt-1">S/ 7.00 c/u</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3 bg-[#F9F8F6] rounded-full px-4 py-2 border">
                        <button onClick={() => cambiarCantidad(item.uniqueId, -1)} className="font-bold">-</button>
                        <span className="font-bold w-6 text-center">{item.cantidad}</span>
                        <button onClick={() => cambiarCantidad(item.uniqueId, 1)} className="font-bold">+</button>
                      </div>
                      <button onClick={() => eliminarProducto(item.uniqueId)} className="text-red-400">🗑️</button>
                    </div>
                  </div>
                ))}
                <div className="pt-8 text-center">
                  <p className="text-5xl font-serif text-[#2D2A26] mb-8">Total: S/ {calcularTotal()}.00</p>
                  <button onClick={enviarWhatsApp} className="w-full bg-[#25D366] text-white py-7 rounded-[2.5rem] font-bold uppercase text-xs shadow-xl">Confirmar</button>
                </div>
              </div>
            )}
          </section>
        )}
      </div>

      <footer className="bg-[#1A1816] text-[#F4F1EA] py-20 text-center rounded-t-[4rem]">
        <p className="text-xs tracking-[0.3em] font-bold uppercase opacity-50">Casa Scarbato © 2026</p>
      </footer>
    </main>
  );
}
