export function initCharts() {
    // Animate numbers on scroll
    const animateValue = (element, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value.toLocaleString();
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    // Observe stats for animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                const targetValue = parseInt(statNumber.textContent.replace(/,/g, ''));
                animateValue(statNumber, 0, targetValue, 1500);
                observer.unobserve(statNumber);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-number').forEach(stat => {
        observer.observe(stat);
    });

    // Chart.js configurations
    const chartColors = {
        primary: '#6366F1',
        secondary: '#8B5CF6',
        success: '#10B981',
        warning: '#F59E0B',
        danger: '#EF4444',
        info: '#3B82F6'
    };

    // Appointment Trend Chart
    const appointmentTrendCtx = document.getElementById('appointmentTrendChart');
    if (appointmentTrendCtx) {
        new Chart(appointmentTrendCtx.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [
                    {
                        label: 'Appointments',
                        data: [150, 165, 180, 170, 190, 210],
                        borderColor: chartColors.primary,
                        backgroundColor: 'rgba(99, 102, 241, 0.1)',
                        borderWidth: 3,
                        tension: 0.4,
                        fill: true,
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        padding: 12,
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)',
                        },
                        ticks: {
                            callback: function(value) {
                                return value;
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false,
                        }
                    }
                }
            }
        });
    }


    // Patient Demographics Chart
    const patientDemographicsCtx = document.getElementById('patientDemographicsChart');
    if (patientDemographicsCtx) {
        new Chart(patientDemographicsCtx.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: ['0-18', '19-40', '41-60', '61+'],
                datasets: [{
                    data: [15, 40, 30, 15],
                    backgroundColor: [
                        chartColors.primary,
                        chartColors.success,
                        chartColors.warning,
                        chartColors.info
                    ],
                    borderWidth: 0,
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                    }
                },
                cutout: '60%',
            }
        });
    }


    // Prescription Trend Chart
    const prescriptionTrendCtx = document.getElementById('prescriptionTrendChart');
    if (prescriptionTrendCtx) {
        new Chart(prescriptionTrendCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Amoxicillin', 'Metformin', 'Lisinopril', 'Atorvastatin', 'Ibuprofen'],
                datasets: [
                    {
                        label: 'Prescriptions Issued',
                        data: [120, 90, 75, 60, 50],
                        backgroundColor: chartColors.primary,
                        borderRadius: 8,
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)',
                        },
                        ticks: {
                            callback: function(value) {
                                return value;
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false,
                        }
                    }
                }
            }
        });
    }

    // Add hover effect to dashboard cards
    const dashboardCards = document.querySelectorAll('.card-hover');
    dashboardCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
}
