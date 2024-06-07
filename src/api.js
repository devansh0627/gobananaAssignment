import axios from 'axios';
//Fetching data from a public API
export const fetchPosts = async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return response.data;
};
