# Balkan Yol Ekibi — Tasarım Fikirleri

## Yaklaşım 1

**Theme Name:** Balkan Dergâhı

**Very Brief Intro:** Eski bir yol defteri ile bağımsız seyahat dergisinin buluştuğu, krem kâğıt, yırtık kenar, iğne ve damga izleriyle kurulmuş neşeli bir editoryal evren. Fotoğraflar, sanki gezi boyunca toplanmış delil ve hatıralarmış gibi sayfaya ilişir.

**Probability:** 0.073

## Yaklaşım 2

**Theme Name:** Akdeniz Matbaası

**Very Brief Intro:** Sahil kasabası afişleri ile renkli 1960’lar matbaa baskılarından ilham alan sıcak, canlı ve akdenizli bir rota estetiği. Büyük renk blokları ve taşma yapan görseller enerjik bir seyahat günlüğü hissi verir.

**Probability:** 0.041

## Yaklaşım 3

**Theme Name:** Gece Postası

**Very Brief Intro:** Fotokopi dokuları, siyah mürekkep, kırmızı işaret kalemi ve gece yolculuğu notlarıyla daha ham, alternatif bir yol fanzini. Rota kararlarını bir dedektif dosyası gibi ele alır.

**Probability:** 0.086

---

# Seçilen Yön: Balkan Dergâhı

## Design Movement

**Analog travel ephemera** ve bağımsız dergi editoryal tasarımı. Klasik gazete mizanpajının otoritesini, bir arkadaş grubunun kenar notları, biletleri, damgaları ve yırtık kolajlarıyla bilinçli biçimde gevşetir.

## Core Principles

1. **Toplanmış hatıra hissi:** Her bölüm, yolculuktan saklanmış kartpostal, fiş, fotoğraf veya not gibi davranır.
2. **Editoryal hiyerarşi:** Büyük serif başlıklar, çok sütunlu kısa açıklamalar ve baskı izi hissettiren etiketler, içeriği görünür biçimde düzenler.
3. **Kusurlu ama kontrollü:** Hafif eğim, yırtık kenar, kâğıt kıvrımı ve zımba/pim detayları kullanılır; okunurluk asla feda edilmez.
4. **Rota hareketi:** İnce çizgiler, koordinat etiketleri ve bir kâğıt uçağın takip ettiği rota; sayfayı sıradan bir dikey akış olmaktan çıkarır.

## Color Philosophy

Ana zemin, uzun süre güneşte kalmış **ham kâğıt kremi** olacaktır; bu renk sayfayı dijital bir arayüzden çok elde tutulan bir seyahat dosyasına yaklaştırır. Mürekkep için sıcak kömür siyahı kullanılır; vurgular ise Adriyatik’in derin **mavi-yeşil petrolü** ile “acil / not düşüldü” anlamı taşıyan kiremit kırmızısıdır. Renkler gösterişli değil, baskıdan kalma pigmentler gibi amaçlı davranır.

## Layout Paradigm

Tek bir merkeze hizalanmış bloklar yerine, sayfanın solunda dar bir **yol kenarı sütunu** ve sağda değişken genişlikte “sayfa parçaları” bulunur. Hero alanında sol taraftaki büyük başlık kâğıt katmanı gibi üst üste biner; sağ tarafta fotoğraf panosu kadrajı taşır. Duraklar, düz bir kart ızgarısı yerine kâğıt haritada açılan rotanın üzerinde ritimli, farklı boylu parçalara ayrılır.

## Signature Elements

1. **Uçuş rotası:** Noktalı çizgiden oluşan bir güzergâh üzerinde ince, katlanmış kâğıt uçak silüeti.
2. **Yırtık kâğıt maskesi:** Fotoğrafları ve bilgi fişlerini gerçekçi olmayan ama organik, hafif dalgalı kenarlarla çerçeveleyen CSS kesitleri.
3. **Mürekkep damgaları:** Tarih, şehir, bütçe ve görev gibi meta bilgileri taşıyan dairesel damga veya etiket rozetleri.

## Interaction Philosophy

Etkileşimler analog malzemeyi taklit eder: kâğıt parçaları hover’da çok az kalkar, rota menüsü tıklandığında hedef bölüme sakin bir kaydırma yapar, ekip kartları ise “notu çevirme” hissiyle ek detayı açar. Hareket eğlenceli ama bilgi bulmayı engellemeyen bir yardımcıdır.

## Animation

İlk açılışta hero katmanları 60–100 ms aralıklarla yukarıdan değil, kendi yerlerine nazikçe kayarak belirir; opaklık ve `transform` dışında özellik animasyonu kullanılmaz. Kâğıt uçak, yalnızca görünür olduğu sürece 12–16 saniyelik geniş bir rota boyunca akıcı şekilde ilerler; hareket azaltma tercihlerinde tamamen sabittir. Kart hover’ları 180 ms’lik güçlü ease-out ile en fazla 2–3 px yer değiştirir; düğmeler aktif durumda `scale(0.97)` ile dokunsal geri bildirim verir.

## Typography System

Başlıklar, baskı karakteri hissi veren **DM Serif Display** ile; gövde metni ise yüksek okunurlu **Source Serif 4** ile yazılır. Koordinat, tarih, işaret ve bütçe verileri için monospaced **IBM Plex Mono** kullanılır. Başlıklar cümle biçimli, dengeli harf aralıklı ve büyük puntolu; etiketler ise küçük puntolu, aralıklı ve büyük harflidir.

## Brand Essence

**Balkan Yol Ekibi, dört arkadaşın 2026’da Akdeniz ile Balkan tarihini kendi iç şakaları ve sağlam rota notlarıyla kayda aldığı bir yol dosyasıdır.**

Kişilik sıfatları: **meraklı, muzip, derli toplu.**

## Brand Voice

Başlıklar, rotayı bir keşif haberi gibi duyurur; CTA’lar emrivaki değil, ekibi “bir sonraki notu açmaya” davet eder. Mikro metinler kendinden emin fakat arkadaş grubu içinden, hafif muzip bir tonda yazılır.

> “Harita açık, çay sıcak, sınır kapısı sırada.”

> “Planı İkra yaptı; kaybolma ihtimali resmen düşürüldü.”

## Wordmark & Logo

Logomark, katlanmış bir **kâğıt uçağın gövdesine yerleştirilmiş küçük pusula yıldızından** oluşur. Markanın sözcük kısmı serif başlık ile bir masthead gibi yazılır; logomark tek başına favicon ve dar ekran imzası olarak kullanılabilir.

## Signature Brand Color

**Adriyatik Petrolü — `#145C64`**. Bu koyu mavi-yeşil, rota çizgilerinde, ana etkileşimlerde ve logomarkta sürekli görünerek markanın ayırt edici rengi olacaktır.

## Style Decisions

- Her ana içerik bölümü bir araya getirilmiş yol hatırası gibi davranacak; eşit, nötr web kartları yerine damga, rota kaydı, yırtık kenar veya farklı kâğıt stoğu kullanacaktır.
- Noktalı rota, koordinat dili veya kâğıt uçak işareti hero ile sınırlı kalmayacak; rota, lezzet, ekip, plan ve kapanış bölümleri arasında sürekli yolculuk izi oluşturacaktır.
- “Balkan Yol Ekibi” üst kimliği, serif masthead, kâğıt uçak-pusula sembolü ve Adriyatik Petrolü vurgusuyla bağımsız bir yol yayını gibi kullanılacaktır.
