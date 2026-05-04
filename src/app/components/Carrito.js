export default function Carrito({ carrito, setCarrito, setSeccion }) {
  const total = carrito.reduce((t, i) => t + (i.cantidad * i.precio), 0);

  const enviarWhatsApp = () => {
    let msg = `*Pedido Casa Scarbato:*%0A%0A`;
    carrito.forEach(i => msg += `*${i.cantidad}x ${i.nombre}* S/ ${i.precio}.00%0A`);
    msg += `%0A*Total: S/ ${total}.00*`;
    window.open(`https://wa.me/51916278938?text=${msg}`, '_blank');
  };

  return (
    <section className="max-w-4xl mx-auto bg-white p-20 rounded-[5rem] shadow-2xl animate-in slide-in-from-right-10">
      <h2 className="text-5xl font-serif mb-16 text-center text-[#2D2A26]">Tu Selección</h2>
      {carrito.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-stone-300 italic text-2xl">Tu carrito está esperando...</p>
          <button onClick={() => setSeccion('catalogo')} className="text-[#7D8461] font-bold mt-8 uppercase text-xs border-b border-[#7D8461] tracking-widest">Ir al Catálogo</button>
        </div>
      ) : (
        <div className="space-y-12">
          {carrito.map(item => (
            <div key={item.uniqueId} className="flex justify-between items-center border-b border-stone-50 pb-10">
              <div className="space-y-2">
                <p className="font-bold text-2xl text-[#2D2A26]">{item.nombre} <span className="text-[#7D8461]">x{item.cantidad}</span></p>
                <p className="text-xs text-stone-400 font-bold uppercase tracking-widest">S/ {item.precio}.00 c/u</p>
              </div>
              <div className="flex items-center gap-10">
                <p className="font-serif font-bold text-3xl">S/ {item.cantidad * item.precio}.00</p>
                <button onClick={() => setCarrito(carrito.filter(i => i.uniqueId !== item.uniqueId))} className="text-2xl opacity-30 hover:opacity-100">🗑️</button>
              </div>
            </div>
          ))}
          <div className="pt-16 text-center bg-stone-50 -mx-20 -mb-20 p-20 rounded-b-[5rem]">
            <p className="text-6xl font-serif text-[#2D2A26] mb-12">Total: S/ {total}.00</p>
            <button onClick={enviarWhatsApp} className="w-full bg-[#25D366] text-white py-8 rounded-[3rem] font-bold uppercase text-xs tracking-[0.3em] shadow-2xl hover:scale-105 transition-transform">Confirmar por WhatsApp</button>
          </div>
        </div>
      )}
    </section>
  );
}