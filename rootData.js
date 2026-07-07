
const RootData = (() => {

    // =====================================================================
    //  KONSTANTA & KEYS LOCALSTORAGE
    // =====================================================================
    const LS_KEYS = {
        currentUser: 'hf_currentUser',
        isLoggedIn: 'isLoggedIn',
        emergencyContacts: 'hf_emergencyContacts',
        notifications: 'hf_notifications',
        patients: 'hf_patients',
    };

    // =====================================================================
    //  DEFAULT USER (fallback saat belum daftar/login)
    // =====================================================================
    const DEFAULT_USER = {
        nama: "Jhon deo formalin",
        email: "Jsondeoformalin@gmail.com",
        noTelp: "0876-8787-6774",
        nik: "136586362396004",
        tempatTglLahir: "Way kanan / 22 - Desember - 1967",
        tanggalLahir: "1967-12-22",
        usia: "40 Tahun",
        jenisKelamin: "Laki-laki",
        pekerjaan: "Wiraswasta",
        statusPernikahan: "Kawin",
        golonganDarah: "A+",
        tinggiBadan: "166 cm",
        beratBadan: "56 Kg",
        alergi: "Ikan laut, Udang",
        riwayatPenyakitKronis: "Tumor otak, Jantung, Diabetes (bawaan), Hipertensi (bawaan)",
        subHeader: "Kepala Keluarga dari Ibu Nurul Nuruni dan 4 anaknya",
        password: "pakwowow"
    };

    // =====================================================================
    //  DATA STATIS — KLINIK (dipakai oleh lokasi + pendaftaran)
    // =====================================================================
    const clinics = [
        { name: "Klinik Bandung", address: "Jl. Wastukencana No. 2, Babakan Ciamis", distance: "1,3 Km", time: "10 menit", provinsi: "jabar", kabupaten: "Kota Bandung" },
        { name: "Klinik Bandung", address: "Jl. Wastukencana No. 22, Babakan Ciamis", distance: "1,3 Km", time: "10 menit", provinsi: "jabar", kabupaten: "Kota Bandung" },
        { name: "Klinik Bandung", address: "Jl. asdasd No. 2, Babakan Ciamis", distance: "1,3 Km", time: "10 menit", provinsi: "jabar", kabupaten: "Kota Bandung" },
        { name: "Klinik Bandung", address: "Jl. Diponegoro No. 22, Citarum", distance: "1,3 Km", time: "10 menit", provinsi: "jabar", kabupaten: "Kota Bandung" },
        { name: "Klinik Bandung", address: "Jl. Asia Afrika No. 65, Braga", distance: "1,3 Km", time: "10 menit", provinsi: "jabar", kabupaten: "Kota Bandung" },
        { name: "Klinik Bandung", address: "Jl. Riau No. 8, Citarum", distance: "2,4 Km", time: "14 menit", provinsi: "jabar", kabupaten: "Kota Bandung" },
        { name: "Klinik Bandung", address: "Jl. Cihampelas No. 45, Cipaganti", distance: "2,6 Km", time: "15 menit", provinsi: "jabar", kabupaten: "Kota Bandung" },
        { name: "Klinik Bandung", address: "Jl. Dago No. 90, Coblong", distance: "3,2 Km", time: "18 menit", provinsi: "jabar", kabupaten: "Kota Bandung" },

        { name: "Klinik Kabupaten Bandung", address: "Jl. Raya Soreang No. 12, Soreang", distance: "8,1 Km", time: "22 menit", provinsi: "jabar", kabupaten: "Kabupaten Bandung" },
        { name: "Klinik Kabupaten Bandung", address: "Jl. Ciwidey No. 5, Ciwidey", distance: "9,4 Km", time: "26 menit", provinsi: "jabar", kabupaten: "Kabupaten Bandung" },

        { name: "Klinik Cimahi", address: "Jl. Gatot Subroto No. 30, Cimahi Tengah", distance: "6,0 Km", time: "19 menit", provinsi: "jabar", kabupaten: "Kota Cimahi" },
        { name: "Klinik Cimahi", address: "Jl. Sriwijaya No. 14, Cimahi Selatan", distance: "6,5 Km", time: "20 menit", provinsi: "jabar", kabupaten: "Kota Cimahi" },

        { name: "Klinik Bekasi", address: "Jl. Ahmad Yani No. 88, Bekasi Selatan", distance: "45 Km", time: "1 jam 10 menit", provinsi: "jabar", kabupaten: "Kota Bekasi" },
        { name: "Klinik Bekasi", address: "Jl. Cut Meutia No. 21, Bekasi Timur", distance: "46 Km", time: "1 jam 15 menit", provinsi: "jabar", kabupaten: "Kota Bekasi" },

        { name: "Klinik Semarang", address: "Jl. Pandanaran No. 40, Semarang Tengah", distance: "370 Km", time: "6 jam 30 menit", provinsi: "jateng", kabupaten: "Kota Semarang" },
        { name: "Klinik Semarang", address: "Jl. MT Haryono No. 15, Semarang Selatan", distance: "372 Km", time: "6 jam 35 menit", provinsi: "jateng", kabupaten: "Kota Semarang" },

        { name: "Klinik Jakarta Pusat", address: "Jl. Sudirman No. 25, Jakarta Pusat", distance: "150 Km", time: "3 jam", provinsi: "dki", kabupaten: "Jakarta Pusat" },
        { name: "Klinik Jakarta Pusat", address: "Jl. Menteng Raya No. 9, Jakarta Pusat", distance: "151 Km", time: "3 jam 5 menit", provinsi: "dki", kabupaten: "Jakarta Pusat" },
    ];

    // =====================================================================
    //  DATA STATIS — KABUPATEN PER PROVINSI (lokasi)
    // =====================================================================
    const kabupatenByProvinsi = {
        jabar: ["Kota Bandung", "Kabupaten Bandung", "Kabupaten Bandung Barat", "Kota Cimahi", "Kabupaten Sumedang", "Kabupaten Garut", "Kota Bekasi", "Kabupaten Bekasi", "Kota Bogor", "Kabupaten Bogor", "Kota Cirebon", "Kabupaten Cirebon"],
        jateng: ["Kota Semarang", "Kabupaten Semarang", "Kabupaten Kendal", "Kabupaten Demak", "Kota Surakarta", "Kabupaten Sukoharjo"],
        dki: ["Jakarta Pusat", "Jakarta Barat", "Jakarta Selatan", "Jakarta Timur", "Jakarta Utara", "Kepulauan Seribu"],
    };

    // =====================================================================
    //  DATA STATIS — CABANG (derived dari klinik — berkesinambungan)
    //  Ini otomatis sync dgn data clinics di atas
    // =====================================================================
    const branches = (() => {
        const uniqueKabupaten = [...new Set(clinics.map(c => c.kabupaten))];
        return uniqueKabupaten.sort();
    })();

    // =====================================================================
    //  DATA STATIS — KELAS KAMAR (pendaftaran mandiri)
    // =====================================================================
    const roomClasses = [
        { id: "VIP", nama: "VIP", harga: 1000000 },
        { id: "VVIP", nama: "VVIP", harga: 1500000 },
        { id: "Suite Room", nama: "Suite Room", harga: 3000000 },
        { id: "President Suite", nama: "President Suite", harga: 5000000 }
    ];

    // =====================================================================
    //  DATA STATIS — TIKET AKTIF (rekam medis)
    // =====================================================================
    const tickets = [
        {
            poli: "Poli Penyakit Dalam",
            doctorName: "dr. Ruben, S. Kes, M. Kes",
            doctorImg: "https://randomuser.me/api/portraits/men/75.jpg",
            date: "Kamis, 25 Juni 2025",
            time: "8:00 WIB",
            branch: "Surabaya",
            status: "active",
            qrData: "TICKET-001-AKTIF"
        },
        {
            poli: "Poli Penyakit Dalam",
            doctorName: "dr. Ruben, S. Kes, M. Kes",
            doctorImg: "https://randomuser.me/api/portraits/men/75.jpg",
            date: "Kamis, 25 Juni 2025",
            time: "8:00 WIB",
            branch: "Surabaya",
            status: "waiting",
            qrData: ""
        },
        {
            poli: "Poli Mata",
            doctorName: "dr. Sari, Sp. M",
            doctorImg: "https://randomuser.me/api/portraits/women/44.jpg",
            date: "Jumat, 26 Juni 2025",
            time: "10:00 WIB",
            branch: "Surabaya",
            status: "active",
            qrData: "TICKET-003-AKTIF"
        },
        {
            poli: "Poli Jantung",
            doctorName: "dr. Budi, Sp. JP",
            doctorImg: "https://randomuser.me/api/portraits/men/60.jpg",
            date: "Senin, 29 Juni 2025",
            time: "09:00 WIB",
            branch: "Surabaya",
            status: "waiting",
            qrData: ""
        }
    ];

    // =====================================================================
    //  DATA STATIS — RIWAYAT KUNJUNGAN (rekam medis)
    // =====================================================================
    const visits = [
        {
            date: "Sabtu, 29 - 02 - 2023",
            time: "20:33",
            branch: "Surabaya",
            doctor: "dr. Ruben Syema Ben Yonatan, S. PD.",
            specialization: "Penyakit dalam",
            purpose: "Konsultasi penyakit",
            type: "BPJS",
            price: "Rp. 0",
            room: "G573",
            detail: {
                noRM: "RM-2026-0891",
                name: "askjdbl;asdkjb",
                age: "45 Tahun",
                description: "Pasien datang dengan keluhan nyeri ulu hati yang hebat sejak 2 hari yang lalu. Nyeri dirasakan seperti terbakar dan menjalar hingga ke dada, terutama setelah makan atau saat berbaring. Pasien juga mengeluhkan mual, kembung, dan mulut terasa pahit/asam. Riwayat sering mengonsumsi kopi hitam saat perut kosong dan telat makan karena kesibukan kerja.",
                diagnosis: [
                    "Diagnosis Utama: GERD (Gastroesophageal Reflux Disease) / Penyakit Asam Lambung.",
                    "Diagnosis Sekunder: Dispepsia Fungsional.",
                    "Kode ICD-10: K21.9 (Gastro-esophageal reflux disease without esophagitis)."
                ],
                doctorNotes: [
                    "Subjective (S): Nyeri ulu hati terasa membakar, mual (+), kembung (+), riwayat pola makan tidak teratur dan konsumsi kafein tinggi.",
                    "Objective (O): Kesadaran compos mentis, Tekanan Darah: 120/80 mmHg, Nadi: 82x/menit, Suhu: 36.6°C. Pada palpasi abdomen: terdapat nyeri tekan di area epigastrium (ulu hati).",
                    "Assessment (A): GERD dengan gejala dispepsia akut.",
                    "Planning (P): Pemberian terapi obat penekan asam lambung dan prokinetik, edukasi modifikasi gaya hidup, serta evaluasi dalam 5 hari."
                ],
                actions: [
                    "Melakukan pemeriksaan fisik abdomen (inspeksi, auskultasi, palpasi, perkusi).",
                    "Memberikan edukasi kepada pasien mengenai posisi tidur (kepala lebih tinggi 15-20 cm), larangan berbaring langsung setelah makan (minimal jeda 2-3 jam), serta menghindari makanan pemicu (pedas, asam, kopi, dan cokelat)."
                ],
                prescriptions: [
                    "Omeprazole (Kapsul), 20 mg2 × 1 sehari (30 menit sebelum makan) (Jumlah 10 kapsul)",
                    "Domperidone (Tablet), 10 mg3 × 1 sehari (15 menit sebelum makan) (Jumlah 15 Tablet)",
                    "Antasida Doen (Sirup), Suspensi3 × 1 sendok makan (jika nyeri/1 jam setelah makan) (Jumlah 1 Botol)"
                ],
                payment: {
                    guarantee: "-",
                    status: "Lunas (Cashless)",
                    total: "Rp 0,- (Termasuk jasa konsultasi dokter spesialis, tindakan pemeriksaan, dan tebus obat farmasi)."
                }
            }
        },
        {
            date: "Sabtu, 29 - 02 - 2023", time: "20:33", branch: "Surabaya",
            doctor: "dr. Ruben Syema Ben Yonatan, S. PD.", specialization: "Penyakit dalam",
            purpose: "Konsultasi penyakit", type: "BPJS", price: "Rp. 0", room: "G573",
            detail: {
                noRM: "RM-2026-0892", name: "Jhon deo formalin", age: "45 Tahun",
                description: "Pasien datang dengan keluhan batuk berdahak selama 5 hari, disertai demam ringan dan lemas.",
                diagnosis: ["Diagnosis Utama: ISPA (Infeksi Saluran Pernapasan Atas).", "Kode ICD-10: J06.9 (Acute upper respiratory infection, unspecified)."],
                doctorNotes: ["Subjective (S): Batuk berdahak, demam ringan, badan lemas.", "Objective (O): Suhu 37.8°C, tenggorokan hiperemis.", "Assessment (A): ISPA akut.", "Planning (P): Terapi simptomatik, istirahat cukup, dan evaluasi 3 hari."],
                actions: [],
                prescriptions: ["Paracetamol (Tablet), 500 mg 3 × 1 sehari (Jumlah 9 Tablet)", "Ambroxol (Tablet), 30 mg 3 × 1 sehari (Jumlah 9 Tablet)"],
                payment: { guarantee: "-", status: "Lunas (Cashless)", total: "Rp 0,-" }
            }
        },
        {
            date: "Sabtu, 29 - 02 - 2023", time: "20:33", branch: "Surabaya",
            doctor: "dr. Ruben Syema Ben Yonatan, S. PD.", specialization: "Penyakit dalam",
            purpose: "Konsultasi penyakit", type: "BPJS", price: "Rp. 0", room: "G573",
            detail: {
                noRM: "RM-2026-0893", name: "Jhon deo formalin", age: "45 Tahun",
                description: "Kontrol rutin tekanan darah dan kadar gula darah.",
                diagnosis: ["Diagnosis Utama: Hipertensi esensial terkontrol.", "Diagnosis Sekunder: Diabetes Mellitus tipe 2."],
                doctorNotes: ["Subjective (S): Tidak ada keluhan spesifik, kontrol rutin.", "Objective (O): TD 130/85 mmHg, GDS 145 mg/dL.", "Assessment (A): Hipertensi dan DM tipe 2 terkontrol.", "Planning (P): Lanjutkan terapi, kontrol 1 bulan."],
                actions: [],
                prescriptions: ["Amlodipine (Tablet), 5 mg 1 × 1 sehari (Jumlah 30 Tablet)", "Metformin (Tablet), 500 mg 2 × 1 sehari (Jumlah 60 Tablet)"],
                payment: { guarantee: "-", status: "Lunas (Cashless)", total: "Rp 0,-" }
            }
        },
        {
            date: "Sabtu, 29 - 02 - 2023", time: "20:33", branch: "Surabaya",
            doctor: "dr. Ruben Syema Ben Yonatan, S. PD.", specialization: "Penyakit dalam",
            purpose: "Konsultasi penyakit", type: "BPJS", price: "Rp. 0", room: "G573",
            detail: {
                noRM: "RM-2026-0894", name: "Jhon deo formalin", age: "45 Tahun",
                description: "Pasien mengeluh nyeri sendi di lutut kanan sejak 1 minggu yang lalu.",
                diagnosis: ["Diagnosis Utama: Osteoarthritis genu dextra."],
                doctorNotes: [], actions: [],
                prescriptions: ["Meloxicam (Tablet), 15 mg 1 × 1 sehari (Jumlah 10 Tablet)"],
                payment: { guarantee: "-", status: "Lunas (Cashless)", total: "Rp 0,-" }
            }
        },
        {
            date: "Sabtu, 29 - 02 - 2023", time: "20:33", branch: "Surabaya",
            doctor: "dr. Ruben Syema Ben Yonatan, S. PD.", specialization: "Penyakit dalam",
            purpose: "Konsultasi penyakit", type: "BPJS", price: "Rp. 0", room: "G573",
            detail: {
                noRM: "RM-2026-0895", name: "Jhon deo formalin", age: "45 Tahun",
                description: "Pasien datang untuk follow-up pasca rawat inap karena infeksi saluran kemih.",
                diagnosis: ["Diagnosis Utama: ISK (Infeksi Saluran Kemih) - follow-up."],
                doctorNotes: [], actions: [],
                prescriptions: ["Ciprofloxacin (Tablet), 500 mg 2 × 1 sehari (Jumlah 14 Tablet)"],
                payment: { guarantee: "-", status: "Lunas (Cashless)", total: "Rp 0,-" }
            }
        },
        {
            date: "Sabtu, 29 - 02 - 2023", time: "20:33", branch: "Surabaya",
            doctor: "dr. Ruben Syema Ben Yonatan, S. PD.", specialization: "Penyakit dalam",
            purpose: "Konsultasi penyakit", type: "BPJS", price: "Rp. 0", room: "G573",
            detail: {
                noRM: "RM-2026-0896", name: "Jhon deo formalin", age: "45 Tahun",
                description: "Kontrol rutin tekanan darah.",
                diagnosis: ["Diagnosis Utama: Hipertensi esensial terkontrol."],
                doctorNotes: [], actions: [],
                prescriptions: ["Amlodipine (Tablet), 5 mg 1 × 1 sehari (Jumlah 30 Tablet)"],
                payment: { guarantee: "-", status: "Lunas (Cashless)", total: "Rp 0,-" }
            }
        },
        {
            date: "Sabtu, 29 - 02 - 2023", time: "20:33", branch: "Surabaya",
            doctor: "dr. Ruben Syema Ben Yonatan, S. PD.", specialization: "Penyakit dalam",
            purpose: "Konsultasi penyakit", type: "BPJS", price: "Rp. 0", room: "G573",
            detail: {
                noRM: "RM-2026-0897", name: "Jhon deo formalin", age: "45 Tahun",
                description: "Keluhan sakit kepala berulang dan pusing.",
                diagnosis: ["Diagnosis Utama: Cephalalgia tension-type."],
                doctorNotes: [], actions: [],
                prescriptions: ["Paracetamol (Tablet), 500 mg 3 × 1 sehari (Jumlah 9 Tablet)"],
                payment: { guarantee: "-", status: "Lunas (Cashless)", total: "Rp 0,-" }
            }
        },
        {
            date: "Sabtu, 29 - 02 - 2023", time: "20:33", branch: "Surabaya",
            doctor: "dr. Ruben Syema Ben Yonatan, S. PD.", specialization: "Penyakit dalam",
            purpose: "Konsultasi penyakit", type: "BPJS", price: "Rp. 0", room: "G573",
            detail: {
                noRM: "RM-2026-0898", name: "Jhon deo formalin", age: "45 Tahun",
                description: "Pasien datang dengan keluhan nyeri ulu hati kembali muncul setelah konsumsi makanan pedas.",
                diagnosis: ["Diagnosis Utama: GERD relaps."],
                doctorNotes: [], actions: [],
                prescriptions: ["Omeprazole (Kapsul), 20 mg 2 × 1 sehari (Jumlah 14 kapsul)", "Sucralfate Sirup, 3 × 1 sendok makan (Jumlah 1 Botol)"],
                payment: { guarantee: "-", status: "Lunas (Cashless)", total: "Rp 0,-" }
            }
        }
    ];

    // =====================================================================
    //  DATA STATIS DEFAULT — NOTIFIKASI
    // =====================================================================
    const defaultNotifications = [
        {
            id: 1, title: "Pengingat janji temu", type: "appointment", icon: "calendar",
            snippet: "Jangan lupa anda memiliki janji temu besok di jam 10:00, datang 10 menit lebih awal ya!",
            time: "2 menit yang lalu", read: true,
            details: {
                greeting: "", intro: "Kami ingin mengingatkan anda, bahwa anda memiliki janji temu pada:",
                appointment: { date: "26- Desember 2025", time: "10:00", doctor: "dr. Andipratama" },
                footer: "Kami mohon anda dapat hadir 15 menit sebelum waktu yang tertera.",
                thankYou: "Terimakasih telah mempercayakan kesehatan anda pada kami.",
                signature: "Salam sehat,\nStaf HealthFlow"
            }
        },
        {
            id: 2, title: "Informasi layanan baru", type: "info", icon: "megaphone",
            snippet: "Sekarang kami membuat outlet baru di jakarta.",
            time: "2 menit yang lalu", read: false,
            details: {
                greeting: "", intro: "Kami senang mengumumkan bahwa kami sekarang membuat outlet baru di Jakarta untuk memberikan layanan yang lebih dekat kepada Anda.",
                body: "Outlet baru kami yang terletak di Jakarta Pusat dilengkapi dengan fasilitas medis modern terlengkap dan tim dokter spesialis yang handal. Kami berkomitmen untuk selalu memberikan pelayanan kesehatan terbaik bagi Anda dan keluarga.",
                thankYou: "Terimakasih telah mempercayakan kesehatan anda pada kami.",
                signature: "Salam sehat,\nStaf HealthFlow"
            }
        },
        {
            id: 3, title: "Perbaharui pin anda", type: "security", icon: "shield",
            snippet: "Pin yang anda gunakan telah terlalu lama terpakai.",
            time: "2 menit yang lalu", read: false,
            details: {
                greeting: "", intro: "Keamanan akun Anda adalah prioritas kami. Kami mendeteksi bahwa PIN Anda sudah cukup lama tidak diperbarui:",
                body: "Untuk mencegah hal-hal yang tidak diinginkan dan menjaga kerahasiaan rekam medis Anda, harap perbarui PIN transaksi/akses Anda secara berkala melalui menu Pengaturan Profil.",
                thankYou: "Terimakasih telah menjaga keamanan akun Anda bersama kami.",
                signature: "Salam sehat,\nStaf HealthFlow"
            }
        },
        {
            id: 4, title: "Informasi layanan baru", type: "info", icon: "megaphone",
            snippet: "Sekarang kami membuat outlet baru di jakarta.",
            time: "2 menit yang lalu", read: false,
            details: {
                greeting: "", intro: "Kami senang mengumumkan bahwa kami sekarang membuat outlet baru di Jakarta untuk memberikan layanan yang lebih dekat kepada Anda.",
                body: "Outlet baru kami yang terletak di Jakarta Pusat dilengkapi dengan fasilitas medis modern terlengkap dan tim dokter spesialis yang handal.",
                thankYou: "Terimakasih telah mempercayakan kesehatan anda pada kami.",
                signature: "Salam sehat,\nStaf HealthFlow"
            }
        },
        {
            id: 5, title: "Pengingat janji temu", type: "appointment", icon: "calendar",
            snippet: "Jangan lupa anda memiliki janji temu besok di jam 10:00, datang 10 menit lebih awal ya!",
            time: "2 menit yang lalu", read: true,
            details: {
                greeting: "", intro: "Kami ingin mengingatkan anda, bahwa anda memiliki janji temu pada:",
                appointment: { date: "27- Desember 2025", time: "14:00", doctor: "dr. Andipratama" },
                footer: "Kami mohon anda dapat hadir 15 menit sebelum waktu yang tertera.",
                thankYou: "Terimakasih telah mempercayakan kesehatan anda pada kami.",
                signature: "Salam sehat,\nStaf HealthFlow"
            }
        },
        {
            id: 6, title: "Informasi layanan baru", type: "info", icon: "megaphone",
            snippet: "Sekarang kami membuat outlet baru di jakarta.",
            time: "2 menit yang lalu", read: true,
            details: {
                greeting: "", intro: "Kami memiliki kabar baik tentang dibukanya layanan laboratorium terpadu di cabang utama kami.",
                body: "Layanan lab baru ini mencakup tes darah lengkap, tes urin, PCR express, serta screening kesehatan menyeluruh dengan hasil instan yang terintegrasi langsung ke aplikasi HealthFlow Anda.",
                thankYou: "Terimakasih telah mempercayakan kesehatan anda pada kami.",
                signature: "Salam sehat,\nStaf HealthFlow"
            }
        },
        {
            id: 7, title: "Pengingat janji temu", type: "appointment", icon: "calendar",
            snippet: "Jangan lupa anda memiliki janji temu besok di jam 10:00, datang 10 menit lebih awal ya!",
            time: "2 menit yang lalu", read: true,
            details: {
                greeting: "", intro: "Kami ingin mengingatkan anda, bahwa anda memiliki janji temu pada:",
                appointment: { date: "28- Desember 2025", time: "09:00", doctor: "dr. Siska Amelia" },
                footer: "Kami mohon anda dapat hadir 15 menit sebelum waktu yang tertera.",
                thankYou: "Terimakasih telah mempercayakan kesehatan anda pada kami.",
                signature: "Salam sehat,\nStaf HealthFlow"
            }
        },
        {
            id: 8, title: "Pengingat janji temu", type: "appointment", icon: "calendar",
            snippet: "Jangan lupa anda memiliki janji temu besok di jam 10:00, datang 10 menit lebih awal ya!",
            time: "2 menit yang lalu", read: true,
            details: {
                greeting: "", intro: "Kami ingin mengingatkan anda, bahwa anda memiliki janji temu pada:",
                appointment: { date: "29- Desember 2025", time: "11:00", doctor: "dr. Andipratama" },
                footer: "Kami mohon anda dapat hadir 15 menit sebelum waktu yang tertera.",
                thankYou: "Terimakasih telah mempercayakan kesehatan anda pada kami.",
                signature: "Salam sehat,\nStaf HealthFlow"
            }
        },
        {
            id: 9, title: "Pengingat janji temu", type: "appointment", icon: "calendar",
            snippet: "Jangan lupa anda memiliki janji temu besok di jam 10:00, datang 10 menit lebih awal ya!",
            time: "2 menit yang lalu", read: true,
            details: {
                greeting: "", intro: "Kami ingin mengingatkan anda, bahwa anda memiliki janji temu pada:",
                appointment: { date: "30- Desember 2025", time: "10:30", doctor: "dr. Budi Rahardjo" },
                footer: "Kami mohon anda dapat hadir 15 menit sebelum waktu yang tertera.",
                thankYou: "Terimakasih telah mempercayakan kesehatan anda pada kami.",
                signature: "Salam sehat,\nStaf HealthFlow"
            }
        }
    ];

    // =====================================================================
    //  DATA STATIS DEFAULT — KONTAK DARURAT
    // =====================================================================
    const defaultEmergencyContacts = [
        {
            id: 1,
            nama: "Siti Nurhaliza (Istri)",
            nomor: "0866-2760-8767",
            avatar: "./assets/contact_siti.png",
            isUtama: true
        },
        {
            id: 2,
            nama: "M. Ahmad (Ayah)",
            nomor: "0836-2722-8860",
            avatar: "./assets/contact_ahmad.png",
            isUtama: false
        }
    ];

    // =====================================================================
    //  DATA STATIS DEFAULT — DAFTAR NAMA PASIEN
    // =====================================================================
    const defaultPatients = [
        "Ahmad Fauzi", "Budi Santoso", "Candra Wijaya", "Dewi Lestari",
        "Eka Rahmawati", "Fajar Nugroho", "Gita Permata", "Hendra Saputra",
        "Indah Cahyani", "Joko Susilo"
    ];

    // =====================================================================
    //  HELPER: localStorage read/write dengan fallback
    // =====================================================================
    function _getLS(key, fallback) {
        try {
            const data = localStorage.getItem(key);
            if (data) {
                const parsed = JSON.parse(data);
                if (key === LS_KEYS.currentUser && parsed && !parsed.password && fallback && fallback.password) {
                    parsed.password = fallback.password;
                    localStorage.setItem(key, JSON.stringify(parsed));
                }
                return parsed;
            }
            return fallback;
        } catch (e) {
            return fallback;
        }
    }

    function _setLS(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.warn('localStorage write error:', e);
        }
    }

    // =====================================================================
    //  PUBLIC API
    // =====================================================================
    return {
        // -------- Data Statis --------
        clinics,
        kabupatenByProvinsi,
        branches,
        roomClasses,
        tickets,
        visits,

        // -------- User (dinamis — localStorage) --------
        getCurrentUser() {
            return _getLS(LS_KEYS.currentUser, DEFAULT_USER);
        },

        saveUser(userData) {
            const current = this.getCurrentUser();
            const merged = { ...current, ...userData };
            _setLS(LS_KEYS.currentUser, merged);
            return merged;
        },

        isLoggedIn() {
            return localStorage.getItem(LS_KEYS.isLoggedIn) === 'true';
        },

        setLoggedIn(val) {
            localStorage.setItem(LS_KEYS.isLoggedIn, val ? 'true' : 'false');
        },

        logout() {
            localStorage.removeItem(LS_KEYS.isLoggedIn);
            // Jangan hapus currentUser supaya data tetap ada saat login ulang
        },

        // -------- Patients (dinamis — localStorage) --------
        getPatients() {
            const stored = _getLS(LS_KEYS.patients, null);
            if (stored) return stored;

            // Default: gabungkan default patients + nama user saat ini
            const user = this.getCurrentUser();
            const all = [...defaultPatients];
            if (user.nama && !all.includes(user.nama)) {
                all.unshift(user.nama);
            }
            return all;
        },

        addPatient(nama) {
            const patients = this.getPatients();
            if (!patients.includes(nama)) {
                patients.unshift(nama);
                _setLS(LS_KEYS.patients, patients);
            }
        },

        // -------- Emergency Contacts (dinamis — localStorage) --------
        getEmergencyContacts() {
            return _getLS(LS_KEYS.emergencyContacts, defaultEmergencyContacts);
        },

        saveEmergencyContacts(contacts) {
            _setLS(LS_KEYS.emergencyContacts, contacts);
        },

        // -------- Notifications (dinamis — localStorage) --------
        getNotifications() {
            const stored = _getLS(LS_KEYS.notifications, null);
            if (stored) return stored;

            // Pertama kali: inject greeting dengan nama user
            const user = this.getCurrentUser();
            const notifs = JSON.parse(JSON.stringify(defaultNotifications));
            notifs.forEach(n => {
                if (n.details) {
                    n.details.greeting = `halo ${user.nama},`;
                }
            });
            return notifs;
        },

        saveNotifications(notifications) {
            _setLS(LS_KEYS.notifications, notifications);
        },

        // -------- Maps URL --------
        mapsUrl: "https://maps.app.goo.gl/tfRRr7opJ2cHYkR46",
    };
})();
