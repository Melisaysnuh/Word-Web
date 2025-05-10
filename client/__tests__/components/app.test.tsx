import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../../src/components/App';
import { AuthContext } from '../../src/context/auth-context';
import { getDecodedToken, logout } from '../../src/services/auth-service';
import '@testing-library/jest-dom';
import  { act } from 'react';
import { mockUser } from '../mocks/usermock';
import { UserI } from '../../src/types/User';

vi.mock('../../src/services/auth-service', () => ({
  logout: vi.fn(),
  isTokenExpired: vi.fn(() => false),
  getDecodedToken: vi.fn(),
  getStoredUser: vi.fn(),
}));

const mockSetUser = vi.fn();
const mockSetHistory = vi.fn();
const mockUpdateHistory = vi.fn();
const mockLogoutUser = vi.fn();

const renderAppWithAuth = (user: UserI | null = null) =>
  render(
    <AuthContext.Provider
      value={{
        user,
        setUser: mockSetUser,
        history: null,
        setHistory: mockSetHistory,
        updateHistory: mockUpdateHistory,
        logoutUser: mockLogoutUser,
      }}
    >
      <App />
    </AuthContext.Provider>
  );

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders login modal if no user is present', () => {
    renderAppWithAuth();

    expect(screen.getByTestId('logIn')).toBeInTheDocument();
  });

  it('opens login modal on "Log in" button click', () => {
    renderAppWithAuth();

    fireEvent.click(screen.getByText(/Log in/i));
    expect(screen.getByText(/Log in/i)).toBeInTheDocument();
  });

  it('opens register modal on "Register" button click', () => {
    renderAppWithAuth();

    fireEvent.click(screen.getByText(/Register/i));
    expect(screen.getByTestId('register')).toBeInTheDocument();
  });

  it('logs out user on "Log Out" button click', () => {
    renderAppWithAuth(mockUser);

    fireEvent.click(screen.getByTestId('logOut'));

    expect(logout).toHaveBeenCalled();
    expect(mockSetUser).toHaveBeenCalledWith(null);
  });

  it('displays user name when logged in', async () => {
    (getDecodedToken as unknown as ReturnType<typeof vi.fn>).mockReturnValue(mockUser);

    await act(async () => {
      renderAppWithAuth(mockUser);
    });

    expect(screen.getByText(/Hello, Meli/i)).toBeInTheDocument();
  });
});
