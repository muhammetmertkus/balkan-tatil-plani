import { useEffect, useState, useRef } from "react";
import { masterChecklistTemplate } from "@/data";
import { 
  CheckSquare, 
  Square, 
  Plus, 
  RotateCcw, 
  Sparkles, 
  ShieldCheck, 
  CreditCard, 
  Shirt, 
  HeartPulse, 
  Zap, 
  Car, 
  Backpack, 
  Wifi, 
  WifiOff, 
  Trash2, 
  Users, 
  User
} from "lucide-react";
import confetti from "canvas-confetti";
import { db } from "@/lib/firebase";
import { doc, onSnapshot, setDoc } from "firebase/firestore";

type MemberKey = "mert" | "ikra" | "fatih" | "eyup";

interface MemberPackingState {
  mert: Record<string, boolean>;
  ikra: Record<string, boolean>;
  fatih: Record<string, boolean>;
  eyup: Record<string, boolean>;
}

interface CustomItem {
  id: string;
  category: string;
  categoryLabel: string;
  text: string;
  desc: string;
  addedBy?: string;
  isCommon?: boolean;
}

const memberProfiles: { id: MemberKey; name: string; title: string; badge: string; weapon: string }[] = [
  {
    id: "mert",
    name: "Mert Kuş",
    title: "Catan Şampiyonu & Profesyonel Bekâr",
    badge: "🏆 CATAN ŞAMPİYONU ⭐",
    weapon: "Tescilli Catan şampiyonluğu, EDC acil durum çantası (parasetamol ve adı havalı bir sürü ilaç) ayrıca kasma moruk.",
  },
  {
    id: "ikra",
    name: "İkra Gürdal",
    title: "Balkan Prensesi & Baş Planlayıcı",
    badge: "👑 PLAN A–Z",
    weapon: "4 farklı güneş gözlüğü, acil durum kombinleri ve VIP otel otopark/klima denetim cetveli.",
  },
  {
    id: "fatih",
    name: "Fatih Berat Gürdal",
    title: "CFO, IBAN Bakanı & Kasa",
    badge: "💶 IBAN / 4",
    weapon: "Excel yüklü telefon, 4 banka kartı, metal bozuk para kesesi ve Splitwise otomatik haciz mekanizması.",
  },
  {
    id: "eyup",
    name: "Eyüpcan Aldemir",
    title: "Kültür Bakanı & Her Şeye OK",
    badge: "🚀 HER ŞEYE OK",
    weapon: "Deri ceket, karizma siyah gül, araç hasar teftiş büyüteci ve her ortama anında uyum.",
  },
];

const FIRESTORE_DOC_PATH = { collection: "balkan_trip", id: "packing_state_v2" };

export function PackingChecklist() {
  const [activeMember, setActiveMember] = useState<MemberKey>("mert");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [syncStatus, setSyncStatus] = useState<"connecting" | "synced" | "offline">("connecting");

  // Load member packing states from localStorage fallback
  const [memberStates, setMemberStates] = useState<MemberPackingState>(() => {
    const defaultState: MemberPackingState = {
      mert: {},
      ikra: {},
      fatih: {},
      eyup: {},
    };
    try {
      const saved = localStorage.getItem("balkan_packing_per_member_2026");
      if (saved) {
        return { ...defaultState, ...JSON.parse(saved) };
      }
    } catch {
      // fallback
    }
    return defaultState;
  });

  // Custom user items added per member or common
  const [customItems, setCustomItems] = useState<Record<MemberKey, CustomItem[]>>(() => {
    try {
      const saved = localStorage.getItem("balkan_packing_custom_items_2026");
      if (saved) return JSON.parse(saved);
    } catch {}
    return { mert: [], ikra: [], fatih: [], eyup: [] };
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [newText, setNewText] = useState("");
  const [newCategory, setNewCategory] = useState<string>("custom");
  const [addScope, setAddScope] = useState<"individual" | "all">("individual");
  const isUpdatingFromFirebase = useRef(false);

  // Realtime Firestore Listener
  useEffect(() => {
    try {
      const docRef = doc(db, FIRESTORE_DOC_PATH.collection, FIRESTORE_DOC_PATH.id);
      const unsubscribe = onSnapshot(
        docRef,
        (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            isUpdatingFromFirebase.current = true;

            if (data.memberStates) {
              setMemberStates((prev) => ({
                ...prev,
                ...data.memberStates,
              }));
              try {
                localStorage.setItem("balkan_packing_per_member_2026", JSON.stringify(data.memberStates));
              } catch {}
            }

            if (data.customItems) {
              setCustomItems(data.customItems);
              try {
                localStorage.setItem("balkan_packing_custom_items_2026", JSON.stringify(data.customItems));
              } catch {}
            }

            setTimeout(() => {
              isUpdatingFromFirebase.current = false;
            }, 100);
            setSyncStatus("synced");
          } else {
            // First time initialization: write initial data to Firestore
            setDoc(docRef, {
              memberStates,
              customItems,
              createdAt: new Date().toISOString(),
              lastUpdated: new Date().toISOString(),
            }).catch((err) => console.error("Initial Firestore push error:", err));
            setSyncStatus("synced");
          }
        },
        (error) => {
          console.warn("Firestore sync error:", error);
          setSyncStatus("offline");
        }
      );

      return () => unsubscribe();
    } catch (e) {
      console.warn("Firestore setup error:", e);
      setSyncStatus("offline");
    }
  }, []);

  // Save changes helper to update both state, localStorage, and Firestore
  const persistChanges = async (
    newMemberStates: MemberPackingState,
    newCustomItems: Record<MemberKey, CustomItem[]>
  ) => {
    setMemberStates(newMemberStates);
    setCustomItems(newCustomItems);

    try {
      localStorage.setItem("balkan_packing_per_member_2026", JSON.stringify(newMemberStates));
      localStorage.setItem("balkan_packing_custom_items_2026", JSON.stringify(newCustomItems));
    } catch (e) {}

    try {
      const docRef = doc(db, FIRESTORE_DOC_PATH.collection, FIRESTORE_DOC_PATH.id);
      await setDoc(
        docRef,
        {
          memberStates: newMemberStates,
          customItems: newCustomItems,
          lastUpdated: new Date().toISOString(),
        },
        { merge: true }
      );
      setSyncStatus("synced");
    } catch (err) {
      console.error("Error saving to Firestore:", err);
      setSyncStatus("offline");
    }
  };

  // Toggle check for current active member
  const toggleCheck = (itemId: string) => {
    const currentMemberState = memberStates[activeMember] || {};
    const newChecked = !currentMemberState[itemId];
    const updatedMember = { ...currentMemberState, [itemId]: newChecked };
    const updatedAll = { ...memberStates, [activeMember]: updatedMember };

    // Calculate total checked for active member for celebration
    const allItems = [...masterChecklistTemplate, ...(customItems[activeMember] || [])];
    const doneCount = allItems.filter((item) => updatedMember[item.id]).length;

    if (doneCount === allItems.length && allItems.length > 0 && newChecked) {
      confetti({
        particleCount: 130,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#145C64", "#B54B38", "#D78255", "#E9E2D1"],
      });
    }

    persistChanges(updatedAll, customItems);
  };

  const handleResetMember = () => {
    const memberName = memberProfiles.find((m) => m.id === activeMember)?.name || activeMember;
    if (window.confirm(`${memberName} için tüm valiz onaylarını sıfırlamak istiyor musunuz?`)) {
      const updatedAll = {
        ...memberStates,
        [activeMember]: {},
      };
      persistChanges(updatedAll, customItems);
    }
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) return;

    const categoryLabels: Record<string, string> = {
      docs: "🛂 Evraklar & Rezervasyon",
      money: "💶 Para & Kartlar",
      clothing: "🎒 Giyim & Plaj",
      health: "🩹 Sağlık & Koruma",
      electronics: "🔌 Elektronik & Şarj",
      custom: "🚗 Yol & Araç İçi",
    };

    const newItemId = `custom_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const currentMemberName = memberProfiles.find((m) => m.id === activeMember)?.name || activeMember;

    const newItem: CustomItem = {
      id: newItemId,
      category: newCategory,
      categoryLabel: categoryLabels[newCategory] || "Ekstra Ekipman",
      text: newText.trim(),
      desc: addScope === "all" ? `Ortak Ekip Maddesi (Ekleyen: ${currentMemberName})` : `${currentMemberName} tarafından eklendi.`,
      addedBy: currentMemberName,
      isCommon: addScope === "all",
    };

    let updatedCustom: Record<MemberKey, CustomItem[]>;

    if (addScope === "all") {
      // Add to all 4 members
      updatedCustom = {
        mert: [newItem, ...(customItems.mert || [])],
        ikra: [newItem, ...(customItems.ikra || [])],
        fatih: [newItem, ...(customItems.fatih || [])],
        eyup: [newItem, ...(customItems.eyup || [])],
      };
    } else {
      // Add only to active member
      updatedCustom = {
        ...customItems,
        [activeMember]: [newItem, ...(customItems[activeMember] || [])],
      };
    }

    persistChanges(memberStates, updatedCustom);
    setNewText("");
    setShowAddModal(false);
  };

  const handleDeleteCustomItem = (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm("Bu özel maddeyi silmek istediğinize emin misiniz?")) return;

    const updatedCustom: Record<MemberKey, CustomItem[]> = {
      mert: (customItems.mert || []).filter((i) => i.id !== itemId),
      ikra: (customItems.ikra || []).filter((i) => i.id !== itemId),
      fatih: (customItems.fatih || []).filter((i) => i.id !== itemId),
      eyup: (customItems.eyup || []).filter((i) => i.id !== itemId),
    };

    // Also clean up checks
    const updatedMemberStates: MemberPackingState = {
      mert: { ...memberStates.mert },
      ikra: { ...memberStates.ikra },
      fatih: { ...memberStates.fatih },
      eyup: { ...memberStates.eyup },
    };
    delete updatedMemberStates.mert[itemId];
    delete updatedMemberStates.ikra[itemId];
    delete updatedMemberStates.fatih[itemId];
    delete updatedMemberStates.eyup[itemId];

    persistChanges(updatedMemberStates, updatedCustom);
  };

  const currentProfile = memberProfiles.find((m) => m.id === activeMember) || memberProfiles[0];
  const currentMemberChecks = memberStates[activeMember] || {};
  const currentMemberAllItems = [...masterChecklistTemplate, ...(customItems[activeMember] || [])];

  // Category Filter
  const filteredList = currentMemberAllItems.filter((item) => {
    if (activeCategory === "all") return true;
    return item.category === activeCategory;
  });

  const totalItemsCount = currentMemberAllItems.length;
  const completedItemsCount = currentMemberAllItems.filter((item) => currentMemberChecks[item.id]).length;
  const percentCompleted = totalItemsCount > 0 ? Math.round((completedItemsCount / totalItemsCount) * 100) : 0;

  const categories = [
    { id: "all", label: "Tüm Valiz", icon: Backpack },
    { id: "docs", label: "Evraklar", icon: ShieldCheck },
    { id: "money", label: "Para & Kart", icon: CreditCard },
    { id: "clothing", label: "Giyim & Plaj", icon: Shirt },
    { id: "health", label: "Sağlık", icon: HeartPulse },
    { id: "electronics", label: "Elektronik", icon: Zap },
    { id: "custom", label: "Yol & Araç", icon: Car },
  ];

  // Group filtered items by category
  const groupedByCategory: { category: string; categoryLabel: string; items: typeof filteredList }[] = [];
  filteredList.forEach((item) => {
    const lastGroup = groupedByCategory[groupedByCategory.length - 1];
    if (lastGroup && lastGroup.category === item.category) {
      lastGroup.items.push(item);
    } else {
      groupedByCategory.push({ category: item.category, categoryLabel: item.categoryLabel, items: [item] });
    }
  });

  return (
    <div className="packing-dossier relative rounded-none border-2 border-[#1d211c] bg-[#fffcf3] p-4 sm:p-6 md:p-8 shadow-[8px_10px_0_rgba(29,33,28,0.18)]">
      {/* Top Header */}
      <div className="flex flex-col gap-4 border-b-2 border-[#1d211c] pb-5 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            <span className="flex items-center gap-1.5 uppercase tracking-widest text-[#145c64]">
              <Sparkles size={15} />
              Kişisel & Ortak Valiz Teftişi
            </span>

            {/* Cloud Sync Status Pill */}
            <div className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold transition-all ${
              syncStatus === "synced" 
                ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                : syncStatus === "connecting"
                ? "bg-amber-100 text-amber-800 border border-amber-300 animate-pulse"
                : "bg-stone-200 text-stone-700 border border-stone-300"
            }`}>
              {syncStatus === "synced" ? (
                <>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <Wifi size={12} />
                  <span>Canlı Senkronize</span>
                </>
              ) : syncStatus === "connecting" ? (
                <>
                  <Wifi size={12} className="animate-spin" />
                  <span>Buluta Bağlanıyor...</span>
                </>
              ) : (
                <>
                  <WifiOff size={12} />
                  <span>Yerel Mod (Offline)</span>
                </>
              )}
            </div>
          </div>

          <h3 className="mt-1 font-display text-2xl sm:text-3xl md:text-4xl text-[#1d211c]">
            Hazırlık & <em>Valiz Dosyası</em>
          </h3>
          <p className="mt-1 max-w-2xl font-serif text-xs sm:text-sm text-[#49534f]">
            Tüm ekip üyeleri anlık olarak canlı senkronizedir. Eklenen yeni maddeler veya işaretlenen onaylar anında tüm telefonlarda güncellenir.
          </p>
        </div>

        {/* Active Member Progress Gauge */}
        <div className="flex flex-col items-end rounded border border-[#cac1ae] bg-[#f5f0e5] p-3 sm:p-4 min-w-[200px]">
          <div className="flex w-full items-baseline justify-between gap-3 font-mono">
            <span className="text-xs font-bold text-[#145c64] uppercase">{currentProfile.name} VALİZİ</span>
            <span className="text-base sm:text-lg font-bold text-[#b54b38]">%{percentCompleted}</span>
          </div>
          <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-[#ded5c2]">
            <div
              className="h-full bg-[#145c64] transition-all duration-300 ease-out"
              style={{ width: `${percentCompleted}%` }}
            />
          </div>
          <span className="mt-1.5 font-mono text-[11px] text-[#49534f]">
            <b>{completedItemsCount}</b> / {totalItemsCount} madde hazır
          </span>
        </div>
      </div>

      {/* 4 Member Tabs */}
      <div className="mt-6">
        <span className="block font-mono text-xs font-bold uppercase tracking-wider text-[#38413c]">
          Kişisel Valiz Sahibi Seçin:
        </span>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {memberProfiles.map((profile) => {
            const isSelected = activeMember === profile.id;
            const profileChecks = memberStates[profile.id] || {};
            const pTotal = masterChecklistTemplate.length + (customItems[profile.id]?.length || 0);
            const pDone = masterChecklistTemplate.filter((i) => profileChecks[i.id]).length + (customItems[profile.id]?.filter((i) => profileChecks[i.id]).length || 0);
            const pPct = pTotal > 0 ? Math.round((pDone / pTotal) * 100) : 0;

            return (
              <button
                key={profile.id}
                onClick={() => setActiveMember(profile.id)}
                className={`cursor-pointer rounded border p-3 text-left transition-all ${
                  isSelected
                    ? "border-[#145c64] bg-[#145c64] text-white shadow-[3px_4px_0_#b54b38]"
                    : "border-[#cac1ae] bg-[#f5f0e5] text-[#1d211c] hover:bg-[#e9e2d1]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg">{profile.name}</span>
                  <span className={`rounded px-1.5 py-0.5 font-mono text-[10px] font-bold ${isSelected ? "bg-white text-[#145c64]" : "bg-[#ded5c2] text-[#29312e]"}`}>
                    %{pPct}
                  </span>
                </div>
                <div className={`mt-0.5 font-mono text-[10px] truncate ${isSelected ? "text-[#f3bc86]" : "text-[#b54b38]"}`}>
                  {profile.badge}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Member Secret Weapon Banner */}
      <div className="mt-4 flex items-start gap-2.5 rounded border border-[#145c64]/30 bg-[#f0f6f4] p-3 text-xs">
        <Sparkles size={16} className="text-[#145c64] shrink-0 mt-0.5" />
        <div>
          <strong className="font-mono text-[11px] uppercase text-[#145c64]">
            {currentProfile.name}'in Bagajdaki Gizli Silahı & Özel Notu:
          </strong>
          <p className="mt-0.5 font-serif text-[#29312e]">{currentProfile.weapon}</p>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="mt-5 flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-[#29312e]/10 pt-1 no-scrollbar sm:flex-wrap">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = activeCategory === cat.id;
          const catItems = currentMemberAllItems.filter((i) => (cat.id === "all" ? true : i.category === cat.id));
          const catDone = catItems.filter((i) => currentMemberChecks[i.id]).length;

          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex shrink-0 cursor-pointer items-center gap-1.5 rounded-sm border px-3 py-1.5 font-mono text-xs transition-all ${
                isSelected
                  ? "border-[#b54b38] bg-[#b54b38] text-white font-semibold shadow-[2px_2px_0_#145c64]"
                  : "border-[#cac1ae] bg-[#fffdf5] text-[#38413c] hover:bg-[#f5f0e5]"
              }`}
            >
              <Icon size={13} />
              <span>{cat.label}</span>
              <span className={`ml-0.5 rounded px-1.5 py-0.2 text-[10px] ${isSelected ? "bg-black/20 text-white" : "bg-[#e9e2d1] text-[#29312e]"}`}>
                {catDone}/{catItems.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Checklist Items Grid */}
      <div className="mt-5 space-y-6">
        {groupedByCategory.map((group) => (
          <div key={`${group.category}-${group.items[0]?.id}`}>
            {activeCategory === "all" && (
              <div className="mb-2.5 flex items-center gap-2 border-b border-[#29312e]/15 pb-1.5">
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#145c64]">
                  {group.categoryLabel}
                </h4>
                <span className="font-mono text-[10px] text-[#8e9893]">
                  ({group.items.filter((i) => currentMemberChecks[i.id]).length}/{group.items.length})
                </span>
              </div>
            )}
            <div className="grid gap-2.5 sm:grid-cols-2">
              {group.items.map((item) => {
                const isChecked = !!currentMemberChecks[item.id];
                const isCustom = item.id.startsWith("custom_");

                return (
                  <div
                    key={item.id}
                    onClick={() => toggleCheck(item.id)}
                    className={`group relative flex cursor-pointer items-start gap-3 rounded border p-3 transition-all ${
                      isChecked
                        ? "border-[#145c64]/30 bg-[#f0f6f4] opacity-80"
                        : "border-[#cac1ae] bg-white hover:border-[#145c64] hover:shadow-[3px_3px_0_rgba(20,92,100,0.15)]"
                    }`}
                  >
                    <button
                      type="button"
                      className="mt-0.5 text-[#145c64] transition-transform group-hover:scale-110"
                      aria-label={isChecked ? "İşareti kaldır" : "Valize ekle"}
                    >
                      {isChecked ? <CheckSquare size={20} className="text-[#145c64]" /> : <Square size={20} className="text-[#8e9893]" />}
                    </button>

                    <div className="flex-1 pr-6">
                      <div className="flex flex-wrap items-center justify-between gap-1">
                        <span
                          className={`font-serif text-sm font-semibold leading-tight ${
                            isChecked ? "text-[#5b6560] line-through" : "text-[#1d211c]"
                          }`}
                        >
                          {item.text}
                        </span>
                        {activeCategory !== "all" && (
                          <span className="rounded bg-[#ded5c2] px-1.5 py-0.5 font-mono text-[9px] font-bold text-[#29312e]">
                            {item.categoryLabel.split(" ")[0]}
                          </span>
                        )}
                      </div>

                      {item.desc && (
                        <p className="mt-1 font-serif text-xs leading-normal text-[#68716c]">
                          {item.desc}
                        </p>
                      )}
                    </div>

                    {/* Custom item delete button */}
                    {isCustom && (
                      <button
                        type="button"
                        onClick={(e) => handleDeleteCustomItem(item.id, e)}
                        title="Bu maddeyi sil"
                        className="absolute right-2 top-2 rounded p-1 text-[#8e9893] opacity-0 transition-opacity hover:bg-rose-50 hover:text-rose-600 group-hover:opacity-100"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {filteredList.length === 0 && (
        <div className="my-8 text-center font-mono text-sm text-[#68716c]">
          Bu kategoride madde bulunamadı.
        </div>
      )}

      {/* Bottom Actions */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-[#29312e]/15 pt-5">
        <button
          onClick={() => setShowAddModal(true)}
          className="flex cursor-pointer items-center gap-1.5 rounded-sm bg-[#145c64] px-4 py-2 font-mono text-xs font-semibold text-white shadow-[3px_3px_0_#b54b38] transition-transform hover:translate-x-0.5 hover:translate-y-0.5 active:scale-95"
        >
          <Plus size={15} />
          <span>Yeni Valiz / Ekipman Maddesi Ekle</span>
        </button>

        <button
          onClick={handleResetMember}
          className="flex cursor-pointer items-center gap-1 font-mono text-xs text-[#b54b38] underline hover:text-[#8e3322]"
        >
          <RotateCcw size={13} />
          <span>{currentProfile.name} İçin Tüm Onayları Sıfırla</span>
        </button>
      </div>

      {/* Add Custom Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md border-2 border-[#1d211c] bg-[#fffcf3] p-6 shadow-[10px_12px_0_rgba(29,33,28,0.3)]">
            <h4 className="font-display text-2xl text-[#1d211c]">
              Yeni Valiz Maddesi Ekle
            </h4>
            <p className="mt-1 font-serif text-xs text-[#68716c]">
              Eklenen bu madde anında Firebase Firestore üzerinden canlı olarak senkronize edilir.
            </p>

            <form onSubmit={handleAddCustom} className="mt-4 space-y-3.5 font-mono text-xs">
              <div>
                <label className="block font-semibold text-[#29312e]">Kime Eklenecek?</label>
                <div className="mt-1 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setAddScope("individual")}
                    className={`flex items-center justify-center gap-1.5 rounded border p-2 text-xs font-bold transition-all ${
                      addScope === "individual"
                        ? "border-[#145c64] bg-[#145c64] text-white"
                        : "border-[#cac1ae] bg-white text-[#29312e]"
                    }`}
                  >
                    <User size={14} />
                    <span>Yalnızca {currentProfile.name}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setAddScope("all")}
                    className={`flex items-center justify-center gap-1.5 rounded border p-2 text-xs font-bold transition-all ${
                      addScope === "all"
                        ? "border-[#b54b38] bg-[#b54b38] text-white"
                        : "border-[#cac1ae] bg-white text-[#29312e]"
                    }`}
                  >
                    <Users size={14} />
                    <span>Tüm Ekibe (Ortak)</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#29312e]">Eşya / Görev Adı</label>
                <input
                  type="text"
                  required
                  placeholder="Örn: Ekstra dalış maskesi, özel vitaminler..."
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  className="mt-1 w-full border border-[#cac1ae] bg-white p-2 text-sm text-[#1d211c] focus:border-[#145c64] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#29312e]">Kategori</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="mt-1 w-full border border-[#cac1ae] bg-white p-2 text-xs"
                >
                  <option value="docs">🛂 Evraklar & Rezervasyon</option>
                  <option value="money">💶 Para & Kartlar</option>
                  <option value="clothing">🎒 Giyim & Plaj</option>
                  <option value="health">🩹 Sağlık & Koruma</option>
                  <option value="electronics">🔌 Elektronik & Şarj</option>
                  <option value="custom">🚗 Yol & Araç İçi</option>
                </select>
              </div>

              <div className="mt-5 flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="cursor-pointer border border-[#cac1ae] bg-[#e9e2d1] px-3 py-1.5 font-mono text-xs text-[#29312e]"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="cursor-pointer bg-[#145c64] px-4 py-1.5 font-mono text-xs font-semibold text-white shadow-[2px_2px_0_#b54b38]"
                >
                  Valize Ekle & Eşitle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
