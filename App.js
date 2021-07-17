import React, {useState} from 'react';
import {Text, View, Button, StyleSheet, TouchableOpacity,Image} from 'react-native';
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
      <Image source={require('./arrow.jpg')} style={{width:350,height:200,marginTop:20}} />

      <TouchableOpacity
        style={styles.buttonContain}
        onPress={() => setRotation(!rotateScreen)}>
        <Text style={styles.rotateButton}>
          {rotateScreen ? 'Press To Portrait-Rotate' : 'Press To Landscape-Rotate'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonContain}
        onPress={() => {
          flipScreen === 1 ? setFlipScreen(-1) : setFlipScreen(1);
        }}>
        <Text style={styles.rotateButton}>
          Press To Flip Screen
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
