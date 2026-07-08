# Graph Report - TR  (2026-07-08)

## Corpus Check
- 13 files · ~394,010 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 137 nodes · 209 edges · 20 communities (13 shown, 7 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `9847f992`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]

## God Nodes (most connected - your core abstractions)
1. `HealthFlow Clinic` - 24 edges
2. `Profil Pasien` - 19 edges
3. `Rekam Medis Pasien` - 15 edges
4. `Lokasi Klinik` - 14 edges
5. `Pendaftaran` - 14 edges
6. `HealthFlow Clinic` - 12 edges
7. `Hospital Logo Asset` - 11 edges
8. `Ubah Email - HealthFlow` - 10 edges
9. `Ubah Nomor Telepon - HealthFlow` - 10 edges
10. `Notifikasi - HealthFlow Clinic` - 9 edges

## Surprising Connections (you probably didn't know these)
- `HealthFlow Clinic` --references--> `User Profile Default Avatar`  [EXTRACTED]
  index.html → pages/profil/assets/profile_avatar.png
- `Pendaftaran Pasien - HealthFlow Clinic` --references--> `Hospital Logo Asset`  [EXTRACTED]
  pages/daftar_login/index.html → public/LOGO.svg
- `HealthFlow Clinic` --references--> `Hospital Logo Asset`  [EXTRACTED]
  index.html → public/LOGO.svg
- `HealthFlow Clinic` --references--> `Hospital Logo Asset`  [EXTRACTED]
  index_notLogin.html → public/LOGO.svg
- `Ubah Email - HealthFlow` --references--> `Image Asset: icon untuk verifikasi.svg`  [EXTRACTED]
  pages/profil/verifikasiEmail/index.html → public/icon untuk verifikasi.svg

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Patient Registration Flow** — pendaftaran_index, pendaftaran_menghubungiserver, ticket_index [INFERRED 0.95]
- **User Profile Verification Flow** — profil_index, verifikasiemail_index, verifikasinomor_index [INFERRED 0.95]

## Communities (20 total, 7 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.27
Nodes (12): User Profile Default Avatar, Hero Carousel Image 1, Hero Carousel Image 2, Hero Carousel Image 3, Hero Carousel Image 4, Hero Carousel Image 5, Hero Carousel Image 6, Pendaftaran Pasien - HealthFlow Clinic (+4 more)

### Community 1 - "Community 1"
Cohesion: 0.49
Nodes (9): deleteCurrentNotification(), getFilteredNotifications(), loadNotificationDetails(), markCurrentAsRead(), renderFilters(), renderNotificationList(), selectNotification(), setFilter() (+1 more)

### Community 2 - "Community 2"
Cohesion: 0.35
Nodes (14): Clinic Banner Image, Image Asset: Contact Us.svg, Image Asset: files_and_doc.svg, Image Asset: icon untuk verifikasi.svg, Hospital Logo Asset, Lokasi Klinik, Notifikasi - HealthFlow Clinic, Pendaftaran (+6 more)

### Community 3 - "Community 3"
Cohesion: 0.04
Nodes (37): calendarGrid, calendarMonth, calendarViewDate, calendarWeekdays, cancelScheduleBtn, closeQrBtn, continueScheduleBtn, detailAbout (+29 more)

### Community 6 - "Community 6"
Cohesion: 0.29
Nodes (6): CAUTION, Knowledge Graph (Graphify) — Wajib Selalu Update, PLEASE DO, RULES OF DESIGN, Sebelum kerja, YOU'R TASK

### Community 13 - "Community 13"
Cohesion: 0.12
Nodes (15): 1. Kenapa Perlu Struktur Folder?, 2. Struktur Folder Lengkap, 3.1 Istilah Dasar, 3.2 Membuat Branch Baru, 3.3 Menyimpan & Mengirim Perubahan, 3.4 Mengambil Perubahan Terbaru dari `main` ke Branch Kamu, 3.5 Menggabungkan Branch Kamu ke `main` (Setelah Fitur Selesai), 3.6 Cheat Sheet Ringkas (+7 more)

## Knowledge Gaps
- **62 isolated node(s):** `doctors`, `calendarViewDate`, `doctorGrid`, `emptyState`, `poliFilter` (+57 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Notifikasi - HealthFlow Clinic` connect `Community 2` to `Community 0`, `Community 1`?**
  _High betweenness centrality (0.038) - this node is a cross-community bridge._
- **Why does `HealthFlow Clinic` connect `Community 0` to `Community 2`?**
  _High betweenness centrality (0.035) - this node is a cross-community bridge._
- **Why does `Profil Pasien` connect `Community 2` to `Community 0`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **What connects `doctors`, `calendarViewDate`, `doctorGrid` to the rest of the system?**
  _62 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.0425531914893617 - nodes in this community are weakly interconnected._
- **Should `Community 13` be split into smaller, more focused modules?**
  _Cohesion score 0.125 - nodes in this community are weakly interconnected._