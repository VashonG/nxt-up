import type { ComponentType, ReactElement } from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { checkFields } from '@entities/user/';
import { useAppDispatch, useAppSelector } from '@shared/lib/hooks';
import { checkUserFields } from '../helpers';

export const WithCheckedFields = <P extends object>(
  Component: ComponentType<P>
) => {
  const Wrapper = (props: P): ReactElement<P> => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const dispatch = useAppDispatch();

    const isAuth = useAppSelector((state) => state.auth.isAuth);
    const currentUser = useAppSelector((state) => state.user.currentUser);
    const errorFields = useAppSelector((state) => state.user.errorFields);

    useEffect(() => {
      if (isAuth && currentUser) {
        dispatch(checkFields(checkUserFields(currentUser)));

        const isError = getIsError(pathname, errorFields.length);
        if (isError) {
          return navigate('/profile');
        }
      }
    }, [isAuth, navigate, currentUser, dispatch, errorFields.length, pathname]);

    useEffect(() => {
      if (errorFields.length) {
        toast('You have some empty fields, they are selected with red color', {
          toastId: 'toast-checked-fields',
        });
      }
    }, [errorFields.length]);

    return <Component {...props} />;
  };

  return Wrapper;
};

function getIsError(pathname: string, errorFieldsLength: number): boolean {
  const isError = errorFieldsLength && isWrongPage(pathname);

  return Boolean(isError);
}

function isWrongPage(pathname: string): boolean {
  return !(isProfilePage(pathname) || isProfileEditPage(pathname));
}

function isProfilePage(pathname: string): boolean {
  return /^\/(profile|settings)(\/([a-z]+)-?([a-z]*))?$/.test(pathname);
}

function isProfileEditPage(pathname: string): boolean {
  return /^\/profile\/edit(\/([a-z]+)-?([a-z]*))?$/.test(pathname);
}
