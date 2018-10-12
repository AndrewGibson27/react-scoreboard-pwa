import axios from 'axios';

export default function createHttpClient(req) {
  return axios.create({
    withCredentials: true,
    headers: {
      Cookie: req.header('Cookie'),
    },
  });
}
