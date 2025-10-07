// src/Screens/StockManagement/InternalOverview.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

const { width } = Dimensions.get('window');

const OVERVIEW_DATA = [
  {id: '1', label: 'In Depot', value: 3, icon: 'warehouse'},
  {id: '2', label: 'In Transit', value: 6, icon: 'swap-horiz'},
  {id: '3', label: 'Delivered', value: 5, icon: 'local-shipping'},
  {id: '4', label: 'Billed', value: 3, icon: 'receipt'},
];

const LOCATION_DATA = [
  {id: '1', location: 'Ganderbal', units: 4},
  {id: '2', location: 'Budgam', units: 6},
];

const STATUS_DATA = [
  {
    id: '1',
    title: 'Stock Available',
    subtitle: 'Ready For Delivery Across Location',
    units: 4,
    icon: 'inventory',
  },
  {
    id: '2',
    title: 'In Transit',
    subtitle: 'Currently Being Moved between Location',
    units: 1,
    icon: 'swap-horiz',
  },
  {
    id: '3',
    title: 'Successfully Delivered',
    subtitle: 'Completed Deliveries To Customer',
    units: 6,
    icon: 'check-circle',
  },
];

export default function Overviewinternal() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const renderMetric = ({item}) => (
    <LinearGradient
      colors={['#7E5EA9', '#20AEBC']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={styles.metricGradientBorder}>
      <View style={styles.metricCard}>
        <Icon name={item.icon} size={28} color="#7E5EA9" />
        <Text style={styles.metricValue}>{item.value}</Text>
        <Text style={styles.metricLabel}>{item.label}</Text>
      </View>
    </LinearGradient>
  );

  const renderLocation = ({item}) => (
    <LinearGradient
      colors={['#7E5EA9', '#20AEBC']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={styles.locationGradientBorder}>
      <View style={styles.locationRow}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
          <Icon name="location-on" size={20} color="#7E5EA9" />
          <Text style={styles.locationText}>{item.location}</Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: '#7E5EA9',
            paddingHorizontal: 6,
            paddingVertical: 2,
            borderRadius: 5,
          }}>
          <Text style={styles.locationUnits}>{item.units} Units</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );

  const renderStatus = ({item}) => (
    <LinearGradient
      colors={['#7E5EA9', '#20AEBC']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={styles.gradientBorder}>
      <View style={styles.statusCard}>
        <View style={styles.statusHeader}>
          <Text style={styles.statusTitle}>{item.title}</Text>
          <TouchableOpacity>
          <Text style={styles.statusUnits}>{item.units} Units</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.statusSubtitle}>{item.subtitle}</Text>
      </View>
    </LinearGradient>
  );

  return (
    <SafeAreaView
      style={[
        styles.safe,
        {paddingTop: insets.top, paddingBottom: insets.bottom},
      ]}>
      <LinearGradient
        colors={['#7E5EA9', '#20AEBC']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate("Hamburger")}>
            <Icon name="reorder" size={25} color="#fff" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerText}>Makroo Motor Corp.</Text>
            <Text style={styles.headerText1}>Report Overview</Text>
          </View>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="notifications-on" size={25} color="#fff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView
        contentContainerStyle={{paddingHorizontal: 15, paddingVertical: 20}}>
        {/* Metrics Section */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 5,
          }}>
          <Text style={styles.sectionTitle}>5210 - Detailed Overview</Text>
          <TouchableOpacity
            style={{
              backgroundColor: '#7E5EA9',
              paddingHorizontal: 6,
              borderRadius: 5,
              paddingVertical: 3,
              alignSelf: 'center',
            }}>
            <Text style={{color: 'white', fontFamily: 'Inter_28pt-SemiBold'}}>
              Total 4
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* Updated Metrics FlatList with numColumns={2} */}
        <FlatList
          data={OVERVIEW_DATA}
          keyExtractor={i => i.id}
          renderItem={renderMetric}
          numColumns={2}
          scrollEnabled={false}
          contentContainerStyle={styles.metricsContainer}
          columnWrapperStyle={styles.columnWrapper}
        />

        {/* Location Distribution */}
        <Text style={styles.sectionTitle}>Location Wise Stock Distribution</Text>
        <FlatList
          data={LOCATION_DATA}
          keyExtractor={item => item.id}
          renderItem={renderLocation}
          scrollEnabled={false}
          contentContainerStyle={{gap: 10, marginVertical: 5}}
        />

        {/* Stock Status Overview */}
        <Text style={[styles.sectionTitle, {marginTop: 25}]}>
          Stock Status Overview
        </Text>
        <FlatList
          data={STATUS_DATA}
          keyExtractor={item => item.id}
          renderItem={renderStatus}
          scrollEnabled={false}
          contentContainerStyle={{gap: 16, marginTop: 10}}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {flex: 1},
  header: {
    paddingVertical: 8,
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
    top: -3,
    textAlign: 'center',
    fontFamily: 'Inter_28pt-SemiBold',
  },
  iconButton: {top: -4},
  sectionTitle: {
    fontSize: 15,
    color: '#000',
    marginBottom: 8,
    fontFamily: 'Inter_28pt-SemiBold',
  },
  // Updated styles for grid layout
  metricsContainer: {
    marginVertical: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    gap: 15,
    marginBottom: 15,
  },
  metricCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 0,
    padding: 15,
    alignItems: 'center',
    width: (width - 60) / 2, // Calculate width based on screen width minus padding and gap
    borderWidth: 1,
  },
  metricValue: {
    fontSize: 20,
    fontFamily: 'Inter_28pt-SemiBold',
    color: '#7E5EA9',
    marginTop: 6,
  },
  metricLabel: {
    fontSize: 13,
    color: '#333',
    marginTop: 3,
    fontFamily: 'Inter_28pt-Regular',
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
  gradientBorder: {
    borderRadius: 12,
    padding: 1.5,
  },
  statusCard: {
    borderRadius: 10,
    padding: 15,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusTitle: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Inter_28pt-SemiBold',
  },
  statusSubtitle: {
    fontSize: 13,
    color: 'white',
    marginTop: 8,
    fontFamily: 'Inter_28pt-SemiBold',
  },
  statusUnits: {
    fontSize: 14,
    fontWeight: '600',
    color: '#20AEBC',
    marginTop: 8,
    fontFamily: 'Inter_28pt-SemiBold',
    backgroundColor: 'white',
    paddingHorizontal: 5,
    borderRadius: 3,
    alignItems: 'center',
  },
  metricGradientBorder: {
    borderRadius: 15,
    padding: 1,
  },
});