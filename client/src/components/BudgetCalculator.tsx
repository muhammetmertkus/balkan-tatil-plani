import { useState } from "react";
import { 
  Calculator, 
  CheckCircle2, 
  Circle, 
  Receipt, 
  Building2, 
  Plane, 
  ShieldCheck, 
  CreditCard, 
  Sparkles,
  PieChart
} from "lucide-react";

interface HolidayExpenseItem {
  id: string;
  label: string;
  category: "flight" | "insurance" | "tax" | "stay";
  amount: number;
  isPaid: boolean;
  note?: string;
  date?: string;
}

const HOLIDAY_EXPENSES: HolidayExpenseItem[] = [
  { id: "e1", label: "GİDİŞ UÇAK (İstanbul ✈️ Üsküp)", category: "flight", amount: 17200, isPaid: true, note: "4 kişilik gidiş uçuş biletleri ödendi" },
  { id: "e2", label: "DÖNÜŞ UÇAK (Üsküp ✈️ İstanbul)", category: "flight", amount: 16876, isPaid: true, note: "4 kişilik dönüş uçuş biletleri ödendi" },
  { id: "e3", label: "SİGORTA (Seyahat Sağlık)", category: "insurance", amount: 1853, isPaid: true, note: "4 kişilik poliçe kapatıldı" },
  { id: "e4", label: "Y.D ÇIKIŞ HARÇ (4 Kişi)", category: "tax", amount: 5000, isPaid: false, note: "Kişi başı 1.250 ₺ havalimanı çıkış harcı" },
  { id: "e5", label: "29-30 ÜSKÜP AIRBNB (1. Gece)", category: "stay", amount: 3019, isPaid: false, date: "29–30 Ağustos", note: "Üsküp Merkez / Debar Maalo 2 yatak odalı daire" },
  { id: "e6", label: "30-31 OHRİD AIRBNB (2. Gece)", category: "stay", amount: 4594, isPaid: false, date: "30–31 Ağustos", note: "Ohri Old Town / Göl Kıyısı daire" },
  { id: "e7", label: "31-3 SARANDE OTEL (3 Gece)", category: "stay", amount: 33210, isPaid: false, date: "31 Ağustos – 3 Eylül", note: "İyon kıyısı 3 gece kesintisiz sabit konaklama" },
  { id: "e8", label: "3-4 DURES AIRBNB (6. Gece)", category: "stay", amount: 5512, isPaid: false, date: "3–4 Eylül", note: "Durrës Vollga sahil kordonu apart" },
  { id: "e9", label: "4-5 TİRAN AIRBNB (7. Gece)", category: "stay", amount: 3812, isPaid: false, date: "4–5 Eylül", note: "Tiran Blloku / Merkez daire" },
  { id: "e10", label: "5-6 ÜSKÜP AIRBNB (8. Gece)", category: "stay", amount: 4429, isPaid: false, date: "5–6 Eylül", note: "Dönüş öncesi Üsküp Aerodrom / Merkez apart" },
];

export function BudgetCalculator() {
  const [calcAmount, setCalcAmount] = useState<number>(100);
  const [calcCurrency, setCalcCurrency] = useState<"EUR" | "MKD" | "ALL" | "TRY">("EUR");
  const [splitCount, setSplitCount] = useState<number>(4);

  // Approximate FX conversion rates
  // 1 EUR = ~61.5 MKD = ~100 ALL = ~38.5 TRY
  const fxRates = {
    EUR: 1,
    MKD: 61.5,
    ALL: 100.2,
    TRY: 38.5,
  };

  const totalFixedBudget = HOLIDAY_EXPENSES.reduce((sum, item) => sum + item.amount, 0);
  const totalPaidAmount = HOLIDAY_EXPENSES.filter((i) => i.isPaid).reduce((sum, item) => sum + item.amount, 0);
  const totalRemainingAmount = totalFixedBudget - totalPaidAmount;

  const perPersonTotal = totalFixedBudget / 4;
  const perPersonPaid = totalPaidAmount / 4;
  const perPersonRemaining = totalRemainingAmount / 4;

  // Convert given amount to base EUR
  const baseEur = calcAmount / (fxRates[calcCurrency] || 1);

  const converted = {
    EUR: (baseEur * fxRates.EUR).toFixed(2),
    MKD: Math.round(baseEur * fxRates.MKD),
    ALL: Math.round(baseEur * fxRates.ALL),
    TRY: (baseEur * fxRates.TRY).toFixed(2),
  };

  const perPerson = {
    EUR: (parseFloat(converted.EUR) / splitCount).toFixed(2),
    MKD: Math.round(converted.MKD / splitCount),
    ALL: Math.round(converted.ALL / splitCount),
    TRY: (parseFloat(converted.TRY) / splitCount).toFixed(2),
  };

  return (
    <div className="budget-dossier space-y-8">
      {/* Top Banner: Real Recorded Costs */}
      <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
        <div className="rounded border-2 border-[#145c64] bg-[#f0f6f4] p-5 shadow-[4px_4px_0_#145c64]">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#145c64]">
              ÖDENMİŞ SABİT KAYIT
            </span>
            <span className="rounded bg-emerald-600 px-2 py-0.5 font-mono text-[10px] font-bold text-white">
              KAPATILDI
            </span>
          </div>
          <div className="mt-2 font-display text-3xl sm:text-4xl text-[#1d211c]">
            {totalPaidAmount.toLocaleString("tr-TR")} ₺
          </div>
          <p className="mt-1 font-serif text-xs text-[#49534f]">
            Gidiş-dönüş uçak biletleri + 4 kişilik Seyahat Sağlık Sigortası poliçeleri ödendi.
          </p>
          <div className="mt-3 border-t border-[#145c64]/20 pt-2 font-mono text-xs font-bold text-[#145c64]">
            Kişi Başı: {perPersonPaid.toLocaleString("tr-TR", { minimumFractionDigits: 2 })} ₺
          </div>
        </div>

        <div className="rounded border-2 border-[#1d211c] bg-[#fffcf3] p-5 shadow-[4px_4px_0_#b54b38]">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#b54b38]">
              TOPLAM ÖN ÖDEME & REZERVASYON
            </span>
            <span className="rounded bg-[#1d211c] px-2 py-0.5 font-mono text-[10px] font-bold text-white">
              10 KALEM
            </span>
          </div>
          <div className="mt-2 font-display text-3xl sm:text-4xl text-[#b54b38]">
            {totalFixedBudget.toLocaleString("tr-TR")} ₺
          </div>
          <p className="mt-1 font-serif text-xs text-[#49534f]">
            Uçaklar, sigorta, yurt dışı çıkış harcı ve 7 gece (Üsküp, Ohri, Sarandë, Durrës, Tiran) konaklama bütçesi.
          </p>
          <div className="mt-3 border-t border-[#cac1ae] pt-2 font-mono text-xs font-bold text-[#b54b38]">
            Kişi Başı: {perPersonTotal.toLocaleString("tr-TR", { minimumFractionDigits: 2 })} ₺ (~{Math.round(perPersonTotal / 38.5)} €)
          </div>
        </div>

        <div className="rounded border-2 border-[#cac1ae] bg-[#fff8f5] p-5 shadow-[4px_4px_0_rgba(29,33,28,0.12)]">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#38413c]">
              REZERVASYON / KALAN PAY
            </span>
            <span className="rounded bg-[#ded5c2] px-2 py-0.5 font-mono text-[10px] font-bold text-[#29312e]">
              ÖDENECEK
            </span>
          </div>
          <div className="mt-2 font-display text-3xl sm:text-4xl text-[#1d211c]">
            {totalRemainingAmount.toLocaleString("tr-TR")} ₺
          </div>
          <p className="mt-1 font-serif text-xs text-[#49534f]">
            Airbnb / Otel ödemeleri ve havalimanı harçları için ayrılması gereken net bütçe.
          </p>
          <div className="mt-3 border-t border-[#b54b38]/20 pt-2 font-mono text-xs font-bold text-[#145c64]">
            Kişi Başı: {perPersonRemaining.toLocaleString("tr-TR", { minimumFractionDigits: 2 })} ₺
          </div>
        </div>
      </div>

      {/* DETAILED "TATİL HARCAMA" CHECKLIST CARD (Matching User Notes App) */}
      <div className="rounded border-2 border-[#1d211c] bg-[#111311] p-5 sm:p-7 text-white shadow-[8px_10px_0_rgba(29,33,28,0.25)]">
        <div className="flex flex-col gap-2 border-b border-stone-800 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#f3bc86]">
              <Receipt size={16} />
              <span>Resmî Ön Ödeme & Rezervasyon Tablosu</span>
            </div>
            <h3 className="mt-1 font-display text-2xl sm:text-3xl text-white tracking-wide">
              TATİL HARCAMA
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 font-mono text-xs text-amber-400">
              <CheckCircle2 size={16} className="text-amber-400 fill-amber-400/20" />
              <span>Ödendi ({HOLIDAY_EXPENSES.filter(i => i.isPaid).length})</span>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-xs text-stone-400">
              <Circle size={16} className="text-stone-500" />
              <span>Beklemede ({HOLIDAY_EXPENSES.filter(i => !i.isPaid).length})</span>
            </div>
          </div>
        </div>

        {/* Expense List Items */}
        <div className="mt-5 divide-y divide-stone-800/80 font-mono text-sm">
          {HOLIDAY_EXPENSES.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between transition-colors hover:bg-stone-900/60 px-2 rounded"
            >
              <div className="flex items-center gap-3">
                {item.isPaid ? (
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500 text-black font-bold">
                    ✓
                  </div>
                ) : (
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-stone-600 text-transparent">
                    ○
                  </div>
                )}
                <div>
                  <span className={`font-bold tracking-wider ${item.isPaid ? "text-amber-100" : "text-stone-300"}`}>
                    {item.label}
                  </span>
                  {item.note && (
                    <span className="block font-serif text-xs text-stone-400">
                      {item.note}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-baseline justify-between sm:justify-end gap-3 pl-9 sm:pl-0">
                <span className="font-mono text-base sm:text-lg font-bold text-amber-400">
                  : {item.amount.toLocaleString("tr-TR")} ₺
                </span>
                <span className="font-mono text-[11px] text-stone-400">
                  (Kişi: {(item.amount / 4).toLocaleString("tr-TR")} ₺)
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Total Summary Footer */}
        <div className="mt-6 border-t-2 border-amber-500/40 bg-stone-900/90 p-4 rounded flex flex-col sm:flex-row items-center justify-between gap-3 font-mono">
          <span className="text-xs uppercase tracking-widest text-stone-300 font-bold">
            TOPLAM REZERVASYON & ÖN ÖDEME BÜTÇESİ
          </span>
          <div className="flex items-baseline gap-3">
            <span className="text-2xl sm:text-3xl font-bold text-amber-400">
              {totalFixedBudget.toLocaleString("tr-TR")} ₺
            </span>
            <span className="text-xs text-stone-400">
              (Kişi Başı: <b>{perPersonTotal.toLocaleString("tr-TR")} ₺</b>)
            </span>
          </div>
        </div>
      </div>

      {/* Interactive FX & Splitwise Converter Tool */}
      <div className="rounded border border-[#29312e]/20 bg-[#fffcf3] p-4 sm:p-6 shadow-[4px_6px_0_rgba(29,33,28,0.12)]">
        <div className="flex flex-col gap-2 border-b border-[#29312e]/15 pb-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-[#145c64] text-white">
              <Calculator size={18} />
            </div>
            <div>
              <h4 className="font-display text-lg sm:text-xl text-[#1d211c]">Fatih'in Kasa & Splitwise Arbitraj Modülü</h4>
              <p className="font-mono text-[11px] sm:text-xs text-[#68716c]">
                Harcamayı girin; anında EUR, MKD, ALL ve TRY karşılığını 4'e bölerek görün!
              </p>
            </div>
          </div>
          <span className="font-mono text-xs font-semibold text-[#b54b38] bg-[#fff0ed] px-2.5 py-1 rounded border border-[#b54b38]/20">
            “25 cent'i kimse için yuvarlamıyorum!”
          </span>
        </div>

        {/* Input Controls */}
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div>
            <label className="block font-mono text-xs font-semibold text-[#29312e]">Harcama Tutarı</label>
            <input
              type="number"
              min="1"
              value={calcAmount}
              onChange={(e) => setCalcAmount(Math.max(0, parseFloat(e.target.value) || 0))}
              className="mt-1 w-full rounded border border-[#cac1ae] bg-white p-2.5 font-mono text-base sm:text-lg font-bold text-[#145c64] focus:border-[#145c64] focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-mono text-xs font-semibold text-[#29312e]">Ödenen Para Birimi</label>
            <select
              value={calcCurrency}
              onChange={(e) => setCalcCurrency(e.target.value as any)}
              className="mt-1 w-full rounded border border-[#cac1ae] bg-white p-2.5 font-mono text-xs sm:text-sm font-semibold text-[#29312e] focus:border-[#145c64] focus:outline-none"
            >
              <option value="EUR">Euro (€) — Ortak Bütçe</option>
              <option value="MKD">Makedon Dinarı (MKD)</option>
              <option value="ALL">Arnavutluk Leki (ALL)</option>
              <option value="TRY">Türk Lirası (₺)</option>
            </select>
          </div>

          <div>
            <label className="block font-mono text-xs font-semibold text-[#29312e]">Bölünecek Kişi Sayısı</label>
            <div className="mt-1 flex items-center gap-1">
              {[2, 3, 4].map((num) => (
                <button
                  key={num}
                  onClick={() => setSplitCount(num)}
                  className={`flex-1 cursor-pointer rounded py-2 font-mono text-xs sm:text-sm font-bold transition-all ${
                    splitCount === num
                      ? "bg-[#145c64] text-white shadow-[2px_2px_0_#b54b38]"
                      : "border border-[#cac1ae] bg-[#f5f0e5] text-[#29312e] hover:bg-[#ded5c2]"
                  }`}
                >
                  {num} Kişi
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Real-time Calculation Result Cards */}
        <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
          <div className="rounded border border-[#cac1ae] bg-[#fdfbf7] p-2.5 sm:p-3 text-center">
            <span className="font-mono text-[9px] sm:text-[10px] text-[#68716c]">EURO (€)</span>
            <div className="font-display text-lg sm:text-xl text-[#145c64]">{converted.EUR} €</div>
            <div className="mt-1 border-t border-[#cac1ae]/60 pt-1 font-mono text-[10px] sm:text-xs font-bold text-[#b54b38]">
              Kişi: {perPerson.EUR} €
            </div>
          </div>

          <div className="rounded border border-[#cac1ae] bg-[#fdfbf7] p-2.5 sm:p-3 text-center">
            <span className="font-mono text-[9px] sm:text-[10px] text-[#68716c]">MAKEDON DİNARI (MKD)</span>
            <div className="font-display text-lg sm:text-xl text-[#1d211c]">{converted.MKD.toLocaleString()} MKD</div>
            <div className="mt-1 border-t border-[#cac1ae]/60 pt-1 font-mono text-[10px] sm:text-xs font-bold text-[#145c64]">
              Kişi: {perPerson.MKD.toLocaleString()} MKD
            </div>
          </div>

          <div className="rounded border border-[#cac1ae] bg-[#fdfbf7] p-2.5 sm:p-3 text-center">
            <span className="font-mono text-[9px] sm:text-[10px] text-[#68716c]">ARNAVUTLUK LEKİ (ALL)</span>
            <div className="font-display text-lg sm:text-xl text-[#1d211c]">{converted.ALL.toLocaleString()} ALL</div>
            <div className="mt-1 border-t border-[#cac1ae]/60 pt-1 font-mono text-[10px] sm:text-xs font-bold text-[#145c64]">
              Kişi: {perPerson.ALL.toLocaleString()} ALL
            </div>
          </div>

          <div className="rounded border border-[#cac1ae] bg-[#fdfbf7] p-2.5 sm:p-3 text-center">
            <span className="font-mono text-[9px] sm:text-[10px] text-[#68716c]">TÜRK LİRASI (TRY)</span>
            <div className="font-display text-lg sm:text-xl text-[#1d211c]">{converted.TRY} ₺</div>
            <div className="mt-1 border-t border-[#cac1ae]/60 pt-1 font-mono text-[10px] sm:text-xs font-bold text-[#145c64]">
              Kişi: {perPerson.TRY} ₺
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Expense Breakdown Table / Responsive Cards on Mobile */}
      <div className="overflow-hidden rounded border border-[#29312e]/20 bg-[#fffcf3] shadow-[4px_6px_0_rgba(29,33,28,0.1)]">
        <div className="border-b border-[#29312e]/15 bg-[#f5f0e5] p-4 sm:px-6 sm:py-4">
          <h4 className="font-display text-lg sm:text-xl text-[#1d211c]">Kalem Kalem 9 Günlük Saha Harcama Matrisi (Yerinde Harcamalar)</h4>
          <p className="font-mono text-[11px] sm:text-xs text-[#68716c]">
            4 yetişkin, 1.220 km toplam sürüş ve yeni rota durakları (Üsküp, Ohri, Sarandë 3G, Durrës, Tiran) baz alınmıştır.
          </p>
        </div>

        {/* Mobile View: Clean Stacked Cards */}
        <div className="block sm:hidden divide-y divide-[#cac1ae]/40 p-3 space-y-3">
          {[
            {
              item: "🚗 Kiralık Araç & Sınır & Yakıt",
              sc1: "140 € / 560 €",
              sc2: "190 € / 760 €",
              desc: "Kompakt/SUV araç kira bedeli + Arnavutluk sınır geçiş izni + Green Card + ~95 L benzin + gişe/otoparklar.",
            },
            {
              item: "🍽️ Yeme - İçme (9 Gün)",
              sc1: "195 € / 780 €",
              sc2: "280 € / 1.120 €",
              desc: "Günde 1 ekonomik öğün + akşam yerel sofra + Sarandë ve Durrës'te taze balık / deniz mahsulleri ziyafeti.",
            },
            {
              item: "🏛️ Müze, Butrint, Dajti & Plaj Giriş",
              sc1: "30 € / 120 €",
              sc2: "50 € / 200 €",
              desc: "Butrint Antik Kenti (1.000 ALL), Blue Eye, Durrës Amfitiyatrosu, Bunk'Art 2, Matka tekne turu + şezlong.",
            },
            {
              item: "📶 eSIM / Acil Durum / Nakit Payı",
              sc1: "30 € / 120 €",
              sc2: "55 € / 220 €",
              desc: "Yerel internet eSIM (Airalo/Balkan pass), banka komisyonları ve ortak acil durum amortismanı.",
            },
          ].map((row, idx) => (
            <div key={idx} className="pt-3 first:pt-0">
              <div className="font-serif font-bold text-sm text-[#1d211c]">{row.item}</div>
              <div className="mt-1.5 flex items-center justify-between text-xs font-mono">
                <span className="text-[#145c64] bg-[#f0f6f4] px-2 py-0.5 rounded">
                  Ölçülü: <b>{row.sc1}</b>
                </span>
                <span className="text-[#b54b38] bg-[#fff5f2] px-2 py-0.5 rounded">
                  Rahat Kıyı: <b>{row.sc2}</b>
                </span>
              </div>
              <p className="mt-1 text-[11px] text-[#556059] font-serif">{row.desc}</p>
            </div>
          ))}

          <div className="pt-3 border-t-2 border-[#145c64] bg-[#f5f0e5] p-3 rounded">
            <div className="font-mono text-xs font-bold text-[#145c64] uppercase">TOPLAM SAHA HARCAMA TAHMİNİ</div>
            <div className="mt-1 flex items-center justify-between font-mono text-xs">
              <span className="text-[#145c64] font-bold">395 € / 1.580 €</span>
              <span className="text-[#b54b38] font-bold">575 € / 2.300 €</span>
            </div>
            <p className="mt-1 font-serif text-[10px] text-[#29312e]">
              * Önceden ödenen uçak/otel bütçesi hariç, sahada harcanacak cep bütçesidir.
            </p>
          </div>
        </div>

        {/* Desktop View: Classic Table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-left font-serif text-sm">
            <thead className="border-b border-[#cac1ae] bg-[#ebe4d4] font-mono text-xs uppercase text-[#29312e]">
              <tr>
                <th className="p-3.5">Harcama Kalemi</th>
                <th className="p-3.5">Ölçülü Senaryo (Kişi / Grup)</th>
                <th className="p-3.5">Rahat Kıyı Senaryosu (Kişi / Grup)</th>
                <th className="p-3.5">Operasyonel Açıklama & Strateji</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#cac1ae]/40 text-xs">
              <tr className="hover:bg-[#fbf9f2]">
                <td className="p-3.5 font-bold text-[#1d211c]">🚗 Kiralık Araç & Sınır & Yakıt</td>
                <td className="p-3.5 font-mono">140 € / <b>560 €</b></td>
                <td className="p-3.5 font-mono text-[#b54b38]">190 € / <b>760 €</b></td>
                <td className="p-3.5 text-[#49534f]">Kompakt/SUV araç kira bedeli + Arnavutluk sınır geçiş izni + Green Card + ~95 L benzin + gişe/otoparklar.</td>
              </tr>
              <tr className="hover:bg-[#fbf9f2]">
                <td className="p-3.5 font-bold text-[#1d211c]">🍽️ Yeme - İçme (9 Gün)</td>
                <td className="p-3.5 font-mono">195 € / <b>780 €</b></td>
                <td className="p-3.5 font-mono text-[#b54b38]">280 € / <b>1.120 €</b></td>
                <td className="p-3.5 text-[#49534f]">Günde 1 ekonomik öğün + akşam yerel sofra + Sarandë ve Durrës'te taze balık / deniz mahsulleri ziyafeti.</td>
              </tr>
              <tr className="hover:bg-[#fbf9f2]">
                <td className="p-3.5 font-bold text-[#1d211c]">🏛️ Müze, Butrint, Dajti & Plaj Giriş</td>
                <td className="p-3.5 font-mono">30 € / <b>120 €</b></td>
                <td className="p-3.5 font-mono text-[#b54b38]">50 € / <b>200 €</b></td>
                <td className="p-3.5 text-[#49534f]">Butrint Antik Kenti (1.000 ALL), Blue Eye, Durrës Amfitiyatrosu, Bunk'Art 2, Matka tekne turu + şezlong.</td>
              </tr>
              <tr className="hover:bg-[#fbf9f2]">
                <td className="p-3.5 font-bold text-[#1d211c]">📶 eSIM / Acil Durum / Nakit Payı</td>
                <td className="p-3.5 font-mono">30 € / <b>120 €</b></td>
                <td className="p-3.5 font-mono text-[#b54b38]">55 € / <b>220 €</b></td>
                <td className="p-3.5 text-[#49534f]">Yerel internet eSIM (Airalo/Balkan pass), banka komisyonları ve ortak acil durum amortismanı.</td>
              </tr>
              <tr className="bg-[#f5f0e5] font-mono font-bold">
                <td className="p-3.5 text-sm text-[#145c64]">TOPLAM SAHA HARCAMA TAHMİNİ</td>
                <td className="p-3.5 text-sm text-[#145c64]">395 € / 1.580 €</td>
                <td className="p-3.5 text-sm text-[#b54b38]">575 € / 2.300 €</td>
                <td className="p-3.5 font-serif text-[11px] font-normal text-[#29312e]">* Ön ödemesi yapılan uçak ve konaklama haricinde cepte bulunması gereken bütçedir.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
