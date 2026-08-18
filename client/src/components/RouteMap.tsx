import "@/atlas-map.css";

/**
 * Balkan Dergâhı reminder: this is a self-contained paper-atlas map.
 * It deliberately presents an operational schematic, never turn-by-turn navigation.
 */
type Point = { key: string; label: string; lat: number; lng: number };

const points: Record<string, Point> = {
  skopje: { key: "skopje", label: "Üsküp", lat: 41.9973, lng: 21.4280 },
  ohrid: { key: "ohrid", label: "Ohri", lat: 41.1231, lng: 20.8016 },
  gjirokaster: { key: "gjirokaster", label: "Gjirokastër", lat: 40.0758, lng: 20.1389 },
  blueEye: { key: "blueEye", label: "Blue Eye", lat: 39.9226, lng: 20.1929 },
  sarande: { key: "sarande", label: "Sarandë", lat: 39.8756, lng: 20.0053 },
  ksamil: { key: "ksamil", label: "Ksamil", lat: 39.7689, lng: 20.0048 },
  butrint: { key: "butrint", label: "Butrint", lat: 39.7477, lng: 20.0201 },
  borsh: { key: "borsh", label: "Borsh", lat: 40.0658, lng: 19.8437 },
  porto: { key: "porto", label: "Porto Palermo", lat: 40.0560, lng: 19.7913 },
  himare: { key: "himare", label: "Himarë", lat: 40.1018, lng: 19.7444 },
  berat: { key: "berat", label: "Berat", lat: 40.7058, lng: 19.9522 },
  airport: { key: "airport", label: "Üsküp Havalimanı", lat: 41.9616, lng: 21.6214 },
};

const dayRoutes: Record<string, string[]> = {
  G1: ["airport", "skopje"], G2: ["skopje", "ohrid"], G3: ["ohrid", "gjirokaster", "blueEye", "sarande"], G4: ["sarande", "ksamil", "butrint", "sarande"], G5: ["sarande", "borsh", "porto", "himare"], G6: ["himare", "berat"], G7: ["berat", "skopje"], G8: ["skopje", "airport"],
};

function position(point: Point) {
  const x = 76 + ((point.lng - 19.65) / 2.05) * 625;
  const y = 66 + ((42.2 - point.lat) / 2.65) * 420;
  return { x, y };
}

export function RouteMap({ activeDay }: { activeDay: string }) {
  const route = (dayRoutes[activeDay] ?? dayRoutes.G1).map((key) => points[key]);
  const returnLeg = activeDay === "G7" || activeDay === "G8";
  const line = route.map((point) => { const { x, y } = position(point); return `${x},${y}`; }).join(" ");
  const activeKeys = new Set(route.map((point) => point.key));

  return (
    <div className="atlas-map atlas-map-static" role="img" aria-label={`${activeDay} araç etap şematik haritası: ${route.map((point) => point.label).join(" → ")}`}>
      <svg viewBox="0 0 800 550" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
        <defs><pattern id="paperGrid" width="44" height="44" patternUnits="userSpaceOnUse"><path d="M 44 0 L 0 0 0 44" fill="none" stroke="#9da39a" strokeOpacity=".25" strokeWidth="1" /></pattern></defs>
        <rect width="800" height="550" fill="#eee5d4" /><rect width="800" height="550" fill="url(#paperGrid)" />
        <path d="M106 50 C208 72 273 82 337 145 C379 189 385 239 442 263 C507 291 564 349 566 466 C526 510 459 506 406 500 C347 495 259 487 197 457 C152 421 102 378 95 307 C86 218 58 113 106 50Z" fill="#d8e1d8" fillOpacity=".7" stroke="#78918b" strokeOpacity=".55" strokeWidth="2" />
        <path d="M151 92 C175 130 191 164 203 210 C218 268 199 303 221 363 C242 420 285 470 365 496" fill="none" stroke="#c0b28f" strokeWidth="18" strokeOpacity=".34" />
        <path d="M391 494 C421 424 417 370 390 315 C374 280 380 221 350 176 C325 140 286 108 234 77" fill="none" stroke="#b8d0d1" strokeWidth="52" strokeOpacity=".75" />
        <text x="144" y="118" className="atlas-map-country">KUZEY MAKEDONYA</text><text x="372" y="407" className="atlas-map-country">ARNAVUTLUK</text><text x="577" y="382" className="atlas-map-water">ADRIYATİK</text>
        <polyline points={line} fill="none" className={returnLeg ? "atlas-route-line atlas-route-line--return" : "atlas-route-line"} />
        {Object.values(points).map((point) => {
          const { x, y } = position(point); const isActive = activeKeys.has(point.key); const first = route[0]?.key === point.key; const last = route.at(-1)?.key === point.key;
          return <g key={point.key} className={isActive ? "atlas-pin atlas-pin--active" : "atlas-pin"}><circle cx={x} cy={y} r={isActive ? 10 : 5.5} /><circle cx={x} cy={y} r={isActive ? 4 : 2.1} /><text x={x + 12} y={y - 9}>{first ? `A · ${point.label}` : last ? `B · ${point.label}` : point.label}</text></g>;
        })}
        <g className="atlas-north"><path d="M739 68 L739 124 M723 84 L739 52 L755 84" /><text x="728" y="145">K</text></g>
        <text x="72" y="520" className="atlas-map-note">Şematik saha atlası · Canlı navigasyon değildir · Gecikme / sınır / park payı ayrı planlanır</text>
      </svg>
    </div>
  );
}
