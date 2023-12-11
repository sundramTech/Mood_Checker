import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Button, Overlay } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';

const MoodScreen = () => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedMood, setSelectedMood] = useState(null);

  const showOverlay = (msg) => {
    setMessage(msg);
    setVisible(true);
  };

  const handleDropdownChange = (item) => {
    setSelectedMood(item.value);
  };

  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={() => showOverlay('Happy')}>
        <Text style={{ fontSize: screenWidth * 0.05 }}>😊</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => showOverlay('Sad')}>
        <Text style={{ fontSize: screenWidth * 0.05 }}>😢</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => showOverlay('Normal')}>
        <Text style={{ fontSize: screenWidth * 0.05 }}>😐</Text>
      </TouchableOpacity>

      <DropDownPicker
        items={[
          { label: 'Happy', value: 'Happy' },
          { label: 'Sad', value: 'Sad' },
          { label: 'Normal', value: 'Normal' },
        ]}
        defaultValue={selectedMood}
        containerStyle={{ height: screenHeight * 0.05, width: screenWidth * 0.3 }}
        style={{ backgroundColor: '#fafafa' }}
        itemStyle={{
          justifyContent: 'flex-start',
        }}
        dropDownStyle={{ backgroundColor: '#fafafa' }}
        onChangeItem={(item) => handleDropdownChange(item)}
        zIndex={9999} // Make sure dropdown is above the overlay
      />

      <Overlay isVisible={visible} onBackdropPress={() => setVisible(false)}>
        <View style={{ padding: screenWidth * 0.05 }}>
          <Text>{message}</Text>
          <Button title="Close" onPress={() => setVisible(false)} />
        </View>
      </Overlay>
    </View>
  );
};

export default MoodScreen;
