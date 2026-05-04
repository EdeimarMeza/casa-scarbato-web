export default function Historia({ setSeccion }) {
  return (
    <section className="flex flex-col items-center text-center space-y-16 animate-in fade-in duration-1000">
      {/* Tu logo original del scarbato, mantenemos su esencia intacta */}
      <img 
        src="/logosf.webp" 
        className="w-[450px] h-[450px] object-contain drop-shadow-2xl" 
        alt="Casa Scarbato Original" 
      />
      
      <div className="max-w-4xl space-y-10">
        <h2 className="text-7xl font-serif text-[#2D2A26] italic">La Alquimia de lo Natural</h2>
        <div className="bg-white p-20 rounded-[5rem] shadow-sm border border-stone-100">
          <p className="text-stone-500 text-3xl leading-relaxed font-light italic">
            "Casa Scarbato nace de un sueño, y esta vez se hizo realidad.
            Un sueño de volver a lo simple, a lo natural y a lo hecho con propósito.
            Cada jabón es elaborado artesanalmente, con calma y dedicación, respetando el equilibrio de tu piel y el ritmo de la naturaleza.
            
          </p>
        </div>
      </div>
      
      <button 
        onClick={() => setSeccion('catalogo')} 
        className="bg-[#2D2A26] text-white px-20 py-7 rounded-full text-xs font-bold uppercase tracking-[0.4em] hover:bg-[#7D8461] transition-all shadow-2xl"
      >
        Descubrir la Colección
      </button>
    </section>
  );
}