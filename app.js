/**
 * SPARK NEWS LIVE — PRODUCTION CLIENT-SIDE ENGINE (WITH DEEP DIVE V3.7)
 * Features:
 * - Dynamic Headless JSON Rendering from /data/issues/
 * - Section 3: Deep Dive / Case Study Analysis & 3D Matrix Renderer
 * - Multi-Factor Manifest Sorting (Newest First) & Deduplication
 * - Self-Healing Key Fallbacks & Shielded Image Loading
 * - Zero Browser Popups (Floating Glassmorphic Toasts)
 * - In-Page Historical Calendar Vault & Modal Drawer
 * - Executive Skim Mode & Theme Toggle
 * - Interactive Wager & 5-Question Micro-Quiz Engine
 */

class SparkPortalEngine {
  constructor() {
    this.xp = 100;
    this.streak = 1;
    this.currentIssueData = null;
    this.manifest = [];
    this.isSkimMode = false;
    this.isLightMode = false;
    this.wagerPlaced = false;
    this.answeredQuestions = {};
    this.easterUnlocked = false;

    this.init();
  }

  async init() {
    this.bindScrollProgress();
    this.loadState();
    await this.loadManifest();
  }

  bindScrollProgress() {
    window.addEventListener("scroll", () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      const bar = document.getElementById("scroll-progress");
      if (bar) bar.style.width = scrolled + "%";
    });
  }

  showToast(message, type = "success") {
    let container = document.getElementById("toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "toast-container";
      document.body.appendChild(container);
    }
    const toast = document.createElement("div");
    toast.className = `toast-msg toast-${type}`;
    let icon = type === "info" ? "ℹ️" : (type === "amber" ? "🎲" : "✅");
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px)";
      setTimeout(() => toast.remove(), 250);
    }, 3000);
  }

  awardXP(amount, reason = "Activity") {
    this.xp += amount;
    const hudEl = document.getElementById("hud-xp-tracker");
    if (hudEl) hudEl.innerText = `⭐ ${this.xp.toLocaleString()} XP [LVL 1]`;
    this.showToast(`+${amount} XP Earned: ${reason}`, "success");
    this.saveState();
  }

  toggleSkim() {
    this.isSkimMode = !this.isSkimMode;
    document.body.classList.toggle("skim-view-active", this.isSkimMode);
    const btn = document.getElementById("skim-toggle-btn");
    if (btn) btn.innerText = this.isSkimMode ? "⚡ Skim: ON" : "⚡ Skim: OFF";
    this.showToast(this.isSkimMode ? "Executive Skim Mode ON" : "Full Depth View ON", "info");
  }

  toggleTheme() {
    this.isLightMode = !this.isLightMode;
    document.documentElement.classList.toggle("light-mode", this.isLightMode);
    this.showToast(this.isLightMode ? "Switched to Light Theme" : "Switched to Dark Theme", "info");
  }

  openArchiveDrawer() {
    const drawer = document.getElementById("archive-drawer-modal");
    if (drawer) drawer.classList.add("is-open");
  }

  closeArchiveDrawer() {
    const drawer = document.getElementById("archive-drawer-modal");
    if (drawer) drawer.classList.remove("is-open");
  }

  async loadManifest() {
    try {
      const res = await fetch("data/manifest.json?t=" + Date.now());
      if (res.ok) {
        const rawManifest = await res.json();
        
        // Deduplicate
        const uniqueMap = new Map();
        rawManifest.forEach(item => {
          const key = String(item.issue_number || item.date);
          uniqueMap.set(key, item);
        });
        const cleanList = Array.from(uniqueMap.values());

        // Sort descending (Highest/Newest first)
        cleanList.sort((a, b) => {
          const numA = parseInt(a.issue_number, 10) || 0;
          const numB = parseInt(b.issue_number, 10) || 0;
          if (numB !== numA) return numB - numA;
          return new Date(b.date) - new Date(a.date);
        });

        this.manifest = cleanList;
        this.renderManifestUI();

        if (this.manifest.length > 0) {
          await this.loadIssueFile(this.manifest[0].file_path);
        }
      }
    } catch (e) {
      console.warn("Manifest load error.", e);
    }
  }

  renderManifestUI() {
    const select = document.getElementById("issue-archive-select");
    const modalList = document.getElementById("modal-issues-list");
    if (!select || !modalList) return;

    select.innerHTML = "";
    modalList.innerHTML = "";

    this.manifest.forEach((item, idx) => {
      const isLatest = (idx === 0);

      const opt = document.createElement("option");
      opt.value = item.file_path;
      opt.innerText = `Issue #${item.issue_number} — ${item.date} (${isLatest ? "Latest" : "Archived"})`;
      select.appendChild(opt);

      const card = document.createElement("div");
      card.className = `issue-item-card ${isLatest ? "is-active-issue" : ""}`;
      card.onclick = () => {
        this.loadIssueFile(item.file_path);
        this.closeArchiveDrawer();
      };
      card.innerHTML = `
        <div class="issue-card-left">
          <div class="issue-card-title">Issue #${item.issue_number} — ${item.date}</div>
          <div class="issue-card-meta">${item.headline || "Daily Investigative Briefing"}</div>
        </div>
        <span class="issue-card-badge" style="background: ${isLatest ? "rgba(0, 229, 153, 0.15)" : "rgba(255, 255, 255, 0.08)"}; color: ${isLatest ? "var(--accent-emerald)" : "var(--text-muted)"}; border: 1px solid ${isLatest ? "var(--accent-emerald)" : "var(--border-subtle)"};">
          ${isLatest ? "LATEST ✅" : "ARCHIVED 📁"}
        </span>
      `;
      modalList.appendChild(card);
    });
  }

  async loadIssueFile(filePath) {
    try {
      const res = await fetch(filePath + "?t=" + Date.now());
      if (res.ok) {
        const data = await res.json();
        this.currentIssueData = data;
        this.renderIssueDOM(data);
        
        const select = document.getElementById("issue-archive-select");
        if (select) select.value = filePath;

        this.showToast(`Loaded Issue #${data.meta.issue_number} (${data.meta.date})`, "success");
      }
    } catch (e) {
      console.error("Error loading issue file", e);
    }
  }

  formatMarkdown(text) {
    if (!text) return "";
    return text.replace(/\\*\\*(.*?)\\*\\*/g, "<b>$1</b>");
  }

  renderIssueDOM(data) {
    // Header
    const kickerEl = document.getElementById("issue-header-kicker");
    if (kickerEl) kickerEl.innerText = `DAILY INTELLIGENCE // ISSUE #${data.meta.issue_number}`;
    
    const titleEl = document.getElementById("issue-header-title");
    if (titleEl) titleEl.innerText = (data.lead_story && data.lead_story.headline) || "DAILY INVESTIGATIVE NEWS DIGEST";
    
    const dateEl = document.getElementById("issue-header-date");
    if (dateEl) dateEl.innerText = `VOLUME IV • ${data.meta.date} • ISSUE #${data.meta.issue_number}`;
    
    const streakEl = document.getElementById("streak-badge");
    if (streakEl) streakEl.innerText = `🔥 STREAK: DAY ${data.meta.reading_streak}`;

    // KPIs
    if (data.radar_kpis) {
      const nEl = document.getElementById("kpi-nuclear");
      if (nEl) nEl.innerText = data.radar_kpis.baseload_nuclear || "—";
      const lEl = document.getElementById("kpi-leadtime");
      if (lEl) lEl.innerText = data.radar_kpis.transformer_lead_time || "—";
      const bEl = document.getElementById("kpi-bandwidth");
      if (bEl) bEl.innerText = data.radar_kpis.optical_bandwidth || "—";
      const pEl = document.getElementById("kpi-pue");
      if (pEl) pEl.innerText = data.radar_kpis.target_pue || "—";
      const sEl = document.getElementById("kpi-sni");
      if (sEl) sEl.innerText = data.radar_kpis.sni_rating || "—";
    }

    // Cheat Sheet
    const cheatUl = document.getElementById("cheat-list-container");
    if (cheatUl && data.cheat_sheet) {
      cheatUl.innerHTML = data.cheat_sheet.map(item => `<li>${this.formatMarkdown(item)}</li>`).join("");
    }

    // Lead Story
    if (data.lead_story) {
      const ls = data.lead_story;
      
      const lk = document.getElementById("lead-kicker");
      if (lk) lk.innerText = ls.kicker || "LEAD INVESTIGATIVE ANCHOR";
      
      const lh = document.getElementById("lead-headline");
      if (lh) lh.innerText = ls.headline || "";
      
      const lc = document.getElementById("lead-catchup");
      if (lc) lc.innerHTML = this.formatMarkdown(ls.catch_up || "");
      
      const la = document.getElementById("lead-analogy");
      const analogyContent = ls.analogy || ls.mechanism;
      if (la) {
        if (analogyContent) {
          la.style.display = "block";
          la.innerHTML = `<b>The Intuitive Bridge:</b> ${this.formatMarkdown(analogyContent)}`;
        } else {
          la.style.display = "none";
        }
      }

      const prCard = document.querySelector(".decoder-card");
      const claimText = ls.pr_claim;
      const realityText = ls.pr_reality || ls.reality_audit;
      if (prCard) {
        if (realityText) {
          prCard.style.display = "block";
          const lpc = document.getElementById("lead-pr-claim");
          if (lpc) lpc.innerText = claimText ? `"${claimText}"` : '"Official Corporate Statement"';
          const lpr = document.getElementById("lead-pr-reality");
          if (lpr) lpr.innerText = realityText;
        } else {
          prCard.style.display = "none";
        }
      }

      const duelContainer = document.querySelector(".duel-container");
      const duelWrap = duelContainer ? duelContainer.parentElement : null;
      const bullText = ls.bull_take;
      const bearText = ls.bear_take;
      if (duelWrap) {
        if (bullText || bearText) {
          duelWrap.style.display = "block";
          const lbu = document.getElementById("lead-bull");
          if (lbu) lbu.innerText = bullText || "Strong compute adoption.";
          const lbe = document.getElementById("lead-bear");
          if (lbe) lbe.innerText = bearText || "Hardware bottlenecks remain.";
        } else {
          duelWrap.style.display = "none";
        }
      }

      const lwm = document.getElementById("lead-why-matters");
      if (lwm) lwm.innerHTML = ls.why_it_matters ? `<b>Why it matters:</b> ${this.formatMarkdown(ls.why_it_matters)}` : "";
      
      const flexCard = document.querySelector(".cocktail-flex-card");
      if (flexCard) {
        if (ls.cocktail_flex) {
          flexCard.style.display = "block";
          const lck = document.getElementById("lead-cocktail");
          if (lck) lck.innerText = `"${ls.cocktail_flex}"`;
        } else {
          flexCard.style.display = "none";
        }
      }

      const lim = document.getElementById("lead-image");
      if (lim) {
        const frame = lim.parentElement;
        if (ls.image_url) {
          lim.onload = () => { if (frame) frame.style.display = "block"; };
          lim.onerror = () => { if (frame) frame.style.display = "none"; };
          lim.src = ls.image_url;
        } else {
          if (frame) frame.style.display = "none";
        }
      }
    }

    // Quick Hits
    const qhContainer = document.getElementById("quick-hits-container");
    if (qhContainer && data.quick_hits) {
      qhContainer.innerHTML = data.quick_hits.map((item, idx) => `
        <div style="border-bottom: 1px solid var(--border-subtle); padding-bottom: 16px; margin-bottom: 16px;">
          <h3 style="font-size: 16px; font-weight: 800; color: var(--accent-cyan); margin-bottom: 6px;">${idx + 1}. ${item.headline}</h3>
          <p style="font-size: 13px; color: #d4d4d4; margin-bottom: 6px;"><b>Facts:</b> ${this.formatMarkdown(item.facts)}<br><b>The Savage Audit:</b> ${item.reality_audit}</p>
          <div style="font-size: 12.5px; color: var(--accent-emerald); font-weight: 700;"><b>Why it matters:</b> ${item.why_it_matters} <span style="color: var(--text-muted); font-size: 11px;">(SNI: ${item.sni})</span></div>
        </div>
      `).join("");
    }

    // SECTION 3: DEEP DIVE / DETAILED CASE STUDY ANALYSIS
    const ddModule = document.getElementById("deep-dive-module");
    if (ddModule) {
      if (data.deep_dive) {
        ddModule.style.display = "block";
        const dd = data.deep_dive;
        
        const dk = document.getElementById("deepdive-kicker");
        if (dk) dk.innerText = dd.kicker || "SECTION 3 // DETAILED CASE STUDY ANALYSIS";
        
        const dh = document.getElementById("deepdive-headline");
        if (dh) dh.innerText = dd.headline || "Technical Case Study Analysis";
        
        const dt = document.getElementById("deepdive-thesis");
        if (dt) dt.innerHTML = this.formatMarkdown(dd.thesis || "");
        
        const dp = document.getElementById("deepdive-physics");
        if (dp) {
          if (dd.physics_breakdown) {
            dp.style.display = "block";
            dp.innerHTML = `<b>Technical Physics Breakdown:</b> ${this.formatMarkdown(dd.physics_breakdown)}`;
          } else {
            dp.style.display = "none";
          }
        }
        
        // 3D Matrix Table
        if (dd.matrix) {
          const mm = document.getElementById("matrix-mechanism");
          if (mm) mm.innerHTML = this.formatMarkdown(dd.matrix.mechanism || "—");
          const ma = document.getElementById("matrix-audit");
          if (ma) ma.innerHTML = this.formatMarkdown(dd.matrix.audit || "—");
          const mc = document.getElementById("matrix-cascades");
          if (mc) mc.innerHTML = this.formatMarkdown(dd.matrix.cascades || "—");
          const ms = document.getElementById("matrix-sni");
          if (ms) ms.innerText = dd.matrix.sni || "9.8 / 10";
        }
        
        // Strategic Takeaway
        const df = document.getElementById("deepdive-flex");
        if (df && dd.takeaway) {
          df.innerText = `"${dd.takeaway}"`;
        }
      } else {
        ddModule.style.display = "none";
      }
    }

    // Executive Wager
    if (data.executive_wager) {
      const wq = document.getElementById("wager-question-text");
      if (wq) wq.innerText = data.executive_wager.question;
      const wy = document.getElementById("wager-yes-label");
      if (wy) wy.innerText = `[ YES ] (${data.executive_wager.consensus_yes_pct}% Consensus)`;
      const wn = document.getElementById("wager-no-label");
      if (wn) wn.innerText = `[ NO ] (${data.executive_wager.consensus_no_pct}% Consensus)`;
    }

    // Micro-Quiz
    const quizContainer = document.getElementById("quiz-items-container");
    if (quizContainer && data.micro_quiz) {
      quizContainer.innerHTML = data.micro_quiz.map((q, qIdx) => `
        <div class="quiz-card-row">
          <div class="quiz-prompt">${qIdx + 1}. ${q.question}</div>
          <div class="quiz-options-list">
            ${q.options.map((opt, oIdx) => `
              <div class="quiz-choice-item" onclick="spark.handleQuizAnswer(${q.id}, this, ${oIdx === q.correct_index})">${opt}</div>
            `).join("")}
          </div>
        </div>
      `).join("");
    }

    // Easter Egg
    if (data.easter_egg) {
      const ee = document.getElementById("secret-text-block");
      if (ee) ee.innerText = data.easter_egg;
    }

    // Reset interactions
    this.wagerPlaced = false;
    this.answeredQuestions = {};
    this.easterUnlocked = false;

    const fb = document.getElementById("wager-response-feedback");
    if (fb) fb.style.display = "none";
    const yc = document.getElementById("wager-card-yes");
    if (yc) yc.classList.remove("is-green");
    const nc = document.getElementById("wager-card-no");
    if (nc) nc.classList.remove("is-green");

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  handleWager(choice) {
    const yesCard = document.getElementById("wager-card-yes");
    const noCard = document.getElementById("wager-card-no");
    const feedback = document.getElementById("wager-response-feedback");

    if (yesCard) yesCard.classList.remove("is-green");
    if (noCard) noCard.classList.remove("is-green");

    if (choice === 'yes' && yesCard) {
      yesCard.classList.add("is-green");
      if (feedback) {
        feedback.innerHTML = "✅ Wager Confirmed: <b>YES</b>. Recorded in emerald green.";
        feedback.style.display = "block";
      }
    } else if (choice === 'no' && noCard) {
      noCard.classList.add("is-green");
      if (feedback) {
        feedback.innerHTML = "✅ Wager Confirmed: <b>NO</b>. Recorded in emerald green.";
        feedback.style.display = "block";
      }
    }

    if (!this.wagerPlaced) {
      this.wagerPlaced = true;
      this.awardXP(100, "Executive Wager Committed");
    }
  }

  unlockSecret() {
    if (!this.easterUnlocked) {
      this.easterUnlocked = true;
      const textEl = document.getElementById("secret-text-block");
      const btn = document.getElementById("btn-reveal-secret");
      if (textEl) textEl.style.display = "block";
      if (btn) btn.innerText = "Secret Unveiled ✅";
      this.awardXP(50, "Buried Easter Egg Discovered");
    }
  }

  handleQuizAnswer(qId, choiceEl, isCorrect) {
    if (this.answeredQuestions[qId]) return;
    this.answeredQuestions[qId] = true;

    const parent = choiceEl.parentElement;
    const allOptions = parent.querySelectorAll('.quiz-choice-item');

    if (isCorrect) {
      choiceEl.classList.add('correct-pick');
      this.awardXP(40, "Question Correct");
    } else {
      choiceEl.classList.add('incorrect-pick');
      this.showToast("Incorrect answer selected", "amber");
      allOptions.forEach(opt => {
        if (opt.innerText.includes("B)") || opt.innerText.includes("13.0") || opt.innerText.includes("2.88") || opt.innerText.includes("September 30") || opt.innerText.includes("70% to 82%")) {
          opt.classList.add('correct-pick');
        }
      });
    }
  }

  saveState() {
    try { localStorage.setItem("spark_xp", this.xp); } catch(e) {}
  }
  loadState() {
    try {
      const savedXP = localStorage.getItem("spark_xp");
      if (savedXP) {
        this.xp = parseInt(savedXP, 10) || 100;
        const hudEl = document.getElementById("hud-xp-tracker");
        if (hudEl) hudEl.innerText = `⭐ ${this.xp.toLocaleString()} XP [LVL 1]`;
      }
    } catch(e) {}
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.spark = new SparkPortalEngine();
});
