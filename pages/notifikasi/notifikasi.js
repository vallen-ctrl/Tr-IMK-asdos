// Database data notifikasi yang bisa diedit langsung
let notificationsData = [
  {
    id: 1,
    title: "Pengingat janji temu",
    type: "appointment",
    icon: "calendar",
    snippet: "Jangan lupa anda memiliki janji temu besok di jam 10:00, datang 10 menit lebih awal ya!",
    time: "2 menit yang lalu",
    read: true,
    details: {
      greeting: "halo johan deo jhon deo formalin,",
      intro: "Kami ingin mengingatkan anda, bahwa anda memiliki janji temu pada:",
      appointment: {
        date: "26- Desember 2025",
        time: "10:00",
        doctor: "dr. Andipratama"
      },
      footer: "Kami mohon anda dapat hadir 15 menit sebelum waktu yang tertera.",
      thankYou: "Terimakasih telah mempercayakan kesehatan anda pada kami.",
      signature: "Salam sehat,\nStaf HealthFlow"
    }
  },
  {
    id: 2,
    title: "Informasi layanan baru",
    type: "info",
    icon: "megaphone",
    snippet: "Sekarang kami membuat outlet baru di jakarta.",
    time: "2 menit yang lalu",
    read: false,
    details: {
      greeting: "halo johan deo jhon deo formalin,",
      intro: "Kami senang mengumumkan bahwa kami sekarang membuat outlet baru di Jakarta untuk memberikan layanan yang lebih dekat kepada Anda.",
      body: "Outlet baru kami yang terletak di Jakarta Pusat dilengkapi dengan fasilitas medis modern terlengkap dan tim dokter spesialis yang handal. Kami berkomitmen untuk selalu memberikan pelayanan kesehatan terbaik bagi Anda dan keluarga.",
      thankYou: "Terimakasih telah mempercayakan kesehatan anda pada kami.",
      signature: "Salam sehat,\nStaf HealthFlow"
    }
  },
  {
    id: 3,
    title: "Perbaharui pin anda",
    type: "security",
    icon: "shield",
    snippet: "Pin yang anda gunakan telah terlalu lama terpakai.",
    time: "2 menit yang lalu",
    read: false,
    details: {
      greeting: "halo johan deo jhon deo formalin,",
      intro: "Keamanan akun Anda adalah prioritas kami. Kami mendeteksi bahwa PIN Anda sudah cukup lama tidak diperbarui:",
      body: "Untuk mencegah hal-hal yang tidak diinginkan dan menjaga kerahasiaan rekam medis Anda, harap perbarui PIN transaksi/akses Anda secara berkala melalui menu Pengaturan Profil.",
      thankYou: "Terimakasih telah menjaga keamanan akun Anda bersama kami.",
      signature: "Salam sehat,\nStaf HealthFlow"
    }
  },
  {
    id: 4,
    title: "Informasi layanan baru",
    type: "info",
    icon: "megaphone",
    snippet: "Sekarang kami membuat outlet baru di jakarta.",
    time: "2 menit yang lalu",
    read: false,
    details: {
      greeting: "halo johan deo jhon deo formalin,",
      intro: "Kami senang mengumumkan bahwa kami sekarang membuat outlet baru di Jakarta untuk memberikan layanan yang lebih dekat kepada Anda.",
      body: "Outlet baru kami yang terletak di Jakarta Pusat dilengkapi dengan fasilitas medis modern terlengkap dan tim dokter spesialis yang handal.",
      thankYou: "Terimakasih telah mempercayakan kesehatan anda pada kami.",
      signature: "Salam sehat,\nStaf HealthFlow"
    }
  },
  {
    id: 5,
    title: "Pengingat janji temu",
    type: "appointment",
    icon: "calendar",
    snippet: "Jangan lupa anda memiliki janji temu besok di jam 10:00, datang 10 menit lebih awal ya!",
    time: "2 menit yang lalu",
    read: true,
    details: {
      greeting: "halo johan deo jhon deo formalin,",
      intro: "Kami ingin mengingatkan anda, bahwa anda memiliki janji temu pada:",
      appointment: {
        date: "27- Desember 2025",
        time: "14:00",
        doctor: "dr. Andipratama"
      },
      footer: "Kami mohon anda dapat hadir 15 menit sebelum waktu yang tertera.",
      thankYou: "Terimakasih telah mempercayakan kesehatan anda pada kami.",
      signature: "Salam sehat,\nStaf HealthFlow"
    }
  },
  {
    id: 6,
    title: "Informasi layanan baru",
    type: "info",
    icon: "megaphone",
    snippet: "Sekarang kami membuat outlet baru di jakarta.",
    time: "2 menit yang lalu",
    read: true,
    details: {
      greeting: "halo johan deo jhon deo formalin,",
      intro: "Kami memiliki kabar baik tentang dibukanya layanan laboratorium terpadu di cabang utama kami.",
      body: "Layanan lab baru ini mencakup tes darah lengkap, tes urin, PCR express, serta screening kesehatan menyeluruh dengan hasil instan yang terintegrasi langsung ke aplikasi HealthFlow Anda.",
      thankYou: "Terimakasih telah mempercayakan kesehatan anda pada kami.",
      signature: "Salam sehat,\nStaf HealthFlow"
    }
  },
  {
    id: 7,
    title: "Pengingat janji temu",
    type: "appointment",
    icon: "calendar",
    snippet: "Jangan lupa anda memiliki janji temu besok di jam 10:00, datang 10 menit lebih awal ya!",
    time: "2 menit yang lalu",
    read: true,
    details: {
      greeting: "halo johan deo jhon deo formalin,",
      intro: "Kami ingin mengingatkan anda, bahwa anda memiliki janji temu pada:",
      appointment: {
        date: "28- Desember 2025",
        time: "09:00",
        doctor: "dr. Siska Amelia"
      },
      footer: "Kami mohon anda dapat hadir 15 menit sebelum waktu yang tertera.",
      thankYou: "Terimakasih telah mempercayakan kesehatan anda pada kami.",
      signature: "Salam sehat,\nStaf HealthFlow"
    }
  },
  {
    id: 8,
    title: "Pengingat janji temu",
    type: "appointment",
    icon: "calendar",
    snippet: "Jangan lupa anda memiliki janji temu besok di jam 10:00, datang 10 menit lebih awal ya!",
    time: "2 menit yang lalu",
    read: true,
    details: {
      greeting: "halo johan deo jhon deo formalin,",
      intro: "Kami ingin mengingatkan anda, bahwa anda memiliki janji temu pada:",
      appointment: {
        date: "29- Desember 2025",
        time: "11:00",
        doctor: "dr. Andipratama"
      },
      footer: "Kami mohon anda dapat hadir 15 menit sebelum waktu yang tertera.",
      thankYou: "Terimakasih telah mempercayakan kesehatan anda pada kami.",
      signature: "Salam sehat,\nStaf HealthFlow"
    }
  },
  {
    id: 9,
    title: "Pengingat janji temu",
    type: "appointment",
    icon: "calendar",
    snippet: "Jangan lupa anda memiliki janji temu besok di jam 10:00, datang 10 menit lebih awal ya!",
    time: "2 menit yang lalu",
    read: true,
    details: {
      greeting: "halo johan deo jhon deo formalin,",
      intro: "Kami ingin mengingatkan anda, bahwa anda memiliki janji temu pada:",
      appointment: {
        date: "30- Desember 2025",
        time: "10:30",
        doctor: "dr. Budi Rahardjo"
      },
      footer: "Kami mohon anda dapat hadir 15 menit sebelum waktu yang tertera.",
      thankYou: "Terimakasih telah mempercayakan kesehatan anda pada kami.",
      signature: "Salam sehat,\nStaf HealthFlow"
    }
  }
];

// State management
let activeFilter = 'semua'; // 'semua', 'unread', 'read'
let selectedNotificationId = 1;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  renderFilters();
  renderNotificationList();
  loadNotificationDetails(selectedNotificationId);

  // Setup filter button events
  document.getElementById('filter-all').addEventListener('click', () => setFilter('semua'));
  document.getElementById('filter-unread').addEventListener('click', () => setFilter('unread'));
  document.getElementById('filter-read').addEventListener('click', () => setFilter('read'));

  // Setup action events
  document.getElementById('btn-mark-read').addEventListener('click', markCurrentAsRead);
  document.getElementById('btn-delete').addEventListener('click', deleteCurrentNotification);
  document.getElementById('btn-back').addEventListener('click', goBackToList);
});

// Set Filter
function setFilter(filter) {
  activeFilter = filter;
  renderFilters();
  renderNotificationList();

  // Auto-select the first item in the filtered list on desktop
  const filtered = getFilteredNotifications();
  if (filtered.length > 0) {
    // Check if the current selected ID is still in the filtered list
    const exists = filtered.find(n => n.id === selectedNotificationId);
    if (!exists) {
      selectedNotificationId = filtered[0].id;
    }
    loadNotificationDetails(selectedNotificationId);
  } else {
    selectedNotificationId = null;
    showEmptyDetails();
  }
}

// Render Filter Buttons
function renderFilters() {
  const allBtn = document.getElementById('filter-all');
  const unreadBtn = document.getElementById('filter-unread');
  const readBtn = document.getElementById('filter-read');

  // Reset styles
  [allBtn, unreadBtn, readBtn].forEach(btn => {
    btn.className = "px-6 py-2 border border-[#395886] text-[#395886] rounded-[10px] font-semibold text-sm hover:bg-[#395886]/5 transition cursor-pointer";
  });

  // Apply active style
  if (activeFilter === 'semua') {
    allBtn.className = "px-6 py-2 bg-[#395886] text-white rounded-[10px] font-semibold text-sm shadow-sm transition cursor-pointer";
  } else if (activeFilter === 'unread') {
    unreadBtn.className = "px-6 py-2 bg-[#395886] text-white rounded-[10px] font-semibold text-sm shadow-sm transition cursor-pointer";
  } else if (activeFilter === 'read') {
    readBtn.className = "px-6 py-2 bg-[#395886] text-white rounded-[10px] font-semibold text-sm shadow-sm transition cursor-pointer";
  }
}

// Get Filtered Data
function getFilteredNotifications() {
  if (activeFilter === 'unread') {
    return notificationsData.filter(n => !n.read);
  } else if (activeFilter === 'read') {
    return notificationsData.filter(n => n.read);
  }
  return notificationsData;
}

// Render Notification List
function renderNotificationList() {
  const listContainer = document.getElementById('notification-list');
  listContainer.innerHTML = '';
  
  const filtered = getFilteredNotifications();
  
  if (filtered.length === 0) {
    listContainer.innerHTML = `
      <div class="flex flex-col items-center justify-center py-12 px-4 text-[#6B7280]">
        <i data-lucide="bell-off" class="w-12 h-12 mb-4 text-slate-300"></i>
        <p class="subheaderText font-semibold">Tidak ada notifikasi</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  filtered.forEach(notif => {
    // Determine icon
    let iconName = notif.icon || 'bell';
    
    // Create card
    const notifItem = document.createElement('div');
    notifItem.id = `notif-item-${notif.id}`;
    
    // Base active class
    const isActive = notif.id === selectedNotificationId;
    const activeClass = isActive ? 'bg-[#395886]/10 border-l-4 border-[#395886]' : 'hover:bg-slate-50';
    
    notifItem.className = `flex items-center justify-between p-4 cursor-pointer border-b border-[#E2ECF8] transition-all duration-200 ${activeClass}`;
    notifItem.onclick = () => selectNotification(notif.id);

    // Unread blue dot markup
    const unreadDot = !notif.read ? `<div class="w-2.5 h-2.5 bg-blue-500 rounded-full flex-shrink-0 mr-3"></div>` : `<div class="w-2.5 h-2.5 flex-shrink-0 mr-3 opacity-0"></div>`;

    notifItem.innerHTML = `
      <div class="flex items-center gap-3 w-full min-w-0">
        ${unreadDot}
        
        <!-- Icon Container -->
        <div class="w-12 h-12 rounded-[12px] bg-[#E2ECF8] text-[#395886] flex items-center justify-center flex-shrink-0">
          <i data-lucide="${iconName}" class="w-6 h-6"></i>
        </div>
        
        <!-- Text Content -->
        <div class="flex flex-col min-w-0 w-full gap-1">
          <div class="flex items-start justify-between gap-2">
            <span class="subheaderText font-bold text-[#1C1616] truncate">${notif.title}</span>
            <span class="text-[11px] text-slate-400 whitespace-nowrap pt-1">${notif.time}</span>
          </div>
          <p class="text-xs text-slate-500 truncate w-full pr-2">${notif.snippet}</p>
        </div>
      </div>
    `;
    
    listContainer.appendChild(notifItem);
  });

  lucide.createIcons();
}

// Select Notification
function selectNotification(id) {
  selectedNotificationId = id;
  
  // Update list highlight classes directly
  const listItems = document.getElementById('notification-list').children;
  for (let item of listItems) {
    if (item.id.startsWith('notif-item-')) {
      const itemId = parseInt(item.id.replace('notif-item-', ''));
      if (itemId === id) {
        item.className = item.className.replace(/hover:bg-slate-50/g, '').replace(/bg-\[#395886\]\/10/g, '') + ' bg-[#395886]/10 border-l-4 border-[#395886]';
      } else {
        item.className = item.className.replace(/bg-\[#395886\]\/10/g, '').replace(/border-l-4/g, '').replace(/border-\[#395886\]/g, '') + ' hover:bg-slate-50';
      }
    }
  }

  // Load details
  loadNotificationDetails(id);

  // Mark as read automatically when clicked
  const notif = notificationsData.find(n => n.id === id);
  if (notif && !notif.read) {
    notif.read = true;
    renderNotificationList();
    renderFilters();
  }

  // Mobile viewport behavior: hide list, show details
  const width = window.innerWidth;
  if (width < 768) {
    document.getElementById('list-pane').classList.add('hidden');
    document.getElementById('detail-pane').classList.remove('hidden');
    document.getElementById('detail-pane').classList.add('flex');
  }
}

// Load Notification Details
function loadNotificationDetails(id) {
  const notif = notificationsData.find(n => n.id === id);
  const detailsContent = document.getElementById('details-content');
  const detailsPlaceholder = document.getElementById('details-placeholder');
  const btnMarkRead = document.getElementById('btn-mark-read');

  if (!notif) {
    showEmptyDetails();
    return;
  }

  // Toggle layout
  detailsPlaceholder.classList.add('hidden');
  detailsContent.classList.remove('hidden');
  detailsContent.classList.add('flex');

  // Update actions
  if (notif.read) {
    btnMarkRead.classList.add('hidden');
  } else {
    btnMarkRead.classList.remove('hidden');
  }

  // Header Details
  document.getElementById('detail-icon').innerHTML = `<i data-lucide="${notif.icon || 'bell'}" class="w-6 h-6"></i>`;
  document.getElementById('detail-title').innerText = notif.title;
  document.getElementById('detail-time').innerText = notif.time;

  // Text contents
  const greetingEl = document.getElementById('detail-greeting');
  const introEl = document.getElementById('detail-intro');
  const bodyEl = document.getElementById('detail-body');
  const apptCardEl = document.getElementById('detail-appt-card');
  const footerEl = document.getElementById('detail-footer');
  const thankYouEl = document.getElementById('detail-thankyou');
  const signatureEl = document.getElementById('detail-signature');

  // Reset elements
  greetingEl.innerText = notif.details.greeting || '';
  introEl.innerText = notif.details.intro || '';
  footerEl.innerText = notif.details.footer || '';
  thankYouEl.innerText = notif.details.thankYou || '';
  signatureEl.innerHTML = (notif.details.signature || '').replace(/\n/g, '<br>');

  // Check type for custom details
  if (notif.type === 'appointment') {
    apptCardEl.classList.remove('hidden');
    apptCardEl.classList.add('flex');
    bodyEl.classList.add('hidden');

    document.getElementById('appt-date').innerText = notif.details.appointment.date;
    document.getElementById('appt-time').innerText = notif.details.appointment.time;
    document.getElementById('appt-doctor').innerText = notif.details.appointment.doctor;
  } else {
    apptCardEl.classList.add('hidden');
    bodyEl.classList.remove('hidden');
    bodyEl.innerText = notif.details.body || '';
  }

  lucide.createIcons();
}

// Show Empty Details State
function showEmptyDetails() {
  document.getElementById('details-content').classList.add('hidden');
  document.getElementById('details-placeholder').classList.remove('hidden');
}

// Mark Current Notification as Read
function markCurrentAsRead() {
  const notif = notificationsData.find(n => n.id === selectedNotificationId);
  if (notif) {
    notif.read = true;
    renderNotificationList();
    renderFilters();
    loadNotificationDetails(selectedNotificationId);
  }
}

// Delete Current Notification
function deleteCurrentNotification() {
  if (!selectedNotificationId) return;
  
  notificationsData = notificationsData.filter(n => n.id !== selectedNotificationId);
  
  // Select another notification
  const filtered = getFilteredNotifications();
  if (filtered.length > 0) {
    selectedNotificationId = filtered[0].id;
    loadNotificationDetails(selectedNotificationId);
  } else {
    selectedNotificationId = null;
    showEmptyDetails();
  }
  
  renderNotificationList();
}

// Go Back to List (Mobile only)
function goBackToList() {
  document.getElementById('detail-pane').classList.add('hidden');
  document.getElementById('detail-pane').classList.remove('flex');
  document.getElementById('list-pane').classList.remove('hidden');
  document.getElementById('list-pane').classList.add('flex');
}
