/* eslint-disable no-underscore-dangle */
const { mockRequest, mockResponse } = require('jest-mock-req-res');
const controller = require('./product.controller');
const service = require('../../services/product/product.service');

jest.mock('../../services/product/product.service');

describe('Controller', () => {
  const mockData = [
    {
      id: 1,
      name: 'Teszt film cím',
      description: 'Lorem ipsum1',
      price: 6666,
      photo: 'https://www.nincskep.com/nincs.jpg',
      active: true,
    },
    {
      id: 2,
      name: 'Teszt film cím2',
      description: 'Lorem ipsum2',
      price: 5555,
      photo: 'https://www.nincskep.com/nincs2.jpg',
      active: true,
    },
    {
      id: 3,
      name: 'Teszt film cím3',
      description: 'Lorem ipsum3',
      price: 4444,
      photo: 'https://www.nincskep.com/nincs3.jpg',
      active: true,
    },
    {
      id: 4,
      name: 'Teszt film cím4',
      description: 'Lorem ipsum4',
      price: 3333,
      photo: 'https://www.nincskep.com/nincs4.jpg',
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
