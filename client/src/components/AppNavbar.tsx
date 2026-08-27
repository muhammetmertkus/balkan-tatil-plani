import { useState } from "react";
import { assets } from "@/data";
import { 
  Banknote, 
  Backpack, 
  Compass, 
  Star, 
  Check, 
  Copy, 
  ExternalLink,
  Menu,
  X,
  Sparkles
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
    <header className="topbar sticky top-0 z-50 bg-[#fffcf3]/95 backdrop-blur-md border-b border-[#cac1ae] shadow-xs">
      <div className="mx-auto max-w-7xl flex items-center justify-between gap-2 px-3 sm:px-6 py-2.5">
        {/* Brand */}
        <a
          href="#/"
          className="brand flex items-center gap-2.5 no-underline cursor-pointer group"
          aria-label="Ana sayfaya dön"
        >
          <img 
            src={assets.logo} 
            alt="Balkan Macerası Logo" 
            className="w-8 h-8 rounded-full border border-[#cac1ae] shadow-2xs group-hover:scale-105 transition-transform" 
          />
          <span className="brand-text flex flex-col text-left">
            <b className="font-serif text-sm sm:text-base text-[#1d211c] tracking-tight group-hover:text-[#145c64] transition-colors leading-tight">
              Balkan Macerası
            </b>
            <small className="font-mono text-[9px] sm:text-[10px] text-[#68716c] uppercase tracking-wider">
              {activeTab === "kasa" && "💳 Harcama & Kasa Sekmesi"}
              {activeTab === "valiz" && "🧳 Valiz Teftişi Sekmesi"}
              {activeTab === "home" && "BALKAN YOL EKİBİ · 2026"}
            </small>
          </span>
        </a>

        {/* Desktop Primary Switcher Tabs */}
        <nav className="hidden md:flex items-center gap-1.5 p-1 bg-[#ede6d6] rounded-lg border border-[#cac1ae]/70 shadow-inner">
          <a
            href="#/"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-mono text-xs font-bold transition-all ${
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
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-mono text-xs font-bold transition-all ${
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
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-mono text-xs font-bold transition-all ${
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

        {/* Right action buttons: Star/Bookmark + Mobile toggle */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={handleCopyBookmark}
            title="Bu sekmenin doğrudan bağlantısını kopyala & yıldızla"
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-mono font-bold bg-[#fff8e7] text-[#975a16] hover:bg-[#fef3c7] hover:text-[#78350f] border border-[#f59e0b]/40 rounded shadow-2xs transition-all active:scale-95 cursor-pointer"
          >
            {copied ? (
              <>
                <Check size={13} className="text-green-600" />
                <span className="hidden sm:inline">Kopyalandı!</span>
              </>
            ) : (
              <>
                <Star size={13} className="text-amber-500 fill-amber-400" />
                <span className="hidden sm:inline">Sekmeyi Yıldızla</span>
                <span className="sm:hidden">Yıldızla</span>
              </>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-1.5 text-[#29312e] hover:bg-[#ede6d6] rounded border border-[#cac1ae]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menüyü aç"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#cac1ae] bg-[#fffcf3] p-3 shadow-lg flex flex-col gap-2 animate-in slide-in-from-top-2 duration-200">
          <p className="font-mono text-[10px] uppercase tracking-wider text-[#68716c] px-1 font-bold">
            Hızlı Sekme Geçişi:
          </p>
          <div className="grid grid-cols-1 gap-1.5">
            <a
              href="#/"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between p-2.5 rounded font-mono text-xs font-bold border ${
                activeTab === "home"
                  ? "bg-[#145c64] text-white border-[#145c64]"
                  : "bg-[#f5f0e5] text-[#29312e] border-[#cac1ae]"
              }`}
            >
              <div className="flex items-center gap-2">
                <Compass size={16} />
                <span>🗺️ Tam Saha Rehberi (9 Gün & Harita)</span>
              </div>
            </a>

            <a
              href="#/kasa"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between p-2.5 rounded font-mono text-xs font-bold border ${
                activeTab === "kasa"
                  ? "bg-[#145c64] text-white border-[#145c64]"
                  : "bg-[#f5f0e5] text-[#29312e] border-[#cac1ae]"
              }`}
            >
              <div className="flex items-center gap-2">
                <Banknote size={16} />
                <span>💳 Harcama Modeli & Kasa (Hızlı Ekleme)</span>
              </div>
              <span className="text-[10px] bg-[#b54b38] text-white px-1.5 py-0.5 rounded font-sans">
                Direkt Kasa
              </span>
            </a>

            <a
              href="#/valiz"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center justify-between p-2.5 rounded font-mono text-xs font-bold border ${
                activeTab === "valiz"
                  ? "bg-[#145c64] text-white border-[#145c64]"
                  : "bg-[#f5f0e5] text-[#29312e] border-[#cac1ae]"
              }`}
            >
              <div className="flex items-center gap-2">
                <Backpack size={16} />
                <span>🧳 Kişisel & Ortak Valiz Teftişi</span>
              </div>
              <span className="text-[10px] bg-[#38413c] text-white px-1.5 py-0.5 rounded font-sans">
                Direkt Valiz
              </span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
