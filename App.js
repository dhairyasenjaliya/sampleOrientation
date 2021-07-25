import React, {useCallback, useState, useRef} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  RefreshControl,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  Button,
  Dimensions,
} from 'react-native';
import ViewShot from 'react-native-view-shot';
import CameraRoll from '@react-native-community/cameraroll';
import RecordScreen from 'react-native-record-screen';

import {
  OrientationLocker,
  PORTRAIT,
  LANDSCAPE,
} from 'react-native-orientation-locker';

// import Btn from './Btn';

const Viewshoot = () => {
  const full = useRef();
  const [preview, setPreview] = useState(null);
  const [itemsCount, setItemsCount] = useState(10);
  const [refreshing, setRefreshing] = useState(false);

  const [rotateScreen, setRotation] = useState(false);
  const [flipScreen, setFlipScreen] = useState(1);

  async function hasAndroidPermission() {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }

  async function savePicture(uri) {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    }

    CameraRoll.save(uri).then(data => {
      alert('Screenshot captured');
    });
  }

  const onCapture = useCallback(() => {
    full.current.capture().then(uri => {
      if (uri) {
        setPreview({uri});
        savePicture(uri);
      }
    });
  }, []);

  const onRecordStart = () => {
    console.log('🚀 ~ file: App.js ~ line 90 ~ onRecordStop ~ onRecordStop');

    RecordScreen.startRecording()
      .then(data => {
        console.log('start ', data);
      })
      .catch(error => console.log(error));
  };

  const onRecordStop = async () => {
    console.log('🚀 ~ file: App.js ~ line 90 ~ onRecordStop ~ onRecordStop');

    const res = await RecordScreen.stopRecording().catch(error =>
      console.timeLog(error),
    );

    if (res) {
      const url = res.result.outputURL;
      if (url) {
        CameraRoll.save(url).then(data => {
          console.log(
            '🚀 ~ file: App.js ~ line 80 ~ CameraRoll.save ~ data',
            data,
          );
          alert('Screen Rocerded');
        });
      }
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.root}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            setTimeout(() => {
              setItemsCount(itemsCount + 10);
              setRefreshing(false);
            }, 5000);
          }}
        />
      }>
      <SafeAreaView style={{alignItems: 'center'}}>
        <ViewShot ref={full} style={styles.container}>
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
            <Image
              source={require('./arrow.jpg')}
              style={{width: 350, height: 150, marginTop: 20}}
            />

            <TouchableOpacity
              style={styles.buttonContain}
              onPress={() => setRotation(!rotateScreen)}>
              <Text style={styles.rotateButton}>
                {rotateScreen
                  ? 'Press To Portrait-Rotate'
                  : 'Press To Landscape-Rotate'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonContain}
              onPress={() => {
                flipScreen === 1 ? setFlipScreen(-1) : setFlipScreen(1);
              }}>
              <Text style={styles.rotateButton}>Press To Flip Screen</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onCapture}>
              <Text style={styles.titleText}>ScreenShot Capture</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onRecordStart}>
              <Text style={styles.titleText}>Record Start </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onRecordStop}>
              <Text style={styles.titleText}>Record Stop </Text>
            </TouchableOpacity>
          </View>
        </ViewShot>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',

    // width: Dimensions.get('window').width,
    // height: Dimensions.get('window').height,
  },
  root: {
    paddingVertical: 20,
  },
  content: {
    backgroundColor: '#fff',
  },
  item: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 22,
    color: '#666',
  },
  previewImage: {
    height: 200,
    backgroundColor: 'black',
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#FFF',
    marginTop: 20,
  },
  buttonContain: {
    marginTop: 10,
  },
  rotateButton: {
    color: 'blue',
    fontSize: 15,
  },
});

Viewshoot.navigationProps = {
  title: 'Viewshoot',
};

export default Viewshoot;
