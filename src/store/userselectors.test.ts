import { AuthorizationStatus } from '../const';
import { getAuthStatus } from './userselector';

describe('User selectors', () => {
  const authState = {
    authorizationStatus: AuthorizationStatus.Auth,
    userData: {
      name: 'Oliver Conner',
      avatarUrl: 'https://url-to-image/image.png',
      isPro: false,
      email: 'test@gmail.com',
      token: '',
    },
    userEmail: 'test@gmail.com',
    userDataLoadingStatus: true,
    postError: false,
  };
  it('should return AuthEnum.AUTHENTICATED', () => {
    const expectedRes = AuthorizationStatus.Auth;

    const calculateRes = getAuthStatus({ user: authState });

    expect(calculateRes).toBe(expectedRes);
  });
});
