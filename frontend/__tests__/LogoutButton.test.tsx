import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import LogoutButton from '../src/components/LogoutButton';
import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('LogoutButton', () => {
  beforeEach(() => {
    localStorage.clear();
    mockNavigate.mockClear();
  });

  it('renders correctly with default text', () => {
    render(
      <MemoryRouter>
        <LogoutButton />
      </MemoryRouter>
    );
    expect(screen.getByText('Cerrar perfil')).toBeInTheDocument();
  });

  it('clears localStorage and navigates on click', () => {
    localStorage.setItem('token', 'test-token');
    localStorage.setItem('usuario', JSON.stringify({ rol: 'admin' }));

    render(
      <MemoryRouter>
        <LogoutButton />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Cerrar perfil'));

    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('usuario')).toBeNull();
    expect(mockNavigate).toHaveBeenCalledWith('/login/admin');
  });
});
