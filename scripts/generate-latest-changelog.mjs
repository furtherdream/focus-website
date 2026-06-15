// app/changelog/data.ts 의 첫 항목(=가장 최신 버전) 의 version·date 를
// public/changelog/latest.json 으로 추출. 각 앱 (Android/iOS/Desktop/Extension) 이
// 시작 시 이 파일을 fetch 해서 로컬 "last seen" 과 비교 → 다르면 "최근 업데이트" 옆에 빨간 점.
//
// 빌드/dev 시작 직전 자동 실행 (package.json scripts 참고).

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

const dataPath = path.join(root, 'app', 'changelog', 'data.ts')
const src = fs.readFileSync(dataPath, 'utf8')

// CHANGELOG 배열의 첫 entry 만 추출. data.ts 구조가 단순하므로 정규식으로 충분.
const versionMatch = src.match(/version:\s*['"]([^'"]+)['"]/)
const dateMatch = src.match(/date:\s*['"]([^'"]+)['"]/)
if (!versionMatch || !dateMatch) {
  console.error('[changelog] Failed to extract version/date from data.ts')
  process.exit(1)
}

const out = { version: versionMatch[1], date: dateMatch[1] }
const outDir = path.join(root, 'public', 'changelog')
fs.mkdirSync(outDir, { recursive: true })
fs.writeFileSync(path.join(outDir, 'latest.json'), JSON.stringify(out, null, 2) + '\n')
console.log('[changelog] Generated public/changelog/latest.json', out)