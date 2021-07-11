
import { Injectable, NotFoundException, RequestTimeoutException } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { v1 as uuidv1 } from 'uuid'
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
    ) { }

    getTasks(filterDto: GetTasksFilterDto):Promise<Task[]>{
        return this.taskRepository.getTasks(filterDto)
    }
    // getTaskWithStatus(filterDto: GetTasksFilterDto) {
    //     const { status, search } = filterDto;
    //     let tasks = this.getAllTasks()
    //     if (status) {
    //         tasks = tasks.filter(task => task.status === status)
    //     }
    //     if (search) {
    //         tasks = tasks.filter(task =>
    //             task.title.includes(search) ||
    //             task.description.includes(search))
    //     }
    //     return tasks;
    // }

    // getAllTasks() {
    //     return this.tasks;
    // }

    async getTaskById(id: number): Promise<Task> {
        const found = await this.taskRepository.findOne(id)
        if (!found) {
            throw new NotFoundException(`Task with ID "${id}" not found`)
        }
        return found
    }

    async createTask(createTaskDto: CreateTaskDto) {
        return this.taskRepository.createTask(createTaskDto)
    }

    // createTask(createTaskDto: CreateTaskDto) {
    //     const { title, description } = createTaskDto;
    //     const task: Task = {
    //         id: uuidv1(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN
    //     }
    //     this.tasks.push(task);
    //     return task
    // }

    async deleteTask(id: number): Promise<void> {
        const result = await this.taskRepository.delete(id)
        console.log(result);
        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID "${id}" not found`)
        }
    }

    async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id)
        task.status = status;
        await task.save()

        return task;
    }

    // updateTaskStatus(id: string, status: TaskStatus): Task {
    //     let task = this.getTaskById(id);
    //     task.status = status;
    //     return task
    // }
}
