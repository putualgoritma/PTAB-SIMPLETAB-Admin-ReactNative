import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { IconKategori,IconPermissions } from '../../../assets/icon';
import { Footer, HeaderMenu, Menu, TitleMenu } from '../../../component';

const MenuSeal=({navigation})=>{
    const Permission = useSelector((state) => state.PermissionReducer);
    return(
        <View style={styles.container}>
            <ScrollView>
                <HeaderMenu/>
                <TitleMenu title='SEGEL METER'/>
                    <Menu icon={<IconKategori/>} title='INFO TUNGGAKAN' onPress={()=>navigation.navigate('Arrears')}/>
                    <Menu icon={<IconPermissions/>} title='INFO SEGEL' onPress={()=>navigation.navigate('SealMeter')}/>
            </ScrollView>
            <Footer navigation={navigation} focus='Menu' />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFFFFF'
    },
})
export default MenuSeal