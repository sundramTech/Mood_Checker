import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Button, Overlay } from 'react-native-elements';

const MoodScreen = () => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  const showOverlay = (msg) => {
    setMessage(msg);
    setVisible(true);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={() => showOverlay('Happy')}>
        <Text style={{ fontSize: 30 }}>😊</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => showOverlay('Sad')}>
        <Text style={{ fontSize: 30 }}>😢</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => showOverlay('Normal')}>
        <Text style={{ fontSize: 30 }}>😐</Text>
      </TouchableOpacity>

      <Overlay isVisible={visible} onBackdropPress={() => setVisible(false)}>
        <View style={{ padding: 20 }}>
          <Text>{message}</Text>
          <Button title="Close" onPress={() => setVisible(false)} />
        </View>
      </Overlay>
    </View>
  );
};

export default MoodScreen;
