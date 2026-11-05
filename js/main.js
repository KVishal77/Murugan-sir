/* Diwali Fireworks Splash Execution */
(function(){
  var box = document.getElementById("diwali"), cv = document.getElementById("dwfx");
  if(!box || !cv) return;
  var ctx = cv.getContext("2d"), W, H, dpr = Math.min(window.devicePixelRatio||1, 2), P = [], R = [], raf, last = 0, closed = false, t0 = 0;
  var CL = ["#ffd36b","#ff9a3c","#ff5fa2","#35d0b9","#a78bfa","#ff6b6b","#ffffff","#7fe3d1","#ffe680","#5ec8ff"];
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  function rc() { return CL[Math.random()*CL.length|0]; }
  function size() {
    W = window.innerWidth; H = window.innerHeight;
    cv.width = W*dpr; cv.height = H*dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = "#05020f";
    ctx.fillRect(0, 0, W, H);
  }
  size();
  window.addEventListener("resize", size);

  function launch(x) {
    R.push({
      x: x || W*(.08 + Math.random()*.84),
      y: H, px: 0, py: H,
      ty: H*(.12 + Math.random()*.28),
      vy: -(Math.max(5.5, H/115) + Math.random()*1.2),
      c: rc(),
      sx: (Math.random() - .5)*.8
    });
  }

  function add(x, y, a, v, c, s, d, tr) {
    P.push({ x: x, y: y, px: x, py: y, vx: Math.cos(a)*v, vy: Math.sin(a)*v, l: 1, d: d, c: c, s: s, tr: tr });
  }

  function burst(x, y, c) {
    var sc = (Math.min(W, H)/650 + .5)*1.9, type = Math.random()*5|0, c2 = rc(), i, n, a, v;
    if (type === 0) {
      n = 140; for (i = 0; i < n; i++) { a = 6.2832*i/n; v = (5 + Math.random()*2)*sc; add(x, y, a, v, c, 2.2, .007 + Math.random()*.006, 1); }
    } else if (type === 1) {
      n = 60; for (var r = 1; r <= 3; r++) for (i = 0; i < n; i++) { a = 6.2832*i/n; add(x, y, a, r*2.1*sc, r%2 ? c : c2, 2, .011, 1); }
    } else if (type === 2) {
      n = 170; for (i = 0; i < n; i++) { a = Math.random()*6.2832; v = Math.random()*7*sc; add(x, y, a, v, Math.random() < .5 ? c : c2, 1.8 + Math.random(), .006 + Math.random()*.008, 1); }
    } else if (type === 3) {
      n = 90; for (i = 0; i < n; i++) { a = 6.2832*i/n; v = (i%2 ? 3.2 : 6)*sc; add(x, y, a, v, i%2 ? c2 : c, 2.2, .008, 1); }
      for (i = 0; i < 40; i++) add(x, y, Math.random()*6.28, Math.random()*2, "#fff", 1.4, .02, 0);
    } else {
      n = 110; for (i = 0; i < n; i++) { a = 6.2832*i/n; v = (4.5 + Math.random()*3)*sc; add(x, y, a, v, c, 2, .006, 1); }
      for (i = 0; i < 50; i++) add(x, y, Math.random()*6.28, Math.random()*5*sc, "#fff", 1.6, .03 + Math.random()*.02, 0);
    }
  }

  function frame(now) {
    if (closed) return;
    if (!t0) t0 = now;
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "rgba(5,2,15,.14)";
    ctx.fillRect(0, 0, W, H);
    ctx.globalCompositeOperation = "lighter";
    ctx.lineCap = "round";

    if (now - last > 2600 && R.length === 0) {
      last = now;
      launch(W*(.2 + Math.random()*.6));
    }

    for (var i = R.length - 1; i >= 0; i--) {
      var r = R[i]; r.px = r.x; r.py = r.y; r.x += r.sx; r.y += r.vy; r.vy *= .992;
      ctx.globalAlpha = 1; ctx.strokeStyle = r.c; ctx.lineWidth = 2.6;
      ctx.beginPath(); ctx.moveTo(r.px, r.py + 8); ctx.lineTo(r.x, r.y); ctx.stroke();
      if (r.y <= r.ty || r.vy > -1.6) { burst(r.x, r.y, r.c); R.splice(i, 1); }
    }

    for (var j = P.length - 1; j >= 0; j--) {
      var p = P[j]; p.px = p.x; p.py = p.y; p.x += p.vx; p.y += p.vy; p.vx *= .985; p.vy = p.vy*.985 + .022; p.l -= p.d*.55;
      if (p.l <= 0) { P.splice(j, 1); continue; }
      ctx.globalAlpha = Math.min(1, p.l*1.3); ctx.strokeStyle = p.c; ctx.lineWidth = p.s*1.25*(.5 + p.l*.7);
      ctx.beginPath(); ctx.moveTo(p.px, p.py); ctx.lineTo(p.x, p.y); ctx.stroke();
    }
    ctx.globalAlpha = 1;
    raf = requestAnimationFrame(frame);
  }

  function close() {
    if (closed) return;
    closed = true;
    cancelAnimationFrame(raf);
    box.classList.add("out");
    document.body.classList.remove("dw-lock");
    setTimeout(function(){ if(box.parentNode) box.parentNode.removeChild(box); }, 1000);
    window.removeEventListener("resize", size);
  }

  var go = document.getElementById("dwgo");
  if(go) go.addEventListener("click", close);
  window.addEventListener("keydown", function(e){ if(e.key === "Escape") close(); });

  if (reduce) return;
  last = performance.now() - 1800;
  burst(W*.5, H*.3, CL[0]);
  raf = requestAnimationFrame(frame);
  setTimeout(close, 26000);
})();
