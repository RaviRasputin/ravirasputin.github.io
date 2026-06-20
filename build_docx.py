#!/usr/bin/env python3
"""Build the comprehensive India foreign policy parliamentary analysis as a .docx file."""

from docx import Document
from docx.shared import Pt, Inches, RGBColor, Cm
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.style import WD_STYLE_TYPE
from docx.oxml.ns import qn
from docx.oxml import OxmlElement
import sys, os

sys.path.insert(0, os.path.dirname(__file__))

# --- Load content from part files ---
from build_doc_part1 import INTRO
from build_doc_part2 import PART2
from build_doc_part3 import PART3
from build_doc_part4 import PART4
from build_doc_part5 import PART5

FULL_TEXT = INTRO + PART2 + PART3 + PART4 + PART5

# --- Document setup ---
doc = Document()

# Page margins
for section in doc.sections:
    section.top_margin    = Inches(1.2)
    section.bottom_margin = Inches(1.2)
    section.left_margin   = Inches(1.3)
    section.right_margin  = Inches(1.3)

# --- Style helpers ---
def add_heading1(doc, text):
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = p.add_run(text)
    run.bold = True
    run.font.size = Pt(16)
    run.font.color.rgb = RGBColor(0x1a, 0x1a, 0x2e)
    p.paragraph_format.space_before = Pt(24)
    p.paragraph_format.space_after  = Pt(12)
    return p

def add_heading2(doc, text):
    p = doc.add_paragraph()
    run = p.add_run(text)
    run.bold = True
    run.font.size = Pt(13)
    run.font.color.rgb = RGBColor(0x1a, 0x1a, 0x2e)
    p.paragraph_format.space_before = Pt(18)
    p.paragraph_format.space_after  = Pt(6)
    return p

def add_heading3(doc, text):
    p = doc.add_paragraph()
    run = p.add_run(text)
    run.bold = True
    run.italic = True
    run.font.size = Pt(11.5)
    run.font.color.rgb = RGBColor(0x2c, 0x3e, 0x50)
    p.paragraph_format.space_before = Pt(14)
    p.paragraph_format.space_after  = Pt(4)
    return p

def add_body(doc, text):
    p = doc.add_paragraph()
    run = p.add_run(text)
    run.font.size = Pt(11)
    p.paragraph_format.first_line_indent = Inches(0.3)
    p.paragraph_format.space_after = Pt(6)
    p.paragraph_format.line_spacing = Pt(15)
    return p

def add_divider(doc):
    p = doc.add_paragraph()
    run = p.add_run("━" * 60)
    run.font.size = Pt(9)
    run.font.color.rgb = RGBColor(0x99, 0x99, 0x99)
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.paragraph_format.space_before = Pt(12)
    p.paragraph_format.space_after  = Pt(12)
    return p

def add_page_break(doc):
    doc.add_page_break()

# --- Title page ---
doc.add_paragraph()
doc.add_paragraph()
doc.add_paragraph()

p = doc.add_paragraph()
p.alignment = WD_ALIGN_PARAGRAPH.CENTER
run = p.add_run("PARLIAMENT AS WITNESS AND ARCHITECT")
run.bold = True
run.font.size = Pt(22)
run.font.color.rgb = RGBColor(0x1a, 0x1a, 0x2e)

p = doc.add_paragraph()
p.alignment = WD_ALIGN_PARAGRAPH.CENTER
run = p.add_run("The Evolution of India's Foreign Policy in Parliamentary Debates")
run.bold = True
run.font.size = Pt(16)
run.font.color.rgb = RGBColor(0x2c, 0x3e, 0x50)

p = doc.add_paragraph()
p.alignment = WD_ALIGN_PARAGRAPH.CENTER
run = p.add_run("1952 – 2025")
run.bold = True
run.font.size = Pt(18)
run.font.color.rgb = RGBColor(0x8b, 0x00, 0x00)

doc.add_paragraph()
add_divider(doc)
doc.add_paragraph()

p = doc.add_paragraph()
p.alignment = WD_ALIGN_PARAGRAPH.CENTER
run = p.add_run("A Comprehensive Study Based on Lok Sabha and Rajya Sabha Proceedings")
run.italic = True
run.font.size = Pt(12)

doc.add_paragraph()

p = doc.add_paragraph()
p.alignment = WD_ALIGN_PARAGRAPH.CENTER
run = p.add_run("Drawn from the Official Parliamentary Records of India\n"
                 "Covering the First Lok Sabha (1952) to the Eighteenth Lok Sabha (2025)\n"
                 "and the Rajya Sabha Continuous Record 1952–2025")
run.font.size = Pt(10)
run.font.color.rgb = RGBColor(0x55, 0x55, 0x55)

doc.add_paragraph()
doc.add_paragraph()

p = doc.add_paragraph()
p.alignment = WD_ALIGN_PARAGRAPH.CENTER
run = p.add_run("~45,000 Words")
run.font.size = Pt(10)
run.font.color.rgb = RGBColor(0x77, 0x77, 0x77)
run.italic = True

add_page_break(doc)

# --- Parse and render content ---
lines = FULL_TEXT.split('\n')
i = 0
while i < len(lines):
    line = lines[i].strip()

    # Skip empty
    if not line:
        i += 1
        continue

    # Divider lines
    if line.startswith('━'):
        add_divider(doc)
        i += 1
        continue

    # CHAPTER headings (all caps, numbered)
    if line.startswith('CHAPTER ') and ':' in line:
        add_page_break(doc)
        add_heading1(doc, line)
        i += 1
        continue

    # APPENDIX headings
    if line.startswith('APPENDIX ') and ':' in line:
        add_page_break(doc)
        add_heading1(doc, line)
        i += 1
        continue

    # All-caps section titles (like PREFACE, or title lines)
    if (line.isupper() and len(line) > 8 and not line.startswith('━')):
        add_heading1(doc, line)
        i += 1
        continue

    # Numbered section headings like "10.3 The Nuclear Deal..."
    import re
    sec_match = re.match(r'^(\d+\.\d+)\s+(.+)$', line)
    if sec_match:
        add_heading3(doc, line)
        i += 1
        continue

    # Main section headings (numeric at start of chapter, like "3.1 ...")
    # Already handled above; handle plain chapter section numbers too
    # Sub-sub headings tend to be bold phrases — leave as body

    # Year-reference lines in appendix (e.g. "1952, March–April:")
    year_match = re.match(r'^(\d{4})[,\s]', line)
    if year_match and ':' in line and len(line) < 200:
        p = doc.add_paragraph()
        parts = line.split(':', 1)
        run1 = p.add_run(parts[0] + ': ')
        run1.bold = True
        run1.font.size = Pt(10.5)
        if len(parts) > 1:
            run2 = p.add_run(parts[1].strip())
            run2.font.size = Pt(10.5)
        p.paragraph_format.space_after = Pt(4)
        p.paragraph_format.left_indent = Inches(0.2)
        i += 1
        continue

    # Regular body paragraph
    add_body(doc, line)
    i += 1

# --- Word count footer page ---
add_page_break(doc)
p = doc.add_paragraph()
p.alignment = WD_ALIGN_PARAGRAPH.CENTER
run = p.add_run("— End of Study —")
run.italic = True
run.font.size = Pt(12)
run.font.color.rgb = RGBColor(0x77, 0x77, 0x77)

doc.add_paragraph()
p = doc.add_paragraph()
p.alignment = WD_ALIGN_PARAGRAPH.CENTER
word_count = len(FULL_TEXT.split())
run = p.add_run(f"Total word count: approximately {word_count:,} words")
run.font.size = Pt(10)
run.font.color.rgb = RGBColor(0x99, 0x99, 0x99)

# Save
output_path = "/home/user/ravirasputin.github.io/India_Foreign_Policy_Parliamentary_Analysis_1952_2025.docx"
doc.save(output_path)
print(f"Saved: {output_path}")
print(f"Total words: {word_count:,}")
