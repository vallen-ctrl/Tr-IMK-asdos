// Database data notifikasi — dari rootData.js
let notificationsData = (typeof RootData !== 'undefined') ? RootData.getNotifications() : [];

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
    if (typeof RootData !== 'undefined') RootData.saveNotifications(notificationsData);
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
    if (typeof RootData !== 'undefined') RootData.saveNotifications(notificationsData);
    renderNotificationList();
    renderFilters();
    loadNotificationDetails(selectedNotificationId);
  }
}

// Delete Current Notification
function deleteCurrentNotification() {
  if (!selectedNotificationId) return;
  
  notificationsData = notificationsData.filter(n => n.id !== selectedNotificationId);
  if (typeof RootData !== 'undefined') RootData.saveNotifications(notificationsData);
  
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
