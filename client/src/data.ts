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
    badge: "🌙 İSTANBUL BEKÇİSİ · 'BENİM BİR ABİM VAR' BAŞKANI 📱",
    role: "İstanbul Bekçisi · Fenomenlerle FaceTime & 'Benim Bir Abim Var' Şefi",
    title: "İstanbul Nöbetçisi, Yarı Ünlü Networker & Sıfır İş Mangal Gurmesi",
    quote: "“Ya benim bir abim var tam bu işi yapıyor... Dur hatta dur sana görüntülü arayayım bak!”",
    photo: assets.enis,
    summary: "Yarı ünlü fenomenlerle aniden görüntülü konuşan, her cümleye 'benim bir abim var' ile başlayan, montlu İstanbul bekçisi.",
    detail:
      "Dünyanın en masum ve temiz kalpli insanı; ekip Balkanlar'dayken İstanbul'un asayişini ve piyasalarını tek başına bekler. Herhangi bir konu açıldığında lafa istisnasız “Ya benim bir abim var...” diye başlar ve akla hayale gelmeyecek sektörlerden bir tanıdık referansı çıkarır. En büyük hobilerinden biri, Instagram ve TikTok'taki yarı ünlü sosyal medya fenomenleriyle durduk yere FaceTime açıp görüntülü konuşarak sohbete renk katıp herkesi güldürmektir. Tam bir mangal sevdalısıdır fakat mangal yakılırken tek bir çöp bile taşımaz; montuna sarılıp sandalyeye kurularak sadece makara yapar. Ağustos sıcağında bile montla gezmesiyle meşhurdur. Eskiden rüzgar gibi estiği motorunu sattığı için anılarını yad eder; diğer yandan ise evlilik arifesinde olduğu için Nişantaşı butiklerinde gelinlik bakıp tatlı telaşlar yaşar. Kaputu aylardır kuş pisliğiyle kaplı arabasıyla usta şoförlük sergiler. Ortamda yabancı bir kız görünce anında sessize alması ve saf esnaf samimiyetiyle ekibin bir tanesidir.",
    duties: [
      "Her probleme 'benim bir abim var' diyerek esnaf network'ünden efsanevi referanslar üretmek.",
      "Yarı ünlü sosyal medya fenomenlerini aniden görüntülü arayıp ekibe el sallatmak.",
      "Mangal başında sıfır iş yapıp montla sandalyeye kurularak ortama kesintisiz makara sağlamak.",
      "Nişantaşı gelinlik turları arasında Harem Altın'dan altın/euro arbitraj analizi geçmek.",
      "35 derece sıcakta bile üşümeyi başarıp yedek mont/hırka tedarikini sağlamak.",
    ],
    weakness: "Ortamda aniden beliren tanımadığı kızlar, telefon şarjının bitmesi (FaceTime yapamaz), 'abim' dediği kişinin telefonu açmaması, oto yıkama ücreti ve Nişantaşı gelinlik fiyatları.",
    secretWeapon: "Yarı ünlü fenomen rehberi, 'Benim bir abim var' kartviziti, yaz kış üzerinden çıkmayan montu ve usta direksiyonu.",
    tags: ["🌙 RESMÎ İSTANBUL BEKÇİSİ", "Benim Bir Abim Var", "Fenomenlerle FaceTime", "Mangalda Sıfır İş", "Yaz Kış Montlu"],
    focus: "Fenomen FaceTime seansları, 'benim bir abim var' çözümleri, mangal makarası ve altın takibi.",
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
  durres_amphitheatre: {
    id: "durres_amphitheatre",
    label: "Durrës (Dıraç Sahili & Roma Amfitiyatrosu)",
    city: "Durrës",
    country: "Arnavutluk",
    lat: 41.3128,
    lng: 19.4453,
    type: "culture",
    desc: "Balkanların en büyük antik Roma amfitiyatrolarından biri, Venedik Kulesi ve Adriyatik sahil kordonu.",
    parkingTip: "Liman yakınındaki geniş otoparkı veya Airbnb konaklama otoparkını kullanın; kordon trafiğine girmeyin.",
  },
  tirana_skanderbeg: {
    id: "tirana_skanderbeg",
    label: "Tiran (İskender Bey Meydanı & Bunk'Art 2)",
    city: "Tiran",
    country: "Arnavutluk",
    lat: 41.3275,
    lng: 19.8187,
    type: "culture",
    desc: "Arnavutluk başkenti; İskender Bey Meydanı, Ethem Bey Camii, Piramit ve Blloku canlı kafe bölgesi.",
    parkingTip: "Şehir merkezinde sokak parkı çok zordur. Aracı Airbnb otoparkına bırakıp şehri yürüyerek gezin.",
  },
};

export const dayPlans: DayPlan[] = [
  {
    id: "G0",
    dayNumber: 0,
    date: "29 Ağustos – 6 Eylül 2026",
    city: "Tüm Balkan Döngüsü (1.220 km)",
    title: "İstanbul ✈️ Üsküp → Ohri → Sarandë (3G) → Durrës → Tiran → Üsküp ✈️ İstanbul",
    sleep: "Üsküp (2 Gece) · Ohri (1 Gece) · Sarandë (3 Gece) · Durrës (1 Gece) · Tiran (1 Gece)",
    drive: "Toplam ~1.220 km Karayolu Sürüşü + 2 Uçuş",
    walk: "Toplam ~76 km Antik Kent, Kale, Kordon & Doğa Yürüyüşü",
    risk: "Qafë Thanë sınır kapısı pasaport kuyruğu & Llogara virajlı dağ geçidi",
    route: "İstanbul ✈️ SKP → A2 Otoyolu → Ohri → Qafë Thanë Sınırı → Gjirokastër → Blue Eye → Sarandë (Ksamil / Butrint / Borsh) → Llogara Dağ Geçidi → Vlorë → Durrës → Tiran → Elbasan → Qafë Thanë → Üsküp (Matka) → SKP ✈️ İstanbul",
    timing: [
      "G1 (29 Ağu): İstanbul ✈️ Üsküp iniş, araç teslimi ve Eski Çarşı / Bit Pazar keşfi (29-30 Üsküp Airbnb - 3.019 ₺)",
      "G2 (30 Ağu): Üsküp → Straža Dağ Geçidi böreği → Ohri Samuel Kalesi & Kaneo gün batımı (30-31 Ohri Airbnb - 4.594 ₺)",
      "G3 (31 Ağu): Ohri → Qafë Thanë sınırı → Gjirokastër Kalesi → Blue Eye → Sarandë kordonu (31 Ağu-3 Eyl Sarandë Otel - 1. Gece)",
      "G4 (1 Eyl): Sarandë → Ksamil Adalar koyu & Butrint UNESCO antik kenti (Sarandë Otel - 2. Gece)",
      "G5 (2 Eyl): Sarandë → Borsh Koyu & Şelalesi, Porto Palermo & İyon Denizi dinlenmesi (Sarandë Otel - 3. Gece)",
      "G6 (3 Eyl): Sarandë → Llogara Dağ Geçidi (1.043m) → Vlorë → Durrës Amfitiyatro & Kordon (3-4 Durrës Airbnb - 5.512 ₺)",
      "G7 (4 Eyl): Durrës → Tiran İskender Bey Meydanı, Bunk'Art 2, Piramit & Blloku gecesi (4-5 Tiran Airbnb - 3.812 ₺)",
      "G8 (5 Eyl): Tiran → Qafë Thanë Sınırı → Gostivar → Üsküp Matka Kanyonu & Veda Ziyafeti (5-6 Üsküp Airbnb - 4.429 ₺)",
      "G9 (6 Eyl): Üsküp → SKP Havalimanı araç iadesi → İstanbul ✈️ Büyük Dönüş",
    ],
    car: "Tüm rota boyunca kiralık araçla Kuzey Makedonya ve Arnavutluk karayolları, otoyolları ve virajlı sahil yolları kullanılır.",
    foot: "Ohri kalesi, Gjirokastër dik taş yokuşları, Butrint antik kenti, Durrës amfitiyatrosu ve Tiran caddeleri yürünerek keşfedilir.",
    eat: {
      summary: "9 gün boyunca kebap, tavče gravče, lagün midyesi, taze deniz mahsulleri, Durrës balığı ve Tiran lezzetleri.",
      places: "Destan, Belvedere Ohri, Taverna Kuka, The Mussel House, Taverna Lefteri, Durrës Vollga, Tiran Pazari i Ri.",
      mustTry: ["Destan Köfte & Şopska", "Ohri Alabalığı", "Butrint Lagün Midyesi", "Adriyatik Deniz Mahsulleri", "Tiran Fërgesë"],
      tips: "Yerel küçük mekanlarda nakit ödeyin; balığı sipariş etmeden önce kilogram fiyatına göre tarttırın.",
    },
    shop: {
      summary: "Üsküp Bit Pazarı, East Gate Mall, Gjirokastër taş oymaları, Tiran Pazari i Ri ve sızma zeytinyağı.",
      target: "Yerel hediyelikler, deri eşyalar, zeytinyağı, kahve ve elektronik.",
      tips: "Pazarlarda nakit MKD/ALL ile pazarlık yapın; büyük alışverişleri AVM'de kartla halledin.",
    },
    highlights: [
      "İstanbul ✈️ Üsküp gidiş-dönüş uçuşları",
      "Ohri Gölü ve Kaneo Kilisesi gün batımı",
      "Syri i Kaltër (Mavi Göz) buz gibi kaynak suyu",
      "Ksamil 3 Adalar ve Butrint UNESCO Antik Kenti",
      "3 Gece Kesintisiz Sarandë İyon Kıyısı Keyfi",
      "Llogara Dağ Geçidi (1.043m) panoramik Adriyatik manzarası",
      "Durrës Antik Roma Amfitiyatrosu & Vollga Sahili",
      "Tiran İskender Bey Meydanı & Bunk'Art 2",
      "Matka Kanyonu zümrüt yeşili tekne keşfi",
    ],
    points: [
      "istanbul_airport",
      "skopje_airport",
      "skopje_bazaar",
      "ohrid_oldtown",
      "ohrid_kaneo",
      "gjirokaster_castle",
      "blue_eye",
      "sarande_promenade",
      "ksamil_islands",
      "butrint_park",
      "borsh_beach",
      "porto_palermo",
      "llogara_pass",
      "durres_amphitheatre",
      "tirana_skanderbeg",
      "skopje_eastgate",
    ],
  },
  {
    id: "G1",
    dayNumber: 1,
    date: "29 Ağustos · Cumartesi",
    city: "İstanbul → Üsküp",
    title: "Balkan Topraklarına İniş & Eski Çarşı İlk Adım",
    sleep: "29-30 Ağustos Üsküp Airbnb · Merkez / Debar Maalo (3.019 ₺)",
    drive: "22 km · 25 dk saf sürüş (A4 bağlantısı)",
    walk: "4,2 km · Düz ayak tarihî merkez halkası",
    risk: "Uçuş varış saatine ve araç teslimine göre Eski Çarşı süresini ayarlayın; akşam geç saate kalmayın.",
    route: "İstanbul Havalimanı → Üsküp SKP → Airbnb Check-in → Eski Çarşı → Taş Köprü → Makedonya Meydanı",
    timing: [
      "12:30–14:00: SKP İniş + Kiralık araç teslimi & çizik tutanağı (Eyüpcan teftişi)",
      "14:30–15:30: Üsküp Airbnb'ye varış + valiz bırakma + hızlı dinlenme",
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
    sleep: "30-31 Ağustos Ohri Airbnb · Old Town / Göl Kıyısı (4.594 ₺)",
    drive: "180 km · 2 sa 50 dk saf sürüş (A2 / E65 dağ yolu)",
    walk: "3,8 km · Tarihî taş sokaklar & falez merdivenleri",
    risk: "Ohri Old Town sokaklarına araç sokmak yasaktır/riskli. Otoparkı varıştan önce arayıp kesinleştirin.",
    route: "Üsküp → Tetovo / Gostivar hattı → Ohri Varış → Antik Tiyatro → Samuel Kalesi → St. John Kaneo",
    timing: [
      "08:30: Üsküp Airbnb'den çıkış (Yakıt ve kahve molası: 20 dk)",
      "11:45–12:30: Ohri'ye varış, otopark ve Airbnb check-in",
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
    sleep: "31 Ağustos – 3 Eylül Sarandë Otel · Kordon / Rruga Butrinti (33.210 ₺ - 1. Gece)",
    drive: "356 km · 6 sa 29 dk saf sürüş (Toplam gün 9–10 saat)",
    walk: "2,6 km · Odaklı kale ve doğa yürüyüşü",
    risk: "Rotanın EN KRİTİK transfer günüdür. 06:30'da yola çıkılmazsa Sarandë'ye gece varılır!",
    route: "Ohri → Qafë Thanë Sınır Kapısı → Korçë → Gjirokastër → Syri i Kaltër (Blue Eye) → Sarandë",
    timing: [
      "06:15–06:45: Ohri Airbnb'den erken çıkış ve sınır kapısına intikal",
      "07:30–08:30: Makedonya-Arnavutluk sınır geçişi (Green Card kontrolü - Eyüpcan devrede)",
      "09:00–11:30: Korçë üzerinden dağ manzaralarıyla Gjirokastër'e sürüş",
      "11:30–13:45: Gjirokastër Kalesi + Eski Çarşı + Taverna Kuka'da hızlı öğle yemeği",
      "14:30–16:30: Syri i Kaltër (Mavi Göz) doğa kaynağı yürüyüşü ve fotoğraf",
      "17:30–18:30: Sarandë'ye varış, otel check-in (3 gece sabit üs) ve İyon Denizi esintisi",
      "20:00–22:00: Sarandë Kordonu akşam yürüyüşü ve ilk deniz ürünleri ziyafeti",
    ],
    car: "Depoyu sabah Ohri'de fulleyin. Green Card ve araç sınır izin belgesini el altında tutun. Çevrimdışı haritayı indirin.",
    foot: "Gjirokastër'de aracı çarşı girişinde bırakın; dik taş yokuşlarda dikkatli yürüyün. Blue Eye'da otoparktan kaynağa 1.5 km yürünür.",
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
    title: "Balkanların Maldivleri Ksamil & 2500 Yıllık UNESCO Mirası",
    sleep: "Sarandë Otel (2. Gece · Valiz toplama yok, rahat gün)",
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
    car: "SH81 yolu virajlıdır. Ksamil'de aracı güvenli otoparka bırakın. Butrint parkı ücretsizdir.",
    foot: "Butrint düzensiz taş zemin ve patikalardan oluşur; yürüyüş ayakkabısıyla gelin.",
    eat: {
      summary: "Günün taze tutulmuş balığı, midye tava (Butrint Lagünü midyeleri meşhurdur) ve karides güveç.",
      places: "Fish Filipi, Taverna Rustico veya The Mussel House",
      mustTry: ["Butrint Lagün Midyesi (Mussels Bouzoukia)", "Izgara Çipura / Levrek", "Kalamar Tava", "Arnavut Trileçesi"],
      tips: "Balık siparişi vermeden önce balığı tarttırıp net fiyatını öğrenin.",
    },
    shop: {
      summary: "Plaj günü tedariki ve yerel zeytinyağı.",
      target: "Sarandë yerel marketleri",
      tips: "Plaj kulübünde yüksek fiyat ödememek için marketten soğuk su stoklayın.",
    },
    highlights: ["Ksamil Adaları", "Butrint Antik Tiyatrosu", "Vaftizhane Mozaikleri", "Vivari Kanalı"],
    points: ["ksamil_islands", "butrint_park", "sarande_promenade"],
  },
  {
    id: "G5",
    dayNumber: 5,
    date: "2 Eylül · Çarşamba",
    city: "Sarandë ↔ Borsh & Porto Palermo",
    title: "Borsh Şelalesi, Ali Paşa Kalesi & İyon Kıyısında Dinlenme",
    sleep: "Sarandë Otel (3. Gece · Kıyıdaki son akşam ve veda ziyafeti)",
    drive: "85 km · 2 sa toplam gidiş-dönüş sahil sürüşü",
    walk: "2,5 km · Sahil & kale yürüyüşü",
    risk: "SH8 sahil virajlarında acele etmeyin; akşam Sarandë'de gün batımını kaçırmayın.",
    route: "Sarandë → Borsh Sahili & Şelale Kafe → Porto Palermo Kalesi & Körfezi → Sarandë Dönüş",
    timing: [
      "09:30: Sarandë'den hareket",
      "10:30–13:00: Borsh 7 km'lik sahilinde deniz keyfi & şelale kenarında kahve molası",
      "13:30–15:00: Porto Palermo Ali Paşa Kalesi keşfi & körfez manzaraları",
      "15:30: Sarandë'ye dönüş, otelde dinlenme & serbest plaj/çarşı zamanı",
      "20:00–22:30: Sarandë'de taze deniz ürünleri ve İyon kıyısında kutlama yemeği",
    ],
    car: "SH8 yolu deniz uçurumları boyunca kıvrılır; manzara harikadır. Güvenli ceplerde durun.",
    foot: "Porto Palermo Kalesi'ne kısa bir patika tırmanışı vardır. Akşam Sarandë kordonu düzlüktür.",
    eat: {
      summary: "Izgara ahtapot, taze deniz mahsulleri ve Yunan esintili taze Arnavut mezeleri.",
      places: "Taverna Rustico, Limani veya Fish Filipi",
      mustTry: ["Izgara Ahtapot", "Közlenmiş Patlıcan Ezmesi", "Saganaki Peyniri", "Lokal Beyaz Şarap"],
      tips: "Sarandë'deki son geceniz; İyon kıyısında gün batımı masası ayırtın.",
    },
    shop: {
      summary: "Riviera sızma zeytinyağı ve dağ balı.",
      target: "Yol kenarı yerel üretici tezgâhları",
      tips: "Borsh civarında köylülerin sattığı soğuk sıkım zeytinyağları harikadır.",
    },
    highlights: ["Borsh Sahili", "Porto Palermo Kalesi", "Sarandë Kordonu", "İyon Denizi Gün Batımı"],
    points: ["borsh_beach", "porto_palermo", "sarande_promenade"],
  },
  {
    id: "G6",
    dayNumber: 6,
    date: "3 Eylül · Perşembe",
    city: "Sarandë → Llogara Geçidi → Vlorë → Durrës",
    title: "Bulutlar Üstü Llogara Dağ Geçidi, Adriyatik Kıyısı & Dıraç Varış",
    sleep: "3-4 Eylül Durrës Airbnb · Sahil Kordonu / Vollga (5.512 ₺)",
    drive: "235 km · 3 sa 45 dk saf sürüş (SH8 Panorama + A2 Otoyolu)",
    walk: "3,2 km · Dıraç Roma Amfitiyatrosu & Sahil Kordonu",
    risk: "Llogara 1.043m dağ tırmanışında motor harareti yapmayın, inerken motor freni kullanın.",
    route: "Sarandë Otel Check-out → SH8 Sahil Yolu → Llogara Dağ Geçidi (1.043m) → Vlorë Sahili → Fier A2 → Durrës Airbnb & Amfitiyatro",
    timing: [
      "08:30: Sarandë otel check-out ve çıkış",
      "10:00–11:00: Llogara Dağ Geçidi seyir terasında fotoğraf molası & dağ çayı",
      "11:45–13:00: Vlorë sahil kordonunda yürüyüş & öğle yemeği",
      "14:45–15:30: Durrës'e varış, Airbnb check-in ve otopark yerleşimi",
      "16:00–18:00: Balkanların en büyük Roma yapılarından Durrës Antik Amfitiyatrosu & Venedik Kulesi",
      "18:30–20:00: Vollga Kordonu boyunca Adriyatik gün batımı yürüyüşü",
      "20:15–22:30: Durrës sahilinde taze Adriyatik balığı ve İtalyan esintili akşam yemeği",
    ],
    car: "Llogara Geçidi 1.043 metreye tırmanır; dik virajlarda dikkatli sürün. Vlorë sonrası Fier–Durrës duble otoyolu rahattır.",
    foot: "Durrës Roma Amfitiyatrosu ve Vollga sahil kordonu düz ayak ve yürüyüş için çok keyiflidir.",
    eat: {
      summary: "Adriyatik Denizi taze balıkları, deniz mahsullü linguine ve İtalyan dondurması.",
      places: "Gusto di Mare, Aragosta veya 2 Kitarrat (Durrës Vollga)",
      mustTry: ["Deniz Mahsullü Makarna (Linguine Frutti di Mare)", "Izgara Çipura", "Dıraç Trileçesi", "İtalyan Dondurması"],
      tips: "Vollga Kordonu boyunca deniz kenarındaki restoranlarda gün batımını izlemek çok keyiflidir.",
    },
    shop: {
      summary: "Durrës sahil çarşısı ve İtalyan ürünleri.",
      target: "Durrës Merkez & Vollga Kordonu",
      tips: "Adriyatik kıyısında zeytin ve yerel peynir alışverişi yapılabilir.",
    },
    highlights: ["Llogara Seyir Noktası", "Vlorë Sahili", "Durrës Roma Amfitiyatrosu", "Vollga Kordonu Gün Batımı"],
    points: ["llogara_pass", "durres_amphitheatre"],
  },
  {
    id: "G7",
    dayNumber: 7,
    date: "4 Eylül · Cuma",
    city: "Durrës → Tiran (Tirana)",
    title: "Arnavutluk Başkenti Tiran: İskender Bey, Bunk'Art & Blloku",
    sleep: "4-5 Eylül Tiran Airbnb · Blloku / Şehir Merkezi (3.812 ₺)",
    drive: "38 km · 45 dk saf sürüş (SH2 Otoyolu)",
    walk: "5,5 km · Şehir meydanları, parklar & Blloku sokakları",
    risk: "Tiran şehir içi trafiği yoğundur; Airbnb otoparkına aracı bırakıp şehri yürüyerek keşfedin.",
    route: "Durrës Airbnb Check-out → SH2 Otoyolu → Tiran Airbnb Check-in → İskender Bey Meydanı → Bunk'Art 2 → Piramit → Blloku",
    timing: [
      "09:30: Durrës'ten hareket (SH2 duble yolu)",
      "10:30: Tiran'a varış, Airbnb check-in ve güvenli otopark",
      "11:15–13:30: İskender Bey Meydanı, Ethem Bey Camii, Tarih Müzesi Mozaikleri & Bunk'Art 2 Yeraltı Sığınağı",
      "13:30–15:00: Tiran Pazarı (Pazari i Ri) geleneksel öğle yemeği (Fërgesë & Qofte)",
      "15:30–17:30: Tiran Piramidi seyir terası veya Dajti Ekspres teleferik gezisi",
      "18:00–22:30: Blloku'nun renkli kafeleri, canlı müzik, akşam yemeği ve İkra'nın kahve keyfi",
    ],
    car: "SH2 otoyolu düzgündür. Tiran merkezinde araba kullanmayın, Airbnb otoparkına çekin.",
    foot: "İskender Bey Meydanı'ndan Blloku'ya tüm ana arterler yürüyüş mesafesindedir.",
    eat: {
      summary: "Geleneksel Tiran güveçleri (Fërgesë Tiranë), ızgara köfteler ve Blloku'nun modern mutfakları.",
      places: "Oda Restaurant, Era Blloku veya Mullixhiu (Büyük Park)",
      mustTry: ["Fërgesë Tiranë me Gjizë", "Tavë Dheu (Güveçte Ciğer & Peynir)", "Qofte Korçe", "Yerel Tiran Bira (Korca/Tirana)"],
      tips: "Blloku bölgesinde şık kafelerde akşam kahvesi ve kokteyl molası verin.",
    },
    shop: {
      summary: "Pazari i Ri (Yeni Pazar) yerel baharatlar, çaylar ve el sanatları.",
      target: "Pazari i Ri & Tiran Çarşısı",
      tips: "Renkli binalarla çevrili pazardan taze meyve, kuruyemiş ve dağ çayı alınabilir.",
    },
    highlights: ["İskender Bey Meydanı", "Bunk'Art 2", "Tiran Piramidi", "Blloku Eğlence Bölgesi", "Pazari i Ri"],
    points: ["durres_amphitheatre", "tirana_skanderbeg"],
  },
  {
    id: "G8",
    dayNumber: 8,
    date: "5 Eylül · Cumartesi",
    city: "Tiran → Sınır → Üsküp",
    title: "Makedonya'ya Dönüş, Matka Kanyonu & Büyük Veda Sofrası",
    sleep: "5-6 Eylül Üsküp Airbnb · Aerodrom / Merkez (4.429 ₺)",
    drive: "245 km · 4 sa 15 dk saf sürüş (+ sınır kuyruğu payı)",
    walk: "3,8 km · Matka Kanyonu & Eski Çarşı",
    risk: "Sınır kapısı yoğunluğu nedeniyle Tiran'dan en geç 08:30'da çıkılmalıdır.",
    route: "Tiran Airbnb Check-out → Elbasan Tüneli → Qafë Thanë Sınır Kapısı → Gostivar → Üsküp Matka Kanyonu → Üsküp Airbnb → Veda Yemeği",
    timing: [
      "08:15: Tiran Airbnb'den hareket",
      "09:30–10:30: Elbasan ve Qafë Thanë sınır kapısına varış (Arnavutluk-Makedonya geçişi)",
      "12:00–12:45: Straža / Gostivar börek molası",
      "14:00–16:30: Üsküp Matka Kanyonu tekne turu ve Vrelo Mağarası",
      "17:30–18:30: Üsküp Airbnb check-in & dinlenme",
      "19:00–20:30: Bit Pazar & East Gate Mall son dakika hediyelikleri",
      "20:45–23:00: Destan / Kaj Serdarot ekibin büyük veda ziyafeti & Fatih'in Splitwise bütçe kapanışı",
    ],
    car: "Elbasan tüneli ve otoyol hızlıdır; sınır sonrası Makedonya içi A2 otoyolu kullanılır.",
    foot: "Matka Kanyonu patikası ve Üsküp Eski Çarşı yürünür.",
    eat: {
      summary: "Balkanlara veda ziyafeti; kanyon kıyısında balık, çarşıda kebap ve meşhur tatlılar.",
      places: "Kanyon Restaurant Matka veya Kaj Serdarot / Distrikt",
      mustTry: ["Taze Kanyon Alabalığı", "Üsküp Köftesi & Trileçe", "Makedon Şarabı", "Mastika"],
      tips: "Son geceyi şölene dönüştürün; tüm ekibin ortak anılarını kutlayın.",
    },
    shop: {
      summary: "Bit Pazar antikaları, East Gate Mall yerel lezzetler ve hatıra magnetleri.",
      target: "Üsküp Bit Pazarı & East Gate Mall",
      tips: "Balkan çikolataları, ajvar kavanozları ve hediyelik peynirleri süpermarketten kapatın.",
    },
    highlights: ["Matka Kanyonu", "Vrelo Mağarası", "Bit Pazar Antika Avı", "Büyük Veda Ziyafeti"],
    points: ["tirana_skanderbeg", "skopje_bazaar", "skopje_bitpazar", "skopje_eastgate"],
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
      "10:00–10:30: Üsküp Airbnb'den çıkış",
      "10:45–11:15: Havalimanı yakınında son benzinlikte depoyu tam fulleme & fişi alma",
      "11:30–12:00: Kiralık araç teslimi (Eyüpcan & Fatih iade tutanağı kontrolü)",
      "12:15–14:20: Bagaj teslim, pasaport kontrolü, Duty Free & 14:20 Uçuşu",
    ],
    car: "Aracı aldığınız yakıt seviyesinde (full-to-full) teslim edin. Dış gövdenin son halini videoya çekin. Depozito iade fişini Fatih'e teslim edin.",
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
  // 🛂 Evraklar & Rezervasyon (10)
  {
    id: "doc_1",
    category: "docs",
    categoryLabel: "🛂 Evraklar & Rezervasyon",
    text: "Pasaport kimlik sayfası fotokopisi (2 adet)",
    desc: "Kaybolma riskine karşı asıldan ayrı bir çantada taşınacak yedek kopya.",
    checked: false,
  },
  {
    id: "doc_2",
    category: "docs",
    categoryLabel: "🛂 Evraklar & Rezervasyon",
    text: "Kimlik / Sürücü belgesi fotokopisi",
    checked: false,
  },
  {
    id: "doc_3",
    category: "docs",
    categoryLabel: "🛂 Evraklar & Rezervasyon",
    text: "Gidiş-dönüş uçak bileti çıktısı (İstanbul ↔ Üsküp)",
    checked: false,
  },
  {
    id: "doc_4",
    category: "docs",
    categoryLabel: "🛂 Evraklar & Rezervasyon",
    text: "Seyahat sağlık sigortası poliçesi çıktısı",
    desc: "Poliçe numarası ve acil destek hattı görünür şekilde.",
    checked: false,
  },
  {
    id: "doc_5",
    category: "docs",
    categoryLabel: "🛂 Evraklar & Rezervasyon",
    text: "Kiralık araç rezervasyon onayı & Green Card (Yeşil Sigorta) çıktısı",
    desc: "Bir kopya çantada, bir kopya ayrıca araçta torpidoda dursun.",
    checked: false,
  },
  {
    id: "doc_6",
    category: "docs",
    categoryLabel: "🛂 Evraklar & Rezervasyon",
    text: "Konaklama onayları ve açık adres çıktıları",
    checked: false,
  },
  {
    id: "doc_7",
    category: "docs",
    categoryLabel: "🛂 Evraklar & Rezervasyon",
    text: "Araç kiralama şirketinin 7/24 acil destek numarası",
    desc: "Yazılı olarak kağıt üzerinde; arıza/kaza anında telefon çekmeyebilir.",
    checked: false,
  },
  {
    id: "doc_8",
    category: "docs",
    categoryLabel: "🛂 Evraklar & Rezervasyon",
    text: "Pasaport (En az 6 ay geçerli)",
    checked: false,
  },
  {
    id: "doc_9",
    category: "docs",
    categoryLabel: "🛂 Evraklar & Rezervasyon",
    text: "Yeni tip çipli ehliyet",
    checked: false,
  },
  {
    id: "doc_10",
    category: "docs",
    categoryLabel: "🛂 Evraklar & Rezervasyon",
    text: "Fiziksel not defteri + kalem",
    desc: "İnternet çekmeyen yerlerde adres, kod ve rezervasyon numarası not almak için.",
    checked: false,
  },

  // 💶 Para & Kartlar (8)
  {
    id: "money_1",
    category: "money",
    categoryLabel: "💶 Para & Kartlar",
    text: "Nakit Euro (€) — küçük banknotlar (5€, 10€, 20€)",
    checked: false,
  },
  {
    id: "money_2",
    category: "money",
    categoryLabel: "💶 Para & Kartlar",
    text: "Yerel para (Makedon Dinarı & Arnavutluk Leki)",
    checked: false,
  },
  {
    id: "money_3",
    category: "money",
    categoryLabel: "💶 Para & Kartlar",
    text: "Bozuk para stoku",
    desc: "Bazı umumi tuvaletler ücretli olabiliyor.",
    checked: false,
  },
  {
    id: "money_4",
    category: "money",
    categoryLabel: "💶 Para & Kartlar",
    text: "Hatıralık madeni paralar (1-2-5 MKD, 1-5 ALL)",
    checked: false,
  },
  {
    id: "money_5",
    category: "money",
    categoryLabel: "💶 Para & Kartlar",
    text: "Banka/kredi kartlarının yurt dışı ve temassız kullanımını açtırma",
    checked: false,
  },
  {
    id: "money_6",
    category: "money",
    categoryLabel: "💶 Para & Kartlar",
    text: "Yedek banka kartı & acil durum nakit zulası",
    checked: false,
  },
  {
    id: "money_7",
    category: "money",
    categoryLabel: "💶 Para & Kartlar",
    text: "Offline haritaları indir (Google Maps / Maps.me — Makedonya ve Arnavutluk)",
    checked: false,
  },
  {
    id: "money_8",
    category: "money",
    categoryLabel: "💶 Para & Kartlar",
    text: "Çevrimdışı müzik / playlist indir",
    checked: false,
  },

  // 🎒 Giyim, Deniz & Plaj (19)
  {
    id: "wear_1",
    category: "clothing",
    categoryLabel: "🎒 Giyim & Plaj",
    text: "İç çamaşırı — 9 adet",
    desc: "Her güne bir tane; çamaşır yıkamayla uğraşma.",
    checked: false,
  },
  {
    id: "wear_2",
    category: "clothing",
    categoryLabel: "🎒 Giyim & Plaj",
    text: "Çorap — 7-8 adet",
    checked: false,
  },
  {
    id: "wear_3",
    category: "clothing",
    categoryLabel: "🎒 Giyim & Plaj",
    text: "Tişört — 5-6 adet",
    checked: false,
  },
  {
    id: "wear_4",
    category: "clothing",
    categoryLabel: "🎒 Giyim & Plaj",
    text: "Gömlek — 4 adet",
    checked: false,
  },
  {
    id: "wear_5",
    category: "clothing",
    categoryLabel: "🎒 Giyim & Plaj",
    text: "Şort — 2-3 adet",
    checked: false,
  },
  {
    id: "wear_6",
    category: "clothing",
    categoryLabel: "🎒 Giyim & Plaj",
    text: "Koşu / rahat yürüyüş ayakkabısı",
    desc: "Kaymaz tabanlı.",
    checked: false,
  },
  {
    id: "wear_7",
    category: "clothing",
    categoryLabel: "🎒 Giyim & Plaj",
    text: "İnce rüzgarlık / yağmurluk",
    checked: false,
  },
  {
    id: "wear_8",
    category: "clothing",
    categoryLabel: "🎒 Giyim & Plaj",
    text: "İnce sweatshirt & eşofman altı",
    checked: false,
  },
  {
    id: "wear_9",
    category: "clothing",
    categoryLabel: "🎒 Giyim & Plaj",
    text: "1 rahat uzun pantolon",
    checked: false,
  },
  {
    id: "wear_10",
    category: "clothing",
    categoryLabel: "🎒 Giyim & Plaj",
    text: "Deniz ayakkabısı",
    desc: "Kayalık sahil olabilir.",
    checked: false,
  },
  {
    id: "wear_11",
    category: "clothing",
    categoryLabel: "🎒 Giyim & Plaj",
    text: "Hızlı kuruyan mikrofiber havlu",
    checked: false,
  },
  {
    id: "wear_12",
    category: "clothing",
    categoryLabel: "🎒 Giyim & Plaj",
    text: "Normal havlu",
    checked: false,
  },
  {
    id: "wear_13",
    category: "clothing",
    categoryLabel: "🎒 Giyim & Plaj",
    text: "Mayo / Deniz şortu — yedekli, 2-3 adet",
    checked: false,
  },
  {
    id: "wear_14",
    category: "clothing",
    categoryLabel: "🎒 Giyim & Plaj",
    text: "Deniz gözlüğü",
    checked: false,
  },
  {
    id: "wear_15",
    category: "clothing",
    categoryLabel: "🎒 Giyim & Plaj",
    text: "Kulak & burun tıkacı",
    checked: false,
  },
  {
    id: "wear_16",
    category: "clothing",
    categoryLabel: "🎒 Giyim & Plaj",
    text: "Plaj çantası / ufak sırt çantası",
    checked: false,
  },
  {
    id: "wear_17",
    category: "clothing",
    categoryLabel: "🎒 Giyim & Plaj",
    text: "Terlik",
    checked: false,
  },
  {
    id: "wear_18",
    category: "clothing",
    categoryLabel: "🎒 Giyim & Plaj",
    text: "Güneş gözlüğü",
    checked: false,
  },
  {
    id: "wear_19",
    category: "clothing",
    categoryLabel: "🎒 Giyim & Plaj",
    text: "UV korumalı şapka",
    checked: false,
  },

  // 🩹 Kişisel Bakım, Banyo, Sağlık & İlk Yardım (21)
  {
    id: "health_1",
    category: "health",
    categoryLabel: "🩹 Sağlık & Koruma",
    text: "Tarak & toka / saç lastiği",
    checked: false,
  },
  {
    id: "health_2",
    category: "health",
    categoryLabel: "🩹 Sağlık & Koruma",
    text: "Tıraş makinesi & şarj kablosu / başlığı",
    checked: false,
  },
  {
    id: "health_3",
    category: "health",
    categoryLabel: "🩹 Sağlık & Koruma",
    text: "Islak tuvalet kağıdı",
    checked: false,
  },
  {
    id: "health_4",
    category: "health",
    categoryLabel: "🩹 Sağlık & Koruma",
    text: "Tuvalet kağıdı / kağıt tuvalet örtüsü",
    checked: false,
  },
  {
    id: "health_5",
    category: "health",
    categoryLabel: "🩹 Sağlık & Koruma",
    text: "Kuru cep mendili (bolca)",
    checked: false,
  },
  {
    id: "health_6",
    category: "health",
    categoryLabel: "🩹 Sağlık & Koruma",
    text: "Küçük temizleme bezi / mikro havlu",
    checked: false,
  },
  {
    id: "health_7",
    category: "health",
    categoryLabel: "🩹 Sağlık & Koruma",
    text: "Mini boy şampuan & duş jeli",
    checked: false,
  },
  {
    id: "health_8",
    category: "health",
    categoryLabel: "🩹 Sağlık & Koruma",
    text: "Banyo lifi",
    checked: false,
  },
  {
    id: "health_9",
    category: "health",
    categoryLabel: "🩹 Sağlık & Koruma",
    text: "Bebek kolonyası",
    checked: false,
  },
  {
    id: "health_10",
    category: "health",
    categoryLabel: "🩹 Sağlık & Koruma",
    text: "Diş fırçası & diş macunu",
    checked: false,
  },
  {
    id: "health_11",
    category: "health",
    categoryLabel: "🩹 Sağlık & Koruma",
    text: "Sinek / böcek kovucu sprey",
    checked: false,
  },
  {
    id: "health_12",
    category: "health",
    categoryLabel: "🩹 Sağlık & Koruma",
    text: "Güneş kremi (50+ SPF)",
    checked: false,
  },
  {
    id: "health_13",
    category: "health",
    categoryLabel: "🩹 Sağlık & Koruma",
    text: "Dudak koruyucu / Lip balm",
    checked: false,
  },
  {
    id: "health_14",
    category: "health",
    categoryLabel: "🩹 Sağlık & Koruma",
    text: "Göz damlası (Alerjik & normal)",
    checked: false,
  },
  {
    id: "health_15",
    category: "health",
    categoryLabel: "🩹 Sağlık & Koruma",
    text: "Mide bulantısı hapı",
    desc: "Virajlı kıyı ve dağ yolları için.",
    checked: false,
  },
  {
    id: "health_16",
    category: "health",
    categoryLabel: "🩹 Sağlık & Koruma",
    text: "Elektrolit / Efervesan tablet",
    checked: false,
  },
  {
    id: "health_17",
    category: "health",
    categoryLabel: "🩹 Sağlık & Koruma",
    text: "Yara bandı, dezenfektan mendil & küçük ilk yardım kiti",
    checked: false,
  },
  {
    id: "health_18",
    category: "health",
    categoryLabel: "🩹 Sağlık & Koruma",
    text: "Seyahat ilaçları: ağrı kesici, alerji, ishal, yanık kremi, mide koruyucu",
    desc: "Blister ambalajında.",
    checked: false,
  },
  {
    id: "health_19",
    category: "health",
    categoryLabel: "🩹 Sağlık & Koruma",
    text: "Tırnak makası & cımbız seti",
    desc: "Kesici alet, uçak altı bagaja konmalı.",
    checked: false,
  },
  {
    id: "health_20",
    category: "health",
    categoryLabel: "🩹 Sağlık & Koruma",
    text: "Seyahat sigortası poliçe numarası & acil destek hattı notu",
    checked: false,
  },
  {
    id: "health_21",
    category: "health",
    categoryLabel: "🩹 Sağlık & Koruma",
    text: "El dezenfektanı",
    checked: false,
  },

  // 🔌 Elektronik & EDC (4)
  {
    id: "elec_1",
    category: "electronics",
    categoryLabel: "🔌 Elektronik & Şarj",
    text: "Powerbank",
    desc: "Zorunlu kabin bagajı.",
    checked: false,
  },
  {
    id: "elec_2",
    category: "electronics",
    categoryLabel: "🔌 Elektronik & Şarj",
    text: "Kulaklık",
    checked: false,
  },
  {
    id: "elec_3",
    category: "electronics",
    categoryLabel: "🔌 Elektronik & Şarj",
    text: "Şarj aletleri & yedek kablolar",
    checked: false,
  },
  {
    id: "elec_4",
    category: "electronics",
    categoryLabel: "🔌 Elektronik & Şarj",
    text: "Farklı dönüştürücüler (Micro USB, Lightning, USB-C)",
    checked: false,
  },

  // 🚗 Yol, Araç İçi & Pratik Düzenleyiciler (12)
  {
    id: "road_1",
    category: "custom",
    categoryLabel: "🚗 Yol & Araç İçi",
    text: "Çakmaklık araç şarjı",
    checked: false,
  },
  {
    id: "road_2",
    category: "custom",
    categoryLabel: "🚗 Yol & Araç İçi",
    text: "Şarj kabloları",
    checked: false,
  },
  {
    id: "road_3",
    category: "custom",
    categoryLabel: "🚗 Yol & Araç İçi",
    text: "3.5mm AUX kablosu",
    desc: "Araçta Bluetooth olmayabilir.",
    checked: false,
  },
  {
    id: "road_4",
    category: "custom",
    categoryLabel: "🚗 Yol & Araç İçi",
    text: "Su stoku",
    checked: false,
  },
  {
    id: "road_5",
    category: "custom",
    categoryLabel: "🚗 Yol & Araç İçi",
    text: "Araç teslim anı hasar/çizik fotoğraf-video",
    checked: false,
  },
  {
    id: "road_6",
    category: "custom",
    categoryLabel: "🚗 Yol & Araç İçi",
    text: "Sınır geçiş evrak düzeni",
    desc: "Torpidoda hazır.",
    checked: false,
  },
  {
    id: "road_7",
    category: "custom",
    categoryLabel: "🚗 Yol & Araç İçi",
    text: "Boyun yastığı",
    checked: false,
  },
  {
    id: "road_8",
    category: "custom",
    categoryLabel: "🚗 Yol & Araç İçi",
    text: "Çengelli iğneler",
    checked: false,
  },
  {
    id: "road_9",
    category: "custom",
    categoryLabel: "🚗 Yol & Araç İçi",
    text: "Kirli çamaşır torbası",
    checked: false,
  },
  {
    id: "road_10",
    category: "custom",
    categoryLabel: "🚗 Yol & Araç İçi",
    text: "Kilitli poşetler / ıslak mayo torbası",
    checked: false,
  },
  {
    id: "road_11",
    category: "custom",
    categoryLabel: "🚗 Yol & Araç İçi",
    text: "Küçük asma kilit",
    desc: "Airbnb'de dolap/çanta için.",
    checked: false,
  },
  {
    id: "road_12",
    category: "custom",
    categoryLabel: "🚗 Yol & Araç İçi",
    text: "Deterjan / leke çıkarıcı mendil",
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
    [40.0611, 19.8522], // Borsh Beach
    [40.0622, 19.7919], // Porto Palermo Ali Pasha Fortress
    [40.1039, 19.7456], // Himarë Spile
    [40.1983, 19.5961], // Llogara Mountain Pass (1.043m Panorama)
    [40.4234, 19.4876], // Vlorë
    [40.7234, 19.5567], // Fier (A2 Highway)
    [41.3128, 19.4453], // Durrës (Dıraç Sahili & Amfitiyatro)
    [41.3275, 19.8187], // Tiran (İskender Bey Meydanı & Blloku)
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
    [39.9912, 19.9145], // Lukovë
    [40.0611, 19.8522], // Borsh Beach & Waterfall
    [40.0622, 19.7919], // Porto Palermo Ali Pasha Fortress
    [40.0611, 19.8522], // Borsh
    [39.8753, 20.0058], // Sarandë Return
  ],
  G6: [
    [39.8753, 20.0058], // Sarandë
    [40.0611, 19.8522], // Borsh
    [40.0622, 19.7919], // Porto Palermo
    [40.1039, 19.7456], // Himarë
    [40.1983, 19.5961], // Llogara Mountain Pass (1.043m Panorama)
    [40.2876, 19.4987], // Orikum
    [40.4234, 19.4876], // Vlorë Kordon
    [40.7234, 19.5567], // Fier (A2 Highway)
    [41.3128, 19.4453], // Durrës (Dıraç Sahili & Amfitiyatro)
  ],
  G7: [
    [41.3128, 19.4453], // Durrës
    [41.3345, 19.6412], // Vore (SH2 Otoyolu)
    [41.3275, 19.8187], // Tiran (İskender Bey Meydanı, Bunk'Art 2 & Blloku)
  ],
  G8: [
    [41.3275, 19.8187], // Tiran
    [41.1123, 20.0845], // Elbasan (Tünel & Otoyol)
    [41.1765, 20.3123], // Librazhd
    [41.1523, 20.5892], // Qafë Thanë Border Crossing
    [41.1765, 20.6789], // Struga
    [41.5123, 20.9582], // Kičevo
    [41.6734, 20.8756], // Straža
    [41.7967, 20.9082], // Gostivar
    [41.9986, 20.9715], // Tetovo (A2)
    [41.9867, 21.3214], // Matka Kanyonu
    [42.0003, 21.4371], // Skopje Center
  ],
  G9: [
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
    city: "Üsküp (1. Gece)",
    nights: "1 Gece (29–30 Ağu)",
    dates: "29–30 Ağustos (1 Gece)",
    price: "3.019 ₺",
    area: "Merkez / Debar Maalo",
    type: "29-30 Üsküp Airbnb",
    filter: "Özel otopark, klima, Eski Çarşı ve Vardar Köprüsü'ne yürüme mesafesi",
    why: "Uçuş inişi sonrası ilk gece; arabayı garaja çekip Eski Çarşı ve Debar Maalo kafe kültürünü yaşamak için.",
  },
  {
    city: "Ohri",
    nights: "1 Gece (30–31 Ağu)",
    dates: "30–31 Ağustos (1 Gece)",
    price: "4.594 ₺",
    area: "Old Town / Göl Kıyısı",
    type: "30-31 Ohrid Airbnb",
    filter: "Teyitli otopark, göl manzarası, Samuel Kalesi & Kaneo yürüyüş hattı",
    why: "Ohri'nin büyülü gün batımını ve St. John at Kaneo kilisesini akşam serinliğinde izlemek için eşsiz konum.",
  },
  {
    city: "Sarandë",
    nights: "3 Gece (31 Ağu–3 Eyl)",
    dates: "31 Ağustos – 3 Eylül (3 Gece Kesintisiz)",
    price: "33.210 ₺ (3 Gece Toplam)",
    area: "Kordon / Rruga Butrinti",
    type: "31-3 Sarandë Otel",
    filter: "Sabit otel otoparkı, klima, balkon, İyon Denizi manzarası",
    why: "Kıyıdaki ana tatil üssünüz; valiz toplamadan 3 gece sabit kalarak Ksamil, Butrint, Borsh ve plajların tadını çıkarmak için.",
  },
  {
    city: "Durrës (Dıraç)",
    nights: "1 Gece (3–4 Eyl)",
    dates: "3–4 Eylül (1 Gece)",
    price: "5.512 ₺",
    area: "Vollga Sahil Kordonu / Merkez",
    type: "3-4 Durrës Airbnb",
    filter: "Otopark garantili, plaja ve Roma amfitiyatrosuna yakın",
    why: "Llogara Geçidi sonrası Adriyatik kıyısında dinlenmek, taze balık yemek ve gün batımında Vollga kordonunda yürümek için.",
  },
  {
    city: "Tiran",
    nights: "1 Gece (4–5 Eyl)",
    dates: "4–5 Eylül (1 Gece)",
    price: "3.812 ₺",
    area: "Blloku / Şehir Merkezi",
    type: "4-5 Tiran Airbnb",
    filter: "Güvenli otopark, klima, İskender Bey Meydanı ve Blloku yürüyüş hattı",
    why: "Arnavutluk başkentinin renkli kültürünü, Bunk'Art 2 müzesini ve Blloku'nun dinamik gece hayatını keşfetmek için.",
  },
  {
    city: "Üsküp (Dönüş Gecesi)",
    nights: "1 Gece (5–6 Eyl)",
    dates: "5–6 Eylül (1 Gece)",
    price: "4.429 ₺",
    area: "Aerodrom / Şehir Merkezi",
    type: "5-6 Üsküp Airbnb",
    filter: "Havalimanına hızlı çıkış (20 dk), özel otopark, klima",
    why: "Matka Kanyonu ve veda ziyafeti sonrası rahat uyku; ertesi sabah havalimanı araç iadesi ve uçuşa sıfır stresle yetişmek için.",
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
    order: "Günün taze balığı, Butrint lagün midyesi, ızgara karides",
    candidates: "Fish Filipi · Taverna Rustico · Sophra · The Mussel House",
    band: "10–25 EUR / kişi (Özel deniz ürünü masası 25–35 €)",
    note: "3 gece boyunca İyon Denizi lezzetleri; balığın kilosu ve tahmini gramajı siparişten önce sorulur.",
  },
  {
    city: "Durrës",
    order: "Adriyatik çipurası, deniz mahsullü makarna, İtalyan dondurması",
    candidates: "Gusto di Mare · Aragosta · 2 Kitarrat",
    band: "10–22 EUR / kişi",
    note: "Vollga Kordonu boyunca deniz kenarındaki restoranlarda gün batımını izleyerek akşam yemeği.",
  },
  {
    city: "Tiran",
    order: "Fërgesë Tiranë me gjizë, Tavë Dheu, modern Blloku lezzetleri",
    candidates: "Oda Restaurant · Era Blloku · Mullixhiu",
    band: "8–18 EUR / kişi",
    note: "Tiran'ın otantik fırın güveçleri ve Blloku bölgesinde şık akşam kahveleri / tatlıları.",
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
