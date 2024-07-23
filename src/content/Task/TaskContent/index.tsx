import React, { FC, useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Task } from '../../../models/Task/task.model';
import { useStyles } from './task-content-style';
import TaskService from '../../../services/task/task.service';

interface ITaskList {
    // data: Task[];
}

const TaskContent: FC<ITaskList> = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    // const classes = useStyles();

    useEffect(() => {
        getDataList();
    }, []);

    const getDataList = async () => {
        TaskService.getTasks().then((response) => {
            setTasks(response);
        });
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Start Date</TableCell>
                        <TableCell>Due Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tasks.map((task) => (
                        <TableRow key={task.id}>
                            <TableCell>{task.title}</TableCell>
                            <TableCell>{task.description}</TableCell>
                            <TableCell>{task.status}</TableCell>
                            <TableCell>{new Date(task.startDate).toLocaleDateString()}</TableCell>
                            <TableCell>{new Date(task.dueDate).toLocaleDateString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TaskContent;
