import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Col, Row, Rows, Table, TableWrapper } from 'react-native-table-component';
import { useSelector } from 'react-redux';
import { BtnAdd,BtnDetail,BtnEdit,BtnDelete, Footer, HeaderForm, Spinner, Title } from '../../../component';
import API from '../../../service';
import { colors, Distance } from '../../../utils';

const Aksi =(props) => {
    return (
        <View style ={{alignItems : 'center', justifyContent :'center'}}>
            <View style={{flexDirection:'row'}}>
                <BtnDetail  onPress={() => props.navigation.navigate('ViewStaff', {staff : props.data})} />
                <Distance distanceH={3}/>
                <BtnEdit  onPress={() => props.navigation.navigate('EditStaff', {staff : props.data})}/>
            </View>
            <View style={{flexDirection:'row'}}>
                <BtnDelete onPress={props.delete}/>
            </View>
        </View>
    )
}


const Staff=({navigation, route})=>{
    DropDownPicker.setListMode("SCROLLVIEW");
    const [loading, setLoading] = useState(true)
    const tableHead = ['NO', 'Nama', 'Departemen', 'Aksi'];
    const TOKEN = useSelector((state) => state.TokenReducer);
    const [tableNo, setTableNo] = useState()
    const [tableData, setTableData] = useState()
    const isFocused = useIsFocused();
    const [staffs, setStaffs] = useState(null)

    useEffect(() => {
        let isAmounted = true
        if(isAmounted){
            staffAPi();
        }

        return () => {
            isAmounted = false;
        }
    }, [isFocused])


    const staffAPi = () => {
        API.staffs(TOKEN).then((result) => {
            let data = []
            let no = []
            result.data.map((item, index) => {
                // console.log(Object.keys(result.data[index]));
                no[index] = index + 1;
                data[index] = [
                    item.name,
                    item.dapertement.name,
                    [<Aksi 
                            key ={index}
                            data={item} 
                            navigation={navigation} 
                            delete={() => handleDelete(item.id)}
                        />],
                ]
            })
            setStaffs(data)
            setTableData(data)
            setTableNo(no)
            console.log(result);
            setLoading(false)
        }).catch((e) => {
            setLoading(false)
        })
    }

    const handleDelete =($id) => {
        setLoading(true)
        API.staffsDelete($id, TOKEN).then((result) => {
            // console.log(result);
            alert(result.data.message)
            staffAPi();
            // setLoading(false)
        }).catch((e) => {
            console.log(e.request);
            setLoading(false)
        })
    }

    return(
        <View style={styles.container}>
              {loading && <Spinner/>}
            {/* <ScrollView> */}
                <HeaderForm/>
                <View style={{alignItems:'center', flex : 1,}}>
                    <View style={{width:'90%'}}>
                        <Title title='Staff'/>
                        <BtnAdd
                            title="Tambah Staff"
                            width='60%'
                            icon={faPlusCircle}
                            onPress={()=>navigation.navigate('AddStaff')}
                        />
                        <Distance distanceV={10}/>
                        {/* {staffs &&   */}
                             {/* <View style={{height : '77%'}}>
                                <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                                    <Row data={tableHead} flexArr={[1,2, 2, 2]} style={styles.head} textStyle={styles.text}/>
                                </Table> */}
             
                                {/*  table data */}
                                {/* <ScrollView style={styles.dataWrapper}>
                                    <Table borderStyle={{borderWidth: 1,  borderColor: '#C1C0B9'}}>
                                        <TableWrapper style={styles.wrapper}>
                                            <Col data={tableNo} style={styles.no} heightArr={[100,100]} textStyle={styles.text}/>
                                            <Rows data={tableData} flexArr={[2,2, 2]} style={styles.row} textStyle={styles.text}/>
                                        </TableWrapper>
                                    </Table>       
                                </ScrollView>
                            </View> */}
                        {/* } */}
                        <Distance distanceV={5}/>
                            <View style={{backgroundColor:'#FFFFFF', width:'100%',borderRadius:9,borderWidth:3,borderColor:'#CFEDFF',height:'auto', padding:7}}>
                                <View style={{height:'auto', flexDirection:'row'}}>
                                    <View style={{flex:1}}>
                                        <Text style={styles.title}>Kode</Text>
                                        <Text style={styles.title}>Nama Staff</Text>
                                        <Text style={styles.title}>Departemen</Text>
                                        <Text style={styles.title}>No Ponsel</Text>
                                    </View>
                                    <View style={{paddingLeft:8,flex:1.5, height:'auto'}}>
                                        <Text style={styles.data}>:STF00001</Text>
                                        <Text style={styles.data}>:Staff Distribusi 01</Text>
                                        <Text style={styles.data}>:Distribusi</Text>
                                        <Text style={styles.data}>:0800000004</Text>
                                    </View>
                                </View>
                                <View style={{flexDirection:'row',justifyContent:'flex-end',height:'auto',paddingTop:5}}>
                                    <BtnEdit/>
                                    <BtnDelete/>
                                </View>
                            </View>
                    </View>
                </View>
            {/* </ScrollView> */}
            <Footer navigation={navigation} focus='Menu'/>
       </View>
    )
}
const styles = StyleSheet.create({
    title:{
        fontSize:15, 
        fontWeight:'bold', 
        color:'#696969',
        paddingVertical:5
   },
    data:{
        color:'#696969',
        paddingVertical:5
   },
    container:{
        flex:1,
        backgroundColor:'#FFFFFF'
    },
    btn : {
        width : 50,
        height : 20,
        marginVertical : 2, 
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius : 5,

    },
    head: {  height: 50,  backgroundColor:'#EAF4FA'  },
    wrapper: { flexDirection: 'row',},
    no: { flex: 1, backgroundColor: '#FFFFFF'  },
    row: {  height: 100  },
    text: { alignItems:'center', margin:6,paddingHorizontal:4 },
    dataWrapper: { marginTop: -1 },
})
export default Staff
