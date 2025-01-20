const chartGeneralExams = document.getElementById("chartGeneralExams");
const chartDailyTests = document.getElementById("chartDailyTests");
const chartQuiz = document.getElementById("chartQuiz");
const chartCompetitions = document.getElementById("chartCompetitions");
const chartOlympiads = document.getElementById("chartOlympiads");
const chartTrivia = document.getElementById("chartTrivia");
// Chart data
const chartData = {
    labels: ["Doğru cavablar", "Yanlış cavablar", "Cavablandırılmayan"],
    datasets: [{
        data: [40.85, 25, 30], // Faiz dəyərləri
        backgroundColor: ["#00BB4A", "#FF0B23", "#DDD"],
        hoverOffset: 4
    }]
};

// Chart options
const chartOptions = {
    plugins: {
        legend: {
            display: false // Daxili legend gizlədilir
        },
        // Tooltip konfiqurasiyası
        tooltip: {
            callbacks: {
                label: function (context) {
                    const label = context.label || "";
                    return label; // Tooltipdə yalnız başlıq göstərilir
                }
            }
        },
        // Datalabels plugin: Pie içində faizləri göstərmək üçün
        datalabels: {
            color: '#fff', // Faiz rəngi
            font: {
                weight: 'bold',
                size: 14
            },
            formatter: (value) => `${value}%` // Faiz dəyəri göstərilir
        }
    },
    responsive: true,
    maintainAspectRatio: true // Aspect ratio-nu qoruyuruq
};

// Chart-ların yaradılması
if (chartGeneralExams) {
    new Chart(chartGeneralExams, {
        type: "pie",
        data: chartData,
        options: chartOptions,
        plugins: [ChartDataLabels]
    });
}
if (chartDailyTests) {
    new Chart(chartDailyTests, {
        type: "pie",
        data: chartData,
        options: chartOptions,
        plugins: [ChartDataLabels]
    });
}
if (chartDailyTests) {
    new Chart(chartQuiz, {
        type: "pie",
        data: chartData,
        options: chartOptions,
        plugins: [ChartDataLabels]
    });
}
if (chartDailyTests) {
    new Chart(chartCompetitions, {
        type: "pie",
        data: chartData,
        options: chartOptions,
        plugins: [ChartDataLabels]
    });
}
if (chartDailyTests) {
    new Chart(chartOlympiads, {
        type: "pie",
        data: chartData,
        options: chartOptions,
        plugins: [ChartDataLabels]
    });
}
if (chartDailyTests) {
    new Chart(chartTrivia, {
        type: "pie",
        data: chartData,
        options: chartOptions,
        plugins: [ChartDataLabels]
    });
}

const platformTimeChartData = {
    labels: ['Platformada keçirilən vaxt', 'İmtahanda keçirilən vaxt'],
    datasets: [{
        data: [75, 25], // Faiz dəyərləri
        backgroundColor: ['#04C2C4', '#FF9F41'], // Rənglər
        hoverOffset: 4
    }]
};

// Tooltip formatlaması
const platformTimeChartOptions = {
    plugins: {
        legend: {
            display: false, // Legend-i tamamilə deaktiv edirik
        },
        tooltip: {
            callbacks: {
                label: function (context) {
                    const label = context.label || '';
                    const value = context.raw || 0;
                    return `${label}: ${value}%`; // Tooltip mətni
                }
            }
        }
    },
    responsive: true,
    cutout: '70%' // Donut tərzi üçün boşluq
};

// Chart yaratmaq
const platformTimeChart = document.getElementById("platformTimeChart");
if (platformTimeChart) {
    new Chart(platformTimeChart, {
        type: 'doughnut',
        data: platformTimeChartData,
        options: platformTimeChartOptions
    });
}

// Chart məlumatları
const examCountChartData = {
    labels: [
        'Ümumi sınaqlar',
        'Sınaqlar',
        'Quizlər',
        'Müsabiqələr',
        'Olimpiadalar',
        'Viktorinalar'
    ],
    datasets: [{
        data: [4, 4, 1, 4, 2, 0], // Hər kateqoriyanın dəyəri
        backgroundColor: [
            '#00a99d', // Ümumi sınaqlar
            '#ff9900', // Sınaqlar
            '#99cc00', // Quizlər
            '#ff6666', // Müsabiqələr
            '#ffcc66', // Olimpiadalar
            '#cccccc'  // Viktorinalar
        ],
        hoverOffset: 4
    }]
};

// Chart konfiqurasiyası
const examCountChartOptions = {
    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            callbacks: {
                label: function (context) {
                    const label = context.label || '';
                    const value = context.raw || 0;
                    return `${label}: ${value}`; // Tooltip mətni
                }
            }
        }
    },
    responsive: true,
    maintainAspectRatio: false
};

// Chart yaradılması
const examCountChart = document.getElementById("examCountChart");
if (examCountChart) {
    new Chart(examCountChart, {
        type: 'pie',
        data: examCountChartData,
        options: examCountChartOptions
    });
}

const combinedData = {
    labels: ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'İyun'], // X oxunun etiketləri
    datasets: [
        {
            type: 'bar', // Sütun qrafiki
            label: 'Keçdiyi imtahan sayı',
            data: [5, 10, 8, 12, 15, 20], // Sütun məlumatları
            backgroundColor: 'rgba(255, 153, 0, 0.8)', // Narıncı rəng
            borderColor: 'rgba(255, 153, 0, 1)',
            borderWidth: 1
        },
        {
            type: 'line',
            label: 'Orta nəticə',
            data: [10, 20, 18, 15, 22, 40],
            borderColor: '#428BC1',
            borderWidth: 1,
            tension: 0.2,
            pointBackgroundColor: '#428BC1',
            fill: false // Xətt altı doldurulsun
        }
    ]
};

// Qrafik tənzimləmələri
const combinedOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            callbacks: {
                label: function (context) {
                    return `${context.dataset.label}: ${context.raw}`;
                }
            }
        }
    },
    scales: {
        x: {
            ticks: {
                display: false,
            },
            title: {
                display: false,
            }
        },
        y: {
            ticks: {
                display: false,
            },
            beginAtZero: true,
            title: {
                display: false,
            }
        }
    }
};

// Chart yaratmaq
const examLineChart = document.getElementById("examLineChart");
if (examLineChart) {

    const ctx = examLineChart.getContext('2d');
    new Chart(ctx, {
        type: 'bar', // Əsas qrafik tipi
        data: combinedData,
        options: combinedOptions
    });
}

const chartAzerbaijaniLanguage = document.getElementById("chartAzerbaijaniLanguage");
const chartMathematics = document.getElementById("chartMathematics");
const chartPhysics = document.getElementById("chartPhysics");
const chartChemistry = document.getElementById("chartChemistry");
const chartBiology = document.getElementById("chartBiology");
const chartGeography = document.getElementById("chartGeography");
const chartHistory = document.getElementById("chartHistory");
const chartEnglishLanguage = document.getElementById("chartEnglishLanguage");
const chartInformatics = document.getElementById("chartInformatics");
// Chart-ların yaradılması
if (chartAzerbaijaniLanguage) {
    new Chart(chartAzerbaijaniLanguage, {
        type: "pie",
        data: chartData,
        options: chartOptions,
        plugins: [ChartDataLabels]
    });
}
if (chartMathematics) {
    new Chart(chartMathematics, {
        type: "pie",
        data: chartData,
        options: chartOptions,
        plugins: [ChartDataLabels]
    });
}
if (chartPhysics) {
    new Chart(chartPhysics, {
        type: "pie",
        data: chartData,
        options: chartOptions,
        plugins: [ChartDataLabels]
    });
}
if (chartChemistry) {
    new Chart(chartChemistry, {
        type: "pie",
        data: chartData,
        options: chartOptions,
        plugins: [ChartDataLabels]
    });
}
if (chartBiology) {
    new Chart(chartBiology, {
        type: "pie",
        data: chartData,
        options: chartOptions,
        plugins: [ChartDataLabels]
    });
}
if (chartGeography) {
    new Chart(chartGeography, {
        type: "pie",
        data: chartData,
        options: chartOptions,
        plugins: [ChartDataLabels]
    });
}
if (chartHistory) {
    new Chart(chartHistory, {
        type: "pie",
        data: chartData,
        options: chartOptions,
        plugins: [ChartDataLabels]
    });
}
if (chartEnglishLanguage) {
    new Chart(chartEnglishLanguage, {
        type: "pie",
        data: chartData,
        options: chartOptions,
        plugins: [ChartDataLabels]
    });
}
if (chartInformatics) {
    new Chart(chartInformatics, {
        type: "pie",
        data: chartData,
        options: chartOptions,
        plugins: [ChartDataLabels]
    });
}
