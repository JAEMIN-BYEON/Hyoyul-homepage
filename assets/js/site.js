// 모바일 메뉴 토글
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var gnb = document.querySelector('.gnb');
  if (toggle && gnb) {
    // 하위 메뉴 접이식 토글 버튼 생성
    gnb.querySelectorAll(':scope > ul > li').forEach(function (li) {
      if (!li.querySelector('.sub')) return;
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'sub-toggle';
      btn.setAttribute('aria-label', '하위 메뉴 열기');
      btn.setAttribute('aria-expanded', 'false');
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var open = li.classList.toggle('sub-open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      li.appendChild(btn);
    });

    toggle.addEventListener('click', function () {
      var open = gnb.classList.toggle('open');
      toggle.classList.toggle('open', open);
      document.body.classList.toggle('nav-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
      if (open) {
        var act = gnb.querySelector('li.active');
        if (act && act.querySelector('.sub')) act.classList.add('sub-open');
      }
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
