import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import TaskService from '../../services/task/task.service';

interface TaskDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void; 
}

const TaskDialog: React.FC<TaskDialogProps> = ({ open, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<number>(1);
  const [startDate, setStartDate] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (!open) {
      setTitle('');
      setDescription('');
      setStatus(1);
      setStartDate('');
      setDueDate('');
    }
  }, [open]);

  const handleSave = async () => {
    try {
      await TaskService.createTask({ title, description, status, startDate, dueDate });
      onSave(); 
      onClose();
    } catch (error) {
      console.error('Error saving task', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Task</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Title"
          fullWidth
          variant="standard"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Description"
          fullWidth
          variant="standard"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Status"
          type="number"
          fullWidth
          variant="standard"
          value={status}
          onChange={(e) => setStatus(Number(e.target.value))}
        />
        <TextField
          margin="dense"
          label="Start Date"
          type="datetime-local"
          fullWidth
          InputLabelProps={{ shrink: true }}
          variant="standard"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Due Date"
          type="datetime-local"
          fullWidth
          InputLabelProps={{ shrink: true }}
          variant="standard"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskDialog;
