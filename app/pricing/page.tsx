'use client'

// 전용 가격 페이지 — Paddle 도메인 승인용.
// 홈의 #pricing 섹션과 같은 i18n 데이터를 재사용하되, 독립 URL 로 제공한다.

import Script from 'next/script'
import { useEffect, useState } from 'react'
import { useTranslation } from '../i18n/context'
import { LOCALES, LOCALE_LABELS, type Locale } from '../i18n/messages'
import {
  PRICES_BY_CURRENCY,
  currencyFromTimezone,
  currencyFromIp,
  type Currency,
} from '../i18n/currency'
import { openPaddleCheckout, openPaddleCheckoutByTransaction } from '../lib/paddle'

const CHROME_STORE_URL = '#'
const SUPPORT_EMAIL = 'support@flowdive.app'

function CheckIcon({ color = '#a78bfa' }: { color?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
      <circle cx="9" cy="9" r="9" fill={color} fillOpacity="0.15" />
      <path d="M5.5 9L7.8 11.5L12.5 6.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

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

export default function PricingPage() {
  const { t } = useTranslation()
  const [proPlan, setProPlan] = useState<'monthly' | 'yearly' | 'lifetime'>('monthly')
  // 통화 — timezone 즉시 적용 + IP 결과로 정정
  const [currency, setCurrency] = useState<Currency>('USD')
  // ?email=<user@x> — 앱에서 redirect 시 자기 계정 이메일 prefill.
  // Paddle checkout 이 이 이메일을 받아 자동 채움 → 잘못된 이메일로 구독 → orphan 방지.
  const [prefilledEmail, setPrefilledEmail] = useState<string | undefined>(undefined)
  useEffect(() => {
    setCurrency(currencyFromTimezone())
    currencyFromIp().then((c) => { if (c) setCurrency(c) })
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const e = params.get('email')
      if (e) setPrefilledEmail(e)
      // 익스텐션·안드로이드는 Edge Function 으로 Paddle Transaction 을 먼저 만들고
      //   ?_ptxn=txn_xxx 쿼리로 이 페이지에 redirect. transaction 안에 custom_data.supabase_user_id
      //   가 박혀있어 webhook 이 100% 사용자 매칭. Paddle.js 로드 대기 후 자동 결제창 오픈.
      const ptxn = params.get('_ptxn')
      if (ptxn) {
        let tries = 0
        const tick = setInterval(() => {
          const Paddle = (window as { Paddle?: unknown }).Paddle
          if (Paddle) {
            clearInterval(tick)
            openPaddleCheckoutByTransaction(ptxn)
          } else if (++tries > 50) {
            clearInterval(tick)
          }
        }, 100)
      }
    }
  }, [])
  const prices = PRICES_BY_CURRENCY[currency]

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Paddle Checkout overlay SDK */}
      <Script src="https://cdn.paddle.com/paddle/v2/paddle.js" strategy="afterInteractive" />

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

      {/* 가격 본문 */}
      <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-violet-600 font-semibold text-sm uppercase tracking-wider mb-3">{t.pricing.label}</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
              {t.pricing.heading}
            </h1>
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
              <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                  <p className="text-sm font-semibold text-violet-300">{t.pricing.pro.name}</p>
                  <span className="text-xs bg-violet-500/20 border border-violet-400/30 text-violet-200 px-2.5 py-0.5 rounded-full">
                    {t.pricing.pro.badge}
                  </span>
                </div>

                {/* 플랜 토글
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
                {/* 평생권 선택 시만 노출되는 차별화 혜택 */}
                {proPlan === 'lifetime' && (
                  <ul className="mb-6 space-y-2 rounded-2xl border border-amber-300/30 bg-amber-400/5 p-4">
                    {t.pricing.lifetimePerks.map((perk) => (
                      <li key={perk} className="text-sm text-amber-100 leading-relaxed">{perk}</li>
                    ))}
                  </ul>
                )}
                <button
                  type="button"
                  onClick={() => openPaddleCheckout(proPlan, { email: prefilledEmail })}
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

          {/* 결제·취소·환불 안내 */}
          <div className="mt-16 max-w-3xl mx-auto">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Billing & Subscription</h2>
            <ul className="space-y-3 text-sm text-slate-600 leading-relaxed">
              <li>• Subscriptions are billed monthly and renew automatically on the same day each month.</li>
              <li>• Payments are processed securely by <strong>Paddle.com Market Limited</strong>, our Merchant of Record. Paddle handles invoicing, taxes, and refunds.</li>
              <li>• You can cancel anytime — Pro features remain active until the end of the current billing period.</li>
              <li>• For refunds, see our <a href="/refund" className="text-violet-600 underline">refund policy</a>.</li>
              <li>• Support: <a href={`mailto:${SUPPORT_EMAIL}`} className="text-violet-600 underline">{SUPPORT_EMAIL}</a></li>
            </ul>
          </div>

          {/* 푸터 링크 */}
          <div className="mt-16 pt-8 border-t border-slate-100 text-center text-xs text-slate-400">
            <div className="flex justify-center gap-6 mb-3">
              <a href="/terms" className="hover:text-slate-600">Terms</a>
              <a href="/privacy" className="hover:text-slate-600">Privacy</a>
              <a href="/refund" className="hover:text-slate-600">Refund</a>
              <a href="/changelog" className="hover:text-slate-600">Changelog</a>
            </div>
            <p>© 2026 Flowdive</p>
          </div>
        </div>
      </section>
    </main>
  )
}