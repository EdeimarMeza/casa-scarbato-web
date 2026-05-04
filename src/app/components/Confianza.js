export default function Confianza() {
  const pilares = [
    { icon: "🌿", title: "100% Natural", desc: "Ingredientes naturales de alta calidad." },
    { icon: "🤍", title: "Hecho a Mano", desc: "Elaborado con amor y paciencia." },
    { icon: "💳", title: "Pagos Seguros", desc: "Yape, Plin y Transferencias." }
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-16 py-32 mt-20 border-t border-stone-100">
      {pilares.map(p => (
        <div key={p.title} className="text-center space-y-6">
          <div className="text-6xl">{p.icon}</div>
          <h4 className="font-bold text-sm uppercase tracking-[0.2em] text-[#2D2A26]">{p.title}</h4>
          <p className="text-stone-400 text-base leading-relaxed">{p.desc}</p>
        </div>
      ))}
    </section>
  );
}