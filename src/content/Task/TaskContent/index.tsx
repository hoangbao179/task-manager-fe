import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface TaskContentProps {
  tasks: any[];
}

const TaskContent: React.FC<TaskContentProps> = ({ tasks }) => {
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
          {tasks ? tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell>{task.status === 1 ? 'Pending' : 'Completed'}</TableCell>
              <TableCell>{task.startDate}</TableCell>
              <TableCell>{task.dueDate}</TableCell>
            </TableRow>
          )): <>
            No task found
          </>}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TaskContent;
