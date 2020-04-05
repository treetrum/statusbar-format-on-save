# Status Bar - Format on Save

This extension displays the current state of the `editor.formatOnSave` setting in your status bar. Clicking the item in the status bar will toggle the setting on/off.

## Features

-   Shows the current status of the `editor.formatOnSave` status in the status bar
-   Allows you to quickly toggle this setting on/off by clicking the item in the status bar
-   Exposes the command `statusbar-format-on-save.toggleFormatOnSave` for easy keybinding or command pallate usage
-   Allows customisation of the display in the status bar (with a custom format string)

![screenshot](https://i.imgur.com/PbMSJ2q.png)

## Examples

### Format String Customisation

Using the following settings will result in the status bar display showing as `FoS: 👍` or `FoS: 👎`

```json
{
    "statusbar-format-on-save.formatString": "FoS: {{status}}",
    "statusbar-format-on-save.displayWhenTrue": "👍",
    "statusbar-format-on-save.displayWhenFalse": "👎"
}
```

## Issues

If you find an issue with this extension or would like to request new functionality, please let me know [here on GitHub](https://github.com/treetrum/statusbar-format-on-save).

## Release Notes

### 1.1.1

Nothing really...

### 1.1.0

Allow for customisation of the display in the status bar (with a custom format string)

### 1.0.0

Initial release of statusbar-setting-display
