/**
 * 天邪鬼 Amanojoker — サイト全体で使う定数。
 * バンドの基本情報(旧ホームページ由来)はここで一元管理する。
 */

export const SITE = {
  name: "天邪鬼",
  nameEn: "AMANOJOKER",
  tagline: "→NEW OLD← ROCK'N'ROLL MUSIC",
  description:
    "21世紀に入って失われた、しぶといロックのサウンドを全く新しい形で体現する温故知新型ロックバンド「天邪鬼 Amanojoker」のオフィシャルサイト。ライブ情報・楽曲紹介・日記を更新中。",
  url: "https://amanojoker.vercel.app",
  x: "https://x.com/amanojoker",
  xHandle: "@amanojoker",
  eggs: "https://eggs.mu/artist/amanojoker",
  appleMusic: "https://music.apple.com/jp/artist/%E5%A4%A9%E9%82%AA%E9%AC%BC/1695593445",
  contactForm: "https://tayori.com/form/eaefde4fa326d909b0c949c1ef20dc9597de0325",
} as const;

/** バンド写真(public/images/) */
export const BAND_PHOTOS = {
  stand: "/images/band-stand.jpg", // 全員・立ち
  vivid: "/images/band-vivid.jpg", // 全員・ビビッド
} as const;

export const CONCEPT = {
  lead: "温故知新型ロックンロール",
  body: "21世紀に入って失われた、しぶといロックのサウンドを全く新しい形で体現する。60〜70年代ロックを土台に、タンゴ、ジャズ、フォークまで飲み込んだ雑食の音楽。古いものを愛しながら、誰も聴いたことのない「新しい古さ」を鳴らす——それが天邪鬼の流儀。",
  keywords: ["60-70s ROCK", "TANGO", "JAZZ", "FOLK", "GUITAR ROCK"],
} as const;

export type Member = {
  name: string;
  nameEn: string;
  part: string;
  partEn: string;
  kanji: string; // 一文字紋
  note: string;
  photo: string; // public/images/members/
};

export const MEMBERS: Member[] = [
  {
    name: "ウノ太一",
    nameEn: "TAICHI UNO",
    part: "ギター & ボーカル",
    partEn: "GUITAR / VOCAL",
    kanji: "唄",
    note: "1993年10月24日生まれ。バンドの結成者にして参謀。しぶとい歌としぶといギターを弾き倒す。HOTLINE'17 / '18 ベストギター賞。",
    photo: "/images/members/uno.jpg",
  },
  {
    name: "バーボン了",
    nameEn: "RYO BOURBON",
    part: "ベース",
    partEn: "BASS",
    kanji: "底",
    note: "底で唸る低音番長。タンゴもジャズも飲み込むグルーヴで、天邪鬼の屋台骨を支える。",
    photo: "/images/members/bourbon.jpg",
  },
  {
    name: "アトランティス仁誠",
    nameEn: "JINSEI ATLANTIS",
    part: "ドラムス",
    partEn: "DRUMS",
    kanji: "轟",
    note: "2018年1月加入。沈まぬ大陸の名を持つ男。骨太のビートで温故知新のエンジンを回す。",
    photo: "/images/members/atlantis.jpg",
  },
];

export type HistoryItem = {
  year: string;
  month?: string;
  title: string;
  body?: string;
};

export const HISTORY: HistoryItem[] = [
  {
    year: "2013",
    month: "10",
    title: "高田馬場にて結成",
    body: "「失われたロックを取り戻す」を合言葉に、東京・高田馬場で産声を上げる。",
  },
  {
    year: "2015",
    month: "03",
    title: "1st demo「うそをつく正直者」リリース",
    body: "天邪鬼の名刺代わりとなる最初のデモ音源。",
  },
  {
    year: "2017",
    month: "10",
    title: "HOTLINE2017 神奈川エリアファイナル 優秀賞・ベストギター賞",
    body: "審査員特別賞も受賞し、「しぶといロック」が公式に認められる。",
  },
  {
    year: "2018",
    month: "01",
    title: "アトランティス仁誠 加入、現体制へ",
    body: "ドラマー加入により3ピース編成が完成。都内・神奈川を中心に活動を本格化。",
  },
  {
    year: "2018",
    month: "10",
    title: "HOTLINE2018 神奈川エリアファイナル ベストギター賞",
    body: "2年連続のベストギター賞受賞。",
  },
  {
    year: "2019",
    month: "05",
    title: "CD「Late Show」リリース",
    body: "6曲入り自主制作CD。ライブ会場ほかで発売中。",
  },
  {
    year: "2023",
    month: "03",
    title: "「Late Show - EP」配信リリース",
    body: "Apple Musicほか各サブスクで配信開始。手売りの6曲が全国区へ。",
  },
  {
    year: "2023",
    month: "08",
    title: "「Hokey Pokers - EP」「捨てたはずの街」連続配信リリース",
    body: "新曲6曲入りEPと、代名詞的シングルを立て続けに配信。MVも公開。",
  },
  {
    year: "2026",
    month: "08",
    title: "オフィシャルサイト リニューアル",
    body: "新しい根城が完成。日記も楽曲紹介もここから発信していく。",
  },
];

export const NAV = [
  { href: "/", label: "ホーム", labelEn: "HOME" },
  { href: "/profile", label: "プロフィール", labelEn: "PROFILE" },
  { href: "/music", label: "楽曲", labelEn: "MUSIC" },
  { href: "/live", label: "ライブ", labelEn: "LIVE" },
  { href: "/diary", label: "日記", labelEn: "DIARY" },
  { href: "/contact", label: "コンタクト", labelEn: "CONTACT" },
] as const;
