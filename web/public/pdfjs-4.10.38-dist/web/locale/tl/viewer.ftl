# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.


## Main toolbar buttons (tooltips and alt text for images***REMOVED***

pdfjs-previous-button =
    .title = Naunang Pahina
pdfjs-previous-button-label = Nakaraan
pdfjs-next-button =
    .title = Sunod na Pahina
pdfjs-next-button-label = Sunod
# .title: Tooltip for the pageNumber input.
pdfjs-page-input =
    .title = Pahina
# Variables:
#   $pagesCount (Number***REMOVED*** - the total number of pages in the document
# This string follows an input field with the number of the page currently displayed.
pdfjs-of-pages = ng { $pagesCount ***REMOVED***
# Variables:
#   $pageNumber (Number***REMOVED*** - the currently visible page
#   $pagesCount (Number***REMOVED*** - the total number of pages in the document
pdfjs-page-of-pages = ({ $pageNumber ***REMOVED*** ng { $pagesCount ***REMOVED******REMOVED***
pdfjs-zoom-out-button =
    .title = Paliitin
pdfjs-zoom-out-button-label = Paliitin
pdfjs-zoom-in-button =
    .title = Palakihin
pdfjs-zoom-in-button-label = Palakihin
pdfjs-zoom-select =
    .title = Mag-zoom
pdfjs-presentation-mode-button =
    .title = Lumipat sa Presentation Mode
pdfjs-presentation-mode-button-label = Presentation Mode
pdfjs-open-file-button =
    .title = Magbukas ng file
pdfjs-open-file-button-label = Buksan
pdfjs-print-button =
    .title = i-Print
pdfjs-print-button-label = i-Print

##  Secondary toolbar and context menu

pdfjs-tools-button =
    .title = Mga Kagamitan
pdfjs-tools-button-label = Mga Kagamitan
pdfjs-first-page-button =
    .title = Pumunta sa Unang Pahina
pdfjs-first-page-button-label = Pumunta sa Unang Pahina
pdfjs-last-page-button =
    .title = Pumunta sa Huling Pahina
pdfjs-last-page-button-label = Pumunta sa Huling Pahina
pdfjs-page-rotate-cw-button =
    .title = Paikutin Pakanan
pdfjs-page-rotate-cw-button-label = Paikutin Pakanan
pdfjs-page-rotate-ccw-button =
    .title = Paikutin Pakaliwa
pdfjs-page-rotate-ccw-button-label = Paikutin Pakaliwa
pdfjs-cursor-text-select-tool-button =
    .title = I-enable ang Text Selection Tool
pdfjs-cursor-text-select-tool-button-label = Text Selection Tool
pdfjs-cursor-hand-tool-button =
    .title = I-enable ang Hand Tool
pdfjs-cursor-hand-tool-button-label = Hand Tool
pdfjs-scroll-vertical-button =
    .title = Gumamit ng Vertical Scrolling
pdfjs-scroll-vertical-button-label = Vertical Scrolling
pdfjs-scroll-horizontal-button =
    .title = Gumamit ng Horizontal Scrolling
pdfjs-scroll-horizontal-button-label = Horizontal Scrolling
pdfjs-scroll-wrapped-button =
    .title = Gumamit ng Wrapped Scrolling
pdfjs-scroll-wrapped-button-label = Wrapped Scrolling
pdfjs-spread-none-button =
    .title = Huwag pagsamahin ang mga page spread
pdfjs-spread-none-button-label = No Spreads
pdfjs-spread-odd-button =
    .title = Join page spreads starting with odd-numbered pages
pdfjs-spread-odd-button-label = Mga Odd Spread
pdfjs-spread-even-button =
    .title = Pagsamahin ang mga page spread na nagsisimula sa mga even-numbered na pahina
pdfjs-spread-even-button-label = Mga Even Spread

## Document properties dialog

pdfjs-document-properties-button =
    .title = Mga Katangian ng Dokumento…
pdfjs-document-properties-button-label = Mga Katangian ng Dokumento…
pdfjs-document-properties-file-name = File name:
pdfjs-document-properties-file-size = File size:
# Variables:
#   $size_kb (Number***REMOVED*** - the PDF file size in kilobytes
#   $size_b (Number***REMOVED*** - the PDF file size in bytes
pdfjs-document-properties-kb = { $size_kb ***REMOVED*** KB ({ $size_b ***REMOVED*** bytes***REMOVED***
# Variables:
#   $size_mb (Number***REMOVED*** - the PDF file size in megabytes
#   $size_b (Number***REMOVED*** - the PDF file size in bytes
pdfjs-document-properties-mb = { $size_mb ***REMOVED*** MB ({ $size_b ***REMOVED*** bytes***REMOVED***
pdfjs-document-properties-title = Pamagat:
pdfjs-document-properties-author = May-akda:
pdfjs-document-properties-subject = Paksa:
pdfjs-document-properties-keywords = Mga keyword:
pdfjs-document-properties-creation-date = Petsa ng Pagkakagawa:
pdfjs-document-properties-modification-date = Petsa ng Pagkakabago:
# Variables:
#   $date (Date***REMOVED*** - the creation/modification date of the PDF file
#   $time (Time***REMOVED*** - the creation/modification time of the PDF file
pdfjs-document-properties-date-string = { $date ***REMOVED***, { $time ***REMOVED***
pdfjs-document-properties-creator = Tagalikha:
pdfjs-document-properties-producer = PDF Producer:
pdfjs-document-properties-version = PDF Version:
pdfjs-document-properties-page-count = Bilang ng Pahina:
pdfjs-document-properties-page-size = Laki ng Pahina:
pdfjs-document-properties-page-size-unit-inches = pulgada
pdfjs-document-properties-page-size-unit-millimeters = mm
pdfjs-document-properties-page-size-orientation-portrait = patayo
pdfjs-document-properties-page-size-orientation-landscape = pahiga
pdfjs-document-properties-page-size-name-a-three = A3
pdfjs-document-properties-page-size-name-a-four = A4
pdfjs-document-properties-page-size-name-letter = Letter
pdfjs-document-properties-page-size-name-legal = Legal

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
pdfjs-document-properties-linearized = Fast Web View:
pdfjs-document-properties-linearized-yes = Oo
pdfjs-document-properties-linearized-no = Hindi
pdfjs-document-properties-close-button = Isara

## Print

pdfjs-print-progress-message = Inihahanda ang dokumento para sa pag-print…
# Variables:
#   $progress (Number***REMOVED*** - percent value
pdfjs-print-progress-percent = { $progress ***REMOVED***%
pdfjs-print-progress-close-button = Kanselahin
pdfjs-printing-not-supported = Babala: Hindi pa ganap na suportado ang pag-print sa browser na ito.
pdfjs-printing-not-ready = Babala: Hindi ganap na nabuksan ang PDF para sa pag-print.

## Tooltips and alt text for side panel toolbar buttons

pdfjs-toggle-sidebar-button =
    .title = Ipakita/Itago ang Sidebar
pdfjs-toggle-sidebar-notification-button =
    .title = Ipakita/Itago ang Sidebar (nagtataglay ang dokumento ng balangkas/mga attachment/mga layer***REMOVED***
pdfjs-toggle-sidebar-button-label = Ipakita/Itago ang Sidebar
pdfjs-document-outline-button =
    .title = Ipakita ang Document Outline (mag-double-click para i-expand/collapse ang laman***REMOVED***
pdfjs-document-outline-button-label = Balangkas ng Dokumento
pdfjs-attachments-button =
    .title = Ipakita ang mga Attachment
pdfjs-attachments-button-label = Mga attachment
pdfjs-layers-button =
    .title = Ipakita ang mga Layer (mag-double click para mareset ang lahat ng layer sa orihinal na estado***REMOVED***
pdfjs-layers-button-label = Mga layer
pdfjs-thumbs-button =
    .title = Ipakita ang mga Thumbnail
pdfjs-thumbs-button-label = Mga thumbnail
pdfjs-findbar-button =
    .title = Hanapin sa Dokumento
pdfjs-findbar-button-label = Hanapin
pdfjs-additional-layers = Mga Karagdagang Layer

## Thumbnails panel item (tooltip and alt text for images***REMOVED***

# Variables:
#   $page (Number***REMOVED*** - the page number
pdfjs-thumb-page-title =
    .title = Pahina { $page ***REMOVED***
# Variables:
#   $page (Number***REMOVED*** - the page number
pdfjs-thumb-page-canvas =
    .aria-label = Thumbnail ng Pahina { $page ***REMOVED***

## Find panel button title and messages

pdfjs-find-input =
    .title = Hanapin
    .placeholder = Hanapin sa dokumento…
pdfjs-find-previous-button =
    .title = Hanapin ang nakaraang pangyayari ng parirala
pdfjs-find-previous-button-label = Nakaraan
pdfjs-find-next-button =
    .title = Hanapin ang susunod na pangyayari ng parirala
pdfjs-find-next-button-label = Susunod
pdfjs-find-highlight-checkbox = I-highlight lahat
pdfjs-find-match-case-checkbox-label = Itugma ang case
pdfjs-find-entire-word-checkbox-label = Buong salita
pdfjs-find-reached-top = Naabot na ang tuktok ng dokumento, ipinagpatuloy mula sa ilalim
pdfjs-find-reached-bottom = Naabot na ang dulo ng dokumento, ipinagpatuloy mula sa tuktok
pdfjs-find-not-found = Hindi natagpuan ang parirala

## Predefined zoom values

pdfjs-page-scale-width = Lapad ng Pahina
pdfjs-page-scale-fit = Pagkasyahin ang Pahina
pdfjs-page-scale-auto = Automatic Zoom
pdfjs-page-scale-actual = Totoong sukat
# Variables:
#   $scale (Number***REMOVED*** - percent value for page scale
pdfjs-page-scale-percent = { $scale ***REMOVED***%

## PDF page


## Loading indicator messages

pdfjs-loading-error = Nagkaproblema habang niloload ang PDF.
pdfjs-invalid-file-error = Di-wasto o sira ang PDF file.
pdfjs-missing-file-error = Nawawalang PDF file.
pdfjs-unexpected-response-error = Hindi inaasahang tugon ng server.
pdfjs-rendering-error = Nagkaproblema habang nirerender ang pahina.

## Annotations

# Variables:
#   $date (Date***REMOVED*** - the modification date of the annotation
#   $time (Time***REMOVED*** - the modification time of the annotation
pdfjs-annotation-date-string = { $date ***REMOVED***, { $time ***REMOVED***
# .alt: This is used as a tooltip.
# Variables:
#   $type (String***REMOVED*** - an annotation type from a list defined in the PDF spec
# (32000-1:2008 Table 169 – Annotation types***REMOVED***.
# Some common types are e.g.: "Check", "Text", "Comment", "Note"
pdfjs-text-annotation-type =
    .alt = [{ $type ***REMOVED*** Annotation]

## Password

pdfjs-password-label = Ipasok ang password upang buksan ang PDF file na ito.
pdfjs-password-invalid = Maling password. Subukan uli.
pdfjs-password-ok-button = OK
pdfjs-password-cancel-button = Kanselahin
pdfjs-web-fonts-disabled = Naka-disable ang mga Web font: hindi kayang gamitin ang mga naka-embed na PDF font.

## Editing


## Alt-text dialog


## Editor resizers
## This is used in an aria label to help to understand the role of the resizer.

