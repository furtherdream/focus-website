'use client'

// 업데이트 내역 페이지 — 출시된 버전·플랫폼·변경 내용을 한 곳에서.
//
// 데이터는 app/changelog/data.ts 의 CHANGELOG 배열에서 가져옴 (정적).
// 추후 앱 내 모달 단계에서 Supabase whats_new 테이블로 옮길 때도 같은 모양 유지.

import { useTranslation } from '../i18n/context'
import { LOCALES, LOCALE_LABELS, type Locale } from '../i18n/messages'
import { CHANGELOG, PLATFORM_LABELS, type Platform } from './data'

function LanguageSwitcher() {
  const { locale, setLocale } = useTranslation()
  return (
    <select
      value={locale}
      onChange={(e) => setLocale(e.target.value as Locale)}
      aria-label="Language"
      className="bg-transparent text-sm text-slate-600 hover:text-slate-900 cursor-pointer px-3 py-1.5 rounded-full border border-slate-200 hover:border-slate-300 transition-colors"
    >
      {LOCALES.map((l) => (
        <option key={l} value={l} className="text-slate-900">
          {LOCALE_LABELS[l]}
        </option>
      ))}
    </select>
  )
}

function PlatformTag({ platform, locale }: { platform: Platform; locale: Locale }) {
  // `all` 은 강조 색 — 모든 플랫폼 일괄 업데이트 (초기 출시·대규모 릴리스)
  const isAll = platform === 'all'
  return (
    <span
      className={
        isAll
          ? 'text-[11px] font-medium px-2.5 py-1 rounded-full bg-violet-100 text-violet-700 border border-violet-200'
          : 'text-[11px] font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200'
      }
    >
      {PLATFORM_LABELS[locale][platform]}
    </span>
  )
}

export default function ChangelogPage() {
  const { t, locale } = useTranslation()

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* 헤더 */}
      <header className="border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 font-bold text-lg">
            <img src="/icon.png" alt="" width={24} height={24} className="rounded" />
            <span>Flowdive</span>
          </a>
          <LanguageSwitcher />
        </div>
      </header>

      {/* 본문 */}
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6">
          <div className="mb-12">
            <p className="text-violet-600 font-semibold text-sm uppercase tracking-wider mb-3">
              {t.changelog.label}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
              {t.changelog.heading}
            </h1>
            <p className="text-slate-500 text-lg">{t.changelog.subheading}</p>
          </div>

          {/* 버전 카드 리스트 */}
          <ol className="space-y-10">
            {CHANGELOG.map((entry) => (
              <li
                key={entry.version}
                className={
                  entry.highlight
                    ? 'rounded-3xl border border-violet-200 bg-violet-50/40 p-8'
                    : 'rounded-3xl border border-slate-200 bg-white p-8'
                }
              >
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="text-sm font-bold text-slate-900">{entry.version}</span>
                  <span className="text-xs text-slate-400">·</span>
                  <span className="text-xs text-slate-500">{entry.date}</span>
                  <div className="flex flex-wrap gap-1.5 ml-1">
                    {entry.platforms.map((p) => (
                      <PlatformTag key={p} platform={p} locale={locale} />
                    ))}
                  </div>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">
                  {entry.title[locale]}
                </h2>
                <ul className="space-y-2 text-sm md:text-[15px] text-slate-700 leading-relaxed">
                  {entry.items[locale].map((item, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-violet-500 mt-1.5 flex-shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>

          {/* 로드맵 안내 (블로그 / stats 페이지에 예정 기능 있음) */}
          <p className="mt-12 text-sm text-slate-500">
            {t.changelog.roadmapHint}
            <a href="/blog" className="text-violet-600 underline">
              blog
            </a>
            .
          </p>

          {/* 홈으로 */}
          <div className="mt-16 pt-8 border-t border-slate-100 text-center">
            <a href="/" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
              {t.changelog.backHome}
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}