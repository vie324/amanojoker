-- ============================================================
-- 天邪鬼 Amanojoker — 初期コンテンツ投入
-- 旧ホームページ・eggs の公開情報を元にした初期データ + サンプル記事。
-- (lib/seed.ts と同内容。投入後は管理画面 /admin から自由に編集・削除OK)
-- ============================================================

insert into public.news (title, body, category, published_at) values
('オフィシャルサイトをリニューアルしました',
 '天邪鬼の新しい根城が完成。ライブ情報・楽曲紹介・メンバー日記をここから発信していきます。ブックマークよろしくどうぞ。',
 'info', '2026-08-16T12:00:00+09:00'),
('6曲入りCD「Late Show」発売中',
 '2019年5月リリースの自主制作CD「Late Show」、ライブ会場にて絶賛発売中です。手売りこそロックの基本。',
 'release', '2019-05-01T12:00:00+09:00'),
('HOTLINE2018 神奈川エリアファイナル ベストギター賞受賞',
 '2年連続でベストギター賞をいただきました。しぶといギターはまだまだ枯れません。',
 'media', '2018-10-20T12:00:00+09:00'),
('HOTLINE2017 優秀賞・ベストギター賞・審査員特別賞受賞',
 'HOTLINE2017 神奈川エリアファイナルにて三冠。応援ありがとうございました。',
 'media', '2017-10-15T12:00:00+09:00');

insert into public.songs (slug, title, reading, description, catch_copy, release, track_no, tags, eggs_url, youtube_url, apple_url, accent_color, sort_order) values
('suteta-hazu-no-machi', '捨てたはずの街', 'すてたはずのまち',
 E'天邪鬼の代名詞。一度は背を向けた街への未練と意地を、60年代由来の骨太なギターリフに乗せて叩きつける。HOTLINEのエリアファイナルでも披露してきた、ライブ終盤の定番曲。\n\n最後のコーラスで景色がひっくり返る瞬間を、ぜひフロアで浴びてほしい。',
 '一度捨てた街に、もう一度殴り込む。', '捨てたはずの街 - Single (2023)', 1,
 array['GUITAR ROCK','ANTHEM','LIVE定番'], 'https://eggs.mu/artist/amanojoker',
 'https://www.youtube.com/watch?v=4FkTv8OXZvE',
 'https://music.apple.com/jp/album/%E6%8D%A8%E3%81%A6%E3%81%9F%E3%81%AF%E3%81%9A%E3%81%AE%E8%A1%97/1701616027?i=1701616248',
 '#e63a21', 1),
('pose', 'POSE', 'ポーズ',
 E'斜に構えた奴らへの応援歌。つんのめるビートと噛みつくようなボーカルで、「格好つけることの何が悪い」と開き直る一曲。\n\nHOTLINE''18 神奈川エリアファイナルでは「捨てたはずの街」とのメドレーで披露された。',
 '格好つけることの、何が悪い。', 'Late Show - EP (2023)', 3,
 array['ROCK''N''ROLL','UPPER'], 'https://eggs.mu/artist/amanojoker',
 null,
 'https://music.apple.com/jp/album/pose/1677754409?i=1677754615',
 '#ff5638', 2),
('iro-no-sabaku', '色の砂漠', 'いろのさばく',
 E'タンゴの足取りで進む異色のナンバー。乾いた街の風景に、ラテンの熱と昭和歌謡の湿り気を同時に流し込む。天邪鬼の「雑食」が最もよく出た一曲。\n\n鳴らすたびに景色の色が変わる、砂漠のような曲。',
 'タンゴの足取りで、砂漠に紅を差す。', 'Late Show - EP (2023)', 1,
 array['TANGO','MOODY'], 'https://eggs.mu/artist/amanojoker',
 'https://www.youtube.com/watch?v=PYQQcRysOAY',
 'https://music.apple.com/jp/album/%E8%89%B2%E3%81%AE%E7%A0%82%E6%BC%A0/1677754409?i=1677754413',
 '#c9a227', 3),
('asayake', '朝焼け', 'あさやけ',
 E'夜通し鳴らしたあとの、静かな祈りのようなバラード。フォークの肌触りとゴスペルめいたコーラスで、夜の終わりをそっと看取る。\n\nHOTLINE''17 のステージでは「捨てたはずの街」からこの曲へ雪崩れ込む構成で披露された。',
 '夜通し騒いだあとの、静かな祈り。', 'Late Show - EP (2023)', 2,
 array['FOLK','BALLAD'], 'https://eggs.mu/artist/amanojoker',
 null,
 'https://music.apple.com/jp/album/%E6%9C%9D%E7%84%BC%E3%81%91/1677754409?i=1677754608',
 '#d97b4a', 4),
('uso-wo-tsuku-shojikimono', 'うそをつく正直者', 'うそをつくしょうじきもの',
 E'2015年発表の1stデモ表題曲にして、バンド名「天邪鬼」の精神をそのまま音にした原点。本心を裏返してしか喋れない男の歌。\n\n荒削りだが、今も昔もセットリストの芯にいる。',
 '本心は、いつも裏返しで。', '1st demo「うそをつく正直者」(2015)', 1,
 array['DEMO','ORIGIN'], 'https://eggs.mu/artist/amanojoker', null, null, '#8c8c8c', 5);


insert into public.releases (slug, title, type, release_date, cover_url, apple_url, eggs_url, youtube_url, description, tracks, sort_order) values
('suteta-hazu-no-machi-single', '捨てたはずの街', 'single', '2023-08-16',
 '/images/releases/suteta-hazu-no-machi.jpg',
 'https://music.apple.com/jp/album/1701616027',
 'https://eggs.mu/artist/amanojoker',
 'https://www.youtube.com/watch?v=4FkTv8OXZvE',
 'ライブ終盤の定番にして天邪鬼の代名詞が、ついにサブスク解禁。骨太のギターリフと未練まじりの意地を、そのまま配信に叩き込んだ一曲。MVも公開中。',
 array['捨てたはずの街'], 1),
('hokey-pokers', 'Hokey Pokers', 'ep', '2023-08-08',
 '/images/releases/hokey-pokers.jpg',
 'https://music.apple.com/jp/album/1700249572',
 'https://eggs.mu/artist/amanojoker',
 null,
 '新曲6曲入りEP。つんのめるロックンロールからアコースティック、夜更けのバラードまで、雑食の振り幅を一枚に詰め込んだ。',
 array['セイジ','コンクリート・カリブ','ふうせんかずら (Acoustic Version)','迷宮','完璧な一日','夜明けのサンドマン'], 2),
('late-show', 'Late Show', 'ep', '2023-03-24',
 '/images/releases/late-show.jpg',
 'https://music.apple.com/jp/album/1677754409',
 'https://eggs.mu/artist/amanojoker',
 'https://www.youtube.com/watch?v=PYQQcRysOAY',
 '深夜興行と名付けられた6曲入りEP。タンゴで進む「色の砂漠」、祈りのような「朝焼け」、客演 Joe Powers を迎えた「楽園」まで——夜通しの見世物をどうぞ。',
 array['色の砂漠','朝焼け','Pose','神よサイコロを振れ','楽園 (feat. Joe Powers)','エンドロールではない'], 3);

insert into public.live_events (title, date, open_time, start_time, venue, area) values
('LIVE at 新宿ゴールデンエッグ', '2023-02-25', '18:00', '18:30', '新宿ゴールデンエッグ', '東京'),
('LIVE at 代々木barbara', '2023-01-08', null, null, '代々木barbara', '東京'),
('LIVE at 代々木barbara', '2022-12-16', null, null, '代々木barbara', '東京'),
('LIVE at 代々木barbara', '2022-10-08', null, null, '代々木barbara', '東京'),
('LIVE at 下北沢ろくでもない夜', '2022-08-14', null, null, '下北沢ろくでもない夜', '東京'),
('LIVE at 下北沢ろくでもない夜', '2022-06-10', null, null, '下北沢ろくでもない夜', '東京'),
('LIVE at 根岸 New Inver House', '2022-05-03', null, null, '根岸 New Inver House', '神奈川'),
('LIVE at 関内 b.b street', '2022-03-12', null, null, '関内 b.b street', '神奈川'),
('LIVE at 下北沢LIVEHOLIC', '2022-02-23', null, null, '下北沢LIVEHOLIC', '東京'),
('LIVE at 下北沢ろくでもない夜', '2021-12-12', null, null, '下北沢ろくでもない夜', '東京'),
('LIVE at 西横浜エルプエンテ', '2021-10-31', null, null, '西横浜エルプエンテ', '神奈川'),
('LIVE at 下北沢 Daisy Bar', '2021-01-15', null, null, '下北沢 Daisy Bar', '東京');

insert into public.diary_posts (slug, title, body, author, mood, cover_kanji, published_at) values
('site-renewal', '根城、新築しました',
 E'というわけで、オフィシャルサイトをリニューアルした。\n\n前のサイトも長いこと世話になったが、そろそろ日記も曲の話も、もっと好き勝手に書ける場所が欲しくなった。ここがその場所である。\n\n## これから書くこと\n\n- ライブの告知と、終わったあとの反省文\n- 曲がどうやってできたかという与太話\n- メンバーの近況(主に飯の話になる予感)\n\n更新は気まぐれ、内容は本音の裏返し。天邪鬼の日記とはそういうものだ。\n\nよろしくどうぞ。',
 'ウノ太一', '上機嫌', '新', '2026-08-16T21:00:00+09:00'),
('late-show-no-hanashi', '「Late Show」という名前について',
 E'たまに訊かれるので、CDのタイトルの話を書いておく。\n\n「Late Show」——深夜興行。誰もが寝静まった時間に、それでも幕を開ける見世物のこと。\n\n俺たちのやっている音楽は、流行の真ん中からは外れているのかもしれない。60年代や70年代のロックを土台に、タンゴだのフォークだの、古い道具ばかり並べている。\n\n> でも深夜の映画館には、深夜の映画館にしか来ない客がいる。\n\nそういう客に向けて鳴らす6曲だから、「Late Show」。手売りで買ってくれたあなたは、間違いなくその客である。\n\n次の興行でお会いしましょう。',
 'ウノ太一', '夜型', '夜', '2026-08-10T02:00:00+09:00'),
('tango-to-rock', 'タンゴとロックは親戚である',
 E'「色の砂漠」を作ったときから考えていることを書く。\n\nタンゴとロックンロールは、遠い親戚だと思っている。どちらも港町の音楽で、どちらも行儀が悪くて、どちらも踊るための音楽だったのに、いつの間にか「聴くもの」になってしまった。\n\n## だから俺たちは混ぜる\n\nベースのバーボンが刻む2拍子の上で、ギターが泣く。ドラムのアトランティスが笑いながら、一番いい太鼓を叩く。\n\nジャンルの垣根なんてものは、またいで初めて意味がある。\n\n温故知新、雑食上等。それが→NEW OLD←である。',
 'ウノ太一', '考察', '混', '2026-07-28T23:30:00+09:00'),
('takadanobaba-2013', '高田馬場、2013年の秋',
 E'結成の話を、記録として残しておく。\n\n2013年10月、高田馬場。「最近のロックは行儀が良すぎる」——そんな不満から、このバンドは始まった。行儀の悪いロックがやりたいなら、自分たちでやるしかない。\n\nそこから十年以上。ドラマーが加わって今の三人になり、賞をいくつかもらい、CDを作り、いまもライブハウスのフロアに立っている。\n\n行儀はいまだに悪いままである。安心してほしい。\n\n※この日記はサイト移転にあわせて書き直した再録である。',
 'ウノ太一', '回想', '始', '2026-07-15T22:00:00+09:00');
