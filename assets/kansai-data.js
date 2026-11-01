/* FareWise Japan — Kansai fare & pass data.
   Every number has a source and a check date. status: "verified" = read on the operator's
   official page; "crosschecked" = operator page could not be reached, number matched across
   JR West's official comparison sheet and/or a fare search service. */
window.KANSAI = {
  checked: "2026-11-01",
  passes: {
    kansai_area: {
      name: "WEST QR Kansai Area Pass", operator: "JR West", visitorOnly: true,
      prices: { 1: 2700, 2: 4700, 3: 5500, 4: 6700 },
      covers: "JR West ordinary trains in the Kansai area, plus HARUKA non-reserved seats (reserved seats up to 2 times).",
      excludes: "Shinkansen, other limited expresses, subways, buses and private railways.",
      buy: "QR ticket on your phone, sold through travel agencies outside Japan. The paper version stopped selling on 30 Sep 2026.",
      src: "https://www.westjr.co.jp/global/en/ticket/westqr/kansaiarea/", status: "verified"
    },
    jr_2day: {
      name: "JR West QR 2day Pass", operator: "JR West", visitorOnly: false,
      prices: { 2: 4000 },
      covers: "JR West ordinary trains in the wider Kansai area (Himeji to Nagahama, Nara and Wakayama areas).",
      excludes: "Limited expresses including HARUKA, Shinkansen. Ordinary trains to and from Kansai Airport ARE covered (JR West lists the Kansai Airport Line, whole line, in the free area).",
      coverageSrc: "https://www.jr-odekake.net/ticket/tokutoku/jrwest_qr2days/",
      buy: "In the KANSAI MaaS app (Japanese). Open to anyone, not only visitors. Valid for use 1 Apr 2026 to 31 Mar 2027.",
      src: "https://www.westjr.co.jp/press/article/items/260225_00_press_JRWESTQR2daypass_1.pdf", status: "verified"
    },
    kintetsu_1: {
      name: "KINTETSU RAIL PASS 1day", operator: "Kintetsu", visitorOnly: true,
      prices: { 1: 1900 },
      covers: "Kintetsu Osaka-Namba to Kintetsu-Nara and Kyoto to Nara, plus some Nara buses.",
      excludes: "Limited express surcharges, JR.",
      buy: "Online or at Kintetsu counters. Foreign visitors only; carry your passport.",
      src: "https://www.kintetsu.co.jp/foreign/english/ticket/", status: "verified"
    },
    kintetsu_2: {
      name: "KINTETSU RAIL PASS 2day", operator: "Kintetsu", visitorOnly: true,
      prices: { 2: 3700 },
      covers: "All Kintetsu lines in Osaka, Nara and Kyoto prefectures, plus Nara buses.",
      excludes: "Limited express surcharges, JR.",
      buy: "Online or at Kintetsu counters. Foreign visitors only.",
      src: "https://www.kintetsu.co.jp/foreign/english/ticket/", status: "verified"
    },
    osaka_eco: {
      name: "Enjoy Eco Card (Osaka Metro 1-day)", operator: "Osaka Metro", visitorOnly: false,
      prices: { weekday: 820, weekend: 620 },
      src: "https://subway.osakametro.co.jp/en/guide/page/enjoy-eco.php", status: "verified"
    },
    kyoto_1day: {
      name: "Kyoto Subway & Bus 1-Day Pass", operator: "Kyoto City", visitorOnly: false,
      prices: { 1: 1100 },
      src: "https://www2.city.kyoto.lg.jp/kotsu/webguide/ja/ticket/regular_1day_card_comm.html", status: "verified"
    }
  },
  /* Single fares, adult, yen. pass keys list which passes cover that option. */
  fares: {
    kix_osaka_jr:   { label: "JR Kansai Airport Rapid, KIX ↔ Osaka", yen: 1180, passes: ["kansai_area", "jr_2day"], status: "crosschecked", src: "https://www.westjr.co.jp/company/ir/library/fact/pdf/2025/fact09.pdf" },
    kix_namba_nk:   { label: "Nankai Airport Express, KIX ↔ Namba", yen: 970, passes: [], status: "crosschecked", src: "https://www.westjr.co.jp/company/ir/library/fact/pdf/2025/fact09.pdf" },
    kix_kyoto_honeway: { label: "HARUKA One-way Ticket (visitors), KIX → Kyoto", yen: 2700, passes: ["kansai_area"], visitorOnly: true, status: "verified", src: "https://www.westjr.co.jp/travel-information/en/tickets-passes/oneway/haruka/", note: "Price for tickets bought from 1 Nov 2026 (was 2,200)." },
    kix_kyoto_haruka: { label: "HARUKA regular non-reserved, KIX → Kyoto", yen: 3060, passes: ["kansai_area"], status: "crosschecked", src: "https://ekitan.com/transit/fare/sf-5130/st-5198" },
    kyoto_kix_haruka: { label: "HARUKA regular non-reserved, Kyoto → KIX", yen: 3060, passes: ["kansai_area"], status: "crosschecked", src: "https://ekitan.com/transit/fare/sf-5130/st-5198" },
    kyoto_kix_rapid: { label: "JR without HARUKA (change at Osaka), Kyoto → KIX", yen: 1860, passes: ["kansai_area", "jr_2day"], status: "crosschecked", src: "https://ekitan.com/transit/fare/sf-5130/st-5198", note: "Base fare without the HARUKA charge. Slower (about 1h45) and needs a change." },
    kix_kyoto_rapid: { label: "JR without HARUKA (change at Osaka), KIX → Kyoto", yen: 1860, passes: ["kansai_area", "jr_2day"], status: "crosschecked", src: "https://ekitan.com/transit/fare/sf-5130/st-5198", note: "Base fare without the HARUKA charge. Slower (about 1h45) and needs a change." },
    osaka_kyoto_jr: { label: "JR Special Rapid, Osaka ↔ Kyoto", yen: 580, passes: ["kansai_area", "jr_2day"], status: "verified", src: "https://www.westjr.co.jp/company/ir/library/fact/pdf/2025/fact09.pdf" },
    umeda_kawaramachi_hk: { label: "Hankyu, Osaka-umeda ↔ Kyoto-kawaramachi", yen: 410, passes: [], status: "crosschecked", src: "https://ekitan.com/rail-company/593/fare/sf-4958/st-5128" },
    osaka_nara_jr:  { label: "JR, Osaka ↔ Nara", yen: 840, passes: ["kansai_area", "jr_2day"], status: "crosschecked", src: "https://ekitan.com/transit/fare/sf-5006/st-5720" },
    namba_nara_kt:  { label: "Kintetsu, Osaka-Namba ↔ Kintetsu-Nara", yen: 680, passes: ["kintetsu_1", "kintetsu_2"], status: "crosschecked", src: "https://ekitan.com/transit/fare/sf-5213/st-5212" },
    kyoto_nara_jr:  { label: "JR Miyakoji Rapid, Kyoto ↔ Nara", yen: 720, passes: ["kansai_area", "jr_2day"], status: "crosschecked", src: "https://www.jr-odekake.net/oshirase/farerevision/assets/pdf/specific.pdf" },
    kyoto_nara_kt:  { label: "Kintetsu Express, Kyoto ↔ Kintetsu-Nara", yen: 760, passes: ["kintetsu_1", "kintetsu_2"], status: "crosschecked", src: "https://www.gltjp.com/ja/article/item/20942/" },
    osaka_kobe_jr:  { label: "JR Special Rapid, Osaka ↔ Sannomiya", yen: 420, passes: ["kansai_area", "jr_2day"], status: "verified", src: "https://www.westjr.co.jp/company/ir/library/fact/pdf/2025/fact09.pdf" },
    umeda_kobe_hk:  { label: "Hankyu or Hanshin, Osaka-umeda ↔ Kobe-sannomiya", yen: 330, passes: [], status: "crosschecked", src: "https://www.westjr.co.jp/company/ir/library/fact/pdf/2025/fact09.pdf" },
    osaka_himeji_jr:{ label: "JR Special Rapid, Osaka ↔ Himeji", yen: 1460, passes: ["kansai_area", "jr_2day"], status: "crosschecked", src: "https://ekitan.com/rail-company/4/fare/sf-5006/st-5884" },
    kyoto_inari_jr: { label: "JR Nara Line, Kyoto ↔ Inari", yen: 150, passes: ["kansai_area", "jr_2day"], status: "crosschecked", src: "https://ekitan.com/transit/fare/sf-5198/st-4913" },
    kyoto_arashi_jr:{ label: "JR Sagano Line, Kyoto ↔ Saga-Arashiyama", yen: 240, passes: ["kansai_area", "jr_2day"], status: "crosschecked", src: "https://ekitan.com/transit/fare/sf-5198/st-5320" }
  },
  cityRide: {
    osaka: { label: "Osaka Metro ride", yen: 240, src: "https://subway.osakametro.co.jp/guide/fare/fare/price.php", note: "Fares are 190–390 by distance; we use 240 (zone 2) as a typical sightseeing ride. You can change this." },
    kyoto: { label: "Kyoto City Bus ride", yen: 230, src: "https://www.city.kyoto.lg.jp/kotsu/page/0000240682.html", note: "Flat fare in the city area." }
  },
  changes: [
    { date: "1 Nov 2026", text: "HARUKA One-way Ticket prices rise. KIX → Kyoto goes from ¥2,200 to ¥2,700; KIX → Osaka from ¥1,800 to ¥1,900.", src: "https://www.westjr.co.jp/travel-information/en/tickets-passes/oneway/haruka/" },
    { date: "30 Sep 2026", text: "The paper JR Kansai Area Pass stopped selling. Its replacement is the WEST QR Kansai Area Pass, a QR code on your phone, slightly cheaper.", src: "https://www.westjr.co.jp/global/en/ticket/westqr/kansaiarea/" },
    { date: "By 31 Mar 2027", text: "KANSAI ONE PASS is being withdrawn and its visitor discounts end. A regular ICOCA card does the same job for paying fares.", src: "https://kansaionepass.com/en/" },
    { date: "30 Sep 2023", text: "ICOCA & HARUKA ended, and so did Kyoto's bus-only 1-day pass. Many older guides still recommend both.", src: "https://www.westjr.co.jp/global/en/howto/icoca/" }
  ]
};
