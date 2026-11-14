// Immediate theme initialization to prevent flash of light theme
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
          colors: {
            jira: {
              header: '#0747A6',
              sidebar: '#0C2340',
              blue: '#0052CC',
              hover: '#0065FF',
              subtle: '#DEEBFF',
              text: '#172B4D',
              secondary: '#6B778C',
              bg: '#F4F5F7',
              card: '#FFFFFF',
              border: '#DFE1E6',
              green: '#36B37E',
              red: '#FF5630',
              amber: '#FFAB00',
              purple: '#6554C0',
              teal: '#008DA6'
            },
            darkjira: {
              bg: '#1D2125',
              surface: '#22272B',
              border: '#2C333A',
              subtle: '#282E33',
              text: '#B6C2CF',
              heading: '#DEE4EA',
              accent: '#579DFF'
            }
          }
        }
      }
    }

    /* -------------------------------------------------------------
       1. DATA STRUCTURE & DEFAULT SEED DATA
    ------------------------------------------------------------- */
    const STORAGE_KEY = 'PWMS_BANKING_TASKS_DATA_V2';
    const WORK_LOGS_STORAGE_KEY = 'PWMS_BANKING_WORK_LOGS_V2';
    const USER_CONFIG_STORAGE_KEY = 'PWMS_USER_TIMESHEET_CONFIG_V2';

    // Default initial sample dataset with Pending With and realistic Banking team assignees
    const SAMPLE_TASKS = [
      {
        id: "BNK-1001",
        module: "BCRED",
        issueType: "Production Issue",
        priority: "P1",
        status: "In Progress",
        pendingWith: "DBA Team",
        summary: "EOD batch failure in BCRED_INTEREST_ACCRUAL job with ORA-01555 snapshot too old",
        details: "Incident INC882910. Credit cards batch aborted at step 42. Over 45,000 corporate credit cards interest unposted. Need urgent cursor optimization.",
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
        module: "COLL",
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
        module: "PAYMENTS",
        issueType: "Development Activity",
        priority: "P3",
        status: "Ready for Prod",
        pendingWith: "Testers / QA",
        summary: "Implement ISO 20022 pacs.008 outward customer credit transfer validation",
        details: "Regulatory change mandatory rollout. Outward RTGS/NEFT XML schema upgrade and parser enhancement.",
        rca: "N/A - Feature enhancement.",
        solution: "Built XML validator component using banking standard ISO schema v2024. QA regression pending on test pack 4.",
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
        module: "TREASURY",
        issueType: "BRD Discussion",
        priority: "P3",
        status: "In Progress",
        pendingWith: "BSG",
        summary: "BRD Walkthrough: FX Forward contract mark-to-market revaluation formula update",
        details: "Treasury front office requesting real-time MTM valuation calculation for EUR/USD and GBP/INR hedges.",
        rca: "Requirement Gathering.",
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
        meetingNotes: "Agreed to adopt Reuters feed discount curve instead of static monthly table.",
        closedDate: null
      },
      {
        id: "BNK-1005",
        module: "AUTH",
        issueType: "Production Issue",
        priority: "P1",
        status: "Blocked",
        pendingWith: "Third-Party Vendor",
        summary: "Corporate NetBanking 2FA OTP delivery timeout via Primary SMS Gateway",
        details: "Customers facing 60+ seconds delay receiving 2FA OTP for fund transfers > 50 Lakhs. Fallback secondary gateway routing triggering intermittent socket reset.",
        rca: "Primary gateway vendor IP lease expired on cloud balancer.",
        solution: "Currently rerouted 100% traffic to Secondary Gateway. Vendor ticket escalated to Critical Priority.",
        assignedTo: "Infra On-Call",
        assignedBy: "Operations Lead",
        env: "PROD",
        startDate: new Date(Date.now() - 8 * 86400000).toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0],
        prodDate: "",
        meetingTime: "12:15",
        meetingDuration: "15",
        meetingAttendees: "Infra Ops, Telecom Vendor Rep",
        meetingNotes: "Waiting on carrier root cause report before lifting blocker tag.",
        closedDate: null
      },
      {
        id: "BNK-1006",
        module: "CORE",
        issueType: "KT Session",
        priority: "P4",
        status: "Backlog",
        pendingWith: "DEV",
        summary: "Knowledge Transfer on GL Suspense Account clearing & auto-reconciliation job",
        details: "New team members onboarding session on General Ledger internal routing and exception queues.",
        rca: "N/A",
        solution: "Slidedeck & schema documentation prepared in shared drive.",
        assignedTo: "Support Engineer",
        assignedBy: "Engineering Manager",
        env: "DEV",
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
        prodDate: "",
        meetingTime: "15:00",
        meetingDuration: "45",
        meetingAttendees: "Support Team, New Engineers",
        meetingNotes: "Hands-on walkthrough of staging logs and reconciliation tables.",
        closedDate: null
      },
      {
        id: "BNK-1007",
        module: "TRADE",
        issueType: "User Query",
        priority: "P3",
        status: "Closed",
        pendingWith: "None (Active)",
        summary: "Export Letter of Credit amendment commission not reflecting on statement",
        details: "Branch operations query: Branch #042 complained that amendment advice generated had zero commission charges.",
        rca: "Branch user selected tariff code 'EXEMPT' mistakenly.",
        solution: "Clarified tariff code mapping to branch manager. Reversal and correct debit voucher passed.",
        assignedTo: "Support Engineer",
        assignedBy: "Branch Operations (Branch 042)",
        env: "PROD",
        startDate: new Date(Date.now() - 9 * 86400000).toISOString().split('T')[0],
        endDate: new Date(Date.now() - 6 * 86400000).toISOString().split('T')[0],
        prodDate: new Date(Date.now() - 6 * 86400000).toISOString().split('T')[0],
        meetingTime: "",
        meetingDuration: "",
        meetingAttendees: "",
        meetingNotes: "",
        closedDate: new Date(Date.now() - 6 * 86400000).toISOString().split('T')[0]
      }
    ];

    // Work logs state & week navigation
    let workLogs = [];
    let activeWeekOffset = 0; // 0 = current week, -1 = last week, +1 = next week

    // Sample work log dataset in past-tense matching the user's template
    const SAMPLE_WORK_LOGS = [
      {
        id: "LOG-201",
        resourceName: "Tanmay S / Lead-ICM",
        podName: "IBG",
        date: getPastDateForCurrentWeek(0), // Monday
        timeSlot: "09:00 - 10:00",
        category: "Meeting / Discussion",
        title: "Daily Morning Standup & Sprint Status Call",
        description: "Attended daily morning scrum call with BSG and Product Owners from 09:00 to 10:00. Provided technical status updates on BCRED and COLL defect fixes.",
        hours: 1.0,
        priority: "High",
        effortEstimate: "1 Hour",
        startDate: getPastDateForCurrentWeek(0),
        targetDate: getPastDateForCurrentWeek(0),
        isOvertime: "no"
      },
      {
        id: "LOG-202",
        resourceName: "Tanmay S / Lead-ICM",
        podName: "BCRED",
        date: getPastDateForCurrentWeek(0), // Monday
        timeSlot: "10:30 - 13:00",
        category: "Production Support",
        title: "Triage & Fix for BCRED ORA-01555 Snapshot Batch Error",
        description: "Investigated incident INC882910 with DBA team. Analyzed SQL explain plans, added compound index on CARD_ACCT_ID and tuned chunk commits.",
        hours: 2.5,
        priority: "High",
        effortEstimate: "1 Day",
        startDate: getPastDateForCurrentWeek(0),
        targetDate: getPastDateForCurrentWeek(1),
        isOvertime: "no"
      },
      {
        id: "LOG-203",
        resourceName: "Tanmay S / Lead-ICM",
        podName: "COLL",
        date: getPastDateForCurrentWeek(0), // Monday
        timeSlot: "14:00 - 17:30",
        category: "New Development",
        title: "Collateral Haircut Valuation Logic Stored Procedure SP_CALC",
        description: "Refactored valuation procedure for sovereign debt instruments with maturity > 10 yrs as per revised RBI guidelines. Prepared SIT test cases.",
        hours: 3.5,
        priority: "Medium",
        effortEstimate: "3 Days",
        startDate: getPastDateForCurrentWeek(0),
        targetDate: getPastDateForCurrentWeek(3),
        isOvertime: "no"
      },
      {
        id: "LOG-204",
        resourceName: "Tanmay S / Lead-ICM",
        podName: "CORE",
        date: getPastDateForCurrentWeek(0), // Monday
        timeSlot: "18:00 - 20:00",
        category: "Documentation",
        title: "Architecture & Interface Document for Pacs.008 ISO Migration",
        description: "Prepared technical interface agreement and XML mapping document for core settlement gateway. Documented sample payload variations.",
        hours: 2.0,
        priority: "Low",
        effortEstimate: "2 Days",
        startDate: getPastDateForCurrentWeek(0),
        targetDate: getPastDateForCurrentWeek(2),
        isOvertime: "yes" // Extra overtime captured!
      },
      {
        id: "LOG-205",
        resourceName: "Tanmay S / Lead-ICM",
        podName: "ARIPM",
        date: getPastDateForCurrentWeek(1), // Tuesday
        timeSlot: "11:00 - 13:00",
        category: "BRD / Requirement",
        title: "BRD Discussion with Treasury Risk Desk on FX Forward Contracts",
        description: "Attended requirement walkthrough meeting with Treasury desk head. Reviewed Reuters live discount curve feed specs and mapped table structures.",
        hours: 2.0,
        priority: "High",
        effortEstimate: "1 Week",
        startDate: getPastDateForCurrentWeek(1),
        targetDate: getPastDateForCurrentWeek(5),
        isOvertime: "no"
      },
      {
        id: "LOG-206",
        resourceName: "Tanmay S / Lead-ICM",
        podName: "ILC",
        date: getPastDateForCurrentWeek(1), // Tuesday
        timeSlot: "14:30 - 18:30",
        category: "RnD / POC",
        title: "RnD & Benchmark on In-Memory Redis Cache for Account Inquiries",
        description: "Conducted proof-of-concept testing to offload high-frequency balance inquiries from core database. Reduced average latency from 280ms to 18ms.",
        hours: 4.0,
        priority: "Medium",
        effortEstimate: "4 Days",
        startDate: getPastDateForCurrentWeek(1),
        targetDate: getPastDateForCurrentWeek(4),
        isOvertime: "no"
      }
    ];

    // Helper to calculate past date based on Monday of current week
    function getPastDateForCurrentWeek(dayOffsetFromMonday) {
      const now = new Date();
      const currentDay = now.getDay(); // 0 is Sunday, 1 is Monday...
      const diffToMonday = currentDay === 0 ? -6 : 1 - currentDay;
      const monday = new Date(now.setDate(now.getDate() + diffToMonday));
      const target = new Date(monday);
      target.setDate(monday.getDate() + dayOffsetFromMonday);
      return target.toISOString().split('T')[0];
    }


    /* -------------------------------------------------------------
       2. STATE & STORAGE MANAGEMENT
    ------------------------------------------------------------- */

    let tasks = [];
    let currentView = 'kanban';
    let currentMeetingsScope = 'today';
    let statusChartInstance = null;
    let moduleChartInstance = null;
    let pendingChartInstance = null;
    let sortColumn = 'startDate';
    let sortDirection = 'desc';

    function loadTasks() {
      try {
        const stored = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('PWMS_BANKING_TASKS_DATA_V1');
        if (stored) {
          tasks = JSON.parse(stored);
          tasks.forEach(t => {
            if (!t.pendingWith) t.pendingWith = 'None (Active)';
          });
        } else {
          tasks = [...SAMPLE_TASKS];
          saveTasks();
        }

        // Load Work Logs
        const storedLogs = localStorage.getItem(WORK_LOGS_STORAGE_KEY);
        if (storedLogs) {
          workLogs = JSON.parse(storedLogs);
        } else {
          workLogs = [...SAMPLE_WORK_LOGS];
          saveWorkLogs();
        }

        // Load User Config (Resource name & default POD)
        const storedConfig = localStorage.getItem(USER_CONFIG_STORAGE_KEY);
        if (storedConfig) {
          const cfg = JSON.parse(storedConfig);
          if (cfg.resourceName) document.getElementById('resourceNameSetting').value = cfg.resourceName;
          if (cfg.defaultPod) document.getElementById('defaultPodSetting').value = cfg.defaultPod;
        }
      } catch (e) {
        console.error("Failed to parse LocalStorage data. Loading sample data.", e);
        tasks = [...SAMPLE_TASKS];
        workLogs = [...SAMPLE_WORK_LOGS];
      }
    }

    function saveTasks() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
      } catch (e) {
        showToast("Storage quota error! Please export backup.", "error");
      }
    }

    function saveWorkLogs() {
      try {
        localStorage.setItem(WORK_LOGS_STORAGE_KEY, JSON.stringify(workLogs));
      } catch (e) {
        showToast("Storage quota error for work logs!", "error");
      }
    }

    function saveUserConfig() {
      const cfg = {
        resourceName: document.getElementById('resourceNameSetting').value.trim() || 'Tanmay S / Lead-ICM',
        defaultPod: document.getElementById('defaultPodSetting').value
      };
      localStorage.setItem(USER_CONFIG_STORAGE_KEY, JSON.stringify(cfg));
    }

    // let tasks = [];
    // let currentView = 'kanban';
    // let currentMeetingsScope = 'today';
    // let statusChartInstance = null;
    // let moduleChartInstance = null;
    // let pendingChartInstance = null;
    // let sortColumn = 'startDate';
    // let sortDirection = 'desc';

    // function loadTasks() {
    //   try {
    //     const stored = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('PWMS_BANKING_TASKS_DATA_V1');
    //     if (stored) {
    //       tasks = JSON.parse(stored);
    //       // Auto-migrate any tasks missing pendingWith
    //       tasks.forEach(t => {
    //         if (!t.pendingWith) t.pendingWith = 'None (Active)';
    //       });
    //     } else {
    //       tasks = [...SAMPLE_TASKS];
    //       saveTasks();
    //     }
    //   } catch (e) {
    //     console.error("Failed to parse LocalStorage data. Loading sample data.", e);
    //     tasks = [...SAMPLE_TASKS];
    //   }
    // }

    // function saveTasks() {
    //   try {
    //     localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    //   } catch (e) {
    //     showToast("Storage quota error! Please export backup.", "error");
    //   }
    // }

    /* -------------------------------------------------------------
       3. UTILITY FUNCTIONS & BADGES
    ------------------------------------------------------------- */
    function calculateAgeing(startDate, status, closedDate) {
      if (!startDate) return 0;
      const start = new Date(startDate);
      const end = (status === 'Closed' && closedDate) ? new Date(closedDate) : new Date();
      const diff = Math.max(0, end - start);
      return Math.floor(diff / (1000 * 60 * 60 * 24));
    }

    function getAgeingBadgeHtml(ageingDays, status) {
      if (status === 'Closed') {
        return `<span class="bg-gray-100 dark:bg-[#282E33] text-gray-600 dark:text-gray-400 px-1.5 py-0.5 rounded text-[10px] font-mono"><i class="fa-solid fa-check text-[9px]"></i> ${ageingDays}d</span>`;
      }
      if (ageingDays >= 8) {
        return `<span class="bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-900/50 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold flex items-center gap-1" title="High Ageing Warning"><i class="fa-solid fa-triangle-exclamation text-[9px] text-red-600 dark:text-red-400"></i> ${ageingDays}d</span>`;
      } else if (ageingDays >= 4) {
        return `<span class="bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-900/50 px-1.5 py-0.5 rounded text-[10px] font-mono font-medium flex items-center gap-1"><i class="fa-regular fa-clock text-[9px]"></i> ${ageingDays}d</span>`;
      }
      return `<span class="bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/50 px-1.5 py-0.5 rounded text-[10px] font-mono font-medium">${ageingDays}d</span>`;
    }

    // High-visibility Jira-style badge for "Pending With"
    function getPendingWithBadgeHtml(pending) {
      if (!pending || pending === 'None (Active)') {
        return `<span class="bg-slate-100 dark:bg-[#282E33] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#2C333A] px-1.5 py-0.5 rounded text-[10px] font-medium flex items-center gap-1"><i class="fa-solid fa-user-check text-[9px] text-slate-400 dark:text-slate-500"></i> Active</span>`;
      }

      const styles = {
        'BSG': 'bg-amber-50 dark:bg-[#2a2215] text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-700/60 font-semibold',
        'DEV': 'bg-blue-50 dark:bg-[#162536] text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-700/60 font-semibold',
        'Testers / QA': 'bg-purple-50 dark:bg-[#261936] text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-700/60 font-semibold',
        'Business Operations': 'bg-teal-50 dark:bg-[#122827] text-teal-800 dark:text-teal-300 border-teal-300 dark:border-teal-700/60',
        'DBA Team': 'bg-rose-50 dark:bg-[#2e161c] text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-700/60 font-semibold',
        'Infra / DevOps': 'bg-cyan-50 dark:bg-[#122731] text-cyan-800 dark:text-cyan-300 border-cyan-300 dark:border-cyan-700/60',
        'InfoSec / Audit': 'bg-red-50 dark:bg-[#2d1419] text-red-800 dark:text-red-300 border-red-300 dark:border-red-700/60',
        'Third-Party Vendor': 'bg-orange-50 dark:bg-[#2c1d14] text-orange-800 dark:text-orange-300 border-orange-300 dark:border-orange-700/60 font-bold',
        'Client / Branch User': 'bg-indigo-50 dark:bg-[#1b1c35] text-indigo-800 dark:text-indigo-300 border-indigo-300 dark:border-indigo-700/60'
      };

      const matchedStyle = styles[pending] || 'bg-amber-50 dark:bg-[#2a2215] text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-700/60';
      return `<span class="border px-1.5 py-0.5 rounded text-[10px] flex items-center gap-1 shadow-2xs ${matchedStyle}" title="Task is waiting on ${escapeHtml(pending)}">
        <i class="fa-solid fa-hourglass-half text-[9px] opacity-80"></i>
        <span>Pending: <strong>${escapeHtml(pending)}</strong></span>
      </span>`;
    }

    function getPriorityBadgeHtml(p) {
      switch (p) {
        case 'P1':
          return `<span class="bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800 px-1.5 py-0.5 rounded font-bold text-[10px] flex items-center gap-1"><i class="fa-solid fa-angles-up text-red-600 dark:text-red-400"></i> P1 Blocker</span>`;
        case 'P2':
          return `<span class="bg-orange-100 dark:bg-orange-950/60 text-orange-800 dark:text-orange-300 border border-orange-200 dark:border-orange-800 px-1.5 py-0.5 rounded font-semibold text-[10px] flex items-center gap-1"><i class="fa-solid fa-angle-up text-orange-600 dark:text-orange-400"></i> P2 High</span>`;
        case 'P3':
          return `<span class="bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 px-1.5 py-0.5 rounded text-[10px] flex items-center gap-1"><i class="fa-solid fa-bars text-blue-600 dark:text-blue-400"></i> P3 Med</span>`;
        default:
          return `<span class="bg-gray-100 dark:bg-[#282E33] text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-[#2C333A] px-1.5 py-0.5 rounded text-[10px] flex items-center gap-1"><i class="fa-solid fa-angle-down text-gray-500"></i> P4 Low</span>`;
      }
    }

    function getModuleBadgeHtml(mod) {
      const colors = {
        'BCRED': 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
        'COLLANDDISC': 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
        'FBFP': 'bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800',
        'BULK EXPORT': 'bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800',
        'FIDB Imports': 'bg-cyan-50 dark:bg-cyan-950/50 text-cyan-800 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800',
        'BULK FIDB REVAMP': 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
        'ARIMP': 'bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800',
        'TORM': 'bg-orange-50 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800',
        'TIRM': 'bg-teal-50 dark:bg-teal-950/50 text-teal-800 dark:text-teal-300 border-teal-200 dark:border-teal-800'
      };
      const cls = colors[mod] || 'bg-gray-100 dark:bg-[#282E33] text-gray-700 dark:text-gray-300 border-gray-200 dark:border-[#2C333A]';
      return `<span class="border px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold ${cls}">${mod}</span>`;
    }

    function getStatusBadgeHtml(status) {
      const colors = {
        'Backlog': 'bg-gray-100 dark:bg-[#282E33] text-gray-700 dark:text-gray-300 border-gray-300 dark:border-[#2C333A]',
        'In Progress': 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 border-blue-300 dark:border-blue-700',
        'UAT / Testing': 'bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 border-amber-300 dark:border-amber-700',
        'Ready for Prod': 'bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 border-purple-300 dark:border-purple-700',
        'Blocked': 'bg-rose-100 dark:bg-rose-900/50 text-rose-800 dark:text-rose-200 border-rose-300 dark:border-rose-700 font-bold',
        'Closed': 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200 border-emerald-300 dark:border-emerald-700'
      };
      const cls = colors[status] || 'bg-gray-100 dark:bg-[#282E33] text-gray-600 dark:text-gray-400 border-gray-300 dark:border-[#2C333A]';
      return `<span class="border px-2 py-0.5 rounded text-[11px] font-medium ${cls}">${status}</span>`;
    }

    /* -------------------------------------------------------------
       THEME MANAGEMENT (DARK / LIGHT)
    ------------------------------------------------------------- */
    function toggleTheme() {
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('pwms_theme', isDark ? 'dark' : 'light');
      updateThemeControls(isDark);
      if (currentView === 'metrics') {
        renderCharts();
      }
      showToast(isDark ? 'Dark theme enabled' : 'Light theme enabled', 'info');
    }

    function updateThemeControls(isDark) {
      const icon = document.getElementById('themeToggleIcon');
      const label = document.getElementById('themeLabel');
      if (icon) {
        icon.className = isDark ? 'fa-solid fa-sun text-sm text-amber-300' : 'fa-solid fa-moon text-sm';
      }
      if (label) {
        label.innerText = isDark ? 'Light' : 'Dark';
      }
    }

    function showToast(message, type = 'info') {
      const container = document.getElementById('toastContainer');
      const toast = document.createElement('div');

      const icons = {
        success: 'fa-circle-check text-green-500',
        error: 'fa-circle-exclamation text-red-500',
        info: 'fa-circle-info text-blue-500'
      };

      toast.className = 'bg-slate-900 dark:bg-[#22272B] text-white dark:text-[#DEE4EA] px-4 py-2.5 rounded-md shadow-xl text-xs flex items-center space-x-2.5 border border-slate-700 dark:border-[#2C333A] animate-in fade-in slide-in-from-bottom-2 duration-200 pointer-events-auto';
      toast.innerHTML = `
        <i class="fa-solid ${icons[type] || icons.info} text-sm"></i>
        <span>${escapeHtml(message)}</span>
      `;

      container.appendChild(toast);
      setTimeout(() => {
        toast.classList.add('opacity-0', 'transition-opacity');
        setTimeout(() => toast.remove(), 300);
      }, 3500);
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
       4. DYNAMIC ASSIGNEE SYNC
    ------------------------------------------------------------- */
    function syncAssigneeOptions() {
      const assigneeSelect = document.getElementById('filterAssignee');
      const currentSelected = assigneeSelect.value || 'ALL';
      const datalist = document.getElementById('assigneeDatalist');

      // Default banking team members + dynamic extract from tasks
      const defaultMembers = ['Support Engineer', 'Hiralal', 'Tanmay', 'Vivek', 'Tejasvini', 'Arun', 'Dileep', 'Unassigned'];
      const set = new Set(defaultMembers);

      tasks.forEach(t => {
        if (t.assignedTo && t.assignedTo.trim()) {
          set.add(t.assignedTo.trim());
        }
      });

      const uniqueAssignees = Array.from(set).sort();

      // Repopulate Filter Dropdown
      assigneeSelect.innerHTML = `<option value="ALL">All Assignees</option>`;
      uniqueAssignees.forEach(name => {
        const opt = document.createElement('option');
        opt.value = name;
        opt.textContent = name;
        assigneeSelect.appendChild(opt);
      });
      // Restore selected if still exists
      if (Array.from(assigneeSelect.options).some(o => o.value === currentSelected)) {
        assigneeSelect.value = currentSelected;
      } else {
        assigneeSelect.value = 'ALL';
      }

      // Repopulate Modal Datalist
      datalist.innerHTML = '';
      uniqueAssignees.forEach(name => {
        const opt = document.createElement('option');
        opt.value = name;
        datalist.appendChild(opt);
      });
    }

    /* -------------------------------------------------------------
       5. FILTERING PIPELINE
    ------------------------------------------------------------- */
    function getFilteredTasks() {
      const searchTerm = document.getElementById('globalSearchInput').value.trim().toLowerCase();
      const modFilter = document.getElementById('filterModule').value;
      const pendingFilter = document.getElementById('filterPendingWith').value;
      const assigneeFilter = document.getElementById('filterAssignee').value;
      const typeFilter = document.getElementById('filterIssueType').value;
      const priorityFilter = document.getElementById('filterPriority').value;
      const p1Only = document.getElementById('toggleP1OnlyBtn').classList.contains('bg-red-500');
      const highAgeingOnly = document.getElementById('toggleHighAgeingBtn').classList.contains('bg-amber-500');

      return tasks.filter(t => {
        // Module filter
        if (modFilter !== 'ALL' && t.module !== modFilter) return false;

        // Pending With filter
        if (pendingFilter !== 'ALL') {
          if (pendingFilter === 'BSG' && t.pendingWith !== 'BSG') return false;
          else if (pendingFilter !== 'BSG' && t.pendingWith !== pendingFilter) return false;
        }

        // Assignee filter
        if (assigneeFilter !== 'ALL') {
          if (assigneeFilter === 'Unassigned') {
            if (t.assignedTo && t.assignedTo.trim() !== '') return false;
          } else {
            if ((t.assignedTo || '').trim().toLowerCase() !== assigneeFilter.toLowerCase()) return false;
          }
        }

        // Issue Type filter
        if (typeFilter !== 'ALL' && t.issueType !== typeFilter) return false;

        // Priority filter
        if (priorityFilter !== 'ALL' && t.priority !== priorityFilter) return false;

        // P1 Only filter
        if (p1Only && t.priority !== 'P1') return false;

        // High Ageing filter (> 5 days)
        if (highAgeingOnly) {
          const age = calculateAgeing(t.startDate, t.status, t.closedDate);
          if (age < 5) return false;
        }

        // Text Search
        if (searchTerm) {
          const hay = `${t.id} ${t.summary} ${t.module} ${t.pendingWith} ${t.details} ${t.solution} ${t.rca} ${t.assignedTo} ${t.assignedBy} ${t.issueType}`.toLowerCase();
          if (!hay.includes(searchTerm)) return false;
        }
        return true;
      });
    }

    /* -------------------------------------------------------------
       6. VIEW RENDERING
    ------------------------------------------------------------- */
    // function renderApp() {
    //   syncAssigneeOptions();
    //   const filtered = getFilteredTasks();
    //   document.getElementById('visibleTasksCount').innerText = filtered.length;
    //   updateSidebarBadges();

    //   if (currentView === 'kanban') {
    //     renderKanban(filtered);
    //   } else if (currentView === 'list') {
    //     renderList(filtered);
    //   } else if (currentView === 'meetings') {
    //     renderMeetings(tasks);
    //   } else if (currentView === 'metrics') {
    //     renderMetrics();
    //   }
    // }

    function renderApp() {
      syncAssigneeOptions();
      const filtered = getFilteredTasks();
      document.getElementById('visibleTasksCount').innerText = filtered.length;
      updateSidebarBadges();

      if (currentView === 'kanban') {
        renderKanban(filtered);
      } else if (currentView === 'list') {
        renderList(filtered);
      } else if (currentView === 'meetings') {
        renderTimesheetView();
      } else if (currentView === 'metrics') {
        renderMetrics();
      }
    }

    function updateSidebarBadges() {
      // Modules badge count
      const modules = ['BCRED', 'COLLANDDISC', 'FBFP', 'BULK EXPORT', 'FIDB Imports', 'BULK FIDB REVAMP'];
      modules.forEach(m => {
        const badge = document.getElementById(`badge-${m}`);
        if (badge) {
          const count = tasks.filter(t => t.module === m && t.status !== 'Closed').length;
          badge.innerText = count;
        }
      });

      // Key Bottleneck Badges
      const bsgCount = tasks.filter(t => t.pendingWith === 'BSG' && t.status !== 'Closed').length;
      const qaCount = tasks.filter(t => t.pendingWith === 'Testers / QA' && t.status !== 'Closed').length;
      const devCount = tasks.filter(t => t.pendingWith === 'DEV' && t.status !== 'Closed').length;

      document.getElementById('badge-pending-BSG').innerText = bsgCount;
      document.getElementById('badge-pending-QA').innerText = qaCount;
      document.getElementById('badge-pending-DEV').innerText = devCount;
    }

    /* --- VIEW 1: KANBAN --- */
    function renderKanban(filteredTasks) {
      const columns = ['Backlog', 'In Progress', 'UAT / Testing', 'Ready for Prod', 'Blocked', 'Closed'];

      columns.forEach(col => {
        const dropzone = document.querySelector(`.kanban-dropzone[data-status="${col}"]`);
        const countSpan = document.querySelector(`.kanban-col[data-status="${col}"] .col-count`);
        if (!dropzone) return;

        const colTasks = filteredTasks.filter(t => t.status === col);
        countSpan.innerText = colTasks.length;
        dropzone.innerHTML = '';

        if (colTasks.length === 0) {
          dropzone.innerHTML = `
            <div class="h-24 border-2 border-dashed border-gray-200 rounded flex items-center justify-center text-gray-400 text-[11px]">
              No tasks
            </div>
          `;
          return;
        }

        colTasks.forEach(task => {
          const ageing = calculateAgeing(task.startDate, task.status, task.closedDate);
          const card = document.createElement('div');
          card.className = 'kanban-card bg-white dark:bg-[#22272B] rounded-md p-3 border border-gray-200 dark:border-[#2C333A] shadow-2xs hover:shadow-md transition cursor-pointer select-none space-y-2';
          card.setAttribute('draggable', 'true');
          card.setAttribute('data-id', task.id);

          card.innerHTML = `
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-1.5">
                <span class="text-[11px] font-mono font-bold text-jira-blue dark:text-blue-400 hover:underline">${escapeHtml(task.id)}</span>
                ${task.env ? `<span class="bg-gray-100 dark:bg-[#282E33] text-gray-600 dark:text-gray-300 text-[9px] px-1 rounded font-mono font-semibold">${escapeHtml(task.env)}</span>` : ''}
              </div>
              <div class="flex items-center space-x-1">
                ${getPriorityBadgeHtml(task.priority)}
              </div>
            </div>

            <div class="text-xs font-semibold text-jira-text dark:text-[#DEE4EA] line-clamp-2 leading-snug">
              ${escapeHtml(task.summary)}
            </div>

            <!-- Prominent Pending With Badge -->
            <div class="flex items-center">
              ${getPendingWithBadgeHtml(task.pendingWith)}
            </div>

            <div class="pt-1.5 border-t border-gray-100 dark:border-[#2C333A] flex items-center justify-between text-[11px]">
              <div class="flex items-center space-x-1">
                ${getModuleBadgeHtml(task.module)}
                <span class="text-[10px] text-gray-500 dark:text-gray-400 truncate max-w-[80px]" title="${escapeHtml(task.issueType)}">${escapeHtml(task.issueType)}</span>
              </div>
              <div class="flex items-center space-x-1.5">
                ${getAgeingBadgeHtml(ageing, task.status)}
                <div class="w-5 h-5 rounded-full bg-slate-200 dark:bg-[#282E33] text-slate-700 dark:text-slate-300 flex items-center justify-center text-[10px] font-bold" title="Assignee: ${escapeHtml(task.assignedTo || 'Unassigned')}">
                  ${(task.assignedTo || 'U').charAt(0).toUpperCase()}
                </div>
              </div>
            </div>
          `;

          // Card Click Event
          card.addEventListener('click', () => openTaskModal(task.id));

          // Drag Events
          card.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', task.id);
            card.classList.add('dragging');
          });

          card.addEventListener('dragend', () => {
            card.classList.remove('dragging');
          });

          dropzone.appendChild(card);
        });
      });
    }

    /* --- VIEW 2: DETAILED LIST / EXCEL VIEW --- */
    function renderList(filteredTasks) {
      const tbody = document.getElementById('listTableBody');
      tbody.innerHTML = '';

      // Sorting
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
        tbody.innerHTML = `
          <tr>
            <td colspan="12" class="text-center py-8 text-gray-400 text-xs">
              No matching banking work items found.
            </td>
          </tr>
        `;
        return;
      }

      sorted.forEach(t => {
        const ageing = calculateAgeing(t.startDate, t.status, t.closedDate);
        const tr = document.createElement('tr');
        tr.className = 'hover:bg-blue-50/50 dark:hover:bg-[#282E33]/70 transition cursor-pointer group text-xs';
        tr.innerHTML = `
          <td class="py-2.5 px-3 font-mono font-bold text-jira-blue dark:text-blue-400">${escapeHtml(t.id)}</td>
          <td class="py-2.5 px-3 text-gray-500 dark:text-gray-400 whitespace-nowrap">${escapeHtml(t.issueType)}</td>
          <td class="py-2.5 px-3 font-medium text-jira-text dark:text-[#DEE4EA] max-w-xs truncate" title="${escapeHtml(t.summary)}">${escapeHtml(t.summary)}</td>
          <td class="py-2.5 px-3">${getModuleBadgeHtml(t.module)}</td>
          <td class="py-2.5 px-3 whitespace-nowrap">${getPendingWithBadgeHtml(t.pendingWith)}</td>
          <td class="py-2.5 px-3">${getPriorityBadgeHtml(t.priority)}</td>
          <td class="py-2.5 px-3">${getStatusBadgeHtml(t.status)}</td>
          <td class="py-2.5 px-3 font-mono text-[11px] text-gray-600 dark:text-gray-300">${escapeHtml(t.env || '-')}</td>
          <td class="py-2.5 px-3 text-gray-500 dark:text-gray-400 whitespace-nowrap">${escapeHtml(t.startDate || '-')}</td>
          <td class="py-2.5 px-3">${getAgeingBadgeHtml(ageing, t.status)}</td>
          <td class="py-2.5 px-3 text-gray-700 dark:text-gray-300 font-medium truncate max-w-[120px]" title="${escapeHtml(t.assignedTo || 'Unassigned')}">
            <span class="inline-flex items-center gap-1">
              <i class="fa-regular fa-user text-[10px] text-gray-400"></i> ${escapeHtml(t.assignedTo || 'Unassigned')}
            </span>
          </td>
          <td class="py-2.5 px-3 text-center">
            <button onclick="event.stopPropagation(); openTaskModal('${t.id}')" class="p-1 hover:text-jira-blue dark:hover:text-blue-400 text-gray-400 dark:text-gray-500" title="Edit">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
          </td>
        `;
        tr.addEventListener('click', () => openTaskModal(t.id));
        tbody.appendChild(tr);
      });
    }

    function sortTable(column) {
      if (sortColumn === column) {
        sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        sortColumn = column;
        sortDirection = 'asc';
      }
      renderList(getFilteredTasks());
    }

    /* --- VIEW 3: MEETINGS & DAILY TRACKER --- */

    /* --- VIEW 3: DAILY WORK LOG & TIMESHEET (MATCHING EXCEL TEMPLATE) --- */
    function getWeekDateRange(offset = 0) {
      const now = new Date();
      now.setDate(now.getDate() + (offset * 7));
      const currentDay = now.getDay();
      const diffToMonday = currentDay === 0 ? -6 : 1 - currentDay;

      const monday = new Date(now);
      monday.setDate(now.getDate() + diffToMonday);

      const sunday = new Date(monday);
      sunday.setDate(monday.getDate() + 6);

      const days = [];
      const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      for (let i = 0; i < 7; i++) {
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);
        days.push({
          dayName: dayNames[i],
          dateStr: d.toISOString().split('T')[0],
          display: `${dayNames[i]} (${d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })})`
        });
      }

      return {
        mondayStr: monday.toISOString().split('T')[0],
        sundayStr: sunday.toISOString().split('T')[0],
        formattedRange: `${monday.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })} - ${sunday.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}`,
        days: days
      };
    }

    function renderTimesheetView() {
      const weekInfo = getWeekDateRange(activeWeekOffset);
      document.getElementById('currentWeekRangeLabel').innerText = weekInfo.formattedRange;

      // Filter work logs for the active week
      const weeklyLogs = workLogs.filter(log => {
        return log.date >= weekInfo.mondayStr && log.date <= weekInfo.sundayStr;
      });

      // Calculate KPI hours
      let totalHrs = 0;
      let extraHrs = 0;
      let meetingHrs = 0;
      let devHrs = 0;

      weeklyLogs.forEach(l => {
        const hrs = parseFloat(l.hours) || 0;
        totalHrs += hrs;
        if (l.isOvertime === 'yes') {
          extraHrs += hrs;
        }
        if (l.category === 'Meeting / Discussion' || l.category === 'KT Session' || l.category === 'BRD / Requirement') {
          meetingHrs += hrs;
        }
        if (l.category === 'New Development' || l.category === 'RnD / POC' || l.category === 'Documentation' || l.category === 'CR / Enhancement') {
          devHrs += hrs;
        }
      });

      const standardHrs = Math.max(0, totalHrs - extraHrs);

      document.getElementById('statWeeklyTotalHours').innerHTML = `${totalHrs.toFixed(1)} <span class="text-xs font-normal text-gray-400">hrs</span>`;
      document.getElementById('statStandardHours').innerHTML = `${standardHrs.toFixed(1)} <span class="text-xs font-normal text-gray-400">hrs</span>`;
      document.getElementById('statOvertimeHours').innerHTML = `${extraHrs.toFixed(1)} <span class="text-xs font-normal text-gray-400">hrs</span>`;
      document.getElementById('statMeetingHours').innerHTML = `${meetingHrs.toFixed(1)} <span class="text-xs font-normal text-gray-400">hrs</span>`;
      document.getElementById('statDevHours').innerHTML = `${devHrs.toFixed(1)} <span class="text-xs font-normal text-gray-400">hrs</span>`;

      renderTimesheetTable();
    }

    function renderTimesheetTable() {
      const weekInfo = getWeekDateRange(activeWeekOffset);
      const dayFilter = document.getElementById('timesheetDayFilter').value;
      const tbody = document.getElementById('timesheetTableBody');
      tbody.innerHTML = '';

      // Get logs for week
      let logsForWeek = workLogs.filter(l => l.date >= weekInfo.mondayStr && l.date <= weekInfo.sundayStr);

      if (dayFilter !== 'ALL') {
        const targetDay = weekInfo.days.find(d => d.dayName === dayFilter);
        if (targetDay) {
          logsForWeek = logsForWeek.filter(l => l.date === targetDay.dateStr);
        }
      }

      // Sort by Date asc, then timeSlot
      logsForWeek.sort((a, b) => (a.date + (a.timeSlot || '')).localeCompare(b.date + (b.timeSlot || '')));

      if (logsForWeek.length === 0) {
        tbody.innerHTML = `
          <tr>
            <td colspan="13" class="text-center py-10 text-gray-400 dark:text-gray-500 text-xs">
              <i class="fa-solid fa-business-time text-2xl mb-2 text-gray-300 dark:text-gray-600 block"></i>
              No work tasks logged for this period. Click <strong>"Log Work / Meeting"</strong> to record your day's past-tense activities.
            </td>
          </tr>
        `;
        return;
      }

      let serialNumber = 1;
      let lastDayHeader = '';

      logsForWeek.forEach(log => {
        const logDateObj = new Date(log.date);
        const dayName = logDateObj.toLocaleDateString('en-US', { weekday: 'long' });
        const dateFormatted = logDateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });

        // Insert day separator row if transitioning days in 'ALL' view
        if (dayFilter === 'ALL' && lastDayHeader !== dayName) {
          lastDayHeader = dayName;
          const dayTotalHours = logsForWeek
            .filter(l => {
              const d = new Date(l.date).toLocaleDateString('en-US', { weekday: 'long' });
              return d === dayName;
            })
            .reduce((sum, l) => sum + (parseFloat(l.hours) || 0), 0);

          const sepTr = document.createElement('tr');
          sepTr.className = 'bg-slate-100 dark:bg-[#1A2229] border-y border-gray-300 dark:border-[#2C333A] text-[11px] font-bold text-jira-text dark:text-[#DEE4EA]';
          sepTr.innerHTML = `
            <td colspan="13" class="py-1 px-3">
              <div class="flex items-center justify-between">
                <span class="flex items-center gap-1.5 uppercase tracking-wide">
                  <i class="fa-regular fa-calendar-check text-jira-blue dark:text-blue-400"></i> ${dayName} - ${dateFormatted}
                </span>
                <span class="text-xs font-mono font-bold text-jira-blue dark:text-blue-300">
                  Total Day Effort: ${dayTotalHours.toFixed(1)} hrs
                </span>
              </div>
            </td>
          `;
          tbody.appendChild(sepTr);
        }

        const tr = document.createElement('tr');
        tr.className = 'hover:bg-blue-50/50 dark:hover:bg-[#282E33]/70 transition text-xs group';

        const priorityBadge = log.priority === 'High'
          ? '<span class="text-red-600 dark:text-red-400 font-bold">High</span>'
          : (log.priority === 'Low' ? '<span class="text-gray-500">Low</span>' : '<span class="text-amber-600 dark:text-amber-400 font-medium">Medium</span>');

        const overtimeBadge = log.isOvertime === 'yes'
          ? '<span class="ml-1 bg-purple-100 dark:bg-purple-900/60 text-purple-800 dark:text-purple-300 text-[9px] px-1 py-0.2 rounded font-bold uppercase" title="Overtime / Extra effort">OT</span>'
          : '';

        tr.innerHTML = `
          <td class="py-2 px-3 text-center font-mono text-gray-500">${serialNumber++}</td>
          <td class="py-2 px-3 font-medium whitespace-nowrap text-jira-text dark:text-[#DEE4EA]">${escapeHtml(log.resourceName)}</td>
          <td class="py-2 px-3 whitespace-nowrap"><span class="bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 px-1.5 py-0.5 rounded font-mono font-bold text-[10px]">${escapeHtml(log.podName)}</span></td>
          <td class="py-2 px-3 whitespace-nowrap text-gray-600 dark:text-gray-300">
            <span class="font-semibold">${dayName}</span>
            <div class="text-[10px] text-gray-400">${escapeHtml(log.date)}</div>
          </td>
          <td class="py-2 px-3 whitespace-nowrap">
            <span class="bg-gray-100 dark:bg-[#282E33] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-[#2C333A] px-1.5 py-0.5 rounded text-[10px] font-medium">${escapeHtml(log.category)}</span>
          </td>
          <td class="py-2 px-3 font-semibold text-jira-text dark:text-[#DEE4EA]">
            <div class="line-clamp-1" title="${escapeHtml(log.title)}">${escapeHtml(log.title)}</div>
            ${log.timeSlot ? `<div class="text-[10px] font-mono text-blue-600 dark:text-blue-400"><i class="fa-regular fa-clock text-[9px]"></i> ${escapeHtml(log.timeSlot)}</div>` : ''}
          </td>
          <td class="py-2 px-3 text-gray-700 dark:text-gray-300 min-w-[260px] font-mono leading-relaxed">
            ${escapeHtml(log.description)}
          </td>
          <td class="py-2 px-3 text-center whitespace-nowrap font-mono font-bold text-jira-blue dark:text-blue-400">
            ${parseFloat(log.hours).toFixed(1)} ${overtimeBadge}
          </td>
          <td class="py-2 px-3 whitespace-nowrap text-center">${priorityBadge}</td>
          <td class="py-2 px-3 whitespace-nowrap text-gray-500 dark:text-gray-400 font-mono text-[11px]">${escapeHtml(log.effortEstimate || '-')}</td>
          <td class="py-2 px-3 whitespace-nowrap text-gray-500 dark:text-gray-400 font-mono text-[11px]">${escapeHtml(log.startDate || '-')}</td>
          <td class="py-2 px-3 whitespace-nowrap text-gray-500 dark:text-gray-400 font-mono text-[11px]">${escapeHtml(log.targetDate || '-')}</td>
          <td class="py-2 px-3 text-center whitespace-nowrap">
            <button onclick="openWorkLogModal('${log.id}')" class="p-1 text-gray-400 hover:text-jira-blue dark:hover:text-blue-400" title="Edit Log">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button onclick="deleteWorkLogEntry('${log.id}')" class="p-1 text-gray-400 hover:text-red-500" title="Delete">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    }

    /* --- VIEW 4: METRICS & BOTTLENECKS --- */
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
      document.getElementById('statAvgAgeing').innerHTML = `${avgAgeing} <span class="text-xs font-normal text-gray-500">days</span>`;
      document.getElementById('statClosed').innerText = closed;

      // Render High Ageing Table (> 7 days)
      const highAgeingTbody = document.getElementById('highAgeingTableBody');
      highAgeingTbody.innerHTML = '';
      const criticalAgeingTasks = activeTasks
        .map(t => ({ ...t, calculatedAge: calculateAgeing(t.startDate, t.status, t.closedDate) }))
        .filter(t => t.calculatedAge > 7)
        .sort((a, b) => b.calculatedAge - a.calculatedAge);

      if (criticalAgeingTasks.length === 0) {
        highAgeingTbody.innerHTML = `
          <tr>
            <td colspan="9" class="text-center py-4 text-emerald-600 dark:text-emerald-400 text-xs">
              <i class="fa-solid fa-circle-check mr-1"></i> Excellent SLA! No open task exceeding 7 days of ageing.
            </td>
          </tr>
        `;
      } else {
        criticalAgeingTasks.forEach(t => {
          const tr = document.createElement('tr');
          tr.className = 'hover:bg-red-50/50 dark:hover:bg-red-950/30 cursor-pointer text-xs';
          tr.onclick = () => openTaskModal(t.id);
          tr.innerHTML = `
            <td class="p-2 font-mono font-bold text-jira-blue dark:text-blue-400">${escapeHtml(t.id)}</td>
            <td class="p-2">${getModuleBadgeHtml(t.module)}</td>
            <td class="p-2">${getPendingWithBadgeHtml(t.pendingWith)}</td>
            <td class="p-2 text-gray-500 dark:text-gray-400">${escapeHtml(t.issueType)}</td>
            <td class="p-2 font-medium text-jira-text dark:text-[#DEE4EA] max-w-xs truncate">${escapeHtml(t.summary)}</td>
            <td class="p-2">${getStatusBadgeHtml(t.status)}</td>
            <td class="p-2">${getPriorityBadgeHtml(t.priority)}</td>
            <td class="p-2">${getAgeingBadgeHtml(t.calculatedAge, t.status)}</td>
            <td class="p-2 text-gray-600 dark:text-gray-400">${escapeHtml(t.assignedTo || 'Unassigned')}</td>
          `;
          highAgeingTbody.appendChild(tr);
        });
      }

      // Charts Rendering using Chart.js
      renderCharts();
    }

    function renderCharts() {
      const isDark = document.documentElement.classList.contains('dark');
      const textColor = isDark ? '#B6C2CF' : '#6B778C';
      const gridColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)';

      // 1. Pending With Bottlenecks Chart
      const pendingCategories = ['BSG', 'Testers / QA', 'DEV', 'DBA Team', 'Third-Party Vendor', 'Business Operations', 'None (Active)'];
      const pendingCounts = pendingCategories.map(cat => tasks.filter(t => t.pendingWith === cat && t.status !== 'Closed').length);

      const ctxPending = document.getElementById('pendingWithChart').getContext('2d');
      if (pendingChartInstance) pendingChartInstance.destroy();

      pendingChartInstance = new Chart(ctxPending, {
        type: 'bar',
        data: {
          labels: ['BSG', 'QA/Test', 'DEV', 'DBA', 'Vendor', 'Ops', 'Active'],
          datasets: [{
            label: 'Open Tasks Stuck',
            data: pendingCounts,
            backgroundColor: [
              '#f59e0b', // BSG amber
              '#a855f7', // QA purple
              '#3b82f6', // DEV blue
              '#ef4444', // DBA rose
              '#ea580c', // Vendor orange
              '#0d9488', // Ops teal
              isDark ? '#64748b' : '#94a3b8' // Active
            ],
            borderRadius: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          },
          scales: {
            x: {
              ticks: { color: textColor },
              grid: { color: gridColor }
            },
            y: {
              beginAtZero: true,
              ticks: { precision: 0, color: textColor },
              grid: { color: gridColor }
            }
          }
        }
      });

      // 2. Status Chart
      const statusLabels = ['Backlog', 'In Progress', 'UAT / Testing', 'Ready for Prod', 'Blocked', 'Closed'];
      const statusCounts = statusLabels.map(s => tasks.filter(t => t.status === s).length);

      const ctxStatus = document.getElementById('statusChart').getContext('2d');
      if (statusChartInstance) statusChartInstance.destroy();

      statusChartInstance = new Chart(ctxStatus, {
        type: 'bar',
        data: {
          labels: statusLabels,
          datasets: [{
            label: 'Task Count',
            data: statusCounts,
            backgroundColor: [
              isDark ? '#64748b' : '#94a3b8',
              '#3b82f6',
              '#f59e0b',
              '#a855f7',
              '#ef4444',
              '#10b981'
            ],
            borderRadius: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: {
              ticks: { color: textColor },
              grid: { color: gridColor }
            },
            y: {
              beginAtZero: true,
              ticks: { precision: 0, color: textColor },
              grid: { color: gridColor }
            }
          }
        }
      });

      // 3. Module Chart
      const modules = ['BCRED', 'COLLANDDISC', 'FBFP', 'BULK EXPORT', 'FIDB Imports', 'BULK FIDB REVAMP', 'ARIMP', 'TORM', 'TIRM'];
      const moduleCounts = modules.map(m => tasks.filter(t => t.module === m).length);

      const ctxModule = document.getElementById('moduleChart').getContext('2d');
      if (moduleChartInstance) moduleChartInstance.destroy();

      moduleChartInstance = new Chart(ctxModule, {
        type: 'doughnut',
        data: {
          labels: modules,
          datasets: [{
            data: moduleCounts,
            backgroundColor: [
              '#2563eb', '#059669', '#7c3aed', '#d97706', '#0891b2',
              '#4f46e5', '#e11d48', '#ea580c', '#0d9488'
            ],
            borderColor: isDark ? '#22272B' : '#ffffff',
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'right',
              labels: {
                boxWidth: 10,
                font: { size: 10 },
                color: textColor
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
            if (newStatus === 'Closed') {
              task.closedDate = new Date().toISOString().split('T')[0];
            }
            // Auto-align Pending With if moving to UAT
            if (newStatus === 'UAT / Testing' && task.pendingWith === 'None (Active)') {
              task.pendingWith = 'Testers / QA';
            }
            saveTasks();
            renderApp();
            showToast(`Moved ${taskId} to ${newStatus}`, 'success');
          }
        });
      });
    }

    /* -------------------------------------------------------------
       8. TASK CREATE & EDIT MODAL
    ------------------------------------------------------------- */
    function openTaskModal(taskIdToEdit = null) {
      const modal = document.getElementById('taskModal');
      const form = document.getElementById('taskForm');
      form.reset();

      syncAssigneeOptions();
      switchModalTab('tab-general');

      if (taskIdToEdit) {
        // Edit Mode
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
        // Create Mode
        document.getElementById('taskModalTitle').innerText = 'Create Banking Work Item';
        document.getElementById('editTaskIdHidden').value = '';
        document.getElementById('taskIdInput').readOnly = false;

        // Auto-generate next task ID
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
          btn.className = 'modal-tab-btn py-2.5 px-3 border-b-2 border-jira-blue text-jira-blue font-semibold';
        } else {
          btn.className = 'modal-tab-btn py-2.5 px-3 border-b-2 border-transparent text-gray-500 hover:text-gray-800';
        }
      });

      document.querySelectorAll('.modal-tab-pane').forEach(pane => {
        pane.classList.toggle('hidden', pane.id !== targetTabId);
      });
    }

    /* -------------------------------------------------------------
       9. WORK LOG MODAL LOGIC & PRESETS
    ------------------------------------------------------------- */
    function setLogHours(hours, defaultSlot) {
      document.getElementById('logHoursInput').value = hours;
      if (!document.getElementById('logTimeSlotInput').value) {
        document.getElementById('logTimeSlotInput').value = defaultSlot;
      }
    }

    function openWorkLogModal(logIdToEdit = null) {
      const modal = document.getElementById('workLogModal');
      const form = document.getElementById('workLogForm');
      form.reset();

      const defaultResource = document.getElementById('resourceNameSetting').value.trim() || 'Tanmay S / Lead-ICM';
      const defaultPod = document.getElementById('defaultPodSetting').value || 'IBG';

      if (logIdToEdit) {
        const item = workLogs.find(l => l.id === logIdToEdit);
        if (!item) return;

        document.getElementById('workLogModalTitle').innerText = 'Edit Past Work Activity';
        document.getElementById('editWorkLogIdHidden').value = item.id;
        document.getElementById('logResourceNameInput').value = item.resourceName || defaultResource;
        document.getElementById('logPodNameInput').value = item.podName || defaultPod;
        document.getElementById('logDateInput').value = item.date;
        document.getElementById('logTimeSlotInput').value = item.timeSlot || '';
        document.getElementById('logHoursInput').value = item.hours;
        document.getElementById('logCategoryInput').value = item.category;
        document.getElementById('logTitleInput').value = item.title;
        document.getElementById('logDescInput').value = item.description;
        document.getElementById('logPriorityInput').value = item.priority || 'Medium';
        document.getElementById('logEffortEstimateInput').value = item.effortEstimate || '';
        document.getElementById('logStartDateInput').value = item.startDate || item.date;
        document.getElementById('logTargetDateInput').value = item.targetDate || item.date;
        document.getElementById('logIsOvertimeInput').value = item.isOvertime || 'no';

        document.getElementById('deleteWorkLogBtn').classList.remove('hidden');
      } else {
        document.getElementById('workLogModalTitle').innerText = 'Log Past Work / Meeting Activity';
        document.getElementById('editWorkLogIdHidden').value = '';
        document.getElementById('logResourceNameInput').value = defaultResource;
        document.getElementById('logPodNameInput').value = defaultPod;
        document.getElementById('logDateInput').value = new Date().toISOString().split('T')[0];
        document.getElementById('logHoursInput').value = '1.0';
        document.getElementById('logTimeSlotInput').value = '09:00 - 10:00';
        document.getElementById('logPriorityInput').value = 'Medium';
        document.getElementById('logStartDateInput').value = new Date().toISOString().split('T')[0];
        document.getElementById('logTargetDateInput').value = new Date().toISOString().split('T')[0];
        document.getElementById('logIsOvertimeInput').value = 'no';

        document.getElementById('deleteWorkLogBtn').classList.add('hidden');
      }

      modal.classList.remove('hidden');
    }

    function closeWorkLogModal() {
      document.getElementById('workLogModal').classList.add('hidden');
    }

    function deleteWorkLogEntry(logId) {
      customConfirm("Delete Log Entry", "Are you sure you want to remove this logged activity from your timesheet?", () => {
        workLogs = workLogs.filter(l => l.id !== logId);
        saveWorkLogs();
        renderTimesheetView();
        showToast("Log entry deleted.", "info");
      });
    }

    /* -------------------------------------------------------------
       10. EXCEL EXPORT FOR MANAGER & TEAMS EOD FORMATTER
    ------------------------------------------------------------- */
    function exportWeeklyTimesheet() {
      const weekInfo = getWeekDateRange(activeWeekOffset);
      const weeklyLogs = workLogs.filter(log => log.date >= weekInfo.mondayStr && log.date <= weekInfo.sundayStr);

      if (weeklyLogs.length === 0) {
        showToast("No work logs found for the current week view!", "error");
        return;
      }

      // Exactly matches the columns from the user's uploaded spreadsheet image:
      // # | Resource Name | POD Name (IBG, ILC, ARIPM etc.) | Day | Date | Task Category | Task - Name / Title / Milestone | Task- Description | Time Spent (Hrs) | Priority ( High, Low , Medium) | Effort Estimate ( Month/ Days/ Hours) | Start Date | Target Completion Date
      const headers = [
        "#",
        "Resource Name",
        "POD Name (IBG, ILC, ARIPM etc.)",
        "Day",
        "Date",
        "Task Category",
        "Task - Name / Title / Milestone",
        "Task- Description",
        "Time Spent (Hrs)",
        "Priority ( High, Low , Medium)",
        "Effort Estimate ( Month/ Days/ Hours)",
        "Start Date",
        "Target Completion Date"
      ];

      weeklyLogs.sort((a, b) => a.date.localeCompare(b.date));

      const rows = [];
      rows.push(headers.map(h => `"${h}"`).join(','));

      let idx = 1;
      weeklyLogs.forEach(item => {
        const dObj = new Date(item.date);
        const dayName = dObj.toLocaleDateString('en-US', { weekday: 'long' });

        const row = [
          idx++,
          item.resourceName || '',
          item.podName || '',
          dayName,
          item.date,
          item.category || '',
          item.title || '',
          item.description || '',
          parseFloat(item.hours || 0).toFixed(1),
          item.priority || 'Medium',
          item.effortEstimate || '',
          item.startDate || '',
          item.targetDate || ''
        ];
        rows.push(row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(','));
      });

      const csvContent = "\uFEFF" + rows.join('\r\n'); // UTF-8 BOM so Excel opens with proper characters
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `Weekly_Timesheet_${weekInfo.mondayStr}_to_${weekInfo.sundayStr}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast("Weekly manager timesheet exported matching template format!", "success");
    }

    function copyDailyEodEmail() {
      const todayStr = new Date().toISOString().split('T')[0];
      const todayLogs = workLogs.filter(l => l.date === todayStr);

      const resourceName = document.getElementById('resourceNameSetting').value.trim() || 'Tanmay S / Lead-ICM';
      const defaultPod = document.getElementById('defaultPodSetting').value || 'IBG';

      if (todayLogs.length === 0) {
        showToast("No work activities logged for today to format!", "error");
        return;
      }

      let totalDayHours = 0;
      let bulletPoints = [];

      todayLogs.forEach((l, i) => {
        const hrs = parseFloat(l.hours) || 0;
        totalDayHours += hrs;
        const slotText = l.timeSlot ? `[${l.timeSlot}] ` : '';
        const otText = l.isOvertime === 'yes' ? ' *(Extra/OT Effort)*' : '';
        bulletPoints.push(`${i + 1}. **${l.title}** (${l.category} - ${l.podName}) - ${slotText}${hrs} hr(s)${otText}\n   - *Log:* ${l.description}`);
      });

      const emailText = `Dear Manager,\n\nPlease find my Daily Work & Meeting Status Update for ${todayStr}:\n\n` +
        `• Resource: ${resourceName}\n` +
        `• Primary POD: ${defaultPod}\n` +
        `• Total Effort Logged: ${totalDayHours.toFixed(1)} hrs\n\n` +
        `Summary of Completed Tasks & Discussions:\n` +
        bulletPoints.join('\n\n') +
        `\n\nRegards,\n${resourceName}`;

      // Clipboard copy using safe textarea method
      const tempArea = document.createElement('textarea');
      tempArea.value = emailText;
      tempArea.setAttribute('readonly', '');
      tempArea.style.position = 'absolute';
      tempArea.style.left = '-9999px';
      document.body.appendChild(tempArea);
      tempArea.select();
      document.execCommand('copy');
      document.body.removeChild(tempArea);

      showToast("Today's past-tense EOD update copied to clipboard!", "success");
    }

    /* -------------------------------------------------------------
       11. EXCEL CSV & BACKUP IMPORT/EXPORT
    ------------------------------------------------------------- */
    function exportToCsv() {
      if (tasks.length === 0) {
        showToast("No task records to export!", "error");
        return;
      }

      // Headers with Pending With column
      const headers = [
        "Task ID", "Module", "Issue Type", "Priority", "Status", "Pending With",
        "Environment", "Summary", "Task Details", "RCA", "Solution Fix",
        "Assigned To", "Assigned By", "Start Date", "Target End Date",
        "Production Date", "Ageing Days", "Meeting Time", "Meeting Notes"
      ];

      const csvRows = [];
      csvRows.push(headers.map(h => `"${h}"`).join(','));

      tasks.forEach(t => {
        const ageing = calculateAgeing(t.startDate, t.status, t.closedDate);
        const row = [
          t.id || '',
          t.module || '',
          t.issueType || '',
          t.priority || '',
          t.status || '',
          t.pendingWith || 'None (Active)',
          t.env || '',
          t.summary || '',
          t.details || '',
          t.rca || '',
          t.solution || '',
          t.assignedTo || '',
          t.assignedBy || '',
          t.startDate || '',
          t.endDate || '',
          t.prodDate || '',
          ageing,
          t.meetingTime || '',
          t.meetingNotes || ''
        ];
        csvRows.push(row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(','));
      });

      const csvContent = "\uFEFF" + csvRows.join('\r\n'); // UTF-8 BOM for Microsoft Excel
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `PWMS_Banking_Tasks_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast("Excel CSV exported with Pending With & Fix details!", "success");
    }

    function exportToJson() {
      const backupData = {
        app: "PWMS_Banking_Core",
        version: "2.0",
        exportDate: new Date().toISOString(),
        tasksCount: tasks.length,
        tasks: tasks
      };
      const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `PWMS_Backup_${new Date().toISOString().split('T')[0]}.json`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast("Full JSON Backup downloaded!", "success");
    }

    function importFromJson(file) {
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function (e) {
        try {
          const parsed = JSON.parse(e.target.result);
          const importedTasks = Array.isArray(parsed) ? parsed : (parsed.tasks || []);

          if (!Array.isArray(importedTasks) || importedTasks.length === 0) {
            showToast("Invalid JSON: No task records found.", "error");
            return;
          }

          importedTasks.forEach(t => {
            if (!t.pendingWith) t.pendingWith = 'None (Active)';
          });

          customConfirm(
            "Restore Workspace",
            `Importing ${importedTasks.length} tasks. Do you want to replace your workspace with this data?`,
            () => {
              tasks = importedTasks;
              saveTasks();
              renderApp();
              showToast(`Workspace restored with ${tasks.length} tasks!`, "success");
            }
          );
        } catch (err) {
          showToast("Failed to parse JSON backup file.", "error");
        }
      };
      reader.readAsText(file);
    }

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
          sidebar.classList.toggle('-ml-60', !forceState);
        } else {
          sidebar.classList.toggle('-ml-60');
        }
      }
    }

    function applyQuickModuleFilter(moduleName) {
      document.getElementById('filterModule').value = moduleName;
      if (window.innerWidth < 1024) toggleSidebar(false);
      if (currentView === 'metrics' || currentView === 'meetings') {
        switchView('kanban');
      } else {
        renderApp();
      }
    }

    function applyQuickPendingFilter(pendingName) {
      document.getElementById('filterPendingWith').value = pendingName;
      if (window.innerWidth < 1024) toggleSidebar(false);
      if (currentView === 'metrics' || currentView === 'meetings') {
        switchView('kanban');
      } else {
        renderApp();
      }
    }

    function switchView(viewName) {
      currentView = viewName;
      if (window.innerWidth < 1024) toggleSidebar(false);
      document.querySelectorAll('.nav-view-btn').forEach(btn => {
        if (btn.getAttribute('data-view') === viewName) {
          btn.className = 'nav-view-btn w-full flex items-center space-x-2.5 px-3 py-2 rounded-md text-xs font-medium bg-blue-600 text-white transition';
        } else {
          btn.className = 'nav-view-btn w-full flex items-center space-x-2.5 px-3 py-2 rounded-md text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition';
        }
      });

      document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
        const isCurrent = btn.getAttribute('data-view') === viewName;
        btn.classList.toggle('is-active', isCurrent);
        if (isCurrent) {
          btn.setAttribute('aria-current', 'page');
        } else {
          btn.removeAttribute('aria-current');
        }
      });

      document.getElementById('view-kanban').classList.toggle('hidden', viewName !== 'kanban');
      document.getElementById('view-list').classList.toggle('hidden', viewName !== 'list');
      document.getElementById('view-meetings').classList.toggle('hidden', viewName !== 'meetings');
      document.getElementById('view-metrics').classList.toggle('hidden', viewName !== 'metrics');

      document.getElementById('filterToolbar').classList.toggle('hidden', viewName === 'metrics');

      renderApp();
    }

    /* -------------------------------------------------------------
       12. INITIALIZATION & EVENT LISTENERS
    ------------------------------------------------------------- */
    window.onload = function () {
      loadTasks();
      setupDragAndDrop();
      updateThemeControls(document.documentElement.classList.contains('dark'));
      renderApp();

      // Theme toggle button
      document.getElementById('themeToggleBtn').addEventListener('click', toggleTheme);

      // Navigation View Buttons
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
      });

      // Mobile Search
      const mobileSearchToggleBtn = document.getElementById('mobileSearchToggleBtn');
      const mobileSearchBar = document.getElementById('mobileSearchBar');
      const mobileSearchInput = document.getElementById('mobileSearchInput');
      const globalSearchInput = document.getElementById('globalSearchInput');

      if (mobileSearchToggleBtn && mobileSearchBar) {
        mobileSearchToggleBtn.addEventListener('click', () => {
          mobileSearchBar.classList.toggle('hidden');
          if (!mobileSearchBar.classList.contains('hidden')) {
            if (mobileSearchInput) {
              mobileSearchInput.value = globalSearchInput ? globalSearchInput.value : '';
              mobileSearchInput.focus();
            }
          }
        });
      }

      if (mobileSearchInput && globalSearchInput) {
        mobileSearchInput.addEventListener('input', (e) => {
          globalSearchInput.value = e.target.value;
          renderApp();
        });
        globalSearchInput.addEventListener('input', (e) => {
          mobileSearchInput.value = e.target.value;
        });
      }

      // Search and Filter Listeners
      document.getElementById('globalSearchInput').addEventListener('input', renderApp);
      document.getElementById('filterModule').addEventListener('change', renderApp);
      document.getElementById('filterPendingWith').addEventListener('change', renderApp);
      document.getElementById('filterAssignee').addEventListener('change', renderApp);
      document.getElementById('filterIssueType').addEventListener('change', renderApp);
      document.getElementById('filterPriority').addEventListener('change', renderApp);

      document.getElementById('toggleP1OnlyBtn').addEventListener('click', function () {
        this.classList.toggle('bg-red-500');
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
        document.getElementById('toggleP1OnlyBtn').classList.remove('bg-red-500', 'text-white');
        document.getElementById('toggleHighAgeingBtn').classList.remove('bg-amber-500', 'text-white');
        renderApp();
        showToast("Filters reset to default.");
      });

      // Task Modal Open / Close
      document.getElementById('openCreateModalBtn').addEventListener('click', () => openTaskModal());
      document.getElementById('closeTaskModalBtn').addEventListener('click', closeTaskModal);
      document.getElementById('cancelTaskModalBtn').addEventListener('click', closeTaskModal);

      // Modal Tabs Switching
      document.querySelectorAll('.modal-tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          switchModalTab(btn.getAttribute('data-tab'));
        });
      });

      // Task Form Save
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
          if (idx !== -1) {
            tasks[idx] = { ...tasks[idx], ...taskData };
            showToast(`Task ${taskId} updated successfully!`, 'success');
          }
        } else {
          if (tasks.some(t => t.id === taskId)) {
            showToast(`Task ID ${taskId} already exists! Use a unique ID.`, 'error');
            return;
          }
          tasks.unshift(taskData);
          showToast(`Created task ${taskId}!`, 'success');
        }

        saveTasks();
        closeTaskModal();
        renderApp();
      });

      // Delete Task Button
      document.getElementById('deleteTaskBtn').addEventListener('click', () => {
        const idToDelete = document.getElementById('editTaskIdHidden').value;
        if (!idToDelete) return;

        customConfirm("Delete Task", `Are you sure you want to permanently delete task ${idToDelete}?`, () => {
          tasks = tasks.filter(t => t.id !== idToDelete);
          saveTasks();
          closeTaskModal();
          renderApp();
          showToast(`Task ${idToDelete} removed.`, 'info');
        });
      });

      // Backup Dropdown Menu Toggle
      const backupMenuBtn = document.getElementById('backupMenuBtn');
      const backupMenuDropdown = document.getElementById('backupMenuDropdown');
      backupMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        backupMenuDropdown.classList.toggle('hidden');
      });
      document.addEventListener('click', () => backupMenuDropdown.classList.add('hidden'));

      // CSV & Backup Actions
      document.getElementById('exportCsvBtn').addEventListener('click', exportToCsv);
      document.getElementById('exportJsonBtn').addEventListener('click', exportToJson);
      document.getElementById('importJsonInput').addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
          importFromJson(e.target.files[0]);
        }
      });
      document.getElementById('resetSampleDataBtn').addEventListener('click', () => {
        customConfirm("Reload Sample Data", "This will replace current workspace with fresh sample banking tasks. Proceed?", () => {
          tasks = [...SAMPLE_TASKS];
          saveTasks();
          renderApp();
          showToast("Sample banking dataset reloaded!", "success");
        });
      });

      // Work Log Form Submit
      document.getElementById('workLogForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const editId = document.getElementById('editWorkLogIdHidden').value;

        const logEntry = {
          id: editId || `LOG-${Date.now().toString().slice(-6)}`,
          resourceName: document.getElementById('logResourceNameInput').value.trim(),
          podName: document.getElementById('logPodNameInput').value.trim().toUpperCase(),
          date: document.getElementById('logDateInput').value,
          timeSlot: document.getElementById('logTimeSlotInput').value.trim(),
          hours: parseFloat(document.getElementById('logHoursInput').value) || 1.0,
          category: document.getElementById('logCategoryInput').value,
          title: document.getElementById('logTitleInput').value.trim(),
          description: document.getElementById('logDescInput').value.trim(),
          priority: document.getElementById('logPriorityInput').value,
          effortEstimate: document.getElementById('logEffortEstimateInput').value.trim(),
          startDate: document.getElementById('logStartDateInput').value,
          targetDate: document.getElementById('logTargetDateInput').value,
          isOvertime: document.getElementById('logIsOvertimeInput').value
        };

        if (editId) {
          const idx = workLogs.findIndex(l => l.id === editId);
          if (idx !== -1) workLogs[idx] = logEntry;
          showToast("Work log entry updated!", "success");
        } else {
          workLogs.unshift(logEntry);
          showToast("Activity logged in past tense!", "success");
        }

        saveWorkLogs();
        closeWorkLogModal();
        renderTimesheetView();
      });

      // Work Log Delete Modal Button
      document.getElementById('deleteWorkLogBtn').addEventListener('click', () => {
        const editId = document.getElementById('editWorkLogIdHidden').value;
        if (editId) {
          deleteWorkLogEntry(editId);
          closeWorkLogModal();
        }
      });

      // Work Log Modal Controls
      document.getElementById('openWorkLogModalBtn').addEventListener('click', () => openWorkLogModal());
      document.getElementById('closeWorkLogModalBtn').addEventListener('click', closeWorkLogModal);
      document.getElementById('cancelWorkLogModalBtn').addEventListener('click', closeWorkLogModal);

      // Week Navigator Buttons
      document.getElementById('prevWeekBtn').addEventListener('click', () => {
        activeWeekOffset--;
        renderTimesheetView();
      });
      document.getElementById('nextWeekBtn').addEventListener('click', () => {
        activeWeekOffset++;
        renderTimesheetView();
      });
      document.getElementById('currentWeekBtn').addEventListener('click', () => {
        activeWeekOffset = 0;
        renderTimesheetView();
      });

      // Settings Change Listeners
      document.getElementById('resourceNameSetting').addEventListener('change', saveUserConfig);
      document.getElementById('defaultPodSetting').addEventListener('change', saveUserConfig);

      // Export Timesheet Menu Action
      document.getElementById('exportTimesheetCsvBtn').addEventListener('click', exportWeeklyTimesheet);

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
          closeWorkLogModal();
          document.getElementById('confirmDialog').classList.add('hidden');
          if (mobileSearchBar && !mobileSearchBar.classList.contains('hidden')) {
            mobileSearchBar.classList.add('hidden');
          }
          toggleSidebar(false);
        }
      });
    };