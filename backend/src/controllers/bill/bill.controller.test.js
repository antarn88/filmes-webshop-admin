/* eslint-disable no-underscore-dangle */
const { mockRequest, mockResponse } = require('jest-mock-req-res');
const controller = require('./bill.controller');
const service = require('../../services/bill/bill.service');

jest.mock('../../services/bill/bill.service');

describe('Controller', () => {
  const mockData = [
    {
      id: 1,
      products: ['1'],
      customer: '1',
      sum: 1000,
      paid: true,
    },
    {
      id: 2,
      products: ['2'],
      customer: '2',
      sum: 2000,
      paid: true,
    },
    {
      id: 3,
      products: ['3'],
      customer: '3',
      sum: 3000,
      paid: true,
    },
    {
      id: 4,
      products: ['4'],
      customer: '4',
      sum: 4000,
      paid: true,
    },
  ];

  let response;
  const nextFunction = jest.fn();

  beforeEach(() => {
    service.__setMockData(mockData);
    response = mockResponse();
  });

  test('Find one item', async () => {
    const EXPECTED_ID = 1;

    const request = mockRequest({
      params: {
        id: EXPECTED_ID,
      },
    });

    await controller.findOne(request, response, nextFunction);
    expect(service.findOne).toBeCalledWith(EXPECTED_ID);
    expect(response.json).toBeCalledWith(mockData.find((data) => data.id === EXPECTED_ID));
  });
});
