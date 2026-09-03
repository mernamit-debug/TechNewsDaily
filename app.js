/**
 * SPARK NEWS LIVE — PRODUCTION CLIENT-SIDE ENGINE
 * Modular state management for Reading Mode, Interactive Wager, Quizzes, and Future Archive Navigation.
 */

class SparkPortalEngine {
  constructor() {
    this.xp = 100;
    this.streak = 1;
    this.currentIssue = "issue-1";
    this.isSkimMode = false;
    this.isLightMode = false;
    this.wagerPlaced = false;
    this.answeredQuestions = {};
    this.easterUnlocked = false;

    this.init();
  }

  init() {
    this.bindScrollProgress();
    this.loadState();
  }

  // Scroll Progress HUD
  bindScrollProgress() {
    window.addEventListener("scroll", () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      const progressBar = document.getElementById("scroll-progress");
      if (progressBar) {
        progressBar.style.width = scrolled + "%";
      }
    });
  }

  // XP State Machine
  awardXP(amount) {
    this.xp += amount;
    const hudEl = document.getElementById("hud-xp-tracker");
    if (hudEl) {
      hudEl.innerText = `⭐ ${this.xp.toLocaleString()} XP [LVL 1]`;
    }
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
  }

  // Theme Toggle (Dark / Light)
  toggleTheme() {
    this.isLightMode = !this.isLightMode;
    document.documentElement.classList.toggle("light-mode", this.isLightMode);
  }

  // Interactive Wager (Checkbox turns emerald green on click)
  handleWager(choice) {
    const yesCard = document.getElementById("wager-card-yes");
    const noCard = document.getElementById("wager-card-no");
    const feedback = document.getElementById("wager-response-feedback");

    if (yesCard) yesCard.classList.remove("is-green");
    if (noCard) noCard.classList.remove("is-green");

    if (choice === 'yes' && yesCard) {
      yesCard.classList.add("is-green");
      if (feedback) {
        feedback.innerHTML = "✅ Wager Confirmed: <b>YES (Regulators Strike Early — 62% Consensus)</b>. Checkbox locked in emerald green. (+100 XP awarded!)";
        feedback.style.display = "block";
      }
    } else if (choice === 'no' && noCard) {
      noCard.classList.add("is-green");
      if (feedback) {
        feedback.innerHTML = "✅ Wager Confirmed: <b>NO (Hyperscalers Lobby Delay — 38% Consensus)</b>. Checkbox locked in emerald green. (+100 XP awarded!)";
        feedback.style.display = "block";
      }
    }

    if (!this.wagerPlaced) {
      this.wagerPlaced = true;
      this.awardXP(100);
    }
  }

  // Easter Egg Reveal
  unlockSecret() {
    if (!this.easterUnlocked) {
      this.easterUnlocked = true;
      const textEl = document.getElementById("secret-text-block");
      const btn = document.getElementById("btn-reveal-secret");
      if (textEl) textEl.style.display = "block";
      if (btn) btn.innerText = "Secret Unveiled ✅";
      this.awardXP(50);
    }
  }

  // Interactive Quiz Engine
  handleQuizAnswer(qIndex, choiceEl, isCorrect) {
    if (this.answeredQuestions[qIndex]) return;
    this.answeredQuestions[qIndex] = true;

    const parent = choiceEl.parentElement;
    const allOptions = parent.querySelectorAll('.quiz-choice-item');

    if (isCorrect) {
      choiceEl.classList.add('correct-pick');
      this.awardXP(40);
    } else {
      choiceEl.classList.add('incorrect-pick');
      allOptions.forEach(opt => {
        if (opt.innerText.includes('B)')) {
          opt.classList.add('correct-pick');
        }
      });
    }
  }

  // Archive & Calendar Navigator (Future-proof routing)
  switchIssue(issueKey) {
    if (issueKey === 'issue-1') {
      alert("Viewing Issue #1 (Inaugural Launch Edition). All modules active.");
    } else if (issueKey === 'future-preview') {
      alert("📅 Issue #2 is scheduled for automatic compilation on Sunday at 8:00 PM IST. The system will index it here automatically.");
    } else if (issueKey === 'calendar-vault') {
      alert("🏛️ Historical Calendar Vault: All future editions are dynamically logged into your Master Issue Index.");
    }
  }

  // State Persistence
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

// Global initialization
document.addEventListener("DOMContentLoaded", () => {
  window.spark = new SparkPortalEngine();
});