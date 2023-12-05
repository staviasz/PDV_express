const successResponse200 = (res, returnData) => {
  return res.status(200).send(returnData);
};
const successResponse201 = (res, returnData) => {
  return res.status(201).send(returnData);
};
const successResponse204 = (res, returnData) => {
  return res.status(204).send(returnData);
};

module.exports = { successResponse200, successResponse201, successResponse204 };
