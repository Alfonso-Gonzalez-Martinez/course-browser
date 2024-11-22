import { render, screen } from '@testing-library/react';
import App from './App';
import { store } from './app/store'
import { Provider } from 'react-redux';



describe('App Component', () => {
  test('renders the app with header, footer, and child components', () => {
    render(
    <Provider store={store}>
        <App />
    </Provider>
);

    expect(screen.getByText('Course Browser')).toBeInTheDocument();
    expect(screen.getByText(/©\s*2024\s*Course Browser App/)).toBeInTheDocument();

    expect(screen.getByRole('button', {name: 'Home icon'})).toBeInTheDocument();
    expect(screen.getByTestId('courses-list')).toBeInTheDocument();
  });
});
