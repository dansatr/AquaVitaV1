import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButton = ({ 
  title, 
  onPress, 
  style, 
  textStyle,
  disabled = false 
}) => (
  <TouchableOpacity
    style={[
      styles.button,
      disabled && styles.disabled,
      style
    ]}
    onPress={onPress}
    disabled={disabled}
  >
    <Text style={[styles.text, textStyle]}>
      {title}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1E88E5',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  disabled: {
    backgroundColor: '#90CAF9',
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomButton;