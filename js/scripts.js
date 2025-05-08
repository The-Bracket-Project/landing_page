document.addEventListener("DOMContentLoaded", function () {
    const clientPortalLink = document.getElementById("client-portal-link");
    if (clientPortalLink) {
      clientPortalLink.addEventListener("click", function (event) {
        event.preventDefault();
        const password = prompt("Enter client password:");
        if (password === "podifi_") {
          window.location.href = "https://agent-frontend-five.vercel.app/onboarding";
        } else if (password !== null) {
          alert("Incorrect password. Please try again.");
        }
      });
    }
  });

  
  function showPasswordModal() {
    const modal = document.getElementById("passwordModal");
    modal.classList.remove("d-none");
    void modal.offsetWidth;
    modal.classList.add("active");
    document.getElementById("modalPasswordInput").focus();
  }
  
  function hidePasswordModal() {
    const modal = document.getElementById("passwordModal");
    modal.classList.remove("active");
    setTimeout(() => {
      modal.classList.add("d-none");
      document.getElementById("modalPasswordInput").value = "";
      document.getElementById("modalError").style.display = "none";
    }, 300);
  }
  
  
  function validateModalPassword() {
    const input = document.getElementById("modalPasswordInput").value;
    const error = document.getElementById("modalError");
  
    if (input === "podifi_") {
      window.location.href = "https://agent-frontend-five.vercel.app/onboarding";
    } else {
      error.style.display = "block";
    }
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("modalPasswordInput");
    if (input) {
      input.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
          validateModalPassword();
        }
      });
    }
  });
  
  