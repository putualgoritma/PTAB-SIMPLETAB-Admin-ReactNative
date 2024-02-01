import {faSearch} from '@fortawesome/free-solid-svg-icons';
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
} from 'react-native';
import {useSelector} from 'react-redux';
import {
  Btn,
  BtnStaff,
  BtnDelete,
  BtnAction,
  BtnDetail,
  BtnEdit,
  Footer,
  HeaderForm,
  Spinner,
  Title,
  Dropdown,
} from '../../../component';
import API from '../../../service';
import {colors, Distance} from '../../../utils';

const TextInfo = props => {
  return (
    <View style={{paddingBottom: 5}}>
      <View style={{flexDirection: 'column', height: 'auto'}}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 2.5}}>
            <Text style={styles.textTiltle}>{props.title}</Text>
          </View>
          <View style={{flex: 0.5}}>
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

const Seal = ({navigation}) => {
  const Permission = useSelector(state => state.PermissionReducer);
  const [loading, setLoading] = useState(true);
  const TOKEN = useSelector(state => state.TokenReducer);
  const [ticket, setTicket] = useState([]);
  const [page, setPage] = useState(1);
  const [cari, setCari] = useState();
  const [searchfilter, setSearchfilter] = useState();
  const [lastPage, setLastPage] = useState();
  const isFocused = useIsFocused();
  const [loadingImage, setLoadingImage] = useState(true);
  const USER = useSelector(state => state.UserReducer);
  const [refresh, setRefresh] = useState(false);
  var resetData = false;

  const handleLoadMore = () => {
    if (page < lastPage) {
      setPage(page + 1);
    }
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
    API.lockList(
      {page: page, status: cari, searchfilter: searchfilter, userid: USER.id},
      TOKEN,
    )
      .then(result => {
        console.log('hasil segel list', result);
        if (page > 1) {
          setTicket(ticket.concat(result.data.data));
        } else {
          setTicket(result.data.data);
          console.log('delete');
        }
        setLastPage(result.data.last_page);
        // console.log('tiket data',result.data);
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
    setLoading(true);
    resetData = true;
    // setRefresh(true)
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
            API.lockDestroy($id, TOKEN)
              .then(result => {
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
      <View
        style={{
          marginVertical: 10,
        }}
      />
    );
  };

  const renderItem = ({item}) => {
    var imagefoto = null;
    if (item.lockaction != null) {
      let count = JSON.parse(item.lockaction.image).length;
      if (item.lockaction.image.length !== 0) {
        if (item.lockaction.image.length > 1) {
          imagefoto = JSON.parse(item.lockaction.image)[count - 1];
        } else {
          imagefoto = item.lockaction.image;
        }
      } else {
        imagefoto = 'FotoDefault.png';
      }
    } else {
      imagefoto = 'FotoDefault.png';
    }

    var colorStatus = '';
    var borderStatus = '';
    if (item.status == 'active') {
      var colorStatus = '#7DE74B';
      var borderStatus = '#CAFEC0';
    } else if (item.status == 'pending') {
      var colorStatus = '#F0D63C';
      var borderStatus = '#FFF6C2';
    } else {
      var colorStatus = '#2392D7';
      var borderStatus = '#CFEDFF';
    }

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
          <Text style={styles.textStatus}>
            {item.status == 'lock'
              ? 'Segel'
              : item.status == 'lock_resist'
              ? 'Hambatan Segel'
              : item.status == 'unplug'
              ? 'Cabut'
              : item.status == 'unplug_resist'
              ? 'Hambatan Cabut'
              : item.status == 'pending'
              ? 'Pending'
              : 'Tutup'}
          </Text>
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
                <Image
                  key={
                    `https://simpletabadmin.ptab-vps.com/pdf/` +
                    `${String(imagefoto).replace(
                      'public/',
                      '',
                    )}?time="${new Date()}`
                  }
                  source={{
                    uri:
                      `https://simpletabadmin.ptab-vps.com/pdf/` +
                      `${String(imagefoto).replace(
                        'public/',
                        '',
                      )}?time="${new Date()}`,
                  }}
                  style={{flex: 1, height: '100%'}}
                />
              </ImageBackground>
            </View>
            <View style={[styles.textnfo, {flex: 1}]}>
              <TextInfo title="No SBG" item={item.customer_id} />
              <TextInfo title="Tanggal" item={item.created_at} />
              <TextInfo title="Code" item={item.code} />
              <TextInfo
                title="Nama"
                item={item.customer != null ? item.customer.namapelanggan : ''}
              />
              <TextInfo title="Deskripsi" item={item.description} />
              <TextInfo
                title="Sub Departement"
                item={item.subdapertement.name}
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
              {Permission.includes('lock_show') && (
                <BtnDetail
                  onPress={() =>
                    navigation.navigate('ViewSeal', {lock_id: item.id})
                  }
                />
              )}
              {Permission.includes('lock_staff_access') && (
                <BtnStaff
                  onPress={() =>
                    navigation.navigate('LockStaff', {lockaction_id: item.id})
                  }
                />
              )}
              {Permission.includes('lock_delete') && (
                <BtnDelete onPress={() => handleDelete(item.id, item)} />
              )}
              {Permission.includes('lock_action_access') && (
                <BtnAction
                  onPress={() =>
                    navigation.navigate('ActionSeal', {ticket: item})
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
        <HeaderForm />
        <View style={{paddingHorizontal: 20}}>
          <Title title="Segel Meter" />
          <Distance distanceV={10} />
          <View style={{paddingBottom: 5}}>
            <TextInput
              style={styles.search}
              value={searchfilter}
              onChangeText={item => setSearchfilter(item)}></TextInput>
          </View>
          <Distance distanceH={5} />
          <View style={{flexDirection: 'row'}}>
            {/* <TextInput style={styles.search} value={cari} onChangeText={(item) => setCari(item)} ></TextInput> */}

            <View style={{width: '60%'}}>
              <Dropdown
                items={[
                  {label: 'All', value: ''},
                  {label: 'Pending', value: 'pending'},
                  {label: 'Hambatan Segel', value: 'lock_resist'},
                  {label: 'Segel', value: 'lock'},
                  {label: 'Hambatan Cabut', value: 'unplug_resist'},
                  {label: 'Cabut', value: 'unplug'},
                ]}
                onChangeValue={item => {
                  setCari(item);
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

        <FlatList
          // ListHeaderComponent={<Text>Hallo</Text>}
          keyExtractor={(item, index) => index.toString()}
          data={ticket}
          ItemSeparatorComponent={ItemSeparatorView}
          contentContainerStyle={{alignItems: 'center'}}
          renderItem={renderItem}
          ListFooterComponent={loading ? <Text>Sedang Memuat</Text> : null}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0}
          onRefresh={onRefresh}
          refreshing={refresh}
        />
      </View>

      {/* </ScrollView> */}
      <Footer navigation={navigation} focus="Menu" />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  content: {
    borderWidth: 3,
    width: Dimensions.get('screen').width - 45,
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
export default Seal;
