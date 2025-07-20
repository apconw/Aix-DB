# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.


## Main toolbar buttons (tooltips and alt text for images***REMOVED***

pdfjs-previous-button =
    .title = Pajinâ gunâj rukùu
pdfjs-previous-button-label = Sa gachin
pdfjs-next-button =
    .title = Pajinâ 'na' ñaan
pdfjs-next-button-label = Ne' ñaan
# .title: Tooltip for the pageNumber input.
pdfjs-page-input =
    .title = Ñanj
# Variables:
#   $pagesCount (Number***REMOVED*** - the total number of pages in the document
# This string follows an input field with the number of the page currently displayed.
pdfjs-of-pages = si'iaj { $pagesCount ***REMOVED***
# Variables:
#   $pageNumber (Number***REMOVED*** - the currently visible page
#   $pagesCount (Number***REMOVED*** - the total number of pages in the document
pdfjs-page-of-pages = ({ $pageNumber ***REMOVED*** of { $pagesCount ***REMOVED******REMOVED***
pdfjs-zoom-out-button =
    .title = Nagi'iaj li'
pdfjs-zoom-out-button-label = Nagi'iaj li'
pdfjs-zoom-in-button =
    .title = Nagi'iaj niko'
pdfjs-zoom-in-button-label = Nagi'iaj niko'
pdfjs-zoom-select =
    .title = dàj nìko ma'an
pdfjs-presentation-mode-button =
    .title = Naduno' daj ga ma
pdfjs-presentation-mode-button-label = Daj gà ma
pdfjs-open-file-button =
    .title = Na'nïn' chrû ñanj
pdfjs-open-file-button-label = Na'nïn
pdfjs-print-button =
    .title = Nari' ña du'ua
pdfjs-print-button-label = Nari' ñadu'ua

##  Secondary toolbar and context menu

pdfjs-tools-button =
    .title = Rasun
pdfjs-tools-button-label = Nej rasùun
pdfjs-first-page-button =
    .title = gun' riña pajina asiniin
pdfjs-first-page-button-label = Gun' riña pajina asiniin
pdfjs-last-page-button =
    .title = Gun' riña pajina rukù ni'in
pdfjs-last-page-button-label = Gun' riña pajina rukù ni'inj
pdfjs-page-rotate-cw-button =
    .title = Tanikaj ne' huat
pdfjs-page-rotate-cw-button-label = Tanikaj ne' huat
pdfjs-page-rotate-ccw-button =
    .title = Tanikaj ne' chînt'
pdfjs-page-rotate-ccw-button-label = Tanikaj ne' chint
pdfjs-cursor-text-select-tool-button =
    .title = Dugi'iaj sun' sa ganahui texto
pdfjs-cursor-text-select-tool-button-label = Nej rasun arajsun' da' nahui' texto
pdfjs-cursor-hand-tool-button =
    .title = Nachrun' nej rasun
pdfjs-cursor-hand-tool-button-label = Sa rajsun ro'o'
pdfjs-scroll-vertical-button =
    .title = Garasun' dukuán runūu
pdfjs-scroll-vertical-button-label = Dukuán runūu
pdfjs-scroll-horizontal-button =
    .title = Garasun' dukuán nikin' nahui
pdfjs-scroll-horizontal-button-label = Dukuán nikin' nahui
pdfjs-scroll-wrapped-button =
    .title = Garasun' sa nachree
pdfjs-scroll-wrapped-button-label = Sa nachree
pdfjs-spread-none-button =
    .title = Si nagi'iaj nugun'un' nej pagina hua ninin
pdfjs-spread-none-button-label = Ni'io daj hua pagina
pdfjs-spread-odd-button =
    .title = Nagi'iaj nugua'ant nej pajina
pdfjs-spread-odd-button-label = Ni'io' daj hua libro gurin
pdfjs-spread-even-button =
    .title = Nakāj dugui' ngà nej pajinâ ayi'ì ngà da' hùi hùi
pdfjs-spread-even-button-label = Nahuin nìko nej

## Document properties dialog

pdfjs-document-properties-button =
    .title = Nej sa nikāj ñanj…
pdfjs-document-properties-button-label = Nej sa nikāj ñanj…
pdfjs-document-properties-file-name = Si yugui archîbo:
pdfjs-document-properties-file-size = Dàj yachìj archîbo:
# Variables:
#   $size_kb (Number***REMOVED*** - the PDF file size in kilobytes
#   $size_b (Number***REMOVED*** - the PDF file size in bytes
pdfjs-document-properties-kb = { $size_kb ***REMOVED*** KB ({ $size_b ***REMOVED*** bytes***REMOVED***
# Variables:
#   $size_mb (Number***REMOVED*** - the PDF file size in megabytes
#   $size_b (Number***REMOVED*** - the PDF file size in bytes
pdfjs-document-properties-mb = { $size_mb ***REMOVED*** MB ({ $size_b ***REMOVED*** bytes***REMOVED***
pdfjs-document-properties-title = Si yugui:
pdfjs-document-properties-author = Sí girirà:
pdfjs-document-properties-subject = Dugui':
pdfjs-document-properties-keywords = Nej nuguan' huìi:
pdfjs-document-properties-creation-date = Gui gurugui' man:
pdfjs-document-properties-modification-date = Nuguan' nahuin nakà:
# Variables:
#   $date (Date***REMOVED*** - the creation/modification date of the PDF file
#   $time (Time***REMOVED*** - the creation/modification time of the PDF file
pdfjs-document-properties-date-string = { $date ***REMOVED***, { $time ***REMOVED***
pdfjs-document-properties-creator = Guiri ro'
pdfjs-document-properties-producer = Sa ri PDF:
pdfjs-document-properties-version = PDF Version:
pdfjs-document-properties-page-count = Si Guendâ Pâjina:
pdfjs-document-properties-page-size = Dàj yachìj pâjina:
pdfjs-document-properties-page-size-unit-inches = riña
pdfjs-document-properties-page-size-unit-millimeters = mm
pdfjs-document-properties-page-size-orientation-portrait = nadu'ua
pdfjs-document-properties-page-size-orientation-landscape = dàj huaj
pdfjs-document-properties-page-size-name-a-three = A3
pdfjs-document-properties-page-size-name-a-four = A4
pdfjs-document-properties-page-size-name-letter = Da'ngà'a
pdfjs-document-properties-page-size-name-legal = Nuguan' a'nï'ïn

## Variables:
##   $width (Number***REMOVED*** - the width of the (current***REMOVED*** page
##   $height (Number***REMOVED*** - the height of the (current***REMOVED*** page
##   $unit (String***REMOVED*** - the unit of measurement of the (current***REMOVED*** page
##   $name (String***REMOVED*** - the name of the (current***REMOVED*** page
##   $orientation (String***REMOVED*** - the orientation of the (current***REMOVED*** page

pdfjs-document-properties-page-size-dimension-string = { $width ***REMOVED*** × { $height ***REMOVED*** { $unit ***REMOVED*** ({ $orientation ***REMOVED******REMOVED***
pdfjs-document-properties-page-size-dimension-name-string = { $width ***REMOVED*** × { $height ***REMOVED*** { $unit ***REMOVED*** ({ $name ***REMOVED***, { $orientation ***REMOVED******REMOVED***

##

# The linearization status of the document; usually called "Fast Web View" in
# English locales of Adobe software.
pdfjs-document-properties-linearized = Nanèt chre ni'iajt riña Web:
pdfjs-document-properties-linearized-yes = Ga'ue
pdfjs-document-properties-linearized-no = Si ga'ue
pdfjs-document-properties-close-button = Narán

## Print

# Variables:
#   $progress (Number***REMOVED*** - percent value
pdfjs-print-progress-percent = { $progress ***REMOVED***%
pdfjs-print-progress-close-button = Duyichin'

## Tooltips and alt text for side panel toolbar buttons

pdfjs-toggle-sidebar-button =
    .title = Nadunā barrâ nù yi'nïn
pdfjs-toggle-sidebar-button-label = Nadunā barrâ nù yi'nïn
pdfjs-findbar-button-label = Narì'

## Thumbnails panel item (tooltip and alt text for images***REMOVED***


## Find panel button title and messages

pdfjs-find-previous-button-label = Sa gachîn
pdfjs-find-next-button-label = Ne' ñaan
pdfjs-find-highlight-checkbox = Daran' sa ña'an
pdfjs-find-match-case-checkbox-label = Match case
pdfjs-find-not-found = Nu narì'ij nugua'anj

## Predefined zoom values

pdfjs-page-scale-actual = Dàj yàchi akuan' nín
# Variables:
#   $scale (Number***REMOVED*** - percent value for page scale
pdfjs-page-scale-percent = { $scale ***REMOVED***%

## PDF page


## Loading indicator messages


## Annotations


## Password

pdfjs-password-ok-button = Ga'ue
pdfjs-password-cancel-button = Duyichin'

## Editing


## Alt-text dialog


## Editor resizers
## This is used in an aria label to help to understand the role of the resizer.

