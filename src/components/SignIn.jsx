import { TextInput, Pressable, StyleSheet, View } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';

import Text from './Text';
import theme from '../theme';
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
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const initialValues = {
  username: '',
  password: '',
}

const SignIn = () => {
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  })

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
      <Pressable onPress={formik.handleSubmit} style={[styles.shared, styles.button]}>
        <Text color='white' fontWeight='bold' fontSize='subheading'>Sign in</Text>
      </Pressable>
  </View>
  )
};

export default SignIn;