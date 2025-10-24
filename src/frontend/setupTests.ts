// setupTests.ts

import '@testing-library/jest-dom';
import { mockFetch } from '@/__mocks__/fetchMock';
import { mockedArticles } from '@/__mocks__/mockedArticles';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  length: 0,
  key: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

// Mock sessionStorage
Object.defineProperty(window, 'sessionStorage', {
  value: localStorageMock,
  writable: true,
});

// Mock window.location
Object.defineProperty(window, 'location', {
  value: {
    href: 'http://localhost:3000',
    origin: 'http://localhost:3000',
    pathname: '/',
    search: '',
    hash: '',
    assign: jest.fn(),
    replace: jest.fn(),
    reload: jest.fn(),
  },
  writable: true,
});

beforeEach(() => {
    mockFetch(mockedArticles);
    // Clear all mocks before each test
    jest.clearAllMocks();
    
    // Reset localStorage mock to default state
    localStorageMock.getItem.mockReturnValue(null);
    localStorageMock.setItem.mockImplementation((key, value) => {
        localStorageMock.storage = localStorageMock.storage || {};
        localStorageMock.storage[key] = value;
    });
    localStorageMock.removeItem.mockImplementation((key) => {
        localStorageMock.storage = localStorageMock.storage || {};
        delete localStorageMock.storage[key];
    });
    localStorageMock.clear.mockImplementation(() => {
        localStorageMock.storage = {};
    });
    
    // Make getItem return from storage
    localStorageMock.getItem.mockImplementation((key) => {
        return localStorageMock.storage?.[key] || null;
    });
});
