import { render, screen } from '@testing-library/react'
import Hello from './hello'
import { test } from 'vitest'

test('renders message', () => {
    render(<Hello message="Hello, World!" />)
    expect(screen.getByText('Hello, World!')).toBeInTheDocument()
})