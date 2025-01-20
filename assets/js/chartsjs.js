
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
new Chart(document.getElementById("chartGeneralExams"), {
    type: "pie",
    data: chartData,
    options: chartOptions,
    plugins: [ChartDataLabels]
});

new Chart(document.getElementById("chartDailyTests"), {
    type: "pie",
    data: chartData,
    options: chartOptions,
    plugins: [ChartDataLabels]
});

new Chart(document.getElementById("chartQuiz"), {
    type: "pie",
    data: chartData,
    options: chartOptions,
    plugins: [ChartDataLabels]
});
new Chart(document.getElementById("chartCompetitions"), {
    type: "pie",
    data: chartData,
    options: chartOptions,
    plugins: [ChartDataLabels]
});
new Chart(document.getElementById("chartOlympiads"), {
    type: "pie",
    data: chartData,
    options: chartOptions,
    plugins: [ChartDataLabels]
});
new Chart(document.getElementById("chartTrivia"), {
    type: "pie",
    data: chartData,
    options: chartOptions,
    plugins: [ChartDataLabels]
});

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
new Chart(document.getElementById('platformTimeChart'), {
    type: 'doughnut',
    data: platformTimeChartData,
    options: platformTimeChartOptions
});


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
          label: function(context) {
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
  new Chart(document.getElementById('examCountChart'), {
    type: 'pie',
    data: examCountChartData,
    options: examCountChartOptions
  });
  