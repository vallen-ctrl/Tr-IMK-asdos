document.addEventListener("DOMContentLoaded", () => {
  // =========================================================================
  // 1. LOGIK GRAFIK MINGGUAN (CHART BARS & TOOLTIPS)
  // =========================================================================
  const weeklyData = [
    { day: "Sen", date: "29 Juni 2026", level: "Sedang", percentage: 55, color: "bg-yellow-400 hover:bg-yellow-500", textColor: "text-yellow-400" },
    { day: "Sel", date: "30 Juni 2026", level: "Tinggi", percentage: 85, color: "bg-red-500 hover:bg-red-600", textColor: "text-red-500" },
    { day: "Rab", date: "1 Juli 2026", level: "Rendah", percentage: 30, color: "bg-green-500 hover:bg-green-600", textColor: "text-green-400" },
    { day: "Kam", date: "2 Juli 2026", level: "Sedang", percentage: 60, color: "bg-yellow-400 hover:bg-yellow-500", textColor: "text-yellow-400" },
    { day: "Jum", date: "3 Juli 2026", level: "Rendah", percentage: 25, color: "bg-green-500 hover:bg-green-600", textColor: "text-green-400" },
    { day: "Sab", date: "4 Juli 2026", level: "Tinggi", percentage: 75, color: "bg-red-500 hover:bg-red-600", textColor: "text-red-500" },
    { day: "Min", date: "5 Juli 2026", level: "Tinggi", percentage: 90, color: "bg-red-500 hover:bg-red-600", textColor: "text-red-500" }
  ];

  const chartContainer = document.getElementById("chart-container");
  
  if (chartContainer) {
    chartContainer.innerHTML = "";
    weeklyData.forEach(item => {
      const colWrapper = document.createElement("div");
      colWrapper.className = "chart-bar-container flex flex-col items-center w-full group relative";
      colWrapper.innerHTML = `
        <div class="chart-tooltip absolute -top-12 bg-gray-800 text-white p-2 rounded-lg text-[10px] shadow-lg whitespace-nowrap text-center z-30">
          <p class="font-bold">${item.day}, ${item.date}</p>
          <p>Stres: <span class="font-bold ${item.textColor}">${item.level}</span> (${item.percentage}%)</p>
        </div>
        <div class="w-full h-36 flex items-end justify-center relative">
          <div class="w-5 md:w-6 ${item.color} rounded-t transition-all duration-300 cursor-pointer shadow-sm" style="height: ${item.percentage}%;"></div>
        </div>
        <div class="pt-2 text-center w-full">
          <span class="footerText text-gray-600 font-medium select-none">${item.day}</span>
        </div>
      `;
      chartContainer.appendChild(colWrapper);
    });
  }

  // =========================================================================
  // 2. LOGIK RINGKASAN SKOR (DIAGRAM LINGKARAN & EMOJI DINAMIS)
  // =========================================================================
  const score = 42; 
  
  const progressRing = document.getElementById("score-progress-ring");
  const scoreText = document.getElementById("score-text");
  const scoreLabel = document.getElementById("score-label");
  const stressStatusText = document.getElementById("stress-status-text");
  const dominantEmotionText = document.getElementById("dominant-emotion-text");
  const scoreEmoji = document.getElementById("score-emoji");

  if (progressRing && scoreText) {
    scoreText.innerText = score;

    const radius = 40;
    const circumference = 2 * Math.PI * radius; 
    const offset = circumference - (score / 100) * circumference;
    
    progressRing.style.strokeDasharray = circumference;
    progressRing.style.strokeDashoffset = offset;

    let strokeClass = "stroke-green-500";
    let textClass = "text-green-500";
    let statusLabel = "Skor Stres Rendah";
    let emotionLabel = "Baik";
    
    // --- SINKRONISASI NAMA FILE (Disesuaikan langsung dengan struktur asetmu) ---
    let emojiFile = "baik.png"; 

    if (score <= 35) {
      strokeClass = "stroke-green-500";
      textClass = "text-green-500";
      statusLabel = "Skor Stres Rendah";
      emotionLabel = "Sangat Baik";
      emojiFile = "sangat_baik.png"; 
    } else if (score <= 50) {
      strokeClass = "stroke-green-500"; 
      textClass = "text-green-500";
      statusLabel = "Skor Stres Rendah";
      emotionLabel = "Baik";
      emojiFile = "baik.png"; // Mengarah ke images/baik.png
    } else if (score <= 70) {
      strokeClass = "stroke-yellow-400"; 
      textClass = "text-yellow-500";
      statusLabel = "Skor Stres Sedang";
      emotionLabel = "Netral";
      emojiFile = "netral.png";
    } else if (score <= 85) {
      strokeClass = "stroke-orange-500";
      textClass = "text-orange-500";
      statusLabel = "Skor Stres Tinggi";
      emotionLabel = "Buruk";
      emojiFile = "buruk.png";
    } else {
      strokeClass = "stroke-red-500"; 
      textClass = "text-red-500";
      statusLabel = "Skor Stres Sangat Tinggi";
      emotionLabel = "Sangat Buruk";
      emojiFile = "sangat_buruk.png";
    }

    // Terapkan perubahan ke elemen UI
    progressRing.className = `${strokeClass} transition-all duration-700 ease-out`;
    if (scoreLabel) scoreLabel.innerText = emotionLabel;
    if (stressStatusText) stressStatusText.innerText = statusLabel;
    
    if (dominantEmotionText) {
      dominantEmotionText.innerText = emotionLabel;
      dominantEmotionText.className = `text-sm font-bold ${textClass}`;
    }
    
    // Pasang path gambar final ke src img
    if (scoreEmoji) {
      scoreEmoji.src = `images/${emojiFile}`;
      scoreEmoji.alt = `Emoji ${emotionLabel}`;
    }
  }
});