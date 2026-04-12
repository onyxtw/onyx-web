```javascript
(() => {
  async function init() {
    try {
      const res = await fetch('/config/pages.json');
      const pages = await res.json();
      const currentPath = window.location.pathname;
      
      const header = document.getElementById('site-header');
      if (header) {
        const links = pages.map(p => `<a href="${p.path}" class="nav-link ${currentPath === p.path ? 'active' : ''}">${p.title}</a>`).join('');
        header.innerHTML = `
          <header class="topbar">
            <div class="topbar-inner">
              <a href="/index.html" class="brand"><div class="brand-mark">O</div><strong>ONYX</strong></a>
              <nav class="nav">${links}</nav>
            </div>
          </header>`;
      }

      const footer = document.getElementById('site-footer');
      if (footer) {
        footer.innerHTML = `<footer class="footer">© ${new Date().getFullYear()} ONYX DEEP TECH STUDIO</footer>`;
      }
    } catch (err) {
      console.error("Layout init failed:", err);
    }
  }
  document.addEventListener('DOMContentLoaded', init);
})();

```
