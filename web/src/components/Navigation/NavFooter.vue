<script lang="ts" setup>
withDefaults(
  defineProps<{
    showBorder?: boolean
  ***REMOVED***>(***REMOVED***,
***REMOVED***
    showBorder: false,
  ***REMOVED***,
***REMOVED***

const link = ref('https://github.com/pdsuwwz'***REMOVED***
***REMOVED***

***REMOVED***
  <!-- <footer
    class="footer"
    :class="{
      'b-t b-t-solid b-t-#dcdfe6 dark:b-t-#444': showBorder
    ***REMOVED***"
  >
    <div
      class="container"
    >
      <p
        class="text"
      >
        <NavigationNavOctocat />
        MIT Licensed | Copyright © 2020-PRESENT <a
          target="_blank"
          :href="link"
          class="github-link c-#555 dark:c-#fff b-b b-b-solid b-b-#3c3c43:12 dark:b-b-#666:12"
        >
          Wisdom
        </a>
      </p>
***REMOVED***
  </footer> -->
***REMOVED***

<style lang="scss" scoped>
.footer {
***REMOVED***
***REMOVED***

  --at-apply: select-none;
  --at-apply: flex justify-center;
  --at-apply: 'bg-#fefbff';

  .container {
    padding: 14px 0;

    .text {
    ***REMOVED***
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      margin: 0;
      text-align: center;
      line-height: 1;
      font-size: 1em;
      color: #929292;
    ***REMOVED***
  ***REMOVED***
***REMOVED***

.github-link {
  transition: border 0.3s ease-in-out;
  margin-left: 6px;

  &:hover {
    border-color: #7d7d7d;
  ***REMOVED***
***REMOVED***
***REMOVED***
