export interface ISignUpInfo {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface IError {
  firstname?: boolean;
  lastname?: boolean;
  email: boolean;
  password: boolean;
  passwordConfirm?: boolean;
}

export type TSetSignUpInfo = React.Dispatch<
  React.SetStateAction<{
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    passwordConfirm: string;
  }>
>;

export type TSetError = React.Dispatch<
  React.SetStateAction<{
    firstname: boolean;
    lastname: boolean;
    email: boolean;
    password: boolean;
    passwordConfirm: boolean;
  }>
>;

export interface IContact {
  id: number;
  useremail: string;
  firstname: string;
  lastname?: string;
  email?: string;
  phone: string;
  address?: string;
  note?: string;
}

export const LOCAL_STORAGE_VARIABLE = {
  tokenKey: "token",
  emailKey: "email",
};

export const firstnameCheck = (entry: ISignUpInfo, setError: TSetError, test: boolean): void => {
  if (!test) {
    setError(prev => ({
      ...prev,
      firstname: true,
    }));
  } else {
    setError(prev => ({
      ...prev,
      firstname: false,
    }));
  }
};
export const lastnameCheck = (entry: ISignUpInfo, setError: TSetError, test: boolean): void => {
  if (!test) {
    setError(prev => ({
      ...prev,
      lastname: true,
    }));
  } else {
    setError(prev => ({
      ...prev,
      lastname: false,
    }));
  }
};
export const emailCheck = (setError: TSetError, test: boolean): void => {
  if (!test) {
    setError(prev => ({
      ...prev,
      email: true,
    }));
  } else {
    setError(prev => ({
      ...prev,
      email: false,
    }));
  }
};

export const passwordCheck = ( setError: TSetError, test: boolean): void => {
  // console.log(entry);

  if (!test) {
    setError(prev => ({
      ...prev,
      password: true,
    }));
  } else {
    setError(prev => ({
      ...prev,
      password: false,
    }));
  }
};
export const passwordConfirmCheck = (
  entry: ISignUpInfo,
  setError: TSetError,
  test: boolean
): void => {
  if (!test) {
    setError(prev => ({
      ...prev,
      passwordConfirm: true,
    }));
  } else {
    setError(prev => ({
      ...prev,
      passwordConfirm: false,
    }));
  }
};

export const entryCheck = (entry: ISignUpInfo, setError: TSetError): boolean => {
  let test = false;
  for (const [key, value] of Object.entries(entry)) {
    if (value === "") {
      setError(prev => ({
        ...prev,
        [key]: true,
      }));
      test = true;
    }
  }

  return test;
};
