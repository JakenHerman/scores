import * as vscode from 'vscode';
import * as axios from 'axios';

export class ScoreProvider implements vscode.TreeDataProvider<Score> {
    private scoreboard: string;
    constructor(scoreboard: string) { 
        this.scoreboard = scoreboard;
    }

    getTreeItem(score: Score): vscode.TreeItem {
        return score;
    }

    getChildren(score?: Score): any {
        if (false) {
            // todo: this will be for errors later.
            vscode.window.showInformationMessage('No scores found...');
            return Promise.resolve([]);
        }

        return [
            new Score('test', vscode.TreeItemCollapsibleState.Expanded)
        ];

        return axios.default.get(this.scoreboard)
            .then(res => {
                return [new Score(res.data, vscode.TreeItemCollapsibleState.Expanded)];
            })
            .catch(e => {
                return [new Score('Error', vscode.TreeItemCollapsibleState.Collapsed)];
            })
    }

    private _onDidChangeTreeData: vscode.EventEmitter<Score | undefined | null | void> = new vscode.EventEmitter<Score | undefined | null | void>();
    readonly onDidChangeTreeData: vscode.Event<Score | undefined | null | void> = this._onDidChangeTreeData.event;

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }
}

class Score extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState
    ) {
        super(label, collapsibleState);
        this.tooltip = 'test';
        this.description = 'desc';
    }
    
    iconPath = {
        light: '',
        dark: ''
    };
}