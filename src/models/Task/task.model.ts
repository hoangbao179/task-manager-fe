export interface ITask {
    id?: string;
    title?: string;
    description?: string;
    status?: string;
    startDate?: Date;
    dueDate?: Date;
}

export class Task implements ITask {
    id: string;
    title: string;
    description: string;
    status: string;
    startDate: Date;
    dueDate: Date;

    constructor(task: ITask) {
        this.id = task.id || '';
        this.title = task.title || '';
        this.description = task.description || '';
        this.status = task.status || '';
        this.startDate = task.startDate;
        this.dueDate = task.dueDate;
    }
}