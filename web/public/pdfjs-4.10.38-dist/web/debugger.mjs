/* Copyright 2012 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License"***REMOVED***;
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const { OPS ***REMOVED*** = globalThis.pdfjsLib || (await import("pdfjs-lib"***REMOVED******REMOVED***;

const opMap = Object.create(null***REMOVED***;
for (const key in OPS***REMOVED*** {
  opMap[OPS[key]] = key;
***REMOVED***

const FontInspector = (function FontInspectorClosure(***REMOVED*** {
  let fonts;
  let active = false;
  const fontAttribute = "data-font-name";
  function removeSelection(***REMOVED*** {
    const divs = document.querySelectorAll(`span[${fontAttribute***REMOVED***]`***REMOVED***;
    for (const div of divs***REMOVED*** {
      div.className = "";
    ***REMOVED***
  ***REMOVED***
  function resetSelection(***REMOVED*** {
    const divs = document.querySelectorAll(`span[${fontAttribute***REMOVED***]`***REMOVED***;
    for (const div of divs***REMOVED*** {
      div.className = "debuggerHideText";
    ***REMOVED***
  ***REMOVED***
  function selectFont(fontName, show***REMOVED*** {
    const divs = document.querySelectorAll(
***REMOVED***span[${fontAttribute***REMOVED***=${fontName***REMOVED***]`
    ***REMOVED***;
    for (const div of divs***REMOVED*** {
      div.className = show ? "debuggerShowText" : "debuggerHideText";
    ***REMOVED***
  ***REMOVED***
  function textLayerClick(e***REMOVED*** {
    if (
      !e.target.dataset.fontName ||
      e.target.tagName.toUpperCase(***REMOVED*** !== "SPAN"
    ***REMOVED*** {
      return;
    ***REMOVED***
    const fontName = e.target.dataset.fontName;
    const selects = document.getElementsByTagName("input"***REMOVED***;
    for (const select of selects***REMOVED*** {
      if (select.dataset.fontName !== fontName***REMOVED*** {
        continue;
      ***REMOVED***
      select.checked = !select.checked;
      selectFont(fontName, select.checked***REMOVED***;
      select.scrollIntoView(***REMOVED***;
    ***REMOVED***
  ***REMOVED***
  return {
    // Properties/functions needed by PDFBug.
    id: "FontInspector",
    name: "Font Inspector",
    panel: null,
    manager: null,
    init(***REMOVED*** {
      const panel = this.panel;
      const tmp = document.createElement("button"***REMOVED***;
      tmp.addEventListener("click", resetSelection***REMOVED***;
      tmp.textContent = "Refresh";
      panel.append(tmp***REMOVED***;

      fonts = document.createElement("div"***REMOVED***;
      panel.append(fonts***REMOVED***;
    ***REMOVED***,
    cleanup(***REMOVED*** {
      fonts.textContent = "";
    ***REMOVED***,
    enabled: false,
    get active(***REMOVED*** {
      return active;
    ***REMOVED***,
    set active(value***REMOVED*** {
      active = value;
      if (active***REMOVED*** {
        document.body.addEventListener("click", textLayerClick, true***REMOVED***;
        resetSelection(***REMOVED***;
      ***REMOVED*** else {
        document.body.removeEventListener("click", textLayerClick, true***REMOVED***;
        removeSelection(***REMOVED***;
      ***REMOVED***
    ***REMOVED***,
    // FontInspector specific functions.
    fontAdded(fontObj, url***REMOVED*** {
      function properties(obj, list***REMOVED*** {
        const moreInfo = document.createElement("table"***REMOVED***;
        for (const entry of list***REMOVED*** {
          const tr = document.createElement("tr"***REMOVED***;
          const td1 = document.createElement("td"***REMOVED***;
          td1.textContent = entry;
          tr.append(td1***REMOVED***;
          const td2 = document.createElement("td"***REMOVED***;
          td2.textContent = obj[entry].toString(***REMOVED***;
          tr.append(td2***REMOVED***;
          moreInfo.append(tr***REMOVED***;
        ***REMOVED***
        return moreInfo;
      ***REMOVED***

      const moreInfo = fontObj.css
        ? properties(fontObj, ["baseFontName"]***REMOVED***
        : properties(fontObj, ["name", "type"]***REMOVED***;

      const fontName = fontObj.loadedName;
      const font = document.createElement("div"***REMOVED***;
      const name = document.createElement("span"***REMOVED***;
      name.textContent = fontName;
      let download;
      if (!fontObj.css***REMOVED*** {
        download = document.createElement("a"***REMOVED***;
        if (url***REMOVED*** {
          url = /url\(['"]?([^***REMOVED***"']+***REMOVED***/.exec(url***REMOVED***;
          download.href = url[1];
        ***REMOVED*** else if (fontObj.data***REMOVED*** {
          download.href = URL.createObjectURL(
            new Blob([fontObj.data], { type: fontObj.mimetype ***REMOVED******REMOVED***
          ***REMOVED***;
        ***REMOVED***
        download.textContent = "Download";
      ***REMOVED***

      const logIt = document.createElement("a"***REMOVED***;
      logIt.href = "";
      logIt.textContent = "Log";
      logIt.addEventListener("click", function (event***REMOVED*** {
        event.preventDefault(***REMOVED***;
        console.log(fontObj***REMOVED***;
      ***REMOVED******REMOVED***;
      const select = document.createElement("input"***REMOVED***;
      select.setAttribute("type", "checkbox"***REMOVED***;
      select.dataset.fontName = fontName;
      select.addEventListener("click", function (***REMOVED*** {
        selectFont(fontName, select.checked***REMOVED***;
      ***REMOVED******REMOVED***;
      if (download***REMOVED*** {
        font.append(select, name, " ", download, " ", logIt, moreInfo***REMOVED***;
      ***REMOVED*** else {
        font.append(select, name, " ", logIt, moreInfo***REMOVED***;
      ***REMOVED***
      fonts.append(font***REMOVED***;
      // Somewhat of a hack, should probably add a hook for when the text layer
      // is done rendering.
      setTimeout((***REMOVED*** => {
        if (this.active***REMOVED*** {
          resetSelection(***REMOVED***;
        ***REMOVED***
      ***REMOVED***, 2000***REMOVED***;
    ***REMOVED***,
  ***REMOVED***;
***REMOVED******REMOVED***(***REMOVED***;

// Manages all the page steppers.
const StepperManager = (function StepperManagerClosure(***REMOVED*** {
  let steppers = [];
  let stepperDiv = null;
  let stepperControls = null;
  let stepperChooser = null;
  let breakPoints = Object.create(null***REMOVED***;
  return {
    // Properties/functions needed by PDFBug.
    id: "Stepper",
    name: "Stepper",
    panel: null,
    manager: null,
    init(***REMOVED*** {
      const self = this;
      stepperControls = document.createElement("div"***REMOVED***;
      stepperChooser = document.createElement("select"***REMOVED***;
      stepperChooser.addEventListener("change", function (event***REMOVED*** {
        self.selectStepper(this.value***REMOVED***;
      ***REMOVED******REMOVED***;
      stepperControls.append(stepperChooser***REMOVED***;
      stepperDiv = document.createElement("div"***REMOVED***;
      this.panel.append(stepperControls, stepperDiv***REMOVED***;
      if (sessionStorage.getItem("pdfjsBreakPoints"***REMOVED******REMOVED*** {
        breakPoints = JSON.parse(sessionStorage.getItem("pdfjsBreakPoints"***REMOVED******REMOVED***;
      ***REMOVED***
    ***REMOVED***,
    cleanup(***REMOVED*** {
      stepperChooser.textContent = "";
      stepperDiv.textContent = "";
      steppers = [];
    ***REMOVED***,
    enabled: false,
    active: false,
    // Stepper specific functions.
    create(pageIndex***REMOVED*** {
      const debug = document.createElement("div"***REMOVED***;
      debug.id = "stepper" + pageIndex;
      debug.hidden = true;
      debug.className = "stepper";
      stepperDiv.append(debug***REMOVED***;
      const b = document.createElement("option"***REMOVED***;
      b.textContent = "Page " + (pageIndex + 1***REMOVED***;
      b.value = pageIndex;
      stepperChooser.append(b***REMOVED***;
      const initBreakPoints = breakPoints[pageIndex] || [];
      const stepper = new Stepper(debug, pageIndex, initBreakPoints***REMOVED***;
      steppers.push(stepper***REMOVED***;
      if (steppers.length === 1***REMOVED*** {
        this.selectStepper(pageIndex, false***REMOVED***;
      ***REMOVED***
      return stepper;
    ***REMOVED***,
    selectStepper(pageIndex, selectPanel***REMOVED*** {
      pageIndex |= 0;
      if (selectPanel***REMOVED*** {
        this.manager.selectPanel(this***REMOVED***;
      ***REMOVED***
      for (const stepper of steppers***REMOVED*** {
        stepper.panel.hidden = stepper.pageIndex !== pageIndex;
      ***REMOVED***
      for (const option of stepperChooser.options***REMOVED*** {
        option.selected = (option.value | 0***REMOVED*** === pageIndex;
      ***REMOVED***
    ***REMOVED***,
    saveBreakPoints(pageIndex, bps***REMOVED*** {
      breakPoints[pageIndex] = bps;
      sessionStorage.setItem("pdfjsBreakPoints", JSON.stringify(breakPoints***REMOVED******REMOVED***;
    ***REMOVED***,
  ***REMOVED***;
***REMOVED******REMOVED***(***REMOVED***;

// The stepper for each page's operatorList.
class Stepper {
  // Shorter way to create element and optionally set textContent.
  #c(tag, textContent***REMOVED*** {
    const d = document.createElement(tag***REMOVED***;
    if (textContent***REMOVED*** {
      d.textContent = textContent;
    ***REMOVED***
    return d;
  ***REMOVED***

  #simplifyArgs(args***REMOVED*** {
    if (typeof args === "string"***REMOVED*** {
      const MAX_STRING_LENGTH = 75;
      return args.length <= MAX_STRING_LENGTH
        ? args
        : args.substring(0, MAX_STRING_LENGTH***REMOVED*** + "...";
    ***REMOVED***
    if (typeof args !== "object" || args === null***REMOVED*** {
      return args;
    ***REMOVED***
    if ("length" in args***REMOVED*** {
      // array
      const MAX_ITEMS = 10,
        simpleArgs = [];
      let i, ii;
      for (i = 0, ii = Math.min(MAX_ITEMS, args.length***REMOVED***; i < ii; i++***REMOVED*** {
        simpleArgs.push(this.#simplifyArgs(args[i]***REMOVED******REMOVED***;
      ***REMOVED***
      if (i < args.length***REMOVED*** {
        simpleArgs.push("..."***REMOVED***;
      ***REMOVED***
      return simpleArgs;
    ***REMOVED***
    const simpleObj = {***REMOVED***;
    for (const key in args***REMOVED*** {
      simpleObj[key] = this.#simplifyArgs(args[key]***REMOVED***;
    ***REMOVED***
    return simpleObj;
  ***REMOVED***

  constructor(panel, pageIndex, initialBreakPoints***REMOVED*** {
    this.panel = panel;
    this.breakPoint = 0;
    this.nextBreakPoint = null;
    this.pageIndex = pageIndex;
    this.breakPoints = initialBreakPoints;
    this.currentIdx = -1;
    this.operatorListIdx = 0;
    this.indentLevel = 0;
  ***REMOVED***

  init(operatorList***REMOVED*** {
    const panel = this.panel;
    const content = this.#c("div", "c=continue, s=step"***REMOVED***;
    const table = this.#c("table"***REMOVED***;
    content.append(table***REMOVED***;
    table.cellSpacing = 0;
    const headerRow = this.#c("tr"***REMOVED***;
    table.append(headerRow***REMOVED***;
    headerRow.append(
      this.#c("th", "Break"***REMOVED***,
      this.#c("th", "Idx"***REMOVED***,
      this.#c("th", "fn"***REMOVED***,
      this.#c("th", "args"***REMOVED***
    ***REMOVED***;
    panel.append(content***REMOVED***;
    this.table = table;
    this.updateOperatorList(operatorList***REMOVED***;
  ***REMOVED***

  updateOperatorList(operatorList***REMOVED*** {
    const self = this;

    function cboxOnClick(***REMOVED*** {
      const x = +this.dataset.idx;
      if (this.checked***REMOVED*** {
        self.breakPoints.push(x***REMOVED***;
      ***REMOVED*** else {
        self.breakPoints.splice(self.breakPoints.indexOf(x***REMOVED***, 1***REMOVED***;
      ***REMOVED***
      StepperManager.saveBreakPoints(self.pageIndex, self.breakPoints***REMOVED***;
    ***REMOVED***

    const MAX_OPERATORS_COUNT = 15000;
    if (this.operatorListIdx > MAX_OPERATORS_COUNT***REMOVED*** {
      return;
    ***REMOVED***

    const chunk = document.createDocumentFragment(***REMOVED***;
    const operatorsToDisplay = Math.min(
      MAX_OPERATORS_COUNT,
      operatorList.fnArray.length
    ***REMOVED***;
    for (let i = this.operatorListIdx; i < operatorsToDisplay; i++***REMOVED*** {
      const line = this.#c("tr"***REMOVED***;
      line.className = "line";
      line.dataset.idx = i;
      chunk.append(line***REMOVED***;
      const checked = this.breakPoints.includes(i***REMOVED***;
      const args = operatorList.argsArray[i] || [];

      const breakCell = this.#c("td"***REMOVED***;
      const cbox = this.#c("input"***REMOVED***;
      cbox.type = "checkbox";
      cbox.className = "points";
      cbox.checked = checked;
      cbox.dataset.idx = i;
      cbox.onclick = cboxOnClick;

      breakCell.append(cbox***REMOVED***;
      line.append(breakCell, this.#c("td", i.toString(***REMOVED******REMOVED******REMOVED***;
      const fn = opMap[operatorList.fnArray[i]];
      let decArgs = args;
      if (fn === "showText"***REMOVED*** {
        const glyphs = args[0];
        const charCodeRow = this.#c("tr"***REMOVED***;
        const fontCharRow = this.#c("tr"***REMOVED***;
        const unicodeRow = this.#c("tr"***REMOVED***;
        for (const glyph of glyphs***REMOVED*** {
          if (typeof glyph === "object" && glyph !== null***REMOVED*** {
            charCodeRow.append(this.#c("td", glyph.originalCharCode***REMOVED******REMOVED***;
            fontCharRow.append(this.#c("td", glyph.fontChar***REMOVED******REMOVED***;
            unicodeRow.append(this.#c("td", glyph.unicode***REMOVED******REMOVED***;
          ***REMOVED*** else {
            // null or number
            const advanceEl = this.#c("td", glyph***REMOVED***;
            advanceEl.classList.add("advance"***REMOVED***;
            charCodeRow.append(advanceEl***REMOVED***;
            fontCharRow.append(this.#c("td"***REMOVED******REMOVED***;
            unicodeRow.append(this.#c("td"***REMOVED******REMOVED***;
          ***REMOVED***
        ***REMOVED***
        decArgs = this.#c("td"***REMOVED***;
        const table = this.#c("table"***REMOVED***;
        table.classList.add("showText"***REMOVED***;
        decArgs.append(table***REMOVED***;
        table.append(charCodeRow, fontCharRow, unicodeRow***REMOVED***;
      ***REMOVED*** else if (fn === "restore" && this.indentLevel > 0***REMOVED*** {
        this.indentLevel--;
      ***REMOVED***
      line.append(this.#c("td", " ".repeat(this.indentLevel * 2***REMOVED*** + fn***REMOVED******REMOVED***;
      if (fn === "save"***REMOVED*** {
        this.indentLevel++;
      ***REMOVED***

      if (decArgs instanceof HTMLElement***REMOVED*** {
        line.append(decArgs***REMOVED***;
      ***REMOVED*** else {
        line.append(this.#c("td", JSON.stringify(this.#simplifyArgs(decArgs***REMOVED******REMOVED******REMOVED******REMOVED***;
      ***REMOVED***
    ***REMOVED***
    if (operatorsToDisplay < operatorList.fnArray.length***REMOVED*** {
      const lastCell = this.#c("td", "..."***REMOVED***;
      lastCell.colspan = 4;
      chunk.append(lastCell***REMOVED***;
    ***REMOVED***
    this.operatorListIdx = operatorList.fnArray.length;
    this.table.append(chunk***REMOVED***;
  ***REMOVED***

  getNextBreakPoint(***REMOVED*** {
    this.breakPoints.sort(function (a, b***REMOVED*** {
      return a - b;
    ***REMOVED******REMOVED***;
    for (const breakPoint of this.breakPoints***REMOVED*** {
      if (breakPoint > this.currentIdx***REMOVED*** {
        return breakPoint;
      ***REMOVED***
    ***REMOVED***
    return null;
  ***REMOVED***

  breakIt(idx, callback***REMOVED*** {
    StepperManager.selectStepper(this.pageIndex, true***REMOVED***;
    this.currentIdx = idx;

    const listener = evt => {
      switch (evt.keyCode***REMOVED*** {
        case 83: // step
          document.removeEventListener("keydown", listener***REMOVED***;
          this.nextBreakPoint = this.currentIdx + 1;
          this.goTo(-1***REMOVED***;
          callback(***REMOVED***;
          break;
        case 67: // continue
          document.removeEventListener("keydown", listener***REMOVED***;
          this.nextBreakPoint = this.getNextBreakPoint(***REMOVED***;
          this.goTo(-1***REMOVED***;
          callback(***REMOVED***;
          break;
      ***REMOVED***
    ***REMOVED***;
    document.addEventListener("keydown", listener***REMOVED***;
    this.goTo(idx***REMOVED***;
  ***REMOVED***

  goTo(idx***REMOVED*** {
    const allRows = this.panel.getElementsByClassName("line"***REMOVED***;
    for (const row of allRows***REMOVED*** {
      if ((row.dataset.idx | 0***REMOVED*** === idx***REMOVED*** {
        row.style.backgroundColor = "rgb(251,250,207***REMOVED***";
        row.scrollIntoView(***REMOVED***;
      ***REMOVED*** else {
        row.style.backgroundColor = null;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
***REMOVED***

const Stats = (function Stats(***REMOVED*** {
  let stats = [];
  function clear(node***REMOVED*** {
    node.textContent = ""; // Remove any `node` contents from the DOM.
  ***REMOVED***
  function getStatIndex(pageNumber***REMOVED*** {
    for (const [i, stat] of stats.entries(***REMOVED******REMOVED*** {
      if (stat.pageNumber === pageNumber***REMOVED*** {
        return i;
      ***REMOVED***
    ***REMOVED***
    return false;
  ***REMOVED***
  return {
    // Properties/functions needed by PDFBug.
    id: "Stats",
    name: "Stats",
    panel: null,
    manager: null,
    init(***REMOVED*** {***REMOVED***,
    enabled: false,
    active: false,
    // Stats specific functions.
    add(pageNumber, stat***REMOVED*** {
      if (!stat***REMOVED*** {
        return;
      ***REMOVED***
      const statsIndex = getStatIndex(pageNumber***REMOVED***;
      if (statsIndex !== false***REMOVED*** {
        stats[statsIndex].div.remove(***REMOVED***;
        stats.splice(statsIndex, 1***REMOVED***;
      ***REMOVED***
      const wrapper = document.createElement("div"***REMOVED***;
      wrapper.className = "stats";
      const title = document.createElement("div"***REMOVED***;
      title.className = "title";
      title.textContent = "Page: " + pageNumber;
      const statsDiv = document.createElement("div"***REMOVED***;
      statsDiv.textContent = stat.toString(***REMOVED***;
      wrapper.append(title, statsDiv***REMOVED***;
      stats.push({ pageNumber, div: wrapper ***REMOVED******REMOVED***;
      stats.sort(function (a, b***REMOVED*** {
        return a.pageNumber - b.pageNumber;
      ***REMOVED******REMOVED***;
      clear(this.panel***REMOVED***;
      for (const entry of stats***REMOVED*** {
        this.panel.append(entry.div***REMOVED***;
      ***REMOVED***
    ***REMOVED***,
    cleanup(***REMOVED*** {
      stats = [];
      clear(this.panel***REMOVED***;
    ***REMOVED***,
  ***REMOVED***;
***REMOVED******REMOVED***(***REMOVED***;

// Manages all the debugging tools.
class PDFBug {
  static #buttons = [];

  static #activePanel = null;

  static tools = [FontInspector, StepperManager, Stats];

  static enable(ids***REMOVED*** {
    const all = ids.length === 1 && ids[0] === "all";
    const tools = this.tools;
    for (const tool of tools***REMOVED*** {
      if (all || ids.includes(tool.id***REMOVED******REMOVED*** {
        tool.enabled = true;
      ***REMOVED***
    ***REMOVED***
    if (!all***REMOVED*** {
      // Sort the tools by the order they are enabled.
      tools.sort(function (a, b***REMOVED*** {
        let indexA = ids.indexOf(a.id***REMOVED***;
        indexA = indexA < 0 ? tools.length : indexA;
        let indexB = ids.indexOf(b.id***REMOVED***;
        indexB = indexB < 0 ? tools.length : indexB;
        return indexA - indexB;
      ***REMOVED******REMOVED***;
    ***REMOVED***
  ***REMOVED***

  static init(container, ids***REMOVED*** {
    this.loadCSS(***REMOVED***;
    this.enable(ids***REMOVED***;
    /*
     * Basic Layout:
     * PDFBug
     *  Controls
     *  Panels
     *    Panel
     *    Panel
     *    ...
     */
    const ui = document.createElement("div"***REMOVED***;
    ui.id = "PDFBug";

    const controls = document.createElement("div"***REMOVED***;
    controls.setAttribute("class", "controls"***REMOVED***;
    ui.append(controls***REMOVED***;

    const panels = document.createElement("div"***REMOVED***;
    panels.setAttribute("class", "panels"***REMOVED***;
    ui.append(panels***REMOVED***;

    container.append(ui***REMOVED***;
    container.style.right = "var(--panel-width***REMOVED***";

    // Initialize all the debugging tools.
    for (const tool of this.tools***REMOVED*** {
      const panel = document.createElement("div"***REMOVED***;
      const panelButton = document.createElement("button"***REMOVED***;
      panelButton.textContent = tool.name;
      panelButton.addEventListener("click", event => {
        event.preventDefault(***REMOVED***;
        this.selectPanel(tool***REMOVED***;
      ***REMOVED******REMOVED***;
      controls.append(panelButton***REMOVED***;
      panels.append(panel***REMOVED***;
      tool.panel = panel;
      tool.manager = this;
      if (tool.enabled***REMOVED*** {
        tool.init(***REMOVED***;
      ***REMOVED*** else {
        panel.textContent =
    ***REMOVED***${tool.name***REMOVED*** is disabled. To enable add "${tool.id***REMOVED***" to ` +
          "the pdfBug parameter and refresh (separate multiple by commas***REMOVED***.";
      ***REMOVED***
      this.#buttons.push(panelButton***REMOVED***;
    ***REMOVED***
    this.selectPanel(0***REMOVED***;
  ***REMOVED***

  static loadCSS(***REMOVED*** {
    const { url ***REMOVED*** = import.meta;

    const link = document.createElement("link"***REMOVED***;
    link.rel = "stylesheet";
    link.href = url.replace(/\.mjs$/, ".css"***REMOVED***;

    document.head.append(link***REMOVED***;
  ***REMOVED***

  static cleanup(***REMOVED*** {
    for (const tool of this.tools***REMOVED*** {
      if (tool.enabled***REMOVED*** {
        tool.cleanup(***REMOVED***;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***

  static selectPanel(index***REMOVED*** {
    if (typeof index !== "number"***REMOVED*** {
      index = this.tools.indexOf(index***REMOVED***;
    ***REMOVED***
    if (index === this.#activePanel***REMOVED*** {
      return;
    ***REMOVED***
    this.#activePanel = index;
    for (const [j, tool] of this.tools.entries(***REMOVED******REMOVED*** {
      const isActive = j === index;
      this.#buttons[j].classList.toggle("active", isActive***REMOVED***;
      tool.active = isActive;
      tool.panel.hidden = !isActive;
    ***REMOVED***
  ***REMOVED***
***REMOVED***

globalThis.FontInspector = FontInspector;
globalThis.StepperManager = StepperManager;
globalThis.Stats = Stats;

export { PDFBug ***REMOVED***;
