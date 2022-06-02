import Auth from '@aws-amplify/auth';

const config = {
  region: process.env.REACT_APP_COGNITO_REGION,
  userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
  userPoolWebClientId: process.env.REACT_APP_COGNITO_WEB_CLIENT_ID,
};

Auth.configure(config);
export default Auth;
