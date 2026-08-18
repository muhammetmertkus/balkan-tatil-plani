export interface TeamMember {
  id: string;
  name: string;
  code: string;
  badge: string;
  title: string;
  role: string;
  quote: string;
  photo: string;
  summary: string;
  detail: string;
  duties: string[];
  weakness: string;
  secretWeapon: string;
  tags: string[];
  focus: string;
  tilt: string;
}

export interface DayPlan {
  id: string;
  dayNumber: number;
  date: string;
  city: string;
  title: string;
  sleep: string;
  drive: string;
  walk: string;
  risk: string;
  route: string;
  timing: string[];
  car: string;
  foot: string;
  eat: {
    summary: string;
    places: string;
    mustTry: string[];
    tips: string;
  };
  shop: {
    summary: string;
    target: string;
    tips: string;
  };
  highlights: string[];
  points: string[];
}

export interface GpsPoint {
  id: string;
  label: string;
  city: string;
  country: "Kuzey Makedonya" | "Arnavutluk";
  lat: number;
  lng: number;
  type: "city" | "culture" | "beach" | "food" | "shop" | "transit";
  desc: string;
  parkingTip: string;
}

export interface ChecklistItem {
  id: string;
  category: "docs" | "money" | "clothing" | "health" | "electronics" | "custom";
  categoryLabel: string;
  text: string;
  desc?: string;
  assignedTo: "all" | "mert" | "ikra" | "fatih" | "eyup";
  checked: boolean;
  isCustom?: boolean;
}

export const assets = {
  logo: "./assets/balkan-yol-logomark.png",
  hero: "./assets/balkan-paper-route-hero.jpg",
  coast: "./assets/adriatic-paper-coast.jpg",
  stamps: "./assets/balkan-collage-stamps.jpg",
  team: "./assets/ekip.png",
  ikra: "./assets/ikra.jpeg",
  eyup: "./assets/eyup.jpeg",
  fatih: "./assets/fatih.jpeg",
  mert: "./assets/mert2.jpeg",
  enis: "./assets/enis.jpeg",
};

export const teamMembers: TeamMember[] = [
  {
    id: "mert",
    name: "Mert Kuş",
    code: "BYE-001 / BEKAR",
    badge: "🏆 CATAN ŞAMPİYONU & PROFESYONEL BEKÂR ⭐",
    role: "Catan Avrupa Şampiyonu · Yürüyen EDC Eczanesi & Kutu Oyunu Prosu",
    title: "Kutu Oyunları Büyükelçisi & Alçakgönüllü Makara CEO",
    quote: "“Çok kritik değil moruk...”",
    photo: assets.mert,
    summary: "Catan Avrupa Şampiyonluğu unvanına sahip kutu oyunu prosu, çantasından her türlü ilaç/alet çıkan EDC kaşifi.",
    detail:
      "Dışarıdan bakınca 'hallederiz ya' rahatlığında takılan ama sırt çantasında mini bir sahra hastanesi ve alet çantası taşıyan EDC (Everyday Carry) sevdalısı alçakgönüllü mühendis. Tescilli Catan Avrupa Şampiyonu olarak kutu oyunlarında masaya hükmeder; akşamları Fatih'i hezimete uğratıp strateji dersi vermek en büyük zevkidir. Başınız ağrısa, mideniz yansa ya da bir alet gerekse saniyesinde çantasından doğru ilaç ve multitol çıkarır. Gündüzleri Üsküp ve Ohri'nin bit pazarlarında tozlu antika ve nostaljik eşya peşinde koşar. Ortamdaki en gergin krizi 3 saniyede absürt bir şakayla kahkahaya çevirebilir. Fakat gece yastığa başını koyduğunda “Ohrid’deki garsona teşekkür ederken ses tonum fazla mı sertti, gidip özür mü dilesem?”, “Acaba gizli gay miyim?” gibi dipsiz varoluşsal sorgulamalarla sabahı eder.",
    duties: [
      "Catan Avrupa Şampiyonu tecrübesiyle akşamları kutu oyunlarında Fatih'e acımasız strateji dersleri vermek.",
      "EDC merakı sayesinde ekibin seyyar eczanesi olmak; baş ağrısından mide krizine her ilacı ve aleti anında temin etmek.",
      "Üsküp Bit Pazarı ve Balkan antikacılarını didik didik edip en acayip retro parçaları ve fırsatları ucuza kapatmak.",
      "Tüm ekip el ele gezerken aralarında 'bağımsız tarafsız bekâr gözlemci' olarak fotoğraflarını çekip yapay zekayla montajlamak.",
      "Geceleri 47 farklı kurgusal senaryo üreterek ertesi günkü araç içi muhabbet malzemesini hazırlamak.",
    ],
    weakness: "Gece sessizliğinde aniden başlayan overthinking atakları, bit pazarında harcanan saatler ve kutu oyununda zar tutulması.",
    secretWeapon: "Tescilli Catan şampiyonluğu, EDC acil durum çantası (parasetamol ve adı havalı bir sürü ilaç) ayrıca kasma moruk.",
    tags: ["🏆 CATAN AVRUPA ŞAMPİYONU", "Kutu Oyunu Prosu", "⭐ PROFESYONEL BEKÂR ⭐", "Yürüyen Eczane / EDC", "Bit Pazarı Kurdu"],
    focus: "Catan/kutu oyunu hakimiyeti, EDC lojistiği (ilaç/alet), bit pazarı ve aşırı düşünmek.",
    tilt: "2deg",
  },
  {
    id: "ikra",
    name: "İkra Gürdal",
    code: "BYE-002 / PLAN",
    badge: "👑 ZATEEN PRENSESİ",
    role: "Rota Amirali · Tek Kelimelik Otorite & VIP Planlayıcı",
    title: "Balkan Prensesi & 'Zateen' Genel Müdürü",
    quote: "“Zateen...”",
    photo: assets.ikra,
    summary: "Cümle kurmaya bile gerek duymayan, tek bir 'Zateen...' ile bütün konuyu kapatan VIP Balkan Kraliçesi.",
    detail:
      "Grubun “hele bir gidelim bakarız” rahatlığına karşı kurulmuş tek kelimelik demir yumruk. İkra uzun uzun 'ben size demiştim' falan demez; ortamda bir hata yapıldığında sadece gözlerini devirip soğuk bir 'Zateen...' çeker ve o an konu sonsuza kadar kapanır. Üsküp–Ohrid–Sarandë–Himarë–Berat hattındaki her otelin klima derecesinden kahvaltı saatine kadar her detay onun masasından geçer. Erkeklerin saatlerce tartıştığı 'kestirme yol' teorilerini tek bir 'zateen' ile yerle bir eder.",
    duties: [
      "Bir sorun çıktığında hiçbir açıklama yapmadan sadece 'Zateen...' diyerek haklılığını tescillemek.",
      "Her akşam ertesi günün park + check-in + rezervasyon üçlüsünü 5 dakikada denetlemek.",
      "“Burası ucuz ama merkeze uzak” diyenleri tek bakışla ve 'zateen' diyerek anında veto etmek.",
      "Günün ilk kahvesi ve akşam yemeği mekanlarının ambiyans, hijyen ve VIP standartlarını garantiye almak.",
    ],
    weakness: "Klimalı odanın sıcaklığı 23 derecenin üstüne çıktığında veya planın 4 dakika gecikmesiyle gelen 'zateen' hararetleri.",
    secretWeapon: "4 farklı güneş gözlüğü, acil durum kombinleri ve lafı ağza tıkan tek kelimelik 'Zateen...' tonlaması.",
    tags: ["👑 ZATEEN PRENSESİ", "Planlama Bakanı", "Fatih’in Karısı", "Sıfır Hata Toleransı", "VIP Standartlar"],
    focus: "Her plana 'zateen' otoritesiyle liderlik etmek ve VIP standartları korumak.",
    tilt: "-2deg",
  },
  {
    id: "fatih",
    name: "Fatih Berat Gürdal",
    code: "BYE-003 / KASA",
    badge: "💶 MASTER CFO & KUTU OYUNU MAĞDURU",
    role: "Bütçe Mimarı · Splitwise Şefi & Sıfır Spor Yeteneği",
    title: "CFO, Kriz Çözücü & 'Bu Sefer Kazanacağım' Bakanı",
    quote: "“Kutu oyununu bu sefer kesin ben alıyorum... Ayrıca herkes 13.75 Euro atsın!”",
    photo: assets.fatih,
    summary: "Parayı ve krizleri çözen dahi CFO, sıfır spor yeteneği ve her kutu oyununda iddia koyup kaybeden iddiacı.",
    detail:
      "Parayı ve hesabı tutma konusunda tam bir dahi; kriz anında ise grubu tereyağından kıl çeker gibi kurtaran güvenilir bir kale. Ama gel gör ki spora dair yeteneği sıfırın altında seyreder, düz yolda yürürken bile efor sarf eder. Akşamları açılan her kutu oyununda aşırı iddialı konuşup strateji dersi verir ama günün sonunda oyunu yine kaybeder. Bir yandan 'o öyle yapılmaz yalnız' diyerek herkesi hafiften darlar, diğer yandan 25 cent'in hesabını sorarak ekibin bütçesini Balkan kazıklarından korur. İkra'nın kocası olması da cabası; hem övülmeyi hem gömülmeyi aynı anda hak eden kadronun vazgeçilmezidir.",
    duties: [
      "Mali disiplini sağlamak; Balkan esnafının kazıklarına karşı ekibi 25 cent hassasiyetiyle savunmak.",
      "Kriz anlarında soğukkanlılığıyla devreye girip pratik zekasıyla ortamı kurtarmak.",
      "Her kutu oyununda büyük iddialarla masaya oturup sonunda Mert ve Eyüpcan'a mağlup olmak.",
      "Spor ve fiziksel aktivite gerektiren her anda 'ben mantık adamıyım' diyerek geri planda kalmak.",
      "Her gece 22:30’da Splitwise kaydını kapatıp tahsilat darlamalarını eksiksiz icra etmek.",
    ],
    weakness: "Topla oynanan her türlü spor, kutu oyunlarında zar tutulması ve fişi kaybolan 1.5 Euro'luk sular.",
    secretWeapon: "Excel yüklü telefon, kriz çözme zekası, metal bozuk para cüzdanı ve bitmeyen oyun hırsı.",
    tags: ["Master CFO", "Kutu Oyunu Mağduru", "Sıfır Spor Yeteneği", "İkra’nın Kocası", "Kriz Çözücü"],
    focus: "Mali disiplini sağlamak, krizleri çözmek ve kutu oyunlarında yine yenilmek.",
    tilt: "1.5deg",
  },
  {
    id: "eyup",
    name: "Eyüpcan Aldemir",
    code: "BYE-004 / SANAT",
    badge: "🍷 BOHEM GURME / PURO & SANAT",
    role: "Kültür & Sanat Bakanı · Bohem Entelektüel & Puro/Şarap Gurmesi",
    title: "Sanat Tarihçisi, Şarap Eksperi & Puro Mühendisi",
    quote: "“Bir kadeh Vranec şarabı, iyi bir kitap ve biraz puro dumanı... Hayat bu detaylarda gizli.”",
    photo: assets.eyup,
    summary: "Adriyatik sahilinde puro & şarap ikilisi, tarihî sokaklarda sanat analizi ve kitap aforizmalarıyla yaşayan bohem.",
    detail:
      "Grubun estetik zevkleri en rafine, bohem entelektüeli. Balkanların her tarihî köprüsünde bir Dostoyevski romanı havası arar; gün batımında yerel şarapları (Makedon Vranec, Arnavut Kallmet) koklayarak tadar ve purosunu tüttürerek derin felsefi sorgulamalara dalar. 40 derece sıcakta bile bir sanat müzesi ya da sahaf bulursa içeri süzülür, kahvesini yudumlarken arka fonda çalan yerel tınıları inceler. Hem her plana 'OK' diyecek kadar maceracı, hem de bir kadeh şarap eşliğinde sabaha kadar sanat konuşacak kadar derindir.",
    duties: [
      "Gün batımı için en kaliteli yerel şarapları (Vranec/Kallmet) ve puro tedarikini garantiye almak.",
      "Tarihî çarşılarda ve UNESCO duraklarında sanat galerilerini, kitapçıları ve otantik köşeleri keşfetmek.",
      "Kiralık araç tesliminde ve sınır geçişlerinde bohem karizmasıyla diplomatik dengeyi sağlamak.",
      "Grup kaos içindeyken bir köşeye çekilip kitap okuyarak ortama derinlik ve dinginlik katmak.",
    ],
    weakness: "Kötü şarap kadehi, sahte puro kokusu ve sanat konuşulmayan yüzeysel sohbetler.",
    secretWeapon: "Puro kutusu, vintage güneş gözlüğü, klas romanı ve her duruma uyan entelektüel karizması.",
    tags: ["Sanat & Kültür", "Puro Gurmesi", "Şarap Eksperi", "Bohem Entelektüel", "Kitap Kurdu"],
    focus: "Sanat durakları, yerel şarap/puro tadımı ve ekibe bohem bir estetik katmak.",
    tilt: "-1deg",
  },
  {
    id: "enis",
    name: "Enis Aldemir",
    code: "BYE-005 / GÖNÜL",
    badge: "🌙 RESMÎ İSTANBUL BEKÇİSİ & ALTIN PİYASASI 📱",
    role: "İstanbul Bekçisi · Eski Telefoncu / Yeni Kuyumcu & Sıfır Kamp Toleransı",
    title: "İstanbul Nöbetçisi, Usta Direksiyon & Konfor Bakanı",
    quote: "“Kampa hayatta gelmem moruk çadırda ne işim var... Harem Altın'da gram kaç oldu bu arada?”",
    photo: assets.enis,
    summary: "Kampa ve çadıra adımını atmayan konfor insanı, altın piyasası uzmanı, usta şoför ve İstanbul bekçisi.",
    detail:
      "Dünyanın en saf, temiz kalpli ve masum insanı; ekip Balkanlar'dayken İstanbul'un asayişini ve kuyumcu piyasasını tek başına tutar. Kampa, çadıra, dağ-bayıra hayatta gelmez; böcek ve toz-toprak gördüğü an tansiyonu düşer, tam bir klima ve ev konforu insanıdır. Gün boyu telefonunda Harem Altın uygulamasından gram ve ons grafiklerini takip eder. Eski bir futbolcudur fakat şu an topla alakası tamamen kesilmiştir; buna karşılık direksiyon hakimiyeti efsanedir, arabasına da gözü gibi bakar. Ortamda tanımadığı yabancı bir kız olunca hafiften çekinip köşeye çekilir. Gizli gizli sigara tüttürmesi, evde rahatça geğirip osurması ve baştan sona Recep İvedik filmlerini izleyip keyif yapması en bilinen hallerindendir.",
    duties: [
      "Ekip Balkanlar'dayken İstanbul'un asayişini ve piyasaları tek başına beklemek.",
      "Balkanlar'daki ekibe Harem Altın uygulamasından anlık döviz ve altın kuru bildirmek.",
      "Grubun her türlü kamp, çadır ve doğada yatma teklifini anında veto etmek.",
      "İstanbul'dan ekibin yolunu gözleyip dönüşte efsane muhabbet sofrasını kurmak.",
      "Akşamları evde baştan sona Recep İvedik maratonu açıp tam konfora geçmek.",
    ],
    weakness: "Kamp/çadır teklifleri, doğadaki böcekler, tanımadığı yabancı ortamlar ve altının aniden 50 TL düşmesi.",
    secretWeapon: "Harem Altın canlı grafiği, usta şoförlük refleksi, pırıl pırıl arabası ve saf esnaf samimiyeti.",
    tags: ["🌙 RESMÎ İSTANBUL BEKÇİSİ", "Sıfır Kamp Toleransı", "Harem Altın Uzmanı", "Yeni Kuyumcu", "Usta Şoför"],
    focus: "İstanbul asayişi, altın piyasası takibi, konfor standartları ve dönüş muhabbeti.",
    tilt: "1deg",
  },
];

export const gpsPoints: Record<string, GpsPoint> = {
  istanbul_airport: {
    id: "istanbul_airport",
    label: "İstanbul Havalimanı (IST/SAW)",
    city: "İstanbul",
    country: "Türkiye" as any,
    lat: 41.2753,
    lng: 28.7519,
    type: "transit",
    desc: "Balkan Yol Ekibi ana operasyon üssü ve büyük dönüş kapısı.",
    parkingTip: "Uçuştan 3 saat önce havalimanında buluşma; pasaport ve bagaj teslimi.",
  },
  skopje_airport: {
    id: "skopje_airport",
    label: "Üsküp Havalimanı (SKP)",
    city: "Üsküp",
    country: "Kuzey Makedonya",
    lat: 41.9616,
    lng: 21.6214,
    type: "transit",
    desc: "Uçuş iniş, kiralık araç teslim alma & dönüş noktası.",
    parkingTip: "Resmî kiralık araç park alanında teslim tutanağını ve mevcut çizikleri fotoğraflayın.",
  },
  skopje_bazaar: {
    id: "skopje_bazaar",
    label: "Eski Çarşı & Taş Köprü",
    city: "Üsküp",
    country: "Kuzey Makedonya",
    lat: 42.0003,
    lng: 21.4371,
    type: "culture",
    desc: "Osmanlı mirası tarihî çarşı, Taş Köprü, Makedonya Meydanı ve İskender heykeli.",
    parkingTip: "Eski Çarşı'nın dar sokaklarına araçla girmeyin. Konaklama garajında bırakıp yürüyün.",
  },
  skopje_bitpazar: {
    id: "skopje_bitpazar",
    label: "Üsküp Bit Pazarı",
    city: "Üsküp",
    country: "Kuzey Makedonya",
    lat: 42.0042,
    lng: 21.4418,
    type: "shop",
    desc: "Balkanların en büyük açık hava pazarlarından biri. Kıyafet, taze meyve, antika ve yerel ürünler.",
    parkingTip: "Nakit MKD bulundurun; pazar çevresi yoğun olduğundan yürüyerek ulaşın.",
  },
  skopje_eastgate: {
    id: "skopje_eastgate",
    label: "East Gate Mall",
    city: "Üsküp",
    country: "Kuzey Makedonya",
    lat: 41.9965,
    lng: 21.4589,
    type: "shop",
    desc: "Modern AVM, Neptun elektronik, Inditex giyim mağazaları, süpermarket ve yemek katı.",
    parkingTip: "Geniş kapalı otoparkı mevcuttur. Yağmur veya dönüş alışverişi için idealdir.",
  },
  ohrid_oldtown: {
    id: "ohrid_oldtown",
    label: "Ohri Eski Şehir & Kale",
    city: "Ohri",
    country: "Kuzey Makedonya",
    lat: 41.1147,
    lng: 20.7936,
    type: "culture",
    desc: "UNESCO korumasında göl kıyısı, Samuel Kalesi, Antik Tiyatro, Ayasofya Kilisesi.",
    parkingTip: "2026 sezonunda Old Town sokakları özel izne tabidir. Liman veya göl kıyısı parkını kullanın.",
  },
  ohrid_kaneo: {
    id: "ohrid_kaneo",
    label: "St. John at Kaneo",
    city: "Ohri",
    country: "Kuzey Makedonya",
    lat: 41.1112,
    lng: 20.7884,
    type: "culture",
    desc: "Kayalık falez üstündeki ikonik gün batımı manzaralı kilise ve ahşap yürüyüş yolu.",
    parkingTip: "Yalnızca yürüyerek veya gölden teknelerle ulaşılır.",
  },
  gjirokaster_castle: {
    id: "gjirokaster_castle",
    label: "Gjirokastër Kalesi & Eski Çarşı",
    city: "Gjirokastër",
    country: "Arnavutluk",
    lat: 40.0736,
    lng: 20.1408,
    type: "culture",
    desc: "UNESCO taş evler kenti, dik arnavut kaldırımları, kale müzesi ve yerel el sanatları çarşısı.",
    parkingTip: "Aracı çarşı tabanındaki ana otoparkta bırakın. Taş yokuşlara araba sürmeyin.",
  },
  blue_eye: {
    id: "blue_eye",
    label: "Syri i Kaltër (Blue Eye)",
    city: "Muzinë / Sarandë",
    country: "Arnavutluk",
    lat: 39.9236,
    lng: 20.1919,
    type: "culture",
    desc: "50 metreden daha derin, buz gibi turkuaz doğal su kaynağı ve yemyeşil meşe korusu.",
    parkingTip: "Giriş 50 ALL nakit, otopark 200-600 ALL. Parktan kaynağa 1.5 km yürüyüş yolu var.",
  },
  sarande_promenade: {
    id: "sarande_promenade",
    label: "Sarandë Kordon & Liman",
    city: "Sarandë",
    country: "Arnavutluk",
    lat: 39.8753,
    lng: 20.0058,
    type: "beach",
    desc: "İyon Denizi kıyısında canlı sahil kordonu, balık restoranları ve Korfu manzarası.",
    parkingTip: "Kaldırıma asla park etmeyin (20.000 ALL ceza riski). Liman otoparkını tercih edin.",
  },
  ksamil_islands: {
    id: "ksamil_islands",
    label: "Ksamil Plajları & Adalar",
    city: "Ksamil",
    country: "Arnavutluk",
    lat: 39.7689,
    lng: 20.0048,
    type: "beach",
    desc: "Balkanların Maldivleri olarak bilinen beyaz kumlu koylar ve yüzerek geçilen adalar.",
    parkingTip: "Sabah 09:00'dan önce varın. Otoparklar özeldir (500-800 ALL nakit pazarlık).",
  },
  butrint_park: {
    id: "butrint_park",
    label: "Butrint Millî Arkeoloji Parkı",
    city: "Butrint",
    country: "Arnavutluk",
    lat: 39.7444,
    lng: 20.0213,
    type: "culture",
    desc: "UNESCO antik kent; Yunan tiyatrosu, Roma hamamları, Vaftizhane ve Venedik kulesi.",
    parkingTip: "Girişte ücretsiz otopark mevcuttur; öğleden sonra 16:00'da gitmek sıcaktan korur.",
  },
  borsh_beach: {
    id: "borsh_beach",
    label: "Borsh Plajı & Şelalesi",
    city: "Borsh",
    country: "Arnavutluk",
    lat: 40.0611,
    lng: 19.8522,
    type: "beach",
    desc: "7 km uzunluğunda el değmemiş çakıl plaj, masmavi deniz ve zeytinlikler.",
    parkingTip: "Plaj kenarında serbest cepler mevcuttur. Yol kapatmadan bırakın.",
  },
  porto_palermo: {
    id: "porto_palermo",
    label: "Porto Palermo (Ali Paşa Kalesi)",
    city: "Porto Palermo",
    country: "Arnavutluk",
    lat: 40.0622,
    lng: 19.7919,
    type: "culture",
    desc: "Yarımadada üçgen planlı tarihî kale, denizaltı tüneli körfezi ve berrak koy.",
    parkingTip: "Viraj üzerinde ve ana yol kenarında durmayın; kale bağlantı yolunda park edin.",
  },
  himare_spile: {
    id: "himare_spile",
    label: "Himarë (Spile & Livadhi)",
    city: "Himarë",
    country: "Arnavutluk",
    lat: 40.1039,
    lng: 19.7456,
    type: "beach",
    desc: "Taverna Lefteri, gün batımı sahil yürüyüşü, turkuaz Livadhi ve Potam plajları.",
    parkingTip: "Otel otoparkını mutlaka önceden teyit edin; sahil boyunca araçsız yürüyün.",
  },
  llogara_pass: {
    id: "llogara_pass",
    label: "Llogara Dağ Geçidi (1.043m)",
    city: "Llogara",
    country: "Arnavutluk",
    lat: 40.1983,
    lng: 19.5961,
    type: "transit",
    desc: "Bulutların üstünden İyon Denizi'ni gören nefes kesici virajlı dağ manzarası.",
    parkingTip: "Seyir terasındaki resmî cepte durun; yokuş aşağı inerken motor freni kullanın.",
  },
  berat_mangalem: {
    id: "berat_mangalem",
    label: "Berat (Bin Pencereli Şehir)",
    city: "Berat",
    country: "Arnavutluk",
    lat: 40.7058,
    lng: 19.9522,
    type: "culture",
    desc: "UNESCO miras kenti; Mangalem, Gorica Köprüsü, Osumi Nehri ve tepe kalesi.",
    parkingTip: "Mangalem dar sokaklarına araç sokmayın. Gorica veya çeper otel parkını kullanın.",
  },
};

export const dayPlans: DayPlan[] = [
  {
    id: "G0",
    dayNumber: 0,
    date: "29 Ağustos – 6 Eylül 2026",
    city: "Tüm Balkan Döngüsü (1.180 km)",
    title: "İstanbul ✈️ Üsküp → Ohri → Sarandë → Ksamil → Himarë → Berat → Üsküp ✈️ İstanbul",
    sleep: "Üsküp (3 Gece) · Ohri (1 Gece) · Sarandë (2 Gece) · Himarë (1 Gece) · Berat (1 Gece)",
    drive: "Toplam ~1.180 km Karayolu Sürüşü + 2 Uçuş",
    walk: "Toplam ~74 km Antik Kent, Kale & Plaj Yürüyüşü",
    risk: "Qafë Thanë sınır kapısı pasaport kuyruğu & Llogara virajlı dağ geçidi",
    route: "İstanbul ✈️ SKP → A2 Otoyolu → Ohri → Qafë Thanë Sınırı → Gjirokastër → Blue Eye → Sarandë → Ksamil → Butrint → Borsh → Porto Palermo → Himarë → Llogara Geçidi → Berat → Elbasan → Üsküp (Matka) → SKP ✈️ İstanbul",
    timing: [
      "G1 (29 Ağu): İstanbul ✈️ Üsküp iniş, araç teslimi ve Eski Çarşı / Bit Pazar keşfi",
      "G2 (30 Ağu): Üsküp → Straža Dağ Geçidi böreği → Ohri Samuel Kalesi & Kaneo gün batımı",
      "G3 (31 Ağu): Ohri → Qafë Thanë sınırı → Gjirokastër Kalesi → Blue Eye → Sarandë kordonu",
      "G4 (1 Eyl): Sarandë → Ksamil Adalar koyu & Butrint UNESCO antik kenti",
      "G5 (2 Eyl): Sarandë → Borsh Şelalesi → Porto Palermo Ali Paşa Kalesi → Himarë Spile",
      "G6 (3 Eyl): Himarë → Livadhi Koyu → Llogara Dağ Geçidi (1.043m) → Berat Mangalem",
      "G7 (4 Eyl): Berat Kalesi → Belsh Gölleri → Elbasan → Üsküp varış & dinlenme",
      "G8 (5 Eyl): Üsküp → Matka Kanyonu tekne turu, Bit Pazar avı & Veda ziyafeti",
      "G9 (6 Eyl): Üsküp → SKP Havalimanı araç iadesi → İstanbul ✈️ Büyük Dönüş",
    ],
    car: "Tüm rota boyunca kiralık araçla Kuzey Makedonya ve Arnavutluk karayolları, otoyolları ve virajlı sahil yolları kullanılır.",
    foot: "Ohri kalesi, Gjirokastër dik taş yokuşları, Butrint antik kenti ve Berat kaleleri yürünerek fethedilir.",
    eat: {
      summary: "9 gün boyunca kebap, tavče gravče, lagün midyesi, taze deniz mahsulleri ve geleneksel Balkan lezzetleri.",
      places: "Destan, Belvedere Ohri, Taverna Kuka, The Mussel House, Taverna Lefteri, Antigoni Berat.",
      mustTry: ["Destan Köfte & Şopska", "Ohri Alabalığı", "Butrint Lagün Midyesi", "Himarë Ahtapot", "Tavë Kosi"],
      tips: "Yerel küçük mekanlarda nakit ödeyin; balığı sipariş etmeden önce kilogram fiyatına göre tarttırın.",
    },
    shop: {
      summary: "Üsküp Bit Pazarı, East Gate Mall, Gjirokastër taş oymaları ve Himarë sızma zeytinyağı.",
      target: "Yerel hediyelikler, deri eşyalar, zeytinyağı, kahve ve elektronik.",
      tips: "Pazarlarda nakit MKD/ALL ile pazarlık yapın; büyük alışverişleri AVM'de kartla halledin.",
    },
    highlights: [
      "İstanbul ✈️ Üsküp gidiş-dönüş uçuşları",
      "Ohri Gölü ve Kaneo Kilisesi gün batımı",
      "Syri i Kaltër (Mavi Göz) buz gibi kaynak suyu",
      "Ksamil 3 Adalar ve Butrint UNESCO Antik Kenti",
      "Porto Palermo Ali Paşa Kalesi ve Borsh Kıyı Yolu",
      "Llogara Dağ Geçidi (1.043m) panoramik Adriyatik manzarası",
      "Berat Bin Pencereli Şehir ve Tarihî Mangalem",
      "Matka Kanyonu zümrüt yeşili tekne keşfi",
    ],
    points: [
      "istanbul_airport",
      "skopje_airport",
      "skopje_bazaar",
      "ohrid_oldtown",
      "ohrid_kaneo",
      "border_qafethane",
      "gjirokaster_castle",
      "blue_eye",
      "sarande_promenade",
      "ksamil_beach",
      "butrint_park",
      "borsh_beach",
      "porto_palermo",
      "himare_spile",
      "llogara_pass",
      "berat_mangalem",
      "skopje_eastgate",
    ],
  },
  {
    id: "G1",
    dayNumber: 1,
    date: "29 Ağustos · Cumartesi",
    city: "İstanbul → Üsküp",
    title: "Balkan Topraklarına İniş & Eski Çarşı İlk Adım",
    sleep: "Üsküp · Debar Maalo veya Merkez (2 yatak odalı apart)",
    drive: "22 km · 25 dk saf sürüş (A4 bağlantısı)",
    walk: "4,2 km · Düz ayak tarihî merkez halkası",
    risk: "Uçuş varış saatine ve araç teslimine göre Eski Çarşı süresini ayarlayın; akşam geç saate kalmayın.",
    route: "İstanbul Havalimanı → Üsküp SKP → Konaklama Check-in → Eski Çarşı → Taş Köprü → Makedonya Meydanı",
    timing: [
      "12:30–14:00: SKP İniş + Kiralık araç teslimi & çizik tutanağı (Eyüpcan teftişi)",
      "14:30–15:30: Konaklamaya varış + valiz bırakma + hızlı dinlenme",
      "15:45–17:45: Eski Çarşı (Old Bazaar) sokakları, Kurşunlu Han & Murat Paşa Camii",
      "18:00–19:15: Taş Köprü'den geçiş, Makedonya Meydanı & Vardar Nehri kordonu",
      "19:30–21:00: Destan veya Kaj Serdarot'ta ilk akşam kebabı & şopska salatası",
      "21:30–22:30: Debar Maalo'da akşam kahvesi + Fatih'in ilk gün bütçe kapanışı",
    ],
    car: "Havalimanından merkeze A4 otoyolu düzgündür. Aracı Old Bazaar sokaklarına sokmayın; konaklamanın garajına bırakıp yürüyün.",
    foot: "Eski Çarşı → Taş Köprü → Makedonya Meydanı rotası tamamen düz ayaktır. Akşamüstü ışığında fotoğraf için harikadır.",
    eat: {
      summary: "İlk akşamı yerel kebapi ve buz gibi şopska salatası ile sade ve doyurucu tutun.",
      places: "Destan Kebap (Eski Çarşı) veya Kaj Serdarot (Debar Maalo)",
      mustTry: ["10'lu Üsküp Kebabı (Kebapi)", "Şopska Salatası (Rendelenmiş Sirene Peynirli)", "Közlenmiş Ajvar & Sıcak Somun", "Skopsko Yerel Bira"],
      tips: "Kişi başı yaklaşık 400–800 MKD. Destan'da 4 kişilik masa için erken gidin veya açık saat teyidi yapın.",
    },
    shop: {
      summary: "Bit Pazar & Eski Çarşı el sanatları keşfi.",
      target: "Bit Pazar (Eski Çarşı kuzeyi) & Çarşı hediyelikçileri",
      tips: "İlk gün büyük harcama yapmayın; Bit Pazar açıksa küçük bozukluk MKD ile yerel meyve veya magnet bakılabilir.",
    },
    highlights: ["Taş Köprü", "Makedonya Meydanı", "Eski Çarşı", "Kurşunlu Han", "Vardar Nehri"],
    points: ["skopje_airport", "skopje_bazaar", "skopje_bitpazar"],
  },
  {
    id: "G2",
    dayNumber: 2,
    date: "30 Ağustos · Pazar",
    city: "Üsküp → Ohri (Ohrid)",
    title: "Göl Kıyısına İntikal, Samuel Kalesi & Kaneo Gün Batımı",
    sleep: "Ohri · Old Town alt kotu veya göl kıyısı (Teyitli otoparklı apart)",
    drive: "180 km · 2 sa 50 dk saf sürüş (A2 / E65 dağ yolu)",
    walk: "3,8 km · Tarihî taş sokaklar & falez merdivenleri",
    risk: "Ohri Old Town sokaklarına araç sokmak yasaktır/riskli. Otoparkı varıştan önce arayıp kesinleştirin.",
    route: "Üsküp → Tetovo / Gostivar hattı → Ohri Varış → Antik Tiyatro → Samuel Kalesi → St. John Kaneo",
    timing: [
      "08:30: Üsküp'ten çıkış (Yakıt ve kahve molası: 20 dk)",
      "11:45–12:30: Ohri'ye varış, otopark ve check-in",
      "13:00–14:30: Çarşı içi öğle yemeği (Tavče Gravče güveçte kuru fasulye)",
      "15:00–17:00: Ayasofya Kilisesi, Antik Tiyatro ve Samuel Kalesi tepe manzarası",
      "17:30–19:30: Ahşap göl köprüsünden St. John at Kaneo'ya yürüyüş ve efsane gün batımı",
      "20:00–22:00: Belvedere veya Kaj Chetkarot'ta göl kenarı akşam yemeği",
    ],
    car: "Üsküp-Ohri otoyolunda gişeler için küçük MKD nakit veya temassız kredi kartı hazır tutun. Straža geçidinde sıcak meşhur börek molası verilebilir.",
    foot: "Old Town alt kotundan Samuel Kalesi ve Kaneo merdivenlidir. Rahat spor ayakkabı şart; Kaneo'dan dönüşü ahşap kıyı iskelesinden yapın.",
    eat: {
      summary: "Güveçte fırınlanmış geleneksel kuru fasulye (Tavče Gravče) ve göl kıyısında taze yerel lezzetler.",
      places: "Belvedere Restaurant veya Kaj Chetkarot",
      mustTry: ["Tavče Gravče (Makedon Güveç Fasulye)", "Makedon Kaşkaval Peyniri Tava", "Ohri Pastrmka (Alabalık - porsiyon/fiyat teyitli)", "Tikveş Yerel Şarabı"],
      tips: "Göl kenarı gün batımı masaları için öğleden sonra rezervasyon yaptırın veya erkenden yer kapın.",
    },
    shop: {
      summary: "Ohri İncisi (Ohrid Pearl) & yerel peynirler.",
      target: "Talevi veya Filevi Ailesi resmî atölyeleri",
      tips: "Ohri incisi alacaksanız yalnızca sertifikalı iki köklü aile atölyesini tercih edin; sokak tezgâhları sahtedir.",
    },
    highlights: ["St. John at Kaneo", "Samuel Kalesi", "Antik Tiyatro", "Ohri Gölü Kıyısı", "Straža Börekçisi"],
    points: ["ohrid_oldtown", "ohrid_kaneo"],
  },
  {
    id: "G3",
    dayNumber: 3,
    date: "31 Ağustos · Pazartesi",
    city: "Ohri → Gjirokastër → Blue Eye → Sarandë",
    title: "Büyük Sınır Geçişi, Taş Şehir & Turkuaz Göz",
    sleep: "Sarandë · Merkez veya Rruga Butrinti (2 gece sabit üs)",
    drive: "356 km · 6 sa 29 dk saf sürüş (Toplam gün 9–10 saat)",
    walk: "2,6 km · Odaklı kale ve doğa yürüyüşü",
    risk: "Rotanın EN KRİTİK transfer günüdür. 06:30'da yola çıkılmazsa Sarandë'ye gece varılır!",
    route: "Ohri → Qafë Thanë Sınır Kapısı → Korçë → Gjirokastër → Syri i Kaltër (Blue Eye) → Sarandë",
    timing: [
      "06:15–06:45: Ohri'den erken çıkış ve sınır kapısına intikal",
      "07:30–08:30: Makedonya-Arnavutluk sınır geçişi (Green Card kontrolü - Eyüpcan devrede)",
      "09:00–11:30: Korçë üzerinden dağ manzaralarıyla Gjirokastër'e sürüş",
      "11:30–13:45: Gjirokastër Kalesi + Eski Çarşı + Taverna Kuka'da hızlı öğle yemeği",
      "14:30–16:30: Syri i Kaltër (Mavi Göz) doğa kaynağı yürüyüşü ve fotoğraf",
      "17:30–18:30: Sarandë'ye varış, otel check-in ve İyon Denizi esintisi",
      "20:00–22:00: Sarandë Kordonu akşam yürüyüşü ve ilk deniz ürünleri ziyafeti",
    ],
    car: "Depoyu sabah Ohri'de fulleyin. Green Card ve araç sınır izin belgesini torpidoda değil el altında tutun. Çevrimdışı Google Maps haritasını mutlaka indirin.",
    foot: "Gjirokastër'de aracı çarşı girişinde bırakın; dik taş yokuşlarda dikkatli yürüyün. Blue Eye'da otoparktan kaynağa asfalt/patika 1.5 km yürünür.",
    eat: {
      summary: "Gjirokastër'de otantik fërgesë ve qofte; akşam Sarandë'de taze kalamar ve karides.",
      places: "Öğlen: Taverna Kuka (Gjirokastër) / Akşam: Fish Filipi veya Limani (Sarandë)",
      mustTry: ["Qifqi (Gjirokastër usulü pirinç köftesi)", "Fërgesë me speca", "Taze Izgara Kalamar", "Tzatziki & Arnavut Peyniri"],
      tips: "Öğle yemeğini 45–60 dakikada bitirin, transfer gününü sofrada uzatmayın.",
    },
    shop: {
      summary: "Gjirokastër taş oymaları, el yapımı dantel ve dağ kekiği.",
      target: "Gjirokastër Old Bazaar ahşap dükkânları",
      tips: "Küçük taşınabilir hediyelikler için 20 dakika ayırın; ALL nakit kullanın.",
    },
    highlights: ["Gjirokastër Kalesi", "Syri i Kaltër (Blue Eye)", "Qafë Thanë Sınırı", "Sarandë Kordonu"],
    points: ["gjirokaster_castle", "blue_eye", "sarande_promenade"],
  },
  {
    id: "G4",
    dayNumber: 4,
    date: "1 Eylül · Salı",
    city: "Sarandë ↔ Ksamil & Butrint",
    title: "Balkanların Maldivleri & 2500 Yıllık UNESCO Mirası",
    sleep: "Sarandë · Aynı otel (Valiz toplama yok, rahat gün)",
    drive: "37 km · 1 sa 25 dk toplam saf sürüş (SH81 yolu)",
    walk: "3,4 km · Antik kent zeytinlikleri + kumsal",
    risk: "Ksamil otoparkları 09:30'da dolar! Butrint'e ise öğle sıcağında değil 16:00'da girilmelidir.",
    route: "Sarandë Otel → Ksamil Plajları (3 Adalar) → Butrint Millî Parkı → Sarandë Akşam",
    timing: [
      "08:15: Sarandë'den hareket",
      "08:45–14:00: Ksamil Koyu, adalar manzarası, turkuaz deniz ve hafif öğle atıştırmalığı",
      "14:30–15:30: Otelde duş/dinlenme veya gölgede kahve molası",
      "16:00–18:30: Butrint Antik Kenti (Tiyatro, Vaftizhane, Bazilika, Venedik Kalesi)",
      "19:30–22:00: Sarandë'de muazzam gün batımı ve deniz ürünleri gecesi",
    ],
    car: "SH81 yolu virajlıdır ve sezon trafiği olur. Ksamil'de aracı güvenli, makbuz veren özel otoparka bırakın (500–800 ALL). Butrint parkı ücretsizdir.",
    foot: "Butrint düzensiz taş zemin ve patikalardan oluşur; deniz terliğiyle değil yürüyüş ayakkabısıyla gelin. Sivrisinek spreyini unutmayın.",
    eat: {
      summary: "Günün taze tutulmuş balığı, midye tava (Butrint Lagünü midyeleri meşhurdur) ve karides güveç.",
      places: "Fish Filipi, Taverna Rustico veya The Mussel House (Ksamil gölü yolu)",
      mustTry: ["Butrint Lagün Midyesi (Mussels Bouzoukia)", "Izgara Çipura / Levrek (Kg fiyatını önce sorun)", "Kalamar Tava", "Arnavut Trileçesi"],
      tips: "Balık siparişi vermeden önce balığı tarttırıp net fiyatını öğrenin (Fatih Kuralı!).",
    },
    shop: {
      summary: "Plaj günü tedariki ve yerel zeytinyağı.",
      target: "Sarandë yerel marketleri",
      tips: "Plaj kulübünde su ve meyveye 5 katı ödememek için Sarandë marketinden soğuk su ve atıştırmalık stoklayın.",
    },
    highlights: ["Ksamil Adaları", "Butrint Antik Tiyatrosu", "Vaftizhane Mozaikleri", "Vivari Kanalı"],
    points: ["ksamil_islands", "butrint_park", "sarande_promenade"],
  },
  {
    id: "G5",
    dayNumber: 5,
    date: "2 Eylül · Çarşamba",
    city: "Sarandë → Borsh → Porto Palermo → Himarë",
    title: "Arnavutluk Rivierası, Ali Paşa Kalesi & Kıyı Cenneti",
    sleep: "Himarë · Merkez / Spile Kordonu (Butik sahil oteli)",
    drive: "57 km · 1 sa 37 dk saf sürüş (SH8 Kıyı panoraması)",
    walk: "2,1 km · Kale burçları & kordon yürüyüşü",
    risk: "Kısa km ama çok duraklı gündür. SH8 virajlarını gece karanlığına bırakmayın!",
    route: "Sarandë → Borsh Plajı & Şelale Kafe → Porto Palermo Ali Paşa Kalesi → Himarë Spile",
    timing: [
      "09:15: Sarandë'den çıkış",
      "10:15–12:30: Borsh'ta 7 km'lik devasa sahilde deniz molası ve şelale kenarında kahve",
      "13:00–14:30: Borsh sahilinde taze byrek & deniz kenarı öğle atıştırmalığı",
      "15:00–16:15: Porto Palermo Kalesi'ne çıkış, üçgen burçlar ve körfez fotoğrafları",
      "16:45: Himarë'ye varış, otele yerleşme ve Spile plajında gün batımı",
      "20:00–22:30: Taverna Lefteri veya Himara 28'de ızgara ahtapot ve İyon mezeleri ziyafeti",
    ],
    car: "SH8 yolu deniz uçurumları boyunca kıvrılır; manzara büyüleyicidir. Fotoğraf için sadece güvenli ceplerde durun. Himarë'de otel parkını teyit edin.",
    foot: "Porto Palermo Kalesi'ne yarımadadan kısa bir patika tırmanışı vardır. Himarë akşamı ise araçsız, kordon boyunca keyif yürüyüşüdür.",
    eat: {
      summary: "Izgara ahtapot, taze deniz mahsulleri ve Yunan esintili taze Arnavut mezeleri.",
      places: "Taverna Lefteri (Spile) veya Taverna Velco",
      mustTry: ["Izgara Ahtapot (Octopus on Grill)", "Közlenmiş Patlıcan Ezmesi", "Saganaki Peyniri", "Lokal Kıyı Beyaz Şarabı"],
      tips: "Taverna Lefteri Himarë'nin en ikonik noktasıdır; akşam 20:00 civarı masa kapmak için İkra erkenden operasyonu başlatmalıdır.",
    },
    shop: {
      summary: "Riviera sızma zeytinyağı ve dağ balı.",
      target: "Yol kenarı yerel üretici tezgâhları",
      tips: "Himarë ve Borsh civarında köylülerin sattığı soğuk sıkım zeytinyağları harikadır; pet şişede bagaja sızdırmaz şekilde sarın.",
    },
    highlights: ["Borsh Sahili", "Porto Palermo Kalesi", "Himarë Spile Kordonu", "SH8 Riviera Manzaraları"],
    points: ["borsh_beach", "porto_palermo", "himare_spile"],
  },
  {
    id: "G6",
    dayNumber: 6,
    date: "3 Eylül · Perşembe",
    city: "Himarë → Llogara Geçidi → Berat",
    title: "Livadhi Sabah Denizi, Bulutlar Üstü Llogara & Bin Pencereli Şehir",
    sleep: "Berat · Gorica veya Mangalem dış çeperi (Arabayla erişilebilir otel)",
    drive: "174 km · 2 sa 55 dk saf sürüş (Llogara Geçidi + A2 Otoyolu)",
    walk: "2,8 km · Osumi Nehri kordonu & Gorica Köprüsü akşamı",
    risk: "Himarë'den 14:00'ten geç çıkmayın; Berat'a hava kararmadan varmak otopark için hayatidir.",
    route: "Himarë (Livadhi Koyu) → Llogara Dağ Geçidi (1.043m) → Fier / A2 → Berat Mangalem",
    timing: [
      "08:30–11:30: Livadhi Koyu'nda berrak sabah denizi & sakin plaj keyfi",
      "12:00–13:00: Duş, check-out ve Himarë merkezinde hafif öğle yemeği",
      "13:30–14:30: Llogara Geçidi'ne tırmanış, panoramik seyir terasında fotoğraf molası",
      "17:00–17:45: Berat'a varış ve konaklama garajına park",
      "18:15–20:00: Tarihî Gorica Taş Köprüsü, Mangalem ışıkları ve nehir boyu piyasa",
      "20:15–22:30: Antigoni veya Tradita e Beratit'te Tavë Kosi (Kuzu fırın) ziyafeti",
    ],
    car: "Llogara Geçidi 1.043 metreye tırmanır; dik virajlarda hararet yapmamak için sakin sürün; inerken motor freni kullanın. Berat merkezinde dar sokaklara girmeyin.",
    foot: "Akşam Gorica Köprüsü ve nehir kenarı düzlüktür. Berat Kalesi tırmanışını yorgun olmamak için ertesi sabah 08:00'e bırakıyoruz.",
    eat: {
      summary: "Arnavutluk'un millî fırın yemeği Tavë Kosi (yoğurtlu fırın kuzu) ve fërgesë.",
      places: "Antigoni Restaurant (Gorica manzaralı teras) veya Tradita e Beratit",
      mustTry: ["Tavë Kosi (Yoğurtlu Fırınlanmış Kuzu Eti)", "Pispili (Mısır unlu pırasalı börek)", "Berat Usulü Dolma", "Yerel Berat Kırmızı Şarabı"],
      tips: "Antigoni'nin üst terasından karşıdaki Mangalem pencerelerinin gece aydınlatması büyüleyicidir.",
    },
    shop: {
      summary: "Berat ceviz reçeli (Gliko) ve Çobo şarapları.",
      target: "Berat çarşısı ve yerel tatlıcılar",
      tips: "Berat'ın meşhur 'Gliko' ceviz ve incir tatlıları küçük kavanozlarda taşımaya çok uygundur.",
    },
    highlights: ["Livadhi Beach", "Llogara Seyir Noktası", "Gorica Köprüsü", "Mangalem Evleri", "Osumi Nehri"],
    points: ["himare_spile", "llogara_pass", "berat_mangalem"],
  },
  {
    id: "G7",
    dayNumber: 7,
    date: "4 Eylül · Cuma",
    city: "Berat → Sınır → Üsküp",
    title: "Berat Kalesi Keşfi & Üsküp'e Büyük Dönüş İntikali",
    sleep: "Üsküp · Aerodrom veya Merkez (Rahat üs)",
    drive: "313 km · 5 sa 40 dk saf sürüş (Mola + sınırla ~7-8 saat)",
    walk: "2,3 km · Sabah kale içi tarihi halkası",
    risk: "Sınır kapısı yoğunluğunu hesaba katarak en geç 10:30'da Berat'tan çıkılmalıdır.",
    route: "Berat Kalesi & Onufri Müzesi → Elbasan → Qafë Thanë Sınır Kapısı → Gostivar → Üsküp",
    timing: [
      "08:00–10:00: Berat Kalesi ana kapısı, sur manzarası ve Onufri İkon Müzesi",
      "10:30: Berat'tan hareket",
      "12:30–13:15: Yol üstü yakıt ve hafif öğle yemeği molası",
      "14:00–15:15: Arnavutluk-Makedonya sınır geçişi (Sınır kuyruğu payı)",
      "18:00–19:00: Üsküp'e varış, otele giriş ve dinlenme",
      "20:00–22:00: Debar Maalo sokaklarında rahat bir akşam yemeği",
    ],
    car: "Dönüş yolu uzun ve sınırlıdır. Depoyu sınır öncesi makul seviyede tutun.",
    foot: "Berat Kalesi içi taşlıktır, sabah serinliğinde 1.5 saatlik gezi yeterlidir.",
    eat: {
      summary: "Dönüş günü pratik börek/pide; Üsküp'te lezzetli bir akşam sofrası.",
      places: "Gostivar börekçileri (öğlen) / Kaj Serdarot (Üsküp)",
      mustTry: ["Gostivar Kıymalı Böreği", "Makedon Tava Ciğeri", "Kaymaklı Kırmızı Biber", "Makedon Rakısı"],
      tips: "Yol yorgunluğu için akşamı Debar Maalo'da hafif tutun.",
    },
    shop: {
      summary: "Elbasan yol üstü taze meyve ve dağ kekiği.",
      target: "Yol kenarı yerel tezgâhlar",
      tips: "Küçük nakit bozukluk bulundurun.",
    },
    highlights: ["Berat Kalesi", "Onufri Müzesi", "Qafë Thanë Sınırı", "Üsküp Kordonu"],
    points: ["berat_mangalem", "skopje_bazaar"],
  },
  {
    id: "G8",
    dayNumber: 8,
    date: "5 Eylül · Cumartesi",
    city: "Üsküp & Matka Kanyonu & Bit Pazar",
    title: "Matka Kanyonu Zümrüt Suları, Bit Pazar Avı & Büyük Veda Sofrası",
    sleep: "Üsküp · Aerodrom veya Merkez (Havalimanına 20 dk)",
    drive: "48 km · 1 sa 10 dk toplam şehir içi & kanyon sürüşü",
    walk: "4,5 km · Kanyon patikası & çarşı keşfi",
    risk: "Son geceyi valizleri düzenleyip dinlenerek geçirin; 6 Eylül sabahı araç iadesi ve uçuş var!",
    route: "Üsküp Merkez → Matka Kanyonu & Vrelo Mağarası Tekne Turu → Bit Pazar & Eski Çarşı → East Gate Mall → Büyük Kapanış Yemeği",
    timing: [
      "09:00–12:30: Matka Kanyonu'na intikal, kanyon tekne turu ve Vrelo Mağarası keşfi",
      "13:00–14:30: Kanyon kıyısında taze alabalık veya Eski Çarşı'da öğle yemeği",
      "15:00–17:30: Mert'in favorisi Bit Pazar antika ve vintage avı + Eski Çarşı kahvesi",
      "18:00–19:30: East Gate Mall son dakika gümrüksüz ve süpermarket alışverişleri",
      "20:00–22:30: Ekibin büyük veda ziyafeti, kutu oyunu turnuvası ve anıların paylaşılması",
      "22:45–23:30: Fatih'in son Splitwise mahkemesi ve kapanış hesaplaşması",
    ],
    car: "Matka Kanyonu hafta sonu yoğunlaşabilir; sabah erken saatte varıp resmî cebe park edin. Akşam AVM kapalı otoparkı rahattır.",
    foot: "Matka kanyonu boyunca yürüyüş yolu taşlıktır, rahat ayakkabı tercih edin.",
    eat: {
      summary: "Balkanlara veda ziyafeti; kanyon kıyısında balık, çarşıda kebap ve meşhur tatlılar.",
      places: "Kanyon Restaurant Matka veya Kaj Serdarot / Distrikt",
      mustTry: ["Taze Kanyon Alabalığı", "Üsküp Köftesi & Trileçe", "Makedon Şarabı", "Mastika"],
      tips: "Son geceyi şölene dönüştürün; tüm ekibin ortak anılarını kutlayın.",
    },
    shop: {
      summary: "Bit Pazar antikaları, East Gate Mall yerel lezzetler ve hatıra magnetleri.",
      target: "Üsküp Bit Pazarı & East Gate Mall",
      tips: "Balkan çikolataları, ajvar kavanozları ve hediyelik peynirleri süpermarketten uygun fiyata kapatın.",
    },
    highlights: ["Matka Kanyonu", "Vrelo Mağarası", "Bit Pazar Antika Avı", "Büyük Veda Ziyafeti"],
    points: ["skopje_bazaar", "skopje_bitpazar", "skopje_eastgate"],
  },
  {
    id: "G9",
    dayNumber: 9,
    date: "6 Eylül · Pazar",
    city: "Üsküp → İstanbul",
    title: "Depo Full, Araç İade, Havalimanı & Mutlu Son",
    sleep: "Ev / İstanbul",
    drive: "22 km · 25 dk (Şehir → SKP Havalimanı)",
    walk: "0,8 km · Terminal koridorları",
    risk: "14:20 uçuşu için en geç 11:30'da havalimanında araç başında olunmalıdır. Sabah gezi planlamayın!",
    route: "Otel Check-out → Benzinlik Depo Fulü → Kiralık Araç Teslimi → SKP Terminal → İstanbul",
    timing: [
      "08:30–09:30: Rahat kahvaltı & son valiz kontrolü (Pasaportlar el çantasında!)",
      "10:00–10:30: Otelden çıkış",
      "10:45–11:15: Havalimanı yakınında son benzinlikte depoyu tam fulleme & fişi alma",
      "11:30–12:00: Kiralık araç teslimi (Eyüpcan & Fatih iade tutanağı kontrolü)",
      "12:15–14:20: Bagaj teslim, pasaport kontrolü, Duty Free & 14:20 Uçuşu",
    ],
    car: "Aracı aldığınız yakıt seviyesinde (genelde full-to-full) teslim edin. Dış gövdenin son halini videoya çekin. Depozito iade fişini Fatih'e teslim edin.",
    foot: "Yalnızca terminal içi yürüyüş.",
    eat: {
      summary: "Hafif bir kahvaltı ve havalimanı kahvesi.",
      places: "Üsküp Havalimanı Cafe / Lounge",
      mustTry: ["Espresso", "Balkan Simidi"],
      tips: "Havalimanı içi fiyatlar yüksektir, bütçede kişisel olarak kaydedilir.",
    },
    shop: {
      summary: "SKP Duty Free son dakika gümrüksüz alışveriş.",
      target: "Üsküp Havalimanı Duty Free",
      tips: "Makedon şarabı veya lokal içki hakkınızı limitlere uygun şekilde kullanın.",
    },
    highlights: ["Sorunsuz Araç İadesi", "Depozito Çözümü", "İstanbul Uçuşu", "Efsane Yol Hikâyeleri"],
    points: ["skopje_airport"],
  },
];

export const masterChecklistTemplate: Omit<ChecklistItem, "assignedTo">[] = [
  // 🛂 Evraklar & Rezervasyon (6)
  {
    id: "doc_1",
    category: "docs",
    categoryLabel: "🛂 Evraklar & Rezervasyon",
    text: "Pasaport (En az 6 ay geçerli, 90 gün vizesiz)",
    desc: "Kuzey Makedonya ve Arnavutluk vizesizdir; ancak pasaportun seyahat bitişinden itibaren en az 6 ay geçerliliği şarttır.",
    checked: false,
  },
  {
    id: "doc_2",
    category: "docs",
    categoryLabel: "🛂 Evraklar & Rezervasyon",
    text: "Uçak & sigorta çıktıları (İstanbul ↔ Üsküp fiziki çıktı)",
    desc: "Sınır polisinin dönüş kanıtı sorma ihtimaline karşı telefon harici fiziki kâğıt çıktı.",
    checked: false,
  },
  {
    id: "doc_3",
    category: "docs",
    categoryLabel: "🛂 Evraklar & Rezervasyon",
    text: "Araç kiralama rezervasyon evrakı & Green Card (Yeşil Sigorta)",
    desc: "Kiralık aracın Arnavutluk'a geçiş izni, Green Card belgesi ve teslimat teyit yazısı.",
    checked: false,
  },
  {
    id: "doc_4",
    category: "docs",
    categoryLabel: "🛂 Evraklar & Rezervasyon",
    text: "Ehliyet (Yeni tip çipli sürücü belgesi)",
    desc: "Ana sürücü ve sözleşmeye eklenecek yedek sürücülerin yeni tip çipli ehliyeti.",
    checked: false,
  },
  {
    id: "doc_5",
    category: "docs",
    categoryLabel: "🛂 Evraklar & Rezervasyon",
    text: "Otel / Airbnb rezervasyon onayları & adres çıktıları",
    desc: "Üsküp, Ohri, Sarandë, Himarë ve Berat konaklamalarının check-in saatleri ve otopark talimatları.",
    checked: false,
  },
  {
    id: "doc_6",
    category: "docs",
    categoryLabel: "🛂 Evraklar & Rezervasyon",
    text: "Seyahat sağlık sigortası poliçesi (Islak imzalı/barkodlu)",
    desc: "Makedonya ve Arnavutluk'u kapsayan acil sağlık güvence poliçesi.",
    checked: false,
  },

  // 💶 Para, Nakit & Kartlar (6)
  {
    id: "money_1",
    category: "money",
    categoryLabel: "💶 Para & Kartlar",
    text: "Nakit Euro (€) — Ortak harcama, küçük kasabalar & acil rezerv",
    desc: "Kişi başı en az 200–300 EUR nakit (özellikle küçük banknotlar: 5€, 10€, 20€).",
    checked: false,
  },
  {
    id: "money_2",
    category: "money",
    categoryLabel: "💶 Para & Kartlar",
    text: "Makedon Dinarı (MKD) — İlk gün Üsküp, otoparklar & Bit Pazar",
    desc: "Otoyol gişeleri, sokak otoparkları ve Bit Pazarı tezgâhlarında MKD nakit gerekir.",
    checked: false,
  },
  {
    id: "money_3",
    category: "money",
    categoryLabel: "💶 Para & Kartlar",
    text: "Arnavutluk Leki (ALL) — Köy kahveleri, plajlar & otoparklar",
    desc: "Ksamil plajları, Blue Eye girişi (50 ALL) ve yerel restoranlarda kart geçmez; nakit Lek şarttır.",
    checked: false,
  },
  {
    id: "money_4",
    category: "money",
    categoryLabel: "💶 Para & Kartlar",
    text: "Yurt dışı kullanıma & temassıza açık kredi/banka kartları",
    desc: "Bankanızdan yurt dışı işlem ve temassız ödeme limitlerini seyahat öncesi açtırın.",
    checked: false,
  },
  {
    id: "money_5",
    category: "money",
    categoryLabel: "💶 Para & Kartlar",
    text: "Yedek banka kartı & acil durum nakit zulası",
    desc: "Ana kartın bloke olması veya ATM yutması riskine karşı ayrı çantada tutulan yedek kart.",
    checked: false,
  },
  {
    id: "money_6",
    category: "money",
    categoryLabel: "💶 Para & Kartlar",
    text: "Splitwise uygulaması ve 'Balkan 2026' ortak grubu hazır",
    desc: "Fatih'in mali arbitraj masası için 4 kişinin ekli olduğu EUR para birimli grup.",
    checked: false,
  },

  // 🎒 Giyim, Plaj & Ayakkabı (7)
  {
    id: "wear_1",
    category: "clothing",
    categoryLabel: "🎒 Giyim & Plaj",
    text: "Rahat yürüyüş ayakkabısı (Kale, kanyon & antik taş sokaklar)",
    desc: "Ohri Samuel Kalesi, Gjirokastër dik arnavut kaldırımları ve Butrint için kaymaz tabanlı spor ayakkabı.",
    checked: false,
  },
  {
    id: "wear_2",
    category: "clothing",
    categoryLabel: "🎒 Giyim & Plaj",
    text: "Mayo / Bikini / Deniz şortu (Ksamil, Himarë & Borsh için yedekli)",
    desc: "Günde 2 farklı koya girme ihtimaline karşı en az 2-3 adet yedekli deniz kıyafeti.",
    checked: false,
  },
  {
    id: "wear_3",
    category: "clothing",
    categoryLabel: "🎒 Giyim & Plaj",
    text: "Hızlı kuruyan mikrofiber plaj havlusu",
    desc: "Valizde yer kaplamayan, kum tutmayan kompakt mikrofiber havlu.",
    checked: false,
  },
  {
    id: "wear_4",
    category: "clothing",
    categoryLabel: "🎒 Giyim & Plaj",
    text: "Güneş gözlüğü ve UV korumalı şapka",
    desc: "Adriyatik güneşi altında araç sürüşü ve plaj saatleri için zorunlu koruma.",
    checked: false,
  },
  {
    id: "wear_5",
    category: "clothing",
    categoryLabel: "🎒 Giyim & Plaj",
    text: "Hafif yağmurluk / Akşam serinliği için hırka",
    desc: "Llogara dağ geçidi (1.043m) ve göl kıyısı akşam serinliği için hafif bir üst.",
    checked: false,
  },
  {
    id: "wear_6",
    category: "clothing",
    categoryLabel: "🎒 Giyim & Plaj",
    text: "Hafif akşam kıyafeti (Restoranlar & kordon yürüyüşleri)",
    desc: "Sarandë ve Himarë sahil tavernalarında şık ve rahat bir akşam için.",
    checked: false,
  },
  {
    id: "wear_7",
    category: "clothing",
    categoryLabel: "🎒 Giyim & Plaj",
    text: "Deniz ayakkabısı (Taşlık kıyılar, Livadhi ve Borsh için)",
    desc: "Riviera sahillerindeki çakıllı zeminlerde rahat yüzmek için deniz patiği.",
    checked: false,
  },

  // 🩹 Sağlık & Koruma (7)
  {
    id: "health_1",
    category: "health",
    categoryLabel: "🩹 Sağlık & Koruma",
    text: "Güneş kremi (50+ SPF suya dayanıklı yüksek koruma)",
    desc: "Tüm gün güneş altında deniz ve yürüyüş için yüksek koruyuculuk.",
    checked: false,
  },
  {
    id: "health_2",
    category: "health",
    categoryLabel: "🩹 Sağlık & Koruma",
    text: "Böcek & Sivrisinek kovucu sprey (Özellikle Butrint için)",
    desc: "Butrint bataklık/lagün çevresi ve açık hava akşam yemekleri için sinek kovucu.",
    checked: false,
  },
  {
    id: "health_3",
    category: "health",
    categoryLabel: "🩹 Sağlık & Koruma",
    text: "Kişisel düzenli ilaçlar, ağrı kesici & mide koruyucu",
    desc: "Parol, Arveles, mide hapı ve kişisel reçeteli ilaçlar.",
    checked: false,
  },
  {
    id: "health_4",
    category: "health",
    categoryLabel: "🩹 Sağlık & Koruma",
    text: "Mide bulantısı hapı (SH8 & Llogara virajlı kıyı yolları için)",
    desc: "Llogara Geçidi ve Riviera sahil virajlarında hassas mideler için bulantı önleyici.",
    checked: false,
  },
  {
    id: "health_5",
    category: "health",
    categoryLabel: "🩹 Sağlık & Koruma",
    text: "Yara bandı, dezenfektan mendil & küçük ilk yardım kiti",
    desc: "Yürüyüşte su toplaması, küçük sıyrıklar ve hijyen için acil müdahale seti.",
    checked: false,
  },
  {
    id: "health_6",
    category: "health",
    categoryLabel: "🩹 Sağlık & Koruma",
    text: "Seyahat sigortası poliçe numarası & acil destek hattı",
    desc: "Olası hastane veya doktor ihtiyacında aranacak acil çağrı numarası.",
    checked: false,
  },
  {
    id: "health_7",
    category: "health",
    categoryLabel: "🩹 Sağlık & Koruma",
    text: "Elektrolit / Efervesan tablet (Sıcak günler için)",
    desc: "Sıcakta terlemeyle kaybedilen mineralleri yerine koymak için Magnezyum & C vitamini.",
    checked: false,
  },

  // 🔌 Elektronik & Şarj (7)
  {
    id: "elec_1",
    category: "electronics",
    categoryLabel: "🔌 Elektronik & Şarj",
    text: "Yüksek kapasiteli Powerbank (20.000 mAh)",
    desc: "Tüm gün navigasyon, fotoğraf ve video çekimi için kesintisiz enerji.",
    checked: false,
  },
  {
    id: "elec_2",
    category: "electronics",
    categoryLabel: "🔌 Elektronik & Şarj",
    text: "Uzun şarj kabloları (Type-C / Lightning — en az 1.5–2m)",
    desc: "Aracın arka koltuğundan çakmaklık şarjına rahatça yetişen uzun kablolar.",
    checked: false,
  },
  {
    id: "elec_3",
    category: "electronics",
    categoryLabel: "🔌 Elektronik & Şarj",
    text: "Uluslararası dönüştürücüye gerek yok (Aynı C/F priz tipi)",
    desc: "Kuzey Makedonya ve Arnavutluk'ta Türkiye ile aynı standart Avrupa tipi prizler kullanılır.",
    checked: false,
  },
  {
    id: "elec_4",
    category: "electronics",
    categoryLabel: "🔌 Elektronik & Şarj",
    text: "Google Maps çevrimdışı haritaları (Makedonya + Arnavutluk)",
    desc: "Sınırlarda ve dağ yollarında internet çekmediğinde navigasyonun kesilmemesi için önceden indirilmiş harita.",
    checked: false,
  },
  {
    id: "elec_5",
    category: "electronics",
    categoryLabel: "🔌 Elektronik & Şarj",
    text: "Araç için sağlam telefon tutucu",
    desc: "Kiralık aracın havalandırma ızgarasına takılan manyetik/kıskaçlı navigasyon tutucu.",
    checked: false,
  },
  {
    id: "elec_6",
    category: "electronics",
    categoryLabel: "🔌 Elektronik & Şarj",
    text: "Çift çıkışlı araç çakmaklık hızlı şarj adaptörü",
    desc: "Aynı anda 2 telefonu yolda hızlı şarj edebilen Type-C / USB çakmaklık başlığı.",
    checked: false,
  },
  {
    id: "elec_7",
    category: "electronics",
    categoryLabel: "🔌 Elektronik & Şarj",
    text: "Araç içi Bluetooth FM verici / AUX kablosu",
    desc: "Kiralık aracın teybinde Bluetooth olmaması durumunda yol müzikleri için garanti köprü.",
    checked: false,
  },

  // 🚗 Yol & Araç İçi (6)
  {
    id: "road_1",
    category: "custom",
    categoryLabel: "🚗 Yol & Araç İçi",
    text: "Araç sigortası Yeşil Kart (Green Card) fiziki belgesi",
    desc: "Sınır kapısında polisin kontrol ettiği araç uluslararası sigorta belgesi.",
    checked: false,
  },
  {
    id: "road_2",
    category: "custom",
    categoryLabel: "🚗 Yol & Araç İçi",
    text: "Yakıt kartı / nakit yakıt rezervi",
    desc: "Yol boyu otoyol benzinliklerinde yakıt ikmali için ayrılan nakit/kart payı.",
    checked: false,
  },
  {
    id: "road_3",
    category: "custom",
    categoryLabel: "🚗 Yol & Araç İçi",
    text: "Küçük yol atıştırmalıkları, sakız & su stoku",
    desc: "Uzun transfer etaplarında acil kan şekeri düşüşlerine ve susuzluğa karşı stok.",
    checked: false,
  },
  {
    id: "road_4",
    category: "custom",
    categoryLabel: "🚗 Yol & Araç İçi",
    text: "100 saatlik Balkan yol şarkıları & çevrimdışı playlist",
    desc: "Dino Merlin, Goran Bregović, Ceca ve 90'lar Türkçe pop yol müzikleri.",
    checked: false,
  },
  {
    id: "road_5",
    category: "custom",
    categoryLabel: "🚗 Yol & Araç İçi",
    text: "Sınır geçişi için pasaport & araç evrakı torpido/el altında",
    desc: "Sınır kapısına gelindiğinde bagaj açmadan saniyeler içinde polise uzatılacak düzen.",
    checked: false,
  },
  {
    id: "road_6",
    category: "custom",
    categoryLabel: "🚗 Yol & Araç İçi",
    text: "Araç teslim anı hasar/çizik video & fotoğrafları",
    desc: "Havalimanında aracı alırken jant, tampon ve camlardaki mevcut çiziklerin video kaydı.",
    checked: false,
  },
];

// Detailed Real GPS Road Coordinates for all 8 days (Tracing actual highway curves & mountain passes)
export const realRoadPaths: Record<string, [number, number][]> = {
  G0: [
    [41.9616, 21.6214], // Skopje Airport
    [41.9723, 21.5832], // A4 Highway
    [42.0003, 21.4371], // Skopje Old Bazaar / Stone Bridge
    [41.9986, 20.9715], // Tetovo (A2 Highway)
    [41.7967, 20.9082], // Gostivar
    [41.6734, 20.8756], // Straža Pass (1.010m Börekçisi)
    [41.5123, 20.9582], // Kičevo
    [41.3412, 20.8354], // Botun
    [41.1147, 20.7936], // Ohrid Old Town & Fortress
    [41.1112, 20.7884], // Kaneo Church
    [41.1765, 20.6789], // Struga
    [41.1523, 20.5892], // Qafë Thanë Border Crossing
    [40.8976, 20.6654], // Pogradec
    [40.6145, 20.7765], // Korçë
    [40.3421, 20.6843], // Ersekë
    [40.1654, 20.2876], // Përmet / Kelcyre Gorge
    [40.0736, 20.1408], // Gjirokastër Castle & Bazaar
    [39.9865, 20.1876], // Muzinë Pass (SH78)
    [39.9236, 20.1919], // Syri i Kaltër (Blue Eye)
    [39.8753, 20.0058], // Sarandë Promenade
    [39.7689, 20.0048], // Ksamil Beach & Islands
    [39.7444, 20.0213], // Butrint UNESCO Park
    [39.8753, 20.0058], // Sarandë Return
    [39.9912, 19.9145], // Lukovë
    [40.0611, 19.8522], // Borsh Beach & Waterfall
    [40.0622, 19.7919], // Porto Palermo Ali Pasha Fortress
    [40.0898, 19.7645], // Qeparo
    [40.1039, 19.7456], // Himarë Spile & Livadhi Beach
    [40.1512, 19.6412], // Dhermi
    [40.1983, 19.5961], // Llogara Mountain Pass (1.043m Panorama)
    [40.4234, 19.4876], // Vlorë
    [40.7234, 19.5567], // Fier (A2 Highway)
    [40.7058, 19.9522], // Berat Mangalem & Castle
    [40.8543, 19.8876], // Belsh Lakes
    [41.1123, 20.0845], // Elbasan
    [41.1523, 20.5892], // Qafë Thanë Border (Return)
    [41.5123, 20.9582], // Kičevo
    [41.7967, 20.9082], // Gostivar
    [41.9986, 20.9715], // Tetovo
    [42.0003, 21.4371], // Skopje Center
    [41.9616, 21.6214], // Skopje Airport
  ],
  G1: [
    [41.9616, 21.6214], // SKP Airport
    [41.9723, 21.5832], // A4 Highway
    [41.9867, 21.5124], // Gazi Baba junction
    [41.9965, 21.4589], // East Gate Mall
    [42.0003, 21.4371], // Skopje Old Bazaar / Stone Bridge
    [42.0042, 21.4418], // Bit Pazar
  ],
  G2: [
    [42.0003, 21.4371], // Skopje
    [41.9942, 21.3654], // Gjorce Petrov exit
    [41.9835, 21.2012], // A2 Highway
    [41.9986, 20.9715], // Tetovo
    [41.7967, 20.9082], // Gostivar
    [41.6734, 20.8756], // Straža Pass (Börekçisi - 1010m)
    [41.5123, 20.9582], // Kičevo
    [41.3412, 20.8354], // Botun
    [41.2298, 20.7645], // Trebeništa
    [41.1147, 20.7936], // Ohrid Old Town & Fortress
    [41.1112, 20.7884], // St. John at Kaneo
  ],
  G3: [
    [41.1147, 20.7936], // Ohrid
    [41.1765, 20.6789], // Struga
    [41.1523, 20.5892], // Qafë Thanë Border Gate (Macedonia/Albania)
    [41.0945, 20.6432], // Prrenjas
    [40.8976, 20.6654], // Pogradec lake coast
    [40.6145, 20.7765], // Korçë
    [40.3421, 20.6843], // Ersekë
    [40.2312, 20.4432], // Leskovik mountain road
    [40.1654, 20.2876], // Përmet / Kelcyre gorge
    [40.0736, 20.1408], // Gjirokastër Castle & Bazaar
    [39.9865, 20.1876], // Muzinë Pass (SH78)
    [39.9236, 20.1919], // Syri i Kaltër (Blue Eye)
    [39.8753, 20.0058], // Sarandë Promenade
  ],
  G4: [
    [39.8753, 20.0058], // Sarandë
    [39.8245, 20.0123], // Çuka / Channel
    [39.7689, 20.0048], // Ksamil Beach & Islands
    [39.7444, 20.0213], // Butrint UNESCO National Park
    [39.7689, 20.0048], // Ksamil return
    [39.8753, 20.0058], // Sarandë
  ],
  G5: [
    [39.8753, 20.0058], // Sarandë
    [39.9456, 19.9543], // Shen Vasil
    [39.9912, 19.9145], // Lukovë
    [40.0611, 19.8522], // Borsh Beach & Waterfall
    [40.0622, 19.7919], // Porto Palermo Ali Pasha Fortress
    [40.0898, 19.7645], // Qeparo
    [40.1039, 19.7456], // Himarë Spile & Livadhi Beach
  ],
  G6: [
    [40.1039, 19.7456], // Himarë (Livadhi Beach)
    [40.1512, 19.6412], // Dhermi / Drymades
    [40.1983, 19.5961], // Llogara Mountain Pass (1.043m Panorama)
    [40.2876, 19.4987], // Dukat / Orikum
    [40.4234, 19.4876], // Vlorë bypass
    [40.7234, 19.5567], // Fier (A2 Highway)
    [40.6876, 19.7543], // Roskovec / Ura Vajgurore
    [40.7058, 19.9522], // Berat (Mangalem & Gorica Bridge)
  ],
  G7: [
    [40.7058, 19.9522], // Berat Castle
    [40.7512, 19.9123], // Kuçovë
    [40.8543, 19.8876], // Belsh Lakes
    [41.1123, 20.0845], // Elbasan
    [41.1765, 20.3123], // Librazhd
    [41.1523, 20.5892], // Qafë Thanë Border Crossing
    [41.1765, 20.6789], // Struga
    [41.3412, 20.8354], // Botun
    [41.5123, 20.9582], // Kičevo
    [41.6734, 20.8756], // Straža
    [41.7967, 20.9082], // Gostivar
    [41.9986, 20.9715], // Tetovo (A2)
    [41.9965, 21.4589], // Skopje East Gate Mall
    [42.0003, 21.4371], // Skopje Center
  ],
  G8: [
    [42.0003, 21.4371], // Skopje Center
    [41.9867, 21.5124], // A4 Highway
    [41.9616, 21.6214], // Skopje Airport (SKP Return)
  ],
};

// Flight Arcs (Istanbul IST ↔ Skopje SKP)
export const flightArcs = {
  outbound: [
    [41.2753, 28.7519], // Istanbul IST
    [41.4500, 27.0000],
    [41.6800, 25.1000],
    [41.8500, 23.2000],
    [41.9616, 21.6214], // Skopje SKP
  ] as [number, number][],
  returnFlight: [
    [41.9616, 21.6214], // Skopje SKP
    [41.8500, 23.2000],
    [41.6800, 25.1000],
    [41.4500, 27.0000],
    [41.2753, 28.7519], // Istanbul IST
  ] as [number, number][],
};


export const stayMatrix = [
  {
    city: "Üsküp",
    nights: "2 gece",
    area: "Debar Maalo / Merkez (son gece Aerodrom alternatif)",
    type: "2 yatak odalı apart / daire",
    filter: "Özel otopark, klima, iptal seçeneği, havalimanı çıkışı",
    why: "Şehir gecelerinde araçtan çok yürüyüş ve kafe önemli; dönüş gecesinde ise sabah havalimanına hızlı erişim gerekir.",
  },
  {
    city: "Ohri",
    nights: "1 gece",
    area: "Old Town alt kotu veya göl kıyısı",
    type: "Pansiyon / butik apart",
    filter: "Teyitli otopark, erken check-out, göle yürüme",
    why: "Samuel Kalesi ve Kaneo yürüyüşü için konum avantajı; yokuş içindeki park cezası ve dar sokak riskini sıfırlar.",
  },
  {
    city: "Sarandë",
    nights: "2 gece",
    area: "Merkez veya Rruga Butrinti",
    type: "Parklı otel (2 oda)",
    filter: "Balkon, klima, 24 saat resepsiyon, sabit otopark",
    why: "Kıyıdaki en yoğun lojistik üssünüz; iki akşam ve Ksamil günü için bavul açıp sabit kalmak yorgunluğu önler.",
  },
  {
    city: "Himarë",
    nights: "1 gece",
    area: "Merkez / Spile sahil kordonu",
    type: "Butik sahil oteli",
    filter: "Otopark dahil, plaja yürüme, geç check-in",
    why: "SH8 Riviera gününü karanlığa bırakmamak ve akşam arabaya binmeden tavernalarda rahat etmek için.",
  },
  {
    city: "Berat",
    nights: "1 gece",
    area: "Gorica veya Mangalem dış çeperi",
    type: "Tarihî konuk evi / apart",
    filter: "Arabayla erişim, dar sokak dışı güvenli park",
    why: "Tarihî merkezde park aramak yerine aracı rahat bırakıp sabah kale ve pencereli evleri taze enerjiyle gezmek için.",
  },
];

export const foodMatrix = [
  {
    city: "Üsküp",
    order: "Kebapi, şopska, közlenmiş ajvar, fırın somun",
    candidates: "Destan Kebap · Kaj Serdarot · Pivnica An",
    band: "400–1.000 MKD / kişi (~7–16 €)",
    note: "Eski Çarşı'da ilk akşam için sade, samimi masa; 4 kişi için açık saat ve masa teyidi yapın.",
  },
  {
    city: "Ohri",
    order: "Tavče gravče, kaşkaval tava, göl kıyısı kahvesi",
    candidates: "Belvedere · Kaj Chetkarot · Kaneo Restaurant",
    band: "400–1.200 MKD / kişi (~7–20 €)",
    note: "Gün batımı öncesi Kaneo manzaralı masa; alabalıkta kg fiyatı teyit edilmelidir.",
  },
  {
    city: "Gjirokastër",
    order: "Qifqi (pirinç köftesi), byrek, qofte, fërgesë",
    candidates: "Taverna Kuka · Kujtimi · Tradicional Odaja",
    band: "8–15 EUR / kişi (ALL nakit)",
    note: "Transfer gününde 45–60 dakikayı aşmayan hızlı, lezzetli ve yerel öğle yemeği.",
  },
  {
    city: "Sarandë & Ksamil",
    order: "Günün taze balığı, Butrint midyesi, ızgara karides",
    candidates: "Fish Filipi · Taverna Rustico · Sophra · The Mussel House",
    band: "10–25 EUR / kişi (Özel deniz ürünü masası 25–35 €)",
    note: "Grupça bir 'büyük deniz mahsulü' akşamı; balığın kilosu ve tahmini gramajı siparişten önce sorulur.",
  },
  {
    city: "Himarë",
    order: "Izgara ahtapot, taze çipura, Yunan-Arnavut mezeleri",
    candidates: "Taverna Lefteri · Velco · Himara 28",
    band: "8–15 EUR gündüz; akşam sofrası 20–30 EUR",
    note: "Lefteri bölgenin en popüler noktasıdır; akşam 20:00'de masa için erken gidilmelidir.",
  },
  {
    city: "Berat",
    order: "Tavë Kosi (yoğurtlu kuzu), pispili, fërgesë",
    candidates: "Antigoni · Tradita e Beratit · Ballkoni Gorices",
    band: "8–18 EUR / kişi",
    note: "Antigoni terasından karşıdaki Mangalem pencerelerini izleyerek akşam yemeği yemesi paha biçilemez.",
  },
];

export const shoppingMatrix = [
  {
    city: "Üsküp",
    status: "Ana Alışveriş Durağı",
    place: "East Gate Mall (Belasitsa 2)",
    purpose: "Giyim, marka mağazaları, süpermarket, elektronik kıyaslama",
    note: "10:00–22:00 saatleri arasında açık. Geniş otoparkı var. Yağmur veya seyahat sonu tedariki için ideal.",
  },
  {
    city: "Üsküp",
    status: "Kültürel & Ucuz Keşif",
    place: "Üsküp Bit Pazarı (Old Bazaar Kuzeyi)",
    purpose: "Ucuz tekstil, ayakkabı, meyve-sebze, antika ve pazar atmosferi",
    note: "Nakit MKD gereklidir. Sabah erken saatlerde hareketlidir. Pazarlık yapılır.",
  },
  {
    city: "Gjirokastër",
    status: "El Sanatları & Hatıra",
    place: "Eski Çarşı (Old Bazaar)",
    purpose: "Taş oyma biblolar, el dokuması dantel, dağ kekiği, ahşap ürünler",
    note: "20–30 dakika yeterlidir. Bagajda yer kaplamayacak küçük otantik ürünler seçin.",
  },
  {
    city: "Himarë & Borsh",
    status: "Yerel Gurme Tedarik",
    place: "Yol Kenarı Köy Tezgâhları",
    purpose: "Soğuk sıkım zeytinyağı, dağ balı, kekik, kurutulmuş meyve",
    note: "Kıyı zeytinyağları olağanüstü kalitededir; pet şişede sağlam ambalajlayıp bagaja koyun.",
  },
  {
    city: "Berat & Ohri",
    status: "Şarap & Geleneksel Tatlar",
    place: "Çarşı Dükkânları & Butik Şaraphaneler",
    purpose: "Berat ceviz reçeli (Gliko), Çobo şarabı, Ohri incisi (sertifikalı)",
    note: "Ohri incisinde yalnızca Talevi veya Filevi atölyelerini seçin. Sıvı reçelleri kabin bagajına almayın.",
  },
];

export const tenRules = [
  {
    id: 1,
    title: "Yazılı Sınır Geçiş İzni",
    desc: "Kiralık araç sözleşmesinde Kuzey Makedonya ve Arnavutluk'un açıkça izinli olduğu, Green Card ve sınır belgesinin fiziksel kopyası teslim anında onaylanmalıdır.",
  },
  {
    id: 2,
    title: "Otopark 'Teyitsiz' Asla Bırakılmaz",
    desc: "Üsküp ve Ohri Old Town'da, Sarandë sahilinde 'millet koymuş ben de koyayım' demeyin. Kaldırım parkına 20.000 ALL ceza vardır. Mutlaka tabela ve makbuz görün.",
  },
  {
    id: 3,
    title: "G3 & G7 İçin Şafak Disiplini",
    desc: "31 Ağustos (Ohri → Sarandë) ve 4 Eylül (Berat → Üsküp) etapları sınır ve virajlarla 8–10 saattir. Sabah en geç 06:45–07:00'de kontak çevrilir.",
  },
  {
    id: 4,
    title: "Uçuş Sabahına Asla Uzun Yol Bırakılmaz",
    desc: "6 Eylül 14:20 uçuşu öncesinde son gece Üsküp'te uyunur. Uçuş sabahı sadece 25 dakikalık havalimanı sürüşü ve araç iadesi yapılır.",
  },
  {
    id: 5,
    title: "Balık Siparişinde 'Kg / Tartı' Kuralı",
    desc: "Kıyıda (Sarandë, Ksamil, Himarë) bütün balık veya ahtapot sipariş etmeden önce kg fiyatı ve tabağa gelecek gramaj garsona netçe sorulur.",
  },
  {
    id: 6,
    title: "Elektronik 'Ucuzdur' Varsayımıyla Alınmaz",
    desc: "Neptun vb. mağazalarda telefon/bilgisayar alırken Türkiye satış fiyatı, IMEI kayıt harcı, servis garantisi ve klavye/priz uyumu hesaba katılmadan kart çekilmez.",
  },
  {
    id: 7,
    title: "Küçük Nakit (ALL & MKD) Hayat Kurtarır",
    desc: "Otoyol gişeleri, köy kahveleri, Blue Eye girişi (50 ALL) ve plaj otoparklarında kart geçmez. Fatih'in nakit stoğu her daim hazır tutulur.",
  },
  {
    id: 8,
    title: "Ksamil'e 09:00'dan Önce Varılır",
    desc: "Ksamil plajları ve özel otoparkları 09:30'da tıkanır. Deniz sabah erken alınır; Butrint ise sıcaktan kaçmak için 16:00'ya bırakılır.",
  },
  {
    id: 9,
    title: "Kişisel Harcama Ortak Kasaya Girmez",
    desc: "Kıyafet, elektronik, hediyelik eşya, özel kokteyl ve kişisel siparişler Splitwise'a yazılmaz. Ortak kasa: araç, yakıt, otopark, konaklama ve ortak sofradır.",
  },
  {
    id: 10,
    title: "Her Gece 22:30 Splitwise Kapanışı",
    desc: "Günün bütün fişleri fotoğraflanır, EUR'ya çevrilir, Splitwise'a girilir ve hesaplar gün aşırı ertelenmeden kapatılır.",
  },
];
