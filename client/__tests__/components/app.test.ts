import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../../src/components/App';
import { AuthContext } from '../../src/context/UserContext';
import { logout, isTokenExpired } from '../../src/services/auth-service';

vi.mock('../services/auth-service', () => ({
    logout: vi.fn(),
    isTokenExpired: vi.fn(() => false),
}));

const mockSetUser = vi.fn();

describe('App Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders login modal if no user is present', () => {
        render(
            <AuthContext.Provider value={{ user: null, setUser: mockSetUser }}>
            <App />
    </AuthContext.Provider>
    );

    expect(screen.getByText(/Log in/i)).toBeInTheDocument();
});

it('opens login modal on Log in button click', () => {
    render(
        <AuthContext.Provider value={{ user: null, setUser: mockSetUser }}>
        <App />
</AuthContext.Provider>
);

fireEvent.click(screen.getByText(/Log in/i));
expect(screen.getByText(/Log in/i)).toBeInTheDocument();
  });

it('opens register modal on Register button click', () => {
    render(
        <AuthContext.Provider value={{ user: null, setUser: mockSetUser }}>
        <App />
</AuthContext.Provider>
);

fireEvent.click(screen.getByText(/Register/i));
expect(screen.getByText(/Register/i)).toBeInTheDocument();
  });

it('logs out user on Log Out button click', () => {
    const mockUser = { firstName: 'John' };
    render(
        <AuthContext.Provider value={{ user: mockUser, setUser: mockSetUser }}>
        <App />
</AuthContext.Provider>
);

fireEvent.click(screen.getByText(/Log Out/i));
expect(logout).toHaveBeenCalled();
expect(mockSetUser).toHaveBeenCalledWith(null);
  });

it('displays user name when logged in', () => {
    const mockUser = { firstName: 'John' };
    render(
        <AuthContext.Provider value={{ user: mockUser, setUser: mockSetUser }}>
        <App />
</AuthContext.Provider>
);

expect(screen.getByText(/Hello, John/i)).toBeInTheDocument();
  });
});
