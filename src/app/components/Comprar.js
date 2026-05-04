"use client";

export default function Comprar({ setSeccion }) {
  // --- MENSAJE DE WHATSAPP BLINDADO (HEXADECIMAL) --- 
  const urlWA = "https://api.whatsapp.com/send?phone=51916278938&text=%F0%9F%8F%BA%20*CASA%20SCARBATO%20%7C%20Taller%20de%20Alquimia*%20%F0%9F%8C%BF%0A-------------------------------------------%0A%0A%C2%A1Saludos!%20Les%20escribo%20desde%20su%20portal%20web.%20%E2%9C%A8%0A%0AHe%20estado%20sumergido%20en%20su%20*Vadem%C3%A9cum%20Bot%C3%A1nico*%20y%20he%20trazado%20una%20f%C3%B3rmula%20personalizada%20en%20el%20*Centro%20de%20Alquimia*.%20%F0%9F%A7%AA%0A%0AAntes%20de%20dar%20vida%20a%20mi%20pedido%2C%20busco%20su%20*visto%20bueno%20experto*%20para%20confirmar%20que%20esta%20selecci%C3%B3n%20de%20ingredientes%20es%20la%20m%C3%A1s%20armoniosa%20para%20mi%20piel.%20%F0%9F%8C%BF%0A%0A%C2%BFPodr%C3%ADan%20brindarme%20su%20gu%C3%ADa%20bot%C3%A1nica%20para%20este%20ritual%3F%0A%0A*Gratitud%20y%20Naturaleza.*%20%F0%9F%90%BE";

  const pasos = [
    {
      paso: "01",
      titulo: "Diseño y Alquimia",
      desc: "Elige una base botánica o entra al Centro de Alquimia para personalizar tu jabón según las necesidades de tu piel.",
      icon: "✨"
    },
    {
      paso: "02",
      titulo: "Pedido vía WhatsApp",
      desc: "Al finalizar, envía tu resumen detallado a nuestro WhatsApp para una atención personalizada y directa.",
      icon: "📱"
    },
    {
      paso: "03",
      titulo: "Gestión de Pago",
      desc: "Contamos con múltiples opciones: desde billeteras digitales hasta transferencias bancarias y pago contraentrega.",
      icon: "💳"
    },
    {
      paso: "04",
      titulo: "Envío Artesanal",
      desc: "Coordinamos la entrega en Lima. Cada pieza viaja protegida para preservar sus propiedades botánicas.",
      icon: "🌿"
    }
  ];

  const pagos = [
    { nombre: "Yape", sub: "916 278 938", color: "bg-[#712E91]/5", letra: "Y", textColor: "text-[#712E91]" },
    { nombre: "Plin", sub: "Transferencia Directa", color: "bg-[#00BFA5]/5", letra: "P", textColor: "text-[#00BFA5]" },
    { nombre: "Transferencias", sub: "BCP, Scotiabank, Interbank", color: "bg-blue-50", letra: "🏦", textColor: "text-blue-600" },
    { nombre: "Efectivo", sub: "Pago contraentrega", color: "bg-stone-100", letra: "💵", textColor: "text-stone-600" },
    { nombre: "Mi ñanga", sub: "ñanga de koalin, ñanga de scott", color: "bg-green-50", letra: "Ñ", textColor: "text-yellow-340" } 
  ];

  return (
    <section className="max-w-6xl mx-auto space-y-24 animate-in fade-in duration-1000">
      
      <div className="text-center space-y-6">
        <h2 className="text-5xl lg:text-6xl font-serif text-[#2D2A26] tracking-tight">Experiencia de Compra</h2>
        <p className="text-xl text-stone-400 italic max-w-2xl mx-auto leading-relaxed">
          En Casa Scarbato, cada pedido es un ritual. Sigue nuestra guía para recibir la alquimia botánica en casa.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {pasos.map((p, i) => (
          <div key={i} className="group bg-white p-10 lg:p-12 rounded-[3.5rem] border border-stone-100 flex gap-8 items-start hover:shadow-xl transition-all duration-500">
            <div className="bg-[#F4F5EF] w-20 h-20 rounded-[1.5rem] flex items-center justify-center text-3xl shrink-0 group-hover:scale-105 transition-transform duration-500">
              {p.icon}
            </div>
            <div className="space-y-2">
              {/* NÚMEROS PROPORCIONALES: Claros, elegantes y del tamaño justo */}
              <span className="text-[#7D8461] font-bold text-lg uppercase tracking-widest block">
                Paso {p.paso}
              </span>
              <h3 className="text-2xl font-serif text-[#2D2A26]">{p.titulo}</h3>
              <p className="text-stone-500 text-lg leading-relaxed font-light">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-12 lg:p-16 rounded-[4rem] shadow-sm border border-stone-50 space-y-12">
        <div className="text-center space-y-2">
            <h3 className="text-4xl font-serif text-[#2D2A26]">Métodos de Pago</h3>
            <p className="text-stone-400 text-base italic">Opciones seguras para tu comodidad</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pagos.map((p, i) => (
            <div key={i} className="text-center space-y-4 p-8 rounded-[3rem] bg-[#FDFBF9] border border-stone-50 hover:bg-white hover:shadow-lg transition-all">
              <div className={`w-16 h-16 mx-auto rounded-full ${p.color} flex items-center justify-center text-3xl font-black ${p.textColor}`}>
                {p.letra}
              </div>
              <div className="space-y-1">
                <p className="font-bold text-lg text-[#2D2A26]">{p.nombre}</p>
                <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">{p.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#2D2A26] p-12 lg:p-16 rounded-[4rem] text-white space-y-10 relative overflow-hidden shadow-2xl">
        <div className="relative z-10 space-y-8">
            <h3 className="text-3xl font-serif">Información Importante</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-base text-stone-300 italic font-light">
              <div className="flex items-start gap-4">
                <span className="text-[#7D8461] text-xl">✦</span>
                <p>Nuestros jabones tienen un **precio base de S/ 7.00**.</p>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-[#7D8461] text-xl">✦</span>
                <p>Entregas coordinadas en Lima Metropolitana según tu ubicación exacta.</p>

              </div>
              <div className="flex items-start gap-4">
                <span className="text-[#7D8461] text-xl">✦</span>
                <p>El costo de envío es calculado al momento de la confirmación por WhatsApp.</p>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-[#7D8461] text-xl">✦</span>
                <p>Hacemos envío a provincia mediante la agencia Shalom</p>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-[#7D8461] text-xl">✦</span>
                <p>Cada pieza es única debido a su proceso artesanal y botánico.</p>
              </div>
            </div>
        </div>
        <span className="absolute -bottom-10 -right-10 text-[15rem] opacity-5 pointer-events-none select-none">🐾</span>
      </div>

      <div className="text-center space-y-10 py-6">
        <h3 className="text-4xl lg:text-5xl font-serif text-[#2D2A26]">¿Damos el primer paso?</h3>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <button 
            onClick={() => setSeccion('catalogo')} 
            className="bg-[#7D8461] text-white px-12 py-6 rounded-full font-bold text-[10px] tracking-[0.3em] uppercase shadow-2xl hover:bg-[#2D2A26] transition-all active:scale-95"
          >
            Explorar Catálogo
          </button>
          <button 
            onClick={() => window.open(urlWA, '_blank')} 
            className="border-2 border-[#2D2A26] text-[#2D2A26] px-12 py-6 rounded-full font-bold text-[10px] tracking-[0.4em] uppercase hover:bg-stone-50 transition-all active:scale-95"
          >
            Consultoría Botánica
          </button>
        </div>
      </div>
    </section>
  );
}