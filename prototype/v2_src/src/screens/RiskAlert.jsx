/* ===== Risk alert — private AI notification screen ===== */
const RiskAlert = ({ onBack, onOpenExpert }) => (
  <Chrome hideTabs>
    <TopNav back onBack={onBack} title="Step-by-step guide" lang={false}/>
    <div className="risk-shell">
      <div className="scroll risk-scroll">
        <div className="risk-screen">
          <div className="risk-icon-xl"><Icon.shieldAlert size={34}/></div>
          <h2>AI detected a risk signal</h2>
          <p className="lead">
            After analyzing your post, AI determined this is a case of <strong style={{color:'var(--danger)'}}>unpaid wages + fear of visa retaliation</strong>.
            <br/><br/>
            This notice is visible <strong>only to you</strong>;
            <br/>
            other users cannot see it.
          </p>

          <div className="risk-finding">
            <h4>Sentences we flagged</h4>
            <blockquote>"3 months have passed with no wages... I'm afraid that if I complain, he won't renew my visa."</blockquote>
            <div className="keywords">
              <span className="k">Unpaid for 3 months</span>
              <span className="k">Fear of visa retaliation</span>
              <span className="k">Labor Act violation</span>
            </div>
          </div>

          <div className="risk-list">
            <div className="risk-step">
              <div className="num">1</div>
              <div>
                <h5>Collect evidence first</h5>
                <p>Employment contract, payslips, KakaoTalk / text with your boss. Take photos and save them.</p>
              </div>
            </div>
            <div className="risk-step">
              <div className="num">2</div>
              <div>
                <h5>Call the Migrant Worker Support Center (free)</h5>
                <p><strong>1577-0071</strong> · Myanmar interpreters available · Weekdays 9 AM – 6 PM</p>
              </div>
            </div>
            <div className="risk-step">
              <div className="num">3</div>
              <div>
                <h5>File online with the Ministry of Employment & Labor</h5>
                <p>minwon.moel.go.kr · Visa retaliation for filing is prohibited by law.</p>
              </div>
            </div>
            <div className="risk-step">
              <div className="num">4</div>
              <div>
                <h5>File jointly with coworkers</h5>
                <p>If coworkers share your situation, a joint report is more effective.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="risk-cta-fixed">
        <button className="btn primary block" onClick={onOpenExpert}>
          <Icon.phone size={16}/> Connect me with an expert now
        </button>
        <button className="btn ghost block">
          <Icon.book size={16}/> Save this step-by-step guide
        </button>
      </div>
    </div>
  </Chrome>
);

Object.assign(window, { RiskAlert });
