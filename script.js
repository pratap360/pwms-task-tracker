// Theme toggle button (config & initial dark mode are in <head> of index.html)
const themeBtn = document.getElementById("themeToggleBtn");
const themeIcon = document.getElementById("themeToggleIcon");

function updateIcon(isDark) {
  if (themeIcon) {
    themeIcon.className = isDark
      ? "fa-solid fa-sun text-sm text-amber-400"
      : "fa-solid fa-moon text-sm";
  }
}

// Init icon to match current state
updateIcon(document.documentElement.classList.contains("dark"));

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("pwms_hub_theme", isDark ? "dark" : "light");
    updateIcon(isDark);
  });
}
