import sys
import os
from glob import glob
from bs4 import BeautifulSoup
import re

### Patterns ###

re_usage = r'(^\*\*Usage\*\*$\n\n)'
callout_title_html = '''
    <div class="callout-title">
        <div class="callout-icon"></div>
        <div class="callout-title-inner"><p>Usage</p></div>
    </div>'''

### Open file ###

def open_file(filename):
    with open(filename, 'r', encoding='utf-8-sig') as file:
        filedata = file.read()
        return filedata

### Write to file ###

def write_file(filename, text):
    with open(filename, 'w', encoding='utf-8-sig') as file:
        file.write(text)

### Replace ###

def convert_pattern(text):
    text = re.sub(re_usage, '', text, flags=re.MULTILINE)

    soup = BeautifulSoup(text, features="html.parser")

    for tag in soup.find_all('div', {"class": "usage"}):
        new_blockquote = soup.new_tag("blockquote", **{"class": "callout notes", "data-callout": "notes"})
        tag.wrap(new_blockquote)

        calloutTitle = BeautifulSoup(callout_title_html, features="html.parser")
        tag.insert_before(calloutTitle)

    return str(soup)


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
