# 1.2.0
- Added ability to set multiple states at once, see #6

# 1.1.0
- *breaking change* the former `{state: true|false}` } input format was replaced by `{set: true|false|any}` to support a wider range of tuya devices and attributes, see updated docs.
- *breaking change* introduced the `Request` property that is set to `{"schema": true}` by default, which will output more detailed data of your device
- *breaking change* the output format `{state: true|false}` attribute was replaced by a `data` attribute. The format can be configured through the `Request` property. See node-docs.
