import { Text, TextInput } from 'react-native';

const defaultFont = 'Inter_18pt-Regular';

// For Text
if (Text.defaultProps == null) Text.defaultProps = {};
Text.defaultProps.style = { fontFamily: defaultFont };

// For TextInput (important)
if (TextInput.defaultProps == null) TextInput.defaultProps = {};
TextInput.defaultProps.style = { fontFamily: defaultFont };