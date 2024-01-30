import {
  faCamera,
  faPlusCircle,
  faTrash,
  faUndo,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  PermissionsAndroid,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Config from 'react-native-config';
import RNFetchBlob from 'rn-fetch-blob';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Select2 from 'react-native-select-two';
import {useSelector} from 'react-redux';
import {
  Btn,
  Footer,
  HeaderInput,
  Spinner,
  Txt,
  TxtArea,
} from '../../../component';
import Button from '../../../component/Button';
import {colors, Distance} from '../../../utils';

const ButtonImage = props => {
  const [qty, setQty] = useState(props.qty);
  // const [show, setShow] = useState(true)
  var myloop = [];
  // if(props.oldImage.length > 0){
  // }
  const [imagePengerjaan, setImagePengerjaan] = useState(props.imagePengerjaan);
  useEffect(() => {
    setImagePengerjaan(props.imagePengerjaan);
  }, [props]);
  for (let index = 0; index < qty; index++) {
    myloop.push(
      <View key={index}>
        {/* <Text onPress={()=>console.log(props.imagePengerjaan[index].uri)}>{props.test}</Text> */}

        <View style={{marginVertical: 10, height: 200, alignItems: 'center'}}>
          <ImageBackground
            source={require('../../../assets/img/ImageLoading.gif')}
            style={{width: '100%', height: 200, alignItems: 'center'}}>
            {/* <Text>{props.oldImage[index]}</Text> */}
            <Image
              style={{width: '90%', height: 200}}
              // source={props.dataImage[index]==null ? require('../../../assets/img/ImageFoto.png') :{uri: props.dataImage[index].uri}}
              source={
                props.imagePengerjaan[index].uri == ''
                  ? require('../../../assets/img/ImageFoto.png')
                  : {
                      uri:
                        props.imagePengerjaan[index].from == 'local'
                          ? props.imagePengerjaan[index].uri
                          : `https://simpletabadmin.ptab-vps.com/` +
                            `${String(props.imagePengerjaan[index].uri).replace(
                              'public/',
                              '',
                            )}?time="${new Date()}`,
                    }
              }
            />
            {/* {console.log('lloo'+props.imagePengerjaan[index].base64)} */}
          </ImageBackground>
        </View>

        {props.imagePengerjaan[index].uri == '' && (
          <View style={{alignItems: 'center'}}>
            <Button
              onPress={() => {
                props.Image(index);
              }}
              title="Ambil Foto"
              width="80%"
              backgroundColor="#1DA0E0"
              icon={<FontAwesomeIcon icon={faCamera} color="#ffffff" />}
            />
          </View>
        )}
      </View>,
    );
  }

  return (
    <View>
      {myloop}
      <View style={{alignItems: 'center'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            marginVertical: 10,
          }}>
          {props.imagePengerjaan[qty - 1].uri != '' && (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.success,
                paddingHorizontal: 10,
                borderRadius: 5,
              }}
              onPress={() => {
                props.addImageIndex();
                setQty(qty + 1);
              }}>
              <FontAwesomeIcon
                icon={faPlusCircle}
                size={20}
                color={'#FFFFFF'}
              />
              <Text
                style={{
                  color: '#ffffff',
                  fontWeight: 'bold',
                  fontSize: 15,
                  marginLeft: 3,
                }}>
                Tambah
              </Text>
            </TouchableOpacity>
          )}
          <View style={{marginHorizontal: 3}} />
          <TouchableOpacity
            style={{
              backgroundColor: colors.delete,
              flexDirection: 'row',
              paddingHorizontal: 10,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            }}
            onPress={() => {
              qty > 1 ? setQty(qty - 1) : null;
              props.deleteImage(props.imagePengerjaan.length - 1);
            }}>
            <FontAwesomeIcon icon={faTrash} size={17} color={'#FFFFFF'} />
            <Text
              style={{
                color: '#ffffff',
                fontWeight: 'bold',
                fontSize: 15,
                marginLeft: 3,
              }}>
              Delete{' '}
            </Text>
          </TouchableOpacity>
          <View style={{marginHorizontal: 3}} />
          <TouchableOpacity
            style={{
              backgroundColor: colors.detail,
              flexDirection: 'row',
              paddingHorizontal: 10,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            }}
            onPress={() => {
              setQty(1);
              props.resetImage();
            }}>
            <FontAwesomeIcon icon={faUndo} size={17} color={'#FFFFFF'} />
            <Text style={{color: '#ffffff', fontWeight: 'bold'}}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const ButtonImageDone = props => {
  const [qtydone, setQtyDone] = useState(1);
  const [showDone, setShowDone] = useState(true);
  var myloopdone = [];
  for (let indexdone = 0; indexdone < qtydone; indexdone++) {
    myloopdone.push(
      <View key={indexdone}>
        <View style={{marginVertical: 10, height: 200, alignItems: 'center'}}>
          <Image
            style={{width: '90%', height: 200}}
            // source={props.dataImage[index]==null ? require('../../../assets/img/ImageFoto.png') :{uri: props.dataImage[index].uri}}
            source={
              props.image_done[indexdone].uri == ''
                ? require('../../../assets/img/ImageFoto.png')
                : {
                    uri:
                      props.image_done[indexdone].from == 'local'
                        ? props.image_done[indexdone].uri
                        : `https://simpletabadmin.ptab-vps.com/` +
                          `${String(props.image_done[indexdone].uri).replace(
                            'public/',
                            '',
                          )}?time="${new Date()}`,
                  }
            }
          />
        </View>
        {props.image_done[indexdone].uri == '' && (
          <View style={{alignItems: 'center'}}>
            <Button
              onPress={() => {
                props.ImageDone(indexdone);
                props.image_done ? setShowDone(false) : null;
              }}
              title="Ambil Foto"
              width="80%"
              backgroundColor="#1DA0E0"
              icon={<FontAwesomeIcon icon={faCamera} color="#ffffff" />}
            />
          </View>
        )}
      </View>,
    );
  }

  return (
    <View>
      {myloopdone}
      <View style={{alignItems: 'center'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            marginVertical: 10,
          }}>
          {props.image_done[qtydone - 1].uri != '' && (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.success,
                paddingHorizontal: 10,
                borderRadius: 5,
              }}
              onPress={() => {
                props.addImageDoneIndex();
                setQtyDone(qtydone + 1);
                setShowDone(true);
              }}>
              <FontAwesomeIcon
                icon={faPlusCircle}
                size={20}
                color={'#FFFFFF'}
              />
              <Text
                style={{
                  color: '#ffffff',
                  fontWeight: 'bold',
                  fontSize: 15,
                  marginLeft: 3,
                }}>
                Tambah
              </Text>
            </TouchableOpacity>
          )}
          <View style={{marginHorizontal: 3}} />
          <TouchableOpacity
            style={{
              backgroundColor: colors.delete,
              flexDirection: 'row',
              paddingHorizontal: 10,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            }}
            onPress={() => {
              qtydone > 1
                ? setQtyDone(qtydone - 1)
                : alert('data tidak boleh dihapus');
              props.deleteImageDone();
            }}>
            <FontAwesomeIcon icon={faTrash} size={17} color={'#FFFFFF'} />
            <Text
              style={{
                color: '#ffffff',
                fontWeight: 'bold',
                fontSize: 15,
                marginLeft: 3,
              }}>
              Delete{' '}
            </Text>
          </TouchableOpacity>
          <View style={{marginHorizontal: 3}} />
          <TouchableOpacity
            style={{
              backgroundColor: colors.detail,
              flexDirection: 'row',
              paddingHorizontal: 10,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            }}
            onPress={() => {
              setQtyDone(1);
              props.resetImageDone();
            }}>
            <FontAwesomeIcon icon={faUndo} size={17} color={'#FFFFFF'} />
            <Text style={{color: '#ffffff', fontWeight: 'bold'}}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const ButtonImageTool = props => {
  const [qtyTool, setQtyTool] = useState(props.qty);
  const [showTool, setShowTool] = useState(true);
  var mylooptool = [];
  for (let indexTool = 0; indexTool < qtyTool; indexTool++) {
    mylooptool.push(
      <View key={indexTool}>
        <View style={{marginVertical: 10, height: 200, alignItems: 'center'}}>
          <Image
            style={{width: '90%', height: 200}}
            // source={props.dataImage[index]==null ? require('../../../assets/img/ImageFoto.png') :{uri: props.dataImage[index].uri}}
            source={
              props.image_tool[indexTool].uri == ''
                ? require('../../../assets/img/ImageFoto.png')
                : {
                    uri:
                      props.image_tool[indexTool].from == 'local'
                        ? props.image_tool[indexTool].uri
                        : `https://simpletabadmin.ptab-vps.com/` +
                          `${String(props.image_tool[indexTool].uri).replace(
                            'public/',
                            '',
                          )}?time="${new Date()}`,
                  }
            }
          />
        </View>
        {props.image_tool[indexTool].uri == '' && (
          <View style={{alignItems: 'center'}}>
            <Button
              onPress={() => {
                props.ImageTool(indexTool);
                props.image_tool ? setShowTool(false) : null;
              }}
              title="Ambil Foto"
              width="80%"
              backgroundColor="#1DA0E0"
              icon={<FontAwesomeIcon icon={faCamera} color="#ffffff" />}
            />
          </View>
        )}
      </View>,
    );
  }

  return (
    <View>
      {mylooptool}
      <View style={{alignItems: 'center'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            marginVertical: 10,
          }}>
          {props.image_tool[qtyTool - 1].uri != '' && (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.success,
                paddingHorizontal: 10,
                borderRadius: 5,
              }}
              onPress={() => {
                props.addImageToolIndex();
                setQtyTool(qtyTool + 1);
                setShowTool(true);
              }}>
              <FontAwesomeIcon
                icon={faPlusCircle}
                size={20}
                color={'#FFFFFF'}
              />
              <Text
                style={{
                  color: '#ffffff',
                  fontWeight: 'bold',
                  fontSize: 15,
                  marginLeft: 3,
                }}>
                Tambah
              </Text>
            </TouchableOpacity>
          )}
          <View style={{marginHorizontal: 3}} />
          <TouchableOpacity
            style={{
              backgroundColor: colors.delete,
              flexDirection: 'row',
              paddingHorizontal: 10,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            }}
            onPress={() => {
              qtyTool > 1
                ? setQtyTool(qtyTool - 1)
                : alert('data tidak boleh dihapus');
              props.deleteImageTool();
            }}>
            <FontAwesomeIcon icon={faTrash} size={17} color={'#FFFFFF'} />
            <Text
              style={{
                color: '#ffffff',
                fontWeight: 'bold',
                fontSize: 15,
                marginLeft: 3,
              }}>
              Delete{' '}
            </Text>
          </TouchableOpacity>
          <View style={{marginHorizontal: 3}} />
          <TouchableOpacity
            style={{
              backgroundColor: colors.detail,
              flexDirection: 'row',
              paddingHorizontal: 10,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            }}
            onPress={() => {
              setQtyTool(1);
              props.resetImageTool();
            }}>
            <FontAwesomeIcon icon={faUndo} size={17} color={'#FFFFFF'} />
            <Text style={{color: '#ffffff', fontWeight: 'bold'}}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const editstatus = ({navigation, route}) => {
  const image = require('../../../assets/img/BackgroundInput.png');
  const action = route.params.item;
  const USER = useSelector(state => state.UserReducer);
  const TOKEN = useSelector(state => state.TokenReducer);
  const [test, setTest] = useState('halo 1 ');
  const [imgDone, setImgDone] = useState([]);
  const [countImagePengerjaan, setcountImagePengerjaan] = useState('0');
  const [imagePengerjaan, setImagePengerjaan] = useState(
    action.image
      ? JSON.parse(action.image).map(item => {
          let data = {
            base64: '',
            fileName: '',
            fileSize: 0,
            height: 0,
            type: '',
            uri: item,
            width: 0,
            from: 'api',
          };

          return data;
        })
      : [
          {
            base64: '',
            fileName: '',
            fileSize: 0,
            height: 0,
            type: '',
            uri: '',
            width: 0,
            from: '',
          },
        ],
  );
  const [loading, setLoading] = useState(false);
  // const [responses, setResponses] = useState([]);
  const [response_prework, set_response_prework] = useState({
    base64: '',
    fileName: '',
    fileSize: 0,
    height: 0,
    type: '',
    uri: action.image_prework,
    width: 0,
    from: 'api',
  });

  const [responses_tools, set_response_tools] = useState(
    action.image_tools
      ? JSON.parse(action.image_tools).map(item => {
          let data = {
            base64: '',
            fileName: '',
            fileSize: 0,
            height: 0,
            type: '',
            uri: item,
            width: 0,
            from: 'api',
          };

          return data;
        })
      : [
          {
            base64: '',
            fileName: '',
            fileSize: 0,
            height: 0,
            type: '',
            uri: '',
            width: 0,
            from: '',
          },
        ],
  );

  const [responses_done, setResponsesDone] = useState(
    action.image_done
      ? JSON.parse(action.image_done).map(item => {
          let data = {
            base64: '',
            fileName: '',
            fileSize: 0,
            height: 0,
            type: '',
            uri: item,
            width: 0,
            from: 'api',
          };

          return data;
        })
      : [
          {
            base64: '',
            fileName: '',
            fileSize: 0,
            height: 0,
            type: '',
            uri: '',
            width: 0,
            from: '',
          },
        ],
  );
  // const [updateImagePengerjaan, setUpdateImagePengerjaan]= useState(false)
  const [form, setForm] = useState({
    action_id: action.id,
    status: action.status == 'pending' ? 'active' : action.status,
    memo: action.memo ? action.memo : '',
  });
  if (action.status == 'pending') {
    var dataStatus = [
      // {'id' : 'close','name' : 'Close'},
      {id: 'active', name: 'Active'},
    ];
  } else if (action.status == 'close') {
    var dataStatus = [
      {id: 'close', name: 'Close'},
      // {'id' : 'active','name' : 'Active'},
    ];
  }
  // else if(action.status == 'active'){

  //     if(action.image_prework && action.image_tools){
  //         var dataStatus = [
  //             {'id' : 'active','name' : 'Active'},
  //             {'id' : 'close','name' : 'Close'},
  //         ]
  //     }else{
  //         var dataStatus = [
  //             {'id' : 'active','name' : 'Active'},
  //         ]
  //     }
  // }
  else if (action.status == 'active') {
    if (action.image == '') {
      var dataStatus = [{id: 'active', name: 'Active'}];
    } else {
      var dataStatus = [
        {id: 'close', name: 'Close'},
        {id: 'active', name: 'Active'},
      ];
    }
  }

  useEffect(() => {
    console.log('000000');
    requestCameraPermission();
    console.log(action);
  }, []);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App need to use camera access to take an Image',
          //   buttonNeutral: "Ask Me Later",
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getImageGalery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
        maxHeight: 500,
        maxWidth: 500,
      },
      response => {
        if (response.assets) {
          let dataImage = response.assets[0];
          setResponses([...responses, dataImage]);
        }
      },
    );
  };

  const getImagePreWork = index => {
    launchCamera(
      {
        mediaType: 'photo',
        includeBase64: true,
        maxHeight: 500,
        maxWidth: 500,
      },
      response => {
        if (response.assets) {
          let dataImage = response.assets[0];
          // console.log('tes12 : '+response_prework);
          // const initialState = response_prework.map(obj => obj);
          dataImage.from = 'local';
          // setResponses([...responses, dataImage])
          if (response_prework[index]) {
            initialState[index] = dataImage;
            // imagePengerjaan[index] = dataImage
            // setImagePengerjaan([...imagePengerjaan, imagePengerjaan[index] = dataImage])
            // setImagePengerjaanUri([...imagePengerjaanUri, imagePengerjaanUri[index] = dataImage.uri])
            // setResponses([...responses])

            set_response_prework(initialState);
            setTest('Halo 2');
          } else {
            set_response_prework([...response_prework, dataImage]);
            // setImagePengerjaanUri([...imagePengerjaanUri, dataImage.uri])
          }
        }
      },
    );
    // alert(index)
  };

  const getImage = index => {
    Alert.alert('Bukti Foto', `Galery atau Camera? `, [
      {
        text: 'Galery',
        onPress: () =>
          launchImageLibrary(
            {
              mediaType: 'photo',
              includeBase64: true,
              maxHeight: 500,
              maxWidth: 500,
            },
            response => {
              if (response.assets) {
                let dataImage = response.assets[0];
                const initialState = imagePengerjaan.map(obj => obj);
                dataImage.from = 'local';
                // setResponses([...responses, dataImage])
                if (imagePengerjaan[index]) {
                  initialState[index] = dataImage;
                  // imagePengerjaan[index] = dataImage
                  // setImagePengerjaan([...imagePengerjaan, imagePengerjaan[index] = dataImage])
                  // setImagePengerjaanUri([...imagePengerjaanUri, imagePengerjaanUri[index] = dataImage.uri])
                  // setResponses([...responses])

                  setImagePengerjaan(initialState);
                  setTest('Halo 2');
                } else {
                  setImagePengerjaan([...imagePengerjaan, dataImage]);
                  // setImagePengerjaanUri([...imagePengerjaanUri, dataImage.uri])
                }
              }
            },
          ),
      },
      {
        text: 'Camera',
        onPress: () =>
          launchCamera(
            {
              mediaType: 'photo',
              includeBase64: true,
              maxHeight: 500,
              maxWidth: 500,
            },
            response => {
              if (response.assets) {
                let dataImage = response.assets[0];
                const initialState = imagePengerjaan.map(obj => obj);
                dataImage.from = 'local';
                // setResponses([...responses, dataImage])
                if (imagePengerjaan[index]) {
                  initialState[index] = dataImage;
                  // imagePengerjaan[index] = dataImage
                  // setImagePengerjaan([...imagePengerjaan, imagePengerjaan[index] = dataImage])
                  // setImagePengerjaanUri([...imagePengerjaanUri, imagePengerjaanUri[index] = dataImage.uri])
                  // setResponses([...responses])

                  setImagePengerjaan(initialState);
                  setTest('Halo 2');
                } else {
                  setImagePengerjaan([...imagePengerjaan, dataImage]);
                  // setImagePengerjaanUri([...imagePengerjaanUri, dataImage.uri])
                }
              }
            },
          ),
        // alert(index)
      },
    ]);
  };
  // image index pengerjaan
  const addImageIndex = () => {
    setImagePengerjaan([
      ...imagePengerjaan,
      {
        base64: '',
        fileName: '',
        fileSize: 0,
        height: 0,
        type: '',
        uri: '',
        width: 0,
        from: '',
      },
    ]);
  };

  const addImageDoneIndex = index => {
    setResponsesDone([
      ...responses_done,
      {
        base64: '',
        fileName: '',
        fileSize: 0,
        height: 0,
        type: '',
        uri: '',
        width: 0,
        from: '',
      },
    ]);
  };

  const addImageToolIndex = index => {
    set_response_tools([
      ...responses_tools,
      {
        base64: '',
        fileName: '',
        fileSize: 0,
        height: 0,
        type: '',
        uri: '',
        width: 0,
        from: '',
      },
    ]);
  };

  const getImageDone = index => {
    Alert.alert('Bukti Foto', `Galery atau Camera? `, [
      {
        text: 'Galery',
        onPress: () =>
          launchImageLibrary(
            {
              mediaType: 'photo',
              includeBase64: true,
              maxHeight: 500,
              maxWidth: 500,
            },
            response => {
              if (response.assets) {
                let dataImage = response.assets[0];
                const initialState = responses_done.map(obj => obj);
                dataImage.from = 'local';
                // setResponses([...responses, dataImage])
                if (responses_done[index]) {
                  initialState[index] = dataImage;
                  // imagePengerjaan[index] = dataImage
                  // setImagePengerjaan([...imagePengerjaan, imagePengerjaan[index] = dataImage])
                  // setImagePengerjaanUri([...imagePengerjaanUri, imagePengerjaanUri[index] = dataImage.uri])
                  // setResponses([...responses])

                  setResponsesDone(initialState);
                  setTest('Halo 2');
                } else {
                  setResponsesDone([...responses_done, dataImage]);
                  // setImagePengerjaanUri([...imagePengerjaanUri, dataImage.uri])
                }
              }
            },
          ),
      },
      {
        text: 'Camera',
        onPress: () =>
          launchCamera(
            {
              mediaType: 'photo',
              includeBase64: true,
              maxHeight: 500,
              maxWidth: 500,
            },
            response => {
              if (response.assets) {
                let dataImage = response.assets[0];
                const initialState = responses_done.map(obj => obj);
                dataImage.from = 'local';
                // setResponses([...responses, dataImage])
                if (responses_done[index]) {
                  initialState[index] = dataImage;
                  // imagePengerjaan[index] = dataImage
                  // setImagePengerjaan([...imagePengerjaan, imagePengerjaan[index] = dataImage])
                  // setImagePengerjaanUri([...imagePengerjaanUri, imagePengerjaanUri[index] = dataImage.uri])
                  // setResponses([...responses])

                  setResponsesDone(initialState);
                  setTest('Halo 2');
                } else {
                  setResponsesDone([...responses_done, dataImage]);
                  // setImagePengerjaanUri([...imagePengerjaanUri, dataImage.uri])
                }
              }
            },
          ),
      },
    ]);
  };

  const getImageTool = index => {
    Alert.alert('Bukti Foto', `Galery atau Camera? `, [
      {
        text: 'Galery',
        onPress: () =>
          launchImageLibrary(
            {
              mediaType: 'photo',
              includeBase64: true,
              maxHeight: 500,
              maxWidth: 500,
            },
            response => {
              if (response.assets) {
                let dataImage = response.assets[0];
                const initialState = responses_tools.map(obj => obj);
                dataImage.from = 'local';
                // setResponses([...responses, dataImage])
                if (responses_tools[index]) {
                  initialState[index] = dataImage;
                  // imagePengerjaan[index] = dataImage
                  // setImagePengerjaan([...imagePengerjaan, imagePengerjaan[index] = dataImage])
                  // setImagePengerjaanUri([...imagePengerjaanUri, imagePengerjaanUri[index] = dataImage.uri])
                  // setResponses([...responses])

                  set_response_tools(initialState);
                  setTest('Halo 2');
                } else {
                  set_response_tools([...responses_done, dataImage]);
                  // setImagePengerjaanUri([...imagePengerjaanUri, dataImage.uri])
                }
              }
            },
          ),
      },
      {
        text: 'Camera',
        onPress: () =>
          launchCamera(
            {
              mediaType: 'photo',
              includeBase64: true,
              maxHeight: 500,
              maxWidth: 500,
            },
            response => {
              if (response.assets) {
                let dataImage = response.assets[0];
                const initialState = responses_tools.map(obj => obj);
                dataImage.from = 'local';
                // setResponses([...responses, dataImage])
                if (responses_tools[index]) {
                  initialState[index] = dataImage;
                  // imagePengerjaan[index] = dataImage
                  // setImagePengerjaan([...imagePengerjaan, imagePengerjaan[index] = dataImage])
                  // setImagePengerjaanUri([...imagePengerjaanUri, imagePengerjaanUri[index] = dataImage.uri])
                  // setResponses([...responses])

                  set_response_tools(initialState);
                  setTest('Halo 2');
                } else {
                  set_response_tools([...responses_tools, dataImage]);
                  // setImagePengerjaanUri([...imagePengerjaanUri, dataImage.uri])
                }
              }
            },
          ),
      },
    ]);
  };

  const handleForm = (key, value) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  const deleteImage = index => {
    // alert('delete')
    if (imagePengerjaan.length == 1) {
      setImagePengerjaan([
        {
          base64: '',
          fileName: '',
          fileSize: 0,
          height: 0,
          type: '',
          uri: '',
          width: 0,
          from: '',
        },
      ]);
    }
    if (imagePengerjaan.length > 1) {
      const lastIndex = imagePengerjaan.length - 1;
      setImagePengerjaan(
        imagePengerjaan.filter((item, index) => index !== lastIndex),
      );
    }
  };

  const deleteImageDone = () => {
    if (responses_done.length == 1) {
      setResponsesDone([
        {
          base64: '',
          fileName: '',
          fileSize: 0,
          height: 0,
          type: '',
          uri: '',
          width: 0,
          from: '',
        },
      ]);
    }
    if (responses_done.length > 1) {
      const lastIndex = responses_done.length - 1;
      setResponsesDone(
        responses_done.filter((item, index) => index !== lastIndex),
      );
    }
  };

  const deleteImageTool = () => {
    if (responses_done.length == 1) {
      set_response_tools([
        {
          base64: '',
          fileName: '',
          fileSize: 0,
          height: 0,
          type: '',
          uri: '',
          width: 0,
          from: '',
        },
      ]);
    }
    if (responses_tools.length > 1) {
      const lastIndex = responses_tools.length - 1;
      set_response_tools(
        responses_tools.filter((item, index) => index !== lastIndex),
      );
    }
  };

  const resetImage = () => {
    if (imagePengerjaan.length > 0) {
      setImagePengerjaan([
        {
          base64: '',
          fileName: '',
          fileSize: 0,
          height: 0,
          type: '',
          uri: '',
          width: 0,
          from: '',
        },
      ]);
    }
  };

  const resetImageDone = () => {
    if (responses_done.length > 0) {
      setResponsesDone([
        {
          base64: '',
          fileName: '',
          fileSize: 0,
          height: 0,
          type: '',
          uri: '',
          width: 0,
          from: '',
        },
      ]);
    }
  };

  const resetImageTool = () => {
    if (responses_tools.length > 0) {
      set_response_tools([
        {
          base64: '',
          fileName: '',
          fileSize: 0,
          height: 0,
          type: '',
          uri: '',
          width: 0,
          from: '',
        },
      ]);
    }
  };

  const handleAction = () => {
    let dataUpload = [];
    let dataQtyImage = 1;
    let sendData = false;
    if (form.action_id != '' && form.memo != '' && response_prework.uri != '') {
      setLoading(true);
      dataUpload = [
        {
          name: 'form',
          data: JSON.stringify(form),
        },
      ];

      if (action.status == 'pending') {
        // if(imagePengerjaan.length ==2){

        if (action.status == 'pending' && response_prework.base64 == '') {
          alert('Foto Sebelum Pengerjaan Tidak Boleh Kosong');
          setLoading(false);
        } else {
          dataUpload.push({
            name: 'image_prework',
            filename: response_prework.fileName,
            data: response_prework.base64,
          });

          sendData = true;
        }
        // }else{
        //     // image kurang dari 2
        //     alert('Foto Pengerjaan tidak boleh Kurang atau Lebih dari 2');
        //     setLoading(false)
        // }
      } else if (action.status == 'active' && form.status == 'active') {
        // alert('active')

        // for(let index = 0; index < imagePengerjaan.length; index++){
        //     if(action.status == 'pending' ){
        //         if(imagePengerjaan[index].fileName !='' && imagePengerjaan[index].base64 !=''){
        //             dataUpload.push({
        //                 'name' : 'image' + dataQtyImage,
        //                 'filename' : imagePengerjaan[index].fileName,
        //                 'data' : imagePengerjaan[index].base64
        //             })

        //             dataQtyImage++;
        //         }else{
        //             alert('image no ' + dataQtyImage + ' tidak ditemukan');
        //             setLoading(false)
        //             sendData= false
        //             break;
        //         }
        //     }else{
        //         dataUpload.push({
        //             'name' : 'image' + dataQtyImage,
        //             'filename' : imagePengerjaan[index].fileName,
        //             'data' : imagePengerjaan[index].base64
        //         })

        //         dataQtyImage++;
        //     }
        // }

        //    if(action.status == 'active' && responses_tools.base64 ==''){
        //         alert('Foto Alat Pengerjaan Tidak Boleh Kosong')
        //         setLoading(false)
        //    }else{

        //     dataUpload.push(    {
        //         'name' : 'image_tools' ,
        //         'filename' : responses_tools.fileName,
        //         'data' : responses_tools.base64
        //     });
        //     alert('check 2')
        //         sendData = true
        //    }
        // console.log('testaaa '+action.image_tools)
        let dataQtyImagePengerjaan = 1;
        // console.log('data test '+ JSON.stringify(dataUpload))
        if (imagePengerjaan.length >= 2 && imagePengerjaan.length <= 4) {
          // console.log('test'+imagePengerjaan.length);
          for (let index = 0; index < imagePengerjaan.length; index++) {
            if (imagePengerjaan[index]) {
              // console.log('abcd test '+responses_tools.base64)
              dataUpload.push({
                name: 'image' + dataQtyImagePengerjaan,
                filename: imagePengerjaan[index].fileName,
                data: imagePengerjaan[index].base64,
              });
              dataQtyImagePengerjaan++;
            } else {
              // console.log('ffggg '+imagePengerjaan[index].base64);
              alert('image no ' + dataQtyImagePengerjaan + ' tidak ditemukan');
              setLoading(false);
              break;
            }
          }
          dataUpload.push({
            name: 'countImagePengerjaan',
            data: JSON.stringify(imagePengerjaan.length),
          });

          // console.log('kkk '+imagePengerjaan.length)

          // alert('check 4')
          // sendData= true;
        } else {
          alert('Foto Pengerjaan Harus 2-4');
          setLoading(false);
        }

        // test baru
        let dataQtyImageTool = 1;
        // console.log('data test '+ JSON.stringify(dataUpload))
        if (responses_tools.length >= 1 && responses_tools.length <= 3) {
          // console.log('test'+imagePengerjaan.length);
          for (let index = 0; index < responses_tools.length; index++) {
            if (responses_tools[index]) {
              // console.log('abcd test '+responses_tools.base64)
              dataUpload.push({
                name: 'image_tools' + dataQtyImageTool,
                filename: responses_tools[index].fileName,
                data: responses_tools[index].base64,
              });
              dataQtyImageTool++;
            } else {
              // console.log('ffggg '+responses_tools[index].base64);
              alert('image no ' + dataQtyImageTool + ' tidak ditemukan');
              setLoading(false);
              break;
            }
          }
          dataUpload.push({
            name: 'countImageTool',
            data: JSON.stringify(responses_tools.length),
          });

          console.log('kkk ' + responses_tools.length);
          // alert('check 4')
          sendData = true;
        } else {
          alert('Foto Pengerjaan Harus 1-3');
          setLoading(false);
        }
      } else {
        // alert('test5');
        let dataQtyImageDone = 1;
        // responses_tools.length >= 1 && responses_tools.length <= 3
        if (responses_done.length >= 2 && responses_done.length <= 6) {
          for (let index = 0; index < responses_done.length; index++) {
            if (responses_done[index].base64) {
              // console.log('abc test '+responses_tools.base64)
              dataUpload.push({
                name: 'image_done' + dataQtyImageDone,
                filename: responses_done[index].fileName,
                data: responses_done[index].base64,
              });

              dataQtyImageDone++;
            } else {
              alert('image no ' + dataQtyImageDone + ' tidak ditemukan');
              setLoading(false);
              break;
            }
          }

          dataUpload.push({
            name: 'countImageDone',
            data: JSON.stringify(responses_done.length),
          });

          sendData = true;
        } else {
          alert('Foto Setelah Pengerjaan Harus 2 - 6');
          setLoading(false);
        }
        // alert('ini untuk status close')
        // setLoading(false)
      }
    } else {
      // form
      alert('Data Belum Lengkap');
      setLoading(false);
    }

    if (sendData) {
      // console.log('data test '+dataUpload[0][0])

      // console.log('abcde test '+imagePengerjaan.length)
      RNFetchBlob.fetch(
        'POST',
        'https://simpletabadmin.ptab-vps.com/api/close/admin1/actionStatusUpdate',
        {
          Authorization: `Bearer ${TOKEN}`,
          otherHeader: 'foo',
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        dataUpload,
      )
        .then(result => {
          setLoading(false);
          let data = JSON.parse(result.data);
          // console.log(result);
          alert(data.message);
          navigation.navigate('Action');
        })
        .catch(e => {
          // console.log(e);
          setLoading(false);
        });
    }
    // setLoading(false)
    console.log(dataUpload);
  };

  const uploadDoneImage = () => {
    // alert('test5');
    let images = [];
    let dataQtyImageDone = 1;
    // responses_tools.length >= 1 && responses_tools.length <= 3
    if (responses_done.length >= 2 && responses_done.length <= 50) {
      for (let index = 0; index < 50; index++) {
        if (responses_done[0].base64) {
          // console.log('abc test '+responses_tools.base64)

          RNFetchBlob.fetch(
            'POST',
            'https://simpletabadmin.ptab-vps.com/api/close/admin/uploadImage',
            {
              Authorization: `Bearer ${TOKEN}`,
              otherHeader: 'foo',
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            },
            [
              {
                name: 'image_done',
                filename: responses_done[0].fileName,
                data: responses_done[0].base64,
              },
              {
                name: 'i',
                data: JSON.stringify(dataQtyImageDone),
              },
              {
                name: 'action_id',
                data: JSON.stringify(form.action_id),
              },
            ],
          )
            .then(result => {
              setLoading(false);
              // alert('tsss3');
              // let data = JSON.parse(result.data);
              images.push(result.data.image);
              // console.log('ini data 2 ', images);
              // alert(data.message);
              // navigation.navigate('Action');
            })
            .catch(e => {
              // console.log(e);
              setLoading(false);
            });
          setImgDone(images);
          dataQtyImageDone++;
        } else {
          alert('image no ' + dataQtyImageDone + ' tidak ditemukan');
          setLoading(false);
          break;
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      {loading && <Spinner />}
      {/* <Text onPress={() => console.log(imagePengerjaan)}>HAHAHAH</Text> */}
      <ImageBackground source={image} style={styles.image}>
        <ScrollView keyboardShouldPersistTaps="always">
          <HeaderInput />
          <View style={{alignItems: 'center'}}>
            <View style={{width: '90%'}}>
              <View style={styles.baseBoxShadow}>
                <View style={styles.boxShadow}>
                  <Txt title="Status" />

                  <Select2
                    searchPlaceHolderText="Cari Status"
                    title={form.status != '' ? form.status : action.status}
                    isSelectSingle
                    style={{
                      borderRadius: 10,
                      borderColor: '#087CDB',
                      borderWidth: 1,
                      height: 50,
                    }}
                    buttonStyle={{
                      backgroundColor: '#0C5CBF',
                      height: 45,
                      borderRadius: 5,
                    }}
                    buttonTextStyle={{
                      color: '#FFFFFF',
                    }}
                    selectedTitleStyle={{
                      color: '#696969',
                    }}
                    colorTheme={'#0C5CBF'}
                    popupTitle="Ubah Status"
                    data={dataStatus}
                    onSelect={data => {
                      setForm({...form, status: data[0]});
                    }}
                    onRemoveItem={data => {
                      setForm({...form, status: data[0]});
                    }}
                    selectButtonText="Simpan"
                    cancelButtonText="Batal"
                  />

                  {/* image upload */}

                  <Txt title="Deskripsi" />
                  <TxtArea
                    placeholder="Masukan Deskripsi"
                    onChangeText={item => handleForm('memo', item)}
                    value={form.memo}
                  />
                  {form.status != 'close' && action.status == 'pending' && (
                    <View>
                      <Txt title="Foto Sebelum Pengerjaan" />
                      <View style={{alignItems: 'center'}}>
                        <ImageBackground
                          source={require('../../../assets/img/ImageLoading.gif')}
                          style={{
                            width: '100%',
                            height: 200,
                            alignItems: 'center',
                          }}>
                          <Image
                            style={{width: '90%', height: 200}}
                            source={
                              response_prework.uri == '' ||
                              response_prework.uri == null
                                ? require('../../../assets/img/ImageFoto.png')
                                : {
                                    uri:
                                      response_prework.from == 'local'
                                        ? response_prework.uri
                                        : `https://simpletabadmin.ptab-vps.com/` +
                                          `${String(
                                            response_prework.uri,
                                          ).replace(
                                            'public/',
                                            '',
                                          )}?time="${new Date()}`,
                                  }
                            }
                          />
                        </ImageBackground>
                        <Distance distanceV={10} />
                        <Button
                          onPress={() =>
                            Alert.alert('Bukti Foto', `Galery atau Camera? `, [
                              {
                                text: 'Galery',
                                onPress: () =>
                                  launchImageLibrary(
                                    {
                                      mediaType: 'photo',
                                      includeBase64: true,
                                      maxHeight: 500,
                                      maxWidth: 500,
                                    },
                                    response => {
                                      if (response.assets) {
                                        let image_prework = response.assets[0];
                                        image_prework['from'] = 'local';
                                        set_response_prework(image_prework);
                                      }
                                    },
                                  ),
                              },
                              {
                                text: 'Camera',
                                onPress: () =>
                                  launchCamera(
                                    {
                                      mediaType: 'photo',
                                      includeBase64: true,
                                      maxHeight: 500,
                                      maxWidth: 500,
                                    },
                                    response => {
                                      // console.log('ini respon', response);
                                      if (response.assets) {
                                        let image_prework = response.assets[0];
                                        image_prework['from'] = 'local';
                                        set_response_prework(image_prework);
                                      }
                                    },
                                  ),
                              },
                            ])
                          }
                          title="Ambil Foto"
                          width="80%"
                          backgroundColor="#1DA0E0"
                          icon={
                            <FontAwesomeIcon icon={faCamera} color="#ffffff" />
                          }
                        />
                      </View>
                    </View>
                  )}
                  {action.status == 'active' && form.status == 'active' && (
                    <View>
                      <Txt title="Foto Pengerjaan" />
                      <ButtonImage
                        test={test}
                        addImageIndex={addImageIndex}
                        imagePengerjaan={imagePengerjaan}
                        Image={getImage}
                        dataImage={imagePengerjaan}
                        deleteImage={() => deleteImage()}
                        resetImage={() => resetImage()}
                        qty={action.image ? JSON.parse(action.image).length : 1}
                      />

                      <Txt title="Foto Alat Pengerjaan" />

                      {/* <ImageBackground source={require('../../../assets/img/ImageLoading.gif') } style={{width:'100%', height: 200, alignItems:'center'}} >
                                            <Image
                                                style={{width:'90%', height: 200}}
                                                source={responses_tools.uri=='' || responses_tools.uri==null ? require('../../../assets/img/ImageFoto.png'): {uri: responses_tools.from=='local' ? responses_tools.uri : `https://simpletabadmin.ptab-vps.com/` + `${String(responses_tools.uri).replace('public/', '')}?time="${new Date()}` }}
                                            />
                                        </ImageBackground>  */}
                      <Distance distanceV={10} />
                      <ButtonImageTool
                        ImageTool={getImageTool}
                        addImageToolIndex={addImageToolIndex}
                        image_tool={responses_tools}
                        deleteImageTool={() => deleteImageTool()}
                        resetImageTool={() => resetImageTool()}
                        qty={
                          action.image_tools
                            ? JSON.parse(action.image_tools).length
                            : 1
                        }
                      />
                      {/* <Button
                                                onPress={() => 
                                                    
                                                    Alert.alert(
                                                        'Bukti Foto',
                                                        `Galery atau Camera? `,
                                                        [
                                                            {
                                                                text : 'Galery',
                                                                onPress : () =>  launchImageLibrary(
                                                                    {
                                                                        mediaType: 'photo',
                                                                        includeBase64: true,
                                                                        maxHeight: 500,
                                                                        maxWidth: 500,
                                                                    },
                                                                    (response) => {
                                                                        if (response.assets) {
                                                                            let image_tools = response.assets[0];
                                                                            image_tools['from'] = 'local';
                                                                            set_response_tools(image_tools);
                                                                        }
                                                                    }
                                                                )
                                                            },
                                                            {
                                                                text : 'Camera',
                                                                onPress : () =>       launchCamera(
                                                                    {
                                                                        mediaType: 'photo',
                                                                        includeBase64:true,
                                                                        maxHeight: 500,
                                                                        maxWidth: 500,
                                                                    },
                                                                    (response) => {
                                                                        // console.log('ini respon', response);
                                                                        if(response.assets){
                                                                            let image_tools = response.assets[0];
                                                                            image_tools['from'] = 'local';
                                                                            set_response_tools(image_tools)
                                                                        
                                                                        }
                                                                    }
                                                                )
                                                            }
                                                        ]
                                                    )
                                                    
                                                    
                                                    
                                                  
                                            
                                            
                                            }
                                                title="Ambil Foto"
                                                width="80%"
                                                backgroundColor='#1DA0E0'
                                                icon = {<FontAwesomeIcon icon={faCamera} color='#ffffff'/>}
                                            /> */}
                    </View>
                  )}
                  {form.status == 'close' && (
                    <View>
                      <Txt title="Foto Setelah Pengerjaan" />
                      <ButtonImageDone
                        ImageDone={getImageDone}
                        addImageDoneIndex={addImageDoneIndex}
                        image_done={responses_done}
                        deleteImageDone={() => deleteImageDone()}
                        resetImageDone={() => resetImageDone()}
                      />
                    </View>
                  )}
                  {action.status != 'close' && (
                    <View style={{alignItems: 'center'}}>
                      <Distance distanceV={10} />
                      <Btn title="Simpan" onPress={uploadDoneImage} />
                    </View>
                  )}
                  {/* <Btn title='Simpan' onPress={()=>console.log('data',form.status)}/> */}
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
      <Footer navigation={navigation} focus="Home" />
    </View>
  );
};

export default editstatus;

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
