import { logout, useAppDispatch } from '@/store';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import Wrapper from '../../forms/FormWrapper.styled';

export interface IDemoUserModal {
  sampleTextProps?: string;
}

// JWT_SECRET=2eea00d242ae9f5edaf565e3f429f1d3

const DemoUserModal: React.FC<IDemoUserModal> = ({ sampleTextProps }) => {
  const dispatch = useAppDispatch();
  return (
    <Wrapper className="demo_user">
      <h2 className="fs-600 text-dark">Demo user</h2>
      <p className="fs-500 text-dark">
        Demo User not allowed to create, edit or remove data from board. Has
        access to read-only!
      </p>
      <Link
        href="/auth/signin"
        className="fs-500 text-primary"
        onClick={() => {
          dispatch(logout());
          signOut();
        }}
      >
        Click to signup
      </Link>
    </Wrapper>
  );
};

export default DemoUserModal;
