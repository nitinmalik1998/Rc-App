// src/Screens/StockManagement/Overview.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

const DATA = [
  {
    id: '1',
    title: '5050D',
    subtitle: 'Model Inventory Overview',
    delivered: 5,
    locations: 8,
    inTransit: 2,
    depot: 4,
    billed: 3,
    units: 5,
  },
  {
    id: '2',
    title: '5050D',
    subtitle: 'Model Inventory Overview',
    delivered: 5,
    locations: 8,
    inTransit: 2,
    depot: 4,
    billed: 3,
    units: 5,
  },
  {
    id: '3',
    title: '5050D',
    subtitle: 'Model Inventory Overview',
    delivered: 5,
    locations: 8,
    inTransit: 2,
    depot: 4,
    billed: 3,
    units: 5,
  },
  {
    id: '4',
    title: '5050D',
    subtitle: 'Model Inventory Overview',
    delivered: 5,
    locations: 8,
    inTransit: 2,
    depot: 4,
    billed: 3,
    units: 5,
  },
];

export default function Overview() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const renderCard = ({item}) => (
    <LinearGradient
      colors={['#7E5EA9', '#20AEBC']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={styles.gradientBorder}>
      <View style={styles.cardContainer}>
        <View style={styles.cardGradient}>
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.title}>{item.title}</Text>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: 'white',
                padding: 2,
                borderRadius: 5,
                paddingHorizontal: 12,
              }}>
              <Text style={styles.subtitle}>{item.units} units</Text>
            </TouchableOpacity>
          </View>
        </View>
        

        <View style={styles.metricsRow}>
           <View style={styles.metricCol}>
            <View style={styles.metricWithIcon}>
              <Icon
                name="location-on"
                size={19}
                color="#7E5EA9"
                style={styles.metricIcon}
              />
              <Text style={styles.metricLabel}>Location :</Text>
            </View>
            <Text style={styles.metricValue}>{item.locations}</Text>
          </View>
          
         <View style={styles.metricCol}>
            <View style={styles.metricWithIcon}>
              <Icon
                name="warehouse"
                size={20}
                color="#7E5EA9"
                style={styles.metricIcon}
              />
              <Text style={styles.metricLabel}>Depot :</Text>
            </View>
            <Text style={styles.metricValue}>{item.depot}</Text>
          </View>
        </View>

        <View style={styles.metricsRow}>
          <View style={styles.metricCol}>
            <View style={styles.metricWithIcon}>
              <Icon
                name="swap-horiz"
                size={20}
                color="#7E5EA9"
                style={styles.metricIcon}
              />
              <Text style={styles.metricLabel}>In Transits :</Text>
            </View>
            <Text style={styles.metricValue}>{item.inTransit}</Text>
          </View>
          
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.metricWithIcon}>
              <Icon
                name="receipt"
                size={20}
                color="#7E5EA9"
                style={styles.metricIcon}
              />
              <Text style={styles.metricLabel}>Billed :</Text>
            </View>
            <Text style={[styles.metricValue, {marginLeft: 6}]}>
              {item.billed}
            </Text>
          </View>
        </View>

        <View style={[styles.metricsRow, {justifyContent: 'space-between'}]}>
           <View style={styles.metricCol}>
            <View style={styles.metricWithIcon}>
              <Icon
                name="local-shipping"
                size={19}
                color="#7E5EA9"
                style={styles.metricIcon}
              />
              <Text style={styles.metricLabel}>Delivered :</Text>
            </View>
            <Text style={styles.metricValue}>{item.delivered}</Text>
          </View>
          <TouchableOpacity style={styles.detailsButton} onPress={() =>navigation.navigate("Overviewinternal")}>
            <Text style={styles.detailsText}>View Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );

  return (
    <View
      style={[
        styles.safe,
        {paddingTop: insets.top, paddingBottom: insets.bottom},
      ]}>
      <View>
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
              <Text style={styles.headerText1}>Overview</Text>
            </View>

            {/* Right Side: Icon */}
            <TouchableOpacity style={styles.iconButton}>
              <Icon name="notifications-on" size={25} color="#fff" />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Heading before FlatList */}
        <FlatList
          data={DATA}
          ListHeaderComponent={
            <Text style={styles.listHeading}>Model Inventory Overview</Text>
          }
          keyExtractor={i => i.id}
          renderItem={renderCard}
          contentContainerStyle={{
            padding: 20,
            paddingBottom: '25%',
            gap: 20,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {flex: 1},
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
  gradientBorder: {
    borderRadius: 12,
    padding: 1.5,
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 10,
    paddingBottom: 10,
  },
  cardGradient: {
    padding: 15,
    backgroundColor: '#7E5EA9',
    borderRadius: 10,
    paddingHorizontal: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {fontSize: 18, color: '#fff', fontWeight: '700'},
  subtitle: {
    fontSize: 12,
    color: '#7E5EA9',
    marginTop: 2,
    fontFamily: 'Inter_28pt-SemiBold',
  },
  icon: {color: 'rgba(255,255,255,0.95)'},
  metricsRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    alignItems: 'center',
    paddingHorizontal: 18,
    justifyContent: 'space-between',
  },
  metricCol: {flexDirection: 'row'},
  metricLabel: {
    fontSize: 13,
    color: '#000000E5',
    fontFamily: 'Inter_28pt-SemiBold',
  },
  metricValue: {
    fontSize: 16,
    color: '#7E5EA9',
    fontFamily: 'Inter_28pt-SemiBold',
    marginLeft: 10,
  },
  metricWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricIcon: {
    marginRight: 8,
  },
  detailsButton: {
    backgroundColor: '#7E5EA9',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  detailsText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Inter_28pt-SemiBold',
  },
  listHeading: {
    fontSize: 16,
    color: '#000000',
    fontFamily: 'Inter_28pt-SemiBold',
  },
});