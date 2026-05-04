"use client";

export default function Cuidados() {
  const tips = [
    {
      titulo: "Drenaje Natural",
      desc: "Usa jaboneras que permitan escurrir el agua. El jabón artesanal necesita respirar para conservar su forma y duración.",
      icon: "🌿"
    },
    {
      titulo: "Conservación",
      desc: "Guárdalo en un lugar fresco y ventilado. Evita la luz solar directa para preservar sus aceites y aromas.",
      icon: "🍃"
    },
    {
      titulo: "Uso Consciente",
      desc: "Frota el jabón entre tus manos húmedas para crear espuma. Evita dejarlo bajo el chorro directo de agua.",
      icon: "🧼"
    },
    {
      titulo: "Secado Completo",
      desc: "Permite que el jabón se seque completamente entre usos. Esto prolonga su vida útil y mantiene su estructura.",
      icon: "🌿"
    }
  ];

  return (
    <section className="max-w-6xl mx-auto space-y-20 py-24 animate-in fade-in duration-1000">
      
      {/* CABECERA */}
      <div className="text-center space-y-4">
        <h2 className="text-6xl font-serif text-[#2D2A26] tracking-tight">El Arte de Cuidar tu Jabón</h2>
        <p className="text-xl text-stone-400 italic font-light">Alarga la vida de tu alquimia botánica</p>
      </div>

      {/* GRILLA DE CUIDADOS (4 PUNTOS) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {tips.map((t, i) => (
          <div key={i} className="bg-white p-12 rounded-[3.5rem] border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col items-center text-center space-y-6 group">
            <div className="text-4xl group-hover:scale-110 transition-transform duration-500">
              {t.icon}
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-serif text-[#2D2A26]">{t.titulo}</h3>
              <p className="text-stone-500 text-lg leading-relaxed font-light italic">
                {t.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* EL TESORO DEL GUARDIÁN */}
      <div className="relative mt-12">
        <div className="bg-[#F4F5EF] p-12 lg:p-16 rounded-[4rem] border border-[#7D8461]/20 overflow-hidden group">
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-4xl shadow-sm group-hover:rotate-12 transition-transform">
              🐾
            </div>
            <div className="space-y-4 text-center md:text-left flex-grow">
              <h4 className="text-3xl font-serif text-[#7D8461]">El Tesoro del Guardián</h4>
              <p className="text-[#2D2A26] text-xl italic font-light leading-relaxed max-w-3xl">
                "Si tu jabón se vuelve muy pequeño, no lo deseches. Únelo a una nueva pieza de <span className="font-serif font-bold">Casa Scarbato</span> o guárdalo en una bolsa de lino para aromatizar tus cajones más preciados."
              </p>
            </div>
          </div>
          
          {/* DECORACIÓN DE FONDO */}
          <span className="absolute -bottom-8 -right-8 text-[12rem] opacity-5 pointer-events-none select-none -rotate-12 group-hover:rotate-0 transition-all duration-1000">
            🐾
          </span>
        </div>
      </div>

    </section>
  );
}