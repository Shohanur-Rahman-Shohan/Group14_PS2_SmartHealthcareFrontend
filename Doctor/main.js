import { router } from './router.js';
import { initCharts } from './charts.js'; // Import the chart initialization function

document.addEventListener('DOMContentLoaded', () => {
    router.init('app-content');

    // Define routes
    router.addRoute('/dashboard', 'dashboard.html', initCharts);
    router.addRoute('/appointments', 'Appointments.html');
    router.addRoute('/patient-medical-history', 'PatientMedicalHistory.html');
    router.addRoute('/patient-list', 'PatientList.html');
    router.addRoute('/create-prescription', 'CreatePrescription.html');
    router.addRoute('/view-prescriptions', 'ViewPrescriptions.html');
    router.addRoute('/investigation-reports', 'InvestigationReports.html');
    router.addRoute('/order-investigation', 'OrderInvestigation.html');
    router.addRoute('/ai-disease-prediction', 'AIDiseasePrediction.html');
    router.addRoute('/smart-recommendations', 'SmartRecommendations.html');
    router.addRoute('/messages-notifications', 'MessagesNotifications.html');
    router.addRoute('/profile-settings', 'ProfileSettings.html');
    router.addRoute('/profile', 'Profile.html');
    router.addRoute('/report', 'Report.html');

    // Initial route load
    router.loadRoute(window.location.hash || '#/dashboard');

    // Handle navigation clicks
    document.body.addEventListener('click', (e) => {
        const target = e.target.closest('a[data-route]');
        if (target) {
            e.preventDefault();
            const route = target.getAttribute('data-route');
            router.navigate(route);
        }
    });

    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => {
        router.loadRoute(window.location.hash || '#/dashboard');
    });

    // Update current date and time
    function updateDateTime() {
        const now = new Date();
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        const dateTimeElement = document.getElementById('currentDateTime');
        if (dateTimeElement) {
            dateTimeElement.textContent = now.toLocaleDateString('en-US', options);
        }
    }
    updateDateTime();
    setInterval(updateDateTime, 1000);

    // Top menu toggle
    const menuBtn = document.getElementById('menuBtn');
    const menuDropdown = document.getElementById('menuDropdown');
    if (menuBtn && menuDropdown) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            menuDropdown.classList.toggle('hidden');
        });

        document.addEventListener('click', (e) => {
            if (!menuBtn.contains(e.target) && !menuDropdown.contains(e.target)) {
                menuDropdown.classList.add('hidden');
            }
        });
    }

    // Dropdown functionality
    const dropdownButtons = document.querySelectorAll('.dropdownBtn');
    let activeDropdown = null;

    dropdownButtons.forEach(btn => {
        const dropdown = btn.nextElementSibling;
        if (!dropdown) return;

        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (activeDropdown && activeDropdown !== dropdown) {
                activeDropdown.classList.remove('show');
            }
            if (dropdown.classList.contains('show')) {
                dropdown.classList.remove('show');
                activeDropdown = null;
            } else {
                dropdown.classList.add('show');
                activeDropdown = dropdown;
            }
        });

        btn.addEventListener('mouseenter', () => dropdown.classList.add('show'));
        btn.addEventListener('mouseleave', () => {
            setTimeout(() => {
                if (!dropdown.matches(':hover')) {
                    dropdown.classList.remove('show');
                }
            }, 100);
        });

        if (dropdown) {
            dropdown.addEventListener('mouseleave', () => {
                dropdown.classList.remove('show');
                if (activeDropdown === dropdown) activeDropdown = null;
            });
        }
    });

    document.body.addEventListener('click', () => {
        if (activeDropdown) {
            activeDropdown.classList.remove('show');
            activeDropdown = null;
        }
    });

    // Hide/show navbar on scroll
    let lastScroll = 0;
    const featureNavbar = document.getElementById('featureNavbar');
    if (featureNavbar) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            if (currentScroll > lastScroll && currentScroll > 100) {
                featureNavbar.style.transform = 'translateY(-100%)';
            } else {
                featureNavbar.style.transform = 'translateY(0)';
            }
            lastScroll = currentScroll;
        });
    }

    // Loading animation
    const loader = document.getElementById('loadingScreen');
    if (loader) {
        loader.classList.add('opacity-0');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 700);
        document.body.classList.add('loaded');
    }
});
