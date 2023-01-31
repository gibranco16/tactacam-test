import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Button } from 'react-native-elements'
import * as FileSystem from 'expo-file-system'
import * as MediaLibrary from 'expo-media-library'

const ImageScreen = ({ route }) => {

  const { image } = route.params

  const handleDownload = () => {
    downloadFile();
  }

  const downloadFile = async () => {
    try {
      let fileUri = FileSystem.documentDirectory + image.id + '.jpeg'
      const {uri} = await FileSystem.downloadAsync(image.links.download, fileUri)
      saveFile(uri)
    } catch (error) {
      console.log(error);
    }
    
  }

  const saveFile = async (fileUri) => {
    const {status} = await MediaLibrary.requestPermissionsAsync()
    if (status === 'granted') {
      const asset = await MediaLibrary.createAssetAsync(fileUri)
      await MediaLibrary.createAlbumAsync('Download', asset, false)
    }
  }

  return (
    <View style={styles.headerAuthor}>
      <Image source={{
          uri: image.urls.regular, height:350
        }}/>
        <View style={{
          display: "flex",
          paddingVertical: 18,
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: "center",
          width: "100%"
          }}>
          <View style={{display: 'flex', flexDirection:'row', alignItems: 'center'}}>
            <Image 
              source={{
                uri: image.user.profile_image.small ? image.urls.small : ''
              }}
              style={{height: 20, width:'20%'}}
            />
            <View style={{display: 'flex', flexDirection:'column', alignItems: 'left'}}>
              <Text style={styles.textAuthor}>Name: {image.user.name}</Text>
              <Text style={styles.textAuthor}>Username: {image.user.username}</Text>
            </View>
          </View>
          <Button title='Download' style={{ marginRight: 5}} onPress={() => handleDownload()}/>
        </View>
        <View style={{display: 'flex', flexDirection:'column', alignItems: 'left'}}>
              <Text style={styles.textAuthor}>Likes: {image.likes}</Text>
              <Text style={styles.textAuthor}>Description: {image.alt_description}</Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  headerAuthor: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    flexDirection: "column",
    padding: 10
  },
  textAuthor: {
    color: 'black',
    marginStart: 5,
    fontSize: 15
  }
});

export default ImageScreen