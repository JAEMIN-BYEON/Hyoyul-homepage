// 모바일 메뉴 토글
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var gnb = document.querySelector('.gnb');
  if (toggle && gnb) {
    toggle.addEventListener('click', function () {
      var open = gnb.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
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
