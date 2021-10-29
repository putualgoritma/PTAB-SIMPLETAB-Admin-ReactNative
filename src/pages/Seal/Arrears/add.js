import React, { useState, useEffect } from 'react'
import {View,ImageBackground,StyleSheet,ScrollView} from 'react-native'
import {HeaderInput,Footer,Title,Txt,Btn,TxtArea,Dropdown,Inpt, Spinner} from '../../../component'
import DropDownPicker from 'react-native-dropdown-picker';
import { Distance } from '../../../utils';
import API from '../../../service';
import { useSelector } from 'react-redux';
import Select2 from 'react-native-select-two';


const AddArrears =({navigation, route})=>{
    const [departements, setDepartements] = useState(null)
    const [subdepartements, setSubdepartements] = useState(null)
    const [code, setCode] = useState(null)
    const [items, setItems] = useState([
        {label: '-- Pilih Sub Departement --', value: ''},
        {label: 'SUBAG PERAWATAN & PERBAIKAN}', value: '9'},
        {label: 'SUBAG METER & SEGEL', value: '10'},
        {label: 'SUBAG DISTRIBUSI & PENYAMBUNGAN', value: '11'}
      ]);
      const [items1, setItems1] = useState([
        {label: 'BAGIAN DISTRIBUSI', value: '2'}
      ]);


    const image = require('../../../assets/img/BackgroundInput.png')
    DropDownPicker.setListMode("SCROLLVIEW");
    const [loading, setLoading] = useState(false)
    const TOKEN = useSelector((state) => state.TokenReducer);
  
    const [form, setForm] = useState({
        code : '',
        customer_id : route.params.lock_id,
        subdapertement_id : '',
        description : '',
    })
    const handleForm =(key, value) => {
        setForm({
            ...form,
            [key] : value
        })
    }
    const USER = useSelector((state) => state.UserReducer);
    useEffect(() => {
        let isAmounted = true
        if(isAmounted){
            setLoading(true)
            Promise.all([API.DaperdanSub(TOKEN),API.lockcreate(route.params.lock_id, TOKEN)]).then((res) => {
                setDepartements(res[0].data)
                setSubdepartements(res[0][0])
                setForm.code(form.code=res[1].data)
                setLoading(false)
            }).catch((e) => {
                console.log(e.request);
                setLoading(false)
            })
       }
    }, [])

    const handleAction =() => {
        if(form.code !== '' && form.customer_id !=='' && form.subdapertement_id !== '' && form.description !=='' ){
            
            setLoading(true)
            API.lockStore(form, TOKEN).then((result) => {
                console.log(result);
                if(result.message.constructor === Array){
                    alert( result.message.toString())
                 }else{
                    alert(result.message)
                 }
                 setLoading(false)
                 navigation.navigate('SealMeter')
            }).catch((e) => {
                console.log(JSON.parse(e.request._response));
                setLoading(false)
            })
        }else{
            alert('mohon lengkapi data terlebih dahulu')
        }
    }
    return(
        <View style={styles.container}>
            {loading && <Spinner/>}
            <ImageBackground source={image} style={styles.image}>
                <ScrollView keyboardShouldPersistTaps = 'always'>
                    <HeaderInput/>
                    <View style={{alignItems:'center'}}>
                        <View style={{width:'90%'}}>
                            <View style={styles.baseBoxShadow} >
                                <View style={styles.boxShadow} >
                                    <Title title='Tambah Segel' paddingVertical={5}/>
                                    <Txt title='Kode'/>
                                    <Inpt placeholder='Code' onChangeText={(item) => handleForm('code', item)} value={form.code}  />
                                    <Txt title='Kode Pelanggan'/>
                                    <Inpt placeholder='Kode Pelanggan' value={route.params.lock_id } onChangeText={(item) => handleForm('customer_id', item)}  editable={false}/>
                                    <Txt title='Departement'/>
{/*                               
                                    <Dropdown
                                        placeholder='-- Pilih Departement --'
                                        items={items1}
                                        setItems={setItems1}
                                        onChangeValue={(item) => {
                                            handleForm('type', item)
                                        }}
                                    /> */}

                                    {departements && 
                                        <Select2
                                            searchPlaceHolderText='Cari Departemen'
                                            title={'-- Pilih Departement --'}
                                            // value={form.dapertement_id}
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
                                            popupTitle='Select Departemen'
                                            data={departements}
                                            // onSelect={data => {
                                            //     handleForm('dapertement_id', data[0])
                                            // }}
                                            // onRemoveItem={data => {
                                            //     handleForm('dapertement_id', data[0])
                                            // }} 
                                            selectButtonText ='Simpan'
                                            cancelButtonText='Batal'
                                        />
                                    }   
                                 
                                    {/* <Txt title='Sub Departement'/>
                                    <Dropdown
                                        placeholder='-- Pilih Sub Departement --'
                                        items={items}
                                        setItems={setItems}
                                        onChangeValue={(item) => {
                                            handleForm('subdapertement_id', item)
                                        }}
                                    /> */}

                                    <Txt title='Sub Departemen'/>
                                    {subdepartements && 
                                        <Select2
                                            searchPlaceHolderText='Cari Sub Departemen'
                                            title='-- Sub Departemen --'
                                            
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
                                            popupTitle='Select Sub Departemen'
                                            data={subdepartements}
                                            onSelect={data => {
                                                handleForm('subdapertement_id', data[0])
                                            }}
                                            onRemoveItem={data => {
                                                handleForm('subdapertement_id', data[0])
                                            }} 
                                            selectButtonText ='Simpan'
                                            cancelButtonText='Batal'
                                        />
                                    } 
                                    <Txt title='Deskripsi'/>
                                    <TxtArea placeholder='Deskripsi' onChangeText={(item) => handleForm('description', item)} />
                                    <View style={{alignItems:'center'}}>
                                        <Distance distanceV={10}/>
                                        <Btn title='Simpan' onPress={handleAction}/>
                                        {/* <Btn title='test' onPress={()=>console.log('params',form)}/> */}
                                      
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
                <Footer navigation={navigation} focus='Menu'/>
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

export default AddArrears