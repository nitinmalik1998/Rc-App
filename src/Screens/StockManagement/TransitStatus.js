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
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

const TRANSIT_DATA = [
  {id: '1', code: '5050D', quantity: '2', status: 'HO - Ganderbal'},
  {id: '2', code: '5210', quantity: '1', status: 'Depot - Budgam'},
  {id: '3', code: '3036EN', quantity: '1', status: 'In Transit'},
  {id: '4', code: '3028EN', quantity: '2', status: 'In Transit'},
  {id: '5', code: '5210', quantity: '1', status: 'Depot - Budgam'},
  {id: '6', code: '3036EN', quantity: '1', status: 'In Transit'},
  {id: '7', code: '3036EN', quantity: '1', status: 'In Transit'},
  {id: '8', code: '3028EN', quantity: '2', status: 'In Transit'},
];

const TransitStatus = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const renderTransitItem = ({item}) => {
    // Condition: HO or Depot should be styled differently
    const isDepotOrHO =
      item.status === 'HO - Ganderbal' || item.status === 'Depot - Budgam';

    return (
      <LinearGradient
        colors={['#7E5EA9', '#20AEBC']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.itemGradientBorder}>
        <View style={styles.itemRow}>
          <View style={styles.itemLeft}>
            <View style={styles.itemTextContainer}>
              <Text style={styles.itemCode}>{item.code}</Text>
              <Text style={styles.itemQuantity}>{item.quantity}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={[
              styles.statusContainer,
              isDepotOrHO && {
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: '#dddd',
              },
            ]}>
            <Text
              style={[
                styles.statusText,
                isDepotOrHO && {color: 'grey'},
              ]}>
              {item.status}
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        {paddingTop: insets.top, paddingBottom: insets.bottom},
      ]}>
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
            onPress={() => navigation.navigate('Hamburger')}>
            <Icon name="reorder" size={25} color="#fff" />
          </TouchableOpacity>

          {/* Center: Dashboard Text */}
          <View>
            <Text style={styles.headerText}>Makroo Motor Corp.</Text>
            <Text style={styles.headerText1}>Transit Status</Text>
          </View>

          {/* Right Side: Icon */}
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="notifications-on" size={25} color="#fff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView
        contentContainerStyle={{paddingHorizontal: 15, paddingVertical: 20}}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Transit Status</Text>
          <TouchableOpacity style={styles.inTransitBadge}>
            <Text style={styles.inTransitText}>6 in Transit</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={TRANSIT_DATA}
          keyExtractor={item => item.id}
          renderItem={renderTransitItem}
          scrollEnabled={false}
          contentContainerStyle={styles.flatListContent}
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 15,
    color: '#000',
    marginBottom: 8,
    fontFamily: 'Inter_28pt-SemiBold',
    flex: 1,
  },
  inTransitBadge: {
    backgroundColor: '#7E5EA9',
    paddingHorizontal: 6,
    borderRadius: 5,
    paddingVertical: 3,
    alignSelf: 'center',
  },
  inTransitText: {
    color: 'white',
    fontFamily: 'Inter_28pt-SemiBold',
  },
  flatListContent: {
    gap: 10,
    marginVertical: 15,
    paddingHorizontal: 10,
  },
  itemGradientBorder: {
    borderRadius: 12,
    padding: 1.5,
  },
  itemRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  itemTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  itemCode: {
    fontSize: 14,
    color: '#000',
    fontFamily: 'Inter_28pt-SemiBold',
  },
  itemQuantity: {
    fontSize: 14,
    color: '#000',
    fontFamily: 'Inter_28pt-Regular',
    backgroundColor: '#ddd',
    paddingHorizontal: 5,
    borderRadius: 3,
  },
  statusContainer: {
    backgroundColor: '#7E5EA9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
  },
  statusText: {
    fontSize: 12.5,
    color: 'white',
    fontFamily: 'Inter_28pt-SemiBold',
  },
});

export default TransitStatus;
