document.addEventListener("DOMContentLoaded", () => {
  const year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();

  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.textContent = open ? "✕ Close" : "☰ Menu";
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "☰ Menu";
    }));
  }

  const search = document.getElementById("game-search");
  const genre = document.getElementById("genre-filter");
  const cards = Array.from(document.querySelectorAll(".searchable"));
  const empty = document.getElementById("empty-state");
  const count = document.getElementById("result-count");
  function filterGames() {
    if (!cards.length) return;
    const term = (search?.value || "").trim().toLowerCase();
    const selectedGenre = (genre?.value || "").toLowerCase();
    let visible = 0;
    cards.forEach(card => {
      const matchesTerm = (card.dataset.search || "").includes(term);
      const matchesGenre = !selectedGenre || (card.dataset.search || "").includes(selectedGenre);
      const show = matchesTerm && matchesGenre;
      card.hidden = !show;
      if (show) visible++;
    });
    if (empty) empty.style.display = visible ? "none" : "block";
    if (count) count.textContent = `Showing ${visible} of ${cards.length} games`;
  }
  search?.addEventListener("input", filterGames);
  genre?.addEventListener("change", filterGames);

  const form = document.getElementById("contact-form");
  form?.addEventListener("submit", event => {
    event.preventDefault();
    const data = new FormData(form);
    const subject = encodeURIComponent(`[Ebubehub] ${data.get("topic")}`);
    const body = encodeURIComponent(
      `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nTopic: ${data.get("topic")}\n\n${data.get("message")}`
    );
    const emailAddress = "YOUR_EMAIL@example.com"; // Replace before launch.
    const notice = document.getElementById("form-notice");
    if (emailAddress === "YOUR_EMAIL@example.com") {
      notice.style.display = "block";
      notice.textContent = "Setup needed: replace YOUR_EMAIL@example.com in script.js with your real contact email, then submit again.";
      return;
    }
    notice.style.display = "block";
    notice.textContent = "Opening your email application. If it does not open, check your email app settings.";
    window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
  });
});
