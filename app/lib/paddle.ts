// Paddle Checkout overlay 진입 헬퍼.
// 통화는 Paddle 이 사용자 IP/카드 기준으로 자동 결정 — priceId 만 plan 별로 분기.

const PRICE_IDS = {
  monthly: 'pri_01kspxzhv531w9chssmtdn13je',
  yearly: 'pri_01kspy8c3cnnmjwrmpazqbs0q2',
  lifetime: 'pri_01kspyrjhbbbq9kgdgr361s0y9',
} as const

export type PaddlePlan = keyof typeof PRICE_IDS

const TOKEN = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN

let initialized = false

// Window.Paddle 글로벌 타입은 app/checkout/page.tsx 에 이미 `any` 로 선언되어 있어
// 여기서 더 좁은 타입을 재선언하면 declaration merging 충돌. inline 캐스팅으로 회피.

function ensureInit() {
  if (initialized) return true
  if (typeof window === 'undefined') return false
  const Paddle = (window as { Paddle?: { Initialize: (opts: object) => void } }).Paddle
  if (!Paddle || !TOKEN) return false
  Paddle.Initialize({
    token: TOKEN,
    eventCallback: (e: { name: string }) => {
      if (e.name === 'checkout.completed') {
        console.log('[paddle] checkout completed — Pro 활성화는 webhook 처리')
      }
    },
  })
  initialized = true
  return true
}

export function openPaddleCheckout(plan: PaddlePlan, opts: { email?: string } = {}) {
  if (typeof window === 'undefined') return
  if (!ensureInit()) {
    alert('결제 시스템 로드 중. 잠시 후 다시 시도해주세요.')
    return
  }
  const Paddle = (window as { Paddle?: { Checkout: { open: (opts: object) => void } } }).Paddle!
  Paddle.Checkout.open({
    items: [{ priceId: PRICE_IDS[plan], quantity: 1 }],
    ...(opts.email ? { customer: { email: opts.email } } : {}),
  })
}

// Edge Function `create-checkout` 가 만든 Paddle Transaction 으로 결제 오버레이를 연다.
// 익스텐션·안드로이드는 ?_ptxn=txn_xxx 쿼리만 붙여서 이 페이지로 redirect — 매칭 정보(custom_data) 는
// transaction 안에 이미 박혀있다.
export function openPaddleCheckoutByTransaction(transactionId: string) {
  if (typeof window === 'undefined') return
  if (!ensureInit()) return
  const Paddle = (window as { Paddle?: { Checkout: { open: (opts: object) => void } } }).Paddle!
  Paddle.Checkout.open({ transactionId })
}