export type LoginType = {
  email: string;
  password: string;
};

export type SignupType = {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
};
