import { useAppSelector } from '@redux/selectors';

const useAuthen = () => {
  const isSignedIn = useAppSelector(state => state.auth.isSignedIn);

  return !!isSignedIn;
};
export default useAuthen;
