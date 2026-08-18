import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import { dayPlans, gpsPoints, GpsPoint, realRoadPaths, flightArcs } from "@/data";
import { Compass, Layers, Maximize2, Navigation, MapPin, Plane } from "lucide-react";

interface RealLeafletMapProps {
  activeDayId: string;
}

export function RealLeafletMap({ activeDayId }: RealLeafletMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const layerGroupRef = useRef<L.LayerGroup | null>(null);
  const polylineRef = useRef<L.Polyline | null>(null);
  const flightPolylinesRef = useRef<L.Polyline[]>([]);
  const [tileMode, setTileMode] = useState<"voyager" | "satellite" | "osm">("voyager");

  const currentDay = dayPlans.find((d) => d.id === activeDayId) || dayPlans[0];

  // Tile layers
  const tileUrls = {
    voyager: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
    satellite: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    osm: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  };

  const tileAttributions = {
    voyager: '&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap',
    satellite: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
    osm: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  };

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [41.3, 20.6],
        zoom: 7,
        scrollWheelZoom: false,
        zoomControl: true,
        tap: true,
      });

      const initialTile = L.tileLayer(tileUrls.voyager, {
        attribution: tileAttributions.voyager,
        maxZoom: 18,
      }).addTo(map);

      // Store layer references
      (map as any)._customTileLayer = initialTile;

      const layerGroup = L.layerGroup().addTo(map);
      layerGroupRef.current = layerGroup;
      mapInstanceRef.current = map;
    }

    return () => {
      // Keep instance alive across re-renders
    };
  }, []);

  // Update tile layer
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if ((map as any)._customTileLayer) {
      map.removeLayer((map as any)._customTileLayer);
    }

    const newTile = L.tileLayer(tileUrls[tileMode], {
      attribution: tileAttributions[tileMode],
      maxZoom: 18,
    }).addTo(map);

    (map as any)._customTileLayer = newTile;
  }, [tileMode]);

  // Update markers, real road polyline, and flight arcs when activeDayId changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !layerGroupRef.current) return;

    const layerGroup = layerGroupRef.current;
    layerGroup.clearLayers();

    if (polylineRef.current) {
      map.removeLayer(polylineRef.current);
      polylineRef.current = null;
    }

    flightPolylinesRef.current.forEach((pl) => map.removeLayer(pl));
    flightPolylinesRef.current = [];

    const bounds = L.latLngBounds([]);

    // 1. Render Markers
    const activePointKeys = currentDay.points;
    const activePointsList: GpsPoint[] = activePointKeys
      .map((k) => gpsPoints[k])
      .filter(Boolean);

    // Subtle markers for all other points
    const allPointKeys = Object.keys(gpsPoints);
    const otherPointKeys = allPointKeys.filter((k) => !activePointKeys.includes(k));

    otherPointKeys.forEach((key) => {
      const p = gpsPoints[key];
      const subtleIcon = L.divIcon({
        className: "custom-leaflet-pin-subtle",
        html: `<div class="subtle-dot" title="${p.label}"></div>`,
        iconSize: [12, 12],
        iconAnchor: [6, 6],
      });

      const marker = L.marker([p.lat, p.lng], { icon: subtleIcon });
      marker.bindPopup(`
        <div class="vintage-popup">
          <div class="popup-tag">${p.country} · ${p.city}</div>
          <h4>${p.label}</h4>
          <p>${p.desc}</p>
          <small>💡 <b>Park İpucu:</b> ${p.parkingTip}</small>
        </div>
      `);
      layerGroup.addLayer(marker);
    });

    // Active markers with badges
    activePointsList.forEach((p, idx) => {
      bounds.extend([p.lat, p.lng]);

      const isFirst = idx === 0;
      const isLast = idx === activePointsList.length - 1;
      const isAirport = p.id.includes("airport");
      const badgeText = isAirport ? "✈️" : isFirst ? "A" : isLast ? "B" : `${idx}`;

      const activeIcon = L.divIcon({
        className: "custom-leaflet-pin-active",
        html: `
          <div class="pin-card ${isAirport ? "pin-airport" : isFirst ? "pin-start" : isLast ? "pin-end" : "pin-mid"}">
            <span class="pin-badge">${badgeText}</span>
            <span class="pin-label">${p.label}</span>
          </div>
        `,
        iconSize: [120, 36],
        iconAnchor: [18, 32],
      });

      const marker = L.marker([p.lat, p.lng], { icon: activeIcon, zIndexOffset: 100 });
      marker.bindPopup(`
        <div class="vintage-popup active-popup">
          <div class="popup-tag">${currentDay.id}: ${currentDay.city}</div>
          <h4>${p.label}</h4>
          <p>${p.desc}</p>
          <div class="popup-parking">
            <span>🚗 OTOPARK & SAHA TALİMATI</span>
            <p>${p.parkingTip}</p>
          </div>
        </div>
      `);
      layerGroup.addLayer(marker);
    });

    // 2. Draw Real Road Polyline (Otoyollar ve Dağ Geçitleri)
    const detailedRoadCoords = realRoadPaths[currentDay.id] || realRoadPaths.G0;
    if (detailedRoadCoords && detailedRoadCoords.length > 1) {
      detailedRoadCoords.forEach((coord) => bounds.extend(coord));

      const polyline = L.polyline(detailedRoadCoords, {
        color: currentDay.id === "G0" ? "#145c64" : currentDay.id === "G7" || currentDay.id === "G8" ? "#b54b38" : "#145c64",
        weight: currentDay.id === "G0" ? 5 : 6,
        opacity: 0.95,
        lineCap: "round",
        lineJoin: "round",
      }).addTo(map);
      polylineRef.current = polyline;
    }

    // 3. Draw Flight Arcs (İstanbul ✈️ Üsküp) on G0, G1, G8
    if (currentDay.id === "G0" || currentDay.id === "G1") {
      flightArcs.outbound.forEach((coord) => bounds.extend(coord));
      const flightLineOut = L.polyline(flightArcs.outbound, {
        color: "#b54b38",
        weight: 3.5,
        dashArray: "8, 8",
        opacity: 0.85,
      }).addTo(map);

      // Airplane midpoint marker
      const midCoord = flightArcs.outbound[2];
      const planeIcon = L.divIcon({
        className: "custom-plane-icon",
        html: `<div class="bg-[#b54b38] text-white p-1 rounded-full shadow-md flex items-center justify-center font-bold text-xs">✈️</div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });
      const planeMarker = L.marker(midCoord, { icon: planeIcon }).bindPopup(`
        <div class="vintage-popup">
          <div class="popup-tag">GİDİŞ UÇUŞU · G1</div>
          <h4>İstanbul (IST) ✈️ Üsküp (SKP)</h4>
          <p>Uçuş süresi yaklaşık 1 saat 15 dakika. Sabit ödenmiş uçak kaydı.</p>
        </div>
      `);
      layerGroup.addLayer(planeMarker);
      flightPolylinesRef.current.push(flightLineOut);
    }

    if (currentDay.id === "G0" || currentDay.id === "G8") {
      flightArcs.returnFlight.forEach((coord) => bounds.extend(coord));
      const flightLineRet = L.polyline(flightArcs.returnFlight, {
        color: "#145c64",
        weight: 3.5,
        dashArray: "8, 8",
        opacity: 0.85,
      }).addTo(map);

      const midCoordRet = flightArcs.returnFlight[2];
      const planeIconRet = L.divIcon({
        className: "custom-plane-icon",
        html: `<div class="bg-[#145c64] text-white p-1 rounded-full shadow-md flex items-center justify-center font-bold text-xs">✈️</div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });
      const planeMarkerRet = L.marker(midCoordRet, { icon: planeIconRet }).bindPopup(`
        <div class="vintage-popup">
          <div class="popup-tag">DÖNÜŞ UÇUŞU · G8</div>
          <h4>Üsküp (SKP) ✈️ İstanbul (IST)</h4>
          <p>Büyük Balkan operasyonunun kapanışı ve İstanbul'a dönüş.</p>
        </div>
      `);
      layerGroup.addLayer(planeMarkerRet);
      flightPolylinesRef.current.push(flightLineRet);
    }

    // 4. Fit bounds smoothly for mobile & desktop
    if (bounds.isValid()) {
      map.fitBounds(bounds, {
        padding: [30, 30],
        maxZoom: currentDay.id === "G0" ? 8 : 13,
      });
    }
  }, [activeDayId, currentDay]);

  const fitFullBalkanView = () => {
    const map = mapInstanceRef.current;
    if (!map) return;
    map.flyTo([41.1, 21.2], 7, { duration: 1.2 });
  };

  return (
    <div className="real-map-wrapper relative w-full overflow-hidden border-2 border-[#1d211c] bg-[#efe7d7] shadow-[6px_8px_0_rgba(29,33,28,0.18)]">
      {/* Map Control Bar */}
      <div className="map-toolbar flex flex-wrap items-center justify-between gap-2 border-b border-[#29312e]/15 bg-[#fbf8ee] px-3 sm:px-4 py-2.5">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="inline-flex h-2.5 w-2.5 animate-ping rounded-full bg-[#145c64]" />
          <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#145c64]">
            {currentDay.id}: {currentDay.city}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1">
          <button
            onClick={() => setTileMode("voyager")}
            className={`cursor-pointer rounded px-2.5 py-1 font-mono text-[10px] sm:text-[11px] font-semibold transition-colors ${
              tileMode === "voyager" ? "bg-[#145c64] text-white shadow-xs" : "bg-[#e9e2d1] text-[#29312e] hover:bg-[#ded5c2]"
            }`}
          >
            Harita
          </button>
          <button
            onClick={() => setTileMode("satellite")}
            className={`cursor-pointer rounded px-2.5 py-1 font-mono text-[10px] sm:text-[11px] font-semibold transition-colors ${
              tileMode === "satellite" ? "bg-[#145c64] text-white shadow-xs" : "bg-[#e9e2d1] text-[#29312e] hover:bg-[#ded5c2]"
            }`}
          >
            Uydu
          </button>
          <button
            onClick={() => setTileMode("osm")}
            className={`cursor-pointer rounded px-2.5 py-1 font-mono text-[10px] sm:text-[11px] font-semibold transition-colors ${
              tileMode === "osm" ? "bg-[#145c64] text-white shadow-xs" : "bg-[#e9e2d1] text-[#29312e] hover:bg-[#ded5c2]"
            }`}
          >
            Sokak
          </button>
          <button
            onClick={fitFullBalkanView}
            title="Tüm Balkan Rotasını Göster"
            className="flex cursor-pointer items-center gap-1 rounded bg-[#145c64] px-2.5 py-1 font-mono text-[10px] sm:text-[11px] font-semibold text-white shadow-[2px_2px_0_#b54b38] hover:bg-[#0f4c53]"
          >
            <Maximize2 size={12} />
            <span>Tüm Rota</span>
          </button>
        </div>
      </div>

      {/* Actual Map Container (Responsive Height) */}
      <div ref={mapContainerRef} className="h-[380px] sm:h-[480px] md:h-[560px] w-full z-10" />

      {/* Map Legend Overlay */}
      <div className="map-legend-bar flex flex-wrap items-center justify-between gap-2 border-t border-[#29312e]/15 bg-[#fffdf5] px-3 sm:px-4 py-2 text-xs">
        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <span className="flex items-center gap-1.5 font-mono text-[10px] sm:text-[11px] text-[#38413c]">
            <span className="h-2.5 w-4 rounded-sm bg-[#145c64] inline-block" />
            Gerçek Karayolu / Otoyol
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[10px] sm:text-[11px] text-[#b54b38]">
            <span className="h-1.5 w-4 border-b-2 border-dashed border-[#b54b38] inline-block" />
            ✈️ İstanbul Uçuş Hattı
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[10px] sm:text-[11px] text-[#38413c]">
            <span className="h-2.5 w-2.5 rounded-full bg-[#145c64] border border-white inline-block" />
            Saha Durakları
          </span>
        </div>
        <p className="font-mono text-[9px] sm:text-[10px] text-[#68716c]">
          * İşaretçilere tıklayarak otopark ve saha talimatlarını görebilirsiniz.
        </p>
      </div>
    </div>
  );
}
