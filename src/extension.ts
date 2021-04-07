// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { ScoreProvider } from './ScoreProvider';
import { mlb } from './links';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "scores" is now active!');

	const defaultScores = [
		{
			scoreboard: mlb,
			view: 'mlb',
			refreshCmd: 'mlb.refreshScores'
		}
	];

	defaultScores.forEach(x => {
		const scoreProvider = new ScoreProvider(x.scoreboard);
		vscode.window.registerTreeDataProvider(x.view, scoreProvider);
		vscode.commands.registerCommand(x.refreshCmd, () => scoreProvider.refresh());
	})

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('scores.getScores', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Getting scores...');
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
