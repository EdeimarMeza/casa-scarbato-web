"use client";
import { useState, useEffect } from 'react';

export default function Home() {
  const [seccion, setSeccion] = useState('inicio');
  const [carrito, setCarrito] = useState([]);
  const [filtroPiel, setFiltroPiel] = useState('Todos');
  const [personalizado, setPersonalizado] = useState({ piel: "", arcilla: "", esencia: "" });
  
  // Estados existentes
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [notificacion, setNotificacion] = useState({ visible: false, mensaje: '' });
  
  // NUEVO: Estado para el menú en celulares
  const [menuMovil, setMenuMovil] = useState(false);
  const [cargado, setCargado] = useState(false); // Para evitar errores de hidratación

  // NUEVO: Cargar carrito guardado al iniciar
  useEffect(() => {
    const carritoGuardado = localStorage.getItem('carritoCasaScarbato');
    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado));
    }
    setCargado(true);
  }, []);

  // NUEVO: Guardar carrito cada vez que cambia
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

  const mostrarNotificacion = (nombreProducto) => {
    setNotificacion({ visible: true, mensaje: `🌿 ${nombreProducto} añadido a tu carrito` });
    setTimeout(() => { setNotificacion({ visible: false, mensaje: '' }); }, 3000);
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
    mostrarNotificacion(p.nombre);
  };

  const cambiarCantidad = (uniqueId, delta) => {
    setCarrito(prev => prev.map(item => {
      if (item.uniqueId === uniqueId) {
        const nuevaCantidad = Math.max(1, item.cantidad + delta);
        return { ...item, cantidad: nuevaCantidad };
      }
      return item;
    }));
  };

  const eliminarProducto = (uniqueId) => {
    if(confirm("¿Seguro que deseas eliminar este jabón del pedido?")) {
      setCarrito(prev => prev.filter(item => item.uniqueId !== uniqueId));
    }
  };

  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + (item.cantidad * 7), 0);
  };

  const enviarWhatsApp = () => {
    let msg = `*Hola Casa Scarbato! Quisiera hacer un pedido:*%0A%0A`;
    carrito.forEach((item, i) => {
      msg += `*${item.cantidad}x ${item.nombre}*`;
      if(item.arcilla) msg += ` (Arcilla ${item.arcilla})`;
      msg += `%0A`;
    });
    msg += `%0A*Total a pagar: S/ ${calcularTotal()}.00*%0A_Coordinamos el pago y la entrega._`;
    window.open(`https://wa.me/51916278938?text=${msg}`, '_blank');
  };

  return (
    <main className="min-h-screen bg-[#FDFBF9] text-[#43403B] antialiased relative">
      
      {/* NUEVO: BOTÓN FLOTANTE DE WHATSAPP */}
      <a href="https://wa.me/51916278938" target="_blank" className="fixed bottom-6 right-6 z-[150] bg-[#25D366] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform hover:-rotate-12 border-2 border-white">
        <span className="text-3xl">💬</span>
      </a>

      {/* NOTIFICACIÓN TOAST */}
      {notificacion.visible && (
        <div className="fixed bottom-10 right-24 z-[200] animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="bg-[#2D2A26] text-white px-8 py-5 rounded-2xl shadow-2xl flex items-center gap-4 border border-[#7D8461]/30">
            <span className="text-xl">🛍️</span>
            <div><p className="font-bold text-sm tracking-wide">{notificacion.mensaje}</p></div>
          </div>
        </div>
      )}

      {/* POP-UP DE PRODUCTO */}
      {productoSeleccionado && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity" onClick={() => setProductoSeleccionado(null)}></div>
          <div className="relative bg-[#FDFBF9] w-full max-w-4xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-300">
            <button onClick={() => setProductoSeleccionado(null)} className="absolute top-6 right-6 z-10 bg-white/50 hover:bg-white w-12 h-12 rounded-full flex items-center justify-center text-xl transition-colors shadow-sm">✕</button>
            <div className="md:w-1/2 h-72 md:h-auto relative">
              <img src={productoSeleccionado.img} className="w-full h-full object-cover" alt={productoSeleccionado.nombre} />
            </div>
            <div className="md:w-1/2 p-10 md:p-14 flex flex-col justify-center space-y-8 bg-white">
              <div>
                <h3 className="text-4xl font-serif text-[#2D2A26] mb-4">{productoSeleccionado.nombre}</h3>
                <p className="text-stone-500 leading-relaxed text-lg">{productoSeleccionado.info}</p>
              </div>
              <div className="space-y-4 border-y border-stone-100 py-6">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#7D8461] mb-3">Beneficios Clave</p>
                  <div className="flex gap-2 flex-wrap">{productoSeleccionado.beneficios?.map(b => <span key={b} className="bg-[#F4F5EF] text-[#7D8461] px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase">{b}</span>)}</div>
                </div>
                <div className="pt-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-3">Ideal para piel:</p>
                  <div className="flex gap-2 flex-wrap">{productoSeleccionado.piel.map(p => <span key={p} className="border border-stone-200 text-stone-500 px-4 py-1 rounded-full text-xs uppercase tracking-wider">{p}</span>)}</div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-4xl font-serif text-[#2D2A26]">S/ 7.00</span>
                <button onClick={() => agregarAlCarrito(productoSeleccionado)} className="bg-[#2D2A26] text-white px-10 py-5 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#7D8461] transition-all shadow-xl hover:-translate-y-1">Añadir al pedido</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* NAVBAR */}
      <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-stone-100 px-8 py-6 flex justify-between items-center relative">
        <div className="flex items-center gap-5 cursor-pointer" onClick={() => setSeccion('inicio')}>
          <img src="/logo.webp" alt="Logo" className="w-16 h-16 rounded-full shadow-sm" />
          <div className="flex flex-col">
            <h1 className="font-serif text-2xl font-bold tracking-tight text-[#2D2A26]">CASA SCARBATO</h1>
            <p className="text-xs uppercase tracking-[0.4em] text-[#7D8461] font-bold">La alquimia de lo natural</p>
          </div>
        </div>

        {/* MENÚ DE ESCRITORIO (md:flex) */}
        <div className="hidden md:flex gap-12 text-sm uppercase tracking-[0.2em] font-bold text-stone-400">
          {['inicio', 'catálogo', 'personalizar', 'contacto'].map(s => (
            <button key={s} onClick={() => setSeccion(s)} className={`hover:text-[#7D8461] transition-all pb-2 border-b-2 ${seccion === s ? 'text-[#7D8461] border-[#7D8461]' : 'border-transparent'}`}>{s.charAt(0).toUpperCase() + s.slice(1)}</button>
          ))}
        </div>

        {/* ICONOS DERECHA: CARRITO Y HAMBURGUESA */}
        <div className="flex items-center gap-6">
            <button onClick={() => setSeccion('carrito')} className="relative text-2xl hover:scale-110 transition-transform">
            🛒 <span className="absolute -top-2 -right-2 bg-[#7D8461] text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center border-2 border-white font-bold">{carrito.reduce((acc, item) => acc + item.cantidad, 0)}</span>
            </button>
            {/* Botón Hamburguesa (Solo Móvil) */}
            <button onClick={() => setMenuMovil(!menuMovil)} className="md:hidden text-2xl text-[#2D2A26]">
                {menuMovil ? '✕' : '☰'}
            </button>
        </div>

        {/* MENÚ MÓVIL DESPLEGABLE */}
        {menuMovil && (
            <div className="absolute top-full left-0 w-full bg-[#FDFBF9] border-b border-stone-200 p-6 flex flex-col gap-4 md:hidden shadow-xl animate-in slide-in-from-top-5">
                {['inicio', 'catálogo', 'personalizar', 'contacto'].map(s => (
                    <button key={s} onClick={() => { setSeccion(s); setMenuMovil(false); }} className={`text-left py-3 border-b border-stone-100 uppercase tracking-widest text-xs font-bold ${seccion === s ? 'text-[#7D8461]' : 'text-stone-500'}`}>
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                ))}
            </div>
        )}
      </nav>

      <div className="max-w-7xl mx-auto px-8 py-16">
        {/* SECCIÓN INICIO */}
        {seccion === 'inicio' && (
          <section className="flex flex-col items-center text-center space-y-14 animate-in fade-in zoom-in duration-1000">
            <img src="/logosf.webp" className="w-80 h-80 object-contain drop-shadow-xl" alt="Casa Scarbato" />
            <div className="max-w-3xl space-y-8">
              <h2 className="text-6xl font-serif text-[#2D2A26] italic">Nuestra Historia</h2>
              <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-stone-100">
                <p className="text-stone-500 text-xl leading-relaxed font-light italic">"Casa Scarbato nace del cariño por lo simple, lo natural y lo bien hecho. Cada jabón es elaborado artesanalmente, con calma y dedicación."</p>
              </div>
            </div>
            <button onClick={() => setSeccion('catálogo')} className="bg-[#2D2A26] text-white px-16 py-5 rounded-full text-xs font-bold uppercase tracking-[0.3em] hover:bg-[#7D8461] transition-all shadow-xl">Explorar Catálogo</button>
          </section>
        )}

        {/* SECCIÓN CATÁLOGO */}
        {seccion === 'catálogo' && (
          <section className="space-y-20 animate-in slide-in-from-bottom-12 duration-700">
            <div className="text-center space-y-6">
              <h2 className="text-5xl font-serif text-[#2D2A26]">Catálogo Artesanal</h2>
              <p className="text-stone-400 italic text-lg text-center">Todos nuestros jabones tienen un precio único de S/ 7.00</p>
              <div className="flex flex-wrap justify-center gap-4 pt-8">
                {['Todos', 'Grasa', 'Mixta', 'Seca', 'Sensible', 'Normal'].map(f => (
                  <button key={f} onClick={() => setFiltroPiel(f)} className={`px-8 py-3 rounded-full text-xs font-bold tracking-widest border-2 transition-all ${filtroPiel === f ? 'bg-[#7D8461] text-white border-[#7D8461] shadow-lg' : 'bg-white text-stone-400 border-stone-100 hover:border-stone-300'}`}>{f.toUpperCase()}</button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
              {productos.filter(p => filtroPiel === 'Todos' || p.piel.includes(filtroPiel)).map(p => (
                <div key={p.id} className="group bg-white rounded-[3rem] overflow-hidden border border-stone-50 hover:shadow-2xl transition-all duration-700 flex flex-col cursor-pointer" onClick={() => setProductoSeleccionado(p)}>
                  <div className="aspect-[4/5] overflow-hidden relative">
                    <img src={p.img} alt={p.nombre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                    <div className="absolute top-8 left-8 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full text-[9px] font-bold uppercase tracking-widest text-[#7D8461] opacity-0 group-hover:opacity-100 transition-opacity">Ver Detalles</div>
                    <div className="absolute bottom-8 right-8 bg-white/95 backdrop-blur-sm px-6 py-2 rounded-2xl font-serif font-bold text-xl shadow-lg">S/ 7.00</div>
                  </div>
                  <div className="p-12 text-center space-y-6 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="text-3xl font-serif text-[#2D2A26] mb-4">{p.nombre}</h3>
                      <p className="text-stone-400 text-sm font-light leading-relaxed line-clamp-2">{p.info}</p>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); agregarAlCarrito(p); }} className="w-full border-2 border-[#2D2A26] py-5 rounded-[2rem] text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#2D2A26] hover:text-white transition-all">Añadir al pedido</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECCIÓN PERSONALIZAR */}
        {seccion === 'personalizar' && (
          <section className="space-y-16 animate-in fade-in duration-700">
            <div className="text-center space-y-4">
              <h2 className="text-5xl font-serif text-[#2D2A26]">Elige tu Jabón</h2>
              <p className="text-stone-500 text-lg italic">Selecciona tu tipo de piel para ver recomendaciones personalizadas</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {Object.keys(infoPiel).map(piel => (
                <button key={piel} onClick={() => setPersonalizado({...personalizado, piel, arcilla: ""})} className={`p-8 rounded-[2rem] border-2 text-center transition-all ${personalizado.piel === piel ? 'ring-4 ring-[#7D8461]/20 scale-105 shadow-xl border-[#7D8461]' : 'opacity-60 border-stone-100'} ${infoPiel[piel].color}`}>
                  <span className="text-4xl block mb-4">{piel === 'Grasa' ? '💧' : piel === 'Mixta' ? '☀️' : piel === 'Seca' ? '🍂' : piel === 'Sensible' ? '❤️' : '✨'}</span>
                  <h4 className="font-bold text-sm mb-3 uppercase tracking-widest">Piel {piel}</h4>
                  <p className="text-[11px] leading-relaxed text-stone-600">{infoPiel[piel].desc}</p>
                </button>
              ))}
            </div>
            {personalizado.piel && (
              <div className="bg-white p-16 rounded-[4rem] shadow-xl border border-stone-50 text-center animate-in slide-in-from-bottom-8">
                <h3 className="text-3xl font-serif mb-10 text-[#2D2A26]">Personalización para Piel {personalizado.piel}</h3>
                <div className="flex flex-wrap justify-center gap-6 mb-12">
                  {infoPiel[personalizado.piel].arcillas.map(arc => (
                    <button key={arc} onClick={() => setPersonalizado({...personalizado, arcilla: arc})} className={`px-12 py-5 rounded-full border-2 font-bold text-xs uppercase tracking-[0.2em] transition-all ${personalizado.arcilla === arc ? 'bg-[#7D8461] text-white border-[#7D8461]' : 'border-stone-100 text-stone-400'}`}>Arcilla {arc}</button>
                  ))}
                </div>
                <button onClick={() => { if(!personalizado.arcilla) return alert("Selecciona una arcilla"); agregarAlCarrito({nombre: `Jabón Personalizado (${personalizado.piel} - Arcilla ${personalizado.arcilla})`}); }} className="bg-[#2D2A26] text-white px-16 py-6 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#7D8461] transition-all shadow-xl">Añadir al Carrito • S/ 7.00</button>
              </div>
            )}
          </section>
        )}

        {/* SECCIÓN CONTACTO (INTACTA) */}
        {seccion === 'contacto' && (
          <section className="max-w-6xl mx-auto space-y-16 animate-in fade-in">
            <div className="text-center space-y-4">
              <h2 className="text-5xl font-serif text-[#2D2A26]">Contacto</h2>
              <p className="text-stone-500 italic text-lg">¿Tienes alguna pregunta o quieres hacer un pedido especial?</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="bg-white p-12 rounded-[3rem] shadow-sm space-y-8">
                <h3 className="text-3xl font-serif mb-8 border-b pb-6 text-[#2D2A26]">Información de Contacto</h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-6 p-6 bg-green-50 rounded-[2rem] border border-green-100"><span className="text-3xl">📱</span><div><p className="text-xs font-bold text-green-700 uppercase tracking-widest">WhatsApp</p><p className="text-xl font-bold">+51 916 278 938</p></div></div>
                  <div className="flex items-center gap-6 p-6 bg-pink-50 rounded-[2rem] border border-pink-100"><span className="text-3xl">📸</span><div><p className="text-xs font-bold text-pink-700 uppercase tracking-widest">Instagram</p><p className="text-xl font-bold">@CasaScarbato</p></div></div>
                  <div className="flex items-center gap-6 p-6 bg-stone-50 rounded-[2rem] border border-stone-200"><span className="text-3xl">✉️</span><div><p className="text-xs font-bold text-stone-500 uppercase tracking-widest">Email</p><p className="text-lg font-bold">casascarbato@gmail.com</p></div></div>
                </div>
              </div>
              <div className="space-y-8">
                <div className="bg-[#7D8461] text-white p-16 rounded-[3rem] text-center space-y-8 shadow-2xl">
                  <span className="text-6xl block">💬</span>
                  <h3 className="text-4xl font-serif italic">¡Escríbenos por WhatsApp!</h3>
                  <button onClick={enviarWhatsApp} className="w-full bg-white text-[#7D8461] py-6 rounded-2xl font-bold uppercase tracking-[0.2em] text-xs shadow-xl">Iniciar Conversación</button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* SECCIÓN CARRITO (MEJORADA) */}
        {seccion === 'carrito' && (
          <section className="max-w-3xl mx-auto bg-white p-16 rounded-[4rem] shadow-2xl animate-in slide-in-from-right-8">
            <h2 className="text-4xl font-serif mb-12 text-center text-[#2D2A26]">Tu Selección</h2>
            {carrito.length === 0 ? (
              <div className="text-center py-12 space-y-6">
                <p className="text-stone-400 italic text-xl">Tu carrito está esperando...</p>
                <button onClick={() => setSeccion('catálogo')} className="text-[#7D8461] font-bold uppercase tracking-widest text-xs border-b border-[#7D8461]">Ir al Catálogo</button>
              </div>
            ) : (
              <div className="space-y-10">
                {carrito.map((item) => (
                  <div key={item.uniqueId} className="flex flex-col md:flex-row justify-between items-center border-b border-stone-50 pb-8 gap-6">
                    <div className="flex gap-6 items-center w-full md:w-auto">
                      <div className="w-20 h-20 bg-[#F9F8F6] rounded-2xl flex items-center justify-center text-3xl shadow-inner">
                        {item.img ? <img src={item.img} className="w-full h-full object-cover rounded-2xl" /> : '🧼'}
                      </div>
                      <div>
                        <p className="font-bold text-lg text-[#2D2A26]">{item.nombre}</p>
                        <p className="text-xs text-[#7D8461] font-bold uppercase tracking-widest mt-1">S/ {item.precio || 7}.00 c/u</p>
                      </div>
                    </div>
                    
                    {/* CONTROLES DE CANTIDAD */}
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-3 bg-[#F9F8F6] rounded-full px-4 py-2 border border-stone-100">
                        <button onClick={() => cambiarCantidad(item.uniqueId, -1)} className="w-8 h-8 flex items-center justify-center text-stone-400 hover:text-[#2D2A26] font-bold text-lg transition-colors">−</button>
                        <span className="font-serif font-bold text-xl w-6 text-center">{item.cantidad}</span>
                        <button onClick={() => cambiarCantidad(item.uniqueId, 1)} className="w-8 h-8 flex items-center justify-center text-stone-400 hover:text-[#2D2A26] font-bold text-lg transition-colors">+</button>
                      </div>
                      <p className="font-serif font-bold text-xl text-[#2D2A26] w-20 text-right">S/ {item.cantidad * 7}</p>
                      <button onClick={() => eliminarProducto(item.uniqueId)} className="w-10 h-10 flex items-center justify-center bg-red-50 text-red-400 rounded-full hover:bg-red-500 hover:text-white transition-all">🗑️</button>
                    </div>
                  </div>
                ))}
                
                <div className="pt-8 bg-[#F9F8F6] -mx-16 -mb-16 p-16 rounded-b-[4rem] text-center">
                  <div className="flex justify-between items-end mb-10 max-w-md mx-auto border-b border-stone-200 pb-4">
                    <span className="text-sm font-bold uppercase tracking-widest text-stone-400">Total a Pagar</span>
                    <span className="text-5xl font-serif text-[#2D2A26]">S/ {calcularTotal()}.00</span>
                  </div>
                  <button onClick={enviarWhatsApp} className="w-full max-w-md bg-[#25D366] text-white py-7 rounded-[2.5rem] font-bold uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-4 shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
                    <span className="text-xl">📱</span> Confirmar Pedido por WhatsApp
                  </button>
                </div>
              </div>
            )}
          </section>
        )}

        {/* SECCIÓN CONFIANZA */}
        <section className="bg-white border-t border-stone-100 py-24 mt-20">
          <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
            <div className="space-y-4">
              <div className="text-4xl">🌿</div>
              <h4 className="font-bold text-sm uppercase tracking-widest">100% Natural</h4>
              <p className="text-stone-500 text-sm">Ingredientes botánicos seleccionados.</p>
            </div>
            <div className="space-y-4">
              <div className="text-4xl">🤍</div>
              <h4 className="font-bold text-sm uppercase tracking-widest">Hecho a Mano</h4>
              <p className="text-stone-500 text-sm">Elaborado artesanalmente en Lima.</p>
            </div>
            <div className="space-y-4">
              <div className="text-4xl">💳</div>
              <h4 className="font-bold text-sm uppercase tracking-widest">Medios de pago</h4>
              <p className="text-stone-500 text-sm">Yape, Plin o Contraentrega.</p>
            </div>
          </div>
        </section>
      </div>

      <footer className="bg-[#1A1816] text-[#F4F1EA] py-20 text-center">
        <p className="text-xs tracking-[0.3em] font-bold uppercase opacity-50">Casa Scarbato © 2026</p>
      </footer>
    </main>
  );
}
