(function () {
  var btn = document.querySelector(".menu-btn");
  var nav = document.querySelector(".nav");
  if (btn && nav) {
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  var buttons = document.querySelectorAll(".filter-btn");
  var cards = document.querySelectorAll("[data-category]");
  if (!buttons.length || !cards.length) return;

  function applyFilter(key) {
    buttons.forEach(function (b) {
      var on = b.getAttribute("data-filter") === key;
      b.classList.toggle("is-active", on);
    });
    cards.forEach(function (c) {
      var show = key === "all" || c.getAttribute("data-category") === key;
      c.hidden = !show;
    });
  }

  buttons.forEach(function (b) {
    b.addEventListener("click", function () {
      var f = b.getAttribute("data-filter");
      applyFilter(f);
      if (f === "all") {
        history.replaceState(null, "", "#produkte");
      } else if (f === "bundle") {
        history.replaceState(null, "", "#bundles");
      } else {
        history.replaceState(null, "", "#cat-" + f);
      }
    });
  });

  function fromHash() {
    var h = (location.hash || "").replace("#", "");
    if (h === "bundles" || h === "pakete") applyFilter("bundle");
    else if (h.indexOf("cat-") === 0) applyFilter(h.slice(4));
    else applyFilter("all");
  }

  window.addEventListener("hashchange", fromHash);
  fromHash();
})();
