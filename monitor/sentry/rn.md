# React Native

Sentry的 React Native SDK 可以自动报告错误和异常，并确定应用中的性能问题。SDK默认包括性能监控。

特点:

- 原生自动进行 [错误校验](https://docs.sentry.io/product/issues/) (using both `sentry-cocoa` & `sentry-android`)
- Offline storage of events
- Events [enriched](https://docs.sentry.io/platforms/react-native/enriching-events/context/) with device data
- [Autolinking](https://reactnative.dev/blog/2019/07/03/version-60#native-modules-are-now-autolinked)
- [Breadcrumbs](https://docs.sentry.io/platforms/react-native/enriching-events/breadcrumbs/) created for outgoing `http` request with XHR and Fetch; UI and system events; and console logs
- [Release Health](https://docs.sentry.io/product/releases/health/) tracks crash free users and sessions
- [Performance Monitoring](https://docs.sentry.io/product/performance/) creates transactions automatically for React Navigation v4 and above; creates spans automatically for XHR and Fetch
- Under the hood the SDK relies on our [JavaScript SDK](https://docs.sentry.io/platforms/javascript/), which makes all functions available for JavaScript also available in this SDK
- On Device symbolication for JavaScript (in Debug)
- [RAM bundle support](https://docs.sentry.io/platforms/react-native/manual-setup/ram-bundles/)
- [Hermes support](https://docs.sentry.io/platforms/react-native/manual-setup/hermes/)
- [Expo support](https://docs.expo.io/guides/using-sentry/)

