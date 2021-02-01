import axios from "axios";
const baseUrl = "http://localhost:3002/contacts";

const headers = {
  "Access-Control-Allow-Origin": "*",
  Accept: "application/json;odata.metadata=full",
  "Content-Type": "application/json",
};

const getAllContacts = () => {
  const request = axios.get(baseUrl, { headers: headers });
  return request.then((response) => response.data);
};

const createContact = (newContact) => {
  const request = axios.post(baseUrl, newContact, { headers: headers });
  return request.then((response) => response.data);
};

const updateContact = (id, newContact) => {
  const request = axios.put(`${baseUrl}/${id}`, newContact, {
    headers: headers,
  });
  return request.then((response) => response.data);
};

const deleteContact = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`, { headers: headers });
  return request.then((response) => response.data);
};

const contactServcices = {
  getAllContacts,
  createContact,
  updateContact,
  deleteContact,
};

export default contactServcices;
