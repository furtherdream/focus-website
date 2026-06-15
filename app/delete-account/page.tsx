// Google Play 정책상 필수 — 계정 및 데이터 삭제 안내 페이지.
// 정책 요구사항:
//   1. 앱/개발자 이름 명시
//   2. 사용자가 취해야 할 단계를 눈에 띄게 표시
//   3. 삭제·보관 데이터 유형과 보관 기간 명시

export const metadata = {
  title: 'Delete Your Account · Flowdive',
  description:
    'How to delete your Flowdive account and personal data. Step-by-step process and data retention policy.',
  alternates: { canonical: 'https://flowdive.app/delete-account' },
}

const SUPPORT_EMAIL = 'support@flowdive.app'
const APP_NAME = 'Flowdive'
const DEVELOPER_NAME = 'Flowdive'

export default function DeleteAccountPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20 text-slate-800 font-sans leading-relaxed">
      <a
        href="/"
        className="inline-flex items-center gap-2 font-bold text-lg text-slate-900 mb-10"
      >
        <img src="/icon.png" alt="" width={24} height={24} className="rounded" />
        <span>Flowdive</span>
      </a>

      <h1 className="text-3xl md:text-4xl font-bold mb-2">
        Delete Your Account & Data
      </h1>
      <p className="text-sm text-slate-500 mb-8">
        App: <strong>{APP_NAME}</strong> · Developer: <strong>{DEVELOPER_NAME}</strong>
        <br />
        Last updated: 2026-06-15
      </p>

      <Section title="1. How to request account deletion">
        <p className="mb-3">
          You can request deletion of your Flowdive account and all associated
          personal data using one of the methods below.
        </p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>
            Send an email to{' '}
            <a
              href={`mailto:${SUPPORT_EMAIL}?subject=Delete%20My%20Account`}
              className="text-violet-600 underline"
            >
              {SUPPORT_EMAIL}
            </a>{' '}
            from the email address you used to sign in.
          </li>
          <li>Include the subject line: <strong>“Delete My Account”</strong>.</li>
          <li>
            Optionally, mention the platform(s) you used (Chrome extension,
            Desktop, Android, iOS).
          </li>
        </ol>
        <p className="mt-3 text-sm text-slate-600">
          We will confirm receipt within <strong>3 business days</strong> and
          complete deletion within <strong>14 business days</strong>.
        </p>
      </Section>

      <Section title="2. Data that will be deleted">
        <ul className="list-disc pl-6 space-y-2">
          <li>Your account record (email address, Google profile name)</li>
          <li>Your block list (sites and apps)</li>
          <li>Your focus session history (start/end time, goal text)</li>
          <li>Your preferences (language, settings)</li>
          <li>Push notification tokens (if any)</li>
          <li>All cross-device sync state</li>
        </ul>
      </Section>

      <Section title="3. Data that may be retained">
        <p className="mb-3">
          Some data must be retained for legal, accounting, or fraud-prevention
          reasons. This data is held in a separate, restricted environment and is
          not used for any other purpose.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Payment records</strong> (handled by Paddle.com Market
            Limited, our Merchant of Record) — retained as required by tax law
            (typically <strong>5–7 years</strong> depending on jurisdiction).
            Paddle holds these records, not Flowdive.
          </li>
          <li>
            <strong>Anonymized usage logs</strong> (no personal identifiers) —
            retained up to <strong>90 days</strong> for security and abuse
            detection. After 90 days, automatically purged.
          </li>
          <li>
            <strong>Email correspondence</strong> with our support team —
            retained for up to <strong>1 year</strong> for support quality
            review.
          </li>
        </ul>
      </Section>

      <Section title="4. Active subscriptions">
        <p>
          If you have an active Pro subscription, please cancel it{' '}
          <strong>before</strong> requesting account deletion. Cancellation is
          handled by Paddle:
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-3">
          <li>
            Use the cancellation link in your most recent Paddle receipt email,
            or
          </li>
          <li>
            Email{' '}
            <a
              href={`mailto:${SUPPORT_EMAIL}?subject=Cancel%20Subscription`}
              className="text-violet-600 underline"
            >
              {SUPPORT_EMAIL}
            </a>{' '}
            and we will cancel on your behalf.
          </li>
        </ul>
      </Section>

      <Section title="5. After deletion">
        <p>
          Once deletion is complete, you will receive a confirmation email. You
          can sign up again with the same Google account at any time, but your
          previous data cannot be recovered.
        </p>
      </Section>

      <Section title="6. Contact">
        <p>
          Questions about this process:{' '}
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="text-violet-600 underline"
          >
            {SUPPORT_EMAIL}
          </a>
        </p>
      </Section>

      <p className="text-xs text-slate-400 mt-16">
        © 2026 {DEVELOPER_NAME}. All rights reserved.
      </p>
    </main>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-bold text-slate-900 mb-3">{title}</h2>
      <div className="text-slate-700">{children}</div>
    </section>
  )
}