/**
 * SPARK NEWS LIVE — HEADLESS DYNAMIC RENDERING ENGINE
 * Loads JSON data from /data/issues/ and renders the full interactive portal.
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
    this.showToast(this.isLightMode ? "Light Theme" : "Dark Theme", "info");
  }

  openArchiveDrawer() {
    const drawer = document.getElementById("archive-drawer-modal");
    if (drawer) drawer.classList.add("is-open");
  }

  closeArchiveDrawer() {
    const drawer = document.getElementById("archive-drawer-modal");
    if (drawer) drawer.classList.remove("is-open");
  }

  // Load Manifest from data/manifest.json
  async loadManifest() {
    try {
      const res = await fetch("data/manifest.json");
      if (res.ok) {
        this.manifest = await res.json();
        this.renderManifestUI();
        if (this.manifest.length > 0) {
          const latest = this.manifest[this.manifest.length - 1];
          await this.loadIssueFile(latest.file_path);
        }
      }
    } catch (e) {
      console.warn("Manifest load error. Loading fallback.", e);
    }
  }

  renderManifestUI() {
    const select = document.getElementById("issue-archive-select");
    const modalList = document.getElementById("modal-issues-list");
    if (!select || !modalList) return;

    select.innerHTML = "";
    modalList.innerHTML = "";

    this.manifest.slice().reverse().forEach((item, idx) => {
      // Dropdown option
      const opt = document.createElement("option");
      opt.value = item.file_path;
      opt.innerText = `Issue #${item.issue_number} — ${item.date} (${idx === 0 ? "Latest" : "Archived"})`;
      select.appendChild(opt);

      // Modal card
      const card = document.createElement("div");
      card.className = `issue-item-card ${idx === 0 ? "is-active-issue" : ""}`;
      card.onclick = () => {
        this.loadIssueFile(item.file_path);
        this.closeArchiveDrawer();
        select.value = item.file_path;
      };
      card.innerHTML = `
        <div class="issue-card-left">
          <div class="issue-card-title">Issue #${item.issue_number} — ${item.date}</div>
          <div class="issue-card-meta">${item.headline}</div>
        </div>
        <span class="issue-card-badge" style="background: rgba(0, 229, 153, 0.15); color: var(--accent-emerald); border: 1px solid var(--accent-emerald);">
          ${idx === 0 ? "LATEST ✅" : "ARCHIVED 📁"}
        </span>
      `;
      modalList.appendChild(card);
    });
  }

  // Load Issue JSON file dynamically
  async loadIssueFile(filePath) {
    try {
      const res = await fetch(filePath);
      if (res.ok) {
        const data = await res.json();
        this.currentIssueData = data;
        this.renderIssueDOM(data);
        this.showToast(`Loaded Issue #${data.meta.issue_number} (${data.meta.date})`, "success");
      }
    } catch (e) {
      console.error("Error loading issue file", e);
    }
  }

  formatMarkdown(text) {
    if (!text) return "";
    return text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
  }

  // Dynamically inject JSON into DOM
  renderIssueDOM(data) {
    // Header & Meta
    document.getElementById("issue-header-kicker").innerText = `DAILY INTELLIGENCE // ISSUE #${data.meta.issue_number}`;
    document.getElementById("issue-header-title").innerText = data.lead_story.headline || "DAILY INVESTIGATIVE NEWS DIGEST";
    document.getElementById("issue-header-date").innerText = `VOLUME IV • ${data.meta.date} • ISSUE #${data.meta.issue_number}`;
    document.getElementById("streak-badge").innerText = `🔥 STREAK: DAY ${data.meta.reading_streak}`;

    // KPIs
    if (data.radar_kpis) {
      document.getElementById("kpi-nuclear").innerText = data.radar_kpis.baseload_nuclear || "—";
      document.getElementById("kpi-leadtime").innerText = data.radar_kpis.transformer_lead_time || "—";
      document.getElementById("kpi-bandwidth").innerText = data.radar_kpis.optical_bandwidth || "—";
      document.getElementById("kpi-pue").innerText = data.radar_kpis.target_pue || "—";
      document.getElementById("kpi-sni").innerText = data.radar_kpis.sni_rating || "—";
    }

    // Cheat Sheet
    const cheatUl = document.getElementById("cheat-list-container");
    if (cheatUl && data.cheat_sheet) {
      cheatUl.innerHTML = data.cheat_sheet.map(item => `<li>${this.formatMarkdown(item)}</li>`).join("");
    }

    // Lead Story
    if (data.lead_story) {
      const ls = data.lead_story;
      document.getElementById("lead-kicker").innerText = ls.kicker || "LEAD STORY";
      document.getElementById("lead-headline").innerText = ls.headline || "";
      document.getElementById("lead-catchup").innerHTML = this.formatMarkdown(ls.catch_up || "");
      document.getElementById("lead-analogy").innerHTML = `<b>The Intuitive Bridge:</b> ${ls.analogy || ""}`;
      document.getElementById("lead-pr-claim").innerText = `"${ls.pr_claim || ""}"`;
      document.getElementById("lead-pr-reality").innerText = ls.pr_reality || "";
      document.getElementById("lead-bull").innerText = ls.bull_take || "";
      document.getElementById("lead-bear").innerText = ls.bear_take || "";
      document.getElementById("lead-why-matters").innerHTML = `<b>Why it matters:</b> ${ls.why_it_matters || ""}`;
      document.getElementById("lead-cocktail").innerText = `"${ls.cocktail_flex || ""}"`;
      if (ls.image_url) {
        document.getElementById("lead-image").src = ls.image_url;
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

    // Executive Wager
    if (data.executive_wager) {
      document.getElementById("wager-question-text").innerText = data.executive_wager.question;
      document.getElementById("wager-yes-label").innerText = `[ YES ] (${data.executive_wager.consensus_yes_pct}% Consensus)`;
      document.getElementById("wager-no-label").innerText = `[ NO ] (${data.executive_wager.consensus_no_pct}% Consensus)`;
    }

    // Micro Quiz
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
      document.getElementById("secret-text-block").innerText = data.easter_egg;
    }

    this.wagerPlaced = false;
    this.answeredQuestions = {};
    this.easterUnlocked = false;
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
        if (opt.innerText.includes("B)") || opt.innerText.includes("13.0") || opt.innerText.includes("2.88")) {
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
