import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getImages } from '../api/dataservices/UnsplashDataService';
import ImageList from '../components/ImageList';
import { Input, Button } from 'react-native-elements';
import { SelectList } from 'react-native-dropdown-select-list';

const HomeScreen = ({openSearch}) => {

  const [photos, setPhotos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [perPage, setPerPage] = useState(10);

  const [selectedColor, setSelectedColor] = React.useState("black");
  const [selectedOrientation, setSelectedOrientation] = React.useState("landscape");

  const colors = [
      {key:'1', value:'white'},
      {key:'2', value:'black'},
      {key:'3', value:'yellow'},
      {key:'4', value:'orange'},
      {key:'5', value:'red'},
      {key:'6', value:'purple'},
      {key:'7', value:'green'},
      {key:'7', value:'blue'},
  ]

  const orientation = [
    {key:'1', value:'landscape'},
    {key:'2', value:'portrait'},
    {key:'3', value:'squarish'},
]

  const loadImages = async (searchTerm, selectedOrientation, selectedColor) => {
    const res = await getImages(searchTerm, selectedOrientation, selectedColor);
    setPhotos(res.data.results);
  };

  useEffect(() => {
    loadImages();
  }, []);

  const handleSearch = async () => {
    await loadImages(searchTerm, selectedOrientation, selectedColor);
  }

  const handleOnLoadMore = () => {
    setPerPage(perPage + 10)
  }

  return (
    < >
    {openSearch && (
    <View style={styles.searchSection}>
      <Input 
        leftIcon={{type: "feather", name: "search", color: "#000" }} 
        placeholder='Search' 
        style={styles.searchInput}
        onChangeText={(value) => setSearchTerm(value)} />

      <View style={{paddingBottom: 5}}>
        <SelectList setSelected={(val) => setSelectedColor(val)}
        data={colors}
        save="value"
        placeholder='Select Color'/>
      </View>

      <View style={{paddingBottom: 5}}>
        <SelectList setSelected={(val) => setSelectedOrientation(val)}
        data={orientation}
        save="value"
        placeholder='Select orientation'/>
      </View>

      <Button 
        title='Search' 
        style={styles.searchButton} 
        onPress={() => handleSearch() }/>
    </View>
    )}
    <View style={styles.container}>
      <ImageList photos={photos}/>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    alignItems: 'center',
    justifyContent: 'center'
  },
  totalResultText: {
    color: "#D0D0D0",
    textAlign: "right",
    width: "100%",
    paddingTop: 35,
    paddingBottom: 5
  },
  searchSection: {
    backgroundColor: '0d0d0d',
    width: '100%',
    paddingLeft: 10,
  },
  searchInput: {
    backgroundColor: '2c292c',
    borderBottomWidth: 0,
    paddingHorizontal: 4
  },
  searchButton: {
    paddingBottom: 5,
    paddingEnd:10
  }
});

export default HomeScreen