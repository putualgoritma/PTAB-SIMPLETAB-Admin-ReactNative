import React, {useEffect, useState} from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  ScrollView,
  Image,
  Text,
  Modal,
  TouchableHighlight,
} from 'react-native';
import {
  HeaderView,
  DataView,
  Footer,
  Title,
  Spinner,
  Btn,
} from '../../../component';
import ImageViewer from 'react-native-image-zoom-viewer';

const ViewActionSeal = ({navigation, route}) => {
  const image = require('../../../assets/img/BackgroundView.png');

  const action = route.params.action;
  const [showImage, setShowImage] = useState(false);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [staffs, setStaffs] = useState(null);
  const [loadingImage, setLoadingImage] = useState(true);

  useEffect(() => {
    let data = [];
    console.log(action);
    if (action.staff) {
      action.staff.map((item, index) => {
        data[index] = item.name;
      });

      setStaffs(data);
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    imageAction.map((item, index) => {
      images.push({
        url:
          `https://simpletabadmin.ptab-vps.com/pdf/` +
          `${String(item).replace('public/', '')}?time="${new Date()}`,
      });
    });

    console.log('images looping', images);
    setLoading(false);
  }, []);
  useEffect(() => {
    console.log(imageAction);
  }, []);

  const [imageAction, setImageAction] = useState(
    action.image != '' ? JSON.parse(route.params.action.image) : [],
  );

  return (
    <View style={styles.container}>
      {loading && <Spinner />}
      <ImageBackground source={image} style={styles.image}>
        <ScrollView>
          <HeaderView />
          <View style={{alignItems: 'center'}}>
            <View style={{width: '90%'}}>
              <Title title="Detail Tindakan Segel" paddingVertical={5} />
              <View style={styles.baseBoxShadow}>
                <View style={styles.boxShadow}>
                  <DataView title="Code" txt={action.code} />
                  <DataView title="Type" txt={action.type} />
                  <DataView title="Memo" txt={action.memo} />
                  <DataView title="Foto" />
                  <Modal
                    visible={showImage}
                    transparent={true}
                    enablePreload={true}
                    onRequestClose={() => setShowImage(false)}
                    onDoubleClick={() => setShowImage(true)}>
                    <ImageViewer imageUrls={images} />
                  </Modal>
                  <TouchableHighlight
                    onPress={() => {
                      setShowImage(true);
                      console.log(images);
                    }}>
                    <ScrollView
                      style={{flexDirection: 'row'}}
                      horizontal={true}>
                      <ImageBackground
                        source={require('../../../assets/img/ImageLoading.gif')}
                        style={{height: 220, width: 280}}>
                        {imageAction.map((item, index) => {
                          return (
                            <Image
                              key={index}
                              style={{
                                height: 220,
                                width: 270,
                                marginVertical: 10,
                              }}
                              source={{
                                uri:
                                  `https://simpletabadmin.ptab-vps.com/pdf/` +
                                  `${String(item).replace(
                                    'public/',
                                    '',
                                  )}?time="${new Date()}`,
                              }}
                            />
                          );
                        })}
                      </ImageBackground>
                    </ScrollView>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        <Footer navigation={navigation} focus="Home" />
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  baseBoxShadow: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  boxShadow: {
    backgroundColor: '#ffffff',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 3,
  },
});

export default ViewActionSeal;
