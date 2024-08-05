import { TextInput, Pressable, StyleSheet, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useFormik } from 'formik';
import * as yup from 'yup';

import Text from './Text';
import theme from '../theme';
import useCreateReview from '../hooks/useCreateReview';

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
  ownerName: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup.number().required('Rating is required').min(0, 'Rating must be between 0-100').max(100, 'Rating must be between 0-100'),
  text: yup.string().optional(),
});

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
};

export const ReviewForm = () => {
  const [createReview] = useCreateReview()
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;
    try {
      const result = await createReview({ ownerName, repositoryName, rating, text });
      navigate(`/repositories/${result.repositoryId}`)
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
        placeholder='Repository owner name'
        value={formik.values.ownerName}
        onChangeText={formik.handleChange('ownerName')}
        style={[styles.shared, styles.input, formik.errors.ownerName && styles.error]}
      />
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text color='error'>{formik.errors.ownerName}</Text>
      )}
      <TextInput
        placeholder='Repository name'
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange('repositoryName')}
        style={[styles.shared, styles.input, formik.errors.repositoryName && styles.error]}
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text color='error'>{formik.errors.repositoryName}</Text>
      )}
      <TextInput
        placeholder='Rating between 0 and 100'
        value={formik.values.rating}
        onChangeText={formik.handleChange('rating')}
        style={[styles.shared, styles.input, formik.errors.rating && styles.error]}
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text color='error'>{formik.errors.rating}</Text>
      )}
      <TextInput
        placeholder='Review'
        value={formik.values.text}
        onChangeText={formik.handleChange('text')}
        style={[styles.shared, styles.input]}
        multiline={true}
      />
      <Pressable onPress={formik.handleSubmit} style={[styles.shared, styles.button]}>
        <Text color='white' fontWeight='bold' fontSize='subheading'>Create a review</Text>
      </Pressable>
    </View>
  )
};

export default ReviewForm;