import { useState } from "react";
import { Banknote, Calculator, ReceiptText, ShieldAlert, ArrowRightLeft, UserCheck, TrendingUp, AlertTriangle } from "lucide-react";

export function BudgetCalculator() {
  const [calcAmount, setCalcAmount] = useState<number>(100);
  const [calcCurrency, setCalcCurrency] = useState<"EUR" | "MKD" | "ALL" | "TRY">("EUR");
  const [splitCount, setSplitCount] = useState<number>(4);

  // Approximate FX conversion rates (reference values from research)
  // 1 EUR = ~61.5 MKD = ~100 ALL = ~38.5 TRY
  const fxRates = {
    EUR: 1,
    MKD: 61.5,
    ALL: 100.2,
    TRY: 38.5,
  };

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
      {/* Top Banner: Fixed & Paid Costs */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded border border-[#145c64]/30 bg-[#f0f6f4] p-5 shadow-[4px_4px_0_#145c64]">
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#145c64]">
            ÖDENMİŞ & SABİT KAYIT
          </span>
          <div className="mt-2 font-display text-3xl text-[#1d211c]">35.929 TL</div>
          <p className="mt-1 font-serif text-xs text-[#49534f]">
            İstanbul ↔ Üsküp uçak biletleri + 4 kişilik Seyahat Sağlık Sigortası poliçeleri kapatıldı.
          </p>
          <div className="mt-3 border-t border-[#145c64]/20 pt-2 font-mono text-xs font-semibold text-[#145c64]">
            Kişi Başı: 8.982,25 TL
          </div>
        </div>

        <div className="rounded border border-[#cac1ae] bg-[#fffcf3] p-5 shadow-[4px_4px_0_rgba(29,33,28,0.1)]">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#38413c]">
              SENARYO 1: ÖLÇÜLÜ & EKSİKSİZ
            </span>
            <span className="rounded bg-[#145c64] px-1.5 py-0.5 font-mono text-[10px] text-white">545 € / Kişi</span>
          </div>
          <div className="mt-2 font-display text-3xl text-[#1d211c]">2.180 EUR</div>
          <p className="mt-1 font-serif text-xs text-[#49534f]">
            Apart konaklamaları, yerel lezzetler, Butrint antik kenti ve yakıt/otopark dahil 4 kişilik saha bütçesi.
          </p>
          <div className="mt-3 border-t border-[#cac1ae] pt-2 font-mono text-xs text-[#68716c]">
            Kişi başı ~20.980 TL (Yerinde harcama)
          </div>
        </div>

        <div className="rounded border border-[#b54b38]/40 bg-[#fff8f5] p-5 shadow-[4px_4px_0_#b54b38]">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#b54b38]">
              SENARYO 2: RAHAT KIYI TEMPOSU
            </span>
            <span className="rounded bg-[#b54b38] px-1.5 py-0.5 font-mono text-[10px] text-white">790 € / Kişi</span>
          </div>
          <div className="mt-2 font-display text-3xl text-[#1d211c]">3.160 EUR</div>
          <p className="mt-1 font-serif text-xs text-[#49534f]">
            Kıyıda deniz mahsulleri ziyafetleri, butik oteller, beach club şezlongları ve ekstra molalar dahil.
          </p>
          <div className="mt-3 border-t border-[#b54b38]/20 pt-2 font-mono text-xs text-[#b54b38]">
            Kişi başı ~30.415 TL (Yerinde harcama)
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
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <div>
            <label className="block font-mono text-xs font-semibold text-[#29312e]">Harcama Tutarı</label>
            <input
              type="number"
              min="1"
              value={calcAmount}
              onChange={(e) => setCalcAmount(Math.max(0, parseFloat(e.target.value) || 0))}
              className="mt-1 w-full border border-[#cac1ae] bg-white p-2.5 font-mono text-lg font-bold text-[#145c64] focus:border-[#145c64] focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-mono text-xs font-semibold text-[#29312e]">Ödenen Para Birimi</label>
            <select
              value={calcCurrency}
              onChange={(e) => setCalcCurrency(e.target.value as any)}
              className="mt-1 w-full border border-[#cac1ae] bg-white p-2.5 font-mono text-sm font-semibold text-[#29312e] focus:border-[#145c64] focus:outline-none"
            >
              <option value="EUR">Euro (€) — Ortak Bütçe</option>
              <option value="MKD">Makedon Dinarı (MKD) — Üsküp/Ohri</option>
              <option value="ALL">Arnavutluk Leki (ALL) — Riviera/Köy</option>
              <option value="TRY">Türk Lirası (₺) — Kart Ekstresi</option>
            </select>
          </div>

          <div>
            <label className="block font-mono text-xs font-semibold text-[#29312e]">Bölünecek Kişi Sayısı</label>
            <div className="mt-1 flex items-center gap-1">
              {[2, 3, 4].map((num) => (
                <button
                  key={num}
                  onClick={() => setSplitCount(num)}
                  className={`flex-1 cursor-pointer py-2 font-mono text-sm font-bold transition-all ${
                    splitCount === num
                      ? "bg-[#145c64] text-white shadow-[2px_2px_0_#b54b38]"
                      : "border border-[#cac1ae] bg-[#f5f0e5] text-[#29312e] hover:bg-[#e9e2d1]"
                  }`}
                >
                  {num} Kişi {num === 4 ? "(Tüm Ekip)" : ""}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Real-time Calculation Result Cards */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded border border-[#cac1ae] bg-[#fdfbf7] p-3 text-center">
            <span className="font-mono text-[10px] text-[#68716c]">EURO (€)</span>
            <div className="font-display text-xl text-[#145c64]">{converted.EUR} €</div>
            <div className="mt-1 border-t border-[#cac1ae]/60 pt-1 font-mono text-xs font-bold text-[#b54b38]">
              Kişi: {perPerson.EUR} €
            </div>
          </div>

          <div className="rounded border border-[#cac1ae] bg-[#fdfbf7] p-3 text-center">
            <span className="font-mono text-[10px] text-[#68716c]">MAKEDON DİNARI (MKD)</span>
            <div className="font-display text-xl text-[#1d211c]">{converted.MKD.toLocaleString()} MKD</div>
            <div className="mt-1 border-t border-[#cac1ae]/60 pt-1 font-mono text-xs font-bold text-[#145c64]">
              Kişi: {perPerson.MKD.toLocaleString()} MKD
            </div>
          </div>

          <div className="rounded border border-[#cac1ae] bg-[#fdfbf7] p-3 text-center">
            <span className="font-mono text-[10px] text-[#68716c]">ARNAVUTLUK LEKİ (ALL)</span>
            <div className="font-display text-xl text-[#1d211c]">{converted.ALL.toLocaleString()} ALL</div>
            <div className="mt-1 border-t border-[#cac1ae]/60 pt-1 font-mono text-xs font-bold text-[#145c64]">
              Kişi: {perPerson.ALL.toLocaleString()} ALL
            </div>
          </div>

          <div className="rounded border border-[#cac1ae] bg-[#fdfbf7] p-3 text-center">
            <span className="font-mono text-[10px] text-[#68716c]">TÜRK LİRASI (TRY)</span>
            <div className="font-display text-xl text-[#1d211c]">{converted.TRY} ₺</div>
            <div className="mt-1 border-t border-[#cac1ae]/60 pt-1 font-mono text-xs font-bold text-[#145c64]">
              Kişi: {perPerson.TRY} ₺
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Expense Breakdown Table */}
      <div className="overflow-hidden border border-[#29312e]/20 bg-[#fffcf3]">
        <div className="border-b border-[#29312e]/15 bg-[#f5f0e5] px-6 py-4">
          <h4 className="font-display text-xl text-[#1d211c]">Kalem Kalem 8 Günlük Harcama Matrisi</h4>
          <p className="font-mono text-xs text-[#68716c]">
            4 yetişkin, 1.180 km toplam sürüş ve 7 gece konaklama baz alınarak hazırlanmıştır.
          </p>
        </div>

        <div className="overflow-x-auto">
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
                <td className="p-3.5 font-bold text-[#1d211c]">🏠 Konaklama (7 Gece)</td>
                <td className="p-3.5 font-mono">170 € / <b>680 €</b></td>
                <td className="p-3.5 font-mono text-[#b54b38]">245 € / <b>980 €</b></td>
                <td className="p-3.5 text-[#49534f]">Üsküp (2), Ohri (1), Sarandë (2), Himarë (1), Berat (1). Otopark garantili apart ve oteller.</td>
              </tr>
              <tr className="hover:bg-[#fbf9f2]">
                <td className="p-3.5 font-bold text-[#1d211c]">🚗 Kiralık Araç & Sınır & Yakıt</td>
                <td className="p-3.5 font-mono">135 € / <b>540 €</b></td>
                <td className="p-3.5 font-mono text-[#b54b38]">185 € / <b>740 €</b></td>
                <td className="p-3.5 text-[#49534f]">Kompakt/SUV araç kira bedeli + Arnavutluk sınır geçiş izni + Green Card + ~85 L benzin + gişe/otoparklar.</td>
              </tr>
              <tr className="hover:bg-[#fbf9f2]">
                <td className="p-3.5 font-bold text-[#1d211c]">🍽️ Yeme - İçme (8 Gün)</td>
                <td className="p-3.5 font-mono">185 € / <b>740 €</b></td>
                <td className="p-3.5 font-mono text-[#b54b38]">260 € / <b>1.040 €</b></td>
                <td className="p-3.5 text-[#49534f]">Günde 1 ekonomik öğün + akşam yerel sofra + Sarandë/Himarë'de taze balık ve ızgara ahtapot gecesi.</td>
              </tr>
              <tr className="hover:bg-[#fbf9f2]">
                <td className="p-3.5 font-bold text-[#1d211c]">🏛️ Müze, Butrint & Plaj Giriş</td>
                <td className="p-3.5 font-mono">25 € / <b>100 €</b></td>
                <td className="p-3.5 font-mono text-[#b54b38]">45 € / <b>180 €</b></td>
                <td className="p-3.5 text-[#49534f]">Butrint Antik Kenti (1.000 ALL), Blue Eye (50 ALL), Kaleler (Berat/Gjirokastër) + şezlong/şemsiye payı.</td>
              </tr>
              <tr className="hover:bg-[#fbf9f2]">
                <td className="p-3.5 font-bold text-[#1d211c]">📶 eSIM / Acil Durum / Nakit Payı</td>
                <td className="p-3.5 font-mono">30 € / <b>120 €</b></td>
                <td className="p-3.5 font-mono text-[#b54b38]">55 € / <b>220 €</b></td>
                <td className="p-3.5 text-[#49534f]">Yerel internet eSIM (Airalo/Balkan pass), banka komisyonları ve ortak acil durum amortismanı.</td>
              </tr>
              <tr className="bg-[#f5f0e5] font-mono font-bold">
                <td className="p-3.5 text-sm text-[#145c64]">TOPLAM YERİNDE BÜTÇE</td>
                <td className="p-3.5 text-sm text-[#145c64]">545 € / 2.180 €</td>
                <td className="p-3.5 text-sm text-[#b54b38]">790 € / 3.160 €</td>
                <td className="p-3.5 font-serif text-[11px] font-normal text-[#29312e]">+ %12 kişisel beklenmeyen payı (yaklaşık 65–95 €) cebinizde kalmalıdır.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
