// StockLocation.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

const ModelDetail = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  // Model data from the PDF
  const modelData = {
    model: 'X100',
    engineType: 'Diesel',
    horsepower: '100HP',
    dimension: '10ft x 5ft x 6ft',
    deliveryDate: '2026-3-15',
    image: 'https://image2url.com/images/1759736975224-fc97ba4f-b1b8-4087-a3e7-64a27c57d201.png' // Using the same image link
  };

  const DetailInput = ({label, value}) => (
    <View style={styles.detailInputContainer}>
      <Text style={styles.detailLabel}>{label}</Text>
      <TextInput
        style={styles.detailInput}
        value={value}
        editable={false}
        placeholderTextColor="black"
      />
    </View>
  );

  return (
    <SafeAreaView style={[styles.container,{paddingTop: insets.top, paddingBottom: insets.bottom},]}>
      {/* Header with Linear Gradient */}
      <LinearGradient
        colors={['#7E5EA9', '#20AEBC']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.header}>
        <View style={styles.headerContent}>
          {/* Left Side: Menu Icon */}
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={25} color="#fff" />
          </TouchableOpacity>
          
          {/* Center: Dashboard Text */}
          <View>
            <Text style={styles.headerText}>Makroo Motor Corp.</Text>
            <Text style={styles.headerText1}>Model Details</Text>
          </View>

          {/* Right Side: Icon */}
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="notifications-on" size={25} color="#fff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Model Image Section */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: modelData.image }}
            style={styles.modelImage}
          />
        </View>

        {/* Details Card */}
        <View style={styles.detailsCard}>
          <DetailInput label="Tractor Model" value={modelData.model} />
          <DetailInput label="Engine Type" value={modelData.engineType} />
          <DetailInput label="Horsepower" value={modelData.horsepower} />
          <DetailInput label="Dimension" value={modelData.dimension} />
          <DetailInput label="Delivery Date" value={modelData.deliveryDate} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  header: {
    paddingVertical: 6,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 18.5,
    color: '#fff',
    fontFamily: 'Inter_28pt-SemiBold',
  },
  headerText1: {
    fontSize: 14.5,
    color: '#fff',
    fontFamily: 'Inter_28pt-SemiBold',
    textAlign: 'center',
    top: -4,
  },
  iconButton: {
    top: -6,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  modelImage: {
    width: 220,
    height: 220,
  },
  detailsCard: {
    backgroundColor: '#fff',
    borderRadius: 13,
    padding: 20,
  },
  detailInputContainer: {
    marginBottom: 15,
  },
  detailLabel: {
    fontSize: 14,
    fontFamily: 'Inter_28pt-SemiBold',
    color: 'grey',
    marginBottom: 5,
  },
  detailInput: {
    fontSize: 14,
    fontFamily: 'Inter_28pt-Medium',
    color: 'black',
    borderBottomWidth: 1,
    borderBottomColor: '#7E5EA9',
    paddingVertical: 8,
    paddingHorizontal: 0,
  },
});

export default ModelDetail;