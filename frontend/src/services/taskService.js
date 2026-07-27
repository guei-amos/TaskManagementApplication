import axios from "axios";

const API_URL = "http://localhost:5000/api/tasks";

const getTasks = (token) => {
    return axios.get(API_URL,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    });
};

const createTask = (task,token) => {
    return axios.post(API_URL,task,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    });
};

const updateTask = (id,task,token)=>{
    return axios.put(`${API_URL}/${id}`,task,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    });
};

const deleteTask = (id,token)=>{
    return axios.delete(`${API_URL}/${id}`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    });
};

const taskService = {
    getTasks,
    createTask,
    updateTask,
    deleteTask
};

export default taskService;