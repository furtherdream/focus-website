'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'
import { useTranslation } from './i18n/context'
import { LOCALES, LOCALE_LABELS, type Locale } from './i18n/messages'
import {
  PRICES_BY_CURRENCY,
  currencyFromTimezone,
  currencyFromIp,
  type Currency,
} from './i18n/currency'
import { openPaddleCheckout } from './lib/paddle'

// ─────────────────────────────────────────────────────────
// 헬퍼 컴포넌트
// ─────────────────────────────────────────────────────────

/**
 * i18n 문자열의 `**...**` 마크다운을 <strong> 으로 변환.
 * dangerouslySetInnerHTML 없이 React-friendly split + map 방식이라 XSS 안전.
 */
function richText(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**')
      ? <strong key={i} className="text-slate-900 font-semibold">{part.slice(2, -2)}</strong>
      : part
  )
}

function LanguageSwitcher() {
  const { locale, setLocale } = useTranslation()
  return (
    <select
      value={locale}
      onChange={(e) => setLocale(e.target.value as Locale)}
      aria-label="Language"
      className="bg-transparent text-sm text-slate-300 hover:text-white cursor-pointer px-3 py-1.5 rounded-full border border-white/10 hover:border-white/30 transition-colors"
    >
      {LOCALES.map((l) => (
        <option key={l} value={l} className="text-slate-900">
          {LOCALE_LABELS[l]}
        </option>
      ))}
    </select>
  )
}

function CheckIcon({ color = '#a78bfa' }: { color?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <circle cx="9" cy="9" r="9" fill={color} fillOpacity="0.15" />
      <path d="M5.5 9L7.8 11.5L12.5 6.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ArrowRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M3 9h12M9 4l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const CHROME_STORE_URL = '#'
const WINDOWS_DOWNLOAD_URL = '#'
const MAC_DOWNLOAD_URL = '#'
const ANDROID_DOWNLOAD_URL = '#'

// 사용자 OS 감지 → 데스크탑 다운로드 URL 자동 선택.
// SSR 시에는 Windows 기본값 (서버에선 navigator 없음), 클라이언트에서 useEffect 로 보정.
function detectDesktopUrl(): string {
  if (typeof navigator === 'undefined') return WINDOWS_DOWNLOAD_URL
  const ua = navigator.userAgent.toLowerCase()
  if (ua.includes('mac')) return MAC_DOWNLOAD_URL
  return WINDOWS_DOWNLOAD_URL
}

// 클라이언트에서 Mac 여부 판단 — exeWarning 표시 분기용
function detectIsMac(): boolean {
  if (typeof navigator === 'undefined') return false
  return navigator.userAgent.toLowerCase().includes('mac')
}

// ─────────────────────────────────────────────────────────
// 메인 페이지
// ─────────────────────────────────────────────────────────

export default function Home() {
  const { t } = useTranslation()
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  // Pro 플랜 토글 — 월/연/평생
  const [proPlan, setProPlan] = useState<'monthly' | 'yearly' | 'lifetime'>('monthly')
  // 통화 — 1차 timezone 즉시 적용, 2차 IP 결과 도착 시 갱신. 언어 변경과는 독립.
  const [currency, setCurrency] = useState<Currency>('USD')
  useEffect(() => {
    setCurrency(currencyFromTimezone())
    currencyFromIp().then((c) => { if (c) setCurrency(c) })
  }, [])
  const prices = PRICES_BY_CURRENCY[currency]
  // 데스크탑 다운로드 URL — Mac 이면 .dmg, 그 외(Windows/Linux/모바일) 면 .exe.
  // SSR 안정성 위해 초기엔 Windows, 마운트 후 navigator 검사로 갱신.
  const [desktopDownloadUrl, setDesktopDownloadUrl] = useState(WINDOWS_DOWNLOAD_URL)
  // exeWarning 표시 분기 (Windows 사용자에게만) — 초기 false (Mac 환경 가정 X)
  // SSR 시 false 로 시작, 클라이언트에서 실제 OS 따라 갱신
  const [isMacUser, setIsMacUser] = useState(false)
  useEffect(() => {
    setDesktopDownloadUrl(detectDesktopUrl())
    setIsMacUser(detectIsMac())
  }, [])

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Paddle Checkout overlay 용 SDK — 페이지 진입 후 비동기 로드 */}
      <Script src="https://cdn.paddle.com/paddle/v2/paddle.js" strategy="afterInteractive" />

      {/* ── 헤더 ─────────────────────────────────────────── */}
      <header className="absolute top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 font-bold text-lg text-white">
            <img src="/icon.png" alt="" width={24} height={24} className="rounded" />
            <span>Flowdive</span>
          </a>
          <nav className="hidden md:flex items-center gap-10 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-white transition-colors">{t.nav.features}</a>
            <a href="#pricing" className="hover:text-white transition-colors">{t.nav.pricing}</a>
            <a href="/blog" className="hover:text-white transition-colors">Blog</a>
            <a href="#download" className="hover:text-white transition-colors">{t.nav.download}</a>
          </nav>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            {/* 메인 CTA — 익스텐션이 여러 플랫폼 중 하나라 #download 로 보내 선택지 4개 모두 노출. */}
            <a
              href="#download"
              className="hidden md:inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-900 text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
            >
              {t.nav.cta}
            </a>
          </div>
        </div>
      </header>

      {/* ── 히어로 ────────────────────────────────────────── */}
      <section className="relative bg-slate-950 text-white overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="absolute inset-0 hero-aurora opacity-80" />
        <div className="absolute inset-0 hero-grid opacity-50" />

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur border border-white/10 text-slate-300 text-xs font-medium px-4 py-1.5 rounded-full mb-8">
            <span className="w-1.5 h-1.5 bg-violet-400 rounded-full" />
            {t.hero.badge}
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-8 whitespace-pre-line">
            {t.hero.title.split('\n').map((line, i) => (
              <span key={i} className="block">
                {i === 1 ? <span className="gradient-text">{line}</span> : line}
              </span>
            ))}
          </h1>

          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12 whitespace-pre-line">
            {t.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 flex-wrap">
            <a
              href={CHROME_STORE_URL}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-900 font-semibold px-8 py-4 rounded-full transition-all text-base shadow-2xl shadow-violet-500/20"
            >
              {t.hero.ctaPrimary}
              <ArrowRight />
            </a>
            <a
              href={desktopDownloadUrl}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 backdrop-blur border border-white/10 hover:border-white/20 text-white font-semibold px-8 py-4 rounded-full transition-colors text-base"
            >
              {t.hero.ctaSecondary}
            </a>
            <a
              href={ANDROID_DOWNLOAD_URL}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 backdrop-blur border border-white/10 hover:border-white/20 text-white font-semibold px-8 py-4 rounded-full transition-colors text-base"
            >
              {t.hero.ctaTertiary}
            </a>
            {/* iOS — 출시 전. 클릭 비활성, 점선 테두리로 coming-soon 시각화. */}
            <div
              aria-disabled
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-transparent border border-dashed border-white/20 text-white/60 font-semibold px-8 py-4 rounded-full text-base cursor-not-allowed select-none"
            >
              {t.hero.ctaIos}
            </div>
          </div>

          {/* 차단 페이지 미리보기 */}
          <div className="max-w-md mx-auto animate-float">
            <div className="bg-white rounded-3xl overflow-hidden device-shadow text-left">
              <div className="bg-slate-100 px-4 py-3 flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-300" />
                  <div className="w-3 h-3 rounded-full bg-yellow-300" />
                  <div className="w-3 h-3 rounded-full bg-green-300" />
                </div>
                <div className="flex-1 bg-white rounded-md px-3 py-1 text-xs text-slate-500">
                  instagram.com
                </div>
              </div>
              <div className="bg-gradient-to-br from-violet-50 to-pink-50 text-slate-900 p-10 text-center">
                <img src="/icon.png" alt="" width={56} height={56} className="mx-auto mb-4 rounded-xl" />
                <p className="font-bold text-lg mb-2">{t.hero.blockPage.headline}</p>
                <p className="text-xs text-slate-500 mb-4 uppercase tracking-wider font-medium">
                  {t.hero.blockPage.currentGoal}
                </p>
                <p className="text-base font-semibold text-slate-800 bg-white border border-slate-200 rounded-xl px-4 py-3 mb-4 shadow-sm">
                  &ldquo;{t.hero.blockPage.sampleGoal}&rdquo;
                </p>
                <p className="text-xs text-slate-400">⏱ {t.hero.blockPage.timer}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 작동 방식 ─────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 md:mb-20">
            <p className="text-violet-600 font-semibold text-sm uppercase tracking-wider mb-3">{t.howItWorks.label}</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
              {t.howItWorks.heading}
            </h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">{t.howItWorks.subheading}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {t.howItWorks.steps.map((step) => (
              <div
                key={step.number}
                className="bg-white rounded-3xl p-8 border border-slate-100 card-hover relative overflow-hidden"
              >
                <div className="text-7xl font-bold gradient-text opacity-30 leading-none mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 기능 ─────────────────────────────────────────── */}
      <section id="features" className="py-24 md:py-32 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 md:mb-20">
            <p className="text-violet-600 font-semibold text-sm uppercase tracking-wider mb-3">{t.features.label}</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4 whitespace-pre-line">
              {t.features.heading}
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">{t.features.subheading}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.features.items.map((f) => (
              <div
                key={f.title}
                className="bg-gradient-to-br from-slate-50 to-white border border-slate-100 rounded-3xl p-8 card-hover"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="text-4xl">{f.icon}</div>
                  {f.badge && (
                    <span className="text-xs font-bold bg-violet-100 text-violet-700 border border-violet-200 px-3 py-1 rounded-full">
                      {f.badge}
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h3>
                <p className="text-slate-500 leading-relaxed">{richText(f.description)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 추후 공개 예정 (통계 다각화 로드맵) ──────────────── */}
      <section id="roadmap" className="py-24 md:py-32 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14 md:mb-16">
            <p className="text-violet-600 font-semibold text-sm uppercase tracking-wider mb-3">{t.roadmap.label}</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4 whitespace-pre-line">{t.roadmap.heading}</h2>
            <p className="text-slate-500 text-lg">{t.roadmap.subheading}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {t.roadmap.items.map((it) => (
              <div
                key={it.title}
                className="relative bg-white border border-slate-200 rounded-3xl p-7"
              >
                <span className="absolute top-4 right-4 text-[10px] uppercase tracking-wider font-semibold text-violet-600 bg-violet-50 border border-violet-100 rounded-full px-2 py-0.5">
                  {t.roadmap.label}
                </span>
                <div className="text-3xl mb-4">{it.icon}</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{it.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{it.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 가격 ─────────────────────────────────────────── */}
      <section id="pricing" className="py-24 md:py-32 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16 md:mb-20">
            <p className="text-violet-600 font-semibold text-sm uppercase tracking-wider mb-3">{t.pricing.label}</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
              {t.pricing.heading}
            </h2>
            <p className="text-slate-500 text-lg">{t.pricing.subheading}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 무료 */}
            <div className="border border-slate-200 rounded-3xl p-10 bg-white">
              <p className="text-sm font-semibold text-slate-500 mb-2">{t.pricing.free.name}</p>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-5xl font-bold text-slate-900">{t.pricing.free.price}</span>
                <span className="text-slate-400 text-base">{t.pricing.free.period}</span>
              </div>
              <a
                href={CHROME_STORE_URL}
                className="block w-full text-center bg-slate-100 hover:bg-slate-200 text-slate-900 font-semibold py-3.5 rounded-full transition-colors text-sm mb-8"
              >
                {t.pricing.free.cta}
              </a>
              <ul className="space-y-4">
                {t.pricing.free.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-slate-700">
                    <CheckIcon color="#64748b" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pro */}
            <div className="relative bg-slate-950 text-white rounded-3xl p-10 overflow-hidden">
              <div className="absolute inset-0 opacity-30 pro-card-glow" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                  <p className="text-sm font-semibold text-violet-300">{t.pricing.pro.name}</p>
                  <span className="text-xs bg-violet-500/20 border border-violet-400/30 text-violet-200 px-2.5 py-0.5 rounded-full">
                    {t.pricing.pro.badge}
                  </span>
                </div>

                {/* 플랜 토글: 월 / 년 / 평생
                    - 모바일: 화면 전체 폭 균등 분포, 배지는 plan 이름 아래 두 줄 배치
                    - 데스크탑: 자동 폭, 배지는 plan 이름 오른쪽 inline */}
                <div className="flex sm:inline-flex w-full sm:w-auto bg-white/5 border border-white/10 rounded-full p-1 mb-6 text-xs font-medium">
                  {(['monthly', 'yearly', 'lifetime'] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setProPlan(p)}
                      className={`flex-1 sm:flex-none flex flex-col sm:flex-row items-center sm:items-baseline justify-center sm:gap-1.5 px-3 sm:px-4 py-1.5 rounded-full transition-colors whitespace-nowrap leading-tight ${
                        proPlan === p
                          ? 'bg-white text-slate-900'
                          : 'text-violet-200 hover:text-white'
                      }`}
                    >
                      <span>{t.pricing.planLabel[p]}</span>
                      {p === 'yearly' && proPlan !== 'yearly' && (
                        <span className="text-[10px] text-emerald-300 mt-0.5 sm:mt-0">
                          <span className="hidden sm:inline">·</span>{t.pricing.yearlyBadge.replace('{n}', String(prices.yearlyDiscount))}
                        </span>
                      )}
                      {p === 'lifetime' && proPlan !== 'lifetime' && (
                        <span className="text-[10px] text-amber-300 mt-0.5 sm:mt-0">
                          <span className="hidden sm:inline">·</span>{t.pricing.lifetimeBadge}
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                <div className="flex flex-wrap items-baseline gap-x-1 gap-y-2 mb-8">
                  <span className="text-4xl sm:text-5xl font-bold">{prices[proPlan]}</span>
                  <span className="text-violet-300 text-base">{t.pricing.pro[proPlan].period}</span>
                  {proPlan === 'lifetime' && (
                    <span className="ml-1 text-xs bg-amber-400/20 border border-amber-300/30 text-amber-200 px-2 py-0.5 rounded-full whitespace-nowrap">
                      {t.pricing.lifetimeBadge}
                    </span>
                  )}
                </div>
                {/* 평생권 선택 시만 노출되는 차별화 혜택 — 업데이트 영구·가격 인상 차단·런치 한정 */}
                {proPlan === 'lifetime' && (
                  <ul className="mb-6 space-y-2 rounded-2xl border border-amber-300/30 bg-amber-400/5 p-4">
                    {t.pricing.lifetimePerks.map((perk) => (
                      <li key={perk} className="text-sm text-amber-100 leading-relaxed">{perk}</li>
                    ))}
                  </ul>
                )}
                <button
                  type="button"
                  onClick={() => openPaddleCheckout(proPlan)}
                  className="block w-full text-center bg-white hover:bg-slate-100 text-slate-900 font-semibold py-3.5 rounded-full transition-colors text-sm mb-8"
                >
                  {t.pricing.pro.cta}
                </button>
                <ul className="space-y-4">
                  {t.pricing.pro.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm text-violet-50">
                      <CheckIcon color="#c4b5fd" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-slate-50">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-violet-600 font-semibold text-sm uppercase tracking-wider mb-3">{t.faq.label}</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900">{t.faq.heading}</h2>
          </div>

          <div className="space-y-3">
            {t.faq.items.map((item, i) => (
              <details
                key={i}
                open={openFaq === i}
                onToggle={(e) => {
                  if ((e.target as HTMLDetailsElement).open) setOpenFaq(i)
                  else if (openFaq === i) setOpenFaq(null)
                }}
                className="group bg-white border border-slate-200 rounded-2xl overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer p-6 list-none">
                  <span className="font-semibold text-slate-900 pr-4">{item.question}</span>
                  <svg
                    className="w-5 h-5 text-slate-400 transition-transform group-open:rotate-180 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-slate-600 leading-relaxed">{item.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── 다운로드 ─────────────────────────────────────── */}
      <section id="download" className="py-24 md:py-32 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">{t.download.heading}</h2>
            <p className="text-slate-500 text-lg">{t.download.subheading}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 max-w-5xl mx-auto">
            <a
              href={CHROME_STORE_URL}
              className="group bg-gradient-to-br from-slate-50 to-white border border-slate-200 hover:border-violet-300 rounded-3xl p-8 text-left card-hover"
            >
              <div className="text-4xl mb-5">🌐</div>
              <p className="font-bold text-lg text-slate-900 mb-1">{t.download.chrome.title}</p>
              <p className="text-slate-500 text-sm mb-5">{t.download.chrome.description}</p>
              <div className="flex items-center gap-2 text-violet-600 text-sm font-semibold group-hover:gap-3 transition-all">
                {t.download.chrome.cta}
                <ArrowRight />
              </div>
            </a>
            <a
              href={desktopDownloadUrl}
              className="group bg-gradient-to-br from-slate-50 to-white border border-slate-200 hover:border-violet-300 rounded-3xl p-8 text-left card-hover"
            >
              <div className="text-4xl mb-5">🖥️</div>
              <p className="font-bold text-lg text-slate-900 mb-1">{t.download.windows.title}</p>
              <p className="text-slate-500 text-sm mb-5">{t.download.windows.description}</p>
              <div className="flex items-center gap-2 text-violet-600 text-sm font-semibold group-hover:gap-3 transition-all">
                {t.download.windows.cta}
                <ArrowRight />
              </div>
              {/* Windows 사용자에게만 SmartScreen + AV 경고 안내 (Mac 사용자는 서명된 .dmg 라 미표시) */}
              {!isMacUser && (
                <>
                  <p className="mt-4 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 leading-relaxed">
                    ⚠️ {t.download.windows.exeWarning}
                  </p>
                  <p className="mt-2 text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 leading-relaxed">
                    🛡️ {t.download.windows.avWarning}
                  </p>
                </>
              )}
            </a>
            <a
              href={ANDROID_DOWNLOAD_URL}
              className="group bg-gradient-to-br from-slate-50 to-white border border-slate-200 hover:border-violet-300 rounded-3xl p-8 text-left card-hover"
            >
              <div className="text-4xl mb-5">📱</div>
              <p className="font-bold text-lg text-slate-900 mb-1">{t.download.android.title}</p>
              <p className="text-slate-500 text-sm mb-5">{t.download.android.description}</p>
              <div className="flex items-center gap-2 text-violet-600 text-sm font-semibold group-hover:gap-3 transition-all">
                {t.download.android.cta}
                <ArrowRight />
              </div>
            </a>
            {/* iOS — 출시 전. 클릭 비활성, 디자인은 grayscale 로 약화. */}
            <div
              aria-disabled
              className="relative bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-3xl p-8 text-left opacity-70 cursor-not-allowed"
            >
              <span className="absolute top-4 right-4 text-[10px] uppercase tracking-wider font-semibold text-violet-600 bg-violet-50 border border-violet-100 rounded-full px-2 py-0.5">
                Coming soon
              </span>
              <div className="text-4xl mb-5 grayscale">🍎</div>
              <p className="font-bold text-lg text-slate-900 mb-1">{t.download.ios.title}</p>
              <p className="text-slate-500 text-sm mb-5">{t.download.ios.description}</p>
              <div className="flex items-center gap-2 text-slate-400 text-sm font-semibold">
                {t.download.ios.cta}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 최종 CTA ──────────────────────────────────────── */}
      <section className="relative bg-slate-950 text-white overflow-hidden py-24 md:py-36">
        <div className="absolute inset-0 cta-aurora opacity-90" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-6">
            {t.finalCta.heading}
          </h2>
          <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-10 max-w-xl mx-auto">
            {t.finalCta.subheading}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap">
            <a
              href={CHROME_STORE_URL}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-900 font-semibold px-8 py-4 rounded-full transition-colors text-base"
            >
              {t.finalCta.ctaPrimary}
              <ArrowRight />
            </a>
            <a
              href={desktopDownloadUrl}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur border border-white/20 text-white font-semibold px-8 py-4 rounded-full transition-colors text-base"
            >
              {t.finalCta.ctaSecondary}
            </a>
            <a
              href={ANDROID_DOWNLOAD_URL}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur border border-white/20 text-white font-semibold px-8 py-4 rounded-full transition-colors text-base"
            >
              {t.finalCta.ctaTertiary}
            </a>
          </div>
        </div>
      </section>

      {/* ── 푸터 ─────────────────────────────────────────── */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-2 text-white font-semibold">
            <img src="/icon.png" alt="" width={20} height={20} className="rounded" />
            <span>Flowdive</span>
          </div>
          <p>{t.footer.copyright}</p>
          <div className="flex gap-6 flex-wrap justify-center">
            <a href="/pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="/blog" className="hover:text-white transition-colors">Blog</a>
            <a href="/changelog" className="hover:text-white transition-colors">{t.footer.changelog}</a>
            <a href="/terms" className="hover:text-white transition-colors">{t.footer.terms}</a>
            <a href="/privacy" className="hover:text-white transition-colors">{t.footer.privacy}</a>
            <a href="/refund" className="hover:text-white transition-colors">Refund</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
