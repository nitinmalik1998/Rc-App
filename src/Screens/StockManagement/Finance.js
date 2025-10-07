// Finance.js
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

const FINANCE_DATA = [
  {id: '1', type: 'JDF', value: 2},
  {id: '2', type: 'JKB', value: 2},
  {id: '3', type: 'CASH', value: 2},
  {id: '4', type: 'OTHER', value: 5},
];

// Map type → background color
const FINANCE_COLORS = {
  JPF: '#7E5EA9',
  JKB: '#20AEBC',
  CASH: '#12C857',
  OTHER: '#1273D4',
};

const Finance = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const renderFinanceItem = ({item}) => {
    const bgColor = FINANCE_COLORS[item.type] || '#7E5EA9';
    return (
     
        <View style={[styles.financeRow, {backgroundColor: bgColor}]}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 6}}>
            <Text style={styles.financeText}>{item.type}</Text>
          </View>
          <TouchableOpacity onPress={()=> navigation.navigate("FinanceModelList")}
            style={{
              backgroundColor: 'white',
              paddingHorizontal: 25,
              paddingVertical: 4,
              borderRadius: 5,
            }}>
            <Text style={styles.financeValue}>{item.value}</Text>
          </TouchableOpacity>
        </View>
    
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
            <Text style={styles.headerText1}>Finance</Text>
          </View>

          {/* Right Side: Icon */}
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="notifications-on" size={25} color="#fff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView
        contentContainerStyle={{paddingHorizontal: 15, paddingVertical: 20}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 5,
            marginBottom: 15,
          }}>
          <Text style={styles.sectionTitle}>Finance And Billing</Text>
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
          data={FINANCE_DATA}
          keyExtractor={item => item.id}
          renderItem={renderFinanceItem}
          scrollEnabled={false}
          contentContainerStyle={{
            gap: 10,
            marginVertical: 15,
            paddingHorizontal: 10,
          }}
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
  sectionTitle: {
    fontSize: 15,
    color: '#000',
    marginBottom: 8,
    fontFamily: 'Inter_28pt-SemiBold',
    flex: 1,
  },
  financeGradientBorder: {
    borderRadius: 12,
    padding: 1.5,
  },
  financeRow: {
    flexDirection: 'row',
    borderRadius: 10,
    padding: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  financeText: {
    fontSize: 13,
    color: '#fff',
    fontFamily: 'Inter_28pt-SemiBold',
  },
  financeValue: {
    fontSize: 12.5,

    fontFamily: 'Inter_28pt-SemiBold',
  },
});

export default Finance;
