import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';
/* 
    * This is a basic test to make sure the main page renders correctly.
    * The test is not yet implemented, but it will be in the future.
*/
describe('Renders main page correctly', async () => {
    it('Should render the page correctly', async () => {
        render(<App />);
        const h1 = await screen.findByText('My Logo');
        expect(h1).toBeTruthy();
    });
});