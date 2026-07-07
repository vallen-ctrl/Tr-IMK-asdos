// poli.js
const DEFAULT_AVATAR = "images/default-avatar.svg";
const QR_IMAGE_PATH = "images/qr-code.png";
const QR_IMAGE_FALLBACK = "images/qr-placeholder.svg";

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
    fullName: "dr. Vallen Nathalio Malia, Sp.KJ.",
    title: "Sp. KJ",
    poli: "psikologi",
    specialization: "Spesialis Kedokteran Jiwa",
    about: "dr. Vallen Nathalio Malia, Sp.KJ berfokus pada penanganan kesehatan mental pasien dengan pendekatan yang hangat, suportif, dan berbasis bukti ilmiah.",
    schedule: { weekday: "09.00 - 17.00", saturday: "09.00 - 13.00", sunday: "Tutup" },
    photo: "images/dr-vallen.jpg"
  },
  {
    id: "kezia",
    name: "dr. Kezia",
    fullName: "dr. Kezia Stefanny Elfina Praseyo, S.Ked.",
    title: "Umum",
    poli: "umum",
    specialization: "Dokter Umum",
    about: "dr. Kezia Stefanny Elfina Praseyo menangani pemeriksaan kesehatan umum dan lansia dengan komunikasi yang jelas dan mudah dipahami oleh pasien dari segala usia.",
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

let currentPoliFilter = "semua";
let activeDoctor = null;
let calendarViewDate = new Date();
let selectedDate = null;
let selectedTime = null;
let lastBookingCode = "";
let lastQrDataUrl = "";

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

const qrModalOverlay = document.getElementById("qrModalOverlay");
const qrSummary = document.getElementById("qrSummary");
const qrImage = document.getElementById("qrImage");
const closeQrBtn = document.getElementById("closeQrBtn");
const downloadQrBtn = document.getElementById("downloadQrBtn");

const toast = document.getElementById("toast");

const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const WEEKDAY_NAMES = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const TIME_SLOTS = ["08.00", "09.00", "10.00", "11.00", "13.00", "14.00", "15.00", "16.00"];

// ========== RENDER DOKTER ==========
function renderDoctors() {
  const filtered = currentPoliFilter === "semua"
    ? doctors
    : doctors.filter(doc => doc.poli === currentPoliFilter);

  doctorGrid.innerHTML = "";
  if (filtered.length === 0) {
    emptyState.hidden = false;
    return;
  }
  emptyState.hidden = true;

  filtered.forEach(doc => {
    const card = document.createElement("article");
    card.className = "doctor-card"; // menggunakan class dari Tailwind config
    card.innerHTML = `
      <div class="photo-wrapper">
        <img src="${doc.photo}" alt="Foto ${doc.name}"
             onerror="this.onerror=null;this.src='${DEFAULT_AVATAR}';this.className='w-3/5 h-3/5 object-contain';this.parentElement.className='aspect-square w-full bg-bg-alt flex items-center justify-center overflow-hidden';">
      </div>
      <div class="info">
        <p class="name">${doc.name}</p>
        <p class="title">${doc.title}</p>
        <button type="button" class="btn-detail" data-id="${doc.id}">Lihat Detail</button>
      </div>
    `;
    doctorGrid.appendChild(card);
  });

  doctorGrid.querySelectorAll(".btn-detail").forEach(btn => {
    btn.addEventListener("click", () => openDetailModal(btn.dataset.id));
  });
}

// ========== FILTER POLI ==========
poliFilter.addEventListener("click", (e) => {
  const btn = e.target.closest(".poli-btn");
  if (!btn) return;
  poliFilter.querySelectorAll(".poli-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  currentPoliFilter = btn.dataset.poli;
  renderDoctors();
});

// ========== MODAL DETAIL ==========
function openDetailModal(id) {
  const doc = doctors.find(d => d.id === id);
  if (!doc) return;
  activeDoctor = doc;

  detailPhoto.src = doc.photo;
  detailPhoto.alt = `Foto ${doc.name}`;
  detailPhoto.onerror = function () {
    this.onerror = null;
    this.src = DEFAULT_AVATAR;
  };
  detailName.textContent = doc.fullName;
  detailSpecialization.textContent = doc.specialization;
  detailAbout.textContent = doc.about;
  scheduleWeekday.textContent = doc.schedule.weekday;
  scheduleSaturday.textContent = doc.schedule.saturday;
  scheduleSunday.textContent = doc.schedule.sunday;

  detailModalOverlay.classList.remove("hidden");
}

function closeDetailModal() {
  detailModalOverlay.classList.add("hidden");
}

detailBackBtn.addEventListener("click", closeDetailModal);
detailModalOverlay.addEventListener("click", (e) => {
  if (e.target === detailModalOverlay) closeDetailModal();
});

// ========== MODAL JADWAL ==========
makeAppointmentBtn.addEventListener("click", () => {
  if (!activeDoctor) return;
  selectedDate = null;
  selectedTime = null;
  calendarViewDate = new Date();

  scheduleDoctorPhoto.src = activeDoctor.photo;
  scheduleDoctorPhoto.onerror = function () {
    this.onerror = null;
    this.src = DEFAULT_AVATAR;
  };
  scheduleDoctorName.textContent = activeDoctor.fullName;
  scheduleDoctorSpec.textContent = activeDoctor.specialization;

  renderCalendar();
  renderTimeSlots();
  updateContinueButtonState();
  closeDetailModal();
  scheduleModalOverlay.classList.remove("hidden");
});

function closeScheduleModal() {
  scheduleModalOverlay.classList.add("hidden");
}

scheduleBackBtn.addEventListener("click", () => {
  closeScheduleModal();
  detailModalOverlay.classList.remove("hidden");
});
cancelScheduleBtn.addEventListener("click", closeScheduleModal);
scheduleModalOverlay.addEventListener("click", (e) => {
  if (e.target === scheduleModalOverlay) closeScheduleModal();
});

// ========== KALENDER ==========
function renderCalendar() {
  const year = calendarViewDate.getFullYear();
  const month = calendarViewDate.getMonth();

  calendarMonth.textContent = `${MONTH_NAMES[month]}`;
  calendarWeekdays.innerHTML = WEEKDAY_NAMES.map(d => `<span>${d}</span>`).join("");

  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  calendarGrid.innerHTML = "";

  for (let i = 0; i < firstDayIndex; i++) {
    const empty = document.createElement("span");
    empty.className = "calendar-day invisible";
    calendarGrid.appendChild(empty);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateObj = new Date(year, month, day);
    dateObj.setHours(0, 0, 0, 0);

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "calendar-day";
    btn.textContent = day;

    const isPast = dateObj < today;
    if (isPast) {
      btn.disabled = true;
    } else {
      btn.addEventListener("click", () => {
        selectedDate = dateObj;
        calendarGrid.querySelectorAll(".calendar-day").forEach(el => el.classList.remove("selected"));
        btn.classList.add("selected");
        updateContinueButtonState();
      });
    }

    if (dateObj.getTime() === today.getTime()) btn.classList.add("today");
    if (selectedDate && dateObj.getTime() === selectedDate.getTime()) btn.classList.add("selected");

    calendarGrid.appendChild(btn);
  }
}

// ========== JAM ==========
function renderTimeSlots() {
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

function updateContinueButtonState() {
  continueScheduleBtn.disabled = !(selectedDate && selectedTime);
}

// ========== QR & KONFIRMASI ==========
function generateBookingCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

continueScheduleBtn.addEventListener("click", () => {
  if (!selectedDate || !selectedTime || !activeDoctor) return;

  const formattedDate = selectedDate.toLocaleDateString("id-ID", {
    weekday: "long", day: "numeric", month: "long", year: "numeric"
  });

  lastBookingCode = generateBookingCode();
  qrSummary.textContent = `${activeDoctor.fullName} · ${formattedDate}, pukul ${selectedTime}`;

  qrImage.src = QR_IMAGE_PATH;
  qrImage.onerror = function () {
    this.onerror = null;
    this.src = QR_IMAGE_FALLBACK;
  };
  lastQrDataUrl = QR_IMAGE_PATH;

  closeScheduleModal();
  qrModalOverlay.classList.remove("hidden");
});

closeQrBtn.addEventListener("click", () => {
  qrModalOverlay.classList.add("hidden");
  showToast("Janji temu berhasil dibuat.");
});

downloadQrBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.href = qrImage.src;
  link.download = `qr-janji-temu-${lastBookingCode || "healthflow"}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});

qrModalOverlay.addEventListener("click", (e) => {
  if (e.target === qrModalOverlay) {
    qrModalOverlay.classList.add("hidden");
    showToast("Janji temu berhasil dibuat.");
  }
});

// ========== TOAST ==========
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);
}

// ========== INIT ==========
renderDoctors();
document.addEventListener('DOMContentLoaded', function () {
  if (window.lucide) lucide.createIcons();
});