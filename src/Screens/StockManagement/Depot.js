// StockLocation.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';


const LOCATION_DATA = [
  {id: '1', location: '5050D', units: 4},
  {id: '2', location: '5210', units: 6},
   { id: '3', location: '3036EN', units: 3 },
  { id: '4', location: '3028EN', units: 12 },
  {id: '5', location: '5050D', units: 4},
  {id: '6', location: '5210', units: 6},
   { id: '7', location: '3036EN', units: 3 },
  { id: '8', location: '3028EN', units: 12 },
];

const Depot = () => {

const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const renderLocation = ({item}) => (
      <LinearGradient
        colors={['#7E5EA9', '#20AEBC']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.locationGradientBorder}>
        <View style={styles.locationRow}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
           
            <Text style={styles.locationText}>{item.location}</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("DepotModelList")}
            style={{
              backgroundColor: '#7E5EA9',
              paddingHorizontal: 10,
              paddingVertical: 2,
              borderRadius: 5,
            }}>
            <Text style={styles.locationUnits}>{item.units} QTY</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
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
                    onPress={() => navigation.navigate("Hamburger")}
                   >
                    <Icon name="reorder" size={25} color="#fff" />
                  </TouchableOpacity>
                  
                  {/* Center: Dashboard Text */}
                  <View>
                    <Text style={styles.headerText}>Makroo Motor Corp.</Text>
                    <Text style={styles.headerText1}>Depot</Text>
                  </View>
      
                  {/* Right Side: Icon */}
                  <TouchableOpacity style={styles.iconButton}>
                    <Icon name="notifications-on" size={25} color="#fff" />
                  </TouchableOpacity>
                </View>
              </LinearGradient>
              <ScrollView  contentContainerStyle={{paddingHorizontal: 15, paddingVertical: 20}}>
                <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 5,
                            marginBottom:15
                          }}>
                          <Text style={styles.sectionTitle}>Depot Inventory</Text>
                          <TouchableOpacity
                            style={{
                              backgroundColor: '#7E5EA9',
                              paddingHorizontal: 6,
                              borderRadius: 5,
                              paddingVertical: 3,
                              alignSelf: 'center',
                            }}>
                            <Text style={{color: 'white', fontFamily: 'Inter_28pt-SemiBold'}}>
                              Total- 25
                            </Text>
                          </TouchableOpacity>
                        </View>
      <FlatList
               data={LOCATION_DATA}
               keyExtractor={item => item.id}
               renderItem={renderLocation}
               scrollEnabled={false}
               contentContainerStyle={{gap: 10, marginVertical: 15,paddingHorizontal:10}}
             />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  header: {
    fontSize: 20,
    fontFamily: 'Inter_28pt-SemiBold',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 8,
     fontFamily: 'Inter_28pt-SemiBold',
  },
  units: {
    color: '#fff',
    fontSize: 16,
    marginTop: 8,
     fontFamily: 'Inter_28pt-SemiBold',
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
   sectionTitle: {
    fontSize: 15,
    color: '#000',
    marginBottom: 8,
    fontFamily: 'Inter_28pt-SemiBold',
    flex:1,
  },
  locationGradientBorder: {
    borderRadius: 12,
    padding: 1.5,
  },
  locationRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
    
  },
  locationText: {
    fontSize: 13,
    color: '#000',
    fontFamily: 'Inter_28pt-Regular',
  },
  locationUnits: {
    fontSize: 12.5,
    color: 'white',
    fontFamily: 'Inter_28pt-SemiBold',
  },

});

export default Depot;
