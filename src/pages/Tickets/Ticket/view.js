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
import Config from 'react-native-config';
import {HeaderView, DataView, Footer, Title, Spinner} from '../../../component';
import VideoPlayer from '../../../component/Video';
import ImageViewer from 'react-native-image-zoom-viewer';
import {faMapMarked} from '@fortawesome/free-solid-svg-icons';
import {Distance} from '../../../utils';
import API from '../../../service';
import {useSelector} from 'react-redux';

const ViewTicket = ({navigation, route}) => {
  const Permission = useSelector(state => state.PermissionReducer);
  const USER = useSelector(state => state.UserReducer);

  const TOKEN = useSelector(state => state.TokenReducer);
  const image1 = require('../../../assets/img/BackgroundView.png');
  const [loading, setLoading] = useState(false);
  const [loadingImage, setLoadingImage] = useState(true);
  // const [ticket.image, setticket.image] = useState(JSON.parse(route.params.ticket.ticket_image[0].image))
  // const ticket = route.params.ticket
  const [loadingVideo, setLoadingVideo] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [images, setImages] = useState([]);
  const [onFullScreen, setOnFullScreen] = useState(false);
  // const imagepengerjaan = ticket.action[0].image.length > 0 ? (JSON.parse(ticket.action[0].image)[0]) : null

  // const imagepengerjaan = ticket.action.length > 0 ? (JSON.parse(ticket.action[0].image)[0]) : null
  const [imagesPengerjaan, setImagesPengerjaan] = useState([]);
  const [imagesDone, setImagesDone] = useState([]);
  const [imagesPrework, setImagesPrework] = useState([]);
  const [imagesTools, setImagesTools] = useState([]);
  // const [panjang,setPanjang]= useState(ticket.action.length) ;
  const [ShowImagePengerjaan, setShowImagePengerjaan] = useState(false);
  const [ShowImageDone, setShowImageDone] = useState(false);
  const [ShowImagePrework, setShowImagePrework] = useState(false);
  const [ShowImageTools, setShowImageTools] = useState(false);
  const [refresh, setRefresh] = useState(false);
  // JSON.parse(ticket.action[panjang-1].image) : null
  // const [imagePengerjaan,setimagePengerjaan] = useState(ticket.action.length > 0 ? (ticket.action[panjang-1].image != null && ticket.action[panjang-1].image !='' ?    JSON.parse(ticket.action[panjang-1].image) : null) : null )
  // const [imageDone,setimageDone] = useState(ticket.action.length > 0 ? (ticket.action[panjang-1].image_done != null && ticket.action[panjang-1].image_done !='' ?    JSON.parse(ticket.action[panjang-1].image_done) : null) : null )
  // const [imagePrework, setImagePrework] = useState (ticket.action.length > 0 ? ticket.action[panjang-1].image_prework : null)
  // const [imageTools, setImageTools] = useState (ticket.action.length > 0 ? ticket.action[panjang-1].image_tools : null)
  const [ticket, setTicket] = useState([]);
  const [category, setCategory] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [alamat, setAlamat] = useState([]);
  const [fotokeluhan, setFotokeluhan] = useState([]);
  const [fotosebelum, setFotosebelum] = useState([]);
  const [fotoalat, setFotoalat] = useState([]);
  const [fotopengerjaan, setFotopengerjaan] = useState([]);
  const [fotoselesai, setFotoselesai] = useState([]);

  const [pfotosebelum, setpFotosebelum] = useState();
  const [pfotoalat, setpFotoalat] = useState();
  const [pfotopengerjaan, setpFotopengerjaan] = useState();
  const [pfotoselesai, setpFotoselesai] = useState();
  const [pfotokeluhan, setpFotokeluhan] = useState([]);

  const [refreshing, setRefreshing] = useState(false);
  //  console.log('uriii',`https://simpletabadmin.ptab-vps.com` + `${String(imagePrework).replace('public/', '')}`)

  // console.log('data foto pre',imagePrework)

  const onRefresh = React.useCallback(() => {
    setRefresh(true);
    API.ticketDetail({id: route.params.ticket.id, userid: USER.id}, TOKEN)
      .then(result => {
        setTicket(result.data);
        console.log('delete');

        //   console.log('test23 '+JSON.stringify(result.data.action[0].image))
        setCustomer(result.data.customer.namapelanggan);
        setAlamat(result.data.customer.alamat);
        setCategory(result.data.category.name);
        setFotoalat(result.fotoalat);
        setFotokeluhan(result.fotokeluhan);
        console.log('test g ' + result.fotokeluhan);
        setFotopengerjaan(result.fotopengerjaan);
        setFotosebelum(result.fotosebelum);
        setFotoselesai(result.fotoselesai);

        setpFotokeluhan(result.fotokeluhan.length);
        if (result.fotopengerjaan != null) {
          setpFotopengerjaan(result.fotopengerjaan.length);
        }
        if (result.fotoalat != null) {
          setpFotoalat(result.fotoalat.length);
          console.log('test p ', result.fotopengerjaan.length);
        }
        if (result.fotoselesai != null) {
          setpFotoselesai(result.fotoselesai.length);
        }

        // setImagesPengerjaan([])
        // setImagesDone([])

        // setImagesPrework([])
        // setImagesTools([])
        let d1 = [];
        let d2 = [];
        let d3 = [];
        let d4 = [];
        let d5 = [];
        console.log('llllppp1' + d5);
        result.fotokeluhan.map((item, index) => {
          d5.push({
            url:
              `https://simpletabadmin.ptab-vps.com` +
              `${String(item).replace('public/', '')}`,
          });
        });
        setImages(d5);
        console.log('llllppp' + d5);

        result.fotopengerjaan != null &&
          result.fotopengerjaan != null &&
          result.fotopengerjaan.map((item, index) => {
            d1.push({
              url:
                `https://simpletabadmin.ptab-vps.com` +
                `${String(item).replace('public/', '')}?time="${new Date()}`,
            });
          });
        setImagesPengerjaan(d1);

        d2.push({
          url:
            `https://simpletabadmin.ptab-vps.com` +
            `${String(result.fotosebelum).replace(
              'public/',
              '',
            )}?time="${new Date()}`,
        });
        setImagesPrework(d2);

        result.fotoalat != null &&
          result.fotoalat != null &&
          result.fotoalat.map((item, index) => {
            d3.push({
              url:
                `https://simpletabadmin.ptab-vps.com` +
                `${String(item).replace('public/', '')}`,
            });
          });
        setImagesTools(d3);
        console.log('j123', d3);

        result.fotoselesai != null &&
          result.fotoselesai.map((item, index) => {
            d4.push({
              url:
                `https://simpletabadmin.ptab-vps.com` +
                `${String(item).replace('public/', '')}?time="${new Date()}`,
            });
          });
        setImagesDone(d4);

        // setLastPage(result.data.last_page)
        console.log('tiket data', result.data);
        setLoading(false);
        setRefresh(false);
      })
      .catch(e => {
        console.log(e.request);
        // setRefresh(false)
        setLoading(false);
        setRefresh(false);
      })
      .finally(() => setRefreshing(false));
  }, []);

  const getData = async () => {
    // console.log(resetData);
    setLoading(true);
    API.ticketDetail({id: route.params.ticket.id, userid: USER.id}, TOKEN)
      .then(result => {
        setTicket(result.data);
        console.log('delete');

        //   console.log('test23 '+JSON.stringify(result.data.action[0].image))
        setCustomer(result.data.customer.namapelanggan);
        setAlamat(result.data.customer.alamat);
        setCategory(result.data.category.name);
        setFotoalat(result.fotoalat);
        setFotokeluhan(result.fotokeluhan);
        console.log('test g ' + result.fotokeluhan);
        setFotopengerjaan(result.fotopengerjaan);
        setFotosebelum(result.fotosebelum);
        setFotoselesai(result.fotoselesai);
        console.log('test p ' + result.data.action.length);
        setpFotokeluhan(result.fotokeluhan.length);
        if (result.fotopengerjaan != null) {
          setpFotopengerjaan(result.fotopengerjaan.length);
        }
        if (result.fotoselesai != null) {
          setpFotoselesai(result.fotoselesai.length);
        }

        // setImagesPengerjaan([])
        // setImagesDone([])

        // setImagesPrework([])
        // setImagesTools([])
        let d1 = [];
        let d2 = [];
        let d3 = [];
        let d4 = [];
        let d5 = [];
        console.log('llllppp1' + d5);
        result.fotokeluhan.map((item, index) => {
          d5.push({
            url:
              `https://simpletabadmin.ptab-vps.com` +
              `${String(item).replace('public/', '')}`,
          });
        });
        setImages(d5);
        console.log('llllppp' + d5);

        result.fotopengerjaan != null &&
          result.fotopengerjaan != null &&
          result.fotopengerjaan.map((item, index) => {
            d1.push({
              url:
                `https://simpletabadmin.ptab-vps.com` +
                `${String(item).replace('public/', '')}?time="${new Date()}`,
            });
          });
        setImagesPengerjaan(d1);

        d2.push({
          url:
            `https://simpletabadmin.ptab-vps.com` +
            `${String(result.fotosebelum).replace(
              'public/',
              '',
            )}?time="${new Date()}`,
        });
        setImagesPrework(d2);

        result.fotoalat != null &&
          result.fotoalat != null &&
          result.fotoalat.map((item, index) => {
            d3.push({
              url:
                `https://simpletabadmin.ptab-vps.com` +
                `${String(item).replace('public/', '')}?time="${new Date()}`,
            });
          });
        setImagesTools(d3);

        result.fotoselesai != null &&
          result.fotoselesai.map((item, index) => {
            d4.push({
              url:
                `https://simpletabadmin.ptab-vps.com` +
                `${String(item).replace('public/', '')}?time="${new Date()}`,
            });
          });
        setImagesDone(d4);

        // setLastPage(result.data.last_page)
        console.log('tiket data', result.data);
        setLoading(false);
        setRefresh(false);
      })
      .catch(e => {
        console.log(e.request);
        // setRefresh(false)
        setLoading(false);
        setRefresh(false);
      });

    // console.log(page);
  };

  useEffect(() => {
    getData();
    console.log('id tiket : ' + route.params.ticket.id);
    //    ticket.image.map((item, index) => {
    //        images.push({
    //         url: `https://simpletabadmin.ptab-vps.com` + `${String(item).replace('public/', '')}`,
    //        })
    //    })

    // console.log('images looping', images);
    //    setLoading(false)
  }, []);
  useEffect(() => {
    // console.log(ticket.image);
  }, []);

  // useEffect(() => {
  //     if(imagePrework != null){

  //           imagesPrework.push({
  //     url: `https://simpletabadmin.ptab-vps.com` + `${String(imagePrework).replace('public/', '')}?time="${new Date()}`,
  //           })

  //     }
  //      setLoading(false)
  //   }, [])

  //   useEffect(() => {
  //     if(imageTools != null){

  //           imagesTools.push({
  //     url: `https://simpletabadmin.ptab-vps.com` + `${String(imageTools).replace('public/', '')}?time="${new Date()}`,
  //           })

  //     }
  //      setLoading(false)
  //   }, [])

  // useEffect(() => {
  //     if(imagePengerjaan != null){
  //       imagePengerjaan.map((item, index) => {
  //           imagesPengerjaan.push({
  //     url: `https://simpletabadmin.ptab-vps.com` + `${String(item).replace('public/', '')}?time="${new Date()}`,
  //           })
  //       })

  //     }
  //      setLoading(false)
  //   }, [])

  //       useEffect(() => {
  //         if(imageDone != null){
  //           imageDone.map((item, index) => {
  //               imagesDone.push({
  //         url: `https://simpletabadmin.ptab-vps.com` + `${String(item).replace('public/', '')}?time="${new Date()}`,
  //               })
  //           })

  //         }
  //          setLoading(false)
  //       }, [])
  return (
    <View style={styles.container}>
      {loading && <Spinner />}
      {refresh && <Spinner />}
      <ImageBackground source={image1} style={styles.image}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <HeaderView />

          <View style={{alignItems: 'center'}}>
            <View style={{width: '90%'}}>
              <Title title="Detail Tiket" paddingVertical={5} />
              <View style={styles.baseBoxShadow}>
                <View style={styles.boxShadow}>
                  {!loading && (
                    <View>
                      <DataView title="Kode" txt={ticket.code} />
                      <DataView title="Nama Tiket" txt={ticket.title} />
                      <DataView title="Deskripsi" txt={ticket.description} />
                      <DataView title="Status" txt={ticket.status} />
                      <DataView title="Kategori" txt={category} />
                      <DataView title="Nama Pelanggan" txt={customer} />
                      <DataView title="Alamat" txt={alamat} />
                      <DataView
                        title="Location"
                        icon={faMapMarked}
                        txt="Lihat Lokasi"
                        color="blue"
                        onPress={() =>
                          navigation.navigate('Maps', {
                            lat: ticket.lat,
                            lng: ticket.lng,
                          })
                        }
                      />
                      <DataView title="Bukti Foto Keluhan" />
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
                          {/* {loadingImage && <Text style={{textAlign : 'center', fontSize : 17}}>Image Is Loading...</Text>} */}
                          <ImageBackground
                            source={require('../../../assets/img/ImageLoading.gif')}
                            style={{height: 220, width: 280}}>
                            {fotokeluhan.map((item, index) => {
                              return (
                                <Image
                                  key={index}
                                  style={{
                                    height: 220,
                                    width: 280,
                                    marginVertical: 10,
                                  }}
                                  source={{
                                    uri:
                                      `https://simpletabadmin.ptab-vps.com` +
                                      `${String(item).replace('public/', '')}`,
                                  }}
                                  // onLoadEnd={() => setLoadingImage(false)}
                                  // onLoadStart={() => setLoadingImage(true)}
                                />
                              );
                            })}
                          </ImageBackground>
                        </ScrollView>
                      </TouchableHighlight>
                      {ticket.video != '' && (
                        <View>
                          <DataView title="Bukti Video Keluhan" />

                          <View style={{height: 250, width: '100%'}}>
                            {ticket.video != '' && (
                              <VideoPlayer
                                src={{
                                  uri:
                                    `https://simpletabadmin.ptab-vps.com` +
                                    `${String(ticket.video).replace(
                                      'public/',
                                      '',
                                    )}`,
                                }}
                                onFullScreen={() => setOnFullScreen(true)}
                                onLoad={() => {
                                  setLoadingVideo(loadingVideo ? false : true);
                                  return loadingVideo;
                                }}
                              />
                            )}
                            {ticket.video == '' && (
                              <Image
                                style={{
                                  height: 220,
                                  width: 280,
                                  marginVertical: 10,
                                }}
                                source={require('../../../assets/img/ImageVideo.png')}
                              />
                            )}
                          </View>
                        </View>
                      )}

                      {/* <Text style={{fontSize:16, color:'#696969'}}>Bukti Foto Pengerjaan :</Text>
             {ticket.action[0] &&
             <Image
             key={ticket.action[0].image.length > 0 ? `https://simpletabadmin.ptab-vps.com` + `${String(imagepengerjaan).replace('public/', '')}` : require('../../../assets/img/ImageLoading.gif')}
                 source={ticket.action[0].image.length > 0?{ uri: `https://simpletabadmin.ptab-vps.com` + `${String(imagepengerjaan).replace('public/', '')}`} : require('../../../assets/img/ImageLoading.gif') }
                 style={{ height : 220, width : 280 }} 
                 // onLoadEnd={() => setLoadingImage(false)}
                 // onLoadStart={() => setLoadingImage(true)}
             />
         } */}

                      {/* <Text onPress={()=>console.log('data ticket ini',ticket.action[0].image)}>Test</Text> */}
                      {ticket.status != 'pending' && (
                        <View>
                          <DataView title="Foto Sebelum" />
                          <Modal
                            visible={ShowImagePrework}
                            transparent={true}
                            enablePreload={true}
                            onRequestClose={() => setShowImagePrework(false)}
                            onDoubleClick={() => setShowImagePrework(true)}>
                            <ImageViewer imageUrls={imagesPrework} />
                          </Modal>
                          <TouchableHighlight
                            onPress={
                              fotosebelum != null
                                ? () => {
                                    setShowImagePrework(true);
                                  }
                                : null
                            }>
                            <ImageBackground
                              source={require('../../../assets/img/ImageLoading.gif')}
                              style={{height: 220, width: 280}}>
                              <Image
                                style={{
                                  height: 220,
                                  width: 280,
                                  marginVertical: 10,
                                }}
                                source={{
                                  uri:
                                    `https://simpletabadmin.ptab-vps.com` +
                                    `${String(fotosebelum).replace(
                                      'public/',
                                      '',
                                    )}?time="${new Date()}`,
                                }}
                              />
                            </ImageBackground>
                          </TouchableHighlight>
                          <Distance distanceV={5} />

                          {fotoalat != null && (
                            <View>
                              <DataView title="Foto Tools" />
                              <Modal
                                visible={ShowImageTools}
                                transparent={true}
                                enablePreload={true}
                                onRequestClose={() => setShowImageTools(false)}
                                onDoubleClick={() => setShowImageTools(true)}>
                                <ImageViewer imageUrls={imagesTools} />
                              </Modal>
                              <View style={{width: '90%'}}>
                                <TouchableHighlight
                                  onPress={
                                    fotoalat != null
                                      ? () => {
                                          setShowImageTools(true);
                                        }
                                      : null
                                  }>
                                  <ScrollView
                                    style={{flexDirection: 'row'}}
                                    horizontal={true}>
                                    <ImageBackground
                                      source={require('../../../assets/img/ImageLoading.gif')}
                                      style={{height: 220, width: 280}}>
                                      {fotoalat &&
                                        fotoalat.map((item, index) => {
                                          return (
                                            <View
                                              key={index}
                                              style={{marginVertical: 5}}>
                                              <Image
                                                key={index}
                                                onLoadEnd={() => {
                                                  setLoadingImage(false);
                                                  console.log(
                                                    String(item).replace(
                                                      'public/',
                                                      '',
                                                    ),
                                                  );
                                                }}
                                                source={{
                                                  uri:
                                                    `https://simpletabadmin.ptab-vps.com` +
                                                    `${String(item).replace(
                                                      'public/',
                                                      '',
                                                    )}?time="${new Date()}`,
                                                }}
                                                style={{
                                                  height: 220,
                                                  width: 280,
                                                  marginRight: 10,
                                                  resizeMode: 'stretch',
                                                }}
                                              />
                                            </View>
                                          );
                                        })}
                                    </ImageBackground>
                                  </ScrollView>
                                </TouchableHighlight>
                              </View>
                              <Distance distanceV={5} />
                            </View>
                          )}
                          {/* <DataView title='Foto Alat'/>
             <Modal visible={ShowImageTools} transparent={true} enablePreload={true}
                     onRequestClose={() => setShowImageTools(false)}
                     onDoubleClick={() => setShowImageTools(true)}
                 >
                     <ImageViewer imageUrls={imagesTools}/>
                 </Modal>
             <TouchableHighlight onPress ={fotoalat != null ? () =>{ setShowImageTools(true);} : null}>
                 <ImageBackground source={require('../../../assets/img/ImageLoading.gif') } style={{ height : 220, width : 280}} >
                     <Image 
                         style={{height : 220, width : 280, marginVertical : 10}} 
                         source = {{uri : `https://simpletabadmin.ptab-vps.com` + `${String(fotoalat).replace('public/', '')}?time="${new Date()}`}}
                     />
                 </ImageBackground>
             </TouchableHighlight> */}
                          <Distance distanceV={5} />
                        </View>
                      )}
                      {fotopengerjaan != null && (
                        <View>
                          <DataView title="Foto Pengerjaan" />
                          <Modal
                            visible={ShowImagePengerjaan}
                            transparent={true}
                            enablePreload={true}
                            onRequestClose={() => setShowImagePengerjaan(false)}
                            onDoubleClick={() => setShowImagePengerjaan(true)}>
                            <ImageViewer imageUrls={imagesPengerjaan} />
                          </Modal>
                          <View style={{width: '90%'}}>
                            <TouchableHighlight
                              onPress={
                                fotopengerjaan != null
                                  ? () => {
                                      setShowImagePengerjaan(true);
                                    }
                                  : null
                              }>
                              <ScrollView
                                style={{flexDirection: 'row'}}
                                horizontal={true}>
                                <ImageBackground
                                  source={require('../../../assets/img/ImageLoading.gif')}
                                  style={{height: 220, width: 280}}>
                                  {fotopengerjaan &&
                                    fotopengerjaan.map((item, index) => {
                                      return (
                                        <View
                                          key={index}
                                          style={{marginVertical: 5}}>
                                          <Image
                                            key={index}
                                            onLoadEnd={() => {
                                              setLoadingImage(false);
                                              console.log('end');
                                            }}
                                            source={{
                                              uri:
                                                `https://simpletabadmin.ptab-vps.com` +
                                                `${String(item).replace(
                                                  'public/',
                                                  '',
                                                )}?time="${new Date()}`,
                                            }}
                                            style={{
                                              height: 220,
                                              width: 280,
                                              marginRight: 10,
                                              resizeMode: 'stretch',
                                            }}
                                          />
                                        </View>
                                      );
                                    })}
                                </ImageBackground>
                              </ScrollView>
                            </TouchableHighlight>
                          </View>
                          <Distance distanceV={5} />
                        </View>
                      )}
                      {ticket.status == 'close' && (
                        <View>
                          <DataView title="Foto Selesai" />
                          <Modal
                            visible={ShowImageDone}
                            transparent={true}
                            enablePreload={true}
                            onRequestClose={() => setShowImageDone(false)}
                            onDoubleClick={() => setShowImageDone(true)}>
                            <ImageViewer imageUrls={imagesDone} />
                          </Modal>
                          <View style={{width: '90%'}}>
                            <TouchableHighlight
                              onPress={
                                fotoselesai != null
                                  ? () => {
                                      setShowImageDone(true);
                                    }
                                  : null
                              }>
                              <ScrollView
                                style={{flexDirection: 'row'}}
                                horizontal={true}>
                                <ImageBackground
                                  source={require('../../../assets/img/ImageLoading.gif')}
                                  style={{height: 220, width: 280}}>
                                  {fotoselesai &&
                                    fotoselesai.map((item, index) => {
                                      return (
                                        <View
                                          key={index}
                                          style={{marginVertical: 5}}>
                                          <Image
                                            key={index}
                                            onLoadEnd={() => {
                                              setLoadingImage(false);
                                              console.log('end');
                                            }}
                                            source={{
                                              uri:
                                                `https://simpletabadmin.ptab-vps.com` +
                                                `${String(item).replace(
                                                  'public/',
                                                  '',
                                                )}?time="${new Date()}`,
                                            }}
                                            style={{
                                              height: 220,
                                              width: 280,
                                              marginRight: 10,
                                              resizeMode: 'stretch',
                                            }}
                                          />
                                        </View>
                                      );
                                    })}
                                </ImageBackground>
                              </ScrollView>
                            </TouchableHighlight>
                          </View>
                        </View>
                      )}
                    </View>
                  )}
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        <Footer navigation={navigation} focus="Home" />
      </ImageBackground>
      {onFullScreen && (
        <View style={{width: '100%', height: '100%'}}>
          <VideoPlayer
            src={{
              uri:
                `https://simpletabadmin.ptab-vps.com` +
                `${String(ticket.video).replace('public/', '')}`,
            }}
            onFullScreen={() => setOnFullScreen(false)}
            onLoad={() => {
              setLoadingVideo(loadingVideo ? false : true);
              return loadingVideo;
            }}
          />
        </View>
      )}
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

export default ViewTicket;
