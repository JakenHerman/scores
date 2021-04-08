import * as vscode from 'vscode';
import * as axios from 'axios';

class Event {
    public competitors: Array<Object> = [];
    public shortName: string = '';
    public competitions: Array<any> = [];
}

export class ScoreProvider implements vscode.TreeDataProvider<Score> {
  onDidChangeTreeData?: vscode.Event<Score|null|undefined>|undefined;

  data: any;
  url: string;

  constructor(url: string) {
    this.url = url;
    this.data = this.getScores().then(res => {
      return res;
    });
  }

  getScores(): Thenable<Score[]> {
      return axios.default.get(this.url)
        .then(res => {
            const data: Array<Score> = [];
            const events = res.data.events;
            events.forEach((x: Event) => {
                const teams = x.shortName.split(' @ ');
                const homeTeam = teams[1];
                const awayTeam = teams[0];

                const homeTeamScore = x.competitions[0].competitors.find((t: any) => t.homeAway === 'home').score;
                const awayTeamScore = x.competitions[0].competitors.find((t: any) => t.homeAway === 'away').score;

                data.push(new Score(`${awayTeam} (${awayTeamScore}) @ ${homeTeam} (${homeTeamScore})`));
            });
            return data;
        })
        .catch(e => {
            console.error(e);
            return [new Score('Error obtaining scores...')];
        });
  }

  getTreeItem(element: Score): vscode.TreeItem|Thenable<vscode.TreeItem> {
    return element;
  }

  getChildren(element?: Score|undefined): vscode.ProviderResult<Score[]> {
    if (element === undefined) {
      return this.data;
    }
    return element.children;
  }
}

class Score extends vscode.TreeItem {
  children: Score[]|undefined;

  constructor(label: string, children?: Score[]) {
    super(
        label,
        children === undefined ? vscode.TreeItemCollapsibleState.None :
                                 vscode.TreeItemCollapsibleState.Expanded);
    this.children = children;
  }
}