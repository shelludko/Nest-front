import axios from 'axios';

const getRequest = (url, func) => {
    axios.get(url).then((response) => {
        func(response.data);
    });
    return;
};

export default getRequest;