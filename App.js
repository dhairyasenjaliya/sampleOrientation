import React, {useState} from 'react';
import {Text, View, Button, StyleSheet, TouchableOpacity} from 'react-native';
import {
  OrientationLocker,
  PORTRAIT,
  LANDSCAPE,
} from 'react-native-orientation-locker';

export default function App() {
  const [rotateScreen, setRotation] = useState(false);
  const [flipScreen, setFlipScreen] = useState(1);

  return (
    <View
      style={[
        styles.contain,
        {
          transform: [{scaleX: flipScreen}],
        },
      ]}>
      <OrientationLocker
        orientation={rotateScreen ? LANDSCAPE : PORTRAIT}
        onChange={orientation => console.log('onChange', orientation)}
        onDeviceChange={orientation =>
          console.log('onDeviceChange', orientation)
        }
      />
      <Text style={styles.titleText}>Hey Josephe</Text>

      <TouchableOpacity
        style={styles.buttonContain}
        onPress={() => setRotation(!rotateScreen)}>
        <Text style={styles.rotateButton}>
          {rotateScreen ? 'Portrait-Rotate' : 'Landscape-Rotate'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonContain}
        onPress={() => {
          flipScreen === 1 ? setFlipScreen(-1) : setFlipScreen(1);
        }}>
        <Text style={styles.rotateButton}>
          {flipScreen === 1 ? 'Flip Screen' : 'Normal'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  contain: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  titleText: {fontWeight: 'bold', fontSize: 30},
  buttonContain: {
    marginTop: 20,
  },
  rotateButton: {color: 'blue', fontSize: 20},
});
