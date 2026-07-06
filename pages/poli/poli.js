/* =========================================================
   Poli - Pendaftaran & Pilih Dokter
   Data dokter, filter poli, modal detail, dan modal jadwal janji temu
   ========================================================= */

// ---------- 1. DATA DOKTER ----------
// Ganti "photo" dengan path foto asli di folder /poli/images/ (mis. "images/dr-ruben.jpg")
// Jika foto tidak tersedia / gagal dimuat, akan otomatis fallback ke placeholder abu-abu.
const DEFAULT_AVATAR = "images/default-avatar.svg";

const doctors = [
  {
    id: "ruben",
    name: "dr. Ruben",
    fullName: "dr. Ruben Syema Ben Yonatan, Sp.PD.",
    title: "Sp. PD",
    poli: "penyakit-dalam",
    specialization: "Spesialis Penyakit Dalam",
    about: "dr. Ruben Syema Ben Yonatan, Sp.PD berpengalaman dalam menangani keluhan kesehatan organ dalam secara komprehensif. Beliau selalu mengedepankan pendekatan yang ramah dan edukatif bagi setiap pasien.",
    schedule: { weekday: "08.00 - 16.00", saturday: "08.00 - 12.00", sunday: "Tutup" },
    photo: "images/dr-ruben.jpg"
  },
  {
    id: "vallen",
    name: "dr. Vallen",
    fullName: "dr. Vallen Adi Pratama, Sp.KJ.",
    title: "Sp. KJ",
    poli: "psikologi",
    specialization: "Spesialis Kedokteran Jiwa",
    about: "dr. Vallen Adi Pratama, Sp.KJ berfokus pada penanganan kesehatan mental pasien dengan pendekatan yang hangat, suportif, dan berbasis bukti ilmiah.",
    schedule: { weekday: "09.00 - 17.00", saturday: "09.00 - 13.00", sunday: "Tutup" },
    photo: "images/dr-vallen.jpg"
  },
  {
    id: "kezia",
    name: "dr. Kezia",
    fullName: "dr. Kezia Amelinda, S.Ked.",
    title: "Umum",
    poli: "umum",
    specialization: "Dokter Umum",
    about: "dr. Kezia Amelinda menangani pemeriksaan kesehatan umum dan lansia dengan komunikasi yang jelas dan mudah dipahami oleh pasien dari segala usia.",
    schedule: { weekday: "08.00 - 15.00", saturday: "08.00 - 12.00", sunday: "Tutup" },
    photo: "images/dr-kezia.jpg"
  },
  {
    id: "cecep",
    name: "dr. Cecep",
    fullName: "dr. Cecep Firmansyah, S.Ked.",
    title: "Umum",
    poli: "umum",
    specialization: "Dokter Umum",
    about: "dr. Cecep Firmansyah berpengalaman menangani pasien umum dan lansia dengan pendekatan pemeriksaan yang teliti dan penuh perhatian.",
    schedule: { weekday: "08.00 - 15.00", saturday: "08.00 - 12.00", sunday: "Tutup" },
    photo: "images/dr-cecep.jpg"
  },
  {
    id: "mamat",
    name: "dr. Mamat",
    fullName: "dr. Mamat Suryana, Sp.PD.",
    title: "Sp. PD",
    poli: "penyakit-dalam",
    specialization: "Spesialis Penyakit Dalam",
    about: "dr. Mamat Suryana, Sp.PD berpengalaman menangani berbagai keluhan penyakit dalam dengan pendekatan diagnosis yang cermat dan menyeluruh.",
    schedule: { weekday: "08.00 - 16.00", saturday: "08.00 - 12.00", sunday: "Tutup" },
    photo: "images/dr-mamat.jpg"
  },
  {
    id: "supri",
    name: "dr. Supri",
    fullName: "dr. Supriyanto, Sp.KJ.",
    title: "Sp. KJ",
    poli: "psikologi",
    specialization: "Spesialis Kedokteran Jiwa",
    about: "dr. Supriyanto, Sp.KJ membantu pasien mengelola kesehatan mental dengan pendekatan konseling yang tenang dan tidak menghakimi.",
    schedule: { weekday: "09.00 - 17.00", saturday: "09.00 - 13.00", sunday: "Tutup" },
    photo: "images/dr-supri.jpg"
  },
  {
    id: "memet",
    name: "dr. Memet",
    fullName: "dr. Memet Slamet, Sp.KJ.",
    title: "Sp. KJ",
    poli: "psikologi",
    specialization: "Spesialis Kedokteran Jiwa",
    about: "dr. Memet Slamet, Sp.KJ berpengalaman dalam terapi dan konsultasi kesehatan jiwa untuk pasien dewasa maupun remaja.",
    schedule: { weekday: "09.00 - 17.00", saturday: "09.00 - 13.00", sunday: "Tutup" },
    photo: "images/dr-memet.jpg"
  },
  {
    id: "satria",
    name: "dr. Satria",
    fullName: "dr. Satria Wibawa, Sp.PD.",
    title: "Sp. PD",
    poli: "penyakit-dalam",
    specialization: "Spesialis Penyakit Dalam",
    about: "dr. Satria Wibawa, Sp.PD menangani keluhan penyakit dalam dengan pendekatan pengobatan yang personal sesuai kondisi tiap pasien.",
    schedule: { weekday: "08.00 - 16.00", saturday: "08.00 - 12.00", sunday: "Tutup" },
    photo: "images/dr-satria.jpg"
  }
];

// ---------- 2. STATE ----------
let currentPoliFilter = "semua";
let activeDoctor = null;
let calendarViewDate = new Date();
let selectedDate = null;
let selectedTime = null;

// ---------- 3. ELEMENT REFERENCES ----------
const doctorGrid = document.getElementById("doctorGrid");
const emptyState = document.getElementById("emptyState");
const poliFilter = document.getElementById("poliFilter");

const detailModalOverlay = document.getElementById("detailModalOverlay");
const detailBackBtn = document.getElementById("detailBackBtn");
const detailPhoto = document.getElementById("detailPhoto");
const detailName = document.getElementById("detailName");
const detailSpecialization = document.getElementById("detailSpecialization");
const detailAbout = document.getElementById("detailAbout");
const scheduleWeekday = document.getElementById("scheduleWeekday");
const scheduleSaturday = document.getElementById("scheduleSaturday");
const scheduleSunday = document.getElementById("scheduleSunday");
const makeAppointmentBtn = document.getElementById("makeAppointmentBtn");

const scheduleModalOverlay = document.getElementById("scheduleModalOverlay");
const scheduleBackBtn = document.getElementById("scheduleBackBtn");
const scheduleDoctorPhoto = document.getElementById("scheduleDoctorPhoto");
const scheduleDoctorName = document.getElementById("scheduleDoctorName");
const scheduleDoctorSpec = document.getElementById("scheduleDoctorSpec");
const calendarMonth = document.getElementById("calendarMonth");
const calendarWeekdays = document.getElementById("calendarWeekdays");
const calendarGrid = document.getElementById("calendarGrid");
const timeGrid = document.getElementById("timeGrid");
const cancelScheduleBtn = document.getElementById("cancelScheduleBtn");
const continueScheduleBtn = document.getElementById("continueScheduleBtn");

const toast = document.getElementById("toast");

const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const WEEKDAY_NAMES = ["Su","Mo","Tu","We","Th","Fr","Sa"];
const TIME_SLOTS = ["08.00","09.00","10.00","11.00","13.00","14.00","15.00","16.00"];

// ---------- 4. RENDER DOCTOR CARDS ----------
function renderDoctors(){
  const filtered = currentPoliFilter === "semua"
    ? doctors
    : doctors.filter(doc => doc.poli === currentPoliFilter);

  doctorGrid.innerHTML = "";

  if (filtered.length === 0){
    emptyState.hidden = false;
    return;
  }
  emptyState.hidden = true;

  filtered.forEach(doc => {
    const card = document.createElement("article");
    card.className = "doctor-card";

    card.innerHTML = `
      <div class="doctor-photo-wrap">
        <img src="${doc.photo}" alt="Foto ${doc.name}"
             onerror="this.onerror=null;this.src='${DEFAULT_AVATAR}';this.parentElement.classList.add('no-photo');">
      </div>
      <div class="doctor-info">
        <p class="doctor-name">${doc.name}</p>
        <p class="doctor-title footerText">${doc.title}</p>
        <button type="button" class="btn-detail" data-id="${doc.id}">Lihat Detail</button>
      </div>
    `;

    doctorGrid.appendChild(card);
  });

  // Attach listeners to the newly created "Lihat Detail" buttons
  doctorGrid.querySelectorAll(".btn-detail").forEach(btn => {
    btn.addEventListener("click", () => openDetailModal(btn.dataset.id));
  });
}

// ---------- 5. FILTER POLI ----------
poliFilter.addEventListener("click", (e) => {
  const btn = e.target.closest(".poli-btn");
  if (!btn) return;

  poliFilter.querySelectorAll(".poli-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");

  currentPoliFilter = btn.dataset.poli;
  renderDoctors();
});

// ---------- 6. MODAL DETAIL DOKTER ----------
function openDetailModal(id){
  const doc = doctors.find(d => d.id === id);
  if (!doc) return;

  activeDoctor = doc;

  detailPhoto.src = doc.photo;
  detailPhoto.alt = `Foto ${doc.name}`;
  detailPhoto.onerror = function(){
    this.onerror = null;
    this.src = DEFAULT_AVATAR;
  };

  detailName.textContent = doc.fullName;
  detailSpecialization.textContent = doc.specialization;
  detailAbout.textContent = doc.about;
  scheduleWeekday.textContent = doc.schedule.weekday;
  scheduleSaturday.textContent = doc.schedule.saturday;
  scheduleSunday.textContent = doc.schedule.sunday;

  detailModalOverlay.classList.add("open");
}

function closeDetailModal(){
  detailModalOverlay.classList.remove("open");
}

detailBackBtn.addEventListener("click", closeDetailModal);
detailModalOverlay.addEventListener("click", (e) => {
  if (e.target === detailModalOverlay) closeDetailModal();
});

// ---------- 7. MODAL JADWAL JANJI TEMU ----------
makeAppointmentBtn.addEventListener("click", () => {
  if (!activeDoctor) return;

  selectedDate = null;
  selectedTime = null;
  calendarViewDate = new Date();

  scheduleDoctorPhoto.src = activeDoctor.photo;
  scheduleDoctorPhoto.onerror = function(){
    this.onerror = null;
    this.src = DEFAULT_AVATAR;
  };
  scheduleDoctorName.textContent = activeDoctor.fullName;
  scheduleDoctorSpec.textContent = activeDoctor.specialization;

  renderCalendar();
  renderTimeSlots();
  updateContinueButtonState();

  closeDetailModal();
  scheduleModalOverlay.classList.add("open");
});

function closeScheduleModal(){
  scheduleModalOverlay.classList.remove("open");
}

scheduleBackBtn.addEventListener("click", () => {
  closeScheduleModal();
  detailModalOverlay.classList.add("open");
});

cancelScheduleBtn.addEventListener("click", closeScheduleModal);

scheduleModalOverlay.addEventListener("click", (e) => {
  if (e.target === scheduleModalOverlay) closeScheduleModal();
});

// ---------- 8. KALENDER ----------
function renderCalendar(){
  const year = calendarViewDate.getFullYear();
  const month = calendarViewDate.getMonth();

  calendarMonth.textContent = `${MONTH_NAMES[month]}`;

  calendarWeekdays.innerHTML = WEEKDAY_NAMES.map(d => `<span>${d}</span>`).join("");

  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const today = new Date();
  today.setHours(0,0,0,0);

  calendarGrid.innerHTML = "";

  for (let i = 0; i < firstDayIndex; i++){
    const empty = document.createElement("span");
    empty.className = "calendar-day empty";
    calendarGrid.appendChild(empty);
  }

  for (let day = 1; day <= daysInMonth; day++){
    const dateObj = new Date(year, month, day);
    dateObj.setHours(0,0,0,0);

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "calendar-day";
    btn.textContent = day;

    const isPast = dateObj < today;
    if (isPast){
      btn.disabled = true;
    } else {
      btn.addEventListener("click", () => {
        selectedDate = dateObj;
        calendarGrid.querySelectorAll(".calendar-day").forEach(el => el.classList.remove("selected"));
        btn.classList.add("selected");
        updateContinueButtonState();
      });
    }

    if (dateObj.getTime() === today.getTime()){
      btn.classList.add("today");
    }
    if (selectedDate && dateObj.getTime() === selectedDate.getTime()){
      btn.classList.add("selected");
    }

    calendarGrid.appendChild(btn);
  }
}

// ---------- 9. JAM PRAKTIK ----------
function renderTimeSlots(){
  timeGrid.innerHTML = "";

  TIME_SLOTS.forEach(time => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "time-slot";
    btn.textContent = time;

    btn.addEventListener("click", () => {
      selectedTime = time;
      timeGrid.querySelectorAll(".time-slot").forEach(el => el.classList.remove("selected"));
      btn.classList.add("selected");
      updateContinueButtonState();
    });

    timeGrid.appendChild(btn);
  });
}

function updateContinueButtonState(){
  continueScheduleBtn.disabled = !(selectedDate && selectedTime);
}

// ---------- 10. KONFIRMASI JANJI TEMU ----------
continueScheduleBtn.addEventListener("click", () => {
  if (!selectedDate || !selectedTime || !activeDoctor) return;

  const formattedDate = selectedDate.toLocaleDateString("id-ID", {
    weekday: "long", day: "numeric", month: "long", year: "numeric"
  });

  showToast(`Janji temu dengan ${activeDoctor.fullName} berhasil dibuat pada ${formattedDate}, pukul ${selectedTime}.`);
  closeScheduleModal();
});

// ---------- 11. TOAST ----------
function showToast(message){
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);
}

// ---------- 12. INIT ----------
renderDoctors();
