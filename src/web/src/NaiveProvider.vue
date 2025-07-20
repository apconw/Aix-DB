***REMOVED***
function registerNaiveTools(***REMOVED*** {
  window.$ModalMessage = useMessage(***REMOVED***
  window.$ModalNotification = useNotification(***REMOVED***
  window.$ModalDialog = useDialog(***REMOVED***
  window.$ModalLoadingBar = useLoadingBar(***REMOVED***
***REMOVED***

const NaiveProviderWrapper = defineComponent({
  name: 'NaiveProviderWrapper',
  setup(***REMOVED*** {
    registerNaiveTools(***REMOVED***
  ***REMOVED***,
  render(***REMOVED*** {
    return h('div'***REMOVED***
  ***REMOVED***,
***REMOVED******REMOVED***
***REMOVED***

***REMOVED***
  <NLoadingBarProvider>
    <NDialogProvider>
      <NNotificationProvider>
        <NMessageProvider>
          <slot></slot>
          <NaiveProviderWrapper />
        </NMessageProvider>
      </NNotificationProvider>
    </NDialogProvider>
  </NLoadingBarProvider>
***REMOVED***
