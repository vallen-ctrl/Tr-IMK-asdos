# YOU'R TASK
tugas anda adalah membantu saya dalam membuat design website 
bantu saya dalam html css dan js. buat design website tersebut semirip mungkin dengan 
gambar yang telah dikirimkan. saya di sini menggunakan tailwind css dan juga lucide icon untuk icon yang akan digunakan pada semua hal yang ada di sini https://lucide.dev/icons

# CAUTION
Selalu gunakan public\global.css sebagai global css yang nantinya akan membantu dalam 
perubahan ukuran text. lalu pages\pendaftaranPasienBaru\PendaftaranPasienBaru.css untuk beberapa komponen yang bisa anda tiru. 

Ingat selalu gunakan flex dibandingkan grid. 

## Knowledge Graph (Graphify) — Wajib Selalu Update

Project ini pakai Graphify buat knowledge graph di `graphify-out/`. Ikuti aturan ini:

### Sebelum kerja
- Jangan langsung grep/baca banyak file. Cek dulu:
  - `graphify-out/GRAPH_REPORT.md` untuk pertanyaan arsitektur/struktur besar
  - `graphify query "<pertanyaan>"` untuk pertanyaan spesifik
  - `graphify explain "<nama>"` untuk detail satu fungsi/komponen
  - `graphify path "<A>" "<B>"` untuk cari hubungan antar 2 bagian
- Baca file mentah HANYA kalau graph gak punya jawabannya.

### Setelah kerja (WAJIB)
Setiap selesai membuat, mengedit, menghapus, atau me-rename file apa pun di project ini
(termasuk kode, dokumen, config), jalankan ini SEBELUM menganggap tugas selesai:

    graphify . --update

Ini update incremental (cache-based), cuma re-extract file yang berubah — murah dan cepat,
jangan skip langkah ini walau perubahannya kecil.

Kalau perubahannya besar (refactor struktur, pindah banyak file), jalankan cluster ulang:

    graphify . --cluster-only

### Aturan tambahan
- Jangan pernah menganggap graph "sudah cukup update" tanpa benar-benar menjalankan `--update`.
- Kalau `graphify . --update` gagal atau error, laporkan ke user, jangan diam-diam skip.

# PLEASE DO
Anda harus membuat folder untuk setiap pages yang diminta di folder pages dengan nama perfoldernya menyesuaikan minat dari saya, jika saya tidak memberikan nama dari folder tersebut anda harus menanyakannya. setelahnya proses koding anda harus 
membuat setiap elemen itu responsive dengan tampilan.

# RULES OF DESIGN 
untuk jarak antar text dengan sebuah elemen maka anda bisa menggunakan kelipatan 4 dengan minimal 4.
dan untuk jarak antar elemen anda bisa menggunakan kelipatan 8  dengan minimal 8.

untuk penulisan tiap kata gunakan yang sudah ada di global css

// bagian ini untuk header dari sebuah elemnt atau text
.headerText{ 
    font-size: var(--lg-font-size-header);
    font-family: 'inter';
}

// lalu bagian ini unutk body atau sub header 
.subheaderText{
    font-size: var(--lg-font-size-subheaderText);
}

// untuk bagian ini adalah footer dari sebuah text
.footerText{
    font-size: var(--lg-font-size-footerText);
}

namun ada beberapa elemen yang keluar dari ukuran tersebut. nah jika begitu anda harus menggunakan tailwind class. jadi anda tidak boleh menuliskannya di dalam css yang anda buat. jadi misal ada ukuran 40px maka gunakan tailwind text-[40px].

Untuk logo dari design ini anda bisa jumpai di D:\TUGAS KULIAH SEM 2\IMK\Asdos\TR\public\LOGO.svg karna menggunakan svg anda tinggal menaruhnya. 