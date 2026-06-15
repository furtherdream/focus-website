// 버전 변경 이력 — 새 버전 출시 시 이 배열 맨 앞에 항목 추가.
//
// 한 항목당 6언어 텍스트를 한 곳에 묶어 둠. 다음 단계 (앱 내 모달) 에서
// Supabase whats_new 테이블로 옮길 때도 같은 모양 그대로 INSERT 가능.

import type { Locale } from '../i18n/messages'

export type Platform = 'web' | 'extension' | 'desktop' | 'android' | 'ios' | 'all'

export type ChangelogEntry = {
  version: string
  date: string // YYYY-MM-DD
  platforms: Platform[]
  title: Record<Locale, string>
  items: Record<Locale, string[]>
  highlight?: boolean
}

export const PLATFORM_LABELS: Record<Locale, Record<Platform, string>> = {
  ko: {
    web: '웹',
    extension: 'Chrome',
    desktop: '데스크탑',
    android: 'Android',
    ios: 'iOS',
    all: '전체',
  },
  en: {
    web: 'Web',
    extension: 'Chrome',
    desktop: 'Desktop',
    android: 'Android',
    ios: 'iOS',
    all: 'All',
  },
  ja: {
    web: 'Web',
    extension: 'Chrome',
    desktop: 'デスクトップ',
    android: 'Android',
    ios: 'iOS',
    all: 'すべて',
  },
  'zh-CN': {
    web: '网页',
    extension: 'Chrome',
    desktop: '桌面',
    android: 'Android',
    ios: 'iOS',
    all: '全部',
  },
  es: {
    web: 'Web',
    extension: 'Chrome',
    desktop: 'Escritorio',
    android: 'Android',
    ios: 'iOS',
    all: 'Todo',
  },
  de: {
    web: 'Web',
    extension: 'Chrome',
    desktop: 'Desktop',
    android: 'Android',
    ios: 'iOS',
    all: 'Alle',
  },
}

export const CHANGELOG: ChangelogEntry[] = [
  // ⚠️ TEMP: 빨간 점 뱃지 동작 점검용 임시 항목. 정식 출시 직전 이 블록 통째로 삭제할 것.
  {
    version: 'v1.0.1',
    date: '2026-06-16',
    platforms: ['all'],
    highlight: false,
    title: {
      ko: '업데이트 알림 동작 점검 (테스트)',
      en: 'Update notification check (test)',
      ja: 'アップデート通知の動作確認 (テスト)',
      'zh-CN': '更新通知动作检查 (测试)',
      es: 'Verificación de notificación de actualización (prueba)',
      de: 'Test der Update-Benachrichtigung',
    },
    items: {
      ko: [
        '빨간 점 뱃지가 모든 플랫폼 (Chrome / Desktop / Android / iOS) 에서 정상 동작하는지 확인합니다.',
        '정식 출시 시 이 항목은 제거됩니다.',
      ],
      en: [
        'Verifying the red-dot badge works on all platforms (Chrome / Desktop / Android / iOS).',
        'This entry will be removed before the public release.',
      ],
      ja: [
        '赤い点バッジが全プラットフォーム (Chrome / Desktop / Android / iOS) で動作することを確認します。',
        '正式リリース時に削除されます。',
      ],
      'zh-CN': [
        '验证红点徽章在所有平台 (Chrome / Desktop / Android / iOS) 上正常工作。',
        '正式发布前会移除此条目。',
      ],
      es: [
        'Verificamos que el indicador rojo funciona en todas las plataformas (Chrome / Desktop / Android / iOS).',
        'Esta entrada se eliminará antes del lanzamiento público.',
      ],
      de: [
        'Wir prüfen, ob das rote Punkt-Badge auf allen Plattformen (Chrome / Desktop / Android / iOS) funktioniert.',
        'Vor der Veröffentlichung wird dieser Eintrag entfernt.',
      ],
    },
  },
  {
    version: 'v1.0.0',
    date: '2026-06-15',
    platforms: ['all'],
    highlight: true,
    title: {
      ko: '첫 출시 — 몰입의 시작',
      en: 'Initial Release — Welcome to Flow',
      ja: '初回リリース — 集中のはじまり',
      'zh-CN': '首次发布 — 开始专注',
      es: 'Lanzamiento inicial — Bienvenido al flujo',
      de: 'Erste Veröffentlichung — Willkommen im Flow',
    },
    items: {
      ko: [
        'Chrome 확장, 데스크탑(macOS·Windows), Android 앱 동시 출시',
        '집중 모드 / Deep Dive — 사이트 차단과 강한 마찰로 몰입 보호',
        '다중 기기 동기화 — 한 곳에서 차단 목록 관리',
        '6개 언어 지원 (한국어 · English · 日本語 · 中文 · Español · Deutsch)',
        'Pro 구독 — 월간 · 연간 · 평생권 제공',
      ],
      en: [
        'Launching Chrome extension, Desktop (macOS · Windows), and Android apps together',
        'Focus Mode / Deep Dive — site blocking with strong friction',
        'Cross-device sync — manage your blocklist in one place',
        '6 languages (Korean · English · Japanese · Chinese · Spanish · German)',
        'Pro plans — monthly · yearly · lifetime',
      ],
      ja: [
        'Chrome 拡張・デスクタップ (macOS・Windows)・Android アプリを同時リリース',
        '集中モード / Deep Dive — サイトブロックと強い摩擦で没入を守る',
        'マルチデバイス同期 — ブロックリストを一か所で管理',
        '6 言語対応 (한국어 · English · 日本語 · 中文 · Español · Deutsch)',
        'Pro プラン — 月額・年額・買い切り',
      ],
      'zh-CN': [
        'Chrome 扩展、桌面 (macOS · Windows)、Android 应用同步发布',
        '专注模式 / Deep Dive — 网站屏蔽与强阻力保护沉浸',
        '多设备同步 — 在一个地方管理屏蔽列表',
        '支持 6 种语言 (한국어 · English · 日本語 · 中文 · Español · Deutsch)',
        'Pro 订阅 — 月度 · 年度 · 永久',
      ],
      es: [
        'Lanzamiento simultáneo: extensión de Chrome, escritorio (macOS · Windows) y Android',
        'Modo Foco / Deep Dive — bloqueo de sitios con fricción intensa',
        'Sincronización entre dispositivos — gestiona tu lista en un solo lugar',
        '6 idiomas (한국어 · English · 日本語 · 中文 · Español · Deutsch)',
        'Planes Pro — mensual · anual · de por vida',
      ],
      de: [
        'Gleichzeitige Veröffentlichung von Chrome-Erweiterung, Desktop (macOS · Windows) und Android',
        'Fokus-Modus / Deep Dive — Seiten-Blockierung mit starkem Widerstand',
        'Geräteübergreifende Synchronisation — Sperrliste an einem Ort verwalten',
        '6 Sprachen (한국어 · English · 日本語 · 中文 · Español · Deutsch)',
        'Pro-Tarife — monatlich · jährlich · lebenslang',
      ],
    },
  },
]