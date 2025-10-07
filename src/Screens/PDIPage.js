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
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const PDIpage = ({navigation}) => {
  const insets = useSafeAreaInsets();

  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [showTireDropdown, setShowTireDropdown] = useState(false);
  const [showBatteryDropdown, setShowBatteryDropdown] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [formData, setFormData] = useState({
    inspectorName: '',
    tireMake: '',
    batteryMake: '',
    date: null,
    chassisNo: '',
    tractorModel: '',
    engineNo: '',
    frontRight: '',
    rearRight: '',
    frontLeft: '',
    rearLeft: '',
    starterNo: '',
    alternatorNo: '',
    batteryNo: '',
    fipNo: '',
  });

  // Image states
  const [customerPhoto, setCustomerPhoto] = useState(null);
  const [customerSignature, setCustomerSignature] = useState(null);
  const [managerSignature, setManagerSignature] = useState(null);

  const tractorModels = [
    '3028EN',
    '3036EN',
    '3036E',
    '5105',
    '5105 4WD',
    '5050D Gear Pro',
    '5210 Gear Pro',
    '5050D 4WD Gear Pro',
    '5210 4WD Gear Pro',
    '5310 CRDI',
    '5310 4WD CRDI',
    '5405 CRDI',
    '5405 4WD CRDI',
    '5075 2WD',
    '5075 4WD',
  ];

  const tireMakes = [
    'Michelin',
    'Bridgestone',
    'Goodyear',
    'Continental',
    'Pirelli',
    'Yokohama',
    'MRF',
    'Apollo',
    'CEAT',
    'JK Tyre'
  ];

  const batteryMakes = [
    'Exide',
    'Amaron',
    'Lucas',
    'SF Sonic',
    'Tata Green',
    'Exide Industries',
    'Luminous',
    'Okaya',
    'Su-Kam',
    'Base'
  ];

  const [radioValues, setRadioValues] = useState({
    lightsOk: 'yes',
    nutsOk: 'yes',
    delivered: 'yes',
    hydraulicOil: 'full',
    nutsSealed: 'yes',
  });

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

  const handleRadioChange = (field, value) => {
    setRadioValues(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleModelSelect = model => {
    handleInputChange('tractorModel', model);
    setShowModelDropdown(false);
  };

  const handleTireSelect = tire => {
    handleInputChange('tireMake', tire);
    setShowTireDropdown(false);
  };

  const handleBatterySelect = battery => {
    handleInputChange('batteryMake', battery);
    setShowBatteryDropdown(false);
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      handleInputChange('date', selectedDate);
    }
  };

  const handleSubmit = () => {
    Alert.alert('Success', 'PDI Form submitted successfully!');
  };

  const handleHome = () => {
    navigation.navigate('Dashboard');
  };

  const handleGeneratePDF = () => {
    Alert.alert('PDF', 'PDI Challan generated!');
  };

  const handleDateIconPress = () => {
    setShowDatePicker(true);
  };

  const handleScanIconPress = (field) => {
    Alert.alert('Scan', `Scan ${field}`);
  };

  const renderModelItem = ({item}) => (
    <TouchableOpacity
      style={styles.modelItem}
      onPress={() => handleModelSelect(item)}>
      <Text style={styles.modelItemText}>{item}</Text>
    </TouchableOpacity>
  );

  const renderTireItem = ({item}) => (
    <TouchableOpacity
      style={styles.modelItem}
      onPress={() => handleTireSelect(item)}>
      <Text style={styles.modelItemText}>{item}</Text>
    </TouchableOpacity>
  );

  const renderBatteryItem = ({item}) => (
    <TouchableOpacity
      style={styles.modelItem}
      onPress={() => handleBatterySelect(item)}>
      <Text style={styles.modelItemText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View
      style={{flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom}}>
      {/* Header */}
      <LinearGradient
        colors={['#7E5EA9', '#20AEBC']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.header}>
        <Text style={styles.companyName}>Makroo Motor Corporation</Text>
        <Text style={styles.companyName}>Pre Delivery Inspection</Text>
        <Text style={styles.companyName}>Form</Text>
      </LinearGradient>

      <ScrollView style={styles.container}>
        {/* Date and Form No */}
        <Text style={styles.Date}>09-08-25</Text>
        <Text style={styles.formNo}>Form No: PDI001</Text>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          {/* Inspector + Date */}
          <View style={styles.row}>
            <View style={styles.inputContainer}>
              <LinearGradient
                colors={['#7E5EA9', '#20AEBC']}
                style={styles.inputGradient}>
                <TextInput
                  style={styles.input}
                  value={formData.inspectorName}
                  onChangeText={text =>
                    handleInputChange('inspectorName', text)
                  }
                  placeholder="Inspector Name"
                />
              </LinearGradient>
            </View>
            <View style={styles.inputContainer}>
              <LinearGradient
                colors={['#7E5EA9', '#20AEBC']}
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

          {/* Tractor Model + Chassis No */}
          <View style={styles.row}>
            <View style={styles.inputContainer}>
              <LinearGradient
                colors={['#7E5EA9', '#20AEBC']}
                style={styles.inputGradient}>
                <TouchableOpacity
                  style={styles.input}
                  onPress={() => setShowModelDropdown(true)}>
                  <Text
                    style={
                      formData.tractorModel
                        ? styles.selectedModelText
                        : styles.placeholderText
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
                style={styles.inputGradient}>
                <View style={styles.inputWithIcon}>
                  <TextInput
                    style={[styles.input, styles.inputWithIconField]}
                    value={formData.chassisNo}
                    onChangeText={text => handleInputChange('chassisNo', text)}
                    placeholder="Chassis No."
                  />
                  <TouchableOpacity
                    onPress={() => handleScanIconPress('Chassis No')}
                    style={styles.iconButton}>
                    <Icon name="qr-code-scanner" size={20} color="#666" />
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>
          </View>

          {/* Engine No */}
          <View style={styles.row}>
            <View style={styles.inputContainer}>
              <LinearGradient
                colors={['#7E5EA9', '#20AEBC']}
                style={styles.inputGradient}>
                <View style={styles.inputWithIcon}>
                  <TextInput
                    style={[styles.input, styles.inputWithIconField]}
                    value={formData.engineNo}
                    onChangeText={text => handleInputChange('engineNo', text)}
                    placeholder="Engine No."
                  />
                  <TouchableOpacity
                    onPress={() => handleScanIconPress('Engine No')}
                    style={styles.iconButton}>
                    <Icon name="qr-code-scanner" size={20} color="#666" />
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>
            <View style={styles.inputContainer}></View>
          </View>

          {/* Tire Details Heading */}
          <View style={styles.sectionHeading}>
            <Text style={styles.sectionHeadingText}>Tire Details:</Text>
          </View>

          {/* Select Tire Make */}
          <View style={styles.row}>
            <View style={styles.inputContainer}>
              <LinearGradient
                colors={['#7E5EA9', '#20AEBC']}
                style={styles.inputGradient}>
                <TouchableOpacity
                  style={styles.input}
                  onPress={() => setShowTireDropdown(true)}>
                  <Text
                    style={
                      formData.tireMake
                        ? styles.selectedModelText
                        : styles.placeholderText
                    }>
                    {formData.tireMake || 'Select Tire Make'}
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
            <View style={styles.inputContainer}></View>
          </View>

          {/* Front Right + Front Left */}
          <View style={styles.row}>
            <View style={styles.inputContainer}>
              <LinearGradient
                colors={['#7E5EA9', '#20AEBC']}
                style={styles.inputGradient}>
                <TextInput
                  style={styles.input}
                  value={formData.frontRight}
                  onChangeText={text => handleInputChange('frontRight', text)}
                  placeholder="Front Right Serial No."
                />
              </LinearGradient>
            </View>
            <View style={styles.inputContainer}>
              <LinearGradient
                colors={['#7E5EA9', '#20AEBC']}
                style={styles.inputGradient}>
                <TextInput
                  style={styles.input}
                  value={formData.frontLeft}
                  onChangeText={text => handleInputChange('frontLeft', text)}
                  placeholder="Front Left Serial No."
                />
              </LinearGradient>
            </View>
          </View>

          {/* Rear Right + Rear Left */}
          <View style={styles.row}>
            <View style={styles.inputContainer}>
              <LinearGradient
                colors={['#7E5EA9', '#20AEBC']}
                style={styles.inputGradient}>
                <TextInput
                  style={styles.input}
                  value={formData.rearRight}
                  onChangeText={text => handleInputChange('rearRight', text)}
                  placeholder="Rear Right Serial No."
                />
              </LinearGradient>
            </View>
            <View style={styles.inputContainer}>
              <LinearGradient
                colors={['#7E5EA9', '#20AEBC']}
                style={styles.inputGradient}>
                <TextInput
                  style={styles.input}
                  value={formData.rearLeft}
                  onChangeText={text => handleInputChange('rearLeft', text)}
                  placeholder="Rear Left Serial No."
                />
              </LinearGradient>
            </View>
          </View>

          {/* Battery Details Heading */}
          <View style={styles.sectionHeading}>
            <Text style={styles.sectionHeadingText}>Battery Details:</Text>
          </View>

          {/* Select Battery Make */}
          <View style={styles.row}>
            <View style={styles.inputContainer}>
              <LinearGradient
                colors={['#7E5EA9', '#20AEBC']}
                style={styles.inputGradient}>
                <TouchableOpacity
                  style={styles.input}
                  onPress={() => setShowBatteryDropdown(true)}>
                  <Text
                    style={
                      formData.batteryMake
                        ? styles.selectedModelText
                        : styles.placeholderText
                    }>
                    {formData.batteryMake || 'Select Battery Make'}
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
            <View style={styles.inputContainer}></View>
          </View>

          {/* Battery Serial No + Tractor Starter Serial No */}
          <View style={styles.row}>
            <View style={styles.inputContainer}>
              <LinearGradient
                colors={['#7E5EA9', '#20AEBC']}
                style={styles.inputGradient}>
                <View style={styles.inputWithIcon}>
                  <TextInput
                    style={[styles.input, styles.inputWithIconField]}
                    value={formData.batteryNo}
                    onChangeText={text => handleInputChange('batteryNo', text)}
                    placeholder="Battery Serial No."
                  />
                  <TouchableOpacity
                    onPress={() => handleScanIconPress('Battery Serial No')}
                    style={styles.iconButton}>
                    <Icon name="qr-code-scanner" size={20} color="#666" />
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>
            <View style={styles.inputContainer}>
              <LinearGradient
                colors={['#7E5EA9', '#20AEBC']}
                style={styles.inputGradient}>
                <View style={styles.inputWithIcon}>
                  <TextInput
                    style={[styles.input, styles.inputWithIconField]}
                    value={formData.starterNo}
                    onChangeText={text => handleInputChange('starterNo', text)}
                    placeholder="Tractor Starter Serial No."
                  />
                  <TouchableOpacity
                    onPress={() => handleScanIconPress('Tractor Starter Serial No')}
                    style={styles.iconButton}>
                    <Icon name="qr-code-scanner" size={20} color="#666" />
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>
          </View>

          {/* FIP No + Tractor Alternator No */}
          <View style={styles.row}>
            <View style={styles.inputContainer}>
              <LinearGradient
                colors={['#7E5EA9', '#20AEBC']}
                style={styles.inputGradient}>
                <View style={styles.inputWithIcon}>
                  <TextInput
                    style={[styles.input, styles.inputWithIconField]}
                    value={formData.fipNo}
                    onChangeText={text => handleInputChange('fipNo', text)}
                    placeholder="FIP No."
                  />
                  <TouchableOpacity
                    onPress={() => handleScanIconPress('FIP No')}
                    style={styles.iconButton}>
                    <Icon name="qr-code-scanner" size={20} color="#666" />
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>
            <View style={styles.inputContainer}>
              <LinearGradient
                colors={['#7E5EA9', '#20AEBC']}
                style={styles.inputGradient}>
                <View style={styles.inputWithIcon}>
                  <TextInput
                    style={[styles.input, styles.inputWithIconField]}
                    value={formData.alternatorNo}
                    onChangeText={text => handleInputChange('alternatorNo', text)}
                    placeholder="Tractor Alternator No."
                  />
                  <TouchableOpacity
                    onPress={() => handleScanIconPress('Tractor Alternator No')}
                    style={styles.iconButton}>
                    <Icon name="qr-code-scanner" size={20} color="#666" />
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>
          </View>
        </View>

        {/* Tractor Model Modal */}
        <Modal
          visible={showModelDropdown}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowModelDropdown(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select Tractor Model</Text>
                <TouchableOpacity
                  onPress={() => setShowModelDropdown(false)}
                  style={styles.closeButton}>
                  <Icon name="close" size={24} color="#000" />
                </TouchableOpacity>
              </View>
              <FlatList
                data={tractorModels}
                renderItem={renderModelItem}
                keyExtractor={(item, index) => index.toString()}
                style={styles.modelList}
              />
            </View>
          </View>
        </Modal>

        {/* Tire Make Modal */}
        <Modal
          visible={showTireDropdown}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowTireDropdown(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select Tire Make</Text>
                <TouchableOpacity
                  onPress={() => setShowTireDropdown(false)}
                  style={styles.closeButton}>
                  <Icon name="close" size={24} color="#000" />
                </TouchableOpacity>
              </View>
              <FlatList
                data={tireMakes}
                renderItem={renderTireItem}
                keyExtractor={(item, index) => index.toString()}
                style={styles.modelList}
              />
            </View>
          </View>
        </Modal>

        {/* Battery Make Modal */}
        <Modal
          visible={showBatteryDropdown}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowBatteryDropdown(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select Battery Make</Text>
                <TouchableOpacity
                  onPress={() => setShowBatteryDropdown(false)}
                  style={styles.closeButton}>
                  <Icon name="close" size={24} color="#000" />
                </TouchableOpacity>
              </View>
              <FlatList
                data={batteryMakes}
                renderItem={renderBatteryItem}
                keyExtractor={(item, index) => index.toString()}
                style={styles.modelList}
              />
            </View>
          </View>
        </Modal>

        {/* Radio Sections */}
        <View style={styles.radioSection}>
          <Text style={styles.radioLabel}>Lights OK:</Text>
          {renderYesNo('lightsOk')}
          <Text style={styles.radioLabel}>Nuts OK:</Text>
          {renderYesNo('nutsOk')}
          <Text style={styles.radioLabel}>Tractor Delivered:</Text>
          {renderYesNo('delivered')}
          <Text style={styles.radioLabel}>Hydraulic Oil:</Text>
          {renderFullHalf('hydraulicOil')}
          <Text style={styles.radioLabel}>All Nuts Are Sealed:</Text>
          {renderYesNo('nutsSealed')}
        </View>

        {/* Photo & Signature */}
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

        <TouchableOpacity style={styles.pdfButton} onPress={() => navigation.navigate('Pdfpage')}>
          <Text style={styles.pdfButtonText}>Generate PDF Challan</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );

  // === Render Radio Helpers ===
  function renderYesNo(field) {
    return (
      <View style={styles.radioOptionsContainer}>
        {['yes', 'no'].map(value => (
          <TouchableOpacity
            key={value}
            style={[
              styles.radioOptionWrapper,
              radioValues[field] === value && styles.radioOptionSelected,
            ]}
            onPress={() => handleRadioChange(field, value)}>
            <LinearGradient
              colors={['#7E5EA9', '#20AEBC']}
              style={styles.radioOptionGradient}>
              <View
                style={[
                  styles.radioOptionInner,
                  radioValues[field] === value &&
                    styles.radioOptionInnerSelected,
                ]}>
                <Text
                  style={[
                    styles.radioOptionText,
                    radioValues[field] === value &&
                      styles.radioOptionTextSelected,
                  ]}>
                  {value.toUpperCase()}
                </Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  function renderFullHalf(field) {
    return (
      <View style={styles.radioOptionsContainer}>
        {['full', 'half'].map(value => (
          <TouchableOpacity
            key={value}
            style={[
              styles.radioOptionWrapper,
              radioValues[field] === value && styles.radioOptionSelected,
            ]}
            onPress={() => handleRadioChange(field, value)}>
            <LinearGradient
              colors={['#7E5EA9', '#20AEBC']}
              style={styles.radioOptionGradient}>
              <View
                style={[
                  styles.radioOptionInner,
                  radioValues[field] === value &&
                    styles.radioOptionInnerSelected,
                ]}>
                <Text
                  style={[
                    styles.radioOptionText,
                    radioValues[field] === value &&
                      styles.radioOptionTextSelected,
                  ]}>
                  {value.toUpperCase()}
                </Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {paddingHorizontal: 15},
  header: {alignItems: 'center', paddingVertical: 10},
  companyName: {fontSize: 16,  color: 'white',fontFamily: 'Inter_28pt-SemiBold'},
  formNo: {fontSize: 14, marginVertical: 10,fontFamily: 'Inter_28pt-SemiBold', color: '#000'},
  Date: {
    fontSize: 12,
    textAlign: 'right',
    marginVertical: 5,
    color: '#00000099',
    fontFamily: 'Inter_28pt-Medium',
  },
  sectionHeading: {
    marginVertical: 10,
    paddingLeft: 5,
  },
  sectionHeadingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    fontFamily: 'Inter_28pt-SemiBold',
  },
  formContainer: {marginBottom: 15},
  row: {},
  inputContainer: {
    flex: 1, 
    marginHorizontal: 4, 
    marginBottom: 12
  },
  inputGradient: {borderRadius: 10, padding: 1},
  input: {
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 12,
    fontSize: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedModelText: {fontSize: 14, color: '#000', fontFamily: 'Inter_28pt-Medium'},
  placeholderText: {fontSize: 14, color: '#666', fontFamily: 'Inter_28pt-Medium'},
  dropdownIcon: {marginLeft: 8},
  inputWithIcon: {flexDirection: 'row', alignItems: 'center'},
  inputWithIconField: {flex: 1},
  iconButton: {position: 'absolute', right: 12, padding: 4},
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {backgroundColor: 'white', borderRadius: 10, width: '90%'},
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {fontSize: 16, fontWeight: 'bold', fontFamily: 'Inter_28pt-SemiBold'},
  closeButton: {padding: 4},
  modelList: {maxHeight: 300},
  modelItem: {padding: 15, borderBottomWidth: 1, borderBottomColor: '#f0f0f0'},
  modelItemText: {fontSize: 14, color: '#333',fontFamily: 'Inter_28pt-Medium'},
  radioSection: {marginBottom: 15},
  radioLabel: {fontSize: 12, marginBottom: 6, color: '#000',fontFamily: 'Inter_28pt-Medium',marginTop:0},
  radioOptionsContainer: {flexDirection: 'row'},
  radioOptionWrapper: {flex: 1, marginHorizontal: 8, marginBottom: 15},
  radioOptionGradient: {borderRadius: 6, padding: 1},
  radioOptionInner: {
    borderRadius: 5,
    paddingVertical: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  radioOptionInnerSelected: {backgroundColor: '#7E5EA9'},
  radioOptionText: {fontSize: 12, color: '#000',fontFamily: 'Inter_28pt-Medium'},
  radioOptionTextSelected: {color: '#fff'},
  photoSignatureSection: {marginTop: 50},
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
  photoSignatureText: {fontSize: 13, textAlign: 'center', color: '#00000099',fontFamily: 'Inter_28pt-Medium'},
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  buttonContainer: {marginTop: 20},
  submitButton: {
    backgroundColor: '#7E5EA9',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  submitButtonText: {color: '#fff', fontSize: 14,fontFamily: 'Inter_28pt-SemiBold'},
  homeButton: {
    backgroundColor: '#20AEBC',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  homeButtonText: {color: '#fff', fontSize: 14,fontFamily: 'Inter_28pt-SemiBold'},
  pdfButton: {
    backgroundColor: '#7E5EA9',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  pdfButtonText: {color: '#fff', fontSize: 14,fontFamily: 'Inter_28pt-SemiBold'},
});

export default PDIpage;