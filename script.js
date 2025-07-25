let data = [];

const wilayahInput = document.getElementById("wilayah");
const jumlahInput = document.getElementById("jumlah");
const listData = document.getElementById("listData");
const totalZakatEl = document.getElementById("totalZakat");
const sisaDanaEl = document.getElementById("sisaDana");
const biayaOperasionalInput = document.getElementById("biayaOperasional");
const biayaPembebasanInput = document.getElementById("biayaPembebasan");

function addData() {
  const wilayah = wilayahInput.value.trim();
  const jumlah = parseInt(jumlahInput.value);

  if (wilayah === "" || isNaN(jumlah) || jumlah < 0) {
    alert("Data tidak valid!");
    return;
  }

  data.push({ wilayah, jumlah });
  wilayahInput.value = "";
  jumlahInput.value = "";

  updateList();
  updateTotal();
}

function updateList() {
  listData.innerHTML = "";
  let total = 0;

  data.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.wilayah} : Rp ${item.jumlah.toLocaleString()} 
      <button class="hapus-btn" onclick="hapusData(${index})">Hapus</button>
    `;
    listData.appendChild(li);
    total += item.jumlah;
  });

  totalZakatEl.textContent = `Rp ${total.toLocaleString()}`;
  updateTotal();
}

function hapusData(index) {
  data.splice(index, 1);
  updateList();
  updateTotal();
}

function updateTotal() {
  const totalZakat = data.reduce((sum, item) => sum + item.jumlah, 0);
  let operasional = parseInt(biayaOperasionalInput.value) || 0;
  let pembebasan = parseInt(biayaPembebasanInput.value) || 0;

  // Penyesuaian jika ada yang lebih besar dari total zakat
  if (operasional + pembebasan > totalZakat) {
    if (operasional > totalZakat) {
      operasional = 0;
    }
    if (pembebasan > totalZakat) {
      pembebasan = 0;
    }
    if (operasional + pembebasan > totalZakat) {
      const sisa = totalZakat - Math.min(operasional, pembebasan);
      if (operasional > pembebasan) {
        operasional = sisa;
      } else {
        pembebasan = sisa;
      }
    }
  }

  const sisaDana = totalZakat - operasional - pembebasan;
  sisaDanaEl.textContent = `Rp ${sisaDana.toLocaleString()}`;
}

function resetSemua() {
  data = [];
  wilayahInput.value = "";
  jumlahInput.value = "";
  biayaOperasionalInput.value = "";
  biayaPembebasanInput.value = "";
  updateList();
  sisaDanaEl.textContent = "Rp 0";
}
