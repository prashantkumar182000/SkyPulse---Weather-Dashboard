import { renderHook } from '@testing-library/react-hooks';
import useFetchWeather from '../hooks/useFetchWeather';

describe('useFetchWeather Hook', () => {
  it('returns initial loading state', () => {
    const { result } = renderHook(() => useFetchWeather('New York'));
    expect(result.current.isLoading).toBe(true);
  });

  it('fetches and returns weather data', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useFetchWeather('New York'));

    await waitForNextUpdate();

    expect(result.current.weatherData).toBeDefined();
    expect(result.current.isLoading).toBe(false);
  });

  it('handles error state', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useFetchWeather('UnknownCity'));

    await waitForNextUpdate();

    expect(result.current.error).toBeDefined();
  });
});
