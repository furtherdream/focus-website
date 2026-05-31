'use client'

// Flowdive 개인 통계 페이지.
// - Google 로그인 후 본인 focus_sessions_history 조회
// - 4가지 차트: 일/주/월 집중 시간, DeepDive 횟수, 가장 차단된 사이트·앱, 목표 키워드 빈도
//
// 정적 export 사이트라 'use client' 컴포넌트로 모든 로직이 브라우저에서 실행.

import { useEffect, useState } from 'react'
import { getSupabase } from '../../lib/supabaseClient'
import StatsDashboard from './dashboard'

export default function StatsPage() {
  const [email, setEmail] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    const sb = getSupabase()

    sb.auth.getSession().then(({ data }) => {
      if (!mounted) return
      setEmail(data.session?.user.email ?? null)
      setLoading(false)
    })

    const { data: sub } = sb.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return
      setEmail(session?.user.email ?? null)
    })

    return () => {
      mounted = false
      sub.subscription.unsubscribe()
    }
  }, [])

  async function signIn() {
    setError(null)
    const sb = getSupabase()
    const { error } = await sb.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: typeof window !== 'undefined'
          ? `${window.location.origin}/stats/`
          : undefined,
      },
    })
    if (error) setError(error.message)
  }

  async function signOut() {
    await getSupabase().auth.signOut()
  }

  if (loading) {
    return (
      <main className="max-w-5xl mx-auto px-6 py-16 text-slate-700">
        불러오는 중…
      </main>
    )
  }

  if (!email) {
    return (
      <main className="max-w-md mx-auto px-6 py-24 text-center">
        <a href="/" className="inline-flex items-center gap-2 font-bold text-lg text-slate-900 mb-10">
          <img src="/icon.png" alt="" width={24} height={24} className="rounded" />
          <span>Flowdive</span>
        </a>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">내 집중 통계</h1>
        <p className="text-sm text-slate-500 mb-8">
          데스크탑·모바일에서 끝낸 집중 세션을 한곳에서 확인하세요.
        </p>
        <button
          onClick={signIn}
          className="w-full px-5 py-3 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-semibold transition"
        >
          Google 로 계속
        </button>
        {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
        <p className="mt-8 text-xs text-slate-400">
          데스크탑·모바일 앱과 같은 계정으로 로그인하면 데이터가 자동으로 보입니다.
        </p>
      </main>
    )
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <header className="flex items-center justify-between mb-8">
        <a href="/" className="inline-flex items-center gap-2 font-bold text-lg text-slate-900">
          <img src="/icon.png" alt="" width={24} height={24} className="rounded" />
          <span>Flowdive</span>
        </a>
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <span>{email}</span>
          <button
            onClick={signOut}
            className="text-violet-600 hover:underline"
          >
            로그아웃
          </button>
        </div>
      </header>

      <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">내 집중 통계</h1>
      <p className="text-sm text-slate-500 mb-8">최근 90일 데이터</p>

      {/* 추후 공개 예정 — 데이터 누적 + 분석 지표 다각화 안내. 로그인한 사용자에게만 노출. */}
      <div className="mb-8 rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50 to-white px-5 py-4 flex items-start gap-3">
        <span className="text-xl leading-none mt-0.5">🛠️</span>
        <div className="text-sm leading-relaxed">
          <p className="font-semibold text-slate-900 mb-0.5">곧 더 깊은 지표가 추가됩니다</p>
          <p className="text-slate-600">
            시간대별 집중력 패턴 · 주간 / 월간 리포트 · 목표별 성취율 · 동기 비교 (옵션) 등
            데이터가 쌓이는 대로 순차 공개됩니다.
          </p>
        </div>
      </div>

      <StatsDashboard />
    </main>
  )
}