const modal = document.getElementById('logoutModal');
const logoutBtn = document.querySelector('.logout-btn'); // Tombol Log Out di halaman
const confirmBtn = document.getElementById('confirmLogout');
const cancelBtn = document.getElementById('cancelLogout');

// Tampilkan modal saat tombol logout diklik
logoutBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
});

// Aksi jika tombol "Log Out" di modal diklik
confirmBtn.addEventListener('click', () => {
    window.location.href = 'index.html'; // Pindah ke halaman login
});

// Aksi jika tombol "Batal" diklik
cancelBtn.addEventListener('click', () => {
    modal.style.display = 'none'; // Tutup modal
});

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