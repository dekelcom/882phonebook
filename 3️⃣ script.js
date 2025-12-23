async function main() {
  const res = await fetch("./data.json");
  const data = await res.json();

  const tbody = document.querySelector("#phonebook tbody");

  data.forEach(rec => {
    const tr = document.createElement("tr");

    ["firstName","lastName","pluga","framework","role","mobile"].forEach(k => {
      const td = document.createElement("td");
      td.textContent = rec[k] || "";
      tr.appendChild(td);
    });

    const td = document.createElement("td");
    td.innerHTML = `
      <a href="tel:${rec.mobileE164}">📞</a>
      <a href="https://wa.me/${rec.mobileWA}" target="_blank">💬</a>
      <a href="#" onclick='saveVCard(${JSON.stringify(rec)})'>👤</a>
    `;
    tr.appendChild(td);

    tbody.appendChild(tr);
  });

  const table = new DataTable("#phonebook");

  document.getElementById("searchBox").addEventListener("input", e => {
    table.search(e.target.value).draw();
  });

  document.getElementById("clearSearch").onclick = () => {
    table.search("").draw();
  };
}

function saveVCard(r) {
  const v = `BEGIN:VCARD
VERSION:4.0
N:${r.lastName};${r.firstName};;;
FN:${r.firstName} ${r.lastName}
TEL;TYPE=cell:${r.mobileE164}
END:VCARD`;

  const blob = new Blob([v], { type: "text/vcard" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `${r.firstName}_${r.lastName}.vcf`;
  a.click();
}

main();
