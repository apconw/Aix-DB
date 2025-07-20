# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.


## Main toolbar buttons (tooltips and alt text for images***REMOVED***

pdfjs-previous-button =
    .title = Նախորդ էջ
pdfjs-previous-button-label = Նախորդը
pdfjs-next-button =
    .title = Յաջորդ էջ
pdfjs-next-button-label = Յաջորդը
# .title: Tooltip for the pageNumber input.
pdfjs-page-input =
    .title = էջ
# Variables:
#   $pagesCount (Number***REMOVED*** - the total number of pages in the document
# This string follows an input field with the number of the page currently displayed.
pdfjs-of-pages = { $pagesCount ***REMOVED***-ից
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
    .title = Խոշորացում
pdfjs-presentation-mode-button =
    .title = Անցնել ներկայացման եղանակին
pdfjs-presentation-mode-button-label = Ներկայացման եղանակ
pdfjs-open-file-button =
    .title = Բացել նիշքը
pdfjs-open-file-button-label = Բացել
pdfjs-print-button =
    .title = Տպել
pdfjs-print-button-label = Տպել

##  Secondary toolbar and context menu

pdfjs-tools-button =
    .title = Գործիքներ
pdfjs-tools-button-label = Գործիքներ
pdfjs-first-page-button =
    .title = Գնալ դէպի առաջին էջ
pdfjs-first-page-button-label = Գնալ դէպի առաջին էջ
pdfjs-last-page-button =
    .title = Գնալ դէպի վերջին էջ
pdfjs-last-page-button-label = Գնալ դէպի վերջին էջ
pdfjs-page-rotate-cw-button =
    .title = Պտտել ժամացոյցի սլաքի ուղղութեամբ
pdfjs-page-rotate-cw-button-label = Պտտել ժամացոյցի սլաքի ուղղութեամբ
pdfjs-page-rotate-ccw-button =
    .title = Պտտել ժամացոյցի սլաքի հակառակ ուղղութեամբ
pdfjs-page-rotate-ccw-button-label = Պտտել ժամացոյցի սլաքի հակառակ ուղղութեամբ
pdfjs-cursor-text-select-tool-button =
    .title = Միացնել գրոյթ ընտրելու գործիքը
pdfjs-cursor-text-select-tool-button-label = Գրուածք ընտրելու գործիք
pdfjs-cursor-hand-tool-button =
    .title = Միացնել ձեռքի գործիքը
pdfjs-cursor-hand-tool-button-label = Ձեռքի գործիք
pdfjs-scroll-page-button =
    .title = Աւգտագործել էջի ոլորում
pdfjs-scroll-page-button-label = Էջի ոլորում
pdfjs-scroll-vertical-button =
    .title = Աւգտագործել ուղղահայեաց ոլորում
pdfjs-scroll-vertical-button-label = Ուղղահայեաց ոլորում
pdfjs-scroll-horizontal-button =
    .title = Աւգտագործել հորիզոնական ոլորում
pdfjs-scroll-horizontal-button-label = Հորիզոնական ոլորում
pdfjs-scroll-wrapped-button =
    .title = Աւգտագործել փաթաթուած ոլորում
pdfjs-scroll-wrapped-button-label = Փաթաթուած ոլորում
pdfjs-spread-none-button =
    .title = Մի միացէք էջի կոնտեքստում
pdfjs-spread-none-button-label = Չկայ կոնտեքստ
pdfjs-spread-odd-button =
    .title = Միացէք էջի կոնտեքստին սկսելով՝ կենտ համարակալուած էջերով
pdfjs-spread-odd-button-label = Տարաւրինակ կոնտեքստ
pdfjs-spread-even-button =
    .title = Միացէք էջի կոնտեքստին սկսելով՝ զոյգ համարակալուած էջերով
pdfjs-spread-even-button-label = Հաւասար վերածածկեր

## Document properties dialog

pdfjs-document-properties-button =
    .title = Փաստաթղթի հատկութիւնները…
pdfjs-document-properties-button-label = Փաստաթղթի յատկութիւնները…
pdfjs-document-properties-file-name = Նիշքի անունը․
pdfjs-document-properties-file-size = Նիշք չափը.
# Variables:
#   $size_kb (Number***REMOVED*** - the PDF file size in kilobytes
#   $size_b (Number***REMOVED*** - the PDF file size in bytes
pdfjs-document-properties-kb = { $size_kb ***REMOVED*** ԿԲ ({ $size_b ***REMOVED*** բայթ***REMOVED***
# Variables:
#   $size_mb (Number***REMOVED*** - the PDF file size in megabytes
#   $size_b (Number***REMOVED*** - the PDF file size in bytes
pdfjs-document-properties-mb = { $size_mb ***REMOVED*** ՄԲ ({ $size_b ***REMOVED*** բայթ***REMOVED***
pdfjs-document-properties-title = Վերնագիր
pdfjs-document-properties-author = Հեղինակ․
pdfjs-document-properties-subject = առարկայ
pdfjs-document-properties-keywords = Հիմնաբառեր
pdfjs-document-properties-creation-date = Ստեղծման ամսաթիւ
pdfjs-document-properties-modification-date = Փոփոխութեան ամսաթիւ.
# Variables:
#   $date (Date***REMOVED*** - the creation/modification date of the PDF file
#   $time (Time***REMOVED*** - the creation/modification time of the PDF file
pdfjs-document-properties-date-string = { $date ***REMOVED***, { $time ***REMOVED***
pdfjs-document-properties-creator = Ստեղծող
pdfjs-document-properties-producer = PDF-ի Արտադրողը.
pdfjs-document-properties-version = PDF-ի տարբերակը.
pdfjs-document-properties-page-count = Էջերի քանակը.
pdfjs-document-properties-page-size = Էջի չափը.
pdfjs-document-properties-page-size-unit-inches = ում
pdfjs-document-properties-page-size-unit-millimeters = mm
pdfjs-document-properties-page-size-orientation-portrait = ուղղաձիգ
pdfjs-document-properties-page-size-orientation-landscape = հորիզոնական
pdfjs-document-properties-page-size-name-a-three = A3
pdfjs-document-properties-page-size-name-a-four = A4
pdfjs-document-properties-page-size-name-letter = Նամակ
pdfjs-document-properties-page-size-name-legal = Աւրինական

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

pdfjs-print-progress-message = Նախապատրաստում է փաստաթուղթը տպելուն…
# Variables:
#   $progress (Number***REMOVED*** - percent value
pdfjs-print-progress-percent = { $progress ***REMOVED***%
pdfjs-print-progress-close-button = Չեղարկել
pdfjs-printing-not-supported = Զգուշացում. Տպելը ամբողջութեամբ չի աջակցուում զննարկիչի կողմից։
pdfjs-printing-not-ready = Զգուշացում. PDF֊ը ամբողջութեամբ չի բեռնաւորուել տպելու համար։

## Tooltips and alt text for side panel toolbar buttons

pdfjs-toggle-sidebar-button =
    .title = Փոխարկել կողային վահանակը
pdfjs-toggle-sidebar-notification-button =
    .title = Փոխանջատել կողմնասիւնը (փաստաթուղթը պարունակում է ուրուագիծ/կցորդներ/շերտեր***REMOVED***
pdfjs-toggle-sidebar-button-label = Փոխարկել կողային վահանակը
pdfjs-document-outline-button =
    .title = Ցուցադրել փաստաթղթի ուրուագիծը (կրկնակի սեղմէք՝ միաւորները ընդարձակելու/կոծկելու համար***REMOVED***
pdfjs-document-outline-button-label = Փաստաթղթի ուրուագիծ
pdfjs-attachments-button =
    .title = Ցուցադրել կցորդները
pdfjs-attachments-button-label = Կցորդներ
pdfjs-layers-button =
    .title = Ցուցադրել շերտերը (կրկնահպել վերակայելու բոլոր շերտերը սկզբնադիր վիճակի***REMOVED***
pdfjs-layers-button-label = Շերտեր
pdfjs-thumbs-button =
    .title = Ցուցադրել մանրապատկերը
pdfjs-thumbs-button-label = Մանրապատկեր
pdfjs-current-outline-item-button =
    .title = Գտէք ընթացիկ գծագրման տարրը
pdfjs-current-outline-item-button-label = Ընթացիկ գծագրման տարր
pdfjs-findbar-button =
    .title = Գտնել փաստաթղթում
pdfjs-findbar-button-label = Որոնում
pdfjs-additional-layers = Լրացուցիչ շերտեր

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
    .placeholder = Գտնել փաստաթղթում…
pdfjs-find-previous-button =
    .title = Գտնել արտայայտութեան նախորդ արտայայտութիւնը
pdfjs-find-previous-button-label = Նախորդը
pdfjs-find-next-button =
    .title = Գտիր արտայայտութեան յաջորդ արտայայտութիւնը
pdfjs-find-next-button-label = Հաջորդը
pdfjs-find-highlight-checkbox = Գունանշել բոլորը
pdfjs-find-match-case-checkbox-label = Հաշուի առնել հանգամանքը
pdfjs-find-match-diacritics-checkbox-label = Հնչիւնատարբերիչ նշանների համապատասխանեցում
pdfjs-find-entire-word-checkbox-label = Ամբողջ բառերը
pdfjs-find-reached-top = Հասել եք փաստաթղթի վերեւին,շարունակել ներքեւից
pdfjs-find-reached-bottom = Հասել էք փաստաթղթի վերջին, շարունակել վերեւից
pdfjs-find-not-found = Արտայայտութիւնը չգտնուեց

## Predefined zoom values

pdfjs-page-scale-width = Էջի լայնութիւն
pdfjs-page-scale-fit = Հարմարեցնել էջը
pdfjs-page-scale-auto = Ինքնաշխատ խոշորացում
pdfjs-page-scale-actual = Իրական չափը
# Variables:
#   $scale (Number***REMOVED*** - percent value for page scale
pdfjs-page-scale-percent = { $scale ***REMOVED***%

## PDF page

# Variables:
#   $page (Number***REMOVED*** - the page number
pdfjs-page-landmark =
    .aria-label = Էջ { $page ***REMOVED***

## Loading indicator messages

pdfjs-loading-error = PDF նիշքը բացելիս սխալ է տեղի ունեցել։
pdfjs-invalid-file-error = Սխալ կամ վնասուած PDF նիշք։
pdfjs-missing-file-error = PDF նիշքը բացակաիւմ է։
pdfjs-unexpected-response-error = Սպասարկիչի անսպասելի պատասխան։
pdfjs-rendering-error = Սխալ է տեղի ունեցել էջի մեկնաբանման ժամանակ

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
    .alt = [{ $type ***REMOVED*** Ծանոթութիւն]

## Password

pdfjs-password-label = Մուտքագրէք  գաղտնաբառը այս PDF նիշքը բացելու համար
pdfjs-password-invalid = Գաղտնաբառը սխալ է: Կրկին փորձէք:
pdfjs-password-ok-button = Լաւ
pdfjs-password-cancel-button = Չեղարկել
pdfjs-web-fonts-disabled = Վեբ-տառատեսակները անջատուած են. հնարաւոր չէ աւգտագործել ներկառուցուած PDF տառատեսակները։

## Editing


## Alt-text dialog


## Editor resizers
## This is used in an aria label to help to understand the role of the resizer.

