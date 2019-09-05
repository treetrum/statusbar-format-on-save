// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

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

const getEditorConfig = () => {
    return vscode.workspace.getConfiguration("editor", null);
};

const updateStatusBarItem = () => {
    const config = getEditorConfig();
    const enabled = config.get("formatOnSave");
    statusBarItem.text = `Format on save: ${enabled ? "Enabled" : "Disabled"}`;
    if (vscode.window.activeTextEditor) {
        statusBarItem.show();
    } else {
        statusBarItem.hide();
    }
};

const toggleFormatOnSave = () => {
    const config = getEditorConfig();
    const enabled = config.get("formatOnSave");
    config.update("formatOnSave", !enabled, true);
};

module.exports = {
    activate
};
