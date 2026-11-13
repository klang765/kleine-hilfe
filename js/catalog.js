(function () {
  var DATA = window.KLEINE_HILFE_PRODUCTS || [];
  var tbody = document.getElementById("catalog-body");
  var empty = document.getElementById("catalog-empty");
  var countEl = document.getElementById("catalog-count");
  var search = document.getElementById("catalog-search");
  var filterBtns = document.querySelectorAll(".filter-btn");
  if (!tbody) return;

  var state = { category: "alle", query: "", sort: "default", dir: "asc" };

  function parseHash() {
    var raw = (location.hash || "").replace(/^#/, "");
    if (!raw) return;
    raw.split("&").forEach(function (part) {
      var kv = part.split("=");
      if (kv[0] === "kategorie" && kv[1]) state.category = decodeURIComponent(kv[1]);
    });
  }

  function writeHash() {
    var next = state.category && state.category !== "alle" ? "#kategorie=" + encodeURIComponent(state.category) : "";
    if ((location.hash || "") !== next) history.replaceState(null, "", location.pathname + location.search + next);
  }

  function cmp(a, b) {
    var dir = state.dir === "desc" ? -1 : 1;
    if (state.sort === "name") return a.name.localeCompare(b.name, "de") * dir;
    if (state.sort === "price") return (a.priceValue - b.priceValue) * dir;
    return 0;
  }

  function visible() {
    var q = state.query.trim().toLowerCase();
    var rows = DATA.filter(function (p) {
      if (state.category !== "alle" && p.key !== state.category) return false;
      if (!q) return true;
      return (p.name + " " + p.category).toLowerCase().indexOf(q) !== -1;
    });
    if (state.sort !== "default") rows = rows.slice().sort(cmp);
    return rows;
  }

  function render() {
    var rows = visible();
    tbody.innerHTML = rows.map(function (p) {
      return (
        '<tr>' +
          '<td class="col-thumb"><a href="' + p.href + '"><img class="catalog-thumb" src="' + p.image + '" alt=""></a></td>' +
          '<td class="col-name"><a class="catalog-name" href="' + p.href + '">' + p.name + "</a></td>" +
          '<td class="col-cat">' + p.category + "</td>" +
          '<td class="col-pages">' + p.pages + "</td>" +
          '<td class="col-meta">' + p.category + " · " + p.pages + " Seiten</td>" +
          '<td class="col-price"><div class="price">' + p.price + " €</div></td>" +
          '<td class="col-action"><a class="btn" href="' + p.href + '">Ansehen</a></td>' +
        "</tr>"
      );
    }).join("");
    var total = DATA.length;
    var n = rows.length;
    countEl.textContent = n === total
      ? total + " Planer und Pakete"
      : n + " von " + total + (n === 1 ? " Eintrag" : " Einträgen");
    if (empty) empty.classList.toggle("is-visible", n === 0);

    filterBtns.forEach(function (b) {
      b.classList.toggle("is-active", b.getAttribute("data-filter") === state.category);
    });
    document.querySelectorAll(".sort-btn").forEach(function (b) {
      var key = b.getAttribute("data-sort");
      if (state.sort === key) b.setAttribute("data-dir", state.dir);
      else b.removeAttribute("data-dir");
    });
  }

  filterBtns.forEach(function (b) {
    b.addEventListener("click", function () {
      state.category = b.getAttribute("data-filter") || "alle";
      writeHash();
      render();
    });
  });

  if (search) {
    search.addEventListener("input", function () {
      state.query = search.value;
      render();
    });
  }

  document.querySelectorAll(".sort-btn").forEach(function (b) {
    b.addEventListener("click", function () {
      var key = b.getAttribute("data-sort");
      if (state.sort === key) state.dir = state.dir === "asc" ? "desc" : "asc";
      else { state.sort = key; state.dir = "asc"; }
      render();
    });
  });

  window.addEventListener("hashchange", function () {
    parseHash();
    render();
  });

  parseHash();
  render();
})();
