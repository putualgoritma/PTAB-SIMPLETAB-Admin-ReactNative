import React, { useEffect, useState } from 'react'
import {View,ImageBackground,StyleSheet,ScrollView, Text} from 'react-native'
import {HeaderInput,Footer,Title,Txt,Btn,Inpt, Spinner} from '../../../component'
import DropDownPicker from 'react-native-dropdown-picker';
import { Distance } from '../../../utils';
import API from '../../../service';
import { useSelector } from 'react-redux';
import Select2 from 'react-native-select-two';

const AddKategory =({navigation})=>{
    const image = require('../../../assets/img/BackgroundInput.png')
    const TOKEN = useSelector((state) => state.TokenReducer);
    const [loading, setLoading] = useState(false)
    DropDownPicker.setListMode("SCROLLVIEW");
    const [categorygroup, setCategorygroup] = useState(null)
    const [categorytype, setCategorytype] = useState(null)    
    const USER = useSelector((state) => state.UserReducer);
    const [form, setForm] = useState({
        code : '',
        name : '',
        category_group_id : '',
        category_type_id : '',
    })

    useEffect(() => {
        let isAmounted = true
        if(isAmounted){
            console.log(TOKEN);
            Promise.all([API.categorygroupList(USER.id,TOKEN), API.categorytypeList(USER.id,TOKEN)]).then(result => { 
                setCategorygroup(result[0].data)
                setCategorytype(result[1].data)
                setLoading(false)
                // console.log(result);
            }).catch((e) => {
                console.log(e.request);
                setLoading(false)
            })
        }
        return () => {
            isAmounted = false
        }
    }, [])

    const handleForm = (key, value) => {
        setForm({
            ...form,
            [key] :value
        })
    }

    const handleAction =() => {
        if(form.name !== '' && form.category_group_id !== '' && form.category_type_id !== ''){
            setLoading(true)
            API.categoriesCreate(form,TOKEN).then((result) => {            
                console.log(result);
                if(result.message.constructor === Array){
                    alert( result.message.toString())
                }else{
                    alert(result.message)
                    // navigation.navigate('Kategory')
                    navigation.goBack();
                }
                setLoading(false)
            }).catch((e) => {
                setLoading(false)
                console.log(e.request);
            })
        }else{
            alert('Mohon Lengkapi Data Dahulu')
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
                                    <Title title='Tambah Kategori' paddingVertical={5}/>
                                    <Txt title='Kode'/>
                                    <Text style={{color : 'red', fontSize : 10}}>Boleh di Kosongkan</Text>
                                    <Distance distanceV={1} />
                                    <Inpt placeholder='Masukan Kode' onChangeText={(item) => handleForm('code', item)}/>
                                    <Txt title='Kategori'/>
                                    <Inpt placeholder='Masukan Nama Kategori'onChangeText={(item) => handleForm('name', item)}/>
                                    <Txt title='Group'/>
                                    {categorygroup && 
                                        <Select2
                                            searchPlaceHolderText='Pilih Group'
                                            title='Group'
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
                                            selectedTitleStyle={{
                                                    color:'#c4c4c4'
                                            }}
                                            colorTheme={'#0C5CBF'}
                                            popupTitle='Select Departemen'
                                            data={categorygroup}
                                            onSelect={data => {
                                                handleForm('category_group_id', data[0])
                                            }}
                                            onRemoveItem={data => {
                                                handleForm('category_group_id', data[0])
                                            }} 
                                            selectButtonText ='Simpan'
                                            cancelButtonText='Batal'
                                        />
                                    }
                                    <Txt title='Type'/>
                                    {categorytype && 
                                        <Select2
                                            searchPlaceHolderText='Pilih Type'
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
                                            selectedTitleStyle={{
                                                    color:'#c4c4c4'
                                            }}
                                            colorTheme={'#0C5CBF'}
                                            popupTitle='Select Departemen'
                                            data={categorytype}
                                            onSelect={data => {
                                                handleForm('category_type_id', data[0])
                                            }}
                                            onRemoveItem={data => {
                                                handleForm('category_type_id', data[0])
                                            }} 
                                            selectButtonText ='Simpan'
                                            cancelButtonText='Batal'
                                        />
                                    }
                                    <View style={{alignItems:'center'}}>
                                        <Distance distanceV={10}/>
                                        <Btn title='Simpan' onPress={handleAction}/>
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

export default AddKategory