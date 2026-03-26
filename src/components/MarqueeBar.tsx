export function MarqueeBar() {
  const text = "ESPECIALISTAS EN REPARACIÓN Y VENTA DE EQUIPOS ELECTRÓNICOS";
  const separator = " ★ ";
  // Repeat the text enough times to ensure continuous scroll
  const repeatedText = Array(8).fill(text).join(separator) + separator;

  return (
    <div className="w-full bg-gradient-to-r from-[#0060A9] via-[#0078D4] to-[#0060A9] overflow-hidden whitespace-nowrap relative z-30">
      <div className="marquee-track py-2">
        <span className="inline-block text-white text-sm font-bold tracking-[0.15em] uppercase">
          {repeatedText}
        </span>
        <span className="inline-block text-white text-sm font-bold tracking-[0.15em] uppercase">
          {repeatedText}
        </span>
      </div>
    </div>
  );
}
