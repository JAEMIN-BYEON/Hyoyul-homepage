// 모바일 메뉴 토글
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var gnb = document.querySelector('.gnb');
  if (toggle && gnb) {
    toggle.addEventListener('click', function () {
      var open = gnb.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
    });
  }

  // 스크롤 리빌 (reduced-motion 사용자는 CSS에서 즉시 표시)
  var targets = document.querySelectorAll('.sec-head, .card, .stat, .pro-card, .timeline li, .svc-list li, .steps li, .need, .faq details, .deliv li');
  if ('IntersectionObserver' in window && targets.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    targets.forEach(function (el) { el.classList.add('reveal'); io.observe(el); });
  }

  // 시안 단계: 폼 발송은 구축 시 이메일 연동
  var form = document.querySelector('form.form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('시안 화면입니다. 실제 구축 시 이메일 발송이 연동됩니다.');
    });
  }
})();
