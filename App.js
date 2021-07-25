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
import Carousel from 'react-native-snap-carousel';

import {
  OrientationLocker,
  PORTRAIT,
  LANDSCAPE,
} from 'react-native-orientation-locker';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// import Btn from './Btn';

const Viewshoot = () => {
  const full = useRef();
  const [preview, setPreview] = useState(null);
  const [itemsCount, setItemsCount] = useState(10);
  const [refreshing, setRefreshing] = useState(false);

  const [rotateScreen, setRotation] = useState(false);
  const [flipScreen, setFlipScreen] = useState(1);
  const [isRecording, setRecording] = useState(false);

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
    RecordScreen.startRecording()
      .then(data => {
        setRecording(true);
        console.log('start ', data);
      })
      .catch(error => {
        // eslint-disable-next-line no-alert
        alert(error.message);
      });
  };

  const onRecordStop = async () => {
    const res = await RecordScreen.stopRecording().catch(error =>
      console.log(error),
    );

    if (res) {
      const url = res.result.outputURL;
      if (url) {
        CameraRoll.save(url).then(data => {
          setRecording(false);
          alert('Screen Recorded');
        });
      }
    }
  };

  function _renderItem() {
    return (
      <View>
        <Image
          style={{height: 450, width: 400}}
          source={{uri: 'https://picsum.photos/200/300'}}
          resizeMode={'stretch'}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
      <ViewShot
        ref={full}
        style={[styles.container, {backgroundColor: '#FFF'}]}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.root}>
          <View ref={full} style={styles.container}>
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
              {/* <Image
              source={require('./arrow.jpg')}
              style={{width: 350, height: 150, marginTop: 20}}
            /> */}

              <Carousel
                data={[1, 2, 3, 5, 6, 7, 8, 9, 10, 11]}
                renderItem={_renderItem}
                sliderWidth={800}
                itemWidth={400}
                sliderHeight={400}
                loop
                containerCustomStyle={{
                  alignSelf: 'center',
                }}
              />

              {/* <TouchableOpacity
              style={styles.buttonContain}
              onPress={() => setRotation(!rotateScreen)}>
              <Text style={styles.rotateButton}>
                {rotateScreen
                  ? 'Press To Portrait-Rotate'
                  : 'Press To Landscape-Rotate'}
              </Text>
            </TouchableOpacity> */}

              {/* <TouchableOpacity
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
            </TouchableOpacity> */}
            </View>
          </View>
        </ScrollView>

        <View style={styles.bottomButton2}>
          <TouchableOpacity
            onPress={() => {
              flipScreen === 1 ? setFlipScreen(-1) : setFlipScreen(1);
            }}
            style={[styles.commonButton, {backgroundColor: '#9795ef'}]}>
            <Text style={styles.buttonText2}>Flip Screen</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setRotation(!rotateScreen)}
            style={[styles.commonButton, {backgroundColor: '#f9c5d1'}]}>
            {/* f53844 */}
            <Text style={styles.buttonText2}>Rotate Screen</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomButton}>
          <TouchableOpacity
            onPress={onCapture}
            style={[styles.commonButton, {backgroundColor: '#045de9'}]}>
            <Text style={styles.buttonText}>ScreenShot</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={isRecording ? onRecordStop : onRecordStart}
            style={[
              styles.commonButton,
              {backgroundColor: isRecording ? '#f53844' : '#20bf55'},
            ]}>
            <Text style={styles.buttonText}>
              {isRecording ? 'Stop Recording' : ' Record'}
            </Text>
          </TouchableOpacity>
        </View>
      </ViewShot>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 10,
    flex: 1,
  },
  root: {
    paddingVertical: 20,
    paddingBottom: 200,
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
    // marginTop: 20,
    marginBottom: 20,
    alignSelf: 'center',
  },
  buttonContain: {
    marginTop: 10,
  },
  rotateButton: {
    color: 'blue',
    fontSize: 15,
  },
  commonButton: {
    flex: 1,
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
    width: '50%',
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
  },
  buttonText2: {
    fontSize: 18,
    // color: '#FFF',
  },
  bottomButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
  },
  bottomButton2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 90,
    alignSelf: 'center',
  },
});

Viewshoot.navigationProps = {
  title: 'Viewshoot',
};

export default Viewshoot;
