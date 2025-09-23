// 打字機效果
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  
  function typing() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    } else {
      // 打字完成後顯示副標題並隱藏游標
      const subtitle = document.querySelector('.hero-subtitle');
      if (subtitle) {
        subtitle.style.opacity = '1';
      }
      // 添加 class 來隱藏游標
      element.classList.add('typing-complete');
    }
  }
  
  typing();
}

// 影片播放控制 - 簡化版本避免滾動
function setupVideoClickHandler() {
  const iframe = document.querySelector('.video-container iframe');
  
  if (iframe) {
    // 直接啟用iframe的pointer-events，無需複雜的處理
    iframe.style.pointerEvents = 'auto';
  }
}

// 當頁面載入完成後執行打字機效果
document.addEventListener('DOMContentLoaded', function() {
  const titleElement = document.getElementById('typewriter-title');
  const subtitleElement = document.querySelector('.hero-subtitle');
  
  if (titleElement && subtitleElement) {
    // 初始隱藏副標題
    subtitleElement.style.opacity = '0';
    subtitleElement.style.transition = 'opacity 0.5s ease-in';
    
    // 開始打字機效果
    typeWriter(titleElement, '你專注，我紀錄', 80);
  }
  
  // 初始化影片點擊處理
  setupVideoClickHandler();
  
  // 初始化統計數字動畫
  setupStatsAnimation();
});

// 統計數字動畫
function animateCounter(element, target, suffix = '', duration = 2000) {
  let start = 0;
  const startTime = Date.now();
  
  function updateCounter() {
    const currentTime = Date.now();
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // 使用 easeOut 緩動函數讓動畫更自然
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(start + (target - start) * easeOut);
    
    element.textContent = current + suffix;
    
    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target + suffix;
    }
  }
  
  updateCounter();
}

// 設置統計動畫觀察器
function setupStatsAnimation() {
  const statsElements = document.querySelectorAll('.stat-number');
  
  if (statsElements.length === 0) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const target = parseInt(element.getAttribute('data-target'));
        const suffix = element.getAttribute('data-suffix') || '';
        
        // 避免重複動畫
        if (!element.classList.contains('animated')) {
          element.classList.add('animated');
          animateCounter(element, target, suffix);
        }
      }
    });
  }, {
    threshold: 0.5,
    rootMargin: '0px 0px -50px 0px'
  });
  
  statsElements.forEach(element => {
    observer.observe(element);
  });
}