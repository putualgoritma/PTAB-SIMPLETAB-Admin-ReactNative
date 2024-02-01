import {faPlusCircle, faSearch} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {useSelector} from 'react-redux';
import {
  Btn,
  BtnAdd,
  BtnDelete,
  BtnAction,
  BtnDetail,
  BtnEdit,
  Footer,
  HeaderForm2,
  Spinner,
  Title,
  Dropdown,
} from '../../../component';
import API from '../../../service';
import {colors, Distance} from '../../../utils';
import Config from 'react-native-config';

const TextInfo = props => {
  return (
    <View style={{paddingBottom: 5}}>
      <View style={{flexDirection: 'column', height: 'auto'}}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Text style={styles.textTiltle}>{props.title}</Text>
          </View>
          <View style={{flex: 0.7}}>
            <Text style={styles.textTiltle}>:</Text>
          </View>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text style={styles.textItem}>{props.item}</Text>
        </View>
      </View>
    </View>
  );
};

const Ticket = ({navigation}) => {
  const Permission = useSelector(state => state.PermissionReducer);
  const [loading, setLoading] = useState(true);
  const TOKEN = useSelector(state => state.TokenReducer);
  const [ticket, setTicket] = useState([]);
  const [page, setPage] = useState(1);
  const [cari, setCari] = useState();
  const [lastPage, setLastPage] = useState();
  const isFocused = useIsFocused();
  const [loadingImage, setLoadingImage] = useState(true);
  const USER = useSelector(state => state.UserReducer);
  const [refresh, setRefresh] = useState(false);
  var resetData = false;
  const [find, setFind] = useState();

  const handleLoadMore = () => {
    if (page < lastPage) {
      setPage(page + 1);
    } else console.log('test3');
  };

  useEffect(() => {
    if (isFocused) {
      setLoading(true);
      getData();
    } else {
      setPage(1);
      setTicket([]);
    }
  }, [isFocused, page]);

  const getData = async () => {
    // console.log(resetData);
    console.log('data', cari, find);
    API.ticketList(
      {page: page, status: cari, search: find, userid: USER.id},
      TOKEN,
    )
      .then(result => {
        // console.log('hasil data', result.data.data)
        if (page > 1) {
          setTicket(ticket.concat(result.data.data));
          // resetData = false
          console.log('delete1', page);
        } else {
          setTicket(result.data.data);
          console.log('delete2', page);
        }
        setLastPage(result.data.last_page);
        console.log('tiket data', page);
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

  const onRefresh = () => {
    setRefresh(true);
  };

  useEffect(() => {
    getData();
  }, [refresh]);

  const filter = () => {
    console.log(cari);
    setLoading(true);
    resetData = true;
    Keyboard.dismiss();
    getData();
    // alert(cari)
  };

  const handleDelete = ($id, item) => {
    Alert.alert(
      'Peringatan',
      `Apakah anda yakin untuk menghapus ` + item.code + '?',
      [
        {
          text: 'Tidak',
          onPress: () => console.log('tidak'),
        },
        {
          text: 'Ya',
          onPress: () => {
            setLoading(true);
            API.ticketsClose({id: $id}, TOKEN)
              .then(result => {
                //API.ticketsDelete($id, TOKEN).then((result) => {
                resetData = true;
                setPage(1);
                getData();
                alert(result.data.message);
                setLoading(false);
              })
              .catch(e => {
                console.log(e.request);
                setLoading(false);
              });
          },
        },
      ],
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          marginVertical: 10,
        }}
      />
    );
  };

  const renderItem = ({item}) => {
    const imagefoto =
      item.ticket_image.length > 0
        ? JSON.parse(item.ticket_image[0].image)[0]
        : null;
    var colorStatus = '';
    var borderStatus = '';
    // if (item.status == 'active' && item.action.length > 0) {
    //     var colorStatus = '#B2BEB5';
    //     var borderStatus = '#CAFEC0'

    // }
    if (item.status == 'pending' && item.action.length > 0) {
      var colorStatus = '#B2BEB5';
      var borderStatus = '#FFF6C2';
    } else if (
      USER.dapertement_id === 1 &&
      item.status == 'pending' &&
      item.dapertement_id > 1 &&
      item.action.length < 1
    ) {
      var colorStatus = '#B2BEB5';
      var borderStatus = '#FFF6C2';
    } else if (item.status == 'active') {
      var colorStatus = '#7DE74B';
      var borderStatus = '#CAFEC0';
    } else if (item.status == 'pending') {
      var colorStatus = '#F0D63C';
      var borderStatus = '#FFF6C2';
    } else {
      var colorStatus = '#2392D7';
      var borderStatus = '#CFEDFF';
    }

    // console.log('foto ini',imagefoto)
    return (
      <View style={{alignItems: 'center'}}>
        <View
          style={{
            backgroundColor: colorStatus,
            width: 200,
            height: 35,
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
            alignItems: 'center',
          }}>
          <Text style={styles.textStatus}>{item.status}</Text>
        </View>
        <View style={[styles.content, {borderColor: borderStatus}]}>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                flex: 1,
                height: 200,
                paddingTop: 3,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <ImageBackground
                source={require('../../../assets/img/ImageLoading.gif')}
                style={{width: 120, height: 150}}>
                {/* {loadingImage && <Image source={require('../../../assets/img/ImageLoading.gif')} style={{ width: 150, height: 200 }} />} */}
                <Image
                  key={
                    item.ticket_image.length > 0
                      ? `https://simpletabadmin.ptab-vps.com` +
                        `${String(imagefoto).replace('public/', '')}`
                      : null
                  }
                  source={
                    item.ticket_image.length > 0
                      ? {
                          uri:
                            `https://simpletabadmin.ptab-vps.com` +
                            `${String(imagefoto).replace('public/', '')}`,
                        }
                      : require('../../../assets/img/ImageLoading.gif')
                  }
                  style={{flex: 1, height: '100%'}}
                  // onLoadEnd={() => setLoadingImage(false)}
                  // onLoadStart={() => setLoadingImage(true)}
                />
              </ImageBackground>
            </View>

            <View style={[styles.textnfo, {flex: 1}]}>
              <TextInfo title="Tanggal" item={item.created_at} />
              <TextInfo
                title="Nama"
                item={item.customer.namapelanggan + '-' + item.customer_id}
              />
              <TextInfo title="Telfon" item={item.customer.telp} />
              {item.customer_id != '99900001' && (
                <TextInfo title="Alamat" item={item.customer.alamat} />
              )}
              {item.customer_id == '99900001' && (
                <TextInfo title="Alamat" item={item.address} />
              )}
              <TextInfo title="Code" item={item.code} />
              <TextInfo title="Kategori" item={item.category.name} />
              <TextInfo title="Deskripsi" item={item.description} />
              <TextInfo
                title="Memo Pengerjaan"
                item={
                  item.action.length > 0
                    ? item.action[item.action.length - 1].memo
                    : null
                }
              />
            </View>
          </View>
          <View
            style={{
              backgroundColor: '#f4f4f4',
              width: '100%',
              height: 2,
              marginVertical: 5,
            }}></View>
          <View
            style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
            <View
              style={{
                flexDirection: 'row',
                width: '95%',
                height: 'auto',
                paddingTop: 5,
              }}>
              {Permission.includes('ticket_show') && (
                <BtnDetail
                  onPress={() =>
                    navigation.navigate('ViewTicket', {ticket: item})
                  }
                />
              )}
              {item.status != 'close' && Permission.includes('ticket_edit') && (
                <BtnEdit
                  onPress={() =>
                    navigation.navigate('EditTicket', {ticket: item})
                  }
                />
              )}
              {item.status != 'close' &&
                Permission.includes('ticket_delete') && (
                  <BtnDelete onPress={() => handleDelete(item.id, item)} />
                )}
              {item.status != 'close' &&
                Permission.includes('action_access') && (
                  <BtnAction
                    onPress={() =>
                      navigation.navigate('Action', {ticket: item})
                    }
                  />
                )}
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      {loading && <Spinner />}
      {/* <ScrollView  scrollEnabled={false}
             nestedScrollEnabled={false}> */}
      <View style={styles.container}>
        {/* header */}
        <HeaderForm2 />
        <View style={{paddingHorizontal: 20}}>
          <Title title="Tiket" />
          {Permission.includes('ticket_create') && (
            <BtnAdd
              title="Tambah Tiket"
              width="60%"
              icon={faPlusCircle}
              onPress={() => navigation.navigate('AddTicket')}
            />
          )}
          <Distance distanceV={10} />
          <TextInput
            style={styles.search}
            value={find}
            placeholder={'No.SBG'}
            onChangeText={item => setFind(item)}></TextInput>
          <View style={{flexDirection: 'row'}}>
            {/* <TextInput style={styles.search} value={cari} onChangeText={(item) => setCari(item)} ></TextInput> */}

            <View style={{width: '60%'}}>
              <Dropdown
                items={[
                  {label: 'All', value: ''},
                  {label: 'Pending', value: 'pending'},
                  {label: 'Active', value: 'active'},
                  {label: 'Close', value: 'close'},
                ]}
                onChangeValue={item => {
                  setCari(item);
                  console.log(cari);
                }}
              />
            </View>

            <Distance distanceH={5} />
            <Btn
              title="Filter"
              width="35%"
              icon={
                <FontAwesomeIcon
                  icon={faSearch}
                  style={{color: '#FFFFFF'}}
                  size={27}
                />
              }
              onPress={() => {
                setPage(1);
                filter();
              }}
            />
          </View>
          <Distance distanceV={10} />
        </View>
        {/*batas headxer  */}
        {/* {console.log('user',USER)} */}
        <FlatList
          // ListHeaderComponent={<Text>Hallo</Text>}
          keyExtractor={(item, index) => index.toString()}
          data={ticket}
          ItemSeparatorComponent={ItemSeparatorView}
          contentContainerStyle={{alignItems: 'center'}}
          renderItem={renderItem}
          ListFooterComponent={loading ? <Text>Sedang Memuat</Text> : null}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={1}
          onRefresh={onRefresh}
          refreshing={refresh}
        />
      </View>
      {/* </ScrollView> */}
      {/* <View>
                <TouchableOpacity onPress={()=>handleLoadMore()}>
                   <Text> Cek {ticket.length} </Text>
                </TouchableOpacity>
            </View> */}
      <Footer navigation={navigation} focus="Menu" />
    </SafeAreaView>
  );
};
const windowWidht = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  content: {
    borderWidth: 3,
    // width: Dimensions.get('screen').width - 45,
    width: windowWidht * 0.82,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#FFFFFF',
    // marginVertical : 20
  },
  search: {
    backgroundColor: '#ffffff',
    width: '60%',
    borderRadius: 4,
    borderWidth: 1,
    marginBottom: 10,
    borderColor: colors.border,
    paddingHorizontal: 20,
  },
  textnfo: {
    paddingHorizontal: 10,
  },
  textTiltle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#696969',
  },
  textItem: {
    fontSize: 15,
    color: '#696969',
  },
  textStatus: {
    color: '#FFFFFF',
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    paddingTop: 5,
  },
});
export default Ticket;
