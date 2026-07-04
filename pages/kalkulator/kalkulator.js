document.addEventListener("DOMContentLoaded", () => {
  const questions = [
    "Seberapa tenang suasana hati Anda hari ini?",
    "Seberapa bersemangat Anda menjalani aktivitas hari ini?",
    "Apakah Anda merasa ada hal Pots yang membuat pikiran Anda terbebani hari ini?",
    "Seberapa baik Anda dapat fokus pada aktivitas hari ini?",
    "Apakah Anda merasa memiliki energi yang cukup hari ini?",
    "Seberapa sering Anda merasa cemas atau khawatir hari ini?",
    "Seberapa nyaman Anda dengan keadaan yang terjadi hari ini?",
    "Apakah Anda merasa mudah tersinggung atau emosi hari ini?",
    "Seberapa puas Anda dengan hari yang sedang Anda jalani?",
    "Secara keseluruhan, bagaimana kondisi perasaan Anda hari ini?"
  ];

  const options = [
    { text: "😔 Sangat Buruk", score: 1 },
    { text: "🙁 Kurang Baik", score: 2 },
    { text: "😐 Biasa Saja", score: 3 },
    { text: "🙂 Cukup Baik", score: 4 },
    { text: "😄 Sangat Baik", score: 5 }
  ];

  let currentQuestionIndex = 0;
  let userAnswers = new Array(questions.length).fill(null);

  // DOM Elements
  const questionText = document.getElementById("question-text");
  const optionsContainer = document.getElementById("options-container");
  const questionIndicator = document.getElementById("question-indicator");
  const progressBarFill = document.getElementById("progress-bar-fill");
  
  const btnCancelQuiz = document.getElementById("btn-cancel-quiz");
  const btnNavBack = document.getElementById("btn-nav-back");
  const btnNavNext = document.getElementById("btn-nav-next");

  function renderQuestion() {
    if (!questionText || !optionsContainer) return;

    // 1. Atur Teks Soal & Indikator Angka
    questionText.innerText = questions[currentQuestionIndex];
    questionIndicator.innerText = `PERTANYAAN ${currentQuestionIndex + 1}/${questions.length}`;
    
    // 2. Update Progress Bar
    const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBarFill.style.width = `${progressPercent}%`;

    // 3. Logika Visibilitas Tombol Cancel Atas (<) vs Navigasi Kembali Bawah
    if (currentQuestionIndex === 0) {
      btnCancelQuiz.classList.remove("hidden"); // Muncul hanya di soal pertama
      btnNavBack.disabled = true;               // Tombol navigasi bawah mati di soal pertama
    } else {
      btnCancelQuiz.classList.add("hidden");    // Sembunyikan tombol atas di soal berikutnya
      btnNavBack.disabled = false;              // Aktifkan tombol navigasi bawah
    }

    // 4. Ubah Teks Tombol Next Menjadi "Selesai" di Pertanyaan Terakhir
    if (currentQuestionIndex === questions.length - 1) {
      btnNavNext.innerText = "Selesai";
    } else {
      btnNavNext.innerText = "Selanjutnya";
    }

    // 5. Render Pilihan Jawaban
    optionsContainer.innerHTML = "";
    options.forEach(opt => {
      const button = document.createElement("button");
      button.className = "w-full py-3.5 px-5 rounded-xl font-medium text-sm text-left transition-all duration-200 border shadow-sm";
      button.innerText = opt.text;

      // Cek apakah opsi ini sedang dipilih oleh user
      if (userAnswers[currentQuestionIndex] === opt.score) {
        // Gaya saat dipilih: Background biru tegas dengan teks putih halus
        button.className += " bg-[#5B84C4] text-white border-[#5B84C4] font-semibold";
      } else {
        // Gaya normal: Putih bersih abadi
        button.className += " bg-white text-gray-700 border-gray-200 hover:bg-gray-50";
      }

      // Klik simpan pilihan jawaban (tanpa lompat otomatis ke soal berikutnya)
      button.addEventListener("click", () => {
        userAnswers[currentQuestionIndex] = opt.score;
        renderQuestion(); // Render ulang untuk memperbarui efek visual highlight pilihan
      });

      optionsContainer.appendChild(button);
    });
  }

  // EVENT HANDLERS

  // Tombol Cancel Atas (<) -> Kembali ke beranda awal
  if (btnCancelQuiz) {
    btnCancelQuiz.addEventListener("click", () => {
      window.location.href = "index.html"; 
    });
  }

  // Tombol Navigasi Bawah - Kembali (Back)
  if (btnNavBack) {
    btnNavBack.addEventListener("click", () => {
      if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderQuestion();
      }
    });
  }

  // Tombol Navigasi Bawah - Selanjutnya (Next) / Selesai
  if (btnNavNext) {
    btnNavNext.addEventListener("click", () => {
      // Validasi: User wajib memilih jawaban sebelum melanjutkan
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

  // Selesai Kuis & Kalkulasi Nilai Akhir
  function finishCalculator() {
    const totalScore = userAnswers.reduce((sum, score) => sum + score, 0);
    const finalCalculatedScore = Math.round((totalScore / (questions.length * 5)) * 100);
    
    alert(`Kalkulasi Selesai! Skor Stres Anda: ${finalCalculatedScore}`);
    // localStorage.setItem("userStressScore", finalCalculatedScore);
    // window.location.href = "dashboard_hasil.html";
  }

  renderQuestion();
});