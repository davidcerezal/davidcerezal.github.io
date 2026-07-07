/* ============================================================
   Red de partículas interactiva (constellation) — fondo verde
   ============================================================ */
(function () {
  var canvas = document.getElementById("bg-net");
  if (!canvas) return;

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var ctx = canvas.getContext("2d");
  var DPR = Math.min(window.devicePixelRatio || 1, 2);

  var w, h, particles;
  var mouse = { x: -9999, y: -9999, active: false };
  var LINK_DIST, COUNT;

  function size() {
    w = canvas.clientWidth = window.innerWidth;
    h = canvas.clientHeight = window.innerHeight;
    canvas.width = Math.floor(w * DPR);
    canvas.height = Math.floor(h * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

    var area = w * h;
    COUNT = Math.max(40, Math.min(130, Math.round(area / 14000)));
    LINK_DIST = Math.min(170, Math.max(110, w / 10));
  }

  function makeParticles() {
    particles = [];
    for (var i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        r: Math.random() * 1.6 + 0.6
      });
    }
  }

  function step() {
    ctx.clearRect(0, 0, w, h);

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];

      // suave atracción hacia el ratón
      if (mouse.active) {
        var dxm = mouse.x - p.x, dym = mouse.y - p.y;
        var dm2 = dxm * dxm + dym * dym;
        if (dm2 < 26000) {
          var f = (1 - dm2 / 26000) * 0.025;
          p.vx += dxm * f * 0.04;
          p.vy += dym * f * 0.04;
        }
      }

      p.x += p.vx;
      p.y += p.vy;

      // fricción y límite de velocidad
      p.vx *= 0.995; p.vy *= 0.995;
      var sp = Math.hypot(p.vx, p.vy);
      if (sp > 1.1) { p.vx = (p.vx / sp) * 1.1; p.vy = (p.vy / sp) * 1.1; }

      // rebote en bordes
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      p.x = Math.max(0, Math.min(w, p.x));
      p.y = Math.max(0, Math.min(h, p.y));
    }

    // líneas entre partículas
    for (var a = 0; a < particles.length; a++) {
      var pa = particles[a];
      for (var b = a + 1; b < particles.length; b++) {
        var pb = particles[b];
        var dx = pa.x - pb.x, dy = pa.y - pb.y;
        var d = Math.hypot(dx, dy);
        if (d < LINK_DIST) {
          var alpha = (1 - d / LINK_DIST) * 0.5;
          ctx.strokeStyle = "rgba(43,255,136," + alpha + ")";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(pa.x, pa.y);
          ctx.lineTo(pb.x, pb.y);
          ctx.stroke();
        }
      }

      // línea al ratón (más brillante)
      if (mouse.active) {
        var mdx = pa.x - mouse.x, mdy = pa.y - mouse.y;
        var md = Math.hypot(mdx, mdy);
        if (md < LINK_DIST * 1.4) {
          var ma = (1 - md / (LINK_DIST * 1.4)) * 0.85;
          ctx.strokeStyle = "rgba(125,255,184," + ma + ")";
          ctx.lineWidth = 1.1;
          ctx.beginPath();
          ctx.moveTo(pa.x, pa.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
    }

    // nodos
    for (var k = 0; k < particles.length; k++) {
      var pk = particles[k];
      ctx.beginPath();
      ctx.fillStyle = "rgba(43,255,136,0.9)";
      ctx.shadowColor = "rgba(43,255,136,0.8)";
      ctx.shadowBlur = 8;
      ctx.arc(pk.x, pk.y, pk.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 0;

    raf = requestAnimationFrame(step);
  }

  var raf;
  function start() {
    size();
    makeParticles();
    if (raf) cancelAnimationFrame(raf);
    if (!reduce) raf = requestAnimationFrame(step);
    else { // versión estática para reduced-motion
      step(); cancelAnimationFrame(raf);
    }
  }

  window.addEventListener("resize", function () {
    clearTimeout(window.__netT);
    window.__netT = setTimeout(start, 150);
  });

  window.addEventListener("mousemove", function (e) {
    mouse.x = e.clientX; mouse.y = e.clientY; mouse.active = true;
  });
  window.addEventListener("mouseleave", function () { mouse.active = false; });
  window.addEventListener("touchmove", function (e) {
    if (e.touches[0]) { mouse.x = e.touches[0].clientX; mouse.y = e.touches[0].clientY; mouse.active = true; }
  }, { passive: true });
  window.addEventListener("touchend", function () { mouse.active = false; });

  // pausar cuando la pestaña no es visible
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) { if (raf) cancelAnimationFrame(raf); }
    else if (!reduce) raf = requestAnimationFrame(step);
  });

  start();
})();
