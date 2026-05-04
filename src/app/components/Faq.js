"use client";
import { useState } from 'react';

export default function Faq() {
  const [abierto, setAbierto] = useState(null);
  const dudas = [
    { q: "¿Puedo confiar en comprar por Instagram o WhatsApp?", a: "Sí. Coordinamos cada pedido directamente contigo, confirmando todos los detalles antes de la entrega para que tengas una experiencia clara y segura." },
    { q: "¿Sus jabones son seguros para la piel?", a: "Nuestros jabones están elaborados con ingredientes pensados para el cuidado de la piel. Aun así, como cada piel es diferente, recomendamos probar primero en una pequeña zona." },
    { q: "¿Cada jabón está hecho a mano?", a: "Sí. Todos nuestros jabones son elaborados artesanalmente en pequeñas cantidades, lo que nos permite cuidar cada detalle del proceso." },
    { q: "¿Cómo puedo saber qué jabón elegir?", a: "Si no estás seguro de cuál elegir, puedes escribirnos y con gusto te ayudaremos a encontrar el jabón que mejor se adapte a lo que buscas." },
    { q: "¿Cómo se realiza la entrega?", a: "Coordinamos la entrega directamente contigo para que recibas tu pedido de forma cómoda y segura." },
    { q: "¿Cómo debo conservar mi jabón?", a: "Para que dure más tiempo, recomendamos mantenerlo en una jabonera que permita drenar el agua y dejarlo secar entre usos." },
    { q: "¿Realizan entregas en Lima?", a: "Sí. Realizamos entregas dentro de Lima. La coordinación se realiza directamente contigo para acordar el punto de entrega o envío." },
    { q: "¿Realizan envíos a provincia?", a: "Sí, también podemos realizar envíos a provincia. El envío se coordina previamente para indicar tiempos y costos según la ciudad." },
    { q: "¿Cuánto tiempo demora la entrega?", a: "El tiempo de entrega puede variar según la ubicación. Una vez confirmado el pedido, coordinaremos contigo el tiempo estimado de entrega." },
    { q: "¿El envío tiene costo?", a: "El costo de envío puede variar dependiendo de la ubicación. Antes de confirmar tu pedido te informaremos el costo correspondiente." },
    { q: "¿Cómo sabré cuándo llegará mi pedido?", a: "Una vez coordinado el envío, te mantendremos informado sobre la entrega." },
  ];

  return (
    <section className="py-20 max-w-4xl mx-auto space-y-12 animate-in slide-in-from-bottom-5">
      <h2 className="text-5xl font-serif text-center text-[#2D2A26]">Preguntas Frecuentes</h2>
      <div className="space-y-4">
        {dudas.map((d, i) => (
          <div key={i} className="border border-stone-100 rounded-[2rem] overflow-hidden bg-white shadow-sm">
            <button onClick={() => setAbierto(abierto === i ? null : i)} className="w-full p-8 text-left flex justify-between items-center hover:bg-stone-50 transition-all">
              <span className="font-bold text-sm tracking-widest text-[#2D2A26] uppercase">{d.q}</span>
              <span className="text-2xl font-light">{abierto === i ? '−' : '+'}</span>
            </button>
            {abierto === i && (
              <div className="p-8 pt-0 text-stone-500 italic text-lg animate-in fade-in duration-500">
                {d.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}