// Theme initialization
(function () {
  const savedTheme = localStorage.getItem("pwms_hub_theme");
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;
  if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
})();

tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f7ff",
          500: "#0052cc",
          600: "#0747a6",
          900: "#0c2340",
        },
      },
    },
  },
};

const themeBtn = document.getElementById("themeToggleBtn");
const themeIcon = document.getElementById("themeToggleIcon");

function updateIcon(isDark) {
  if (themeIcon) {
    themeIcon.className = isDark
      ? "fa-solid fa-sun text-sm text-amber-400"
      : "fa-solid fa-moon text-sm";
  }
}

// Init icon
updateIcon(document.documentElement.classList.contains("dark"));

themeBtn.addEventListener("click", () => {
  const isDark = document.documentElement.classList.toggle("dark");
  localStorage.setItem("pwms_hub_theme", isDark ? "dark" : "light");
  updateIcon(isDark);
});
