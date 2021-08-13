/* eslint-disable no-underscore-dangle */
const { mockRequest, mockResponse } = require('jest-mock-req-res');
const controller = require('./delivery.controller');
const service = require('../../services/delivery/delivery.service');

jest.mock('../../services/delivery/delivery.service');

describe('Controller', () => {
  const mockData = [
    {
      id: 1,
      products: ['3', '4'],
      customer: '3',
      order: '4',
      note: 'Note1',
    },
    {
      id: 2,
      products: ['5', '6'],
      customer: '4',
      order: '40',
      note: 'Note2',
    },
    {
      id: 3,
      products: ['7', '8'],
      customer: '5',
      order: '50',
      note: 'Note3',
    },
    {
      id: 4,
      products: ['9', '10'],
      customer: '6',
      order: '49',
      note: 'Note4',
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
