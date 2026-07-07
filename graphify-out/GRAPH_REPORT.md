# Graph Report - .  (2026-07-07)

## Corpus Check
- 40 files · ~358,668 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 57 nodes · 134 edges · 18 communities (11 shown, 7 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Homepage and Landing Assets|Homepage and Landing Assets]]
- [[_COMMUNITY_Notification Center Logic|Notification Center Logic]]
- [[_COMMUNITY_Core Navigation and Patient Flow|Core Navigation and Patient Flow]]
- [[_COMMUNITY_Patient Profile and Support Pages|Patient Profile and Support Pages]]
- [[_COMMUNITY_Verification and Global Styling|Verification and Global Styling]]
- [[_COMMUNITY_Medical Records Management|Medical Records Management]]
- [[_COMMUNITY_Project Design Guidelines (AGENTS.md)|Project Design Guidelines (AGENTS.md)]]
- [[_COMMUNITY_Authentication Interface Assets|Authentication Interface Assets]]
- [[_COMMUNITY_Contact Ahmad Image Asset|Contact Ahmad Image Asset]]
- [[_COMMUNITY_Contact Form Illustration Asset|Contact Form Illustration Asset]]
- [[_COMMUNITY_Contact Siti Image Asset|Contact Siti Image Asset]]
- [[_COMMUNITY_Project Readme Documentation|Project Readme Documentation]]

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
- `Profil Pasien` --references--> `Hospital Logo Asset`  [EXTRACTED]
  pages/profil/index.html → public/LOGO.svg

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Patient Registration Flow** — pendaftaran_index, pendaftaran_menghubungiserver, ticket_index [INFERRED 0.95]
- **User Profile Verification Flow** — profil_index, verifikasiemail_index, verifikasinomor_index [INFERRED 0.95]

## Communities (18 total, 7 thin omitted)

### Community 0 - "Homepage and Landing Assets"
Cohesion: 0.30
Nodes (11): Hero Carousel Image 1, Hero Carousel Image 2, Hero Carousel Image 3, Hero Carousel Image 4, Hero Carousel Image 5, Hero Carousel Image 6, Pendaftaran Pasien - HealthFlow Clinic, Image Asset: header images.png (+3 more)

### Community 1 - "Notification Center Logic"
Cohesion: 0.42
Nodes (10): deleteCurrentNotification(), getFilteredNotifications(), loadNotificationDetails(), markCurrentAsRead(), notificationsData, renderFilters(), renderNotificationList(), selectNotification() (+2 more)

### Community 2 - "Core Navigation and Patient Flow"
Cohesion: 0.76
Nodes (5): Hospital Logo Asset, Lokasi Klinik, Notifikasi - HealthFlow Clinic, Pendaftaran, Tiket Reservasi - HealthFlow

### Community 3 - "Patient Profile and Support Pages"
Cohesion: 0.40
Nodes (5): Clinic Banner Image, Image Asset: Contact Us.svg, Image Asset: files_and_doc.svg, User Profile Default Avatar, Profil Pasien

### Community 4 - "Verification and Global Styling"
Cohesion: 0.53
Nodes (4): Image Asset: icon untuk verifikasi.svg, Document, Ubah Email - HealthFlow, Ubah Nomor Telepon - HealthFlow

## Knowledge Gaps
- **10 isolated node(s):** `notificationsData`, `Login Background Graphic`, `Image Asset: Contact Us.svg`, `Clinic Banner Image`, `Image Asset: contact_ahmad.png` (+5 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Notifikasi - HealthFlow Clinic` connect `Core Navigation and Patient Flow` to `Homepage and Landing Assets`, `Notification Center Logic`, `Patient Profile and Support Pages`, `Verification and Global Styling`, `Medical Records Management`?**
  _High betweenness centrality (0.250) - this node is a cross-community bridge._
- **Why does `HealthFlow Clinic` connect `Homepage and Landing Assets` to `Core Navigation and Patient Flow`, `Patient Profile and Support Pages`, `Verification and Global Styling`, `Medical Records Management`?**
  _High betweenness centrality (0.212) - this node is a cross-community bridge._
- **Why does `Profil Pasien` connect `Patient Profile and Support Pages` to `Homepage and Landing Assets`, `Core Navigation and Patient Flow`, `Verification and Global Styling`, `Medical Records Management`?**
  _High betweenness centrality (0.126) - this node is a cross-community bridge._
- **What connects `notificationsData`, `Login Background Graphic`, `Image Asset: Contact Us.svg` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._