import { useLocation } from 'react-router-dom';

export function useScreenInit() {
  try {
    const location = useLocation();
    return location.state || {};
  } catch (e) {
    return {};
  }
}
