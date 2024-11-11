import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
};

export type LoginScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  "Login"
>;
export type RegisterScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  "Register"
>;

// types.ts
export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

export interface QuizCategory {
  category: string;
  questions: QuizQuestion[];
}
