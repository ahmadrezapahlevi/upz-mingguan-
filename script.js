const wilayahInput = document.getElementById("wilayah");
const jumlahInput = document.getElementById("jumlah");
const tambahBtn = document.getElementById("tambah");
const listData = document.getElementById("listData");
const totalZakatEl = document.getElementById("totalZakat");
const operasional = document.getElementById("operasional");
const sisaDanaEl = document.getElementById("sisaDana");
const exportBtn = document.getElementById("exportBtn");
const resetBtn = document.getElementById("resetBtn");

let data = JSON.parse(localStorage.getItem("zakatData")) || [];
let biayaOperasional = parseInt(localStorage.getItem("biayaOperasional")) || 0;

// Set nilai awal input operasional jika ada data tersimpan
operasional.value = biayaOperasional;

function simpanKeLocal() {
  localStorage.setItem("zakatData", JSON.stringify(data));
  localStorage.setItem("biayaOperasional", operasional.value);
}

function updateList() {
  listData.innerHTML = "";
  let total = 0;

  data.forEach((item, index) => {
    const li = document.createElement("li");
    li.classList.add("list-item");

    li.innerHTML = `
      <span>${item.wilayah} : Rp ${item.jumlah.toLocaleString()}</span>
      <button class="hapus-btn" onclick="hapusData(${index})">Hapus</button>
    `;
    listData.appendChild(li);
    total += item.jumlah;
  });

  totalZakatEl.textContent = `Rp ${total.toLocaleString()}`;

  let biaya = parseInt(operasional.value) || 0;
  if (biaya > total) {
    alert("Biaya operasional tidak boleh melebihi total zakat. Diset ulang ke 0.");
    biaya = 0;
    operasional.value = 0;
  }

  const sisa = total - biaya;
  sisaDanaEl.textContent = `Rp ${sisa.toLocaleString()}`;

  simpanKeLocal();
}

function hapusData(index) {
  data.splice(index, 1);
  updateList();
}

tambahBtn.addEventListener("click", () => {
  const wilayah = wilayahInput.value.trim();
  const jumlah = parseInt(jumlahInput.value);

  if (!wilayah) {
    alert("Wilayah harus diisi!");
    return;
  }

  if (isNaN(jumlah) || jumlah <= 0) {
    alert("Jumlah zakat harus angka dan lebih dari 0.");
    return;
  }

  data.push({ wilayah, jumlah });
  wilayahInput.value = "";
  jumlahInput.value = "";
  updateList();
});

operasional.addEventListener("input", () => {
  localStorage.setItem("biayaOperasional", operasional.value);
  updateList();
});

resetBtn.addEventListener("click", () => {
  if (confirm("Yakin ingin mereset semua data?")) {
    data = [];
    wilayahInput.value = "";
    jumlahInput.value = "";
    operasional.value = 0;
    localStorage.removeItem("zakatData");
    localStorage.removeItem("biayaOperasional");
    updateList();
  }
});

exportBtn.addEventListener("click", () => {
  const tableBody = document.getElementById("exportTableBody");
  const tanggal = new Date().toLocaleDateString('id-ID');
  const total = data.reduce((sum, item) => sum + item.jumlah, 0);
  const operasionalVal = parseInt(operasional.value) || 0;
  const sisa = total - operasionalVal;

  document.getElementById("tanggalExport").textContent = tanggal;
  document.getElementById("exportTotal").textContent = `Rp ${total.toLocaleString()}`;
  document.getElementById("exportOperasional").textContent = `Rp ${operasionalVal.toLocaleString()}`;
  document.getElementById("exportSisa").textContent = `Rp ${sisa.toLocaleString()}`;

  tableBody.innerHTML = "";
  data.forEach(item => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td style="padding: 6px;">${item.wilayah}</td>
      <td style="padding: 6px;">Rp ${item.jumlah.toLocaleString()}</td>
    `;
    tableBody.appendChild(row);
  });

  const exportArea = document.getElementById("laporanArea");
  exportArea.style.display = "block";

  html2pdf().set({
    margin: 0.5,
    filename: `Laporan-UPZ-${tanggal.replace(/\//g, '-')}.pdf`,
    html2canvas: { scale: 2 },
    jsPDF: { orientation: 'portrait' }
  }).from(exportArea).save().then(() => {
    exportArea.style.display = "none";
  });
});

// Load data saat halaman dibuka
updateList();

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js')
    .then(() => console.log('✅ Service Worker registered'))
    .catch(error => console.log('❌ Service Worker failed', error));
}