import { useEffect } from "react";
import { AppNavbar } from "@/components/AppNavbar";
import { BudgetCalculator } from "@/components/BudgetCalculator";
import { Banknote, Compass, Backpack } from "lucide-react";

export default function KasaPage() {
  useEffect(() => {
    document.title = "Harcama Modeli & Kasa | Balkan Yol Ekibi";
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className="paper-site atlas-site min-h-screen flex flex-col bg-[#f5f0e5] text-[#1d211c]">
      <AppNavbar activeTab="kasa" />

      <main className="flex-1 w-full max-w-7xl mx-auto px-2 sm:px-6 py-3 sm:py-6 space-y-6">
        {/* Budget Calculator Directly */}
        <section className="w-full">
          <BudgetCalculator />
        </section>

        {/* Quick Switch Footer Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 pb-8 border-t border-[#cac1ae]/60">
          <a
            href="#/valiz"
            className="flex items-center justify-between p-3.5 bg-[#fffcf3] border border-[#cac1ae] rounded-lg hover:border-[#145c64] hover:shadow-md transition-all group no-underline"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#145c64]/10 text-[#145c64] flex items-center justify-center shrink-0">
                <Backpack size={18} />
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
            className="flex items-center justify-between p-3.5 bg-[#fffcf3] border border-[#cac1ae] rounded-lg hover:border-[#b54b38] hover:shadow-md transition-all group no-underline"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#b54b38]/10 text-[#b54b38] flex items-center justify-center shrink-0">
                <Compass size={18} />
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
