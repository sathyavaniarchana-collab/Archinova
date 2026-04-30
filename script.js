
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  const closeBtn = document.getElementById("close-btn");

  menuToggle.addEventListener("click", () => {
    navMenu.classList.add("active");
  });

  closeBtn.addEventListener("click", () => {
    navMenu.classList.remove("active");
  });
