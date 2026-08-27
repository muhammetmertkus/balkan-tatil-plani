import { useState } from "react";
import { assets } from "@/data";
import { 
  Banknote, 
  Backpack, 
  Compass, 
  Star, 
  Check, 
  Menu,
  X,
  ArrowLeft
} from "lucide-react";
import { toast } from "sonner";

interface AppNavbarProps {
  activeTab: "home" | "kasa" | "valiz";
}

export function AppNavbar({ activeTab }: AppNavbarProps) {
  const [copied, setCopied] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleCopyBookmark = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      toast.success("Bağlantı kopyalandı! Tarayıcınızda yıldızlayabilir / yer imlerine ekleyebilirsiniz.", {
        description: url,
        duration: 3500,
      });
      setTimeout(() => setCopied(false), 3000);
    }).catch(() => {
      toast.info("Bağlantı: " + url);
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#fffcf3]/98 backdrop-blur-md border-b border-[#cac1ae] shadow-xs">
      <div className="mx-auto max-w-7xl flex items-center justify-between gap-2 px-3 sm:px-6 h-14 sm:h-16">
        {/* Brand & Active Pill */}
        <div className="flex items-center gap-2">
          {activeTab !== "home" && (
            <a
              href="#/"
              className="flex items-center justify-center w-8 h-8 rounded border border-[#cac1ae] bg-[#ede6d6] text-[#145c64] hover:bg-[#145c64] hover:text-white transition-colors"
              title="Tam Saha Rehberine Dön"
            >
              <ArrowLeft size={16} />
            </a>
          )}

          <a
            href="#/"
            className="flex items-center gap-2 no-underline group"
            aria-label="Ana sayfaya dön"
          >
            <img 
              src={assets.logo} 
              alt="Balkan Macerası Logo" 
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#cac1ae] group-hover:scale-105 transition-transform" 
            />
            <div className="flex flex-col text-left">
              <span className="font-serif text-sm sm:text-base font-bold text-[#1d211c] group-hover:text-[#145c64] transition-colors leading-tight">
                Balkan Macerası
              </span>
              <span className="font-mono text-[9px] sm:text-[10px] text-[#68716c] uppercase tracking-wider font-semibold">
                {activeTab === "kasa" && "💳 Harcama & Kasa"}
                {activeTab === "valiz" && "🧳 Valiz Teftişi"}
                {activeTab === "home" && "BALKAN YOL EKİBİ"}
              </span>
            </div>
          </a>
        </div>

        {/* Desktop Primary Switcher Tabs */}
        <nav className="hidden md:flex items-center gap-1.5 p-1 bg-[#ede6d6] rounded-lg border border-[#cac1ae]/70 shadow-inner">
          <a
            href="#/"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-mono text-xs font-bold transition-all no-underline ${
              activeTab === "home"
                ? "bg-[#145c64] text-white shadow-xs"
                : "text-[#38413c] hover:bg-[#dfd7c4] hover:text-[#145c64]"
            }`}
          >
            <Compass size={14} />
            <span>Saha Rehberi</span>
          </a>

          <a
            href="#/kasa"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-mono text-xs font-bold transition-all no-underline ${
              activeTab === "kasa"
                ? "bg-[#145c64] text-white shadow-xs"
                : "text-[#38413c] hover:bg-[#dfd7c4] hover:text-[#145c64]"
            }`}
          >
            <Banknote size={14} />
            <span>Harcama & Kasa</span>
            <span className="text-[9px] px-1 py-0.2 bg-[#b54b38] text-white rounded font-sans uppercase">Hızlı</span>
          </a>

          <a
            href="#/valiz"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-mono text-xs font-bold transition-all no-underline ${
              activeTab === "valiz"
                ? "bg-[#145c64] text-white shadow-xs"
                : "text-[#38413c] hover:bg-[#dfd7c4] hover:text-[#145c64]"
            }`}
          >
            <Backpack size={14} />
            <span>Valiz Teftişi</span>
            <span className="text-[9px] px-1 py-0.2 bg-[#38413c] text-white rounded font-sans uppercase">Canlı</span>
          </a>
        </nav>

        {/* Right action buttons: Star/Bookmark + Mobile menu button */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={handleCopyBookmark}
            title="Bu sekmenin doğrudan bağlantısını kopyala & yıldızla"
            className="flex items-center gap-1 px-2 sm:px-3 py-1.5 text-xs font-mono font-bold bg-[#fff8e7] text-[#975a16] hover:bg-[#fef3c7] hover:text-[#78350f] border border-[#f59e0b]/40 rounded shadow-2xs transition-all active:scale-95 cursor-pointer"
          >
            {copied ? (
              <>
                <Check size={13} className="text-green-600" />
                <span className="text-[11px] sm:text-xs">Kopyalandı!</span>
              </>
            ) : (
              <>
                <Star size={13} className="text-amber-500 fill-amber-400" />
                <span className="text-[11px] sm:text-xs">Yıldızla</span>
              </>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden flex items-center justify-center w-8 h-8 text-[#29312e] bg-[#ede6d6] hover:bg-[#dfd7c4] rounded border border-[#cac1ae] cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menüyü aç/kapat"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu (Full Width & Clean) */}
      {mobileMenuOpen && (
        <div className="md:hidden w-full border-t border-[#cac1ae] bg-[#fffcf3] p-3 shadow-lg flex flex-col gap-2 animate-in slide-in-from-top-2 duration-150">
          <div className="flex items-center justify-between px-1">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[#68716c] font-bold">
              Sekme Değiştir:
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs text-[#68716c] hover:text-black font-mono font-semibold"
            >
              Kapat ✕
            </button>
          </div>

          <div className="grid grid-cols-1 gap-2">
            <a
              href="#/"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between p-3 rounded-lg font-mono text-xs font-bold border no-underline transition-colors ${
                activeTab === "home"
                  ? "bg-[#145c64] text-white border-[#145c64] shadow-xs"
                  : "bg-[#f5f0e5] text-[#29312e] border-[#cac1ae] hover:bg-[#ede6d6]"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Compass size={18} />
                <span>🗺️ Tam Saha Rehberi (Rota & Harita)</span>
              </div>
            </a>

            <a
              href="#/kasa"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between p-3 rounded-lg font-mono text-xs font-bold border no-underline transition-colors ${
                activeTab === "kasa"
                  ? "bg-[#145c64] text-white border-[#145c64] shadow-xs"
                  : "bg-[#f5f0e5] text-[#29312e] border-[#cac1ae] hover:bg-[#ede6d6]"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Banknote size={18} />
                <span>💳 Harcama Modeli & Kasa</span>
              </div>
              <span className="text-[10px] bg-[#b54b38] text-white px-2 py-0.5 rounded font-sans uppercase font-semibold">
                Direkt Kasa
              </span>
            </a>

            <a
              href="#/valiz"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between p-3 rounded-lg font-mono text-xs font-bold border no-underline transition-colors ${
                activeTab === "valiz"
                  ? "bg-[#145c64] text-white border-[#145c64] shadow-xs"
                  : "bg-[#f5f0e5] text-[#29312e] border-[#cac1ae] hover:bg-[#ede6d6]"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Backpack size={18} />
                <span>🧳 Kişisel & Ortak Valiz Teftişi</span>
              </div>
              <span className="text-[10px] bg-[#38413c] text-white px-2 py-0.5 rounded font-sans uppercase font-semibold">
                Direkt Valiz
              </span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
