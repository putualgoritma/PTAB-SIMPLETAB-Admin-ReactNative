import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Footer, HeaderForm, Spinner, Title,Dropdown, Btn,BtnContinue} from '../../../component';
import API from '../../../service';
import { colors, Distance } from '../../../utils';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const TextInfo = (props) => {
    return (
    <View style={{paddingVertical:5}}>
        <View style={{flexDirection:'row',height:'auto'}}>
            <View style={{flex:1, }}>
                <Text style={styles.textTiltle}>{props.title}</Text>
            </View>
            <View style={{flex:0.1}}>
                <Text style={styles.textTiltle}>:</Text>
            </View>
            <View style={{flex:1.5,flexDirection:'row'}}>
                <Text style={styles.textItem}>{props.item}</Text>
            </View>
        </View>
    </View>
    )
}

const Arrears = ({navigation}) => {
    const [loading, setLoading] = useState(true)
    const TOKEN = useSelector((state) => state.TokenReducer);
    const [tunggakan, setTunggakan] = useState([]);
    const [page, setPage] = useState(1)
    const [find, setFind] = useState()
    const [lastPage, setLastPage] = useState()
    const isFocused = useIsFocused();
    const Permission = useSelector((state) => state.PermissionReducer);
    const [refresh, setRefresh] = useState(false)
    const USER = useSelector((state) => state.UserReducer);

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
            setTunggakan([])
        }
        
    },[isFocused,page])

    
    const getData = async () => {
        API.segelList({'page' : page,status: find,userid: USER.id},TOKEN).then((result) => {
            // console.log(result)
              console.log('hasil segel list', result)
            if(page > 1){
                setTunggakan(tunggakan.concat(result.data.data)) 
            }else{       
                setTunggakan(result.data.data)
            }
            setLastPage(result.data.last_page)
            setLoading(false)
            setRefresh(false)
        }).catch(e =>{ 
            console.log(e.request)
            setRefresh(false)
            setLoading(false)
        })
    };

    const onRefresh = () => {
        setRefresh(true)
    }

    useEffect(() => {
        getData()
      }, [refresh])

    const filter = () => {
        setLoading(true)
        resetData = true
        getData();
    }

    
   const ItemSeparatorView = () => {
    return (
      <View
        style={{
          marginVertical : 10
        }}
      />
    );
  };


    const renderItem = ({item}) => {
        var colorStatus = '';
        if (item.statusnunggak == '1') {
            var colorStatus = 'red';
        } else if (item.statusnunggak == '0') {
            var colorStatus = '#2392D7';
        } 
        return(
            <View style={{ alignItems: 'center' }}>
                <View style={{ backgroundColor: colorStatus, width: 200, height: 35, borderTopRightRadius: 15, borderTopLeftRadius: 15, alignItems: 'center' }}>
                    <Text style={styles.textStatus}>{item.statusnunggak =='1' ? 'Belum Lunas' : 'Lunas'}</Text>
                </View> 
                <View style={styles.content}>
                    <View style={styles.textnfo}>
                        <TextInfo title = 'No Rekening' item={item.nomorrekening}/>
                        <TextInfo title = 'Nama Pelanggan' item={item.namapelanggan} />
                        <TextInfo title = 'Alamat' item={item.alamat} />
                        <TextInfo title = 'Jumlah Tunggakan' item={item.jumlahtunggakan} />
                    </View>
                    <View style={{backgroundColor:'#f4f4f4', width:'100%', height:2}}></View>
                    <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
                        { item.statusnunggak ==1 &&
                        <View style={{flexDirection:'row',width:'100%',height:'auto',paddingTop:15}}>
                            { item.teruskan ==1 &&
                            <BtnContinue onPress={() => navigation.navigate('AddArrears',{lock_id:item.id})} />
                            }
                        </View>
                        }
                    </View>
                </View>
            </View>
        )
    }

    // base
    return (
       <SafeAreaView style={{flex : 1}}>
             {loading && <Spinner/>}
            <View style={styles.container}>
                
                {/* header */}
                <HeaderForm/>
                <View style={{paddingHorizontal : 20}}>
                    <Title title='Info Tunggakan'/>
                    <Distance distanceV={10}/>  
                    <View style={{ flexDirection: 'row' }}> 
                       <View style={{width : '60%'}}>
                        <Dropdown 
                                
                                items ={[
                                    {label : 'All', value : ''},
                                    {label : 'Belum Lunas', value : '1'},
                                    {label : 'Lunas', value : '0'}
                                ]}
                                onChangeValue={(item) => {
                                    setFind(item)
                                }}
                            />
                       </View>
                        <Distance distanceH={5} />
                        <Btn
                            title='Filter'
                            width='35%'
                            icon={<FontAwesomeIcon icon={faSearch} style={{ color: '#FFFFFF' }} size={27} />}
                            onPress={() => { setPage(1); filter() }}
                        />
                    </View>   
                    <Distance distanceV={10} />   
                </View>
                {/*batas headxer  */}

                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={tunggakan}
                    ItemSeparatorComponent={ItemSeparatorView}
                    contentContainerStyle={{alignItems : 'center'}}
                    renderItem={renderItem}
                    ListFooterComponent={loading ? <Text>Sedang Memuat</Text> : null}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0}
                    onRefresh={onRefresh}
                    refreshing={refresh}
                />
            </View>
            <Footer navigation={navigation} focus='Menu'/>
       </SafeAreaView>
    )
}

export default Arrears

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        backgroundColor:'#ffffff'
    },
    content : {
        borderWidth : 3,
        borderColor: '#CFEDFF',
        width : Dimensions.get('screen').width - 45,
        borderRadius : 10
        // marginVertical : 20
    },
    search : {
        backgroundColor:'#ffffff',
        width : '60%',
        borderRadius : 4,
        borderWidth : 1,
        borderColor : colors.border,
        paddingHorizontal:20
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
    },
    textStatus: {
        color: '#FFFFFF',
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        paddingTop: 5
    },
})