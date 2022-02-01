import axios from 'axios';

const instance = axios.create({
  baseURL:
    'https://simple-workout-9b4de-default-rtdb.europe-west1.firebasedatabase.app/',
});
export default instance;
