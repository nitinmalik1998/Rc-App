import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

const Formstatus = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [activeButton, setActiveButton] = useState('RC'); // Default active button

  // Sample form data
  const formData = [
    { 
      formNo: '12345', 
      chassisNo: '98765', 
      date: '2023-08-15', 
      status: 'Complete',
      formType: 'RC',
      customer: 'Olivia Carter'
    },
    { 
      formNo: '67890', 
      chassisNo: '54321', 
      date: '2023-08-20', 
      status: 'Pending',
      formType: 'RC',
      customer: 'Ethan Harper'
    },
    { 
      formNo: '11223', 
      chassisNo: '13579', 
      date: '2023-08-25', 
      status: 'Complete',
      formType: 'RC',
      customer: 'Sophia Bennett'
    },
    { 
      formNo: '44556', 
      chassisNo: '24680', 
      date: '2023-09-01', 
      status: 'Pending',
      formType: 'RC',
      customer: 'Noah Foster'
    },
    { 
      formNo: '77889', 
      chassisNo: '11223', 
      date: '2023-09-05', 
      status: 'Complete',
      formType: 'RC',
      customer: 'Ava Coleman'
    },
  ];

  const handleHome = () => {
    navigation.navigate('Dashboard');
  };

  const handleSearch = () => {
    setShowSearchModal(true);
  };

  const handleSearchSubmit = () => {
    setShowSearchModal(false);
    Alert.alert('Search', `Searching for: ${searchQuery}`);
  };

  const handleRC = () => {
    setActiveButton('RC');
    Alert.alert('RC', 'RC forms functionality');
  };

  const handlePDI = () => {
    setActiveButton('PDI');
    Alert.alert('PDI', 'PDI forms functionality');
  };

  const handleChallan = () => {
    setActiveButton('Challan');
    Alert.alert('Challan', 'Challan forms functionality');
  };

  const getStatusColor = (status) => {
    return status === 'Complete' ? '#149418' : '#FF6B00';
  };

  const getStatusBackground = (status) => {
    return status === 'Complete' ? '#E8F5E8' : '#FFF3E8';
  };

  // Function to get button style based on active state
  const getButtonStyle = (buttonName) => {
    return activeButton === buttonName ? styles.actionButtonActive : styles.actionButtonInactive;
  };

  // Function to get button text style based on active state
  const getButtonTextStyle = (buttonName) => {
    return activeButton === buttonName ? styles.actionTextActive : styles.actionTextInactive;
  };

  const renderFormItem = ({item, index}) => (
    <TouchableOpacity style={styles.formItem} onPress={ () => navigation.navigate('Forminternalpage')}>
      <View style={styles.formHeader}>
        <Text style={styles.formNo}>Form No: {item.formNo}</Text>
        <View style={[
          styles.statusBadge,
          {backgroundColor: getStatusBackground(item.status)}
        ]}>
          <Text style={[
            styles.statusText,
            {color: getStatusColor(item.status)}
          ]}>
            {item.status}
          </Text>
        </View>
      </View>
      
      <View style={styles.formDetails}>
        <Text style={styles.detailText}>
          Chassis No: {item.chassisNo}, Date: {item.date}
        </Text>
        <Text style={styles.detailText}>
          Form Type: {item.formType}, Customer: {item.customer}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View
      style={{flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom}}>
      {/* Header with Gradient */}
      <LinearGradient
        colors={['#7E5EA9', '#20AEBC']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.header}>
        <Text style={styles.screenTitle}>Form Status</Text>
      </LinearGradient>

      <ScrollView style={styles.container}>
        {/* Search Input */}
        <View style={styles.section}>
          <LinearGradient
            colors={['#7E5EA9', '#20AEBC']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.searchInputGradient}>
            <View style={styles.searchInputContainer}>
              <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="By Form No./ Chassis No."
                placeholderTextColor="#666"
              />
            </View>
          </LinearGradient>
        </View>

        {/* Quick Actions Section */}
        <View style={styles.section}>
          <View style={styles.quickActions}>
            <TouchableOpacity 
              style={[styles.actionButton, getButtonStyle('RC')]}
              onPress={handleRC}
            >
              <View style={styles.actionButtonContent}>
                <Text style={[styles.actionText, getButtonTextStyle('RC')]}>RC</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.actionButton, getButtonStyle('PDI')]}
              onPress={handlePDI}
            >
              <View style={styles.actionButtonContent}>
                <Text style={[styles.actionText, getButtonTextStyle('PDI')]}>PDI</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.actionButton, getButtonStyle('Challan')]}
              onPress={handleChallan}
            >
              <View style={styles.actionButtonContent}>
                <Text style={[styles.actionText, getButtonTextStyle('Challan')]}>Challan</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Forms Header */}
        <View style={styles.section}>
          <View style={styles.formsHeader}>
            <Text style={styles.formsTitle}>Forms</Text>
            <View style={styles.formsSubheader}>
              <TouchableOpacity style={styles.formsSubheaderItem}>
                <Text style={styles.subheaderText}>Date</Text>
                <Icon name="keyboard-arrow-down" size={16} color="white" style={styles.subheaderIcon} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.formsSubheaderItem}>
                <Text style={styles.subheaderText}>Customers</Text>
                <Icon name="keyboard-arrow-down" size={16} color="white" style={styles.subheaderIcon} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Forms List */}
        <View style={styles.section}>
          {formData.map((item, index) => (
            <View key={index}>
              {renderFormItem({item, index})}
            </View>
          ))}
        </View>

      </ScrollView>

     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  screenTitle: {
    fontSize: 20,
    fontFamily: 'Inter_28pt-SemiBold',
    color: 'white',
    textAlign: 'center',
  },
  section: {
    marginBottom: 10,
  },
  // Search Input Styles
  searchInputGradient: {
    borderRadius: 10,
    padding: 1,
    marginTop: 15,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 9,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    fontFamily: 'Inter_28pt-Regular',
    color: '#333',
  },
  // Quick Actions Styles
  quickActions: {
    flexDirection: 'row',
    marginTop: 10,
  },
  actionButton: {
    marginHorizontal: 10,
  },
  actionButtonContent: {
    paddingVertical: 2,
    paddingHorizontal: 10,
  },
  actionText: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Inter_28pt-SemiBold',
  },
  // Active/Inactive Button Styles
  actionButtonActive: {
    // Active button has black bottom border
  },
  actionButtonInactive: {
    // Inactive button has no border
  },
  actionTextActive: {
    color: 'black',
    borderBottomWidth: 2,
    borderBottomColor: 'black',
    paddingBottom: 4,
  },
  actionTextInactive: {
    color: '#666',
    borderBottomWidth: 0,
  },
  // Forms Header Styles
  formsHeader: {
    marginTop: 10,
    marginBottom: 15,
  },
  formsTitle: {
    fontSize: 18,
    color: '#000',
    fontFamily: 'Inter_28pt-SemiBold',
    marginBottom: 10,
  },
  formsSubheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  formsSubheaderItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#20AEBC',
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginHorizontal: 2,
    borderRadius: 8,
  },
  subheaderText: {
    fontSize: 14.5,
    color: 'white',
    fontFamily: 'Inter_28pt-SemiBold',
  },
  subheaderIcon: {
    marginLeft: 8,
  },
  // Form Item Styles
  formItem: {
    padding: 10,
    marginBottom: 10,
    
  },
  formHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  formNo: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    fontFamily: 'Inter_28pt-SemiBold',
  },
  statusBadge: {
    paddingHorizontal: 15,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Inter_28pt-SemiBold',
  },
  formDetails: {
    marginTop: 5,
  },
  detailText: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'Inter_28pt-Regular',
    marginBottom: 2,
  },
  // Button Styles
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 30,
  },
  searchButton: {
    flex: 1,
    backgroundColor: '#7E5EA9',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
    marginBottom: 12,
  },
  searchButtonText: {
    color: '#fff',
    fontFamily: 'Inter_28pt-SemiBold',
    fontSize: 14,
  },
  homeButton: {
    flex: 1,
    backgroundColor: '#20AEBC',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  homeButtonText: {
    color: '#fff',
    fontFamily: 'Inter_28pt-SemiBold',
    fontSize: 14,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 15,
    width: '90%',
    padding: 20,
    maxHeight: '40%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Inter_28pt-SemiBold',
    color: '#000',
  },
  closeButton: {
    padding: 4,
  },
  searchInputContainerModal: {
    marginBottom: 20,
  },
  searchInputGradientModal: {
    borderRadius: 10,
    padding: 1,
  },
  searchInputModal: {
    borderRadius: 9,
    backgroundColor: '#fff',
    padding: 15,
    fontSize: 14,
    fontFamily: 'Inter_28pt-Regular',
    borderWidth: 0,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalSearchButton: {
    flex: 1,
    backgroundColor: '#7E5EA9',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 10,
  },
  modalSearchButtonText: {
    color: '#fff',
    fontFamily: 'Inter_28pt-SemiBold',
    fontSize: 14,
  },
  modalCancelButton: {
    flex: 1,
    backgroundColor: '#666',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginLeft: 10,
  },
  modalCancelButtonText: {
    color: '#fff',
    fontFamily: 'Inter_28pt-SemiBold',
    fontSize: 14,
  },
});

export default Formstatus;