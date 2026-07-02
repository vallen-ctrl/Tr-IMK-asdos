# 📁 Panduan Struktur Proyek & Git

Dokumen ini dibuat supaya kamu (terutama yang baru belajar HTML) bisa paham **kenapa** foldernya disusun seperti ini, bukan cuma **apa** susunannya. Baca pelan-pelan, nggak perlu buru-buru 🙂

---

## 1. Kenapa Perlu Struktur Folder?

Bayangin kamu lagi bikin website dengan banyak halaman: Home, About, Contact, dll. Kalau semua file (HTML, CSS, JS, gambar) ditaruh campur aduk di satu folder, lama-lama kamu bakal bingung sendiri mana punya siapa.

Solusinya: **satu folder untuk satu halaman**, dan **satu folder untuk hal-hal yang dipakai bersama** (seperti logo, font, warna tema). Itulah inti dari struktur di bawah ini.

---

## 2. Struktur Folder Lengkap

```
TR/
│
├── index.html              ← Halaman utama / pintu masuk website
│
├── Pages/                  ← Kumpulan semua halaman selain halaman utama
│   ├── about/
│   │   ├── images/
│   │   ├── index.html
│   │   ├── about.css
│   │   └── about.js
│   │
│   └── contact/
│       ├── images/
│       ├── index.html
│       ├── contact.css
│       └── contact.js
│
└── Public/                  ← Hal-hal yang dipakai BERSAMA oleh semua halaman
    ├── Images/
    └── global.css
```

### Penjelasan tiap bagian

| Folder / File | Fungsinya | Analogi sederhana |
|---|---|---|
| `TR/` | Folder utama proyekmu (nama boleh kamu ganti sesuai nama proyek) | Ini "rumah"-nya |
| `index.html` (di root) | Halaman pertama yang dibuka orang saat masuk website (misalnya halaman Home) | Pintu depan rumah |
| `Pages/` | Tempat menyimpan semua halaman **selain** halaman utama | Kamar-kamar di dalam rumah |
| `Pages/namaPages/` | Satu folder = satu halaman. Contoh: `Pages/about/`, `Pages/contact/` | Satu kamar = satu fungsi (kamar tidur, dapur, dst) |
| `Pages/namaPages/index.html` | File HTML utama untuk halaman itu | Isi kamarnya |
| `Pages/namaPages/namapages.css` | CSS khusus untuk halaman itu saja | Dekorasi khusus kamar itu |
| `Pages/namaPages/namapages.js` | JavaScript khusus untuk halaman itu saja | "Alat elektronik" khusus kamar itu |
| `Pages/namaPages/images/` | Gambar yang **hanya** dipakai di halaman itu | Barang pribadi yang cuma ada di kamar itu |
| `Public/` | Isinya hal-hal yang dipakai di **banyak/semua halaman** | Ruang tamu / dapur bersama |
| `Public/Images/` | Gambar yang dipakai bersama, misalnya logo, background, icon | Barang yang boleh dipakai semua orang di rumah |
| `Public/global.css` | CSS umum: warna dasar, font, style tombol, dll yang berlaku di semua halaman | "Aturan rumah" yang berlaku di semua kamar |

### 💡 Aturan sederhana biar nggak bingung

> Kalau file itu **cuma dipakai satu halaman** → taruh di dalam folder `Pages/namaPages/`.
> Kalau file itu **dipakai lebih dari satu halaman** → taruh di `Public/`.

### Contoh penggunaan di HTML

Di dalam `Pages/about/index.html`, kamu akan memanggil file-file seperti ini:

```html
<!-- CSS global (berlaku di semua halaman) -->
<link rel="stylesheet" href="../../Public/global.css">

<!-- CSS khusus halaman about -->
<link rel="stylesheet" href="about.css">

<!-- Gambar yang dipakai bersama -->
<img src="../../Public/Images/logo.png" alt="Logo">

<!-- Gambar khusus halaman about -->
<img src="images/foto-tim.jpg" alt="Foto Tim">

<!-- JS khusus halaman about -->
<script src="about.js"></script>
```

`../../` artinya "naik 2 folder ke atas" — dari `Pages/about/` naik ke `Pages/` lalu naik lagi ke `TR/`, baru masuk ke `Public/`.

---

## 3. Panduan Git untuk Kerja Tim

Git dipakai supaya kamu dan teman-teman satu tim bisa mengerjakan bagian yang berbeda **secara bersamaan** tanpa saling menimpa pekerjaan orang lain. Caranya: setiap orang kerja di **branch** (cabang) sendiri, baru nanti digabung ke `main`.

### 3.1 Istilah Dasar

| Istilah | Artinya |
|---|---|
| `main` | Branch utama, isinya kode yang sudah "final"/stabil |
| `branch` | Cabang/salinan kode tempat kamu bereksperimen tanpa mengganggu `main` |
| `commit` | "Menyimpan" perubahan dengan catatan (seperti save game + catatan apa yang berubah) |
| `push` | Mengirim commit dari komputermu ke GitHub |
| `pull` | Mengambil update terbaru dari GitHub ke komputermu |
| `merge` | Menggabungkan isi satu branch ke branch lain |

### 3.2 Membuat Branch Baru

Sebelum mulai kerja fitur baru (misalnya bikin halaman "Contact"), buat branch baru dulu:

```bash
# Pastikan kamu ada di branch main dan sudah paling update
git checkout main
git pull origin main

# Buat branch baru dan langsung pindah ke sana
git checkout -b fitur/halaman-contact
```

> Penamaan branch bebas, tapi biar rapi biasanya pakai format `fitur/nama-fitur` atau `fix/nama-bug`.

Cek branch apa saja yang ada dan kamu sedang ada di branch mana:

```bash
git branch
```

### 3.3 Menyimpan & Mengirim Perubahan

```bash
# Lihat file apa saja yang berubah
git status

# Tambahkan file yang mau disimpan
git add .

# Simpan dengan pesan yang jelas
git commit -m "Tambah halaman contact dengan form"

# Kirim ke GitHub (pertama kali pakai -u supaya branch-nya "tersambung")
git push -u origin fitur/halaman-contact
```

Setelah ini, push berikutnya cukup pakai `git push`.

### 3.4 Mengambil Perubahan Terbaru dari `main` ke Branch Kamu

Ini bagian yang sering bikin bingung tapi **penting**. Kalau teman kamu sudah menggabungkan (merge) kode mereka ke `main`, sedangkan kamu masih kerja di branch sendiri, branch kamu akan **ketinggalan**. Supaya branch kamu tetap update dan nggak bentrok parah saat nanti digabung, lakukan ini secara berkala:

```bash
# 1. Simpan dulu (commit) pekerjaanmu yang sedang berjalan
git add .
git commit -m "progress: sedang kerja form contact"

# 2. Pindah ke main, ambil update terbaru
git checkout main
git pull origin main

# 3. Kembali ke branch kamu
git checkout fitur/halaman-contact

# 4. Gabungkan (merge) update dari main ke branch kamu
git merge main
```

Kalau tidak ada konflik, Git otomatis menggabungkan dan kamu tinggal lanjut kerja.

#### Kalau muncul konflik ("merge conflict")

Ini normal, bukan error yang fatal. Artinya ada file yang diubah di dua tempat berbeda pada baris yang sama. Git akan menandai bagian yang bentrok seperti ini di file yang bermasalah:

```
<<<<<<< HEAD
kode versi branch kamu
=======
kode versi dari main
>>>>>>> main
```

Langkah menyelesaikannya:
1. Buka file yang konflik, cari tanda `<<<<<<<`, `=======`, `>>>>>>>`
2. Putuskan mana yang mau dipakai (boleh gabungan keduanya), lalu **hapus tanda-tanda tersebut**
3. Simpan file
4. Jalankan:
   ```bash
   git add .
   git commit -m "Selesaikan konflik merge dengan main"
   ```
5. Lanjut kerja seperti biasa, lalu `git push`

> 💡 Alternatif dari `git merge main` adalah `git rebase main`, hasilnya history lebih rapi. Tapi untuk pemula, **pakai `merge` dulu saja** — lebih gampang dipahami dan lebih aman.

### 3.5 Menggabungkan Branch Kamu ke `main` (Setelah Fitur Selesai)

Cara paling aman adalah lewat **Pull Request (PR)** di GitHub, bukan merge manual dari komputer:

1. Push branch kamu ke GitHub (`git push`)
2. Buka repo di GitHub → akan muncul tombol **"Compare & pull request"**
3. Isi judul & deskripsi singkat tentang apa yang kamu kerjakan
4. Minta teman satu tim untuk review (kalau ada aturan review)
5. Klik **Merge pull request**

Kenapa lewat PR dan bukan `git merge` manual ke `main`? Supaya ada jejak siapa mengerjakan apa, dan teman lain bisa cek dulu sebelum masuk ke `main`.

### 3.6 Cheat Sheet Ringkas

```bash
git checkout main               # pindah ke branch main
git pull origin main            # ambil update terbaru dari GitHub
git checkout -b nama-branch     # buat branch baru & pindah ke sana
git status                      # lihat perubahan
git add .                       # tandai semua perubahan untuk disimpan
git commit -m "pesan"           # simpan perubahan
git push -u origin nama-branch  # kirim branch baru ke GitHub (pertama kali)
git push                        # kirim update selanjutnya
git merge main                  # gabungkan update main ke branch saat ini
git branch                      # lihat daftar branch
git log --oneline               # lihat riwayat commit secara ringkas
```

### 3.7 Tips Biar Kerja Tim Lancar

- ✅ **Selalu `git pull origin main` sebelum mulai kerja di pagi hari / sesi baru** — supaya nggak kerja dari kode yang basi
- ✅ Satu branch untuk satu fitur/halaman, jangan digabung-gabung
- ✅ Commit sesering mungkin dengan pesan yang jelas (`"Tambah tombol submit"` lebih baik daripada `"update"`)
- ✅ Sebelum bikin Pull Request, `merge main` dulu ke branch kamu supaya konfliknya kamu selesaikan sendiri, bukan nyusahin orang lain
- ❌ Jangan langsung kerja di branch `main` — selalu buat branch baru dulu

---

Kalau ada bagian yang masih membingungkan, coba praktikkan langsung sambil baca ulang bagian yang relevan — Git itu jauh lebih gampang dipahami lewat praktik daripada cuma dibaca 🚀