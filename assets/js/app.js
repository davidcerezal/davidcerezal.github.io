/* ============================================================
   Interacciones de UI: nav, menú móvil, reveal, typing, to-top
   ============================================================ */
(function () {
  var nav = document.querySelector(".nav");
  var burger = document.querySelector(".nav__burger");
  var links = document.querySelector(".nav__links");
  var toTop = document.querySelector(".to-top");

  /* ---- nav: estado al hacer scroll ---- */
  function onScroll() {
    var y = window.scrollY;
    if (nav) nav.classList.toggle("is-scrolled", y > 30);
    if (toTop) toTop.classList.toggle("show", y > 500);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- menú móvil ---- */
  if (burger && links) {
    burger.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      burger.classList.toggle("open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        burger.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---- scroll reveal ---- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.style.transitionDelay = (en.target.dataset.delay || (en.target.__i || 0) * 60) + "ms";
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el, i) { el.__i = i % 6; io.observe(el); });
    // red de seguridad: nada debe quedar invisible para siempre
    setTimeout(function () {
      reveals.forEach(function (el) { el.classList.add("in"); });
    }, 3000);
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- efecto máquina de escribir ---- */
  var typeEl = document.querySelector(".type");
  if (typeEl && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var words = (typeEl.dataset.words || "").split("|").filter(Boolean);
    if (words.length) {
      var wi = 0, ci = 0, deleting = false;
      (function tick() {
        var word = words[wi];
        typeEl.textContent = word.substring(0, ci);
        if (!deleting && ci < word.length) { ci++; setTimeout(tick, 70); }
        else if (!deleting && ci === word.length) { deleting = true; setTimeout(tick, 1600); }
        else if (deleting && ci > 0) { ci--; setTimeout(tick, 35); }
        else { deleting = false; wi = (wi + 1) % words.length; setTimeout(tick, 350); }
      })();
    }
  } else if (typeEl) {
    var fallback = (typeEl.dataset.words || "").split("|")[0] || "";
    typeEl.textContent = fallback;
    typeEl.style.borderRight = "none";
  }
})();
