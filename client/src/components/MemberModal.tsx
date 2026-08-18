import { useEffect } from "react";
import { TeamMember } from "@/data";
import { X, ShieldAlert, Briefcase, Award, Sparkles, CheckCircle2, AlertOctagon } from "lucide-react";

interface MemberModalProps {
  member: TeamMember | null;
  onClose: () => void;
}

export function MemberModal({ member, onClose }: MemberModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!member) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-3 sm:p-4 backdrop-blur-xs overflow-y-auto animate-fade-in"
      role="presentation"
      onClick={onClose}
    >
      <article
        className="relative my-auto w-full max-w-3xl rounded-none border-2 border-[#1d211c] bg-[#fffcf3] p-4 sm:p-6 md:p-8 shadow-[8px_10px_0_rgba(29,33,28,0.35)] max-h-[92vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-label={`${member.name} Resmi Sicil Dosyası`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Close Button */}
        <button
          onClick={onClose}
          className="sticky float-right -mt-2 -mr-2 z-20 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#29312e] bg-[#f5f0e5] text-[#1d211c] shadow-md transition-transform hover:scale-110 active:scale-95"
          aria-label="Dosyayı kapat"
        >
          <X size={20} />
        </button>

        {/* Top Header / Dossier Stamp */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-[#1d211c] pb-3 pr-8">
          <div>
            <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#145c64]">
              BALKAN YOL EKİBİ · SİCİL VE OPERASYON RAPORU
            </span>
            <div className="font-mono text-xs text-[#68716c]">
              KOD: <strong className="text-[#b54b38]">{member.code}</strong>
            </div>
          </div>

          <span className="rounded bg-[#145c64] px-2.5 py-0.5 font-mono text-[11px] font-bold text-white shadow-[2px_2px_0_#b54b38]">
            {member.badge}
          </span>
        </div>

        {/* Main Content Grid */}
        <div className="mt-6 grid gap-6 md:grid-cols-12">
          {/* Photo & Fast Stats (4 cols) */}
          <div className="space-y-4 md:col-span-4">
            <div className="relative mx-auto max-w-[260px] bg-white p-3 shadow-[6px_8px_0_rgba(29,33,28,0.18)]">
              <div className="aspect-[4/5] overflow-hidden bg-[#e9e2d1]">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="mt-2 text-center font-mono text-[11px] uppercase tracking-wider text-[#49534f]">
                {member.name} · 2026
              </div>
            </div>

            {/* Luggage Secret Weapon Card */}
            <div className="rounded border border-[#cac1ae] bg-[#f5f0e5] p-3 text-xs">
              <span className="flex items-center gap-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#145c64]">
                <Sparkles size={12} /> BAGAJDAKİ GİZLİ SİLAH
              </span>
              <p className="mt-1 font-serif text-[12px] text-[#1d211c]">
                {member.secretWeapon}
              </p>
            </div>
          </div>

          {/* Dossier Body (8 cols) */}
          <div className="space-y-5 md:col-span-8">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#b54b38]">
                {member.role}
              </span>
              <h2 className="font-display text-3xl font-normal text-[#1d211c] md:text-4xl">
                {member.name}
              </h2>
              <p className="font-mono text-sm font-semibold text-[#145c64]">
                {member.title}
              </p>
            </div>

            {/* Member Quote */}
            <blockquote className="border-l-4 border-[#b54b38] bg-[#fff8f5] py-2.5 pl-4 pr-3 font-serif text-base italic text-[#29312e]">
              {member.quote}
            </blockquote>

            {/* Character Analysis */}
            <div>
              <h4 className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase text-[#29312e]">
                <Briefcase size={14} className="text-[#145c64]" /> Karakter Dosyası & Saha Analizi
              </h4>
              <p className="mt-1.5 font-serif text-sm leading-relaxed text-[#38413c]">
                {member.detail}
              </p>
            </div>

            {/* Operational Duties */}
            <div>
              <h4 className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase text-[#29312e]">
                <CheckCircle2 size={14} className="text-[#145c64]" /> Sahadaki Operasyonel Görevler
              </h4>
              <ul className="mt-2 space-y-1.5 font-serif text-xs leading-relaxed text-[#29312e]">
                {member.duties.map((duty, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="font-mono text-[#b54b38]">✦</span>
                    <span>{duty}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Critical Weakness / Alarm Box */}
            <div className="rounded border border-[#b54b38]/40 bg-[#fff5f2] p-3.5">
              <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-[#b54b38]">
                <AlertOctagon size={15} />
                <span>KRİTİK ZAYIF NOKTA / ALARM DURUMU</span>
              </div>
              <p className="mt-1 font-serif text-xs text-[#521b10]">
                {member.weakness}
              </p>
            </div>

            {/* Official Badges */}
            <div>
              <span className="block font-mono text-[11px] font-bold uppercase tracking-wider text-[#68716c]">
                Resmî Rütbeler & Kadro Nişanları
              </span>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {member.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded border border-[#145c64]/30 bg-[#f0f6f4] px-2.5 py-1 font-mono text-xs font-medium text-[#145c64]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
