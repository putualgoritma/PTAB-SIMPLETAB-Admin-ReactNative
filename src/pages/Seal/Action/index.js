import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  ImageBackground,
} from 'react-native';
import {useSelector} from 'react-redux';
import {
  BtnAdd,
  BtnDelete,
  BtnDetail,
  BtnEdit,
  BtnStaff,
  Footer,
  HeaderForm,
  Spinner,
  Title,
  BtnEditStatus,
} from '../../../component';
import API from '../../../service';
import {colors, Distance} from '../../../utils';

const TextInfo = props => {
  return (
    <View style={{paddingBottom: 5}}>
      <View style={{flexDirection: 'column', height: 'auto'}}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Text style={styles.textTiltle}>{props.title}</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.textTiltle}></Text>
          </View>
        </View>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text style={styles.textItem}>{props.item}</Text>
        </View>
      </View>
    </View>
  );
};

const ActionSeal = ({navigation, route}) => {
  const Permission = useSelector(state => state.PermissionReducer);
  const [loading, setLoading] = useState(true);
  const TOKEN = useSelector(state => state.TokenReducer);
  const isFocused = useIsFocused();
  const [actions, setActions] = useState(null);
  const [loadingImage, setLoadingImage] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const USER = useSelector(state => state.UserReducer);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    API.actionslock({lockaction_id: route.params.ticket.id}, TOKEN)
      .then(result => {
        console.log('nilai staf', result);
        setActions(result.data);
        setLoading(false);
      })
      .catch(e => {
        console.log(e.request);
      })
      .finally(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    let isAmounted = true;
    if (isAmounted) {
      actionsAPi();
    }

    return () => {
      isAmounted = false;
    };
  }, [isFocused]);

  const actionsAPi = () => {
    API.actionslock({lockaction_id: route.params.ticket.id}, TOKEN)
      .then(result => {
        console.log('nilai staf', result);
        setActions(result.data);
        setLoading(false);
        // console.log('nilai staf', result.data)
      })
      .catch(e => {
        console.log(e.request);
        setLoading(false);
      });
  };

  const handleDelete = $id => {
    setLoading(true);
    API.lockactionsDelete($id, TOKEN)
      .then(result => {
        // console.log(result);
        alert(result.data.message);
        ticketsAPi();
        setLoading(false);
      })
      .catch(e => {
        console.log(e.request);
        setLoading(false);
      });
  };

  // const imagefoto = (JSON.parse(item.image)[0])
  return (
    <View style={styles.container}>
      {loading && <Spinner />}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <HeaderForm />
        <View style={{alignItems: 'center', flex: 1}}>
          <View style={{width: '90%'}}>
            <Title title="Daftar Tindakan" />
            {Permission.includes('lock_action_create') && (
              <BtnAdd
                title="Tambah Tindakan"
                width="60%"
                icon={faPlusCircle}
                onPress={() =>
                  navigation.navigate('AddActionSeal', {
                    ticket: route.params.ticket,
                  })
                }
              />
            )}
            <Distance distanceV={10} />

            {actions &&
              actions.map((item, index) => {
                // const imagefoto = (JSON.parse(item.image)[0])
                var imagefoto =
                  item.image != ''
                    ? (imagefoto = JSON.parse(item.image)[0])
                    : null;

                // console.log('foto ini', imagefoto)
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

                if (item.type == 'unplug') {
                  item.type = 'Cabut';
                } else if (item.type == 'lock') {
                  item.type = 'Segel';
                } else if (item.type == 'lock_resist') {
                  item.type = 'Hambatan Segel';
                } else if (item.type == 'unplug_resist') {
                  item.type = 'Hambatan Cabut';
                }
                return (
                  <View style={{alignItems: 'center'}}>
                    {/* <View style={{ backgroundColor: colorStatus, width: 200, height: 35, borderTopRightRadius: 15, borderTopLeftRadius: 15, alignItems: 'center' }}>
                                        <Text style={styles.textStatus}>{item.status}</Text>
                                    </View> */}
                    <View style={[styles.content, {borderColor: borderStatus}]}>
                      <View style={{flexDirection: 'row'}}>
                        <View
                          style={{
                            flex: 1,
                            height: 150,
                            paddingTop: 3,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <ImageBackground
                            source={require('../../../assets/img/ImageLoading.gif')}
                            style={{width: 120, height: 150}}>
                            <Image
                              source={{
                                uri:
                                  `https://simpletabadmin.ptab-vps.com/pdf/` +
                                  `${String(imagefoto).replace(
                                    'public/',
                                    '',
                                  )}?time="${new Date()}`,
                              }}
                              style={{width: 120, height: 150}}
                            />
                          </ImageBackground>
                        </View>
                        <View style={[styles.textnfo, {flex: 1.5}]}>
                          <TextInfo title="Tanggal" item={item.created_at} />
                          <TextInfo title="Memo" item={item.memo} />
                          <TextInfo title="Type" item={item.type} />
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
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                          paddingVertical: 5,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            width: '45%',
                            height: 'auto',
                            paddingTop: 5,
                          }}>
                          {Permission.includes('lock_action_show') && (
                            <BtnDetail
                              onPress={() =>
                                navigation.navigate('ViewActionSeal', {
                                  action: item,
                                })
                              }
                            />
                          )}
                          {item.status != 'close' &&
                            Permission.includes('lock_action_delete') && (
                              <BtnDelete
                                onPress={() => handleDelete(item.id)}
                              />
                            )}
                        </View>
                      </View>
                    </View>
                    <Distance distanceV={10} />
                  </View>
                );
              })}
          </View>
        </View>
      </ScrollView>
      <Footer navigation={navigation} focus="Home" />
    </View>
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
    backgroundColor: '#ffffff',
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
export default ActionSeal;
