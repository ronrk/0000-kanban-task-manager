import LoadingSpinner from '@/components/ui/loadingSpinner/LoadingSpinner';
import PrimaryButton from '@/components/ui/primaryButton/PrimaryButton.styled';
import PrimaryInput from '@/components/ui/primaryInput/PrimaryInput.styled';
import { CustomError } from '@/database';
import { selectStatus, useRegisterMutation } from '@/store';
import { StatusType } from '@/types';
import { signIn, useSession } from 'next-auth/react';
import Router from 'next/router';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import Wrapper from './SignIn.styled';

export interface ISignIn {}

const SignIn: React.FC<ISignIn> = () => {
  const [error, setError] = useState({ status: false, message: '' });
  const [loadingState, setLoadingState] = useState(false);
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [isAlreadyUser, setIsAlreadyUser] = useState(false);
  const [registerUser] = useRegisterMutation();
  const { status } = useSession();
  const authStatus = useSelector(selectStatus);
  let isLoading = authStatus === StatusType.PENDING || loadingState;
  let pageState = isLoading
    ? 'Loading...'
    : isAlreadyUser
    ? 'Welcome back, enter your credentials'
    : 'Welcome, please sign up';

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError({ status: false, message: '' });
  };

  const loginUser = async () => {
    const { username, password } = values;
    try {
      const res = await signIn('credentials', {
        username,
        password,
        redirect: false,
      });
      if (!res?.ok) {
        setError({ status: true, message: res?.error || '' });
        setLoadingState(false);
      }
      if (res?.status === 200) {
        Router.push('/');
      }
    } catch (error: any) {
      let errorMessage = 'Something went wrong with your signup';
      if (error.status === 400) {
        errorMessage =
          'The username or email address you choose already been registered';
        console.log('WRONG CREDENTIALS');
      }

      setError({ status: true, message: errorMessage });
      setLoadingState(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoadingState(true);
    const { username, email, password } = values;
    if (username === '' || password === '') {
      throw new CustomError.BadRequestError('No credentials found');
    }

    if (!isAlreadyUser) {
      if (email === '') {
        throw new CustomError.BadRequestError('No Email provided');
      }

      await registerUser(values)
        .unwrap()
        .then(async () => {
          loginUser();
        })
        .catch((error) => {
          let errorMessage = 'Something went wrong with your signup';
          if (error.status === 400) {
            errorMessage =
              'The username or email address you choose already been registered';
            console.log('WRONG CREDENTIALS');
          }

          setError({ status: true, message: errorMessage });
          setLoadingState(false);
        });

      return;
    }
    await loginUser();
  };

  const switchContent = isAlreadyUser ? (
    <p className="text-light fs-500">
      New User?
      <button onClick={() => setIsAlreadyUser((prev) => !prev)}>
        Click to <span>Signup</span>
      </button>
    </p>
  ) : (
    <p className="text-light fs-500">
      Already a user? <br />
      <button onClick={() => setIsAlreadyUser((prev) => !prev)}>
        Click to <span>Login</span>
      </button>
    </p>
  );

  return (
    <Wrapper className="flex-col">
      <h2 className="fs-700  text-primary-light">{pageState}</h2>
      {isLoading ? (
        <LoadingSpinner color="primary" />
      ) : (
        <form onSubmit={handleSubmit} className="flex-col ">
          {status === 'loading' || isLoading ? (
            <div className="loading flex-col">
              <h2 className="fs-700  text-primary-light">{pageState}</h2>
              <LoadingSpinner color="primary" />
            </div>
          ) : (
            <>
              <div className="form-control">
                <label
                  htmlFor="username"
                  className="fs-600 text-light uppercase"
                >
                  Username:
                </label>
                <PrimaryInput
                  fullWidth
                  type="text"
                  placeholder="Username"
                  className="text-dark fs-500"
                  id="username"
                  required
                  name="username"
                  onChange={handleChange}
                  value={values.username}
                  color="primary"
                />
              </div>

              {!isAlreadyUser && (
                <div className="form-control">
                  <label
                    htmlFor="email"
                    className="fs-600 text-light uppercase"
                  >
                    Email:
                  </label>
                  <PrimaryInput
                    fullWidth
                    type="email"
                    placeholder="Email"
                    className="text-dark fs-500"
                    name="email"
                    id="email"
                    required
                    onChange={handleChange}
                    value={values.email}
                  />
                </div>
              )}
              <div className="form-control">
                <label
                  htmlFor="password"
                  className="fs-600 text-light uppercase"
                >
                  Password:
                </label>
                <PrimaryInput
                  fullWidth
                  type="password"
                  placeholder="Password"
                  className="text-dark fs-500"
                  id="password"
                  name="password"
                  required
                  onChange={handleChange}
                  value={values.password}
                />
              </div>
              {error.status && (
                <p className="error--message text-red fs-400">
                  {error.message}
                </p>
              )}
              <div className="btns__container flex-col align-center justify-center">
                <PrimaryButton
                  color="primary"
                  type="submit"
                  className="submit--btn"
                  textLabel={isAlreadyUser ? 'Login' : 'Signup'}
                />

                <div className="switchType">
                  {isLoading ? null : switchContent}
                </div>
              </div>
            </>
          )}
        </form>
      )}
    </Wrapper>
  );
};

export default SignIn;
