export default function Contacto() {
  return (
    <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 animate-in fade-in">
      <div className="bg-white p-12 rounded-[3.5rem] shadow-sm space-y-8 border border-stone-50">
        <h3 className="text-3xl font-serif text-[#2D2A26] border-b pb-6">Contacto Directo</h3>
        <div className="space-y-6">
          <div className="flex items-center gap-6 p-6 bg-green-50 rounded-[2rem] border border-green-100">
            <span className="text-3xl">📱</span>
            <div><p className="text-[10px] font-bold text-green-700 uppercase tracking-widest">WhatsApp</p><p className="text-xl font-bold">+51 916 278 938</p></div>
          </div>
          <div className="flex items-center gap-6 p-6 bg-pink-50 rounded-[2rem] border border-pink-100">
            <span className="text-3xl">📸</span>
            <div><p className="text-[10px] font-bold text-pink-700 uppercase tracking-widest">Instagram</p><p className="text-xl font-bold">@CasaScarbato</p></div>
          </div>
          <div className="flex items-center gap-6 p-6 bg-stone-50 rounded-[2rem] border border-stone-200">
            <span className="text-3xl">✉️</span>
            <div><p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Email</p><p className="text-lg font-bold">casascarbato@gmail.com</p></div>
          </div>
        </div>
      </div>
      <div className="bg-[#7D8461] text-white p-16 rounded-[3.5rem] flex flex-col justify-center items-center text-center space-y-8 shadow-2xl">
        <span className="text-6xl">🧼</span>
        <h3 className="text-4xl font-serif italic">¿Dudas sobre tu piel?</h3>
        <p className="text-sm opacity-90">Escríbenos y te ayudamos a elegir el jabón y la arcilla ideal para ti.</p>
        <button onClick={() => window.open('https://wa.me/51916278938', '_blank')} className="w-full bg-white text-[#7D8461] py-6 rounded-2xl font-bold uppercase text-xs shadow-xl hover:scale-105 transition-transform">Chatea con nosotros</button>
      </div>
    </section>
  );
}