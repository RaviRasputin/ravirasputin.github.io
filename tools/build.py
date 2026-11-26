#!/usr/bin/env python3
"""Build the static pages of ravirasputin.github.io.

Sources live in src/ (page bodies in src/pages/, shared nav, footer and structured
data beside them). Run `python3 tools/build.py` from the repository root; it writes
index.html and one index.html per sub-folder (about/, publications/, ...) plus sitemap.xml.
"""
import json, re, os, datetime
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SITE = 'https://ravirasputin.github.io'
CSS_V = '20261127b'
UPDATED = '26 November 2026'
UPDATED_ISO = '2026-11-26'

PAGES = [  # slug, path, nav href, description
 ('home', '/', None, 'Ravi Kumar, Senior Research Fellow and PhD candidate in International Relations, Central University of Kerala. Research on status, rising powers, and India’s foreign and nuclear policy.'),
 ('about', '/about/', '/about/', 'Biography of Ravi Kumar: education, research interests and academic background.'),
 ('research', '/research/', '/research/', 'Research profile: status and recognition, region formation and rising powers, India’s foreign and nuclear policy, and the Indo-Pacific.'),
 ('publications', '/publications/', '/publications/', 'Journal articles, book chapters and books by Ravi Kumar.'),
 ('research-in-progress', '/research-in-progress/', '/research-in-progress/', 'Current projects, forthcoming publications and manuscripts under review.'),
 ('datasets', '/datasets/', '/datasets/', 'Open datasets: Lok Sabha and Rajya Sabha debates (Harvard Dataverse) and the Foreign Affairs Record archive.'),
 ('book-reviews', '/book-reviews/', '/book-reviews/', 'Published book reviews by Ravi Kumar, with covers, summaries and DOIs.'),
 ('talks', '/talks/', '/talks/', 'Talks, invited lectures and conference papers.'),
 ('teaching', '/teaching/', '/teaching/', 'Courses taught, courses prepared to teach, and the UGC NET Paper 1 preparation programme.'),
 ('cv', '/cv/', '/cv/', 'Curriculum vitae of Ravi Kumar: education, research positions, awards, academic service and skills.'),
 ('book', '/book/', '/book/', 'UGC NET Paper 1: Teaching and Research Aptitude, Unit-wise Question Bank, and its free companion booklet.'),
 ('reading', '/reading/', '/reading/', 'Books currently being read and books finished, with short notes.'),
 ('photographs', '/photographs/', None, 'Photographs from talks and teaching.'),
 ('contact', '/contact/', '/contact/', 'Contact details, academic profiles and CV download.'),
]
def read(p): return open(os.path.join(ROOT, p), encoding='utf-8').read()
def esc(t): return t.replace('&', '&amp;').replace('"', '&quot;')

layout = read('src/layout.html')
nav_t = read('src/nav.html'); foot_t = read('src/footer.html').replace('25 November 2026', UPDATED).replace('2026-11-25', UPDATED_ISO)
lb = read('src/lightbox.html')
ld = json.load(open(os.path.join(ROOT, 'src/jsonld.json'), encoding='utf-8'))
graph = ld['@graph']
def ld_for(slug):
    if slug == 'home': keep = [g for g in graph if g['@type'] == 'Person']
    elif slug == 'book': keep = [g for g in graph if g['@type'] == 'Book']
    elif slug == 'datasets': keep = [g for g in graph if g['@type'] == 'Dataset']
    else: return ''
    return '<script type="application/ld+json">\n' + json.dumps({'@context': ld['@context'], '@graph': keep}, ensure_ascii=False) + '\n  </script>'

urls = []
for slug, path, navhref, desc in PAGES:
    body = read('src/pages/%s.html' % slug)
    h2 = re.search(r'<h2[^>]*>(.*?)</h2>', body, re.S)
    base = 'Ravi Kumar | International Relations, Central University of Kerala'
    title = base if slug == 'home' else re.sub(r'<[^>]+>', '', h2.group(1)).strip() + ' | Ravi Kumar'
    nav = nav_t
    if navhref:
        nav = nav.replace('<a href="%s">' % navhref, '<a href="%s" class="active-link" aria-current="page">' % navhref)
        if navhref in ('/research/', '/publications/', '/research-in-progress/', '/datasets/', '/book-reviews/', '/talks/'):
            nav = nav.replace('class="nav-group-toggle"', 'class="nav-group-toggle active-link"')
    has_lb = 'gallery-open' in body
    redirect = ''
    if slug == 'home':
        m = {'about': '/about/', 'research': '/research/', 'publications': '/publications/', 'in-progress': '/research-in-progress/', 'datasets': '/datasets/',
             'book-reviews': '/book-reviews/', 'conferences': '/talks/', 'teaching': '/teaching/', 'cv': '/cv/', 'book': '/book/', 'current-reads': '/reading/',
             'gallery': '/photographs/', 'contact': '/contact/', 'net-programme': '/teaching/#net-programme', 'companion': '/book/#companion',
             'education': '/cv/#education', 'experience': '/cv/#experience', 'awards': '/cv/#awards', 'service': '/cv/#service', 'skills': '/cv/#skills'}
        redirect = '<script>(function(){var m=%s,h=location.hash.slice(1);if(h&&m[h])location.replace(m[h]);})();</script>' % json.dumps(m)
    html = (layout.replace('{{TITLE}}', esc(title)).replace('{{DESC}}', esc(desc)).replace('{{CANON}}', SITE + path)
            .replace('{{OGIMG}}', SITE + '/assets/images/og-image.jpg').replace('{{JSONLD}}', ld_for(slug)).replace('{{REDIRECT}}', redirect)
            .replace('{{CSSV}}', CSS_V).replace('{{BODYCLASS}}', '' if slug == 'home' else ' class="is-subpage"')
            .replace('{{NAV}}', nav).replace('{{MAIN}}', body).replace('{{LIGHTBOX}}', lb if has_lb else '').replace('{{FOOTER}}', foot_t))
    out = os.path.join(ROOT, path.strip('/'), 'index.html') if path != '/' else os.path.join(ROOT, 'index.html')
    os.makedirs(os.path.dirname(out), exist_ok=True)
    open(out, 'w', encoding='utf-8').write(html)
    urls.append(SITE + path)

sm = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
for u in urls: sm.append('  <url><loc>%s</loc><lastmod>%s</lastmod></url>' % (u, UPDATED_ISO))
sm.append('</urlset>')
open(os.path.join(ROOT, 'sitemap.xml'), 'w', encoding='utf-8').write('\n'.join(sm) + '\n')
print('built', len(PAGES), 'pages')
