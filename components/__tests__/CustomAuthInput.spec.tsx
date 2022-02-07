import CustomInput from '../CustomAuthInput';
import { render, fireEvent } from '@testing-library/react-native';
import {
  Control,
  FormProvider,
  useForm,
  useFormContext,
} from 'react-hook-form';
import { AuthProps } from '../../types/auth';

const WrapperForm = ({ children }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('CustomInput for Auth', () => {
  it.skip('should not trigger error for correct values', async () => {
    const { getByTestId, queryByTestId } = render(<CustomInput />);

    fireEvent.changeText(getByTestId('nameInput'), 'ABCDEFG');

    await act(async () => {
      fireEvent.press(getByTestId('submitButton'));
    });

    expect(queryByTestId('nameErrorText')).not.toBeTruthy();
  });

  it.skip('should trigger error for error email', async () => {
    const { getByTestId, queryByTestId, container } = render(
      <WrapperForm>
        <CustomInput
          fieldName={'email'}
          //   control={control}
          keyboardType="email-address"
          testID="email"
          autoFocus
          autoCorrect={false}
          placeholder="Email..."
          label="Email"
        />
      </WrapperForm>
    );

    const email = getByTestId('email');
    fireEvent.changeText(email, {
      target: { value: 'invalid email' },
    });
    fireEvent.press(getByTestId('submitButton'));

    expect(queryByTestId('erroremail')).toBeTruthy();
  });
});
