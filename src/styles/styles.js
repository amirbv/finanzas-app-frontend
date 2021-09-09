import { StyleSheet, Dimensions } from 'react-native';
import { padding, dimensions, fonts } from './base';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: padding.sm,
    // paddingVertical: padding.lg,
    width: dimensions.fullWidth,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  formFieldWrapper: {
    flex: 1,
    width: '100%'
  },
  header: {
    fontSize: fonts.lg,
    fontFamily: fonts.primary
  },
  section: {
    paddingVertical: padding.lg,
    paddingHorizontal: padding.xl
  },
  button: {
    marginHorizontal: padding.lg,
    marginVertical: padding.xl
  },
  input: {
    width: '100%',
    color: '#000000'
  },
  labelText: {
    fontSize: 20,
    marginBottom: 12,
    paddingLeft: 10,
    paddingTop: 10
  },
  errorMessage: {
    paddingLeft: 10,
    paddingTop: 10
  },
  logo: {
    width: 200,
    height: 200,
  },
})

export default styles;