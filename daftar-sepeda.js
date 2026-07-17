document.addEventListener('DOMContentLoaded', () => {
    
    /* =================================================================
       1. BAGIAN DURASI PEMINJAMAN (Tetap sama)
       ================================================================= */
    const btnEditDurasi = document.getElementById('btnEdit'); 
    const btnBatalDurasi = document.getElementById('btnBatal');
    const btnSimpanDurasi = document.getElementById('btnSimpan');
    const actionButtonsDurasi = document.getElementById('actionButtons');
    const timeInputs = document.querySelectorAll('.time-box');
    const STORAGE_KEY_DURASI = 'durasi_sepeda_uin';

    function loadDurasi() {
        const savedData = localStorage.getItem(STORAGE_KEY_DURASI);
        if (savedData) {
            const values = JSON.parse(savedData);
            timeInputs.forEach((input, index) => {
                if (values[index] !== undefined) input.value = values[index];
            });
        }
    }
    loadDurasi();

    if (btnEditDurasi) {
        btnEditDurasi.addEventListener('click', () => {
            timeInputs.forEach(input => input.removeAttribute('readonly'));
            if(actionButtonsDurasi) actionButtonsDurasi.style.display = 'flex';
            btnEditDurasi.classList.add('disabled');
        });
    }

    if (btnBatalDurasi) {
        btnBatalDurasi.addEventListener('click', () => {
            loadDurasi();
            timeInputs.forEach(input => input.setAttribute('readonly', true));
            if(actionButtonsDurasi) actionButtonsDurasi.style.display = 'none';
            btnEditDurasi.classList.remove('disabled');
        });
    }

    if (btnSimpanDurasi) {
        btnSimpanDurasi.addEventListener('click', () => {
            const newValues = Array.from(timeInputs).map(input => input.value);
            localStorage.setItem(STORAGE_KEY_DURASI, JSON.stringify(newValues));
            timeInputs.forEach(input => input.setAttribute('readonly', true));
            if(actionButtonsDurasi) actionButtonsDurasi.style.display = 'none';
            btnEditDurasi.classList.remove('disabled');
        });
    }

    /* =================================================================
       2. LOGIKA RENDER, TAMBAH, EDIT & HAPUS SEPEDA
       ================================================================= */
    const sepedaListContainer = document.getElementById('sepedaListContainer');
    
    // Elemen Kotak Detail (Edit/Hapus)
    const sepedaDetailBox = document.getElementById('sepedaDetail');
    const inputDetailName = document.getElementById('detailName'); 
    const btnCloseDetail = document.getElementById('btnCloseDetail');
    const btnEditSepeda = document.getElementById('btnEditSepeda');
    const btnHapusSepeda = document.getElementById('btnHapusSepeda');
    const btnSimpanSepeda = document.getElementById('btnSimpanSepeda');

    // Elemen Kotak Tambah
    const btnBukaTambah = document.getElementById('btnBukaTambah');
    const tambahSepedaBox = document.getElementById('tambahSepedaBox');
    const btnCloseTambah = document.getElementById('btnCloseTambah');
    const inputKodeSepeda = document.getElementById('inputKodeSepeda');
    const btnSubmitTambah = document.getElementById('btnSubmitTambah');

    // Database Sederhana di Memori
    const STORAGE_KEY_SEPEDA = 'data_sepeda_dashboard_final';
    let savedBikes = [];
    let activeCardIndex = null;

    // Ambil data, kalau kosong buat 2 sepeda default
    const dataMemori = localStorage.getItem(STORAGE_KEY_SEPEDA);
    if (dataMemori) {
        savedBikes = JSON.parse(dataMemori);
    } else {
        savedBikes = [
            { nama: "Sepeda Listrik A11", terhapus: false },
            { nama: "Sepeda Listrik A12", terhapus: false }
        ];
        saveBikes();
    }

    function saveBikes() {
        localStorage.setItem(STORAGE_KEY_SEPEDA, JSON.stringify(savedBikes));
    }

    // FUNGSI UTAMA: Menampilkan list sepeda ke HTML
    function renderListSepeda() {
        if (!sepedaListContainer) return;
        sepedaListContainer.innerHTML = ''; // Kosongkan dulu

        savedBikes.forEach((bike, index) => {
            if (bike.terhapus) return; // Skip yang terhapus

            // Bikin tag div untuk kartu sepeda
            const card = document.createElement('div');
            card.className = `sepeda-card ${index === activeCardIndex ? 'active' : ''}`;
            card.innerHTML = `
                <div class="bike-icon-box">
                    <img src="assets/sepeda.svg" alt="sepeda">
                </div>
                <div class="bike-name">${bike.nama}</div>
            `;

            // Kalau kartunya diklik, buka kotak detail
            card.addEventListener('click', () => {
                activeCardIndex = index;
                renderListSepeda(); // Refresh biar warnanya berubah abu-abu
                
                // Munculkan modal detail
                tambahSepedaBox.style.display = 'none'; // Sembunyikan form tambah
                sepedaDetailBox.style.display = 'flex';
                
                inputDetailName.value = bike.nama;
                inputDetailName.setAttribute('readonly', true);
                inputDetailName.style.borderBottom = "none";

                btnEditSepeda.classList.remove('editing');
                btnSimpanSepeda.style.display = 'none';
                btnHapusSepeda.style.display = 'block';
            });

            sepedaListContainer.appendChild(card);
        });
    }

    // Panggil render saat pertama kali buka web
    renderListSepeda();

    // --- EVENT TAMBAH SEPEDA (TOMBOL KUNING) ---
    if (btnBukaTambah) {
        btnBukaTambah.addEventListener('click', () => {
            activeCardIndex = null;
            renderListSepeda(); // Hapus seleksi aktif di daftar
            
            sepedaDetailBox.style.display = 'none';
            tambahSepedaBox.style.display = 'flex'; // Munculkan form tambah
            inputKodeSepeda.value = ''; // Kosongkan input
            inputKodeSepeda.focus();
        });
    }

    // --- EVENT KLIK SUBMIT TAMBAH SEPEDA (TOMBOL HIJAU) ---
    if (btnSubmitTambah) {
        btnSubmitTambah.addEventListener('click', () => {
            const kode = inputKodeSepeda.value.trim();
            if (kode !== '') {
                const namaBaru = `Sepeda Listrik ${kode}`;
                // Masukkan ke database memori
                savedBikes.push({ nama: namaBaru, terhapus: false });
                saveBikes();
                
                // Tutup kotak tambah & perbarui list
                tambahSepedaBox.style.display = 'none';
                renderListSepeda();
            } else {
                alert("Isi kode sepedanya dulu ya!");
            }
        });
    }

    // Tutup kotak tambah
    if (btnCloseTambah) {
        btnCloseTambah.addEventListener('click', () => {
            tambahSepedaBox.style.display = 'none';
        });
    }

    // Tutup kotak detail
    if (btnCloseDetail) {
        btnCloseDetail.addEventListener('click', () => {
            sepedaDetailBox.style.display = 'none';
            activeCardIndex = null;
            renderListSepeda();
        });
    }

    // Edit nama sepeda
    if (btnEditSepeda) {
        btnEditSepeda.addEventListener('click', function() {
            if (!this.classList.contains('editing') && inputDetailName) {
                inputDetailName.removeAttribute('readonly');
                inputDetailName.focus();
                
                const val = inputDetailName.value;
                inputDetailName.value = '';
                inputDetailName.value = val;
                
                inputDetailName.style.borderBottom = "2px dashed #a0a6b1"; 

                this.classList.add('editing');
                btnHapusSepeda.style.display = 'none';
                btnSimpanSepeda.style.display = 'block';
            }
        });
    }

    // Simpan hasil edit
    if (btnSimpanSepeda) {
        btnSimpanSepeda.addEventListener('click', function() {
            if (activeCardIndex === null) return;

            savedBikes[activeCardIndex].nama = inputDetailName.value;
            saveBikes();
            
            inputDetailName.setAttribute('readonly', true);
            inputDetailName.style.borderBottom = "none";
            btnEditSepeda.classList.remove('editing');
            
            this.style.display = 'none';
            btnHapusSepeda.style.display = 'block';
            
            renderListSepeda(); // Perbarui list di kiri
        });
    }

    // Hapus sepeda
    if (btnHapusSepeda) {
        btnHapusSepeda.addEventListener('click', function() {
            if (activeCardIndex !== null) {
                const konfirmasi = confirm('Yakin ingin menghapus sepeda ini?');
                if (konfirmasi) {
                    savedBikes[activeCardIndex].terhapus = true;
                    saveBikes();
                    
                    sepedaDetailBox.style.display = 'none';
                    activeCardIndex = null;
                    renderListSepeda(); // Perbarui list, sepedanya bakal hilang dari tampilan
                }
            }
        });
    }
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