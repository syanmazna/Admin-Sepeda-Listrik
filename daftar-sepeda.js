document.addEventListener('DOMContentLoaded', () => {
    
    /* =================================================================
       1. BAGIAN DURASI PEMINJAMAN 
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

    if (btnEditDurasi && actionButtonsDurasi) {
        btnEditDurasi.addEventListener('click', () => {
            timeInputs.forEach(input => input.removeAttribute('readonly'));
            actionButtonsDurasi.style.display = 'flex';
            btnEditDurasi.classList.add('disabled');
        });
    }

    if (btnBatalDurasi && actionButtonsDurasi) {
        btnBatalDurasi.addEventListener('click', () => {
            loadDurasi();
            timeInputs.forEach(input => input.setAttribute('readonly', true));
            actionButtonsDurasi.style.display = 'none';
            if (btnEditDurasi) btnEditDurasi.classList.remove('disabled');
        });
    }

    if (btnSimpanDurasi && actionButtonsDurasi) {
        btnSimpanDurasi.addEventListener('click', () => {
            const newValues = Array.from(timeInputs).map(input => input.value);
            localStorage.setItem(STORAGE_KEY_DURASI, JSON.stringify(newValues));
            timeInputs.forEach(input => input.setAttribute('readonly', true));
            actionButtonsDurasi.style.display = 'none';
            if (btnEditDurasi) btnEditDurasi.classList.remove('disabled');
        });
    }

    /* =================================================================
       2. LOGIKA RENDER, TAMBAH, EDIT & HAPUS SEPEDA
       ================================================================= */
    const sepedaListContainer = document.getElementById('sepedaListContainer');
    const sepedaDetailBox = document.getElementById('sepedaDetail');
    const inputDetailName = document.getElementById('detailName'); 
    const btnCloseDetail = document.getElementById('btnCloseDetail');
    const btnEditSepeda = document.getElementById('btnEditSepeda');
    const btnHapusSepeda = document.getElementById('btnHapusSepeda');
    const btnSimpanSepeda = document.getElementById('btnSimpanSepeda');

    const btnBukaTambah = document.getElementById('btnBukaTambah');
    const tambahSepedaBox = document.getElementById('tambahSepedaBox');
    const btnCloseTambah = document.getElementById('btnCloseTambah');
    const inputKodeSepeda = document.getElementById('inputKodeSepeda');
    const btnSubmitTambah = document.getElementById('btnSubmitTambah');

    // Elemen Custom Alert Hapus
    const modalConfirmHapus = document.getElementById('modalConfirmHapus');
    const confirmBikeName = document.getElementById('confirmBikeName');
    const btnConfirmHapus = document.getElementById('btnConfirmHapus');
    const btnCancelHapus = document.getElementById('btnCancelHapus');

    const STORAGE_KEY_SEPEDA = 'data_sepeda_dashboard_final';
    let savedBikes = [];
    let activeCardIndex = null;

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

    function renderListSepeda() {
        if (!sepedaListContainer) return;
        sepedaListContainer.innerHTML = ''; 

        savedBikes.forEach((bike, index) => {
            if (bike.terhapus) return; 

            const card = document.createElement('div');
            card.className = `sepeda-card ${index === activeCardIndex ? 'active' : ''}`;
            card.innerHTML = `
                <div class="bike-icon-box">
                    <img src="assets/sepeda.svg" alt="sepeda">
                </div>
                <div class="bike-name">${bike.nama}</div>
            `;

            card.addEventListener('click', () => {
                activeCardIndex = index;
                renderListSepeda(); 
                
                if (tambahSepedaBox) tambahSepedaBox.style.display = 'none'; 
                if (sepedaDetailBox) sepedaDetailBox.style.display = 'flex';
                
                if (inputDetailName) {
                    inputDetailName.value = bike.nama;
                    inputDetailName.setAttribute('readonly', true);
                    inputDetailName.style.borderBottom = "none";
                }

                if (btnEditSepeda) btnEditSepeda.classList.remove('editing');
                if (btnSimpanSepeda) btnSimpanSepeda.style.display = 'none';
                if (btnHapusSepeda) btnHapusSepeda.style.display = 'block';
            });

            sepedaListContainer.appendChild(card);
        });
    }

    renderListSepeda();

    if (btnBukaTambah) {
        btnBukaTambah.addEventListener('click', () => {
            activeCardIndex = null;
            renderListSepeda(); 
            
            if (sepedaDetailBox) sepedaDetailBox.style.display = 'none';
            if (tambahSepedaBox) tambahSepedaBox.style.display = 'flex'; 
            if (inputKodeSepeda) {
                inputKodeSepeda.value = ''; 
                inputKodeSepeda.focus();
            }
        });
    }

    if (btnSubmitTambah) {
        btnSubmitTambah.addEventListener('click', () => {
            const kode = inputKodeSepeda.value.trim();
            if (kode !== '') {
                const namaBaru = `Sepeda Listrik ${kode}`;
                savedBikes.push({ nama: namaBaru, terhapus: false });
                saveBikes();
                
                if (tambahSepedaBox) tambahSepedaBox.style.display = 'none';
                renderListSepeda();
            } else {
                alert("Isi kode sepedanya dulu ya!");
            }
        });
    }

    if (btnCloseTambah) {
        btnCloseTambah.addEventListener('click', () => {
            if (tambahSepedaBox) tambahSepedaBox.style.display = 'none';
        });
    }

    if (btnCloseDetail) {
        btnCloseDetail.addEventListener('click', () => {
            if (sepedaDetailBox) sepedaDetailBox.style.display = 'none';
            activeCardIndex = null;
            renderListSepeda();
        });
    }

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
                if (btnHapusSepeda) btnHapusSepeda.style.display = 'none';
                if (btnSimpanSepeda) btnSimpanSepeda.style.display = 'block';
            }
        });
    }

    if (btnSimpanSepeda) {
        btnSimpanSepeda.addEventListener('click', function() {
            if (activeCardIndex === null) return;

            savedBikes[activeCardIndex].nama = inputDetailName.value;
            saveBikes();
            
            inputDetailName.setAttribute('readonly', true);
            inputDetailName.style.borderBottom = "none";
            btnEditSepeda.classList.remove('editing');
            
            this.style.display = 'none';
            if (btnHapusSepeda) btnHapusSepeda.style.display = 'block';
            
            renderListSepeda(); 
        });
    }

    /* =================================================================
       3. LOGIKA CUSTOM MODAL HAPUS SEPEDA
       ================================================================= */
       
    // Saat tombol Hapus di detail diklik
    if (btnHapusSepeda) {
        btnHapusSepeda.addEventListener('click', function() {
            if (activeCardIndex !== null && modalConfirmHapus) {
                // Tampilkan nama sepeda yang benar di modal
                if (confirmBikeName) confirmBikeName.textContent = savedBikes[activeCardIndex].nama;
                
                // Munculkan custom pop-up
                modalConfirmHapus.style.display = 'flex';
            }
        });
    }

    // Saat tombol "Batal" (Hijau) ditekan
    if (btnCancelHapus) {
        btnCancelHapus.addEventListener('click', () => {
            // Sembunyikan pop-up, jangan hapus apa-apa
            modalConfirmHapus.style.display = 'none';
        });
    }

    // Saat tombol "Hapus" (Merah) ditekan
    if (btnConfirmHapus) {
        btnConfirmHapus.addEventListener('click', () => {
            if (activeCardIndex !== null) {
                // Eksekusi hapus di memori
                savedBikes[activeCardIndex].terhapus = true;
                saveBikes();
                
                // Tutup kotak detail & modal alert
                if (sepedaDetailBox) sepedaDetailBox.style.display = 'none';
                modalConfirmHapus.style.display = 'none';
                
                activeCardIndex = null;
                renderListSepeda(); // Perbarui daftar di kiri
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