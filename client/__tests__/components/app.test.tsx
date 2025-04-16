import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../../src/components/App';
import { AuthContext } from '../../src/context/auth-context';
import { logout } from '../../src/services/auth-service';
import { mockUser } from '../mocks/usermock';
import '@testing-library/jest-dom';


vi.mock('../../src/services/auth-service', () => ({
    logout: vi.fn(),
    isTokenExpired: vi.fn(() => false),
}));

const mockSetUser = vi.fn();
const mockSetHistory = vi.fn();

describe('App Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders login modal if no user is present', () => {
        render(
            <AuthContext.Provider value={{ user: null, setUser: mockSetUser, history: null, setHistory: mockSetHistory }}>
            <App />
    </AuthContext.Provider>
    );

    expect(screen.getByTestId('logIn')).toBeInTheDocument();
});

it('opens login modal on Log in button click', () => {
    render(
      <AuthContext.Provider value={{ user: null, setUser: mockSetUser, history: null, setHistory: mockSetHistory }}>
        <App />
</AuthContext.Provider>
);

fireEvent.click(screen.getByText(/Log in/i));
expect(screen.getByText(/Log in/i)).toBeInTheDocument();
  });

it('opens register modal on Register button click', () => {
    render(
      <AuthContext.Provider value={{ user: null, setUser: mockSetUser, history: null, setHistory: mockSetHistory }}>
        <App />
</AuthContext.Provider>
);

fireEvent.click(screen.getByText(/Register/i));
expect(screen.getByTestId('register')).toBeInTheDocument();
  });

it('logs out user on Log Out button click', () => {
       render(
         <AuthContext.Provider value={{ user: mockUser, setUser: mockSetUser, history: null, setHistory: mockSetHistory }}>
        <App />
</AuthContext.Provider>
);

fireEvent.click(screen.getByTestId('logOut'));
expect(logout).toHaveBeenCalled();
expect(mockSetUser).toHaveBeenCalledWith(null);
  });

it('displays user name when logged in', () => {
     render(
       <AuthContext.Provider value={{ user: mockUser, setUser: mockSetUser, history: null, setHistory: mockSetHistory }}>
        <App />
</AuthContext.Provider>
);

expect(screen.getByText(/Hello, Meli/i)).toBeInTheDocument();
  });
});
