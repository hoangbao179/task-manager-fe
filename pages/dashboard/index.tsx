import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import TaskContent from '../../src/content/Task/TaskContent';
import TaskDialog from '../../src/components/Dialog/TaskDialog';
import CalendarContent from '../../src/content/Calendar/CalendarContent';

// const TaskPage: React.FC = () => {
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [tasks, setTasks] = useState<any[]>([]);

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const fetchTasks = async () => {
//     try {
//       // const response = await TaskService.getTasks();
//       // setTasks(response);
//     } catch (error) {
//       console.error('Error fetching tasks', error);
//     }
//   };

//   const handleClickOpen = () => {
//     setDialogOpen(true);
//   };

//   const handleClose = () => {
//     setDialogOpen(false);
//   };

//   const handleSave = () => {
//     fetchTasks(); 
//     handleClose(); 
//   };

//   return (
//     // <div>
//     //   <Button
//     //     variant="contained"
//     //     color="primary"
//     //     onClick={handleClickOpen}
//     //     style={{ marginBottom: '16px' }} 
//     //   >
//     //     Add Task
//     //   </Button>
//     //   <TaskContent tasks={tasks} /> 
//     //   <TaskDialog open={dialogOpen} onClose={handleClose} onSave={handleSave} />

//     // </div>

//     function CalendarScreen(): JSX.Element {
//       return <CalendarContent></CalendarContent>;
//   }
  
//   );
// };
function CalendarScreen(): JSX.Element {
  return <CalendarContent></CalendarContent>;
}
export default(CalendarScreen);
