export default function SplashScreen() {
  return (
    <div className="fixed inset-0 z-[1000] bg-[#FDFBF9] flex flex-col items-center justify-center">
      <div className="relative">
        <img src="/logosf.webp" className="w-40 h-40 animate-bounce opacity-80" alt="Cargando..." />
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-48 h-1 bg-stone-100 rounded-full overflow-hidden">
          <div className="h-full bg-[#7D8461] animate-[loading_3s_ease-in-out_infinite]"></div>
        </div>
      </div>
      <p className="mt-16 font-serif italic text-stone-400 animate-pulse">Destilando esencias...</p>
      
      <style jsx>{`
        @keyframes loading {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}