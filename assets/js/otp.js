document.addEventListener("DOMContentLoaded", function() {
    const otpInputs = document.querySelectorAll('.otp-input');
    
    otpInputs.forEach((input, index) => {
      // Her input’a yazıldığında tetiklenir
      input.addEventListener('input', (e) => {
        // Her kutuda en fazla 1 karakter olsun
        if (e.target.value.length > 1) {
          e.target.value = e.target.value.slice(0, 1);
        }
        // Eğer input dolarsa otomatik sonraki alana geç
        if (e.target.value && index < otpInputs.length - 1) {
          otpInputs[index + 1].focus();
        }
      });

      // Backspace veya silme tuşuna basıldığında
      input.addEventListener('keydown', (e) => {
        if ((e.key === "Backspace" || e.key === "Delete") && !e.target.value && index > 0) {
          // Önceki input'a odaklan
          otpInputs[index - 1].focus();
        }
      });
    });
    let timeLeft = 5; // 86 saniyeden başlayacağını varsayalım (01:26)
      const countdownEl = document.getElementById('countdown');
      const resendBtn = document.getElementById('resendBtn');

      // Timer fonksiyonu
      const timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
          // Süre dolunca sayacı sıfırla, interval'i durdur
          clearInterval(timerInterval);
          countdownEl.textContent = "00:00";
          // Burada "Kodu yenidən göndərin" linkini aktif hale getirebilirsiniz
           resendBtn.classList.remove('disabled');
        } else {
          // Dakika ve saniye hesapla
          const minutes = Math.floor(timeLeft / 60);
          const seconds = timeLeft % 60;

          // 2 basamaklı gösterim için padStart kullan
          countdownEl.textContent = 
            String(minutes).padStart(2, '0') + ":" + String(seconds).padStart(2, '0');

          timeLeft--;
        }
      }, 1000);
  });