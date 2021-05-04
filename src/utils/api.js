import axios from "axios";

export const get = async (path) => {
  return axios.get(path);
};

export const update = async (path, body) => {
  return axios.put(path, body);
};

export const create = async (path, body) => {
  return axios.post(path, body);
};
