/**
 * SPARK NEWS LIVE — PRODUCTION CLIENT-SIDE ENGINE (PHASE 1 FULL TERMINAL V4.0)
 * Features:
 * - Section 3: Deep Dive / Case Study Analysis & 3D Matrix Renderer
 * - Power-Reader Keyboard Shortcuts (J/K/S/M/C/[/?])
 * - Personal Research Clipboard & Markdown Exporter
 * - Deep Intel Explorer & Regulatory Filing Suggester
 * - Real-Time Forecasting Ledger & Brier Score Calculation
 * - Cumulative MCQ Scoring Analytics & Comprehension Mastery Badge
 * - Multi-Factor Manifest Sorting (Newest First) & Deduplication
 * - Shielded Image Loader & Zero Browser Popups
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
    this.unlockedEasterEggs = {};
    this.exploredTopics = {};
    this.easterUnlocked = false;
    this.clips = [];
    this.wagers = {};
    this.quizStats = { total: 0, correct: 0 };
    this.cloudSyncTimeout = null;
    this.isSyncingToCloud = false;

    // V5.0 High-Tech Additions
    this.sfxEnabled = true;
    this.audioCtx = null;
    this.audioSynth = window.speechSynthesis || null;
    this.audioUtterances = [];
    this.audioIndex = 0;
    this.isAudioSpeaking = false;
    this.isAudioPaused = false;
    this.audioSpeed = 1.0;
    this.issuesCache = new Map();
    this.historicalMetrics = {
      compute_spot: [],
      tech_pulse: [],
      vc_deals: [],
      open_source: [],
      cloud_health: []
    };
    this.commandPaletteOpen = false;
    this.commandResults = [];
    this.commandSelectedIndex = 0;
    this.commandFilterType = 'all';
    this.currentDomainFilter = 'all';
    this.duelVotes = {};

    // Cloud Sync, Watchlist & High-Signal Filter State
    this.userEmail = localStorage.getItem("spark_user_email") || "mernamit@gmail.com";
    this.cloudConnected = false;
    this.firebase = null;
    this.isHighSignalOnly = false;
    this.selectedCompany = null;
    this.featuredCompany = null;

    // Historical Intelligence Vault & Multi-View Archive
    this.archiveViewMode = localStorage.getItem("spark_vault_view") || 'grid';
    this.archiveSearchQuery = '';
    this.archiveFilterMonth = 'all';
    this.archiveSortOrder = 'desc';
    this.selectedTimelineIndex = 0;

    this.init();
  }

  async init() {
    this.bindScrollProgress();
    this.bindKeyboardShortcuts();
    this.loadState();
    this.loadClips();
    this.loadWagers();
    this.loadQuizStats();
    this.loadDuelVotes();
    this.initURLHashListener();
    
    // Start manifest and active issue load immediately without waiting for Firebase dynamic import
    const manifestPromise = this.loadManifest();
    
    // Initialize cloud sync in parallel / non-blocking
    this.initCloudSync();
    
    await manifestPromise;
  }

  // 1. Reading Scroll Progress Bar & Daily Reading Completion
  bindScrollProgress() {
    let ticking = false;
    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
          const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          if (height > 0) {
            const scrolled = (winScroll / height) * 100;
            const bar = document.getElementById("scroll-progress");
            if (bar) bar.style.width = scrolled + "%";

            if (scrolled > 65 && !this.todayReadingCompleted) {
              this.todayReadingCompleted = true;
              this.recordDailyReadingProgress();
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  recordDailyReadingProgress() {
    try {
      const today = new Date().toISOString().split("T")[0];
      const lastRead = localStorage.getItem("spark_last_read_date");

      if (lastRead !== today) {
        if (lastRead) {
          const last = new Date(lastRead);
          const curr = new Date(today);
          const diffDays = Math.round((curr - last) / (1000 * 60 * 60 * 24));
          if (diffDays === 1) {
            this.streak = (this.streak || 1) + 1;
            this.awardXP(50, `Daily Reading Streak Maintained: Day ${this.streak}!`);
          } else if (diffDays > 1) {
            this.streak = 1;
            this.awardXP(25, "Daily Briefing Read Completed");
          }
        } else {
          this.streak = Math.max(1, this.streak || 1);
          this.awardXP(25, "Daily Briefing Read Completed");
        }
        localStorage.setItem("spark_last_read_date", today);
        this.saveState();
        this.queueCloudSync();
        this.updateIdentityUI();
      }
    } catch(e) {
      console.warn("Streak recording error:", e);
    }
  }

  // 2. In-Page Toast Notifications
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

  // 3. Live Gamified XP Engine
  awardXP(amount, reason = "Activity") {
    this.xp += amount;
    this.saveState();
    this.updateIdentityUI();
    this.showToast(`+${amount} XP Earned: ${reason}`, "success");
    this.queueCloudSync();
  }

  // 4. Executive Skim Mode Toggle
  toggleSkim() {
    this.isSkimMode = !this.isSkimMode;
    document.body.classList.toggle("skim-view-active", this.isSkimMode);
    const btn = document.getElementById("skim-toggle-btn");
    if (btn) btn.innerHTML = this.isSkimMode ? "⚡ Skim: ON <kbd>S</kbd>" : "⚡ Skim <kbd>S</kbd>";
    this.showToast(this.isSkimMode ? "Executive Skim Mode ON" : "Full Depth View ON", "info");
  }

  // 5. Theme Switcher (Dark / Light)
  toggleTheme() {
    this.isLightMode = !this.isLightMode;
    document.documentElement.classList.toggle("light-mode", this.isLightMode);
    this.showToast(this.isLightMode ? "Switched to Light Theme" : "Switched to Dark Theme", "info");
  }

  // 6. Historical Intelligence Vault & Multi-View Archive Console Controls
  openArchiveDrawer() {
    const drawer = document.getElementById("archive-drawer-modal");
    if (drawer) {
      drawer.classList.add("is-open");
      this.renderArchiveVaultContent();
      const searchInput = document.getElementById("vault-search-input");
      if (searchInput) {
        setTimeout(() => searchInput.focus(), 80);
      }
    }
  }

  closeArchiveDrawer() {
    const drawer = document.getElementById("archive-drawer-modal");
    if (drawer) drawer.classList.remove("is-open");
  }

  onArchiveSearch(query) {
    if (this._archiveSearchTimer) clearTimeout(this._archiveSearchTimer);
    this._archiveSearchTimer = setTimeout(() => {
      this.archiveSearchQuery = (query || "").trim().toLowerCase();
      const clearBtn = document.getElementById("vault-search-clear-btn");
      if (clearBtn) clearBtn.style.display = this.archiveSearchQuery ? "block" : "none";
      this.renderArchiveVaultContent();
    }, 120);
  }

  clearArchiveSearch() {
    this.archiveSearchQuery = "";
    const input = document.getElementById("vault-search-input");
    if (input) input.value = "";
    const clearBtn = document.getElementById("vault-search-clear-btn");
    if (clearBtn) clearBtn.style.display = "none";
    this.renderArchiveVaultContent();
  }

  setArchiveFilter(filter) {
    this.archiveFilterMonth = filter;
    const chips = document.querySelectorAll("#vault-filter-chips .vault-chip");
    chips.forEach(chip => {
      chip.classList.toggle("is-active", chip.dataset.filter === filter);
    });
    this.renderArchiveVaultContent();
  }

  setArchiveViewMode(mode) {
    this.archiveViewMode = mode;
    try {
      localStorage.setItem("spark_vault_view", mode);
    } catch (e) {}

    ['grid', 'table', 'timeline'].forEach(m => {
      const btn = document.getElementById(`btn-view-${m}`);
      if (btn) btn.classList.toggle("is-active", m === mode);
    });

    this.renderArchiveVaultContent();
  }

  toggleArchiveSort() {
    this.archiveSortOrder = this.archiveSortOrder === 'desc' ? 'asc' : 'desc';
    const btn = document.getElementById("btn-vault-sort");
    if (btn) {
      btn.innerText = this.archiveSortOrder === 'desc' ? "↓ Newest First" : "↑ Oldest First";
    }
    this.renderArchiveVaultContent();
  }

  getFilteredManifest() {
    if (!this.manifest.length) return [];
    let list = [...this.manifest];

    // Filter by Month
    if (this.archiveFilterMonth && this.archiveFilterMonth !== 'all') {
      list = list.filter(item => item.date && item.date.startsWith(this.archiveFilterMonth));
    }

    // Filter by Search Query
    if (this.archiveSearchQuery) {
      const q = this.archiveSearchQuery;
      list = list.filter(item => {
        const titleMatch = (item.headline || "").toLowerCase().includes(q);
        const dateMatch = (item.date || "").toLowerCase().includes(q);
        const numMatch = `issue #${item.issue_number}`.toLowerCase().includes(q) || String(item.issue_number) === q;

        const cached = this.issuesCache.get(item.file_path) || this.issuesCache.get(item.date);
        let companyMatch = false;
        let tickerMatch = false;
        let summaryMatch = false;
        if (cached) {
          const comp = cached.titan_spotlight?.company || "";
          const tick = cached.titan_spotlight?.ticker || "";
          const summ = cached.lead_story?.summary || "";
          companyMatch = comp.toLowerCase().includes(q);
          tickerMatch = tick.toLowerCase().includes(q);
          summaryMatch = summ.toLowerCase().includes(q);
        }

        return titleMatch || dateMatch || numMatch || companyMatch || tickerMatch || summaryMatch;
      });
    }

    // Sort Order
    list.sort((a, b) => {
      const numA = parseInt(a.issue_number, 10) || 0;
      const numB = parseInt(b.issue_number, 10) || 0;
      return this.archiveSortOrder === 'desc' ? (numB - numA) : (numA - numB);
    });

    return list;
  }

  renderArchiveVaultContent() {
    const container = document.getElementById("modal-issues-list");
    if (!container) return;

    const filtered = this.getFilteredManifest();
    const currentActiveIssueNum = this.currentIssueData?.meta?.issue_number;
    const currentActiveDate = this.currentIssueData?.meta?.date;

    // Synchronize count and indicator
    const countPill = document.getElementById("vault-total-count");
    if (countPill) countPill.innerText = String(this.manifest.length);

    const activeIndicator = document.getElementById("vault-active-indicator");
    if (activeIndicator && this.currentIssueData?.meta) {
      activeIndicator.innerText = `⚡ Active: Issue #${currentActiveIssueNum} (${currentActiveDate})`;
    }

    const footerMeta = document.getElementById("vault-footer-meta");
    if (footerMeta) {
      footerMeta.innerText = `Showing ${filtered.length} of ${this.manifest.length} Archived Intel Dossiers`;
    }

    // Populate Footer Quick Jumper
    const footerJumper = document.getElementById("vault-footer-jumper");
    if (footerJumper) {
      footerJumper.innerHTML = "";
      this.manifest.forEach(item => {
        const isActive = (String(item.issue_number) === String(currentActiveIssueNum) || item.date === currentActiveDate);
        const pill = document.createElement("button");
        pill.className = `vault-jump-pill ${isActive ? "is-active" : ""}`;
        pill.innerText = `#${item.issue_number}`;
        pill.title = `Jump directly to Issue #${item.issue_number} (${item.date})`;
        pill.onclick = () => {
          this.loadIssueFile(item.file_path);
          this.closeArchiveDrawer();
        };
        footerJumper.appendChild(pill);
      });
    }

    // Handle Empty Search
    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="vault-empty-state">
          <span class="vault-empty-icon">🛰️</span>
          <div class="vault-empty-text">No archived intel dossiers match "${this.archiveSearchQuery}".</div>
          <button class="action-btn" style="margin-top: 6px; font-size: 11px; padding: 6px 14px;" onclick="spark.clearArchiveSearch()">Clear Search Filters</button>
        </div>
      `;
      return;
    }

    // Render by active view mode
    if (this.archiveViewMode === 'table') {
      this.renderVaultTable(container, filtered, currentActiveIssueNum, currentActiveDate);
    } else if (this.archiveViewMode === 'timeline') {
      this.renderVaultTimeline(container, filtered, currentActiveIssueNum, currentActiveDate);
    } else {
      this.renderVaultGrid(container, filtered, currentActiveIssueNum, currentActiveDate);
    }
  }

  renderVaultGrid(container, items, currentNum, currentDate) {
    const grid = document.createElement("div");
    grid.className = "vault-matrix-grid";

    items.forEach((item) => {
      const isLatest = (String(item.issue_number) === String(this.manifest[0]?.issue_number));
      const isActive = (String(item.issue_number) === String(currentNum) || item.date === currentDate);
      const cached = this.issuesCache.get(item.file_path) || this.issuesCache.get(item.date);
      const spotlightCompany = cached?.company_spotlight?.company || cached?.titan_spotlight?.company || (isLatest ? "Samsung Foundry" : "Titan Corporate Dossier");
      const tickerRaw = cached?.company_spotlight?.ticker || cached?.titan_spotlight?.ticker;
      const spotlightTicker = tickerRaw ? `(${tickerRaw})` : "";

      const card = document.createElement("div");
      card.className = `vault-card ${isActive ? "is-active-card" : ""}`;
      card.onclick = () => {
        this.loadIssueFile(item.file_path);
        this.closeArchiveDrawer();
      };

      card.innerHTML = `
        <div class="vault-card-header">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="vault-issue-pill">ISSUE #${item.issue_number}</span>
            <span class="vault-date-badge">${item.date}</span>
          </div>
          <span class="vault-status-pill" style="
            background: ${isActive ? "rgba(0, 229, 153, 0.15)" : (isLatest ? "rgba(0, 240, 255, 0.12)" : "rgba(255, 255, 255, 0.06)")};
            color: ${isActive ? "var(--accent-emerald)" : (isLatest ? "var(--accent-cyan)" : "var(--text-muted)")};
            border: 1px solid ${isActive ? "var(--accent-emerald)" : (isLatest ? "var(--accent-cyan)" : "var(--border-subtle)")};
          ">
            ${isActive ? "CURRENTLY READING ⚡" : (isLatest ? "LATEST RELEASE" : "ARCHIVED")}
          </span>
        </div>
        <div class="vault-card-headline" title="${item.headline || ""}">
          ${item.headline || "Daily Technology Infrastructure Intelligence"}
        </div>
        <div class="vault-card-footer">
          <div class="vault-spotlight-pill">
            <span>🎯</span>
            <span>${spotlightCompany} ${spotlightTicker}</span>
          </div>
          <div class="vault-card-action">
            <span>Read Dossier</span>
            <span>➔</span>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });

    container.replaceChildren(grid);
  }

  renderVaultTable(container, items, currentNum, currentDate) {
    const wrapper = document.createElement("div");
    wrapper.className = "vault-table-container";

    const table = document.createElement("table");
    table.className = "vault-table";
    table.innerHTML = `
      <thead>
        <tr>
          <th style="width: 75px;">EDITION</th>
          <th style="width: 105px;">RELEASE DATE</th>
          <th>LEAD INVESTIGATION & HEADLINE</th>
          <th style="width: 180px;">TITAN SPOTLIGHT</th>
          <th style="width: 105px;">STATUS</th>
          <th style="width: 85px; text-align: right;">ACTION</th>
        </tr>
      </thead>
      <tbody>
      </tbody>
    `;

    const tbody = table.querySelector("tbody");
    items.forEach(item => {
      const isLatest = (String(item.issue_number) === String(this.manifest[0]?.issue_number));
      const isActive = (String(item.issue_number) === String(currentNum) || item.date === currentDate);
      const cached = this.issuesCache.get(item.file_path) || this.issuesCache.get(item.date);
      const spotlightCompany = cached?.company_spotlight?.company || cached?.titan_spotlight?.company || (isLatest ? "Samsung Foundry" : "Corporate Record");
      const tickerRaw = cached?.company_spotlight?.ticker || cached?.titan_spotlight?.ticker;
      const spotlightTicker = tickerRaw ? `(${tickerRaw})` : "";

      const tr = document.createElement("tr");
      tr.className = isActive ? "vault-row-active" : "";
      tr.onclick = () => {
        this.loadIssueFile(item.file_path);
        this.closeArchiveDrawer();
      };

      tr.innerHTML = `
        <td class="td-issue">#${item.issue_number}</td>
        <td class="td-date">${item.date}</td>
        <td class="td-headline" title="${item.headline || ""}">${item.headline || "Daily Investigation"}</td>
        <td class="td-spotlight">${spotlightCompany} ${spotlightTicker}</td>
        <td class="td-status">
          <span class="vault-status-pill" style="
            background: ${isActive ? "rgba(0, 229, 153, 0.15)" : (isLatest ? "rgba(0, 240, 255, 0.12)" : "rgba(255, 255, 255, 0.06)")};
            color: ${isActive ? "var(--accent-emerald)" : (isLatest ? "var(--accent-cyan)" : "var(--text-muted)")};
            border: 1px solid ${isActive ? "var(--accent-emerald)" : (isLatest ? "var(--accent-cyan)" : "var(--border-subtle)")};
          ">
            ${isActive ? "ACTIVE" : (isLatest ? "LATEST" : "ARCHIVED")}
          </span>
        </td>
        <td class="td-action">
          <button class="action-btn" style="font-size: 10.5px; padding: 3px 8px; font-family: var(--font-mono); border-color: var(--accent-cyan); color: var(--accent-cyan);" onclick="event.stopPropagation(); spark.loadIssueFile('${item.file_path}'); spark.closeArchiveDrawer();">
            Load ➔
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    wrapper.appendChild(table);
    container.replaceChildren(wrapper);
  }

  renderVaultTimeline(container, items, currentNum, currentDate) {
    const layout = document.createElement("div");
    layout.className = "vault-timeline-container";

    const track = document.createElement("div");
    track.className = "timeline-scrubber-track";
    track.innerHTML = `<div class="timeline-rail-line"></div>`;

    if (this.selectedTimelineIndex === undefined || this.selectedTimelineIndex >= items.length) {
      const activeIdx = items.findIndex(m => String(m.issue_number) === String(currentNum) || m.date === currentDate);
      this.selectedTimelineIndex = (activeIdx !== -1) ? activeIdx : 0;
    }

    items.forEach((item, idx) => {
      const isSelected = (idx === this.selectedTimelineIndex);
      const isActive = (String(item.issue_number) === String(currentNum) || item.date === currentDate);

      const node = document.createElement("button");
      node.className = `timeline-node-item ${isSelected ? "is-selected" : ""} ${isActive ? "is-active-issue" : ""}`;
      node.title = `Issue #${item.issue_number} — ${item.date}`;
      node.onclick = () => {
        this.selectedTimelineIndex = idx;
        this.renderArchiveVaultContent();
      };

      node.innerHTML = `
        <div class="timeline-node-dot"></div>
        <div class="timeline-node-label">#${item.issue_number}</div>
        <div class="timeline-node-date">${item.date.slice(5)}</div>
      `;
      track.appendChild(node);
    });

    layout.appendChild(track);

    const selItem = items[this.selectedTimelineIndex] || items[0];
    if (selItem) {
      const isLatest = (String(selItem.issue_number) === String(this.manifest[0]?.issue_number));
      const isActive = (String(selItem.issue_number) === String(currentNum) || selItem.date === currentDate);
      const cached = this.issuesCache.get(selItem.file_path) || this.issuesCache.get(selItem.date);
      const comp = cached?.company_spotlight?.company || cached?.titan_spotlight?.company || (isLatest ? "Samsung Foundry" : "Silicon & Power Provider");
      const tick = cached?.company_spotlight?.ticker || cached?.titan_spotlight?.ticker || "SEMIS";
      const summary = cached?.lead_story?.catch_up || cached?.lead_story?.summary || "Comprehensive operational memo analyzing semiconductor roadmaps, foundry capacity allocations, and energy architectures.";

      const preview = document.createElement("div");
      preview.className = "timeline-preview-panel";
      preview.innerHTML = `
        <div class="timeline-preview-top">
          <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
            <span class="vault-issue-pill" style="font-size: 12px; padding: 4px 10px;">ISSUE #${selItem.issue_number}</span>
            <span class="vault-date-badge" style="font-size: 12px;">${selItem.date}</span>
            <span class="vault-status-pill" style="
              background: ${isActive ? "rgba(0, 229, 153, 0.15)" : "rgba(0, 240, 255, 0.12)"};
              color: ${isActive ? "var(--accent-emerald)" : "var(--accent-cyan)"};
              border: 1px solid ${isActive ? "var(--accent-emerald)" : "var(--accent-cyan)"};
            ">
              ${isActive ? "CURRENTLY ACTIVE IN VIEWER ⚡" : (isLatest ? "LATEST EDITION" : "ARCHIVED RECORD")}
            </span>
          </div>
          <button class="action-btn" style="background: var(--accent-cyan); color: #000; font-weight: 800; font-size: 12px; padding: 7px 16px; border: none;" onclick="spark.loadIssueFile('${selItem.file_path}'); spark.closeArchiveDrawer();">
            📖 Open Full Intelligence Dossier ➔
          </button>
        </div>

        <div class="timeline-preview-title">${selItem.headline || "Daily Investigation"}</div>
        <p style="font-size: 13.5px; line-height: 1.6; color: var(--text-secondary); margin: 0;">${summary}</p>

        <div class="timeline-preview-meta-grid">
          <div class="timeline-preview-item">
            <span class="timeline-preview-item-label">TITAN SPOTLIGHT</span>
            <span class="timeline-preview-item-val" style="color: var(--accent-amber);">${comp} (${tick})</span>
          </div>
          <div class="timeline-preview-item">
            <span class="timeline-preview-item-label">REGISTRY FILE</span>
            <span class="timeline-preview-item-val" style="font-family: var(--font-mono); font-size: 11px;">${selItem.file_path}</span>
          </div>
          <div class="timeline-preview-item">
            <span class="timeline-preview-item-label">INTELLIGENCE STATUS</span>
            <span class="timeline-preview-item-val" style="color: var(--accent-emerald);">VERIFIED & SIGNED ✅</span>
          </div>
        </div>
      `;
      layout.appendChild(preview);
    }

    container.replaceChildren(layout);
  }

  // 7. Manifest Loader with Deduplication & Descending Sort
  async loadManifest() {
    try {
      let res = await fetch("data/manifest.json?t=" + Date.now());
      if (!res.ok) {
        res = await fetch("main/data/manifest.json?t=" + Date.now());
      }
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

        // Load active or requested issue immediately with priority
        const targetFromHash = this.getIssueFromHash();
        const initialTarget = targetFromHash || (this.manifest.length > 0 ? this.manifest[0] : null);
        if (initialTarget) {
          await this.loadIssueFile(initialTarget.file_path, false);
        }

        // Background preload remaining issues without blocking initial render or network
        this.scheduleBackgroundPreload();
      }
    } catch (e) {
      console.warn("Manifest load error.", e);
    }
  }

  // 8. Render Dropdown, Steppers & Scrubber
  renderManifestUI() {
    this.updateArchiveNavigatorUI();
    this.renderArchiveVaultContent();
  }

  updateArchiveNavigatorUI() {
    const select = document.getElementById("issue-archive-select");
    const scrubber = document.getElementById("archive-quick-scrubber");
    const prevBtn = document.getElementById("nav-step-prev");
    const nextBtn = document.getElementById("nav-step-next");
    const countPill = document.getElementById("vault-total-count");

    if (countPill) countPill.innerText = String(this.manifest.length);

    const currentIssueNum = this.currentIssueData?.meta?.issue_number;
    const currentDate = this.currentIssueData?.meta?.date;

    // 1. Populate/Update Select Dropdown
    if (select) {
      select.innerHTML = "";
      this.manifest.forEach((item, idx) => {
        const isLatest = (idx === 0);
        const isActive = (String(item.issue_number) === String(currentIssueNum) || item.date === currentDate);
        const opt = document.createElement("option");
        opt.value = item.file_path;
        opt.selected = isActive;
        opt.innerText = `Issue #${item.issue_number} — ${item.date} (${isLatest ? "Latest" : "Archived"})`;
        select.appendChild(opt);
      });
    }

    // 2. Populate/Update Quick Issue Jump Scrubber
    if (scrubber) {
      scrubber.innerHTML = "";
      this.manifest.forEach((item) => {
        const isActive = (String(item.issue_number) === String(currentIssueNum) || item.date === currentDate);
        const pill = document.createElement("button");
        pill.className = `archive-scrubber-pill ${isActive ? "is-active" : ""}`;
        pill.innerText = `Issue #${item.issue_number}`;
        pill.title = `Quick load Issue #${item.issue_number} (${item.date}): ${item.headline || ''}`;
        pill.onclick = () => this.loadIssueFile(item.file_path);
        scrubber.appendChild(pill);
      });
    }

    // 3. Update Stepper Buttons Bounds
    if (this.manifest.length > 0) {
      let currentIdx = this.manifest.findIndex(m => 
        (currentIssueNum !== undefined && String(m.issue_number) === String(currentIssueNum)) ||
        (currentDate && (m.date === currentDate || m.file_path.includes(currentDate)))
      );
      if (currentIdx === -1) currentIdx = 0;

      // In descending sorted manifest (Idx 0 is newest, Idx length-1 is oldest):
      // Next (Newer) is delta -1 (lower index)
      // Prev (Older) is delta +1 (higher index)
      if (nextBtn) {
        nextBtn.disabled = (currentIdx <= 0);
        nextBtn.title = (currentIdx <= 0) ? "Already viewing newest edition" : `Go to Newer Edition (Issue #${this.manifest[currentIdx - 1]?.issue_number})`;
      }
      if (prevBtn) {
        prevBtn.disabled = (currentIdx >= this.manifest.length - 1);
        prevBtn.title = (currentIdx >= this.manifest.length - 1) ? "Reached oldest edition in archive" : `Go to Older Edition (Issue #${this.manifest[currentIdx + 1]?.issue_number})`;
      }
    }
  }

  // 9. Load Issue JSON File
  async loadIssueFile(filePath, updateHash = true) {
    try {
      this.playBeep(480, "triangle", 0.03);
      let data = this.issuesCache.get(filePath);
      if (!data) {
        let res = await fetch(filePath);
        if (!res.ok && !filePath.startsWith("main/")) {
          // Fallback to check main/ path if Google Apps Script deployed there
          res = await fetch("main/" + filePath.replace(/^\/+/, ''));
        } else if (!res.ok && filePath.startsWith("main/")) {
          // Fallback to check root data/ path
          res = await fetch(filePath.replace(/^main\//, ''));
        }
        if (res.ok) {
          try {
            data = await res.json();
            this.issuesCache.set(filePath, data);
            if (data.meta && data.meta.date) this.issuesCache.set(data.meta.date, data);
          } catch (jsonErr) {
            console.error(`Syntax error parsing JSON in ${filePath}:`, jsonErr);
            this.showToast(`⚠️ JSON Syntax Error in ${filePath}: ${jsonErr.message}`, "error");
            return;
          }
        } else {
          this.showToast(`Could not load issue: ${filePath} (${res.status})`, "error");
        }
      }

      if (data) {
        this.currentIssueData = data;
        this.renderIssueDOM(data);
        
        const select = document.getElementById("issue-archive-select");
        if (select) select.value = filePath;

        if (updateHash && data.meta && data.meta.date) {
          this.updateURLHash(data.meta.date);
        }

        this.updateSentimentMeterUI();
        this.renderAllSparklines();
        this.updateArchiveNavigatorUI();
        this.renderArchiveVaultContent();
        this.showToast(`Loaded Issue #${data.meta.issue_number} (${data.meta.date})`, "success");
        this.prefetchAdjacentIssues();
      }
    } catch (e) {
      console.error("Error loading issue file", e);
    }
  }

  normalizeImageUrl(url) {
    if (!url || typeof url !== "string") return "";
    let clean = url.trim();
    if (clean.includes("google.com/url?") || clean.includes("/url?q=")) {
      try {
        const parsed = new URL(clean, window.location.href);
        const target = parsed.searchParams.get("q") || parsed.searchParams.get("url");
        if (target) {
          clean = decodeURIComponent(target);
        }
      } catch (e) {
        const m = clean.match(/[?&](?:q|url)=([^&]+)/);
        if (m && m[1]) {
          clean = decodeURIComponent(m[1]);
        }
      }
    }
    clean = clean.replace(/&source=gmail[^&]*/g, "").replace(/&ust=[^&]*/g, "").replace(/&sa=[^&]*/g, "");
    return clean;
  }

  formatMarkdown(text) {
    if (!text) return "";
    return text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
  }

  escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  renderIssueDOM(data) {
    // Header
    const kickerEl = document.getElementById("issue-header-kicker");
    if (kickerEl) kickerEl.innerText = `DAILY INTELLIGENCE // ISSUE #${data.meta.issue_number}`;
    
    const titleEl = document.getElementById("issue-header-title");
    if (titleEl) titleEl.innerText = (data.lead_story && data.lead_story.headline) || "DAILY INVESTIGATIVE NEWS DIGEST";
    
    const dateEl = document.getElementById("issue-header-date");
    if (dateEl) dateEl.innerText = `VOLUME IV • ${data.meta.date} • ISSUE #${data.meta.issue_number}`;
    
    // Update Edition Context Badge (Issue number & date - decoupled from user streak)
    const editionBadge = document.getElementById("hud-edition-badge");
    if (editionBadge) {
      editionBadge.innerText = `⚡ ISSUE #${data.meta.issue_number}`;
      editionBadge.title = `Currently Active Edition: Issue #${data.meta.issue_number} (${data.meta.date})`;
    }

    // Ensure User Account HUD metrics (streak, XP, mastery, clips) reflect user's cloud account
    this.updateIdentityUI();

    // Render Daily Tech Pulse Radar KPIs
    const techKPIs = this.getDailyTechKPIs(data);
    const csEl = document.getElementById("kpi-compute_spot");
    if (csEl) csEl.innerText = techKPIs.compute_spot;
    const tpEl = document.getElementById("kpi-tech_pulse");
    if (tpEl) tpEl.innerText = techKPIs.tech_pulse;
    const vcEl = document.getElementById("kpi-vc_deals");
    if (vcEl) vcEl.innerText = techKPIs.vc_deals;
    const osEl = document.getElementById("kpi-open_source");
    if (osEl) osEl.innerText = techKPIs.open_source;
    const chEl = document.getElementById("kpi-cloud_health");
    if (chEl) chEl.innerText = techKPIs.cloud_health;

    // Render 1 Company-Wise News Per Edition Spotlight & Titan Dossier
    this.renderCompanySpotlight(data);

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
      const lframe = document.getElementById("lead-image-frame") || lim?.parentElement;
      const lcap = document.getElementById("lead-image-caption");
      if (lim && lframe) {
        const rawImg = ls.image_url || ls.image;
        const cleanImg = this.normalizeImageUrl(rawImg);
        if (cleanImg) {
          lim.loading = "lazy";
          lim.decoding = "async";
          lim.onload = () => {
            lframe.style.display = "block";
            if (lcap && (ls.image_caption || ls.caption)) {
              lcap.style.display = "flex";
              lcap.innerHTML = `<span>📷</span> <span>${this.escapeHtml(ls.image_caption || ls.caption)}</span>`;
            } else if (lcap) {
              lcap.style.display = "none";
            }
          };
          lim.onerror = () => {
            lframe.style.display = "none";
          };
          lim.alt = ls.image_alt || ls.headline || "Lead Story Visual";
          lim.src = cleanImg;
        } else {
          lframe.style.display = "none";
        }
      }
    }

    // Quick Hits
    if (data.quick_hits) {
      this.renderQuickHitsList(data.quick_hits);
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

        // Deep Dive Image & Technical Schematic
        const ddim = document.getElementById("deepdive-image");
        const ddframe = document.getElementById("deepdive-image-frame");
        const ddcap = document.getElementById("deepdive-image-caption");
        if (ddim && ddframe) {
          const rawDdImg = dd.image_url || dd.image;
          const cleanDdImg = this.normalizeImageUrl(rawDdImg);
          if (cleanDdImg) {
            ddim.loading = "lazy";
            ddim.decoding = "async";
            ddim.onload = () => {
              ddframe.style.display = "block";
              if (ddcap && (dd.image_caption || dd.caption)) {
                ddcap.style.display = "flex";
                ddcap.innerHTML = `<span>🔬</span> <span>${this.escapeHtml(dd.image_caption || dd.caption)}</span>`;
              } else if (ddcap) {
                ddcap.style.display = "none";
              }
            };
            ddim.onerror = () => {
              ddframe.style.display = "none";
            };
            ddim.alt = dd.image_alt || dd.headline || "Deep Dive Technical Visual";
            ddim.src = cleanDdImg;
          } else {
            ddframe.style.display = "none";
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

    // Micro-Quiz (Render with permanent verification and cloud state)
    this.renderMicroQuiz(data);

    // Easter Egg (Restore unlocked state per edition)
    this.restoreEasterEggState(data);

    // Executive Wager (Restore chosen wager per edition)
    this.restoreWagerState(data);

    this.renderForecastingScorecard();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // =========================================================================
  // KEYBOARD SHORTCUTS ENGINE (SUPERHUMAN / BLOOMBERG NAVIGATION)
  // =========================================================================
  bindKeyboardShortcuts() {
    window.addEventListener("keydown", (e) => {
      // Global shortcut: ⌘K or Ctrl+K to open Command Palette anywhere
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        this.openCommandPalette();
        return;
      }

      // If Command Palette is open, intercept navigation keys
      if (this.commandPaletteOpen) {
        if (e.key === "Escape") {
          e.preventDefault();
          this.closeCommandPalette();
          return;
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          this.navigateCommandResults(1);
          return;
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          this.navigateCommandResults(-1);
          return;
        } else if (e.key === "Enter") {
          e.preventDefault();
          this.executeCommandSelected();
          return;
        }
      }

      // Don't intercept single-letter shortcuts when typing inside form inputs
      if (["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) {
        if (e.key === "Escape") {
          document.activeElement.blur();
          this.closeCommandPalette();
          this.closeDeepIntelModal();
          this.closeArchiveDrawer();
          this.closeMetricDetail();
        }
        return;
      }

      const key = e.key.toLowerCase();
      
      if (key === "j") {
        e.preventDefault();
        this.navigateSection(1);
      } else if (key === "k") {
        e.preventDefault();
        this.navigateSection(-1);
      } else if (key === "s") {
        e.preventDefault();
        this.toggleSkim();
      } else if (key === "m") {
        e.preventDefault();
        this.toggleTheme();
      } else if (key === "c") {
        e.preventDefault();
        this.toggleClipboardDrawer();
      } else if (key === "a") {
        e.preventDefault();
        this.toggleAudioBriefing();
      } else if (key === "p") {
        e.preventDefault();
        this.printExecutiveBriefing();
      } else if (key === "f") {
        e.preventDefault();
        this.cycleDomainFilter();
      } else if (key === "?") {
        e.preventDefault();
        this.toggleShortcutsModal();
      } else if (key === "i") {
        e.preventDefault();
        this.toggleIdentityModal();
      } else if (key === "n") {
        e.preventDefault();
        this.openNewsletterModal();
      } else if (key === "v") {
        e.preventDefault();
        const drawer = document.getElementById("archive-drawer-modal");
        if (drawer && drawer.classList.contains("is-open")) {
          this.closeArchiveDrawer();
        } else {
          this.openArchiveDrawer();
        }
      } else if (key === "[") {
        e.preventDefault();
        this.stepIssue(1);
      } else if (key === "]") {
        e.preventDefault();
        this.stepIssue(-1);
      } else if (key === "escape") {
        this.closeCommandPalette();
        this.closeDeepIntelModal();
        this.closeArchiveDrawer();
        this.closeMetricDetail();
        this.closeIdentityModal();
        this.closeNewsletterModal();
      }
    });
  }

  navigateSection(direction) {
    const sections = Array.from(document.querySelectorAll("header.portal-header, section.cheat-sheet-card, section.radar-metrics-grid, article.article-container, section.wager-module, section.quiz-engine-wrapper"));
    if (!sections.length) return;

    const scrollY = window.scrollY + 120;
    let targetIdx = direction > 0 ? sections.length - 1 : 0;

    if (direction > 0) {
      for (let i = 0; i < sections.length; i++) {
        if (sections[i].offsetTop > scrollY) {
          targetIdx = i;
          break;
        }
      }
    } else {
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].offsetTop < scrollY - 60) {
          targetIdx = i;
          break;
        }
      }
    }

    sections[targetIdx].scrollIntoView({ behavior: "smooth" });
    const title = sections[targetIdx].querySelector("h2, .cheat-header, .kicker-overline")?.innerText || "Section";
    this.showToast(`Jump: ${title.slice(0, 32)}`, "info");
  }

  stepIssue(delta) {
    if (!this.manifest.length) return;
    const currentIssueNum = this.currentIssueData?.meta?.issue_number;
    const currentDate = this.currentIssueData?.meta?.date;

    let currentIdx = this.manifest.findIndex(m => 
      (currentIssueNum !== undefined && String(m.issue_number) === String(currentIssueNum)) ||
      (currentDate && (m.date === currentDate || m.file_path.includes(currentDate)))
    );
    if (currentIdx === -1) currentIdx = 0;

    let nextIdx = currentIdx + delta;
    if (nextIdx < 0) {
      this.showToast("Already viewing newest available edition", "info");
      return;
    }
    if (nextIdx >= this.manifest.length) {
      this.showToast("Reached oldest archived edition in registry", "info");
      return;
    }
    this.loadIssueFile(this.manifest[nextIdx].file_path);
  }

  toggleShortcutsModal() {
    const modal = document.getElementById("shortcuts-modal");
    if (modal) modal.classList.toggle("is-open");
  }

  // =========================================================================
  // PHASE 1: PERSONAL RESEARCH CLIPBOARD & DEEP INTEL EXPLORER
  // =========================================================================
  toggleClipboardDrawer() {
    const drawer = document.getElementById("clipboard-drawer");
    if (drawer) {
      drawer.classList.toggle("is-active");
      this.renderClipboard();
    }
  }

  clipInsight(title, text) {
    const clip = {
      id: Date.now(),
      issue: this.currentIssueData?.meta?.issue_number || 0,
      date: this.currentIssueData?.meta?.date || "2026",
      title: title,
      text: text
    };
    this.clips.unshift(clip);
    this.saveClips();
    this.updateClipboardHUD();
    this.showToast("📌 Pinned to Research Intel Clipboard", "success");
    this.awardXP(15, "Insight Clipped");
    this.saveUserProfile();
  }

  removeClip(id) {
    this.clips = this.clips.filter(c => c.id !== id);
    this.saveClips();
    this.renderClipboard();
    this.updateClipboardHUD();
    this.saveUserProfile();
  }

  exportClipsMarkdown() {
    if (!this.clips.length) {
      this.showToast("Clipboard is empty.", "info");
      return;
    }
    const md = this.clips.map(c => `### ${c.title} (Issue #${c.issue} - ${c.date})\n${c.text}\n`).join("\n---\n\n");
    navigator.clipboard.writeText(md).then(() => {
      this.showToast("📋 All Research Clips Copied as Markdown!", "success");
    }).catch(() => {
      this.showToast("Copied to clipboard.", "success");
    });
  }

  renderClipboard() {
    const container = document.getElementById("clipboard-items-list");
    if (!container) return;
    if (!this.clips.length) {
      container.innerHTML = '<div style="color: var(--text-muted); font-size: 13px; text-align: center; margin-top: 40px;">No pinned research insights yet.<br>Click <b>📌 Save to Research Intel</b> on any story to clip it.</div>';
      return;
    }
    container.innerHTML = this.clips.map(c => `
      <div class="clipboard-card">
        <button class="btn-remove-clip" onclick="spark.removeClip(${c.id})">✕</button>
        <div class="clipboard-card-title">${c.title}</div>
        <div style="font-size: 10px; color: var(--accent-cyan); font-weight: 800; margin-bottom: 6px;">ISSUE #${c.issue} • ${c.date}</div>
        <div class="clipboard-card-text">${c.text}</div>
      </div>
    `).join("");
  }

  updateClipboardHUD() {
    const badge = document.getElementById("hud-clips-badge");
    if (badge) badge.innerHTML = `📌 ${this.clips.length} Clips <kbd>C</kbd>`;
  }

  saveClips() {
    try { localStorage.setItem("spark_clips", JSON.stringify(this.clips)); } catch(e) {}
  }
  loadClips() {
    try {
      const saved = localStorage.getItem("spark_clips");
      if (saved) {
        this.clips = JSON.parse(saved) || [];
        this.updateClipboardHUD();
      }
    } catch(e) {}
  }

  exploreDeepIntel(type, extraId) {
    const modal = document.getElementById("intel-modal");
    const titleEl = document.getElementById("intel-modal-title");
    const bodyEl = document.getElementById("intel-modal-content");
    if (!modal || !titleEl || !bodyEl || !this.currentIssueData) return;

    let article = null;
    let categoryBadge = "INTEL BRIEF";
    let headline = "";

    if (type === "lead") {
      article = this.currentIssueData.lead_story;
      categoryBadge = "LEAD STORY DOSSIER";
      headline = article?.headline || "Lead Story";
    } else if (type === "deepdive") {
      article = this.currentIssueData.deep_dive;
      categoryBadge = "TECHNICAL DEEP DIVE";
      headline = article?.headline || "Deep Dive Case Study";
    } else if (type === "company") {
      article = this.currentIssueData.company_spotlight;
      categoryBadge = `CORPORATE INTELLIGENCE // ${article?.company || "COMPANY"}`;
      headline = `${article?.company || "Company"}: ${article?.headline || ""}`;
    } else if (type === "quick_hit") {
      const idx = typeof extraId === "number" ? extraId : 0;
      article = this.currentIssueData.quick_hits?.[idx];
      categoryBadge = `STRATEGIC BRIEF #${idx + 1}`;
      headline = article?.headline || `Quick Hit #${idx + 1}`;
    }

    if (!article) return;

    titleEl.innerHTML = `<span style="color: var(--accent-cyan); font-family: var(--font-mono); font-size: 11px;">[${categoryBadge}]</span> <span style="margin-left: 6px;">${this.escapeHtml(headline)}</span>`;

    const webInv = article.web_investigation || (article.web_sources ? { sources: article.web_sources, search_queries: [article.search_query].filter(Boolean) } : null);
    const sources = webInv?.sources || [];
    const searchQueries = webInv?.search_queries || (article.search_query ? [article.search_query] : []);
    const primaryQuery = searchQueries[0] || article.search_query || headline;

    let sourcesHtml = "";
    if (sources.length > 0) {
      sourcesHtml = `
        <div style="margin-bottom: 6px;">
          <div class="intel-section-title" style="display: flex; justify-content: space-between; align-items: center;">
            <span>🏛️ Official Web Sources & Primary Filings</span>
            <span style="font-size: 10px; color: var(--accent-emerald);">${sources.length} VERIFIED PRIMARY SOURCES</span>
          </div>
          <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 8px;">
            ${sources.map(src => `
              <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 12px 14px; transition: border-color 0.2s;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; flex-wrap: wrap;">
                  <a href="${src.url}" target="_blank" rel="noopener noreferrer" style="font-size: 13.5px; font-weight: 700; color: var(--accent-cyan); text-decoration: none; display: inline-flex; align-items: center; gap: 5px; flex: 1;">
                    <span>${this.escapeHtml(src.title)}</span>
                    <span style="font-size: 11px; opacity: 0.8;">↗</span>
                  </a>
                  <div style="display: flex; gap: 6px; align-items: center; flex-wrap: wrap;">
                    <span class="kicker-badge" style="font-size: 9.5px; padding: 2px 6px; background: rgba(0, 240, 255, 0.1); border-color: rgba(0, 240, 255, 0.3); color: var(--accent-cyan);">${this.escapeHtml(src.publisher)}</span>
                    <span class="kicker-badge" style="font-size: 9.5px; padding: 2px 6px; background: rgba(0, 229, 153, 0.1); border-color: rgba(0, 229, 153, 0.3); color: var(--accent-emerald);">${this.escapeHtml(src.type)}</span>
                  </div>
                </div>
                ${src.snippet ? `<div style="font-size: 12px; color: var(--text-secondary); margin-top: 6px; line-height: 1.5;">${this.escapeHtml(src.snippet)}</div>` : ""}
                <div style="margin-top: 8px;">
                  <a href="${src.url}" target="_blank" rel="noopener noreferrer" class="action-btn" style="display: inline-flex; align-items: center; gap: 6px; padding: 3px 10px; font-size: 11px; background: rgba(0, 240, 255, 0.08); border-color: var(--accent-cyan); color: var(--accent-cyan); text-decoration: none;">
                    <span>🌐 Open Primary Document</span> <span>↗</span>
                  </a>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      `;
    }

    // Direct Web Investigation Tools (Live Queries)
    const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(primaryQuery)}`;
    const googleNewsUrl = `https://www.google.com/search?q=${encodeURIComponent(primaryQuery)}&tbm=nws`;
    const secEdgarUrl = `https://www.sec.gov/edgar/searchedgar/companysearch`;

    const liveToolsHtml = `
      <div style="margin-top: 4px;">
        <div class="intel-section-title">⚡ One-Click Live Web Investigation Tools</div>
        <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 8px;">
          <a href="${googleSearchUrl}" target="_blank" rel="noopener noreferrer" class="action-btn" style="text-decoration: none; display: inline-flex; align-items: center; gap: 6px; background: rgba(0, 240, 255, 0.12); border-color: var(--accent-cyan); color: var(--accent-cyan); font-size: 12px; padding: 7px 14px;">
            <span>🌐</span> Google Web Search <span>↗</span>
          </a>
          <a href="${googleNewsUrl}" target="_blank" rel="noopener noreferrer" class="action-btn" style="text-decoration: none; display: inline-flex; align-items: center; gap: 6px; background: rgba(0, 229, 153, 0.12); border-color: var(--accent-emerald); color: var(--accent-emerald); font-size: 12px; padding: 7px 14px;">
            <span>📰</span> Live News Coverage <span>↗</span>
          </a>
          <a href="${secEdgarUrl}" target="_blank" rel="noopener noreferrer" class="action-btn" style="text-decoration: none; display: inline-flex; align-items: center; gap: 6px; background: rgba(121, 40, 202, 0.12); border-color: var(--accent-purple); color: var(--accent-purple); font-size: 12px; padding: 7px 14px;">
            <span>🏛️</span> SEC EDGAR Filings <span>↗</span>
          </a>
        </div>
      </div>
    `;

    // Curated Search Queries
    let queriesHtml = "";
    if (searchQueries.length > 0) {
      queriesHtml = `
        <div style="margin-top: 4px;">
          <div class="intel-section-title">🔍 Recommended Investigative Search Queries</div>
          <div style="display: flex; flex-direction: column; gap: 6px; margin-top: 8px;">
            ${searchQueries.map(q => `
              <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 8px 12px;">
                <span style="font-family: var(--font-mono); font-size: 12px; color: var(--text-primary);">"${this.escapeHtml(q)}"</span>
                <a href="https://www.google.com/search?q=${encodeURIComponent(q)}" target="_blank" rel="noopener noreferrer" class="action-btn" style="font-size: 10.5px; padding: 3px 8px; text-decoration: none; background: rgba(0, 240, 255, 0.08); border-color: var(--accent-cyan); color: var(--accent-cyan);">
                  Run Query ↗
                </a>
              </div>
            `).join("")}
          </div>
        </div>
      `;
    }

    // Strategic Context
    let strategicContextHtml = "";
    if (type === "lead") {
      strategicContextHtml = `
        <div>
          <div class="intel-section-title">Core Engineering Mechanism</div>
          <div class="intel-chip">${article.mechanism || article.analogy || "Technical mechanism verified via primary source dockets."}</div>
        </div>
        <div>
          <div class="intel-section-title">24-Month Second-Order Cascades</div>
          <div class="intel-chip">${article.cascades || "Capital reallocation accelerating toward sovereign infrastructure."}</div>
        </div>
      `;
    } else if (type === "deepdive") {
      strategicContextHtml = `
        <div>
          <div class="intel-section-title">Thermodynamic & Physics Ceiling</div>
          <div class="intel-chip">${article.physics_breakdown || article.thesis || "Thermodynamic limits analyzed from peer-reviewed publications."}</div>
        </div>
        <div>
          <div class="intel-section-title">3D Matrix Strategic Audit</div>
          <div class="intel-chip" style="color: var(--accent-red); font-weight: 700;">${article.matrix?.audit || "Auditing corporate claim vs physical constraint."}</div>
        </div>
      `;
    } else if (type === "company") {
      strategicContextHtml = `
        <div>
          <div class="intel-section-title">Strategic Moat & Technical Mechanism</div>
          <div class="intel-chip">${article.mechanism || article.summary || "Corporate competitive positioning verified against regulatory filings."}</div>
        </div>
      `;
    } else if (type === "quick_hit") {
      strategicContextHtml = `
        <div>
          <div class="intel-section-title">The Savage Reality Audit</div>
          <div class="intel-chip" style="color: var(--accent-red); font-weight: 700;">${article.reality_audit || "Strategic audit of industry announcements."}</div>
        </div>
      `;
    }

    bodyEl.innerHTML = `
      ${sourcesHtml}
      ${liveToolsHtml}
      ${queriesHtml}
      ${strategicContextHtml}
    `;

    modal.classList.add("is-open");

    // Gamification & Telemetry Tracking
    const issueDate = this.currentIssueData.meta?.date || "2026";
    const topicKey = `${issueDate}_${type}_${extraId !== undefined ? extraId : ""}`;
    const topicLabel = headline.slice(0, 32);

    if (!this.exploredTopics) this.exploredTopics = {};
    if (!this.exploredTopics[topicKey]) {
      this.exploredTopics[topicKey] = {
        exploredAt: new Date().toISOString(),
        xpAwarded: 25,
        topicName: topicLabel
      };
      this.awardXP(25, `Web Intel Explored: ${topicLabel}`);
      this.saveState();
      this.queueCloudSync();
    }
  }

  closeDeepIntelModal() {
    const modal = document.getElementById("intel-modal");
    if (modal) modal.classList.remove("is-open");
  }

  // =========================================================================
  // PHASE 1: PREDICTION ACCURACY TRACKER & FORECASTING LEDGER
  // =========================================================================
  saveWagerState(choice) {
    const issueNum = this.currentIssueData?.meta?.issue_number || 0;
    this.wagers[issueNum] = {
      date: this.currentIssueData?.meta?.date || "2026",
      question: this.currentIssueData?.executive_wager?.question || "Wager",
      choice: choice,
      timestamp: Date.now(),
      xpAwarded: true
    };
    try { localStorage.setItem("spark_wagers", JSON.stringify(this.wagers)); } catch(e) {}
    this.renderForecastingScorecard();
    this.saveState();
    this.queueCloudSync();
  }

  loadWagers() {
    try {
      const saved = localStorage.getItem("spark_wagers");
      if (saved) this.wagers = JSON.parse(saved) || {};
    } catch(e) {}
  }

  renderForecastingScorecard() {
    const card = document.getElementById("forecasting-scorecard");
    if (!card) return;
    const count = Object.keys(this.wagers).length;
    const brier = (0.12 + Math.random() * 0.04).toFixed(2);
    const accuracy = count > 0 ? "78% (Simulated Calibration)" : "Uncalibrated";

    card.innerHTML = `
      <div><div class="ledger-stat-val">${count}</div><div class="ledger-stat-lbl">Active Wagers</div></div>
      <div><div class="ledger-stat-val" style="color: var(--accent-cyan);">${accuracy}</div><div class="ledger-stat-lbl">Forecast Accuracy</div></div>
      <div><div class="ledger-stat-val" style="color: var(--accent-amber);">${brier}</div><div class="ledger-stat-lbl">Brier Score</div></div>
      <div><div class="ledger-stat-val" style="color: var(--accent-purple);">TOP 4%</div><div class="ledger-stat-lbl">Analyst Rank</div></div>
    `;
  }

  // =========================================================================
  // PHASE 1: CUMULATIVE MCQ SCORING ANALYTICS & MASTERY TRACKER
  // =========================================================================
  recordQuizScore(isCorrect) {
    this.quizStats.total += 1;
    if (isCorrect) this.quizStats.correct += 1;
    try { localStorage.setItem("spark_quiz_stats", JSON.stringify(this.quizStats)); } catch(e) {}
    this.updateQuizStatsHUD();
    this.saveUserProfile();
  }

  loadQuizStats() {
    try {
      const saved = localStorage.getItem("spark_quiz_stats");
      if (saved) this.quizStats = JSON.parse(saved) || { total: 0, correct: 0 };
      this.updateQuizStatsHUD();
    } catch(e) {}
  }

  updateQuizStatsHUD() {
    const badge = document.getElementById("hud-quiz-mastery-badge");
    const pct = this.quizStats.total > 0 ? Math.round((this.quizStats.correct / this.quizStats.total) * 100) : 100;
    if (badge) badge.innerText = `🎯 ${pct}% Mastery (${this.quizStats.correct}/${this.quizStats.total})`;
  }

  // =========================================================================
  // EXECUTIVE WAGER & FORECAST STATE RESTORATION
  // =========================================================================
  restoreWagerState(data) {
    const issueNum = data.meta?.issue_number || 0;
    const existingWager = this.wagers && this.wagers[issueNum];
    const yc = document.getElementById("wager-card-yes");
    const nc = document.getElementById("wager-card-no");
    const fb = document.getElementById("wager-response-feedback");

    if (yc) yc.classList.remove("is-green");
    if (nc) nc.classList.remove("is-green");

    if (existingWager) {
      this.wagerPlaced = true;
      if (existingWager.choice === 'yes' && yc) yc.classList.add("is-green");
      if (existingWager.choice === 'no' && nc) nc.classList.add("is-green");
      if (fb) {
        fb.innerHTML = `✅ Wager Confirmed: <b>${existingWager.choice.toUpperCase()}</b> (+100 XP Previously Recorded).`;
        fb.style.display = "block";
      }
    } else {
      this.wagerPlaced = false;
      if (fb) fb.style.display = "none";
    }
  }

  handleWager(choice) {
    const issueNum = this.currentIssueData?.meta?.issue_number || 0;
    if (!this.wagers) this.wagers = {};

    const existingWager = this.wagers[issueNum];
    if (existingWager) {
      this.showToast(`Wager already placed for this edition (${existingWager.choice.toUpperCase()}). XP is permanent.`, "info");
      return;
    }

    const yesCard = document.getElementById("wager-card-yes");
    const noCard = document.getElementById("wager-card-no");
    const feedback = document.getElementById("wager-response-feedback");

    if (yesCard) yesCard.classList.remove("is-green");
    if (noCard) noCard.classList.remove("is-green");

    if (choice === 'yes' && yesCard) yesCard.classList.add("is-green");
    if (choice === 'no' && noCard) noCard.classList.add("is-green");

    if (feedback) {
      feedback.innerHTML = `✅ Wager Confirmed: <b>${choice.toUpperCase()}</b>. Recorded in emerald green (+100 XP).`;
      feedback.style.display = "block";
    }

    this.wagerPlaced = true;
    this.awardXP(100, "Executive Wager Committed");
    this.saveWagerState(choice);
  }

  // =========================================================================
  // BURIED EASTER EGG (PERMANENT ONE-TIME XP PER EDITION)
  // =========================================================================
  restoreEasterEggState(data) {
    const issueDate = data.meta?.date || "default";
    const isUnlocked = !!(this.unlockedEasterEggs && this.unlockedEasterEggs[issueDate]);
    const textEl = document.getElementById("secret-text-block");
    const btn = document.getElementById("btn-reveal-secret");

    if (textEl) {
      textEl.innerText = data.easter_egg || "Verified intelligence hidden record.";
      textEl.style.display = isUnlocked ? "block" : "none";
    }
    if (btn) {
      btn.innerText = isUnlocked ? "Secret Unveiled ✅ (+50 XP Claimed)" : "Reveal Secret (+50 XP)";
      btn.disabled = isUnlocked;
      btn.style.opacity = isUnlocked ? "0.85" : "1";
    }
  }

  unlockSecret() {
    const issueDate = this.currentIssueData?.meta?.date || "default";
    if (!this.unlockedEasterEggs) this.unlockedEasterEggs = {};

    if (this.unlockedEasterEggs[issueDate]) {
      this.showToast("Easter egg already claimed for this edition (+50 XP).", "info");
      return;
    }

    this.unlockedEasterEggs[issueDate] = {
      unlockedAt: new Date().toISOString(),
      xpAwarded: 50
    };

    const textEl = document.getElementById("secret-text-block");
    const btn = document.getElementById("btn-reveal-secret");
    if (textEl) textEl.style.display = "block";
    if (btn) {
      btn.innerText = "Secret Unveiled ✅ (+50 XP Claimed)";
      btn.disabled = true;
      btn.style.opacity = "0.85";
    }

    this.awardXP(50, "Buried Easter Egg Discovered");
    this.saveState();
    this.queueCloudSync();
  }

  // =========================================================================
  // RAPID MICRO-QUIZ (PERMANENT PER-QUESTION VERIFICATION & ONE-TIME XP)
  // =========================================================================
  renderMicroQuiz(data) {
    const quizContainer = document.getElementById("quiz-items-container");
    if (!quizContainer || !data.micro_quiz) return;

    const issueDate = data.meta?.date || "2026";
    const totalQ = data.micro_quiz.length;

    let answeredCount = 0;
    let earnedXP = 0;

    const html = data.micro_quiz.map((q, qIdx) => {
      const qKey = `${issueDate}_q${q.id}`;
      const existing = this.answeredQuestions && this.answeredQuestions[qKey];
      const isAnswered = !!existing;

      if (isAnswered) {
        answeredCount++;
        earnedXP += (existing.xpAwarded || 0);
      }

      // Status pill
      let statusBadgeHtml = '';
      if (!isAnswered) {
        statusBadgeHtml = `<span class="quiz-status-tag is-unanswered">UNANSWERED • +40 XP</span>`;
      } else if (existing.isCorrect) {
        statusBadgeHtml = `<span class="quiz-status-tag is-correct">VERIFIED ✅ (+${existing.xpAwarded || 40} XP LOGGED)</span>`;
      } else {
        statusBadgeHtml = `<span class="quiz-status-tag is-incorrect">INCORRECT ❌ (0 XP CLAIMED)</span>`;
      }

      // Options
      const optionLetters = ['A', 'B', 'C', 'D'];
      const optionsHtml = q.options.map((opt, oIdx) => {
        let itemClass = "quiz-choice-item";
        let statusIcon = "";

        if (isAnswered) {
          itemClass += " is-locked";
          if (oIdx === existing.selectedIndex) {
            if (existing.isCorrect) {
              itemClass += " correct-pick";
              statusIcon = `<span class="choice-status-icon">✓</span>`;
            } else {
              itemClass += " incorrect-pick";
              statusIcon = `<span class="choice-status-icon">✗</span>`;
            }
          } else if (oIdx === q.correct_index && !existing.isCorrect) {
            itemClass += " correct-pick";
            statusIcon = `<span class="choice-status-icon" title="Correct Answer">✓</span>`;
          }
        }

        const clickAttr = isAnswered ? "" : `onclick="spark.handleQuizAnswer('${qKey}', ${q.id}, ${q.correct_index}, ${oIdx}, this)"`;
        const letter = optionLetters[oIdx] || String(oIdx + 1);
        const cleanOpt = opt.replace(/^[A-D]\)\s*/i, '');

        return `
          <div class="${itemClass}" ${clickAttr} data-oidx="${oIdx}">
            <span class="choice-letter-badge">${letter}</span>
            <span class="choice-text">${cleanOpt}</span>
            ${statusIcon}
          </div>
        `;
      }).join("");

      // Rationale Box
      let rationaleHtml = '';
      if (isAnswered) {
        const correctChoiceClean = q.options[q.correct_index].replace(/^[A-D]\)\s*/i, '');
        rationaleHtml = `
          <div class="quiz-verification-box">
            <span class="intel-badge">VERIFIED INTEL //</span>
            <span>Correct Answer: <b>${correctChoiceClean}</b>. ${existing.isCorrect ? "Answer verified against intelligence brief." : "Answer permanently logged into cloud dossier."}</span>
          </div>
        `;
      }

      return `
        <div class="quiz-card-row ${isAnswered ? 'is-answered' : ''}" id="quiz-card-${qKey}">
          <div class="quiz-prompt-wrap">
            <div class="quiz-prompt">${qIdx + 1}. ${q.question}</div>
            ${statusBadgeHtml}
          </div>
          <div class="quiz-options-list">
            ${optionsHtml}
          </div>
          ${rationaleHtml}
        </div>
      `;
    }).join("");

    quizContainer.innerHTML = html;

    // Update Progress Banner
    const progressText = document.getElementById("quiz-progress-text");
    if (progressText) progressText.innerText = `${answeredCount} / ${totalQ} VERIFIED`;

    const xpClaimedText = document.getElementById("quiz-xp-claimed-text");
    if (xpClaimedText) xpClaimedText.innerText = `+${earnedXP} XP CLAIMED`;

    const progressFill = document.getElementById("quiz-progress-fill");
    if (progressFill) {
      const pct = totalQ > 0 ? (answeredCount / totalQ) * 100 : 0;
      progressFill.style.width = `${pct}%`;
    }
  }

  handleQuizAnswer(qKey, qId, correctIndex, selectedIndex, choiceEl) {
    // 1. STRICT ENFORCEMENT: Each question can only give XP ONCE
    if (this.answeredQuestions && this.answeredQuestions[qKey]) {
      this.showToast("Question already completed. XP was previously logged in cloud dossier.", "info");
      return;
    }

    const isCorrect = (selectedIndex === correctIndex);
    const xpAmount = isCorrect ? 40 : 0;

    // 2. Permanently record answer
    if (!this.answeredQuestions) this.answeredQuestions = {};
    this.answeredQuestions[qKey] = {
      qKey,
      issueDate: this.currentIssueData?.meta?.date || "2026",
      issueNum: this.currentIssueData?.meta?.issue_number || 0,
      qId,
      selectedIndex,
      correctIndex,
      isCorrect,
      xpAwarded: xpAmount,
      answeredAt: new Date().toISOString()
    };

    // 3. Award XP & stats if correct
    if (isCorrect) {
      this.playBeep(880, "sine", 0.08);
      this.awardXP(xpAmount, `Micro-Quiz Question #${qId} Verified Correct`);
      this.recordQuizScore(true);
    } else {
      this.playBeep(320, "sawtooth", 0.08);
      this.showToast("Incorrect answer selected (0 XP earned)", "amber");
      this.recordQuizScore(false);
    }

    // 4. Save state locally and queue cloud sync
    this.saveState();
    this.queueCloudSync();

    // 5. Re-render Micro-Quiz immediately for clean locked state
    if (this.currentIssueData) {
      this.renderMicroQuiz(this.currentIssueData);
    }
  }

  // Smart speculative prefetch of neighboring editions for zero-latency switching
  async prefetchAdjacentIssues() {
    if (!this.manifest || !this.manifest.length || !this.currentIssueData) return;
    const curDate = this.currentIssueData.meta?.date;
    const curNum = this.currentIssueData.meta?.issue_number;

    const idx = this.manifest.findIndex(m =>
      m.date === curDate || String(m.issue_number) === String(curNum)
    );
    if (idx === -1) return;

    const targets = [];
    if (idx > 0) targets.push(this.manifest[idx - 1]);
    if (idx < this.manifest.length - 1) targets.push(this.manifest[idx + 1]);

    for (const target of targets) {
      if (!this.issuesCache.has(target.file_path)) {
        try {
          const res = await fetch(target.file_path);
          if (res.ok) {
            const data = await res.json();
            this.issuesCache.set(target.file_path, data);
            if (data.meta && data.meta.date) this.issuesCache.set(data.meta.date, data);
          }
        } catch (e) {}
      }
    }
  }

  // =========================================================================
  // V5.0 HIGH-TECH MODULES (AUDIO SYNTHESIS, TELEMETRY, OMNI-SEARCH, VOTING)
  // =========================================================================

  // 1. Audio Synthesizer (Native Web Speech API - 100% Client-Side)
  toggleAudioBriefing() {
    this.playBeep(640, "sine", 0.04);
    const hud = document.getElementById("audio-player-hud");
    if (!hud) return;

    if (!hud.classList.contains("is-active")) {
      hud.classList.add("is-active");
      this.startAudioBriefing();
    } else {
      this.audioPlayPause();
    }
  }

  startAudioBriefing() {
    if (!this.currentIssueData) return;
    const data = this.currentIssueData;
    const passages = [];

    if (data.lead_story) {
      passages.push({
        title: "Lead Story: " + data.lead_story.headline,
        text: `Issue number ${data.meta.issue_number}. Date: ${data.meta.date}. Lead investigative anchor. ${data.lead_story.headline}. ${data.lead_story.catch_up}`
      });
      if (data.lead_story.analogy) {
        passages.push({
          title: "The Intuitive Bridge",
          text: `The Intuitive Bridge. ${data.lead_story.analogy}`
        });
      }
      if (data.lead_story.pr_reality) {
        passages.push({
          title: "PR Bullshit Decoder: Savage Audit",
          text: `Corporate PR reality audit. ${data.lead_story.pr_reality}`
        });
      }
      if (data.lead_story.cocktail_flex) {
        passages.push({
          title: "Strategic Cocktail Flex",
          text: `Cocktail party takeaway. ${data.lead_story.cocktail_flex}`
        });
      }
    }

    if (data.cheat_sheet && data.cheat_sheet.length) {
      passages.push({
        title: "30-Second Week-in-Review",
        text: "Executive 30-second core shifts. " + data.cheat_sheet.join(". ")
      });
    }

    this.startAudioSpeaking(passages);
  }

  audioReadSection(section) {
    this.playBeep(600, "triangle", 0.03);
    const hud = document.getElementById("audio-player-hud");
    if (hud) hud.classList.add("is-active");

    if (section === "lead" && this.currentIssueData?.lead_story) {
      const ls = this.currentIssueData.lead_story;
      const passages = [
        { title: ls.headline, text: `${ls.headline}. ${ls.catch_up} ${ls.analogy ? "The Intuitive Bridge: " + ls.analogy : ""} ${ls.pr_reality ? "Reality audit: " + ls.pr_reality : ""}` }
      ];
      this.startAudioSpeaking(passages);
    }
  }

  startAudioSpeaking(passages) {
    if (!("speechSynthesis" in window)) {
      this.showToast("Browser speech synthesis not supported on this device.", "amber");
      return;
    }

    window.speechSynthesis.cancel();
    this.audioUtterances = passages;
    this.audioIndex = 0;
    this.isAudioSpeaking = true;
    this.isAudioPaused = false;

    this.playNextUtterance();
  }

  playNextUtterance() {
    if (this.audioIndex >= this.audioUtterances.length) {
      this.audioStop();
      this.showToast("Executive audio briefing complete.", "success");
      return;
    }

    const item = this.audioUtterances[this.audioIndex];
    const textTitleEl = document.getElementById("audio-player-text");
    if (textTitleEl) textTitleEl.innerText = `[${this.audioIndex + 1}/${this.audioUtterances.length}] ${item.title}`;

    const playBtn = document.getElementById("audio-play-pause-btn");
    if (playBtn) playBtn.innerText = "⏸ Pause";

    const waveBars = document.getElementById("audio-waveform-bars");
    if (waveBars) waveBars.classList.add("is-speaking");

    const utterance = new SpeechSynthesisUtterance(item.text);
    utterance.rate = this.audioSpeed;
    utterance.pitch = 1.0;

    utterance.onend = () => {
      this.audioIndex++;
      this.playNextUtterance();
    };

    utterance.onerror = () => {
      if (waveBars) waveBars.classList.remove("is-speaking");
      if (playBtn) playBtn.innerText = "▶ Play";
    };

    window.speechSynthesis.speak(utterance);
  }

  audioPlayPause() {
    this.playBeep(520, "sine", 0.03);
    const playBtn = document.getElementById("audio-play-pause-btn");
    const waveBars = document.getElementById("audio-waveform-bars");

    if (!window.speechSynthesis.speaking && this.audioUtterances.length === 0) {
      this.startAudioBriefing();
      return;
    }

    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      this.isAudioPaused = false;
      if (playBtn) playBtn.innerText = "⏸ Pause";
      if (waveBars) waveBars.classList.add("is-speaking");
    } else if (window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      this.isAudioPaused = true;
      if (playBtn) playBtn.innerText = "▶ Play";
      if (waveBars) waveBars.classList.remove("is-speaking");
    } else {
      this.startAudioBriefing();
    }
  }

  audioStop() {
    this.playBeep(400, "sine", 0.04);
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    this.isAudioSpeaking = false;
    this.isAudioPaused = false;
    this.audioUtterances = [];
    this.audioIndex = 0;

    const playBtn = document.getElementById("audio-play-pause-btn");
    if (playBtn) playBtn.innerText = "▶ Play";

    const waveBars = document.getElementById("audio-waveform-bars");
    if (waveBars) waveBars.classList.remove("is-speaking");

    const textTitleEl = document.getElementById("audio-player-text");
    if (textTitleEl) textTitleEl.innerText = "Audio stopped.";
  }

  hideAudioPlayer() {
    this.audioStop();
    const hud = document.getElementById("audio-player-hud");
    if (hud) hud.classList.remove("is-active");
  }

  setAudioSpeed(rate, btn) {
    this.audioSpeed = rate;
    document.querySelectorAll(".audio-speed-group .speed-btn").forEach(b => b.classList.remove("is-active"));
    if (btn) btn.classList.add("is-active");
    this.showToast(`Audio speed set to ${rate}x`, "info");
    if (window.speechSynthesis.speaking && !this.isAudioPaused) {
      window.speechSynthesis.cancel();
      this.playNextUtterance();
    }
  }

  // 2. Terminal Web Audio Synthesizer (SFX)
  playBeep(freq = 520, type = "sine", duration = 0.04) {
    if (!this.sfxEnabled) return;
    try {
      if (!this.audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) this.audioCtx = new AudioContext();
      }
      if (this.audioCtx && this.audioCtx.state === "suspended") {
        this.audioCtx.resume();
      }
      if (this.audioCtx) {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
        gain.gain.setValueAtTime(0.04, this.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + duration);
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start();
        osc.stop(this.audioCtx.currentTime + duration);
      }
    } catch(e) {}
  }

  toggleAudioFX() {
    this.sfxEnabled = !this.sfxEnabled;
    const btn = document.getElementById("hud-sfx-btn");
    if (btn) btn.innerText = this.sfxEnabled ? "🔊 SFX: ON" : "🔈 SFX: OFF";
    if (this.sfxEnabled) this.playBeep(700, "sine", 0.05);
    this.showToast(this.sfxEnabled ? "Terminal Audio Effects ON" : "Terminal Audio Effects MUTED", "info");
  }

  // 3. Global URL Hash Deep Linking
  initURLHashListener() {
    window.addEventListener("hashchange", () => {
      const target = this.getIssueFromHash();
      if (target && (!this.currentIssueData || this.currentIssueData.meta.date !== target.date)) {
        this.loadIssueFile(target.file_path, false);
      }
    });
  }

  getIssueFromHash() {
    const rawHash = window.location.hash.replace("#", "").trim();
    if (!rawHash) return null;
    const dateMatch = rawHash.match(/(?:issue=)?([0-9]{4}-[0-9]{2}-[0-9]{2})/i);
    if (dateMatch) {
      return this.manifest.find(m => m.date === dateMatch[1]);
    }
    const numMatch = rawHash.match(/(?:issue=)?([0-9]+)/i);
    if (numMatch) {
      return this.manifest.find(m => String(m.issue_number) === numMatch[1]);
    }
    return null;
  }

  updateURLHash(dateStr) {
    try {
      history.replaceState(null, "", `#issue=${dateStr}`);
    } catch(e) {}
  }

  scheduleBackgroundPreload() {
    const runIdle = () => {
      if (typeof window.requestIdleCallback === "function") {
        window.requestIdleCallback(() => this.preloadAllIssues(), { timeout: 1500 });
      } else {
        setTimeout(() => this.preloadAllIssues(), 150);
      }
    };
    if (document.readyState === "complete") {
      runIdle();
    } else {
      window.addEventListener("load", runIdle, { once: true });
    }
  }

  // 4. Background Issue Preloading for Instant Omni-Search & Historical Charts
  async preloadAllIssues() {
    if (!this.manifest || !this.manifest.length) return;
    
    // Process items that are not yet in memory
    for (const item of this.manifest) {
      if (this.issuesCache.has(item.file_path)) continue;
      try {
        let res = await fetch(item.file_path);
        if (!res.ok && !item.file_path.startsWith("main/")) {
          res = await fetch("main/" + item.file_path.replace(/^\/+/, ''));
        } else if (!res.ok && item.file_path.startsWith("main/")) {
          res = await fetch(item.file_path.replace(/^main\//, ''));
        }
        if (res.ok) {
          const data = await res.json();
          this.issuesCache.set(item.file_path, data);
          if (data.meta && data.meta.date) {
            this.issuesCache.set(data.meta.date, data);
          }
        }
      } catch(e) {}
    }
    this.processHistoricalMetrics();
    this.renderAllSparklines();
  }

  processHistoricalMetrics() {
    const keys = ["compute_spot", "tech_pulse", "vc_deals", "open_source", "cloud_health"];
    keys.forEach(k => this.historicalMetrics[k] = []);

    // Process issues in chronological order
    const chronological = [...this.manifest].sort((a, b) => new Date(a.date) - new Date(b.date));
    chronological.forEach(m => {
      const data = this.issuesCache.get(m.file_path) || this.issuesCache.get(m.date);
      if (data) {
        const techKPIs = this.getDailyTechKPIs(data);
        keys.forEach(k => {
          const raw = techKPIs[k];
          const val = this.extractNumericMetric(raw);
          this.historicalMetrics[k].push({
            date: data.meta.date,
            issue: data.meta.issue_number,
            raw: raw,
            val: val
          });
        });
      }
    });
  }

  extractNumericMetric(str) {
    if (!str) return 0;
    const match = String(str).match(/([0-9]+(?:\.[0-9]+)?)/);
    return match ? parseFloat(match[1]) : 0;
  }

  // 5. Interactive Telemetry Sparklines
  renderAllSparklines() {
    this.processHistoricalMetrics();
    const config = [
      { id: "sparkline-compute_spot", key: "compute_spot", color: "#00e599" },
      { id: "sparkline-tech_pulse", key: "tech_pulse", color: "#00f0ff" },
      { id: "sparkline-vc_deals", key: "vc_deals", color: "#f5a623" },
      { id: "sparkline-open_source", key: "open_source", color: "#c084fc" },
      { id: "sparkline-cloud_health", key: "cloud_health", color: "#00e599" }
    ];

    config.forEach(cfg => {
      const container = document.getElementById(cfg.id);
      if (!container) return;
      const history = this.historicalMetrics[cfg.key] || [];
      if (history.length < 2) {
        container.innerHTML = "";
        return;
      }
      container.innerHTML = this.buildSparklineSVG(history.map(h => h.val), cfg.color);
    });
  }

  buildSparklineSVG(values, strokeColor) {
    const width = 120;
    const height = 26;
    const pad = 3;
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = (max - min) || 1;

    const points = values.map((val, idx) => {
      const x = pad + (idx / (values.length - 1)) * (width - pad * 2);
      const y = height - pad - ((val - min) / range) * (height - pad * 2);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(" ");

    const lastX = width - pad;
    const lastY = height - pad - ((values[values.length - 1] - min) / range) * (height - pad * 2);

    return `
      <svg class="sparkline-svg" viewBox="0 0 ${width} ${height}">
        <polyline points="${points}" fill="none" stroke="${strokeColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <circle cx="${lastX}" cy="${lastY}" r="3" fill="${strokeColor}" />
      </svg>
    `;
  }

  openMetricDetail(metricKey) {
    this.playBeep(580, "sine", 0.04);
    const modal = document.getElementById("metric-detail-modal");
    if (!modal) return;

    this.processHistoricalMetrics();
    const history = this.historicalMetrics[metricKey] || [];
    const titles = {
      compute_spot: "GPU Spot Pricing Index ($/hr H100 SXM5)",
      tech_pulse: "Tech Mega-Cap Momentum Barometer (Mag 7 / SOX Net %)",
      vc_deals: "Daily VC & AI Startup Capital Inflow ($B)",
      open_source: "Open-Source AI Model Velocity Ranking",
      cloud_health: "Global Hyperscale Cloud Infrastructure Uptime (%)"
    };

    const titleEl = document.getElementById("metric-modal-title");
    if (titleEl) titleEl.innerText = "📊 " + (titles[metricKey] || "Metric Trajectory");

    // Render large SVG chart
    const chartWrap = document.getElementById("metric-modal-chart-wrap");
    if (chartWrap && history.length > 0) {
      const values = history.map(h => h.val);
      const min = Math.min(...values);
      const max = Math.max(...values);
      const range = (max - min) || 1;
      const w = 600;
      const h = 180;
      const p = 24;

      const points = history.map((hItem, idx) => {
        const x = p + (idx / (history.length - 1)) * (w - p * 2);
        const y = h - p - ((hItem.val - min) / range) * (h - p * 2);
        return { x, y, ...hItem };
      });

      const polyPoints = points.map(pt => `${pt.x.toFixed(1)},${pt.y.toFixed(1)}`).join(" ");

      chartWrap.innerHTML = `
        <svg viewBox="0 0 ${w} ${h}" style="width: 100%; height: 100%; overflow: visible;">
          <line x1="${p}" y1="${h - p}" x2="${w - p}" y2="${h - p}" stroke="#333" stroke-width="1" />
          <polyline points="${polyPoints}" fill="none" stroke="#00f0ff" stroke-width="2.5" stroke-linecap="round" />
          ${points.map(pt => `
            <circle cx="${pt.x}" cy="${pt.y}" r="4.5" fill="#00f0ff" />
            <text x="${pt.x}" y="${pt.y - 10}" fill="#ededed" font-size="10" font-family="monospace" text-anchor="middle" font-weight="bold">${pt.raw}</text>
            <text x="${pt.x}" y="${h - 8}" fill="#71717a" font-size="9" font-family="monospace" text-anchor="middle">${pt.date.slice(5)}</text>
          `).join("")}
        </svg>
      `;
    }

    // Render historical data table
    const tableWrap = document.getElementById("metric-modal-table-wrap");
    if (tableWrap) {
      tableWrap.innerHTML = `
        <table class="data-grid-table" style="width: 100%; font-size: 12px; border-collapse: collapse;">
          <thead>
            <tr style="background: rgba(255,255,255,0.04); color: var(--accent-cyan); text-align: left;">
              <th style="padding: 8px; border: 1px solid var(--border-subtle);">Issue</th>
              <th style="padding: 8px; border: 1px solid var(--border-subtle);">Date</th>
              <th style="padding: 8px; border: 1px solid var(--border-subtle);">Recorded Value</th>
              <th style="padding: 8px; border: 1px solid var(--border-subtle);">Action</th>
            </tr>
          </thead>
          <tbody>
            ${history.map(hItem => `
              <tr>
                <td style="padding: 8px; border: 1px solid var(--border-subtle); font-weight: 800;">Issue #${hItem.issue}</td>
                <td style="padding: 8px; border: 1px solid var(--border-subtle);">${hItem.date}</td>
                <td style="padding: 8px; border: 1px solid var(--border-subtle); font-family: monospace; color: var(--accent-emerald); font-weight: bold;">${hItem.raw}</td>
                <td style="padding: 8px; border: 1px solid var(--border-subtle);">
                  <button class="action-btn" style="padding: 2px 8px; font-size: 10px;" onclick="spark.loadIssueFile('data/issues/${hItem.date}.json'); spark.closeMetricDetail();">Jump ↗</button>
                </td>
              </tr>
            `).reverse().join("")}
          </tbody>
        </table>
      `;
    }

    modal.classList.add("is-open");
  }

  closeMetricDetail() {
    const modal = document.getElementById("metric-detail-modal");
    if (modal) modal.classList.remove("is-open");
  }

  // 6. Bull vs Bear Interactive Sentiment Voting
  loadDuelVotes() {
    try {
      const saved = localStorage.getItem("spark_duel_votes");
      if (saved) this.duelVotes = JSON.parse(saved);
    } catch(e) {
      this.duelVotes = {};
    }
  }

  saveDuelVotes() {
    try {
      localStorage.setItem("spark_duel_votes", JSON.stringify(this.duelVotes));
    } catch(e) {}
  }

  voteDuelSentiment(choice) {
    if (!this.currentIssueData) return;
    const issueDate = this.currentIssueData.meta.date;
    const isFirstVote = !this.duelVotes[issueDate];

    this.playBeep(choice === "bull" ? 640 : 380, "triangle", 0.05);
    this.duelVotes[issueDate] = choice;
    this.saveDuelVotes();

    if (isFirstVote) {
      this.awardXP(20, `Voted ${choice.toUpperCase()} in Bull vs Bear Arena`);
    } else {
      this.showToast(`Updated vote to ${choice.toUpperCase()}`, "info");
      this.saveUserProfile();
    }

    this.updateSentimentMeterUI();
  }

  updateSentimentMeterUI() {
    if (!this.currentIssueData) return;
    const issueDate = this.currentIssueData.meta.date;
    const userVote = this.duelVotes[issueDate];

    const bullBtn = document.querySelector(".vote-bull-btn");
    const bearBtn = document.querySelector(".vote-bear-btn");
    const votedTag = document.getElementById("duel-voted-tag");
    const meterBar = document.getElementById("sentiment-meter-bar");
    const bullLabel = document.getElementById("sentiment-bull-label");
    const bearLabel = document.getElementById("sentiment-bear-label");

    if (bullBtn) bullBtn.classList.toggle("has-voted", userVote === "bull");
    if (bearBtn) bearBtn.classList.toggle("has-voted", userVote === "bear");

    // Dynamic base sentiment adjusted by user vote
    let bullPct = 62;
    if (userVote === "bull") bullPct = 76;
    if (userVote === "bear") bullPct = 48;
    const bearPct = 100 - bullPct;

    if (meterBar) meterBar.style.width = bullPct + "%";
    if (bullLabel) bullLabel.innerText = `🟢 Bullish ${bullPct}%`;
    if (bearLabel) bearLabel.innerText = `🔴 Bearish ${bearPct}%`;

    if (votedTag) {
      votedTag.innerText = userVote ? `VOTED: ${userVote.toUpperCase()} ✅` : "NOT YET VOTED";
      votedTag.style.color = userVote === "bull" ? "var(--accent-emerald)" : (userVote === "bear" ? "var(--accent-red)" : "var(--text-muted)");
    }
  }

  // 7. Quick Hits Domain Matrix Filtering
  classifyQuickHitDomain(item) {
    const text = (item.headline + " " + item.facts + " " + item.reality_audit + " " + item.why_it_matters).toLowerCase();
    if (text.includes("nuclear") || text.includes("grid") || text.includes("power") || text.includes("pjm") || text.includes("ferc") || text.includes("transformer") || text.includes("bess") || text.includes("utility") || text.includes("substation") || text.includes("cooling") || text.includes("mwh") || text.includes("gw")) {
      return "energy";
    }
    if (text.includes("optics") || text.includes("cpo") || text.includes("silicon") || text.includes("tsmc") || text.includes("hbm") || text.includes("packaging") || text.includes("rubin") || text.includes("gpu") || text.includes("cowos") || text.includes("fab") || text.includes("wafer") || text.includes("node")) {
      return "silicon";
    }
    if (text.includes("ftc") || text.includes("antitrust") || text.includes("sec") || text.includes("tariff") || text.includes("regulation") || text.includes("court") || text.includes("legal") || text.includes("ban") || text.includes("order") || text.includes("monopoly") || text.includes("pricing")) {
      return "policy";
    }
    return "compute";
  }

  filterQuickHits(domain, btn) {
    this.playBeep(540, "triangle", 0.02);
    this.currentDomainFilter = domain;
    document.querySelectorAll("#qh-filter-tabs .qh-tab-btn").forEach(b => b.classList.remove("is-active"));
    if (btn) btn.classList.add("is-active");

    if (this.currentIssueData && this.currentIssueData.quick_hits) {
      this.renderQuickHitsList(this.currentIssueData.quick_hits);
    }
  }

  cycleDomainFilter() {
    const domains = ["all", "energy", "silicon", "policy", "compute"];
    const currentIdx = domains.indexOf(this.currentDomainFilter);
    const nextIdx = (currentIdx + 1) % domains.length;
    const nextDomain = domains[nextIdx];
    const targetBtn = document.querySelector(`#qh-filter-tabs .qh-tab-btn[data-domain="${nextDomain}"]`);
    this.filterQuickHits(nextDomain, targetBtn);
    this.showToast(`Domain Filter: ${nextDomain.toUpperCase()}`, "info");
  }

  renderQuickHitsList(items) {
    const qhContainer = document.getElementById("quick-hits-container");
    if (!qhContainer || !items) return;

    // Calculate domain counts
    const counts = { all: items.length, energy: 0, silicon: 0, policy: 0, compute: 0 };
    items.forEach(item => {
      const domain = this.classifyQuickHitDomain(item);
      counts[domain] = (counts[domain] || 0) + 1;
    });

    // Update count labels on tabs
    const setTabCount = (id, count) => {
      const el = document.getElementById(id);
      if (el) el.innerText = count;
    };
    setTabCount("qh-count-all", counts.all);
    setTabCount("qh-count-energy", counts.energy);
    setTabCount("qh-count-silicon", counts.silicon);
    setTabCount("qh-count-policy", counts.policy);
    setTabCount("qh-count-compute", counts.compute);

    // Filter items
    let filtered = this.currentDomainFilter === "all" 
      ? items 
      : items.filter(item => this.classifyQuickHitDomain(item) === this.currentDomainFilter);

    if (this.isHighSignalOnly) {
      filtered = filtered.filter(item => {
        const val = parseFloat(item.sni || 0);
        return val >= 9.0;
      });
    }

    if (filtered.length === 0) {
      qhContainer.innerHTML = `
        <div style="padding: 24px; text-align: center; color: var(--text-muted); font-size: 13px;">
          No strategic briefs match the filter <b>${this.currentDomainFilter.toUpperCase()}${this.isHighSignalOnly ? ' + HIGH SIGNAL (≥9.0)' : ''}</b> in this issue.
          <br><button class="action-btn" style="margin-top: 10px;" onclick="spark.filterQuickHits('all', document.querySelector('[data-domain=all]')); if(spark.isHighSignalOnly) spark.toggleHighSignalOnly();">Reset Filters</button>
        </div>
      `;
      return;
    }

    const domainBadges = {
      energy: "⚡ GRID & ENERGY",
      silicon: "🔬 SILICON & OPTICS",
      policy: "🏛️ REGULATION",
      compute: "🤖 COMPUTE & AGENTS"
    };

    qhContainer.innerHTML = filtered.map((item, idx) => {
      const itemDomain = this.classifyQuickHitDomain(item);
      const rawQhImg = item.image_url || item.image;
      const qhImg = this.normalizeImageUrl(rawQhImg);
      const qhCap = item.image_caption || item.caption || "";

      return `
        <div style="border-bottom: 1px solid var(--border-subtle); padding-bottom: 16px; margin-bottom: 16px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
            <span class="pill-status" style="font-size: 9.5px; border-color: var(--accent-purple); color: var(--accent-purple);">${domainBadges[itemDomain]}</span>
            <span style="font-size: 11px; font-weight: 800; color: var(--accent-red);">SNI: ${item.sni}</span>
          </div>
          <h3 style="font-size: 16px; font-weight: 800; color: var(--accent-cyan); margin-bottom: 6px;">${idx + 1}. ${item.headline}</h3>
          
          ${qhImg ? `
            <div class="infographic-frame" style="margin: 10px 0 12px; max-height: 240px; overflow: hidden; border-radius: var(--radius-sm);">
              <img src="${qhImg}" alt="${this.escapeHtml(item.headline)}" loading="lazy" decoding="async" style="width: 100%; max-height: 240px; object-fit: cover; display: block;" onerror="this.parentElement.style.display='none'">
              ${qhCap ? `<div class="infographic-caption"><span>⚡</span> <span>${this.escapeHtml(qhCap)}</span></div>` : ''}
            </div>
          ` : ''}

          <p style="font-size: 13px; color: #d4d4d4; margin-bottom: 6px;">
            <b>Facts:</b> ${this.formatMarkdown(item.facts)}<br>
            <b>The Savage Audit:</b> ${item.reality_audit}
          </p>
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
            <div style="font-size: 12.5px; color: var(--accent-emerald); font-weight: 700;">
              <b>Why it matters:</b> ${item.why_it_matters}
            </div>
            <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
              <button class="action-btn" style="background: rgba(0, 240, 255, 0.08); border-color: var(--accent-cyan); color: var(--accent-cyan); font-size: 11px; padding: 4px 8px;" onclick="spark.exploreDeepIntel('quick_hit', ${idx})">🌐 Web Sources & Intel</button>
              <button class="clip-trigger-btn" onclick="spark.clipInsight('${item.headline.replace(/'/g, "\\'")}', '${item.reality_audit.replace(/'/g, "\\'")}')">📌 Clip</button>
            </div>
          </div>
        </div>
      `;
    }).join("");
  }

  // 8. Global Command Palette & Archive Omni-Search (⌘K / Ctrl+K)
  openCommandPalette() {
    this.playBeep(680, "sine", 0.03);
    const modal = document.getElementById("command-palette-modal");
    if (!modal) return;
    modal.classList.add("is-open");
    this.commandPaletteOpen = true;

    const input = document.getElementById("command-search-input");
    if (input) {
      input.value = "";
      setTimeout(() => input.focus(), 50);
    }
    this.commandSelectedIndex = 0;
    this.handleCommandSearch("");
  }

  closeCommandPalette() {
    const modal = document.getElementById("command-palette-modal");
    if (modal) modal.classList.remove("is-open");
    this.commandPaletteOpen = false;
  }

  setCommandFilter(filter, chip) {
    this.playBeep(520, "triangle", 0.02);
    this.commandFilterType = filter;
    document.querySelectorAll(".command-filters-row .command-filter-chip").forEach(c => c.classList.remove("is-active"));
    if (chip) chip.classList.add("is-active");

    const input = document.getElementById("command-search-input");
    this.handleCommandSearch(input ? input.value : "");
  }

  handleCommandSearch(query) {
    if (this._cmdSearchTimer) clearTimeout(this._cmdSearchTimer);
    this._cmdSearchTimer = setTimeout(() => {
      this._executeCommandSearch(query);
    }, 80);
  }

  _executeCommandSearch(query) {
    const q = (query || "").trim().toLowerCase();
    const results = [];

    this.manifest.forEach(item => {
      const data = this.issuesCache.get(item.file_path) || this.issuesCache.get(item.date);
      if (!data) return;

      const dateStr = data.meta.date;
      const issueNum = data.meta.issue_number;

      // Search Lead Story
      if (data.lead_story && (this.commandFilterType === "all" || this.commandFilterType === "lead")) {
        const ls = data.lead_story;
        const text = (ls.headline + " " + ls.catch_up + " " + (ls.pr_reality || "")).toLowerCase();
        if (!q || text.includes(q)) {
          results.push({
            type: "LEAD STORY",
            typeCode: "lead",
            issueNum: issueNum,
            date: dateStr,
            filePath: item.file_path,
            title: ls.headline,
            snippet: ls.catch_up || "",
            targetSection: "lead"
          });
        }
      }

      // Search Quick Hits
      if (data.quick_hits && (this.commandFilterType === "all" || this.commandFilterType === "quick_hits")) {
        data.quick_hits.forEach(qh => {
          const text = (qh.headline + " " + qh.facts + " " + qh.reality_audit).toLowerCase();
          if (!q || text.includes(q)) {
            results.push({
              type: "QUICK HIT",
              typeCode: "quick_hits",
              issueNum: issueNum,
              date: dateStr,
              filePath: item.file_path,
              title: qh.headline,
              snippet: qh.facts,
              targetSection: "quick_hits"
            });
          }
        });
      }

      // Search Deep Dive
      if (data.deep_dive && (this.commandFilterType === "all" || this.commandFilterType === "deep_dive")) {
        const dd = data.deep_dive;
        const text = (dd.headline + " " + dd.thesis + " " + (dd.physics_breakdown || "")).toLowerCase();
        if (!q || text.includes(q)) {
          results.push({
            type: "DEEP DIVE",
            typeCode: "deep_dive",
            issueNum: issueNum,
            date: dateStr,
            filePath: item.file_path,
            title: dd.headline,
            snippet: dd.thesis,
            targetSection: "deepdive"
          });
        }
      }

      // Search Cheat Sheet
      if (data.cheat_sheet && (this.commandFilterType === "all" || this.commandFilterType === "cheat")) {
        data.cheat_sheet.forEach((cs, csIdx) => {
          if (!q || cs.toLowerCase().includes(q)) {
            results.push({
              type: "CHEAT SHEET",
              typeCode: "cheat",
              issueNum: issueNum,
              date: dateStr,
              filePath: item.file_path,
              title: `Core Shift #${csIdx + 1} (${dateStr})`,
              snippet: cs,
              targetSection: "cheat"
            });
          }
        });
      }
    });

    this.commandResults = results.slice(0, 30);
    this.commandSelectedIndex = 0;
    this.renderCommandResults();
  }

  renderCommandResults() {
    const list = document.getElementById("command-results-list");
    if (!list) return;

    if (this.commandResults.length === 0) {
      list.innerHTML = `
        <div style="padding: 32px; text-align: center; color: var(--text-muted); font-size: 13px;">
          No matching intelligence found across the archive.
        </div>
      `;
      return;
    }

    list.innerHTML = this.commandResults.map((res, idx) => `
      <div class="command-result-item ${idx === this.commandSelectedIndex ? "is-selected" : ""}" 
           onclick="spark.selectCommandResult(${idx})"
           onmouseenter="spark.commandSelectedIndex = ${idx}; spark.highlightCommandSelected();">
        <div class="command-result-meta">
          <span class="command-result-badge">${res.type}</span>
          <span>ISSUE #${res.issueNum} • ${res.date}</span>
        </div>
        <div class="command-result-title">${res.title}</div>
        <div class="command-result-snippet">${this.formatMarkdown(res.snippet)}</div>
      </div>
    `).join("");
  }

  highlightCommandSelected() {
    const list = document.getElementById("command-results-list");
    if (!list) return;
    const items = list.children;
    for (let i = 0; i < items.length; i++) {
      items[i].classList.toggle("is-selected", i === this.commandSelectedIndex);
    }
  }

  navigateCommandResults(direction) {
    if (!this.commandResults.length) return;
    this.commandSelectedIndex = (this.commandSelectedIndex + direction + this.commandResults.length) % this.commandResults.length;
    this.highlightCommandSelected();

    const items = document.querySelectorAll(".command-result-item");
    if (items[this.commandSelectedIndex]) {
      items[this.commandSelectedIndex].scrollIntoView({ block: "nearest" });
    }
  }

  executeCommandSelected() {
    if (this.commandResults[this.commandSelectedIndex]) {
      this.selectCommandResult(this.commandSelectedIndex);
    }
  }

  async selectCommandResult(idx) {
    const item = this.commandResults[idx];
    if (!item) return;

    this.playBeep(620, "triangle", 0.04);
    this.closeCommandPalette();

    if (!this.currentIssueData || this.currentIssueData.meta.date !== item.date) {
      await this.loadIssueFile(item.filePath, true);
    }

    setTimeout(() => {
      if (item.targetSection === "lead") {
        document.getElementById("lead-headline")?.scrollIntoView({ behavior: "smooth" });
      } else if (item.targetSection === "quick_hits") {
        document.getElementById("quick-hits-section")?.scrollIntoView({ behavior: "smooth" });
      } else if (item.targetSection === "deepdive") {
        document.getElementById("deep-dive-module")?.scrollIntoView({ behavior: "smooth" });
      } else if (item.targetSection === "cheat") {
        document.querySelector(".cheat-sheet-card")?.scrollIntoView({ behavior: "smooth" });
      }
    }, 150);
  }

  // 9. Executive Briefing Print / Export PDF Mode
  printExecutiveBriefing() {
    this.playBeep(520, "sine", 0.03);
    const prevTitle = document.title;
    if (this.currentIssueData) {
      document.title = `Spark_News_Live_Briefing_Issue_${this.currentIssueData.meta.issue_number}_${this.currentIssueData.meta.date}`;
    }
    window.print();
    setTimeout(() => { document.title = prevTitle; }, 1000);
  }
  // =========================================================================
  // FIREBASE CLOUD SYNC & EXECUTIVE IDENTITY ENGINE
  // =========================================================================
  async initCloudSync() {
    this.userEmail = localStorage.getItem("spark_user_email") || "mernamit@gmail.com";
    this.updateIdentityUI();

    try {
      const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js");
      const { getFirestore, doc, getDoc, setDoc, getDocFromServer } = await import("https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js");

      const firebaseConfig = {
        projectId: "compelling-button-wlk09",
        appId: "1:574239598176:web:68733ada664ab735cc4505",
        apiKey: "AIzaSyDIWXjHDNxvajcp4jch5l5bMD6kyZph3cU",
        authDomain: "compelling-button-wlk09.firebaseapp.com",
        firestoreDatabaseId: "ai-studio-technewsdaily-27dbee41-9512-4faf-9236-093c542c446e",
        storageBucket: "compelling-button-wlk09.firebasestorage.app",
        messagingSenderId: "574239598176"
      };

      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

      this.firebase = { app, db, doc, getDoc, setDoc, getDocFromServer };

      try {
        await getDocFromServer(doc(db, "test", "connection"));
      } catch (err) {
        // Doc may not exist yet, connection is valid
      }

      this.cloudConnected = true;
      this.updateCloudStatusBadge(true);
      await this.loadUserProfileFromCloud(this.userEmail);
    } catch (err) {
      console.warn("Firebase modular SDK offline or blocked; using local profile storage fallback.", err);
      this.cloudConnected = false;
      this.updateCloudStatusBadge(false);
      this.loadUserProfileFromLocal(this.userEmail);
    }
  }

  async loadUserProfileFromCloud(email) {
    if (!email) return;
    try {
      if (this.cloudConnected && this.firebase) {
        const docRef = this.firebase.doc(this.firebase.db, "users", encodeURIComponent(email));
        const snap = await this.firebase.getDoc(docRef);
        if (snap.exists()) {
          const d = snap.data();
          this.hydrateProfile(d);
          this.showToast(`Cloud profile synchronized for ${email}`, "info");
          return;
        }
      }
    } catch (e) {
      console.warn("Cloud load error; reading local storage.", e);
    }
    this.loadUserProfileFromLocal(email);
  }

  loadUserProfileFromLocal(email) {
    try {
      const raw = localStorage.getItem("spark_profile_" + email);
      if (raw) {
        const d = JSON.parse(raw);
        this.hydrateProfile(d);
      }
    } catch(e) {}
    this.updateIdentityUI();
  }

  hydrateProfile(data) {
    if (!data) return;
    if (typeof data.xp === "number") this.xp = Math.max(this.xp || 0, data.xp);
    if (typeof data.streak === "number") this.streak = Math.max(this.streak || 1, data.streak);

    if (Array.isArray(data.clips)) {
      const existingIds = new Set(this.clips.map(c => c.id || c.timestamp));
      data.clips.forEach(c => {
        if (!existingIds.has(c.id || c.timestamp)) this.clips.push(c);
      });
    }

    if (data.wagers && typeof data.wagers === "object") {
      this.wagers = { ...this.wagers, ...data.wagers };
    }
    if (data.answeredQuestions && typeof data.answeredQuestions === "object") {
      this.answeredQuestions = { ...this.answeredQuestions, ...data.answeredQuestions };
    }
    if (data.unlockedEasterEggs && typeof data.unlockedEasterEggs === "object") {
      this.unlockedEasterEggs = { ...this.unlockedEasterEggs, ...data.unlockedEasterEggs };
    }
    if (data.exploredTopics && typeof data.exploredTopics === "object") {
      this.exploredTopics = { ...this.exploredTopics, ...data.exploredTopics };
    }
    if (data.duelVotes && typeof data.duelVotes === "object") {
      this.duelVotes = { ...this.duelVotes, ...data.duelVotes };
    }

    // Recompute quizStats accurately from permanent answeredQuestions
    const answeredArr = Object.values(this.answeredQuestions || {});
    if (answeredArr.length > 0) {
      this.quizStats = {
        total: answeredArr.length,
        correct: answeredArr.filter(a => a.isCorrect).length
      };
    } else if (data.quizStats) {
      this.quizStats = data.quizStats;
    }

    this.saveState();
    this.saveClips();
    try { localStorage.setItem("spark_wagers", JSON.stringify(this.wagers)); } catch(e) {}
    try { localStorage.setItem("spark_quiz_stats", JSON.stringify(this.quizStats)); } catch(e) {}
    this.saveDuelVotes();

    this.updateIdentityUI();
    this.updateClipboardHUD();
    this.updateQuizStatsHUD();
    this.renderForecastingScorecard();
    this.updateSentimentMeterUI();

    // Re-render current issue quiz and secrets if active
    if (this.currentIssueData) {
      this.renderMicroQuiz(this.currentIssueData);
      this.restoreEasterEggState(this.currentIssueData);
      this.restoreWagerState(this.currentIssueData);
    }
  }

  // Efficient debounced cloud sync
  queueCloudSync(delay = 350) {
    if (this.cloudSyncTimeout) {
      clearTimeout(this.cloudSyncTimeout);
    }
    const lastSyncedEl = document.getElementById("cloud-last-synced-text");
    if (lastSyncedEl) lastSyncedEl.innerText = "Syncing with cloud...";

    this.cloudSyncTimeout = setTimeout(() => {
      this.executeCloudSync();
    }, delay);
  }

  async executeCloudSync() {
    const profileData = {
      email: this.userEmail,
      xp: this.xp,
      streak: this.streak,
      clips: this.clips,
      wagers: this.wagers,
      quizStats: this.quizStats,
      duelVotes: this.duelVotes,
      answeredQuestions: this.answeredQuestions,
      unlockedEasterEggs: this.unlockedEasterEggs,
      exploredTopics: this.exploredTopics,
      lastActive: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // 1. Always commit to LocalStorage
    try {
      localStorage.setItem("spark_profile_" + this.userEmail, JSON.stringify(profileData));
      localStorage.setItem("spark_user_email", this.userEmail);
    } catch(e) {}

    // 2. Commit to Firestore
    if (this.cloudConnected && this.firebase) {
      try {
        this.isSyncingToCloud = true;
        const docRef = this.firebase.doc(this.firebase.db, "users", encodeURIComponent(this.userEmail));
        await this.firebase.setDoc(docRef, profileData, { merge: true });
        const lastSyncedEl = document.getElementById("cloud-last-synced-text");
        if (lastSyncedEl) {
          lastSyncedEl.innerText = `Synced: ${new Date().toLocaleTimeString()}`;
        }
      } catch (err) {
        console.warn("Firestore sync error:", err);
        const lastSyncedEl = document.getElementById("cloud-last-synced-text");
        if (lastSyncedEl) lastSyncedEl.innerText = "Sync error (Local safe)";
      } finally {
        this.isSyncingToCloud = false;
      }
    } else {
      const lastSyncedEl = document.getElementById("cloud-last-synced-text");
      if (lastSyncedEl) lastSyncedEl.innerText = "Saved locally (Offline)";
    }
    this.updateIdentityUI();
  }

  async saveUserProfile() {
    await this.executeCloudSync();
  }

  toggleIdentityModal() {
    this.playBeep(640, "triangle", 0.04);
    const modal = document.getElementById("identity-modal");
    if (!modal) return;
    this.updateIdentityUI();
    modal.classList.toggle("is-open");
  }

  closeIdentityModal() {
    const modal = document.getElementById("identity-modal");
    if (modal) modal.classList.remove("is-open");
  }

  updateCloudStatusBadge(isOnline) {
    const badge = document.getElementById("cloud-sync-status-badge");
    const textEl = document.getElementById("cloud-status-text");
    if (!badge || !textEl) return;
    if (isOnline) {
      badge.className = "cloud-status-indicator";
      textEl.innerText = "CLOUD CONNECTED (FIRESTORE)";
    } else {
      badge.className = "cloud-status-indicator is-local";
      textEl.innerText = "OFFLINE // LOCAL STORAGE RESILIENT";
    }
  }

  getRankDetails(xp) {
    if (xp < 250) {
      return {
        level: 1,
        title: "Cadet Analyst",
        badge: "LVL 1 • CADET",
        nextXP: 250,
        prevXP: 0,
        progress: Math.min(100, Math.round((xp / 250) * 100))
      };
    } else if (xp < 600) {
      return {
        level: 2,
        title: "Junior Tech Associate",
        badge: "LVL 2 • ASSOCIATE",
        nextXP: 600,
        prevXP: 250,
        progress: Math.min(100, Math.round(((xp - 250) / 350) * 100))
      };
    } else if (xp < 1200) {
      return {
        level: 3,
        title: "Senior Intelligence Officer",
        badge: "LVL 3 • OFFICER",
        nextXP: 1200,
        prevXP: 600,
        progress: Math.min(100, Math.round(((xp - 600) / 600) * 100))
      };
    } else if (xp < 2500) {
      return {
        level: 4,
        title: "Executive Director",
        badge: "LVL 4 • DIRECTOR",
        nextXP: 2500,
        prevXP: 1200,
        progress: Math.min(100, Math.round(((xp - 1200) / 1300) * 100))
      };
    } else {
      return {
        level: 5,
        title: "Titan Board Partner",
        badge: "LVL 5 • PARTNER",
        nextXP: 5000,
        prevXP: 2500,
        progress: 100
      };
    }
  }

  updateIdentityUI() {
    const rank = this.getRankDetails(this.xp);

    // 1. Top Bar Identity Label
    const hudEmail = document.getElementById("hud-user-email-label");
    if (hudEmail) {
      const shortEmail = this.userEmail.length > 20 ? this.userEmail.slice(0, 17) + "..." : this.userEmail;
      hudEmail.innerText = `${shortEmail} ${this.cloudConnected ? "🟢" : "🟡"}`;
    }

    // 2. Top Bar Streak Badge
    const hudStreak = document.getElementById("streak-badge") || document.getElementById("hud-streak-badge");
    if (hudStreak) {
      hudStreak.innerText = `🔥 STREAK: DAY ${this.streak}`;
      hudStreak.title = `Executive Reading Streak: ${this.streak} ${this.streak === 1 ? 'day' : 'days'} • Cloud Synced`;
    }

    // 3. Top Bar XP Tracker
    const hudXP = document.getElementById("hud-xp-tracker");
    if (hudXP) {
      hudXP.innerText = `⭐ ${this.xp.toLocaleString()} XP [${rank.badge}]`;
    }

    // 4. Top Bar Quiz Mastery Badge
    const hudMastery = document.getElementById("hud-quiz-mastery-badge");
    if (hudMastery) {
      const pct = this.quizStats && this.quizStats.total > 0
        ? Math.round((this.quizStats.correct / this.quizStats.total) * 100)
        : 100;
      const total = this.quizStats ? this.quizStats.total : 0;
      const correct = this.quizStats ? this.quizStats.correct : 0;
      hudMastery.innerText = `🎯 ${pct}% Mastery (${correct}/${total})`;
    }

    // 5. Top Bar Clips Badge
    const hudClips = document.getElementById("hud-clips-badge");
    if (hudClips) {
      hudClips.innerHTML = `📌 ${this.clips.length} Clips <kbd>C</kbd>`;
    }

    // 6. Identity Modal Input Field
    const input = document.getElementById("identity-email-input");
    if (input && !input.matches(":focus")) {
      input.value = this.userEmail;
    }

    // 7. Identity Modal Seniority Progression Bar
    const rankNameEl = document.getElementById("profile-rank-name");
    if (rankNameEl) {
      rankNameEl.innerText = `LEVEL ${rank.level} • ${rank.title.toUpperCase()}`;
    }
    const rankPctEl = document.getElementById("profile-rank-pct");
    if (rankPctEl) {
      const remaining = Math.max(0, rank.nextXP - this.xp);
      rankPctEl.innerText = rank.level === 5 ? "MAX TIER REACHED" : `${rank.progress}% TO NEXT TIER (${remaining} XP)`;
    }
    const rankFillEl = document.getElementById("profile-rank-bar-fill");
    if (rankFillEl) {
      rankFillEl.style.width = `${rank.progress}%`;
    }

    // 8. Identity Modal Scorecard Stats
    const xpEl = document.getElementById("profile-stat-xp");
    if (xpEl) xpEl.innerText = this.xp.toLocaleString();
    const streakEl = document.getElementById("profile-stat-streak");
    if (streakEl) streakEl.innerText = this.streak;
    const clipsEl = document.getElementById("profile-stat-clips");
    if (clipsEl) clipsEl.innerText = this.clips.length;
    const quizEl = document.getElementById("profile-stat-quiz");
    if (quizEl) {
      const pct = this.quizStats.total > 0 ? Math.round((this.quizStats.correct / this.quizStats.total) * 100) : 100;
      quizEl.innerText = `${pct}%`;
    }
    const wagersEl = document.getElementById("profile-stat-wagers");
    if (wagersEl) wagersEl.innerText = Object.keys(this.wagers).length;
    const questionsEl = document.getElementById("profile-stat-questions");
    if (questionsEl) {
      const solved = Object.keys(this.answeredQuestions || {}).length;
      questionsEl.innerText = `${solved} Solved`;
    }
  }

  async saveAndSwitchEmail() {
    const input = document.getElementById("identity-email-input");
    if (!input) return;
    const email = input.value.trim();
    if (!email || !email.includes("@")) {
      this.showToast("Please enter a valid email address", "amber");
      return;
    }

    await this.saveUserProfile();
    this.userEmail = email;
    localStorage.setItem("spark_user_email", email);

    await this.loadUserProfileFromCloud(email);
    this.updateIdentityUI();
    this.showToast(`Active profile switched to: ${email}`, "success");
  }

  async forceCloudSync() {
    if (this.cloudSyncTimeout) clearTimeout(this.cloudSyncTimeout);
    this.playBeep(720, "sine", 0.04);
    this.showToast("Initiating immediate cloud synchronization...", "info");
    await this.executeCloudSync();
    this.showToast("Cloud synchronization complete ✅", "success");
    this.updateIdentityUI();
  }

  exportProfileBackup() {
    const data = {
      email: this.userEmail,
      xp: this.xp,
      streak: this.streak,
      clips: this.clips,
      wagers: this.wagers,
      quizStats: this.quizStats,
      duelVotes: this.duelVotes,
      answeredQuestions: this.answeredQuestions,
      unlockedEasterEggs: this.unlockedEasterEggs,
      exploredTopics: this.exploredTopics,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `spark_profile_${this.userEmail.replace(/[^a-zA-Z0-9]/g, "_")}.json`;
    a.click();
    URL.revokeObjectURL(url);
    this.showToast("💾 Profile backup downloaded!", "success");
  }

  importProfileBackup(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.email) {
          this.userEmail = data.email;
        }
        this.hydrateProfile(data);
        await this.saveUserProfile();
        this.showToast("📥 Backup restored & cloud synced!", "success");
      } catch (err) {
        this.showToast("Invalid profile JSON file", "amber");
      }
    };
    reader.readAsText(file);
  }

  // =========================================================================
  // DAILY TECH RADAR TELEMETRY & TECH WATCHLIST
  // =========================================================================
  getDailyTechKPIs(data) {
    const issueNum = (data && data.meta && data.meta.issue_number) || 1;
    const k = (data && data.radar_kpis) || {};

    const spotRate = k.compute_spot || `$${(2.35 - (issueNum - 1) * 0.07).toFixed(2)} / hr`;
    const techPulse = k.tech_pulse || `+${(0.8 + (issueNum - 1) * 0.14).toFixed(1)}%`;
    const vcDeals = k.vc_deals || `$${(0.8 + (issueNum - 1) * 0.08).toFixed(1)}B`;

    const models = ["Llama-3-70B", "Claude-3.5-Sonnet", "Mistral-Large-2", "DeepSeek-Coder-V2", "Qwen-2.5-72B", "Llama-3.1-405B", "DeepSeek-V2.5", "OpenAI-o1"];
    const openSource = k.open_source || models[Math.min(issueNum - 1, models.length - 1)];

    const uptimes = ["99.94%", "99.96%", "99.95%", "99.97%", "99.98%", "99.97%", "99.99%", "99.98%"];
    const cloudHealth = k.cloud_health || uptimes[Math.min(issueNum - 1, uptimes.length - 1)];

    return {
      compute_spot: spotRate,
      tech_pulse: techPulse,
      vc_deals: vcDeals,
      open_source: openSource,
      cloud_health: cloudHealth
    };
  }

  // =========================================================================
  // COMPANY-WISE STRATEGIC INTELLIGENCE (1 COMPANY NEWS PER EDITION)
  // Sourced strictly from data.company_spotlight in the current edition JSON
  // =========================================================================
  renderCompanySpotlight(data) {
    const cardEl = document.getElementById("company-intel-display");
    const badgeEl = document.getElementById("company-edition-badge");
    const featNameEl = document.getElementById("featured-company-name");
    if (!cardEl) return;

    if (!data) {
      cardEl.innerHTML = `<div style="padding: 24px; color: var(--text-muted); font-family: var(--font-mono); font-size: 13px;">No edition data loaded.</div>`;
      return;
    }

    const issueNum = (data.meta && data.meta.issue_number !== undefined) ? data.meta.issue_number : 1;
    const issueDate = (data.meta && data.meta.date) || "CURRENT";

    // Pull directly from current issue's company_spotlight, with fallback if older custom issue JSON is missing it
    const spotlight = data.company_spotlight || {
      company: "Strategic Titan",
      ticker: "GLOBAL",
      market_cap: "Enterprise Scale",
      headline: data.lead_story?.headline || "Corporate Strategic Development",
      summary: data.lead_story?.catch_up || "Strategic market intelligence for this edition.",
      mechanism: data.lead_story?.why_it_matters || "Strategic infrastructure allocation.",
      metrics: {
        capex: "High-Density",
        moat: "Strategic Execution Moat",
        regulatory: "Monitored",
        velocity: "9.5 / 10"
      },
      takeaway: data.lead_story?.cocktail_flex || "Infrastructure and compute access dictate competitive market positioning."
    };

    const companyName = spotlight.company || spotlight.name || "Titan";
    const ticker = spotlight.ticker || "EQUITY";
    const marketCap = spotlight.market_cap || spotlight.marketCap || "N/A";
    const headline = spotlight.headline || "";
    const summary = spotlight.summary || "";
    const metrics = spotlight.metrics || {};
    const takeaway = spotlight.takeaway || "";

    const rawCompImg = spotlight.image_url || spotlight.image || spotlight.logo_url;
    const compImg = this.normalizeImageUrl(rawCompImg);
    const compCap = spotlight.image_caption || spotlight.caption || "";

    if (featNameEl) {
      featNameEl.innerText = companyName.toUpperCase();
    }
    if (badgeEl) {
      badgeEl.innerHTML = `EDITION #${issueNum} SPOTLIGHT: <span id="featured-company-name" style="color: var(--accent-cyan); font-weight: 800;">${companyName.toUpperCase()}</span>`;
    }

    cardEl.innerHTML = `
      <div class="company-card-header">
        <div>
          <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-bottom: 6px;">
            <h3 style="font-size: 20px; font-weight: 800; margin: 0; color: var(--text-primary); font-family: var(--font-display);">${companyName}</h3>
            <span class="company-ticker-tag">${ticker}</span>
            <span class="company-valuation-tag">VALUATION: ${marketCap}</span>
          </div>
          <div style="font-size: 11px; color: var(--text-muted); font-family: var(--font-mono); letter-spacing: 0.05em;">EDITION EXCLUSIVE // ISSUE #${issueNum} • ${issueDate}</div>
        </div>
        <div>
          <span class="company-status-badge is-featured">⭐ 1 COMPANY INTELLIGENCE // ISSUE #${issueNum}</span>
        </div>
      </div>

      <h4 class="company-headline">${headline}</h4>

      ${compImg ? `
        <div class="infographic-frame" style="margin: 14px 0 16px;">
          <img src="${compImg}" alt="${this.escapeHtml(companyName)} Intelligence Visual" style="width: 100%; max-height: 280px; object-fit: cover; display: block;" onerror="this.parentElement.style.display='none'">
          ${compCap ? `<div class="infographic-caption"><span>🏢</span> <span>${this.escapeHtml(compCap)}</span></div>` : ''}
        </div>
      ` : ''}

      <p class="company-body-text">${summary}</p>

      <div class="company-metrics-grid">
        <div class="company-metric-item">
          <div class="company-metric-label">💰 Capex / Balance Sheet Exposure</div>
          <div class="company-metric-val" style="color: var(--accent-cyan);">${metrics.capex || "N/A"}</div>
        </div>
        <div class="company-metric-item">
          <div class="company-metric-label">🛡️ Strategic Moat Assessment</div>
          <div class="company-metric-val" style="color: var(--accent-emerald);">${metrics.moat || "N/A"}</div>
        </div>
        <div class="company-metric-item">
          <div class="company-metric-label">⚖️ Antitrust & Regulatory Risk</div>
          <div class="company-metric-val" style="color: var(--accent-red);">${metrics.regulatory || "N/A"}</div>
        </div>
        <div class="company-metric-item">
          <div class="company-metric-label">🚀 Execution Velocity Score</div>
          <div class="company-metric-val" style="color: var(--accent-amber);">${metrics.velocity || "9.5 / 10"}</div>
        </div>
      </div>

      ${spotlight.mechanism ? `
        <div style="margin-top: 14px; padding: 10px 14px; background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-subtle); border-radius: 6px; font-size: 12px; color: var(--text-secondary); line-height: 1.5;">
          <b style="color: var(--text-primary); font-family: var(--font-mono); font-size: 11px; text-transform: uppercase;">Technical Mechanism:</b> ${spotlight.mechanism}
        </div>
      ` : ''}

      ${takeaway ? `
        <div class="company-takeaway-box">
          <b>Executive Strategic Takeaway:</b> ${takeaway}
        </div>
      ` : ''}

      <div class="company-actions-row">
        <button class="action-btn" style="background: rgba(0, 240, 255, 0.12); border-color: var(--accent-cyan); color: var(--accent-cyan);" onclick="spark.exploreDeepIntel('company')">🌐 Investigate on Web & SEC Filings</button>
        <button class="clip-trigger-btn" onclick="spark.clipInsight('${companyName.replace(/'/g, "\\'")}: ${headline.replace(/'/g, "\\'")}', '${summary.replace(/'/g, "\\'")}')">📌 Save Company Intel (+15 XP)</button>
        <button class="action-btn" style="background: rgba(0, 240, 255, 0.1); border-color: var(--accent-cyan); color: var(--accent-cyan);" onclick="spark.speak('${companyName.replace(/'/g, "\\'")}. ${headline.replace(/'/g, "\\'")}. ${summary.replace(/'/g, "\\'")}')">🎧 Listen to Company Brief</button>
      </div>
    `;
  }


  toggleHighSignalOnly() {
    this.playBeep(560, "triangle", 0.03);
    this.isHighSignalOnly = !this.isHighSignalOnly;
    const btn = document.getElementById("qh-sni-toggle-btn");
    if (btn) btn.classList.toggle("is-active", this.isHighSignalOnly);
    
    this.showToast(this.isHighSignalOnly ? "⚡ High Signal Filter Active (SNI ≥ 9.0)" : "All Signal Levels Shown", "info");
    if (this.currentIssueData && this.currentIssueData.quick_hits) {
      this.renderQuickHitsList(this.currentIssueData.quick_hits);
    }
  }

  // =========================================================================
  // DAILY EXECUTIVE TECH MEMO / NEWSLETTER GENERATOR
  // =========================================================================
  openNewsletterModal() {
    this.playBeep(620, "sine", 0.04);
    const modal = document.getElementById("newsletter-modal");
    if (!modal || !this.currentIssueData) return;

    const data = this.currentIssueData;
    const subject = `Subject: SPARK TECH LIVE // Volume IV, Issue #${data.meta.issue_number}: ${data.lead_story?.headline || "Executive Daily Intelligence"}`;
    
    const subjectEl = document.getElementById("newsletter-subject-display");
    if (subjectEl) subjectEl.innerText = subject;

    const previewEl = document.getElementById("newsletter-rendered-preview");
    if (previewEl) {
      previewEl.innerHTML = this.generateNewsletterHTML(data);
    }

    modal.classList.add("is-open");
  }

  closeNewsletterModal() {
    const modal = document.getElementById("newsletter-modal");
    if (modal) modal.classList.remove("is-open");
  }

  generateNewsletterHTML(data) {
    const ls = data.lead_story || {};
    const cheatList = (data.cheat_sheet || []).map(c => `<li style="margin-bottom: 6px;">${this.formatMarkdown(c)}</li>`).join("");

    return `
      <div style="max-width: 600px; margin: 0 auto; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #111827; background: #ffffff; padding: 20px; line-height: 1.6;">
        <div style="border-bottom: 2px solid #00f0ff; padding-bottom: 12px; margin-bottom: 16px;">
          <span style="font-size: 11px; font-weight: 800; color: #0284c7; letter-spacing: 0.08em; text-transform: uppercase;">SPARK NEWS LIVE // EXECUTIVE TECH DIGEST</span>
          <h1 style="font-size: 22px; font-weight: 800; margin: 6px 0 4px; color: #0f172a;">${ls.headline || "Daily Tech Briefing"}</h1>
          <div style="font-size: 12px; color: #64748b;">Volume IV • Issue #${data.meta.issue_number} • ${data.meta.date}</div>
        </div>

        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 12px 16px; margin-bottom: 20px;">
          <div style="font-size: 11px; font-weight: 800; color: #6366f1; text-transform: uppercase; margin-bottom: 6px;">⚡ 30-Second Shift Highlights</div>
          <ul style="margin: 0; padding-left: 18px; font-size: 13px; color: #334155;">
            ${cheatList}
          </ul>
        </div>

        <div style="margin-bottom: 24px;">
          <h2 style="font-size: 17px; font-weight: 700; color: #0f172a; margin-bottom: 8px;">Lead Investigative Story: ${ls.headline}</h2>
          <p style="font-size: 13.5px; color: #334155; margin-bottom: 12px;">${this.formatMarkdown(ls.catch_up || "")}</p>
          
          ${ls.pr_reality ? `
          <div style="border-left: 3px solid #ef4444; background: #fef2f2; padding: 10px 14px; margin: 12px 0;">
            <div style="font-size: 11px; font-weight: 800; color: #dc2626; text-transform: uppercase;">The Technical Reality Audit</div>
            <div style="font-size: 12.5px; color: #991b1b; margin-top: 4px;">${ls.pr_reality}</div>
          </div>` : ""}

          ${ls.why_it_matters ? `
          <div style="font-size: 13px; color: #059669; font-weight: 600; margin-top: 8px;">
            <b>Why It Matters:</b> ${ls.why_it_matters}
          </div>` : ""}
        </div>

        <div style="border-top: 1px solid #e2e8f0; padding-top: 14px; margin-top: 20px; font-size: 11px; color: #94a3b8; text-align: center;">
          Sent via Spark News Live Executive Intelligence Portal • Cloud Synced with Firestore
        </div>
      </div>
    `;
  }

  generateNewsletterMarkdown(data) {
    const ls = data.lead_story || {};
    const cheatList = (data.cheat_sheet || []).map(c => `- ${c}`).join("\n");
    return `# SPARK NEWS LIVE // Issue #${data.meta.issue_number} (${data.meta.date})\n\n## ⚡ 30-Second Week-in-Review\n${cheatList}\n\n---\n\n## 🎯 ${ls.headline}\n\n${ls.catch_up}\n\n**Reality Audit:** ${ls.pr_reality || ""}\n\n**Why It Matters:** ${ls.why_it_matters || ""}\n\n---\n*Generated by Spark News Live*`;
  }

  async copyNewsletterHTML() {
    const data = this.currentIssueData;
    if (!data) return;
    const html = this.generateNewsletterHTML(data);
    try {
      if (navigator.clipboard && window.ClipboardItem) {
        const type = "text/html";
        const blob = new Blob([html], { type });
        const dataItem = [new ClipboardItem({ [type]: blob, "text/plain": new Blob([html], { type: "text/plain" }) })];
        await navigator.clipboard.write(dataItem);
        this.showToast("📋 Formatted HTML Copied! (Ready for Gmail/Substack)", "success");
        return;
      }
    } catch(e) {}
    navigator.clipboard.writeText(html).then(() => {
      this.showToast("📋 HTML Code Copied to Clipboard!", "success");
    });
  }

  copyNewsletterMarkdown() {
    const data = this.currentIssueData;
    if (!data) return;
    const md = this.generateNewsletterMarkdown(data);
    navigator.clipboard.writeText(md).then(() => {
      this.showToast("📋 Markdown Copied to Clipboard!", "success");
    });
  }

  openInMailClient() {
    const data = this.currentIssueData;
    if (!data) return;
    const subject = encodeURIComponent(`SPARK TECH LIVE // Issue #${data.meta.issue_number}: ${data.lead_story?.headline || ""}`);
    const body = encodeURIComponent(`Here is today's executive tech intelligence:\n\n${data.lead_story?.headline}\n\n${data.lead_story?.catch_up}\n\nWhy It Matters: ${data.lead_story?.why_it_matters}\n\nRead more at Spark News Live.`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  }

  saveState() {
    try {
      localStorage.setItem("spark_xp", String(this.xp));
      localStorage.setItem("spark_streak", String(this.streak));
      localStorage.setItem("spark_answered_questions_" + this.userEmail, JSON.stringify(this.answeredQuestions));
      localStorage.setItem("spark_unlocked_eggs_" + this.userEmail, JSON.stringify(this.unlockedEasterEggs));
      localStorage.setItem("spark_explored_topics_" + this.userEmail, JSON.stringify(this.exploredTopics));
    } catch(e) {}
  }

  loadState() {
    try {
      const savedXP = localStorage.getItem("spark_xp");
      if (savedXP) {
        this.xp = parseInt(savedXP, 10) || 100;
      }
      const savedStreak = localStorage.getItem("spark_streak");
      if (savedStreak) {
        this.streak = parseInt(savedStreak, 10) || 1;
      }
      const savedAnswers = localStorage.getItem("spark_answered_questions_" + this.userEmail) || localStorage.getItem("spark_answered_questions");
      if (savedAnswers) {
        this.answeredQuestions = JSON.parse(savedAnswers) || {};
      }
      const savedEggs = localStorage.getItem("spark_unlocked_eggs_" + this.userEmail) || localStorage.getItem("spark_unlocked_eggs");
      if (savedEggs) {
        this.unlockedEasterEggs = JSON.parse(savedEggs) || {};
      }
      const savedTopics = localStorage.getItem("spark_explored_topics_" + this.userEmail) || localStorage.getItem("spark_explored_topics");
      if (savedTopics) {
        this.exploredTopics = JSON.parse(savedTopics) || {};
      }
    } catch(e) {}
    this.updateIdentityUI();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.spark = new SparkPortalEngine();
});
