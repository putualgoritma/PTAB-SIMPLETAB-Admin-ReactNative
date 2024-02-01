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
  RefreshControl,
} from 'react-native';
import {HeaderView, DataView, Footer, Title, Spinner} from '../../../component';
import ImageViewer from 'react-native-image-zoom-viewer';
import Config from 'react-native-config';
import API from '../../../service';
import {useSelector} from 'react-redux';

const ViewAction = ({navigation, route}) => {
  const image = require('../../../assets/img/BackgroundView.png');

  // const action = route.params.action
  const [showImage, setShowImage] = useState(false);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [staffs, setStaffs] = useState(null);
  const USER = useSelector(state => state.UserReducer);
  const TOKEN = useSelector(state => state.TokenReducer);
  const [actions, setActions] = useState([]);
  const [loadingImage, setLoadingImage] = useState(true);
  const [imageAction, setImageAction] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // useEffect(() => {
  //     let data = []
  //     console.log(actions);
  //     if(actions.staff){
  //         actions.staff.map((item ,index) => {
  //             data[index] = item.name
  //         })

  //         setStaffs(data)
  //         setLoading(false)
  //     }

  // }, [])

  const onRefresh = React.useCallback(() => {
    setRefresh(true);
    API.actionDetail({id: route.params.action.id, userid: USER.id}, TOKEN)
      .then(result => {
        setActions(result.data);
        setImageAction(
          result.data.image != '' ? JSON.parse(result.data.image) : [],
        );

        let d1 = [];
        result.data.image != '' &&
          JSON.parse(result.data.image).map((item, index) => {
            d1.push({
              url:
                `https://simpletabadmin.ptab-vps.com` +
                `${String(item).replace('public/', '')}?time="${new Date()}`,
            });
          });
        setImages(d1);
        setLoading(false);
        setRefresh(false);
        // alert('berhasil')
        console.log('foto2 ' + result.data.status);
        // console.log('foto '+JSON.parse(result.data.image))
      })
      .catch(e => {
        console.log(e.request);
        setLoading(false);
      })
      .finally(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    // console.log(route.params.action.ticket.id)
    // console.log(USER.id)
    setLoading(true);
    API.actionDetail({id: route.params.action.id, userid: USER.id}, TOKEN)
      .then(result => {
        setActions(result.data);
        setImageAction(
          result.data.image != '' ? JSON.parse(result.data.image) : [],
        );

        let d1 = [];
        result.data.image != '' &&
          JSON.parse(result.data.image).map((item, index) => {
            d1.push({
              url:
                `https://simpletabadmin.ptab-vps.com` +
                `${String(item).replace('public/', '')}?time="${new Date()}`,
            });
          });
        setImages(d1);
        setLoading(false);
        setRefresh(false);
        // alert('berhasil')
        console.log('foto2 ' + result.data.status);
        // console.log('foto '+JSON.parse(result.data.image))
      })
      .catch(e => {
        console.log(e.request);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    console.log(imageAction);
  }, []);

  return (
    <View style={styles.container}>
      {loading && <Spinner />}
      {refresh && <Spinner />}

      <ImageBackground source={image} style={styles.image}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <HeaderView />
          {!loading && (
            <View style={{alignItems: 'center'}}>
              <View style={{width: '90%'}}>
                <Title title="Detail Tindakan" paddingVertical={5} />
                <View style={styles.baseBoxShadow}>
                  <View style={styles.boxShadow}>
                    <DataView title="Status" txt={actions.status} />
                    <DataView title="Deskripsi" txt={actions.description} />
                    <DataView
                      title="Pegawai"
                      txt={actions.staff.name ? actions.staff.name : 'kosong'}
                    />
                    <DataView
                      title="Departemen"
                      txt={actions.dapertement.name}
                    />
                    <DataView title="Tiket" txt={actions.ticket.title} />
                    <DataView title="Waktu Mulai" txt={actions.start} />
                    <DataView title="Waktu Selesai" txt={actions.end} />
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
                        if (images.length > 0) {
                          setShowImage(true);
                          console.log(images);
                        }
                      }}>
                      <ScrollView
                        style={{flexDirection: 'row'}}
                        horizontal={true}>
                        {/* {loadingImage && <Text style={{textAlign : 'center', fontSize : 17}}>Image Is Loading...</Text>} */}
                        <ImageBackground
                          source={require('../../../assets/img/ImageLoading.gif')}
                          style={{height: 220, width: 280}}>
                          {
                            // actions.image != null ?
                            imageAction.map((item, index) => {
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
                                      `https://simpletabadmin.ptab-vps.com` +
                                      `${String(item).replace(
                                        'public/',
                                        '',
                                      )}?time="${new Date()}`,
                                  }}
                                  // onLoadEnd={() => setLoadingImage(false)}
                                  // onLoadStart={() => setLoadingImage(true)}
                                />
                              );
                            })
                            // :
                            // <Text>Kosong</Text>
                          }
                        </ImageBackground>
                      </ScrollView>
                    </TouchableHighlight>
                  </View>
                </View>
              </View>
            </View>
          )}
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

export default ViewAction;
