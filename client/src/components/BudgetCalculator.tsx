import { useState, useEffect, useMemo, useRef } from "react";
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
  Pencil,
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
  USD: 1.166986,
  TRY: 56.148351,
  MKD: 61.497,
  ALL: 92.451319,
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
  const hasMergedLocalRef = useRef(false);

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
          USD: Number(data.rates.USD) || DEFAULT_FX_RATES.USD,
          TRY: Number(data.rates.TRY) || DEFAULT_FX_RATES.TRY,
          MKD: Number(data.rates.MKD) || DEFAULT_FX_RATES.MKD,
          ALL: Number(data.rates.ALL) || DEFAULT_FX_RATES.ALL,
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

  // Edit Expense Modal States
  const [editingExpense, setEditingExpense] = useState<ExpenseItem | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editAmount, setEditAmount] = useState<number | "">("");
  const [editCurrency, setEditCurrency] = useState<CurrencyKey>("TRY");
  const [editPaidBy, setEditPaidBy] = useState<MemberKey>("fatih");
  const [editSplitBetween, setEditSplitBetween] = useState<MemberKey[]>([]);
  const [editCategory, setEditCategory] = useState<ExpenseItem["category"]>("food");
  const [editDate, setEditDate] = useState("");
  const [editNote, setEditNote] = useState("");

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
            let remoteExpenses = (data.expenses && Array.isArray(data.expenses)) ? data.expenses : [];

            if (!hasMergedLocalRef.current) {
              hasMergedLocalRef.current = true;
              try {
                const localSaved = localStorage.getItem("balkan_unified_expenses_2026");
                if (localSaved) {
                  const parsedLocal: ExpenseItem[] = JSON.parse(localSaved);
                  if (Array.isArray(parsedLocal) && parsedLocal.length > 0) {
                    const remoteIds = new Set(remoteExpenses.map((e: ExpenseItem) => e.id));
                    const missingFromRemote = parsedLocal.filter((l) => !remoteIds.has(l.id));
                    if (missingFromRemote.length > 0) {
                      remoteExpenses = [...missingFromRemote, ...remoteExpenses];
                      setDoc(
                        docRef,
                        {
                          expenses: JSON.parse(JSON.stringify(remoteExpenses)),
                          lastUpdated: new Date().toISOString(),
                        },
                        { merge: true }
                      ).catch((err) => console.warn("Firestore budget merge error:", err));
                    }
                  }
                }
              } catch (mergeErr) {
                console.warn("Local budget merge error:", mergeErr);
              }
            }

            if (remoteExpenses.length > 0) {
              setExpenses(remoteExpenses);
              try {
                localStorage.setItem("balkan_unified_expenses_2026", JSON.stringify(remoteExpenses));
              } catch {}
            }
            if (data.fxRates) {
              setFxRates(data.fxRates);
              try {
                localStorage.setItem("balkan_live_fx_rates_v1", JSON.stringify(data.fxRates));
              } catch {}
            }
            if (data.fxLastUpdate) {
              setFxLastUpdate(data.fxLastUpdate);
              try {
                localStorage.setItem("balkan_live_fx_date_v1", data.fxLastUpdate);
              } catch {}
            }
            setSyncStatus("synced");
          } else {
            // First time init in Firestore
            const initialClean = JSON.parse(JSON.stringify(INITIAL_EXPENSES));
            setDoc(docRef, {
              expenses: initialClean,
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

  const persistExpenses = async (newExpenses: ExpenseItem[], newRates?: Record<CurrencyKey, number>) => {
    // Deep clean data to guarantee no undefined fields in Firestore
    const cleanExpenses: ExpenseItem[] = JSON.parse(JSON.stringify(newExpenses));
    setExpenses(cleanExpenses);
    try {
      localStorage.setItem("balkan_unified_expenses_2026", JSON.stringify(cleanExpenses));
    } catch {}

    try {
      const docRef = doc(db, FIRESTORE_DOC_PATH.collection, FIRESTORE_DOC_PATH.id);
      const payload: any = {
        expenses: cleanExpenses,
        lastUpdated: new Date().toISOString(),
      };
      if (newRates) {
        payload.fxRates = newRates;
      }
      await setDoc(docRef, payload, { merge: true });
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
      note: newNote.trim() || "",
      isInitialFixed: false,
    };

    const updated = [newItem, ...expenses];
    persistExpenses(updated);

    setNewTitle("");
    setNewAmount("");
    setNewNote("");
    setShowAddModal(false);
  };

  const handleDeleteExpense = (id: string) => {
    const toDelete = expenses.find((e) => e.id === id);
    const title = toDelete?.title || "Bu harcama";
    if (!window.confirm(`"${title}" kalemini silmek istediğinize emin misiniz?`)) return;
    const updated = expenses.filter((item) => item.id !== id);
    persistExpenses(updated);
    if (editingExpense && editingExpense.id === id) {
      setEditingExpense(null);
    }
  };

  const handleStartEdit = (item: ExpenseItem) => {
    setEditingExpense(item);
    setEditTitle(item.title);
    setEditAmount(item.amount);
    setEditCurrency(item.currency);
    setEditPaidBy(item.paidBy);
    setEditSplitBetween([...item.splitBetween]);
    setEditCategory(item.category);
    setEditDate(item.date || "");
    setEditNote(item.note || "");
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExpense) return;
    if (!editTitle.trim() || !editAmount || Number(editAmount) <= 0) return;
    if (editSplitBetween.length === 0) {
      alert("Lütfen harcamanın bölüşüleceği en az bir kişi seçin.");
      return;
    }

    const updated = expenses.map((item) => {
      if (item.id === editingExpense.id) {
        const currentSettled = item.settledShares || {};
        const newSettled: Record<MemberKey, boolean> = {
          mert: editSplitBetween.includes("mert") ? (editPaidBy === "mert" ? true : !!currentSettled.mert) : false,
          ikra: editSplitBetween.includes("ikra") ? (editPaidBy === "ikra" ? true : !!currentSettled.ikra) : false,
          fatih: editSplitBetween.includes("fatih") ? (editPaidBy === "fatih" ? true : !!currentSettled.fatih) : false,
          eyup: editSplitBetween.includes("eyup") ? (editPaidBy === "eyup" ? true : !!currentSettled.eyup) : false,
        };

        return {
          ...item,
          title: editTitle.trim(),
          amount: Number(editAmount),
          currency: editCurrency,
          paidBy: editPaidBy,
          splitBetween: editSplitBetween,
          settledShares: newSettled,
          category: editCategory,
          date: editDate.trim() || item.date || new Date().toLocaleDateString("tr-TR", { day: "numeric", month: "long" }),
          note: editNote.trim() || "",
        };
      }
      return item;
    });

    persistExpenses(updated);
    setEditingExpense(null);
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
  }, [expenses, fxRates]);

  // Overall totals in TRY
  const grandTotalTripTry = useMemo(() => {
    return expenses.reduce((sum, item) => sum + convertCurrency(item.amount, item.currency, "TRY"), 0);
  }, [expenses, fxRates]);

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
  }, [expenses, fxRates]);

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

  const handleApplyJsonImport = async () => {
    try {
      setJsonError(null);
      const parsed = JSON.parse(jsonText);

      if (!parsed.expenses || !Array.isArray(parsed.expenses)) {
        throw new Error("JSON formatında 'expenses' listesi bulunamadı.");
      }

      const cleanExpenses: ExpenseItem[] = JSON.parse(JSON.stringify(parsed.expenses));
      let newRates = fxRates;
      if (parsed.fxRates && typeof parsed.fxRates === "object") {
        newRates = { ...DEFAULT_FX_RATES, ...parsed.fxRates };
        setFxRates(newRates);
      }

      await persistExpenses(cleanExpenses, newRates);
      setShowJsonModal(false);
      alert("✅ Tüm harcamalar, kurlar ve kişi onayları Firebase veritabanına başarıyla senkronize edildi!");
    } catch (err: any) {
      console.error(err);
      setJsonError(err.message || "Geçersiz JSON formatı.");
    }
  };


  return (
    <div className="budget-dossier w-full max-w-full overflow-hidden space-y-5 sm:space-y-7 font-serif text-[#1d211c]">
      {/* Top Header with Sync Badge */}
      <div className="flex flex-col gap-3 border-b-2 border-[#1d211c] pb-3 sm:pb-4 md:flex-row md:items-center md:justify-between w-full max-w-full overflow-hidden">
        <div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 font-mono text-xs">
            <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[#145c64] break-words text-[11px] sm:text-xs">
              <Sparkles size={14} className="shrink-0" />
              Bâb-ı Âsafî · Defterdarlık Divanı
            </span>

            {/* Cloud Sync Status Badge */}
            <div className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] sm:text-[11px] font-semibold transition-all shrink-0 ${
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
                  <Wifi size={11} />
                  <span>Canlı Senkron</span>
                </>
              ) : syncStatus === "connecting" ? (
                <>
                  <Wifi size={11} className="animate-spin" />
                  <span>Bağlanıyor...</span>
                </>
              ) : (
                <>
                  <WifiOff size={11} />
                  <span>Kayıt Defteri (Çevrimdışı)</span>
                </>
              )}
            </div>
          </div>

          <h3 className="mt-1 font-display text-xl sm:text-3xl md:text-4xl text-[#1d211c] break-words">
            Balkan Seferi <em>Defterdarlığı</em>
          </h3>
          <p className="mt-0.5 max-w-2xl font-serif text-xs sm:text-sm text-[#49534f]">
            Tüm tutarlar birincil olarak büyük <b>Türk Lirası (₺)</b> cinsinden gösterilir, altlarında döviz ve yerel para karşılıkları yer alır.
          </p>
        </div>
      </div>

      {/* ======================================================= */}
      {/* 🏛️ LIVE EXCHANGE RATES & COMPACT SARRAFİYE CETVELİ (KUR ÇEVİRİCİ) */}
      {/* ======================================================= */}
      <div className="rounded-lg border-2 border-[#145c64] bg-[#f0f6f4] p-3.5 sm:p-5 shadow-[2px_2px_0_#145c64] sm:shadow-[4px_4px_0_#145c64] w-full max-w-full min-w-0 overflow-hidden space-y-4">
        <div className="flex flex-col gap-2 sm:gap-3 md:flex-row md:items-center md:justify-between border-b border-[#145c64]/20 pb-2.5">
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded bg-[#145c64] text-white">
              <Coins size={15} />
            </div>
            <div className="min-w-0">
              <h4 className="font-display text-sm sm:text-lg text-[#1d211c] truncate">
                Canlı Döviz Kurları & Sarrafiye Cetveli
              </h4>
              <p className="font-mono text-[10px] sm:text-[11px] text-[#49534f] truncate">
                Tüm tutarlar bu anlık kurlarla Türk Lirası'na (₺) çevrilir · <span className="font-bold text-[#145c64]">{fxLastUpdate}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 self-start md:self-auto">
            <span className="font-mono text-[9px] sm:text-[10px] font-semibold text-[#b54b38] bg-[#fff0ed] px-2 py-0.5 rounded border border-[#b54b38]/20">
              “Sikke-i osmanîde yarım akçe dahi zayi edilmez!”
            </span>

            <button
              onClick={fetchLiveRates}
              disabled={isFetchingFx}
              title="Kurları güncel API'den yeniden çek"
              className="flex cursor-pointer items-center gap-1 rounded bg-white px-2.5 py-1 font-mono text-[9px] sm:text-[10px] font-bold text-[#145c64] border border-[#145c64]/40 hover:bg-[#145c64] hover:text-white transition-all active:scale-95 disabled:opacity-50"
            >
              <RefreshCw size={10} className={isFetchingFx ? "animate-spin" : ""} />
              <span>{isFetchingFx ? "Çekiliyor..." : "Kurları Yenile"}</span>
            </button>
          </div>
        </div>

        {/* Live Dynamic FX Rate Cards */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3 font-mono text-xs w-full max-w-full">
          <div className="rounded border border-[#145c64]/25 bg-white p-2 sm:p-2.5 shadow-2xs min-w-0">
            <div className="flex items-center justify-between text-[#145c64] font-bold text-[11px] sm:text-xs">
              <span>💶 EURO</span>
              <span className="text-[9px] text-[#68716c]">1 €</span>
            </div>
            <div className="mt-0.5 font-display text-base sm:text-lg text-[#1d211c] font-bold">
              {fxRates.TRY.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺
            </div>
            <div className="text-[9px] text-[#68716c]">
              1 EUR = {fxRates.TRY.toFixed(2)} TRY
            </div>
          </div>

          <div className="rounded border border-[#145c64]/25 bg-white p-2 sm:p-2.5 shadow-2xs min-w-0">
            <div className="flex items-center justify-between text-[#145c64] font-bold text-[11px] sm:text-xs">
              <span>💵 DOLAR</span>
              <span className="text-[9px] text-[#68716c]">1 $</span>
            </div>
            <div className="mt-0.5 font-display text-base sm:text-lg text-[#1d211c] font-bold">
              {(fxRates.TRY / fxRates.USD).toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺
            </div>
            <div className="text-[9px] text-[#68716c]">
              1 USD = {(fxRates.TRY / fxRates.USD).toFixed(2)} TRY
            </div>
          </div>

          <div className="rounded border border-[#145c64]/25 bg-white p-2 sm:p-2.5 shadow-2xs min-w-0">
            <div className="flex items-center justify-between text-[#145c64] font-bold text-[11px] sm:text-xs">
              <span>🇲🇰 DİNAR</span>
              <span className="text-[9px] text-[#68716c]">100 MKD</span>
            </div>
            <div className="mt-0.5 font-display text-base sm:text-lg text-[#1d211c] font-bold">
              {((100 * fxRates.TRY) / fxRates.MKD).toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺
            </div>
            <div className="text-[9px] text-[#68716c]">
              1 MKD ≈ {(fxRates.TRY / fxRates.MKD).toFixed(3)} ₺
            </div>
          </div>

          <div className="rounded border border-[#145c64]/25 bg-white p-2 sm:p-2.5 shadow-2xs min-w-0">
            <div className="flex items-center justify-between text-[#145c64] font-bold text-[11px] sm:text-xs">
              <span>🇦🇱 LEK</span>
              <span className="text-[9px] text-[#68716c]">100 ALL</span>
            </div>
            <div className="mt-0.5 font-display text-base sm:text-lg text-[#1d211c] font-bold">
              {((100 * fxRates.TRY) / fxRates.ALL).toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺
            </div>
            <div className="text-[9px] text-[#68716c]">
              1 ALL ≈ {(fxRates.TRY / fxRates.ALL).toFixed(3)} ₺
            </div>
          </div>
        </div>

        {/* 💱 INTEGRATED COMPACT KUR ÇEVİRİCİ / HESAPLAMA */}
        <div className="border-t border-[#145c64]/20 pt-3">
          <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-[#145c64] mb-2">
            <Calculator size={14} />
            <span>Hızlı Kur & Kişi Başı Hesaplayıcı:</span>
          </div>

          <div className="grid gap-2 sm:grid-cols-3">
            <div>
              <label className="block font-mono text-[10px] sm:text-[11px] font-semibold text-[#29312e]">Harcama Tutarı</label>
              <input
                type="number"
                min="1"
                value={calcAmount}
                onChange={(e) => setCalcAmount(Math.max(0, parseFloat(e.target.value) || 0))}
                className="mt-0.5 w-full rounded border border-[#cac1ae] bg-white px-2.5 py-1.5 font-mono text-sm sm:text-base font-bold text-[#145c64] focus:border-[#145c64] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-mono text-[10px] sm:text-[11px] font-semibold text-[#29312e]">Para Birimi</label>
              <select
                value={calcCurrency}
                onChange={(e) => setCalcCurrency(e.target.value as any)}
                className="mt-0.5 w-full rounded border border-[#cac1ae] bg-white px-2.5 py-1.5 font-mono text-xs sm:text-sm font-semibold text-[#29312e] focus:border-[#145c64] focus:outline-none"
              >
                <option value="TRY">Türk Lirası (₺)</option>
                <option value="EUR">Euro (€)</option>
                <option value="USD">Dolar ($)</option>
                <option value="MKD">Makedon Dinarı (MKD)</option>
                <option value="ALL">Arnavutluk Leki (ALL)</option>
              </select>
            </div>

            <div>
              <label className="block font-mono text-[10px] sm:text-[11px] font-semibold text-[#29312e]">Kişi Sayısı</label>
              <div className="mt-0.5 flex items-center gap-1">
                {[2, 3, 4].map((num) => (
                  <button
                    key={num}
                    onClick={() => setSplitCount(num)}
                    className={`flex-1 cursor-pointer rounded py-1.5 font-mono text-xs font-bold transition-all ${
                      splitCount === num
                        ? "bg-[#145c64] text-white shadow-xs"
                        : "border border-[#cac1ae] bg-white text-[#29312e] hover:bg-[#ded5c2]"
                    }`}
                  >
                    {num} Kişi
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mini 5-Currency Result Strip */}
          <div className="mt-2.5 grid grid-cols-2 gap-1.5 sm:grid-cols-5 sm:gap-2">
            <div className="col-span-2 sm:col-span-1 rounded border-2 border-[#145c64] bg-white p-2 text-center shadow-2xs">
              <span className="font-mono text-[9px] font-bold text-[#145c64] uppercase">TÜRK LİRASI (₺)</span>
              <div className="font-display text-sm sm:text-base font-bold text-[#1d211c]">{quickConverted.TRY} ₺</div>
              <div className="text-[10px] font-mono text-[#145c64] font-bold border-t border-[#145c64]/20 mt-0.5 pt-0.5">
                Kişi Başı: {quickPerPerson.TRY} ₺
              </div>
            </div>

            <div className="rounded border border-[#cac1ae] bg-white p-1.5 text-center">
              <span className="font-mono text-[9px] text-[#68716c] font-semibold">EURO (€)</span>
              <div className="font-display text-xs sm:text-sm text-[#145c64] font-bold">{quickConverted.EUR} €</div>
              <div className="text-[9px] font-mono text-[#b54b38] font-bold border-t border-[#cac1ae]/40 mt-0.5 pt-0.5">
                Kişi: {quickPerPerson.EUR} €
              </div>
            </div>

            <div className="rounded border border-[#cac1ae] bg-white p-1.5 text-center">
              <span className="font-mono text-[9px] text-[#68716c] font-semibold">DOLAR ($)</span>
              <div className="font-display text-xs sm:text-sm text-[#1d211c] font-bold">{quickConverted.USD} $</div>
              <div className="text-[9px] font-mono text-[#145c64] font-bold border-t border-[#cac1ae]/40 mt-0.5 pt-0.5">
                Kişi: {quickPerPerson.USD} $
              </div>
            </div>

            <div className="rounded border border-[#cac1ae] bg-white p-1.5 text-center">
              <span className="font-mono text-[9px] text-[#68716c] font-semibold">DİNAR (MKD)</span>
              <div className="font-display text-xs sm:text-sm text-[#1d211c] font-bold">{quickConverted.MKD.toLocaleString()}</div>
              <div className="text-[9px] font-mono text-[#145c64] font-bold border-t border-[#cac1ae]/40 mt-0.5 pt-0.5">
                Kişi: {quickPerPerson.MKD.toLocaleString()}
              </div>
            </div>

            <div className="rounded border border-[#cac1ae] bg-white p-1.5 text-center">
              <span className="font-mono text-[9px] text-[#68716c] font-semibold">LEK (ALL)</span>
              <div className="font-display text-xs sm:text-sm text-[#1d211c] font-bold">{quickConverted.ALL.toLocaleString()}</div>
              <div className="text-[9px] font-mono text-[#145c64] font-bold border-t border-[#cac1ae]/40 mt-0.5 pt-0.5">
                Kişi: {quickPerPerson.ALL.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Clean Grand Total Trip Budget Summary (Without duplicate paid/open shares) */}
      <div className="rounded-lg border-2 border-[#1d211c] bg-[#fffcf3] p-3.5 sm:p-5 shadow-[2px_2px_0_#b54b38] sm:shadow-[4px_4px_0_#b54b38] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 w-full max-w-full min-w-0">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#b54b38]">
              TOPLAM TATİL BÜTÇESİ
            </span>
            <span className="rounded bg-[#1d211c] px-2 py-0.5 font-mono text-[9px] sm:text-[10px] font-bold text-white">
              {expenses.length} KALEM HARCAMA
            </span>
          </div>

          <div className="mt-1 font-display text-2xl sm:text-3xl lg:text-4xl text-[#b54b38] font-bold leading-tight break-words">
            {grandTotalTripTry.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺
          </div>

          <div className="mt-1 font-mono text-[10px] sm:text-xs font-bold text-[#145c64] break-words">
            {getEquivalents(grandTotalTripTry).subline}
          </div>
          <p className="mt-1 font-serif text-xs text-[#49534f]">
            Uçaklar, sigorta, çıkış harcı, 7 gece konaklama ve tüm ortak yol masrafları dahil genel bütçe.
          </p>
        </div>

        <div className="bg-[#ede6d6] border border-[#cac1ae] p-3 rounded-lg font-mono text-xs text-left sm:text-right shrink-0 w-full sm:w-auto shadow-2xs">
          <span className="text-[10px] text-[#68716c] uppercase block font-bold">Kişi Başı Düşen Toplam Bütçe</span>
          <span className="text-lg sm:text-xl font-bold text-[#145c64] block mt-0.5">
            {(grandTotalTripTry / 4).toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺
          </span>
          <span className="text-[11px] font-semibold text-[#b54b38] block mt-0.5">
            ≈ {Math.round(convertCurrency(grandTotalTripTry / 4, "TRY", "EUR"))} € / kişi
          </span>
        </div>
      </div>

      {/* ======================================================= */}
      {/* ⚖️ MÎZÂN-I AHZ U İTÂ (BORÇ-ALACAK & HESAPLAŞMA) */}
      {/* ======================================================= */}
      <div className="rounded-lg border-2 border-[#1d211c] bg-[#fffcf3] p-3.5 sm:p-6 lg:p-7 shadow-[2px_2px_0_rgba(20,92,100,0.18)] sm:shadow-[6px_8px_0_rgba(20,92,100,0.18)] w-full max-w-full min-w-0 overflow-hidden">
        <div className="flex flex-col gap-3 border-b-2 border-[#1d211c] pb-3 sm:flex-row sm:items-center sm:justify-between w-full min-w-0">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#145c64]">
              <ArrowRightLeft size={15} className="shrink-0" />
              <span className="truncate">Mîzân-ı Ahz u İtâ · Canlı Borç-Alacak Dengesi</span>
            </div>
            <h3 className="mt-0.5 font-display text-xl sm:text-2xl lg:text-3xl text-[#1d211c] break-words">
              Kim Kime Kaç Para Gönderecek?
            </h3>
            <p className="mt-0.5 font-serif text-xs text-[#49534f]">
              Her neferin cebinden ödediği meblağ ile payına düşen borçlar anında tenzil edilir; IBAN havaleleri hesaplanır.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex cursor-pointer items-center gap-1.5 self-start sm:self-auto rounded bg-[#145c64] px-4 py-2 font-mono text-xs font-bold text-white shadow-[2px_2px_0_#b54b38] transition-transform hover:translate-x-0.5 hover:translate-y-0.5 active:scale-95 shrink-0"
          >
            <Plus size={15} />
            <span>Harcama Ekle</span>
          </button>
        </div>

        {/* 4 Member Net Balance Cards */}
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 w-full max-w-full min-w-0">
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
                className={`cursor-pointer rounded-lg border-2 p-3 sm:p-3.5 transition-all w-full max-w-full min-w-0 overflow-hidden hover:scale-[1.01] ${
                  activeTab === member.id ? "ring-2 ring-[#145c64] ring-offset-2" : ""
                } ${
                  isCreditor
                    ? "border-emerald-600 bg-emerald-50/70 shadow-[2px_2px_0_#059669]"
                    : isDebtor
                    ? "border-rose-600 bg-rose-50/70 shadow-[2px_2px_0_#e11d48]"
                    : "border-[#cac1ae] bg-[#fbf9f2]"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-1">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <div className={`flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-full text-white font-bold text-xs ${member.bgClass}`}>
                      {member.initial}
                    </div>
                    <span className="font-display text-base sm:text-lg text-[#1d211c] font-bold truncate">{member.name}</span>
                  </div>

                  <span className={`rounded px-1.5 py-0.5 font-mono text-[9px] sm:text-[10px] font-bold shrink-0 ${
                    isCreditor ? "bg-emerald-700 text-white" : isDebtor ? "bg-rose-700 text-white" : "bg-stone-200 text-stone-800"
                  }`}>
                    {isCreditor ? "ALACAKLI 🟢" : isDebtor ? "BORÇLU 🔴" : "DENK ⚪"}
                  </span>
                </div>

                <div className="mt-0.5 font-mono text-[10px] text-[#8e9893] truncate">{member.badge}</div>

                <div className="mt-2.5 space-y-1 border-t border-[#cac1ae]/40 pt-2 font-mono text-xs w-full min-w-0">
                  <div className="flex justify-between items-baseline gap-1 text-[#49534f]">
                    <span className="text-[11px]">Cebinden Ödenen:</span>
                    <span className="font-bold text-[#1d211c] text-xs">{paid.toLocaleString("tr-TR")} ₺</span>
                  </div>

                  <div className="flex justify-between items-baseline gap-1 text-[#49534f]">
                    <span className="text-[11px]">Kişisel Toplam Pay:</span>
                    <span className="text-xs">{obligation.toLocaleString("tr-TR")} ₺</span>
                  </div>

                  <div className="flex justify-between items-baseline gap-1 text-[#49534f]">
                    <span className="text-[11px]">Kapatılan Pay:</span>
                    <span className="text-emerald-700 font-semibold text-xs">{settled.toLocaleString("tr-TR")} ₺</span>
                  </div>

                  <div className="pt-1.5 border-t border-[#cac1ae]/40">
                    <div className="flex justify-between items-baseline gap-1 font-bold text-xs sm:text-sm">
                      <span>Net Durum:</span>
                      <span className={isCreditor ? "text-emerald-700 font-bold" : isDebtor ? "text-rose-700 font-bold" : "text-stone-700"}>
                        {isCreditor ? "+" : ""}{net.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺
                      </span>
                    </div>
                    <div className="text-[9px] sm:text-[10px] text-right font-bold text-[#49534f] break-words mt-0.5">
                      {getEquivalents(Math.abs(net)).subline}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Clear Settlement Transfer Instructions */}
        <div className="mt-4 sm:mt-5 rounded-lg border border-[#145c64]/30 bg-[#f0f6f4] p-3 sm:p-4 lg:p-5 w-full max-w-full min-w-0 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
            <h4 className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#145c64]">
              <TrendingUp size={14} className="shrink-0" />
              <span>İbân-ı Şerîf Havale Talimatı ({splitwiseState.simplifiedDebts.length} Açık Havale)</span>
            </h4>
            <span className="font-mono text-[10px] sm:text-[11px] text-[#49534f]">
              (Tikler değiştikçe borç-alacak anında yenilenir)
            </span>
          </div>

          {splitwiseState.simplifiedDebts.length === 0 ? (
            <div className="mt-2.5 flex items-center gap-2 rounded bg-emerald-100 p-2.5 text-xs font-mono text-emerald-900 border border-emerald-300">
              <CheckCircle2 size={15} className="text-emerald-700 shrink-0" />
              <span>Harika! Şu an tüm ekibin borç-alacak hesapları kapalıdır. Kimsenin transfer göndermesi gerekmemektedir.</span>
            </div>
          ) : (
            <div className="mt-3 grid gap-2 sm:grid-cols-2 w-full max-w-full min-w-0">
              {splitwiseState.simplifiedDebts.map((tx, idx) => {
                const fromMember = MEMBERS.find((m) => m.id === tx.from);
                const toMember = MEMBERS.find((m) => m.id === tx.to);
                const eq = getEquivalents(tx.amountTry);

                return (
                  <div
                    key={idx}
                    className="flex flex-col gap-1 rounded-md border border-[#145c64]/30 bg-white p-2.5 sm:p-3 shadow-xs font-mono text-xs w-full min-w-0 overflow-hidden"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-1.5">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-rose-100 text-rose-800 font-bold text-[10px] shrink-0">
                          {fromMember?.initial}
                        </div>
                        <span className="font-bold text-[#1d211c] text-xs truncate">{fromMember?.shortName}</span>
                        <span className="text-[#8e9893]">➔</span>
                        <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] shrink-0">
                          {toMember?.initial}
                        </div>
                        <span className="font-bold text-[#1d211c] text-xs truncate">{toMember?.shortName}</span>
                      </div>

                      <span className="font-mono text-sm sm:text-base font-bold text-[#b54b38] shrink-0">
                        {tx.amountTry.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺
                      </span>
                    </div>

                    <div className="text-right text-[9px] sm:text-[10px] text-[#68716c] font-mono border-t border-stone-100 pt-1 break-words">
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
      {/* 📋 UNIFIED "TATİL HARCAMA" TABLE (BIG TL + EQUIVALENTS + EDIT/DELETE) */}
      {/* ======================================================= */}
      <div className="rounded-lg border-2 border-[#1d211c] bg-[#fffcf3] p-3.5 sm:p-6 lg:p-7 shadow-[2px_2px_0_rgba(29,33,28,0.18)] sm:shadow-[8px_10px_0_rgba(29,33,28,0.18)] w-full max-w-full min-w-0 overflow-hidden">
        <div className="flex flex-col gap-2.5 border-b-2 border-[#1d211c] pb-3 sm:flex-row sm:items-center sm:justify-between w-full min-w-0">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#b54b38]">
              <Receipt size={15} className="shrink-0" />
              <span className="truncate">Birleşik Kasa Kayıt Defteri</span>
            </div>
            <h3 className="mt-0.5 font-display text-xl sm:text-2xl lg:text-3xl text-[#1d211c] tracking-wide break-words">
              TATİL HARCAMA DEFTERİ
            </h3>
            <p className="font-serif text-xs text-[#5b6560]">
              Tüm harcamalar düzenlenebilir ve silinebilir; tutarlar büyük <b>TL (₺)</b> cinsinden gösterilir.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
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
        <div className="mt-3 flex items-center gap-1.5 overflow-x-auto border-b border-[#cac1ae] pb-2 text-xs no-scrollbar w-full max-w-full">
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
                <span className={`inline-flex h-3.5 w-3.5 items-center justify-center rounded-full text-white text-[8px] font-bold ${m.bgClass}`}>
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
          <div className="mt-2.5 flex items-center justify-between rounded border border-[#145c64]/30 bg-[#f0f6f4] p-2 sm:p-2.5 font-mono text-xs text-[#145c64]">
            <div className="flex items-center gap-1.5 min-w-0">
              <UserCheck size={15} className="shrink-0" />
              <span className="truncate">
                <b>{MEMBERS.find((m) => m.id === activeTab)?.name}</b> filtresi aktif.
              </span>
            </div>
            <button
              onClick={() => setActiveTab("all")}
              className="text-[11px] underline hover:text-[#b54b38] cursor-pointer shrink-0 ml-2 font-bold"
            >
              Tüm Liste
            </button>
          </div>
        )}

        {/* Expense List Items */}
        <div className="mt-3 divide-y divide-[#cac1ae]/50 font-mono text-xs w-full max-w-full min-w-0">
          {filteredExpenses.length === 0 ? (
            <div className="py-8 text-center text-stone-500 font-serif text-sm">
              Bu filtreye ait harcama kaydı bulunamadı.
            </div>
          ) : (
            filteredExpenses.map((item) => {
              const payer = MEMBERS.find((m) => m.id === item.paidBy);
              const splitCount = item.splitBetween.length;
              const itemAmountTry = convertCurrency(item.amount, item.currency, "TRY");
              const perPersonShareTry = itemAmountTry / (splitCount || 1);
              const isAllSettled = item.splitBetween.every((m) => !!item.settledShares?.[m]);
              const eqTotal = getEquivalents(itemAmountTry);

              return (
                <div
                  key={item.id}
                  className={`flex flex-col gap-2.5 py-3.5 px-2 sm:px-3 rounded-lg transition-colors w-full max-w-full min-w-0 overflow-hidden ${
                    isAllSettled ? "bg-[#f5f0e5]/40 opacity-90" : "hover:bg-[#fdfbf7]"
                  }`}
                >
                  {/* Top Row: Title, Badges & Action Buttons */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 w-full min-w-0">
                    {/* Left: Title, Note & Category */}
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-serif text-sm sm:text-base font-bold text-[#1d211c] break-words">
                          {item.title}
                        </span>
                        <span className="rounded bg-[#ded5c2] px-1.5 py-0.5 text-[9px] sm:text-[10px] text-[#29312e] uppercase font-bold shrink-0">
                          {item.category}
                        </span>
                        {isAllSettled && (
                          <span className="rounded bg-emerald-100 text-emerald-800 border border-emerald-300 px-1.5 py-0.5 text-[9px] sm:text-[10px] font-bold shrink-0">
                            ✓ KAPATILDI
                          </span>
                        )}
                      </div>

                      <div className="text-[11px] sm:text-xs text-[#68716c] font-serif break-words">
                        <span>Ödeyen: <b className="text-[#1d211c]">{payer?.name}</b></span>
                        {item.date && ` • ${item.date}`}
                        {item.note && ` • ${item.note}`}
                        {item.currency !== "TRY" && (
                          <span className="text-[#145c64] font-semibold">
                            {` • (${item.amount.toLocaleString("tr-TR")} ${CURRENCY_SYMBOLS[item.currency]})`}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Right: Big TL Display & Edit/Delete Buttons */}
                    <div className="flex items-start justify-between sm:justify-end gap-3 shrink-0 pt-1 sm:pt-0">
                      <div className="text-left sm:text-right">
                        {/* Big TL Display */}
                        <div className="font-mono text-base sm:text-lg lg:text-xl font-bold text-[#b54b38]">
                          {itemAmountTry.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₺
                        </div>

                        {/* Foreign Currencies Line */}
                        <div className="text-[10px] sm:text-[11px] text-[#145c64] font-bold break-words">
                          {eqTotal.subline}
                        </div>

                        {/* Per Person Share */}
                        <div className="text-[10px] sm:text-[11px] text-[#5b6560] mt-0.5">
                          (Kişi Başı: <b>{perPersonShareTry.toLocaleString("tr-TR", { minimumFractionDigits: 2 })} ₺</b>)
                        </div>
                      </div>

                      {/* Edit & Delete Action Buttons */}
                      <div className="flex items-center gap-1 shrink-0 self-center sm:self-start">
                        <button
                          onClick={() => handleStartEdit(item)}
                          title="Harcamayı düzenle"
                          className="cursor-pointer rounded-md p-1.5 text-[#145c64] bg-[#f0f6f4] hover:bg-[#145c64] hover:text-white border border-[#145c64]/30 transition-colors shrink-0"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteExpense(item.id)}
                          title="Harcamayı sil"
                          className="cursor-pointer rounded-md p-1.5 text-rose-700 bg-rose-50 hover:bg-rose-600 hover:text-white border border-rose-200 transition-colors shrink-0"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Bottom: Member Interactive Tick Bubbles */}
                  <div className="flex flex-wrap items-center justify-between gap-1.5 border-t border-[#cac1ae]/40 pt-2 bg-[#fdfbf7] p-2 rounded-md w-full min-w-0">
                    <div className="flex items-center gap-1 text-[11px] font-semibold text-[#49534f] shrink-0">
                      <Users size={13} className="text-[#145c64]" />
                      <span>{activeTab === "all" ? "Pay Onayları:" : "Kişisel Pay Onayı:"}</span>
                    </div>

                    {/* Member Avatar / Tick Buttons */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      {(activeTab === "all" ? MEMBERS : MEMBERS.filter((m) => m.id === activeTab)).map((m) => {
                        const isIncluded = item.splitBetween.includes(m.id);
                        if (!isIncluded) {
                          if (activeTab !== "all") {
                            return (
                              <span key={m.id} className="text-[11px] text-stone-400 italic font-serif">
                                (Dahil değil)
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
                            className={`flex cursor-pointer items-center gap-1.5 rounded-md border px-2 py-1 text-[10px] sm:text-xs transition-all ${
                              isSettled
                                ? "border-emerald-600 bg-emerald-50 text-emerald-900 font-bold shadow-xs"
                                : "border-rose-300 bg-rose-50/80 text-rose-800 hover:bg-rose-100 shadow-2xs"
                            }`}
                            title={`${m.name}: ${isSettled ? "Ödendi / Kapatıldı" : "Bekliyor"}`}
                          >
                            <div className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full text-white text-[8px] font-bold ${
                              isSettled ? "bg-emerald-600" : "bg-rose-600"
                            }`}>
                              {isSettled ? "✓" : m.initial}
                            </div>
                            <span className="font-bold">{m.shortName}</span>
                            <span className="text-[9px] sm:text-[10px]">
                              {isSettled 
                                ? (isPayer ? "Kendi Payı ✓" : "Ödedi ✓") 
                                : (isPayer ? "Kendi Payı ○" : "Bekliyor ○")}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Total Summary Footer */}
        <div className="mt-5 border-t-2 border-[#1d211c] bg-[#f5f0e5] p-3 sm:p-4 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-2 font-mono w-full min-w-0">
          <span className="text-xs uppercase tracking-widest text-[#1d211c] font-bold">
            TOPLAM {filteredExpenses.length} HARCAMA
          </span>
          <div className="text-center sm:text-right">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#b54b38]">
              {filteredExpenses
                .reduce((sum, i) => sum + convertCurrency(i.amount, i.currency, "TRY"), 0)
                .toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{" "}
              ₺
            </div>
            <div className="text-[10px] sm:text-xs font-bold text-[#145c64] break-words">
              {getEquivalents(
                filteredExpenses.reduce((sum, i) => sum + convertCurrency(i.amount, i.currency, "TRY"), 0)
              ).subline}
            </div>
          </div>
        </div>
      </div>

      {/* Developer & AI JSON Manager Panel */}
      <div className="rounded-lg border-2 border-dashed border-[#145c64]/40 bg-[#f4f8f7] p-3.5 sm:p-5">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-3 sm:p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-lg border-2 border-[#1d211c] bg-[#fffcf3] p-4 sm:p-6 shadow-[10px_12px_0_rgba(29,33,28,0.3)]">
            <h4 className="font-display text-xl sm:text-2xl text-[#1d211c]">
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
                  className="mt-1 w-full rounded border border-[#cac1ae] bg-white p-2 text-sm text-[#1d211c] focus:border-[#145c64] focus:outline-none"
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
                    className="mt-1 w-full rounded border border-[#cac1ae] bg-white p-2 text-sm font-bold text-[#145c64] focus:border-[#145c64] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#29312e]">Para Birimi</label>
                  <select
                    value={newCurrency}
                    onChange={(e) => setNewCurrency(e.target.value as CurrencyKey)}
                    className="mt-1 w-full rounded border border-[#cac1ae] bg-white p-2 text-xs"
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
                      className={`cursor-pointer rounded-md border p-2 text-center text-xs font-bold transition-all ${
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
                        className={`cursor-pointer rounded-md border p-2 text-center text-xs transition-all ${
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
                  className="mt-1 w-full rounded border border-[#cac1ae] bg-white p-2 text-xs"
                >
                  <option value="food">🍽️ Yeme & İçme (Restoran / Kafe)</option>
                  <option value="fuel">🚗 Yakıt & Otopark & Sınır</option>
                  <option value="activity">🏛️ Müze & Plaj & Tekne Turu</option>
                  <option value="market">🛒 Market & Su & Atıştırmalık</option>
                  <option value="stay">🏠 Konaklama & Ekstra Oda Payı</option>
                  <option value="tax">🛂 Vergi & Harç & Sigorta</option>
                  <option value="flight">✈️ Uçuş & Ulaşım</option>
                  <option value="other">⚡ Diğer Ortak Harcama</option>
                </select>
              </div>

              {/* Note */}
              <div>
                <label className="block font-semibold text-[#29312e]">Not / Açıklama (Opsiyonel)</label>
                <input
                  type="text"
                  placeholder="Ekstra detay veya açıklama..."
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  className="mt-1 w-full rounded border border-[#cac1ae] bg-white p-2 text-xs text-[#1d211c] focus:border-[#145c64] focus:outline-none"
                />
              </div>

              {/* Form Buttons */}
              <div className="mt-5 flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="cursor-pointer rounded border border-[#cac1ae] bg-[#e9e2d1] px-4 py-2 font-mono text-xs text-[#29312e]"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="cursor-pointer rounded bg-[#145c64] px-5 py-2 font-mono text-xs font-bold text-white shadow-[3px_3px_0_#b54b38] hover:bg-[#0f464c]"
                >
                  Kaydet & DB'ye Ekle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================= */}
      {/* ✏️ EDIT EXPENSE MODAL */}
      {/* ======================================================= */}
      {editingExpense && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-3 sm:p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-lg border-2 border-[#145c64] bg-[#fffcf3] p-4 sm:p-6 shadow-[10px_12px_0_rgba(20,92,100,0.3)]">
            <div className="flex items-center justify-between border-b border-[#145c64]/20 pb-2">
              <div>
                <h4 className="font-display text-xl sm:text-2xl text-[#1d211c]">
                  Harcamayı Düzenle
                </h4>
                <p className="mt-0.5 font-serif text-xs text-[#68716c]">
                  Değişiklikler anında Firebase veritabanına ve borç-alacak tablosuna yansıtılır.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEditingExpense(null)}
                className="rounded p-1 text-stone-400 hover:text-stone-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="mt-4 space-y-3.5 font-mono text-xs">
              {/* Title */}
              <div>
                <label className="block font-semibold text-[#29312e]">Harcama Başlığı / Açıklama</label>
                <input
                  type="text"
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="mt-1 w-full rounded border border-[#cac1ae] bg-white p-2 text-sm text-[#1d211c] focus:border-[#145c64] focus:outline-none"
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
                    value={editAmount}
                    onChange={(e) => setEditAmount(e.target.value === "" ? "" : parseFloat(e.target.value))}
                    className="mt-1 w-full rounded border border-[#cac1ae] bg-white p-2 text-sm font-bold text-[#145c64] focus:border-[#145c64] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#29312e]">Para Birimi</label>
                  <select
                    value={editCurrency}
                    onChange={(e) => setEditCurrency(e.target.value as CurrencyKey)}
                    className="mt-1 w-full rounded border border-[#cac1ae] bg-white p-2 text-xs"
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
                      onClick={() => setEditPaidBy(m.id)}
                      className={`cursor-pointer rounded-md border p-2 text-center text-xs font-bold transition-all ${
                        editPaidBy === m.id
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
                    const isChecked = editSplitBetween.includes(m.id);
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => {
                          if (isChecked) {
                            if (editSplitBetween.length > 1) {
                              setEditSplitBetween(editSplitBetween.filter((id) => id !== m.id));
                            }
                          } else {
                            setEditSplitBetween([...editSplitBetween, m.id]);
                          }
                        }}
                        className={`cursor-pointer rounded-md border p-2 text-center text-xs transition-all ${
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

              {/* Category & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-[#29312e]">Kategori</label>
                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value as any)}
                    className="mt-1 w-full rounded border border-[#cac1ae] bg-white p-2 text-xs"
                  >
                    <option value="food">🍽️ Yeme & İçme (Restoran / Kafe)</option>
                    <option value="fuel">🚗 Yakıt & Otopark & Sınır</option>
                    <option value="activity">🏛️ Müze & Plaj & Tekne Turu</option>
                    <option value="market">🛒 Market & Su & Atıştırmalık</option>
                    <option value="stay">🏠 Konaklama & Ekstra Oda Payı</option>
                    <option value="tax">🛂 Vergi & Harç & Sigorta</option>
                    <option value="flight">✈️ Uçuş & Ulaşım</option>
                    <option value="other">⚡ Diğer Ortak Harcama</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#29312e]">Tarih</label>
                  <input
                    type="text"
                    placeholder="Örn: 30 Ağustos"
                    value={editDate}
                    onChange={(e) => setEditDate(e.target.value)}
                    className="mt-1 w-full rounded border border-[#cac1ae] bg-white p-2 text-xs text-[#1d211c] focus:border-[#145c64] focus:outline-none"
                  />
                </div>
              </div>

              {/* Note */}
              <div>
                <label className="block font-semibold text-[#29312e]">Not / Açıklama</label>
                <input
                  type="text"
                  placeholder="Ekstra detay..."
                  value={editNote}
                  onChange={(e) => setEditNote(e.target.value)}
                  className="mt-1 w-full rounded border border-[#cac1ae] bg-white p-2 text-xs text-[#1d211c] focus:border-[#145c64] focus:outline-none"
                />
              </div>

              {/* Modal Actions */}
              <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-[#cac1ae]/40 pt-3">
                <button
                  type="button"
                  onClick={() => handleDeleteExpense(editingExpense.id)}
                  className="flex items-center gap-1.5 rounded bg-rose-50 px-3 py-2 text-xs font-bold text-rose-700 border border-rose-300 hover:bg-rose-600 hover:text-white transition-colors cursor-pointer"
                >
                  <Trash2 size={14} />
                  <span>Harcamayı Sil</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingExpense(null)}
                    className="cursor-pointer rounded border border-[#cac1ae] bg-[#e9e2d1] px-4 py-2 font-mono text-xs text-[#29312e]"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    className="cursor-pointer rounded bg-[#145c64] px-5 py-2 font-mono text-xs font-bold text-white shadow-[3px_3px_0_#b54b38] hover:bg-[#0f464c] transition-transform active:scale-95"
                  >
                    Değişiklikleri Kaydet
                  </button>
                </div>
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
          <div className="flex h-[90vh] w-full max-w-4xl flex-col rounded-lg border-2 border-[#1d211c] bg-[#fffcf3] shadow-[12px_14px_0_rgba(29,33,28,0.35)] overflow-hidden">
            <div className="flex items-center justify-between border-b-2 border-[#1d211c] bg-[#f5f0e5] p-3 sm:p-4">
              <div className="flex items-center gap-2 min-w-0">
                <Code2 size={20} className="text-[#145c64] shrink-0" />
                <div className="min-w-0">
                  <h4 className="font-display text-lg sm:text-2xl text-[#1d211c] truncate">
                    Bütçe JSON Veritabanı & AI Düzenleyici
                  </h4>
                  <p className="font-mono text-[10px] sm:text-[11px] text-[#5b6560] truncate">
                    Kopyalayıp AI'a düzenletebilir veya doğrudan buradan düzenleyip kaydedebilirsiniz.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowJsonModal(false)}
                className="rounded border border-[#cac1ae] bg-white px-3 py-1 font-mono text-xs font-bold text-[#1d211c] hover:bg-[#e9e2d1] shrink-0"
              >
                Kapat
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#cac1ae] bg-[#fffdf5] px-3 sm:px-4 py-2 font-mono text-xs">
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
              <div className="font-mono text-[11px] sm:text-xs text-[#5b6560]">
                ⚠️ "Kaydet & DB'ye Senkronize Et" butonuna bastığınızda tüm ekibin ekranındaki bütçe anında güncellenir.
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowJsonModal(false)}
                  className="cursor-pointer rounded border border-[#cac1ae] bg-[#e9e2d1] px-4 py-2 font-mono text-xs text-[#29312e]"
                >
                  İptal
                </button>
                <button
                  onClick={handleApplyJsonImport}
                  className="cursor-pointer rounded bg-[#145c64] px-5 py-2 font-mono text-xs font-bold text-white shadow-[3px_3px_0_#b54b38] transition-transform hover:translate-x-0.5 hover:translate-y-0.5 active:scale-95"
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
