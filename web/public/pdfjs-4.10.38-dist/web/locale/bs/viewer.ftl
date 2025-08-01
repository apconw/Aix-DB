# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.


## Main toolbar buttons (tooltips and alt text for images***REMOVED***

pdfjs-previous-button =
    .title = Prethodna strana
pdfjs-previous-button-label = Prethodna
pdfjs-next-button =
    .title = Sljedeća strna
pdfjs-next-button-label = Sljedeća
# .title: Tooltip for the pageNumber input.
pdfjs-page-input =
    .title = Strana
# Variables:
#   $pagesCount (Number***REMOVED*** - the total number of pages in the document
# This string follows an input field with the number of the page currently displayed.
pdfjs-of-pages = od { $pagesCount ***REMOVED***
# Variables:
#   $pageNumber (Number***REMOVED*** - the currently visible page
#   $pagesCount (Number***REMOVED*** - the total number of pages in the document
pdfjs-page-of-pages = ({ $pageNumber ***REMOVED*** od { $pagesCount ***REMOVED******REMOVED***
pdfjs-zoom-out-button =
    .title = Umanji
pdfjs-zoom-out-button-label = Umanji
pdfjs-zoom-in-button =
    .title = Uvećaj
pdfjs-zoom-in-button-label = Uvećaj
pdfjs-zoom-select =
    .title = Uvećanje
pdfjs-presentation-mode-button =
    .title = Prebaci se u prezentacijski režim
pdfjs-presentation-mode-button-label = Prezentacijski režim
pdfjs-open-file-button =
    .title = Otvori fajl
pdfjs-open-file-button-label = Otvori
pdfjs-print-button =
    .title = Štampaj
pdfjs-print-button-label = Štampaj

##  Secondary toolbar and context menu

pdfjs-tools-button =
    .title = Alati
pdfjs-tools-button-label = Alati
pdfjs-first-page-button =
    .title = Idi na prvu stranu
pdfjs-first-page-button-label = Idi na prvu stranu
pdfjs-last-page-button =
    .title = Idi na zadnju stranu
pdfjs-last-page-button-label = Idi na zadnju stranu
pdfjs-page-rotate-cw-button =
    .title = Rotiraj u smjeru kazaljke na satu
pdfjs-page-rotate-cw-button-label = Rotiraj u smjeru kazaljke na satu
pdfjs-page-rotate-ccw-button =
    .title = Rotiraj suprotno smjeru kazaljke na satu
pdfjs-page-rotate-ccw-button-label = Rotiraj suprotno smjeru kazaljke na satu
pdfjs-cursor-text-select-tool-button =
    .title = Omogući alat za označavanje teksta
pdfjs-cursor-text-select-tool-button-label = Alat za označavanje teksta
pdfjs-cursor-hand-tool-button =
    .title = Omogući ručni alat
pdfjs-cursor-hand-tool-button-label = Ručni alat

## Document properties dialog

pdfjs-document-properties-button =
    .title = Svojstva dokumenta...
pdfjs-document-properties-button-label = Svojstva dokumenta...
pdfjs-document-properties-file-name = Naziv fajla:
pdfjs-document-properties-file-size = Veličina fajla:
# Variables:
#   $size_kb (Number***REMOVED*** - the PDF file size in kilobytes
#   $size_b (Number***REMOVED*** - the PDF file size in bytes
pdfjs-document-properties-kb = { $size_kb ***REMOVED*** KB ({ $size_b ***REMOVED*** bajta***REMOVED***
# Variables:
#   $size_mb (Number***REMOVED*** - the PDF file size in megabytes
#   $size_b (Number***REMOVED*** - the PDF file size in bytes
pdfjs-document-properties-mb = { $size_mb ***REMOVED*** MB ({ $size_b ***REMOVED*** bajta***REMOVED***
pdfjs-document-properties-title = Naslov:
pdfjs-document-properties-author = Autor:
pdfjs-document-properties-subject = Predmet:
pdfjs-document-properties-keywords = Ključne riječi:
pdfjs-document-properties-creation-date = Datum kreiranja:
pdfjs-document-properties-modification-date = Datum promjene:
# Variables:
#   $date (Date***REMOVED*** - the creation/modification date of the PDF file
#   $time (Time***REMOVED*** - the creation/modification time of the PDF file
pdfjs-document-properties-date-string = { $date ***REMOVED***, { $time ***REMOVED***
pdfjs-document-properties-creator = Kreator:
pdfjs-document-properties-producer = PDF stvaratelj:
pdfjs-document-properties-version = PDF verzija:
pdfjs-document-properties-page-count = Broj stranica:
pdfjs-document-properties-page-size = Veličina stranice:
pdfjs-document-properties-page-size-unit-inches = u
pdfjs-document-properties-page-size-unit-millimeters = mm
pdfjs-document-properties-page-size-orientation-portrait = uspravno
pdfjs-document-properties-page-size-orientation-landscape = vodoravno
pdfjs-document-properties-page-size-name-a-three = A3
pdfjs-document-properties-page-size-name-a-four = A4
pdfjs-document-properties-page-size-name-letter = Pismo
pdfjs-document-properties-page-size-name-legal = Pravni

## Variables:
##   $width (Number***REMOVED*** - the width of the (current***REMOVED*** page
##   $height (Number***REMOVED*** - the height of the (current***REMOVED*** page
##   $unit (String***REMOVED*** - the unit of measurement of the (current***REMOVED*** page
##   $name (String***REMOVED*** - the name of the (current***REMOVED*** page
##   $orientation (String***REMOVED*** - the orientation of the (current***REMOVED*** page

pdfjs-document-properties-page-size-dimension-string = { $width ***REMOVED*** × { $height ***REMOVED*** { $unit ***REMOVED*** ({ $orientation ***REMOVED******REMOVED***
pdfjs-document-properties-page-size-dimension-name-string = { $width ***REMOVED*** × { $height ***REMOVED*** { $unit ***REMOVED*** ({ $name ***REMOVED***, { $orientation ***REMOVED******REMOVED***

##

pdfjs-document-properties-close-button = Zatvori

## Print

pdfjs-print-progress-message = Pripremam dokument za štampu…
# Variables:
#   $progress (Number***REMOVED*** - percent value
pdfjs-print-progress-percent = { $progress ***REMOVED***%
pdfjs-print-progress-close-button = Otkaži
pdfjs-printing-not-supported = Upozorenje: Štampanje nije u potpunosti podržano u ovom browseru.
pdfjs-printing-not-ready = Upozorenje: PDF nije u potpunosti učitan za štampanje.

## Tooltips and alt text for side panel toolbar buttons

pdfjs-toggle-sidebar-button =
    .title = Uključi/isključi bočnu traku
pdfjs-toggle-sidebar-button-label = Uključi/isključi bočnu traku
pdfjs-document-outline-button =
    .title = Prikaži outline dokumenta (dvoklik za skupljanje/širenje svih stavki***REMOVED***
pdfjs-document-outline-button-label = Konture dokumenta
pdfjs-attachments-button =
    .title = Prikaži priloge
pdfjs-attachments-button-label = Prilozi
pdfjs-thumbs-button =
    .title = Prikaži thumbnailove
pdfjs-thumbs-button-label = Thumbnailovi
pdfjs-findbar-button =
    .title = Pronađi u dokumentu
pdfjs-findbar-button-label = Pronađi

## Thumbnails panel item (tooltip and alt text for images***REMOVED***

# Variables:
#   $page (Number***REMOVED*** - the page number
pdfjs-thumb-page-title =
    .title = Strana { $page ***REMOVED***
# Variables:
#   $page (Number***REMOVED*** - the page number
pdfjs-thumb-page-canvas =
    .aria-label = Thumbnail strane { $page ***REMOVED***

## Find panel button title and messages

pdfjs-find-input =
    .title = Pronađi
    .placeholder = Pronađi u dokumentu…
pdfjs-find-previous-button =
    .title = Pronađi prethodno pojavljivanje fraze
pdfjs-find-previous-button-label = Prethodno
pdfjs-find-next-button =
    .title = Pronađi sljedeće pojavljivanje fraze
pdfjs-find-next-button-label = Sljedeće
pdfjs-find-highlight-checkbox = Označi sve
pdfjs-find-match-case-checkbox-label = Osjetljivost na karaktere
pdfjs-find-reached-top = Dostigao sam vrh dokumenta, nastavljam sa dna
pdfjs-find-reached-bottom = Dostigao sam kraj dokumenta, nastavljam sa vrha
pdfjs-find-not-found = Fraza nije pronađena

## Predefined zoom values

pdfjs-page-scale-width = Širina strane
pdfjs-page-scale-fit = Uklopi stranu
pdfjs-page-scale-auto = Automatsko uvećanje
pdfjs-page-scale-actual = Stvarna veličina
# Variables:
#   $scale (Number***REMOVED*** - percent value for page scale
pdfjs-page-scale-percent = { $scale ***REMOVED***%

## PDF page


## Loading indicator messages

pdfjs-loading-error = Došlo je do greške prilikom učitavanja PDF-a.
pdfjs-invalid-file-error = Neispravan ili oštećen PDF fajl.
pdfjs-missing-file-error = Nedostaje PDF fajl.
pdfjs-unexpected-response-error = Neočekivani odgovor servera.
pdfjs-rendering-error = Došlo je do greške prilikom renderiranja strane.

## Annotations

# .alt: This is used as a tooltip.
# Variables:
#   $type (String***REMOVED*** - an annotation type from a list defined in the PDF spec
# (32000-1:2008 Table 169 – Annotation types***REMOVED***.
# Some common types are e.g.: "Check", "Text", "Comment", "Note"
pdfjs-text-annotation-type =
    .alt = [{ $type ***REMOVED*** pribilješka]

## Password

pdfjs-password-label = Upišite lozinku da biste otvorili ovaj PDF fajl.
pdfjs-password-invalid = Pogrešna lozinka. Pokušajte ponovo.
pdfjs-password-ok-button = OK
pdfjs-password-cancel-button = Otkaži
pdfjs-web-fonts-disabled = Web fontovi su onemogućeni: nemoguće koristiti ubačene PDF fontove.

## Editing


## Alt-text dialog


## Editor resizers
## This is used in an aria label to help to understand the role of the resizer.

