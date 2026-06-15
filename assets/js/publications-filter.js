// Publications: facet filtering (project) + live search,
// hide empty groups, shareable URL query params.
(function () {
  function init() {
    var root = document.querySelector("[data-pub-controls]");
    var groups = Array.prototype.slice.call(document.querySelectorAll("[data-pub-group]"));
    if (!root || !groups.length) return;
    var cards = Array.prototype.slice.call(document.querySelectorAll(".pub-card"));
    var buttons = Array.prototype.slice.call(root.querySelectorAll("[data-facet]"));
    var search = root.querySelector("[data-pub-search]");
    var empty = document.querySelector("[data-pub-empty]");

    var facets = {};
    buttons.forEach(function (b) { facets[b.getAttribute("data-facet")] = "all"; });
    var q = "";

    function apply() {
      var total = 0;
      cards.forEach(function (c) {
        var show = true;
        for (var f in facets) {
          var v = facets[f];
          if (v === "all") continue;
          if ((c.getAttribute("data-" + f) || "").toLowerCase() !== v.toLowerCase()) { show = false; break; }
        }
        if (show && q && (c.getAttribute("data-search") || "").indexOf(q) === -1) show = false;
        c.hidden = !show;
      });
      groups.forEach(function (g) {
        var vis = g.querySelectorAll(".pub-card:not([hidden])").length;
        g.hidden = vis === 0;
        total += vis;
      });
      if (empty) empty.hidden = total !== 0;
    }
    function syncURL() {
      try {
        var u = new URL(location.href);
        for (var f in facets) {
          if (facets[f] !== "all") u.searchParams.set(f, facets[f]);
          else u.searchParams.delete(f);
        }
        history.replaceState(null, "", u);
      } catch (e) {}
    }
    function setFacet(f, v) {
      facets[f] = v;
      buttons.forEach(function (b) {
        if (b.getAttribute("data-facet") !== f) return;
        var on = b.getAttribute("data-value") === v;
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
      });
      syncURL(); apply();
    }
    buttons.forEach(function (b) {
      b.addEventListener("click", function () { setFacet(b.getAttribute("data-facet"), b.getAttribute("data-value")); });
    });
    if (search) search.addEventListener("input", function () { q = search.value.trim().toLowerCase(); apply(); });

    // init from URL
    try {
      var u = new URL(location.href);
      for (var f in facets) {
        var val = u.searchParams.get(f);
        if (val && buttons.some(function (b) { return b.getAttribute("data-facet") === f && b.getAttribute("data-value") === val; })) {
          facets[f] = val;
        }
      }
    } catch (e) {}
    buttons.forEach(function (b) {
      var on = b.getAttribute("data-value") === facets[b.getAttribute("data-facet")];
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
    apply();
  }
  if (document.readyState !== "loading") init();
  else document.addEventListener("DOMContentLoaded", init);
})();
