// Ambil elemen input
const wilayahInput = document.getElementById("wilayah");
const jumlahInput = document.getElementById("jumlah");
const tambahBtn = document.getElementById("tambah");
const listData = document.getElementById("listData");
const totalZakatEl = document.getElementById("totalZakat");
const operasional = document.getElementById("operasional");
const pembebasan = document.getElementById("pembebasanTanah");
const sisaDanaEl = document.getElementById("sisaDana");
const exportBtn = document.getElementById("exportBtn");
const resetBtn = document.getElementById("resetBtn");

let data = JSON.parse(localStorage.getItem("zakatData")) || [];
let biayaOperasional = parseInt(localStorage.getItem("biayaOperasional")) || 0;
let biayaPembebasan = parseInt(localStorage.getItem("biayaPembebasan")) || 0;

operasional.value = biayaOperasional;
pembebasan.value = biayaPembebasan;

function simpanKeLocal() {
  localStorage.setItem("zakatData", JSON.stringify(data));
  localStorage.setItem("biayaOperasional", operasional.value);
  localStorage.setItem("biayaPembebasan", pembebasan.value);
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

  let biayaOpr = parseInt(operasional.value) || 0;
  let biayaBebas = parseInt(pembebasan.value) || 0;

  // Cek jika operasional + pembebasan melebihi total
  if (biayaOpr + biayaBebas > total) {
    if (biayaOpr > total && biayaBebas <= total) {
      alert("Biaya operasional melebihi total zakat. Diubah jadi 0.");
      biayaOpr = 0;
      operasional.value = 0;
    } else if (biayaBebas > total && biayaOpr <= total) {
      alert("Biaya pembebasan melebihi total zakat. Diubah jadi 0.");
      biayaBebas = 0;
      pembebasan.value = 0;
    } else {
      alert("Total biaya melebihi zakat. Disesuaikan otomatis.");
      const selisih = (biayaOpr + biayaBebas) - total;
      if (biayaOpr >= biayaBebas) {
        biayaOpr -= selisih;
        operasional.value = Math.max(biayaOpr, 0);
      } else {
        biayaBebas -= selisih;
        pembebasan.value = Math.max(biayaBebas, 0);
      }
    }
  }

  const sisa = total - biayaOpr - biayaBebas;
  sisaDanaEl.textContent = `Rp ${sisa.toLocaleString()}`;

  simpanKeLocal();
}

function hapusData(index) {
  data.splice(index, 1);
  updateList();
}

// Tambah data zakat
tambahBtn.addEventListener("click", () => {
  const wilayah = wilayahInput.value.trim();
  const jumlahStr = jumlahInput.value.trim();

  if (!wilayah) {
    alert("Wilayah harus diisi!");
    return;
  }

  if (!jumlahStr || isNaN(jumlahStr)) {
// Ambil elemen input
const wilayahInput = document.getElementById("wilayah");
const jumlahInput = document.getElementById("jumlah");
const tambahBtn = document.getElementById("tambah");
const listData = document.getElementById("listData");
const totalZakatEl = document.getElementById("totalZakat");
const operasional = document.getElementById("operasional");
const pembebasan = document.getElementById("pembebasanTanah");
const sisaDanaEl = document.getElementById("sisaDana");
const exportBtn = document.getElementById("exportBtn");
const resetBtn = document.getElementById("resetBtn");

let data = JSON.parse(localStorage.getItem("zakatData")) || [];
let biayaOperasional = parseInt(localStorage.getItem("biayaOperasional")) || 0;
let biayaPembebasan = parseInt(localStorage.getItem("biayaPembebasan")) || 0;

operasional.value = biayaOperasional;
pembebasan.value = biayaPembebasan;

function simpanKeLocal() {
  localStorage.setItem("zakatData", JSON.stringify(data));
  localStorage.setItem("biayaOperasional", operasional.value);
  localStorage.setItem("biayaPembebasan", pembebasan.value);
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

  let biayaOpr = parseInt(operasional.value) || 0;
  let biayaBebas = parseInt(pembebasan.value) || 0;

  // Cek jika operasional + pembebasan melebihi total
  if (biayaOpr + biayaBebas > total) {
    if (biayaOpr > total && biayaBebas <= total) {
      alert("Biaya operasional melebihi total zakat. Diubah jadi 0.");
      biayaOpr = 0;
      operasional.value = 0;
    } else if (biayaBebas > total && biayaOpr <= total) {
      alert("Biaya pembebasan melebihi total zakat. Diubah jadi 0.");
      biayaBebas = 0;
      pembebasan.value = 0;
    } else {
      alert("Total biaya melebihi zakat. Disesuaikan otomatis.");
      const selisih = (biayaOpr + biayaBebas) - total;
      if (biayaOpr >= biayaBebas) {
        biayaOpr -= selisih;
        operasional.value = Math.max(biayaOpr, 0);
      } else {
        biayaBebas -= selisih;
        pembebasan.value = Math.max(biayaBebas, 0);
      }
    }
  }

  const sisa = total - biayaOpr - biayaBebas;
  sisaDanaEl.textContent = `Rp ${sisa.toLocaleString()}`;

  simpanKeLocal();
}

function hapusData(index) {
  data.splice(index, 1);
  updateList();
}

// Tambah data zakat
tambahBtn.addEventListener("click", () => {
  const wilayah = wilayahInput.value.trim();
  const jumlahStr = jumlahInput.value.trim();

  if (!wilayah) {
    alert("Wilayah harus diisi!");
    return;
  }

  if (!jumlahStr || isNaN(jumlahStr)) {
    alert("Jumlah zakat harus angka!");
    return;
  }

  const jumlah = parseInt(jumlahStr);
  if (jumlah <= 0) {
    alert("Jumlah zakat harus lebih dari 0.");
    return;
  }

  data.push({ wilayah, jumlah });
  wilayahInput.value = "";
  jumlahInput.value = "";
  updateList();
});

operasional.addEventListener("input", updateList);
pembebasan.addEventListener("input", updateList);

// Reset semua data
resetBtn.addEventListener("click", () => {
  if (confirm("Yakin ingin mereset semua data?")) {
    data = [];
    wilayahInput.value = "";
    jumlahInput.value = "";
    operasional.value = 0;
    pembebasan.value = 0;
    localStorage.clear();
    updateList();
  }
});

// Export PDF
exportBtn.addEventListener("click", () => {
  const tableBody = document.getElementById("exportTableBody");
  const tanggal = new Date().toLocaleDateString('id-ID');
  const total = data.reduce((sum, item) => sum + item.jumlah, 0);
  const operasionalVal = parseInt(operasional.value) || 0;
  const pembebasanVal = parseInt(pembebasan.value) || 0;
  const sisa = total - operasionalVal - pembebasanVal;

  document.getElementById("tanggalExport").textContent = tanggal;
  document.getElementById("exportTotal").textContent = `Rp ${total.toLocaleString()}`;
  document.getElementById("exportOperasional").textContent = `Rp ${operasionalVal.toLocaleString()}`;
  document.getElementById("exportPembebasan").textContent = `Rp ${pembebasanVal.toLocaleString()}`;
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

// Inisialisasi saat pertama kali
updateList();

// PWA Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js')
    .then(() => console.log('Service Worker registered'))
    .catch(error => console.log('Service Worker failed', error));
}￼Enter    alert("Jumlah zakat harus angka!");
    return;
  }

  const jumlah = parseInt(jumlahStr);
  if (jumlah <= 0) {
    alert("Jumlah zakat harus lebih dari 0.");
    return;
  }

  data.push({ wilayah, jumlah });
  wilayahInput.value = "";
  jumlahInput.value = "";
  updateList();
});

operasional.addEventListener("input", updateList);
pembebasan.addEventListener("input", updateList);

// Reset semua data
resetBtn.addEventListener("click", () => {
  if (confirm("Yakin ingin mereset semua data?")) {
    data = [];
    wilayahInput.value = "";
    jumlahInput.value = "";
    operasional.value = 0;
mbebasan.value = 0;
    localStorage.clear();
    updateList();
  }
});

// Export PDF
exportBtn.addEventListener("click", () => {
  const tableBody = document.getElementById("exportTableBody");
  const tanggal = new Date().toLocaleDateString('id-ID');
  const total = data.reduce((sum, item) => sum + item.jumlah, 0);
  const operasionalVal = parseInt(operasional.value) || 0;
  const pembebasanVal = parseInt(pembebasan.value) || 0;
  const sisa = total - operasionalVal - pembebasanVal;

  document.getElementById("tanggalExport").textContent = tanggal;
  document.getElementById("exportTotal").textContent = `Rp ${total.toLocaleString()}`;
  document.getElementById("exportOperasional").textContent = `Rp ${operasionalVal.toLocaleString()}`;
  document.getElementById("exportPembebasan").textContent = `Rp ${pembebasanVal.toLocaleString()}`;
  document.getElementById("exportSisa").textContent = `Rp ${sisa.toLocaleString()}`;

  tableBody.innerHTML = "";
  data.forEach(item => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td style="padding: 6px;">${item.wilayah}</td>
