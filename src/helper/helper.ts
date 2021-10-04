export interface ISignUpInfo {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  passwordConfirm: string;
}
export interface ISignInInfo {
  email: string;
  password: string;
}

export interface IError {
  firstname: boolean;
  lastname: boolean;
  email: boolean;
  password: boolean;
  passwordConfirm: boolean;
}
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
  lastname: string;
  email: string;
  phone: string;
  address: string;
  note: string;
}

export const FIELDS = {
  ID: "id",
  USEREMAIL: "useremail",
  FIRSTNAME: "firstname",
  PASSWORD: "password",
  PASSWORD_CONFIRM: "passwordConfirm",
  LASTNAME: "lastname",
  EMAIL: "email",
  PHONE: "phone",
  ADDRESS: "address",
  NOTE: "note",
  SEARCH: "search",
};

export const LOCAL_STORAGE_VARIABLE = {
  tokenKey: "token",
  emailKey: "email",
};

export const PASSWORD_LENGTH = 5;
export const NAME_LENGTH_MIN = 2;
export const PATH = {
  HOME: "/",
  ACCOUNT: "/account",
};

export const ERROR_INITIAL_VALUE = {
  firstname: false,
  lastname: false,
  email: false,
  password: false,
  passwordConfirm: false,
};

//if the user filled a field incorrectly, we inform him.
export const entryCheck = (setError: TSetError, name: string, test: boolean) => {
  setError(prev => ({
    ...prev,
    [name]: !test,
  }));
};

//when the user click submit, we verify that there are no empty fields.
// If so, we signal that to the user.
export const verifyAllEntry = (entry: ISignUpInfo | ISignInInfo, setError: TSetError): boolean => {
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
