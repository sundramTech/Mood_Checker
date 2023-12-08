import React, { useEffect } from 'react';
import { Text, View, StyleSheet, ToastAndroid } from 'react-native';

const CustomToast = ({ message }) => {
  useEffect(() => {
    if (message) {
      showToast(message);
    }
  }, [message]);

  const showToast = (text) => {
    ToastAndroid.showWithGravityAndOffset(
      text,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };

};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  text: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default CustomToast;