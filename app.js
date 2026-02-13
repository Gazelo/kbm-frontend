(function () {
  const $ = (s) => document.querySelector(s);

  // Drawer open/close
  const drawer = $("#drawer");
  const openBtn = $("#burger");
  const closeBtn = $("#drawerClose");
  const backdrop = $("#drawerBackdrop");

  function openDrawer() {
    if (!drawer) return;
    drawer.classList.add("isOpen");
    drawer.setAttribute("aria-hidden", "false");
    document.body.classList.add("noScroll");
  }
  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove("isOpen");
    drawer.setAttribute("aria-hidden", "true");
    document.body.classList.remove("noScroll");
  }

  openBtn && openBtn.addEventListener("click", openDrawer);
  closeBtn && closeBtn.addEventListener("click", closeDrawer);
  backdrop && backdrop.addEventListener("click", closeDrawer);

  // Render tiles (home)
  const homeTiles = $("#homeTiles");
  if (homeTiles && window.KBM) {
    homeTiles.innerHTML = `
      <article class="tile">
        <h3>Rýchla objednávka</h3>
        <div class="tile__row">
          <input class="input" placeholder="6204 2RS, H205, UCFL204" />
          <button class="btn btn--primary">Vyhľadať</button>
        </div>
        <div class="tile__mini">Tip: vlož viac kódov oddelených čiarkou.</div>
      </article>

      <article class="tile">
        <h3>Produkty podľa typu</h3>
        <div class="tile__icons">
          ${KBM.categories.slice(0, 6).map(c => `
            <a class="chip" href="./kategorie.html#${c.id}">
              <img src="${c.img}" alt="" />
              <span>${c.title}</span>
            </a>
          `).join("")}
        </div>
      </article>

      <article class="tile">
        <h3>Riešenia podľa použitia</h3>
        <div class="tile__list">
          ${KBM.solutions.map(s => `
            <button class="listbtn" type="button">
              <span>${s.title}</span>
              <span class="arrow">›</span>
            </button>
          `).join("")}
        </div>
      </article>
    `;
  }

  // Render bestsellers (home)
  const best = $("#bestsellers");
  if (best && window.KBM) {
    best.innerHTML = KBM.bestsellers.map(p => `
      <article class="pCard">
        <div class="pCard__img">
          <img src="${p.img}" alt="" />
          <div class="pCard__brand">${p.brand}</div>
        </div>
        <div class="pCard__body">
          <div class="pCard__title">${p.title}</div>
          <div class="pCard__meta">✅ ${Number(p.stock).toLocaleString("sk-SK")} ks skladom</div>
          <div class="pCard__price">
            <strong>${Number(p.price).toFixed(2).replace(".", ",")} €</strong>
            <span>bez DPH</span>
          </div>
          <div class="pCard__actions">
            <button class="btn btn--primary btn--full" type="button">Pridať</button>
          </div>
        </div>
      </article>
    `).join("");
  }

  // Render company features
  const company = $("#companyFeatures");
  if (company && window.KBM) {
    company.innerHTML = KBM.companyFeatures.map(f => `
      <div class="feat">
        <div class="feat__icon">${f.icon}</div>
        <div class="feat__text">
          <div class="feat__title">${f.title}</div>
          <div class="feat__desc">${f.desc}</div>
        </div>
      </div>
    `).join("");
  }

  // Render categories grid page
  const catGrid = $("#categoryGrid");
  if (catGrid && window.KBM) {
    catGrid.innerHTML = KBM.categories.map(c => `
      <a class="cat" href="#" id="${c.id}">
        <div class="cat__badge">${c.badge ?? ""}</div>
        <div class="cat__img"><img src="${c.img}" alt="" /></div>
        <div class="cat__title">${c.title}</div>
        <div class="cat__cta">Zobraziť ›</div>
      </a>
    `).join("");
  }

  // Fake search
  const searchBtn = $("#searchBtn");
  const searchInput = $("#searchInput");
  if (searchBtn && searchInput) {
    const runSearch = () => {
      const q = searchInput.value.trim();
      if (!q) return;
      alert(`Demo vyhľadávanie: "${q}" (hard-code)`);
    };
    searchBtn.addEventListener("click", runSearch);
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") runSearch();
    });
  }
})();
