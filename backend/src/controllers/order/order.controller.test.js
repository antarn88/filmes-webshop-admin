/* eslint-disable no-underscore-dangle */
const { mockRequest, mockResponse } = require('jest-mock-req-res');
const controller = require('./order.controller');
const service = require('../../services/order/order.service');

jest.mock('../../services/order/order.service');

describe('Controller', () => {
  const mockData = [
    {
      id: 1,
      products: ['10', '12'],
      note: 'Note1',
      customer: '20',
      bill: '12',
    },
    {
      id: 2,
      products: ['20', '22'],
      note: 'Note2',
      customer: '40',
      bill: '120',
    },
    {
      id: 3,
      products: ['30', '32'],
      note: 'Note3',
      customer: '50',
      bill: '240',
    },
    {
      id: 4,
      products: ['40', '42'],
      note: 'Note4',
      customer: '60',
      bill: '400',
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
