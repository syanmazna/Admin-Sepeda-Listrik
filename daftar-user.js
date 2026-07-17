const users = [
    { nama: "Abimanyu Ramadhan", nim: "124090101000", prodi: "Teknik Informatika", pinjaman: 2, img: "assets/abi.svg" },
    { nama: "Rina Utami", nim: "124090101002", prodi: "Biologi", pinjaman: 1, img: "assets/rina.svg" }
];

const searchInput = document.getElementById('userSearch');
const userList = document.getElementById('userList');

function renderUsers(filterText = '') {
    userList.innerHTML = '';
    const filtered = users.filter(u => u.nama.toLowerCase().includes(filterText.toLowerCase()));

    filtered.forEach(u => {
        userList.innerHTML += `
            <div class="user-card">
                <!-- Wadah gambar -->
                <img src="${u.img}" class="user-avatar" alt="Foto">
                
                <div class="user-info-text">
                    <strong>${u.nama}</strong><br>
                    ${u.nim} • ${u.prodi}
                </div>
                
                <div class="user-actions">
                    <span>Total Pinjaman: ${u.pinjaman}</span>
                    <div class="status-aktif">Aktif</div>
                </div>
            </div>`;
    });
}

// Jalankan pencarian saat mengetik
searchInput.addEventListener('input', (e) => renderUsers(e.target.value));

// Tampilkan semua user saat halaman dibuka
renderUsers();

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