import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView,FlatList,Dimensions, Alert} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useSelector } from 'react-redux';
import { BtnAdd, Footer, HeaderForm, Spinner, Title,BtnEdit,BtnDelete } from '../../../component';
import API from '../../../service';
import { Distance } from '../../../utils';

const TextInfo = (props) => {
    return (
        <View style={{paddingVertical:5}}>
            <View style={{flexDirection:'row',height:'auto'}}>
                <View style={{flex:1}}>
                    <Text style={styles.textTiltle}>{props.title}</Text>
                </View>
                <View style={{flex:0.1}}>
                    <Text style={styles.textTiltle}>:</Text>
                </View>
                <View style={{flex:1.2,flexDirection:'row'}}>
                    <Text style={styles.textItem}> {props.item}</Text>
                </View>
            </View>
        </View>
    )
}

const Departemen=({navigation})=>{
    const Permission = useSelector((state) => state.PermissionReducer);
    DropDownPicker.setListMode("SCROLLVIEW");
    const [loading, setLoading] = useState(true)
    const TOKEN = useSelector((state) => state.TokenReducer);
    const isFocused = useIsFocused();
    const [departement, setDepartement] = useState([])
    const [page, setPage] = useState(1)
    const [loadingLoadMore, setLoadingLoadMore] = useState(false)
    const [lastPage, setLastPage] = useState()
    const [refresh, setRefresh] = useState(false)

    var resetData = false;

    const handleLoadMore = () => {
        if(page < lastPage){
            setPage(page + 1);
        }
    }

   useEffect(() => {
        if(isFocused){
            setLoading(true)
            getData()
        }else{
            setPage(1)
            setDepartement([])
        }
        
    },[isFocused,page])

    const getData = async () => {
        console.log('page', page);
        API.dapertementslist(page,TOKEN).then((result) => {
            console.log(result)
            if(page > 1){
                setDepartement(departement.concat(result.data.data)) 
            }else{       
                setDepartement(result.data.data)
            }
            setLastPage(result.data.last_page)
            setLoading(false)
        }).catch(e =>{ 
            console.log(e)
            setLoading(false)
        })
        setRefresh(false)
    };
    const onRefresh = () => {
        setRefresh(true)
    }
    useEffect(() => {
        getData()
      }, [refresh])

    const handleDelete =($id, item) => {
        Alert.alert(
           'Peringatan',
           `Apakah anda yakin untuk menghapus ` + item.name+'?',
           [
               {
                   text : 'Tidak',
                   onPress : () => console.log('tidak')
               },
               {
                   text : 'Ya',
                   onPress : () => {
                       setLoading(true)
                       API.dapertementsDelete($id, TOKEN).then((result) => {
                           resetData = true;
                           setPage(1)
                           getData();
                           alert(result.data.message)
                           setLoading(false)
                       }).catch((e) => {
                           console.log(e.request);
                           setLoading(false)
                       })
                   }
               }
           ]
         )
   }
    const ItemSeparatorView = () => {
        return (
          // Flat List Item Separator
          <View
            style={{
              marginVertical : 10
            }}
          />
        );
      };

      const renderItem = ({item}) => {
        return(
            <View style={styles.content}>
                <View style={styles.textnfo}>
                    <TextInfo title = 'Kode' item={item.code} />
                    <TextInfo title = 'Nama Departemen' item={item.name}/>
                    <TextInfo title = 'Nama Deskripsi' item={item.description}/>
                </View>
                <View style={{backgroundColor:'#f4f4f4', width:'100%', height:2}}></View>
                <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
                    <View style={{flexDirection:'row',width:'40%',height:'auto',paddingTop:5}}>
                        {Permission.includes('dapertement_edit') &&
                            <BtnEdit onPress={() =>navigation.navigate('EditDepartemen', {dapertement : item})}/>
                        }
                        {Permission.includes('dapertement_delete') &&
                            <BtnDelete onPress={() => handleDelete(item.id, item)}/>
                        }
                    </View>
                </View>
            </View>
            )
        }
    return(
        <SafeAreaView style={{flex : 1}}>
            {loading && <Spinner/>}
            <View style={styles.container}>
                    <HeaderForm/>
                    <View style={{alignItems:'center'}}>
                        <View style={{width:'90%'}}>
                            <Title title='Departemen'/>
                            {Permission.includes('dapertement_create') &&
                                <BtnAdd
                                    title="Tambah Departemen"
                                    width='60%'
                                    icon={faPlusCircle}
                                    onPress={()=>navigation.navigate('AddDepartemen')}
                                />
                            }
                        </View>
                    </View>
                    <FlatList
                    // scrollEnabled={true}
                    keyExtractor={(item, index) => index.toString()}
                    data={departement}
                    ItemSeparatorComponent={ItemSeparatorView}
                    // ListHeaderComponent={Header}
                    contentContainerStyle={{alignItems : 'center'}}
                    renderItem={renderItem}
                    ListFooterComponent={loading ? <Text>Sedang Memuat</Text> : null}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0}
                    onRefresh={onRefresh}
                    refreshing={refresh}
                    />
                     <Distance distanceV={10}/>
                <Footer navigation={navigation} focus='Menu'/>
            </View>
        </SafeAreaView>   
    )
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        backgroundColor:'#F4F4F4'
    },
    content : {
        borderWidth : 3,
        borderColor: '#CFEDFF',
        width : Dimensions.get('screen').width - 45,
        borderRadius : 5,
        backgroundColor:'#FFFFFF'
    },
    title:{
        fontSize:15, 
        fontWeight:'bold', 
        color:'#696969',
        paddingVertical:5
   },
    textnfo : {
        paddingHorizontal : 10,
        paddingVertical : 10,
        
    },
    textTiltle : {
        fontWeight : 'bold',
        fontSize : 15,
        color:'#696969'
    },
    textItem : {
        fontSize : 15,
        color:'#696969'
    }
})
export default Departemen
