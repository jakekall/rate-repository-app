import { TextInput, Pressable, StyleSheet, View } from 'react-native';
import { useFormik } from 'formik';

import Text from './Text';
import theme from '../theme';

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
});

const initialValues = {
  username: '',
  password: '',
}

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  const formik = useFormik({
    initialValues,
    onSubmit
  })

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Username'
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        style={[styles.shared, styles.input]}
      />
      <TextInput
        placeholder='Password'
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        secureTextEntry={true}
        style={[styles.shared, styles.input]}
      />
      <Pressable onPress={formik.handleSubmit} style={[styles.shared, styles.button]}>
        <Text color='white' fontWeight='bold' fontSize='subheading'>Sign in</Text>
      </Pressable>
  </View>
  )
};

export default SignIn;