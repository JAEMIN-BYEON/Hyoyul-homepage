#!/usr/bin/env python3
"""docs/site-preview.html 데이터 블록 재주입 빌더.

페이지 HTML(d-pages, JSON), 이미지 data URI(d-imgs, JSON),
CSS(d-css, text/plain), JS(d-js, text/plain)를 현재 소스로 갱신한다.
CSS 안의 url("../img/…") 배경 이미지도 __IMG__ 토큰으로 바꿔야
프리뷰에서 히어로 배경이 살아난다. 저장소 루트에서 실행.
"""
import re, os, glob, json, base64, mimetypes

def esc(s):
    return s.replace('</', '<\\/')

FONT_CDN = '<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css">'

pages = {}
for f in ['index.html'] + sorted(glob.glob('pages/*.html')):
    html = open(f).read()
    # srcdoc iframe은 상대경로 폰트를 못 읽으므로 프리뷰에서만 CDN으로 대체
    html = re.sub(r'<link rel="stylesheet" href="(?:\.\./)?assets/fonts/pretendard/pretendardvariable-dynamic-subset\.css">', FONT_CDN, html)
    html = re.sub(r'<link rel="stylesheet" href="(?:\.\./)?assets/css/style\.css">', '<style>__CSS__</style>', html)
    html = re.sub(r'<script src="(?:\.\./)?assets/js/site\.js"(?: defer)?></script>', '<script>__JS__</script>', html)
    html = re.sub(r'(?:\.\./)?assets/img/([A-Za-z0-9._/-]+)', r'__IMG__\1', html)
    pages[f] = html

imgs = {}
for p in glob.glob('assets/img/**/*.*', recursive=True):
    if p.endswith('.md'):
        continue
    name = p[len('assets/img/'):]
    mime = mimetypes.guess_type(p)[0] or 'application/octet-stream'
    imgs[name] = 'data:%s;base64,%s' % (mime, base64.b64encode(open(p, 'rb').read()).decode())

css = open('assets/css/style.css').read()
css = re.sub(r'url\("\.\./img/([A-Za-z0-9._/-]+)"\)', r'url("__IMG__\1")', css)
js = open('assets/js/site.js').read()

src = open('docs/site-preview.html').read()

def repl(src, stype, bid, payload):
    pat = re.compile(r'(<script type="%s" id="%s">).*?(</script>)' % (stype, bid), re.S)
    out, n = pat.subn(lambda m: m.group(1) + payload + m.group(2), src, count=1)
    assert n == 1, bid
    return out

src = repl(src, 'application/json', 'd-pages', esc(json.dumps(pages, ensure_ascii=False)))
src = repl(src, 'application/json', 'd-imgs', esc(json.dumps(imgs, ensure_ascii=False)))
src = repl(src, 'text/plain', 'd-css', esc(css))
src = repl(src, 'text/plain', 'd-js', esc(js))
open('docs/site-preview.html', 'w').write(src)
print('rebuilt %d bytes, %d pages, %d images' % (len(src), len(pages), len(imgs)))
