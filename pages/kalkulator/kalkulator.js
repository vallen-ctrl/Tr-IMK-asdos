document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Set dynamic greeting with user's name
  const greetingEl = document.getElementById("user-greeting");
  if (greetingEl && typeof RootData !== 'undefined') {
    const user = RootData.getCurrentUser();
    if (user && user.nama) {
      greetingEl.textContent = `Hai, ${user.nama} 👋`;
    }
  }

  // ==========================================
  // DATA DOKTER SPESIALIS KJ
  // ==========================================
  const doctorsKJ = [
    {
      id: "vallen",
      name: "dr. Vallen",
      fullName: "dr. Vallen Nathalio Malia, Sp.KJ.",
      title: "Sp. KJ",
      poli: "psikologi",
      specialization: "Spesialis Kedokteran Jiwa",
      photo: "images/dr-vallen.jpg"
    },
    {
      id: "supri",
      name: "dr. Supri",
      fullName: "dr. Supriyanto, Sp.KJ.",
      title: "Sp. KJ",
      poli: "psikologi",
      specialization: "Spesialis Kedokteran Jiwa",
      photo: "images/dr-supri.jpg"
    },
    {
      id: "memet",
      name: "dr. Memet",
      fullName: "dr. Memet Slamet, Sp.KJ.",
      title: "Sp. KJ",
      poli: "psikologi",
      specialization: "Spesialis Kedokteran Jiwa",
      photo: "images/dr-memet.jpg"
    }
  ];

  // ==========================================
  // FUNGSI RENDER TIPS ATAU REKOMENDASI DOKTER
  // ==========================================
  function renderTipsOrDokter(score) {
    const tipsTitle = document.getElementById("tips-title");
    const tipsContent = document.getElementById("tips-content");

    if (!tipsContent) return;

    if (score > 50) {
      tipsTitle.innerText = "Rekomendasi Dokter Spesialis Jiwa";

      tipsContent.innerHTML = `
        <p class="text-sm text-gray-600 mb-2">Skor stres Anda cukup tinggi. Konsultasikan dengan dokter spesialis jiwa berikut:</p>
        <div class="flex flex-col gap-3">
          ${doctorsKJ.map(doc => `
            <div class="flex items-center gap-3 bg-[#F8FAFC] p-3 rounded-xl border border-gray-100">
              <img src="${doc.photo}" alt="${doc.name}" class="w-12 h-12 rounded-full object-cover bg-gray-200" 
                   onerror="this.onerror=null;this.src='images/default-avatar.jpg'">
              <div class="flex-1 min-w-0">
                <p class="font-bold text-sm text-gray-900">${doc.name}</p>
                <p class="text-xs text-gray-500">${doc.specialization}</p>
              </div>
              <a href="../poli/index.html?filter=psikologi" 
                 class="bg-[#5B84C4] hover:bg-[#4A73B3] text-white px-4 py-2 rounded-lg text-xs font-semibold transition whitespace-nowrap">
                Konsultasi
              </a>
            </div>
          `).join('')}
        </div>
        <p class="text-xs text-gray-400 mt-2">Atau kunjungi halaman <a href="../poli/index.html" class="text-primary underline">Poli</a> untuk pilihan lainnya.</p>
      `;
    } else {
      tipsTitle.innerText = "Tips Kesehatan Mental";
      tipsContent.innerHTML = `
        <div class="bg-[#5B84C4] text-white py-3.5 px-5 rounded-xl text-xs md:text-sm font-medium tracking-wide shadow-sm transition-all duration-200">
          Melakukan hobi ringan atau mendengarkan musik favorit malam ini
        </div>
        <div class="bg-[#5B84C4] text-white py-3.5 px-5 rounded-xl text-xs md:text-sm font-medium tracking-wide shadow-sm transition-all duration-200">
          Tidur yang cukup (7-8 jam) agar energimu pulih besok pagi
        </div>
        <div class="bg-[#5B84C4] text-white py-3.5 px-5 rounded-xl text-xs md:text-sm font-medium tracking-wide shadow-sm transition-all duration-200">
          Tetaplah terhidrasi jangan lupa minum air putih!
        </div>
      `;
    }
  }

  // ==========================================
  // LOGIKA 1: UNTUK HALAMAN UTAMA (DASHBOARD)
  // ==========================================
  const chartContainer = document.getElementById("chart-container");
  const chartDescription = document.getElementById("chart-description");

  if (chartContainer) {
    let savedScore = localStorage.getItem("userStressScore");
    let weeklyDataStorage = localStorage.getItem("userWeeklyStressData");

    const scoreText = document.getElementById("score-text");
    const scoreLabel = document.getElementById("score-label");
    const stressStatusText = document.getElementById("stress-status-text");
    const dominantEmotionText = document.getElementById("dominant-emotion-text");
    const scoreEmoji = document.getElementById("score-emoji");
    const progressRing = document.getElementById("score-progress-ring");

    if (savedScore === null) {
      // BELUM PERNAH INPUT
      if (scoreText) scoreText.innerText = "-";
      if (scoreLabel) scoreLabel.innerText = "-";
      if (stressStatusText) stressStatusText.innerText = "Belum melakukan pengukuran stres";

      if (dominantEmotionText) {
        dominantEmotionText.innerText = "-";
        dominantEmotionText.className = "text-sm font-bold text-gray-400 mb-2";
      }

      if (scoreEmoji) {
        scoreEmoji.src = "./images/netral.png";
        scoreEmoji.alt = "Belum Mengukur";
      }

      if (progressRing) {
        progressRing.style.strokeDasharray = "251.2";
        progressRing.style.strokeDashoffset = "251.2";
        progressRing.className.baseVal = "stroke-gray-300 transition-all duration-700 ease-out";
      }

      chartContainer.innerHTML = `
        <div class="w-full h-36 flex items-center justify-center text-gray-400 text-xs font-medium italic select-none">
          Silakan lakukan kalkulator kuis terlebih dahulu untuk melihat grafik mingguan.
        </div>
      `;

      if (chartDescription) {
        chartDescription.innerText = "Belum melakukan pengukuran stres";
      }

      renderTipsOrDokter(0);

    } else {
      // SUDAH PERNAH INPUT
      let score = parseInt(savedScore);

      let status = "Baik";
      let statusLong = "Skor Stres Rendah";
      let ringColor = "stroke-green-500";
      let textColor = "text-green-500";
      let currentBarBgColor = "bg-green-500";
      let emojiSrc = "./images/baik.png";

      if (score > 70) {
        status = "Sangat Buruk";
        statusLong = "Skor Stres Tinggi";
        ringColor = "stroke-red-500";
        textColor = "text-red-500";
        currentBarBgColor = "bg-red-500";
        emojiSrc = "./images/sangat-buruk.png";
      } else if (score > 50) {
        status = "Buruk";
        statusLong = "Skor Stres Sedang";
        ringColor = "stroke-orange-500";
        textColor = "text-orange-500";
        currentBarBgColor = "bg-orange-500";
        emojiSrc = "./images/buruk.png";
      } else if (score > 35) {
        status = "Netral";
        statusLong = "Skor Stres Normal";
        ringColor = "stroke-yellow-500";
        textColor = "text-yellow-500";
        currentBarBgColor = "bg-yellow-500";
        emojiSrc = "./images/netral.png";
      }

      if (scoreText) scoreText.innerText = score;
      if (scoreLabel) scoreLabel.innerText = status;
      if (stressStatusText) stressStatusText.innerText = statusLong;

      if (dominantEmotionText) {
        dominantEmotionText.innerText = status;
        dominantEmotionText.className = `text-sm font-bold ${textColor} mb-2`;
      }

      if (scoreEmoji) {
        scoreEmoji.src = emojiSrc;
        scoreEmoji.alt = `Emoji ${status}`;
      }

      if (progressRing) {
        const radius = 40;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (score / 100) * circumference;

        progressRing.style.strokeDasharray = `${circumference}`;
        progressRing.style.strokeDashoffset = offset;
        progressRing.className.baseVal = `transition-all duration-700 ease-out ${ringColor}`;
      }

      // AMBIL DATA MINGGUAN
      let dataMingguan;
      if (weeklyDataStorage) {
        dataMingguan = JSON.parse(weeklyDataStorage);
      } else {
        dataMingguan = [
          { hari: "Sen", tanggal: "Senin, 6 Juli 2026", tinggi: 0, warna: "bg-gray-200", terisi: false },
          { hari: "Sel", tanggal: "Selasa, 7 Juli 2026", tinggi: 0, warna: "bg-gray-200", terisi: false },
          { hari: "Rab", tanggal: "Rabu, 8 Juli 2026", tinggi: 0, warna: "bg-gray-200", terisi: false },
          { hari: "Kam", tanggal: "Kamis, 9 Juli 2026", tinggi: 0, warna: "bg-gray-200", terisi: false },
          { hari: "Jum", tanggal: "Jumat, 10 Juli 2026", tinggi: 0, warna: "bg-gray-200", terisi: false },
          { hari: "Sab", tanggal: "Sabtu, 11 Juli 2026", tinggi: 0, warna: "bg-gray-200", terisi: false },
          { hari: "Min", tanggal: "Minggu, 12 Juli 2026", tinggi: 0, warna: "bg-gray-200", terisi: false }
        ];
      }

      chartContainer.innerHTML = "";

      // HITUNG DESKRIPSI GRAFIK
      let totalSkor = 0;
      let jumlahTerisi = 0;
      dataMingguan.forEach(item => {
        if (item.terisi) {
          totalSkor += item.tinggi;
          jumlahTerisi++;
        }
      });

      let deskripsi = "";
      if (jumlahTerisi === 0) {
        deskripsi = "Belum melakukan pengukuran stres";
      } else {
        const rataRata = totalSkor / jumlahTerisi;
        if (rataRata < 35) {
          deskripsi = "Stresmu rendah minggu ini, pertahankan!";
        } else if (rataRata >= 35 && rataRata <= 50) {
          deskripsi = "Stresmu normal minggu ini, tetap jaga keseimbangan.";
        } else if (rataRata > 50 && rataRata <= 70) {
          deskripsi = "Stresmu cenderung tinggi, coba lakukan relaksasi.";
        } else {
          deskripsi = "Stresmu sangat tinggi, segera konsultasi dengan profesional.";
        }
        if (jumlahTerisi === 1) {
          const lastScore = dataMingguan.find(item => item.terisi).tinggi;
          deskripsi = `Skor hari ini: ${lastScore}% - ${deskripsi}`;
        }
      }

      if (chartDescription) {
        chartDescription.innerText = deskripsi;
      }

      // RENDER GRAFIK
      dataMingguan.forEach(item => {
        const column = document.createElement("div");
        column.className = "flex flex-col items-center flex-1 chart-bar-container group";

        const currentHeight = item.terisi ? item.tinggi : 0;
        const currentBg = item.terisi ? item.warna : "bg-gray-200";

        let tooltipTextColor = "text-gray-400";
        if (item.terisi) {
          if (currentHeight > 70) tooltipTextColor = "text-red-400 font-extrabold";
          else if (currentHeight > 50) tooltipTextColor = "text-orange-400 font-extrabold";
          else if (currentHeight > 35) tooltipTextColor = "text-yellow-400 font-extrabold";
          else tooltipTextColor = "text-green-400 font-extrabold";
        }

        column.innerHTML = `
          <div class="w-full h-36 flex items-end justify-center px-1 relative cursor-pointer">
            <div class="w-6 md:w-8 ${currentBg} chart-bar-item rounded-t-md" style="height: ${currentHeight}%;"></div>
          </div>
          <span class="text-xs text-gray-500 mt-2 font-medium">${item.hari}</span>
          <div class="absolute bottom-16 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] py-1 px-2.5 rounded shadow-xl chart-tooltip whitespace-nowrap z-30 text-center leading-normal">
            ${item.tanggal} <br> 
            <span class="${tooltipTextColor}">Skor Stres: ${currentHeight}%</span>
          </div>
        `;

        chartContainer.appendChild(column);
      });

      renderTipsOrDokter(score);
    }
  }

  // ==========================================
  // LOGIKA 2: UNTUK HALAMAN KALKULATOR (KUIS)
  // ==========================================
  if (document.getElementById("question-text")) {
    const questions = [
      "Seberapa tenang suasana hati Anda hari ini?",
      "Seberapa bersemangat Anda menjalani aktivitas hari ini?",
      "Apakah Anda merasa ada hal yang membuat pikiran Anda terbebani hari ini?",
      "Seberapa baik Anda dapat fokus pada aktivitas hari ini?",
      "Apakah Anda merasa memiliki energi yang cukup hari ini?",
      "Seberapa sering Anda merasa cemas atau khawatir hari ini?",
      "Seberapa nyaman Anda dengan keadaan yang terjadi hari ini?",
      "Apakah Anda merasa mudah tersinggung atau emosi hari ini?",
      "Seberapa puas Anda dengan hari yang sedang Anda jalani?",
      "Secara keseluruhan, bagaimana kondisi perasaan Anda hari ini?"
    ];

    const options = [
      { text: "😔 Sangat Buruk", score: 5 },
      { text: "🙁 Kurang Baik", score: 4 },
      { text: "😐 Biasa Saja", score: 3 },
      { text: "🙂 Cukup Baik", score: 2 },
      { text: "😄 Sangat Baik", score: 1 }
    ];

    let currentQuestionIndex = 0;
    let userAnswers = new Array(questions.length).fill(null);

    const questionText = document.getElementById("question-text");
    const optionsContainer = document.getElementById("options-container");
    const questionIndicator = document.getElementById("question-indicator");
    const progressBarFill = document.getElementById("progress-bar-fill");

    const btnCancelQuiz = document.getElementById("btn-cancel-quiz");
    const btnNavBack = document.getElementById("btn-nav-back");
    const btnNavNext = document.getElementById("btn-nav-next");

    function renderQuestion() {
      if (!questionText || !optionsContainer) return;

      questionText.innerText = questions[currentQuestionIndex];
      if (questionIndicator) questionIndicator.innerText = `PERTANYAAN ${currentQuestionIndex + 1}/${questions.length}`;

      if (progressBarFill) {
        const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;
        progressBarFill.style.width = `${progressPercent}%`;
      }

      if (currentQuestionIndex === 0) {
        if (btnCancelQuiz) btnCancelQuiz.classList.remove("hidden");
        if (btnNavBack) btnNavBack.disabled = true;
      } else {
        if (btnCancelQuiz) btnCancelQuiz.classList.add("hidden");
        if (btnNavBack) btnNavBack.disabled = false;
      }

      if (currentQuestionIndex === questions.length - 1) {
        if (btnNavNext) btnNavNext.innerText = "Selesai";
      } else {
        if (btnNavNext) btnNavNext.innerText = "Selanjutnya";
      }

      optionsContainer.innerHTML = "";
      options.forEach(opt => {
        const button = document.createElement("button");
        button.className = "w-full py-3.5 px-5 rounded-xl font-medium text-sm text-left transition-all duration-200 border shadow-sm cursor-pointer";
        button.innerText = opt.text;

        if (userAnswers[currentQuestionIndex] === opt.score) {
          button.className += " bg-[#5B84C4] text-white border-[#5B84C4] font-semibold";
        } else {
          button.className += " bg-white text-gray-700 border-gray-200 hover:bg-gray-50";
        }

        button.addEventListener("click", () => {
          userAnswers[currentQuestionIndex] = opt.score;
          renderQuestion();
        });

        optionsContainer.appendChild(button);
      });
    }

    if (btnCancelQuiz) {
      btnCancelQuiz.addEventListener("click", () => {
        window.location.href = "index.html";
      });
    }

    if (btnNavBack) {
      btnNavBack.addEventListener("click", () => {
        if (currentQuestionIndex > 0) {
          currentQuestionIndex--;
          renderQuestion();
        }
      });
    }

    if (btnNavNext) {
      btnNavNext.addEventListener("click", () => {
        if (userAnswers[currentQuestionIndex] === null) {
          alert("Silakan pilih salah satu jawaban terlebih dahulu!");
          return;
        }

        if (currentQuestionIndex < questions.length - 1) {
          currentQuestionIndex++;
          renderQuestion();
        } else {
          finishCalculator();
        }
      });
    }

    function finishCalculator() {
      const totalScore = userAnswers.reduce((sum, score) => sum + score, 0);
      const finalCalculatedScore = Math.round((totalScore / (questions.length * 5)) * 100);

      let weeklyDataStorage = localStorage.getItem("userWeeklyStressData");
      let dataMingguan = weeklyDataStorage ? JSON.parse(weeklyDataStorage) : [
        { hari: "Sen", tanggal: "Senin, 6 Juli 2026", tinggi: 0, warna: "bg-gray-200", terisi: false },
        { hari: "Sel", tanggal: "Selasa, 7 Juli 2026", tinggi: 0, warna: "bg-gray-200", terisi: false },
        { hari: "Rab", tanggal: "Rabu, 8 Juli 2026", tinggi: 0, warna: "bg-gray-200", terisi: false },
        { hari: "Kam", tanggal: "Kamis, 9 Juli 2026", tinggi: 0, warna: "bg-gray-200", terisi: false },
        { hari: "Jum", tanggal: "Jumat, 10 Juli 2026", tinggi: 0, warna: "bg-gray-200", terisi: false },
        { hari: "Sab", tanggal: "Sabtu, 11 Juli 2026", tinggi: 0, warna: "bg-gray-200", terisi: false },
        { hari: "Min", tanggal: "Minggu, 12 Juli 2026", tinggi: 0, warna: "bg-gray-200", terisi: false }
      ];

      let targetIndex = dataMingguan.findIndex(item => item.terisi === false);

      if (targetIndex === -1) {
        targetIndex = 0;
        dataMingguan.forEach(item => item.terisi = false);
      }

      let barBgColor = "bg-green-500";
      if (finalCalculatedScore > 70) barBgColor = "bg-red-500";
      else if (finalCalculatedScore > 50) barBgColor = "bg-orange-500";
      else if (finalCalculatedScore > 35) barBgColor = "bg-yellow-500";

      dataMingguan[targetIndex].tinggi = finalCalculatedScore;
      dataMingguan[targetIndex].warna = barBgColor;
      dataMingguan[targetIndex].terisi = true;

      localStorage.setItem("userStressScore", finalCalculatedScore);
      localStorage.setItem("userWeeklyStressData", JSON.stringify(dataMingguan));

      alert(`Kalkulasi Selesai!\nSkor Kesehatan Mental Anda: ${finalCalculatedScore}/100`);
      window.location.href = "index.html";
    }

    renderQuestion();
  }
});