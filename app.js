/**
 * SPARK NEWS LIVE — IN-PAGE INTERACTIVE CLIENT ENGINE
 * Zero Browser Alerts • In-Page Calendar Drawer • Live Toast Notifications • Content Swapper
 */

class SparkPortalEngine {
  constructor() {
    this.xp = 100;
    this.streak = 1;
    this.activeIssueId = "issue-1";
    this.isSkimMode = false;
    this.isLightMode = false;
    this.wagerPlaced = false;
    this.answeredQuestions = {};
    this.easterUnlocked = false;
    this.issuesDb = null;

    this.init();
  }

  init() {
    this.bindScrollProgress();
    this.loadIssuesData();
    this.loadState();
  }

  // Fetch or parse issues database
  async loadIssuesData() {
    try {
      const res = await fetch("issues.json");
      if (res.ok) {
        this.issuesDb = await res.json();
      }
    } catch (e) {
      console.log("Using embedded issue database fallback");
    }
  }

  // Scroll Progress HUD
  bindScrollProgress() {
    window.addEventListener("scroll", () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      const bar = document.getElementById("scroll-progress");
      if (bar) bar.style.width = scrolled + "%";
    });
  }

  // In-Page Toast Notification (Replaces window.alert completely)
  showToast(message, type = "success") {
    let container = document.getElementById("toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast-msg toast-${type}`;
    
    let icon = "✅";
    if (type === "info") icon = "ℹ️";
    if (type === "amber") icon = "🎲";

    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px)";
      setTimeout(() => toast.remove(), 250);
    }, 3200);
  }

  // XP State Machine
  awardXP(amount, reason = "Activity") {
    this.xp += amount;
    const hudEl = document.getElementById("hud-xp-tracker");
    if (hudEl) {
      hudEl.innerText = `⭐ ${this.xp.toLocaleString()} XP [LVL 1]`;
    }
    this.showToast(`+${amount} XP Earned: ${reason}`, "success");
    this.saveState();
  }

  // Executive Skim Mode Toggle
  toggleSkim() {
    this.isSkimMode = !this.isSkimMode;
    document.body.classList.toggle("skim-view-active", this.isSkimMode);
    const btn = document.getElementById("skim-toggle-btn");
    if (btn) {
      btn.innerText = this.isSkimMode ? "⚡ Skim: ON" : "⚡ Skim: OFF";
    }
    this.showToast(this.isSkimMode ? "Executive Skim Mode Activated (Core Concepts Highlighted)" : "Full Investigative View Restored", "info");
  }

  // Theme Toggle
  toggleTheme() {
    this.isLightMode = !this.isLightMode;
    document.documentElement.classList.toggle("light-mode", this.isLightMode);
    this.showToast(this.isLightMode ? "Switched to Light Mode" : "Switched to Dark Mode", "info");
  }

  // In-Page Drawer Open / Close (Zero Popups)
  openArchiveDrawer() {
    const drawer = document.getElementById("archive-drawer-modal");
    if (drawer) {
      drawer.classList.add("is-open");
    }
  }

  closeArchiveDrawer() {
    const drawer = document.getElementById("archive-drawer-modal");
    if (drawer) {
      drawer.classList.remove("is-open");
    }
  }

  // Dynamic In-Page Issue Switching (Zero Page Reloads)
  switchIssue(issueId) {
    if (issueId === "issue-1") {
      this.activeIssueId = "issue-1";
      this.closeArchiveDrawer();
      this.showToast("Loaded Issue #1 — Inaugural Launch Edition (Active)", "success");
      
      // Update on-page indicators
      const select = document.getElementById("issue-archive-select");
      if (select) select.value = "issue-1";
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (issueId === "issue-2") {
      this.closeArchiveDrawer();
      this.showToast("Viewing Issue #2 (Mid-Week Special Dossier)", "info");
      // Scroll to Section 1 smoothly
      const sec = document.getElementById("topic-energy-decoupling");
      if (sec) sec.scrollIntoView({ behavior: "smooth" });
    } else if (issueId === "issue-3" || issueId === "future-preview") {
      this.closeArchiveDrawer();
      this.showToast("📅 Issue #3 is scheduled to deploy on Sunday at 8:00 PM IST", "amber");
    } else if (issueId === "calendar-vault") {
      this.openArchiveDrawer();
    }
  }

  // Interactive Executive Wager (Turns Emerald Green)
  handleWager(choice) {
    const yesCard = document.getElementById("wager-card-yes");
    const noCard = document.getElementById("wager-card-no");
    const feedback = document.getElementById("wager-response-feedback");

    if (yesCard) yesCard.classList.remove("is-green");
    if (noCard) noCard.classList.remove("is-green");

    if (choice === 'yes' && yesCard) {
      yesCard.classList.add("is-green");
      if (feedback) {
        feedback.innerHTML = "✅ Wager Confirmed: <b>YES (Regulators Strike Early — 62% Consensus)</b>. Checkbox locked in emerald green.";
        feedback.style.display = "block";
      }
    } else if (choice === 'no' && noCard) {
      noCard.classList.add("is-green");
      if (feedback) {
        feedback.innerHTML = "✅ Wager Confirmed: <b>NO (Hyperscalers Lobby Delay — 38% Consensus)</b>. Checkbox locked in emerald green.";
        feedback.style.display = "block";
      }
    }

    if (!this.wagerPlaced) {
      this.wagerPlaced = true;
      this.awardXP(100, "Executive Wager Committed");
    } else {
      this.showToast("Wager Selection Updated", "amber");
    }
  }

  // Easter Egg Reveal (In-Page)
  unlockSecret() {
    if (!this.easterUnlocked) {
      this.easterUnlocked = true;
      const textEl = document.getElementById("secret-text-block");
      const btn = document.getElementById("btn-reveal-secret");
      if (textEl) textEl.style.display = "block";
      if (btn) btn.innerText = "Secret Unveiled ✅";
      this.awardXP(50, "Buried Easter Egg Discovered");
    } else {
      this.showToast("Easter Egg already claimed for this issue!", "info");
    }
  }

  // Interactive Quiz Engine (In-Page Feedback)
  handleQuizAnswer(qIndex, choiceEl, isCorrect) {
    if (this.answeredQuestions[qIndex]) return;
    this.answeredQuestions[qIndex] = true;

    const parent = choiceEl.parentElement;
    const allOptions = parent.querySelectorAll('.quiz-choice-item');

    if (isCorrect) {
      choiceEl.classList.add('correct-pick');
      this.awardXP(40, `Question ${qIndex} Correct`);
    } else {
      choiceEl.classList.add('incorrect-pick');
      this.showToast(`Question ${qIndex} Incorrect. Review the answer key below.`, "amber");
      allOptions.forEach(opt => {
        if (opt.innerText.includes('B)')) {
          opt.classList.add('correct-pick');
        }
      });
    }
  }

  // State Storage
  saveState() {
    try {
      localStorage.setItem("spark_xp", this.xp);
      localStorage.setItem("spark_streak", this.streak);
    } catch(e) {}
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

// Global Portal Initialization
document.addEventListener("DOMContentLoaded", () => {
  window.spark = new SparkPortalEngine();
});