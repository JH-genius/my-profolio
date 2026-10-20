"use strict";

// ===== 1. Mobile navigation menu =====

const menuButton = document.getElementById("menuButton");
const navigation = document.getElementById("navigation");

if (menuButton && navigation) {
  function closeMenu() {
    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  }

  // Open or close the menu.
  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");

    menuButton.setAttribute(
      "aria-expanded",
      String(isOpen)
    );
  });

  // Close the menu after selecting a link.
  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Close the menu using the Escape key.
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      navigation.classList.contains("open")
    ) {
      closeMenu();
      menuButton.focus();
    }
  });
}

// ===== 2. Theme switching =====

const themeButton = document.getElementById("themeButton");

if (themeButton) {
  function applyTheme(isDark) {
    document.body.classList.toggle("dark", isDark);

    themeButton.setAttribute(
      "aria-pressed",
      String(isDark)
    );

    themeButton.textContent = isDark
      ? "Light mode"
      : "Dark mode";
  }

  // Load the saved theme.
  try {
    const savedTheme = localStorage.getItem("portfolio-theme");

    applyTheme(savedTheme === "dark");
  } catch {
    // Use the default theme if storage is unavailable.
    applyTheme(false);
  }

  // Change the theme when the button is clicked.
  themeButton.addEventListener("click", () => {
    const isDark = !document.body.classList.contains("dark");

    applyTheme(isDark);

    // Save the user's choice.
    try {
      localStorage.setItem(
        "portfolio-theme",
        isDark ? "dark" : "light"
      );
    } catch {
      // Theme switching still works without storage.
    }
  });
}

