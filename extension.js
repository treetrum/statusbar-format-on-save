const vscode = require("vscode");

let statusBarItem;

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    // Create a command that will flip the formatOnSave setting
    const commandId = "statusbar-format-on-save.toggleFormatOnSave";
    context.subscriptions.push(
        vscode.commands.registerCommand(commandId, toggleFormatOnSave)
    );

    // Create the status bar item
    statusBarItem = vscode.window.createStatusBarItem(
        vscode.StatusBarAlignment.Right,
        1000
    );
    context.subscriptions.push(statusBarItem);
    statusBarItem.command = commandId;

    // Subscribe to configuration and active editor changes
    context.subscriptions.push(
        vscode.workspace.onDidChangeConfiguration(updateStatusBarItem),
        vscode.window.onDidChangeActiveTextEditor(updateStatusBarItem)
    );

    // Update the status bar once, now
    updateStatusBarItem();
}
exports.activate = activate;

/**
 * Constants to use when accessing the plugin configuration object
 */
const settings = {
    formatString: "formatString",
    displayWhenTrue: "displayWhenTrue",
    displayWhenFalse: "displayWhenFalse",
    statusTokenVar: "{{status}}"
};

/**
 * Gets the configuration object for the editor settings
 */
const getEditorConfig = () => {
    return vscode.workspace.getConfiguration("editor", null);
};

/**
 * Gets the configuration object for this plugin
 */
const getPluginConfig = () => {
    return vscode.workspace.getConfiguration("statusbar-format-on-save", null);
};

/**
 * Get's either the displayWhenTrue or displayWhenFalse value
 */
const getValueDisplay = () => {
    const config = getEditorConfig();
    const enabled = config.get("formatOnSave");
    return getPluginConfig().get(
        enabled ? settings.displayWhenTrue : settings.displayWhenFalse
    );
};

/**
 * Gets the format string from user preferences and merges in the valueDisplay values.
 * The return value from this function can directly be put into the status bar
 */
const getMergedFormatString = () => {
    return getPluginConfig()
        .get(settings.formatString)
        .replace(settings.statusTokenVar, getValueDisplay);
};

/**
 * Main worker function that does the job of updating the status bar item
 */
const updateStatusBarItem = () => {
    statusBarItem.text = getMergedFormatString();
    if (vscode.window.activeTextEditor) {
        statusBarItem.show();
    } else {
        statusBarItem.hide();
    }
};

/**
 * Toggles the current status of the formatOnSave value
 */
const toggleFormatOnSave = () => {
    const config = getEditorConfig();
    const enabled = config.get("formatOnSave");
    config.update("formatOnSave", !enabled, true);
};

module.exports = {
    activate
};
