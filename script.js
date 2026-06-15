document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-alert]").forEach(el => {
    el.addEventListener("click", e => {
      if (el.tagName !== "A" || el.getAttribute("href") === "#") e.preventDefault();
      alert(el.dataset.alert);
    });
  });

  const searchForm = document.querySelector("#searchForm");
  const searchInput = document.querySelector("#searchInput");
  if (searchForm && searchInput) {
    searchForm.addEventListener("submit", e => {
      e.preventDefault();
      const q = searchInput.value.trim().toLowerCase();
      const cards = document.querySelectorAll("#productList [data-name]");
      if (!cards.length) return alert("Pencarian berjalan.");
      let found = 0;
      cards.forEach(card => {
        const show = !q || card.dataset.name.includes(q);
        card.classList.toggle("hidden", !show);
        if (show) found++;
      });
      if (q && found === 0) alert("Produk tidak ditemukan.");
    });
  }

  const qtyInput = document.querySelector("#qtyInput");
  const minus = document.querySelector("#minusQty");
  const plus = document.querySelector("#plusQty");
  const subtotal = document.querySelector("#subtotal");
  const total = document.querySelector("#total");
  const price = 120000;
  const ongkir = 18000;
  const rupiah = n => "Rp " + n.toLocaleString("id-ID");

  function updateTotal() {
    if (!qtyInput || !subtotal || !total) return;
    const qty = Number(qtyInput.value) || 1;
    subtotal.textContent = rupiah(qty * price);
    total.textContent = rupiah(qty * price + ongkir);
  }

  if (minus && plus && qtyInput) {
    minus.addEventListener("click", () => {
      qtyInput.value = Math.max(1, Number(qtyInput.value) - 1);
      updateTotal();
    });
    plus.addEventListener("click", () => {
      qtyInput.value = Number(qtyInput.value) + 1;
      updateTotal();
    });
    updateTotal();
  }

  document.querySelectorAll(".variant").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".variant").forEach(v => v.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  document.querySelectorAll(".thumb").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".thumb").forEach(t => t.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  const addCart = document.querySelector("#addCart");
  if (addCart) addCart.addEventListener("click", () => alert("Produk berhasil ditambahkan ke keranjang."));

  document.querySelectorAll(".pay-card").forEach(card => {
    card.addEventListener("click", () => {
      document.querySelectorAll(".pay-card").forEach(c => c.classList.remove("active"));
      card.classList.add("active");
    });
  });

  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.tab;
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
      btn.classList.add("active");
      const target = document.querySelector("#" + id);
      if (target) target.classList.add("active");
    });
  });

  document.querySelectorAll(".filter").forEach(btn => {
    btn.addEventListener("click", () => {
      const status = btn.dataset.status;
      document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      document.querySelectorAll(".order-card").forEach(card => {
        card.classList.toggle("hidden", status !== "all" && card.dataset.status !== status);
      });
    });
  });
});