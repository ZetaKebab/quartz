git fetch convert-furigana main
git subtree pull --prefix custom/convert-furigana convert-furigana main --squash

git fetch convert-usage main
git subtree pull --prefix custom/convert-usage convert-usage main --squash

git fetch content main
git subtree pull --prefix content content main --squash