import { useState, useEffect, useRef, useMemo } from "react";
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
  PieChart,
  Plus,
  Trash2,
  Users,
  UserCheck,
  ArrowRightLeft,
  DollarSign,
  Euro,
  Coins,
  Wallet,
  Wifi,
  WifiOff,
  Code2,
  Copy,
  Check,
  Download,
  Upload,
  FileEdit,
  AlertCircle,
  TrendingUp,
  ArrowDownRight,
  ArrowUpRight
} from "lucide-react";
import { db } from "@/lib/firebase";
import { doc, onSnapshot, setDoc } from "firebase/firestore";

type MemberKey = "mert" | "ikra" | "fatih" | "eyup";
type CurrencyKey = "TRY" | "EUR" | "USD" | "ALL" | "MKD";

interface MemberProfile {
  id: MemberKey;
  name: string;
  badge: string;
  avatarColor: string;
}

const MEMBERS: MemberProfile[] = [
  { id: "mert", name: "Mert Kuş", badge: "🏆 Catan Şampiyonu", avatarColor: "#145c64" },
  { id: "ikra", name: "İkra Gürdal", badge: "👑 Balkan Prensesi", avatarColor: "#b54b38" },
  { id: "fatih", name: "Fatih Berat Gürdal", badge: "💶 CFO & Kasa", avatarColor: "#d78255" },
  { id: "eyup", name: "Eyüpcan Aldemir", badge: "🚀 Kültür Bakanı", avatarColor: "#38413c" },
];

// FX Rates (Base: 1 EUR)
const FX_RATES: Record<CurrencyKey, number> = {
  EUR: 1,
  USD: 1.08,
  TRY: 38.50,
  MKD: 61.50,
  ALL: 100.20,
};

const CURRENCY_SYMBOLS: Record<CurrencyKey, string> = {
  TRY: "₺",
  EUR: "€",
  USD: "$",
  ALL: "ALL",
  MKD: "MKD",
};

interface PredefinedExpenseItem {
  id: string;
  label: string;
  category: "flight" | "insurance" | "tax" | "stay";
  amountTry: number;
  isPaid: boolean;
  paidBy?: MemberKey;
  note?: string;
  date?: string;
}

interface CustomExpenseItem {
  id: string;
  title: string;
  amount: number;
  currency: CurrencyKey;
  paidBy: MemberKey;
  splitBetween: MemberKey[];
  category: "food" | "fuel" | "activity" | "market" | "stay" | "other";
  date: string;
  note?: string;
}

interface SettlementTransaction {
  from: MemberKey;
  to: MemberKey;
  amountTry: number;
}

const INITIAL_PREDEFINED: PredefinedExpenseItem[] = [
  { id: "e1", label: "GİDİŞ UÇAK (İstanbul ✈️ Üsküp)", category: "flight", amountTry: 17200, isPaid: true, paidBy: "fatih", note: "4 kişilik gidiş uçuş biletleri ödendi" },
  { id: "e2", label: "DÖNÜŞ UÇAK (Üsküp ✈️ İstanbul)", category: "flight", amountTry: 16876, isPaid: true, paidBy: "fatih", note: "4 kişilik dönüş uçuş biletleri ödendi" },
  { id: "e3", label: "SİGORTA (Seyahat Sağlık)", category: "insurance", amountTry: 1853, isPaid: true, paidBy: "fatih", note: "4 kişilik seyahat poliçesi kapatıldı" },
  { id: "e4", label: "Y.D ÇIKIŞ HARÇ (4 Kişi)", category: "tax", amountTry: 5000, isPaid: false, note: "Kişi başı 1.250 ₺ havalimanı çıkış harcı" },
  { id: "e5", label: "29-30 ÜSKÜP AIRBNB (1. Gece)", category: "stay", amountTry: 3019, isPaid: false, date: "29–30 Ağustos", note: "Üsküp Merkez / Debar Maalo 2 yatak odalı daire" },
  { id: "e6", label: "30-31 OHRİD AIRBNB (2. Gece)", category: "stay", amountTry: 4594, isPaid: false, date: "30–31 Ağustos", note: "Ohri Old Town / Göl Kıyısı daire" },
  { id: "e7", label: "31-3 SARANDE OTEL (3 Gece)", category: "stay", amountTry: 33210, isPaid: false, date: "31 Ağustos – 3 Eylül", note: "İyon kıyısı 3 gece kesintisiz sabit konaklama" },
  { id: "e8", label: "3-4 DURES AIRBNB (6. Gece)", category: "stay", amountTry: 5512, isPaid: false, date: "3–4 Eylül", note: "Durrës Vollga sahil kordonu apart" },
  { id: "e9", label: "4-5 TİRAN AIRBNB (7. Gece)", category: "stay", amountTry: 3812, isPaid: false, date: "4–5 Eylül", note: "Tiran Blloku / Merkez daire" },
  { id: "e10", label: "5-6 ÜSKÜP AIRBNB (8. Gece)", category: "stay", amountTry: 4429, isPaid: false, date: "5–6 Eylül", note: "Dönüş öncesi Üsküp Aerodrom / Merkez apart" },
];

const FIRESTORE_DOC_PATH = { collection: "balkan_trip", id: "budget_splitwise_v1" };

export function BudgetCalculator() {
  const [syncStatus, setSyncStatus] = useState<"connecting" | "synced" | "offline">("connecting");
  const [displayCurrency, setDisplayCurrency] = useState<CurrencyKey>("TRY");
  const [predefinedExpenses, setPredefinedExpenses] = useState<PredefinedExpenseItem[]>(() => {
    try {
      const saved = localStorage.getItem("balkan_budget_predefined_2026");
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_PREDEFINED;
  });

  const [customExpenses, setCustomExpenses] = useState<CustomExpenseItem[]>(() => {
    try {
      const saved = localStorage.getItem("balkan_budget_custom_2026");
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  // Modal States
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newAmount, setNewAmount] = useState<number | "">("");
  const [newCurrency, setNewCurrency] = useState<CurrencyKey>("EUR");
  const [newPaidBy, setNewPaidBy] = useState<MemberKey>("fatih");
  const [newSplitBetween, setNewSplitBetween] = useState<MemberKey[]>(["mert", "ikra", "fatih", "eyup"]);
  const [newCategory, setNewCategory] = useState<CustomExpenseItem["category"]>("food");
  const [newNote, setNewNote] = useState("");

  // Quick FX Calculator Tool State
  const [calcAmount, setCalcAmount] = useState<number>(100);
  const [calcCurrency, setCalcCurrency] = useState<CurrencyKey>("EUR");
  const [splitCount, setSplitCount] = useState<number>(4);

  // JSON Editor Modal State
  const [showJsonModal, setShowJsonModal] = useState(false);
  const [jsonText, setJsonText] = useState("");
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [copiedToast, setCopiedToast] = useState(false);
  const hasMergedRef = useRef(false);

  // -----------------------------------------------------------
  // FIRESTORE REALTIME SYNC
  // -----------------------------------------------------------
  useEffect(() => {
    try {
      const docRef = doc(db, FIRESTORE_DOC_PATH.collection, FIRESTORE_DOC_PATH.id);
      const unsubscribe = onSnapshot(
        docRef,
        (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();

            let mergedPredefined = INITIAL_PREDEFINED.map((initItem) => {
              const fromDb = (data.predefinedExpenses || []).find((dbItem: PredefinedExpenseItem) => dbItem.id === initItem.id);
              return fromDb ? { ...initItem, ...fromDb } : initItem;
            });

            let mergedCustom: CustomExpenseItem[] = data.customExpenses || [];

            setPredefinedExpenses(mergedPredefined);
            setCustomExpenses(mergedCustom);

            try {
              localStorage.setItem("balkan_budget_predefined_2026", JSON.stringify(mergedPredefined));
              localStorage.setItem("balkan_budget_custom_2026", JSON.stringify(mergedCustom));
            } catch {}

            setSyncStatus("synced");
          } else {
            // First time init in Firestore
            setDoc(docRef, {
              predefinedExpenses: INITIAL_PREDEFINED,
              customExpenses: [],
              createdAt: new Date().toISOString(),
              lastUpdated: new Date().toISOString(),
            }).catch((err) => console.error("Initial budget push error:", err));
            setSyncStatus("synced");
          }
        },
        (error) => {
          console.warn("Budget Firestore sync error:", error);
          setSyncStatus("offline");
        }
      );

      return () => unsubscribe();
    } catch (e) {
      console.warn("Budget setup error:", e);
      setSyncStatus("offline");
    }
  }, []);

  const persistBudget = async (
    newPredefined: PredefinedExpenseItem[],
    newCustom: CustomExpenseItem[]
  ) => {
    setPredefinedExpenses(newPredefined);
    setCustomExpenses(newCustom);

    try {
      localStorage.setItem("balkan_budget_predefined_2026", JSON.stringify(newPredefined));
      localStorage.setItem("balkan_budget_custom_2026", JSON.stringify(newCustom));
    } catch {}

    try {
      const docRef = doc(db, FIRESTORE_DOC_PATH.collection, FIRESTORE_DOC_PATH.id);
      await setDoc(
        docRef,
        {
          predefinedExpenses: newPredefined,
          customExpenses: newCustom,
          lastUpdated: new Date().toISOString(),
        },
        { merge: true }
      );
      setSyncStatus("synced");
    } catch (err) {
      console.error("Error saving budget to Firestore:", err);
      setSyncStatus("offline");
    }
  };

  // Convert an amount from any currency to another currency
  const convertCurrency = (amount: number, from: CurrencyKey, to: CurrencyKey): number => {
    const baseEur = amount / (FX_RATES[from] || 1);
    return baseEur * (FX_RATES[to] || 1);
  };

  const formatMoney = (amount: number, currency: CurrencyKey = displayCurrency): string => {
    const symbol = CURRENCY_SYMBOLS[currency];
    const rounded = currency === "TRY" || currency === "EUR" || currency === "USD" 
      ? amount.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      : Math.round(amount).toLocaleString("tr-TR");
    return `${rounded} ${symbol}`;
  };

  // Toggle paid status for predefined item
  const togglePredefinedPaid = (id: string) => {
    const updated = predefinedExpenses.map((item) => {
      if (item.id === id) {
        return { ...item, isPaid: !item.isPaid };
      }
      return item;
    });
    persistBudget(updated, customExpenses);
  };

  // Add custom expense
  const handleAddCustomExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newAmount || Number(newAmount) <= 0) return;
    if (newSplitBetween.length === 0) {
      alert("Lütfen harcamanın bölüşüleceği en az bir kişi seçin.");
      return;
    }

    const newItem: CustomExpenseItem = {
      id: `exp_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      title: newTitle.trim(),
      amount: Number(newAmount),
      currency: newCurrency,
      paidBy: newPaidBy,
      splitBetween: newSplitBetween,
      category: newCategory,
      date: new Date().toISOString().slice(0, 10),
      note: newNote.trim() || undefined,
    };

    const updatedCustom = [newItem, ...customExpenses];
    persistBudget(predefinedExpenses, updatedCustom);

    setNewTitle("");
    setNewAmount("");
    setNewNote("");
    setShowAddModal(false);
  };

  const handleDeleteCustomExpense = (id: string) => {
    if (!window.confirm("Bu harcamayı silmek istediğinize emin misiniz?")) return;
    const updatedCustom = customExpenses.filter((item) => item.id !== id);
    persistBudget(predefinedExpenses, updatedCustom);
  };

  // -----------------------------------------------------------
  // SPLITWISE CALCULATION ENGINE
  // -----------------------------------------------------------
  const splitwiseBalances = useMemo(() => {
    const memberPaidTry: Record<MemberKey, number> = { mert: 0, ikra: 0, fatih: 0, eyup: 0 };
    const memberShareTry: Record<MemberKey, number> = { mert: 0, ikra: 0, fatih: 0, eyup: 0 };

    // 1. Predefined Expenses
    predefinedExpenses.forEach((item) => {
      const amountTry = item.amountTry;
      const sharePerPerson = amountTry / 4;

      // Everyone shares equally
      (["mert", "ikra", "fatih", "eyup"] as MemberKey[]).forEach((m) => {
        memberShareTry[m] += sharePerPerson;
      });

      // If paid, attribute to payer (defaults to Fatih as CFO)
      if (item.isPaid) {
        const payer = item.paidBy || "fatih";
        memberPaidTry[payer] += amountTry;
      }
    });

    // 2. Custom Road Expenses
    customExpenses.forEach((item) => {
      const amountTry = convertCurrency(item.amount, item.currency, "TRY");
      memberPaidTry[item.paidBy] += amountTry;

      const splitCount = item.splitBetween.length;
      if (splitCount > 0) {
        const sharePerPerson = amountTry / splitCount;
        item.splitBetween.forEach((m) => {
          memberShareTry[m] += sharePerPerson;
        });
      }
    });

    // Calculate Net Balance for each member (Positive = Owed money, Negative = Debtor)
    const netBalancesTry: Record<MemberKey, number> = { mert: 0, ikra: 0, fatih: 0, eyup: 0 };
    (["mert", "ikra", "fatih", "eyup"] as MemberKey[]).forEach((m) => {
      netBalancesTry[m] = memberPaidTry[m] - memberShareTry[m];
    });

    // Calculate Optimal Settlements (Kim Kime Ne Kadar Gönderecek)
    const settlements: SettlementTransaction[] = [];
    const debtors: { member: MemberKey; amount: number }[] = [];
    const creditors: { member: MemberKey; amount: number }[] = [];

    (["mert", "ikra", "fatih", "eyup"] as MemberKey[]).forEach((m) => {
      const balance = netBalancesTry[m];
      if (balance < -1) {
        debtors.push({ member: m, amount: -balance });
      } else if (balance > 1) {
        creditors.push({ member: m, amount: balance });
      }
    });

    // Match debtors with creditors
    let dIdx = 0;
    let cIdx = 0;
    while (dIdx < debtors.length && cIdx < creditors.length) {
      const debtor = debtors[dIdx];
      const creditor = creditors[cIdx];
      const settlementAmount = Math.min(debtor.amount, creditor.amount);

      if (settlementAmount > 1) {
        settlements.push({
          from: debtor.member,
          to: creditor.member,
          amountTry: settlementAmount,
        });
      }

      debtor.amount -= settlementAmount;
      creditor.amount -= settlementAmount;

      if (debtor.amount < 1) dIdx++;
      if (creditor.amount < 1) cIdx++;
    }

    return {
      memberPaidTry,
      memberShareTry,
      netBalancesTry,
      settlements,
    };
  }, [predefinedExpenses, customExpenses]);

  // Overall totals
  const totalPredefinedTry = predefinedExpenses.reduce((sum, i) => sum + i.amountTry, 0);
  const totalPaidPredefinedTry = predefinedExpenses.filter((i) => i.isPaid).reduce((sum, i) => sum + i.amountTry, 0);
  const totalCustomTry = customExpenses.reduce((sum, i) => sum + convertCurrency(i.amount, i.currency, "TRY"), 0);
  const grandTotalTripTry = totalPredefinedTry + totalCustomTry;

  // Convert for Quick FX converter
  const quickBaseEur = calcAmount / (FX_RATES[calcCurrency] || 1);
  const quickConverted = {
    EUR: (quickBaseEur * FX_RATES.EUR).toFixed(2),
    USD: (quickBaseEur * FX_RATES.USD).toFixed(2),
    TRY: (quickBaseEur * FX_RATES.TRY).toFixed(2),
    MKD: Math.round(quickBaseEur * FX_RATES.MKD),
    ALL: Math.round(quickBaseEur * FX_RATES.ALL),
  };
  const quickPerPerson = {
    EUR: (parseFloat(quickConverted.EUR) / splitCount).toFixed(2),
    USD: (parseFloat(quickConverted.USD) / splitCount).toFixed(2),
    TRY: (parseFloat(quickConverted.TRY) / splitCount).toFixed(2),
    MKD: Math.round(quickConverted.MKD / splitCount),
    ALL: Math.round(quickConverted.ALL / splitCount),
  };

  // -----------------------------------------------------------
  // JSON EXPORT & IMPORT ENGINE
  // -----------------------------------------------------------
  const handleOpenJsonModal = () => {
    const exportData = {
      _rules: [
        "📌 BALKAN YOL EKİBİ - BÜTÇE & SPLITWISE JSON KURALLARI",
        "1. predefinedExpenses: Uçak, sigorta, çıkış harcı ve Airbnb rezervasyonları.",
        "2. isPaid: true ise ödenmiş kabul edilir, false ise ödenecek kabul edilir.",
        "3. customExpenses: Seyahat sırasında yapılan ekstra harcamalar (yemek, benzin, aktivite).",
        "4. currency: 'TRY', 'EUR', 'USD', 'ALL', 'MKD' para birimlerinden biri olmalıdır.",
        "5. paidBy: Harcamayı ödeyen üye ('mert', 'ikra', 'fatih', 'eyup').",
        "6. splitBetween: Harcamanın bölüşüleceği üyeler dizisi (['mert', 'ikra', 'fatih', 'eyup']).",
      ],
      fxRates: FX_RATES,
      predefinedExpenses,
      customExpenses,
    };
    setJsonText(JSON.stringify(exportData, null, 2));
    setJsonError(null);
    setShowJsonModal(true);
  };

  const handleCopyJson = async () => {
    try {
      await navigator.clipboard.writeText(jsonText);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2500);
    } catch (e) {}
  };

  const handleDownloadJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(jsonText);
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `balkan_butce_splitwise_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        if (event.target?.result) {
          setJsonText(event.target.result as string);
          setJsonError(null);
        }
      };
    }
  };

  const handleApplyJsonImport = () => {
    try {
      setJsonError(null);
      const parsed = JSON.parse(jsonText);

      if (!parsed.predefinedExpenses || !Array.isArray(parsed.predefinedExpenses)) {
        throw new Error("JSON formatında 'predefinedExpenses' listesi bulunamadı.");
      }

      const newPredefined: PredefinedExpenseItem[] = parsed.predefinedExpenses;
      const newCustom: CustomExpenseItem[] = parsed.customExpenses || [];

      persistBudget(newPredefined, newCustom);
      setShowJsonModal(false);
      alert("✅ Bütçe ve Splitwise verileri Firestore veritabanına başarıyla senkronize edildi!");
    } catch (err: any) {
      console.error(err);
      setJsonError(err.message || "Geçersiz JSON formatı.");
    }
  };

  return (
    <div className="budget-dossier space-y-8">
      {/* Top Header with Sync Badge & Global Currency Switcher */}
      <div className="flex flex-col gap-4 border-b-2 border-[#1d211c] pb-5 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            <span className="flex items-center gap-1.5 font-bold uppercase tracking-widest text-[#145c64]">
              <Sparkles size={15} />
              Kasa & Splitwise Bakanlığı
            </span>

            {/* Cloud Sync Status Badge */}
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
                  <span>Canlı DB Senkronize</span>
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
            Fatih'in Kasa & <em>Splitwise Defteri</em>
          </h3>
          <p className="mt-1 max-w-2xl font-serif text-xs sm:text-sm text-[#49534f]">
            Tüm ön ödemeler, anlık saha harcamaları, çoklu para birimi çevirileri ve "Kim kime kaç para borçlu?" hesaplamaları anlık senkronizedir.
          </p>
        </div>

        {/* Currency Switcher Tabs */}
        <div className="flex flex-col items-end gap-1.5">
          <span className="font-mono text-[11px] font-bold text-[#38413c] uppercase">Görünüm Para Birimi:</span>
          <div className="flex items-center gap-1 rounded border border-[#cac1ae] bg-[#f5f0e5] p-1 font-mono text-xs">
            {(["TRY", "EUR", "USD", "MKD", "ALL"] as CurrencyKey[]).map((cur) => (
              <button
                key={cur}
                onClick={() => setDisplayCurrency(cur)}
                className={`cursor-pointer rounded px-2.5 py-1 font-bold transition-all ${
                  displayCurrency === cur
                    ? "bg-[#145c64] text-white shadow-[2px_2px_0_#b54b38]"
                    : "text-[#29312e] hover:bg-[#e9e2d1]"
                }`}
              >
                {CURRENCY_SYMBOLS[cur]} {cur}
              </button>
            ))}
          </div>
        </div>
      </div>

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
            {formatMoney(convertCurrency(totalPaidPredefinedTry, "TRY", displayCurrency))}
          </div>
          <p className="mt-1 font-serif text-xs text-[#49534f]">
            Gidiş-dönüş uçak biletleri + 4 kişilik Seyahat Sağlık Sigortası ödendi.
          </p>
          <div className="mt-3 border-t border-[#145c64]/20 pt-2 font-mono text-xs font-bold text-[#145c64]">
            Kişi Başı: {formatMoney(convertCurrency(totalPaidPredefinedTry / 4, "TRY", displayCurrency))}
          </div>
        </div>

        <div className="rounded border-2 border-[#1d211c] bg-[#fffcf3] p-5 shadow-[4px_4px_0_#b54b38]">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#b54b38]">
              TOPLAM PLANLANAN BÜTÇE
            </span>
            <span className="rounded bg-[#1d211c] px-2 py-0.5 font-mono text-[10px] font-bold text-white">
              {predefinedExpenses.length + customExpenses.length} KALEM
            </span>
          </div>
          <div className="mt-2 font-display text-3xl sm:text-4xl text-[#b54b38]">
            {formatMoney(convertCurrency(grandTotalTripTry, "TRY", displayCurrency))}
          </div>
          <p className="mt-1 font-serif text-xs text-[#49534f]">
            Uçaklar, sigorta, çıkış harcı, 7 gece konaklama + {customExpenses.length} ekstra saha harcaması.
          </p>
          <div className="mt-3 border-t border-[#cac1ae] pt-2 font-mono text-xs font-bold text-[#b54b38]">
            Kişi Başı: {formatMoney(convertCurrency(grandTotalTripTry / 4, "TRY", displayCurrency))}
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
            {formatMoney(convertCurrency(grandTotalTripTry - totalPaidPredefinedTry, "TRY", displayCurrency))}
          </div>
          <p className="mt-1 font-serif text-xs text-[#49534f]">
            Airbnb / Otel ödemeleri ve havalimanı harçları için ayrılması gereken bütçe.
          </p>
          <div className="mt-3 border-t border-[#b54b38]/20 pt-2 font-mono text-xs font-bold text-[#145c64]">
            Kişi Başı: {formatMoney(convertCurrency((grandTotalTripTry - totalPaidPredefinedTry) / 4, "TRY", displayCurrency))}
          </div>
        </div>
      </div>

      {/* ======================================================= */}
      {/* ⚖️ SPLITWISE LIVE DEBT SETTLEMENT MATRIX */}
      {/* ======================================================= */}
      <div className="rounded border-2 border-[#1d211c] bg-[#fffcf3] p-5 sm:p-7 shadow-[8px_10px_0_rgba(20,92,100,0.2)]">
        <div className="flex flex-col gap-3 border-b-2 border-[#1d211c] pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#145c64]">
              <ArrowRightLeft size={16} />
              <span>Splitwise Canlı Hesaplaşma & Borç-Alacak Dengesi</span>
            </div>
            <h3 className="mt-1 font-display text-2xl sm:text-3xl text-[#1d211c]">
              Kim Kime Kaç Para Gönderecek?
            </h3>
            <p className="mt-0.5 font-serif text-xs text-[#49534f]">
              Her üyenin cebinden ödediği toplam harcamalar ile payına düşen paylar anlık hesaplanır.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex cursor-pointer items-center gap-1.5 self-start sm:self-auto rounded bg-[#145c64] px-4 py-2.5 font-mono text-xs font-bold text-white shadow-[3px_3px_0_#b54b38] transition-transform hover:translate-x-0.5 hover:translate-y-0.5 active:scale-95"
          >
            <Plus size={16} />
            <span>Yeni Saha Harcaması Ekle</span>
          </button>
        </div>

        {/* 4 Member Net Balance Cards */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {MEMBERS.map((member) => {
            const paid = splitwiseBalances.memberPaidTry[member.id];
            const share = splitwiseBalances.memberShareTry[member.id];
            const net = splitwiseBalances.netBalancesTry[member.id];
            const isCreditor = net > 1;
            const isDebtor = net < -1;

            return (
              <div
                key={member.id}
                className={`rounded border-2 p-4 transition-all ${
                  isCreditor
                    ? "border-emerald-600 bg-emerald-50/60 shadow-[3px_3px_0_#059669]"
                    : isDebtor
                    ? "border-rose-600 bg-rose-50/60 shadow-[3px_3px_0_#e11d48]"
                    : "border-[#cac1ae] bg-[#fdfbf7]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg text-[#1d211c]">{member.name}</span>
                  <span className={`rounded px-1.5 py-0.5 font-mono text-[10px] font-bold ${
                    isCreditor ? "bg-emerald-600 text-white" : isDebtor ? "bg-rose-600 text-white" : "bg-stone-200 text-stone-800"
                  }`}>
                    {isCreditor ? "ALACAKLI 🟢" : isDebtor ? "BORÇLU 🔴" : "DENK ⚪"}
                  </span>
                </div>

                <div className="mt-1 font-mono text-[10px] text-[#8e9893]">{member.badge}</div>

                <div className="mt-3 space-y-1 border-t border-[#cac1ae]/40 pt-2 font-mono text-xs">
                  <div className="flex justify-between text-[#49534f]">
                    <span>Ödediği:</span>
                    <span className="font-bold">{formatMoney(convertCurrency(paid, "TRY", displayCurrency))}</span>
                  </div>
                  <div className="flex justify-between text-[#49534f]">
                    <span>Payı:</span>
                    <span>{formatMoney(convertCurrency(share, "TRY", displayCurrency))}</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-[#cac1ae]/30 font-bold text-sm">
                    <span>Net Durum:</span>
                    <span className={isCreditor ? "text-emerald-700 font-bold" : isDebtor ? "text-rose-700 font-bold" : "text-stone-700"}>
                      {isCreditor ? "+" : ""}{formatMoney(convertCurrency(net, "TRY", displayCurrency))}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Clear Settlement Transfer Instructions */}
        <div className="mt-6 rounded border border-[#145c64]/30 bg-[#f0f6f4] p-4 sm:p-5">
          <h4 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#145c64]">
            <TrendingUp size={15} />
            <span>Optimum Transfer / IBAN Çözümü ({splitwiseBalances.settlements.length} Transfer)</span>
          </h4>

          {splitwiseBalances.settlements.length === 0 ? (
            <p className="mt-2 font-serif text-xs text-[#49534f]">
              Şu an tüm ekibin harcama ve ödemeleri denk durumdadır. Herhangi bir IBAN transferi gerekmemektedir.
            </p>
          ) : (
            <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {splitwiseBalances.settlements.map((tx, idx) => {
                const fromMember = MEMBERS.find((m) => m.id === tx.from);
                const toMember = MEMBERS.find((m) => m.id === tx.to);

                return (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded border border-[#145c64]/30 bg-white p-3 shadow-xs font-mono text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-100 text-rose-800 font-bold text-[11px]">
                        {fromMember?.name.charAt(0)}
                      </div>
                      <span className="font-bold text-[#1d211c]">{fromMember?.name}</span>
                      <span className="text-[#8e9893]">➔</span>
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px]">
                        {toMember?.name.charAt(0)}
                      </div>
                      <span className="font-bold text-[#1d211c]">{toMember?.name}</span>
                    </div>

                    <div className="text-right">
                      <span className="font-bold text-[#b54b38] text-sm">
                        {formatMoney(convertCurrency(tx.amountTry, "TRY", displayCurrency))}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ======================================================= */}
      {/* 📋 DETAILED "TATİL HARCAMA" CHECKLIST CARD */}
      {/* ======================================================= */}
      <div className="rounded border-2 border-[#1d211c] bg-[#111311] p-5 sm:p-7 text-white shadow-[8px_10px_0_rgba(29,33,28,0.25)]">
        <div className="flex flex-col gap-2 border-b border-stone-800 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#f3bc86]">
              <Receipt size={16} />
              <span>Resmî Ön Ödeme & Rezervasyon Tablosu</span>
            </div>
            <h3 className="mt-1 font-display text-2xl sm:text-3xl text-white tracking-wide">
              TATİL HARCAMA (Ön Rezervasyonlar)
            </h3>
            <p className="font-serif text-xs text-stone-400">
              Onay kutularına tıklayarak ödeme durumunu anında canlı DB üzerinde güncelleyebilirsiniz.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 font-mono text-xs text-amber-400">
              <CheckCircle2 size={16} className="text-amber-400 fill-amber-400/20" />
              <span>Ödendi ({predefinedExpenses.filter((i) => i.isPaid).length})</span>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-xs text-stone-400">
              <Circle size={16} className="text-stone-500" />
              <span>Beklemede ({predefinedExpenses.filter((i) => !i.isPaid).length})</span>
            </div>
          </div>
        </div>

        {/* Predefined Expense List Items */}
        <div className="mt-5 divide-y divide-stone-800/80 font-mono text-sm">
          {predefinedExpenses.map((item) => (
            <div
              key={item.id}
              onClick={() => togglePredefinedPaid(item.id)}
              className="flex cursor-pointer flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between transition-colors hover:bg-stone-900/80 px-2.5 rounded"
            >
              <div className="flex items-center gap-3">
                {item.isPaid ? (
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-500 text-black font-bold text-xs shadow-[0_0_10px_rgba(245,158,11,0.5)]">
                    ✓
                  </div>
                ) : (
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-stone-600 text-transparent">
                    ○
                  </div>
                )}
                <div>
                  <span className={`font-bold tracking-wider ${item.isPaid ? "text-amber-200" : "text-stone-300"}`}>
                    {item.label}
                  </span>
                  {item.note && (
                    <span className="block font-serif text-xs text-stone-400">
                      {item.note} {item.date && `• ${item.date}`}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-baseline justify-between sm:justify-end gap-3 pl-9 sm:pl-0">
                <span className="font-mono text-base sm:text-lg font-bold text-amber-400">
                  : {formatMoney(convertCurrency(item.amountTry, "TRY", displayCurrency))}
                </span>
                <span className="font-mono text-[11px] text-stone-400">
                  (Kişi: {formatMoney(convertCurrency(item.amountTry / 4, "TRY", displayCurrency))})
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Total Summary Footer */}
        <div className="mt-6 border-t-2 border-amber-500/40 bg-stone-900/90 p-4 rounded flex flex-col sm:flex-row items-center justify-between gap-3 font-mono">
          <span className="text-xs uppercase tracking-widest text-stone-300 font-bold">
            TOPLAM ÖN ÖDEMELİ REZERVASYONLAR
          </span>
          <div className="flex items-baseline gap-3">
            <span className="text-2xl sm:text-3xl font-bold text-amber-400">
              {formatMoney(convertCurrency(totalPredefinedTry, "TRY", displayCurrency))}
            </span>
            <span className="text-xs text-stone-400">
              (Kişi Başı: <b>{formatMoney(convertCurrency(totalPredefinedTry / 4, "TRY", displayCurrency))}</b>)
            </span>
          </div>
        </div>
      </div>

      {/* ======================================================= */}
      {/* 🚗 CUSTOM SAHA HARCAMALARI LİSTESİ */}
      {/* ======================================================= */}
      <div className="rounded border-2 border-[#1d211c] bg-[#fffcf3] p-5 sm:p-7 shadow-[8px_10px_0_rgba(29,33,28,0.18)]">
        <div className="flex flex-col gap-2 border-b-2 border-[#1d211c] pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#145c64]">
              <Wallet size={16} />
              <span>Yol Üstü Anlık Saha Harcamaları</span>
            </div>
            <h3 className="mt-1 font-display text-2xl text-[#1d211c]">
              Ekstra Harcama Kayıtları ({customExpenses.length})
            </h3>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex cursor-pointer items-center gap-1.5 self-start sm:self-auto rounded bg-[#145c64] px-4 py-2 font-mono text-xs font-bold text-white shadow-[2px_2px_0_#b54b38] hover:bg-[#0f464c]"
          >
            <Plus size={15} />
            <span>+ Harcama Ekle</span>
          </button>
        </div>

        {customExpenses.length === 0 ? (
          <div className="my-8 text-center font-mono text-xs text-[#68716c]">
            Henüz seyahat esnasında eklenmiş bir saha harcaması bulunmuyor.<br />
            Restoran, yakıt veya otopark harcamalarını yukarıdaki <b>"+ Harcama Ekle"</b> butonundan anında ekleyebilirsiniz.
          </div>
        ) : (
          <div className="mt-4 divide-y divide-[#cac1ae]/40 font-mono text-xs">
            {customExpenses.map((item) => {
              const payer = MEMBERS.find((m) => m.id === item.paidBy);
              const splitNames = item.splitBetween.map((id) => MEMBERS.find((m) => m.id === id)?.name.split(" ")[0]).join(", ");

              return (
                <div key={item.id} className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between hover:bg-[#f5f0e5]/50 px-2 rounded">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-sm text-[#1d211c]">{item.title}</span>
                      <span className="rounded bg-[#ded5c2] px-1.5 py-0.2 text-[10px] text-[#29312e] uppercase">
                        {item.category}
                      </span>
                    </div>
                    <div className="mt-0.5 text-[11px] text-[#68716c]">
                      <span>Ödeyen: <b>{payer?.name}</b></span> • <span>Bölüşenler: <b>{splitNames}</b></span>
                      {item.note && ` • Not: ${item.note}`}
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3">
                    <div className="text-right">
                      <span className="font-bold text-sm text-[#145c64]">
                        {item.amount.toLocaleString("tr-TR")} {CURRENCY_SYMBOLS[item.currency]}
                      </span>
                      {item.currency !== displayCurrency && (
                        <div className="text-[10px] text-[#8e9893]">
                          ≈ {formatMoney(convertCurrency(item.amount, item.currency, displayCurrency))}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => handleDeleteCustomExpense(item.id)}
                      title="Sil"
                      className="cursor-pointer rounded p-1 text-[#8e9893] hover:bg-rose-50 hover:text-rose-600"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ======================================================= */}
      {/* 💱 INTERACTIVE 5-CURRENCY CONVERTER & ARBITRAGE TOOL */}
      {/* ======================================================= */}
      <div className="rounded border border-[#29312e]/20 bg-[#fffcf3] p-4 sm:p-6 shadow-[4px_6px_0_rgba(29,33,28,0.12)]">
        <div className="flex flex-col gap-2 border-b border-[#29312e]/15 pb-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-[#145c64] text-white">
              <Calculator size={18} />
            </div>
            <div>
              <h4 className="font-display text-lg sm:text-xl text-[#1d211c]">Fatih'in Hızlı Döviz & Kişi Başı Hesap Makinesi</h4>
              <p className="font-mono text-[11px] sm:text-xs text-[#68716c]">
                Herhangi bir tutarı girin; anında 5 para biriminde karşılığını ve kişi başı payı görün!
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
              <option value="USD">Dolar ($)</option>
              <option value="TRY">Türk Lirası (₺)</option>
              <option value="MKD">Makedon Dinarı (MKD)</option>
              <option value="ALL">Arnavutluk Leki (ALL)</option>
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

        {/* 5-Currency Result Cards */}
        <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-5 sm:gap-3">
          <div className="rounded border border-[#cac1ae] bg-[#fdfbf7] p-2.5 text-center">
            <span className="font-mono text-[9px] text-[#68716c]">EURO (€)</span>
            <div className="font-display text-base sm:text-lg text-[#145c64]">{quickConverted.EUR} €</div>
            <div className="mt-1 border-t border-[#cac1ae]/60 pt-1 font-mono text-[10px] font-bold text-[#b54b38]">
              Kişi: {quickPerPerson.EUR} €
            </div>
          </div>

          <div className="rounded border border-[#cac1ae] bg-[#fdfbf7] p-2.5 text-center">
            <span className="font-mono text-[9px] text-[#68716c]">DOLAR ($)</span>
            <div className="font-display text-base sm:text-lg text-[#1d211c]">{quickConverted.USD} $</div>
            <div className="mt-1 border-t border-[#cac1ae]/60 pt-1 font-mono text-[10px] font-bold text-[#145c64]">
              Kişi: {quickPerPerson.USD} $
            </div>
          </div>

          <div className="rounded border border-[#cac1ae] bg-[#fdfbf7] p-2.5 text-center">
            <span className="font-mono text-[9px] text-[#68716c]">TÜRK LİRASI (₺)</span>
            <div className="font-display text-base sm:text-lg text-[#1d211c]">{quickConverted.TRY} ₺</div>
            <div className="mt-1 border-t border-[#cac1ae]/60 pt-1 font-mono text-[10px] font-bold text-[#145c64]">
              Kişi: {quickPerPerson.TRY} ₺
            </div>
          </div>

          <div className="rounded border border-[#cac1ae] bg-[#fdfbf7] p-2.5 text-center">
            <span className="font-mono text-[9px] text-[#68716c]">MAKEDON DİNARI</span>
            <div className="font-display text-base sm:text-lg text-[#1d211c]">{quickConverted.MKD.toLocaleString()} MKD</div>
            <div className="mt-1 border-t border-[#cac1ae]/60 pt-1 font-mono text-[10px] font-bold text-[#145c64]">
              Kişi: {quickPerPerson.MKD.toLocaleString()} MKD
            </div>
          </div>

          <div className="rounded border border-[#cac1ae] bg-[#fdfbf7] p-2.5 text-center col-span-2 sm:col-span-1">
            <span className="font-mono text-[9px] text-[#68716c]">ARNAVUTLUK LEKİ</span>
            <div className="font-display text-base sm:text-lg text-[#1d211c]">{quickConverted.ALL.toLocaleString()} ALL</div>
            <div className="mt-1 border-t border-[#cac1ae]/60 pt-1 font-mono text-[10px] font-bold text-[#145c64]">
              Kişi: {quickPerPerson.ALL.toLocaleString()} ALL
            </div>
          </div>
        </div>
      </div>

      {/* Developer & AI JSON Manager Panel */}
      <div className="rounded border-2 border-dashed border-[#145c64]/40 bg-[#f4f8f7] p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-[#145c64]">
              <Code2 size={16} />
              <span>Geliştirici & AI Bütçe JSON Modülü</span>
            </div>
            <p className="mt-1 font-serif text-xs text-[#49534f]">
              Tüm bütçe kalemlerini, rezervasyon tutarlarını ve harcama kayıtlarını JSON formatında görüntüleyebilir, AI'a toplu düzenletip anında DB'ye geri yapıştırabilirsiniz.
            </p>
          </div>

          <button
            onClick={handleOpenJsonModal}
            className="flex shrink-0 cursor-pointer items-center gap-2 rounded bg-[#1d211c] px-4 py-2.5 font-mono text-xs font-semibold text-[#fffcf3] shadow-[3px_3px_0_#145c64] transition-all hover:bg-[#38413c] active:scale-95"
          >
            <FileEdit size={15} className="text-[#f3bc86]" />
            <span>Bütçe JSON'u Görüntüle / AI ile Düzenle</span>
          </button>
        </div>
      </div>

      {/* ======================================================= */}
      {/* ➕ ADD CUSTOM EXPENSE MODAL */}
      {/* ======================================================= */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg border-2 border-[#1d211c] bg-[#fffcf3] p-6 shadow-[10px_12px_0_rgba(29,33,28,0.3)]">
            <h4 className="font-display text-2xl text-[#1d211c]">
              Yeni Saha Harcaması Ekle
            </h4>
            <p className="mt-1 font-serif text-xs text-[#68716c]">
              Eklenen harcama anında Firebase veritabanına yazılır ve Splitwise borç-alacak dengesini günceller.
            </p>

            <form onSubmit={handleAddCustomExpense} className="mt-4 space-y-3.5 font-mono text-xs">
              {/* Title */}
              <div>
                <label className="block font-semibold text-[#29312e]">Harcama Başlığı / Açıklama</label>
                <input
                  type="text"
                  required
                  placeholder="Örn: Borsh Izgara Balık Sofrası, Matka Tekne Turu, Shell Benzin..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="mt-1 w-full border border-[#cac1ae] bg-white p-2 text-sm text-[#1d211c] focus:border-[#145c64] focus:outline-none"
                />
              </div>

              {/* Amount & Currency */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-[#29312e]">Tutar</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0.1"
                    required
                    placeholder="Örn: 45"
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value === "" ? "" : parseFloat(e.target.value))}
                    className="mt-1 w-full border border-[#cac1ae] bg-white p-2 text-sm font-bold text-[#145c64] focus:border-[#145c64] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#29312e]">Para Birimi</label>
                  <select
                    value={newCurrency}
                    onChange={(e) => setNewCurrency(e.target.value as CurrencyKey)}
                    className="mt-1 w-full border border-[#cac1ae] bg-white p-2 text-xs"
                  >
                    <option value="EUR">Euro (€)</option>
                    <option value="TRY">Türk Lirası (₺)</option>
                    <option value="USD">Dolar ($)</option>
                    <option value="ALL">Arnavutluk Leki (ALL)</option>
                    <option value="MKD">Makedon Dinarı (MKD)</option>
                  </select>
                </div>
              </div>

              {/* Who Paid */}
              <div>
                <label className="block font-semibold text-[#29312e]">Kim Ödedi? (Cebinden Veren)</label>
                <div className="mt-1 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {MEMBERS.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setNewPaidBy(m.id)}
                      className={`cursor-pointer rounded border p-2 text-center text-xs font-bold transition-all ${
                        newPaidBy === m.id
                          ? "border-[#145c64] bg-[#145c64] text-white shadow-[2px_2px_0_#b54b38]"
                          : "border-[#cac1ae] bg-white text-[#29312e]"
                      }`}
                    >
                      {m.name.split(" ")[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Split Between */}
              <div>
                <label className="block font-semibold text-[#29312e]">Kime Bölüştürülecek?</label>
                <div className="mt-1 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {MEMBERS.map((m) => {
                    const isChecked = newSplitBetween.includes(m.id);
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => {
                          if (isChecked) {
                            if (newSplitBetween.length > 1) {
                              setNewSplitBetween(newSplitBetween.filter((id) => id !== m.id));
                            }
                          } else {
                            setNewSplitBetween([...newSplitBetween, m.id]);
                          }
                        }}
                        className={`cursor-pointer rounded border p-2 text-center text-xs transition-all ${
                          isChecked
                            ? "border-[#b54b38] bg-[#b54b38] text-white font-bold"
                            : "border-[#cac1ae] bg-stone-100 text-stone-500 opacity-60"
                        }`}
                      >
                        {isChecked ? "✓ " : ""}{m.name.split(" ")[0]}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block font-semibold text-[#29312e]">Kategori</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="mt-1 w-full border border-[#cac1ae] bg-white p-2 text-xs"
                >
                  <option value="food">🍽️ Yeme & İçme (Restoran / Kafe)</option>
                  <option value="fuel">🚗 Yakıt & Otopark & Sınır</option>
                  <option value="activity">🏛️ Müze & Plaj & Tekne Turu</option>
                  <option value="market">🛒 Market & Su & Atıştırmalık</option>
                  <option value="stay">🏠 Konaklama & Ekstra Oda Payı</option>
                  <option value="other">⚡ Diğer Ortak Harcama</option>
                </select>
              </div>

              {/* Form Buttons */}
              <div className="mt-5 flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="cursor-pointer border border-[#cac1ae] bg-[#e9e2d1] px-4 py-2 font-mono text-xs text-[#29312e]"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="cursor-pointer bg-[#145c64] px-5 py-2 font-mono text-xs font-bold text-white shadow-[3px_3px_0_#b54b38] hover:bg-[#0f464c]"
                >
                  Kaydet & DB'ye Senkronize Et
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================= */}
      {/* 🛠️ BÜTÇE JSON MODAL */}
      {/* ======================================================= */}
      {showJsonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 sm:p-6 backdrop-blur-sm">
          <div className="flex h-[90vh] w-full max-w-4xl flex-col border-2 border-[#1d211c] bg-[#fffcf3] shadow-[12px_14px_0_rgba(29,33,28,0.35)]">
            <div className="flex items-center justify-between border-b-2 border-[#1d211c] bg-[#f5f0e5] p-4">
              <div className="flex items-center gap-2">
                <Code2 size={20} className="text-[#145c64]" />
                <div>
                  <h4 className="font-display text-xl sm:text-2xl text-[#1d211c]">
                    Bütçe JSON Veritabanı & AI Düzenleyici
                  </h4>
                  <p className="font-mono text-[11px] text-[#5b6560]">
                    Kopyalayıp ChatGPT/Claude/Gemini'a düzenletebilir veya doğrudan buradan düzenleyip kaydedebilirsiniz.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowJsonModal(false)}
                className="rounded border border-[#cac1ae] bg-white px-3 py-1 font-mono text-xs font-bold text-[#1d211c] hover:bg-[#e9e2d1]"
              >
                Kapat (ESC)
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#cac1ae] bg-[#fffdf5] px-4 py-2 font-mono text-xs">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyJson}
                  className="flex items-center gap-1.5 rounded border border-[#145c64] bg-[#145c64] px-3 py-1.5 text-white shadow-[2px_2px_0_#b54b38] hover:bg-[#0f464c]"
                >
                  {copiedToast ? <Check size={14} className="text-emerald-300" /> : <Copy size={14} />}
                  <span>{copiedToast ? "Panoya Kopyalandı!" : "JSON'u Kopyala"}</span>
                </button>

                <button
                  onClick={handleDownloadJson}
                  className="flex items-center gap-1.5 rounded border border-[#cac1ae] bg-white px-3 py-1.5 text-[#29312e] hover:bg-[#f0ece1]"
                >
                  <Download size={14} />
                  <span>İndir (.json)</span>
                </button>

                <label className="flex cursor-pointer items-center gap-1.5 rounded border border-[#cac1ae] bg-white px-3 py-1.5 text-[#29312e] hover:bg-[#f0ece1]">
                  <Upload size={14} />
                  <span>Dosyadan Yükle</span>
                  <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
                </label>
              </div>
            </div>

            {jsonError && (
              <div className="flex items-start gap-2 bg-rose-100 p-3 font-mono text-xs text-rose-900 border-b border-rose-300">
                <AlertCircle size={16} className="shrink-0 mt-0.5 text-rose-600" />
                <div>
                  <strong>JSON Hatası:</strong> {jsonError}
                </div>
              </div>
            )}

            <div className="flex-1 overflow-hidden p-3 bg-[#1e1e1e]">
              <textarea
                value={jsonText}
                onChange={(e) => setJsonText(e.target.value)}
                spellCheck={false}
                className="h-full w-full resize-none bg-transparent font-mono text-xs leading-relaxed text-[#d4d4d4] focus:outline-none"
                placeholder="JSON buraya gelecek..."
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t-2 border-[#1d211c] bg-[#f5f0e5] p-3 sm:p-4">
              <div className="font-mono text-xs text-[#5b6560]">
                ⚠️ "Kaydet & DB'ye Senkronize Et" butonuna bastığınızda tüm ekibin ekranındaki bütçe anında güncellenir.
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowJsonModal(false)}
                  className="cursor-pointer border border-[#cac1ae] bg-[#e9e2d1] px-4 py-2 font-mono text-xs text-[#29312e]"
                >
                  İptal
                </button>
                <button
                  onClick={handleApplyJsonImport}
                  className="cursor-pointer bg-[#145c64] px-5 py-2 font-mono text-xs font-bold text-white shadow-[3px_3px_0_#b54b38] transition-transform hover:translate-x-0.5 hover:translate-y-0.5 active:scale-95"
                >
                  Kaydet & DB'ye Senkronize Et 🚀
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
