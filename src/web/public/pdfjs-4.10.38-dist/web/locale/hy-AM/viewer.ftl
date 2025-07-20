# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.


## Main toolbar buttons (tooltips and alt text for images***REMOVED***

pdfjs-previous-button =
    .title = Նախորդ էջը
pdfjs-previous-button-label = Նախորդը
pdfjs-next-button =
    .title = Հաջորդ էջը
pdfjs-next-button-label = Հաջորդը
# .title: Tooltip for the pageNumber input.
pdfjs-page-input =
    .title = Էջ.
# Variables:
#   $pagesCount (Number***REMOVED*** - the total number of pages in the document
# This string follows an input field with the number of the page currently displayed.
pdfjs-of-pages = -ը՝ { $pagesCount ***REMOVED***-ից
# Variables:
#   $pageNumber (Number***REMOVED*** - the currently visible page
#   $pagesCount (Number***REMOVED*** - the total number of pages in the document
pdfjs-page-of-pages = ({ $pageNumber ***REMOVED***-ը { $pagesCount ***REMOVED******REMOVED***-ից
pdfjs-zoom-out-button =
    .title = Փոքրացնել
pdfjs-zoom-out-button-label = Փոքրացնել
pdfjs-zoom-in-button =
    .title = Խոշորացնել
pdfjs-zoom-in-button-label = Խոշորացնել
pdfjs-zoom-select =
    .title = Դիտափոխում
pdfjs-presentation-mode-button =
    .title = Անցնել Ներկայացման եղանակին
pdfjs-presentation-mode-button-label = Ներկայացման եղանակ
pdfjs-open-file-button =
    .title = Բացել նիշք
pdfjs-open-file-button-label = Բացել
pdfjs-print-button =
    .title = Տպել
pdfjs-print-button-label = Տպել
# Used in Firefox for Android as a label for the download button (“download” is a verb***REMOVED***.
# Length of the translation matters since we are in a mobile context, with limited screen estate.
pdfjs-download-button-label = Ներբեռնել
pdfjs-bookmark-button-label = Ընթացիկ էջ

##  Secondary toolbar and context menu

pdfjs-tools-button =
    .title = Գործիքներ
pdfjs-tools-button-label = Գործիքներ
pdfjs-first-page-button =
    .title = Անցնել առաջին էջին
pdfjs-first-page-button-label = Անցնել առաջին էջին
pdfjs-last-page-button =
    .title = Անցնել վերջին էջին
pdfjs-last-page-button-label = Անցնել վերջին էջին
pdfjs-page-rotate-cw-button =
    .title = Պտտել ըստ ժամացույցի սլաքի
pdfjs-page-rotate-cw-button-label = Պտտել ըստ ժամացույցի սլաքի
pdfjs-page-rotate-ccw-button =
    .title = Պտտել հակառակ ժամացույցի սլաքի
pdfjs-page-rotate-ccw-button-label = Պտտել հակառակ ժամացույցի սլաքի
pdfjs-cursor-text-select-tool-button =
    .title = Միացնել գրույթ ընտրելու գործիքը
pdfjs-cursor-text-select-tool-button-label = Գրույթը ընտրելու գործիք
pdfjs-cursor-hand-tool-button =
    .title = Միացնել Ձեռքի գործիքը
pdfjs-cursor-hand-tool-button-label = Ձեռքի գործիք
pdfjs-scroll-vertical-button =
    .title = Օգտագործել ուղղահայաց ոլորում
pdfjs-scroll-vertical-button-label = Ուղղահայաց ոլորում
pdfjs-scroll-horizontal-button =
    .title = Օգտագործել հորիզոնական ոլորում
pdfjs-scroll-horizontal-button-label = Հորիզոնական ոլորում
pdfjs-scroll-wrapped-button =
    .title = Օգտագործել փաթաթված ոլորում
pdfjs-scroll-wrapped-button-label = Փաթաթված ոլորում
pdfjs-spread-none-button =
    .title = Մի միացեք էջի վերածածկերին
pdfjs-spread-none-button-label = Չկա վերածածկեր
pdfjs-spread-odd-button =
    .title = Միացեք էջի վերածածկերին սկսելով՝ կենտ համարակալված էջերով
pdfjs-spread-odd-button-label = Կենտ վերածածկեր
pdfjs-spread-even-button =
    .title = Միացեք էջի վերածածկերին սկսելով՝ զույգ համարակալված էջերով
pdfjs-spread-even-button-label = Զույգ վերածածկեր

## Document properties dialog

pdfjs-document-properties-button =
    .title = Փաստաթղթի հատկությունները…
pdfjs-document-properties-button-label = Փաստաթղթի հատկությունները…
pdfjs-document-properties-file-name = Նիշքի անունը.
pdfjs-document-properties-file-size = Նիշք չափը.
# Variables:
#   $size_kb (Number***REMOVED*** - the PDF file size in kilobytes
#   $size_b (Number***REMOVED*** - the PDF file size in bytes
pdfjs-document-properties-kb = { $size_kb ***REMOVED*** ԿԲ ({ $size_b ***REMOVED*** բայթ***REMOVED***
# Variables:
#   $size_mb (Number***REMOVED*** - the PDF file size in megabytes
#   $size_b (Number***REMOVED*** - the PDF file size in bytes
pdfjs-document-properties-mb = { $size_mb ***REMOVED*** ՄԲ ({ $size_b ***REMOVED*** բայթ***REMOVED***
pdfjs-document-properties-title = Վերնագիր.
pdfjs-document-properties-author = Հեղինակ․
pdfjs-document-properties-subject = Վերնագիր.
pdfjs-document-properties-keywords = Հիմնաբառ.
pdfjs-document-properties-creation-date = Ստեղծելու ամսաթիվը.
pdfjs-document-properties-modification-date = Փոփոխելու ամսաթիվը.
# Variables:
#   $date (Date***REMOVED*** - the creation/modification date of the PDF file
#   $time (Time***REMOVED*** - the creation/modification time of the PDF file
pdfjs-document-properties-date-string = { $date ***REMOVED***, { $time ***REMOVED***
pdfjs-document-properties-creator = Ստեղծող.
pdfjs-document-properties-producer = PDF-ի հեղինակը.
pdfjs-document-properties-version = PDF-ի տարբերակը.
pdfjs-document-properties-page-count = Էջերի քանակը.
pdfjs-document-properties-page-size = Էջի չափը.
pdfjs-document-properties-page-size-unit-inches = ում
pdfjs-document-properties-page-size-unit-millimeters = մմ
pdfjs-document-properties-page-size-orientation-portrait = ուղղաձիգ
pdfjs-document-properties-page-size-orientation-landscape = հորիզոնական
pdfjs-document-properties-page-size-name-a-three = A3
pdfjs-document-properties-page-size-name-a-four = A4
pdfjs-document-properties-page-size-name-letter = Նամակ
pdfjs-document-properties-page-size-name-legal = Օրինական

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
pdfjs-document-properties-linearized = Արագ վեբ դիտում․
pdfjs-document-properties-linearized-yes = Այո
pdfjs-document-properties-linearized-no = Ոչ
pdfjs-document-properties-close-button = Փակել

## Print

pdfjs-print-progress-message = Նախապատրաստում է փաստաթուղթը տպելուն...
# Variables:
#   $progress (Number***REMOVED*** - percent value
pdfjs-print-progress-percent = { $progress ***REMOVED***%
pdfjs-print-progress-close-button = Չեղարկել
pdfjs-printing-not-supported = Զգուշացում. Տպելը ամբողջությամբ չի աջակցվում դիտարկիչի կողմից։
pdfjs-printing-not-ready = Զգուշացում. PDF-ը ամբողջությամբ չի բեռնավորվել տպելու համար:

## Tooltips and alt text for side panel toolbar buttons

pdfjs-toggle-sidebar-button =
    .title = Բացել/Փակել Կողային վահանակը
pdfjs-toggle-sidebar-button-label = Բացել/Փակել Կողային վահանակը
pdfjs-document-outline-button =
    .title = Ցուցադրել փաստաթղթի ուրվագիծը (կրկնակի սեղմեք՝ միավորները ընդարձակելու/կոծկելու համար***REMOVED***
pdfjs-document-outline-button-label = Փաստաթղթի բովանդակությունը
pdfjs-attachments-button =
    .title = Ցուցադրել կցորդները
pdfjs-attachments-button-label = Կցորդներ
pdfjs-thumbs-button =
    .title = Ցուցադրել Մանրապատկերը
pdfjs-thumbs-button-label = Մանրապատկերը
pdfjs-findbar-button =
    .title = Գտնել փաստաթղթում
pdfjs-findbar-button-label = Որոնում

## Thumbnails panel item (tooltip and alt text for images***REMOVED***

# Variables:
#   $page (Number***REMOVED*** - the page number
pdfjs-thumb-page-title =
    .title = Էջը { $page ***REMOVED***
# Variables:
#   $page (Number***REMOVED*** - the page number
pdfjs-thumb-page-canvas =
    .aria-label = Էջի մանրապատկերը { $page ***REMOVED***

## Find panel button title and messages

pdfjs-find-input =
    .title = Որոնում
    .placeholder = Գտնել փաստաթղթում...
pdfjs-find-previous-button =
    .title = Գտնել անրահայտության նախորդ հանդիպումը
pdfjs-find-previous-button-label = Նախորդը
pdfjs-find-next-button =
    .title = Գտիր արտահայտության հաջորդ հանդիպումը
pdfjs-find-next-button-label = Հաջորդը
pdfjs-find-highlight-checkbox = Գունանշել բոլորը
pdfjs-find-match-case-checkbox-label = Մեծ(փոքր***REMOVED***ատառ հաշվի առնել
pdfjs-find-entire-word-checkbox-label = Ամբողջ բառերը
pdfjs-find-reached-top = Հասել եք փաստաթղթի վերևին, կշարունակվի ներքևից
pdfjs-find-reached-bottom = Հասել եք փաստաթղթի վերջին, կշարունակվի վերևից
pdfjs-find-not-found = Արտահայտությունը չգտնվեց

## Predefined zoom values

pdfjs-page-scale-width = Էջի լայնքը
pdfjs-page-scale-fit = Ձգել էջը
pdfjs-page-scale-auto = Ինքնաշխատ
pdfjs-page-scale-actual = Իրական չափը
# Variables:
#   $scale (Number***REMOVED*** - percent value for page scale
pdfjs-page-scale-percent = { $scale ***REMOVED***%

## PDF page


## Loading indicator messages

pdfjs-loading-error = Սխալ՝ PDF ֆայլը բացելիս։
pdfjs-invalid-file-error = Սխալ կամ վնասված PDF ֆայլ:
pdfjs-missing-file-error = PDF ֆայլը բացակայում է:
pdfjs-unexpected-response-error = Սպասարկիչի անսպասելի պատասխան:
pdfjs-rendering-error = Սխալ՝ էջը ստեղծելիս:

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
    .alt = [{ $type ***REMOVED*** Ծանոթություն]

## Password

pdfjs-password-label = Մուտքագրեք PDF-ի գաղտնաբառը:
pdfjs-password-invalid = Գաղտնաբառը սխալ է: Կրկին փորձեք:
pdfjs-password-ok-button = Լավ
pdfjs-password-cancel-button = Չեղարկել
pdfjs-web-fonts-disabled = Վեբ-տառատեսակները անջատված են. հնարավոր չէ օգտագործել ներկառուցված PDF տառատեսակները:

## Editing


## Remove button for the various kind of editor.


##

pdfjs-free-text-default-content = Սկսել մուտքագրումը…

## Alt-text dialog


## Editor resizers
## This is used in an aria label to help to understand the role of the resizer.


## Color picker


## Show all highlights
## This is a toggle button to show/hide all the highlights.

pdfjs-editor-highlight-show-all-button-label = Ցուցադրել բոլորը
pdfjs-editor-highlight-show-all-button =
    .title = Ցուցադրել բոլորը
