/* eslint-disable no-underscore-dangle */
const { mockRequest, mockResponse } = require('jest-mock-req-res');
const controller = require('./customer.controller');
const service = require('../../services/customer/customer.service');

jest.mock('../../services/customer/customer.service');

describe('Controller', () => {
  const mockData = [
    {
      id: 1,
      firstName: 'Péter',
      lastName: 'Lakatos',
      email: 'lp@freemail.hu',
      address: 'Kecskemét - Muszaly ut 7.',
      active: true,
    },
    {
      id: 2,
      firstName: 'Zoltán',
      lastName: 'Lakatos',
      email: 'lz@freemail.hu',
      address: 'Kecskemét - Muszaly ut 6.',
      active: true,
    },
    {
      id: 3,
      firstName: 'Anna',
      lastName: 'Lakatos',
      email: 'la@freemail.hu',
      address: 'Kecskemét - Muszaly ut 5.',
      active: true,
    },
    {
      id: 4,
      firstName: 'Mariann',
      lastName: 'Lakatos',
      email: 'lm@freemail.hu',
      address: 'Kecskemét - Muszaly ut 4.',
      active: true,
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
