
// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   Modal,
//   FlatList,
//   Image,
//   ActionSheetIOS,
//   Platform,
//   PermissionsAndroid,
//   ActivityIndicator,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import {useSafeAreaInsets} from 'react-native-safe-area-context';
// import LinearGradient from 'react-native-linear-gradient';
// import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Camera } from 'react-native-camera-kit';

// const PDIpage = ({navigation, route}) => {
//   const insets = useSafeAreaInsets();

//   const [userId, setUserId] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [existingFormId, setExistingFormId] = useState(null);
  
//   const [showModelDropdown, setShowModelDropdown] = useState(false);
//   const [showTireDropdown, setShowTireDropdown] = useState(false);
//   const [showBatteryDropdown, setShowBatteryDropdown] = useState(false);
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [showBatteryDatePicker, setShowBatteryDatePicker] = useState(false);
//   const [showHypothecationDropdown, setShowHypothecationDropdown] = useState(false);

//   // QR Scanner States
//   const [showChassisScanner, setShowChassisScanner] = useState(false);
//   const [showEngineScanner, setShowEngineScanner] = useState(false);
//   const [showBatteryScanner, setShowBatteryScanner] = useState(false);
//   const [showStarterScanner, setShowStarterScanner] = useState(false);
//   const [showFipScanner, setShowFipScanner] = useState(false);
//   const [showAlternatorScanner, setShowAlternatorScanner] = useState(false);
//   const [hasCameraPermission, setHasCameraPermission] = useState(false);

//   // Terms and Conditions state
//   const [isTermsAccepted, setIsTermsAccepted] = useState(false);

//   const [formData, setFormData] = useState({
//     inspectorName: '',
//     tireMake: '',
//     otherTireMake: '',
//     batteryMake: '',
//     otherBatteryMake: '',
//     date: null, // select_date
//     batteryDate: null, // battery_date
//     chassisNo: '',
//     tractorModel: '',
//     engineNo: '',
//     frontRight: '',
//     rearRight: '',
//     frontLeft: '',
//     rearLeft: '',
//     starterNo: '',
//     alternatorNo: '',
//     batteryNo: '',
//     fipNo: '',
//     dealerName: '',
//     customerName: '',
//     customerFatherName: '', // NEW: Father's Name under Customer Details (point 1)
//     customerAddress: '',
//     customerContact: '',
//     pdiDoneBy: '',
//     remarks: '',

//     // Delivery-specific customer details (appear when Tractor Delivered = Yes)
//     deliveryCustomerName: '',
//     deliveryCustomerFatherName: '',
//     deliveryCustomerAddress: '',
//     deliveryCustomerContact: '',
//     hypothecation: '', // selected option
//     hypothecationOther: '',
//   });

//   // Image states
//   const [customerPhoto, setCustomerPhoto] = useState(null);
//   const [customerSignature, setCustomerSignature] = useState(null);
//   const [managerSignature, setManagerSignature] = useState(null);

//   const [radioValues, setRadioValues] = useState({
//     lightsOk: '1',
//     nutsOk: '1',
//     delivered: '1',
//     hydraulicOil: '1',
//     nutsSealed: '1',
//     engineOilLevel: '1',
//     coolantLevel: '1',
//     brakeFluidLevel: '1',
//     greasingDone: '1',
//     paintScratches: '0',
//     toolkitAvailable: '1',
//     ownerManualGiven: '1',
//     reflectorStickerApplied: '1',
//     numberPlateFixed: '0',
//   });

//   const tractorModels = [
//     '3028EN',
//     '3036EN',
//     '3036E',
//     '5105',
//     '5105 4WD',
//     '5050D Gear Pro',
//     '5210 Gear Pro',
//     '5050D 4WD Gear Pro',
//     '5210 4WD Gear Pro',
//     '5310 CRDI',
//     '5310 4WD CRDI',
//     '5405 CRDI',
//     '5405 4WD CRDI',
//     '5075 2WD',
//     '5075 4WD',
//   ];

//   const tireMakes = [
//     'Michelin',
//     'Bridgestone',
//     'Goodyear',
//     'Continental',
//     'Pirelli',
//     'Yokohama',
//     'MRF',
//     'Apollo',
//     'CEAT',
//     'JK Tyre',
//     'Other', // NEW: Other option for tyre make (point 2)
//   ];

//   const batteryMakes = [
//     'Exide',
//     'Amaron',
//     'Lucas',
//     'SF Sonic',
//     'Tata Green',
//     'Exide Industries',
//     'Luminous',
//     'Okaya',
//     'Su-Kam',
//     'Base',
//     'Other', // NEW: Other option for battery make (point 3)
//   ];

//   const hypothecationOptions = [
//     'John Deere Financial India Private Limited',
//     'The Jammu and Kashmir Bank Limited',
//     'Nil',
//     'Other',
//   ];

//   // Camera Permission Function
//   const requestCameraPermission = async () => {
//     if (Platform.OS === 'android') {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.CAMERA,
//           {
//             title: "Camera Permission",
//             message: "This app needs access to your camera to scan QR codes.",
//             buttonNeutral: "Ask Me Later",
//             buttonNegative: "Cancel",
//             buttonPositive: "OK"
//           }
//         );
//         const hasPermission = granted === PermissionsAndroid.RESULTS.GRANTED;
//         setHasCameraPermission(hasPermission);
//         return hasPermission;
//       } catch (err) {
//         console.warn(err);
//         setHasCameraPermission(false);
//         return false;
//       }
//     }
//     // iOS handles permissions differently - usually through Info.plist
//     setHasCameraPermission(true);
//     return true;
//   };

//   // QR Scanner Handlers
//   const handleChassisScanPress = async () => {
//     const hasPermission = await requestCameraPermission();
//     if (hasPermission) {
//       setShowChassisScanner(true);
//     } else {
//       Alert.alert('Permission Denied', 'Camera permission is required to scan QR codes.');
//     }
//   };

//   const handleEngineScanPress = async () => {
//     const hasPermission = await requestCameraPermission();
//     if (hasPermission) {
//       setShowEngineScanner(true);
//     } else {
//       Alert.alert('Permission Denied', 'Camera permission is required to scan QR codes.');
//     }
//   };

//   const handleBatteryScanPress = async () => {
//     const hasPermission = await requestCameraPermission();
//     if (hasPermission) {
//       setShowBatteryScanner(true);
//     } else {
//       Alert.alert('Permission Denied', 'Camera permission is required to scan QR codes.');
//     }
//   };

//   const handleStarterScanPress = async () => {
//     const hasPermission = await requestCameraPermission();
//     if (hasPermission) {
//       setShowStarterScanner(true);
//     } else {
//       Alert.alert('Permission Denied', 'Camera permission is required to scan QR codes.');
//     }
//   };

//   const handleFipScanPress = async () => {
//     const hasPermission = await requestCameraPermission();
//     if (hasPermission) {
//       setShowFipScanner(true);
//     } else {
//       Alert.alert('Permission Denied', 'Camera permission is required to scan QR codes.');
//     }
//   };

//   const handleAlternatorScanPress = async () => {
//     const hasPermission = await requestCameraPermission();
//     if (hasPermission) {
//       setShowAlternatorScanner(true);
//     } else {
//       Alert.alert('Permission Denied', 'Camera permission is required to scan QR codes.');
//     }
//   };

//   const handleQRCodeRead = (event) => {
//     const scannedValue = event.nativeEvent.codeStringValue;
//     console.log('QR Code Scanned:', scannedValue);
    
//     if (showChassisScanner) {
//       handleInputChange('chassisNo', scannedValue);
//       setShowChassisScanner(false);
//     } else if (showEngineScanner) {
//       handleInputChange('engineNo', scannedValue);
//       setShowEngineScanner(false);
//     } else if (showBatteryScanner) {
//       handleInputChange('batteryNo', scannedValue);
//       setShowBatteryScanner(false);
//     } else if (showStarterScanner) {
//       handleInputChange('starterNo', scannedValue);
//       setShowStarterScanner(false);
//     } else if (showFipScanner) {
//       handleInputChange('fipNo', scannedValue);
//       setShowFipScanner(false);
//     } else if (showAlternatorScanner) {
//       handleInputChange('alternatorNo', scannedValue);
//       setShowAlternatorScanner(false);
//     }
//   };

//   const closeScanner = () => {
//     setShowChassisScanner(false);
//     setShowEngineScanner(false);
//     setShowBatteryScanner(false);
//     setShowStarterScanner(false);
//     setShowFipScanner(false);
//     setShowAlternatorScanner(false);
//   };

//   // Get user ID from AsyncStorage on component mount
//   useEffect(() => {
//     const getUserData = async () => {
//       try {
//         const storedUserId = await AsyncStorage.getItem('userId');
//         if (storedUserId) {
//           setUserId(storedUserId);
//           console.log('User ID loaded:', storedUserId);
//         }
        
//         // Check if we're in edit mode (receiving existing form data)
//         if (route.params?.formData) {
//           const editData = route.params.formData;
//           setIsEditMode(true);
//           setExistingFormId(editData.id);
          
//           // Pre-populate form data
//           setFormData({
//             inspectorName: editData.inspector_name || '',
//             tireMake: editData.tire_make || '',
//             otherTireMake: editData.tire_make_other || '',
//             batteryMake: editData.battery_make || '',
//             otherBatteryMake: editData.battery_make_other || '',
//             date: editData.select_date ? new Date(editData.select_date) : null,
//             batteryDate: editData.battery_date ? new Date(editData.battery_date) : null,
//             chassisNo: editData.chassis_no || '',
//             tractorModel: editData.tractor_model || '',
//             engineNo: editData.engine_no || '',
//             frontRight: editData.front_right_serial_no || '',
//             rearRight: editData.rear_right_serial_no || '',
//             frontLeft: editData.front_left_serial_no || '',
//             rearLeft: editData.rear_left_serial_no || '',
//             starterNo: editData.tractor_starter_serial_no || '',
//             alternatorNo: editData.tractor_alternator_no || '',
//             batteryNo: editData.battery_serial_no || '',
//             fipNo: editData.fip_no || '',
//             dealerName: editData.dealer_name || '',
//             customerName: editData.customer_name || '',
//             customerFatherName: editData.customer_father_name || '',
//             customerAddress: editData.customer_address || '',
//             customerContact: editData.customer_contact || '',
//             pdiDoneBy: editData.pdi_done_by || '',
//             remarks: editData.remarks || '',
//             deliveryCustomerName: editData.delivery_customer_name || '',
//             deliveryCustomerFatherName: editData.delivery_customer_father_name || '',
//             deliveryCustomerAddress: editData.delivery_customer_address || '',
//             deliveryCustomerContact: editData.delivery_customer_contact || '',
//             hypothecation: editData.hypothecation || '',
//             hypothecationOther: editData.hypothecation_other || '',
//           });

//           // Set radio button states
//           setRadioValues({
//             lightsOk: editData.lights_ok?.toString() || '1',
//             nutsOk: editData.nuts_ok?.toString() || '1',
//             delivered: editData.tractor_delivered?.toString() || '1',
//             hydraulicOil: editData.hydraulic_oil?.toString() || '1',
//             nutsSealed: editData.all_nuts_sealed?.toString() || '1',
//             engineOilLevel: editData.engine_oil_level?.toString() || '1',
//             coolantLevel: editData.coolant_level?.toString() || '1',
//             brakeFluidLevel: editData.brake_fluid_level?.toString() || '1',
//             greasingDone: editData.greasing_done?.toString() || '1',
//             paintScratches: editData.paint_scratches?.toString() || '0',
//             toolkitAvailable: editData.toolkit_available?.toString() || '1',
//             ownerManualGiven: editData.owner_manual_given?.toString() || '1',
//             reflectorStickerApplied: editData.reflector_sticker_applied?.toString() || '1',
//             numberPlateFixed: editData.number_plate_fixed?.toString() || '0',
//           });

//           // Note: For images, you might need to handle URLs differently (show remote images)
//         }
//       } catch (error) {
//         console.log('Error loading user data:', error);
//       }
//     };

//     getUserData();
//   }, [route.params]);

//   // Generate form number
//   const generateFormNo = () => {
//     const timestamp = new Date().getTime();
//     return `PDI${timestamp}`;
//   };

//   // Camera permissions for image capture
//   const requestCameraPermissionForImage = async () => {
//     if (Platform.OS === 'android') {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.CAMERA,
//           {
//             title: "Camera Permission",
//             message: "This app needs access to your camera to take photos.",
//             buttonNeutral: "Ask Me Later",
//             buttonNegative: "Cancel",
//             buttonPositive: "OK"
//           }
//         );
//         return granted === PermissionsAndroid.RESULTS.GRANTED;
//       } catch (err) {
//         console.warn(err);
//         return false;
//       }
//     }
//     return true;
//   };

//   const showImagePickerOptions = (setImageFunction) => {
//     if (Platform.OS === 'ios') {
//       ActionSheetIOS.showActionSheetWithOptions(
//         {
//           options: ['Cancel', 'Take Photo', 'Choose from Library'],
//           cancelButtonIndex: 0,
//         },
//         async (buttonIndex) => {
//           if (buttonIndex === 1) {
//             const hasPermission = await requestCameraPermissionForImage();
//             if (hasPermission) handleCamera(setImageFunction);
//           } else if (buttonIndex === 2) handleImageLibrary(setImageFunction);
//         }
//       );
//     } else {
//       Alert.alert(
//         'Select Image',
//         'Choose an option',
//         [
//           { text: 'Cancel', style: 'cancel' },
//           { text: 'Take Photo', onPress: async () => {
//               const hasPermission = await requestCameraPermissionForImage();
//               if (hasPermission) handleCamera(setImageFunction);
//             }
//           },
//           { text: 'Choose from Library', onPress: () => handleImageLibrary(setImageFunction) },
//         ],
//         { cancelable: true }
//       );
//     }
//   };

//   const handleCamera = (setImageFunction) => {
//     launchCamera(
//       { 
//         mediaType: 'photo', 
//         quality: 0.8, 
//         cameraType: 'back', 
//         saveToPhotos: true,
//         includeBase64: false 
//       },
//       (response) => {
//         if (response.didCancel) return;
//         if (response.error) {
//           Alert.alert('Error', 'Failed to capture image');
//           return;
//         }
//         if (response.assets && response.assets.length > 0) {
//           setImageFunction(response.assets[0]);
//         }
//       }
//     );
//   };

//   const handleImageLibrary = (setImageFunction) => {
//     launchImageLibrary({ 
//       mediaType: 'photo', 
//       quality: 0.8,
//       includeBase64: false 
//     }, (response) => {
//       if (response.didCancel) return;
//       if (response.error) {
//         Alert.alert('Error', 'Failed to select image');
//         return;
//       }
//       if (response.assets && response.assets.length > 0) {
//         setImageFunction(response.assets[0]);
//       }
//     });
//   };

//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const handleRadioChange = (field, value) => {
//     setRadioValues(prev => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const handleModelSelect = model => {
//     handleInputChange('tractorModel', model);
//     setShowModelDropdown(false);
//   };

//   const handleTireSelect = tire => {
//     handleInputChange('tireMake', tire);
//     // clear other field if not Other
//     if (tire !== 'Other') {
//       handleInputChange('otherTireMake', '');
//     }
//     setShowTireDropdown(false);
//   };

//   const handleBatterySelect = battery => {
//     handleInputChange('batteryMake', battery);
//     // clear other field if not Other
//     if (battery !== 'Other') {
//       handleInputChange('otherBatteryMake', '');
//     }
//     setShowBatteryDropdown(false);
//   };

//   const handleHypothecationSelect = option => {
//     handleInputChange('hypothecation', option);
//     if (option !== 'Other') {
//       handleInputChange('hypothecationOther', '');
//     }
//     setShowHypothecationDropdown(false);
//   };

//   const handleDateChange = (event, selectedDate) => {
//     setShowDatePicker(false);
//     if (selectedDate) {
//       handleInputChange('date', selectedDate);
//     }
//   };

//   const handleBatteryDateChange = (event, selectedDate) => {
//     setShowBatteryDatePicker(false);
//     if (selectedDate) {
//       handleInputChange('batteryDate', selectedDate);
//     }
//   };

//   const validateForm = () => {
//     const requiredFields = [
//       'inspectorName', 'tractorModel', 'chassisNo', 'engineNo',
//       'tireMake', 'frontRight', 'frontLeft', 'rearRight', 'rearLeft',
//       'batteryMake', 'batteryNo', 'starterNo', 'fipNo', 'alternatorNo',
//       'dealerName', 'customerName', 'customerAddress', 'customerContact',
//       'pdiDoneBy'
//     ];

//     for (const field of requiredFields) {
//       if (!formData[field] || formData[field].toString().trim() === '') {
//         Alert.alert('Validation Error', `Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
//         return false;
//       }
//     }

//     // Check if terms are accepted when tractor is delivered
//     if (radioValues.delivered === '1' && !isTermsAccepted) {
//       Alert.alert('Validation Error', 'Please accept the Terms and Conditions');
//       return false;
//     }

//     // Make images optional for updates, required for new forms
//     if (!isEditMode) {
//       if (!customerPhoto) {
//         Alert.alert('Validation Error', 'Please add customer photo');
//         return false;
//       }

//       if (!customerSignature) {
//         Alert.alert('Validation Error', 'Please add customer signature');
//         return false;
//       }

//       if (!managerSignature) {
//         Alert.alert('Validation Error', 'Please add manager signature');
//         return false;
//       }
//     }

//     return true;
//   };

//   const prepareFormData = () => {
//     const formDataToSend = new FormData();

//     // For updates, use PUT method and include ID
//     if (isEditMode && existingFormId) {
//       formDataToSend.append('id', existingFormId.toString());
//       console.log('UPDATE MODE - Form ID:', existingFormId);
//     } else {
//       // For new forms, generate new form number
//       formDataToSend.append('form_no', generateFormNo());
//       console.log('CREATE MODE - New Form No:', generateFormNo());
//     }

//     // Common form data for both create and update
//     formDataToSend.append('user_id', userId);
//     formDataToSend.append('form_date', new Date().toISOString().split('T')[0]);
//     formDataToSend.append('inspector_name', formData.inspectorName);
//     formDataToSend.append('select_date', formData.date ? formData.date.toISOString().split('T')[0] : '');
//     formDataToSend.append('tractor_model', formData.tractorModel);
//     formDataToSend.append('chassis_no', formData.chassisNo);
//     formDataToSend.append('engine_no', formData.engineNo);

//     // Tyre and battery (including "Other" values)
//     formDataToSend.append('tire_make', formData.tireMake);
//     formDataToSend.append('tire_make_other', formData.otherTireMake || '');
//     formDataToSend.append('front_right_serial_no', formData.frontRight);
//     formDataToSend.append('front_left_serial_no', formData.frontLeft);
//     formDataToSend.append('rear_right_serial_no', formData.rearRight);
//     formDataToSend.append('rear_left_serial_no', formData.rearLeft);
//     formDataToSend.append('battery_make', formData.batteryMake);
//     formDataToSend.append('battery_make_other', formData.otherBatteryMake || '');
//     formDataToSend.append('battery_date', formData.batteryDate ? formData.batteryDate.toISOString().split('T')[0] : '');
//     formDataToSend.append('battery_serial_no', formData.batteryNo);
//     formDataToSend.append('tractor_starter_serial_no', formData.starterNo);
//     formDataToSend.append('fip_no', formData.fipNo);
//     formDataToSend.append('tractor_alternator_no', formData.alternatorNo);
    
//     // Customer details
//     formDataToSend.append('dealer_name', formData.dealerName);
//     formDataToSend.append('customer_name', formData.customerName);
//     formDataToSend.append('customer_father_name', formData.customerFatherName || '');
//     formDataToSend.append('customer_address', formData.customerAddress);
//     formDataToSend.append('customer_contact', formData.customerContact);
//     formDataToSend.append('pdi_done_by', formData.pdiDoneBy);
//     formDataToSend.append('remarks', formData.remarks || '');

//     // Delivery-specific customer details (only meaningful if delivered === '1')
//     formDataToSend.append('delivery_customer_name', formData.deliveryCustomerName || '');
//     formDataToSend.append('delivery_customer_father_name', formData.deliveryCustomerFatherName || '');
//     formDataToSend.append('delivery_customer_address', formData.deliveryCustomerAddress || '');
//     formDataToSend.append('delivery_customer_contact', formData.deliveryCustomerContact || '');
//     formDataToSend.append('hypothecation', formData.hypothecation || '');
//     formDataToSend.append('hypothecation_other', formData.hypothecationOther || '');

//     // Radio button values (convert to 1/0 for API)
//     formDataToSend.append('lights_ok', radioValues.lightsOk);
//     formDataToSend.append('nuts_ok', radioValues.nutsOk);
//     formDataToSend.append('hydraulic_oil', radioValues.hydraulicOil);
//     formDataToSend.append('all_nuts_sealed', radioValues.nutsSealed);
//     formDataToSend.append('tractor_delivered', radioValues.delivered);
//     formDataToSend.append('engine_oil_level', radioValues.engineOilLevel);
//     formDataToSend.append('coolant_level', radioValues.coolantLevel);
//     formDataToSend.append('brake_fluid_level', radioValues.brakeFluidLevel);
//     formDataToSend.append('greasing_done', radioValues.greasingDone);
//     formDataToSend.append('paint_scratches', radioValues.paintScratches);
//     formDataToSend.append('toolkit_available', radioValues.toolkitAvailable);
//     formDataToSend.append('owner_manual_given', radioValues.ownerManualGiven);
//     formDataToSend.append('reflector_sticker_applied', radioValues.reflectorStickerApplied);
//     formDataToSend.append('number_plate_fixed', radioValues.numberPlateFixed);

//     // Add delivery date if tractor is delivered
//     if (radioValues.delivered === '1') {
//       formDataToSend.append('delivery_date', new Date().toISOString().split('T')[0]);
//     }

//     // Add images only if they are newly selected
//     if (customerPhoto && customerPhoto.uri && !customerPhoto.uri.startsWith('http')) {
//       formDataToSend.append('customer_photo', {
//         uri: customerPhoto.uri,
//         type: customerPhoto.type || 'image/jpeg',
//         name: `customer_photo_${Date.now()}.jpg`,
//       });
//     }

//     if (customerSignature && customerSignature.uri && !customerSignature.uri.startsWith('http')) {
//       formDataToSend.append('customer_signature', {
//         uri: customerSignature.uri,
//         type: customerSignature.type || 'image/jpeg',
//         name: `customer_signature_${Date.now()}.jpg`,
//       });
//     }

//     if (managerSignature && managerSignature.uri && !managerSignature.uri.startsWith('http')) {
//       formDataToSend.append('manager_signature', {
//         uri: managerSignature.uri,
//         type: managerSignature.type || 'image/jpeg',
//         name: `manager_signature_${Date.now()}.jpg`,
//       });
//     }

//     return formDataToSend;
//   };

//   const handleSubmit = async () => {
//     if (!userId) {
//       Alert.alert('Error', 'User ID not found. Please login again.');
//       return;
//     }

//     if (!validateForm()) {
//       return;
//     }

//     setLoading(true);

//     try {
//       const formDataToSend = prepareFormData();
      
//       // Use different endpoints and methods for create vs update
//       let url, method;
      
//       if (isEditMode && existingFormId) {
//         // For update, use PUT method
//         url = `https://argosmob.uk/makroo/public/api/v1/pdi-delivery/form/update`;
//         method = 'put';
//         console.log('UPDATE REQUEST - URL:', url, 'Method:', method, 'Form ID:', existingFormId);
//       } else {
//         // For create, use POST method
//         url = 'https://argosmob.uk/makroo/public/api/v1/pdi-delivery/form/save';
//         method = 'post';
//         console.log('CREATE REQUEST - URL:', url, 'Method:', method);
//       }

//       const config = {
//         method: method,
//         url: url,
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//         data: formDataToSend,
//         timeout: 30000, // 30 seconds timeout
//       };

//       console.log('Sending form data...');
//       const response = await axios(config);
//       console.log('API Response:', response.data);

//       // Enhanced success detection with clear conditions
//       let isSuccess = false;
//       let successMessage = '';
//       let errorMessage = '';

//       if (isEditMode) {
//         // For UPDATE operations
//         successMessage = 'PDI Form updated successfully!';
//         errorMessage = 'Failed to update form. Please try again.';
        
//         if (response.data) {
//           if (response.data.status === true || response.data.success === true) {
//             isSuccess = true;
//           } else if (response.data.message && response.data.message.toLowerCase().includes('success')) {
//             isSuccess = true;
//           } else if (response.data.message && response.data.message.toLowerCase().includes('updated')) {
//             isSuccess = true;
//           }
//         }
//       } else {
//         // For NEW SUBMISSION operations
//         successMessage = 'PDI Form submitted successfully!';
//         errorMessage = 'Failed to submit form. Please try again.';
        
//         if (response.data) {
//           if (response.data.status === true || response.data.success === true) {
//             isSuccess = true;
//           } else if (response.data.message && response.data.message.toLowerCase().includes('success')) {
//             isSuccess = true;
//           } else if (response.data.message && response.data.message.toLowerCase().includes('created')) {
//             isSuccess = true;
//           } else if (response.data.message && response.data.message.toLowerCase().includes('saved')) {
//             isSuccess = true;
//           }
//         }
//       }

//       // Additional success checks based on HTTP status
//       if (response.status === 200 || response.status === 201) {
//         if (!isSuccess) {
//           // If HTTP status is success but our detection failed, still consider it success
//           isSuccess = true;
//           console.log('Success detected from HTTP status');
//         }
//       }

//       if (isSuccess) {
//         Alert.alert(
//           'Success', 
//           successMessage,
//           [
//             {
//               text: 'OK',
//             }
//           ]
//         );
//       } else {
//         const serverErrorMessage = response.data?.message || response.data?.error || errorMessage;
//         Alert.alert(
//           isEditMode ? 'Update Failed' : 'Submission Failed', 
//           serverErrorMessage
//         );
//       }

//     } catch (error) {
//       console.log('Submission Error:', error);
//       console.log('Error details:', error.response?.data);
      
//       let errorMessage = 'Something went wrong. Please try again.';
      
//       if (error.response) {
//         const serverError = error.response.data;
//         errorMessage = serverError.message || serverError.error || `Server error: ${error.response.status}`;
//       } else if (error.request) {
//         errorMessage = 'Network error. Please check your internet connection.';
//       }
      
//       Alert.alert(
//         isEditMode ? 'Update Failed' : 'Submission Failed', 
//         errorMessage
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleHome = () => {
//     navigation.navigate('Dashboard');
//   };

//   const handleGeneratePDF = () => {
//     Alert.alert('PDF', 'PDI Challan generated!');
//   };

//   const handleDateIconPress = () => {
//     setShowDatePicker(true);
//   };

//   const handleBatteryDateIconPress = () => {
//     setShowBatteryDatePicker(true);
//   };

//   const renderModelItem = ({item}) => (
//     <TouchableOpacity
//       style={styles.modelItem}
//       onPress={() => handleModelSelect(item)}>
//       <Text style={styles.modelItemText}>{item}</Text>
//     </TouchableOpacity>
//   );

//   const renderTireItem = ({item}) => (
//     <TouchableOpacity
//       style={styles.modelItem}
//       onPress={() => handleTireSelect(item)}>
//       <Text style={styles.modelItemText}>{item}</Text>
//     </TouchableOpacity>
//   );

//   const renderBatteryItem = ({item}) => (
//     <TouchableOpacity
//       style={styles.modelItem}
//       onPress={() => handleBatterySelect(item)}>
//       <Text style={styles.modelItemText}>{item}</Text>
//     </TouchableOpacity>
//   );

//   const renderHypothecationItem = ({item}) => (
//     <TouchableOpacity
//       style={styles.modelItem}
//       onPress={() => handleHypothecationSelect(item)}>
//       <Text style={styles.modelItemText}>{item}</Text>
//     </TouchableOpacity>
//   );

//   // QR Scanner Component
//   const renderQRScanner = () => (
//     <Modal
//       visible={showChassisScanner || showEngineScanner || showBatteryScanner || showStarterScanner || showFipScanner || showAlternatorScanner}
//       animationType="slide"
//       transparent={false}
//       onRequestClose={closeScanner}
//     >
//       <View style={styles.scannerContainer}>
//         <View style={styles.scannerHeader}>
//           <TouchableOpacity onPress={closeScanner} style={styles.scannerCloseButton}>
//             <Icon name="close" size={24} color="#fff" />
//           </TouchableOpacity>
//           <Text style={styles.scannerTitle}>
//             {showChassisScanner ? 'Scan Chassis Number' : 
//              showEngineScanner ? 'Scan Engine Number' :
//              showBatteryScanner ? 'Scan Battery Serial Number' :
//              showStarterScanner ? 'Scan Starter Serial Number' :
//              showFipScanner ? 'Scan FIP Number' :
//              'Scan Alternator Number'}
//           </Text>
//         </View>
        
//         <Camera
//           style={styles.camera}
//           cameraOptions={{
//             flashMode: 'auto',
//             focusMode: 'on',
//             zoomMode: 'on',
//           }}
//           scanBarcode={true}
//           showFrame={true}
//           laserColor="red"
//           frameColor="white"
//           onReadCode={handleQRCodeRead}
//         />
        
//         <View style={styles.scannerFooter}>
//           <Text style={styles.scannerInstructions}>
//             Point your camera at a QR code to scan
//           </Text>
//         </View>
//       </View>
//     </Modal>
//   );

//   return (
//     <View
//       style={{flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom}}>
//       {/* Header */}
//       <LinearGradient
//         colors={['#7E5EA9', '#20AEBC']}
//         start={{x: 0, y: 0}}
//         end={{x: 1, y: 0}}
//         style={styles.header}>
//         <Text style={styles.companyName}>Makroo Motor Corporation</Text>
//         <Text style={styles.companyName}>Pre Delivery Inspection</Text>
//         <Text style={styles.companyName}>Form</Text>
//       </LinearGradient>

//       <ScrollView style={styles.container}>
//         {/* Date and Form No */}
//         <Text style={styles.Date}>{new Date().toLocaleDateString()}</Text>
//         {isEditMode && (
//           <View style={styles.editModeContainer}>
//             <Text style={styles.editModeText}>Edit Mode - Updating Form ID: {existingFormId}</Text>
//           </View>
//         )}

//         {/* Form Fields */}
//         <View style={styles.formContainer}>
//           {/* Inspector + Date */}
//           <View style={styles.row}>
//             <View style={styles.inputContainer}>
//               <LinearGradient
//                 colors={['#7E5EA9', '#20AEBC']}
//                 style={styles.inputGradient}>
//                 <TextInput
//                   style={styles.input}
//                   value={formData.inspectorName}
//                   onChangeText={text =>
//                     handleInputChange('inspectorName', text)
//                   }
//                   placeholder="Inspector Name"
//                   editable={!loading}
//                 />
//               </LinearGradient>
//             </View>
//             <View style={styles.inputContainer}>
//               <LinearGradient
//                 colors={['#7E5EA9', '#20AEBC']}
//                 style={styles.inputGradient}>
//                 <View style={styles.inputWithIcon}>
//                   <TouchableOpacity
//                     style={[styles.input, styles.inputWithIconField]}
//                     onPress={handleDateIconPress}
//                     disabled={loading}
//                   >
//                     <Text style={ formData.date ? styles.selectedModelText : styles.placeholderText }>
//                       {formData.date ? formData.date.toLocaleDateString() : 'Select Date'}
//                     </Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     onPress={handleDateIconPress}
//                     style={styles.iconButton}
//                     disabled={loading}
//                   >
//                     <Icon name="calendar-today" size={20} color="#666" />
//                   </TouchableOpacity>
//                 </View>
//                 {showDatePicker && (
//                   <DateTimePicker
//                     value={formData.date || new Date()}
//                     mode="date"
//                     display={Platform.OS === 'ios' ? 'spinner' : 'default'}
//                     onChange={handleDateChange}
//                   />
//                 )}
//               </LinearGradient>
//             </View>
//           </View>

//           {/* Tractor Model + Chassis No */}
//           <View style={styles.row}>
//             <View style={styles.inputContainer}>
//               <LinearGradient
//                 colors={['#7E5EA9', '#20AEBC']}
//                 style={styles.inputGradient}>
//                 <TouchableOpacity
//                   style={styles.input}
//                   onPress={() => setShowModelDropdown(true)}
//                   disabled={loading}
//                 >
//                   <Text
//                     style={
//                       formData.tractorModel
//                         ? styles.selectedModelText
//                         : styles.placeholderText
//                     }>
//                     {formData.tractorModel || 'Select Tractor Model'}
//                   </Text>
//                   <Icon
//                     name="keyboard-arrow-down"
//                     size={25}
//                     color="#666"
//                     style={styles.dropdownIcon}
//                   />
//                 </TouchableOpacity>
//               </LinearGradient>
//             </View>
//             <View style={styles.inputContainer}>
//               <LinearGradient
//                 colors={['#7E5EA9', '#20AEBC']}
//                 style={styles.inputGradient}>
//                 <View style={styles.inputWithIcon}>
//                   <TextInput
//                     style={[styles.input, styles.inputWithIconField]}
//                     value={formData.chassisNo}
//                     onChangeText={text => handleInputChange('chassisNo', text)}
//                     placeholder="Chassis No."
//                     editable={!loading}
//                   />
//                   <TouchableOpacity
//                     onPress={handleChassisScanPress}
//                     style={styles.iconButton}
//                     disabled={loading}
//                   >
//                     <Icon name="qr-code-scanner" size={20} color="#666" />
//                   </TouchableOpacity>
//                 </View>
//               </LinearGradient>
//             </View>
//           </View>

//           {/* Engine No */}
//           <View style={styles.row}>
//             <View style={styles.inputContainer}>
//               <LinearGradient
//                 colors={['#7E5EA9', '#20AEBC']}
//                 style={styles.inputGradient}>
//                 <View style={styles.inputWithIcon}>
//                   <TextInput
//                     style={[styles.input, styles.inputWithIconField]}
//                     value={formData.engineNo}
//                     onChangeText={text => handleInputChange('engineNo', text)}
//                     placeholder="Engine No."
//                     editable={!loading}
//                   />
//                   <TouchableOpacity
//                     onPress={handleEngineScanPress}
//                     style={styles.iconButton}
//                     disabled={loading}
//                   >
//                     <Icon name="qr-code-scanner" size={20} color="#666" />
//                   </TouchableOpacity>
//                 </View>
//               </LinearGradient>
//             </View>
//             <View style={styles.inputContainer}></View>
//           </View>

//           {/* Customer Details Heading */}
//           <View style={styles.sectionHeading}>
//             <Text style={styles.sectionHeadingText}>Customer Details:</Text>
//           </View>

//           {/* Dealer Name + Customer Name */}
//           <View style={styles.row}>
//             <View style={styles.inputContainer}>
//               <LinearGradient
//                 colors={['#7E5EA9', '#20AEBC']}
//                 style={styles.inputGradient}>
//                 <TextInput
//                   style={styles.input}
//                   value={formData.dealerName}
//                   onChangeText={text => handleInputChange('dealerName', text)}
//                   placeholder="Dealer Name"
//                   editable={!loading}
//                 />
//               </LinearGradient>
//             </View>
//             <View style={styles.inputContainer}>
//               <LinearGradient
//                 colors={['#7E5EA9', '#20AEBC']}
//                 style={styles.inputGradient}>
//                 <TextInput
//                   style={styles.input}
//                   value={formData.customerName}
//                   onChangeText={text => handleInputChange('customerName', text)}
//                   placeholder="Customer Name"
//                   editable={!loading}
//                 />
//               </LinearGradient>
//             </View>
//           </View>

//           {/* Customer Father's Name (POINT 1) */}
//           <View style={styles.row}>
//             <View style={styles.inputContainer}>
//               <LinearGradient colors={['#7E5EA9', '#20AEBC']} style={styles.inputGradient}>
//                 <TextInput
//                   style={styles.input}
//                   value={formData.customerFatherName}
//                   onChangeText={text => handleInputChange('customerFatherName', text)}
//                   placeholder="Father's Name"
//                   editable={!loading}
//                 />
//               </LinearGradient>
//             </View>
          
//           </View>

//           {/* Customer Address */}
//           <View style={styles.row}>
//             <View style={styles.inputContainer}>
//               <LinearGradient
//                 colors={['#7E5EA9', '#20AEBC']}
//                 style={styles.inputGradient}>
//                 <TextInput
//                   style={styles.input}
//                   value={formData.customerAddress}
//                   onChangeText={text => handleInputChange('customerAddress', text)}
//                   placeholder="Customer Address"
//                   editable={!loading}
//                   multiline
//                 />
//               </LinearGradient>
//             </View>
//             <View style={styles.inputContainer}>
//               <LinearGradient
//                 colors={['#7E5EA9', '#20AEBC']}
//                 style={styles.inputGradient}>
//                 <TextInput
//                   style={styles.input}
//                   value={formData.customerContact}
//                   onChangeText={text => handleInputChange('customerContact', text)}
//                   placeholder="Customer Contact"
//                   keyboardType="phone-pad"
//                   editable={!loading}
//                 />
//               </LinearGradient>
//             </View>
//           </View>

//           {/* Tyre Details Heading */}
//           <View style={styles.sectionHeading}>
//             <Text style={styles.sectionHeadingText}>Tyre Details:</Text>
//           </View>

//           {/* Select Tire Make (with 'Other' option showing input when selected) */}
//           <View style={styles.row}>
//             <View style={styles.inputContainer}>
//               <LinearGradient
//                 colors={['#7E5EA9', '#20AEBC']}
//                 style={styles.inputGradient}>
//                 <TouchableOpacity
//                   style={styles.input}
//                   onPress={() => setShowTireDropdown(true)}
//                   disabled={loading}
//                 >
//                   <Text
//                     style={
//                       formData.tireMake
//                         ? styles.selectedModelText
//                         : styles.placeholderText
//                     }>
//                     {formData.tireMake || 'Select Tyre Make'}
//                   </Text>
//                   <Icon
//                     name="keyboard-arrow-down"
//                     size={25}
//                     color="#666"
//                     style={styles.dropdownIcon}
//                   />
//                 </TouchableOpacity>
//               </LinearGradient>
//             </View>
//             <View style={styles.inputContainer}></View>
//           </View>

//           {/* If "Other" selected for tyre make, show TextInput (point 2) */}
//           {formData.tireMake === 'Other' && (
//             <View style={styles.row}>
//               <View style={styles.inputContainer}>
//                 <LinearGradient colors={['#7E5EA9', '#20AEBC']} style={styles.inputGradient}>
//                   <TextInput
//                     style={styles.input}
//                     value={formData.otherTireMake}
//                     onChangeText={text => handleInputChange('otherTireMake', text)}
//                     placeholder="Enter Other Tyre Make"
//                     editable={!loading}
//                   />
//                 </LinearGradient>
//               </View>
//               <View style={styles.inputContainer}></View>
//             </View>
//           )}

//           {/* Front Right + Front Left */}
//           <View style={styles.row}>
//             <View style={styles.inputContainer}>
//               <LinearGradient
//                 colors={['#7E5EA9', '#20AEBC']}
//                 style={styles.inputGradient}>
//                 <TextInput
//                   style={styles.input}
//                   value={formData.frontRight}
//                   onChangeText={text => handleInputChange('frontRight', text)}
//                   placeholder="Front Right Serial No."
//                   editable={!loading}
//                 />
//               </LinearGradient>
//             </View>
//             <View style={styles.inputContainer}>
//               <LinearGradient
//                 colors={['#7E5EA9', '#20AEBC']}
//                 style={styles.inputGradient}>
//                 <TextInput
//                   style={styles.input}
//                   value={formData.frontLeft}
//                   onChangeText={text => handleInputChange('frontLeft', text)}
//                   placeholder="Front Left Serial No."
//                   editable={!loading}
//                 />
//               </LinearGradient>
//             </View>
//           </View>

//           {/* Rear Right + Rear Left */}
//           <View style={styles.row}>
//             <View style={styles.inputContainer}>
//               <LinearGradient
//                 colors={['#7E5EA9', '#20AEBC']}
//                 style={styles.inputGradient}>
//                 <TextInput
//                   style={styles.input}
//                   value={formData.rearRight}
//                   onChangeText={text => handleInputChange('rearRight', text)}
//                   placeholder="Rear Right Serial No."
//                   editable={!loading}
//                 />
//               </LinearGradient>
//             </View>
//             <View style={styles.inputContainer}>
//               <LinearGradient
//                 colors={['#7E5EA9', '#20AEBC']}
//                 style={styles.inputGradient}>
//                 <TextInput
//                   style={styles.input}
//                   value={formData.rearLeft}
//                   onChangeText={text => handleInputChange('rearLeft', text)}
//                   placeholder="Rear Left Serial No."
//                   editable={!loading}
//                 />
//               </LinearGradient>
//             </View>
//           </View>

//           {/* Battery Details Heading */}
//           <View style={styles.sectionHeading}>
//             <Text style={styles.sectionHeadingText}>Battery Details:</Text>
//           </View>

//           {/* Select Battery Make (with 'Other' option showing input when selected) */}
//           <View style={styles.row}>
//             <View style={styles.inputContainer}>
//               <LinearGradient
//                 colors={['#7E5EA9', '#20AEBC']}
//                 style={styles.inputGradient}>
//                 <TouchableOpacity
//                   style={styles.input}
//                   onPress={() => setShowBatteryDropdown(true)}
//                   disabled={loading}
//                 >
//                   <Text
//                     style={
//                       formData.batteryMake
//                         ? styles.selectedModelText
//                         : styles.placeholderText
//                     }>
//                     {formData.batteryMake || 'Select Battery Make'}
//                   </Text>
//                   <Icon
//                     name="keyboard-arrow-down"
//                     size={25}
//                     color="#666"
//                     style={styles.dropdownIcon}
//                   />
//                 </TouchableOpacity>
//               </LinearGradient>
//             </View>
//             <View style={styles.inputContainer}></View>
//           </View>

//           {/* If "Other" selected for battery make, show TextInput (point 3) */}
//           {formData.batteryMake === 'Other' && (
//             <View style={styles.row}>
//               <View style={styles.inputContainer}>
//                 <LinearGradient colors={['#7E5EA9', '#20AEBC']} style={styles.inputGradient}>
//                   <TextInput
//                     style={styles.input}
//                     value={formData.otherBatteryMake}
//                     onChangeText={text => handleInputChange('otherBatteryMake', text)}
//                     placeholder="Enter Other Battery Make"
//                     editable={!loading}
//                   />
//                 </LinearGradient>
//               </View>
//               <View style={styles.inputContainer}></View>
//             </View>
//           )}

//           {/* Battery Date (next line after Select Battery Make) */}
//           <View style={styles.row}>
//             <View style={styles.inputContainer}>
//               <LinearGradient colors={['#7E5EA9', '#20AEBC']} style={styles.inputGradient}>
//                 <View style={styles.inputWithIcon}>
//                   <TouchableOpacity
//                     style={[styles.input, styles.inputWithIconField]}
//                     onPress={handleBatteryDateIconPress}
//                     disabled={loading}
//                   >
//                     <Text style={ formData.batteryDate ? styles.selectedModelText : styles.placeholderText }>
//                       {formData.batteryDate ? formData.batteryDate.toLocaleDateString() : 'Select Battery Date'}
//                     </Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                     onPress={handleBatteryDateIconPress}
//                     style={styles.iconButton}
//                     disabled={loading}
//                   >
//                     <Icon name="calendar-today" size={20} color="#666" />
//                   </TouchableOpacity>
//                 </View>
//                 {showBatteryDatePicker && (
//                   <DateTimePicker
//                     value={formData.batteryDate || new Date()}
//                     mode="date"
//                     display={Platform.OS === 'ios' ? 'spinner' : 'default'}
//                     onChange={handleBatteryDateChange}
//                   />
//                 )}
//               </LinearGradient>
//             </View>
           
//           </View>

//           {/* Battery Serial No + Tractor Starter Serial No */}
//           <View style={styles.row}>
//             <View style={styles.inputContainer}>
//               <LinearGradient
//                 colors={['#7E5EA9', '#20AEBC']}
//                 style={styles.inputGradient}>
//                 <View style={styles.inputWithIcon}>
//                   <TextInput
//                     style={[styles.input, styles.inputWithIconField]}
//                     value={formData.batteryNo}
//                     onChangeText={text => handleInputChange('batteryNo', text)}
//                     placeholder="Battery Serial No."
//                     editable={!loading}
//                   />
//                   <TouchableOpacity
//                     onPress={handleBatteryScanPress}
//                     style={styles.iconButton}
//                     disabled={loading}
//                   >
//                     <Icon name="qr-code-scanner" size={20} color="#666" />
//                   </TouchableOpacity>
//                 </View>
//               </LinearGradient>
//             </View>
//             <View style={styles.inputContainer}>
//               <LinearGradient
//                 colors={['#7E5EA9', '#20AEBC']}
//                 style={styles.inputGradient}>
//                 <View style={styles.inputWithIcon}>
//                   <TextInput
//                     style={[styles.input, styles.inputWithIconField]}
//                     value={formData.starterNo}
//                     onChangeText={text => handleInputChange('starterNo', text)}
//                     placeholder="Tractor Starter Serial No."
//                     editable={!loading}
//                   />
//                   <TouchableOpacity
//                     onPress={handleStarterScanPress}
//                     style={styles.iconButton}
//                     disabled={loading}
//                   >
//                     <Icon name="qr-code-scanner" size={20} color="#666" />
//                   </TouchableOpacity>
//                 </View>
//               </LinearGradient>
//             </View>
//           </View>

//           {/* FIP No + Tractor Alternator No */}
//           <View style={styles.row}>
//             <View style={styles.inputContainer}>
//               <LinearGradient
//                 colors={['#7E5EA9', '#20AEBC']}
//                 style={styles.inputGradient}>
//                 <View style={styles.inputWithIcon}>
//                   <TextInput
//                     style={[styles.input, styles.inputWithIconField]}
//                     value={formData.fipNo}
//                     onChangeText={text => handleInputChange('fipNo', text)}
//                     placeholder="FIP No."
//                     editable={!loading}
//                   />
//                   <TouchableOpacity
//                     onPress={handleFipScanPress}
//                     style={styles.iconButton}
//                     disabled={loading}
//                   >
//                     <Icon name="qr-code-scanner" size={20} color="#666" />
//                   </TouchableOpacity>
//                 </View>
//               </LinearGradient>
//             </View>
//             <View style={styles.inputContainer}>
//               <LinearGradient
//                 colors={['#7E5EA9', '#20AEBC']}
//                 style={styles.inputGradient}>
//                 <View style={styles.inputWithIcon}>
//                   <TextInput
//                     style={[styles.input, styles.inputWithIconField]}
//                     value={formData.alternatorNo}
//                     onChangeText={text => handleInputChange('alternatorNo', text)}
//                     placeholder="Tractor Alternator No."
//                     editable={!loading}
//                   />
//                   <TouchableOpacity
//                     onPress={handleAlternatorScanPress}
//                     style={styles.iconButton}
//                     disabled={loading}
//                   >
//                     <Icon name="qr-code-scanner" size={20} color="#666" />
//                   </TouchableOpacity>
//                 </View>
//               </LinearGradient>
//             </View>
//           </View>

//           {/* PDI Done By + Remarks */}
//           <View style={styles.row}>
//             <View style={styles.inputContainer}>
//               <LinearGradient
//                 colors={['#7E5EA9', '#20AEBC']}
//                 style={styles.inputGradient}>
//                 <TextInput
//                   style={styles.input}
//                   value={formData.pdiDoneBy}
//                   onChangeText={text => handleInputChange('pdiDoneBy', text)}
//                   placeholder="PDI Done By"
//                   editable={!loading}
//                 />
//               </LinearGradient>
//             </View>
//             <View style={styles.inputContainer}>
//               <LinearGradient
//                 colors={['#7E5EA9', '#20AEBC']}
//                 style={styles.inputGradient}>
//                 <TextInput
//                   style={styles.input}
//                   value={formData.remarks}
//                   onChangeText={text => handleInputChange('remarks', text)}
//                   placeholder="Remarks"
//                   editable={!loading}
//                   multiline
//                 />
//               </LinearGradient>
//             </View>
//           </View>
//         </View>

//         {/* Tractor Model Modal */}
//         <Modal
//           visible={showModelDropdown}
//           transparent={true}
//           animationType="slide"
//           onRequestClose={() => setShowModelDropdown(false)}>
//           <View style={styles.modalOverlay}>
//             <View style={styles.modalContent}>
//               <View style={styles.modalHeader}>
//                 <Text style={styles.modalTitle}>Select Tractor Model</Text>
//                 <TouchableOpacity
//                   onPress={() => setShowModelDropdown(false)}
//                   style={styles.closeButton}>
//                   <Icon name="close" size={24} color="#000" />
//                 </TouchableOpacity>
//               </View>
//               <FlatList
//                 data={tractorModels}
//                 renderItem={renderModelItem}
//                 keyExtractor={(item, index) => index.toString()}
//                 style={styles.modelList}
//               />
//             </View>
//           </View>
//         </Modal>

//         {/* Tire Make Modal */}
//         <Modal
//           visible={showTireDropdown}
//           transparent={true}
//           animationType="slide"
//           onRequestClose={() => setShowTireDropdown(false)}>
//           <View style={styles.modalOverlay}>
//             <View style={styles.modalContent}>
//               <View style={styles.modalHeader}>
//                 <Text style={styles.modalTitle}>Select Tyre Make</Text>
//                 <TouchableOpacity
//                   onPress={() => setShowTireDropdown(false)}
//                   style={styles.closeButton}>
//                   <Icon name="close" size={24} color="#000" />
//                 </TouchableOpacity>
//               </View>
//               <FlatList
//                 data={tireMakes}
//                 renderItem={renderTireItem}
//                 keyExtractor={(item, index) => index.toString()}
//                 style={styles.modelList}
//               />
//             </View>
//           </View>
//         </Modal>

//         {/* Battery Make Modal */}
//         <Modal
//           visible={showBatteryDropdown}
//           transparent={true}
//           animationType="slide"
//           onRequestClose={() => setShowBatteryDropdown(false)}>
//           <View style={styles.modalOverlay}>
//             <View style={styles.modalContent}>
//               <View style={styles.modalHeader}>
//                 <Text style={styles.modalTitle}>Select Battery Make</Text>
//                 <TouchableOpacity
//                   onPress={() => setShowBatteryDropdown(false)}
//                   style={styles.closeButton}>
//                   <Icon name="close" size={24} color="#000" />
//                 </TouchableOpacity>
//               </View>
//               <FlatList
//                 data={batteryMakes}
//                 renderItem={renderBatteryItem}
//                 keyExtractor={(item, index) => index.toString()}
//                 style={styles.modelList}
//               />
//             </View>
//           </View>
//         </Modal>

//         {/* Hypothecation Modal (for point 4) */}
//         <Modal
//           visible={showHypothecationDropdown}
//           transparent={true}
//           animationType="slide"
//           onRequestClose={() => setShowHypothecationDropdown(false)}>
//           <View style={styles.modalOverlay}>
//             <View style={styles.modalContent}>
//               <View style={styles.modalHeader}>
//                 <Text style={styles.modalTitle}>Select Hypothecation</Text>
//                 <TouchableOpacity
//                   onPress={() => setShowHypothecationDropdown(false)}
//                   style={styles.closeButton}>
//                   <Icon name="close" size={24} color="#000" />
//                 </TouchableOpacity>
//               </View>
//               <FlatList
//                 data={hypothecationOptions}
//                 renderItem={renderHypothecationItem}
//                 keyExtractor={(item, index) => index.toString()}
//                 style={styles.modelList}
//               />
//             </View>
//           </View>
//         </Modal>

//         {/* QR Scanner Modal */}
//         {renderQRScanner()}

//         {/* Radio Sections */}
//         <View style={styles.radioSection}>
//           <Text style={styles.radioLabel}>Lights OK:</Text>
//           {renderYesNo('lightsOk')}
//           <Text style={styles.radioLabel}>Nuts OK:</Text>
//           {renderYesNo('nutsOk')}
         
//           <Text style={styles.radioLabel}>Hydraulic Oil:</Text>
//           {renderFullHalf('hydraulicOil')}
//           <Text style={styles.radioLabel}>All Nuts Are Sealed:</Text>
//           {renderYesNo('nutsSealed')}
//           <Text style={styles.radioLabel}>Tractor Delivered:</Text>
//           {renderYesNo('delivered')}
//         </View>

//         {/* Delivery Customer Details (POINT 4)
//             This block appears only when Tractor Delivered = YES (radioValues.delivered === '1')
//             It contains: Customer Name, Father's Name, Address, Mobile Number, Hypothecation (dropdown)
//             If Hypothecation == 'Other', an editable input appears.
//         */}
//         {radioValues.delivered === '1' && (
//           <View style={styles.sectionHeading}>
//             <Text style={styles.sectionHeadingText}>Delivery Customer Details:</Text>

//             {/* Delivery Customer Name + Father's Name */}
//             <View style={[styles.row, {marginTop: 8}]}>
//               <View style={styles.inputContainer}>
//                 <LinearGradient colors={['#7E5EA9', '#20AEBC']} style={styles.inputGradient}>
//                   <TextInput
//                     style={styles.input}
//                     value={formData.deliveryCustomerName}
//                     onChangeText={text => handleInputChange('deliveryCustomerName', text)}
//                     placeholder="Customer Name"
//                     editable={!loading}
//                   />
//                 </LinearGradient>
//               </View>
//               <View style={styles.inputContainer}>
//                 <LinearGradient colors={['#7E5EA9', '#20AEBC']} style={styles.inputGradient}>
//                   <TextInput
//                     style={styles.input}
//                     value={formData.deliveryCustomerFatherName}
//                     onChangeText={text => handleInputChange('deliveryCustomerFatherName', text)}
//                     placeholder="Father's Name"
//                     editable={!loading}
//                   />
//                 </LinearGradient>
//               </View>
//             </View>

//             {/* Delivery Address + Mobile */}
//             <View style={styles.row}>
//               <View style={styles.inputContainer}>
//                 <LinearGradient colors={['#7E5EA9', '#20AEBC']} style={styles.inputGradient}>
//                   <TextInput
//                     style={styles.input}
//                     value={formData.deliveryCustomerAddress}
//                     onChangeText={text => handleInputChange('deliveryCustomerAddress', text)}
//                     placeholder="Address"
//                     editable={!loading}
//                     multiline
//                   />
//                 </LinearGradient>
//               </View>
//               <View style={styles.inputContainer}>
//                 <LinearGradient colors={['#7E5EA9', '#20AEBC']} style={styles.inputGradient}>
//                   <TextInput
//                     style={styles.input}
//                     value={formData.deliveryCustomerContact}
//                     onChangeText={text => handleInputChange('deliveryCustomerContact', text)}
//                     placeholder="Mobile Number"
//                     keyboardType="phone-pad"
//                     editable={!loading}
//                   />
//                 </LinearGradient>
//               </View>
//             </View>

//             {/* Hypothecation dropdown + 'Other' input if selected */}
//             <View style={styles.row}>
//               <View style={styles.inputContainer}>
//                 <LinearGradient colors={['#7E5EA9', '#20AEBC']} style={styles.inputGradient}>
//                   <TouchableOpacity
//                     style={styles.input}
//                     onPress={() => setShowHypothecationDropdown(true)}
//                     disabled={loading}
//                   >
//                     <Text style={ formData.hypothecation ? styles.selectedModelText : styles.placeholderText }>
//                       {formData.hypothecation || 'Select Hypothecation'}
//                     </Text>
//                     <Icon
//                       name="keyboard-arrow-down"
//                       size={25}
//                       color="#666"
//                       style={styles.dropdownIcon}
//                     />
//                   </TouchableOpacity>
//                 </LinearGradient>
//               </View>
//               <View style={styles.inputContainer}></View>
//             </View>

//             {formData.hypothecation === 'Other' && (
//               <View style={styles.row}>
//                 <View style={styles.inputContainer}>
//                   <LinearGradient colors={['#7E5EA9', '#20AEBC']} style={styles.inputGradient}>
//                     <TextInput
//                       style={styles.input}
//                       value={formData.hypothecationOther}
//                       onChangeText={text => handleInputChange('hypothecationOther', text)}
//                       placeholder="Enter Other Hypothecation"
//                       editable={!loading}
//                     />
//                   </LinearGradient>
//                 </View>
//                 <View style={styles.inputContainer}></View>
//               </View>
//             )}
//           </View>
//         )}

//         {/* Terms and Conditions Section - Added between Delivery Customer Details and Photo & Signature */}
//         {radioValues.delivered === '1' && (
//           <View style={styles.termsSection}>
//             <Text style={styles.termsTitle}>Terms and Conditions</Text>
            
//             <View style={styles.termsList}>
//               <Text style={styles.termItem}>1. Tractor Will Be Inspected Only After Full Payment Confirmation From The Accounts Department.</Text>
//               <Text style={styles.termItem}>2. PDI Will Be Carried Out Strictly As Per John Deere India Pvt. Ltd. Guidelines.</Text>
//               <Text style={styles.termItem}>3. Any Damages Or Discrepancies Found Before Delivery Will Be Rectified Prior To Handover.</Text>
//               <Text style={styles.termItem}>4. No Mechanical Or Electrical Modifications Are Allowed During Or After Pdi.</Text>
//               <Text style={styles.termItem}>5. Customer Must Be Present During Final Inspection And Sign The Pdi Report.</Text>
//               <Text style={styles.termItem}>6. Tractor Delivery Will Be Done Only After Successful Completion Of All Inspection Points.</Text>
//               <Text style={styles.termItem}>7. Makroo Motor Corporation Will Not Be Responsible For Any Issues Arising After Customer Approval And Delivery.</Text>
//               <Text style={styles.termItem}>8. All Fluids, Oil Levels, And Battery Conditions Will Be Checked And Recorded Before Handover.</Text>
//               <Text style={styles.termItem}>9. Tractor Registration And Number Plate Installation Will Be Handled Separately As Per Rto Process.</Text>
//             </View>

//             <Text style={styles.declarationTitle}>Customer Declaration</Text>
//             <Text style={styles.declarationText}>
//               I Have Personally Verified The Tractor After Completion Of The Pre-delivery Inspection (Pdi) At Makroo Motor Corporation. All Functions, Fittings, And Accessories Have Been Checked In My Presence. I Am Satisfied With The Tractor's Condition And Accept Delivery In Proper Working Order.
//             </Text>

//             <View style={styles.checkboxContainer}>
//               <TouchableOpacity 
//                 style={[styles.checkbox, isTermsAccepted && styles.checkboxChecked]} 
//                 onPress={() => setIsTermsAccepted(!isTermsAccepted)}
//                 disabled={loading}
//               >
//                 {isTermsAccepted && <Icon name="check" size={16} color="#fff" />}
//               </TouchableOpacity>
//               <Text style={styles.checkboxLabel}>Accept All Terms and Conditions</Text>
//             </View>
//           </View>
//         )}

//         {/* Photo & Signature */}
//         <View style={styles.photoSignatureSection}>
//           <TouchableOpacity 
//             style={styles.photoSignatureBox} 
//             onPress={() => showImagePickerOptions(setCustomerPhoto)}
//             disabled={loading}
//           >
//             {customerPhoto ? (
//               <Image 
//                 source={{ uri: customerPhoto.uri }} 
//                 style={styles.previewImage}
//                 resizeMode="contain"
//               />
//             ) : (
//               <>
//                 <Icon name="photo-camera" size={35} color="#666" />
//                 <Text style={styles.photoSignatureText}>Customer Photo</Text>
//                 {isEditMode && <Text style={styles.optionalText}>(Optional for update)</Text>}
//               </>
//             )}
//           </TouchableOpacity>

//           <TouchableOpacity 
//             style={styles.photoSignatureBox1} 
//             onPress={() => showImagePickerOptions(setCustomerSignature)}
//             disabled={loading}
//           >
//             {customerSignature ? (
//               <Image 
//                 source={{ uri: customerSignature.uri }} 
//                 style={styles.previewImage}
//                 resizeMode="contain"
//               />
//             ) : (
//               <>
//                 <Text style={styles.photoSignatureText}>Customer Signature</Text>
//                 {isEditMode && <Text style={styles.optionalText}>(Optional for update)</Text>}
//               </>
//             )}
//           </TouchableOpacity>

//           <TouchableOpacity 
//             style={styles.photoSignatureBox1} 
//             onPress={() => showImagePickerOptions(setManagerSignature)}
//             disabled={loading}
//           >
//             {managerSignature ? (
//               <Image 
//                 source={{ uri: managerSignature.uri }} 
//                 style={styles.previewImage}
//                 resizeMode="contain"
//               />
//             ) : (
//               <>
//                 <Text style={styles.photoSignatureText}>Manager Signature</Text>
//                 {isEditMode && <Text style={styles.optionalText}>(Optional for update)</Text>}
//               </>
//             )}
//           </TouchableOpacity>
//         </View>

//         {/* Buttons */}
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity 
//             style={[
//               styles.submitButton, 
//               loading && styles.disabledButton,
//               (radioValues.delivered === '1' && !isTermsAccepted) && styles.disabledButton
//             ]} 
//             onPress={handleSubmit}
//             disabled={loading || (radioValues.delivered === '1' && !isTermsAccepted)}
//           >
//             {loading ? (
//               <ActivityIndicator color="#fff" size="small" />
//             ) : (
//               <Text style={styles.submitButtonText}>
//                 {isEditMode ? 'Update Form' : 'Submit Form'}
//               </Text>
//             )}
//           </TouchableOpacity>

//           <TouchableOpacity 
//             style={[styles.homeButton, loading && styles.disabledButton]} 
//             onPress={handleHome}
//             disabled={loading}
//           >
//             <Text style={styles.homeButtonText}>Home</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </View>
//   );

//   // === Render Radio Helpers ===
//   function renderYesNo(field) {
//     return (
//       <View style={styles.radioOptionsContainer}>
//         {[
//           {label: 'YES', value: '1'},
//           {label: 'NO', value: '0'}
//         ].map(({label, value}) => (
//           <TouchableOpacity
//             key={value}
//             style={[
//               styles.radioOptionWrapper,
//               radioValues[field] === value && styles.radioOptionSelected,
//             ]}
//             onPress={() => {
//               handleRadioChange(field, value);
//             }}
//             disabled={loading}
//           >
//             <LinearGradient
//               colors={['#7E5EA9', '#20AEBC']}
//               style={styles.radioOptionGradient}>
//               <View
//                 style={[
//                   styles.radioOptionInner,
//                   radioValues[field] === value &&
//                     styles.radioOptionInnerSelected,
//                 ]}>
//                 <Text
//                   style={[
//                     styles.radioOptionText,
//                     radioValues[field] === value &&
//                       styles.radioOptionTextSelected,
//                   ]}>
//                   {label}
//                 </Text>
//               </View>
//             </LinearGradient>
//           </TouchableOpacity>
//         ))}
//       </View>
//     );
//   }

//   function renderFullHalf(field) {
//     return (
//       <View style={styles.radioOptionsContainer}>
//         {[
//           {label: 'FULL', value: '1'},
//           {label: 'HALF', value: '0'}
//         ].map(({label, value}) => (
//           <TouchableOpacity
//             key={value}
//             style={[
//               styles.radioOptionWrapper,
//               radioValues[field] === value && styles.radioOptionSelected,
//             ]}
//             onPress={() => handleRadioChange(field, value)}
//             disabled={loading}
//           >
//             <LinearGradient
//               colors={['#7E5EA9', '#20AEBC']}
//               style={styles.radioOptionGradient}>
//               <View
//                 style={[
//                   styles.radioOptionInner,
//                   radioValues[field] === value &&
//                     styles.radioOptionInnerSelected,
//                 ]}>
//                 <Text
//                   style={[
//                     styles.radioOptionText,
//                     radioValues[field] === value &&
//                       styles.radioOptionTextSelected,
//                   ]}>
//                   {label}
//                 </Text>
//               </View>
//             </LinearGradient>
//           </TouchableOpacity>
//         ))}
//       </View>
//     );
//   }
// };

// const styles = StyleSheet.create({
//   container: {paddingHorizontal: 15},
//   header: {alignItems: 'center', paddingVertical: 10},
//   companyName: {fontSize: 16,  color: 'white',fontFamily: 'Inter_28pt-SemiBold'},
//   formNo: {fontSize: 14, marginVertical: 10,fontFamily: 'Inter_28pt-SemiBold', color: '#000'},
//   Date: {
//     fontSize: 12,
//     textAlign: 'right',
//     marginVertical: 5,
//     color: '#00000099',
//     fontFamily: 'Inter_28pt-Medium',
//   },
//   editModeContainer: {
//     backgroundColor: '#f0e6ff',
//     padding: 8,
//     borderRadius: 5,
//     marginVertical: 5,
//     alignItems: 'center',
//   },
//   editModeText: {
//     fontSize: 12,
//     fontFamily: 'Inter_28pt-SemiBold',
//     color: '#7E5EA9',
//   },
//   sectionHeading: {
//     marginVertical: 10,
//     paddingLeft: 5,
//   },
//   sectionHeadingText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#000',
//     fontFamily: 'Inter_28pt-SemiBold',
//   },
//   formContainer: {marginBottom: 15},
//   row: {},
//   inputContainer: {
//     flex: 1, 
//     marginHorizontal: 4, 
//     marginBottom: 12
//   },
//   inputGradient: {borderRadius: 10, padding: 1},
//   input: {
//     borderRadius: 10,
//     backgroundColor: '#fff',
//     padding: 12,
//     fontSize: 14,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   selectedModelText: {fontSize: 14, color: '#000', fontFamily: 'Inter_28pt-Medium'},
//   placeholderText: {fontSize: 14, color: '#666', fontFamily: 'Inter_28pt-Medium'},
//   dropdownIcon: {marginLeft: 8},
//   inputWithIcon: {flexDirection: 'row', alignItems: 'center'},
//   inputWithIconField: {flex: 1},
//   iconButton: {position: 'absolute', right: 12, padding: 4},
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContent: {backgroundColor: 'white', borderRadius: 10, width: '90%'},
//   modalHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f0f0',
//   },
//   modalTitle: {fontSize: 16, fontWeight: 'bold', fontFamily: 'Inter_28pt-SemiBold'},
//   closeButton: {padding: 4},
//   modelList: {maxHeight: 300},
//   modelItem: {padding: 15, borderBottomWidth: 1, borderBottomColor: '#f0f0f0'},
//   modelItemText: {fontSize: 14, color: '#333',fontFamily: 'Inter_28pt-Medium'},
//   // QR Scanner Styles
//   scannerContainer: {
//     flex: 1,
//     backgroundColor: '#000',
//   },
//   scannerHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 15,
//     paddingTop: 50,
//     backgroundColor: 'rgba(0,0,0,0.7)',
//   },
//   scannerCloseButton: {
//     padding: 8,
//     marginRight: 15,
//   },
//   scannerTitle: {
//     fontSize: 18,
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   camera: {
//     flex: 1,
//   },
//   scannerFooter: {
//     padding: 20,
//     backgroundColor: 'rgba(0,0,0,0.7)',
//     alignItems: 'center',
//   },
//   scannerInstructions: {
//     color: '#fff',
//     fontSize: 16,
//     textAlign: 'center',
//   },
//   radioSection: {marginBottom: 15},
//   radioLabel: {fontSize: 12, marginBottom: 6, color: '#000',fontFamily: 'Inter_28pt-Medium',marginTop:0},
//   radioOptionsContainer: {flexDirection: 'row'},
//   radioOptionWrapper: {flex: 1, marginHorizontal: 8, marginBottom: 15},
//   radioOptionGradient: {borderRadius: 6, padding: 1},
//   radioOptionInner: {
//     borderRadius: 5,
//     paddingVertical: 10,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//   },
//   radioOptionInnerSelected: {backgroundColor: '#7E5EA9'},
//   radioOptionText: {fontSize: 12, color: '#000',fontFamily: 'Inter_28pt-Medium'},
//   radioOptionTextSelected: {color: '#fff'},
//   // Terms and Conditions Styles
//   termsSection: {
//     marginBottom: 15,
//     padding: 10,
    
//   },
//   termsTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#000',
//     marginBottom: 10,
//     fontFamily: 'Inter_28pt-SemiBold',
    
//   },
//   termsList: {
//     marginBottom: 15,
//   },
//   termItem: {
//     fontSize: 12,
//     color: '#333',
//     marginBottom: 8,
//     lineHeight: 16,
//     fontFamily: 'Inter_28pt-Medium',
//   },
//   declarationTitle: {
//     fontSize: 15,
//     fontWeight: 'bold',
//     color: '#000',
//     marginTop: 10,
//     marginBottom: 8,
//     fontFamily: 'Inter_28pt-SemiBold',
//   },
//   declarationText: {
//     fontSize: 12,
//     color: '#333',
//     lineHeight: 16,
//     marginBottom: 15,
//     fontFamily: 'Inter_28pt-Medium',
//   },
//   checkboxContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   checkbox: {
//     width: 20,
//     height: 20,
//     borderWidth: 2,
//     borderColor: '#666',
//     borderRadius: 4,
//     marginRight: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   checkboxChecked: {
//     backgroundColor: '#28a745', // Green background when checked
//     borderColor: '#28a745',
//   },
//   checkboxLabel: {
//     fontSize: 14,
//     color: '#000',
//     fontFamily: 'Inter_28pt-Medium',
//   },
//   photoSignatureSection: {marginTop: 20},
//   photoSignatureBox: {
//     width: '100%',
//     height: 95,
//     borderWidth: 1,
//     borderColor: '#00000080',
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 20,
//     borderStyle: 'dashed',
//   },
//   photoSignatureBox1: {
//     width: '100%',
//     height: 50,
//     borderWidth: 1,
//     borderColor: '#00000080',
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 20,
//     borderStyle: 'dashed',
//   },
//   photoSignatureText: {fontSize: 13, textAlign: 'center', color: '#00000099',fontFamily: 'Inter_28pt-Medium'},
//   optionalText: {
//     fontSize: 10,
//     color: '#666',
//     fontStyle: 'italic',
//     marginTop: 2,
//   },
//   previewImage: {
//     width: '100%',
//     height: '100%',
//     borderRadius: 10,
//   },
//   buttonContainer: {marginTop: 20},
//   submitButton: {
//     backgroundColor: '#7E5EA9',
//     padding: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   submitButtonText: {color: '#fff', fontSize: 14,fontFamily: 'Inter_28pt-SemiBold'},
//   homeButton: {
//     backgroundColor: '#20AEBC',
//     padding: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginBottom: 35,
//   },
//   homeButtonText: {color: '#fff', fontSize: 14,fontFamily: 'Inter_28pt-SemiBold'},
//   pdfButton: {
//     backgroundColor: '#7E5EA9',
//     padding: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   pdfButtonText: {color: '#fff', fontSize: 14,fontFamily: 'Inter_28pt-SemiBold'},
//   disabledButton: {
//     opacity: 0.6,
//   },
// });

// export default PDIpage;

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
import { Camera } from 'react-native-camera-kit';

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
  const [showBatteryDatePicker, setShowBatteryDatePicker] = useState(false);
  const [showHypothecationDropdown, setShowHypothecationDropdown] = useState(false);

  // QR Scanner States
  const [showChassisScanner, setShowChassisScanner] = useState(false);
  const [showEngineScanner, setShowEngineScanner] = useState(false);
  const [showBatteryScanner, setShowBatteryScanner] = useState(false);
  const [showStarterScanner, setShowStarterScanner] = useState(false);
  const [showFipScanner, setShowFipScanner] = useState(false);
  const [showAlternatorScanner, setShowAlternatorScanner] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);

  // Terms and Conditions state
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  const [formData, setFormData] = useState({
    inspectorName: '',
    tireMake: '',
    otherTireMake: '',
    batteryMake: '',
    otherBatteryMake: '',
    date: null, // select_date
    batteryDate: null, // battery_date
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
    customerFatherName: '', // NEW: Father's Name under Customer Details (point 1)
    customerAddress: '',
    customerContact: '',
    pdiDoneBy: '',
    remarks: '',

    // Delivery-specific customer details (appear when Tractor Delivered = Yes)
    deliveryCustomerName: '',
    deliveryCustomerFatherName: '',
    deliveryCustomerAddress: '',
    deliveryCustomerContact: '',
    hypothecation: '', // selected option
    hypothecationOther: '',
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
    'JK Tyre',
    'Other', // NEW: Other option for tyre make (point 2)
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
    'Base',
    'Other', // NEW: Other option for battery make (point 3)
  ];

  const hypothecationOptions = [
    'John Deere Financial India Private Limited',
    'The Jammu and Kashmir Bank Limited',
    'Nil',
    'Other',
  ];

  // Camera Permission Function
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "Camera Permission",
            message: "This app needs access to your camera to scan QR codes.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        const hasPermission = granted === PermissionsAndroid.RESULTS.GRANTED;
        setHasCameraPermission(hasPermission);
        return hasPermission;
      } catch (err) {
        console.warn(err);
        setHasCameraPermission(false);
        return false;
      }
    }
    // iOS handles permissions differently - usually through Info.plist
    setHasCameraPermission(true);
    return true;
  };

  // QR Scanner Handlers
  const handleChassisScanPress = async () => {
    const hasPermission = await requestCameraPermission();
    if (hasPermission) {
      setShowChassisScanner(true);
    } else {
      Alert.alert('Permission Denied', 'Camera permission is required to scan QR codes.');
    }
  };

  const handleEngineScanPress = async () => {
    const hasPermission = await requestCameraPermission();
    if (hasPermission) {
      setShowEngineScanner(true);
    } else {
      Alert.alert('Permission Denied', 'Camera permission is required to scan QR codes.');
    }
  };

  const handleBatteryScanPress = async () => {
    const hasPermission = await requestCameraPermission();
    if (hasPermission) {
      setShowBatteryScanner(true);
    } else {
      Alert.alert('Permission Denied', 'Camera permission is required to scan QR codes.');
    }
  };

  const handleStarterScanPress = async () => {
    const hasPermission = await requestCameraPermission();
    if (hasPermission) {
      setShowStarterScanner(true);
    } else {
      Alert.alert('Permission Denied', 'Camera permission is required to scan QR codes.');
    }
  };

  const handleFipScanPress = async () => {
    const hasPermission = await requestCameraPermission();
    if (hasPermission) {
      setShowFipScanner(true);
    } else {
      Alert.alert('Permission Denied', 'Camera permission is required to scan QR codes.');
    }
  };

  const handleAlternatorScanPress = async () => {
    const hasPermission = await requestCameraPermission();
    if (hasPermission) {
      setShowAlternatorScanner(true);
    } else {
      Alert.alert('Permission Denied', 'Camera permission is required to scan QR codes.');
    }
  };

  const handleQRCodeRead = (event) => {
    const scannedValue = event.nativeEvent.codeStringValue;
    console.log('QR Code Scanned:', scannedValue);
    
    if (showChassisScanner) {
      handleInputChange('chassisNo', scannedValue);
      setShowChassisScanner(false);
    } else if (showEngineScanner) {
      handleInputChange('engineNo', scannedValue);
      setShowEngineScanner(false);
    } else if (showBatteryScanner) {
      handleInputChange('batteryNo', scannedValue);
      setShowBatteryScanner(false);
    } else if (showStarterScanner) {
      handleInputChange('starterNo', scannedValue);
      setShowStarterScanner(false);
    } else if (showFipScanner) {
      handleInputChange('fipNo', scannedValue);
      setShowFipScanner(false);
    } else if (showAlternatorScanner) {
      handleInputChange('alternatorNo', scannedValue);
      setShowAlternatorScanner(false);
    }
  };

  const closeScanner = () => {
    setShowChassisScanner(false);
    setShowEngineScanner(false);
    setShowBatteryScanner(false);
    setShowStarterScanner(false);
    setShowFipScanner(false);
    setShowAlternatorScanner(false);
  };

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
            otherTireMake: editData.tire_make_other || '',
            batteryMake: editData.battery_make || '',
            otherBatteryMake: editData.battery_make_other || '',
            date: editData.select_date ? new Date(editData.select_date) : null,
            batteryDate: editData.battery_date ? new Date(editData.battery_date) : null,
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
            customerFatherName: editData.customer_father_name || '',
            customerAddress: editData.customer_address || '',
            customerContact: editData.customer_contact || '',
            pdiDoneBy: editData.pdi_done_by || '',
            remarks: editData.remarks || '',
            deliveryCustomerName: editData.delivery_customer_name || '',
            deliveryCustomerFatherName: editData.delivery_customer_father_name || '',
            deliveryCustomerAddress: editData.delivery_customer_address || '',
            deliveryCustomerContact: editData.delivery_customer_contact || '',
            hypothecation: editData.hypothecation || '',
            hypothecationOther: editData.hypothecation_other || '',
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

          // Note: For images, you might need to handle URLs differently (show remote images)
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

  // Camera permissions for image capture
  const requestCameraPermissionForImage = async () => {
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
            const hasPermission = await requestCameraPermissionForImage();
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
              const hasPermission = await requestCameraPermissionForImage();
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
    // clear other field if not Other
    if (tire !== 'Other') {
      handleInputChange('otherTireMake', '');
    }
    setShowTireDropdown(false);
  };

  const handleBatterySelect = battery => {
    handleInputChange('batteryMake', battery);
    // clear other field if not Other
    if (battery !== 'Other') {
      handleInputChange('otherBatteryMake', '');
    }
    setShowBatteryDropdown(false);
  };

  const handleHypothecationSelect = option => {
    handleInputChange('hypothecation', option);
    if (option !== 'Other') {
      handleInputChange('hypothecationOther', '');
    }
    setShowHypothecationDropdown(false);
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      handleInputChange('date', selectedDate);
    }
  };

  const handleBatteryDateChange = (event, selectedDate) => {
    setShowBatteryDatePicker(false);
    if (selectedDate) {
      handleInputChange('batteryDate', selectedDate);
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

    // Check if terms are accepted when tractor is delivered
    if (radioValues.delivered === '1' && !isTermsAccepted) {
      Alert.alert('Validation Error', 'Please accept the Terms and Conditions');
      return false;
    }

    // Make images optional for updates, required for new forms
    if (!isEditMode) {
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
    }

    return true;
  };

  const prepareFormData = () => {
    const formDataToSend = new FormData();

    // For updates, use PUT method and include ID
    if (isEditMode && existingFormId) {
      formDataToSend.append('id', existingFormId.toString());
      console.log('UPDATE MODE - Form ID:', existingFormId);
    } else {
      // For new forms, generate new form number
      formDataToSend.append('form_no', generateFormNo());
      console.log('CREATE MODE - New Form No:', generateFormNo());
    }

    // Common form data for both create and update
    formDataToSend.append('user_id', userId);
    formDataToSend.append('form_date', new Date().toISOString().split('T')[0]);
    formDataToSend.append('inspector_name', formData.inspectorName);
    formDataToSend.append('select_date', formData.date ? formData.date.toISOString().split('T')[0] : '');
    formDataToSend.append('tractor_model', formData.tractorModel);
    formDataToSend.append('chassis_no', formData.chassisNo);
    formDataToSend.append('engine_no', formData.engineNo);

    // Tyre and battery (including "Other" values)
    formDataToSend.append('tire_make', formData.tireMake);
    formDataToSend.append('tire_make_other', formData.otherTireMake || '');
    formDataToSend.append('front_right_serial_no', formData.frontRight);
    formDataToSend.append('front_left_serial_no', formData.frontLeft);
    formDataToSend.append('rear_right_serial_no', formData.rearRight);
    formDataToSend.append('rear_left_serial_no', formData.rearLeft);
    formDataToSend.append('battery_make', formData.batteryMake);
    formDataToSend.append('battery_make_other', formData.otherBatteryMake || '');
    formDataToSend.append('battery_date', formData.batteryDate ? formData.batteryDate.toISOString().split('T')[0] : '');
    formDataToSend.append('battery_serial_no', formData.batteryNo);
    formDataToSend.append('tractor_starter_serial_no', formData.starterNo);
    formDataToSend.append('fip_no', formData.fipNo);
    formDataToSend.append('tractor_alternator_no', formData.alternatorNo);
    
    // Customer details
    formDataToSend.append('dealer_name', formData.dealerName);
    formDataToSend.append('customer_name', formData.customerName);
    formDataToSend.append('customer_father_name', formData.customerFatherName || '');
    formDataToSend.append('customer_address', formData.customerAddress);
    formDataToSend.append('customer_contact', formData.customerContact);
    formDataToSend.append('pdi_done_by', formData.pdiDoneBy);
    formDataToSend.append('remarks', formData.remarks || '');

    // Delivery-specific customer details (only meaningful if delivered === '1')
    formDataToSend.append('delivery_customer_name', formData.deliveryCustomerName || '');
    formDataToSend.append('delivery_customer_father_name', formData.deliveryCustomerFatherName || '');
    formDataToSend.append('delivery_customer_address', formData.deliveryCustomerAddress || '');
    formDataToSend.append('delivery_customer_contact', formData.deliveryCustomerContact || '');
    formDataToSend.append('hypothecation', formData.hypothecation || '');
    formDataToSend.append('hypothecation_other', formData.hypothecationOther || '');

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

    // Add images only if they are newly selected
    if (customerPhoto && customerPhoto.uri && !customerPhoto.uri.startsWith('http')) {
      formDataToSend.append('customer_photo', {
        uri: customerPhoto.uri,
        type: customerPhoto.type || 'image/jpeg',
        name: `customer_photo_${Date.now()}.jpg`,
      });
    }

    if (customerSignature && customerSignature.uri && !customerSignature.uri.startsWith('http')) {
      formDataToSend.append('customer_signature', {
        uri: customerSignature.uri,
        type: customerSignature.type || 'image/jpeg',
        name: `customer_signature_${Date.now()}.jpg`,
      });
    }

    if (managerSignature && managerSignature.uri && !managerSignature.uri.startsWith('http')) {
      formDataToSend.append('manager_signature', {
        uri: managerSignature.uri,
        type: managerSignature.type || 'image/jpeg',
        name: `manager_signature_${Date.now()}.jpg`,
      });
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
      
      // Use different endpoints and methods for create vs update
      let url, method;
      
      if (isEditMode && existingFormId) {
        // For update, use PUT method
        url = `https://argosmob.uk/makroo/public/api/v1/pdi-delivery/form/update`;
        method = 'put';
        console.log('UPDATE REQUEST - URL:', url, 'Method:', method, 'Form ID:', existingFormId);
      } else {
        // For create, use POST method
        url = 'https://argosmob.uk/makroo/public/api/v1/pdi-delivery/form/save';
        method = 'post';
        console.log('CREATE REQUEST - URL:', url, 'Method:', method);
      }

      const config = {
        method: method,
        url: url,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: formDataToSend,
        timeout: 30000, // 30 seconds timeout
      };

      console.log('Sending form data...');
      const response = await axios(config);
      console.log('API Response:', response.data);

      // Enhanced success detection with clear conditions
      let isSuccess = false;
      let successMessage = '';
      let errorMessage = '';

      if (isEditMode) {
        // For UPDATE operations
        successMessage = 'PDI Form updated successfully!';
        errorMessage = 'Failed to update form. Please try again.';
        
        if (response.data) {
          if (response.data.status === true || response.data.success === true) {
            isSuccess = true;
          } else if (response.data.message && response.data.message.toLowerCase().includes('success')) {
            isSuccess = true;
          } else if (response.data.message && response.data.message.toLowerCase().includes('updated')) {
            isSuccess = true;
          }
        }
      } else {
        // For NEW SUBMISSION operations
        successMessage = 'PDI Form submitted successfully!';
        errorMessage = 'Failed to submit form. Please try again.';
        
        if (response.data) {
          if (response.data.status === true || response.data.success === true) {
            isSuccess = true;
          } else if (response.data.message && response.data.message.toLowerCase().includes('success')) {
            isSuccess = true;
          } else if (response.data.message && response.data.message.toLowerCase().includes('created')) {
            isSuccess = true;
          } else if (response.data.message && response.data.message.toLowerCase().includes('saved')) {
            isSuccess = true;
          }
        }
      }

      // Additional success checks based on HTTP status
      if (response.status === 200 || response.status === 201) {
        if (!isSuccess) {
          // If HTTP status is success but our detection failed, still consider it success
          isSuccess = true;
          console.log('Success detected from HTTP status');
        }
      }

      if (isSuccess) {
        Alert.alert(
          'Success', 
          successMessage,
          [
            {
              text: 'OK',
              onPress: () => {
                // Navigate back or reset form based on mode
                if (isEditMode) {
                  navigation.goBack();
                } else {
                  // Reset form for new entry
                  setFormData({
                    inspectorName: '',
                    tireMake: '',
                    otherTireMake: '',
                    batteryMake: '',
                    otherBatteryMake: '',
                    date: null,
                    batteryDate: null,
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
                    customerFatherName: '',
                    customerAddress: '',
                    customerContact: '',
                    pdiDoneBy: '',
                    remarks: '',
                    deliveryCustomerName: '',
                    deliveryCustomerFatherName: '',
                    deliveryCustomerAddress: '',
                    deliveryCustomerContact: '',
                    hypothecation: '',
                    hypothecationOther: '',
                  });
                  setRadioValues({
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
                  setCustomerPhoto(null);
                  setCustomerSignature(null);
                  setManagerSignature(null);
                  setIsTermsAccepted(false);
                }
              }
            }
          ]
        );
      } else {
        const serverErrorMessage = response.data?.message || response.data?.error || errorMessage;
        Alert.alert(
          isEditMode ? 'Update Failed' : 'Submission Failed', 
          serverErrorMessage
        );
      }

    } catch (error) {
      console.log('Submission Error:', error);
      console.log('Error details:', error.response?.data);
      
      let errorMessage = 'Something went wrong. Please try again.';
      
      if (error.response) {
        const serverError = error.response.data;
        errorMessage = serverError.message || serverError.error || `Server error: ${error.response.status}`;
      } else if (error.request) {
        errorMessage = 'Network error. Please check your internet connection.';
      }
      
      Alert.alert(
        isEditMode ? 'Update Failed' : 'Submission Failed', 
        errorMessage
      );
    } finally {
      setLoading(false);
    }
  };

  const handleHome = () => {
    navigation.navigate('Dashboard');
  };

  const handleDateIconPress = () => {
    setShowDatePicker(true);
  };

  const handleBatteryDateIconPress = () => {
    setShowBatteryDatePicker(true);
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

  const renderHypothecationItem = ({item}) => (
    <TouchableOpacity
      style={styles.modelItem}
      onPress={() => handleHypothecationSelect(item)}>
      <Text style={styles.modelItemText}>{item}</Text>
    </TouchableOpacity>
  );

  // QR Scanner Component
  const renderQRScanner = () => (
    <Modal
      visible={showChassisScanner || showEngineScanner || showBatteryScanner || showStarterScanner || showFipScanner || showAlternatorScanner}
      animationType="slide"
      transparent={false}
      onRequestClose={closeScanner}
    >
      <View style={styles.scannerContainer}>
        <View style={styles.scannerHeader}>
          <TouchableOpacity onPress={closeScanner} style={styles.scannerCloseButton}>
            <Icon name="close" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.scannerTitle}>
            {showChassisScanner ? 'Scan Chassis Number' : 
             showEngineScanner ? 'Scan Engine Number' :
             showBatteryScanner ? 'Scan Battery Serial Number' :
             showStarterScanner ? 'Scan Starter Serial Number' :
             showFipScanner ? 'Scan FIP Number' :
             'Scan Alternator Number'}
          </Text>
        </View>
        
        <Camera
          style={styles.camera}
          cameraOptions={{
            flashMode: 'auto',
            focusMode: 'on',
            zoomMode: 'on',
          }}
          scanBarcode={true}
          showFrame={true}
          laserColor="red"
          frameColor="white"
          onReadCode={handleQRCodeRead}
        />
        
        <View style={styles.scannerFooter}>
          <Text style={styles.scannerInstructions}>
            Point your camera at a QR code to scan
          </Text>
        </View>
      </View>
    </Modal>
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
        {isEditMode && (
          <View style={styles.editModeContainer}>
            <Text style={styles.editModeText}>Edit Mode - Updating Form ID: {existingFormId}</Text>
          </View>
        )}

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
                    <Text style={ formData.date ? styles.selectedModelText : styles.placeholderText }>
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
                    onPress={handleChassisScanPress}
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
                    onPress={handleEngineScanPress}
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

          {/* Customer Father's Name (POINT 1) */}
          <View style={styles.row}>
            <View style={styles.inputContainer}>
              <LinearGradient colors={['#7E5EA9', '#20AEBC']} style={styles.inputGradient}>
                <TextInput
                  style={styles.input}
                  value={formData.customerFatherName}
                  onChangeText={text => handleInputChange('customerFatherName', text)}
                  placeholder="Father's Name"
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

          {/* Tyre Details Heading */}
          <View style={styles.sectionHeading}>
            <Text style={styles.sectionHeadingText}>Tire Details:</Text>
          </View>

          {/* Select Tire Make (with 'Other' option showing input when selected) */}
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
                    {formData.tireMake || 'Select Tyre Make'}
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

          {/* If "Other" selected for tyre make, show TextInput (point 2) */}
          {formData.tireMake === 'Other' && (
            <View style={styles.row}>
              <View style={styles.inputContainer}>
                <LinearGradient colors={['#7E5EA9', '#20AEBC']} style={styles.inputGradient}>
                  <TextInput
                    style={styles.input}
                    value={formData.otherTireMake}
                    onChangeText={text => handleInputChange('otherTireMake', text)}
                    placeholder="Enter Other Tire Make"
                    editable={!loading}
                  />
                </LinearGradient>
              </View>
              <View style={styles.inputContainer}></View>
            </View>
          )}

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

          {/* Select Battery Make (with 'Other' option showing input when selected) */}
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

          {/* If "Other" selected for battery make, show TextInput (point 3) */}
          {formData.batteryMake === 'Other' && (
            <View style={styles.row}>
              <View style={styles.inputContainer}>
                <LinearGradient colors={['#7E5EA9', '#20AEBC']} style={styles.inputGradient}>
                  <TextInput
                    style={styles.input}
                    value={formData.otherBatteryMake}
                    onChangeText={text => handleInputChange('otherBatteryMake', text)}
                    placeholder="Enter Other Battery Make"
                    editable={!loading}
                  />
                </LinearGradient>
              </View>
              <View style={styles.inputContainer}></View>
            </View>
          )}

          {/* Battery Date (next line after Select Battery Make) */}
          <View style={styles.row}>
            <View style={styles.inputContainer}>
              <LinearGradient colors={['#7E5EA9', '#20AEBC']} style={styles.inputGradient}>
                <View style={styles.inputWithIcon}>
                  <TouchableOpacity
                    style={[styles.input, styles.inputWithIconField]}
                    onPress={handleBatteryDateIconPress}
                    disabled={loading}
                  >
                    <Text style={ formData.batteryDate ? styles.selectedModelText : styles.placeholderText }>
                      {formData.batteryDate ? formData.batteryDate.toLocaleDateString() : 'Select Battery Date'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleBatteryDateIconPress}
                    style={styles.iconButton}
                    disabled={loading}
                  >
                    <Icon name="calendar-today" size={20} color="#666" />
                  </TouchableOpacity>
                </View>
                {showBatteryDatePicker && (
                  <DateTimePicker
                    value={formData.batteryDate || new Date()}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={handleBatteryDateChange}
                  />
                )}
              </LinearGradient>
            </View>
           
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
                    onPress={handleBatteryScanPress}
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
                    onPress={handleStarterScanPress}
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
                    onPress={handleFipScanPress}
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
                    onPress={handleAlternatorScanPress}
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

        {/* Hypothecation Modal (for point 4) */}
        <Modal
          visible={showHypothecationDropdown}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowHypothecationDropdown(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select Hypothecation</Text>
                <TouchableOpacity
                  onPress={() => setShowHypothecationDropdown(false)}
                  style={styles.closeButton}>
                  <Icon name="close" size={24} color="#000" />
                </TouchableOpacity>
              </View>
              <FlatList
                data={hypothecationOptions}
                renderItem={renderHypothecationItem}
                keyExtractor={(item, index) => index.toString()}
                style={styles.modelList}
              />
            </View>
          </View>
        </Modal>

        {/* QR Scanner Modal */}
        {renderQRScanner()}

        {/* Radio Sections */}
        <View style={styles.radioSection}>
          <Text style={styles.radioLabel}>Lights OK:</Text>
          {renderYesNo('lightsOk')}
          <Text style={styles.radioLabel}>Nuts OK:</Text>
          {renderYesNo('nutsOk')}
         
          <Text style={styles.radioLabel}>Hydraulic Oil:</Text>
          {renderFullHalf('hydraulicOil')}
          <Text style={styles.radioLabel}>All Nuts Are Sealed:</Text>
          {renderYesNo('nutsSealed')}
          <Text style={styles.radioLabel}>Tractor Delivered:</Text>
          {renderYesNo('delivered')}
        </View>

        {/* Delivery Customer Details (POINT 4)
            This block appears only when Tractor Delivered = YES (radioValues.delivered === '1')
            It contains: Customer Name, Father's Name, Address, Mobile Number, Hypothecation (dropdown)
            If Hypothecation == 'Other', an editable input appears.
        */}
        {radioValues.delivered === '1' && (
          <View style={styles.sectionHeading}>
            <Text style={styles.sectionHeadingText}>Delivery Customer Details:</Text>

            {/* Delivery Customer Name + Father's Name */}
            <View style={[styles.row, {marginTop: 8}]}>
              <View style={styles.inputContainer}>
                <LinearGradient colors={['#7E5EA9', '#20AEBC']} style={styles.inputGradient}>
                  <TextInput
                    style={styles.input}
                    value={formData.deliveryCustomerName}
                    onChangeText={text => handleInputChange('deliveryCustomerName', text)}
                    placeholder="Customer Name"
                    editable={!loading}
                  />
                </LinearGradient>
              </View>
              <View style={styles.inputContainer}>
                <LinearGradient colors={['#7E5EA9', '#20AEBC']} style={styles.inputGradient}>
                  <TextInput
                    style={styles.input}
                    value={formData.deliveryCustomerFatherName}
                    onChangeText={text => handleInputChange('deliveryCustomerFatherName', text)}
                    placeholder="Father's Name"
                    editable={!loading}
                  />
                </LinearGradient>
              </View>
            </View>

            {/* Delivery Address + Mobile */}
            <View style={styles.row}>
              <View style={styles.inputContainer}>
                <LinearGradient colors={['#7E5EA9', '#20AEBC']} style={styles.inputGradient}>
                  <TextInput
                    style={styles.input}
                    value={formData.deliveryCustomerAddress}
                    onChangeText={text => handleInputChange('deliveryCustomerAddress', text)}
                    placeholder="Address"
                    editable={!loading}
                    multiline
                  />
                </LinearGradient>
              </View>
              <View style={styles.inputContainer}>
                <LinearGradient colors={['#7E5EA9', '#20AEBC']} style={styles.inputGradient}>
                  <TextInput
                    style={styles.input}
                    value={formData.deliveryCustomerContact}
                    onChangeText={text => handleInputChange('deliveryCustomerContact', text)}
                    placeholder="Mobile Number"
                    keyboardType="phone-pad"
                    editable={!loading}
                  />
                </LinearGradient>
              </View>
            </View>

            {/* Hypothecation dropdown + 'Other' input if selected */}
            <View style={styles.row}>
              <View style={styles.inputContainer}>
                <LinearGradient colors={['#7E5EA9', '#20AEBC']} style={styles.inputGradient}>
                  <TouchableOpacity
                    style={styles.input}
                    onPress={() => setShowHypothecationDropdown(true)}
                    disabled={loading}
                  >
                    <Text style={ formData.hypothecation ? styles.selectedModelText : styles.placeholderText }>
                      {formData.hypothecation || 'Select Hypothecation'}
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

            {formData.hypothecation === 'Other' && (
              <View style={styles.row}>
                <View style={styles.inputContainer}>
                  <LinearGradient colors={['#7E5EA9', '#20AEBC']} style={styles.inputGradient}>
                    <TextInput
                      style={styles.input}
                      value={formData.hypothecationOther}
                      onChangeText={text => handleInputChange('hypothecationOther', text)}
                      placeholder="Enter Other Hypothecation"
                      editable={!loading}
                    />
                  </LinearGradient>
                </View>
                <View style={styles.inputContainer}></View>
              </View>
            )}
          </View>
        )}

        {/* Terms and Conditions Section - Added between Delivery Customer Details and Photo & Signature */}
        {radioValues.delivered === '1' && (
          <View style={styles.termsSection}>
            <Text style={styles.termsTitle}>Terms and Conditions</Text>
            
            <View style={styles.termsList}>
              <Text style={styles.termItem}>1. Tractor Will Be Inspected Only After Full Payment Confirmation From The Accounts Department.</Text>
              <Text style={styles.termItem}>2. PDI Will Be Carried Out Strictly As Per John Deere India Pvt. Ltd. Guidelines.</Text>
              <Text style={styles.termItem}>3. Any Damages Or Discrepancies Found Before Delivery Will Be Rectified Prior To Handover.</Text>
              <Text style={styles.termItem}>4. No Mechanical Or Electrical Modifications Are Allowed During Or After Pdi.</Text>
              <Text style={styles.termItem}>5. Customer Must Be Present During Final Inspection And Sign The Pdi Report.</Text>
              <Text style={styles.termItem}>6. Tractor Delivery Will Be Done Only After Successful Completion Of All Inspection Points.</Text>
              <Text style={styles.termItem}>7. Makroo Motor Corporation Will Not Be Responsible For Any Issues Arising After Customer Approval And Delivery.</Text>
              <Text style={styles.termItem}>8. All Fluids, Oil Levels, And Battery Conditions Will Be Checked And Recorded Before Handover.</Text>
              <Text style={styles.termItem}>9. Tractor Registration And Number Plate Installation Will Be Handled Separately As Per Rto Process.</Text>
            </View>

            <Text style={styles.declarationTitle}>Customer Declaration</Text>
            <Text style={styles.declarationText}>
              I Have Personally Verified The Tractor After Completion Of The Pre-delivery Inspection (Pdi) At Makroo Motor Corporation. All Functions, Fittings, And Accessories Have Been Checked In My Presence. I Am Satisfied With The Tractor's Condition And Accept Delivery In Proper Working Order.
            </Text>

            <View style={styles.checkboxContainer}>
              <TouchableOpacity 
                style={[styles.checkbox, isTermsAccepted && styles.checkboxChecked]} 
                onPress={() => setIsTermsAccepted(!isTermsAccepted)}
                disabled={loading}
              >
                {isTermsAccepted && <Icon name="check" size={16} color="#fff" />}
              </TouchableOpacity>
              <Text style={styles.checkboxLabel}>Accept All Terms and Conditions</Text>
            </View>
          </View>
        )}

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
                {isEditMode && <Text style={styles.optionalText}>(Optional for update)</Text>}
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
              <>
                <Text style={styles.photoSignatureText}>Customer Signature</Text>
                {isEditMode && <Text style={styles.optionalText}>(Optional for update)</Text>}
              </>
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
              <>
                <Text style={styles.photoSignatureText}>Manager Signature</Text>
                {isEditMode && <Text style={styles.optionalText}>(Optional for update)</Text>}
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[
              styles.submitButton, 
              loading && styles.disabledButton,
              (radioValues.delivered === '1' && !isTermsAccepted) && styles.disabledButton
            ]} 
            onPress={handleSubmit}
            disabled={loading || (radioValues.delivered === '1' && !isTermsAccepted)}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.submitButtonText}>
                {isEditMode ? 'Update Form' : 'Submit Form'}
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
            onPress={() => {
              handleRadioChange(field, value);
            }}
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
  editModeContainer: {
    backgroundColor: '#f0e6ff',
    padding: 8,
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
  },
  editModeText: {
    fontSize: 12,
    fontFamily: 'Inter_28pt-SemiBold',
    color: '#7E5EA9',
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
  // QR Scanner Styles
  scannerContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  scannerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    paddingTop: 50,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  scannerCloseButton: {
    padding: 8,
    marginRight: 15,
  },
  scannerTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  camera: {
    flex: 1,
  },
  scannerFooter: {
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
  },
  scannerInstructions: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
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
  // Terms and Conditions Styles
  termsSection: {
    marginBottom: 15,
    padding: 10,
    
  },
  termsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
    fontFamily: 'Inter_28pt-SemiBold',
    
  },
  termsList: {
    marginBottom: 15,
  },
  termItem: {
    fontSize: 12,
    color: '#333',
    marginBottom: 8,
    lineHeight: 16,
    fontFamily: 'Inter_28pt-Medium',
  },
  declarationTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
    marginBottom: 8,
    fontFamily: 'Inter_28pt-SemiBold',
  },
  declarationText: {
    fontSize: 12,
    color: '#333',
    lineHeight: 16,
    marginBottom: 15,
    fontFamily: 'Inter_28pt-Medium',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#666',
    borderRadius: 4,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  checkboxChecked: {
    backgroundColor: '#28a745', // Green background when checked
    borderColor: '#28a745',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#000',
    fontFamily: 'Inter_28pt-Medium',
  },
  photoSignatureSection: {marginTop: 20},
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
  optionalText: {
    fontSize: 10,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 2,
  },
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
    marginBottom: 35,
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