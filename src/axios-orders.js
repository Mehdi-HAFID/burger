import axios from "axios";

const instance = axios.create({
	baseURL: 'https://burger-m.firebaseio.com/'
});

export default instance;