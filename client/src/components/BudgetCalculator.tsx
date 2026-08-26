import { useState, useEffect, useMemo } from "react";
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
  Landmark,
  Scale,
  RefreshCw,
  Info
} from "lucide-react";
import { db } from "@/lib/firebase";
import { doc, onSnapshot, setDoc } from "firebase/firestore";

type MemberKey = "mert" | "ikra" | "fatih" | "eyup";
type CurrencyKey = "TRY" | "EUR" | "USD" | "ALL" | "MKD";

interface MemberProfile {
  id: MemberKey;
  name: string;
  shortName: string;
  initial: string;
  badge: string;
  avatarColor: string;
  bgClass: string;
}

const MEMBERS: MemberProfile[] = [
  { id: "mert", name: "Mert Kuş", shortName: "Mert", initial: "M", badge: "🏆 Catan Şampiyonu", avatarColor: "#145c64", bgClass: "bg-[#145c64]" },
  { id: "ikra", name: "İkra Gürdal", shortName: "İkra", initial: "İ", badge: "👑 Balkan Prensesi", avatarColor: "#b54b38", bgClass: "bg-[#b54b38]" },
  { id: "fatih", name: "Fatih Berat Gürdal", shortName: "Fatih", initial: "F", badge: "💶 CFO & Kasa", avatarColor: "#d78255", bgClass: "bg-[#d78255]" },
  { id: "eyup", name: "Eyüpcan Aldemir", shortName: "Eyüp", initial: "E", badge: "🚀 Kültür Bakanı", avatarColor: "#38413c", bgClass: "bg-[#38413c]" },
];

// Default Fallback FX Rates (Base: 1 EUR)
export const DEFAULT_FX_RATES: Record<CurrencyKey, number> = {
  EUR: 1,
  USD: 1.08,
  TRY: 38.50,
  MKD: 61.50,
  ALL: 100.20,
};

export const FX_RATES: Record<CurrencyKey, number> = DEFAULT_FX_RATES;

const CURRENCY_SYMBOLS: Record<CurrencyKey, string> = {
  TRY: "₺",
  EUR: "€",
  USD: "$",
  ALL: "ALL",
  MKD: "MKD",
};

export interface ExpenseItem {
  id: string;
  title: string;
  amount: number;
  currency: CurrencyKey;
  paidBy: MemberKey; // The person who paid upfront (Cebinden veren)
  splitBetween: MemberKey[]; // Members sharing this expense
  settledShares: Record<MemberKey, boolean>; // True if member has paid their share to payer
  category: "flight" | "stay" | "food" | "fuel" | "activity" | "tax" | "market" | "other";
  date?: string;
  note?: string;
  isInitialFixed?: boolean;
}

interface SettlementDebt {
  from: MemberKey;
  to: MemberKey;
  amountTry: number;
}

// Initial Trip Expenses (Flights, Insurance, Tax, 7-Night Accommodations)
const INITIAL_EXPENSES: ExpenseItem[] = [
  {
    id: "exp_flight_1",
    title: "GİDİŞ UÇAK (İstanbul ✈️ Üsküp)",
    amount: 17200,
    currency: "TRY",
    paidBy: "fatih",
    splitBetween: ["mert", "ikra", "fatih", "eyup"],
    settledShares: { mert: true, ikra: true, fatih: true, eyup: true },
    category: "flight",
    date: "29 Ağustos",
    note: "4 kişilik gidiş uçuş biletleri ödendi",
    isInitialFixed: true,
  },
  {
    id: "exp_flight_2",
    title: "DÖNÜŞ UÇAK (Üsküp ✈️ İstanbul)",
    amount: 16876,
    currency: "TRY",
    paidBy: "fatih",
    splitBetween: ["mert", "ikra", "fatih", "eyup"],
    settledShares: { mert: true, ikra: true, fatih: true, eyup: true },
    category: "flight",
    date: "6 Eylül",
    note: "4 kişilik dönüş uçuş biletleri ödendi",
    isInitialFixed: true,
  },
  {
    id: "exp_insurance",
    title: "SİGORTA (Seyahat Sağlık Sigortası)",
    amount: 1853,
    currency: "TRY",
    paidBy: "fatih",
    splitBetween: ["mert", "ikra", "fatih", "eyup"],
    settledShares: { mert: true, ikra: true, fatih: true, eyup: true },
    category: "tax",
    date: "Ağustos",
    note: "4 kişilik seyahat poliçesi kapatıldı",
    isInitialFixed: true,
  },
  {
    id: "exp_tax",
    title: "Y.D ÇIKIŞ HARÇ (4 Kişi)",
    amount: 5000,
    currency: "TRY",
    paidBy: "fatih",
    splitBetween: ["mert", "ikra", "fatih", "eyup"],
    settledShares: { mert: false, ikra: false, fatih: true, eyup: false },
    category: "tax",
    date: "29 Ağustos",
    note: "Kişi başı 1.250 ₺ havalimanı çıkış harcı",
    isInitialFixed: true,
  },
  {
    id: "exp_stay_1",
    title: "29-30 ÜSKÜP AIRBNB (1. Gece)",
    amount: 3019,
    currency: "TRY",
    paidBy: "fatih",
    splitBetween: ["mert", "ikra", "fatih", "eyup"],
    settledShares: { mert: false, ikra: false, fatih: true, eyup: false },
    category: "stay",
    date: "29–30 Ağustos",
    note: "Üsküp Merkez / Debar Maalo 2 yatak odalı daire",
    isInitialFixed: true,
  },
  {
    id: "exp_stay_2",
    title: "30-31 OHRİD AIRBNB (2. Gece)",
    amount: 4594,
    currency: "TRY",
    paidBy: "fatih",
    splitBetween: ["mert", "ikra", "fatih", "eyup"],
    settledShares: { mert: false, ikra: false, fatih: true, eyup: false },
    category: "stay",
    date: "30–31 Ağustos",
    note: "Ohri Old Town / Göl Kıyısı daire",
    isInitialFixed: true,
  },
  {
    id: "exp_stay_3",
    title: "31-3 SARANDË OTEL (3 Gece Kesintisiz)",
    amount: 33210,
    currency: "TRY",
    paidBy: "fatih",
    splitBetween: ["mert", "ikra", "fatih", "eyup"],
    settledShares: { mert: false, ikra: false, fatih: true, eyup: false },
    category: "stay",
    date: "31 Ağustos – 3 Eylül",
    note: "İyon kıyısı 3 gece kesintisiz sabit konaklama",
    isInitialFixed: true,
  },
  {
    id: "exp_stay_4",
    title: "3-4 DÜRRËS AIRBNB (6. Gece)",
    amount: 5512,
    currency: "TRY",
    paidBy: "fatih",
    splitBetween: ["mert", "ikra", "fatih", "eyup"],
    settledShares: { mert: false, ikra: false, fatih: true, eyup: false },
    category: "stay",
    date: "3–4 Eylül",
    note: "Durrës Vollga sahil kordonu apart",
    isInitialFixed: true,
  },
  {
    id: "exp_stay_5",
    title: "4-5 TİRAN AIRBNB (7. Gece)",
    amount: 3812,
    currency: "TRY",
    paidBy: "fatih",
    splitBetween: ["mert", "ikra", "fatih", "eyup"],
    settledShares: { mert: false, ikra: false, fatih: true, eyup: false },
    category: "stay",
    date: "4–5 Eylül",
    note: "Tiran Blloku / Merkez daire",
    isInitialFixed: true,
  },
  {
    id: "exp_stay_6",
    title: "5-6 ÜSKÜP AIRBNB (8. Gece)",
    amount: 4429,
    currency: "TRY",
    paidBy: "fatih",
    splitBetween: ["mert", "ikra", "fatih", "eyup"],
    settledShares: { mert: false, ikra: false, fatih: true, eyup: false },
    category: "stay",
    date: "5–6 Eylül",
    note: "Dönüş öncesi Üsküp Aerodrom / Merkez apart",
    isInitialFixed: true,
  },
];

const FIRESTORE_DOC_PATH = { collection: "balkan_trip", id: "budget_splitwise_v2" };

export function BudgetCalculator() {
  const [syncStatus, setSyncStatus] = useState<"connecting" | "synced" | "offline">("connecting");
  const [activeTab, setActiveTab] = useState<"all" | MemberKey>("all");

  // Dynamic Live FX Rates State
  const [fxRates, setFxRates] = useState<Record<CurrencyKey, number>>(() => {
    try {
      const saved = localStorage.getItem("balkan_live_fx_rates_v1");
      if (saved) return JSON.parse(saved);
    } catch {}
    return DEFAULT_FX_RATES;
  });
  const [fxLastUpdate, setFxLastUpdate] = useState<string>(() => {
    return localStorage.getItem("balkan_live_fx_date_v1") || "Canlı Bağlantı";
  });
  const [isFetchingFx, setIsFetchingFx] = useState<boolean>(false);

  // Live Exchange Rate Fetcher (Auto-updates Firestore DB with multi-endpoint fallback)
  const fetchLiveRates = async () => {
    setIsFetchingFx(true);
    try {
      let data: any = null;
      
      // Try Primary API Endpoint
      try {
        const res = await fetch("https://open.er-api.com/v6/latest/EUR");
        if (res.ok) {
          data = await res.json();
        }
      } catch (e) {
        console.warn("Primary FX API unreachable, attempting backup endpoint...", e);
      }

      // Try Secondary Backup Endpoint if needed
      if (!data || !data.rates) {
        try {
          const res = await fetch("https://api.exchangerate-api.com/v4/latest/EUR");
          if (res.ok) {
            data = await res.json();
          }
        } catch (e) {
          console.warn("Backup FX API also unreachable, using cached/DB rates.", e);
        }
      }

      if (data && data.rates) {
        const newRates: Record<CurrencyKey, number> = {
          EUR: 1,
          USD: Number(data.rates.USD) || 1.08,
          TRY: Number(data.rates.TRY) || 38.50,
          MKD: Number(data.rates.MKD) || 61.50,
          ALL: Number(data.rates.ALL) || 100.20,
        };
        setFxRates(newRates);
        const updateDate = data.time_last_update_utc 
          ? new Date(data.time_last_update_utc).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })
          : new Date().toLocaleDateString("tr-TR", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" });
        setFxLastUpdate(updateDate);
        try {
          localStorage.setItem("balkan_live_fx_rates_v1", JSON.stringify(newRates));
          localStorage.setItem("balkan_live_fx_date_v1", updateDate);
        } catch {}

        // Sync fresh live FX rates directly to Firebase Firestore
        try {
          const docRef = doc(db, FIRESTORE_DOC_PATH.collection, FIRESTORE_DOC_PATH.id);
          await setDoc(docRef, {
            fxRates: newRates,
            fxLastUpdate: updateDate,
            lastUpdated: new Date().toISOString(),
          }, { merge: true });
        } catch (dbErr) {
          console.warn("Firestore FX sync error:", dbErr);
        }
      }
    } catch (err) {
      console.warn("Could not fetch live rates, safely keeping current saved rates:", err);
    } finally {
      setIsFetchingFx(false);
    }
  };

  useEffect(() => {
    fetchLiveRates();
  }, []);

  // Convert any currency to any currency safely (never crashes or produces NaN)
  const convertCurrency = (amount: number, from: CurrencyKey, to: CurrencyKey): number => {
    if (!amount || isNaN(amount)) return 0;
    const fromRate = fxRates?.[from] || DEFAULT_FX_RATES[from] || 1;
    const toRate = fxRates?.[to] || DEFAULT_FX_RATES[to] || 1;
    const baseEur = amount / (fromRate > 0 ? fromRate : 1);
    return baseEur * (toRate > 0 ? toRate : 1);
  };

  // Format multi-currency equivalent line using live fxRates
  const getEquivalents = (amountTry: number) => {
    const validAmount = isNaN(amountTry) ? 0 : amountTry;
    const eur = convertCurrency(validAmount, "TRY", "EUR");
    const usd = convertCurrency(validAmount, "TRY", "USD");
    const mkd = convertCurrency(validAmount, "TRY", "MKD");
    const all = convertCurrency(validAmount, "TRY", "ALL");

    return {
      tryFormatted: validAmount.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " ₺",
      eurFormatted: eur.toLocaleString("tr-TR", { minimumFractionDigits: 1, maximumFractionDigits: 2 }) + " €",
      usdFormatted: usd.toLocaleString("tr-TR", { minimumFractionDigits: 1, maximumFractionDigits: 2 }) + " $",
      mkdFormatted: Math.round(mkd).toLocaleString("tr-TR") + " MKD",
      allFormatted: Math.round(all).toLocaleString("tr-TR") + " ALL",
      subline: `≈ ${Math.round(eur).toLocaleString("tr-TR")} € · ${Math.round(usd).toLocaleString("tr-TR")} $ · ${Math.round(mkd).toLocaleString("tr-TR")} MKD · ${Math.round(all).toLocaleString("tr-TR")} ALL`,
    };
  };

  const [expenses, setExpenses] = useState<ExpenseItem[]>(() => {
    try {
      const saved = localStorage.getItem("balkan_unified_expenses_2026");
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_EXPENSES;
  });

  // Modal States
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newAmount, setNewAmount] = useState<number | "">("");
  const [newCurrency, setNewCurrency] = useState<CurrencyKey>("TRY");
  const [newPaidBy, setNewPaidBy] = useState<MemberKey>("fatih");
  const [newSplitBetween, setNewSplitBetween] = useState<MemberKey[]>(["mert", "ikra", "fatih", "eyup"]);
  const [newCategory, setNewCategory] = useState<ExpenseItem["category"]>("food");
  const [newNote, setNewNote] = useState("");

  // Quick FX Calculator Tool State
  const [calcAmount, setCalcAmount] = useState<number>(1000);
  const [calcCurrency, setCalcCurrency] = useState<CurrencyKey>("TRY");
  const [splitCount, setSplitCount] = useState<number>(4);

  // JSON Editor Modal State
  const [showJsonModal, setShowJsonModal] = useState(false);
  const [jsonText, setJsonText] = useState("");
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [copiedToast, setCopiedToast] = useState(false);

  // -----------------------------------------------------------
  // FIRESTORE REALTIME SYNC (EXPENSES + FX RATES + SETTLEMENTS)
  // -----------------------------------------------------------
  useEffect(() => {
    try {
      const docRef = doc(db, FIRESTORE_DOC_PATH.collection, FIRESTORE_DOC_PATH.id);
      const unsubscribe = onSnapshot(
        docRef,
        (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.expenses && Array.isArray(data.expenses)) {
              setExpenses(data.expenses);
              try {
                localStorage.setItem("balkan_unified_expenses_2026", JSON.stringify(data.expenses));
              } catch {}
            }
            if (data.fxRates) {
              setFxRates(data.fxRates);
            }
            if (data.fxLastUpdate) {
              setFxLastUpdate(data.fxLastUpdate);
            }
            setSyncStatus("synced");
          } else {
            // First time init in Firestore
            setDoc(docRef, {
              expenses: INITIAL_EXPENSES,
              fxRates: DEFAULT_FX_RATES,
              fxLastUpdate: new Date().toLocaleDateString("tr-TR"),
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

  const persistExpenses = async (newExpenses: ExpenseItem[]) => {
    setExpenses(newExpenses);
    try {
      localStorage.setItem("balkan_unified_expenses_2026", JSON.stringify(newExpenses));
    } catch {}

    try {
      const docRef = doc(db, FIRESTORE_DOC_PATH.collection, FIRESTORE_DOC_PATH.id);
      await setDoc(
        docRef,
        {
          expenses: newExpenses,
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

  // Toggle individual member tick for an expense
  const toggleMemberShare = (expenseId: string, memberId: MemberKey) => {
    const updated = expenses.map((item) => {
      if (item.id === expenseId) {
        const currentSettled = item.settledShares || {};
        const isSettled = !!currentSettled[memberId];
        return {
          ...item,
          settledShares: {
            ...currentSettled,
            [memberId]: !isSettled,
          },
        };
      }
      return item;
    });
    persistExpenses(updated);
  };

  // Add custom road expense
  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newAmount || Number(newAmount) <= 0) return;
    if (newSplitBetween.length === 0) {
      alert("Lütfen harcamanın bölüşüleceği en az bir kişi seçin.");
      return;
    }

    const initialSettled: Record<MemberKey, boolean> = {
      mert: false,
      ikra: false,
      fatih: false,
      eyup: false,
    };
    // The payer has inherently paid their own share
    initialSettled[newPaidBy] = true;

    const newItem: ExpenseItem = {
      id: `exp_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      title: newTitle.trim(),
      amount: Number(newAmount),
      currency: newCurrency,
      paidBy: newPaidBy,
      splitBetween: newSplitBetween,
      settledShares: initialSettled,
      category: newCategory,
      date: new Date().toLocaleDateString("tr-TR", { day: "numeric", month: "long" }),
      note: newNote.trim() || undefined,
    };

    const updated = [newItem, ...expenses];
    persistExpenses(updated);

    setNewTitle("");
    setNewAmount("");
    setNewNote("");
    setShowAddModal(false);
  };

  const handleDeleteExpense = (id: string) => {
    if (!window.confirm("Bu harcamayı silmek istediğinize emin misiniz?")) return;
    const updated = expenses.filter((item) => item.id !== id);
    persistExpenses(updated);
  };

  // -----------------------------------------------------------
  // DYNAMIC SPLITWISE CALCULATION ENGINE BASED ON TICKS
  // -----------------------------------------------------------
  const splitwiseState = useMemo(() => {
    const totalPaidTry: Record<MemberKey, number> = { mert: 0, ikra: 0, fatih: 0, eyup: 0 };
    const totalObligationTry: Record<MemberKey, number> = { mert: 0, ikra: 0, fatih: 0, eyup: 0 };
    const totalSettledPaidTry: Record<MemberKey, number> = { mert: 0, ikra: 0, fatih: 0, eyup: 0 };

    const debtMatrix: Record<MemberKey, Record<MemberKey, number>> = {
      mert: { mert: 0, ikra: 0, fatih: 0, eyup: 0 },
      ikra: { mert: 0, ikra: 0, fatih: 0, eyup: 0 },
      fatih: { mert: 0, ikra: 0, fatih: 0, eyup: 0 },
      eyup: { mert: 0, ikra: 0, fatih: 0, eyup: 0 },
    };

    expenses.forEach((item) => {
      const itemAmountTry = convertCurrency(item.amount, item.currency, "TRY");
      const payer = item.paidBy;
      const splitCount = item.splitBetween.length;
      if (splitCount === 0) return;

      const shareAmountTry = itemAmountTry / splitCount;

      totalPaidTry[payer] += itemAmountTry;

      item.splitBetween.forEach((member) => {
        totalObligationTry[member] += shareAmountTry;

        const isSettled = !!item.settledShares?.[member];
        if (isSettled) {
          totalSettledPaidTry[member] += shareAmountTry;
        } else {
          // Unsettled debt: member owes payer
          if (member !== payer) {
            debtMatrix[member][payer] += shareAmountTry;
          }
        }
      });
    });

    const members: MemberKey[] = ["mert", "ikra", "fatih", "eyup"];
    const simplifiedDebts: SettlementDebt[] = [];

    for (let i = 0; i < members.length; i++) {
      for (let j = i + 1; j < members.length; j++) {
        const m1 = members[i];
        const m2 = members[j];
        const diff = debtMatrix[m1][m2] - debtMatrix[m2][m1];

        if (diff > 1) {
          simplifiedDebts.push({ from: m1, to: m2, amountTry: diff });
        } else if (diff < -1) {
          simplifiedDebts.push({ from: m2, to: m1, amountTry: -diff });
        }
      }
    }

    const netBalanceTry: Record<MemberKey, number> = { mert: 0, ikra: 0, fatih: 0, eyup: 0 };
    members.forEach((m) => {
      let receivable = 0;
      let payable = 0;
      simplifiedDebts.forEach((debt) => {
        if (debt.to === m) receivable += debt.amountTry;
        if (debt.from === m) payable += debt.amountTry;
      });
      netBalanceTry[m] = receivable - payable;
    });

    return {
      totalPaidTry,
      totalObligationTry,
      totalSettledPaidTry,
      simplifiedDebts,
      netBalanceTry,
    };
  }, [expenses]);

  // Overall totals in TRY
  const grandTotalTripTry = useMemo(() => {
    return expenses.reduce((sum, item) => sum + convertCurrency(item.amount, item.currency, "TRY"), 0);
  }, [expenses]);

  const totalSettledAmountTry = useMemo(() => {
    let sum = 0;
    expenses.forEach((item) => {
      const itemAmountTry = convertCurrency(item.amount, item.currency, "TRY");
      const splitCount = item.splitBetween.length;
      if (splitCount === 0) return;
      const share = itemAmountTry / splitCount;
      item.splitBetween.forEach((m) => {
        if (item.settledShares?.[m]) {
          sum += share;
        }
      });
    });
    return sum;
  }, [expenses]);

  const totalRemainingUnsettledTry = grandTotalTripTry - totalSettledAmountTry;

  // Filtered expenses based on active tab
  const filteredExpenses = useMemo(() => {
    if (activeTab === "all") return expenses;
    return expenses.filter(
      (item) => item.paidBy === activeTab || item.splitBetween.includes(activeTab)
    );
  }, [expenses, activeTab]);

  // Quick FX converter
  const quickBaseEur = calcAmount / (fxRates[calcCurrency] || 1);
  const quickConverted = {
    TRY: (quickBaseEur * fxRates.TRY).toFixed(2),
    EUR: (quickBaseEur * fxRates.EUR).toFixed(2),
    USD: (quickBaseEur * fxRates.USD).toFixed(2),
    MKD: Math.round(quickBaseEur * fxRates.MKD),
    ALL: Math.round(quickBaseEur * fxRates.ALL),
  };
  const quickPerPerson = {
    TRY: (parseFloat(quickConverted.TRY) / splitCount).toFixed(2),
    EUR: (parseFloat(quickConverted.EUR) / splitCount).toFixed(2),
    USD: (parseFloat(quickConverted.USD) / splitCount).toFixed(2),
    MKD: Math.round(quickConverted.MKD / splitCount),
    ALL: Math.round(quickConverted.ALL / splitCount),
  };

  // -----------------------------------------------------------
  // JSON EXPORT & IMPORT ENGINE
  // -----------------------------------------------------------
  const handleOpenJsonModal = () => {
    const exportData = {
      _rules: [
        "📌 BALKAN YOL EKİBİ - BÜTÇE & DEFTERDARLIK JSON",
        "1. expenses: Tüm harcama kalemleri (uçak, otel, harç, yol üstü harcamalar).",
        "2. paidBy: Harcamayı ödeyen üye ('mert', 'ikra', 'fatih', 'eyup').",
        "3. splitBetween: Harcamanın bölüşüleceği üyeler dizisi.",
        "4. settledShares: Her üyenin kendi payını ödeyip ödemediği (true/false).",
        "5. currency: 'TRY', 'EUR', 'USD', 'ALL', 'MKD' para birimlerinden biri olmalıdır.",
      ],
      fxRates: fxRates,
      expenses,
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
    downloadAnchor.setAttribute("download", `balkan_tatil_harcamalari_${new Date().toISOString().slice(0, 10)}.json`);
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

      if (!parsed.expenses || !Array.isArray(parsed.expenses)) {
        throw new Error("JSON formatında 'expenses' listesi bulunamadı.");
      }

      persistExpenses(parsed.expenses);
      setShowJsonModal(false);
      alert("✅ Tüm harcamalar ve kişi tikleri Firestore veritabanına başarıyla senkronize edildi!");
    } catch (err: any) {
      console.error(err);
      setJsonError(err.message || "Geçersiz JSON formatı.");
    }
  };

  return (
    <div className="budget-dossier space-y-8 font-serif text-[#1d211c]">
      {/* Top Header with Sync Badge */}
      <div className="flex flex-col gap-4 border-b-2 border-[#1d211c] pb-5 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            <span className="flex items-center gap-1.5 font-bold uppercase tracking-widest text-[#145c64]">
              <Sparkles size={15} />
              Bâb-ı Âsafî · Defterdarlık & Masârifât Divanı
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
                  <span>Rûznâme Canlı Senkron</span>
                </>
              ) : syncStatus === "connecting" ? (
                <>
                  <Wifi size={12} className="animate-spin" />
                  <span>Hazineye Bağlanıyor...</span>
                </>
              ) : (
                <>
                  <WifiOff size={12} />
                  <span>Kayıt Defteri (Çevrimdışı)</span>
                </>
              )}
            </div>
          </div>

          <h3 className="mt-1 font-display text-2xl sm:text-3xl md:text-4xl text-[#1d211c]">
            Balkan Seferi <em>Defterdarlığı</em> & Masârifât-ı Âmire
          </h3>
          <p className="mt-1 max-w-2xl font-serif text-xs sm:text-sm text-[#49534f]">
            Tüm tutarlar birincil olarak büyük <b>Türk Lirası (₺)</b> cinsinden gösterilir, altlarında döviz ve yerel para karşılıkları yer alır.
          </p>
        </div>
      </div>

      {/* ======================================================= */}
      {/* 🏛️ LIVE EXCHANGE RATES & SOURCE TICKER BAR (SARRAFİYE MASASI) */}
      {/* ======================================================= */}
      <div className="rounded border-2 border-[#145c64] bg-[#f0f6f4] p-3.5 sm:p-5 shadow-[3px_3px_0_#145c64] sm:shadow-[4px_4px_0_#145c64] min-w-0 overflow-hidden">
        <div className="flex flex-col gap-2.5 sm:gap-3 md:flex-row md:items-center md:justify-between border-b border-[#145c64]/20 pb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded bg-[#145c64] text-white">
              <Coins size={15} />
            </div>
            <div>
              <h4 className="font-display text-sm sm:text-lg text-[#1d211c]">
                Canlı Döviz Kurları & Resmî Sarrafiye Pariteleri
              </h4>
              <p className="font-mono text-[9px] sm:text-[10px] text-[#49534f]">
                Tüm tutarlar bu anlık kurlarla Türk Lirası'na (₺) çevrilmektedir · Son Güncelleme: <span className="font-bold text-[#145c64]">{fxLastUpdate}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            <div className="flex items-center gap-1 font-mono text-[9px] sm:text-[10px] font-semibold text-[#145c64] bg-white px-2 py-0.5 sm:px-2.5 sm:py-1 rounded border border-[#145c64]/30">
              <Landmark size={11} className="shrink-0" />
              <span>Canlı API: ExchangeRate-API (TCMB)</span>
            </div>

            <button
              onClick={fetchLiveRates}
              disabled={isFetchingFx}
              title="Kurları güncel API'den yeniden çek"
              className="flex cursor-pointer items-center gap-1 rounded bg-white px-2.5 py-1 font-mono text-[10px] font-bold text-[#145c64] border border-[#145c64]/40 hover:bg-[#145c64] hover:text-white transition-all active:scale-95 disabled:opacity-50"
            >
              <RefreshCw size={11} className={isFetchingFx ? "animate-spin" : ""} />
              <span>{isFetchingFx ? "Çekiliyor..." : "Kurları Yenile"}</span>
            </button>
          </div>
        </div>

        {/* Live Dynamic FX Rate Cards */}
        <div className="mt-3 grid grid-cols-2 gap-1.5 sm:grid-cols-4 sm:gap-3 font-mono text-xs">
          <div className="rounded border border-[#145c64]/25 bg-white p-2 sm:p-2.5 shadow-2xs">
            <div className="flex items-center justify-between text-[#145c64] font-bold text-[10px] sm:text-[11px]">
              <span>💶 EURO (EUR)</span>
              <span className="text-[9px] text-[#68716c]">1 €</span>
            </div>
            <div className="mt-0.5 sm:mt-1 font-display text-base sm:text-xl text-[#1d211c]">
              {fxRates.TRY.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺
            </div>
            <div className="text-[9px] sm:text-[10px] text-[#68716c]">
              1 EUR = {fxRates.TRY.toFixed(2)} TRY
            </div>
          </div>

          <div className="rounded border border-[#145c64]/25 bg-white p-2 sm:p-2.5 shadow-2xs">
            <div className="flex items-center justify-between text-[#145c64] font-bold text-[10px] sm:text-[11px]">
              <span>💵 DOLAR (USD)</span>
              <span className="text-[9px] text-[#68716c]">1 $</span>
            </div>
            <div className="mt-0.5 sm:mt-1 font-display text-base sm:text-xl text-[#1d211c]">
              {(fxRates.TRY / fxRates.USD).toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺
            </div>
            <div className="text-[9px] sm:text-[10px] text-[#68716c]">
              1 EUR = {fxRates.USD.toFixed(2)} USD
            </div>
          </div>

          <div className="rounded border border-[#145c64]/25 bg-white p-2 sm:p-2.5 shadow-2xs">
            <div className="flex items-center justify-between text-[#145c64] font-bold text-[10px] sm:text-[11px]">
              <span>🇲🇰 DİNAR (MKD)</span>
              <span className="text-[9px] text-[#68716c]">100 MKD</span>
            </div>
            <div className="mt-0.5 sm:mt-1 font-display text-base sm:text-xl text-[#1d211c]">
              {((100 * fxRates.TRY) / fxRates.MKD).toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺
            </div>
            <div className="text-[9px] sm:text-[10px] text-[#68716c]">
              1 MKD ≈ {(fxRates.TRY / fxRates.MKD).toFixed(3)} ₺ (1 € ≈ {fxRates.MKD.toFixed(1)} MKD)
            </div>
          </div>

          <div className="rounded border border-[#145c64]/25 bg-white p-2 sm:p-2.5 shadow-2xs">
            <div className="flex items-center justify-between text-[#145c64] font-bold text-[10px] sm:text-[11px]">
              <span>🇦🇱 LEK (ALL)</span>
              <span className="text-[9px] text-[#68716c]">100 ALL</span>
            </div>
            <div className="mt-0.5 sm:mt-1 font-display text-base sm:text-xl text-[#1d211c]">
              {((100 * fxRates.TRY) / fxRates.ALL).toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺
            </div>
            <div className="text-[9px] sm:text-[10px] text-[#68716c]">
              1 ALL ≈ {(fxRates.TRY / fxRates.ALL).toFixed(3)} ₺ (1 € ≈ {fxRates.ALL.toFixed(1)} ALL)
            </div>
          </div>
        </div>
      </div>

      {/* Top Banner: Big TL KPI Cards with Multi-Currency Equivalents Underneath */}
      <div className="grid gap-3 sm:gap-6 md:grid-cols-3">
        {/* Card 1: Settled Paid */}
        <div className="rounded border-2 border-[#145c64] bg-[#f0f6f4] p-3.5 sm:p-5 shadow-[3px_3px_0_#145c64] sm:shadow-[4px_4px_0_#145c64]">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#145c64]">
              ÖDENMİŞ & KAPATILMIŞ PAYLAR
            </span>
            <span className="rounded bg-emerald-700 px-1.5 py-0.2 sm:px-2 sm:py-0.5 font-mono text-[9px] sm:text-[10px] font-bold text-white">
              KAPATILDI
            </span>
          </div>

          <div className="mt-1.5 font-display text-2xl sm:text-4xl text-[#1d211c]">
            {totalSettledAmountTry.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺
          </div>

          {/* Sub-currencies */}
          <div className="mt-1 font-mono text-[10px] sm:text-[11px] font-bold text-[#145c64] bg-white/80 px-2 py-0.5 rounded border border-[#145c64]/20 break-words">
            {getEquivalents(totalSettledAmountTry).subline}
          </div>

          <p className="mt-1.5 font-serif text-[11px] sm:text-xs text-[#49534f]">
            Ekip üyelerinin cebinden ödeyip kendi aralarında kapattığı toplam tutar.
          </p>

          <div className="mt-2.5 border-t border-[#145c64]/20 pt-1.5 font-mono text-[11px] sm:text-xs font-bold text-[#145c64] flex justify-between items-baseline">
            <span>Kişi Başı:</span>
            <span>{(totalSettledAmountTry / 4).toLocaleString("tr-TR", { minimumFractionDigits: 2 })} ₺</span>
          </div>
        </div>

        {/* Card 2: Grand Total */}
        <div className="rounded border-2 border-[#1d211c] bg-[#fffcf3] p-3.5 sm:p-5 shadow-[3px_3px_0_#b54b38] sm:shadow-[4px_4px_0_#b54b38]">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#b54b38]">
              TOPLAM TATİL BÜTÇESİ
            </span>
            <span className="rounded bg-[#1d211c] px-1.5 py-0.2 sm:px-2 sm:py-0.5 font-mono text-[9px] sm:text-[10px] font-bold text-white">
              {expenses.length} KALEM
            </span>
          </div>

          <div className="mt-1.5 font-display text-2xl sm:text-4xl text-[#b54b38]">
            {grandTotalTripTry.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺
          </div>

          {/* Sub-currencies */}
          <div className="mt-1 font-mono text-[10px] sm:text-[11px] font-bold text-[#b54b38] bg-[#fff5f2] px-2 py-0.5 rounded border border-[#b54b38]/20 break-words">
            {getEquivalents(grandTotalTripTry).subline}
          </div>

          <p className="mt-1.5 font-serif text-[11px] sm:text-xs text-[#49534f]">
            Uçaklar, sigorta, çıkış harcı, 7 gece konaklama + tüm saha harcamaları.
          </p>

          <div className="mt-2.5 border-t border-[#cac1ae] pt-1.5 font-mono text-[11px] sm:text-xs font-bold text-[#b54b38] flex justify-between items-baseline">
            <span>Kişi Başı:</span>
            <span>{(grandTotalTripTry / 4).toLocaleString("tr-TR", { minimumFractionDigits: 2 })} ₺ (~{Math.round(convertCurrency(grandTotalTripTry / 4, "TRY", "EUR"))} €)</span>
          </div>
        </div>

        {/* Card 3: Remaining Unsettled */}
        <div className="rounded border-2 border-[#cac1ae] bg-[#fff8f5] p-3.5 sm:p-5 shadow-[3px_3px_0_rgba(29,33,28,0.12)] sm:shadow-[4px_4px_0_rgba(29,33,28,0.12)]">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#38413c]">
              BEKLEYEN / AÇIK PAYLAR
            </span>
            <span className="rounded bg-[#ded5c2] px-1.5 py-0.2 sm:px-2 sm:py-0.5 font-mono text-[9px] sm:text-[10px] font-bold text-[#29312e]">
              ÖDENECEK
            </span>
          </div>

          <div className="mt-1.5 font-display text-2xl sm:text-4xl text-[#1d211c]">
            {totalRemainingUnsettledTry.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺
          </div>

          {/* Sub-currencies */}
          <div className="mt-1 font-mono text-[10px] sm:text-[11px] font-bold text-[#38413c] bg-white/80 px-2 py-0.5 rounded border border-[#cac1ae] break-words">
            {getEquivalents(totalRemainingUnsettledTry).subline}
          </div>

          <p className="mt-1.5 font-serif text-[11px] sm:text-xs text-[#49534f]">
            Henüz ilgili üyelerce ödenmemiş veya onaylanmamış bekleyen bakiye.
          </p>

          <div className="mt-2.5 border-t border-[#b54b38]/20 pt-1.5 font-mono text-[11px] sm:text-xs font-bold text-[#145c64] flex justify-between items-baseline">
            <span>Kişi Başı Kalan:</span>
            <span>{(totalRemainingUnsettledTry / 4).toLocaleString("tr-TR", { minimumFractionDigits: 2 })} ₺</span>
          </div>
        </div>
      </div>

      {/* ======================================================= */}
      {/* ⚖️ MÎZÂN-I AHZ U İTÂ (BORÇ-ALACAK & HESAPLAŞMA) */}
      {/* ======================================================= */}
      <div className="rounded border-2 border-[#1d211c] bg-[#fffcf3] p-5 sm:p-7 shadow-[6px_8px_0_rgba(20,92,100,0.18)]">
        <div className="flex flex-col gap-3 border-b-2 border-[#1d211c] pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#145c64]">
              <ArrowRightLeft size={16} />
              <span>Mîzân-ı Ahz u İtâ · Canlı Borç-Alacak Dengesi</span>
            </div>
            <h3 className="mt-1 font-display text-2xl sm:text-3xl text-[#1d211c]">
              Kim Kime Kaç Para Gönderecek?
            </h3>
            <p className="mt-0.5 font-serif text-xs text-[#49534f]">
              Her neferin cebinden ödediği meblağ ile payına düşen borçlar anında tenzil edilir; IBAN havaleleri hesaplanır.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex cursor-pointer items-center gap-1.5 self-start sm:self-auto rounded bg-[#145c64] px-4 py-2.5 font-mono text-xs font-bold text-white shadow-[3px_3px_0_#b54b38] transition-transform hover:translate-x-0.5 hover:translate-y-0.5 active:scale-95"
          >
            <Plus size={16} />
            <span>+ Masraf-ı Seferiyye Ekle</span>
          </button>
        </div>

        {/* 4 Member Net Balance Cards */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {MEMBERS.map((member) => {
            const net = splitwiseState.netBalanceTry[member.id];
            const isCreditor = net > 1;
            const isDebtor = net < -1;
            const paid = splitwiseState.totalPaidTry[member.id];
            const obligation = splitwiseState.totalObligationTry[member.id];
            const settled = splitwiseState.totalSettledPaidTry[member.id];

            return (
              <div
                key={member.id}
                onClick={() => setActiveTab(member.id)}
                className={`cursor-pointer rounded border-2 p-4 transition-all hover:scale-[1.02] ${
                  activeTab === member.id ? "ring-2 ring-[#145c64] ring-offset-2" : ""
                } ${
                  isCreditor
                    ? "border-emerald-600 bg-emerald-50/70 shadow-[3px_3px_0_#059669]"
                    : isDebtor
                    ? "border-rose-600 bg-rose-50/70 shadow-[3px_3px_0_#e11d48]"
                    : "border-[#cac1ae] bg-[#fbf9f2]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`flex h-7 w-7 items-center justify-center rounded-full text-white font-bold text-xs ${member.bgClass}`}>
                      {member.initial}
                    </div>
                    <span className="font-display text-lg text-[#1d211c]">{member.name}</span>
                  </div>

                  <span className={`rounded px-1.5 py-0.5 font-mono text-[10px] font-bold ${
                    isCreditor ? "bg-emerald-700 text-white" : isDebtor ? "bg-rose-700 text-white" : "bg-stone-200 text-stone-800"
                  }`}>
                    {isCreditor ? "ALACAKLI 🟢 (Matlûb)" : isDebtor ? "BORÇLU 🔴 (Düyûn)" : "DENK ⚪"}
                  </span>
                </div>

                <div className="mt-1 font-mono text-[10px] text-[#8e9893]">{member.badge}</div>

                <div className="mt-3 space-y-1.5 border-t border-[#cac1ae]/40 pt-2 font-mono text-xs">
                  <div>
                    <div className="flex justify-between text-[#49534f]">
                      <span>Cebinden Ödediği:</span>
                      <span className="font-bold text-[#1d211c]">{paid.toLocaleString("tr-TR")} ₺</span>
                    </div>
                    <div className="text-[10px] text-[#8e9893] text-right">
                      ≈ {Math.round(convertCurrency(paid, "TRY", "EUR"))} € · {Math.round(convertCurrency(paid, "TRY", "MKD"))} MKD
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[#49534f]">
                      <span>Toplam Payı:</span>
                      <span>{obligation.toLocaleString("tr-TR")} ₺</span>
                    </div>
                    <div className="text-[10px] text-[#8e9893] text-right">
                      ≈ {Math.round(convertCurrency(obligation, "TRY", "EUR"))} €
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[#49534f]">
                      <span>Kapattığı Pay:</span>
                      <span className="text-emerald-700 font-semibold">{settled.toLocaleString("tr-TR")} ₺</span>
                    </div>
                  </div>

                  <div className="pt-1.5 border-t border-[#cac1ae]/40">
                    <div className="flex justify-between font-bold text-sm">
                      <span>Net Kalan:</span>
                      <span className={isCreditor ? "text-emerald-700 font-bold" : isDebtor ? "text-rose-700 font-bold" : "text-stone-700"}>
                        {isCreditor ? "+" : ""}{net.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺
                      </span>
                    </div>
                    <div className="text-[10px] text-right font-bold text-[#49534f]">
                      {getEquivalents(Math.abs(net)).subline}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Clear Settlement Transfer Instructions */}
        <div className="mt-6 rounded border border-[#145c64]/30 bg-[#f0f6f4] p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <h4 className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#145c64]">
              <TrendingUp size={15} />
              <span>İbân-ı Şerîf Havale Talimatı ({splitwiseState.simplifiedDebts.length} Açık Havale)</span>
            </h4>
            <span className="font-mono text-[11px] text-[#49534f]">
              (Tikler değiştikçe mizan anında yenilenir)
            </span>
          </div>

          {splitwiseState.simplifiedDebts.length === 0 ? (
            <div className="mt-3 flex items-center gap-2 rounded bg-emerald-100 p-3 text-xs font-mono text-emerald-900 border border-emerald-300">
              <CheckCircle2 size={16} className="text-emerald-700 shrink-0" />
              <span>Harika! Şu an tüm ekibin borç-alacak hesapları kapalıdır. Kimsenin kimseye transfer göndermesi gerekmemektedir.</span>
            </div>
          ) : (
            <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {splitwiseState.simplifiedDebts.map((tx, idx) => {
                const fromMember = MEMBERS.find((m) => m.id === tx.from);
                const toMember = MEMBERS.find((m) => m.id === tx.to);
                const eq = getEquivalents(tx.amountTry);

                return (
                  <div
                    key={idx}
                    className="flex flex-col gap-1 rounded border border-[#145c64]/30 bg-white p-3 shadow-xs font-mono text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-100 text-rose-800 font-bold text-[11px]">
                          {fromMember?.initial}
                        </div>
                        <span className="font-bold text-[#1d211c]">{fromMember?.name}</span>
                        <span className="text-[#8e9893]">➔</span>
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px]">
                          {toMember?.initial}
                        </div>
                        <span className="font-bold text-[#1d211c]">{toMember?.name}</span>
                      </div>

                      <span className="font-mono text-base font-bold text-[#b54b38]">
                        {tx.amountTry.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺
                      </span>
                    </div>

                    <div className="text-right text-[10px] text-[#68716c] font-mono border-t border-stone-100 pt-1">
                      {eq.subline}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ======================================================= */}
      {/* 📋 UNIFIED "TATİL HARCAMA" TABLE (BIG TL + EQUIVALENTS) */}
      {/* ======================================================= */}
      <div className="rounded border-2 border-[#1d211c] bg-[#fffcf3] p-5 sm:p-7 shadow-[8px_10px_0_rgba(29,33,28,0.18)]">
        <div className="flex flex-col gap-3 border-b-2 border-[#1d211c] pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#b54b38]">
              <Receipt size={16} />
              <span>Birleşik Kasa Kayıt Defteri</span>
            </div>
            <h3 className="mt-1 font-display text-2xl sm:text-3xl text-[#1d211c] tracking-wide">
              TATİL HARCAMA
            </h3>
            <p className="font-serif text-xs text-[#5b6560]">
              Tüm harcamalar büyük <b>TL (₺)</b> tutarında gösterilir; altlarında yabancı para karşılıkları mevcuttur.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAddModal(true)}
              className="flex cursor-pointer items-center gap-1.5 rounded bg-[#145c64] px-3.5 py-2 font-mono text-xs font-bold text-white shadow-[2px_2px_0_#b54b38] hover:bg-[#0f464c] active:scale-95 transition-all"
            >
              <Plus size={15} />
              <span>Yeni Harcama Ekle</span>
            </button>
          </div>
        </div>

        {/* Member Filter Tabs (Mobile Scrollable Pill Bar) */}
        <div className="mt-4 flex items-center gap-1.5 overflow-x-auto border-b border-[#cac1ae] pb-2 text-xs no-scrollbar">
          <button
            onClick={() => setActiveTab("all")}
            className={`shrink-0 cursor-pointer rounded-t px-3 py-1.5 font-mono text-xs font-bold transition-all ${
              activeTab === "all"
                ? "border-2 border-b-0 border-[#1d211c] bg-[#f5f0e5] text-[#145c64] shadow-2xs"
                : "text-[#5b6560] hover:bg-[#f0ece1]"
            }`}
          >
            🌟 Tüm Ekip ({expenses.length})
          </button>

          {MEMBERS.map((m) => {
            const count = expenses.filter((e) => e.paidBy === m.id || e.splitBetween.includes(m.id)).length;
            const isSelected = activeTab === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setActiveTab(m.id)}
                className={`flex shrink-0 cursor-pointer items-center gap-1.5 rounded-t px-2.5 py-1.5 font-mono text-xs transition-all ${
                  isSelected
                    ? "border-2 border-b-0 border-[#1d211c] bg-[#f5f0e5] font-bold text-[#1d211c] shadow-2xs"
                    : "text-[#5b6560] hover:bg-[#f0ece1]"
                }`}
              >
                <span className={`inline-flex h-4 w-4 items-center justify-center rounded-full text-white text-[9px] font-bold ${m.bgClass}`}>
                  {m.initial}
                </span>
                <span>{m.shortName}</span>
                <span className="text-[10px] text-[#8e9893]">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Active Tab Explanation Banner */}
        {activeTab !== "all" && (
          <div className="mt-3 flex items-center justify-between rounded border border-[#145c64]/30 bg-[#f0f6f4] p-2.5 font-mono text-xs text-[#145c64]">
            <div className="flex items-center gap-2">
              <UserCheck size={16} />
              <span>
                <b>{MEMBERS.find((m) => m.id === activeTab)?.name}</b> filtresi aktif. Aşağıdaki kutucukları işaretleyerek paylarınızı kapattığınızı onaylayabilirsiniz.
              </span>
            </div>
            <button
              onClick={() => setActiveTab("all")}
              className="text-[11px] underline hover:text-[#b54b38] cursor-pointer"
            >
              Tüm Listeye Dön
            </button>
          </div>
        )}

        {/* Expense List Items */}
        <div className="mt-4 divide-y divide-[#cac1ae]/50 font-mono text-xs">
          {filteredExpenses.map((item) => {
            const payer = MEMBERS.find((m) => m.id === item.paidBy);
            const splitCount = item.splitBetween.length;
            const itemAmountTry = convertCurrency(item.amount, item.currency, "TRY");
            const perPersonShareTry = itemAmountTry / splitCount;
            const isAllSettled = item.splitBetween.every((m) => !!item.settledShares?.[m]);
            const eqTotal = getEquivalents(itemAmountTry);
            const eqShare = getEquivalents(perPersonShareTry);

            return (
              <div
                key={item.id}
                className={`flex flex-col gap-2.5 py-3.5 px-2.5 rounded transition-colors ${
                  isAllSettled ? "bg-[#f5f0e5]/40 opacity-80" : "hover:bg-[#fdfbf7]"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  {/* Left: Title, Note & Category */}
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-serif text-sm sm:text-base font-bold text-[#1d211c]">
                        {item.title}
                      </span>
                      <span className="rounded bg-[#ded5c2] px-1.5 py-0.2 text-[10px] text-[#29312e] uppercase font-bold">
                        {item.category}
                      </span>
                      {isAllSettled && (
                        <span className="rounded bg-emerald-100 text-emerald-800 border border-emerald-300 px-1.5 py-0.2 text-[10px] font-bold">
                          ✓ TAMAMI KAPATILDI
                        </span>
                      )}
                    </div>

                    <div className="text-[11px] text-[#68716c] font-serif">
                      <span>Ödeyen (Kasa): <b>{payer?.name}</b></span>
                      {item.date && ` • ${item.date}`}
                      {item.note && ` • ${item.note}`}
                      {item.currency !== "TRY" && ` • Orijinal: ${item.amount.toLocaleString("tr-TR")} ${CURRENCY_SYMBOLS[item.currency]}`}
                    </div>
                  </div>

                  {/* Right: Big TL Amount & Equivalents */}
                  <div className="flex items-center justify-between sm:justify-end gap-3">
                    <div className="text-right">
                      {/* Big TL Display */}
                      <div className="font-mono text-base sm:text-lg font-bold text-[#b54b38]">
                        {itemAmountTry.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺
                      </div>

                      {/* Foreign Currencies Line */}
                      <div className="text-[10px] text-[#145c64] font-bold">
                        {eqTotal.subline}
                      </div>

                      {/* Per Person Share */}
                      <div className="text-[11px] text-[#5b6560] mt-0.5">
                        (Kişi Başı: <b>{perPersonShareTry.toLocaleString("tr-TR", { minimumFractionDigits: 2 })} ₺</b> / ~{Math.round(convertCurrency(perPersonShareTry, "TRY", "EUR"))} €)
                      </div>
                    </div>

                    {!item.isInitialFixed && (
                      <button
                        onClick={() => handleDeleteExpense(item.id)}
                        title="Bu harcamayı sil"
                        className="cursor-pointer rounded p-1 text-[#8e9893] hover:bg-rose-50 hover:text-rose-600"
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Bottom: Member Interactive Tick Bubbles */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#cac1ae]/40 pt-2 bg-[#fdfbf7] p-2 rounded">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#49534f]">
                    <Users size={14} className="text-[#145c64]" />
                    <span>{activeTab === "all" ? "Pay Onayları (Tüm Ekip):" : "Kişisel Pay Onayı:"}</span>
                  </div>

                  {/* Member Avatar / Tick Buttons */}
                  <div className="flex flex-wrap items-center gap-2">
                    {(activeTab === "all" ? MEMBERS : MEMBERS.filter((m) => m.id === activeTab)).map((m) => {
                      const isIncluded = item.splitBetween.includes(m.id);
                      if (!isIncluded) {
                        if (activeTab !== "all") {
                          return (
                            <span key={m.id} className="text-[11px] text-stone-400 italic font-serif">
                              (Bu harcamaya dahil değilsiniz)
                            </span>
                          );
                        }
                        return null;
                      }

                      const isSettled = !!item.settledShares?.[m.id];
                      const isPayer = item.paidBy === m.id;

                      return (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => toggleMemberShare(item.id, m.id)}
                          className={`flex cursor-pointer items-center gap-1.5 rounded border px-2.5 py-1 text-xs transition-all ${
                            isSettled
                              ? "border-emerald-600 bg-emerald-50 text-emerald-900 font-bold shadow-xs"
                              : "border-rose-300 bg-rose-50/70 text-rose-800 opacity-90 hover:opacity-100 shadow-2xs"
                          }`}
                          title={`${m.name}: ${isSettled ? "Ödendi / Kapatıldı (Tıkla ve Beklemeye Al)" : "Bekliyor / Borçlu (Tıkla ve Kapat)"}`}
                        >
                          <div className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-white text-[9px] font-bold ${
                            isSettled ? "bg-emerald-600" : "bg-rose-600"
                          }`}>
                            {isSettled ? "✓" : m.initial}
                          </div>
                          <span className="font-bold">{m.shortName}</span>
                          <span className="text-[10px]">
                            {isSettled 
                              ? (isPayer ? "Kendi Payı (Ödendi)" : "Payını Ödedi ✓") 
                              : (isPayer ? "Kendi Payı Bekliyor" : "Payı Bekliyor ○")}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Total Summary Footer */}
        <div className="mt-6 border-t-2 border-[#1d211c] bg-[#f5f0e5] p-4 rounded flex flex-col sm:flex-row items-center justify-between gap-3 font-mono">
          <span className="text-xs uppercase tracking-widest text-[#1d211c] font-bold">
            TOPLAM {filteredExpenses.length} HARCAMA TUTARI
          </span>
          <div className="text-right">
            <div className="text-2xl sm:text-3xl font-bold text-[#b54b38]">
              {filteredExpenses
                .reduce((sum, i) => sum + convertCurrency(i.amount, i.currency, "TRY"), 0)
                .toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{" "}
              ₺
            </div>
            <div className="text-xs font-bold text-[#145c64]">
              {getEquivalents(
                filteredExpenses.reduce((sum, i) => sum + convertCurrency(i.amount, i.currency, "TRY"), 0)
              ).subline}
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================= */}
      {/* 💱 INTERACTIVE SARRAFİYE & DÖVİZ HESAP MAKİNESİ */}
      {/* ======================================================= */}
      <div className="rounded border border-[#29312e]/20 bg-[#fffcf3] p-4 sm:p-6 shadow-[4px_6px_0_rgba(29,33,28,0.12)]">
        <div className="flex flex-col gap-2 border-b border-[#29312e]/15 pb-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-[#145c64] text-white">
              <Calculator size={18} />
            </div>
            <div>
              <h4 className="font-display text-lg sm:text-xl text-[#1d211c]">Sarrafiye & Sikke-i Hümâyûn Ta'şîr Cetveli</h4>
              <p className="font-mono text-[11px] sm:text-xs text-[#68716c]">
                Herhangi bir masrafı girin; 5 ecnebi sikkesindeki karşılığını ve nefer başı hisseyi hesaplayın!
              </p>
            </div>
          </div>
          <span className="font-mono text-xs font-semibold text-[#b54b38] bg-[#fff0ed] px-2.5 py-1 rounded border border-[#b54b38]/20">
            “Sikke-i osmanîde yarım akçe dahi zayi edilmez!”
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
              <option value="TRY">Türk Lirası (₺)</option>
              <option value="EUR">Euro (€)</option>
              <option value="USD">Dolar ($)</option>
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

        {/* 5-Currency Result Cards (Responsive Layout) */}
        <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-5 sm:gap-3">
          {/* Main Primary Card (TL) */}
          <div className="col-span-2 rounded border-2 border-[#145c64] bg-[#f0f6f4] p-3 text-center shadow-xs sm:col-span-1">
            <span className="font-mono text-[9px] font-bold text-[#145c64] uppercase tracking-wider">TÜRK LİRASI (₺)</span>
            <div className="mt-0.5 font-display text-lg sm:text-xl font-bold text-[#1d211c]">{quickConverted.TRY} ₺</div>
            <div className="mt-1 border-t border-[#145c64]/30 pt-1 font-mono text-[10px] sm:text-[11px] font-bold text-[#145c64]">
              Kişi Başı: {quickPerPerson.TRY} ₺
            </div>
          </div>

          <div className="rounded border border-[#cac1ae] bg-[#fdfbf7] p-2.5 text-center">
            <span className="font-mono text-[9px] text-[#68716c] font-semibold">EURO (€)</span>
            <div className="mt-0.5 font-display text-base sm:text-lg text-[#145c64] font-bold">{quickConverted.EUR} €</div>
            <div className="mt-1 border-t border-[#cac1ae]/60 pt-1 font-mono text-[10px] font-bold text-[#b54b38]">
              Kişi: {quickPerPerson.EUR} €
            </div>
          </div>

          <div className="rounded border border-[#cac1ae] bg-[#fdfbf7] p-2.5 text-center">
            <span className="font-mono text-[9px] text-[#68716c] font-semibold">DOLAR ($)</span>
            <div className="mt-0.5 font-display text-base sm:text-lg text-[#1d211c] font-bold">{quickConverted.USD} $</div>
            <div className="mt-1 border-t border-[#cac1ae]/60 pt-1 font-mono text-[10px] font-bold text-[#145c64]">
              Kişi: {quickPerPerson.USD} $
            </div>
          </div>

          <div className="rounded border border-[#cac1ae] bg-[#fdfbf7] p-2.5 text-center">
            <span className="font-mono text-[9px] text-[#68716c] font-semibold">MAKEDON DİNARI</span>
            <div className="mt-0.5 font-display text-base sm:text-lg text-[#1d211c] font-bold">{quickConverted.MKD.toLocaleString()} MKD</div>
            <div className="mt-1 border-t border-[#cac1ae]/60 pt-1 font-mono text-[10px] font-bold text-[#145c64]">
              Kişi: {quickPerPerson.MKD.toLocaleString()} MKD
            </div>
          </div>

          <div className="rounded border border-[#cac1ae] bg-[#fdfbf7] p-2.5 text-center">
            <span className="font-mono text-[9px] text-[#68716c] font-semibold">ARNAVUTLUK LEKİ</span>
            <div className="mt-0.5 font-display text-base sm:text-lg text-[#1d211c] font-bold">{quickConverted.ALL.toLocaleString()} ALL</div>
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
              Tüm bütçe ve harcama kalemlerini JSON formatında görüntüleyebilir, AI'a toplu düzenletip anında DB'ye geri yapıştırabilirsiniz.
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
      {/* ➕ ADD ROAD EXPENSE MODAL */}
      {/* ======================================================= */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg border-2 border-[#1d211c] bg-[#fffcf3] p-6 shadow-[10px_12px_0_rgba(29,33,28,0.3)]">
            <h4 className="font-display text-2xl text-[#1d211c]">
              Yeni Saha Harcaması Ekle
            </h4>
            <p className="mt-1 font-serif text-xs text-[#68716c]">
              Eklenen harcama anında Firebase veritabanına yazılır ve borç-alacak dengesini günceller.
            </p>

            <form onSubmit={handleAddExpense} className="mt-4 space-y-3.5 font-mono text-xs">
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
                    placeholder="Örn: 1500"
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
                    <option value="TRY">Türk Lirası (₺)</option>
                    <option value="EUR">Euro (€)</option>
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
                      {m.shortName}
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
                        {isChecked ? "✓ " : ""}{m.shortName}
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
