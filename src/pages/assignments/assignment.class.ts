export class Assignment {
	Week: number;
	Title: string;
	Content: string;
	Checked: boolean;

	constructor(week: number, title: string, content: string){
		this.Week = week;
		this.Title = title;
		this.Content = content;
	}
}
