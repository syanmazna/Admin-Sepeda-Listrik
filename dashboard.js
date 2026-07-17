const mapContainer = document.querySelector('.map-placeholder');
const modal = document.getElementById('mapModal');
const closeBtn = document.querySelector('.close');

// Buka modal saat diklik
mapContainer.addEventListener('click', () => {
    modal.style.display = 'flex';
});

// Tutup modal saat klik tombol silang
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Tutup modal jika klik di luar gambar
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

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