// Immediate theme initialization to prevent flash
    (function () {
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
            sans: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
            mono: ['JetBrains Mono', 'Fira Code', 'monospace']
          },
          colors: {
            brutal: {
              yellow: '#FFE600',
              cyan: '#00F0FF',
              pink: '#FF3366',
              green: '#00F59B',
              purple: '#B388FF',
              orange: '#FF8800',
              bgLight: '#F3F4F6',
              bgDark: '#0D0E12',
              surfaceLight: '#FFFFFF',
              surfaceDark: '#1A1C23',
              cardDark: '#232631',
              borderDark: '#FFFFFF'
            }
          },
          boxShadow: {
            'brutal': '4px 4px 0px 0px #000000',
            'brutal-sm': '2px 2px 0px 0px #000000',
            'brutal-lg': '6px 6px 0px 0px #000000',
            'brutal-dark': '4px 4px 0px 0px #FFE600',
            'brutal-dark-sm': '2px 2px 0px 0px #FFE600',
            'brutal-white': '4px 4px 0px 0px #FFFFFF',
            'brutal-white-sm': '2px 2px 0px 0px #FFFFFF'
          }
        }
      }
    }

        /* -------------------------------------------------------------
       1. STORAGE KEYS & SEED DATA
    ------------------------------------------------------------- */
    const STORAGE_KEY_TASKS = 'PWMS_BANKING_TASKS_DATA_V2';
    const STORAGE_KEY_TIMESHEET = 'PWMS_BANKING_TIMESHEET_DATA_V2';

    // Seed Banking Tasks with requested modules (BCRED, COLLNDISC, ARIMP, etc.)
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

    // Seed Timesheet matching Excel Image Template[cite: 1]
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
       3. BRUTALIST BADGES & HELPERS
    ------------------------------------------------------------- */
    function calculateAgeing(startDate, status, closedDate) {
      if (!startDate) return 0;
      const start = new Date(startDate);
      const end = (status === 'Closed' && closedDate) ? new Date(closedDate) : new Date();
      return Math.max(0, Math.floor((end - start) / 86400000));
    }

    function getAgeingBadgeHtml(ageingDays, status) {
      if (status === 'Closed') {
        return `<span class="bg-gray-200 dark:bg-black text-black dark:text-white px-1.5 py-0.5 border border-black dark:border-white text-[10px] font-mono font-bold">${ageingDays}d</span>`;
      }
      if (ageingDays >= 8) {
        return `<span class="bg-brutal-pink text-white px-1.5 py-0.5 border border-black dark:border-white text-[10px] font-mono font-black flex items-center gap-1 shadow-brutal-sm" title="High Ageing Warning"><i class="fa-solid fa-triangle-exclamation text-[9px]"></i> ${ageingDays}d</span>`;
      } else if (ageingDays >= 4) {
        return `<span class="bg-brutal-yellow text-black px-1.5 py-0.5 border border-black dark:border-white text-[10px] font-mono font-black flex items-center gap-1 shadow-brutal-sm"><i class="fa-regular fa-clock text-[9px]"></i> ${ageingDays}d</span>`;
      }
      return `<span class="bg-brutal-green text-black px-1.5 py-0.5 border border-black dark:border-white text-[10px] font-mono font-black shadow-brutal-sm">${ageingDays}d</span>`;
    }

    function getPendingWithBadgeHtml(pending) {
      if (!pending || pending === 'None (Active)') {
        return `<span class="bg-gray-100 dark:bg-black text-black dark:text-white border border-black dark:border-white px-1.5 py-0.5 text-[10px] font-mono font-bold flex items-center gap-1"><i class="fa-solid fa-user-check text-[9px]"></i> Active</span>`;
      }
      return `<span class="bg-brutal-yellow text-black border-2 border-black dark:border-white px-1.5 py-0.5 text-[10px] font-mono font-black flex items-center gap-1 shadow-brutal-sm">
        <i class="fa-solid fa-hourglass-half text-[9px]"></i>
        <span>PENDING: <strong>${escapeHtml(pending)}</strong></span>
      </span>`;
    }

    function getPriorityBadgeHtml(p) {
      switch (p) {
        case 'P1':
          return `<span class="bg-brutal-pink text-white border border-black dark:border-white px-1.5 py-0.5 font-black text-[10px] font-mono flex items-center gap-1 shadow-brutal-sm"><i class="fa-solid fa-angles-up"></i> P1 Blocker</span>`;
        case 'P2':
          return `<span class="bg-brutal-orange text-black border border-black dark:border-white px-1.5 py-0.5 font-black text-[10px] font-mono flex items-center gap-1 shadow-brutal-sm"><i class="fa-solid fa-angle-up"></i> P2 High</span>`;
        case 'P3':
          return `<span class="bg-brutal-cyan text-black border border-black dark:border-white px-1.5 py-0.5 font-black text-[10px] font-mono flex items-center gap-1 shadow-brutal-sm"><i class="fa-solid fa-bars"></i> P3 Med</span>`;
        default:
          return `<span class="bg-gray-200 dark:bg-black text-black dark:text-white border border-black dark:border-white px-1.5 py-0.5 font-bold text-[10px] font-mono flex items-center gap-1"><i class="fa-solid fa-angle-down"></i> P4 Low</span>`;
      }
    }

    function getModuleBadgeHtml(mod) {
      const colors = {
        'BCRED': 'bg-brutal-cyan text-black',
        'COLLNDISC': 'bg-brutal-green text-black',
        'ARIMP': 'bg-brutal-yellow text-black',
        'TORM': 'bg-brutal-purple text-black',
        'FIDB REVAMP': 'bg-brutal-pink text-white',
        'BULK EXPORT': 'bg-brutal-orange text-black',
        'FBFP': 'bg-brutal-yellow text-black',
        'FIDB IMPORT': 'bg-brutal-cyan text-black'
      };
      const cls = colors[mod] || 'bg-white dark:bg-black text-black dark:text-white';
      return `<span class="border border-black dark:border-white px-1.5 py-0.5 text-[10px] font-mono font-black shadow-brutal-sm ${cls}">${escapeHtml(mod)}</span>`;
    }

    function getStatusBadgeHtml(status) {
      const colors = {
        'Backlog': 'bg-gray-200 dark:bg-black text-black dark:text-white',
        'In Progress': 'bg-brutal-cyan text-black',
        'UAT / Testing': 'bg-brutal-purple text-black',
        'Ready for Prod': 'bg-brutal-yellow text-black',
        'Blocked': 'bg-brutal-pink text-white',
        'Closed': 'bg-brutal-green text-black'
      };
      const cls = colors[status] || 'bg-white dark:bg-black text-black dark:text-white';
      return `<span class="border border-black dark:border-white px-2 py-0.5 text-[10px] font-black uppercase font-mono shadow-brutal-sm ${cls}">${escapeHtml(status)}</span>`;
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
      showToast(isDark ? 'DARK BRUTALISM ACTIVATED' : 'LIGHT BRUTALISM ACTIVATED', 'info');
    }

    function updateThemeControls(isDark) {
      const icon = document.getElementById('themeToggleIcon');
      const label = document.getElementById('themeLabel');
      if (icon) icon.className = isDark ? 'fa-solid fa-sun text-sm text-brutal-yellow' : 'fa-solid fa-moon text-sm';
      if (label) label.innerText = isDark ? 'LIGHT' : 'DARK';
    }

    function showToast(message, type = 'info') {
      const container = document.getElementById('toastContainer');
      const toast = document.createElement('div');

      const typeBg = {
        success: 'bg-brutal-green text-black',
        error: 'bg-brutal-pink text-white',
        info: 'bg-brutal-yellow text-black'
      };

      toast.className = `${typeBg[type] || 'bg-white text-black'} px-4 py-2.5 border-4 border-black dark:border-white shadow-brutal-lg text-xs font-black flex items-center space-x-2.5 uppercase pointer-events-auto transition-transform`;
      toast.innerHTML = `
        <i class="fa-solid fa-terminal text-sm"></i>
        <span>${escapeHtml(message)}</span>
      `;

      container.appendChild(toast);
      setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 200);
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

      assigneeSelect.innerHTML = `<option value="ALL">ALL ASSIGNEES</option>`;
      uniqueAssignees.forEach(name => {
        const opt = document.createElement('option');
        opt.value = name;
        opt.textContent = name.toUpperCase();
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
      const p1Only = document.getElementById('toggleP1OnlyBtn').classList.contains('bg-red-600');
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
      const col = document.querySelector(`.kanban-col[data-status="${status}"]`);
      if (col) {
        col.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }

    function quickMoveTask(taskId, newStatus) {
      if (!newStatus) return;
      const task = tasks.find(t => t.id === taskId);
      if (task && task.status !== newStatus) {
        task.status = newStatus;
        if (newStatus === 'Closed') task.closedDate = new Date().toISOString().split('T')[0];
        if (newStatus === 'UAT / Testing' && task.pendingWith === 'None (Active)') task.pendingWith = 'Testers / QA';
        saveTasks();
        renderApp();
        showToast(`MOVED ${taskId} TO ${newStatus.toUpperCase()}`, 'success');
      }
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
        if (!dropzone) return;

        const colTasks = filteredTasks.filter(t => t.status === col);
        countSpan.innerText = colTasks.length;
        if (pillMap[col]) {
          const pill = document.getElementById(pillMap[col]);
          if (pill) pill.innerText = colTasks.length;
        }
        dropzone.innerHTML = '';

        if (colTasks.length === 0) {
          dropzone.innerHTML = `
            <div class="h-28 border-2 border-dashed border-black/40 dark:border-white/40 flex items-center justify-center text-black/40 dark:text-white/40 text-xs font-mono font-bold uppercase">
              NO WORK
            </div>
          `;
          return;
        }

        colTasks.forEach(task => {
          const ageing = calculateAgeing(task.startDate, task.status, task.closedDate);
          const card = document.createElement('div');
          card.className = 'kanban-card bg-white dark:bg-brutal-cardDark border-2 border-black dark:border-white p-3 shadow-brutal-sm dark:shadow-brutal-white-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition cursor-grab active:cursor-grabbing select-none space-y-2';
          card.setAttribute('draggable', 'true');
          card.setAttribute('data-id', task.id);

          card.innerHTML = `
            <div class="flex items-center justify-between">
              <span class="text-xs font-mono font-black text-black dark:text-white bg-brutal-yellow px-1 border border-black">${escapeHtml(task.id)}</span>
              ${getPriorityBadgeHtml(task.priority)}
            </div>

            <div class="text-xs font-black line-clamp-2 leading-snug">
              ${escapeHtml(task.summary)}
            </div>

            <div>
              ${getPendingWithBadgeHtml(task.pendingWith)}
            </div>

            <div class="pt-2 border-t-2 border-black dark:border-white flex items-center justify-between text-[11px]">
              ${getModuleBadgeHtml(task.module)}
              <div class="flex items-center space-x-1.5">
                <select onclick="event.stopPropagation()" onchange="quickMoveTask('${task.id}', this.value)" class="md:hidden text-[9px] font-mono font-bold bg-white dark:bg-black text-black dark:text-white border border-black dark:border-white px-1 py-0.5 shadow-brutal-sm" title="Quick Move Column">
                  <option value="" disabled selected>MOVE ▾</option>
                  <option value="Backlog">Backlog</option>
                  <option value="In Progress">In Prog</option>
                  <option value="UAT / Testing">UAT</option>
                  <option value="Ready for Prod">Prod</option>
                  <option value="Blocked">Blocked</option>
                  <option value="Closed">Closed</option>
                </select>
                ${getAgeingBadgeHtml(ageing, task.status)}
                <div class="w-6 h-6 border border-black dark:border-white bg-brutal-cyan text-black flex items-center justify-center text-[10px] font-black" title="Assignee: ${escapeHtml(task.assignedTo || 'Unassigned')}">
                  ${(task.assignedTo || 'U').charAt(0).toUpperCase()}
                </div>
              </div>
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

    /* --- VIEW 2: DAILY WORK TIMESHEET (Image Layout)[cite: 1] --- */
    function renderTimesheet() {
      const tbody = document.getElementById('timesheetTableBody');
      tbody.innerHTML = '';
      let totalHours = 0;

      timesheets.forEach((item, index) => {
        totalHours += parseFloat(item.time_spent || 0);
        const pClass = item.priority === 'High' ? 'bg-brutal-pink text-white' : item.priority === 'Medium' ? 'bg-brutal-yellow text-black' : 'bg-brutal-green text-black';

        const tr = document.createElement('tr');
        tr.className = 'hover:bg-brutal-yellow/20 dark:hover:bg-brutal-cardDark transition border-b-2 border-black dark:border-white text-xs';
        tr.innerHTML = `
          <td class="py-2.5 px-3 border-r-2 border-black dark:border-white font-mono font-bold">${index + 1}</td>
          <td class="py-2.5 px-3 border-r-2 border-black dark:border-white font-black">${escapeHtml(item.resource_name)}</td>
          <td class="py-2.5 px-3 border-r-2 border-black dark:border-white font-mono font-bold">${escapeHtml(item.pod_name)}</td>
          <td class="py-2.5 px-3 border-r-2 border-black dark:border-white">${escapeHtml(item.day_name)}</td>
          <td class="py-2.5 px-3 border-r-2 border-black dark:border-white font-mono">${item.log_date}</td>
          <td class="py-2.5 px-3 border-r-2 border-black dark:border-white font-bold">${escapeHtml(item.task_category)}</td>
          <td class="py-2.5 px-3 border-r-2 border-black dark:border-white font-black">${escapeHtml(item.task_title)}</td>
          <td class="py-2.5 px-3 border-r-2 border-black dark:border-white">${escapeHtml(item.task_description)}</td>
          <td class="py-2.5 px-3 border-r-2 border-black dark:border-white font-mono font-black bg-brutal-yellow/40 text-black dark:text-white">${item.time_spent} hrs</td>
          <td class="py-2.5 px-3 border-r-2 border-black dark:border-white">
            <span class="px-1.5 py-0.5 border border-black font-black text-[10px] uppercase ${pClass}">${item.priority}</span>
          </td>
          <td class="py-2.5 px-3 border-r-2 border-black dark:border-white font-mono">${escapeHtml(item.effort_estimate || '-')}</td>
          <td class="py-2.5 px-3 border-r-2 border-black dark:border-white font-mono">${item.start_date || '-'}</td>
          <td class="py-2.5 px-3 border-r-2 border-black dark:border-white font-mono">${item.target_date || '-'}</td>
          <td class="py-2.5 px-3 text-center">
            <button onclick="deleteTimesheet(${item.id})" class="p-1 hover:text-red-600 transition" title="Delete Log">
              <i class="fa-solid fa-trash"></i>
            </button>
          </td>
        `;
        tbody.appendChild(tr);
      });

      document.getElementById('timesheetTotalHrsBadge').innerText = `TOTAL LOGGED: ${totalHours.toFixed(2)} HRS`;
    }

    /* --- VIEW 3: DETAILED LIST VIEW --- */
    function renderList(filteredTasks) {
      const tbody = document.getElementById('listTableBody');
      tbody.innerHTML = '';

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
        tbody.innerHTML = `<tr><td colspan="12" class="text-center py-8 text-black/50 dark:text-white/50 font-bold font-mono">ZERO MATCHING BANKING ITEMS</td></tr>`;
        return;
      }

      sorted.forEach(t => {
        const ageing = calculateAgeing(t.startDate, t.status, t.closedDate);
        const tr = document.createElement('tr');
        tr.className = 'hover:bg-brutal-cyan/20 dark:hover:bg-brutal-cardDark transition cursor-pointer border-b-2 border-black dark:border-white text-xs';
        tr.innerHTML = `
          <td class="py-2.5 px-3 font-mono font-black text-black dark:text-white">${escapeHtml(t.id)}</td>
          <td class="py-2.5 px-3 whitespace-nowrap font-bold">${escapeHtml(t.issueType)}</td>
          <td class="py-2.5 px-3 font-black max-w-xs truncate" title="${escapeHtml(t.summary)}">${escapeHtml(t.summary)}</td>
          <td class="py-2.5 px-3">${getModuleBadgeHtml(t.module)}</td>
          <td class="py-2.5 px-3 whitespace-nowrap">${getPendingWithBadgeHtml(t.pendingWith)}</td>
          <td class="py-2.5 px-3">${getPriorityBadgeHtml(t.priority)}</td>
          <td class="py-2.5 px-3">${getStatusBadgeHtml(t.status)}</td>
          <td class="py-2.5 px-3 font-mono font-bold">${escapeHtml(t.env || '-')}</td>
          <td class="py-2.5 px-3 font-mono">${escapeHtml(t.startDate || '-')}</td>
          <td class="py-2.5 px-3">${getAgeingBadgeHtml(ageing, t.status)}</td>
          <td class="py-2.5 px-3 font-black truncate max-w-[120px]">${escapeHtml(t.assignedTo || 'Unassigned')}</td>
          <td class="py-2.5 px-3 text-center">
            <button onclick="event.stopPropagation(); openTaskModal('${t.id}')" class="p-1 hover:text-brutal-pink transition" title="Edit">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
          </td>
        `;
        tr.addEventListener('click', () => openTaskModal(t.id));
        tbody.appendChild(tr);
      });
    }

    function sortTable(column) {
      if (sortColumn === column) sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
      else { sortColumn = column; sortDirection = 'asc'; }
      renderList(getFilteredTasks());
    }

    /* --- VIEW 4: MEETINGS & SYNC SCHEDULE --- */
    function setMeetingsScope(scope) {
      currentMeetingsScope = scope;
      document.getElementById('scopeTodayBtn').className = scope === 'today' ? 'px-3 py-1 text-xs border-2 border-black font-black bg-brutal-yellow text-black shadow-brutal-sm' : 'px-3 py-1 text-xs border-2 border-black font-black bg-white dark:bg-black text-black dark:text-white shadow-brutal-sm';
      document.getElementById('scopeAllBtn').className = scope === 'all' ? 'px-3 py-1 text-xs border-2 border-black font-black bg-brutal-yellow text-black shadow-brutal-sm' : 'px-3 py-1 text-xs border-2 border-black font-black bg-white dark:bg-black text-black dark:text-white shadow-brutal-sm';
      renderMeetings(tasks);
    }

    function renderMeetings(allTasks) {
      const meetingsContainer = document.getElementById('meetingsListContainer');
      const followUpsContainer = document.getElementById('followUpsListContainer');
      const todayStr = new Date().toISOString().split('T')[0];

      meetingsContainer.innerHTML = '';
      followUpsContainer.innerHTML = '';

      let meetingItems = allTasks.filter(t => t.meetingTime || ['Meeting', 'KT Session', 'BRD Discussion'].includes(t.issueType));
      let followUpItems = allTasks.filter(t => t.priority === 'P1' || t.status === 'Ready for Prod' || t.issueType === 'Deployment');

      if (currentMeetingsScope === 'today') {
        meetingItems = meetingItems.filter(t => t.startDate === todayStr || t.meetingTime);
        followUpItems = followUpItems.filter(t => t.startDate === todayStr || t.status !== 'Closed');
      }

      document.getElementById('meetingsCountBadge').innerText = meetingItems.length;
      document.getElementById('deploymentsCountBadge').innerText = followUpItems.length;

      if (meetingItems.length === 0) {
        meetingsContainer.innerHTML = `<div class="text-center py-10 font-mono font-bold text-xs opacity-50">NO SCHEDULED CALLS</div>`;
      } else {
        meetingItems.forEach(m => {
          const card = document.createElement('div');
          card.className = 'border-2 border-black dark:border-white p-3 bg-white dark:bg-brutal-cardDark shadow-brutal-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition cursor-pointer';
          card.onclick = () => openTaskModal(m.id);
          card.innerHTML = `
            <div class="flex items-center justify-between mb-1.5">
              <span class="bg-brutal-yellow text-black font-black px-2 py-0.5 border border-black text-[11px] font-mono">
                <i class="fa-regular fa-clock"></i> ${escapeHtml(m.meetingTime || 'Flexible')} ${m.meetingDuration ? `(${escapeHtml(m.meetingDuration)}m)` : ''}
              </span>
              <span class="text-[10px] font-mono font-bold">${escapeHtml(m.startDate || 'Today')}</span>
            </div>
            <div class="text-xs font-black mb-1">${escapeHtml(m.summary)}</div>
            <div class="text-[11px] bg-brutal-bgLight dark:bg-black p-2 border border-black dark:border-white mb-2 font-mono">
              <strong>ATTENDEES:</strong> ${escapeHtml(m.meetingAttendees || 'Team Members')}<br>
              <strong>NOTES:</strong> ${escapeHtml(m.meetingNotes || 'No specific agenda logged.')}
            </div>
            <div class="flex items-center justify-between text-[10px] pt-1 border-t-2 border-black dark:border-white">
              <span class="font-mono font-black">${escapeHtml(m.id)}</span>
              ${getStatusBadgeHtml(m.status)}
            </div>
          `;
          meetingsContainer.appendChild(card);
        });
      }

      if (followUpItems.length === 0) {
        followUpsContainer.innerHTML = `<div class="text-center py-10 font-mono font-bold text-xs opacity-50">ZERO BLOCKERS OR RELEASES</div>`;
      } else {
        followUpItems.forEach(f => {
          const ageing = calculateAgeing(f.startDate, f.status, f.closedDate);
          const card = document.createElement('div');
          card.className = 'border-2 border-black dark:border-white p-3 bg-white dark:bg-brutal-cardDark shadow-brutal-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition cursor-pointer';
          card.onclick = () => openTaskModal(f.id);
          card.innerHTML = `
            <div class="flex items-center justify-between mb-1.5">
              <div class="flex items-center gap-1.5">
                ${getPriorityBadgeHtml(f.priority)}
                <span class="bg-black text-white px-1.5 py-0.5 text-[10px] font-mono font-bold border border-black">${escapeHtml(f.env || 'PROD')}</span>
                ${getPendingWithBadgeHtml(f.pendingWith)}
              </div>
              ${getAgeingBadgeHtml(ageing, f.status)}
            </div>
            <div class="text-xs font-black mb-1">${escapeHtml(f.summary)}</div>
            ${f.prodDate ? `<div class="text-[11px] font-bold bg-brutal-purple text-black px-2 py-1 border border-black mb-2"><i class="fa-solid fa-calendar-check mr-1"></i> TARGET PROD: ${escapeHtml(f.prodDate)}</div>` : ''}
            <div class="flex items-center justify-between text-[10px] pt-1 border-t-2 border-black dark:border-white">
              <span class="font-mono font-black">${escapeHtml(f.id)} [${escapeHtml(f.module)}]</span>
              <span class="font-bold">OWNER: ${escapeHtml(f.assignedTo || 'Unassigned')}</span>
            </div>
          `;
          followUpsContainer.appendChild(card);
        });
      }
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
        highAgeingTbody.innerHTML = `<tr><td colspan="9" class="text-center py-4 text-emerald-600 dark:text-emerald-400 font-bold font-mono text-xs">NO TASKS EXCEEDING 7 DAYS AGEING</td></tr>`;
      } else {
        criticalAgeingTasks.forEach(t => {
          const tr = document.createElement('tr');
          tr.className = 'hover:bg-brutal-pink/20 transition cursor-pointer border-b border-black dark:border-white text-xs';
          tr.onclick = () => openTaskModal(t.id);
          tr.innerHTML = `
            <td class="p-2 font-mono font-black">${escapeHtml(t.id)}</td>
            <td class="p-2">${getModuleBadgeHtml(t.module)}</td>
            <td class="p-2">${getPendingWithBadgeHtml(t.pendingWith)}</td>
            <td class="p-2 font-bold">${escapeHtml(t.issueType)}</td>
            <td class="p-2 font-black max-w-xs truncate">${escapeHtml(t.summary)}</td>
            <td class="p-2">${getStatusBadgeHtml(t.status)}</td>
            <td class="p-2">${getPriorityBadgeHtml(t.priority)}</td>
            <td class="p-2">${getAgeingBadgeHtml(t.calculatedAge, t.status)}</td>
            <td class="p-2 font-bold">${escapeHtml(t.assignedTo || 'Unassigned')}</td>
          `;
          highAgeingTbody.appendChild(tr);
        });
      }

      renderCharts();
    }

    function renderCharts() {
      const isDark = document.documentElement.classList.contains('dark');
      const textColor = isDark ? '#FFFFFF' : '#000000';
      const gridColor = isDark ? '#333333' : '#E5E7EB';

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
            backgroundColor: ['#FFE600', '#B388FF', '#00F0FF', '#FF3366', '#FF8800', '#00F59B', '#D1D5DB'],
            borderColor: '#000000',
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { ticks: { color: textColor, font: { weight: 'bold' } }, grid: { color: gridColor } },
            y: { beginAtZero: true, ticks: { color: textColor, font: { weight: 'bold' }, precision: 0 }, grid: { color: gridColor } }
          }
        }
      });

      // Chart 2: Status Chart
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
            backgroundColor: ['#E5E7EB', '#00F0FF', '#B388FF', '#FFE600', '#FF3366', '#00F59B'],
            borderColor: '#000000',
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { ticks: { color: textColor, font: { weight: 'bold' } }, grid: { color: gridColor } },
            y: { beginAtZero: true, ticks: { color: textColor, font: { weight: 'bold' }, precision: 0 }, grid: { color: gridColor } }
          }
        }
      });

      // Chart 3: Modules Chart
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
            backgroundColor: ['#00F0FF', '#00F59B', '#FFE600', '#B388FF', '#FF3366', '#FF8800', '#FFF500', '#7000FF'],
            borderColor: '#000000',
            borderWidth: 3
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: window.innerWidth < 768 ? 'bottom' : 'right',
              labels: { color: textColor, font: { weight: 'bold', size: window.innerWidth < 640 ? 9 : 10 } }
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
            showToast(`MOVED ${taskId} TO ${newStatus.toUpperCase()}`, 'success');
          }
        });
      });
    }

    /* -------------------------------------------------------------
       8. MODAL HANDLERS (TASK & TIMESHEET)
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

        document.getElementById('taskModalTitle').innerText = `EDIT TASK ${task.id}`;
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
        document.getElementById('taskModalTitle').innerText = 'CREATE BANKING WORK ITEM';
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
          btn.className = 'modal-tab-btn py-2.5 px-4 border-r-2 border-black dark:border-white bg-white dark:bg-brutal-surfaceDark text-black dark:text-white font-black whitespace-nowrap flex-shrink-0';
        } else {
          btn.className = 'modal-tab-btn py-2.5 px-4 border-r-2 border-black dark:border-white text-black/60 dark:text-white/60 font-black whitespace-nowrap flex-shrink-0';
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
        app: "PWMS_Brutalist_Edition",
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
      reader.onload = function (e) {
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
          btn.className = 'nav-view-btn w-full flex items-center space-x-2.5 px-3 py-2 border-2 border-black dark:border-white text-xs font-black bg-brutal-yellow text-black shadow-brutal-sm transition';
        } else {
          btn.className = 'nav-view-btn w-full flex items-center space-x-2.5 px-3 py-2 border-2 border-black dark:border-white text-xs font-bold bg-white dark:bg-brutal-cardDark text-black dark:text-white shadow-brutal-sm dark:shadow-brutal-white-sm hover:bg-brutal-cyan hover:text-black transition';
        }
      });

      // Update mobile bottom nav active state
      document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
        const isCurrent = btn.getAttribute('data-view') === viewName;
        if (isCurrent) {
          btn.className = 'mobile-nav-btn flex-1 py-2 px-1 flex flex-col items-center justify-center gap-0.5 text-[10px] font-mono font-black bg-brutal-yellow text-black border-r-2 last:border-r-0 border-black dark:border-white transition shadow-inner';
        } else {
          btn.className = 'mobile-nav-btn flex-1 py-2 px-1 flex flex-col items-center justify-center gap-0.5 text-[10px] font-mono font-bold bg-white dark:bg-brutal-surfaceDark text-black dark:text-white border-r-2 last:border-r-0 border-black dark:border-white transition';
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

      // View Navigation
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
      window.addEventListener('resize', () => {
        if (window.innerWidth >= 1024) {
          const sidebar = document.getElementById('sidebar');
          if (sidebar) sidebar.classList.remove('sidebar-open');
          const backdrop = document.getElementById('sidebarBackdrop');
          if (backdrop) backdrop.classList.remove('active');
        }
        if (currentView === 'metrics') {
          renderCharts();
        }
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
              mobileSearchInput.focus();
              if (clearMobileSearchBtn) clearMobileSearchBtn.classList.toggle('hidden', !mobileSearchInput.value);
            }
          }
        });
      }

      if (clearMobileSearchBtn) {
        clearMobileSearchBtn.addEventListener('click', () => {
          if (mobileSearchInput) mobileSearchInput.value = '';
          if (globalSearchInput) globalSearchInput.value = '';
          clearMobileSearchBtn.classList.add('hidden');
          renderApp();
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

      // Filters
      document.getElementById('globalSearchInput').addEventListener('input', renderApp);
      document.getElementById('filterModule').addEventListener('change', renderApp);
      document.getElementById('filterPendingWith').addEventListener('change', renderApp);
      document.getElementById('filterAssignee').addEventListener('change', renderApp);
      document.getElementById('filterIssueType').addEventListener('change', renderApp);
      document.getElementById('filterPriority').addEventListener('change', renderApp);

      document.getElementById('toggleP1OnlyBtn').addEventListener('click', function () {
        this.classList.toggle('bg-red-600');
        this.classList.toggle('text-white');
        renderApp();
      });

      document.getElementById('toggleHighAgeingBtn').addEventListener('click', function () {
        this.classList.toggle('bg-amber-500');
        this.classList.toggle('text-white');
        renderApp();
      });

      document.getElementById('clearFiltersBtn').addEventListener('click', () => {
        document.getElementById('globalSearchInput').value = '';
        if (document.getElementById('mobileSearchInput')) document.getElementById('mobileSearchInput').value = '';
        document.getElementById('filterModule').value = 'ALL';
        document.getElementById('filterPendingWith').value = 'ALL';
        document.getElementById('filterAssignee').value = 'ALL';
        document.getElementById('filterIssueType').value = 'ALL';
        document.getElementById('filterPriority').value = 'ALL';
        document.getElementById('toggleP1OnlyBtn').classList.remove('bg-red-600', 'text-white');
        document.getElementById('toggleHighAgeingBtn').classList.remove('bg-amber-500', 'text-white');
        renderApp();
        showToast("FILTERS RESET");
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
          showToast(`TASK ${taskId} UPDATED`, 'success');
        } else {
          if (tasks.some(t => t.id === taskId)) {
            showToast(`TASK ID ${taskId} ALREADY EXISTS`, 'error');
            return;
          }
          tasks.unshift(taskData);
          showToast(`TASK ${taskId} CREATED`, 'success');
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
        showToast("WORK LOG APPENDED", "success");
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
          showToast(`TASK ${idToDelete} DELETED`, 'info');
        });
      });

      // Dropdown Backup Menu
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
          showToast("SAMPLE DATASET RESTORED", "success");
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
        }
      });
    };