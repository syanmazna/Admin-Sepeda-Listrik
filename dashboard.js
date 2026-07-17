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

document.addEventListener('DOMContentLoaded', () => {
    
    // Ambil semua elemen waktu di dalam kartu
    const timers = document.querySelectorAll('.timer');

    // Fungsi mengubah teks "H:MM:SS" menjadi total detik
    function parseTimeToSeconds(timeStr) {
        const parts = timeStr.split(':');
        let h = parseInt(parts[0]) || 0;
        let m = parseInt(parts[1]) || 0;
        let s = parseInt(parts[2]) || 0;
        return (h * 3600) + (m * 60) + s;
    }

    // Fungsi mengubah total detik kembali menjadi "H:MM:SS"
    function formatSecondsToTime(totalSeconds) {
        if (totalSeconds < 0) totalSeconds = 0;
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
        const s = (totalSeconds % 60).toString().padStart(2, '0');
        return `${h}:${m}:${s}`;
    }

    // 1. Simpan waktu awal masing-masing timer ke dalam "dataset" HTML
    timers.forEach(timer => {
        const originalTime = timer.textContent.trim();
        timer.dataset.seconds = parseTimeToSeconds(originalTime);
    });

    // 2. Jalankan hitung mundur setiap 1000ms (1 detik)
    setInterval(() => {
        timers.forEach(timer => {
            let sec = parseInt(timer.dataset.seconds);
            
            if (sec > 0) {
                sec--; // Kurangi 1 detik
                timer.dataset.seconds = sec; // Simpan kembali
                timer.textContent = formatSecondsToTime(sec); // Tampilkan

                // Fitur Tambahan Otomatis: 
                // Jika sisa waktu <= 5 menit (300 detik), warna otomatis jadi merah
                if (sec <= 300) {
                    timer.classList.remove('green');
                    timer.classList.add('red');
                } else {
                    timer.classList.remove('red');
                    timer.classList.add('green');
                }
            } else {
                // Opsional: Lakukan sesuatu saat waktu habis (0:00:00)
                timer.textContent = "0:00:00";
                timer.classList.remove('green');
                timer.classList.add('red');
            }
        });
    }, 1000);

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