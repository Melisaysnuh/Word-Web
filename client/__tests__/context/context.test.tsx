import { render, screen } from '@testing-library/react';
import React, { act } from 'react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { AuthContext } from '../../src/context/auth-context';
import { AuthProvider } from '../../src/context/auth-provider';
import { getDecodedToken, getToken, refreshUserData, storeAuthData } from '../../src/services/auth-service';
import { mockUser, tokenMock } from '../mocks/usermock';

// Mock `getDecodedToken`
vi.mock('../../src/services/auth-service', () => ({
    getDecodedToken: vi.fn(),
    refreshUserData: vi.fn(),
    storeAuthData: vi.fn(),
    getToken: vi.fn(),
}));



describe('AuthContext', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('initializes user and history from decoded token', async () => {
        (getDecodedToken as unknown as ReturnType<typeof vi.fn>).mockReturnValue(mockUser);
        (refreshUserData as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(mockUser);
        (storeAuthData as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(mockUser);
        (getToken as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(tokenMock);

        const TestComponent = () => {
            const { user, history } = React.useContext(AuthContext);
            return (
                <div>
                    <div data-testid="username">{user?.firstName}</div>
                    <div data-testid="level">{history?.level}</div>
                </div>
            );
        };



            await act(async () => {
                render(
                    <AuthProvider>
                        <TestComponent />
                    </AuthProvider>
                );
            });

        // Test that the values rendered correctly
        expect(screen.getByTestId('username').textContent).toBe('Meli');
        expect(screen.getByTestId('level').textContent).toBe('Daddy Long-Legs');
    });
});
