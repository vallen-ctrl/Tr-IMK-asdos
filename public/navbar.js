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
                                pathname.includes('/pages/rekam_medis/') ||
                                pathname.includes('/pages/poli/') ||
                                pathname.includes('/pages/kalkulator/') ||
                                pathname.includes('/pages/notifikasi/');

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
                warningDiv.className = 'w-full flex items-center justify-center py-16 px-4 md:px-8 flex-1';
                warningDiv.innerHTML = `
                    <div class="max-w-[400px] w-full bg-white rounded-[24px] border border-[#E2ECF8] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-10 flex flex-col items-center text-center gap-6">
                        <!-- Icon Lock -->
                        <div class="w-16 h-16 bg-[#F0F5FD] border border-[#D2E1F6] rounded-full flex items-center justify-center text-[#395886] mb-2">
                            <i data-lucide="lock" class="w-7 h-7 stroke-[1.8]"></i>
                        </div>
                        
                        <!-- Text -->
                        <div class="flex flex-col gap-3">
                            <h2 class="headerText font-bold text-[#1C1616]">Akses Terbatas</h2>
                            <p class="subheaderText text-slate-500 font-normal px-2">Anda harus masuk atau mendaftar terlebih dahulu untuk mengakses halaman ini.</p>
                        </div>
                        
                        <!-- Buttons -->
                        <div class="flex flex-col gap-4 w-full mt-4">
                            <a href="${rootPath}pages/daftar_login/index.html" 
                               class="h-12 bg-[#395886] hover:bg-[#2C4E80] text-white rounded-full font-semibold subheaderText shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer">
                                <i data-lucide="log-in" class="w-5 h-5"></i>
                                Masuk
                            </a>
                            <a href="${rootPath}pages/daftar_login/index.html?action=register" 
                               class="h-12 border border-[#395886] text-[#395886] hover:bg-[#395886]/5 rounded-full font-semibold subheaderText transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer">
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
        // Resolve current user with fallback to hf_currentUser in localStorage, and Jhon deo formalin
        let currentUser = { nama: 'Jhon deo formalin' };
        if (isLoggedIn) {
            if (typeof RootData !== 'undefined') {
                currentUser = RootData.getCurrentUser();
            } else {
                const storedUser = localStorage.getItem('hf_currentUser');
                if (storedUser) {
                    try {
                        const parsed = JSON.parse(storedUser);
                        if (parsed && parsed.nama) {
                            currentUser = parsed;
                        }
                    } catch (e) {
                        // ignore
                    }
                }
            }
        }

        // 2. Update Profile Menu
        const profileBtn = document.getElementById('profile-menu-button');
        if (profileBtn) {
            const parentDiv = profileBtn.parentElement;
            if (parentDiv) {
                if (isLoggedIn) {
                    // Render logged in state
                    parentDiv.innerHTML = `
                        <button id="profile-menu-button" onclick="toggleProfileDropdown(event)"
                            class="text-[#1C1616] hover:text-[#395886] transition-colors duration-200 cursor-pointer flex items-center justify-center"
                            aria-label="Profile">
                            <p class="mr-2">${currentUser.nama}</p>
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
            }
        }

        // 3. Update Mobile Profile Menu if placeholder exists
        const mobileProfileSec = document.getElementById('mobile-profile-section');
        if (mobileProfileSec) {
            if (isLoggedIn) {
                mobileProfileSec.innerHTML = `
                    <div class="bg-[#F0F5FD] border border-[#D2E1F6] rounded-[20px] p-4 flex flex-col gap-3">
                        <div class="flex items-center gap-3">
                            <img class="w-12 h-12 rounded-full border-2 border-white shadow-sm" src="${rootPath}pages/profil/assets/profile_avatar.png" alt="Avatar">
                            <div class="flex flex-col">
                                <span class="subheaderText font-bold text-slate-900">${currentUser.nama}</span>
                                <span class="text-xs text-slate-500">Pasien</span>
                            </div>
                        </div>
                        <div class="flex flex-col gap-2 border-t border-[#D2E1F6]/60 pt-3">
                            <a href="${rootPath}pages/profil/index.html" class="flex items-center gap-3 hover:bg-white/50 transition-colors duration-150 rounded-lg py-1.5 px-2">
                                <i data-lucide="user" class="w-5 h-5 text-[#395886]"></i>
                                <span class="subheaderText font-semibold text-slate-800">Profil anda</span>
                            </a>
                            <a href="${rootPath}pages/profil/index.html" class="flex items-center gap-3 hover:bg-white/50 transition-colors duration-150 rounded-lg py-1.5 px-2">
                                <i data-lucide="settings" class="w-5 h-5 text-[#395886]"></i>
                                <span class="subheaderText font-semibold text-slate-800">Pengaturan</span>
                            </a>
                            <a href="#" onclick="handleLogout(event)" class="flex items-center gap-3 hover:bg-red-50/50 transition-colors duration-150 rounded-lg py-1.5 px-2">
                                <i data-lucide="log-out" class="w-5 h-5 text-red-600"></i>
                                <span class="subheaderText font-semibold text-red-600">Keluar</span>
                            </a>
                        </div>
                    </div>
                `;
            } else {
                mobileProfileSec.innerHTML = `
                    <div class="flex flex-col gap-3">
                        <a href="${rootPath}pages/daftar_login/index.html" 
                           class="h-11 bg-[#395886] hover:bg-[#2C4E80] text-white rounded-[12px] font-semibold subheaderText shadow-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer">
                            <i data-lucide="log-in" class="w-5 h-5"></i>
                            Masuk
                        </a>
                        <a href="${rootPath}pages/daftar_login/index.html?action=register" 
                           class="h-11 border border-[#395886] text-[#395886] hover:bg-[#395886]/5 rounded-[12px] font-semibold subheaderText transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer">
                            <i data-lucide="user-plus" class="w-5 h-5"></i>
                            Daftar Akun
                        </a>
                    </div>
                `;
            }
        }

        // 4. Setup Mobile Drawer toggle functionality
        const mobileMenuBtn = document.getElementById('mobile-menu-button');
        const mobileDrawer = document.getElementById('mobile-drawer');
        const mobileDrawerOverlay = document.getElementById('mobile-drawer-overlay');
        const mobileDrawerClose = document.getElementById('mobile-drawer-close');

        if (mobileMenuBtn && mobileDrawer && mobileDrawerOverlay) {
            const openDrawer = () => {
                mobileDrawerOverlay.classList.remove('opacity-0', 'pointer-events-none');
                mobileDrawer.classList.remove('translate-x-full');
                document.body.style.overflow = 'hidden';
            };

            const closeDrawer = () => {
                mobileDrawerOverlay.classList.add('opacity-0', 'pointer-events-none');
                mobileDrawer.classList.add('translate-x-full');
                document.body.style.overflow = '';
            };

            mobileMenuBtn.addEventListener('click', openDrawer);
            if (mobileDrawerClose) mobileDrawerClose.addEventListener('click', closeDrawer);
            mobileDrawerOverlay.addEventListener('click', closeDrawer);
        }

        // 5. Setup Mobile Drawer expandable extra info
        const infoToggle = document.getElementById('mobile-drawer-info-toggle');
        const infoContent = document.getElementById('mobile-drawer-info-content');
        const infoChevron = document.getElementById('mobile-drawer-info-chevron');

        if (infoToggle && infoContent && infoChevron) {
            infoToggle.addEventListener('click', () => {
                infoContent.classList.toggle('hidden');
                infoChevron.classList.toggle('rotate-180');
            });
        }

        // 6. Initialize Lucide icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
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
