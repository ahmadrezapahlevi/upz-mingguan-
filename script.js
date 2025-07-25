const wilayahInput = document.getElementById("wilayah");
const jumlahInput = document.getElementById("jumlah");
const listData = document.getElementById("listData");
const totalZakatEl = document.getElementById("totalZakat");
const operasionalInput = document.getElementById("operasional");
const pembebasanInput = document.getElementById("pembebasanTanah");
const sisaDanaEl = document.getElementById("sisaDana");

let data = JSON.parse(localStorage.getItem("zakatData")) || [];
let biayaOperasional = parseInt(localStorage.getItem("biayaOperasional")) || 0;
let biayaPembebasan = parseInt(localStorage.getItem("biayaPembebasan")) || 0;

operasionalInput.value = biayaOperasional;
pembebasanInput.value = biayaPembebasan;

function simpanKeLocal() {
  localStorage.setItem("zakatData", JSON.stringify(data));
  localStorage.setItem("biayaOperasional", operasionalInput.value);
  localStorage.setItem("biayaPembebasan", pembebasanInput.value);
}

function updateList() {
  listData.innerHTML = "";
  let total = 0;

  data.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.wilayah} : Rp ${item.jumlah.toLocaleString()}
      <button onclick="hapusData(${index})">Hapus</button>
    `;
    listData.appendChild(li);
    total += item.jumlah;
  });

  totalZakatEl.textContent = `Rp ${total.toLocaleString()}`;

  let opr = parseInt(operasionalInput.value) || 0;
  let bebas = parseInt(pembebasanInput.value) || 0;

  if ((opr + bebas) > total) {
    const selisih = (opr + bebas) - total;
    if (opr >= bebas) {
      opr -= selisih;
    } else {
      bebas -= selisih;
    }
    operasionalInput.value = opr;
    pembebasanInput.value = bebas;
  }

  const sisa = total - opr - bebas;
  sisaDanaEl.textContent = `Rp ${sisa.toLocaleString()}`;

  simpanKeLocal();
}

function addZakat() {
  const wilayah = wilayahInput.value.trim();
  const jumlah = parseInt(jumlahInput.value);

  if (!wilayah) {
    alert("Nama wilayah harus diisi.");
    return;
  }

  if (isNaN(jumlah) || jumlah <= 0) {
    alert("Jumlah zakat tidak valid.");
    return;
  }

  data.push({ wilayah, jumlah });
  wilayahInput.value = "";
  jumlahInput.value = "";
  updateList();
}

function hapusData(index) {
  data.splice(index, 1);
  updateList();
}

function resetData() {
  if (confirm("Yakin ingin mereset semua data?")) {
    data = [];
    localStorage.clear();
    wilayahInput.value = "";
    jumlahInput.value = "";
    operasionalInput.value = 0;
    pembebasanInput.value = 0;
    updateList();
  }
}

function exportPDF() {
  const exportBody = document.getElementById("exportTableBody");
  const exportTotal = document.getElementById("exportTotal");
  const exportOperasional = document.getElementById("exportOperasional");
  const exportPembebasan = document.getElementById("exportPembebasan");
  const exportSisa = document.getElementById("exportSisa");
  const tanggalExport = document.getElementById("tanggalExport");

  exportBody.innerHTML = "";

  let total = 0;
  data.forEach(item => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td style="padding: 10px; border: 1px solid #cbd5e1;">${item.wilayah}</td>
      <td style="padding: 10px; border: 1px solid #cbd5e1;">Rp ${item.jumlah.toLocaleString()}</td>
    `;
    exportBody.appendChild(row);
    total += item.jumlah;
  });

  let opr = parseInt(operasionalInput.value) || 0;
  let bebas = parseInt(pembebasanInput.value) || 0;
  const sisa = total - opr - bebas;

  exportTotal.textContent = `Rp ${total.toLocaleString()}`;
  exportOperasional.textContent = `Rp ${opr.toLocaleString()}`;
  exportPembebasan.textContent = `Rp ${bebas.toLocaleString()}`;
  exportSisa.textContent = `Rp ${sisa.toLocaleString()}`;

  const now = new Date();
  const formatter = new Intl.DateTimeFormat("id-ID", {
    day: "2-digit", month: "long", year: "numeric"
  });
  tanggalExport.textContent = formatter.format(now);

  const laporan = document.getElementById("laporanArea");
  laporan.style.display = "block";

  html2pdf().from(laporan).set({
    margin: 0.5,
    filename: `Laporan-UPZ-${now.toLocaleDateString('id-ID').replace(/\//g, '-')}.pdf`,
    html2canvas: { scale: 2 },
    jsPDF: { orientation: "portrait" }
  }).save().then(() => {
    laporan.style.display = "none";
  });
}

// Event listener
document.getElementById("tambah").addEventListener("click", addZakat);
document.getElementById("exportBtn").addEventListener("click", exportPDF);
document.getElementById("resetBtn").addEventListener("click", resetData);
operasionalInput.addEventListener("input", updateList);
pembebasanInput.addEventListener("input", updateList);

// Inisialisasi awal
updateList();
