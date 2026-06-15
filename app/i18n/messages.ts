// ────────────────────────────────────────────────────────────
// 언어 추가 방법:
//   1. LOCALES 배열에 새 코드 추가 (예: 'ja')
//   2. messages 객체에 같은 키로 번역 추가
//   3. 끝 — 드롭다운에 자동으로 나타납니다
// ────────────────────────────────────────────────────────────

export const LOCALES = ['ko', 'en', 'ja', 'zh-CN', 'es', 'de'] as const
export type Locale = (typeof LOCALES)[number]

export const LOCALE_LABELS: Record<Locale, string> = {
  ko: '한국어',
  en: 'English',
  ja: '日本語',
  'zh-CN': '简体中文',
  es: 'Español',
  de: 'Deutsch',
}

// ── 번역 타입 ────────────────────────────────────────────────

type Messages = {
  nav: { features: string; pricing: string; download: string; cta: string }
  hero: {
    badge: string
    title: string
    subtitle: string
    ctaPrimary: string
    ctaSecondary: string
    ctaTertiary: string
    ctaIos: string
    blockPage: { headline: string; currentGoal: string; sampleGoal: string; timer: string }
  }
  stats: {
    items: { number: string; label: string }[]
  }
  howItWorks: {
    label: string
    heading: string
    subheading: string
    steps: { number: string; title: string; description: string }[]
  }
  features: {
    label: string
    heading: string
    subheading: string
    items: { icon: string; title: string; description: string; badge?: string }[]
  }
  testimonials: {
    label: string
    heading: string
    items: { quote: string; author: string; role: string }[]
  }
  pricing: {
    label: string
    heading: string
    subheading: string
    planLabel: { monthly: string; yearly: string; lifetime: string }
    lifetimeBadge: string  // "초기 이벤트" 등
    yearlyBadge: string    // "17% 할인" 등
    lifetimePerks: string[]  // 평생권 선택 시만 노출되는 추가 혜택 (예: "모든 미래 업데이트 평생 제공")
    free: { name: string; price: string; period: string; cta: string; items: string[] }
    pro: {
      name: string
      badge: string
      cta: string
      items: string[]
      monthly: { price: string; period: string }
      yearly: { price: string; period: string }
      lifetime: { price: string; period: string }
    }
  }
  faq: {
    label: string
    heading: string
    items: { question: string; answer: string }[]
  }
  download: {
    heading: string
    subheading: string
    chrome: { title: string; description: string; cta: string }
    windows: { title: string; description: string; cta: string }
    android: { title: string; description: string; cta: string }
    ios: { title: string; description: string; cta: string }
  }
  roadmap: {
    label: string
    heading: string
    subheading: string
    items: { icon: string; title: string; description: string }[]
  }
  finalCta: {
    heading: string
    subheading: string
    ctaPrimary: string
    ctaSecondary: string
    ctaTertiary: string
  }
  footer: { copyright: string; privacy: string; terms: string }
}

// ── 번역 데이터 ──────────────────────────────────────────────

export const messages: Record<Locale, Messages> = {
  ko: {
    nav: {
      features: '기능',
      pricing: '가격',
      download: '다운로드',
      cta: 'Chrome에 추가',
    },
    hero: {
      badge: 'Chrome 확장 + 데스크탑 + Android',
      title: '숨 참고 FLOW DIVE\n몰입으로의 깊은 잠수',
      subtitle:
        '수많은 SNS, 게임, 커뮤니티의 알림들.\n단 한 번의 클릭으로 몰입의 가능성이 깨져버립니다.\nFlowdive가 그 순간을 막고, 목표를 상기시켜드립니다.',
      ctaPrimary: 'Chrome에 무료로 추가하기',
      ctaSecondary: '데스크탑 앱 다운로드',
      ctaTertiary: 'Android 앱 받기',
      ctaIos: 'iOS — 곧 출시',
      blockPage: {
        headline: '지금은 몰입하는 시간이에요',
        currentGoal: '현재 목표',
        sampleGoal: '보고서 만들기',
        timer: '42분째 몰입 중',
      },
    },
    features: {
      label: '기능 소개',
      heading: '의지력의 총량은 정해져 있습니다\n주변 환경에 의지력을 빼앗기지 마세요',
      subheading:
        'Flowdive는 무의식적인 방문을 물리적으로 차단해 몰입할 수밖에 없는 환경을 만들어드립니다.',
      items: [
        {
          icon: '🚫',
          title: '사이트 차단',
          description:
            'SNS, 각종 커뮤니티 등 몰입을 방해하는 사이트를 차단 리스트에 추가하세요. 몰입 모드 중에는 접근이 차단됩니다.',
        },
        {
          icon: '🎯',
          title: '목표 설정',
          description:
            '몰입할 목표를 입력하면 차단 페이지에서 목표를 상기시켜드립니다. 무의식적인 방문을 목표 재확인의 기회로 바꿔드립니다.',
        },
        {
          icon: '🔒',
          title: 'Deep Dive',
          description:
            '입력한 시간 동안은 몰입 모드를 종료할 수 없습니다. 더 깊은 몰입의 상황을 만들어주는 강력한 잠금 기능입니다.',
          badge: 'Pro',
        },
        {
          icon: '💻',
          title: '크로스 플랫폼',
          description:
            '폰으로 Deep Dive 모드를 실행해 보세요. 같은 계정의 데스크탑 앱으로 브라우저와 프로그램까지 차단합니다. **방해되는 앱을 잠그면, 나의 가능성은 잠금 해제됩니다.**',
          badge: 'Pro',
        },
      ],
    },
    pricing: {
      label: '가격 정책',
      heading: '시작은 무료로',
      subheading:
        '기본 차단 기능은 무료입니다. 더 강력한 몰입이 필요할 때 업그레이드하세요.',
      planLabel: { monthly: '월간', yearly: '연간', lifetime: '평생' },
      lifetimeBadge: '초기 이벤트',
      lifetimePerks: [
        '✨ 모든 업데이트 평생 무료',
        '🔒 가격 인상으로부터 영구 보호',
        '🪪 초기 후원자 한정 — 일정 회원 도달 후 판매 종료 예정',
      ],
      yearlyBadge: '{n}% 할인',
      free: {
        name: '무료',
        price: '₩0',
        period: '/월',
        cta: '무료로 시작하기',
        items: [
          'Chrome 확장 프로그램',
          '무제한 사이트 차단',
          '목표 설정 및 표시',
          '브라우저 재시작 시 자동 복원',
        ],
      },
      pro: {
        name: 'Pro',
        cta: 'Pro 구독하기',
        badge: '인기',
        items: [
          '무료 플랜의 모든 기능',
          'Deep Dive (시간 제한 잠금)',
          'Windows / macOS / Android 완전 잠금',
          '앱 레벨 차단 (SNS, 게임 등)',
          '멀티 기기 실시간 동기화',
        ],
        monthly: { price: '₩6,900', period: '/월' },
        yearly: { price: '₩59,000', period: '/년' },
        lifetime: { price: '₩69,000', period: '평생' },
      },
    },
    download: {
      heading: '지금 시작해보세요',
      subheading: '설치 1분, 오늘부터 몰입력이 달라집니다.',
      chrome: {
        title: 'Chrome 확장',
        description: '브라우저 내 사이트 차단 · 무료',
        cta: 'Chrome 웹 스토어에서 설치',
      },
      windows: {
        title: 'Windows / macOS 앱',
        description: '앱 레벨 차단 포함 · Pro',
        cta: '데스크탑 앱 다운로드',
      },
      android: {
        title: 'Android 앱',
        description: 'Deep Dive 모바일 완전 잠금 · Pro',
        cta: 'Google Play 에서 받기',
      },
      ios: {
        title: 'iOS 앱',
        description: 'iPhone · iPad 지원 준비 중',
        cta: '곧 출시 예정',
      },
    },
    roadmap: {
      label: '추후 공개 예정',
      heading: '더 깊은 데이터,\n더 무한한 나의 가능성 맞이하기',
      subheading: '데이터가 쌓이는 대로 순차 공개합니다.',
      items: [
        { icon: '📊', title: '시간대별 몰입 패턴', description: '하루 중 가장 잘 몰입하는 시간대를 가시화. 본인만의 리듬을 발견하세요.' },
        { icon: '🎯', title: '목표별 성취율', description: '입력한 목표 텍스트 기준으로 완주율·평균 지속 시간을 묶어 보여줍니다.' },
        { icon: '📅', title: '주간 / 월간 리포트', description: '모바일 앱으로 자동 요약 전달. 회고 습관을 자동으로 만들어드립니다.' },
        { icon: '👥', title: '동기 비교 (옵션)', description: '같은 직군·같은 목표 사용자들과 익명 비교. 자발적 참여만.' },
      ],
    },
    stats: {
      items: [
        { number: '12,000+', label: '몰입을 시작한 사용자' },
        { number: '4.2M', label: '차단된 방해 사이트 접근' },
        { number: '38,000+', label: '누적 몰입 시간' },
        { number: '4.8 ★', label: '평균 사용자 평점' },
      ],
    },
    howItWorks: {
      label: '작동 방식',
      heading: '3단계로 몰입 환경을 만들어요',
      subheading: '복잡한 설정 없이, 지금 바로 시작할 수 있습니다.',
      steps: [
        {
          number: '01',
          title: '목표를 적습니다',
          description: '오늘 끝내야 할 한 가지를 입력하세요. 차단 페이지에서 이 목표가 계속 떠오릅니다.',
        },
        {
          number: '02',
          title: '방해 요소를 등록',
          description: 'SNS, 게임, 커뮤니티, OTT 등 — 무엇이든 차단 리스트에 추가하세요.',
        },
        {
          number: '03',
          title: '몰입 모드 시작',
          description: '버튼 한 번이면 끝. 무의식적으로 사이트를 열어도 차단 페이지가 막아줍니다.',
        },
      ],
    },
    testimonials: {
      label: '사용자 후기',
      heading: '몰입력을 되찾은 사람들',
      items: [
        {
          quote: '예전엔 일하다 무심코 유튜브를 켰는데, 이제는 그 버릇이 사라졌어요. 차단 페이지에 적힌 내 목표를 보면 정신이 번쩍 들어요.',
          author: '김민재',
          role: '대학원생',
        },
        {
          quote: 'Deep Dive 덕분에 회의 자료 만들 때 3시간 완벽하게 몰입했습니다. 평소 같으면 SNS만 들락거렸을 시간이었어요.',
          author: '이서연',
          role: '디자이너',
        },
        {
          quote: '의지력에 기댈 필요가 없어졌습니다. 환경이 의지를 만들어준다는 말, 직접 써보고 알았어요.',
          author: '박지훈',
          role: '개발자',
        },
      ],
    },
    faq: {
      label: '자주 묻는 질문',
      heading: '궁금한 점이 있으신가요?',
      items: [
        {
          question: '몰입 모드 중에 차단을 해제할 수 있나요?',
          answer: '일반 모드에서는 언제든 종료할 수 있어요. Deep Dive는 설정한 시간이 끝날 때까지 끌 수 없습니다.',
        },
        {
          question: '시크릿 모드로 우회할 수 있나요?',
          answer: 'Chrome 확장은 시크릿 모드 접근 권한을 요청하면 차단됩니다. Windows 데스크탑 앱은 시스템 레벨에서 차단하므로 우회가 어렵습니다.',
        },
        {
          question: '무료 플랜과 Pro 플랜의 차이가 뭔가요?',
          answer: '무료 플랜은 기본 사이트 차단을 제공합니다. Pro 플랜은 Deep Dive(시간 잠금)와 Windows 앱(앱 레벨 차단)을 사용할 수 있어요.',
        },
        {
          question: '여러 기기를 동시에 쓸 수 있나요?',
          answer: '하나의 계정으로 Chrome 확장과 Windows 앱을 모두 사용할 수 있습니다. Pro 플랜을 이용하시면 차단 리스트가 자동 동기화됩니다.',
        },
        {
          question: '데이터는 어디에 저장되나요?',
          answer: '차단 리스트와 목표는 사용자 기기에 저장되며, 계정 동기화 시에만 암호화되어 서버로 전송됩니다.',
        },
      ],
    },
    finalCta: {
      heading: '오늘부터 몰입하세요',
      subheading: '내 의지가 약해서가 아닙니다.\n환경이 그렇게 만드는 거예요.\n몰입으로 Dive!',
      ctaPrimary: 'Chrome에 무료로 추가',
      ctaSecondary: '데스크탑 앱 다운로드',
      ctaTertiary: 'Android 앱 받기',
    },
    footer: {
      copyright: '© 2025 Flowdive. All rights reserved.',
      privacy: '개인정보처리방침',
      terms: '이용약관',
    },
  },

  en: {
    nav: {
      features: 'Features',
      pricing: 'Pricing',
      download: 'Download',
      cta: 'Add to Chrome',
    },
    hero: {
      badge: 'Chrome Extension + Desktop + Android',
      title: 'Dive into flow.\nDeep dive into work.',
      subtitle:
        'Endless notifications from social, games, and communities.\nA single click breaks your shot at deep focus.\nFlowdive blocks that moment and reminds you of your goal.',
      ctaPrimary: 'Add to Chrome — Free',
      ctaSecondary: 'Download desktop app',
      ctaTertiary: 'Get Android app',
      ctaIos: 'iOS — Coming soon',
      blockPage: {
        headline: 'Time to dive into FLOW',
        currentGoal: 'Current Goal',
        sampleGoal: 'Finish the report',
        timer: 'Focused for 42 min',
      },
    },
    features: {
      label: 'Features',
      heading: 'Your willpower is a finite resource.\nDon\'t let your environment drain it.',
      subheading:
        'Flowdive physically blocks mindless visits so you have no choice but to stay focused.',
      items: [
        {
          icon: '🚫',
          title: 'Site Blocking',
          description:
            'Add social media, forums, and any distracting sites to your block list. Access is cut off during Flow Dive.',
        },
        {
          icon: '🎯',
          title: 'Goal Setting',
          description:
            'Write down what you\'re focusing on. The blocked page surfaces it — every mindless visit becomes a chance to re-anchor your goal.',
        },
        {
          icon: '🔒',
          title: 'Deep Dive',
          description:
            'Flow Dive can\'t be stopped during the set time. A strong lock that engineers deeper flow.',
          badge: 'Pro',
        },
        {
          icon: '💻',
          title: 'Cross-Platform',
          description:
            'Start Deep Dive on your phone. The desktop app on the same account blocks browsers and programs too. **Lock yourself in. Unlock your potential.**',
          badge: 'Pro',
        },
      ],
    },
    pricing: {
      label: 'Pricing',
      heading: 'Start for free',
      subheading:
        'Core blocking is free. Upgrade when you need stronger focus.',
      planLabel: { monthly: 'Monthly', yearly: 'Yearly', lifetime: 'Lifetime' },
      lifetimeBadge: 'Launch deal',
      lifetimePerks: [
        '✨ All future updates, free forever',
        '🔒 Locked in — never affected by price increases',
        '🪪 Launch backers only — limited spots, retiring once filled',
      ],
      yearlyBadge: 'Save {n}%',
      free: {
        name: 'Free',
        price: '$0',
        period: '/mo',
        cta: 'Get started free',
        items: [
          'Chrome extension',
          'Unlimited site blocking',
          'Goal setting & display',
          'Auto-restore on browser restart',
        ],
      },
      pro: {
        name: 'Pro',
        cta: 'Subscribe to Pro',
        badge: 'Popular',
        items: [
          'Everything in Free',
          'Deep Dive (timed lock)',
          'Windows / macOS / Android full lockdown',
          'App-level blocking (games, etc.)',
          'Real-time multi-device sync',
        ],
        monthly: { price: '$5.9', period: '/mo' },
        yearly: { price: '$49', period: '/yr' },
        lifetime: { price: '$59', period: 'one-time' },
      },
    },
    download: {
      heading: 'Get started today',
      subheading: '1-minute setup. Better focus starts now.',
      chrome: {
        title: 'Chrome Extension',
        description: 'Block sites in your browser · Free',
        cta: 'Install from Chrome Web Store',
      },
      windows: {
        title: 'Windows / macOS App',
        description: 'App-level blocking included · Pro',
        cta: 'Download desktop app',
      },
      android: {
        title: 'Android App',
        description: 'Mobile full lockdown for Deep Dive · Pro',
        cta: 'Get it on Google Play',
      },
      ios: {
        title: 'iOS App',
        description: 'iPhone · iPad support in the works',
        cta: 'Coming soon',
      },
    },
    roadmap: {
      label: 'Coming soon',
      heading: 'Deeper data.\nDeeper potential.',
      subheading: 'Rolling out as data accumulates.',
      items: [
        { icon: '📊', title: 'Time-of-day focus patterns', description: 'See when you concentrate best during the day. Discover your own rhythm.' },
        { icon: '🎯', title: 'Per-goal completion rate', description: 'Grouped by goal text — completion rate and average duration in one view.' },
        { icon: '📅', title: 'Weekly / Monthly reports', description: 'Auto-summary delivered via email or in-app. Builds a reflection habit for you.' },
        { icon: '👥', title: 'Peer comparison (opt-in)', description: 'Anonymous comparison with users in the same role / same goal. Strictly opt-in.' },
      ],
    },
    stats: {
      items: [
        { number: '12,000+', label: 'People focusing now' },
        { number: '4.2M', label: 'Distractions blocked' },
        { number: '38,000+', label: 'Hours focused' },
        { number: '4.8 ★', label: 'Average rating' },
      ],
    },
    howItWorks: {
      label: 'How it works',
      heading: 'Build focus in 3 steps',
      subheading: 'No complex setup. Start right now.',
      steps: [
        {
          number: '01',
          title: 'Write your goal',
          description: 'Type the one thing you need to finish today. The blocked page surfaces it whenever you stray.',
        },
        {
          number: '02',
          title: 'Add distractions',
          description: 'Twitter, Instagram, games — drop them into your block list.',
        },
        {
          number: '03',
          title: 'Start Flow Dive',
          description: 'One click. When you open a blocked site by reflex, Flowdive redirects you to your goal.',
        },
      ],
    },
    testimonials: {
      label: 'Testimonials',
      heading: 'People who got their focus back',
      items: [
        {
          quote: "I used to open Instagram without thinking. That habit is gone — seeing my goal on the blocked page snaps me back instantly.",
          author: 'Minjae Kim',
          role: 'Graduate Student',
        },
        {
          quote: "Deep Dive helped me focus 3 full hours on a deck. I'd normally have spent that time scrolling.",
          author: 'Seoyeon Lee',
          role: 'Designer',
        },
        {
          quote: "I stopped relying on willpower. Now my environment does the work for me.",
          author: 'Jihoon Park',
          role: 'Developer',
        },
      ],
    },
    faq: {
      label: 'FAQ',
      heading: 'Got questions?',
      items: [
        {
          question: 'Can I stop blocking while Flow Dive is on?',
          answer: 'Yes, in standard mode you can stop anytime. Deep Dive locks blocking until your timer ends.',
        },
        {
          question: 'Can incognito mode bypass it?',
          answer: 'The Chrome extension blocks incognito when granted access. The Windows desktop app blocks at the system level, so bypassing is hard.',
        },
        {
          question: "What's the difference between Free and Pro?",
          answer: 'Free includes basic site blocking. Pro unlocks Deep Dive (timed lock) and the Windows app (app-level blocking).',
        },
        {
          question: 'Can I use multiple devices?',
          answer: 'One account works on both Chrome extension and Windows app. Block lists sync automatically.',
        },
        {
          question: 'Where is my data stored?',
          answer: 'Block lists and goals are stored on your device. Only account-synced data is encrypted and sent to the server.',
        },
      ],
    },
    finalCta: {
      heading: 'Focus, starting today',
      subheading: "It's not weak willpower — your environment is built to distract you. Flowdive rebuilds it.",
      ctaPrimary: 'Add to Chrome — Free',
      ctaSecondary: 'Download desktop app',
      ctaTertiary: 'Get Android app',
    },
    footer: {
      copyright: '© 2025 Flowdive. All rights reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
    },
  },

  ja: {
    nav: {
      features: '機能',
      pricing: '料金',
      download: 'ダウンロード',
      cta: 'Chromeに追加',
    },
    hero: {
      badge: 'Chrome拡張 + デスクトップ + Android',
      title: '深く息を吸って FLOW DIVE\n没入への深い潜水',
      subtitle:
        '無数のSNS、ゲーム、コミュニティの通知。\nたった一度のクリックで、没入の可能性が壊れてしまいます。\nFlowdiveがその瞬間を阻止し、目標を思い出させてくれます。',
      ctaPrimary: 'Chromeに無料で追加',
      ctaSecondary: 'デスクトップアプリをダウンロード',
      ctaTertiary: 'Androidアプリを入手',
      ctaIos: 'iOS — 近日リリース',
      blockPage: {
        headline: '今は没入する時間です',
        currentGoal: '現在の目標',
        sampleGoal: 'レポート作成',
        timer: '42分間没入中',
      },
    },
    features: {
      label: '機能紹介',
      heading: '意志力の総量は決まっています\n環境に意志力を奪われないように',
      subheading:
        'Flowdiveは無意識な訪問を物理的に遮断し、没入せざるを得ない環境を作り上げます。',
      items: [
        {
          icon: '🚫',
          title: 'サイトブロック',
          description:
            'SNS、各種コミュニティなど没入を妨げるサイトをブロックリストに追加。没入モード中はアクセスが遮断されます。',
        },
        {
          icon: '🎯',
          title: '目標設定',
          description:
            '没入する目標を入力すると、ブロックページで目標を思い出させます。無意識な訪問を、目標再確認の機会に変えてくれます。',
        },
        {
          icon: '🔒',
          title: 'Deep Dive',
          description:
            '入力した時間中は没入モードを終了できません。より深い没入の状況を作り出す強力なロック機能です。',
          badge: 'Pro',
        },
        {
          icon: '💻',
          title: 'クロスプラットフォーム',
          description:
            'スマホでDeep Diveモードを始めてみてください。同じアカウントのデスクトップアプリでブラウザもプログラムも遮断します。**邪魔なアプリをロックすれば、あなたの可能性は解き放たれます。**',
          badge: 'Pro',
        },
      ],
    },
    pricing: {
      label: '料金プラン',
      heading: '無料で始めよう',
      subheading:
        '基本のブロック機能は無料です。より強力な没入が必要な時にアップグレードしてください。',
      planLabel: { monthly: '月額', yearly: '年額', lifetime: '永年' },
      lifetimeBadge: 'ローンチ特典',
      lifetimePerks: [
        '✨ すべてのアップデートを永久に無料',
        '🔒 価格改定の影響を永続的に受けません',
        '🪪 初期支援者限定 — 一定数の会員到達後に販売終了予定',
      ],
      yearlyBadge: '{n}% OFF',
      free: {
        name: '無料',
        price: '¥0',
        period: '/月',
        cta: '無料で始める',
        items: [
          'Chrome拡張機能',
          '無制限のサイトブロック',
          '目標設定と表示',
          'ブラウザ再起動時に自動復元',
        ],
      },
      pro: {
        name: 'Pro',
        cta: 'Proを購読',
        badge: '人気',
        items: [
          '無料プランのすべての機能',
          'Deep Dive（時間制限ロック）',
          'Windows / macOS / Android 完全ロック',
          'アプリレベルのブロック（LINE、ゲームなど）',
          'マルチデバイス リアルタイム同期',
        ],
        monthly: { price: '¥698', period: '/月' },
        yearly: { price: '¥5,980', period: '/年' },
        lifetime: { price: '¥6,980', period: '買い切り' },
      },
    },
    download: {
      heading: '今すぐ始めよう',
      subheading: '1分でインストール。今日から没入力が変わります。',
      chrome: {
        title: 'Chrome拡張機能',
        description: 'ブラウザ内でサイトをブロック · 無料',
        cta: 'Chromeウェブストアからインストール',
      },
      windows: {
        title: 'Windows / macOS アプリ',
        description: 'アプリレベルのブロック搭載 · Pro',
        cta: 'デスクトップアプリをダウンロード',
      },
      android: {
        title: 'Android アプリ',
        description: 'Deep Dive モバイル完全ロック · Pro',
        cta: 'Google Play で入手',
      },
      ios: {
        title: 'iOS アプリ',
        description: 'iPhone · iPad 対応を準備中',
        cta: '近日リリース',
      },
    },
    roadmap: {
      label: '近日公開予定',
      heading: 'より深いデータ、より無限大の私の可能性へ',
      subheading: 'データが蓄積され次第、順次公開します。',
      items: [
        { icon: '📊', title: '時間帯別の没入パターン', description: '一日の中で最も没入できる時間帯を可視化。あなた自身のリズムを発見できます。' },
        { icon: '🎯', title: '目標別達成率', description: '入力した目標テキストごとに完走率・平均継続時間をまとめて表示します。' },
        { icon: '📅', title: '週次 / 月次レポート', description: 'モバイルアプリで自動要約をお届け。振り返りの習慣を自動で作ります。' },
        { icon: '👥', title: '同業者比較 (任意)', description: '同じ職種・同じ目標のユーザーと匿名で比較。希望者のみ参加。' },
      ],
    },
    stats: {
      items: [
        { number: '12,000+', label: '没入を始めたユーザー' },
        { number: '4.2M', label: 'ブロックされた妨害アクセス' },
        { number: '38,000+', label: '累積没入時間' },
        { number: '4.8 ★', label: '平均ユーザー評価' },
      ],
    },
    howItWorks: {
      label: '使い方',
      heading: '3ステップで没入環境をつくる',
      subheading: '複雑な設定なし、今すぐ始められます。',
      steps: [
        {
          number: '01',
          title: '目標を書く',
          description: '今日終わらせる1つを入力。ブロックページにこの目標が表示されます。',
        },
        {
          number: '02',
          title: '妨害要素を登録',
          description: 'Twitter、Instagram、ゲーム — なんでもブロックリストに追加。',
        },
        {
          number: '03',
          title: '没入モードを開始',
          description: 'ボタン1つで完了。無意識に開いてもブロックページが守ってくれます。',
        },
      ],
    },
    testimonials: {
      label: 'ユーザーの声',
      heading: '没入を取り戻した人たち',
      items: [
        {
          quote: '以前は何気なくInstagramを開いていましたが、今はその習慣が消えました。ブロックページの目標を見ると気が引き締まります。',
          author: '木村 健太',
          role: '大学院生',
        },
        {
          quote: 'Deep Diveのおかげで資料作成に3時間完璧に没入できました。普段ならSNSばかり見ていた時間です。',
          author: '佐藤 美咲',
          role: 'デザイナー',
        },
        {
          quote: '意志力に頼る必要がなくなりました。環境が意志を作ってくれます。',
          author: '田中 大輔',
          role: 'エンジニア',
        },
      ],
    },
    faq: {
      label: 'よくある質問',
      heading: 'ご質問はありますか？',
      items: [
        {
          question: '没入モード中にブロックを解除できますか？',
          answer: '通常モードならいつでも終了できます。Deep Diveは設定した時間が終わるまで解除できません。',
        },
        {
          question: 'シークレットモードで回避できますか？',
          answer: 'Chrome拡張はシークレットモード権限があればブロックします。Windowsデスクトップアプリはシステムレベルでブロックするため回避困難です。',
        },
        {
          question: '無料プランとProプランの違いは？',
          answer: '無料プランは基本的なサイトブロックを提供。ProプランはDeep Dive（時間ロック）とWindowsアプリ（アプリレベルブロック）を利用可能。',
        },
        {
          question: '複数デバイスで使えますか？',
          answer: '1つのアカウントでChrome拡張とWindowsアプリ両方使えます。ブロックリストは自動同期されます。',
        },
        {
          question: 'データはどこに保存されますか？',
          answer: 'ブロックリストと目標はデバイスに保存され、アカウント同期時のみ暗号化してサーバーに送信されます。',
        },
      ],
    },
    finalCta: {
      heading: '今日から没入しよう',
      subheading: '意志が弱いのではありません。環境がそうさせるのです。Flowdiveがその環境を変えます。',
      ctaPrimary: 'Chromeに無料で追加',
      ctaSecondary: 'デスクトップアプリをダウンロード',
      ctaTertiary: 'Androidアプリを入手',
    },
    footer: {
      copyright: '© 2025 Flowdive. All rights reserved.',
      privacy: 'プライバシーポリシー',
      terms: '利用規約',
    },
  },

  'zh-CN': {
    nav: {
      features: '功能',
      pricing: '价格',
      download: '下载',
      cta: '添加到Chrome',
    },
    hero: {
      badge: 'Chrome 扩展 + 桌面 + Android',
      title: '潜入心流\n深潜你的工作',
      subtitle:
        '社交、游戏、社区的无尽通知。\n单击一下,深度沉浸就被打破。\nFlowdive 阻止那一刻,提醒你的目标。',
      ctaPrimary: '免费添加到Chrome',
      ctaSecondary: '下载桌面应用',
      ctaTertiary: '获取 Android 应用',
      ctaIos: 'iOS — 即将推出',
      blockPage: {
        headline: '现在是潜入心流的时间',
        currentGoal: '当前目标',
        sampleGoal: '完成报告',
        timer: '已沉浸42分钟',
      },
    },
    features: {
      label: '功能介绍',
      heading: '意志力是有限的资源\n别让环境耗尽它',
      subheading:
        'Flowdive 物理屏蔽无意识访问,让你别无选择,只能保持沉浸。',
      items: [
        {
          icon: '🚫',
          title: '网站屏蔽',
          description:
            '将社交媒体、论坛和任何分心网站添加到屏蔽列表。沉浸模式期间访问被切断。',
        },
        {
          icon: '🎯',
          title: '目标设定',
          description:
            '写下你正在沉浸的事情。屏蔽页面会显示它 — 每次无意识访问都成为重新锚定目标的机会。',
        },
        {
          icon: '🔒',
          title: 'Deep Dive',
          description:
            '设定时间内无法停止沉浸模式。一种强大的锁定,设计更深层的心流。',
          badge: 'Pro',
        },
        {
          icon: '💻',
          title: '跨平台',
          description:
            '在手机上启动 Deep Dive。同一账户的桌面应用也屏蔽浏览器和程序。**锁住自己。解锁你的潜能。**',
          badge: 'Pro',
        },
      ],
    },
    pricing: {
      label: '价格政策',
      heading: '免费开始',
      subheading: '核心屏蔽功能免费。需要更强沉浸时升级。',
      planLabel: { monthly: '月付', yearly: '年付', lifetime: '永久' },
      lifetimeBadge: '上线特惠',
      lifetimePerks: [
        '✨ 未来所有更新永久免费',
        '🔒 永久免受涨价影响',
        '🪪 仅限上线支持者 — 名额有限,售完即止',
      ],
      yearlyBadge: '省 {n}%',
      free: {
        name: '免费',
        price: '¥0',
        period: '/月',
        cta: '免费开始',
        items: [
          'Chrome扩展程序',
          '无限网站屏蔽',
          '目标设定与显示',
          '浏览器重启自动恢复',
        ],
      },
      pro: {
        name: 'Pro',
        cta: '订阅Pro',
        badge: '热门',
        items: [
          '免费版所有功能',
          'Deep Dive（限时锁定）',
          'Windows / macOS / Android 完全锁定',
          '应用级屏蔽（微信、游戏等）',
          '多设备实时同步',
        ],
        monthly: { price: '¥38', period: '/月' },
        yearly: { price: '¥288', period: '/年' },
        lifetime: { price: '¥388', period: '一次性' },
      },
    },
    download: {
      heading: '立即开始',
      subheading: '1分钟安装。从今天开始改变你的沉浸力。',
      chrome: {
        title: 'Chrome扩展',
        description: '在浏览器内屏蔽网站 · 免费',
        cta: '从Chrome网上应用店安装',
      },
      windows: {
        title: 'Windows / macOS 应用',
        description: '包含应用级屏蔽 · Pro',
        cta: '下载桌面应用',
      },
      android: {
        title: 'Android 应用',
        description: 'Deep Dive 移动端完全锁定 · Pro',
        cta: '在 Google Play 获取',
      },
      ios: {
        title: 'iOS 应用',
        description: 'iPhone · iPad 支持开发中',
        cta: '即将推出',
      },
    },
    roadmap: {
      label: '即将推出',
      heading: '更深的数据。更深的潜能。',
      subheading: '随着数据积累将陆续公开。',
      items: [
        { icon: '📊', title: '时段沉浸模式', description: '可视化一天中最沉浸的时段。发现属于你自己的节奏。' },
        { icon: '🎯', title: '目标达成率', description: '按输入的目标文本汇总完成率和平均时长。' },
        { icon: '📅', title: '周报 / 月报', description: '通过移动应用自动发送摘要。自动养成复盘习惯。' },
        { icon: '👥', title: '同行对比 (可选)', description: '与相同职业、相同目标的用户匿名对比。仅自愿参与。' },
      ],
    },
    stats: {
      items: [
        { number: '12,000+', label: '开始沉浸的用户' },
        { number: '4.2M', label: '已屏蔽的干扰访问' },
        { number: '38,000+', label: '累计沉浸时间' },
        { number: '4.8 ★', label: '平均用户评分' },
      ],
    },
    howItWorks: {
      label: '工作原理',
      heading: '三步打造沉浸环境',
      subheading: '无需复杂设置，立即开始。',
      steps: [
        {
          number: '01',
          title: '写下目标',
          description: '输入今天需要完成的一件事。屏蔽页面会持续提醒你这个目标。',
        },
        {
          number: '02',
          title: '添加干扰源',
          description: 'Twitter、Instagram、游戏——任何东西都可加入屏蔽列表。',
        },
        {
          number: '03',
          title: '开启沉浸模式',
          description: '一键搞定。即使无意识打开网站，屏蔽页面也会拦住你。',
        },
      ],
    },
    testimonials: {
      label: '用户反馈',
      heading: '重获沉浸的人们',
      items: [
        {
          quote: '以前工作时总是无意识地打开Instagram，现在这个习惯消失了。看到屏蔽页面上的目标，立刻清醒。',
          author: '张明',
          role: '研究生',
        },
        {
          quote: 'Deep Dive让我做PPT时连续沉浸了3小时。平时这些时间都浪费在刷社交媒体上了。',
          author: '李静',
          role: '设计师',
        },
        {
          quote: '不再需要依赖意志力。环境塑造意志，这句话亲身体验后才明白。',
          author: '王伟',
          role: '开发者',
        },
      ],
    },
    faq: {
      label: '常见问题',
      heading: '有疑问吗？',
      items: [
        {
          question: '沉浸模式中可以解除屏蔽吗？',
          answer: '普通模式下随时可以停止。Deep Dive必须等设定的时间结束后才能关闭。',
        },
        {
          question: '无痕模式能绕过屏蔽吗？',
          answer: 'Chrome扩展授权无痕模式后会屏蔽。Windows桌面应用在系统级屏蔽，难以绕过。',
        },
        {
          question: '免费版和Pro版的区别？',
          answer: '免费版提供基础网站屏蔽。Pro版解锁Deep Dive（限时锁定）和Windows应用（应用级屏蔽）。',
        },
        {
          question: '可以同时使用多个设备吗？',
          answer: '一个账户可同时使用Chrome扩展和Windows应用。屏蔽列表自动同步。',
        },
        {
          question: '数据存储在哪里？',
          answer: '屏蔽列表和目标存储在你的设备上，仅在账户同步时加密传输到服务器。',
        },
      ],
    },
    finalCta: {
      heading: '从今天开始沉浸',
      subheading: '不是意志薄弱，是环境让你分心。Flowdive帮你重塑环境。',
      ctaPrimary: '免费添加到Chrome',
      ctaSecondary: '下载桌面应用',
      ctaTertiary: '获取 Android 应用',
    },
    footer: {
      copyright: '© 2025 Flowdive. 保留所有权利。',
      privacy: '隐私政策',
      terms: '服务条款',
    },
  },

  es: {
    nav: {
      features: 'Funciones',
      pricing: 'Precios',
      download: 'Descargar',
      cta: 'Añadir a Chrome',
    },
    hero: {
      badge: 'Extensión de Chrome + Escritorio + Android',
      title: 'Sumérgete en el flow.\nBucea profundo en tu trabajo.',
      subtitle:
        'Notificaciones sin fin de redes, juegos y comunidades.\nUn solo clic rompe tu oportunidad de concentración profunda.\nFlowdive bloquea ese momento y te recuerda tu objetivo.',
      ctaPrimary: 'Añadir a Chrome — Gratis',
      ctaSecondary: 'Descargar app de escritorio',
      ctaTertiary: 'Obtener app de Android',
      ctaIos: 'iOS — Próximamente',
      blockPage: {
        headline: 'Es hora de entrar en el flow',
        currentGoal: 'Objetivo actual',
        sampleGoal: 'Terminar el informe',
        timer: 'Concentrado 42 min',
      },
    },
    features: {
      label: 'Funciones',
      heading: 'Tu fuerza de voluntad es un recurso finito\nNo dejes que tu entorno la consuma',
      subheading:
        'Flowdive bloquea físicamente las visitas inconscientes para que no tengas más opción que mantenerte concentrado.',
      items: [
        {
          icon: '🚫',
          title: 'Bloqueo de sitios',
          description:
            'Agrega redes sociales, foros y cualquier sitio distractor a tu lista de bloqueo. El acceso queda cortado durante Flow Dive.',
        },
        {
          icon: '🎯',
          title: 'Definir objetivo',
          description:
            'Escribe en qué te estás concentrando. La página bloqueada lo muestra — cada visita inconsciente se vuelve una oportunidad de reanclar tu objetivo.',
        },
        {
          icon: '🔒',
          title: 'Deep Dive',
          description:
            'Flow Dive no se puede detener durante el tiempo establecido. Un bloqueo fuerte que diseña un flow más profundo.',
          badge: 'Pro',
        },
        {
          icon: '💻',
          title: 'Multiplataforma',
          description:
            'Inicia Deep Dive en tu teléfono. La app de escritorio en la misma cuenta también bloquea navegadores y programas. **Enciérrate. Libera tu potencial.**',
          badge: 'Pro',
        },
      ],
    },
    pricing: {
      label: 'Precios',
      heading: 'Empieza gratis',
      subheading:
        'El bloqueo principal es gratis. Mejora cuando necesites más concentración.',
      planLabel: { monthly: 'Mensual', yearly: 'Anual', lifetime: 'De por vida' },
      lifetimeBadge: 'Oferta de lanzamiento',
      lifetimePerks: [
        '✨ Todas las futuras actualizaciones, gratis para siempre',
        '🔒 Bloqueado — nunca afectado por subidas de precio',
        '🪪 Solo apoyos de lanzamiento — plazas limitadas, se retira al llenarse',
      ],
      yearlyBadge: 'Ahorra {n}%',
      free: {
        name: 'Gratis',
        price: '$0',
        period: '/mes',
        cta: 'Empezar gratis',
        items: [
          'Extensión de Chrome',
          'Bloqueo ilimitado de sitios',
          'Configuración y visualización de objetivos',
          'Restauración automática al reiniciar el navegador',
        ],
      },
      pro: {
        name: 'Pro',
        cta: 'Suscribirse a Pro',
        badge: 'Popular',
        items: [
          'Todo lo del plan Gratis',
          'Deep Dive (bloqueo temporal)',
          'Bloqueo total en Windows / macOS / Android',
          'Bloqueo a nivel de app (juegos, etc.)',
          'Sincronización en tiempo real entre dispositivos',
        ],
        monthly: { price: '$5.9', period: '/mes' },
        yearly: { price: '$49', period: '/año' },
        lifetime: { price: '$59', period: 'pago único' },
      },
    },
    download: {
      heading: 'Empieza hoy',
      subheading: 'Configuración en 1 minuto. Mejor concentración desde ahora.',
      chrome: {
        title: 'Extensión de Chrome',
        description: 'Bloquea sitios en tu navegador · Gratis',
        cta: 'Instalar desde Chrome Web Store',
      },
      windows: {
        title: 'App de Windows / macOS',
        description: 'Incluye bloqueo a nivel de app · Pro',
        cta: 'Descargar app de escritorio',
      },
      android: {
        title: 'App de Android',
        description: 'Bloqueo total móvil para Deep Dive · Pro',
        cta: 'Obtener en Google Play',
      },
      ios: {
        title: 'App de iOS',
        description: 'Soporte para iPhone · iPad en preparación',
        cta: 'Próximamente',
      },
    },
    roadmap: {
      label: 'Próximamente',
      heading: 'Datos más profundos. Potencial más profundo.',
      subheading: 'Se publicará progresivamente a medida que se acumulen datos.',
      items: [
        { icon: '📊', title: 'Patrones de concentración por hora', description: 'Visualiza las horas del día en que mejor te concentras. Descubre tu propio ritmo.' },
        { icon: '🎯', title: 'Tasa de cumplimiento por objetivo', description: 'Agrupado por texto de objetivo: tasa de finalización y duración media en una vista.' },
        { icon: '📅', title: 'Informes semanales / mensuales', description: 'Resúmenes automáticos en la app móvil. Construye el hábito de la reflexión.' },
        { icon: '👥', title: 'Comparación con pares (opcional)', description: 'Comparación anónima con usuarios del mismo rol u objetivo. Solo participación voluntaria.' },
      ],
    },
    stats: {
      items: [
        { number: '12,000+', label: 'Personas concentradas' },
        { number: '4.2M', label: 'Distracciones bloqueadas' },
        { number: '38,000+', label: 'Horas de concentración' },
        { number: '4.8 ★', label: 'Valoración media' },
      ],
    },
    howItWorks: {
      label: 'Cómo funciona',
      heading: 'Construye concentración en 3 pasos',
      subheading: 'Sin configuración complicada. Empieza ahora mismo.',
      steps: [
        {
          number: '01',
          title: 'Escribe tu objetivo',
          description: 'Anota lo único que necesitas terminar hoy. La página bloqueada te lo recordará.',
        },
        {
          number: '02',
          title: 'Añade distracciones',
          description: 'Twitter, Instagram, juegos — lo que sea, ponlo en tu lista de bloqueo.',
        },
        {
          number: '03',
          title: 'Inicia Flow Dive',
          description: 'Un clic basta. Si abres una web bloqueada por reflejo, te redirigimos a tu objetivo.',
        },
      ],
    },
    testimonials: {
      label: 'Testimonios',
      heading: 'Gente que recuperó su concentración',
      items: [
        {
          quote: 'Antes abría Instagram sin pensar. Ese hábito desapareció — ver mi objetivo en la página bloqueada me devuelve al instante.',
          author: 'Carlos Ruiz',
          role: 'Estudiante de posgrado',
        },
        {
          quote: 'El Deep Dive me ayudó a concentrarme 3 horas en una presentación. Normalmente las habría perdido scrolleando.',
          author: 'María García',
          role: 'Diseñadora',
        },
        {
          quote: 'Dejé de depender de la fuerza de voluntad. Ahora mi entorno hace el trabajo por mí.',
          author: 'Daniel López',
          role: 'Desarrollador',
        },
      ],
    },
    faq: {
      label: 'Preguntas frecuentes',
      heading: '¿Tienes preguntas?',
      items: [
        {
          question: '¿Puedo detener el bloqueo durante Flow Dive?',
          answer: 'En modo estándar puedes detenerlo cuando quieras. El Deep Dive bloquea hasta que termine el temporizador.',
        },
        {
          question: '¿Se puede saltar con el modo incógnito?',
          answer: 'La extensión de Chrome bloquea el incógnito si le das permiso. La app de escritorio Windows bloquea a nivel sistema, difícil de saltar.',
        },
        {
          question: '¿Diferencia entre Gratis y Pro?',
          answer: 'Gratis incluye bloqueo básico de sitios. Pro desbloquea el Deep Dive (bloqueo temporal) y la app de Windows (bloqueo a nivel app).',
        },
        {
          question: '¿Puedo usar varios dispositivos?',
          answer: 'Una cuenta funciona en la extensión de Chrome y la app de Windows. Las listas se sincronizan automáticamente.',
        },
        {
          question: '¿Dónde se almacenan mis datos?',
          answer: 'Las listas y objetivos se guardan en tu dispositivo. Solo los datos sincronizados se cifran y envían al servidor.',
        },
      ],
    },
    finalCta: {
      heading: 'Concéntrate, empezando hoy',
      subheading: 'No es falta de voluntad — tu entorno está hecho para distraerte. Flowdive lo reconstruye.',
      ctaPrimary: 'Añadir a Chrome — Gratis',
      ctaSecondary: 'Descargar app de escritorio',
      ctaTertiary: 'Obtener app de Android',
    },
    footer: {
      copyright: '© 2025 Flowdive. Todos los derechos reservados.',
      privacy: 'Política de privacidad',
      terms: 'Términos de servicio',
    },
  },

  de: {
    nav: {
      features: 'Funktionen',
      pricing: 'Preise',
      download: 'Download',
      cta: 'Zu Chrome hinzufügen',
    },
    hero: {
      badge: 'Chrome-Erweiterung + Desktop + Android',
      title: 'Tauche ein in Flow.\nTauche tief in deine Arbeit.',
      subtitle:
        'Endlose Benachrichtigungen von Social Media, Spielen und Communities.\nEin Klick zerstört deine Chance auf tiefe Konzentration.\nFlowdive blockiert diesen Moment und erinnert dich an dein Ziel.',
      ctaPrimary: 'Kostenlos zu Chrome hinzufügen',
      ctaSecondary: 'Desktop-App herunterladen',
      ctaTertiary: 'Android-App holen',
      ctaIos: 'iOS — Demnächst',
      blockPage: {
        headline: 'Zeit, in den Flow zu tauchen',
        currentGoal: 'Aktuelles Ziel',
        sampleGoal: 'Bericht fertigstellen',
        timer: '42 Min. fokussiert',
      },
    },
    features: {
      label: 'Funktionen',
      heading: 'Deine Willenskraft ist eine endliche Ressource\nLass sie nicht von deiner Umgebung verbrauchen',
      subheading:
        'Flowdive blockiert gedankenlose Besuche physisch — du hast keine Wahl, als konzentriert zu bleiben.',
      items: [
        {
          icon: '🚫',
          title: 'Webseiten blockieren',
          description:
            'Füge Social Media, Foren und ablenkende Seiten zur Blockliste hinzu. Im Flow Dive wird der Zugriff gesperrt.',
        },
        {
          icon: '🎯',
          title: 'Ziele setzen',
          description:
            'Schreibe auf, worauf du dich konzentrierst. Die gesperrte Seite zeigt es — jeder unbewusste Besuch wird zur Chance, dein Ziel wiederzufinden.',
        },
        {
          icon: '🔒',
          title: 'Deep Dive',
          description:
            'Der Flow Dive kann während der eingestellten Zeit nicht gestoppt werden. Eine starke Sperre, die tieferen Flow erzeugt.',
          badge: 'Pro',
        },
        {
          icon: '💻',
          title: 'Plattformübergreifend',
          description:
            'Starte Deep Dive auf deinem Handy. Die Desktop-App auf demselben Konto blockiert auch Browser und Programme. **Sperre dich ein. Befreie dein Potenzial.**',
          badge: 'Pro',
        },
      ],
    },
    pricing: {
      label: 'Preise',
      heading: 'Kostenlos starten',
      subheading:
        'Grundlegende Blockierung ist kostenlos. Upgrade, wenn du stärkeren Fokus brauchst.',
      planLabel: { monthly: 'Monatlich', yearly: 'Jährlich', lifetime: 'Einmalig' },
      lifetimeBadge: 'Launch-Angebot',
      lifetimePerks: [
        '✨ Alle zukünftigen Updates — für immer kostenlos',
        '🔒 Festgesetzt — nie von Preiserhöhungen betroffen',
        '🪪 Nur Launch-Unterstützer — limitierte Plätze, endet bei vollem Kontingent',
      ],
      yearlyBadge: '{n}% sparen',
      free: {
        name: 'Kostenlos',
        price: '0 €',
        period: '/Mon.',
        cta: 'Kostenlos starten',
        items: [
          'Chrome-Erweiterung',
          'Unbegrenzte Seitenblockierung',
          'Zielsetzung & Anzeige',
          'Automatische Wiederherstellung beim Neustart',
        ],
      },
      pro: {
        name: 'Pro',
        cta: 'Pro abonnieren',
        badge: 'Beliebt',
        items: [
          'Alles aus dem kostenlosen Plan',
          'Deep Dive (zeitbasierte Sperre)',
          'Windows / macOS / Android Komplettsperre',
          'App-Ebene-Blockierung (Spiele usw.)',
          'Echtzeit-Sync über alle Geräte',
        ],
        monthly: { price: '$5.9', period: '/Mon.' },
        yearly: { price: '$49', period: '/Jahr' },
        lifetime: { price: '$59', period: 'Einmalzahlung' },
      },
    },
    download: {
      heading: 'Heute beginnen',
      subheading: 'Einrichtung in 1 Minute. Besserer Fokus ab jetzt.',
      chrome: {
        title: 'Chrome-Erweiterung',
        description: 'Blockiere Seiten im Browser · Kostenlos',
        cta: 'Aus dem Chrome Web Store installieren',
      },
      windows: {
        title: 'Windows / macOS App',
        description: 'App-Ebene-Blockierung enthalten · Pro',
        cta: 'Desktop-App herunterladen',
      },
      android: {
        title: 'Android App',
        description: 'Mobile Komplettsperre für Deep Dive · Pro',
        cta: 'Bei Google Play laden',
      },
      ios: {
        title: 'iOS App',
        description: 'iPhone · iPad Unterstützung in Vorbereitung',
        cta: 'Demnächst',
      },
    },
    roadmap: {
      label: 'Demnächst',
      heading: 'Tiefere Daten. Tieferes Potenzial.',
      subheading: 'Wird schrittweise veröffentlicht, sobald Daten zusammenkommen.',
      items: [
        { icon: '📊', title: 'Fokus-Muster nach Tageszeit', description: 'Sieh, wann du dich am besten konzentrierst. Entdecke deinen eigenen Rhythmus.' },
        { icon: '🎯', title: 'Zielerreichungsrate', description: 'Nach Zieltext gruppiert — Abschlussrate und durchschnittliche Dauer in einer Ansicht.' },
        { icon: '📅', title: 'Wochen- / Monatsberichte', description: 'Automatische Zusammenfassung in der Mobile-App. Baut dir die Reflexionsgewohnheit auf.' },
        { icon: '👥', title: 'Peer-Vergleich (Opt-in)', description: 'Anonymer Vergleich mit Nutzern derselben Rolle oder desselben Ziels. Nur freiwillig.' },
      ],
    },
    stats: {
      items: [
        { number: '12.000+', label: 'Menschen im Fokus' },
        { number: '4,2 Mio.', label: 'Blockierte Ablenkungen' },
        { number: '38.000+', label: 'Stunden fokussiert' },
        { number: '4,8 ★', label: 'Durchschnittsbewertung' },
      ],
    },
    howItWorks: {
      label: 'So funktioniert es',
      heading: 'Fokus in 3 Schritten aufbauen',
      subheading: 'Keine komplizierte Einrichtung. Starte sofort.',
      steps: [
        {
          number: '01',
          title: 'Ziel notieren',
          description: 'Schreib auf, was du heute fertigmachen musst. Die Blockseite erinnert dich daran.',
        },
        {
          number: '02',
          title: 'Ablenkungen hinzufügen',
          description: 'Twitter, Instagram, Spiele — alles, was ablenkt, kommt auf die Blockliste.',
        },
        {
          number: '03',
          title: 'Flow Dive starten',
          description: 'Ein Klick. Öffnest du reflexartig eine Seite, leitet dich Flowdive zu deinem Ziel zurück.',
        },
      ],
    },
    testimonials: {
      label: 'Stimmen',
      heading: 'Menschen, die ihren Fokus zurück haben',
      items: [
        {
          quote: 'Früher öffnete ich Instagram ohne nachzudenken. Diese Gewohnheit ist weg — mein Ziel auf der Blockseite reißt mich sofort raus.',
          author: 'Lukas Müller',
          role: 'Doktorand',
        },
        {
          quote: 'Mit Deep Dive war ich 3 Stunden lang voll konzentriert auf eine Präsentation. Normalerweise hätte ich nur gescrollt.',
          author: 'Anna Schmidt',
          role: 'Designerin',
        },
        {
          quote: 'Ich verlasse mich nicht mehr auf Willenskraft. Mein Umfeld erledigt es jetzt für mich.',
          author: 'Tobias Weber',
          role: 'Entwickler',
        },
      ],
    },
    faq: {
      label: 'FAQ',
      heading: 'Hast du Fragen?',
      items: [
        {
          question: 'Kann ich das Blockieren während des Flow Dive stoppen?',
          answer: 'Im Standardmodus jederzeit. Deep Dive sperrt bis der Timer abgelaufen ist.',
        },
        {
          question: 'Kann der Inkognito-Modus es umgehen?',
          answer: 'Die Chrome-Erweiterung blockiert auch Inkognito, wenn du es erlaubst. Die Windows-App blockiert auf Systemebene — schwer zu umgehen.',
        },
        {
          question: 'Unterschied zwischen Free und Pro?',
          answer: 'Free bietet grundlegendes Seitenblockieren. Pro schaltet Deep Dive (zeitbasierte Sperre) und die Windows-App (App-Blockierung) frei.',
        },
        {
          question: 'Kann ich mehrere Geräte nutzen?',
          answer: 'Ein Konto funktioniert für Chrome-Erweiterung und Windows-App. Die Blocklisten werden automatisch synchronisiert.',
        },
        {
          question: 'Wo werden meine Daten gespeichert?',
          answer: 'Blocklisten und Ziele werden auf deinem Gerät gespeichert. Nur synchronisierte Daten werden verschlüsselt an den Server gesendet.',
        },
      ],
    },
    finalCta: {
      heading: 'Fokussiere ab heute',
      subheading: 'Es ist nicht mangelnde Willenskraft — dein Umfeld ist auf Ablenkung gebaut. Flowdive baut es um.',
      ctaPrimary: 'Kostenlos zu Chrome hinzufügen',
      ctaSecondary: 'Desktop-App herunterladen',
      ctaTertiary: 'Android-App holen',
    },
    footer: {
      copyright: '© 2025 Flowdive. Alle Rechte vorbehalten.',
      privacy: 'Datenschutzerklärung',
      terms: 'Nutzungsbedingungen',
    },
  },
}