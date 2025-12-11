import { useAppSelector } from '@redux/store';

const useAuthen = () => {
  const isSignedIn = useAppSelector(state => state.auth.isSignedIn);

  return !!isSignedIn;
};
export default useAuthen;
