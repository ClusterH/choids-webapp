import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { hideAlert } from '../../features/alertSlice';
import { RootState } from '../../app/store';
import closeIcon from '../../assets/close.svg';
import {
  AlertIcon,
  AlertContent,
  AlertMessage,
  AlertWrapper,
} from './Alert.module';

const Alert = () => {
  const dispatch = useAppDispatch();
  const alert = useAppSelector((state: RootState) => state.alert);

  useEffect(() => {
    // setTimeout(() => {
    //   dispatch(hide());
    // }, 5000);
  }, [dispatch, alert]);

  return alert.show ? (
    <AlertWrapper variant={alert.type || 'primary'}>
      <AlertContent>
        <AlertMessage>{alert.message || ''}</AlertMessage>
      </AlertContent>
      <AlertIcon
        icon={closeIcon}
        color="#FFFFFF"
        size="24px"
        onClick={() => dispatch(hideAlert())}
        style={{ cursor: 'pointer' }}
      />
    </AlertWrapper>
  ) : null;
};

export default Alert;
