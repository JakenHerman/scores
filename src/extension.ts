import * as vscode from 'vscode';
import { ScoreProvider } from './ScoreProvider';
import { mlb, nhl, nba, nfl, wnba } from './links';

export function activate(context: vscode.ExtensionContext) {
	const leagues = [
		{ url: mlb, view: 'mlb' },
		{ url: nhl, view: 'nhl' },
		{ url: nba, view: 'nba' },
		{ url: nfl, view: 'nfl' },
		{ url: wnba, view: 'wnba' },
	];

	leagues.forEach(x => {
		const provider = new ScoreProvider(x.url);
		vscode.window.registerTreeDataProvider(x.view, provider);
	});
}

export function deactivate() {}
