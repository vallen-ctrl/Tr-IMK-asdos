(function() {
    function initNavbar() {
        const pathname = window.location.pathname;
        const pagesIndex = pathname.indexOf('pages/');
        let rootPath = './';
        if (pagesIndex !== -1) {
            const subPath = pathname.substring(pagesIndex);
            const slashCount = (subPath.match(/\//g) || []).length;
            rootPath = '../'.repeat(slashCount);
        }
        const isLoggedIn = (typeof RootData !== 'undefined') ? RootData.isLoggedIn() : localStorage.getItem('isLoggedIn') === 'true';

        // Check if page is protected and user is not logged in
        const isProtectedPage = (pathname.includes('/pages/pendaftaran/') && !pathname.includes('menghubungiServer.html')) || 
                                pathname.includes('/pages/rekam_medis/');

        if (isProtectedPage && !isLoggedIn) {
            // Hide main contents
            const bpjs = document.getElementById('bpjsdaftar');
            const mandiri = document.getElementById('mandiriDaftar');
            const mainEl = document.querySelector('main');
            const paymentOverlay = document.getElementById('payment-overlay');
            if (bpjs) bpjs.style.display = 'none';
            if (mandiri) mandiri.style.display = 'none';
            if (mainEl) mainEl.style.display = 'none';
            if (paymentOverlay) paymentOverlay.style.display = 'none';

            // Insert warning message if not already present
            const header = document.querySelector('header');
            if (header && !document.getElementById('unauthorized-warning')) {
                const warningDiv = document.createElement('div');
                warningDiv.id = 'unauthorized-warning';
                warningDiv.className = 'w-full flex justify-center py-16 px-4 md:px-8 flex-1';
                warningDiv.innerHTML = `
                    <div class="max-w-md w-full bg-white rounded-[24px] border border-[#E2ECF8] shadow-lg p-8 flex flex-col items-center text-center gap-6">
                        <!-- Icon Lock -->
                        <div class="w-16 h-16 bg-[#F0F3FA] rounded-full flex items-center justify-center text-[#395886]">
                            <i data-lucide="lock" class="w-8 h-8 stroke-[2]"></i>
                        </div>
                        
                        <!-- Text -->
                        <div class="flex flex-col gap-2">
                            <h2 class="headerText font-bold text-slate-900 text-2xl">Akses Terbatas</h2>
                            <p class="subheaderText text-gray-600">Anda harus masuk atau mendaftar terlebih dahulu untuk mengakses halaman ini.</p>
                        </div>
                        
                        <!-- Buttons -->
                        <div class="flex flex-col gap-3 w-full mt-4">
                            <a href="${rootPath}pages/daftar_login/index.html" 
                               class="h-12 bg-[#395886] hover:bg-[#2C4E80] text-white rounded-full font-bold text-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer">
                                <i data-lucide="log-in" class="w-5 h-5"></i>
                                Masuk
                            </a>
                            <a href="${rootPath}pages/daftar_login/index.html?action=register" 
                               class="h-12 border-2 border-[#395886] text-[#395886] hover:bg-slate-50 rounded-full font-bold text-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer">
                                <i data-lucide="user-plus" class="w-5 h-5"></i>
                                Daftar Akun
                            </a>
                        </div>
                    </div>
                `;
                header.parentNode.insertBefore(warningDiv, header.nextSibling);
            }
        }

        // 1. Update Notification Bell path dynamically
        const bellBtn = document.querySelector('button[aria-label="Notifications"]');
        if (bellBtn) {
            bellBtn.onclick = function() {
                window.location.assign(rootPath + 'pages/notifikasi/index.html');
            };
        }

        // 2. Update Profile Menu
        const profileBtn = document.getElementById('profile-menu-button');
        if (profileBtn) {
            const parentDiv = profileBtn.parentElement;
            if (parentDiv) {
                const isLoggedIn = (typeof RootData !== 'undefined') ? RootData.isLoggedIn() : localStorage.getItem('isLoggedIn') === 'true';
                if (isLoggedIn) {
                    // Render logged in state
                    parentDiv.innerHTML = `
                        <button id="profile-menu-button" onclick="toggleProfileDropdown(event)"
                            class="text-[#1C1616] hover:text-[#395886] transition-colors duration-200 cursor-pointer flex items-center justify-center"
                            aria-label="Profile">
                            <p class="mr-2">${(typeof RootData !== 'undefined') ? RootData.getCurrentUser().nama : 'User'}</p>
                            <img class="w-10 rounded-full" src="${rootPath}pages/profil/assets/profile_avatar.png" alt="">
                        </button>
                        <!-- Profile Dropdown -->
                        <div id="profile-dropdown"
                            class="hidden absolute right-0 mt-3 w-[220px] bg-white rounded-[24px] shadow-lg border border-[#E2ECF8] p-5 flex flex-col gap-4 z-50">
                            <!-- Item 1: Profil anda -->
                            <a href="${rootPath}pages/profil/index.html"
                                class="flex items-center gap-3 hover:bg-slate-50 transition-colors duration-150 rounded-lg py-1">
                                <i data-lucide="user" class="w-5 h-5 text-slate-900 stroke-[2]"></i>
                                <span class="subheaderText font-bold text-slate-900">Profil anda</span>
                            </a>
                            <!-- Item 2: Pengaturan -->
                            <a href="${rootPath}pages/profil/index.html"
                                class="flex items-center gap-3 hover:bg-slate-50 transition-colors duration-150 rounded-lg py-1">
                                <i data-lucide="settings" class="w-5 h-5 text-slate-900 stroke-[2]"></i>
                                <span class="subheaderText font-bold text-slate-900">Pengaturan</span>
                            </a>
                            <!-- Item 3: Keluar -->
                            <a href="#" onclick="handleLogout(event)"
                                class="flex items-center gap-3 hover:bg-red-50 transition-colors duration-150 rounded-lg py-1">
                                <i data-lucide="log-out" class="w-5 h-5 text-red-600 stroke-[2]"></i>
                                <span class="subheaderText font-bold text-red-600">keluar</span>
                            </a>
                        </div>
                    `;
                } else {
                    // Render logged out state
                    parentDiv.innerHTML = `
                        <button id="profile-menu-button" onclick="toggleProfileDropdown(event)"
                            class="text-[#1C1616] hover:text-[#395886] transition-colors duration-200 cursor-pointer flex items-center justify-center"
                            aria-label="Profile">
                            <i data-lucide="user" class="w-5 h-5"></i>
                        </button>
                        <!-- Profile Dropdown -->
                        <div id="profile-dropdown"
                            class="hidden absolute right-0 mt-3 w-[220px] bg-white rounded-[24px] shadow-lg border border-[#E2ECF8] p-5 flex flex-col gap-4 z-50">
                            <!-- Item 3: Masuk -->
                            <a href="${rootPath}pages/daftar_login/index.html"
                                class="flex items-center gap-3 hover:bg-blue-50 transition-colors duration-150 rounded-lg py-1">
                                <i data-lucide="log-in" class="w-5 h-5 text-[#395886] stroke-[2]"></i>
                                <span class="subheaderText font-bold text-[#395886]">Masuk</span>
                            </a>
                        </div>
                    `;
                }
                
                // Initialize Lucide icons
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            }
        }
    }

    // Global toggle dropdown
    window.toggleProfileDropdown = function(event) {
        if (event) event.stopPropagation();
        const dropdown = document.getElementById('profile-dropdown');
        if (dropdown) {
            dropdown.classList.toggle('hidden');
        }
    };

    // Global logout function
    window.handleLogout = function(event) {
        if (event) event.preventDefault();
        localStorage.removeItem('isLoggedIn');
        if (typeof RootData !== 'undefined') {
            RootData.logout();
        }
        const pathname = window.location.pathname;
        const pagesIndex = pathname.indexOf('pages/');
        let rootPath = './';
        if (pagesIndex !== -1) {
            const subPath = pathname.substring(pagesIndex);
            const slashCount = (subPath.match(/\//g) || []).length;
            rootPath = '../'.repeat(slashCount);
        }
        window.location.href = rootPath + 'index.html';
    };

    // Close dropdown on click outside
    document.addEventListener('click', (e) => {
        const dropdown = document.getElementById('profile-dropdown');
        const profileBtn = document.getElementById('profile-menu-button');
        if (dropdown && !dropdown.classList.contains('hidden')) {
            const clickedInsideDropdown = dropdown.contains(e.target);
            const clickedBtn = profileBtn && (profileBtn === e.target || profileBtn.contains(e.target));
            if (!clickedInsideDropdown && !clickedBtn) {
                dropdown.classList.add('hidden');
            }
        }
    });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNavbar);
    } else {
        initNavbar();
    }
})();
