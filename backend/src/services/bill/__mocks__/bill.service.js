/* eslint-disable no-return-assign */
/* eslint-disable no-underscore-dangle */
const service = jest.mock('./bill.service');

let mockData;

service.findOne = jest.fn((id) => Promise.resolve(
  mockData.find((data) => data.id === id),
));

service.__setMockData = (data) => mockData = data;

module.exports = service;
