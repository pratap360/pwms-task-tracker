 // Immediate theme initialization to prevent flash
    (function() {
      const savedTheme = localStorage.getItem('pwms_theme');
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    })();

    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          fontFamily: {
            sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
            mono: ['JetBrains Mono', 'monospace']
          }
        }
      }
    }

        /* -------------------------------------------------------------
       1. STORAGE KEYS & SEED DATA
    ------------------------------------------------------------- */
    const STORAGE_KEY_TASKS = 'PWMS_BANKING_TASKS_DATA_V2';
    const STORAGE_KEY_TIMESHEET = 'PWMS_BANKING_TIMESHEET_DATA_V2';
    
    const SAMPLE_TASKS = [
      {
        id: "BNK-1001",
        module: "BCRED",
        issueType: "Production Issue",
        priority: "P1",
        status: "In Progress",
        pendingWith: "DBA Team",
        summary: "EOD batch failure in BCRED_INTEREST_ACCRUAL job with ORA-01555 snapshot too old",
        details: "Incident INC882910. Credit cards batch aborted at step 42. Over 45,000 corporate credit cards interest unposted.",
        rca: "Long-running query on unindexed transaction table collided with heavy concurrent undo tablespace retention.",
        solution: "Added compound index on (CARD_ACCT_ID, POST_STATUS, TRAN_DATE). Batch tuned to commit in chunks of 5000.",
        assignedTo: "Support Engineer",
        assignedBy: "Operations Manager",
        env: "PROD",
        startDate: new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0],
        endDate: new Date(Date.now() + 1 * 86400000).toISOString().split('T')[0],
        prodDate: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0],
        meetingTime: "10:30",
        meetingDuration: "30",
        meetingAttendees: "DBA Lead, Core Ops, Support Engineer",
        meetingNotes: "DBA approved hotfix deployment window for tonight at 23:30 IST.",
        closedDate: null
      },
      {
        id: "BNK-1002",
        module: "COLLNDISC",
        issueType: "UAT Defect",
        priority: "P2",
        status: "UAT / Testing",
        pendingWith: "BSG",
        summary: "Collateral haircut calculation discrepancy for sovereign bond valuation",
        details: "Defect logged by Risk BA during UAT cycle 3. Sovereign debt with maturity > 10 yrs getting 12% haircut instead of RBI guideline 8%.",
        rca: "Table COLL_HAIRCUT_MATRIX had stale rule sequence prioritizing corporate paper category over sovereign ticker.",
        solution: "Updated priority weight logic in valuation stored procedure SP_CALC_COLLATERAL_VAL. Waiting on BSG sign-off.",
        assignedTo: "Pooja M. (BA)",
        assignedBy: "Risk BA",
        env: "UAT",
        startDate: new Date(Date.now() - 4 * 86400000).toISOString().split('T')[0],
        endDate: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0],
        prodDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
        meetingTime: "14:00",
        meetingDuration: "45",
        meetingAttendees: "Risk Team, Dev Lead",
        meetingNotes: "Walkthrough of test scenarios for sovereign and commercial paper collateral types.",
        closedDate: null
      },
      {
        id: "BNK-1003",
        module: "ARIMP",
        issueType: "Development Activity",
        priority: "P3",
        status: "Ready for Prod",
        pendingWith: "Testers / QA",
        summary: "Build ARIMP inward clearing reconciler for high-value RTGS settlements",
        details: "Mandatory compliance enhancement for high-value settlement reconciliation pipeline.",
        rca: "Feature enhancement.",
        solution: "Engineered transformer microservice. Code reviewed and signed off.",
        assignedTo: "Rahul V. (Dev Lead)",
        assignedBy: "Tech Lead",
        env: "SIT",
        startDate: new Date(Date.now() - 11 * 86400000).toISOString().split('T')[0],
        endDate: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0],
        prodDate: new Date(Date.now() + 4 * 86400000).toISOString().split('T')[0],
        meetingTime: "16:00",
        meetingDuration: "20",
        meetingAttendees: "Release Management, Payments BA",
        meetingNotes: "CAB approval received. Production deployment scheduled for Sunday 01:00 AM.",
        closedDate: null
      },
      {
        id: "BNK-1004",
        module: "TORM",
        issueType: "BRD Discussion",
        priority: "P3",
        status: "In Progress",
        pendingWith: "BSG",
        summary: "TORM FX forward contract mark-to-market revaluation formula update",
        details: "Front office requesting real-time MTM valuation calculation for EUR/USD hedges.",
        rca: "Requirement gathering.",
        solution: "Drafting technical architecture specification and DB schema impact document.",
        assignedTo: "Support Engineer",
        assignedBy: "Treasury Desk Head",
        env: "DEV",
        startDate: new Date(Date.now() - 1 * 86400000).toISOString().split('T')[0],
        endDate: new Date(Date.now() + 5 * 86400000).toISOString().split('T')[0],
        prodDate: "",
        meetingTime: "11:30",
        meetingDuration: "60",
        meetingAttendees: "Treasury Desk, Business Analysts, Dev Team",
        meetingNotes: "Agreed to adopt live feed discount curve instead of static monthly table.",
        closedDate: null
      },
      {
        id: "BNK-1005",
        module: "FIDB REVAMP",
        issueType: "Production Issue",
        priority: "P1",
        status: "Blocked",
        pendingWith: "Third-Party Vendor",
        summary: "Inbound customer indexing pipeline timeout via primary messaging broker",
        details: "Cluster socket reset during high load customer indexing batch.",
        rca: "Primary gateway vendor IP lease expired on balancer.",
        solution: "Rerouted traffic to secondary node. Escalated vendor ticket to Critical.",
        assignedTo: "Infra On-Call",
        assignedBy: "Operations Lead",
        env: "PROD",
        startDate: new Date(Date.now() - 8 * 86400000).toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0],
        prodDate: "",
        meetingTime: "12:15",
        meetingDuration: "15",
        meetingAttendees: "Infra Ops, Vendor Rep",
        meetingNotes: "Waiting on carrier root cause report before lifting blocker tag.",
        closedDate: null
      },
      {
        id: "BNK-1006",
        module: "BULK EXPORT",
        issueType: "KT Session",
        priority: "P4",
        status: "Backlog",
        pendingWith: "DEV",
        summary: "Knowledge Transfer on Bulk Export multi-threaded CSV generation daemon",
        details: "Session for junior engineers on file generation queues and thread pools.",
        rca: "N/A",
        solution: "Documentation ready on shared drive.",
        assignedTo: "Support Engineer",
        assignedBy: "Engineering Manager",
        env: "DEV",
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
        prodDate: "",
        meetingTime: "15:00",
        meetingDuration: "45",
        meetingAttendees: "Support Team, New Developers",
        meetingNotes: "Hands-on walkthrough of staging logs and queue tables.",
        closedDate: null
      }
    ];

    const SAMPLE_TIMESHEET = [
      {
        id: 1,
        resource_name: "Tanmay S / Lead-ICM",
        pod_name: "IBG",
        day_name: "Monday",
        log_date: new Date().toISOString().split('T')[0],
        task_category: "Prod Support",
        task_title: "BNK-1001 Production triage & root cause analysis",
        task_description: "Investigated ORA-01555 snapshot too old batch crash with DBA. Drafted numeric scale fix and cursor chunking.",
        time_spent: 3.5,
        priority: "High",
        effort_estimate: "4 Hours",
        start_date: new Date().toISOString().split('T')[0],
        target_date: new Date().toISOString().split('T')[0]
      },
      {
        id: 2,
        resource_name: "Tanmay S / Lead-ICM",
        pod_name: "IBG",
        day_name: "Monday",
        log_date: new Date().toISOString().split('T')[0],
        task_category: "Meeting",
        task_title: "Attended daily morning scrum call from 09:00 to 10:00",
        task_description: "Presented progress on BCRED and COLLNDISC defects, unblocked QA team on test data setup.",
        time_spent: 1.0,
        priority: "Medium",
        effort_estimate: "1 Hour",
        start_date: new Date().toISOString().split('T')[0],
        target_date: new Date().toISOString().split('T')[0]
      },
      {
        id: 3,
        resource_name: "Tanmay S / Lead-ICM",
        pod_name: "IBG",
        day_name: "Monday",
        log_date: new Date().toISOString().split('T')[0],
        task_category: "New Development",
        task_title: "Engineered ARIMP outward parser microservice",
        task_description: "Completed ISO XML parser, DTO binding and integration unit tests with 95% test coverage.",
        time_spent: 4.0,
        priority: "High",
        effort_estimate: "2 Days",
        start_date: new Date().toISOString().split('T')[0],
        target_date: new Date().toISOString().split('T')[0]
      }
    ];

    /* -------------------------------------------------------------
       2. STATE MANAGEMENT
    ------------------------------------------------------------- */
    let tasks = [];
    let timesheets = [];
    let currentView = 'kanban';
    let currentMeetingsScope = 'today';
    let timesheetViewMode = window.innerWidth < 768 ? 'cards' : 'table';
    let listViewMode = window.innerWidth < 768 ? 'cards' : 'table';
    let meetingsMobileTab = 'meetings';
    let statusChartInstance = null;
    let moduleChartInstance = null;
    let pendingChartInstance = null;
    let sortColumn = 'startDate';
    let sortDirection = 'desc';

    function loadData() {
      try {
        const storedTasks = localStorage.getItem(STORAGE_KEY_TASKS) || localStorage.getItem('PWMS_BANKING_TASKS_DATA_V1');
        tasks = storedTasks ? JSON.parse(storedTasks) : [...SAMPLE_TASKS];
        tasks.forEach(t => { if (!t.pendingWith) t.pendingWith = 'None (Active)'; });
      } catch (e) {
        tasks = [...SAMPLE_TASKS];
      }

      try {
        const storedTs = localStorage.getItem(STORAGE_KEY_TIMESHEET);
        timesheets = storedTs ? JSON.parse(storedTs) : [...SAMPLE_TIMESHEET];
      } catch (e) {
        timesheets = [...SAMPLE_TIMESHEET];
      }
    }

    function saveTasks() {
      localStorage.setItem(STORAGE_KEY_TASKS, JSON.stringify(tasks));
    }

    function saveTimesheet() {
      localStorage.setItem(STORAGE_KEY_TIMESHEET, JSON.stringify(timesheets));
    }

    /* -------------------------------------------------------------
       3. GLASS BADGES & HELPERS
    ------------------------------------------------------------- */
    function calculateAgeing(startDate, status, closedDate) {
      if (!startDate) return 0;
      const start = new Date(startDate);
      const end = (status === 'Closed' && closedDate) ? new Date(closedDate) : new Date();
      return Math.max(0, Math.floor((end - start) / 86400000));
    }

    function getAgeingBadgeHtml(ageingDays, status) {
      if (status === 'Closed') {
        return `<span class="bg-slate-200/50 dark:bg-white/10 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold">${ageingDays}d</span>`;
      }
      if (ageingDays >= 8) {
        return `<span class="bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30 px-2 py-0.5 rounded-lg text-[10px] font-mono font-extrabold flex items-center gap-1 shadow-2xs" title="High Ageing Warning"><i class="fa-solid fa-triangle-exclamation text-[9px]"></i> ${ageingDays}d</span>`;
      } else if (ageingDays >= 4) {
        return `<span class="bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold flex items-center gap-1 shadow-2xs"><i class="fa-regular fa-clock text-[9px]"></i> ${ageingDays}d</span>`;
      }
      return `<span class="bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold">${ageingDays}d</span>`;
    }

    function getPendingWithBadgeHtml(pending) {
      if (!pending || pending === 'None (Active)') {
        return `<span class="bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-500/20 px-2 py-0.5 rounded-lg text-[10px] font-medium flex items-center gap-1"><i class="fa-solid fa-user-check text-[9px]"></i> Active</span>`;
      }
      return `<span class="bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-lg text-[10px] font-semibold flex items-center gap-1 shadow-2xs">
        <i class="fa-solid fa-hourglass-half text-[9px] opacity-75"></i>
        <span>Pending: <strong>${escapeHtml(pending)}</strong></span>
      </span>`;
    }

    function getPriorityBadgeHtml(p) {
      switch (p) {
        case 'P1':
          return `<span class="bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/30 px-2 py-0.5 rounded-lg font-bold text-[10px] flex items-center gap-1 shadow-2xs"><i class="fa-solid fa-angles-up"></i> P1 Blocker</span>`;
        case 'P2':
          return `<span class="bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-lg font-semibold text-[10px] flex items-center gap-1 shadow-2xs"><i class="fa-solid fa-angle-up"></i> P2 High</span>`;
        case 'P3':
          return `<span class="bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-lg font-semibold text-[10px] flex items-center gap-1 shadow-2xs"><i class="fa-solid fa-bars"></i> P3 Med</span>`;
        default:
          return `<span class="bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-500/20 px-2 py-0.5 rounded-lg text-[10px] flex items-center gap-1"><i class="fa-solid fa-angle-down"></i> P4 Low</span>`;
      }
    }

    function getModuleBadgeHtml(mod) {
      const colors = {
        'BCRED': 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/30',
        'COLLNDISC': 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
        'ARIMP': 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30',
        'TORM': 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30',
        'FIDB REVAMP': 'bg-pink-500/15 text-pink-600 dark:text-pink-400 border-pink-500/30',
        'BULK EXPORT': 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 border-cyan-500/30',
        'FBFP': 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30',
        'FIDB IMPORT': 'bg-teal-500/15 text-teal-600 dark:text-teal-400 border-teal-500/30'
      };
      const cls = colors[mod] || 'bg-slate-500/15 text-slate-600 dark:text-slate-400 border-slate-500/30';
      return `<span class="border px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold shadow-2xs ${cls}">${escapeHtml(mod)}</span>`;
    }

    function getStatusBadgeHtml(status) {
      const colors = {
        'Backlog': 'bg-slate-500/15 text-slate-700 dark:text-slate-300 border-slate-500/30',
        'In Progress': 'bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border-indigo-500/30 font-semibold',
        'UAT / Testing': 'bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-500/30 font-semibold',
        'Ready for Prod': 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30 font-semibold',
        'Blocked': 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30 font-bold',
        'Closed': 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30 font-semibold'
      };
      const cls = colors[status] || 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20';
      return `<span class="border px-2.5 py-0.5 rounded-full text-[10px] uppercase font-mono shadow-2xs ${cls}">${escapeHtml(status)}</span>`;
    }

    function escapeHtml(str) {
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }

    /* -------------------------------------------------------------
       4. THEME & TOAST SYSTEM
    ------------------------------------------------------------- */
    function toggleTheme() {
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('pwms_theme', isDark ? 'dark' : 'light');
      updateThemeControls(isDark);
      if (currentView === 'metrics') renderCharts();
      showToast(isDark ? 'Dark glass theme active' : 'Light glass theme active', 'info');
    }

    function updateThemeControls(isDark) {
      const icon = document.getElementById('themeToggleIcon');
      if (icon) icon.className = isDark ? 'fa-solid fa-sun text-sm text-amber-400' : 'fa-solid fa-moon text-sm text-indigo-500';
      const label = document.getElementById('themeLabel');
      if (label) label.innerText = isDark ? 'Light' : 'Dark';
    }

    function showToast(message, type = 'info') {
      const container = document.getElementById('toastContainer');
      const toast = document.createElement('div');
      
      const icons = {
        success: 'fa-circle-check text-emerald-500',
        error: 'fa-triangle-exclamation text-rose-500',
        info: 'fa-circle-info text-indigo-500'
      };
      
      toast.className = 'glass-panel px-4 py-3 rounded-2xl shadow-xl border border-white/80 dark:border-white/10 text-xs font-bold flex items-center space-x-2.5 text-slate-800 dark:text-white pointer-events-auto transition duration-200';
      toast.innerHTML = `
        <i class="fa-solid ${icons[type] || icons.info} text-base"></i>
        <span>${escapeHtml(message)}</span>
      `;
      
      container.appendChild(toast);
      setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 250);
      }, 3500);
    }

    function customConfirm(title, message, onProceed) {
      const dialog = document.getElementById('confirmDialog');
      document.getElementById('confirmDialogTitle').innerText = title;
      document.getElementById('confirmDialogMessage').innerText = message;
      
      const proceedBtn = document.getElementById('confirmDialogProceedBtn');
      const cancelBtn = document.getElementById('confirmDialogCancelBtn');
      
      const closeDialog = () => {
        dialog.classList.add('hidden');
        proceedBtn.onclick = null;
        cancelBtn.onclick = null;
      };

      cancelBtn.onclick = closeDialog;
      proceedBtn.onclick = () => {
        closeDialog();
        onProceed();
      };

      dialog.classList.remove('hidden');
    }

    /* -------------------------------------------------------------
       5. DYNAMIC ASSIGNEES & FILTERING
    ------------------------------------------------------------- */
    function syncAssigneeOptions() {
      const assigneeSelect = document.getElementById('filterAssignee');
      const currentSelected = assigneeSelect.value || 'ALL';
      const datalist = document.getElementById('assigneeDatalist');
      
      const defaultMembers = ['Support Engineer', 'Rahul V. (Dev Lead)', 'Pooja M. (BA)', 'DBA On-Call', 'Infra On-Call', 'Unassigned'];
      const set = new Set(defaultMembers);

      tasks.forEach(t => { if (t.assignedTo && t.assignedTo.trim()) set.add(t.assignedTo.trim()); });
      const uniqueAssignees = Array.from(set).sort();

      assigneeSelect.innerHTML = `<option value="ALL">All Assignees</option>`;
      uniqueAssignees.forEach(name => {
        const opt = document.createElement('option');
        opt.value = name;
        opt.textContent = name;
        assigneeSelect.appendChild(opt);
      });
      assigneeSelect.value = Array.from(assigneeSelect.options).some(o => o.value === currentSelected) ? currentSelected : 'ALL';

      datalist.innerHTML = '';
      uniqueAssignees.forEach(name => {
        const opt = document.createElement('option');
        opt.value = name;
        datalist.appendChild(opt);
      });
    }

    function getFilteredTasks() {
      const searchTerm = document.getElementById('globalSearchInput').value.trim().toLowerCase();
      const modFilter = document.getElementById('filterModule').value;
      const pendingFilter = document.getElementById('filterPendingWith').value;
      const assigneeFilter = document.getElementById('filterAssignee').value;
      const typeFilter = document.getElementById('filterIssueType').value;
      const priorityFilter = document.getElementById('filterPriority').value;
      const p1Only = document.getElementById('toggleP1OnlyBtn').classList.contains('bg-rose-500');
      const highAgeingOnly = document.getElementById('toggleHighAgeingBtn').classList.contains('bg-amber-500');

      return tasks.filter(t => {
        if (modFilter !== 'ALL' && t.module !== modFilter) return false;
        if (pendingFilter !== 'ALL' && t.pendingWith !== pendingFilter) return false;
        if (assigneeFilter !== 'ALL') {
          if (assigneeFilter === 'Unassigned' && t.assignedTo && t.assignedTo.trim() !== '') return false;
          else if (assigneeFilter !== 'Unassigned' && (t.assignedTo || '').trim().toLowerCase() !== assigneeFilter.toLowerCase()) return false;
        }
        if (typeFilter !== 'ALL' && t.issueType !== typeFilter) return false;
        if (priorityFilter !== 'ALL' && t.priority !== priorityFilter) return false;
        if (p1Only && t.priority !== 'P1') return false;
        if (highAgeingOnly && calculateAgeing(t.startDate, t.status, t.closedDate) < 5) return false;

        if (searchTerm) {
          const hay = `${t.id} ${t.summary} ${t.module} ${t.pendingWith} ${t.details} ${t.solution} ${t.rca} ${t.assignedTo}`.toLowerCase();
          if (!hay.includes(searchTerm)) return false;
        }
        return true;
      });
    }

    /* -------------------------------------------------------------
       6. RENDERING APPLICATION VIEWS
    ------------------------------------------------------------- */
    function renderApp() {
      syncAssigneeOptions();
      const filtered = getFilteredTasks();
      document.getElementById('visibleTasksCount').innerText = filtered.length;
      updateSidebarBadges();

      if (currentView === 'kanban') renderKanban(filtered);
      else if (currentView === 'timesheet') renderTimesheet();
      else if (currentView === 'list') renderList(filtered);
      else if (currentView === 'meetings') renderMeetings(tasks);
      else if (currentView === 'metrics') renderMetrics();
    }

    function updateSidebarBadges() {
      const modules = ['BCRED', 'COLLNDISC', 'ARIMP', 'TORM', 'FIDBREVAMP', 'BULKEXPORT', 'FBFP', 'FIDBIMPORT'];
      const modMap = {
        'BCRED': 'BCRED',
        'COLLNDISC': 'COLLNDISC',
        'ARIMP': 'ARIMP',
        'TORM': 'TORM',
        'FIDBREVAMP': 'FIDB REVAMP',
        'BULKEXPORT': 'BULK EXPORT',
        'FBFP': 'FBFP',
        'FIDBIMPORT': 'FIDB IMPORT'
      };

      modules.forEach(m => {
        const badge = document.getElementById(`badge-${m}`);
        if (badge) {
          const count = tasks.filter(t => t.module === modMap[m] && t.status !== 'Closed').length;
          badge.innerText = count;
        }
      });

      document.getElementById('badge-pending-BSG').innerText = tasks.filter(t => t.pendingWith === 'BSG' && t.status !== 'Closed').length;
      document.getElementById('badge-pending-QA').innerText = tasks.filter(t => t.pendingWith === 'Testers / QA' && t.status !== 'Closed').length;
      document.getElementById('badge-pending-DEV').innerText = tasks.filter(t => t.pendingWith === 'DEV' && t.status !== 'Closed').length;
    }

    /* --- VIEW 1: KANBAN --- */
    function scrollToKanbanCol(status) {
      const colEl = document.querySelector(`.kanban-col[data-status="${status}"]`);
      if (colEl) {
        colEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        updateActiveKanbanPill(status);
      }
    }

    function updateActiveKanbanPill(activeStatus) {
      const pills = document.querySelectorAll('.kanban-pill-btn');
      pills.forEach(p => {
        const onClickAttr = p.getAttribute('onclick') || '';
        if (onClickAttr.includes(`'${activeStatus}'`)) {
          p.classList.add('active-pill');
          p.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        } else {
          p.classList.remove('active-pill');
        }
      });
    }

    function setupKanbanScrollSync() {
      const scrollWrapper = document.querySelector('.kanban-scroll-wrapper');
      if (!scrollWrapper) return;
      
      let debounceTimer = null;
      scrollWrapper.addEventListener('scroll', () => {
        if (window.innerWidth >= 768) return;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          const cols = document.querySelectorAll('.kanban-col');
          const wrapperRect = scrollWrapper.getBoundingClientRect();
          const wrapperCenter = wrapperRect.left + wrapperRect.width / 2;
          let closestCol = null;
          let minDistance = Infinity;

          cols.forEach(col => {
            const colRect = col.getBoundingClientRect();
            const colCenter = colRect.left + colRect.width / 2;
            const dist = Math.abs(wrapperCenter - colCenter);
            if (dist < minDistance) {
              minDistance = dist;
              closestCol = col;
            }
          });

          if (closestCol) {
            const status = closestCol.getAttribute('data-status');
            updateActiveKanbanPill(status);
          }
        }, 60);
      }, { passive: true });
    }

    function quickMoveTask(taskId, newStatus) {
      const task = tasks.find(t => t.id === taskId);
      if (!task) return;
      if (task.status === newStatus) return;
      task.status = newStatus;
      if (newStatus === 'Closed' && !task.closedDate) {
        task.closedDate = new Date().toISOString().split('T')[0];
      }
      saveTasks();
      renderApp();
      showToast(`Task ${taskId} moved to ${newStatus}`, 'success');
    }

    function renderKanban(filteredTasks) {
      const columns = ['Backlog', 'In Progress', 'UAT / Testing', 'Ready for Prod', 'Blocked', 'Closed'];
      const pillMap = {
        'Backlog': 'pill-count-Backlog',
        'In Progress': 'pill-count-InProgress',
        'UAT / Testing': 'pill-count-UAT',
        'Ready for Prod': 'pill-count-Prod',
        'Blocked': 'pill-count-Blocked',
        'Closed': 'pill-count-Closed'
      };
      
      columns.forEach(col => {
        const dropzone = document.querySelector(`.kanban-dropzone[data-status="${col}"]`);
        const countSpan = document.querySelector(`.kanban-col[data-status="${col}"] .col-count`);
        const colTasks = filteredTasks.filter(t => t.status === col);
        if (pillMap[col]) {
          const pillEl = document.getElementById(pillMap[col]);
          if (pillEl) pillEl.innerText = colTasks.length;
        }
        if (!dropzone) return;

        countSpan.innerText = colTasks.length;
        dropzone.innerHTML = '';

        if (colTasks.length === 0) {
          dropzone.innerHTML = `
            <div class="h-28 rounded-2xl border border-dashed border-slate-300 dark:border-white/10 flex items-center justify-center text-slate-400 text-xs font-mono font-medium">
              No Tasks
            </div>
          `;
          return;
        }

        colTasks.forEach(task => {
          const ageing = calculateAgeing(task.startDate, task.status, task.closedDate);
          const card = document.createElement('div');
          card.className = 'kanban-card glass-card p-3.5 rounded-2xl border border-white/80 dark:border-white/10 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition duration-150 cursor-grab active:cursor-grabbing select-none space-y-2';
          card.setAttribute('draggable', 'true');
          card.setAttribute('data-id', task.id);

          card.innerHTML = `
            <div class="flex items-center justify-between">
              <span class="text-xs font-mono font-extrabold text-indigo-600 dark:text-indigo-400 hover:underline">${escapeHtml(task.id)}</span>
              ${getPriorityBadgeHtml(task.priority)}
            </div>

            <div class="text-xs font-bold line-clamp-2 leading-snug text-slate-800 dark:text-slate-100">
              ${escapeHtml(task.summary)}
            </div>

            <div>
              ${getPendingWithBadgeHtml(task.pendingWith)}
            </div>

            <div class="pt-2 border-t border-slate-200/50 dark:border-white/5 flex items-center justify-between text-[11px]">
              ${getModuleBadgeHtml(task.module)}
              <div class="flex items-center space-x-1.5">
                ${getAgeingBadgeHtml(ageing, task.status)}
                <div class="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center text-[10px] font-extrabold shadow-xs" title="Assignee: ${escapeHtml(task.assignedTo || 'Unassigned')}">
                  ${(task.assignedTo || 'U').charAt(0).toUpperCase()}
                </div>
              </div>
            </div>

            <!-- Mobile Quick Status Move Dropdown -->
            <div class="md:hidden pt-2 border-t border-slate-200/50 dark:border-white/5 flex items-center justify-between gap-1 text-[11px]" onclick="event.stopPropagation()">
              <span class="text-[10px] font-bold text-slate-400 flex items-center gap-1"><i class="fa-solid fa-arrows-turn-right text-[10px] text-indigo-400"></i> Move:</span>
              <select class="quick-move-select text-[11px] font-bold py-1 px-2 rounded-xl bg-white/70 dark:bg-slate-800/70 border border-slate-200/70 dark:border-white/10 text-slate-700 dark:text-slate-200 focus:outline-none" onclick="event.stopPropagation()" onchange="event.stopPropagation(); quickMoveTask('${escapeHtml(task.id)}', this.value)">
                ${columns.map(c => `<option value="${c}" ${c === task.status ? 'selected' : ''}>${c}</option>`).join('')}
              </select>
            </div>
          `;

          card.addEventListener('click', () => openTaskModal(task.id));
          card.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', task.id);
            card.classList.add('dragging');
          });
          card.addEventListener('dragend', () => card.classList.remove('dragging'));

          dropzone.appendChild(card);
        });
      });
    }

    /* --- VIEW 2: DAILY TIMESHEET VIEW --- */
    function setTimesheetViewMode(mode) {
      timesheetViewMode = mode;
      const cardsBtn = document.getElementById('tsViewCardsBtn');
      const tableBtn = document.getElementById('tsViewTableBtn');
      const cardsCont = document.getElementById('timesheetCardsContainer');
      const tableCont = document.getElementById('timesheetTableContainer');

      if (mode === 'cards') {
        if (cardsBtn) cardsBtn.className = 'px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs transition';
        if (tableBtn) tableBtn.className = 'px-2.5 py-1 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition';
        if (cardsCont) cardsCont.classList.remove('hidden');
        if (tableCont) tableCont.classList.add('hidden');
      } else {
        if (cardsBtn) cardsBtn.className = 'px-2.5 py-1 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition';
        if (tableBtn) tableBtn.className = 'px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs transition';
        if (cardsCont) cardsCont.classList.add('hidden');
        if (tableCont) tableCont.classList.remove('hidden');
      }
      renderTimesheet();
    }

    function renderTimesheet() {
      const tbody = document.getElementById('timesheetTableBody');
      const cardsContainer = document.getElementById('timesheetCardsContainer');
      if (tbody) tbody.innerHTML = '';
      if (cardsContainer) cardsContainer.innerHTML = '';
      let totalHours = 0;

      if (timesheets.length === 0) {
        if (tbody) tbody.innerHTML = `<tr><td colspan="14" class="text-center py-8 text-slate-400 font-bold font-mono">No Timesheet Activity Logged</td></tr>`;
        if (cardsContainer) cardsContainer.innerHTML = `<div class="text-center py-8 text-slate-400 font-bold font-mono text-xs">No Timesheet Activity Logged</div>`;
        document.getElementById('timesheetTotalHrsBadge').innerText = `TOTAL: 0.00 HRS`;
        return;
      }

      timesheets.forEach((item, index) => {
        totalHours += parseFloat(item.time_spent || 0);
        const pClass = item.priority === 'High' ? 'bg-rose-500/15 text-rose-600 dark:text-rose-400 border-rose-500/30' : item.priority === 'Medium' ? 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30' : 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30';
        
        // 1. Table row
        if (tbody) {
          const tr = document.createElement('tr');
          tr.className = 'hover:bg-white/60 dark:hover:bg-white/5 transition text-xs border-b border-slate-200/50 dark:border-white/5';
          tr.innerHTML = `
            <td class="py-3 px-3 font-mono font-bold text-slate-400">${index + 1}</td>
            <td class="py-3 px-3 font-bold text-slate-800 dark:text-slate-100">${escapeHtml(item.resource_name)}</td>
            <td class="py-3 px-3 font-mono font-bold text-indigo-600 dark:text-indigo-400">${escapeHtml(item.pod_name)}</td>
            <td class="py-3 px-3 text-slate-600 dark:text-slate-300">${escapeHtml(item.day_name)}</td>
            <td class="py-3 px-3 font-mono text-slate-500">${item.log_date}</td>
            <td class="py-3 px-3 font-bold text-slate-700 dark:text-slate-300">${escapeHtml(item.task_category)}</td>
            <td class="py-3 px-3 font-extrabold text-slate-800 dark:text-slate-100 max-w-xs truncate">${escapeHtml(item.task_title)}</td>
            <td class="py-3 px-3 text-slate-600 dark:text-slate-400 max-w-sm truncate">${escapeHtml(item.task_description)}</td>
            <td class="py-3 px-3 font-mono font-extrabold text-emerald-600 dark:text-emerald-400">${item.time_spent} hrs</td>
            <td class="py-3 px-3">
              <span class="px-2 py-0.5 rounded-lg border font-bold text-[10px] uppercase ${pClass}">${item.priority}</span>
            </td>
            <td class="py-3 px-3 font-mono text-slate-500">${escapeHtml(item.effort_estimate || '-')}</td>
            <td class="py-3 px-3 font-mono text-slate-500">${item.start_date || '-'}</td>
            <td class="py-3 px-3 font-mono text-slate-500">${item.target_date || '-'}</td>
            <td class="py-3 px-3 text-center">
              <button onclick="deleteTimesheet(${item.id})" class="p-1 hover:text-rose-500 transition" title="Delete Log">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </td>
          `;
          tbody.appendChild(tr);
        }

        // 2. Mobile Responsive Card
        if (cardsContainer) {
          const card = document.createElement('div');
          card.className = 'glass-card p-3 rounded-2xl border border-white/70 dark:border-white/10 space-y-2 shadow-xs';
          card.innerHTML = `
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-1.5 min-w-0">
                <span class="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">${escapeHtml(item.day_name.substring(0,3))}, ${item.log_date}</span>
                <span class="bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 font-mono font-bold text-[10px] px-2 py-0.5 rounded-md border border-indigo-500/30">${escapeHtml(item.pod_name)}</span>
              </div>
              <span class="bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-mono font-extrabold text-xs px-2.5 py-0.5 rounded-xl border border-emerald-500/30 flex-shrink-0">
                ${item.time_spent} hrs
              </span>
            </div>
            <div class="text-xs font-extrabold text-slate-800 dark:text-slate-100">${escapeHtml(item.task_title)}</div>
            <p class="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">${escapeHtml(item.task_description)}</p>
            <div class="pt-2 border-t border-slate-200/50 dark:border-white/5 flex items-center justify-between text-[11px]">
              <div class="flex items-center gap-1.5">
                <span class="bg-slate-500/10 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-lg text-[10px] font-semibold">${escapeHtml(item.task_category)}</span>
                <span class="border px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase ${pClass}">${item.priority}</span>
              </div>
              <div class="flex items-center gap-2">
                ${item.effort_estimate ? `<span class="text-[10px] font-mono text-slate-400">${escapeHtml(item.effort_estimate)}</span>` : ''}
                <button onclick="deleteTimesheet(${item.id})" class="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 active:scale-95 transition" title="Delete Entry">
                  <i class="fa-solid fa-trash-can text-xs"></i>
                </button>
              </div>
            </div>
          `;
          cardsContainer.appendChild(card);
        }
      });

      document.getElementById('timesheetTotalHrsBadge').innerText = `TOTAL: ${totalHours.toFixed(2)} HRS`;
    }

    /* --- VIEW 3: DETAILED GRID VIEW --- */
    function setListViewMode(mode) {
      listViewMode = mode;
      const cardsBtn = document.getElementById('listViewCardsBtn');
      const gridBtn = document.getElementById('listViewGridBtn');
      const cardsCont = document.getElementById('listCardsContainer');
      const tableCont = document.getElementById('listTableContainer');

      if (mode === 'cards') {
        if (cardsBtn) cardsBtn.className = 'px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs transition';
        if (gridBtn) gridBtn.className = 'px-2.5 py-1 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition';
        if (cardsCont) cardsCont.classList.remove('hidden');
        if (tableCont) tableCont.classList.add('hidden');
      } else {
        if (cardsBtn) cardsBtn.className = 'px-2.5 py-1 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition';
        if (gridBtn) gridBtn.className = 'px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs transition';
        if (cardsCont) cardsCont.classList.add('hidden');
        if (tableCont) tableCont.classList.remove('hidden');
      }
      renderList(getFilteredTasks());
    }

    function renderList(filteredTasks) {
      const tbody = document.getElementById('listTableBody');
      const cardsContainer = document.getElementById('listCardsContainer');
      if (tbody) tbody.innerHTML = '';
      if (cardsContainer) cardsContainer.innerHTML = '';

      const sorted = [...filteredTasks].sort((a, b) => {
        let valA = a[sortColumn] || '';
        let valB = b[sortColumn] || '';
        if (sortColumn === 'ageing') {
          valA = calculateAgeing(a.startDate, a.status, a.closedDate);
          valB = calculateAgeing(b.startDate, b.status, b.closedDate);
        }
        if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
        if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });

      if (sorted.length === 0) {
        if (tbody) tbody.innerHTML = `<tr><td colspan="12" class="text-center py-8 text-slate-400 font-bold font-mono">No Matching Banking Items</td></tr>`;
        if (cardsContainer) cardsContainer.innerHTML = `<div class="text-center py-8 text-slate-400 font-bold font-mono text-xs">No Matching Banking Items</div>`;
        return;
      }

      sorted.forEach(t => {
        const ageing = calculateAgeing(t.startDate, t.status, t.closedDate);
        
        // 1. Table row
        if (tbody) {
          const tr = document.createElement('tr');
          tr.className = 'hover:bg-white/60 dark:hover:bg-white/5 transition cursor-pointer border-b border-slate-200/50 dark:border-white/5 text-xs';
          tr.innerHTML = `
            <td class="py-3 px-3 font-mono font-extrabold text-indigo-600 dark:text-indigo-400">${escapeHtml(t.id)}</td>
            <td class="py-3 px-3 whitespace-nowrap text-slate-600 dark:text-slate-300 font-medium">${escapeHtml(t.issueType)}</td>
            <td class="py-3 px-3 font-bold text-slate-800 dark:text-slate-100 max-w-xs truncate" title="${escapeHtml(t.summary)}">${escapeHtml(t.summary)}</td>
            <td class="py-3 px-3">${getModuleBadgeHtml(t.module)}</td>
            <td class="py-3 px-3 whitespace-nowrap">${getPendingWithBadgeHtml(t.pendingWith)}</td>
            <td class="py-3 px-3">${getPriorityBadgeHtml(t.priority)}</td>
            <td class="py-3 px-3">${getStatusBadgeHtml(t.status)}</td>
            <td class="py-3 px-3 font-mono font-bold text-slate-500">${escapeHtml(t.env || '-')}</td>
            <td class="py-3 px-3 font-mono text-slate-500">${escapeHtml(t.startDate || '-')}</td>
            <td class="py-3 px-3">${getAgeingBadgeHtml(ageing, t.status)}</td>
            <td class="py-3 px-3 font-bold text-slate-700 dark:text-slate-200 truncate max-w-[120px]">${escapeHtml(t.assignedTo || 'Unassigned')}</td>
            <td class="py-3 px-3 text-center">
              <button onclick="event.stopPropagation(); openTaskModal('${t.id}')" class="p-1 hover:text-indigo-500 transition" title="Edit">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
            </td>
          `;
          tr.addEventListener('click', () => openTaskModal(t.id));
          tbody.appendChild(tr);
        }

        // 2. Mobile Responsive Card
        if (cardsContainer) {
          const card = document.createElement('div');
          card.className = 'glass-card p-3 rounded-2xl border border-white/70 dark:border-white/10 space-y-2 shadow-xs active:scale-[0.99] transition cursor-pointer';
          card.innerHTML = `
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-1.5 min-w-0">
                <span class="text-xs font-mono font-extrabold text-indigo-600 dark:text-indigo-400">${escapeHtml(t.id)}</span>
                ${getModuleBadgeHtml(t.module)}
                <span class="bg-slate-500/10 text-slate-600 dark:text-slate-400 px-1.5 py-0.2 rounded text-[10px] font-mono">${escapeHtml(t.env || 'PROD')}</span>
              </div>
              ${getPriorityBadgeHtml(t.priority)}
            </div>
            <div class="text-xs font-bold text-slate-800 dark:text-slate-100 line-clamp-2 leading-snug">
              ${escapeHtml(t.summary)}
            </div>
            <div class="flex items-center justify-between text-[11px] gap-1">
              <div>${getStatusBadgeHtml(t.status)}</div>
              <div>${getPendingWithBadgeHtml(t.pendingWith)}</div>
            </div>
            <div class="pt-2 border-t border-slate-200/50 dark:border-white/5 flex items-center justify-between text-[11px]">
              <div class="flex items-center gap-1.5 min-w-0">
                <div class="w-5 h-5 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center text-[9px] font-bold flex-shrink-0">
                  ${(t.assignedTo || 'U').charAt(0).toUpperCase()}
                </div>
                <span class="font-medium text-slate-600 dark:text-slate-300 truncate max-w-[130px]">${escapeHtml(t.assignedTo || 'Unassigned')}</span>
              </div>
              <div class="flex items-center gap-2 flex-shrink-0">
                ${getAgeingBadgeHtml(ageing, t.status)}
                <i class="fa-solid fa-chevron-right text-[10px] text-slate-400"></i>
              </div>
            </div>
          `;
          card.addEventListener('click', () => openTaskModal(t.id));
          cardsContainer.appendChild(card);
        }
      });
    }

    function sortTable(column) {
      if (sortColumn === column) sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
      else { sortColumn = column; sortDirection = 'asc'; }
      renderList(getFilteredTasks());
    }

    /* --- VIEW 4: MEETINGS & SYNC SCHEDULE --- */
    function switchMeetingsTab(tab) {
      meetingsMobileTab = tab;
      const meetingsBtn = document.getElementById('meetingsTabBtn');
      const deploymentsBtn = document.getElementById('deploymentsTabBtn');
      const meetingsCol = document.getElementById('meetingsCol');
      const deploymentsCol = document.getElementById('deploymentsCol');

      if (window.innerWidth >= 1024) {
        if (meetingsCol) {
          meetingsCol.classList.remove('hidden');
          meetingsCol.classList.add('flex');
        }
        if (deploymentsCol) {
          deploymentsCol.classList.remove('hidden');
          deploymentsCol.classList.add('flex');
        }
        return;
      }

      if (tab === 'meetings') {
        if (meetingsBtn) meetingsBtn.className = 'flex-1 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-xs transition flex items-center justify-center gap-1.5';
        if (deploymentsBtn) deploymentsBtn.className = 'flex-1 py-2 text-xs font-bold rounded-xl text-slate-600 dark:text-slate-300 hover:text-indigo-600 transition flex items-center justify-center gap-1.5';
        if (meetingsCol) {
          meetingsCol.classList.remove('hidden');
          meetingsCol.classList.add('flex');
        }
        if (deploymentsCol) {
          deploymentsCol.classList.add('hidden');
          deploymentsCol.classList.remove('flex');
        }
      } else {
        if (meetingsBtn) meetingsBtn.className = 'flex-1 py-2 text-xs font-bold rounded-xl text-slate-600 dark:text-slate-300 hover:text-indigo-600 transition flex items-center justify-center gap-1.5';
        if (deploymentsBtn) deploymentsBtn.className = 'flex-1 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-xs transition flex items-center justify-center gap-1.5';
        if (meetingsCol) {
          meetingsCol.classList.add('hidden');
          meetingsCol.classList.remove('flex');
        }
        if (deploymentsCol) {
          deploymentsCol.classList.remove('hidden');
          deploymentsCol.classList.add('flex');
        }
      }
    }

    function setMeetingsScope(scope) {
      currentMeetingsScope = scope;
      document.getElementById('scopeTodayBtn').className = scope === 'today' ? 'px-2.5 sm:px-3 py-1 text-xs rounded-xl font-bold bg-indigo-600 text-white shadow-xs' : 'px-2.5 sm:px-3 py-1 text-xs rounded-xl font-bold glass-panel text-slate-700 dark:text-slate-300 hover:bg-white/80';
      document.getElementById('scopeAllBtn').className = scope === 'all' ? 'px-2.5 sm:px-3 py-1 text-xs rounded-xl font-bold bg-indigo-600 text-white shadow-xs' : 'px-2.5 sm:px-3 py-1 text-xs rounded-xl font-bold glass-panel text-slate-700 dark:text-slate-300 hover:bg-white/80';
      renderMeetings(tasks);
    }

    function renderMeetings(allTasks) {
      const meetingsContainer = document.getElementById('meetingsListContainer');
      const followUpsContainer = document.getElementById('followUpsListContainer');
      const todayStr = new Date().toISOString().split('T')[0];

      if (meetingsContainer) meetingsContainer.innerHTML = '';
      if (followUpsContainer) followUpsContainer.innerHTML = '';

      let meetingItems = allTasks.filter(t => t.meetingTime || ['Meeting', 'KT Session', 'BRD Discussion'].includes(t.issueType));
      let followUpItems = allTasks.filter(t => t.priority === 'P1' || t.status === 'Ready for Prod' || t.issueType === 'Deployment');

      if (currentMeetingsScope === 'today') {
        meetingItems = meetingItems.filter(t => t.startDate === todayStr || t.meetingTime);
        followUpItems = followUpItems.filter(t => t.startDate === todayStr || t.status !== 'Closed');
      }

      document.getElementById('meetingsCountBadge').innerText = meetingItems.length;
      document.getElementById('deploymentsCountBadge').innerText = followUpItems.length;

      const mobileMeetingsCount = document.getElementById('mobileMeetingsCount');
      if (mobileMeetingsCount) mobileMeetingsCount.innerText = meetingItems.length;
      const mobileDeploymentsCount = document.getElementById('mobileDeploymentsCount');
      if (mobileDeploymentsCount) mobileDeploymentsCount.innerText = followUpItems.length;

      if (meetingItems.length === 0) {
        if (meetingsContainer) meetingsContainer.innerHTML = `<div class="text-center py-12 font-mono text-xs text-slate-400">No scheduled calls or KT sessions.</div>`;
      } else {
        meetingItems.forEach(m => {
          const card = document.createElement('div');
          card.className = 'glass-card p-3 sm:p-4 rounded-2xl hover:border-indigo-400 transition cursor-pointer shadow-xs space-y-2';
          card.onclick = () => openTaskModal(m.id);
          card.innerHTML = `
            <div class="flex items-center justify-between">
              <span class="bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 font-bold px-2.5 py-0.5 rounded-lg text-[11px] font-mono border border-indigo-500/30">
                <i class="fa-regular fa-clock"></i> ${escapeHtml(m.meetingTime || 'Flexible')} ${m.meetingDuration ? `(${escapeHtml(m.meetingDuration)}m)` : ''}
              </span>
              <span class="text-[10px] font-mono text-slate-400">${escapeHtml(m.startDate || 'Today')}</span>
            </div>
            <div class="text-xs font-extrabold text-slate-800 dark:text-white">${escapeHtml(m.summary)}</div>
            <div class="text-[11px] bg-white/40 dark:bg-white/5 p-2.5 rounded-xl border border-slate-200/50 dark:border-white/5 font-mono">
              <strong>Attendees:</strong> ${escapeHtml(m.meetingAttendees || 'Team Members')}<br>
              <strong>Agenda:</strong> ${escapeHtml(m.meetingNotes || 'No notes logged.')}
            </div>
            <div class="flex items-center justify-between text-[10px] pt-1">
              <span class="font-mono font-bold text-indigo-600 dark:text-indigo-400">${escapeHtml(m.id)}</span>
              ${getStatusBadgeHtml(m.status)}
            </div>
          `;
          if (meetingsContainer) meetingsContainer.appendChild(card);
        });
      }

      if (followUpItems.length === 0) {
        if (followUpsContainer) followUpsContainer.innerHTML = `<div class="text-center py-12 font-mono text-xs text-slate-400">Zero active P1 blockers or releases.</div>`;
      } else {
        followUpItems.forEach(f => {
          const ageing = calculateAgeing(f.startDate, f.status, f.closedDate);
          const card = document.createElement('div');
          card.className = 'glass-card p-3 sm:p-4 rounded-2xl hover:border-rose-400 transition cursor-pointer shadow-xs space-y-2';
          card.onclick = () => openTaskModal(f.id);
          card.innerHTML = `
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-1.5">
                ${getPriorityBadgeHtml(f.priority)}
                <span class="bg-slate-500/10 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold">${escapeHtml(f.env || 'PROD')}</span>
                ${getPendingWithBadgeHtml(f.pendingWith)}
              </div>
              ${getAgeingBadgeHtml(ageing, f.status)}
            </div>
            <div class="text-xs font-extrabold text-slate-800 dark:text-white">${escapeHtml(f.summary)}</div>
            ${f.prodDate ? `<div class="text-[11px] font-bold text-purple-700 dark:text-purple-300 bg-purple-500/10 px-2.5 py-1 rounded-xl border border-purple-500/20"><i class="fa-solid fa-calendar-check mr-1"></i> Target Prod: ${escapeHtml(f.prodDate)}</div>` : ''}
            <div class="flex items-center justify-between text-[10px] pt-1">
              <span class="font-mono font-bold text-indigo-600 dark:text-indigo-400">${escapeHtml(f.id)} [${escapeHtml(f.module)}]</span>
              <span class="font-bold text-slate-600 dark:text-slate-400">Owner: ${escapeHtml(f.assignedTo || 'Unassigned')}</span>
            </div>
          `;
          if (followUpsContainer) followUpsContainer.appendChild(card);
        });
      }
    }

    function toggleSpeedDial(forceState) {
      const menu = document.getElementById('mobileSpeedDialMenu');
      const icon = document.getElementById('mobileFabIcon');
      if (!menu || !icon) return;
      const willClose = (typeof forceState === 'boolean') ? !forceState : !menu.classList.contains('hidden');
      if (willClose) {
        menu.classList.add('hidden');
        menu.classList.remove('flex');
        icon.style.transform = 'rotate(0deg)';
      } else {
        menu.classList.remove('hidden');
        menu.classList.add('flex');
        icon.style.transform = 'rotate(45deg)';
      }
    }

    function toggleMobileMoreMenu() {
      const dd = document.getElementById('mobileMoreDropdown');
      if (dd) dd.classList.toggle('hidden');
    }

    function closeMobileMoreMenu() {
      const dd = document.getElementById('mobileMoreDropdown');
      if (dd) dd.classList.add('hidden');
    }

    /* --- VIEW 5: METRICS & CHARTS --- */
    function renderMetrics() {
      const total = tasks.length;
      const openP1 = tasks.filter(t => t.priority === 'P1' && t.status !== 'Closed').length;
      const pendingExternal = tasks.filter(t => t.status !== 'Closed' && t.pendingWith && t.pendingWith !== 'None (Active)').length;
      const deployments = tasks.filter(t => t.status === 'Ready for Prod' || t.issueType === 'Deployment').length;
      const closed = tasks.filter(t => t.status === 'Closed').length;

      const activeTasks = tasks.filter(t => t.status !== 'Closed');
      const totalAgeing = activeTasks.reduce((acc, t) => acc + calculateAgeing(t.startDate, t.status, t.closedDate), 0);
      const avgAgeing = activeTasks.length > 0 ? (totalAgeing / activeTasks.length).toFixed(1) : '0';

      document.getElementById('statTotal').innerText = total;
      document.getElementById('statP1').innerText = openP1;
      document.getElementById('statPendingExternal').innerText = pendingExternal;
      document.getElementById('statDeployments').innerText = deployments;
      document.getElementById('statAvgAgeing').innerHTML = `${avgAgeing} <span class="text-xs font-normal">d</span>`;
      document.getElementById('statClosed').innerText = closed;

      const highAgeingTbody = document.getElementById('highAgeingTableBody');
      highAgeingTbody.innerHTML = '';
      const criticalAgeingTasks = activeTasks
        .map(t => ({ ...t, calculatedAge: calculateAgeing(t.startDate, t.status, t.closedDate) }))
        .filter(t => t.calculatedAge > 7)
        .sort((a, b) => b.calculatedAge - a.calculatedAge);

      if (criticalAgeingTasks.length === 0) {
        highAgeingTbody.innerHTML = `<tr><td colspan="9" class="text-center py-6 text-emerald-600 dark:text-emerald-400 font-bold font-mono text-xs">No tasks exceeding 7 days ageing. Excellent SLA!</td></tr>`;
      } else {
        criticalAgeingTasks.forEach(t => {
          const tr = document.createElement('tr');
          tr.className = 'hover:bg-rose-500/10 transition cursor-pointer text-xs';
          tr.onclick = () => openTaskModal(t.id);
          tr.innerHTML = `
            <td class="p-2.5 font-mono font-bold text-indigo-600 dark:text-indigo-400">${escapeHtml(t.id)}</td>
            <td class="p-2.5">${getModuleBadgeHtml(t.module)}</td>
            <td class="p-2.5">${getPendingWithBadgeHtml(t.pendingWith)}</td>
            <td class="p-2.5 text-slate-500">${escapeHtml(t.issueType)}</td>
            <td class="p-2.5 font-bold text-slate-800 dark:text-white max-w-xs truncate">${escapeHtml(t.summary)}</td>
            <td class="p-2.5">${getStatusBadgeHtml(t.status)}</td>
            <td class="p-2.5">${getPriorityBadgeHtml(t.priority)}</td>
            <td class="p-2.5">${getAgeingBadgeHtml(t.calculatedAge, t.status)}</td>
            <td class="p-2.5 font-bold text-slate-600 dark:text-slate-300">${escapeHtml(t.assignedTo || 'Unassigned')}</td>
          `;
          highAgeingTbody.appendChild(tr);
        });
      }

      renderCharts();
    }

    function renderCharts() {
      const isDark = document.documentElement.classList.contains('dark');
      const textColor = isDark ? '#94a3b8' : '#64748b';
      const gridColor = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)';
      const isMobileSmall = window.innerWidth < 480;
      const tickFontSize = isMobileSmall ? 9 : 11;

      // Chart 1: Pending With
      const pendingCategories = ['BSG', 'Testers / QA', 'DEV', 'DBA Team', 'Third-Party Vendor', 'Business Operations', 'None (Active)'];
      const pendingCounts = pendingCategories.map(cat => tasks.filter(t => t.pendingWith === cat && t.status !== 'Closed').length);

      const ctxPending = document.getElementById('pendingWithChart').getContext('2d');
      if (pendingChartInstance) pendingChartInstance.destroy();
      
      pendingChartInstance = new Chart(ctxPending, {
        type: 'bar',
        data: {
          labels: ['BSG', 'QA', 'DEV', 'DBA', 'Vendor', 'Ops', 'Active'],
          datasets: [{
            data: pendingCounts,
            backgroundColor: ['#f59e0b', '#a855f7', '#6366f1', '#f43f5e', '#fb923c', '#10b981', '#94a3b8'],
            borderRadius: 8
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { ticks: { color: textColor, font: { weight: '600', size: tickFontSize } }, grid: { color: gridColor } },
            y: { beginAtZero: true, ticks: { color: textColor, font: { weight: '600', size: tickFontSize }, precision: 0 }, grid: { color: gridColor } }
          }
        }
      });

      // Chart 2: Status
      const statusLabels = ['Backlog', 'In Progress', 'UAT / Testing', 'Ready for Prod', 'Blocked', 'Closed'];
      const statusCounts = statusLabels.map(s => tasks.filter(t => t.status === s).length);

      const ctxStatus = document.getElementById('statusChart').getContext('2d');
      if (statusChartInstance) statusChartInstance.destroy();
      
      statusChartInstance = new Chart(ctxStatus, {
        type: 'bar',
        data: {
          labels: statusLabels,
          datasets: [{
            data: statusCounts,
            backgroundColor: ['#94a3b8', '#6366f1', '#a855f7', '#f59e0b', '#f43f5e', '#10b981'],
            borderRadius: 8
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { ticks: { color: textColor, font: { weight: '600', size: tickFontSize } }, grid: { color: gridColor } },
            y: { beginAtZero: true, ticks: { color: textColor, font: { weight: '600', size: tickFontSize }, precision: 0 }, grid: { color: gridColor } }
          }
        }
      });

      // Chart 3: Modules
      const modules = ['BCRED', 'COLLNDISC', 'ARIMP', 'TORM', 'FIDB REVAMP', 'BULK EXPORT', 'FBFP', 'FIDB IMPORT'];
      const moduleCounts = modules.map(m => tasks.filter(t => t.module === m).length);

      const ctxModule = document.getElementById('moduleChart').getContext('2d');
      if (moduleChartInstance) moduleChartInstance.destroy();

      moduleChartInstance = new Chart(ctxModule, {
        type: 'doughnut',
        data: {
          labels: modules,
          datasets: [{
            data: moduleCounts,
            backgroundColor: ['#6366f1', '#10b981', '#f59e0b', '#a855f7', '#ec4899', '#06b6d4', '#f43f5e', '#14b8a6'],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: window.innerWidth < 768 ? 'bottom' : 'right',
              labels: {
                color: textColor,
                boxWidth: isMobileSmall ? 8 : 12,
                padding: isMobileSmall ? 6 : 10,
                font: { weight: '600', size: isMobileSmall ? 9 : 10 }
              }
            }
          }
        }
      });
    }

    /* -------------------------------------------------------------
       7. DRAG AND DROP HANDLERS (KANBAN)
    ------------------------------------------------------------- */
    function setupDragAndDrop() {
      const dropzones = document.querySelectorAll('.kanban-dropzone');
      dropzones.forEach(zone => {
        zone.addEventListener('dragover', (e) => {
          e.preventDefault();
          zone.closest('.kanban-col').classList.add('drag-over');
        });
        zone.addEventListener('dragleave', () => {
          zone.closest('.kanban-col').classList.remove('drag-over');
        });
        zone.addEventListener('drop', (e) => {
          e.preventDefault();
          zone.closest('.kanban-col').classList.remove('drag-over');
          const taskId = e.dataTransfer.getData('text/plain');
          const newStatus = zone.getAttribute('data-status');

          const task = tasks.find(t => t.id === taskId);
          if (task && task.status !== newStatus) {
            task.status = newStatus;
            if (newStatus === 'Closed') task.closedDate = new Date().toISOString().split('T')[0];
            if (newStatus === 'UAT / Testing' && task.pendingWith === 'None (Active)') task.pendingWith = 'Testers / QA';
            saveTasks();
            renderApp();
            showToast(`Moved ${taskId} to ${newStatus}`, 'success');
          }
        });
      });
    }

    /* -------------------------------------------------------------
       8. MODAL HANDLERS
    ------------------------------------------------------------- */
    function openTaskModal(taskIdToEdit = null) {
      const modal = document.getElementById('taskModal');
      const form = document.getElementById('taskForm');
      form.reset();
      syncAssigneeOptions();
      switchModalTab('tab-general');

      if (taskIdToEdit) {
        const task = tasks.find(t => t.id === taskIdToEdit);
        if (!task) return;

        document.getElementById('taskModalTitle').innerText = `Edit Task ${task.id}`;
        document.getElementById('editTaskIdHidden').value = task.id;
        document.getElementById('taskIdInput').value = task.id;
        document.getElementById('taskIdInput').readOnly = true;
        
        document.getElementById('taskModuleInput').value = task.module;
        document.getElementById('taskIssueTypeInput').value = task.issueType;
        document.getElementById('taskPriorityInput').value = task.priority;
        document.getElementById('taskSummaryInput').value = task.summary;
        document.getElementById('taskStatusInput').value = task.status;
        document.getElementById('taskPendingWithInput').value = task.pendingWith || 'None (Active)';
        document.getElementById('taskEnvInput').value = task.env || 'PROD';
        document.getElementById('taskAssignedToInput').value = task.assignedTo || '';
        document.getElementById('taskAssignedByInput').value = task.assignedBy || '';
        document.getElementById('taskStartDateInput').value = task.startDate || '';
        document.getElementById('taskEndDateInput').value = task.endDate || '';
        document.getElementById('taskProdDateInput').value = task.prodDate || '';
        document.getElementById('taskDetailsInput').value = task.details || '';
        document.getElementById('taskRcaInput').value = task.rca || '';
        document.getElementById('taskSolutionInput').value = task.solution || '';
        document.getElementById('taskMeetingTimeInput').value = task.meetingTime || '';
        document.getElementById('taskMeetingDurationInput').value = task.meetingDuration || '';
        document.getElementById('taskMeetingAttendeesInput').value = task.meetingAttendees || '';
        document.getElementById('taskMeetingNotesInput').value = task.meetingNotes || '';

        document.getElementById('deleteTaskBtn').classList.remove('hidden');
      } else {
        document.getElementById('taskModalTitle').innerText = 'Create Banking Work Item';
        document.getElementById('editTaskIdHidden').value = '';
        document.getElementById('taskIdInput').readOnly = false;
        
        const highestNum = tasks.reduce((max, t) => {
          const num = parseInt(t.id.replace('BNK-', ''), 10);
          return !isNaN(num) && num > max ? num : max;
        }, 1000);
        document.getElementById('taskIdInput').value = `BNK-${highestNum + 1}`;
        document.getElementById('taskStartDateInput').value = new Date().toISOString().split('T')[0];
        document.getElementById('taskPendingWithInput').value = 'None (Active)';
        document.getElementById('taskAssignedToInput').value = 'Support Engineer';
        document.getElementById('taskAssignedByInput').value = 'Operations Lead';
        document.getElementById('deleteTaskBtn').classList.add('hidden');
      }

      modal.classList.remove('hidden');
    }

    function closeTaskModal() {
      document.getElementById('taskModal').classList.add('hidden');
    }

    function switchModalTab(targetTabId) {
      document.querySelectorAll('.modal-tab-btn').forEach(btn => {
        if (btn.getAttribute('data-tab') === targetTabId) {
          btn.className = 'modal-tab-btn py-3 px-4 border-b-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 font-bold whitespace-nowrap flex-shrink-0';
        } else {
          btn.className = 'modal-tab-btn py-3 px-4 border-b-2 border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 font-medium whitespace-nowrap flex-shrink-0';
        }
      });
      document.querySelectorAll('.modal-tab-pane').forEach(pane => {
        pane.classList.toggle('hidden', pane.id !== targetTabId);
      });
    }

    function openTimesheetModal() {
      document.getElementById('timesheetForm').reset();
      const today = new Date().toISOString().split('T')[0];
      document.getElementById('tsDateInput').value = today;
      syncTsDay();
      document.getElementById('timesheetModal').classList.remove('hidden');
    }

    function closeTimesheetModal() {
      document.getElementById('timesheetModal').classList.add('hidden');
    }

    function syncTsDay() {
      const val = document.getElementById('tsDateInput').value;
      if (!val) return;
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      document.getElementById('tsDayInput').value = days[new Date(val).getDay()];
    }

    function deleteTimesheet(id) {
      customConfirm("Delete Timesheet Entry", "Remove this work entry?", () => {
        timesheets = timesheets.filter(ts => ts.id !== id);
        saveTimesheet();
        renderTimesheet();
        showToast("Timesheet entry removed", "info");
      });
    }

    /* -------------------------------------------------------------
       9. EXCEL & BACKUP IMPORT / EXPORT
    ------------------------------------------------------------- */
    function exportToCsv() {
      if (tasks.length === 0) return showToast("No tasks to export", "error");

      const headers = [
        "Task ID", "Module", "Issue Type", "Priority", "Status", "Pending With", 
        "Environment", "Summary", "Task Details", "RCA", "Solution Fix",
        "Assigned To", "Assigned By", "Start Date", "Target End Date", 
        "Production Date", "Ageing Days", "Meeting Time", "Meeting Notes"
      ];

      const csvRows = [headers.map(h => `"${h}"`).join(',')];

      tasks.forEach(t => {
        const ageing = calculateAgeing(t.startDate, t.status, t.closedDate);
        const row = [
          t.id || '', t.module || '', t.issueType || '', t.priority || '', t.status || '',
          t.pendingWith || 'None (Active)', t.env || '', t.summary || '', t.details || '',
          t.rca || '', t.solution || '', t.assignedTo || '', t.assignedBy || '',
          t.startDate || '', t.endDate || '', t.prodDate || '', ageing,
          t.meetingTime || '', t.meetingNotes || ''
        ];
        csvRows.push(row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(','));
      });

      const csvContent = "\uFEFF" + csvRows.join('\r\n');
      downloadBlob(csvContent, `PWMS_Tasks_${new Date().toISOString().split('T')[0]}.csv`, 'text/csv;charset=utf-8;');
      showToast("Tasks CSV exported successfully!", "success");
    }

    function exportTimesheetCsv() {
      if (timesheets.length === 0) return showToast("No timesheet entries to export", "error");

      const headers = [
        "#", "Resource Name", "POD Name (IBG, ILC, ARIPM etc.)", "Day", "Date",
        "Task Category", "Task - Name / Title / Milestone", "Task - Description",
        "Time Spent (Hrs)", "Priority (High, Low, Medium)", "Effort Estimate (Month/Days/Hours)",
        "Start Date", "Target Completion Date"
      ];

      const csvRows = [headers.map(h => `"${h}"`).join(',')];

      timesheets.forEach((r, idx) => {
        const row = [
          idx + 1, r.resource_name, r.pod_name, r.day_name, r.log_date,
          r.task_category, r.task_title, r.task_description, r.time_spent,
          r.priority, r.effort_estimate || '', r.start_date || '', r.target_date || ''
        ];
        csvRows.push(row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(','));
      });

      const csvContent = "\uFEFF" + csvRows.join('\r\n');
      downloadBlob(csvContent, `Timesheet_Weekly_${new Date().toISOString().split('T')[0]}.csv`, 'text/csv;charset=utf-8;');
      showToast("Timesheet CSV exported successfully!", "success");
    }

    function exportToJson() {
      const backupData = {
        app: "PWMS_Glassmorphism_Edition",
        exportDate: new Date().toISOString(),
        tasks: tasks,
        timesheets: timesheets
      };
      downloadBlob(JSON.stringify(backupData, null, 2), `PWMS_Backup_${new Date().toISOString().split('T')[0]}.json`, 'application/json');
      showToast("Full JSON Backup downloaded!", "success");
    }

    function importFromJson(file) {
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function(e) {
        try {
          const parsed = JSON.parse(e.target.result);
          const importedTasks = Array.isArray(parsed) ? parsed : (parsed.tasks || []);
          const importedTs = parsed.timesheets || [];

          customConfirm("Restore Workspace", `Import data (${importedTasks.length} tasks)?`, () => {
            tasks = importedTasks;
            if (importedTs.length) timesheets = importedTs;
            saveTasks();
            saveTimesheet();
            renderApp();
            showToast("Workspace state restored!", "success");
          });
        } catch (err) {
          showToast("Failed to parse JSON backup file.", "error");
        }
      };
      reader.readAsText(file);
    }

    function downloadBlob(content, filename, type) {
      const blob = new Blob([content], { type: type });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }

    /* -------------------------------------------------------------
       10. UI VIEW SWITCHING & FILTERS
    ------------------------------------------------------------- */
    function toggleSidebar(forceState) {
      const sidebar = document.getElementById('sidebar');
      const backdrop = document.getElementById('sidebarBackdrop');
      const isMobile = window.innerWidth < 1024;
      if (isMobile) {
        const willOpen = (typeof forceState === 'boolean') ? forceState : !sidebar.classList.contains('sidebar-open');
        sidebar.classList.toggle('sidebar-open', willOpen);
        if (backdrop) backdrop.classList.toggle('active', willOpen);
      } else {
        if (typeof forceState === 'boolean') {
          sidebar.classList.toggle('-ml-64', !forceState);
        } else {
          sidebar.classList.toggle('-ml-64');
        }
      }
    }

    function applyQuickModuleFilter(moduleName) {
      document.getElementById('filterModule').value = moduleName;
      if (window.innerWidth < 1024) toggleSidebar(false);
      if (currentView === 'metrics' || currentView === 'meetings' || currentView === 'timesheet') switchView('kanban');
      else renderApp();
    }

    function applyQuickPendingFilter(pendingName) {
      document.getElementById('filterPendingWith').value = pendingName;
      if (window.innerWidth < 1024) toggleSidebar(false);
      if (currentView === 'metrics' || currentView === 'meetings' || currentView === 'timesheet') switchView('kanban');
      else renderApp();
    }

    function switchView(viewName) {
      currentView = viewName;
      if (window.innerWidth < 1024) toggleSidebar(false);
      document.querySelectorAll('.nav-view-btn').forEach(btn => {
        if (btn.getAttribute('data-view') === viewName) {
          btn.className = 'nav-view-btn w-full flex items-center space-x-2.5 px-3.5 py-2.5 rounded-2xl text-xs font-bold bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/25 transition';
        } else {
          btn.className = 'nav-view-btn w-full flex items-center space-x-2.5 px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-white/80 dark:hover:bg-white/5 transition';
        }
      });

      // Update mobile bottom navigation buttons
      document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
        if (btn.getAttribute('data-view') === viewName) {
          btn.className = 'mobile-nav-btn flex-1 py-2 px-1 flex flex-col items-center justify-center gap-0.5 text-xs font-bold bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-xs transition';
        } else {
          btn.className = 'mobile-nav-btn flex-1 py-2 px-1 flex flex-col items-center justify-center gap-0.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition';
        }
      });

      document.getElementById('view-kanban').classList.toggle('hidden', viewName !== 'kanban');
      document.getElementById('view-timesheet').classList.toggle('hidden', viewName !== 'timesheet');
      document.getElementById('view-list').classList.toggle('hidden', viewName !== 'list');
      document.getElementById('view-meetings').classList.toggle('hidden', viewName !== 'meetings');
      document.getElementById('view-metrics').classList.toggle('hidden', viewName !== 'metrics');

      document.getElementById('filterToolbar').classList.toggle('hidden', viewName === 'metrics' || viewName === 'timesheet');

      renderApp();
    }

    /* -------------------------------------------------------------
       11. EVENT LISTENERS INITIALIZATION
     ------------------------------------------------------------- */
    window.onload = function () {
      loadData();
      setupDragAndDrop();
      updateThemeControls(document.documentElement.classList.contains('dark'));
      renderApp();

      // Theme Toggle
      document.getElementById('themeToggleBtn').addEventListener('click', toggleTheme);

      // View Navigation (Sidebar & Mobile Bottom Nav)
      document.querySelectorAll('.nav-view-btn').forEach(btn => {
        btn.addEventListener('click', () => switchView(btn.getAttribute('data-view')));
      });
      document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
        btn.addEventListener('click', () => switchView(btn.getAttribute('data-view')));
      });

      // Sidebar Toggle
      document.getElementById('toggleSidebarBtn').addEventListener('click', () => toggleSidebar());
      const closeSidebarBtn = document.getElementById('closeSidebarBtn');
      if (closeSidebarBtn) closeSidebarBtn.addEventListener('click', () => toggleSidebar(false));
      const sidebarBackdrop = document.getElementById('sidebarBackdrop');
      if (sidebarBackdrop) sidebarBackdrop.addEventListener('click', () => toggleSidebar(false));

      // Mobile More Menu & Data Hub
      const mobileMoreBtn = document.getElementById('mobileMoreBtn');
      if (mobileMoreBtn) {
        mobileMoreBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          toggleMobileMoreMenu();
        });
      }

      const mobileImportJsonInput = document.getElementById('mobileImportJsonInput');
      if (mobileImportJsonInput) {
        mobileImportJsonInput.addEventListener('change', (e) => {
          if (e.target.files.length > 0) {
            importFromJson(e.target.files[0]);
            closeMobileMoreMenu();
          }
        });
      }

      // Kanban Mobile Horizontal Scroll & Pill Indicator Sync
      setupKanbanScrollSync();

      // Mobile Initial Modes Setup
      if (window.innerWidth < 768) {
        setTimesheetViewMode('cards');
        setListViewMode('cards');
      }
      if (window.innerWidth < 1024) {
        switchMeetingsTab('meetings');
      }

      // Click outside listener for Mobile More Menu & Mobile FAB Speed Dial
      document.addEventListener('click', (e) => {
        const mobileMoreBtnEl = document.getElementById('mobileMoreBtn');
        const mobileMoreDropdown = document.getElementById('mobileMoreDropdown');
        if (mobileMoreDropdown && !mobileMoreDropdown.classList.contains('hidden')) {
          if (mobileMoreBtnEl && !mobileMoreBtnEl.contains(e.target) && !mobileMoreDropdown.contains(e.target)) {
            closeMobileMoreMenu();
          }
        }

        const fabBtn = document.getElementById('mobileFabBtn');
        const speedDialMenu = document.getElementById('mobileSpeedDialMenu');
        if (speedDialMenu && !speedDialMenu.classList.contains('hidden')) {
          if (fabBtn && !fabBtn.contains(e.target) && !speedDialMenu.contains(e.target)) {
            toggleSpeedDial(false);
          }
        }
      });

      let prevWidth = window.innerWidth;
      window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) {
          const sidebar = document.getElementById('sidebar');
          if (sidebar) sidebar.classList.remove('sidebar-open');
          const backdrop = document.getElementById('sidebarBackdrop');
          if (backdrop) backdrop.classList.remove('active');
          const meetingsCol = document.getElementById('meetingsCol');
          const deploymentsCol = document.getElementById('deploymentsCol');
          if (meetingsCol) { meetingsCol.classList.remove('hidden'); meetingsCol.classList.add('flex'); }
          if (deploymentsCol) { deploymentsCol.classList.remove('hidden'); deploymentsCol.classList.add('flex'); }
        } else {
          switchMeetingsTab(meetingsMobileTab);
        }
        if ((prevWidth < 768 && window.innerWidth >= 768) || (prevWidth >= 768 && window.innerWidth < 768)) {
          if (currentView === 'metrics') renderCharts();
        }
        prevWidth = window.innerWidth;
      });

      // Mobile Search
      const mobileSearchToggleBtn = document.getElementById('mobileSearchToggleBtn');
      const mobileSearchBar = document.getElementById('mobileSearchBar');
      const mobileSearchInput = document.getElementById('mobileSearchInput');
      const globalSearchInput = document.getElementById('globalSearchInput');
      const clearMobileSearchBtn = document.getElementById('clearMobileSearchBtn');

      if (mobileSearchToggleBtn && mobileSearchBar) {
        mobileSearchToggleBtn.addEventListener('click', () => {
          mobileSearchBar.classList.toggle('hidden');
          if (!mobileSearchBar.classList.contains('hidden')) {
            if (mobileSearchInput) {
              mobileSearchInput.value = globalSearchInput ? globalSearchInput.value : '';
              if (clearMobileSearchBtn) clearMobileSearchBtn.classList.toggle('hidden', !mobileSearchInput.value);
              mobileSearchInput.focus();
            }
          }
        });
      }

      if (mobileSearchInput && globalSearchInput) {
        mobileSearchInput.addEventListener('input', (e) => {
          globalSearchInput.value = e.target.value;
          if (clearMobileSearchBtn) clearMobileSearchBtn.classList.toggle('hidden', !e.target.value);
          renderApp();
        });
        globalSearchInput.addEventListener('input', (e) => {
          mobileSearchInput.value = e.target.value;
          if (clearMobileSearchBtn) clearMobileSearchBtn.classList.toggle('hidden', !e.target.value);
        });
      }

      if (clearMobileSearchBtn && mobileSearchInput && globalSearchInput) {
        clearMobileSearchBtn.addEventListener('click', () => {
          mobileSearchInput.value = '';
          globalSearchInput.value = '';
          clearMobileSearchBtn.classList.add('hidden');
          renderApp();
          mobileSearchInput.focus();
        });
      }

      // Filters
      document.getElementById('globalSearchInput').addEventListener('input', renderApp);
      document.getElementById('filterModule').addEventListener('change', renderApp);
      document.getElementById('filterPendingWith').addEventListener('change', renderApp);
      document.getElementById('filterAssignee').addEventListener('change', renderApp);
      document.getElementById('filterIssueType').addEventListener('change', renderApp);
      document.getElementById('filterPriority').addEventListener('change', renderApp);

      document.getElementById('toggleP1OnlyBtn').addEventListener('click', function() {
        this.classList.toggle('bg-rose-500');
        this.classList.toggle('text-white');
        renderApp();
      });

      document.getElementById('toggleHighAgeingBtn').addEventListener('click', function() {
        this.classList.toggle('bg-amber-500');
        this.classList.toggle('text-white');
        renderApp();
      });

      document.getElementById('clearFiltersBtn').addEventListener('click', () => {
        document.getElementById('globalSearchInput').value = '';
        if (document.getElementById('mobileSearchInput')) document.getElementById('mobileSearchInput').value = '';
        if (clearMobileSearchBtn) clearMobileSearchBtn.classList.add('hidden');
        document.getElementById('filterModule').value = 'ALL';
        document.getElementById('filterPendingWith').value = 'ALL';
        document.getElementById('filterAssignee').value = 'ALL';
        document.getElementById('filterIssueType').value = 'ALL';
        document.getElementById('filterPriority').value = 'ALL';
        document.getElementById('toggleP1OnlyBtn').classList.remove('bg-rose-500', 'text-white');
        document.getElementById('toggleHighAgeingBtn').classList.remove('bg-amber-500', 'text-white');
        renderApp();
        showToast("Filters reset to default.");
      });

      // Modals
      document.getElementById('openCreateModalBtn').addEventListener('click', () => openTaskModal());
      document.getElementById('openCreateTimesheetModalBtn').addEventListener('click', openTimesheetModal);
      document.getElementById('closeTaskModalBtn').addEventListener('click', closeTaskModal);
      document.getElementById('cancelTaskModalBtn').addEventListener('click', closeTaskModal);

      document.querySelectorAll('.modal-tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          switchModalTab(btn.getAttribute('data-tab'));
        });
      });

      // Save Task Form
      document.getElementById('taskForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const editId = document.getElementById('editTaskIdHidden').value;
        const taskId = document.getElementById('taskIdInput').value.trim().toUpperCase();

        const taskData = {
          id: taskId,
          module: document.getElementById('taskModuleInput').value,
          issueType: document.getElementById('taskIssueTypeInput').value,
          priority: document.getElementById('taskPriorityInput').value,
          summary: document.getElementById('taskSummaryInput').value.trim(),
          status: document.getElementById('taskStatusInput').value,
          pendingWith: document.getElementById('taskPendingWithInput').value,
          env: document.getElementById('taskEnvInput').value,
          assignedTo: document.getElementById('taskAssignedToInput').value.trim() || 'Unassigned',
          assignedBy: document.getElementById('taskAssignedByInput').value.trim(),
          startDate: document.getElementById('taskStartDateInput').value,
          endDate: document.getElementById('taskEndDateInput').value,
          prodDate: document.getElementById('taskProdDateInput').value,
          details: document.getElementById('taskDetailsInput').value.trim(),
          rca: document.getElementById('taskRcaInput').value.trim(),
          solution: document.getElementById('taskSolutionInput').value.trim(),
          meetingTime: document.getElementById('taskMeetingTimeInput').value,
          meetingDuration: document.getElementById('taskMeetingDurationInput').value,
          meetingAttendees: document.getElementById('taskMeetingAttendeesInput').value.trim(),
          meetingNotes: document.getElementById('taskMeetingNotesInput').value.trim(),
          closedDate: document.getElementById('taskStatusInput').value === 'Closed' ? (new Date().toISOString().split('T')[0]) : null
        };

        if (editId) {
          const idx = tasks.findIndex(t => t.id === editId);
          if (idx !== -1) tasks[idx] = { ...tasks[idx], ...taskData };
          showToast(`Task ${taskId} updated successfully!`, 'success');
        } else {
          if (tasks.some(t => t.id === taskId)) {
            showToast(`Task ID ${taskId} already exists!`, 'error');
            return;
          }
          tasks.unshift(taskData);
          showToast(`Created task ${taskId}!`, 'success');
        }

        saveTasks();
        closeTaskModal();
        renderApp();
      });

      // Save Timesheet Form
      document.getElementById('timesheetForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const entry = {
          id: Date.now(),
          resource_name: document.getElementById('tsResourceInput').value.trim(),
          pod_name: document.getElementById('tsPodInput').value.trim(),
          log_date: document.getElementById('tsDateInput').value,
          day_name: document.getElementById('tsDayInput').value,
          task_category: document.getElementById('tsCategoryInput').value,
          task_title: document.getElementById('tsTitleInput').value.trim(),
          task_description: document.getElementById('tsDescInput').value.trim(),
          time_spent: parseFloat(document.getElementById('tsHoursInput').value),
          priority: document.getElementById('tsPriorityInput').value,
          effort_estimate: document.getElementById('tsEstimateInput').value.trim(),
          start_date: document.getElementById('tsDateInput').value,
          target_date: document.getElementById('tsDateInput').value
        };

        timesheets.unshift(entry);
        saveTimesheet();
        closeTimesheetModal();
        if (currentView === 'timesheet') renderTimesheet();
        showToast("Activity logged to timesheet!", "success");
      });

      // Delete Task Button
      document.getElementById('deleteTaskBtn').addEventListener('click', () => {
        const idToDelete = document.getElementById('editTaskIdHidden').value;
        if (!idToDelete) return;
        customConfirm("Delete Item", `Permanently delete task ${idToDelete}?`, () => {
          tasks = tasks.filter(t => t.id !== idToDelete);
          saveTasks();
          closeTaskModal();
          renderApp();
          showToast(`Task ${idToDelete} removed.`, 'info');
        });
      });

      // Backup Dropdown Menu
      const backupMenuBtn = document.getElementById('backupMenuBtn');
      const backupMenuDropdown = document.getElementById('backupMenuDropdown');
      backupMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        backupMenuDropdown.classList.toggle('hidden');
      });
      document.addEventListener('click', () => backupMenuDropdown.classList.add('hidden'));

      // Backup Handlers
      document.getElementById('exportCsvBtn').addEventListener('click', exportToCsv);
      document.getElementById('exportTimesheetCsvBtn').addEventListener('click', exportTimesheetCsv);
      document.getElementById('exportJsonBtn').addEventListener('click', exportToJson);
      document.getElementById('importJsonInput').addEventListener('change', (e) => {
        if (e.target.files.length > 0) importFromJson(e.target.files[0]);
      });
      document.getElementById('resetSampleDataBtn').addEventListener('click', () => {
        customConfirm("Reload Sample Data", "Reset workspace to sample banking dataset?", () => {
          tasks = [...SAMPLE_TASKS];
          timesheets = [...SAMPLE_TIMESHEET];
          saveTasks();
          saveTimesheet();
          renderApp();
          showToast("Sample dataset reloaded!", "success");
        });
      });

      // Keyboard Shortcuts
      document.addEventListener('keydown', (e) => {
        if ((e.key === 'c' || e.key === 'C') && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
          e.preventDefault();
          openTaskModal();
        }
        if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
          e.preventDefault();
          if (window.innerWidth < 640 && mobileSearchBar && mobileSearchInput) {
            mobileSearchBar.classList.remove('hidden');
            mobileSearchInput.focus();
          } else {
            document.getElementById('globalSearchInput').focus();
          }
        }
        if (e.key === 'Escape') {
          closeTaskModal();
          closeTimesheetModal();
          document.getElementById('confirmDialog').classList.add('hidden');
          if (mobileSearchBar && !mobileSearchBar.classList.contains('hidden')) {
            mobileSearchBar.classList.add('hidden');
          }
          toggleSidebar(false);
          closeMobileMoreMenu();
          toggleSpeedDial(false);
        }
      });
    };