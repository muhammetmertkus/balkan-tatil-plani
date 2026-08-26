import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Banknote,
  BedDouble,
  CalendarDays,
  CarFront,
  ChevronDown,
  Clock3,
  Coffee,
  Compass,
  Footprints,
  Layers,
  MapPin,
  Menu,
  ReceiptText,
  Send,
  ShoppingBag,
  Sparkles,
  Utensils,
  X,
  AlertTriangle,
  CheckCircle2,
  Backpack,
  ShieldCheck,
  Building,
  Store,
} from "lucide-react";
import {
  assets,
  teamMembers,
  dayPlans,
  stayMatrix,
  foodMatrix,
  shoppingMatrix,
  tenRules,
  TeamMember,
} from "@/data";
import { RealLeafletMap } from "@/components/RealLeafletMap";
import { RouteMap } from "@/components/RouteMap";
import { PackingChecklist } from "@/components/PackingChecklist";
import { BudgetCalculator } from "@/components/BudgetCalculator";
import { MemberModal } from "@/components/MemberModal";

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [activeDayId, setActiveDayId] = useState("G0");
  const [openDayId, setOpenDayId] = useState("G1");
  const [mapMode, setMapMode] = useState<"real" | "paper">("real");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const activePlan = dayPlans.find((d) => d.id === activeDayId) || dayPlans[0];

  return (
    <div className="paper-site atlas-site min-h-screen overflow-x-hidden text-[#1d211c]">
      {/* Fixed Vintage Topbar */}
      <header className={`topbar ${scrolled ? "topbar--scrolled" : ""}`}>
        <button
          className="brand cursor-pointer"
          onClick={() => scrollToId("top")}
          aria-label="Sayfanın başına dön"
        >
          <img src={assets.logo} alt="Balkan Macerası Logo" />
          <span className="brand-text">
            <b>Balkan Macerası</b>
            <small>BALKAN YOL EKİBİ · SAYI 01</small>
          </span>
        </button>

        <nav className="desktop-nav hidden md:flex" aria-label="Ana menü">
          <button onClick={() => scrollToId("ekip")}>Kadro</button>
          <button onClick={() => scrollToId("atlas")}>Yol Atlası</button>
          <button onClick={() => scrollToId("plan")}>9 Günlük Plan</button>
          <button onClick={() => scrollToId("valiz")}>Valiz Teftişi</button>
          <button onClick={() => scrollToId("kal")}>Kal / Ye / Al</button>
          <button onClick={() => scrollToId("butce")}>Kasa & Bütçe</button>
          <button onClick={() => scrollToId("kurallar")}>10 Altın Kural</button>
        </nav>

        <button
          className="menu-button md:hidden cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menüyü aç veya kapat"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {menuOpen && (
          <div className="mobile-nav flex flex-col gap-2 p-4 bg-[#fffcf3] border border-[#29312e] shadow-xl absolute top-[78px] left-0 right-0 z-50">
            {[
              ["Kadro Dosyası", "ekip"],
              ["Yol Atlası & Harita", "atlas"],
              ["9 Günlük Saha Planı", "plan"],
              ["Hazırlık & Valiz", "valiz"],
              ["Konaklama & Gastronomi", "kal"],
              ["Bütçe & Splitwise Kasa", "butce"],
              ["10 Altın Kural", "kurallar"],
            ].map(([label, id]) => (
              <button
                key={id}
                className="py-2 text-left font-mono text-xs uppercase font-semibold text-[#145c64] hover:text-[#b54b38]"
                onClick={() => {
                  setMenuOpen(false);
                  scrollToId(id);
                }}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </header>

      <main id="top">
        {/* HERO SECTION: Vintage Editorial Newspaper Masthead */}
        <section className="hero-section atlas-hero" aria-labelledby="hero-title">
          <div className="hero-art" aria-hidden="true">
            <img src={assets.hero} alt="" />
            <div className="hero-wash" />
          </div>
          <div className="hero-grain" aria-hidden="true" />

          <div className="hero-copy">
            <p className="eyebrow">
              <span />
              Sayı 01 · 29 Ağustos — 6 Eylül 2026
            </p>
            <h1 id="hero-title">
              Balkanlar,<br />
              <em>biz geliyoruz.</em>
            </h1>
            <p className="hero-intro">
              4 kişi · 2 ülke · 9 gün · yaklaşık 1.180 km çalışma rotası. Yolun romantizmi kadar otoparkı, sınır kuyruğu, lezzet durakları ve Splitwise tahsilatı da bu dosyada.
            </p>
            <div className="hero-actions flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3.5 mt-6">
              <button
                className="ink-button flex items-center justify-center gap-2 px-5 py-3.5 bg-[#145c64] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-[4px_4px_0_#b54b38] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
                onClick={() => scrollToId("atlas")}
              >
                <span>Yol Atlasını Aç</span>
                <ArrowDown size={17} />
              </button>

              <button
                className="flex items-center justify-center gap-2 px-4 py-3 bg-[#fffdf5] border-2 border-[#145c64] text-[#145c64] font-mono text-xs font-bold uppercase tracking-wider shadow-[3px_3px_0_rgba(20,92,100,0.2)] hover:bg-[#145c64] hover:text-white transition-all cursor-pointer"
                onClick={() => scrollToId("valiz")}
              >
                <Backpack size={16} />
                <span>Valiz Teftişini Başlat</span>
              </button>

              <button
                className="flex items-center justify-center gap-2 px-4 py-3 bg-[#fffdf5] border-2 border-[#b54b38] text-[#b54b38] font-mono text-xs font-bold uppercase tracking-wider shadow-[3px_3px_0_rgba(181,75,56,0.2)] hover:bg-[#b54b38] hover:text-white transition-all cursor-pointer"
                onClick={() => scrollToId("ekip")}
              >
                <span>Kadro Sicilleri</span>
                <ArrowUpRight size={17} />
              </button>
            </div>
          </div>

          <figure className="hero-photo polaroid">
            <div className="photo-window">
              <img src={assets.team} alt="Balkan Yol Ekibi" />
            </div>
            <figcaption>
              <span>İKRA · FATİH · EYÜPCAN · MERT</span>
              <span>2026</span>
            </figcaption>
            <div className="tape tape--top" aria-hidden="true" />
          </figure>

          <aside className="hero-note note-card">
            <div className="note-pin" />
            <p className="mono-label">OPERASYON ÖZETİ</p>
            <p>
              <strong>İstanbul → Üsküp</strong>
              <br />
              Kuzey Makedonya + Arnavutluk
            </p>
            <div className="font-mono text-[10px] font-bold text-[#145c64] tracking-wider uppercase">
              ✦ 4 KİŞİ · 9 GÜN · 1.220 KM
            </div>
          </aside>

          <div className="airplane-float" aria-hidden="true">
            <Send size={30} strokeWidth={1.4} />
          </div>
        </section>

        {/* TICKER RIBBON */}
        <section className="ticker" aria-label="Yolculuk temaları">
          <div className="ticker-track">
            <span>Harita açık</span>
            <i>✦</i>
            <span>Çay sıcak</span>
            <i>✦</i>
            <span>Sınır kapısı sırada</span>
            <i>✦</i>
            <span>Rota İkra onaylı</span>
            <i>✦</i>
            <span>Fatih fiş peşinde</span>
            <i>✦</i>
            <span>Eyüp her şeye OK</span>
            <i>✦</i>
            <span>Mert 38 sekme açık</span>
            <i>✦</i>
            <span>Harita açık</span>
            <i>✦</i>
            <span>Çay sıcak</span>
            <i>✦</i>
            <span>Sınır kapısı sırada</span>
            <i>✦</i>
          </div>
        </section>

        {/* KADRO DOSYASI (BAKANLAR KURULU SİCİLLERİ) - TÜM METİNLER DİREKT EKRANDA */}
        <section className="team-section team-section--front" id="ekip">
          <div className="section-route-mark section-route-mark--team" aria-hidden="true">
            <span />
            <Send size={18} strokeWidth={1.25} />
          </div>
          <div className="team-topline">
            <div>
              <div className="section-kicker">
                <span className="mini-plane">✈</span>
                <span>Kadro Dosyası & Bakanlar Kurulu</span>
              </div>
              <h2 className="mt-2">
                Yolun<br />
                <em>bakanlar kurulu.</em>
              </h2>
            </div>
            <p className="team-side-note">
              Her rolün bir sahibi, her sahibin kendi resmî sicil ve operasyon raporu.
            </p>
          </div>

          {/* Full Detailed Cards Grid (2 cols on desktop, 1 col on mobile) */}
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {teamMembers.map((person, index) => (
              <article
                className="relative flex flex-col rounded border-2 border-[#1d211c] bg-[#fffcf3] p-5 sm:p-7 shadow-[6px_8px_0_rgba(29,33,28,0.18)] transition-all hover:shadow-[8px_10px_0_rgba(29,33,28,0.25)]"
                key={person.id}
              >
                {/* Top Member Header & Official Code */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-[#1d211c] pb-3">
                  <div>
                    <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#145c64]">
                      KOD: {person.code}
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl text-[#1d211c]">
                      {person.name} <small className="font-mono text-sm text-[#b54b38]">0{index + 1}</small>
                    </h3>
                  </div>
                  <span className="rounded bg-[#145c64] px-2.5 py-1 font-mono text-xs font-bold text-white shadow-[2px_2px_0_#b54b38]">
                    {person.badge}
                  </span>
                </div>

                {/* Role & Title Banner */}
                <div className="mt-3">
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#b54b38]">
                    {person.role}
                  </span>
                  <div className="font-mono text-sm font-bold text-[#145c64]">
                    {person.title}
                  </div>
                </div>

                {/* Photo & Quote Row */}
                <div className="mt-4 flex flex-col sm:flex-row gap-4 items-start">
                  <div className="mx-auto sm:mx-0 w-36 shrink-0 bg-white p-2 border border-[#cac1ae] shadow-[3px_3px_0_rgba(29,33,28,0.1)]">
                    <div className="aspect-[4/5] overflow-hidden bg-[#e9e2d1]">
                      <img
                        src={person.photo}
                        alt={person.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                  </div>

                  <div className="flex-1">
                    {/* Member Quote */}
                    <blockquote className="border-l-3 border-[#b54b38] bg-[#fff8f5] p-3 font-serif text-sm italic text-[#29312e]">
                      {person.quote}
                    </blockquote>

                    {/* Secret Weapon */}
                    <div className="mt-3 rounded border border-[#cac1ae] bg-[#f5f0e5] p-2.5 text-xs">
                      <span className="flex items-center gap-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#145c64]">
                        <Sparkles size={12} /> BAGAJDAKİ GİZLİ SİLAH
                      </span>
                      <p className="mt-0.5 font-serif text-[11px] text-[#1d211c]">
                        {person.secretWeapon}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Character Dossier & Field Analysis (Direct on Card) */}
                <div className="mt-4 border-t border-[#cac1ae]/60 pt-3">
                  <h4 className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase text-[#29312e]">
                    <ShieldCheck size={14} className="text-[#145c64]" /> Karakter Dosyası & Saha Analizi
                  </h4>
                  <p className="mt-1.5 font-serif text-xs sm:text-sm leading-relaxed text-[#38413c]">
                    {person.detail}
                  </p>
                </div>

                {/* Operational Duties (4 Full Bullets) */}
                <div className="mt-4 border-t border-[#cac1ae]/60 pt-3">
                  <h4 className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase text-[#29312e]">
                    <CheckCircle2 size={14} className="text-[#145c64]" /> Sahadaki Operasyonel Görevler
                  </h4>
                  <ul className="mt-2 space-y-1.5 font-serif text-xs leading-relaxed text-[#29312e]">
                    {person.duties.map((duty, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="font-mono text-[#b54b38] font-bold">✦</span>
                        <span>{duty}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Critical Weakness / Alarm */}
                <div className="mt-4 rounded border border-[#b54b38]/40 bg-[#fff5f2] p-3">
                  <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-[#b54b38]">
                    <AlertTriangle size={14} />
                    <span>KRİTİK ZAYIF NOKTA / ALARM</span>
                  </div>
                  <p className="mt-1 font-serif text-xs text-[#521b10]">
                    {person.weakness}
                  </p>
                </div>

                {/* Official Badges */}
                <div className="mt-4 pt-3 border-t border-[#cac1ae]/60">
                  <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-[#68716c]">
                    Resmî Rütbeler & Kadro Nişanları
                  </span>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {person.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded border border-[#145c64]/30 bg-[#f0f6f4] px-2 py-0.5 font-mono text-[10px] sm:text-[11px] font-medium text-[#145c64]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* REAL MAP & ATLAS SECTION (CANLI GERÇEK HARİTA & SAHA ATLASI) */}
        <section className="atlas-section" id="atlas">
          <div className="atlas-heading">
            <div className="section-kicker">
              <Compass size={16} />
              <span>Gerçek Harita, Rota & Canlı GPS Atlası</span>
            </div>
            <h2 className="mt-1">
              Yol Atlası:<br />
              <em>araba, yürüyüş, park.</em>
            </h2>
            <p className="mt-2 max-w-3xl font-serif text-sm sm:text-base text-[#49534f]">
              Aşağıdaki sekmelerden günü seçtiğinizde harita anında o etabın gerçek karayollarına, virajlarına, GPS koordinatlarına ve otopark talimatlarına odaklanır.
            </p>
          </div>

          {/* Day Selector Tabs (Horizontal Scrollable on Mobile & Desktop) */}
          <div className="mt-6 w-full">
            <div
              className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar rounded-t border-2 border-[#1d211c] bg-[#e6dac5] p-1.5"
              role="tablist"
              aria-label="Gün seçimi"
            >
              {dayPlans.map((day) => {
                const isActive = activeDayId === day.id;
                return (
                  <button
                    key={day.id}
                    className={`flex shrink-0 cursor-pointer flex-col rounded px-3 py-2 text-left transition-all ${
                      isActive
                        ? "bg-[#145c64] text-white shadow-[2px_2px_0_#b54b38]"
                        : "bg-[#f5f0e5] text-[#29312e] hover:bg-[#ded5c2]"
                    }`}
                    onClick={() => {
                      setActiveDayId(day.id);
                      setOpenDayId(day.id);
                    }}
                    role="tab"
                    aria-selected={isActive}
                  >
                    <span className={`font-mono text-[10px] font-bold ${isActive ? "text-[#f3bc86]" : "text-[#b54b38]"}`}>
                      {day.id === "G0" ? "G0 · TÜM ROTA" : day.id}
                    </span>
                    <b className="font-display text-xs sm:text-sm whitespace-nowrap">
                      {day.id === "G0" ? "Balkan Döngüsü (1.180 km)" : day.city.split(" → ").at(-1)}
                    </b>
                  </button>
                );
              })}
            </div>

            {/* Real Interactive Leaflet Map Container */}
            <div className="w-full">
              <RealLeafletMap activeDayId={activeDayId} />
            </div>

            {/* Day Details Card (Cleanly Positioned Below Map) */}
            <aside className="mt-4 rounded border-2 border-[#1d211c] bg-[#fff9ea] p-4 sm:p-6 shadow-[5px_6px_0_rgba(29,33,28,0.15)]">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-[#29312e]/15 pb-3">
                <div>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#145c64]">
                    {activePlan.id} · {activePlan.date}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl text-[#1d211c] mt-0.5">
                    {activePlan.city}
                  </h3>
                </div>
                <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-[#145c64] bg-[#f0f6f4] px-3 py-1.5 rounded border border-[#145c64]/20">
                  <span className="flex items-center gap-1.5 font-semibold">
                    <CarFront size={16} />
                    {activePlan.drive}
                  </span>
                  <span className="flex items-center gap-1.5 font-semibold">
                    <Footprints size={16} />
                    {activePlan.walk}
                  </span>
                </div>
              </div>

              <p className="mt-3 font-serif text-sm text-[#29312e] leading-relaxed">
                {activePlan.title}
              </p>

              <div className="mt-3 rounded border border-[#b54b38]/30 bg-[#fff5f2] p-3">
                <strong className="block font-mono text-[11px] font-bold text-[#b54b38] uppercase tracking-wider">
                  ⚠️ GÜNÜN KIRMIZI BAYRAĞI / KRİTİK ALARM
                </strong>
                <p className="mt-1 font-serif text-xs text-[#521b10] leading-normal">
                  {activePlan.risk}
                </p>
              </div>

              {activePlan.id !== "G0" && (
                <div className="mt-4 flex justify-end pt-2 border-t border-[#29312e]/10">
                  <button
                    onClick={() => {
                      setOpenDayId(activePlan.id);
                      scrollToId("plan");
                    }}
                    className="flex cursor-pointer items-center gap-1 font-mono text-xs font-semibold text-[#145c64] underline hover:text-[#b54b38]"
                  >
                    Detaylı {activePlan.id} Planına Git <ArrowDown size={14} />
                  </button>
                </div>
              )}
            </aside>
          </div>

          <div className="atlas-disclaimer">
            <span>ARAŞTIRMA NOTU</span>
            <p>
              Güncel rota süreleri, yol/sınır/park koşulları, biletler ve işletme saatleri seyahatten önce yeniden teyit edilmelidir. Harita üzerindeki çizgiler operasyonel okuma ve saha kontrolü içindir; canlı navigasyon yönlendirmesi değildir.
            </p>
          </div>
        </section>

        {/* 9 GÜNLÜK DETAYLI SAHA PLANI (ITINERARY) */}
        <section className="itinerary-section" id="plan">
          <div className="itinerary-intro">
            <div className="section-kicker">
              <Clock3 size={16} />
              <span>Gün Gün Detaylı Saha Planı</span>
            </div>
            <h2>
              Bu kez sadece<br />
              <em>“nereye?” değil,</em><br />
              “nasıl?” da belli.
            </h2>
            <p>
              Her gün saf sürüş, yürüyüş, park, yemek molaları, bit pazarı ve gecikme payları birlikte düşünülerek hazırlandı. G3 ve G8, rotanın takvime değil riske göre yönetilmesi gereken şafak günleri.
            </p>
            <div className="stamped-warning">G3 & G8 · ERKEN BAŞLA</div>
          </div>

          <div className="itinerary-list">
            {dayPlans.filter((d) => d.id !== "G0").map((day) => {
              const isOpen = openDayId === day.id;
              return (
                <article
                  key={day.id}
                  className={`day-dossier ${isOpen ? "is-open" : ""}`}
                >
                  <button
                    className="day-dossier__trigger cursor-pointer"
                    onClick={() => {
                      setOpenDayId(isOpen ? "" : day.id);
                      setActiveDayId(day.id);
                    }}
                  >
                    <span className="day-id">{day.id}</span>
                    <span className="day-date">{day.date}</span>
                    <strong>{day.city}</strong>
                    <span className="day-brief">
                      <CarFront size={15} />
                      {day.drive}
                    </span>
                    <ChevronDown
                      size={19}
                      className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isOpen && (
                    <div className="day-dossier__body animate-fade-in">
                      <div className="day-route-line">
                        <Send size={16} className="text-[#145c64]" />
                        <span>{day.route}</span>
                      </div>

                      {/* Hourly Schedule */}
                      <div className="day-timing">
                        {day.timing.map((item) => (
                          <span key={item}>{item}</span>
                        ))}
                      </div>

                      {/* 4 Detail Pillars */}
                      <div className="day-detail-grid">
                        <div>
                          <h4>
                            <CarFront size={16} className="text-[#145c64]" /> Araç + Park Talimatı
                          </h4>
                          <p>{day.car}</p>
                        </div>
                        <div>
                          <h4>
                            <Footprints size={16} className="text-[#145c64]" /> Yürüyüş & Keşif
                          </h4>
                          <p>{day.foot}</p>
                        </div>
                        <div>
                          <h4>
                            <Utensils size={16} className="text-[#145c64]" /> Ne Yenir & Nerede?
                          </h4>
                          <p>
                            <b>Öneri:</b> {day.eat.places}
                            <br />
                            <b>Denenmeli:</b> {day.eat.mustTry.join(", ")}
                            <br />
                            <small className="text-[#68716c]">💡 {day.eat.tips}</small>
                          </p>
                        </div>
                        <div>
                          <h4>
                            <ShoppingBag size={16} className="text-[#145c64]" /> Alışveriş & Bit Pazarı
                          </h4>
                          <p>
                            <b>Hedef:</b> {day.shop.target}
                            <br />
                            {day.shop.summary}
                            <br />
                            <small className="text-[#68716c]">💡 {day.shop.tips}</small>
                          </p>
                        </div>
                      </div>

                      <div className="day-risk">
                        <span>KIRMIZI BAYRAK / KRİTİK ALARM</span>
                        <p>{day.risk}</p>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        {/* HAZIRLIK & VALİZ DOSYASI (INTERACTIVE COMPONENT) */}
        <section className="packing-section px-4 py-12 md:px-12 bg-[#f5f0e5]" id="valiz">
          <div className="mx-auto max-w-6xl">
            <PackingChecklist />
          </div>
        </section>

        {/* STAY & FOOD SECTION */}
        <section className="stay-food-section" id="kal">
          <div className="section-route-mark section-route-mark--food" aria-hidden="true">
            <span />
            <Send size={18} strokeWidth={1.25} />
          </div>
          <div className="food-art" aria-hidden="true">
            <img src={assets.coast} alt="" />
          </div>

          <div className="stay-food-heading">
            <div className="section-kicker section-kicker--light">
              <BedDouble size={16} />
              <span>Kal · Ye · Keşfet</span>
            </div>
            <h2>
              Her şehir için<br />
              <em>doğru üs,</em><br />
              doğru masa.
            </h2>
            <p>
              Bu bölüm otel reklamı değildir. Otopark, resepsiyon, klima, iptal ve yürüyüş dengesine göre nerede kalınacağı; masada neyin gerçekten lezzetli olduğu yazılıdır.
            </p>
          </div>

          <div className="decision-panels">
            {/* Stay Matrix */}
            <article className="decision-panel">
              <div className="decision-panel__top">
                <BedDouble size={20} />
                <h3>Konaklama Stratejisi</h3>
              </div>
              <div className="decision-table">
                {stayMatrix.map((item) => (
                  <details key={item.city} className="group">
                    <summary className="cursor-pointer">
                      <span>{item.city}</span>
                      <div className="flex items-center gap-2">
                        <b className="text-xs text-[#145c64] font-mono">{item.nights}</b>
                        {item.price && (
                          <span className="rounded bg-[#ded5c2] px-1.5 py-0.5 font-mono text-[10px] font-bold text-[#b54b38]">
                            {item.price}
                          </span>
                        )}
                        <ChevronDown size={16} className="transition-transform group-open:rotate-180" />
                      </div>
                    </summary>
                    <div>
                      {item.price && (
                        <p>
                          <strong>Rezervasyon Tutarı:</strong> <span className="font-bold text-[#b54b38]">{item.price}</span> ({item.dates})
                        </p>
                      )}
                      <p>
                        <strong>Doğru alan:</strong> {item.area}
                      </p>
                      <p>
                        <strong>Tip:</strong> {item.type}
                      </p>
                      <p>
                        <strong>Filtre:</strong> {item.filter}
                      </p>
                      <p>
                        <strong>Neden:</strong> {item.why}
                      </p>
                    </div>
                  </details>
                ))}
              </div>
            </article>

            {/* Food Matrix */}
            <article className="decision-panel decision-panel--cream">
              <div className="decision-panel__top">
                <Coffee size={20} />
                <h3>Her Durakta Ne Yenir?</h3>
              </div>
              <div className="food-scroll">
                <table>
                  <thead>
                    <tr>
                      <th>Durak</th>
                      <th>Sipariş</th>
                      <th>Aday / Fiyat Bandı</th>
                      <th>Operasyon Notu</th>
                    </tr>
                  </thead>
                  <tbody>
                    {foodMatrix.map((item) => (
                      <tr key={item.city}>
                        <td>
                          <strong>{item.city}</strong>
                        </td>
                        <td>{item.order}</td>
                        <td>
                          {item.candidates}
                          <small className="block text-[#145c64] font-semibold">{item.band}</small>
                        </td>
                        <td>{item.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="panel-footnote">
                Restoran adları rezervasyon adayıdır; masa, açık saat, menü ve güncel fiyat teyit edilmeden oturulmaz. Deniz ürününde kg fiyatı ve balığın ağırlığı siparişten önce sorulur.
              </p>
            </article>
          </div>
        </section>

        {/* SHOPPING, BIT PAZARI & ELECTRONICS MATRIX */}
        <section className="shopping-section" id="alisveris">
          <div className="shopping-heading">
            <div className="section-kicker">
              <ShoppingBag size={16} />
              <span>Alışveriş & Bit Pazarı Gerçeklik Matrisi</span>
            </div>
            <h2>
              Her yerde alışveriş<br />
              <em>yapılmaz.</em>
            </h2>
            <p>
              Rota üzerindeki güçlü modern alışveriş durağı Üsküp'tür (East Gate Mall & Bit Pazar). Kıyı şehirleri deniz, tarihî kentler ise küçük ve taşınabilir yerel ürün için anlamlıdır.
            </p>
          </div>

          <div className="shopping-cards">
            {shoppingMatrix.map((item, index) => (
              <article className="shopping-card" key={`${item.city}-${item.place}`}>
                <span className="shopping-index">0{index + 1}</span>
                <p className="font-mono text-xs uppercase text-[#b54b38]">{item.status}</p>
                <h3>{item.city}</h3>
                <strong>{item.place}</strong>
                <p className="font-serif text-xs text-[#29312e]">{item.purpose}</p>
                <small className="text-[#68716c]">{item.note}</small>
              </article>
            ))}
          </div>

          {/* Electronics Warning Box */}
          <div className="electronics-note">
            <ReceiptText size={24} className="text-[#b54b38] shrink-0" />
            <div>
              <p>
                <strong>Fatih'in Elektronik Alışveriş Kuralı:</strong> Türkiye satış fiyatı, IMEI kayıt harcı, servis garantisi, iade koşulları, fizikî klavye/priz uyumu ve gümrük vergileri birlikte değerlendirilmeden satın alma kararı verilmez.
              </p>
              <p className="mt-1 text-xs text-[#49534f]">
                Kıyafet, elektronik, kişisel hediyelik, özel alkol ve kişisel siparişler ortak Splitwise kasasına girmez!
              </p>
            </div>
          </div>
        </section>

        {/* BUDGET & SPLITWISE CALCULATOR SECTION */}
        <section className="budget-section" id="butce">
          <div className="budget-side">
            <div className="section-kicker">
              <Banknote size={16} />
              <span>Harcama Modeli & Kasa</span>
            </div>
            <h2>
              Bütçe<br />
              <em>kavga değil,</em><br />
              kayıt meselesi.
            </h2>
            <p>
              Uçak + seyahat sağlık sigortası için yapılan ön ödeme sabittir. Yerinde harcamalarda iki senaryo ve kişi bazlı yedek pay birlikte hesaplanır.
            </p>
          </div>

          <div className="budget-main">
            <BudgetCalculator />
          </div>
        </section>

        {/* 10 ZORUNLU ALTIN KURAL SECTION */}
        <section className="check-section" id="kurallar">
          <div className="check-heading">
            <div className="section-kicker">
              <CalendarDays size={16} />
              <span>Saha Güvenliği & Disiplin</span>
            </div>
            <h2>
              On zorunlu<br />
              <em>altın kural.</em>
            </h2>
          </div>

          <div className="check-grid">
            {tenRules.map((rule) => (
              <div className="check-item" key={rule.id}>
                <span>{String(rule.id).padStart(2, "0")}</span>
                <div>
                  <strong className="block font-mono text-sm text-[#145c64]">{rule.title}</strong>
                  <p className="mt-1 font-serif text-xs text-[#38413c]">{rule.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SOURCES & EVIDENCE DISCIPLINE */}
        <section className="sources-section">
          <div className="sources-title">
            <div className="section-kicker">
              <ReceiptText size={16} />
              <span>Kaynak ve Karar İzi</span>
            </div>
            <h2>
              Bu dosya<br />
              <em>neye dayanıyor?</em>
            </h2>
          </div>

          <div className="sources-grid">
            <article>
              <span>01</span>
              <h3>Resmî Giriş & Vize</h3>
              <p>
                T.C. Dışişleri Bakanlığı'nın Kuzey Makedonya ve Arnavutluk seyahat duyuruları; vize muafiyeti (90 gün), pasaport 6 ay şartı ve araç geçiş kuralları temel alındı.
              </p>
            </article>

            <article>
              <span>02</span>
              <h3>UNESCO Miras Kayıtları</h3>
              <p>
                UNESCO Dünya Mirası kayıtları; Ohri Gölü ve Eski Kenti, Butrint Antik Kenti, Berat ve Gjirokastër tarihî dokusunu rota duraklarının ana gerekçesi yaptı.
              </p>
            </article>

            <article>
              <span>03</span>
              <h3>Saha & Otopark Mevzuatı</h3>
              <p>
                Üsküp City Parking bölgeleri, Ohri Old Town 2026 araç rejimi ve Sarandë sahil polis otopark cezaları (20.000 ALL) birebir saha verileriyle işlendi.
              </p>
            </article>

            <article>
              <span>04</span>
              <h3>Fiyat & Menü Çıpaları</h3>
              <p>
                Numbeo North Macedonia & Albania güncel endeksleri, Butrint Millî Parkı resmî gişe tarifesi ve yerel kıyı gastronomisi kılavuzları referans alındı.
              </p>
            </article>
          </div>
        </section>

        {/* CLOSING SECTION */}
        <section className="closing-section">
          <div className="section-route-mark section-route-mark--closing" aria-hidden="true">
            <span />
            <Send size={18} strokeWidth={1.25} />
          </div>
          <div className="closing-collage" aria-hidden="true">
            <img src={assets.stamps} alt="" />
          </div>
          <p className="eyebrow">
            <span />
            Son Rapor
          </p>
          <h2>
            Plan hazır.<br />
            <em>Son söz: teyit et,</em><br />
            sonra çık.
          </h2>
          <button
            className="ink-button ink-button--light cursor-pointer"
            onClick={() => scrollToId("top")}
          >
            Dosyanın başına dön <ArrowDown size={18} className="rotate-180" />
          </button>
          <footer>
            <span>© 2026 Balkan Macerası · Balkan Yol Ekibi Saha Dosyası</span>
            <span>İkra · Fatih · Eyüpcan · Mert</span>
            <span className="created-by-kus">✦ Created by Kus ✦</span>
          </footer>
        </section>
      </main>

      {/* Member Ministerial Dossier Modal */}
      {selectedMember && (
        <MemberModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}
    </div>
  );
}
