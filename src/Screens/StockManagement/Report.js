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

const LAST_MONTH_DATA = [
  {id: '1', label: 'Sales', value: 3, icon: 'warehouse'},
  {id: '2', label: 'Billing', value: 3, icon: 'receipt'},
];

const CURRENT_MONTH_DATA = [
  {id: '3', label: 'Deliveries', value: 5, icon: 'local-shipping'},
  {id: '4', label: 'Billing', value: 6, icon: 'receipt'},
];

const STATUS_DATA = [
  {
    id: '1',
    title: '5050D',
    subtitle: 'Model Wise Delivery And billing Tracking',
    units: '1 Delivered',
    icon: 'inventory',
  },
];

export default function Report() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const renderMetric = ({item}) => (
    <LinearGradient
      colors={['#7E5EA9', '#20AEBC']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={styles.metricGradientBorder}>
      <View style={styles.metricCard}>
        <View style={{backgroundColor:"#7E5EA9",width: (width - 60.5) / 2,paddingVertical:14,borderTopRightRadius:14,borderTopLeftRadius:10,marginTop:-3}}>
       <Text style={styles.metricLabel}>{item.label}</Text>
       </View>
       <TouchableOpacity onPress={()=> navigation.navigate("ReportModelList")}>
        <Text style={styles.metricValue}>{item.value}</Text>
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
          <Text style={styles.statusUnits}>{item.units}</Text>
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
            <Text style={styles.headerText1}>Report</Text>
          </View>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="notifications-on" size={25} color="#fff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView
        contentContainerStyle={{paddingHorizontal: 15, paddingVertical: 20}}>
        {/* Monthly Report Section */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 5,
          }}>
          <Text style={styles.sectionTitle}>Monthly Report</Text>
          <TouchableOpacity
            style={{
              backgroundColor: '#7E5EA9',
              paddingHorizontal: 6,
              borderRadius: 5,
              paddingVertical: 3,
              alignSelf: 'center',
            }}>
            <Text style={{color: 'white', fontFamily: 'Inter_28pt-SemiBold'}}>
              Comparison
            </Text>
          </TouchableOpacity>
        </View>

        {/* Last Month Section */}
        <Text style={[styles.subSectionTitle, {marginTop: 20}]}>
          Last Month
        </Text>
        <FlatList
          data={LAST_MONTH_DATA}
          keyExtractor={i => i.id}
          renderItem={renderMetric}
          numColumns={2}
          scrollEnabled={false}
          contentContainerStyle={styles.metricsContainer}
          columnWrapperStyle={styles.columnWrapper}
        />

        {/* Current Month Section */}
        <Text style={[styles.subSectionTitle, {marginTop: 10}]}>
          Current Month
        </Text>
        <FlatList
          data={CURRENT_MONTH_DATA}
          keyExtractor={i => i.id}
          renderItem={renderMetric}
          numColumns={2}
          scrollEnabled={false}
          contentContainerStyle={styles.metricsContainer}
          columnWrapperStyle={styles.columnWrapper}
        />

        {/* Current Month Details */}
        <Text style={[styles.sectionTitle, {marginTop: 25}]}>
          Current Month Details
        </Text>
        <FlatList
          data={STATUS_DATA}
          keyExtractor={item => item.id}
          renderItem={renderStatus}
          scrollEnabled={false}
          contentContainerStyle={{gap: 16, marginTop: 10, marginBottom: 10}}
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
    fontSize: 15,
    color: '#fff',
    top: -3,
    textAlign: 'center',
    fontFamily: 'Inter_28pt-SemiBold',
  },
  iconButton: {top: -4},
  sectionTitle: {
    fontSize: 16,
    color: '#000',
    marginBottom: 8,
    fontFamily: 'Inter_28pt-SemiBold',
  },
  subSectionTitle: {
    fontSize: 14.5,
    color: '#000',
    marginBottom: 8,
    fontFamily: 'Inter_28pt-SemiBold',
    marginLeft: 5,
  },
  // Updated styles for grid layout
  metricsContainer: {
    marginTop: 10,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    gap: 15,
    marginBottom: 15,
  },
  metricCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    elevation: 0,
    paddingHorizontal: 15,
    alignItems: 'center',
    width: (width - 60) / 2, // Calculate width based on screen width minus padding and gap
    borderWidth: 1,
  },
  metricValue: {
    fontSize: 20,
    fontFamily: 'Inter_28pt-SemiBold',
    color: '#7E5EA9',
    paddingVertical:17
    
  },
  metricLabel: {
    fontSize: 15,
    color: 'white',
    marginTop: 3,
    fontFamily: 'Inter_28pt-SemiBold',
    textAlign:"center"
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
    marginBottom:5
  },
  statusTitle: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'Inter_28pt-SemiBold',
  },
  statusUnits: {
    fontSize: 14,
    fontWeight: '600',
    color: '#20AEBC',
    marginTop: 8,
    fontFamily: 'Inter_28pt-SemiBold',
    backgroundColor: 'white',
    paddingHorizontal: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
   statusSubtitle: {
    fontSize: 13,
    color: 'white',
    marginTop: 8,
    fontFamily: 'Inter_28pt-SemiBold',
  },
  metricGradientBorder: {
    borderRadius: 15,
    padding: 1,
  },
});