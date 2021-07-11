import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) { }

    @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
        if (Object.keys(filterDto).length) {
            return this.taskService.getTaskWithStatus(filterDto)
        }
        return this.taskService.getAllTasks();
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string) {
        return this.taskService.getTaskById(id)
    }

    ///First method for Body
    // @Post()
    // createTask(@Body() body) {
    //     console.log('body', body)
    // }

    //Second method for Body
    // @Post()
    // createTask(
    //     @Body('title') title: string,
    //     @Body('description') description: string
    // ): Task {
    //     return this.taskService.createTask(title, description)
    // }


    //Third method using DTO (Data Transfer Object)
    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto) {
        return this.taskService.createTask(createTaskDto)
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): void {
        this.taskService.deleteTask(id)
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus) {
        return this.taskService.updateTaskStatus(id, status)
    }
}
