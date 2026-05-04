"use client";

export default function WspFlotante() {
  return (
    <a 
      href="https://wa.me/51916278938" 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-10 right-10 z-[500] group flex items-center gap-4"
    >
      
      {/* EL GUARDIÁN ANIMADO (Tamaño Mascota Discreta) */}
      <div className="absolute w-20 h-auto bottom-1 
                      -left-[300px] opacity-0 scale-90
                      transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
                      group-hover:left-[-60px] group-hover:opacity-100 group-hover:scale-100
                      z-10 pointer-events-none drop-shadow-xl">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-auto"
        >
          <source src="/Caminando.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Etiqueta de Texto */}
      <span className="bg-white px-6 py-3 rounded-full shadow-xl text-[10px] font-bold tracking-[0.2em] text-[#2D2A26] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0 border border-stone-100 uppercase relative z-20">
        ¿Dudas? Escríbenos
      </span>
      
      {/* Botón Circular de WhatsApp */}
      <div className="bg-[#25D366] w-20 h-20 rounded-full shadow-2xl flex items-center justify-center text-white text-4xl hover:scale-110 transition-transform active:scale-95 relative z-20 overflow-hidden">
        <span className="relative z-10">💬</span>
        <div className="absolute inset-0 bg-white/30 animate-[ping_3s_infinite] rounded-full"></div>
      </div>
    </a>
  );
}