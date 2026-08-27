import { useEffect } from "react";
import { AppNavbar } from "@/components/AppNavbar";
import { BudgetCalculator } from "@/components/BudgetCalculator";
import { Banknote, Compass, Backpack, Star, Sparkles, ShieldCheck } from "lucide-react";

export default function KasaPage() {
  useEffect(() => {
    document.title = "Harcama Modeli & Kasa | Balkan Yol Ekibi";
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className="paper-site atlas-site min-h-screen flex flex-col bg-[#f5f0e5] text-[#1d211c]">
      <AppNavbar activeTab="kasa" />

      <main className="flex-1 w-full max-w-7xl mx-auto px-3 sm:px-6 py-6 md:py-8 space-y-6">
        {/* Focused Hero Banner */}
        <div className="bg-[#fffcf3] border border-[#cac1ae] p-4 sm:p-6 rounded-lg shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[#145c64] font-mono text-xs font-bold uppercase tracking-wider">
              <Banknote size={18} />
              <span>Doğrudan Kasa & Bütçe Yönetimi</span>
              <span className="bg-[#b54b38] text-white text-[10px] px-1.5 py-0.5 rounded font-sans">
                Hızlı Sekme
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1d211c]">
              Harcama Modeli & Kasa Takibi
            </h1>
            <p className="font-serif text-xs sm:text-sm text-[#4c5851] max-w-2xl">
              Yol boyunca gereksiz detay görmeden anında harcama ekleyebilir, kurları güncelleyebilir ve kimin kime ne kadar borcu olduğunu Splitwise mantığıyla takip edebilirsiniz.
            </p>
          </div>

          <div className="flex items-center gap-2 self-stretch sm:self-auto shrink-0">
            <div className="bg-[#ede6d6] border border-[#cac1ae] px-3 py-2 rounded text-left font-mono text-xs">
              <span className="block text-[10px] text-[#68716c] uppercase font-bold">Direkt Bağlantı (Yıldızla)</span>
              <span className="font-bold text-[#145c64] break-all select-all">
                .../#/kasa
              </span>
            </div>
          </div>
        </div>

        {/* Budget Calculator Full Screen */}
        <section className="bg-transparent">
          <BudgetCalculator />
        </section>

        {/* Quick Switch Footer Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#cac1ae]/60">
          <a
            href="#/valiz"
            className="flex items-center justify-between p-4 bg-[#fffcf3] border border-[#cac1ae] rounded-lg hover:border-[#145c64] hover:shadow-md transition-all group no-underline"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#145c64]/10 text-[#145c64] flex items-center justify-center shrink-0">
                <Backpack size={20} />
              </div>
              <div>
                <strong className="block font-serif text-sm sm:text-base text-[#1d211c] group-hover:text-[#145c64] transition-colors">
                  Valiz Teftişi Sekmesine Geç →
                </strong>
                <p className="text-xs text-[#68716c] font-sans">
                  Kişisel ve ortak bagaj listesini aç ve eşya ekle
                </p>
              </div>
            </div>
          </a>

          <a
            href="#/"
            className="flex items-center justify-between p-4 bg-[#fffcf3] border border-[#cac1ae] rounded-lg hover:border-[#145c64] hover:shadow-md transition-all group no-underline"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#b54b38]/10 text-[#b54b38] flex items-center justify-center shrink-0">
                <Compass size={20} />
              </div>
              <div>
                <strong className="block font-serif text-sm sm:text-base text-[#1d211c] group-hover:text-[#b54b38] transition-colors">
                  Tam Saha Rehberine Dön →
                </strong>
                <p className="text-xs text-[#68716c] font-sans">
                  9 günlük rota, harita, konaklama ve yemek rehberi
                </p>
              </div>
            </div>
          </a>
        </div>
      </main>
    </div>
  );
}
