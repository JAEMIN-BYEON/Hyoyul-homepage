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

  // 상담 폼: Formspree로 발송, 이메일 알림 수신
  var form = document.querySelector('form.form');
  if (form) {
    var status = form.querySelector('.form-status');
    var setStatus = function (msg, ok) {
      if (!status) { alert(msg); return; }
      status.hidden = false;
      status.textContent = msg;
      status.style.color = ok ? 'var(--navy)' : '#B4232A';
    };
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (form.action.indexOf('FORMSPREE_ID') !== -1) {
        setStatus('폼 발송이 아직 연동 전입니다. 전화(043-294-0428) 또는 이메일(hyoyul0428@naver.com)로 문의해 주세요.', false);
        return;
      }
      var btn = form.querySelector('.btn-submit');
      if (btn) { btn.disabled = true; btn.textContent = '보내는 중…'; }
      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      }).then(function (res) {
        if (res.ok) {
          form.reset();
          setStatus('문의가 접수되었습니다. 담당 경영지도사가 확인 후 연락드리겠습니다.', true);
        } else {
          setStatus('발송에 실패했습니다. 전화(043-294-0428) 또는 이메일(hyoyul0428@naver.com)로 문의해 주세요.', false);
        }
      }).catch(function () {
        setStatus('발송에 실패했습니다. 전화(043-294-0428) 또는 이메일(hyoyul0428@naver.com)로 문의해 주세요.', false);
      }).finally(function () {
        if (btn) { btn.disabled = false; btn.textContent = '문의 보내기'; }
      });
    });
  }
})();
