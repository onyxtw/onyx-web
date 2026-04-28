export default function Home(){
  return (
    <main className="shell">

      <section className="hero">
        <div className="panel">
          <div className="eyebrow">Field System · Litu Node · Terrain Compute</div>
          <h1>
            從利稻地形節點出發，<br/>
            重建 AI × 能源 × 地脈運算系統。
          </h1>
          <p className="lead">
            ONYX 以 <strong>Litu / Lidao Base</strong> 為實地節點，將自主微電網、AI 運算、光傳輸與地質熱結構整合為可部署的
            <strong> Terrain Infrastructure System</strong>。
          </p>

          <div className="cta">
            <a className="btn primary">View Infrastructure</a>
            <a className="btn secondary">Litu Field Node</a>
          </div>
        </div>

        <div className="panel">
          <div className="eyebrow">Field Proof</div>
          <div className="proof">
            <div><span>Node</span><strong>Litu / Lidao</strong></div>
            <div><span>Energy</span><strong>Autonomous Grid</strong></div>
            <div><span>Compute</span><strong>AI + Thermal</strong></div>
            <div><span>Network</span><strong>Optical</strong></div>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Core Systems</h2>
        <p>不是模組，而是場域可運行的整體結構。</p>

        <div className="grid3">

          <div className="card">
            <div className="tag">G.E.M.S.</div>
            <h3>Geo-Elemental Metabolism System</h3>
            <div className="flow">Heat → Reaction → Resource Loop</div>
          </div>

          <div className="card">
            <div className="tag">T.C.P.</div>
            <h3>Terrain Compute Protocol</h3>
            <div className="flow">Energy Flow + Data Flow + Survival Logic</div>
          </div>

          <div className="card">
            <div className="tag">L.C.A.</div>
            <h3>Lifecycle Compute Autonomy</h3>
            <div className="flow">Offline Inference + Self Recovery</div>
          </div>

        </div>
      </section>

    </main>
  )
}