export default function Footer({ setSeccion }) {
  return (
    <footer className="bg-white border-t border-stone-100 pt-24 pb-12 px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
        <div className="space-y-6">
          <h4 className="font-serif text-2xl">Casa Scarbato</h4>
          <p className="text-xs leading-relaxed text-stone-400 font-medium">Jabonería artesanal inspirada en la botánica y la magia. Hecho a mano en Lima, Perú.</p>
        </div>
        
        <div className="space-y-6">
          <h5 className="text-[10px] font-bold tracking-widest uppercase text-stone-300">Navegación</h5>
          <div className="flex flex-col gap-3 text-[11px] font-bold text-[#2D2A26]">
            <button onClick={() => setSeccion('historia')} className="text-left hover:text-[#7D8461]">Historia</button>
            <button onClick={() => setSeccion('faq')} className="text-left hover:text-[#7D8461]">Preguntas Frecuentes</button>
            <button onClick={() => setSeccion('contacto')} className="text-left hover:text-[#7D8461]">Contacto</button>
          </div>
        </div>

        <div className="space-y-6">
          <h5 className="text-[10px] font-bold tracking-widest uppercase text-stone-300">Confianza</h5>
          <div className="flex flex-col gap-3 text-[11px] font-bold text-[#2D2A26]">
            <span className="opacity-50 uppercase tracking-tighter">Políticas de Privacidad</span>
            <span className="opacity-50 uppercase tracking-tighter">Términos y Condiciones</span>
            <div className="flex gap-3 mt-2 grayscale opacity-50">
              <img src="https://img.icons8.com/color/48/yape.png" className="w-8" />
              <img src="https://img.icons8.com/color/48/plin.png" className="w-8" />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h5 className="text-[10px] font-bold tracking-widest uppercase text-stone-300">Libro de Reclamaciones</h5>
          <div className="p-4 border border-stone-200 rounded-2xl flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity">
            <span className="text-[9px] font-bold text-center">HOJA DE RECLAMACIÓN VIRTUAL</span>
          </div>
        </div>
      </div>
      
      <div className="text-center pt-12 border-t border-stone-50">
        <p className="text-[9px] font-bold tracking-[0.5em] text-stone-300 uppercase">Casa Scarbato © 2026 • La alquimia de lo natural</p>
      </div>
    </footer>
  );
}