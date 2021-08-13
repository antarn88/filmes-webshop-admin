/* eslint-disable no-underscore-dangle */
const { mockRequest, mockResponse } = require('jest-mock-req-res');
const controller = require('./admin.controller');
const service = require('../../services/admin/admin.service');

jest.mock('../../services/admin/admin.service');

describe('Controller', () => {
  const mockData = [
    {
      id: 1,
      email: 'teszt1@teszt1.com',
      password: '1234',
      active: true,
    },
    {
      id: 2,
      email: 'teszt2@teszt2.com',
      password: '1234',
      active: true,
    },
    {
      id: 3,
      email: 'teszt3@teszt3.com',
      password: '1234',
      active: true,
    },
    {
      id: 4,
      email: 'teszt4@teszt4.com',
      password: '1234',
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
