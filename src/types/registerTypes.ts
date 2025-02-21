export type TRegisterFormInput = {
  name: string;
  email: string;
  password: string;
  bio?: string;
  avatar?: { url: string; alt: string };
  banner?: { url: string; alt: string };
  venueManager?: boolean;
};

export type TRegisterProps = {
  userData: TRegisterFormInput;
};
