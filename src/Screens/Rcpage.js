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
  Image,
  ActionSheetIOS,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const Rcpage = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const [rcIssued, setRcIssued] = useState('yes');
  const [noPlateIssued, setNoPlateIssued] = useState('yes');
  const [tractorOwner, setTractorOwner] = useState('yes');
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  const [formData, setFormData] = useState({
    employeeName: '',
    customerName: '',
    percentage: '',
    address: '',
    mobileNo: '',
    registrationNo: '',
    tractorModel: '',
    date: null,
    hypothecation: '',
    chassisNo: '',
    engineNo: '',
  });

  // Image states
  const [customerPhoto, setCustomerPhoto] = useState(null);
  const [customerSignature, setCustomerSignature] = useState(null);
  const [managerSignature, setManagerSignature] = useState(null);

  const tractorModels = [
    "3028EN",
    "3036EN", 
    "3036E",
    "5105",
    "5105 4WD",
    "5050D Gear Pro",
    "5210 Gear Pro",
    "5050D 4WD Gear Pro",
    "5210 4WD Gear Pro",
    "5310 CRDI",
    "5310 4WD CRDI",
    "5405 CRDI",
    "5405 4WD CRDI",
    "5075 2WD",
    "5075 4WD"
  ];

  // Camera permissions
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "Camera Permission",
            message: "This app needs access to your camera to take photos.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const showImagePickerOptions = (setImageFunction) => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Take Photo', 'Choose from Library'],
          cancelButtonIndex: 0,
        },
        async (buttonIndex) => {
          if (buttonIndex === 1) {
            const hasPermission = await requestCameraPermission();
            if (hasPermission) handleCamera(setImageFunction);
          } else if (buttonIndex === 2) handleImageLibrary(setImageFunction);
        }
      );
    } else {
      Alert.alert(
        'Select Image',
        'Choose an option',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Take Photo', onPress: async () => {
              const hasPermission = await requestCameraPermission();
              if (hasPermission) handleCamera(setImageFunction);
            }
          },
          { text: 'Choose from Library', onPress: () => handleImageLibrary(setImageFunction) },
        ],
        { cancelable: true }
      );
    }
  };

  const handleCamera = (setImageFunction) => {
    launchCamera(
      { mediaType: 'photo', quality: 1, cameraType: 'back', saveToPhotos: true },
      (response) => {
        if (response.didCancel) return;
        if (response.assets && response.assets.length > 0) setImageFunction(response.assets[0]);
      }
    );
  };

  const handleImageLibrary = (setImageFunction) => {
    launchImageLibrary({ mediaType: 'photo', quality: 1 }, (response) => {
      if (response.didCancel) return;
      if (response.assets && response.assets.length > 0) setImageFunction(response.assets[0]);
    });
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleModelSelect = (model) => {
    handleInputChange('tractorModel', model);
    setShowModelDropdown(false);
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      handleInputChange('date', selectedDate);
    }
  };

  const handleSubmit = () => {
    Alert.alert('Success', 'Form submitted successfully!');
  };

  const handleHome = () => {
    navigation.navigate('Dashboard');
  }

  const handleGeneratePDF = () => {
    Alert.alert('PDF', 'PDF Challan generated!');
  };

  // Placeholder functions for icon actions
  const handleDateIconPress = () => {
    setShowDatePicker(true);
  };

  const handleChassisScanPress = () => {
    Alert.alert('Scan', 'Open chassis number scanner');
  };

  const handleEngineScanPress = () => {
    Alert.alert('Scan', 'Open engine number scanner');
  };

  const renderModelItem = ({item}) => (
    <TouchableOpacity
      style={styles.modelItem}
      onPress={() => handleModelSelect(item)}>
      <Text style={styles.modelItemText}>{item}</Text>
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
        <Text style={styles.companyName}>Makroo Motor Corporation</Text>
        <Text style={styles.companyName}>RC And Number Plate</Text>
        <Text style={styles.companyName}>Delivery Form</Text>
      </LinearGradient>

      <ScrollView style={styles.container}>
        {/* Date and Form No */}
        <Text style={styles.Date}>09-08-25</Text>
        <Text style={styles.formNo}>Form No: RC001</Text>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          <View style={styles.row}>
            <View style={styles.inputContainer}>
              <LinearGradient
                colors={['#7E5EA9', '#20AEBC']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.inputGradient}>
                <TextInput
                  style={styles.input}
                  value={formData.employeeName}
                  onChangeText={text => handleInputChange('employeeName', text)}
                  placeholder="Employee name"
                />
              </LinearGradient>
            </View>

            <View style={styles.inputContainer}>
              <LinearGradient
                colors={['#7E5EA9', '#20AEBC']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.inputGradient}>
                <TextInput
                  style={styles.input}
                  value={formData.customerName}
                  onChangeText={text => handleInputChange('customerName', text)}
                  placeholder="Customer name"
                />
              </LinearGradient>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.inputContainer}>
              <LinearGradient
                colors={['#7E5EA9', '#20AEBC']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.inputGradient}>
                <TextInput
                  style={styles.input}
                  value={formData.percentage}
                  onChangeText={text => handleInputChange('percentage', text)}
                  placeholder="Percentage"
                  keyboardType="numeric"
                />
              </LinearGradient>
            </View>

            <View style={styles.inputContainer}>
              <LinearGradient
                colors={['#7E5EA9', '#20AEBC']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.inputGradient}>
                <TextInput
                  style={styles.input}
                  value={formData.address}
                  onChangeText={text => handleInputChange('address', text)}
                  placeholder="Address"
                />
              </LinearGradient>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.inputContainer}>
              <LinearGradient
                colors={['#7E5EA9', '#20AEBC']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.inputGradient}>
                <TextInput
                  style={styles.input}
                  value={formData.mobileNo}
                  onChangeText={text => handleInputChange('mobileNo', text)}
                  placeholder="Mobile No."
                  keyboardType="phone-pad"
                />
              </LinearGradient>
            </View>

            <View style={styles.inputContainer}>
              <LinearGradient
                colors={['#7E5EA9', '#20AEBC']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.inputGradient}>
                <TextInput
                  style={styles.input}
                  value={formData.registrationNo}
                  onChangeText={text =>
                    handleInputChange('registrationNo', text)
                  }
                  placeholder="Registration No."
                />
              </LinearGradient>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.inputContainer}>
              <LinearGradient
                colors={['#7E5EA9', '#20AEBC']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.inputGradient}>
                <TouchableOpacity 
                  style={styles.input}
                  onPress={() => setShowModelDropdown(true)}
                >
                  <Text style={
                    formData.tractorModel ? 
                    styles.selectedModelText : 
                    styles.placeholderText
                  }>
                    {formData.tractorModel || 'Select Tractor Model'}
                  </Text>
                  <Icon 
                    name="keyboard-arrow-down" 
                    size={25} 
                    color="#666" 
                    style={styles.dropdownIcon}
                  />
                </TouchableOpacity>
              </LinearGradient>
            </View>

            <View style={styles.inputContainer}>
              <LinearGradient
                colors={['#7E5EA9', '#20AEBC']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.inputGradient}>
                <View style={styles.inputWithIcon}>
                  <TouchableOpacity
                    style={[styles.input, styles.inputWithIconField]}
                    onPress={handleDateIconPress}
                  >
                    <Text style={
                      formData.date ? 
                      styles.selectedModelText : 
                      styles.placeholderText
                    }>
                      {formData.date ? formData.date.toLocaleDateString() : 'Select Date'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleDateIconPress}
                    style={styles.iconButton}>
                    <Icon name="calendar-today" size={20} color="#666" />
                  </TouchableOpacity>
                </View>
                {showDatePicker && (
                  <DateTimePicker
                    value={formData.date || new Date()}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={handleDateChange}
                  />
                )}
              </LinearGradient>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.inputContainer}>
              <LinearGradient
                colors={['#7E5EA9', '#20AEBC']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.inputGradient}>
                <TextInput
                  style={styles.input}
                  value={formData.hypothecation}
                  onChangeText={text =>
                    handleInputChange('hypothecation', text)
                  }
                  placeholder="Select Hypothecation"
                />
              </LinearGradient>
            </View>

            <View style={styles.inputContainer}>
              <LinearGradient
                colors={['#7E5EA9', '#20AEBC']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.inputGradient}>
                <View style={styles.inputWithIcon}>
                  <TextInput
                    style={[styles.input, styles.inputWithIconField]}
                    value={formData.chassisNo}
                    onChangeText={text => handleInputChange('chassisNo', text)}
                    placeholder="Chassis No."
                  />
                  <TouchableOpacity
                    onPress={handleChassisScanPress}
                    style={styles.iconButton}>
                    <Icon name="qr-code-scanner" size={20} color="#666" />
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.inputContainer}>
              <LinearGradient
                colors={['#7E5EA9', '#20AEBC']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.inputGradient}>
                <View style={styles.inputWithIcon}>
                  <TextInput
                    style={[styles.input, styles.inputWithIconField]}
                    value={formData.engineNo}
                    onChangeText={text => handleInputChange('engineNo', text)}
                    placeholder="Engine No."
                  />
                  <TouchableOpacity
                    onPress={handleEngineScanPress}
                    style={styles.iconButton}>
                    <Icon name="qr-code-scanner" size={20} color="#666" />
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>
            <View style={styles.inputContainer}></View>
          </View>
        </View>

        {/* Tractor Model Dropdown Modal */}
        <Modal
          visible={showModelDropdown}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowModelDropdown(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select Tractor Model</Text>
                <TouchableOpacity 
                  onPress={() => setShowModelDropdown(false)}
                  style={styles.closeButton}
                >
                  <Icon name="close" size={24} color="#000" />
                </TouchableOpacity>
              </View>
              <FlatList
                data={tractorModels}
                renderItem={renderModelItem}
                keyExtractor={(item, index) => index.toString()}
                style={styles.modelList}
                showsVerticalScrollIndicator={true}
              />
            </View>
          </View>
        </Modal>

        {/* Radio Button Sections */}
        <View style={styles.radioSection}>
          {/* RC Issued */}
          <View style={styles.radioGroup}>
            <Text style={styles.radioLabel}>RC Issued:</Text>
            <View style={styles.radioOptionsContainer}>
              <TouchableOpacity
                style={[
                  styles.radioOptionWrapper,
                  rcIssued === 'yes' && styles.radioOptionSelected,
                ]}
                onPress={() => setRcIssued('yes')}>
                <LinearGradient
                  colors={['#7E5EA9', '#20AEBC']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={styles.radioOptionGradient}>
                  <View
                    style={[
                      styles.radioOptionInner,
                      rcIssued === 'yes' && styles.radioOptionInnerSelected,
                    ]}>
                    <Text
                      style={[
                        styles.radioOptionText,
                        rcIssued === 'yes' && styles.radioOptionTextSelected,
                      ]}>
                      Yes
                    </Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.radioOptionWrapper,
                  rcIssued === 'no' && styles.radioOptionSelected,
                ]}
                onPress={() => setRcIssued('no')}>
                <LinearGradient
                  colors={['#7E5EA9', '#20AEBC']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={styles.radioOptionGradient}>
                  <View
                    style={[
                      styles.radioOptionInner,
                      rcIssued === 'no' && styles.radioOptionInnerSelected,
                    ]}>
                    <Text
                      style={[
                        styles.radioOptionText,
                        rcIssued === 'no' && styles.radioOptionTextSelected,
                      ]}>
                      No
                    </Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>

          {/* No. Plate Issued */}
          <View style={styles.radioGroup}>
            <Text style={styles.radioLabel}>No. Plate Issued:</Text>
            <View style={styles.radioOptionsContainer}>
              <TouchableOpacity
                style={[
                  styles.radioOptionWrapper,
                  noPlateIssued === 'yes' && styles.radioOptionSelected,
                ]}
                onPress={() => setNoPlateIssued('yes')}>
                <LinearGradient
                  colors={['#7E5EA9', '#20AEBC']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={styles.radioOptionGradient}>
                  <View
                    style={[
                      styles.radioOptionInner,
                      noPlateIssued === 'yes' &&
                        styles.radioOptionInnerSelected,
                    ]}>
                    <Text
                      style={[
                        styles.radioOptionText,
                        noPlateIssued === 'yes' &&
                          styles.radioOptionTextSelected,
                      ]}>
                      Yes
                    </Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.radioOptionWrapper,
                  noPlateIssued === 'no' && styles.radioOptionSelected,
                ]}
                onPress={() => setNoPlateIssued('no')}>
                <LinearGradient
                  colors={['#7E5EA9', '#20AEBC']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={styles.radioOptionGradient}>
                  <View
                    style={[
                      styles.radioOptionInner,
                      noPlateIssued === 'no' && styles.radioOptionInnerSelected,
                    ]}>
                    <Text
                      style={[
                        styles.radioOptionText,
                        noPlateIssued === 'no' &&
                          styles.radioOptionTextSelected,
                      ]}>
                      No
                    </Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>

          {/* Are Tractor Owner */}
          <View style={styles.radioGroup}>
            <Text style={styles.radioLabel}>Are Tractor Owner:</Text>
            <View style={styles.radioOptionsContainer}>
              <TouchableOpacity
                style={[
                  styles.radioOptionWrapper,
                  tractorOwner === 'yes' && styles.radioOptionSelected,
                ]}
                onPress={() => setTractorOwner('yes')}>
                <LinearGradient
                  colors={['#7E5EA9', '#20AEBC']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={styles.radioOptionGradient}>
                  <View
                    style={[
                      styles.radioOptionInner,
                      tractorOwner === 'yes' && styles.radioOptionInnerSelected,
                    ]}>
                    <Text
                      style={[
                        styles.radioOptionText,
                        tractorOwner === 'yes' &&
                          styles.radioOptionTextSelected,
                      ]}>
                      Yes
                    </Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.radioOptionWrapper,
                  tractorOwner === 'no' && styles.radioOptionSelected,
                ]}
                onPress={() => setTractorOwner('no')}>
                <LinearGradient
                  colors={['#7E5EA9', '#20AEBC']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={styles.radioOptionGradient}>
                  <View
                    style={[
                      styles.radioOptionInner,
                      tractorOwner === 'no' && styles.radioOptionInnerSelected,
                    ]}>
                    <Text
                      style={[
                        styles.radioOptionText,
                        tractorOwner === 'no' && styles.radioOptionTextSelected,
                      ]}>
                      No
                    </Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Photo and Signatures Section */}
        <View style={styles.photoSignatureSection}>
          <TouchableOpacity 
            style={styles.photoSignatureBox} 
            onPress={() => showImagePickerOptions(setCustomerPhoto)}
          >
            {customerPhoto ? (
              <Image 
                source={{ uri: customerPhoto.uri }} 
                style={styles.previewImage}
                resizeMode="contain"
              />
            ) : (
              <>
                <Icon name="photo-camera" size={35} color="#666" />
                <Text style={styles.photoSignatureText}>Customer Photo</Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.photoSignatureBox1} 
            onPress={() => showImagePickerOptions(setCustomerSignature)}
          >
            {customerSignature ? (
              <Image 
                source={{ uri: customerSignature.uri }} 
                style={styles.previewImage}
                resizeMode="contain"
              />
            ) : (
              <Text style={styles.photoSignatureText}>Customer Signature</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.photoSignatureBox1} 
            onPress={() => showImagePickerOptions(setManagerSignature)}
          >
            {managerSignature ? (
              <Image 
                source={{ uri: managerSignature.uri }} 
                style={styles.previewImage}
                resizeMode="contain"
              />
            ) : (
              <Text style={styles.photoSignatureText}>Manager Signature</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.homeButton} onPress={handleHome}>
            <Text style={styles.homeButtonText}>Home</Text>
          </TouchableOpacity>
        </View>

        {/* PDF Challan Button */}
        <TouchableOpacity style={styles.pdfButton} onPress={() => navigation.navigate('Pdfpage')}>
          <Text style={styles.pdfButtonText}>Generate PDF Challan</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  companyName: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
  },
  formNo: {
    fontSize: 13,
    marginVertical: 10,
    fontFamily: 'Inter_28pt-SemiBold',
    paddingHorizontal: 5,
  },
  Date: {
    fontSize: 12,
    textAlign: 'right',
    marginVertical: 5,
    fontFamily: 'Inter_28pt-Regular',
    color: '#00000099',
    paddingRight: 15,
  },
  formContainer: {
    marginBottom: 15,
  },
  row: {
    marginBottom: 0,
  },
  inputContainer: {
    flex: 1,
    marginHorizontal: 4,
    marginBottom: 10,
  },
  inputGradient: {
    borderRadius: 10,
    padding: 1, // gradient thickness
  },
  input: {
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 12,
    fontSize: 14,
    fontFamily: 'Inter_28pt-Regular',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedModelText: {
    fontSize: 14,
    fontFamily: 'Inter_28pt-Regular',
    color: '#000',
  },
  placeholderText: {
    fontSize: 14,
    fontFamily: 'Inter_28pt-Regular',
    color: '#666',
  },
  dropdownIcon: {
    marginLeft: 8,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputWithIconField: {
    flex: 1,
  },
  iconButton: {
    position: 'absolute',
    right: 12,
    padding: 4,
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
    borderRadius: 10,
    width: '90%',
    maxHeight: '70%',
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Inter_28pt-SemiBold',
  },
  closeButton: {
    padding: 4,
  },
  modelList: {
    maxHeight: 300,
  },
  modelItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modelItemText: {
    fontSize: 14,
    fontFamily: 'Inter_28pt-Regular',
    color: '#333',
  },
  radioSection: {
    marginBottom: 15,
  },
  radioGroup: {
    marginBottom: 15,
  },
  radioLabel: {
    fontSize: 12,
    fontFamily: 'Inter_28pt-Medium',
    marginBottom: 8,
    color: '#000',
  },
  radioOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  radioOptionWrapper: {
    flex: 1,
    maxWidth: '90%',
    marginHorizontal: 8,
  },
  radioOptionGradient: {
    borderRadius: 6,
    padding: 1,
  },
  radioOptionInner: {
    borderRadius: 5,
    paddingVertical: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  radioOptionInnerSelected: {
    backgroundColor: '#7E5EA9',
  },
  radioOptionSelected: {
    // Additional styles for selected state if needed
  },
  radioOptionText: {
    fontSize: 12,
    fontFamily: 'Inter_28pt-Medium',
    color: '#000',
  },
  radioOptionTextSelected: {
    color: '#fff',
    fontWeight: '500',
  },
  separator: {
    height: 1,
    backgroundColor: '#000',
    marginVertical: 15,
  },
  photoSignatureSection: {},
  photoSignatureBox: {
    width: '100%',
    height: 95,
    borderWidth: 1,
    borderColor: '#00000080',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderStyle: 'dashed',
  },
   photoSignatureBox1: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#00000080',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
     borderStyle: 'dashed',
  },
  photoSignatureText: {
    fontSize: 13,
    textAlign: 'center',
    marginTop: 2,
    color: '#00000099',
    fontFamily: 'Inter_28pt-Medium',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#7E5EA9',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  submitButtonText: {
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
    marginBottom: 10,
  },
  homeButtonText: {
    color: '#fff',
     fontFamily: 'Inter_28pt-SemiBold',
    fontSize: 14,
  },
  pdfButton: {
    backgroundColor: '#7E5EA9',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  pdfButtonText: {
    color: '#fff',
     fontFamily: 'Inter_28pt-SemiBold',
    fontSize: 14,
  },
});

export default Rcpage;