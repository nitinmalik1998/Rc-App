import React, {useState, useEffect} from 'react';
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
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PDIpage = ({navigation, route}) => {
  const insets = useSafeAreaInsets();

  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [existingFormId, setExistingFormId] = useState(null);
  
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
    dealerName: '',
    customerName: '',
    customerAddress: '',
    customerContact: '',
    pdiDoneBy: '',
    remarks: '',
  });

  // Image states
  const [customerPhoto, setCustomerPhoto] = useState(null);
  const [customerSignature, setCustomerSignature] = useState(null);
  const [managerSignature, setManagerSignature] = useState(null);

  const [radioValues, setRadioValues] = useState({
    lightsOk: '1',
    nutsOk: '1',
    delivered: '1',
    hydraulicOil: '1',
    nutsSealed: '1',
    engineOilLevel: '1',
    coolantLevel: '1',
    brakeFluidLevel: '1',
    greasingDone: '1',
    paintScratches: '0',
    toolkitAvailable: '1',
    ownerManualGiven: '1',
    reflectorStickerApplied: '1',
    numberPlateFixed: '0',
  });

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

  // Get user ID from AsyncStorage on component mount
  useEffect(() => {
    const getUserData = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (storedUserId) {
          setUserId(storedUserId);
          console.log('User ID loaded:', storedUserId);
        }
        
        // Check if we're in edit mode (receiving existing form data)
        if (route.params?.formData) {
          const editData = route.params.formData;
          setIsEditMode(true);
          setExistingFormId(editData.id);
          
          // Pre-populate form data
          setFormData({
            inspectorName: editData.inspector_name || '',
            tireMake: editData.tire_make || '',
            batteryMake: editData.battery_make || '',
            date: editData.select_date ? new Date(editData.select_date) : null,
            chassisNo: editData.chassis_no || '',
            tractorModel: editData.tractor_model || '',
            engineNo: editData.engine_no || '',
            frontRight: editData.front_right_serial_no || '',
            rearRight: editData.rear_right_serial_no || '',
            frontLeft: editData.front_left_serial_no || '',
            rearLeft: editData.rear_left_serial_no || '',
            starterNo: editData.tractor_starter_serial_no || '',
            alternatorNo: editData.tractor_alternator_no || '',
            batteryNo: editData.battery_serial_no || '',
            fipNo: editData.fip_no || '',
            dealerName: editData.dealer_name || '',
            customerName: editData.customer_name || '',
            customerAddress: editData.customer_address || '',
            customerContact: editData.customer_contact || '',
            pdiDoneBy: editData.pdi_done_by || '',
            remarks: editData.remarks || '',
          });

          // Set radio button states
          setRadioValues({
            lightsOk: editData.lights_ok?.toString() || '1',
            nutsOk: editData.nuts_ok?.toString() || '1',
            delivered: editData.tractor_delivered?.toString() || '1',
            hydraulicOil: editData.hydraulic_oil?.toString() || '1',
            nutsSealed: editData.all_nuts_sealed?.toString() || '1',
            engineOilLevel: editData.engine_oil_level?.toString() || '1',
            coolantLevel: editData.coolant_level?.toString() || '1',
            brakeFluidLevel: editData.brake_fluid_level?.toString() || '1',
            greasingDone: editData.greasing_done?.toString() || '1',
            paintScratches: editData.paint_scratches?.toString() || '0',
            toolkitAvailable: editData.toolkit_available?.toString() || '1',
            ownerManualGiven: editData.owner_manual_given?.toString() || '1',
            reflectorStickerApplied: editData.reflector_sticker_applied?.toString() || '1',
            numberPlateFixed: editData.number_plate_fixed?.toString() || '0',
          });

          // Note: For images, you might need to handle URLs differently
        }
      } catch (error) {
        console.log('Error loading user data:', error);
      }
    };

    getUserData();
  }, [route.params]);

  // Generate form number
  const generateFormNo = () => {
    const timestamp = new Date().getTime();
    return `PDI${timestamp}`;
  };

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
      { 
        mediaType: 'photo', 
        quality: 0.8, 
        cameraType: 'back', 
        saveToPhotos: true,
        includeBase64: false 
      },
      (response) => {
        if (response.didCancel) return;
        if (response.error) {
          Alert.alert('Error', 'Failed to capture image');
          return;
        }
        if (response.assets && response.assets.length > 0) {
          setImageFunction(response.assets[0]);
        }
      }
    );
  };

  const handleImageLibrary = (setImageFunction) => {
    launchImageLibrary({ 
      mediaType: 'photo', 
      quality: 0.8,
      includeBase64: false 
    }, (response) => {
      if (response.didCancel) return;
      if (response.error) {
        Alert.alert('Error', 'Failed to select image');
        return;
      }
      if (response.assets && response.assets.length > 0) {
        setImageFunction(response.assets[0]);
      }
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

  const validateForm = () => {
    const requiredFields = [
      'inspectorName', 'tractorModel', 'chassisNo', 'engineNo',
      'tireMake', 'frontRight', 'frontLeft', 'rearRight', 'rearLeft',
      'batteryMake', 'batteryNo', 'starterNo', 'fipNo', 'alternatorNo',
      'dealerName', 'customerName', 'customerAddress', 'customerContact',
      'pdiDoneBy'
    ];

    for (const field of requiredFields) {
      if (!formData[field] || formData[field].toString().trim() === '') {
        Alert.alert('Validation Error', `Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }

    if (!customerPhoto) {
      Alert.alert('Validation Error', 'Please add customer photo');
      return false;
    }

    if (!customerSignature) {
      Alert.alert('Validation Error', 'Please add customer signature');
      return false;
    }

    if (!managerSignature) {
      Alert.alert('Validation Error', 'Please add manager signature');
      return false;
    }

    return true;
  };

  const prepareFormData = () => {
    const formDataToSend = new FormData();

    // Add form data
    formDataToSend.append('user_id', userId);
    formDataToSend.append('form_no', generateFormNo());
    formDataToSend.append('form_date', new Date().toISOString().split('T')[0]);
    formDataToSend.append('inspector_name', formData.inspectorName);
    formDataToSend.append('select_date', formData.date ? formData.date.toISOString().split('T')[0] : '');
    formDataToSend.append('tractor_model', formData.tractorModel);
    formDataToSend.append('chassis_no', formData.chassisNo);
    formDataToSend.append('engine_no', formData.engineNo);
    formDataToSend.append('tire_make', formData.tireMake);
    formDataToSend.append('front_right_serial_no', formData.frontRight);
    formDataToSend.append('front_left_serial_no', formData.frontLeft);
    formDataToSend.append('rear_right_serial_no', formData.rearRight);
    formDataToSend.append('rear_left_serial_no', formData.rearLeft);
    formDataToSend.append('battery_make', formData.batteryMake);
    formDataToSend.append('battery_serial_no', formData.batteryNo);
    formDataToSend.append('tractor_starter_serial_no', formData.starterNo);
    formDataToSend.append('fip_no', formData.fipNo);
    formDataToSend.append('tractor_alternator_no', formData.alternatorNo);
    
    // Customer details
    formDataToSend.append('dealer_name', formData.dealerName);
    formDataToSend.append('customer_name', formData.customerName);
    formDataToSend.append('customer_address', formData.customerAddress);
    formDataToSend.append('customer_contact', formData.customerContact);
    formDataToSend.append('pdi_done_by', formData.pdiDoneBy);
    formDataToSend.append('remarks', formData.remarks || '');

    // Radio button values (convert to 1/0 for API)
    formDataToSend.append('lights_ok', radioValues.lightsOk);
    formDataToSend.append('nuts_ok', radioValues.nutsOk);
    formDataToSend.append('hydraulic_oil', radioValues.hydraulicOil);
    formDataToSend.append('all_nuts_sealed', radioValues.nutsSealed);
    formDataToSend.append('tractor_delivered', radioValues.delivered);
    formDataToSend.append('engine_oil_level', radioValues.engineOilLevel);
    formDataToSend.append('coolant_level', radioValues.coolantLevel);
    formDataToSend.append('brake_fluid_level', radioValues.brakeFluidLevel);
    formDataToSend.append('greasing_done', radioValues.greasingDone);
    formDataToSend.append('paint_scratches', radioValues.paintScratches);
    formDataToSend.append('toolkit_available', radioValues.toolkitAvailable);
    formDataToSend.append('owner_manual_given', radioValues.ownerManualGiven);
    formDataToSend.append('reflector_sticker_applied', radioValues.reflectorStickerApplied);
    formDataToSend.append('number_plate_fixed', radioValues.numberPlateFixed);

    // Add delivery date if tractor is delivered
    if (radioValues.delivered === '1') {
      formDataToSend.append('delivery_date', new Date().toISOString().split('T')[0]);
    }

    // Add images
    if (customerPhoto) {
      formDataToSend.append('customer_photo', {
        uri: customerPhoto.uri,
        type: customerPhoto.type || 'image/jpeg',
        name: `customer_photo_${Date.now()}.jpg`,
      });
    }

    if (customerSignature) {
      formDataToSend.append('customer_signature', {
        uri: customerSignature.uri,
        type: customerSignature.type || 'image/jpeg',
        name: `customer_signature_${Date.now()}.jpg`,
      });
    }

    if (managerSignature) {
      formDataToSend.append('manager_signature', {
        uri: managerSignature.uri,
        type: managerSignature.type || 'image/jpeg',
        name: `manager_signature_${Date.now()}.jpg`,
      });
    }

    // For update, add the form ID
    if (isEditMode && existingFormId) {
      formDataToSend.append('id', existingFormId);
    }

    return formDataToSend;
  };

  const handleSubmit = async () => {
    if (!userId) {
      Alert.alert('Error', 'User ID not found. Please login again.');
      return;
    }

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const formDataToSend = prepareFormData();
      
      const url = isEditMode 
        ? 'https://argosmob.uk/makroo/public/api/v1/pdi-delivery/form/update'
        : 'https://argosmob.uk/makroo/public/api/v1/pdi-delivery/form/save';

      const config = {
        method: 'post',
        url: url,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: formDataToSend,
        timeout: 30000, // 30 seconds timeout
      };

      const response = await axios(config);
      console.log('API Response:', response.data);

      // FIXED: Improved API response handling
      // Check for different possible success indicators in the response
      const isSuccess = 
        response.data.success === true ||
        response.data.status === 'success' ||
        response.data.message?.toLowerCase().includes('success') ||
        response.status === 200 ||
        response.status === 201;

      if (isSuccess) {
        Alert.alert(
          'Success', 
          isEditMode ? 'PDI Form updated successfully!' : 'PDI Form submitted successfully!',
          [
            {
              text: 'OK',
              // onPress: () => navigation.navigate('Dashboard')
            }
          ]
        );
      } else {
        // More detailed error message extraction
        const errorMessage = 
          response.data.message || 
          response.data.error || 
          response.data.errors?.message ||
          (typeof response.data.errors === 'string' ? response.data.errors : 'Submission failed. Please try again.');
        
        Alert.alert('Submission Failed', errorMessage);
      }
    } catch (error) {
      console.log('Submission Error:', error);
      console.log('Error details:', error.response?.data);
      
      // Enhanced error handling
      if (error.response) {
        // Server responded with error status
        const serverError = error.response.data;
        const errorMessage = 
          serverError.message || 
          serverError.error || 
          serverError.errors?.message ||
          (typeof serverError.errors === 'string' ? serverError.errors : `Server error: ${error.response.status}`);
        
        Alert.alert('Submission Failed', errorMessage);
      } else if (error.request) {
        // Request made but no response received
        Alert.alert('Network Error', 'Please check your internet connection and try again.');
      } else {
        // Other errors
        Alert.alert('Error', 'Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
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
        <Text style={styles.Date}>{new Date().toLocaleDateString()}</Text>
        <Text style={styles.formNo}>Form No: {generateFormNo()}</Text>
        {isEditMode && <Text style={styles.editModeText}>Edit Mode</Text>}

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
                  editable={!loading}
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
                    disabled={loading}
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
                    style={styles.iconButton}
                    disabled={loading}
                  >
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
                  onPress={() => setShowModelDropdown(true)}
                  disabled={loading}
                >
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
                    editable={!loading}
                  />
                  <TouchableOpacity
                    onPress={() => handleScanIconPress('Chassis No')}
                    style={styles.iconButton}
                    disabled={loading}
                  >
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
                    editable={!loading}
                  />
                  <TouchableOpacity
                    onPress={() => handleScanIconPress('Engine No')}
                    style={styles.iconButton}
                    disabled={loading}
                  >
                    <Icon name="qr-code-scanner" size={20} color="#666" />
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>
            <View style={styles.inputContainer}></View>
          </View>

          {/* Customer Details Heading */}
          <View style={styles.sectionHeading}>
            <Text style={styles.sectionHeadingText}>Customer Details:</Text>
          </View>

          {/* Dealer Name + Customer Name */}
          <View style={styles.row}>
            <View style={styles.inputContainer}>
              <LinearGradient
                colors={['#7E5EA9', '#20AEBC']}
                style={styles.inputGradient}>
                <TextInput
                  style={styles.input}
                  value={formData.dealerName}
                  onChangeText={text => handleInputChange('dealerName', text)}
                  placeholder="Dealer Name"
                  editable={!loading}
                />
              </LinearGradient>
            </View>
            <View style={styles.inputContainer}>
              <LinearGradient
                colors={['#7E5EA9', '#20AEBC']}
                style={styles.inputGradient}>
                <TextInput
                  style={styles.input}
                  value={formData.customerName}
                  onChangeText={text => handleInputChange('customerName', text)}
                  placeholder="Customer Name"
                  editable={!loading}
                />
              </LinearGradient>
            </View>
          </View>

          {/* Customer Address */}
          <View style={styles.row}>
            <View style={styles.inputContainer}>
              <LinearGradient
                colors={['#7E5EA9', '#20AEBC']}
                style={styles.inputGradient}>
                <TextInput
                  style={styles.input}
                  value={formData.customerAddress}
                  onChangeText={text => handleInputChange('customerAddress', text)}
                  placeholder="Customer Address"
                  editable={!loading}
                  multiline
                />
              </LinearGradient>
            </View>
            <View style={styles.inputContainer}>
              <LinearGradient
                colors={['#7E5EA9', '#20AEBC']}
                style={styles.inputGradient}>
                <TextInput
                  style={styles.input}
                  value={formData.customerContact}
                  onChangeText={text => handleInputChange('customerContact', text)}
                  placeholder="Customer Contact"
                  keyboardType="phone-pad"
                  editable={!loading}
                />
              </LinearGradient>
            </View>
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
                  onPress={() => setShowTireDropdown(true)}
                  disabled={loading}
                >
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
                  editable={!loading}
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
                  editable={!loading}
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
                  editable={!loading}
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
                  editable={!loading}
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
                  onPress={() => setShowBatteryDropdown(true)}
                  disabled={loading}
                >
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
                    editable={!loading}
                  />
                  <TouchableOpacity
                    onPress={() => handleScanIconPress('Battery Serial No')}
                    style={styles.iconButton}
                    disabled={loading}
                  >
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
                    editable={!loading}
                  />
                  <TouchableOpacity
                    onPress={() => handleScanIconPress('Tractor Starter Serial No')}
                    style={styles.iconButton}
                    disabled={loading}
                  >
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
                    editable={!loading}
                  />
                  <TouchableOpacity
                    onPress={() => handleScanIconPress('FIP No')}
                    style={styles.iconButton}
                    disabled={loading}
                  >
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
                    editable={!loading}
                  />
                  <TouchableOpacity
                    onPress={() => handleScanIconPress('Tractor Alternator No')}
                    style={styles.iconButton}
                    disabled={loading}
                  >
                    <Icon name="qr-code-scanner" size={20} color="#666" />
                  </TouchableOpacity>
                </View>
              </LinearGradient>
            </View>
          </View>

          {/* PDI Done By + Remarks */}
          <View style={styles.row}>
            <View style={styles.inputContainer}>
              <LinearGradient
                colors={['#7E5EA9', '#20AEBC']}
                style={styles.inputGradient}>
                <TextInput
                  style={styles.input}
                  value={formData.pdiDoneBy}
                  onChangeText={text => handleInputChange('pdiDoneBy', text)}
                  placeholder="PDI Done By"
                  editable={!loading}
                />
              </LinearGradient>
            </View>
            <View style={styles.inputContainer}>
              <LinearGradient
                colors={['#7E5EA9', '#20AEBC']}
                style={styles.inputGradient}>
                <TextInput
                  style={styles.input}
                  value={formData.remarks}
                  onChangeText={text => handleInputChange('remarks', text)}
                  placeholder="Remarks"
                  editable={!loading}
                  multiline
                />
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
          <Text style={styles.radioLabel}>Engine Oil Level:</Text>
          {renderFullHalf('engineOilLevel')}
          <Text style={styles.radioLabel}>Coolant Level:</Text>
          {renderFullHalf('coolantLevel')}
          <Text style={styles.radioLabel}>Brake Fluid Level:</Text>
          {renderFullHalf('brakeFluidLevel')}
          <Text style={styles.radioLabel}>Greasing Done:</Text>
          {renderYesNo('greasingDone')}
          <Text style={styles.radioLabel}>Paint Scratches:</Text>
          {renderYesNo('paintScratches')}
          <Text style={styles.radioLabel}>Toolkit Available:</Text>
          {renderYesNo('toolkitAvailable')}
          <Text style={styles.radioLabel}>Owner Manual Given:</Text>
          {renderYesNo('ownerManualGiven')}
          <Text style={styles.radioLabel}>Reflector Sticker Applied:</Text>
          {renderYesNo('reflectorStickerApplied')}
          <Text style={styles.radioLabel}>Number Plate Fixed:</Text>
          {renderYesNo('numberPlateFixed')}
        </View>

        {/* Photo & Signature */}
        <View style={styles.photoSignatureSection}>
          <TouchableOpacity 
            style={styles.photoSignatureBox} 
            onPress={() => showImagePickerOptions(setCustomerPhoto)}
            disabled={loading}
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
            disabled={loading}
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
            disabled={loading}
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
          <TouchableOpacity 
            style={[styles.submitButton, loading && styles.disabledButton]} 
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.submitButtonText}>
                {isEditMode ? 'Update' : 'Submit'}
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.homeButton, loading && styles.disabledButton]} 
            onPress={handleHome}
            disabled={loading}
          >
            <Text style={styles.homeButtonText}>Home</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={[styles.pdfButton, loading && styles.disabledButton]} 
          onPress={() => navigation.navigate('Pdfpage')}
          disabled={loading}
        >
          <Text style={styles.pdfButtonText}>Generate PDF Challan</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );

  // === Render Radio Helpers ===
  function renderYesNo(field) {
    return (
      <View style={styles.radioOptionsContainer}>
        {[
          {label: 'YES', value: '1'},
          {label: 'NO', value: '0'}
        ].map(({label, value}) => (
          <TouchableOpacity
            key={value}
            style={[
              styles.radioOptionWrapper,
              radioValues[field] === value && styles.radioOptionSelected,
            ]}
            onPress={() => handleRadioChange(field, value)}
            disabled={loading}
          >
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
                  {label}
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
        {[
          {label: 'FULL', value: '1'},
          {label: 'HALF', value: '0'}
        ].map(({label, value}) => (
          <TouchableOpacity
            key={value}
            style={[
              styles.radioOptionWrapper,
              radioValues[field] === value && styles.radioOptionSelected,
            ]}
            onPress={() => handleRadioChange(field, value)}
            disabled={loading}
          >
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
                  {label}
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
  editModeText: {
    fontSize: 12,
    textAlign: 'center',
    marginVertical: 5,
    fontFamily: 'Inter_28pt-SemiBold',
    color: '#7E5EA9',
    backgroundColor: '#f0e6ff',
    padding: 5,
    borderRadius: 5,
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
  disabledButton: {
    opacity: 0.6,
  },
});

export default PDIpage;