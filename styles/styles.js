import { StyleSheet, Dimensions } from 'react-native';
import { padding, dimensions, fonts } from './base';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: padding.sm,
    paddingVertical: padding.lg,
    width: dimensions.fullWidth,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
  }
})

export default styles;