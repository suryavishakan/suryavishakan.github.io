/* Placeholder illustrations for projects. Replace by setting `image` in content.js. */
const S = { fill: 'none', stroke: '#fff', strokeWidth: 2.5, strokeLinecap: 'round', strokeLinejoin: 'round' }
const soft = 'rgba(255,255,255,.18)'
const T = (p) => <text fontFamily="Bricolage Grotesque, Inter, sans-serif" fontWeight="700" fill="#fff" textAnchor="middle" {...p} />

function Hatfield() {
  return (
    <>
      <rect x="22" y="78" width="96" height="56" rx="16" fill={soft} {...{ stroke: '#fff', strokeWidth: 2.5 }} />
      <T x="70" y="111" fontSize="12">“Q3 deals?”</T>
      <path d="M118 106h44" {...S} strokeDasharray="4 6" />
      <rect x="162" y="70" width="64" height="72" rx="14" fill="#fff" />
      <path d="M194 84l24 10v14c0 12-10 21-24 26-14-5-24-14-24-26V94z" fill="#5b3dff" opacity=".9" />
      <path d="M185 108l6 6 11-12" {...S} stroke="#fff" />
      <T x="194" y="160" fontSize="11" opacity=".9">guardrails</T>
      <path d="M226 94l36-30M226 106h40M226 118l36 30" {...S} />
      {[['DB', 64], ['CRM', 106], ['API', 148]].map(([l, y]) => (
        <g key={l}><circle cx="290" cy={y} r="20" fill={soft} stroke="#fff" strokeWidth="2.5" /><T x="290" y={y + 4} fontSize="11">{l}</T></g>
      ))}
      <T x="70" y="156" fontSize="11" opacity=".9">plain request</T>
    </>
  )
}
function Gateway() {
  return (
    <>
      <rect x="18" y="92" width="52" height="46" rx="12" fill={soft} stroke="#fff" strokeWidth="2.5" /><T x="44" y="120" fontSize="11">clients</T>
      <path d="M70 115h40" {...S} />
      <rect x="110" y="62" width="104" height="106" rx="18" fill="#fff" />
      <T x="162" y="84" fontSize="11" fill="#0f766e">gateway</T>
      {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={126 + i * 18} y={98} width="12" height="26" rx="3" fill={i < 3 ? '#0f766e' : '#bfe9db'} />)}
      <T x="162" y="146" fontSize="10" fill="#0f766e">token bucket</T>
      <path d="M214 100l44-28M214 115h44M214 130l44 28" {...S} />
      {[0, 1, 2].map((i) => <g key={i}><rect x="258" y={52 + i * 42} width="50" height="30" rx="9" fill={soft} stroke="#fff" strokeWidth="2.5" /><T x="283" y={72 + i * 42} fontSize="10">Redis</T></g>)}
      <path d="M44 180h272" stroke="#fff" strokeWidth="2" strokeDasharray="3 6" opacity=".7" />
      <T x="180" y="205" fontSize="12">25K req/s · p99 &lt; 10 ms</T>
    </>
  )
}
function KVCache() {
  return (
    <>
      <T x="48" y="52" fontSize="11" opacity=".9">request 1</T><T x="48" y="92" fontSize="11" opacity=".9">request 2</T><T x="48" y="132" fontSize="11" opacity=".9">request 3</T>
      {[0, 1, 2].map((r) => (
        <g key={r}>
          {[0, 1, 2, 3].map((c) => <rect key={c} x={88 + c * 28} y={36 + r * 40} width="24" height="24" rx="6" fill="#fff" />)}
          {[0, 1, 2].map((c) => <rect key={c} x={88 + 4 * 28 + c * 28} y={36 + r * 40} width="24" height="24" rx="6" fill={soft} stroke="#fff" strokeWidth="2" />)}
        </g>
      ))}
      <text x="144" y="22" fontFamily="Inter" fontSize="10" fontWeight="700" fill="#fff" textAnchor="middle">shared prefix, cached once</text>
      <path d="M88 156h112" {...S} strokeWidth="3" />
      <T x="144" y="176" fontSize="11">KV-cache reuse</T>
      {[['1x', 28, 'rgba(255,255,255,.65)'], ['2.1x', 58, '#fff']].map(([l, h, f], i) => (
        <g key={l}><rect x={246 + i * 40} y={160 - h} width="28" height={h} rx="7" fill={f} /><T x={260 + i * 40} y="178" fontSize="11">{l}</T></g>
      ))}
      <T x="270" y="200" fontSize="11" opacity=".9">throughput</T>
    </>
  )
}
function Rag() {
  return (
    <>
      {[0, 1, 2].map((i) => <rect key={i} x={26 + i * 8} y={74 - i * 8} width="56" height="72" rx="10" fill={i === 2 ? '#fff' : soft} stroke="#fff" strokeWidth="2.5" />)}
      <path d="M44 100h22M44 112h22M44 124h14" stroke="#1d4ed8" strokeWidth="3" strokeLinecap="round" />
      <T x="56" y="170" fontSize="11">1,000+ docs</T>
      <path d="M98 108h34" {...S} />
      {[[158, 90], [176, 116], [152, 130], [182, 88], [166, 104]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={i === 4 ? 7 : 5} fill={i === 4 ? '#fff' : 'rgba(255,255,255,.55)'} />)}
      <T x="168" y="170" fontSize="11">embeddings</T>
      <path d="M204 108h30" {...S} />
      <rect x="236" y="62" width="96" height="40" rx="14" fill="#fff" /><T x="284" y="87" fontSize="11" fill="#1d4ed8">How do I…?</T>
      <rect x="236" y="112" width="96" height="48" rx="14" fill={soft} stroke="#fff" strokeWidth="2.5" /><T x="284" y="133" fontSize="11">Answer</T><T x="284" y="148" fontSize="10" opacity=".85">+ sources</T>
    </>
  )
}
function Next() {
  return (<><rect x="120" y="50" width="120" height="110" rx="20" fill="none" stroke="#fff" strokeWidth="2.5" strokeDasharray="6 8" /><path d="M180 82v46M157 105h46" {...S} strokeWidth="4" /></>)
}
function Ui() {
  return (
    <>
      <rect x="40" y="28" width="280" height="160" rx="16" fill="#fff" />
      <circle cx="60" cy="46" r="4" fill="#ff7a45" /><circle cx="74" cy="46" r="4" fill="#ffc24a" /><circle cx="88" cy="46" r="4" fill="#34d399" />
      <rect x="54" y="64" width="64" height="112" rx="10" fill="rgba(14,15,19,.08)" />
      {[0, 1, 2, 3].map((i) => <rect key={i} x="62" y={74 + i * 22} width="48" height="10" rx="5" fill={i === 1 ? '#ff7a45' : 'rgba(14,15,19,.25)'} />)}
      <rect x="130" y="64" width="80" height="48" rx="10" fill="#ffe9d6" /><rect x="220" y="64" width="86" height="48" rx="10" fill="#e7e1ff" />
      <rect x="130" y="122" width="176" height="54" rx="10" fill="rgba(14,15,19,.08)" />
      <path d="M140 164l24-20 22 12 28-26 30 14 26-16" fill="none" stroke="#ff7a45" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </>
  )
}
const map = { ui: Ui, hatfield: Hatfield, gateway: Gateway, kv: KVCache, rag: Rag, next: Next }

export default function Art({ kind }) {
  const C = map[kind] || Next
  return <svg viewBox="0 0 360 215" width="100%" height="100%" role="img" aria-label={`${kind} illustration`}><C /></svg>
}
