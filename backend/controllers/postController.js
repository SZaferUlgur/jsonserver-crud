const axios = require("axios");
const asyncHandler = require("express-async-handler");
const baseURL = "http://localhost:5001/posts";

const getAll = asyncHandler(async (req, res) => {
  try {
    const response = await axios.get(baseURL);
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
  }
});

const addData = asyncHandler(async (req, res) => {
  try {
    const data = req.body;
    const response = await axios.post(baseURL, data);
    res.status(201).json(response.data);
  } catch (error) {
    console.log(error);
  }
});

const getById = asyncHandler(async (req, res) => {
  try {
    let id = req.params.id;
    const response = await axios.get(baseURL + `/${id}`);
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
  }
});

const updateById = asyncHandler(async (req, res) => {
  try {
    let id = req.params.id;
    const data = req.body;
    await axios.put(baseURL + `/${id}`, data);
    res.send(`${id} Nolu Post Güncellenmiştir`);
  } catch (error) {
    console.log(error);
  }
});

const delById = asyncHandler(async (req, res) => {
  try {
    let id = req.params.id;
    await axios.delete(baseURL + `/${id}`);
    res.status(202).json(`${id} Nolu Post Silinmiştir`);
  } catch (error) {
    console.log(error);
  }
});

module.exports = {
  getAll,
  addData,
  getById,
  updateById,
  delById,
};
