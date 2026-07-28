import type { Course } from "../types";

/**
 * AI 음악과 더빙 — Suno로 BGM을 만들고 ElevenLabs로 더빙을 입히는
 * 사운드 제작 전 과정을 다루는 입문 강의입니다.
 */
export const aiAudio: Course = {
  slug: "ai-audio",
  title: "AI 음악과 더빙: Suno & ElevenLabs",
  subtitle: "Suno로 BGM을 만들고 ElevenLabs로 자연스러운 AI 더빙을 입히는 사운드 제작 전 과정",
  description:
    "영상의 완성도는 결국 소리가 결정합니다. 이 강의에서는 Suno로 콘텐츠에 꼭 맞는 BGM을 만들고, ElevenLabs로 자연스러운 AI 내레이션과 다국어 더빙을 입히는 전 과정을 다룹니다. 스타일 태그 프롬프트, 보이스 클로닝과 윤리, 감정·톤 제어, 레벨 밸런스와 덕킹, 그리고 2026년 기준 저작권·플랫폼 정책까지 — 음악 지식이 없어도 따라올 수 있게 단계별로 안내합니다.",
  category: "creative",
  level: "beginner",
  tags: ["Suno", "ElevenLabs", "AI 음악", "AI 더빙", "사운드 디자인"],
  gradient: ["#14b8a6", "#22c55e"],
  icon: "music",
  outcomes: [
    "장르·무드·악기·BPM 언어로 Suno 스타일 프롬프트를 작성할 수 있다",
    "콘텐츠 용도(인트로·브이로그·광고)에 맞는 BGM을 설계할 수 있다",
    "ElevenLabs로 감정·톤이 제어된 내레이션과 다국어 더빙을 만들 수 있다",
    "레벨 밸런스와 덕킹으로 BGM과 더빙을 자연스럽게 섞을 수 있다",
    "AI 음원의 저작권 조건과 플랫폼 정책을 확인하고 안전하게 상업 활용할 수 있다",
  ],
  modules: [
    {
      slug: "suno-music",
      title: "Suno로 음악 만들기",
      description: "음악 생성 AI의 원리부터 용도별 BGM 제작까지",
      lessons: [
        {
          slug: "how-music-ai-works",
          title: "음악 생성 AI의 원리와 Suno 시작하기",
          minutes: 4,
          content: `작곡을 배운 적 없어도 괜찮습니다. 이제 문장 하나만 쓰면 3분짜리 곡이 나옵니다. 그리고 원리를 알면 그 문장, 즉 프롬프트를 훨씬 잘 쓰게 됩니다.

## 텍스트가 음악이 되는 과정

음악 생성 AI는 수백만 곡을 들으며 **"이런 설명이면 이런 소리"**라는 짝을 익힌 모델입니다. 주방장에 비유하면, 수많은 주문서와 완성된 요리를 함께 보면서 "달콤하고 부드럽게"가 어떤 맛인지 배운 셈입니다.

- 내가 쓴 프롬프트는 장르·무드·악기 같은 **음악적 특징**으로 번역됩니다.
- 모델은 그 특징에 맞는 소리를 처음부터 새로 만들어 냅니다. 기존 곡을 잘라 붙이는 방식이 아닙니다.
- 그래서 "좋은 노래"라는 감상평보다 **음악을 설명하는 말**(잔잔한 피아노, 느린 템포…)을 쓸수록 결과가 정확해집니다.

## Suno 첫 곡 만들기

- 브라우저에서 suno.com에 접속해 가입한 뒤, 화면의 **Create** 메뉴를 클릭하세요. 무료 크레딧(생성할 때마다 차감되는 포인트)으로 하루 몇 곡을 만들 수 있습니다.
- **Simple 모드**: 한 문장 설명만 쓰면 가사·작곡을 AI가 전부 처리합니다. 첫 곡은 이 모드로 감을 잡으세요.
- **Custom 모드**: 스타일과 가사를 나눠 입력합니다. 이 강의는 주로 이 모드를 씁니다. Custom 스위치가 안 보이면 Create 화면 위쪽을 확인하세요.
- 한 번 생성하면 곡이 2개씩 나옵니다. 마음에 드는 쪽을 골라 **Extend**(곡 이어 만들기) 버튼으로 발전시키세요.
- 생성 버튼이 눌리지 않으면 크레딧이 다 떨어진 것입니다. 무료 크레딧은 매일 다시 채워지니 다음 날 이어서 하면 됩니다.
- 첫 결과가 마음에 안 들어도 정상입니다. 프롬프트를 조금 고쳐 다시 생성하는 반복이 기본 과정입니다.

> 💡 **핵심**: 음악 생성 AI는 '설명 → 특징 → 소리'로 변환하는 기계입니다. 좋은 곡은 좋은 설명에서 나옵니다.`,
          illustration: {
            type: "flow",
            title: "텍스트가 곡이 되기까지",
            nodes: [
              {
                label: "프롬프트 입력",
                sublabel: "\"lo-fi, 따뜻한, 새벽 감성\"",
                icon: "file-text",
                tone: "primary",
              },
              {
                label: "음악적 특징으로 해석",
                sublabel: "장르 · 무드 · 악기 · 템포",
                icon: "brain",
                tone: "accent",
              },
              {
                label: "오디오 생성",
                sublabel: "곡 2개가 동시에 생성됨",
                icon: "music",
                tone: "success",
              },
              {
                label: "선택 · 발전",
                sublabel: "Extend로 이어 만들기",
                icon: "wand",
                tone: "muted",
                edgeLabel: "마음에 드는 쪽만",
              },
            ],
            loopBack: { from: 3, to: 0, label: "프롬프트 수정 후 재생성" },
            caption: "한 번에 완성이 아니라 '생성 → 선택 → 수정'을 반복하는 과정입니다.",
          },
        },
        {
          slug: "style-tags-and-lyrics",
          title: "스타일 태그와 가사 프롬프트: 음악을 설명하는 언어",
          minutes: 6,
          content: `"신나는 노래 만들어줘"라고 쓰면 AI도 감으로 만듭니다. 그래서 매번 다른 결과가 나옵니다. 원하는 소리를 다시 만들어내려면 **네 가지 축의 언어**가 필요합니다. 커피 주문과 같습니다 — "맛있는 거 주세요" 대신 "아이스 라떼, 샷 추가, 덜 달게"라고 해야 원하는 잔이 나옵니다.

## 스타일 태그의 4축

- **장르**: lo-fi hip hop, synthwave, acoustic folk, corporate pop — 장르가 소리의 뼈대입니다.
- **무드(분위기)**: uplifting(희망찬), dreamy(몽환적), tense(긴장감), warm(따뜻한) — 형용사 1~2개면 충분합니다.
- **악기**: soft piano, punchy drums처럼 넣을 것과, \`no vocals\`(보컬 없음)처럼 **뺄 것**을 모두 지정하세요.
- **BPM/에너지**: BPM은 곡의 빠르기 단위(분당 박자 수)입니다. 90 BPM이면 잔잔한 편, 120 BPM이면 신나는 편입니다.

네 축을 쉼표로 나열하면 기본형이 완성됩니다: \`lo-fi hip hop, dreamy, soft piano, 80 BPM, no vocals\`

## 가사 프롬프트와 구조 태그

Custom 모드의 가사 칸에서는 **대괄호 구조 태그**로 곡의 전개를 지휘할 수 있습니다.

- \`[Intro]\` \`[Verse]\` \`[Chorus]\` \`[Bridge]\` \`[Outro]\` — 도입·절·후렴 같은 구간 구분
- \`[Instrumental]\` — 가사 없이 연주만 나오는 구간
- 훅(귀에 남는 후렴 문구)은 짧고 반복되게 쓰는 것이 AI 보컬에 잘 맞습니다.

## 자주 하는 실수

- 장르를 5개씩 섞으면 정체불명의 곡이 나옵니다. **장르는 1~2개**만 고르세요.
- 아티스트 실명은 정책상 무시되거나 차단됩니다. 이름 대신 그 아티스트의 **소리를 묘사**하세요.

> 💡 **핵심**: 스타일 태그 = 장르 + 무드 + 악기 + BPM. 이 네 축만 채우면 프롬프트의 80%는 완성입니다.`,
          illustration: {
            type: "chat",
            title: "스타일 프롬프트 개선 예시",
            messages: [
              { role: "user", text: "신나는 노래 만들어줘" },
              {
                role: "ai",
                text: "장르·무드·악기·BPM이 없어 임의로 생성합니다 → 매번 다른 결과",
              },
              {
                role: "user",
                text: "upbeat synthwave, retro, punchy drums, analog synth, 118 BPM, no vocals",
              },
              {
                role: "ai",
                text: "4축이 모두 지정됨 → 의도한 소리를 재현 가능하게 생성",
              },
            ],
            caption: "막연한 형용사 대신 음악을 설명하는 4축 언어를 쓰세요.",
          },
          demo: {
            title: "Suno에서 스타일 태그로 BGM 만들기 따라하기",
            app: {
              kind: "browser",
              url: "suno.com/create",
              blocks: [
                { id: "h1", type: "heading", label: "Create" },
                { id: "badge-mode", type: "badge", label: "Custom 모드" },
                { id: "lbl-style", type: "text", label: "스타일 프롬프트 (Styles)" },
                { id: "in-style", type: "input", label: "장르, 무드, 악기, BPM을 쉼표로 입력…" },
                { id: "lbl-lyrics", type: "text", label: "가사 (Lyrics) — 구조 태그 사용 가능" },
                { id: "in-lyrics", type: "input", label: "[Verse] [Chorus] 구조 태그 입력…" },
                { id: "btn-create", type: "button", label: "Create" },
                { id: "badge-gen", type: "badge", label: "생성 중… 곡 2개를 만들고 있습니다", hidden: true },
                { id: "card-1", type: "card", label: "🎵 새벽 감성 lo-fi — v1 (2:58)", hidden: true },
                { id: "card-2", type: "card", label: "🎵 새벽 감성 lo-fi — v2 (3:04)", hidden: true },
                { id: "btn-extend", type: "button", label: "Extend — 이어서 발전시키기", hidden: true },
              ],
            },
            actions: [
              { t: "caption", text: "① Custom 모드에서 스타일 입력창을 클릭합니다" },
              { t: "move", target: "in-style" },
              { t: "click" },
              { t: "caption", text: "② 장르·무드·악기·BPM, 4축 언어로 스타일을 적습니다" },
              { t: "type", target: "in-style", text: "lo-fi, dreamy, piano, 80 BPM, no vocals" },
              { t: "wait", ms: 400 },
              { t: "caption", text: "③ 가사 칸에는 대괄호 구조 태그로 전개를 지정합니다" },
              { t: "click", target: "in-lyrics" },
              { t: "type", target: "in-lyrics", text: "[Intro] [Verse] [Chorus] [Outro]" },
              { t: "caption", text: "④ Create를 눌러 생성을 시작합니다" },
              { t: "move", target: "btn-create" },
              { t: "click" },
              { t: "reveal", target: "badge-gen" },
              { t: "wait", ms: 800 },
              { t: "hide", target: "badge-gen" },
              { t: "caption", text: "⑤ 동시에 생성된 곡 2개를 비교해 마음에 드는 쪽을 고릅니다" },
              { t: "reveal", target: "card-1" },
              { t: "reveal", target: "card-2" },
              { t: "move", target: "card-2" },
              { t: "click" },
              { t: "caption", text: "⑥ Extend로 고른 곡을 이어서 발전시킵니다" },
              { t: "reveal", target: "btn-extend" },
              { t: "move", target: "btn-extend" },
              { t: "click" },
              { t: "wait", ms: 800 },
            ],
          },
        },
        {
          slug: "bgm-by-purpose",
          title: "콘텐츠 용도별 BGM 제작: 인트로·브이로그·광고",
          minutes: 5,
          content: `좋은 BGM의 기준은 '좋은 곡'이 아니라 **'영상에 맞는 곡'**입니다. 식당 음악을 떠올려 보세요. 아무리 명곡이라도 손님 대화를 방해하면 실패입니다. 용도가 다르면 설계 공식도 다릅니다.

## 유튜브 인트로: 5초 안에 각인

- 길이 5~15초, **즉시 임팩트**가 생명입니다. 빌드업(서서히 고조되는 도입부) 없이 바로 훅으로 시작하세요.
- 프롬프트 키워드: \`short intro jingle, catchy, energetic, instant hook\`
- 같은 인트로를 매 영상 반복해서 쓰면 "이 소리 = 이 채널"로 기억되는 **사운드 로고**가 됩니다.

## 브이로그: 존재감을 지운 배경

- 목소리를 방해하지 않는 것이 최우선입니다. \`no vocals\`(보컬 없음)는 필수입니다.
- 프롬프트 키워드: \`chill lo-fi, warm acoustic, mellow, steady rhythm\`
- 중간에 갑자기 커지거나 빨라지지 않는 **일정한 에너지**의 곡을 고르세요. 어디서 잘라도 어색하지 않아 편집이 쉬워집니다.

## 광고: 15~30초 안에 감정 곡선

- 도입(호기심) → 상승(기대) → 클라이맥스(메시지)로 이어지는 **에너지 설계**가 핵심입니다.
- 프롬프트 키워드: \`uplifting corporate pop, building energy, bright, climactic ending\`
- 편집 순서는 거꾸로입니다. 제품이 등장하는 순간을 먼저 정하고, 그 지점에 곡의 절정이 오도록 앞을 맞추세요.

어느 용도든 마지막 확인은 같습니다. 곡만 따로 듣지 말고, **실제 영상에 얹어 목소리와 함께** 들어보세요. 그때 어울려야 진짜 합격입니다.

> 💡 **핵심**: BGM 프롬프트는 곡 설명이 아니라 **영상의 역할 설명**에서 출발합니다 — "이 소리가 시청자에게 무엇을 시키는가"를 먼저 정하세요.`,
          illustration: {
            type: "compare",
            title: "용도별 BGM 설계 공식",
            columns: [
              {
                title: "인트로",
                icon: "zap",
                tone: "primary",
                items: ["5~15초", "즉시 훅, 빌드업 없음", "채널 사운드 로고화", "energetic · catchy"],
              },
              {
                title: "브이로그",
                icon: "camera",
                tone: "accent",
                items: ["목소리가 주인공", "no vocals 필수", "일정한 에너지 유지", "chill · mellow"],
              },
              {
                title: "광고",
                icon: "trending-up",
                tone: "success",
                items: ["15~30초", "도입→상승→클라이맥스", "제품 등장 = 절정", "uplifting · climactic"],
              },
            ],
            caption: "같은 Suno라도 용도에 따라 길이·에너지 곡선·보컬 여부가 달라집니다.",
          },
        },
      ],
    },
    {
      slug: "elevenlabs-voice",
      title: "ElevenLabs로 음성 만들기",
      description: "TTS 기초부터 보이스 클로닝 윤리, 다국어 더빙까지",
      lessons: [
        {
          slug: "tts-basics",
          title: "TTS 기초와 보이스 선택",
          minutes: 5,
          content: `AI 음성의 품질은 절반이 **보이스 선택**에서 결정됩니다. 좋은 원고도 안 맞는 목소리로 읽으면 어색해집니다. 옷과 같습니다 — 걸어놓고 볼 때가 아니라 **직접 입어봐야** 어울리는지 알 수 있습니다.

## TTS가 자연스러워진 이유

- 최신 TTS는 글자를 소리로 하나씩 바꾸는 게 아니라 **문맥을 이해하고 연기**합니다. 같은 "네"도 질문 뒤에서는 대답처럼, 놀란 장면에서는 감탄처럼 읽습니다.
- ElevenLabs는 2026년 기준 다국어 표현력에서 가장 널리 쓰이는 서비스이며, 한국어 품질도 실사용 수준입니다.

## 보이스 고르는 순서

1. elevenlabs.io에 가입한 뒤 **Voice Library**(목소리 모음) 메뉴에서 콘텐츠 언어로 필터를 겁니다. 메뉴가 안 보이면 왼쪽 사이드바의 Voices 항목을 확인하세요.
2. 성별·연령대보다 **톤 태그**를 먼저 보세요 — calm(차분), energetic(활기), narrative(내레이션형) 같은 표시입니다.
3. 후보 보이스에 실제 원고의 **첫 문단**을 넣어 시험 생성합니다. 샘플 문장과 내 원고는 다르게 들리기 때문입니다.
4. 후보 2~3개를 같은 원고로 비교한 뒤, 하나를 채널 고정 보이스로 정합니다.

## 핵심 설정 두 가지

- **Stability(안정성)**: 낮추면 감정 기복이 풍부해지고, 높이면 일정하고 차분해집니다. 내레이션은 중간~높게 두세요.
- **Similarity(유사도)**: 원본 보이스의 특성을 얼마나 유지할지입니다. 과하게 높이면 원본 녹음의 잡음까지 재현될 수 있습니다.
- 설정이 헷갈리면 일단 기본값 그대로 시작해도 충분합니다. 보이스부터 정하는 것이 먼저입니다.

> 💡 **핵심**: 샘플 듣고 고르지 말고 **내 원고로 시험**해서 고르세요. 그리고 한 채널엔 한 보이스 — 목소리가 곧 브랜드입니다.`,
          illustration: {
            type: "steps",
            title: "보이스 선택 4단계",
            steps: [
              {
                label: "언어로 필터",
                sublabel: "Voice Library에서 한국어 지원 확인",
                icon: "globe",
              },
              {
                label: "톤 태그 확인",
                sublabel: "calm · energetic · narrative",
                icon: "filter",
              },
              {
                label: "내 원고로 시험",
                sublabel: "샘플 문장 말고 실제 첫 문단으로",
                icon: "mic",
              },
              {
                label: "채널 고정 보이스 확정",
                sublabel: "후보 2~3개 비교 후 하나로",
                icon: "check",
              },
            ],
            caption: "목소리는 채널의 브랜드 자산 — 한 번 정하면 유지하세요.",
          },
          demo: {
            title: "ElevenLabs에서 보이스 시험 생성 따라하기",
            app: {
              kind: "browser",
              url: "elevenlabs.io/text-to-speech",
              blocks: [
                { id: "h1", type: "heading", label: "Text to Speech" },
                { id: "lbl-lib", type: "text", label: "Voice Library — 한국어 필터 적용됨" },
                { id: "voice-1", type: "card", label: "🎙️ 지호 — calm · narrative" },
                { id: "voice-2", type: "card", label: "🎙️ 세라 — energetic · bright" },
                { id: "badge-sel", type: "badge", label: "선택됨: 지호 (내레이션용)", hidden: true },
                { id: "in-script", type: "input", label: "실제 원고의 첫 문단을 입력하세요…" },
                { id: "lbl-stab", type: "text", label: "Stability: 중간~높음 (내레이션 권장)" },
                { id: "btn-gen", type: "button", label: "Generate" },
                { id: "card-audio", type: "card", label: "🔊 내레이션_시험.mp3 (0:14)", hidden: true },
                { id: "btn-dl", type: "button", label: "다운로드", hidden: true },
              ],
            },
            actions: [
              { t: "caption", text: "① Voice Library에서 한국어 보이스 후보를 비교합니다" },
              { t: "move", target: "voice-1" },
              { t: "click" },
              { t: "move", target: "voice-2" },
              { t: "click" },
              { t: "wait", ms: 400 },
              { t: "caption", text: "② 톤 태그를 보고 내레이션용 보이스를 확정합니다" },
              { t: "click", target: "voice-1" },
              { t: "reveal", target: "badge-sel" },
              { t: "wait", ms: 400 },
              { t: "caption", text: "③ 샘플 문장 대신 실제 원고의 첫 문단을 입력합니다" },
              { t: "click", target: "in-script" },
              { t: "type", target: "in-script", text: "안녕하세요, 오늘은 AI 더빙을 배워봅니다." },
              { t: "wait", ms: 400 },
              { t: "caption", text: "④ Generate를 눌러 음성을 생성합니다" },
              { t: "move", target: "btn-gen" },
              { t: "click" },
              { t: "wait", ms: 800 },
              { t: "reveal", target: "card-audio" },
              { t: "move", target: "card-audio" },
              { t: "click" },
              { t: "caption", text: "⑤ 들어보고 어색함이 없으면 다운로드합니다" },
              { t: "reveal", target: "btn-dl" },
              { t: "move", target: "btn-dl" },
              { t: "click" },
            ],
          },
        },
        {
          slug: "voice-cloning-ethics",
          title: "보이스 클로닝과 윤리: 동의가 먼저입니다",
          minutes: 5,
          content: `1분 녹음이면 내 목소리를 그대로 복제할 수 있는 시대입니다. 강력한 만큼 위험합니다. **이 레슨의 규칙을 지키지 않으면 법적 문제가 됩니다.**

## 클로닝 두 가지 방식

- **Instant Cloning(즉석 복제)**: 1~2분 샘플로 바로 복제합니다. 빠르지만 유사도는 보통이라, 시험 삼아 써보기에 알맞습니다.
- **Professional Cloning(정밀 복제)**: 30분 이상의 깨끗한 녹음으로 학습합니다. 본인 인증이 필수인데, 화면에 나온 문장을 직접 소리 내어 읽는 '음성 캡차' 방식입니다. 유사도가 훨씬 높습니다.

## 절대 규칙: 동의 없는 클로닝 금지

- 복제해도 되는 목소리는 딱 두 가지입니다. **내 목소리, 그리고 서면 동의를 받은 목소리.**
- 연예인·정치인·지인의 목소리를 몰래 복제하면 ElevenLabs 약관 위반입니다. 한국에서도 퍼블리시티권(자기 이름·목소리를 남이 함부로 돈벌이에 못 쓰게 하는 권리) 침해, 그리고 딥페이크 관련 성폭력처벌법의 처벌 대상이 될 수 있습니다.
- 2026년 8월부터 적용되는 **EU AI Act** 투명성 의무 등 주요 규제는 AI 생성 음성에 **AI임을 고지**하도록 요구합니다. 국내 플랫폼들도 AI 콘텐츠 표시를 요구하는 추세입니다.

## 안전한 활용 체크리스트

- 내 목소리 클로닝 → 내레이션 자동화. 가장 안전하고 실용적인 사용법입니다. 감기에 걸려도, 새벽에도 같은 목소리로 녹음할 수 있습니다.
- 성우 목소리 → **이용 범위와 기간을 계약서에 명시**한 뒤에 사용하세요.
- 공개할 때는 영상 설명란 등에 "AI 보이스 사용" 고지 문구를 넣으세요.

> 💡 **핵심**: 클로닝의 기준은 기술이 아니라 **동의**입니다. 동의 → 녹음 → 복제 → 고지, 이 순서를 벗어나면 만들지 마세요.`,
          illustration: {
            type: "flow",
            title: "동의 기반 클로닝 워크플로우",
            nodes: [
              {
                label: "동의 확보",
                sublabel: "본인 목소리 or 서면 동의",
                icon: "clipboard",
                tone: "warning",
              },
              {
                label: "깨끗한 샘플 녹음",
                sublabel: "잡음 없는 1~30분",
                icon: "mic",
                tone: "primary",
                edgeLabel: "동의 없으면 여기서 중단",
              },
              {
                label: "클로닝 + 본인 인증",
                sublabel: "Professional은 음성 캡차",
                icon: "lock",
                tone: "accent",
              },
              {
                label: "AI 사용 고지 후 공개",
                sublabel: "EU AI Act · 플랫폼 표시 의무",
                icon: "shield",
                tone: "success",
              },
            ],
            caption: "첫 관문이 '동의'인 이유 — 이후 모든 단계의 합법성이 여기서 결정됩니다.",
          },
        },
        {
          slug: "emotion-and-pronunciation",
          title: "감정·톤 제어와 발음 교정",
          minutes: 6,
          content: `밋밋한 낭독과 살아있는 내레이션의 차이는 **연출 지시**에 있습니다. ElevenLabs에서는 연극 대본의 지문처럼, 텍스트 안에 연기 지시를 직접 써넣을 수 있습니다.

## 오디오 태그로 감정 연출

최신 모델(Eleven v3 계열)은 대괄호로 쓴 **오디오 태그**를 연기 지시로 해석합니다.

- 감정: \`[excited]\`(신나게) \`[sad]\`(슬프게) \`[whispers]\`(속삭이듯) \`[laughs]\`(웃음)
- 전달: \`[pause]\`로 잠깐 숨을 고르게 하고, 문장을 나눠 리듬을 만듭니다.
- 태그는 문장 앞에 붙입니다. 태그 자체는 소리로 읽히지 않고 연기 지시로만 쓰입니다.
- 한 문단에 1~2개면 충분합니다 — 남발하면 오히려 부자연스러워집니다.

## 텍스트 자체가 연출입니다

- **문장을 짧게** 끊으면 또박또박 읽고, 길게 이으면 흘러가듯 읽습니다.
- 강조할 단어는 따옴표로 감싸거나 **쉼표로 앞뒤를 분리**하세요. 자연히 그 단어에 힘이 들어갑니다.
- 말줄임표(…)는 머뭇거림으로, 느낌표는 에너지 상승으로 해석됩니다.

## 발음 교정 요령

- 숫자·단위는 일단 생성해서 들어보고, 이상하게 읽으면 읽는 법을 풀어 쓰세요: "2026년" → "이천이십육 년".
- 외래어·브랜드명을 틀리게 읽으면 **소리 나는 대로** 다시 씁니다: "Suno" → "수노".
- 자주 쓰는 용어는 발음 사전(Pronunciation Dictionary) 기능에 등록하세요. 한 번 등록하면 프로젝트 전체에 적용됩니다.
- 긴 원고는 문단 단위로 나눠 생성하세요. 틀린 문단만 다시 만들면 되니 수정이 빠르고 크레딧도 아낄 수 있습니다.

> 💡 **핵심**: TTS 원고는 '읽을 글'이 아니라 **'연기 대본'**입니다. 태그와 문장 부호가 여러분의 연출 도구입니다.`,
          illustration: {
            type: "terminal",
            windowTitle: "elevenlabs — 연기 대본 vs 평문",
            lines: [
              { text: "# 평문 원고 (밋밋한 낭독)", tone: "comment" },
              { text: "오늘은 정말 놀라운 소식이 있습니다. 드디어 신제품이 나왔습니다.", tone: "dim" },
              { text: "# 연기 대본 (오디오 태그 + 리듬)", tone: "comment" },
              { text: "[excited] 오늘은… 정말 놀라운 소식이 있습니다!", tone: "cmd" },
              { text: "[pause]", tone: "cmd" },
              { text: "[whispers] 드디어, 신제품이 나왔거든요.", tone: "cmd" },
              { text: "✓ 같은 문장, 태그 하나로 전달력이 달라집니다", tone: "ok" },
            ],
            caption: "태그는 문장 앞에, 문단당 1~2개만 — 과유불급입니다.",
          },
        },
        {
          slug: "multilingual-dubbing",
          title: "다국어 더빙 워크플로우",
          minutes: 6,
          content: `한국어 영상 하나로 영어·일본어·스페인어 시청자까지 만날 수 있습니다. 더빙 자동화는 2026년 크리에이터의 표준 확장 전략입니다.

## Dubbing Studio의 5단계

ElevenLabs의 Dubbing Studio 메뉴에 영상 파일을 올리면 아래 과정이 자동으로 진행됩니다.

1. **전사**: 원본 음성을 텍스트로 받아 적고, 누가 말했는지 화자를 구분합니다.
2. **번역**: 대상 언어로 번역합니다 — 여기서 **직접 검수**하느냐가 품질을 가릅니다.
3. **음성 생성**: 원래 화자의 목소리 느낌을 유지한 채 다른 언어로 말하게 합니다. 내 목소리가 그대로 영어를 하는 셈입니다.
4. **타이밍 정렬**: 원본에서 말한 길이에 맞춰 속도를 조정합니다.
5. **검수·내보내기**: 구간별로 들어보며 고친 뒤 오디오나 영상 파일로 출력합니다.

## 품질을 가르는 두 지점

- **번역 검수**: 자동 번역은 관용구·유행어에 약합니다. 해당 언어를 아는 사람의 검토를 거치세요. 어렵다면 최소한 역번역(번역문을 다시 한국어로 번역해 뜻이 온전한지 보는 것)이라도 확인하세요.
- **길이 차이**: 한국어를 영어로 옮기면 문장이 길어지는 경향이 있어, 정해진 시간 안에 말하느라 말이 빨라질 수 있습니다. 원고를 미리 간결하게 다듬으면 해결됩니다.

## 실전 팁

- 시작 전에 **자막 대신 더빙**이 꼭 필요한 콘텐츠인지부터 판단하세요. 얼굴이 화면에 안 나오는 내레이션 영상이 더빙 효과가 가장 큽니다 — 입 모양과 소리가 어긋날 걱정이 없기 때문입니다.
- 첫 더빙은 5분 이하의 짧은 영상으로 시험해 보세요. 전 과정을 한 번 겪어봐야 어디를 검수해야 할지 감이 잡힙니다.

> 💡 **핵심**: 더빙 자동화에서 기계가 못 하는 단계는 단 하나, **번역 검수**입니다. 그 한 단계에 사람을 배치하세요.`,
          illustration: {
            type: "steps",
            title: "다국어 더빙 5단계",
            steps: [
              { label: "전사", sublabel: "음성 → 텍스트, 화자 분리", icon: "file-text" },
              { label: "번역", sublabel: "사람 검수 필수 구간", icon: "globe" },
              { label: "음성 생성", sublabel: "원래 목소리 특성 유지", icon: "mic" },
              { label: "타이밍 정렬", sublabel: "원본 발화 길이에 맞춤", icon: "clock" },
              { label: "검수 · 내보내기", sublabel: "구간별 확인 후 출력", icon: "check" },
            ],
            caption: "5단계 중 4단계는 자동 — 사람의 가치는 2단계(번역 검수)에 있습니다.",
          },
        },
      ],
    },
    {
      slug: "sound-pipeline",
      title: "사운드 통합 파이프라인",
      description: "믹싱, 자동화, 그리고 저작권까지 — 결과물을 세상에 내보내기",
      lessons: [
        {
          slug: "mixing-bgm-and-voice",
          title: "영상에 BGM과 더빙 입히기: 레벨 밸런스와 덕킹",
          minutes: 6,
          content: `좋은 BGM과 좋은 더빙을 만들어도, 섞는 순간 망칠 수 있습니다. 다행히 믹싱(여러 소리를 한 결과물로 섞는 작업)의 규칙은 단순합니다 — **목소리가 왕**입니다.

## 레벨 밸런스의 기본 공식

오디오 트랙은 역할별로 크기의 서열이 있습니다. 여기서 dB(데시벨)는 소리 크기 단위로, 0에 가까울수록 큰 소리입니다.

- **내레이션(더빙)**: 가장 크게, 평균 -6 ~ -12dB 부근
- **효과음**: 내레이션보다 약간 작게
- **BGM**: 목소리가 나올 때 -20 ~ -25dB 수준으로, 배경에 깔리게

숫자는 편집 프로그램에서 각 트랙의 볼륨 값을 조정하면 됩니다. 그리고 숫자보다 확실한 검증법이 있습니다. **스마트폰 스피커로 들어보세요.** 작은 스피커에서 목소리가 묻히면 밸런스 실패입니다.

## 덕킹(Ducking): 자동으로 비켜주는 BGM

- 덕킹은 **목소리가 나오는 순간 BGM 볼륨을 자동으로 낮추는** 기법입니다. 사회자가 말을 시작하면 알아서 조용해지는 행사장 음악을 떠올리면 됩니다.
- 프리미어 프로(Essential Sound 패널 → 덕킹), 다빈치 리졸브, 캡컷 모두 자동 덕킹을 지원합니다.
- 키프레임(볼륨을 바꿀 지점을 하나씩 손으로 찍는 표시)을 일일이 만드는 것보다 훨씬 빠르고, 목소리가 쉬는 구간에서 BGM이 자연스럽게 살아납니다.

## 마지막 점검

- 전체 음량은 유튜브 기준 약 **-14 LUFS**에 맞추세요. 플랫폼이 자동으로 볼륨을 조정할 때 안전한 값입니다.
- 측정이 어렵게 느껴지면 편집 프로그램의 라우드니스 미터(음량 측정 계기판)나 자동 음량 맞춤 기능을 쓰면 됩니다. 숫자를 외우는 것보다 습관이 중요합니다.

> 💡 **핵심**: 믹싱 우선순위는 목소리 > 효과음 > BGM. 그리고 덕킹 기능이 이 서열을 자동으로 지켜줍니다.`,
          illustration: {
            type: "stack",
            title: "오디오 트랙의 서열",
            layers: [
              {
                label: "내레이션 (더빙)",
                sublabel: "가장 크게 · 항상 왕좌",
                icon: "mic",
                tone: "primary",
              },
              {
                label: "효과음",
                sublabel: "내레이션보다 한 단계 아래",
                icon: "zap",
                tone: "accent",
              },
              {
                label: "BGM",
                sublabel: "목소리 나오면 덕킹으로 자동 하강",
                icon: "music",
                tone: "muted",
              },
              {
                label: "최종 라우드니스",
                sublabel: "유튜브 기준 약 -14 LUFS",
                icon: "gauge",
                tone: "success",
              },
            ],
            caption: "위층이 나올 때 아래층이 비켜주는 구조 — 이것이 덕킹입니다.",
          },
          demo: {
            title: "타임라인에서 레벨 밸런스와 덕킹 따라하기",
            app: {
              kind: "design-canvas",
              windowTitle: "사운드 믹싱 — 오디오 타임라인",
              tools: [
                { id: "tool-mic", icon: "mic", label: "더빙 트랙" },
                { id: "tool-music", icon: "music", label: "BGM 트랙" },
                { id: "tool-duck", icon: "gauge", label: "덕킹" },
              ],
              objects: [
                { id: "timeline", shape: "frame", label: "오디오 타임라인", x: 4, y: 6, w: 92, h: 88 },
                { id: "video-track", shape: "rect", label: "영상 트랙", x: 8, y: 14, w: 84, h: 14, color: "#64748b" },
                { id: "voice-track", shape: "rect", label: "내레이션 -9dB", x: 22, y: 36, w: 56, h: 13, color: "#8b5cf6", hidden: true },
                { id: "voice-track-aligned", shape: "rect", label: "내레이션 -9dB", x: 8, y: 36, w: 56, h: 13, color: "#8b5cf6", hidden: true },
                { id: "bgm-track", shape: "rect", label: "BGM -22dB", x: 8, y: 58, w: 84, h: 13, color: "#14b8a6", hidden: true },
                { id: "bgm-duck", shape: "rect", label: "덕킹: 목소리 구간 -25dB", x: 8, y: 74, w: 56, h: 10, color: "#0f766e", hidden: true },
                { id: "lufs-badge", shape: "text", label: "최종 -14 LUFS ✓", x: 68, y: 76, w: 24, h: 8, hidden: true },
              ],
            },
            actions: [
              { t: "caption", text: "① 더빙 트랙 도구로 내레이션을 타임라인에 올립니다" },
              { t: "move", target: "tool-mic" },
              { t: "click" },
              { t: "drag", from: "video-track", to: "voice-track" },
              { t: "reveal", target: "voice-track" },
              { t: "wait", ms: 400 },
              { t: "caption", text: "② 드래그로 내레이션을 영상 시작점에 맞춰 정렬합니다" },
              { t: "drag", from: "voice-track", to: "voice-track-aligned" },
              { t: "hide", target: "voice-track" },
              { t: "reveal", target: "voice-track-aligned" },
              { t: "wait", ms: 400 },
              { t: "caption", text: "③ BGM은 목소리보다 작게, 맨 아래 층에 깔아줍니다" },
              { t: "move", target: "tool-music" },
              { t: "click" },
              { t: "drag", from: "voice-track-aligned", to: "bgm-track" },
              { t: "reveal", target: "bgm-track" },
              { t: "wait", ms: 400 },
              { t: "caption", text: "④ 덕킹을 켜 목소리 구간의 BGM을 자동으로 낮춥니다" },
              { t: "move", target: "tool-duck" },
              { t: "click" },
              { t: "reveal", target: "bgm-duck" },
              { t: "caption", text: "⑤ 스마트폰 스피커로 확인하고 -14 LUFS로 마무리합니다" },
              { t: "reveal", target: "lufs-badge" },
              { t: "move", target: "lufs-badge" },
              { t: "wait", ms: 800 },
            ],
          },
        },
        {
          slug: "podcast-audiobook-automation",
          title: "팟캐스트·오디오북 자동화 파이프라인",
          minutes: 5,
          content: `원고만 쓰면 나머지는 기계가 하는 시대입니다. 매주 반복되는 오디오 콘텐츠는 **파이프라인**(공장 조립 라인처럼 작업 단계를 이어 붙인 자동 흐름)으로 만들면 제작 시간이 10분의 1로 줄어듭니다.

## 반복되는 4단계를 자동화

1. **원고**: 블로그 글·뉴스레터를 LLM에게 맡겨 '말하기용 대본'으로 바꿉니다 — 문어체를 구어체로.
2. **음성 생성**: 고정 보이스와 저장해 둔 설정으로 ElevenLabs API를 호출합니다. 매회 같은 목소리가 곧 브랜드가 됩니다.
3. **후반 작업**: Suno로 만든 인트로 징글(채널을 알리는 짧은 로고 음악)을 붙이고, 에피소드마다 음량을 고르게 맞춥니다. 스크립트나 자동화 도구(Make, n8n)로 처리합니다.
4. **발행**: 팟캐스트 호스팅 서비스에 올리고 에피소드 제목·설명을 채웁니다. 설명에는 "AI 보이스 사용" 고지도 함께 넣으세요.

## 오디오북은 '장(章) 단위'로

- 책 한 권을 통째로 넣지 마세요. **장별로 나눠 생성**하면 오류가 났을 때 그 장만 다시 만들면 되니 시간이 크게 절약됩니다.
- 등장인물 대사가 많으면 화자별로 보이스를 나눌 수도 있습니다. 하지만 입문 단계에서는 **내레이터 한 명 + 오디오 태그**가 관리하기 훨씬 쉽습니다.

## 사람이 남아야 할 자리

자동화를 해도 **발행 전 전체 듣기**는 생략하지 마세요. 발음 오류나 어색한 번역투는 아직 사람 귀가 가장 빨리 잡습니다.

그리고 처음부터 4단계 전부를 자동화하려 하지 마세요. 가장 반복이 지겨운 한 단계부터 자동화하고, 익숙해지면 옆 단계로 넓혀가는 것이 실패 없는 순서입니다.

> 💡 **핵심**: '원고 → 음성 → 후반 → 발행'을 한 번 파이프라인으로 만들면, 이후엔 원고만 넣으면 됩니다. 반복 작업은 설계 대상입니다.`,
          illustration: {
            type: "cycle",
            title: "주간 오디오 콘텐츠 파이프라인",
            center: "매주 반복",
            nodes: [
              { label: "원고 변환", sublabel: "문어체 → 구어체 대본", icon: "file-text" },
              { label: "음성 생성", sublabel: "고정 보이스 API 호출", icon: "mic" },
              { label: "후반 작업", sublabel: "징글 붙이기 + 음량 고르게", icon: "settings" },
              { label: "검수 · 발행", sublabel: "전체 듣기 후 업로드", icon: "upload" },
            ],
            caption: "사이클 중 자동화 불가 구간은 '검수' 하나 — 나머지는 기계에 맡기세요.",
          },
        },
        {
          slug: "copyright-and-policy",
          title: "음원 저작권과 플랫폼 정책: 2026 상업 이용 가이드",
          minutes: 5,
          content: `만드는 것보다 중요한 것이 **쓸 수 있는가**입니다. AI 음원을 상업적으로(수익이 나는 콘텐츠에) 써도 되는지는 "어떤 플랜으로 만들었나"에 따라 달라집니다.

## 대원칙: 유료 플랜 = 상업적 이용

- **Suno**: 유료 플랜(Pro/Premier) 구독 중에 만든 곡은 상업적 이용이 허용됩니다. **무료 플랜 곡은 비상업 용도로 제한**되고 출처 표기가 요구됩니다.
- **ElevenLabs**: 역시 유료 플랜부터 상업 라이선스가 부여됩니다. 무료 플랜은 비상업 + 출처 표기 조건입니다.
- 기준은 **생성 시점**의 플랜입니다. 구독을 해지해도 그 전에 만든 곡의 권리는 유지되는 것이 일반적이지만, 약관 원문을 꼭 확인하세요.

## 플랫폼별 체크포인트

- **유튜브**: AI 음원 자체는 문제없습니다. 다만 **사실적인 AI 음성·합성 콘텐츠는 업로드할 때 공개 설정 화면에서 고지**해야 합니다. Content ID(유튜브가 기존 저작권 음원과 자동 대조하는 시스템)에 잘못 걸리면, 생성 기록을 근거로 이의 제기가 가능합니다.
- **음원 유통(스포티파이 등)**: AI 생성곡도 유통할 수 있지만, 아티스트 사칭·스트리밍 조작은 삭제 사유입니다.
- **광고·클라이언트 납품**: 계약서에 "AI 생성물 포함" 여부를 명시하는 것이 2026년 실무 표준입니다.

## 안전 수칙 세 가지

- 생성 당시의 **플랜·날짜·프롬프트를 기록**해 두세요. 분쟁이 생기면 증거가 됩니다.
- 특정 가수 스타일을 흉내 낸 곡을 그 가수 이름을 걸고 홍보하지 마세요.
- 약관은 바뀝니다. **연 1회 재확인**을 캘린더에 넣으세요.

> 💡 **핵심**: 상업 이용의 3요소 — **유료 플랜으로 생성 + 생성 기록 보관 + 플랫폼 고지 준수**. 이 세 가지면 대부분의 분쟁을 예방합니다.`,
          illustration: {
            type: "grid",
            title: "상업 이용 전 점검 항목",
            items: [
              {
                label: "플랜 확인",
                sublabel: "유료 플랜 생성분만 상업 이용",
                icon: "dollar",
                tone: "primary",
              },
              {
                label: "생성 기록 보관",
                sublabel: "날짜 · 플랜 · 프롬프트",
                icon: "clipboard",
                tone: "accent",
              },
              {
                label: "AI 고지",
                sublabel: "유튜브 합성 콘텐츠 설정",
                icon: "alert",
                tone: "warning",
              },
              {
                label: "사칭 금지",
                sublabel: "아티스트 이름 홍보 불가",
                icon: "x",
                tone: "muted",
              },
              {
                label: "계약서 명시",
                sublabel: "납품 시 AI 생성물 고지",
                icon: "file-text",
                tone: "accent",
              },
              {
                label: "약관 재확인",
                sublabel: "연 1회, 정책은 바뀝니다",
                icon: "refresh",
                tone: "success",
              },
            ],
            caption: "여섯 칸 모두 체크되면 안심하고 발행해도 됩니다.",
          },
        },
      ],
    },
  ],
};
