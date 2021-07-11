import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { TasksController } from './tasks.controller';
import { v1 as uuidv1 } from 'uuid'
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
@Injectable()
export class TasksService {
    private tasks: Task[] = []

    getTaskWithStatus(filterDto: GetTasksFilterDto) {
        const { status, search } = filterDto;
        let tasks = this.getAllTasks()
        if (status) {
            tasks = tasks.filter(task => task.status === status)
        }
        if (search) {
            tasks = tasks.filter(task =>
                task.title.includes(search) ||
                task.description.includes(search))
        }
        return tasks;
    }

    getAllTasks() {
        return this.tasks;
    }

    getTaskById(id: string) {
        const found = this.tasks.find(task => task.id === id)
        if(!found){
            throw new NotFoundException(`Task with ID "${id}" not found`)
        }
        return found
    }

    createTask(createTaskDto: CreateTaskDto) {
        const { title, description } = createTaskDto;
        const task: Task = {
            id: uuidv1(),
            title,
            description,
            status: TaskStatus.OPEN
        }
        this.tasks.push(task);
        return task
    }

    deleteTask(id: string) {
        const found = this.getTaskById(id)
        this.tasks = this.tasks.filter(task => task.id !== found.id)
    }

    updateTaskStatus(id: string, status: TaskStatus): Task {
        let task = this.getTaskById(id);
        task.status = status;
        return task
    }
}
