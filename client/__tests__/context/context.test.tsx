import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { AuthContext } from '../../src/context/auth-context';
import { AuthProvider } from '../../src/context/auth-provider';
import { getDecodedToken } from '../../src/services/auth-service';
import { mockUser } from '../mocks/usermock';

// Mock `getDecodedToken`
vi.mock('../../src/services/auth-service', () => ({
    getDecodedToken: vi.fn(),
}));



describe('AuthContext', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('initializes user and history from decoded token', () => {
        (getDecodedToken as unknown as ReturnType<typeof vi.fn>).mockReturnValue(mockUser);

        render(
            <AuthProvider>
                <AuthContext.Consumer>
                    {(value) => (
                        <div>
                            <div data-testid="username">{value.user?.firstName}</div>
                            <div data-testid="level">{value.history?.level}</div>
                        </div>
                    )}
                </AuthContext.Consumer>
            </AuthProvider>
        );

        // Test that the values rendered correctly
        expect(screen.getByTestId('username').textContent).toBe('Meli');
        expect(screen.getByTestId('level').textContent).toBe('Daddy Long-Legs');
    });
});
