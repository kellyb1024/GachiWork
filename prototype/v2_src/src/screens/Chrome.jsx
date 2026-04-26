/* ===== Chrome: shared app frame (status bar + nav + tab bar) ===== */
const Chrome = ({ children, active, onTab, hideTabs, hideStatus, style }) => (
  <div className="view" style={style}>
    {!hideStatus && <StatusBar />}
    {children}
    {!hideTabs && <TabBar active={active} onTab={onTab} />}
  </div>
);

Object.assign(window, { Chrome });
