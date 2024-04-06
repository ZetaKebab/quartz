import sys
import os
from glob import glob
import re

### Patterns ###

# https://www.reddit.com/r/learnpython/comments/h0tsaa/regex_expression_for_japanese_extracting/
re_brace = '{(.+?)}'
re_kanji = '([㐀-䶵一-鿋豈-頻]+)'
re_kana = '([ぁ-ゟ゠-ヿ]+)'

### Open file ###

def open_file(filename):
    with open(filename, 'r', encoding='utf-8-sig') as file:
        filedata = file.read()
        return filedata

### Replace ###

def write_ruby_simple(kanji, kana):
    return f"<ruby>{kanji}<rt>{kana}</rt></ruby>"

def write_ruby_multiple(kanji, kanas):
    result = f"<ruby>"
    for idx, kana in enumerate(kanas):
        result += f"{kanji[idx]}"
        result += f"<rt>{kana}</rt>"
    result += f"</ruby>"
    return result

def convert_to_ruby(content):
    kanji = re.search(re_kanji, content.group())
    kana = re.findall(re_kana, content.group())

    if (len(kana) == 1):
        return write_ruby_simple(kanji.group(), kana[0])
    else:
        return write_ruby_multiple(kanji.group(), kana)

def convert_pattern(text):
    res_text = re.sub(re_brace, convert_to_ruby, text)
    return res_text

### Write to file ###

def write_file(filename, text):
    with open(filename, 'w', encoding='utf-8-sig') as file:
        file.write(text)


### Execution ###

file_list = []

if len(sys.argv) > 1:
    path = sys.argv[1]
    for filename in glob(path + "/**/*.md", recursive=True):
        if (os.path.isfile(filename)):
            file_list.append(filename)
else:
    print(f"Usage: python3 {sys.argv[0]} [root folder]")
    print(f"Note: Please be careful, this software applies modifications recursively!")

for filename in file_list:
    print(f"Found file {filename}, processing...", end='')
    data = open_file(filename)
    text = convert_pattern(data)
    write_file(filename, text)
    print(f" done!")