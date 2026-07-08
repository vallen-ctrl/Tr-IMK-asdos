// download.js
// Terintegrasi untuk mengunduh/mencetak tiket reservasi sebagai berkas PDF/cetakan berkualitas tinggi.

(function () {
    // Helper: Dapatkan root path relatif terhadap halaman pemanggil
    function getRootPath() {
        const path = window.location.pathname;
        if (path.includes('/pages/pendaftaran/ticket/')) {
            return '../../../';
        } else if (path.includes('/pages/poli/')) {
            return '../../';
        }
        return './';
    }

    // Fungsi Utama: Buat & Buka Cetak Tiket
    window.downloadTicket = function (type) {
        let reservationCode = "A0012";
        let patientName = "Jhon deo formalin";
        let roomDetails = "";
        let qrParam = "";

        const rootPath = getRootPath();

        if (type === 'ticket') {
            // 1. Ekstrak data dari halaman Pendaftaran Ticket
            const heading = document.querySelector('h1.text-2xl.font-bold, h1');
            if (heading) {
                const match = heading.textContent.match(/Tiket Reservasi\s*-\s*([A-Za-z0-9]+)/i);
                if (match) {
                    reservationCode = match[1];
                } else {
                    reservationCode = heading.textContent.replace('Tiket Reservasi -', '').trim();
                }
            }

            const nameEl = document.getElementById('reservasi-nama');
            if (nameEl) patientName = nameEl.textContent.trim();

            const ruanganEl = document.getElementById('kamar-ruangan');
            const lantaiEl = document.getElementById('kamar-lantai');
            const nomorEl = document.getElementById('kamar-nomor');
            const kasurEl = document.getElementById('kamar-kasur');

            const ruangan = ruanganEl ? ruanganEl.textContent.trim() : 'Melati';
            const lantai = lantaiEl ? lantaiEl.textContent.trim() : '2';
            const nomor = nomorEl ? nomorEl.textContent.trim() : '12';
            const kasur = kasurEl ? kasurEl.textContent.trim() : '12/b';

            roomDetails = `${ruangan}/${lantai}/${nomor}/${kasur}`;
            qrParam = `${reservationCode}-${patientName}-Reservasi`;

        } else if (type === 'poli') {
            // 2. Ekstrak data untuk halaman Poli
            const rawCode = window.lastBookingCode || "A0012";
            reservationCode = rawCode.startsWith("BPJS") ? rawCode : "BPJS-" + rawCode;

            // Cari nama dari localStorage
            try {
                const storedUser = localStorage.getItem('hf_currentUser');
                if (storedUser) {
                    const parsed = JSON.parse(storedUser);
                    if (parsed && parsed.nama) {
                        patientName = parsed.nama;
                    }
                }
            } catch (e) {
                console.error("Gagal membaca profil dari localStorage", e);
            }

            roomDetails = "pasien bpjs, harap hadir sesuai jam yang ditentukan";
            
            // Poli QR code (kirim data URL base64)
            qrParam = window.lastQrDataUrl || "";
        }

        // Redirect ke halaman ticketPrint dengan parameter cetak otomatis (print=true)
        const printUrl = `${rootPath}ticketPrint/index.html?code=${encodeURIComponent(reservationCode)}&name=${encodeURIComponent(patientName)}&room=${encodeURIComponent(roomDetails)}&qr=${encodeURIComponent(qrParam)}&print=true`;
        
        window.location.href = printUrl;
    };

    // Tambahkan event listener otomatis untuk tombol tiket pendaftaran
    const bindBtn = () => {
        const btn = document.getElementById('downloadTicketBtn');
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                window.downloadTicket('ticket');
            });
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bindBtn);
    } else {
        bindBtn();
    }
})();
