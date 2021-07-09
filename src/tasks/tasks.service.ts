import { Injectable } from '@nestjs/common';
import { Task, taskStatus } from './task.model';
import { TasksController } from './tasks.controller';
import { v1 as uuidv1 } from 'uuid'
@Injectable()
export class TasksService {
    private tasks: Task[] = []

    getAllTasks() {
        return this.tasks;
    }

    createTask(title: string, description: string) {
        const task: Task = {
            id: uuidv1(),
            title,
            description,
            status: taskStatus.OPEN
        }
        this.tasks.push(task);
        return task
    }
}
