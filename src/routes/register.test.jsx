import { render, fireEvent } from '@testing-library/react'
import Register from './register';
import localforage from 'localforage';
import { test } from 'vitest';
import { expect, vi } from 'vitest';


const fn = vi.fn();

fn.mock('localforage', () => {
    return {
        setItem: vi.fn(),
    };
})





test('registers email on form submit', async () => {
    const { getByPlaceholderText, getByText } = render(<Register />);
    const emailInput = getByPlaceholderText('Email');
    const registerButton = getByText('Register');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    fireEvent.click(registerButton);

    expect(localforage.setItem).toHaveBeenCalledWith('email', 'test@example.com');

});
