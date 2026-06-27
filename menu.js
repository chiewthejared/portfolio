document.addEventListener("DOMContentLoaded", function() {
    var surpriseItem = document.getElementById("surpriseItem");
    var loadingOverlay = null;
    var progressFill = null;
    var percentDisplay = null;
    var animFrameId = null;

    function showLoading(target) {
        loadingOverlay = document.createElement("div");
        loadingOverlay.style.cssText = `
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.85);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
            color: #fff;
            transition: opacity 0.4s ease;
        `;
        loadingOverlay.innerHTML = `
            <div style="font-size: 24px; font-weight: 300; letter-spacing: 0.1em; margin-bottom: 30px;">Loading...</div>
            <div style="width: min(320px, 70%); height: 4px; background: #1e2630; border-radius: 4px; overflow: hidden; box-shadow: inset 0 1px 2px rgba(0,0,0,0.4);">
                <div id="progressFill" style="height: 100%; width: 0%; background: linear-gradient(90deg, #ff8800, #ffaa44); border-radius: 4px; transition: width 0.12s linear; box-shadow: 0 0 12px rgba(255,136,0,0.3);"></div>
            </div>
            <div id="percentDisplay" style="font-size: 16px; font-weight: 400; color: #8899aa; margin-top: 18px; font-variant-numeric: tabular-nums; letter-spacing: 0.04em;">0%</div>
        `;
        document.body.appendChild(loadingOverlay);

        progressFill = document.getElementById("progressFill");
        percentDisplay = document.getElementById("percentDisplay");

        var startTime = performance.now();
        var duration = 2000;

        function updateProgress(now) {
            var elapsed = now - startTime;
            var progress = Math.min(elapsed / duration, 1);
            var percent = Math.round(progress * 100);
            progressFill.style.width = percent + "%";
            percentDisplay.textContent = percent + "%";

            if (progress < 1) {
                animFrameId = requestAnimationFrame(updateProgress);
            } else {
                setTimeout(function() {
                    window.location.href = target;
                }, 300);
            }
        }

        animFrameId = requestAnimationFrame(updateProgress);
    }

    setTimeout(function() {
        surpriseItem.classList.add("visible");
    }, 5000);

    document.querySelectorAll(".menu-list button").forEach(function(btn) {
        btn.addEventListener("click", function(e) {
            var target = btn.getAttribute("data-target");
            if (target) {
                if (animFrameId) cancelAnimationFrame(animFrameId);
                showLoading(target);
            }
        });
    });
});