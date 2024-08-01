import axios from 'axios';

const BASE_API = `${process.env.NEXT_PUBLIC_API_URL}`;
const URL_API = `${BASE_API}/tasks`;
const getTasks = async () => {
    try {
        const response = await axios.get(URL_API);
        return response.data;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
};

const createTask = async (taskData: {
    title: string;
    description: string;
    status: number;
    startDate: string;
    dueDate: string;
  }) => {
    try {
      await axios.post(URL_API, taskData);
    } catch (error) {
      console.error('Error saving task', error);
      throw error;
    }
  };
const TaskService = {
    getTasks,
    createTask
};

export default TaskService;