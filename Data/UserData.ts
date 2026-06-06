import 'dotenv/config';

export const CheckoutData = {
  valid: {
    firstName: 'Aloka',
    lastName: 'Aryayudha',
    postalCode: '12345',
  },
  invalid: {
    firstName: '',
    lastName: '',
    postalCode: '',
  },
};

export const UserData = {
  validUser: {
    username: process.env.STANDARD_USER || 'standard_user',
    password: process.env.PASSWORD || 'secret_sauce',
  },
  lockedUser: {
    username: process.env.LOCKED_USER || 'locked_out_user',
    password: process.env.PASSWORD || 'secret_sauce',
  },
  problemUser: {
    username: process.env.PROBLEM_USER || 'problem_user',
    password: process.env.PASSWORD || 'secret_sauce',
  },
  performanceUser: {
    username: process.env.PERFORMANCE_USER || 'performance_glitch_user',
    password: process.env.PASSWORD || 'secret_sauce',
  },
  errorUser: {
    username: process.env.ERROR_USER || 'error_user',
    password: process.env.PASSWORD || 'secret_sauce',
  },
  visualUser: {
    username: process.env.VISUAL_USER || 'visual_user',
    password: process.env.PASSWORD || 'secret_sauce',
  },
  invalidUser: {
    username: process.env.INVALID_USER || 'invalid_user',
    password: process.env.PASSWORD || 'secret_sauce',
  },
};