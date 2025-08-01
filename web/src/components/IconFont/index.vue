<script lang="ts">
export default defineComponent({
  name: 'IconFont',
  props: {
    icon: {
      type: String,
      default: '',
    ***REMOVED***,
    shadow: {
      type: Boolean,
      default: false,
    ***REMOVED***,
    verticalCenter: {
      type: Boolean,
      default: false,
    ***REMOVED***,
    cursor: {
      type: Boolean,
      default: false,
    ***REMOVED***,
    disabled: {
      type: Boolean,
      default: false,
    ***REMOVED***,
  ***REMOVED***,
  emits: ['click'],
  setup(props, { emit ***REMOVED******REMOVED*** {
    const getClassName = computed((***REMOVED*** => {
      const className: string[] = []
      if (props.verticalCenter***REMOVED*** {
        className.push('middle'***REMOVED***
      ***REMOVED***
      if (props.cursor***REMOVED*** {
        className.push('cursor'***REMOVED***
      ***REMOVED***
      if (props.disabled***REMOVED*** {
        className.push('disabled'***REMOVED***
      ***REMOVED***
      return className
    ***REMOVED******REMOVED***

    const handleClick = (***REMOVED*** => {
      !props.disabled && emit('click'***REMOVED***
    ***REMOVED***

    const getAttrs = (***REMOVED*** => {
      const attrs: any = {***REMOVED***
      props.shadow
      && (attrs.filter = 'url(#drop-shadow***REMOVED***'***REMOVED***
      return attrs
    ***REMOVED***
***REMOVED***
      getClassName,

      handleClick,
      getAttrs,
    ***REMOVED***
  ***REMOVED***,
***REMOVED******REMOVED***
***REMOVED***

***REMOVED***
  <svg
    class="icon-font"
    aria-hidden="true"
    :class="getClassName"
    @click="handleClick(***REMOVED***"
  >
    <filter
      id="drop-shadow"
      xmlns="http://www.w3.org/2000/svg"
    >
      <feGaussianBlur
        in="SourceAlpha"
        stdDeviation="2"
      />
      <feOffset
        dx="1"
        dy="1"
        result="offsetblur"
      />
      <feComponentTransfer>
        <feFuncA
          type="linear"
          slope="0.2"
        />
      </feComponentTransfer>
      <feMerge>
        <feMergeNode />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <g
      v-bind="getAttrs(***REMOVED***"
    >
      <use :xlink:href="`#${icon***REMOVED***`" />
    </g>
  </svg>
***REMOVED***

<style lang="scss" scoped>
.icon-font {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentcolor;
  overflow: hidden;

  &.middle {
    vertical-align: middle;
  ***REMOVED***

  &.cursor {
  ***REMOVED***
  ***REMOVED***

  &.disabled {
    color: #c0c4cc;
  ***REMOVED***
  ***REMOVED***
***REMOVED***
***REMOVED***
