import React from 'react';
import { Image,View,Text,StyleSheet} from 'react-native';

const HeaderForm2 =(props)=>{
    return(
        <View style={styles.Container}>
            <Image source={require('../../assets/img/HeaderForm.png')} style={styles.imageStyle}/>
        </View>
    )
}

const styles = StyleSheet.create({
    Container:{
        alignItems:'center'
    },
    imageStyle:{
        width:'100%', 
        height:50,
        top:0
    },
});
export default HeaderForm2