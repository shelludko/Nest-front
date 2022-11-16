import axios from 'axios';

export const getRequest = async (url) => {
   const response = await axios.get(url);
    return response.data;
};
