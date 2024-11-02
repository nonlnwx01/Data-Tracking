import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';
import { BrowserRouter } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";

// Mock firebase/auth
vi.mock("firebase/auth", () => {
    return {
        getAuth: vi.fn(() => ({})),
        signInWithEmailAndPassword: vi.fn(() =>
            Promise.resolve({ user: { uid: '12345' } })
        ),
    };
});

describe('Login Component', () => {
    it('renders login form', () => {
        render(
            <BrowserRouter>
                <Login setIsLogin={() => { }} />
            </BrowserRouter>
        );
        expect(screen.getByText(/เข้าสู่ระบบ/i)).toBeInTheDocument();
    });

    it('shows error on login failure', async () => {
        vi.mocked(signInWithEmailAndPassword).mockRejectedValue(new Error("Login failed"));

        render(
            <BrowserRouter>
                <Login setIsLogin={() => { }} />
            </BrowserRouter>
        );

        fireEvent.change(screen.getByLabelText(/Email address/i), {
            target: { value: 'test@example.com' },
        });
        fireEvent.change(screen.getByLabelText(/Password/i), {
            target: { value: 'incorrect-password' },
        });
        const loginButton = screen.getByText('เข้าสู่ระบบ').closest('button');
        fireEvent.click(loginButton);

        const alert = await screen.findByText(/Login failed. Please try again./i);
        expect(alert).toBeInTheDocument();
    });
});
