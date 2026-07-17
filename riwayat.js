// Ambil semua tombol menu
// Mengambil semua tombol menu berdasarkan class .menu-item
const menuButtons = document.querySelectorAll('.menu-item');

menuButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Ambil teks tombol dan ubah jadi lowercase (misal: "Daftar User" -> "daftar-user")
        let target = button.textContent.trim().toLowerCase();
        
        // Sesuaikan nama file jika teksnya berbeda dengan nama file
        if (target === "dashboard") {
            window.location.href = 'dashboard.html';
        } else if (target === "riwayat") {
            window.location.href = 'riwayat.html';
        } else if (target === "daftar sepeda") {
            window.location.href = 'daftar-sepeda.html';
        } else if (target === "daftar user") {
            window.location.href = 'daftar-user.html';
        } else if (target === "profile") {
            window.location.href = 'profile.html';
        }
    });
});


const riwayatData = [
    { nama: "Abimanyu Ramadhan", sepeda: "Sepeda Listrik A11", bulan: "Juli", tgl: "1 Juli 2026", info: "124090101000 • Teknik Informatika" }
];

const bulanFilter = document.getElementById('bulanFilter');
const riwayatList = document.getElementById('riwayatList');

bulanFilter.addEventListener('change', function() {
    const selectedMonth = this.value;
    riwayatList.innerHTML = ''; // Hapus isi lama

    if (selectedMonth === "") return; // Jika belum pilih, jangan tampilkan apa-apa

    const filteredData = riwayatData.filter(item => item.bulan === selectedMonth);

    if (filteredData.length > 0) {
        filteredData.forEach(item => {
            riwayatList.innerHTML += `
                <div class="card">
                    <div class="bike-icon-placeholder"><img src="assets/sepeda.svg" alt="sepeda" width="40px"></div>
                    <div class="bike-info">
                        <strong>${item.sepeda}</strong><br>
                        <small>${item.tgl}</small>
                    </div>
                    <div class="user-info">
                        <strong>${item.nama}</strong><br>
                        ${item.info}
                    </div>
                    <div class="status-badge">Selesai</div>
                </div>`;
        });
    } else {
        riwayatList.innerHTML = '<p style="padding:20px;">Tidak ada riwayat pada bulan ini.</p>';
    }
});

// Di bagian paling bawah riwayat.js:
window.onload = () => {
    bulanFilter.dispatchEvent(new Event('change'));
};