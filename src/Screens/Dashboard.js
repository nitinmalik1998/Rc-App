import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Dashboard = ({navigation}) => {
  const insets = useSafeAreaInsets();

  const menuItems = [
    { id: '1', title: "Stock Management", colors: ['#7E5EA9', '#20AEBC'],navigation:"Overview" },
    { id: '2', title: "Expected Delivery & Payment", colors: ['#1AB3BB', '#324162'],navigation:"ExpectedDeliveryPayment" },
    { id: '3', title: "RC Delivery", colors: ['#7E5EA9', '#20AEBC'],navigation:"Rcpage" },
    { id: '4', title: "PDI Inspection", colors: ['#AC62A1', '#EF8549'],navigation:"PDIPage" },
    { id: '5', title: "Customers", colors: ['#EE8C45', '#1AB3BB'],navigation:"Customerspage" },
    { id: '6', title: "Delivery Challan", colors: ['#1AB3BB', '#324162'],navigation:"DeliveryChallan" },
    { id: '7', title: "Form Status", colors: ['#7E5EA9', '#20AEBC'],navigation:"Formstatus" },
  ];

  const renderMenuItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate(item.navigation)} style={styles.menuBox}>
      <LinearGradient
        colors={item.colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.menuGradient}
      >
        <Text style={styles.menuText}>{item.title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  const keyExtractor = (item) => item.id;

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
         <StatusBar backgroundColor="white" barStyle="dark-content" />
      {/* Header with Linear Gradient */}
      <LinearGradient
        colors={['#7E5EA9', '#20AEBC']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          {/* Left Side: Image */}
          <Image 
            source={require('../Asset/Images/profilerc.jpg')}
            style={styles.headerImage}
          />
          
          {/* Center: Dashboard Text */}
          <Text style={styles.headerText}>Dashboard</Text>
          
          {/* Right Side: Icon */}
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="notifications-on" size={25} color="#fff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* FlatList for Menu Items */}
      <FlatList
        data={menuItems}
        renderItem={renderMenuItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.menuContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
      },
  header: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerImage: {
    height: 45,
    width: 45,
    borderRadius: 35,
  },
  headerText: {
    fontSize: 22,
    color: '#fff',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 10,
    fontFamily:"Inter_28pt-SemiBold"
  },
  iconButton: {
    padding: 5,
  },
  menuContainer: {
    padding: 20,
  },
  menuBox: {
    width: '100%',
    height: 60,
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
  },
  menuGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuText: {
    color: '#fff',
    fontSize: 16.5,
    fontFamily:"Inter_28pt-SemiBold"
  },
});

export default Dashboard;