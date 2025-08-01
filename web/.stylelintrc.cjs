module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-scss',
    'stylelint-config-recommended-vue',
    'stylelint-config-recommended-vue/scss',
  ],
  plugins: ['@stylistic/stylelint-plugin'],
  ignoreFiles: ['**/*.js', '**/*.ts'],
  defaultSeverity: 'error',
  rules: {
    'unit-disallowed-list': [
      'rem',
      'pt',
***REMOVED***,
    '@stylistic/indentation': [
      2,
    ***REMOVED***
        baseIndentLevel: 0,
      ***REMOVED***,
***REMOVED***,
    'no-empty-source': null,
    'block-no-empty': null,
    'declaration-block-no-duplicate-custom-properties': null,
    'font-family-no-missing-generic-family-keyword': null,

    'selector-class-pattern': '^[a-z]([a-z0-9-]+***REMOVED***?(__([a-z0-9]+-?***REMOVED***+***REMOVED***?(__([a-z0-9]+-?***REMOVED***+***REMOVED***?(--([a-z0-9]+-?***REMOVED***+***REMOVED***{0,2***REMOVED***$|^Mui.*$|^([a-z][a-z0-9]****REMOVED***(_[a-z0-9]+***REMOVED****$',

    'scss/at-mixin-pattern': '^[a-z]([a-z0-9-]+***REMOVED***?(__([a-z0-9]+-?***REMOVED***+***REMOVED***?(__([a-z0-9]+-?***REMOVED***+***REMOVED***?(--([a-z0-9]+-?***REMOVED***+***REMOVED***{0,2***REMOVED***$|^Mui.*$|^([a-z][a-z0-9]****REMOVED***(_[a-z0-9]+***REMOVED****$',
    'scss/double-slash-comment-whitespace-inside': 'always',
    'scss/dollar-variable-pattern': null,

    'selector-pseudo-class-no-unknown': [
      true,
    ***REMOVED***
        ignorePseudoClasses: [
          'export',
          'deep',
    ***REMOVED***,
      ***REMOVED***,
***REMOVED***,
    'color-function-notation': ['modern', {
      ignore: ['with-var-inside'],
    ***REMOVED***],
    'property-no-unknown': null,
    'at-rule-empty-line-before': [
      'always',
    ***REMOVED***
        except: ['first-nested', 'blockless-after-same-name-blockless'],
      ***REMOVED***,
***REMOVED***,
    'custom-property-empty-line-before': [
      'always',
    ***REMOVED***
        except: ['after-custom-property', 'first-nested'],
      ***REMOVED***,
***REMOVED***,
    'declaration-empty-line-before': [
      'always',
    ***REMOVED***
        except: ['after-declaration', 'first-nested'],
      ***REMOVED***,
***REMOVED***,
    'rule-empty-line-before': ['always-multi-line'],

    // 忽视 -webkit-xxxx 等兼容写法
    'property-no-vendor-prefix': [
      true,
    ***REMOVED***
        ignoreProperties: ['box-shadow'],
      ***REMOVED***,
***REMOVED***,
  ***REMOVED***,
***REMOVED***
