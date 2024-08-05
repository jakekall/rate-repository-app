import { TextInput, Pressable, StyleSheet, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useFormik } from 'formik';
import * as yup from 'yup';

import Text from './Text';
import theme from '../theme';
import useSignUp from '../hooks/useSignUp';
import useSignIn from '../hooks/useSignIn';

const styles = StyleSheet.create({
  container: {
    gap: 12,
    padding: 12,
  },
  shared: {
    borderWidth: 1,
    borderRadius: 3,
    padding: 7,
    height: 50,
  },
  input: {
    borderColor: theme.colors.textSecondary,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
  },
  error: {
    borderColor: theme.colors.error,
  },
});

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required').min(5, 'Username must be between 5 and 30 characters').max(30, 'Username must be between 5 and 30 characters'),
  password: yup.string().required('Password is required').min(5, 'Password must be between 5 and 50 characters').max(50, 'Password must be between 5 and 50 characters'),
  passwordConfirmation: yup.string().required('Password confirmation is required').oneOf([yup.ref('password'), null], "Passwords don't match"),
});

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: '',
};

export const SignUp = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signUp({ username, password });
      await signIn({ username, password });
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  });

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Username'
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        style={[styles.shared, styles.input, formik.errors.username && styles.error]}
      />
      {formik.touched.username && formik.errors.username && (
        <Text color='error'>{formik.errors.username}</Text>
      )}
      <TextInput
        placeholder='Password'
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        secureTextEntry={true}
        style={[styles.shared, styles.input, formik.errors.password && styles.error]}
      />
      {formik.touched.password && formik.errors.password && (
        <Text color='error'>{formik.errors.password}</Text>
      )}
      <TextInput
        placeholder='Password confirmation'
        value={formik.values.passwordConfirmation}
        onChangeText={formik.handleChange('passwordConfirmation')}
        secureTextEntry={true}
        style={[styles.shared, styles.input, formik.errors.passwordConfirmation && styles.error]}
      />
      {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation && (
        <Text color='error'>{formik.errors.passwordConfirmation}</Text>
      )}
      <Pressable onPress={formik.handleSubmit} style={[styles.shared, styles.button]}>
        <Text color='white' fontWeight='bold' fontSize='subheading'>Sign up</Text>
      </Pressable>
    </View>
  )
};

export default SignUp;