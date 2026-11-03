/* Diwali Splash Screen Animation & Dismissal */
(function () {
  var box = document.getElementById("diwali");
  var cv = document.getElementById("dwfx");
  var btn = document.getElementById("dwgo");

  if (!box || !cv) return;

  var ctx = cv.getContext("2d");
  var W, H;
  var particles = [];
  var closed = false;

  function resize() {
    W = cv.width = window.innerWidth;
    H = cv.height = window.innerHeight;
  }

  window.addEventListener("resize", resize);
  resize();

  function createFirework() {
    var x = Math.random() * W;
    var y = Math.random() * (H * 0.5);
    var count = 30;
    for (var i = 0; i < count; i++) {
      var angle = (Math.PI * 2 * i) / count;
      var speed = Math.random() * 3 + 2;
      particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        color: "hsl(" + Math.random() * 360 + ", 100%, 60%)"
      });
    }
  }

  function loop() {
    if (closed) return;
    ctx.globalCompositeOperation = "destination-out";
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fillRect(0, 0, W, H);
    ctx.globalCompositeOperation = "lighter";

    if (Math.random() < 0.05) createFirework();

    for (var i = particles.length - 1; i >= 0; i--) {
      var p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.015;

      if (p.alpha <= 0) {
        particles.splice(i, 1);
        continue;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
    }

    requestAnimationFrame(loop);
  }

  loop();

  function closeSplash() {
    closed = true;
    box.classList.add("out");
    document.body.classList.remove("dw-lock");
    setTimeout(function () {
      if (box.parentNode) box.parentNode.removeChild(box);
    }, 800);
  }

  if (btn) btn.addEventListener("click", closeSplash);
  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeSplash();
  });
})();
