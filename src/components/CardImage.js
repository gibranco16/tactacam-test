import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const CardImage = ({image}) => {

  const navigation = useNavigation();

  return (
    <TouchableOpacity 
      style={styles.cardImage} 
      onPress = {() => navigation.navigate("ImageScreen", { image })} >
      <Image 
        source={{
          uri: image.urls.small ? image.urls.small : ''
        }}
        style={{height:180, width:'100%'}}

      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  cardImage: {
    display:'flex',
    width: '49.5%',
    margin:  4,
    justifyContent:'space-between',
    backgroundColor: '#2c292c',
    borderWidth: 0,
    borderRadius: 5
  }
});

export default CardImage