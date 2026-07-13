```typescript
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import App from './App';

vi.mock('node:fetch', () => ({
  default: vi.fn(() => Promise.resolve({
    json: () => Promise.resolve({ message: 'API response' }),
  })),
}));

describe('App', () => {
  it('renders initially', () => {
    const { getByText } = render(<App />);
    expect(getByText('Analitica')).toBeInTheDocument();
  });

  it('handles user interactions', () => {
    const { getByText, getByRole } = render(<App />);
    const button = getByRole('button');
    fireEvent.click(button);
    expect(getByText('Button clicked')).toBeInTheDocument();
  });

  it('makes API calls', async () => {
    const { getByText } = render(<App />);
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    expect(getByText('API response')).toBeInTheDocument();
  });
});
```