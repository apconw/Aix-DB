# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.


## Main toolbar buttons (tooltips and alt text for images***REMOVED***

pdfjs-previous-button =
    .title = An Leathanach Roimhe Seo
pdfjs-previous-button-label = Roimhe Seo
pdfjs-next-button =
    .title = An Chéad Leathanach Eile
pdfjs-next-button-label = Ar Aghaidh
# .title: Tooltip for the pageNumber input.
pdfjs-page-input =
    .title = Leathanach
# Variables:
#   $pagesCount (Number***REMOVED*** - the total number of pages in the document
# This string follows an input field with the number of the page currently displayed.
pdfjs-of-pages = as { $pagesCount ***REMOVED***
# Variables:
#   $pageNumber (Number***REMOVED*** - the currently visible page
#   $pagesCount (Number***REMOVED*** - the total number of pages in the document
pdfjs-page-of-pages = ({ $pageNumber ***REMOVED*** as { $pagesCount ***REMOVED******REMOVED***
pdfjs-zoom-out-button =
    .title = Súmáil Amach
pdfjs-zoom-out-button-label = Súmáil Amach
pdfjs-zoom-in-button =
    .title = Súmáil Isteach
pdfjs-zoom-in-button-label = Súmáil Isteach
pdfjs-zoom-select =
    .title = Súmáil
pdfjs-presentation-mode-button =
    .title = Úsáid an Mód Láithreoireachta
pdfjs-presentation-mode-button-label = Mód Láithreoireachta
pdfjs-open-file-button =
    .title = Oscail Comhad
pdfjs-open-file-button-label = Oscail
pdfjs-print-button =
    .title = Priontáil
pdfjs-print-button-label = Priontáil

##  Secondary toolbar and context menu

pdfjs-tools-button =
    .title = Uirlisí
pdfjs-tools-button-label = Uirlisí
pdfjs-first-page-button =
    .title = Go dtí an chéad leathanach
pdfjs-first-page-button-label = Go dtí an chéad leathanach
pdfjs-last-page-button =
    .title = Go dtí an leathanach deiridh
pdfjs-last-page-button-label = Go dtí an leathanach deiridh
pdfjs-page-rotate-cw-button =
    .title = Rothlaigh ar deiseal
pdfjs-page-rotate-cw-button-label = Rothlaigh ar deiseal
pdfjs-page-rotate-ccw-button =
    .title = Rothlaigh ar tuathal
pdfjs-page-rotate-ccw-button-label = Rothlaigh ar tuathal
pdfjs-cursor-text-select-tool-button =
    .title = Cumasaigh an Uirlis Roghnaithe Téacs
pdfjs-cursor-text-select-tool-button-label = Uirlis Roghnaithe Téacs
pdfjs-cursor-hand-tool-button =
    .title = Cumasaigh an Uirlis Láimhe
pdfjs-cursor-hand-tool-button-label = Uirlis Láimhe

## Document properties dialog

pdfjs-document-properties-button =
    .title = Airíonna na Cáipéise…
pdfjs-document-properties-button-label = Airíonna na Cáipéise…
pdfjs-document-properties-file-name = Ainm an chomhaid:
pdfjs-document-properties-file-size = Méid an chomhaid:
# Variables:
#   $size_kb (Number***REMOVED*** - the PDF file size in kilobytes
#   $size_b (Number***REMOVED*** - the PDF file size in bytes
pdfjs-document-properties-kb = { $size_kb ***REMOVED*** kB ({ $size_b ***REMOVED*** beart***REMOVED***
# Variables:
#   $size_mb (Number***REMOVED*** - the PDF file size in megabytes
#   $size_b (Number***REMOVED*** - the PDF file size in bytes
pdfjs-document-properties-mb = { $size_mb ***REMOVED*** MB ({ $size_b ***REMOVED*** beart***REMOVED***
pdfjs-document-properties-title = Teideal:
pdfjs-document-properties-author = Údar:
pdfjs-document-properties-subject = Ábhar:
pdfjs-document-properties-keywords = Eochairfhocail:
pdfjs-document-properties-creation-date = Dáta Cruthaithe:
pdfjs-document-properties-modification-date = Dáta Athraithe:
# Variables:
#   $date (Date***REMOVED*** - the creation/modification date of the PDF file
#   $time (Time***REMOVED*** - the creation/modification time of the PDF file
pdfjs-document-properties-date-string = { $date ***REMOVED***, { $time ***REMOVED***
pdfjs-document-properties-creator = Cruthaitheoir:
pdfjs-document-properties-producer = Cruthaitheoir an PDF:
pdfjs-document-properties-version = Leagan PDF:
pdfjs-document-properties-page-count = Líon Leathanach:

## Variables:
##   $width (Number***REMOVED*** - the width of the (current***REMOVED*** page
##   $height (Number***REMOVED*** - the height of the (current***REMOVED*** page
##   $unit (String***REMOVED*** - the unit of measurement of the (current***REMOVED*** page
##   $name (String***REMOVED*** - the name of the (current***REMOVED*** page
##   $orientation (String***REMOVED*** - the orientation of the (current***REMOVED*** page


##

pdfjs-document-properties-close-button = Dún

## Print

pdfjs-print-progress-message = Cáipéis á hullmhú le priontáil…
# Variables:
#   $progress (Number***REMOVED*** - percent value
pdfjs-print-progress-percent = { $progress ***REMOVED***%
pdfjs-print-progress-close-button = Cealaigh
pdfjs-printing-not-supported = Rabhadh: Ní thacaíonn an brabhsálaí le priontáil go hiomlán.
pdfjs-printing-not-ready = Rabhadh: Ní féidir an PDF a phriontáil go dtí go mbeidh an cháipéis iomlán lódáilte.

## Tooltips and alt text for side panel toolbar buttons

pdfjs-toggle-sidebar-button =
    .title = Scoránaigh an Barra Taoibh
pdfjs-toggle-sidebar-button-label = Scoránaigh an Barra Taoibh
pdfjs-document-outline-button =
    .title = Taispeáin Imlíne na Cáipéise (déchliceáil chun chuile rud a leathnú nó a laghdú***REMOVED***
pdfjs-document-outline-button-label = Creatlach na Cáipéise
pdfjs-attachments-button =
    .title = Taispeáin Iatáin
pdfjs-attachments-button-label = Iatáin
pdfjs-thumbs-button =
    .title = Taispeáin Mionsamhlacha
pdfjs-thumbs-button-label = Mionsamhlacha
pdfjs-findbar-button =
    .title = Aimsigh sa Cháipéis
pdfjs-findbar-button-label = Aimsigh

## Thumbnails panel item (tooltip and alt text for images***REMOVED***

# Variables:
#   $page (Number***REMOVED*** - the page number
pdfjs-thumb-page-title =
    .title = Leathanach { $page ***REMOVED***
# Variables:
#   $page (Number***REMOVED*** - the page number
pdfjs-thumb-page-canvas =
    .aria-label = Mionsamhail Leathanaigh { $page ***REMOVED***

## Find panel button title and messages

pdfjs-find-input =
    .title = Aimsigh
    .placeholder = Aimsigh sa cháipéis…
pdfjs-find-previous-button =
    .title = Aimsigh an sampla roimhe seo den nath seo
pdfjs-find-previous-button-label = Roimhe seo
pdfjs-find-next-button =
    .title = Aimsigh an chéad sampla eile den nath sin
pdfjs-find-next-button-label = Ar aghaidh
pdfjs-find-highlight-checkbox = Aibhsigh uile
pdfjs-find-match-case-checkbox-label = Cásíogair
pdfjs-find-entire-word-checkbox-label = Focail iomlána
pdfjs-find-reached-top = Ag barr na cáipéise, ag leanúint ón mbun
pdfjs-find-reached-bottom = Ag bun na cáipéise, ag leanúint ón mbarr
pdfjs-find-not-found = Frása gan aimsiú

## Predefined zoom values

pdfjs-page-scale-width = Leithead Leathanaigh
pdfjs-page-scale-fit = Laghdaigh go dtí an Leathanach
pdfjs-page-scale-auto = Súmáil Uathoibríoch
pdfjs-page-scale-actual = Fíormhéid
# Variables:
#   $scale (Number***REMOVED*** - percent value for page scale
pdfjs-page-scale-percent = { $scale ***REMOVED***%

## PDF page


## Loading indicator messages

pdfjs-loading-error = Tharla earráid agus an cháipéis PDF á lódáil.
pdfjs-invalid-file-error = Comhad neamhbhailí nó truaillithe PDF.
pdfjs-missing-file-error = Comhad PDF ar iarraidh.
pdfjs-unexpected-response-error = Freagra ón bhfreastalaí nach rabhthas ag súil leis.
pdfjs-rendering-error = Tharla earráid agus an leathanach á leagan amach.

## Annotations

# .alt: This is used as a tooltip.
# Variables:
#   $type (String***REMOVED*** - an annotation type from a list defined in the PDF spec
# (32000-1:2008 Table 169 – Annotation types***REMOVED***.
# Some common types are e.g.: "Check", "Text", "Comment", "Note"
pdfjs-text-annotation-type =
    .alt = [Anótáil { $type ***REMOVED***]

## Password

pdfjs-password-label = Cuir an focal faire isteach chun an comhad PDF seo a oscailt.
pdfjs-password-invalid = Focal faire mícheart. Déan iarracht eile.
pdfjs-password-ok-button = OK
pdfjs-password-cancel-button = Cealaigh
pdfjs-web-fonts-disabled = Tá clófhoirne Gréasáin díchumasaithe: ní féidir clófhoirne leabaithe PDF a úsáid.

## Editing


## Alt-text dialog


## Editor resizers
## This is used in an aria label to help to understand the role of the resizer.

