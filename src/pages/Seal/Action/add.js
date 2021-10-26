import { faCamera, faPlusCircle, faTrash, faUndo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, PermissionsAndroid, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { launchCamera } from 'react-native-image-picker';
import Select2 from 'react-native-select-two';
import { useSelector } from 'react-redux';
import { Btn, Footer, HeaderInput, Inpt, Spinner, Title, Txt, TxtArea } from '../../../component';
import Button from '../../../component/Button';
import { colors, Distance } from '../../../utils';
import RNFetchBlob from 'react-native-fetch-blob';
import API from '../../../service';

const ButtonImage = (props) => {
    const [qty, setQty] = useState(1)
    const [show, setShow] = useState(true)
    var myloop = [];
    for (let index = 0; index < qty; index++) {
        myloop.push(
            <View key={index} >
                <View style={{ marginVertical: 10, height: 200, alignItems: 'center' }}>
                    <Image
                        style={{ width: '98%', height: 200 }}
                        source={props.dataImage[index] == null ? require('../../../assets/img/ImageFoto.png') : { uri: props.dataImage[index].uri }}
                    />
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Button
                        onPress={() => {
                            props.Image()
                            props.dataImage ? setShow(false) : null

                        }}
                        title="Ambil Foto"
                        width="80%"
                        backgroundColor='#1DA0E0'
                        icon={<FontAwesomeIcon icon={faCamera} color='#ffffff' />}
                    />
                </View>
                <Distance distanceV={5} />
            </View>
        )
    }

    return (

        <View >

            {myloop}
            <View style={{ flexDirection: 'row', alignItems: 'center', width: '80%', marginVertical: 10 }}>
                {(props.dataImage[qty - 1] != null) &&
                    <TouchableOpacity style={{ flexDirection: 'row', height: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.success, paddingHorizontal: 10, borderRadius: 5 }} onPress={() => { setQty(qty + 1); setShow(true) }}>
                        <FontAwesomeIcon icon={faPlusCircle} size={20} color={'#FFFFFF'} />
                        <Text style={{ color: '#ffffff', fontWeight: 'bold', fontSize: 15, marginLeft: 3 }}>Tambah</Text>
                    </TouchableOpacity>
                }
                <View style={{ marginHorizontal: 3 }} />
                <TouchableOpacity style={{ backgroundColor: colors.delete, flexDirection: 'row', paddingHorizontal: 10, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }} onPress={() => { qty > 1 ? setQty(qty - 1) : alert('data tidak boleh dihapus'); props.deleteImage() }}>
                    <FontAwesomeIcon icon={faTrash} size={17} color={'#FFFFFF'} />
                    <Text style={{ color: '#ffffff', fontWeight: 'bold', fontSize: 15, marginLeft: 3 }}>Delete </Text>
                </TouchableOpacity>
                <View style={{ marginHorizontal: 3 }} />
                <TouchableOpacity style={{ backgroundColor: colors.detail, flexDirection: 'row', paddingHorizontal: 10, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }} onPress={() => { setQty(1); props.resetImage() }}>
                    <FontAwesomeIcon icon={faUndo} size={17} color={'#FFFFFF'} />
                    <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>Reset</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const requestCameraPermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: "Cool Photo App Camera Permission",
                message:
                    "Cool Photo App needs access to your camera " +
                    "so you can take awesome pictures.",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // console.log("You can use the camera");
        } else {
            // console.log("Camera permission denied");
        }
    } catch (err) {
        console.warn(err);
    }
};

const AddActionSeal =({navigation, route})=>{
    const imagebg = require('../../../assets/img/BackgroundInput.png')
    DropDownPicker.setListMode("SCROLLVIEW");
    const lockaction = route.params.ticket;
    const TOKEN = useSelector((state) => state.TokenReducer);
    const [loading, setLoading] = useState(false)
    // const [types, setTypes] = useState([{'id' : 'unplug','name' : 'Cabut'},{'id' : 'lock','name' : 'Segel'},{'id' : 'lock_resist','name' : 'Hambatan Segel'},{'id' : 'unplug_resist','name' : 'Hambatan Cabut'}])
    const [types, setTypes] = useState([])
    const [test, setTest] = useState();
    
    const [responses, setResponses] = useState([]);
    const [form, setForm] = useState({
        lock_id : route.params.ticket.id,
        code : '',
        type : '',
        memo :'',
    })
    const [image, setImage] = useState({
        name: null,
        filename: null,
        data: null
    })
    const USER = useSelector((state) => state.UserReducer);
    const handleForm = (key, value) => {
        setForm({
            ...form,
            [key] :value
        })
    }

    useEffect(() => {
        let isAmounted = true
        if (isAmounted) {
            requestCameraPermission()
            Promise.all([API.typeShow(route.params.ticket.id, TOKEN)]).then((result) => {
                if(result[0].data.lockaction == null){
                    setTypes([{'id' : 'lock_resist','name' : 'Hambatan Segel'},{'id' : 'lock','name' : 'Segel'},])
                }
                else if(result[0].data.lockaction.type =="lock_resist"){
                    setTypes([{'id' : 'lock','name' : 'Segel'}])
                }
                else if(result[0].data.lockaction.type =="lock"){
                    setTypes([{'id' : 'unplug_resist','name' : 'Hambatan Cabut'},{'id' : 'unplug','name' : 'Cabut'}])
                }
                else if(result[0].data.lockaction.type =="unplug_resist"){
                    setTypes([{'id' : 'unplug','name' : 'Cabut'}])
                }else{
                    setTypes(null)
                }
                setLoading(false)
            }).catch((e) => {
                console.log(e.request);
                setLoading(false)
            })
        
            
            console.log('tiket',lockaction)
        }
        return () => {
            isAmounted = false
        }
    }, [])

    const getImage = () => {
        launchCamera(
            {
                mediaType: 'photo',
                includeBase64: true,
                maxHeight: 500,
                maxWidth: 500,
            },
            (response) => {
                if (response.assets) {
                    let dataImage = response.assets[0];
                    setResponses([...responses, dataImage])
                }
            }
        )
    }

    const deleteImage = () => {
        if (responses.length > 1) {
            const lastIndex = responses.length - 1;
            setResponses(responses.filter((item, index) => index !== lastIndex));
        }
    }

    const resetImage = () => {
        if (responses.length > 0) {
            setResponses([]);
        }
    }


    const handleData = (position = null) => {
        // console.log('isi form', form);
        let dataUpload = [];
        let data = form;
        // console.log('position', data.lat + ' ' + data.lng);

        let message = 'Mohon lengkapi data';
        let send = false;
        if (responses.length > 0) {
            
                dataUpload =
                    [
                        {
                            name: 'qtyImage',
                            data: JSON.stringify(responses.length)
                        },                        
                        {
                            name: 'form',
                            data: JSON.stringify(form)
                        },
                    ];
                send = true
            

        } else {
            setLoading(false)
            alert('Mohon Lengkapi data ')
        }

        let dataQtyImage = 1;
        for (let index = 0; index < responses.length; index++) {
            dataUpload.push(
                {
                    'name': 'image' + dataQtyImage,
                    'filename': responses[index].fileName,
                    'data': responses[index].base64
                }
            )
            dataQtyImage++;
        }
        console.log('dataupload',dataUpload);

        if (form.code != '' && form.memo != '' && form.type != null) {

            if (send) {
                setLoading(true)
                RNFetchBlob.fetch(
                    'POST',
                    'https://simpletabadmin.ptab-vps.com/api/close/admin/lockactionscreate',
                    {
                        Authorization: `Bearer ${TOKEN}`,
                        otherHeader: 'foo',
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data',
                    },
                    dataUpload
                   ,
                ).then((result) => {
                    setLoading(false)
                    let data = JSON.parse(result.data);
                    // console.log(data);
                    alert(data.message)
                    navigation.navigate('ActionSeal', { ticket: route.params.ticket })
                }).catch((e) => {
                    //    console.log(e);
                    setLoading(false)
                })
            } else {                
                alert(message)
            }
        } else {
            setLoading(false)
            alert('Mohon Lengkapi data')
        }
    }

    return(
        <View style={styles.container}>
            {loading && <Spinner/>}
            <ImageBackground source={imagebg} style={styles.image}>
                <ScrollView keyboardShouldPersistTaps = 'always'>
                    <HeaderInput/>
                    <View style={{alignItems:'center'}}>
                        <View style={{width:'90%'}}>
                            <View style={styles.baseBoxShadow} >
                                <View style={styles.boxShadow} >
                                    {/* <Text onPress={()=>console.log(test)}>test</Text> */}
                                    <Title title='Tambah Tindakan ' paddingVertical={5}/>
                                    <Txt title='Kode:'/>
                                    <Inpt placeholder='Kode' onChangeText={item => handleForm('code', item)} />
                                    <Txt title='Type:'/>
                                    {types && 
                                        <Select2
                                            searchPlaceHolderText='Cari Type'
                                            title='Type'
                                            
                                            isSelectSingle
                                            style={{  
                                                borderRadius: 10,
                                                borderColor: '#087CDB',
                                                borderWidth: 1,
                                                height:50
                                            }}
                                            buttonStyle={{ 
                                                backgroundColor:'#0C5CBF',
                                                height:45,
                                                borderRadius:5
                                            }}
                                            buttonTextStyle={{
                                                color:'#FFFFFF'                                        
                                            }}
                                            colorTheme={'#0C5CBF'}
                                            popupTitle='Pilih Type'
                                            data={types}
                                            onSelect={data => {
                                                handleForm('type', data[0])
                                            }}
                                            onRemoveItem={data => {
                                                handleForm('type', data[0])
                                            }} 
                                            selectButtonText ='Simpan'
                                            cancelButtonText='Batal'
                                        />
                                    } 
                                    <Txt title='Ambil Gambar' />
                                    <ButtonImage Image={getImage} dataImage={responses} deleteImage={() => deleteImage()} resetImage={() => resetImage()} />

                                    <Txt title='Memo'/>
                                    <TxtArea placeholder='Masukan Memo' onChangeText={item => handleForm('memo', item)} />   
                                    
                                    

                                    <View style={{alignItems:'center'}}>
                                        <Distance distanceV={10}/>
                                        <Btn title='Simpan' onPress={handleData}/>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
                <Footer navigation={navigation} focus='Home'/>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFFFFF'
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    baseBoxShadow : {
        alignItems : 'center',
        paddingVertical : 20,
    },
    boxShadow : {
        backgroundColor : '#ffffff',
        width : '100%',
        paddingHorizontal:20,
        paddingVertical : 30,
        borderRadius:10,
        backgroundColor:'#FFFFFF',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 3,
    }
})

export default AddActionSeal