import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Row, Table } from 'react-native-table-component';
import { useSelector } from 'react-redux';
import { DataView, Footer, HeaderForm, Spinner, Title } from '../../../component';
import API from '../../../service';
import { Distance } from '../../../utils';
import { Rupiah } from '../../../utils/Rp';

const ViewSeal =({navigation, route})=>{
    const [tableData, setTableData] = useState([])
    const tableHead = ['No', 'Nomor REK', 'Periode', 'Tanggal', 'M3', 'Wajib Dibayar(Rp)', 'Terbayar(Rp)', 'Denda(Rp)', 'Sisa(Rp)'];
    const widthArr = [40, 60, 100, 100, 60, 140, 140, 100, 100]
    const TOKEN = useSelector((state) => state.TokenReducer);
    const [loading, setLoading] = useState(true)
    const isFocused = useIsFocused();
    const [customer, setCustomer] = useState([]);
    const [recap, setRecap] = useState([]);
   
    useEffect(() => {
        let isAmounted = true
        if (isAmounted) {
            ShowLock();
        }
        return () => {
            isAmounted = false;
        }
    }, [isFocused])

    const ShowLock = () => {
            Promise.all([API.lockShow(route.params.lock_id, TOKEN)]).then((result) => {
            setCustomer(result[0].data)
            setRecap(result[0][1])
            
            result[0][0].map((item, index) => {
                setTableData((tableData)=>[
                    ...tableData,
                    tableData = [index+1,
                                 item.norekening,
                                 item.periode,
                                 item.tanggal,
                                 item.m3,
                                 Rupiah(item.wajibdibayar),
                                 Rupiah(item.sudahbayar),
                                 Rupiah(item.denda),
                                 Rupiah(item.sisa)
                                ],
                  ]);
            })
            setLoading(false)
        }).catch((e) => {
            console.log(e.request);
            setLoading(false)
        })
    }

    return(
        <View style={styles.container}>
        {loading && <Spinner/>}
        <ScrollView>
            <HeaderForm/>
            <View style={{ paddingLeft: 10, flex: 1 }}>
            <Title title="Info Tunggakan"/>
                    <DataView title='Tahun Pembayaran' txt={customer.year}/>
                    <DataView title='Nomor Sambungan' txt={customer.nomorrekening}/>
                    <DataView title='Nama Pelanggan' txt={customer.namapelanggan}/>
                    <DataView title='Alamat' txt={customer.alamat}/>
                    <DataView title='Gol. Tarif' txt={customer.idgol}/>
                    <DataView title='Areal' txt={customer.idareal}/>
                    <DataView title='Status' txt={customer.status = '1' ? 'Aktif' : 'Pasif'}/>
                <Distance distanceV={10} />
            </View>
            <View style={{ alignItems: 'center' }}>
                <ScrollView horizontal={true} style={{ width: '95%' }}>
                    <View>
                        <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                            <Row data={tableHead} widthArr={widthArr} style={styles.header} textStyle={styles.text} />
                        </Table>
                        <ScrollView style={styles.dataWrapper}>
                            <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                                {
                                    tableData.map((rowData, index) => (
                                        <Row
                                            key={index}
                                            data={rowData}
                                            widthArr={widthArr}
                                            style={[styles.row]}
                                            textStyle={styles.text}
                                        />
                                    ))
                                }
                            </Table>
                        </ScrollView>
                    </View>
                </ScrollView>
            </View>
            <Distance distanceV={10} />
            <View style={{ paddingLeft: 10 }} >
                <Text style={{ fontSize: 19, color: '#696969', fontWeight: 'bold' }}>Jumlah Tunggakan</Text>
                <Distance distanceV={5} />
                    <DataView title='1. Tagihan Air' txt={Rupiah(parseFloat(recap.tagihan))}/>
                    <DataView title='2. Denda' txt={Rupiah(parseFloat(recap.denda))}/>
                    <DataView title='Total' txt={Rupiah(parseFloat(recap.total))} />
            </View>
            <Distance distanceV={10} />
        </ScrollView>
        <Footer navigation={navigation} focus='Menu' />
    </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        height: 50,
        backgroundColor: '#EAF4FA'
    },
    text: {
        textAlign: 'center',
        fontWeight: '100'
    },
    dataWrapper: {
        marginTop: -1
    },
    row: {
        height: 45,
        backgroundColor: '#FFFFFF'
    }
});
export default ViewSeal