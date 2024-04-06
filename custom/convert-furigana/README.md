# convert-furigana

## What is it?

There are a few extensions that add [furigana](https://en.wikipedia.org/wiki/Furigana) support to Markdown. I use [Obsidian](https://obsidian.md/), and therefore its furigana extension: [obsidian-markdown-furigana](https://github.com/steven-kraft/obsidian-markdown-furigana). It works well, but by nature is limited by being used within Obsidian.

For that purpose, this python script converts this specific syntax to common, all-platforms HTML ruby tags.

## Process

This specific extension syntax is as following:
```
{漢字|かんじ}
{漢字|かん|じ}
```

When processed by this script, the result is:
```
<ruby>漢字<rt>かんじ</rt></ruby>
<ruby>漢<rt>かん</rt>字<rt>じ</rt></ruby>
```

Which leads visually from, by default markdown standards:

> {漢字|かんじ}
>
> {漢字|かん|じ}

to common HTML ruby syntax:

> <ruby>漢字<rt>かんじ</rt></ruby>
>
> <ruby>漢<rt>かん</rt>字<rt>じ</rt></ruby>

## Limitations

This has been made for my personal use, which is only kanjis with kanas as furigana. The regexp used do not recognize other inputs. But you can modify them easily for your use if needed.

## Usage

Usage: `python3 convert-furigana.py [root folder]`

Note: Please be careful, this software applies modifications recursively!