// __mocks__/userService.ts
/**
 * Mock para userService.
 * Permite simular las funciones del servicio en tests.
 */

export const mockResetPassword = jest.fn();
export const mockRequestPasswordReset = jest.fn();

export const userService = {
    resetPassword: mockResetPassword,
    requestPasswordReset: mockRequestPasswordReset,
    updateNameAndEmail: jest.fn(),
    changePassword: jest.fn(),
    deleteAccount: jest.fn(),
};

