// 블로그 목록 — 영어 전용. 비영어권 사용자는 브라우저 자동 번역으로 열람.

import Link from 'next/link'
import { listBlogPosts } from '../lib/blog'

export const metadata = {
  title: 'Blog',
  description: 'Flowdive blog — focus, deep work, and engineering attention.',
  alternates: { canonical: 'https://flowdive.app/blog' },
}

export default function BlogIndex() {
  const posts = listBlogPosts()

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <header className="border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <img src="/icon.png" alt="" width={24} height={24} className="rounded" />
            <span>Flowdive</span>
          </Link>
        </div>
      </header>

      <section className="max-w-3xl mx-auto px-6 py-16">
        <p className="text-violet-600 font-semibold text-sm uppercase tracking-wider mb-3">Blog</p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-8">
          Dive deeper into focus
        </h1>

        {/* 추후 공개 예정 (통계 다각화) 안내 배너 — 동일 메시지를 stats/메인 페이지에도 노출. */}
        <Link
          href="/blog/stats-roadmap"
          className="group block mb-12 rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50 to-white px-5 py-4 hover:border-violet-300 transition-colors"
        >
          <div className="flex items-start gap-3">
            <span className="text-xl leading-none mt-0.5">🛠️</span>
            <div className="flex-1 text-sm leading-relaxed">
              <p className="font-semibold text-slate-900 mb-0.5">More stats are on the way</p>
              <p className="text-slate-600">
                Time-of-day focus patterns · per-goal completion · weekly reports · opt-in peer comparison — rolling out as data accumulates.
              </p>
              <span className="inline-flex items-center gap-1 text-violet-600 text-xs font-semibold mt-2 group-hover:gap-2 transition-all">
                See the honest roadmap →
              </span>
            </div>
          </div>
        </Link>

        {posts.length === 0 ? (
          <p className="text-slate-500">No posts yet.</p>
        ) : (
          <ul className="space-y-10">
            {posts.map((post) => (
              <li key={post.slug} className="border-b border-slate-100 pb-10 last:border-b-0">
                <Link href={`/blog/${post.slug}`} className="group">
                  <time className="text-xs text-slate-400 font-medium">
                    {formatDate(post.frontmatter.date)}
                  </time>
                  <h2 className="text-2xl font-bold text-slate-900 mt-2 group-hover:text-violet-600 transition-colors">
                    {post.frontmatter.title}
                  </h2>
                  <p className="text-slate-500 mt-3 leading-relaxed">
                    {post.frontmatter.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-violet-600 text-sm font-medium mt-4 group-hover:gap-2 transition-all">
                    Read more →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-16 pt-8 border-t border-slate-100 text-center text-xs text-slate-400">
          <div className="flex justify-center gap-6 mb-3">
            <Link href="/pricing" className="hover:text-slate-600">Pricing</Link>
            <Link href="/terms" className="hover:text-slate-600">Terms</Link>
            <Link href="/privacy" className="hover:text-slate-600">Privacy</Link>
          </div>
          <p>© 2026 Flowdive</p>
        </div>
      </section>
    </main>
  )
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  } catch {
    return iso
  }
}