export type News = {
  id: string;
  title: string;
  body: string | null;
  category: "info" | "release" | "live" | "media" | string;
  published_at: string;
  is_published: boolean;
};

export type DiaryPost = {
  id: string;
  slug: string;
  title: string;
  body: string; // markdown
  author: string | null;
  mood: string | null;
  cover_kanji: string | null; // 表紙に据える一文字
  published_at: string;
  is_published: boolean;
};

export type Song = {
  id: string;
  slug: string;
  title: string;
  reading: string | null;
  description: string | null; // markdown
  catch_copy: string | null; // キャッチコピー(一言)
  release: string | null;
  track_no: number | null;
  duration: string | null;
  tags: string[];
  eggs_url: string | null;
  youtube_url: string | null;
  accent_color: string | null;
  sort_order: number;
  is_published: boolean;
};

export type LiveEvent = {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  open_time: string | null;
  start_time: string | null;
  venue: string;
  area: string | null;
  ticket_price: string | null;
  note: string | null;
  link_url: string | null;
  is_published: boolean;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  body: string;
  created_at: string;
};
