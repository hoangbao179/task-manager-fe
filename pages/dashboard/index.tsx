import React from 'react';
import TaskContent from '../../src/content/Task/TaskContent';

const TaskPage: React.FC = () => {
    return (
        <div>
            <h1>Task Manager</h1>
            <TaskContent />
        </div>
    );
};

export default TaskPage;
