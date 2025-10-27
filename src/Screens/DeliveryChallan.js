

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

// const DeliveryChallan = ({navigation, route}) => {
//   const insets = useSafeAreaInsets();
  
//   const [userId, setUserId] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [existingFormId, setExistingFormId] = useState(null);
//   const [acceptTerms, setAcceptTerms] = useState(false);

//   // QR Scanner States
//   const [showChassisScanner, setShowChassisScanner] = useState(false);
//   const [showEngineScanner, setShowEngineScanner] = useState(false);
//   const [hasCameraPermission, setHasCameraPermission] = useState(false);

//   const [showTractorModelDropdown, setShowTractorModelDropdown] = useState(false);
//   const [showTiresMakeDropdown, setShowTiresMakeDropdown] = useState(false);
//   const [showFipMakeDropdown, setShowFipMakeDropdown] = useState(false);
//   const [showBatteryMakeDropdown, setShowBatteryMakeDropdown] = useState(false);
//   const [showPaymentStatusDropdown, setShowPaymentStatusDropdown] = useState(false);
//   const [showFinancerDropdown, setShowFinancerDropdown] = useState(false);
//   const [showHypothecationDropdown, setShowHypothecationDropdown] = useState(false);
//   const [showRelationDropdown, setShowRelationDropdown] = useState(false);
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [showManufactureDatePicker, setShowManufactureDatePicker] = useState(false);

//   const [formData, setFormData] = useState({
//     formNo: '',
//     date: null,
//     deliveryMode: 'Customer',
//     challanCreatedBy: '',
//     customerName: '',
//     parentage: '',
//     address: '',
//     hypothecation: '',
//     hypothecationOther: '',
//     mobileNo: '',
//     areYouCustomer: '',
//     tractorName: '',
//     tractorModel: '',
//     chassisNo: '',
//     engineNo: '',
//     yearOfManufacture: '',
//     tiresMake: '',
//     tiresMakeOther: '',
//     fipMake: '',
//     fipMakeOther: '',
//     batteryMake: '',
//     batteryMakeOther: '',
//     dealPrice: '',
//     cashPaid: '',
//     financeAmountPaid: '',
//     totalPaid: '',
//     balanceAmount: '',
//     paymentStatus: '',
//     financerName: '',
//     financerOther: '',
//     // Branch fields
//     branchName: '',
//     branchPersonName: '',
//     branchAddress: '',
//     branchMobileNumber: '',
//     // Representative fields
//     representativeName: '',
//     representativeFatherName: '',
//     representativeAddress: '',
//     representativeMobileNumber: '',
//     representativeRelation: '',
//     representativeRelationOther: '',
//   });

//   // Image states for signatures
//   const [customerSignature, setCustomerSignature] = useState(null);
//   const [managerSignature, setManagerSignature] = useState(null);
//   const [driverSignature, setDriverSignature] = useState(null);

//   const [accessories, setAccessories] = useState({
//     bumper: false,
//     cultivator: false,
//     leveler: false,
//     rallyFenderSeats: false,
//     weightsRear: false,
//     waterTanker: false,
//     trolly: false,
//     weightFront: false,
//     rearTowingHook: false,
//     hood: false,
//     ptoPully: false,
//     drawbar: false,
//     cageWheels: false,
//     tool: false,
//     toplink: false,
//   });

//   const tractorModels = [
//     '3028EN', '3036EN', '3036E', '5105', '5105 4WD', 
//     '5050D Gear Pro', '5210 Gear Pro', '5050D 4WD Gear Pro', 
//     '5210 4WD Gear Pro', '5310 CRDI', '5310 4WD CRDI', 
//     '5405 CRDI', '5405 4WD CRDI', '5075 2WD', '5075 4WD'
//   ];

//   const tiresMakes = ['MRF', 'CEAT', 'Apollo', 'BKT', 'Goodyear', 'Bridgestone', 'Other'];
//   const fipMakes = ['Bosch', 'Delphi', 'Denso', 'Siemens', 'Stanadyne', 'Other'];
//   const batteryMakes = ['Exide', 'Amaron', 'Luminous', 'Su-Kam', 'Hankook', 'Other'];
//   const paymentStatuses = ['Paid', 'Pending', 'Partial', 'Due', 'Completed'];
//   const hypothecationOptions = [
//     'John Deere Financial India Private Limited',
//     'The Jammu and Kashmir Bank Limited',
//     'Nil',
//     'Other'
//   ];
//   const relationOptions = ['Father', 'Mother', 'Friend', 'Spouse', 'Brother', 'Sister', 'Son', 'Other'];

//   // Camera Permission Function for QR Scanner
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

//   const handleQRCodeRead = (event) => {
//     const scannedValue = event.nativeEvent.codeStringValue;
//     console.log('QR Code Scanned:', scannedValue);
    
//     if (showChassisScanner) {
//       handleInputChange('chassisNo', scannedValue);
//       setShowChassisScanner(false);
//     } else if (showEngineScanner) {
//       handleInputChange('engineNo', scannedValue);
//       setShowEngineScanner(false);
//     }
//   };

//   const closeScanner = () => {
//     setShowChassisScanner(false);
//     setShowEngineScanner(false);
//   };

//   // QR Scanner Component
//   const renderQRScanner = () => (
//     <Modal
//       visible={showChassisScanner || showEngineScanner}
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
//             {showChassisScanner ? 'Scan Chassis Number' : 'Scan Engine Number'}
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
//             formNo: editData.form_no || '',
//             date: editData.select_date ? new Date(editData.select_date) : null,
//             deliveryMode: editData.delivery_mode || 'Customer',
//             challanCreatedBy: editData.challan_created_by || '',
//             customerName: editData.customer_name || '',
//             parentage: editData.parentage || '',
//             address: editData.address || '',
//             hypothecation: editData.hypothecation || '',
//             mobileNo: editData.mobile_no || '',
//             areYouCustomer: editData.is_customer?.toString() || '',
//             tractorName: editData.tractor_name || '',
//             tractorModel: editData.tractor_model || '',
//             chassisNo: editData.chassis_no || '',
//             engineNo: editData.engine_no || '',
//             yearOfManufacture: editData.year_of_manufacture || '',
//             tiresMake: editData.tyres_make || '',
//             fipMake: editData.fip_make || '',
//             batteryMake: editData.battery_make || '',
//             dealPrice: editData.deal_price || '',
//             cashPaid: editData.cash_paid || '',
//             financeAmountPaid: editData.finance_amount_paid || '',
//             totalPaid: editData.total_paid || '',
//             balanceAmount: editData.balance_amount || '',
//             paymentStatus: editData.payment_status || '',
//             financerName: editData.financier_name || '',
//             // Initialize new fields
//             hypothecationOther: editData.hypothecation_other || '',
//             tiresMakeOther: editData.tires_make_other || '',
//             fipMakeOther: editData.fip_make_other || '',
//             batteryMakeOther: editData.battery_make_other || '',
//             financerOther: editData.financer_other || '',
//             branchName: editData.branch_name || '',
//             branchPersonName: editData.branch_person_name || '',
//             branchAddress: editData.branch_address || '',
//             branchMobileNumber: editData.branch_mobile_number || '',
//             representativeName: editData.representative_name || '',
//             representativeFatherName: editData.representative_father_name || '',
//             representativeAddress: editData.representative_address || '',
//             representativeMobileNumber: editData.representative_mobile_number || '',
//             representativeRelation: editData.representative_relation || '',
//             representativeRelationOther: editData.representative_relation_other || '',
//           });

//           // Set accessories from JSON string if available
//           if (editData.accessories) {
//             try {
//               const accessoriesData = typeof editData.accessories === 'string' 
//                 ? JSON.parse(editData.accessories) 
//                 : editData.accessories;
              
//               // Convert accessories data to boolean values
//               const updatedAccessories = {...accessories};
//               Object.keys(accessoriesData).forEach(key => {
//                 if (accessoriesData[key] === 'Yes' || accessoriesData[key] === true) {
//                   const accessoryKey = key.toLowerCase().replace(/\s+/g, '');
//                   if (updatedAccessories.hasOwnProperty(accessoryKey)) {
//                     updatedAccessories[accessoryKey] = true;
//                   }
//                 }
//               });
//               setAccessories(updatedAccessories);
//             } catch (error) {
//               console.log('Error parsing accessories:', error);
//             }
//           }

//           // Set terms acceptance
//           setAcceptTerms(true);
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
//     return `DC${timestamp}`;
//   };

//   // Calculate total paid and balance amount automatically
//   useEffect(() => {
//     const cashPaid = parseFloat(formData.cashPaid) || 0;
//     const financeAmountPaid = parseFloat(formData.financeAmountPaid) || 0;
//     const totalPaid = cashPaid + financeAmountPaid;
//     const dealPrice = parseFloat(formData.dealPrice) || 0;
//     const balance = dealPrice - totalPaid;
    
//     handleInputChange('totalPaid', totalPaid.toString());
//     handleInputChange('balanceAmount', balance.toString());
//   }, [formData.cashPaid, formData.financeAmountPaid, formData.dealPrice]);

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

//   const handleDeliveryModeSelect = (mode) => {
//     handleInputChange('deliveryMode', mode);
//   };

//   const handleAreYouCustomerSelect = (value) => {
//     handleInputChange('areYouCustomer', value === 'Yes' ? '1' : '0');
//   };

//   const handleAccessoryToggle = (accessory) => {
//     setAccessories(prev => ({
//       ...prev,
//       [accessory]: !prev[accessory],
//     }));
//   };

//   const handleTractorModelSelect = (model) => {
//     handleInputChange('tractorModel', model);
//     setShowTractorModelDropdown(false);
//   };

//   const handleTiresMakeSelect = (make) => {
//     handleInputChange('tiresMake', make);
//     setShowTiresMakeDropdown(false);
//   };

//   const handleFipMakeSelect = (make) => {
//     handleInputChange('fipMake', make);
//     setShowFipMakeDropdown(false);
//   };

//   const handleBatteryMakeSelect = (make) => {
//     handleInputChange('batteryMake', make);
//     setShowBatteryMakeDropdown(false);
//   };

//   const handlePaymentStatusSelect = (status) => {
//     handleInputChange('paymentStatus', status);
//     setShowPaymentStatusDropdown(false);
//   };

//   const handleFinancerSelect = (financer) => {
//     handleInputChange('financerName', financer);
//     setShowFinancerDropdown(false);
//   };

//   const handleHypothecationSelect = (option) => {
//     handleInputChange('hypothecation', option);
//     setShowHypothecationDropdown(false);
//   };

//   const handleRelationSelect = (relation) => {
//     handleInputChange('representativeRelation', relation);
//     setShowRelationDropdown(false);
//   };

//   const handleDateChange = (event, selectedDate) => {
//     setShowDatePicker(false);
//     if (selectedDate) {
//       handleInputChange('date', selectedDate);
//     }
//   };

//   const handleManufactureDateChange = (event, selectedDate) => {
//     setShowManufactureDatePicker(false);
//     if (selectedDate) {
//       const month = selectedDate.getMonth() + 1;
//       const year = selectedDate.getFullYear();
//       handleInputChange('yearOfManufacture', `${month}/${year}`);
//     }
//   };

//   const handleDateIconPress = () => {
//     setShowDatePicker(true);
//   };

//   const handleManufactureDateIconPress = () => {
//     setShowManufactureDatePicker(true);
//   };

//   const validateForm = () => {
//     const requiredFields = [
//       'customerName', 'parentage', 'address', 
//       'mobileNo', 'tractorName', 'tractorModel', 'chassisNo', 
//       'engineNo', 'yearOfManufacture', 'dealPrice', 'paymentStatus'
//     ];

//     for (const field of requiredFields) {
//       if (!formData[field] || formData[field].toString().trim() === '') {
//         Alert.alert('Validation Error', `Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
//         return false;
//       }
//     }

//     if (!formData.areYouCustomer) {
//       Alert.alert('Validation Error', 'Please select if you are the customer');
//       return false;
//     }

//     // Branch validation
//     if (formData.deliveryMode === 'Branch') {
//       const branchFields = ['branchName', 'branchPersonName', 'branchAddress', 'branchMobileNumber'];
//       for (const field of branchFields) {
//         if (!formData[field] || formData[field].toString().trim() === '') {
//           Alert.alert('Validation Error', `Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
//           return false;
//         }
//       }
//     }

//     // Representative validation
//     if (formData.areYouCustomer === '0') {
//       const representativeFields = ['representativeName', 'representativeFatherName', 'representativeAddress', 'representativeMobileNumber', 'representativeRelation'];
//       for (const field of representativeFields) {
//         if (!formData[field] || formData[field].toString().trim() === '') {
//           Alert.alert('Validation Error', `Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
//           return false;
//         }
//       }
//       if (formData.representativeRelation === 'Other' && (!formData.representativeRelationOther || formData.representativeRelationOther.trim() === '')) {
//         Alert.alert('Validation Error', 'Please specify the relation');
//         return false;
//       }
//     }

//     if (!customerSignature) {
//       Alert.alert('Validation Error', 'Please add customer signature');
//       return false;
//     }

//     if (!managerSignature) {
//       Alert.alert('Validation Error', 'Please add manager signature');
//       return false;
//     }

//     if (!driverSignature) {
//       Alert.alert('Validation Error', 'Please add driver signature');
//       return false;
//     }

//     // Checkbox validation - form will only submit when checkbox is ticked
//     if (!acceptTerms) {
//       Alert.alert('Validation Error', 'Please accept the terms and conditions by ticking the checkbox');
//       return false;
//     }

//     return true;
//   };

//   const prepareAccessoriesData = () => {
//     const accessoriesData = {};
    
//     // Map our state keys to the expected API keys
//     const accessoryMapping = {
//       bumper: 'Bumper',
//       cultivator: 'Cultivator',
//       leveler: 'Leveler',
//       rallyFenderSeats: 'Rally Fender Seats',
//       weightsRear: 'Weights Rear',
//       waterTanker: 'Water Tanker',
//       trolly: 'Trolly',
//       weightFront: 'Weight Front',
//       rearTowingHook: 'Rear Towing Hook',
//       hood: 'Hood',
//       ptoPully: 'PTO Pully',
//       drawbar: 'Drawbar',
//       cageWheels: 'Cage Wheels',
//       tool: 'Tool',
//       toplink: 'Top Link'
//     };

//     Object.keys(accessories).forEach(key => {
//       if (accessoryMapping[key]) {
//         accessoriesData[accessoryMapping[key]] = accessories[key] ? 'Yes' : 'No';
//       }
//     });
    
//     // Add empty Other array as shown in API example
//     accessoriesData.Other = [];
    
//     return JSON.stringify(accessoriesData);
//   };

//   const prepareFormData = () => {
//     const formDataToSend = new FormData();

//     // Add form data with exact field names as expected by API
//     formDataToSend.append('user_id', userId);
//     formDataToSend.append('form_no', formData.formNo || generateFormNo());
//     formDataToSend.append('select_date', formData.date ? formData.date.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]);
//     formDataToSend.append('delivery_mode', formData.deliveryMode === 'Customer' ? 'Self Pickup' : 'Branch');
//     formDataToSend.append('challan_created_by', formData.challanCreatedBy || 'Admin');
//     formDataToSend.append('customer_name', formData.customerName);
//     formDataToSend.append('parentage', formData.parentage);
//     formDataToSend.append('address', formData.address);
//     formDataToSend.append('hypothecation', formData.hypothecation || '');
//     formDataToSend.append('hypothecation_other', formData.hypothecationOther || '');
//     formDataToSend.append('mobile_no', formData.mobileNo);
//     formDataToSend.append('is_customer', formData.areYouCustomer);
//     formDataToSend.append('tractor_name', formData.tractorName);
//     formDataToSend.append('tractor_model', formData.tractorModel);
//     formDataToSend.append('chassis_no', formData.chassisNo);
//     formDataToSend.append('engine_no', formData.engineNo);
//     formDataToSend.append('year_of_manufacture', formData.yearOfManufacture);
//     formDataToSend.append('tyres_make', formData.tiresMake === 'Other' ? formData.tiresMakeOther : formData.tiresMake || '');
//     formDataToSend.append('fip_make', formData.fipMake === 'Other' ? formData.fipMakeOther : formData.fipMake || '');
//     formDataToSend.append('battery_make', formData.batteryMake === 'Other' ? formData.batteryMakeOther : formData.batteryMake || '');
//     formDataToSend.append('deal_price', formData.dealPrice);
//     formDataToSend.append('cash_paid', formData.cashPaid || '0');
//     formDataToSend.append('finance_amount_paid', formData.financeAmountPaid || '0');
//     formDataToSend.append('total_paid', formData.totalPaid || '0');
//     formDataToSend.append('balance_amount', formData.balanceAmount || '0');
//     formDataToSend.append('payment_status', formData.paymentStatus);
//     formDataToSend.append('financier_name', formData.financerName || '');
//     formDataToSend.append('financier_other', formData.financerOther || '');
//     formDataToSend.append('accessories', prepareAccessoriesData());

//     // Add branch fields
//     formDataToSend.append('branch_name', formData.branchName || '');
//     formDataToSend.append('branch_person_name', formData.branchPersonName || '');
//     formDataToSend.append('branch_address', formData.branchAddress || '');
//     formDataToSend.append('branch_mobile_number', formData.branchMobileNumber || '');

//     // Add representative fields
//     formDataToSend.append('representative_name', formData.representativeName || '');
//     formDataToSend.append('representative_father_name', formData.representativeFatherName || '');
//     formDataToSend.append('representative_address', formData.representativeAddress || '');
//     formDataToSend.append('representative_mobile_number', formData.representativeMobileNumber || '');
//     formDataToSend.append('representative_relation', formData.representativeRelation || '');
//     formDataToSend.append('representative_relation_other', formData.representativeRelationOther || '');

//     // Add images with proper file names
//     if (customerSignature) {
//       formDataToSend.append('customer_signature', {
//         uri: customerSignature.uri,
//         type: customerSignature.type || 'image/jpeg',
//         name: `customer_signature_${Date.now()}.jpg`,
//       });
//     } else {
//       // Add empty file field if no image selected
//       formDataToSend.append('customer_signature', '');
//     }

//     if (managerSignature) {
//       formDataToSend.append('manager_signature', {
//         uri: managerSignature.uri,
//         type: managerSignature.type || 'image/jpeg',
//         name: `manager_signature_${Date.now()}.jpg`,
//       });
//     } else {
//       formDataToSend.append('manager_signature', '');
//     }

//     if (driverSignature) {
//       formDataToSend.append('driver_signature', {
//         uri: driverSignature.uri,
//         type: driverSignature.type || 'image/jpeg',
//         name: `driver_signature_${Date.now()}.jpg`,
//       });
//     } else {
//       formDataToSend.append('driver_signature', '');
//     }

//     // For update, add the form ID
//     if (isEditMode && existingFormId) {
//       formDataToSend.append('id', existingFormId);
//     }

//     // Log form data for debugging
//     console.log('Form Data being sent:');
//     formDataToSend._parts.forEach(([key, value]) => {
//       if (typeof value !== 'object') {
//         console.log(`${key}: ${value}`);
//       } else {
//         console.log(`${key}: [File]`);
//       }
//     });

//     return formDataToSend;
//   };

//   const handleSubmit = async () => {
//     if (!userId) {
//       Alert.alert('Error', 'User ID not found. Please login again.');
//       return;
//     }

//     // Check if checkbox is ticked before validation
//     if (!acceptTerms) {
//       Alert.alert('Terms Not Accepted', 'Please accept the terms and conditions by ticking the checkbox before submitting the form.');
//       return;
//     }

//     if (!validateForm()) {
//       return;
//     }

//     setLoading(true);

//     try {
//       const formDataToSend = prepareFormData();
      
//       const url = isEditMode 
//         ? 'https://argosmob.uk/makroo/public/api/v1/delivery-challan/form/update'
//         : 'https://argosmob.uk/makroo/public/api/v1/delivery-challan/form/save';

//       console.log('Making API call to:', url);

//       const response = await axios.post(url, formDataToSend, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           'Accept': 'application/json',
//         },
//         timeout: 30000,
//       });

//       console.log('API Response:', response.data);

//       // FIXED: Proper success condition check
//       if (response.data && (response.data.success === true || response.data.status === 'success' || response.data.message?.toLowerCase().includes('success'))) {
//         Alert.alert(
//           'Success', 
//           isEditMode ? 'Delivery Challan updated successfully!' : 'Delivery Challan submitted successfully!',
//           [
//             {
//               text: 'OK',
//               // onPress: () => navigation.navigate('Dashboard')
//             }
//           ]
//         );
//       } else {
//         // Extract error message from response
//         let errorMessage = 'Submission failed';
        
//         if (response.data && response.data.message) {
//           errorMessage = response.data.message;
//         } else if (response.data && response.data.error) {
//           errorMessage = response.data.error;
//         } else if (response.data && response.data.errors) {
//           // Handle validation errors
//           const validationErrors = Object.values(response.data.errors).flat();
//           errorMessage = validationErrors.join(', ');
//         } else if (response.data) {
//           // If we have data but no clear success indicator, check the response structure
//           errorMessage = 'Submission completed but no success confirmation received';
//           console.log('Unclear response structure:', response.data);
//         }
        
//         Alert.alert('Submission Failed', errorMessage);
//       }
//     } catch (error) {
//       console.log('Submission Error:', error);
//       console.log('Error Response:', error.response?.data);
      
//       if (error.response) {
//         // Server responded with error status
//         let errorMessage = 'Submission failed. Please try again.';
        
//         if (error.response.status === 422) {
//           // Handle validation errors
//           if (error.response.data.errors) {
//             const validationErrors = Object.values(error.response.data.errors).flat();
//             errorMessage = `Validation Error: ${validationErrors.join(', ')}`;
//           } else if (error.response.data.message) {
//             errorMessage = error.response.data.message;
//           }
//         } else if (error.response.data?.message) {
//           errorMessage = error.response.data.message;
//         } else if (error.response.data?.error) {
//           errorMessage = error.response.data.error;
//         }
        
//         Alert.alert('Submission Failed', errorMessage);
//       } else if (error.request) {
//         // Network error
//         Alert.alert('Network Error', 'Please check your internet connection and try again.');
//       } else {
//         // Other errors
//         Alert.alert('Error', 'Something went wrong. Please try again.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleHome = () => {
//     navigation.navigate('Dashboard');
//   };

//   const handleGeneratePDF = () => {
//     Alert.alert('PDF', 'Delivery Challan PDF generated!');
//   };

//   const handleAddItem = () => {
//     Alert.alert('Add Item', 'Add new accessory item');
//   };

//   const renderDropdownItem = ({item}) => (
//     <TouchableOpacity
//       style={styles.dropdownItem}
//       onPress={() => {
//         if (showTractorModelDropdown) handleTractorModelSelect(item);
//         else if (showTiresMakeDropdown) handleTiresMakeSelect(item);
//         else if (showFipMakeDropdown) handleFipMakeSelect(item);
//         else if (showBatteryMakeDropdown) handleBatteryMakeSelect(item);
//         else if (showPaymentStatusDropdown) handlePaymentStatusSelect(item);
//         else if (showFinancerDropdown) handleFinancerSelect(item);
//         else if (showHypothecationDropdown) handleHypothecationSelect(item);
//         else if (showRelationDropdown) handleRelationSelect(item);
//       }}>
//       <Text style={styles.dropdownItemText}>{item}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={[styles.container, {paddingTop: insets.top,paddingBottom: insets.bottom}]}>
//       {/* Header */}
//       <LinearGradient
//         colors={['#7E5EA9', '#20AEBC']}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 0 }}
//         style={styles.header}>
//         <Text style={styles.headerTitle}>Delivery Challan</Text>
//         {isEditMode && <Text style={styles.editModeText}>Edit Mode</Text>}
//       </LinearGradient>

//       <ScrollView style={styles.scrollView}>
//         {/* Form No */}
//         <Text style={styles.sectionHeading}>Create Delivery Challan</Text>

//         {/* Date */}
//          <View style={styles.inputContainer}>
//             <LinearGradient
//               colors={['#7E5EA9', '#20AEBC']}
//                start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 0 }}
//               style={styles.inputGradient}>
//               <View style={styles.inputWithIcon}>
//                 <TouchableOpacity
//                   style={[styles.textInput, {flex: 1}]}
//                   onPress={handleDateIconPress}
//                   disabled={loading}
//                 >
//                   <Text style={formData.date ? styles.selectedText : styles.placeholderText}>
//                     {formData.date ? formData.date.toLocaleDateString() : 'Select Date'}
//                   </Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity 
//                   style={styles.iconButton}
//                   onPress={handleDateIconPress}
//                   disabled={loading}
//                 >
//                   <Icon name="calendar-today" size={20} color="#666" />
//                 </TouchableOpacity>
//                 {showDatePicker && (
//                   <DateTimePicker
//                     value={formData.date || new Date()}
//                     mode="date"
//                     display={Platform.OS === 'ios' ? 'spinner' : 'default'}
//                     onChange={handleDateChange}
//                   />
//                 )}
//               </View>
//             </LinearGradient>
//           </View>

//         {/* Delivery Mode */}
//         <View style={styles.deliveryModeContainer}>
//           <Text style={styles.sectionLabel}>Delivery Mode</Text>
//           <View style={styles.deliveryModeButtons}>
//             <TouchableOpacity
//               style={[
//                 styles.deliveryModeButton,
//                 formData.deliveryMode === 'Customer' && styles.deliveryModeSelected
//               ]}
//               onPress={() => handleDeliveryModeSelect('Customer')}
//               disabled={loading}
//             >
//               <LinearGradient
//                 colors={formData.deliveryMode === 'Customer' ? ['#7E5EA9', '#20AEBC'] : ['#7E5EA9', '#20AEBC']}
//                 start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 0 }}
//                 style={styles.deliveryModeGradient}>
//                 <Text style={[
//                   styles.deliveryModeText,
//                   formData.deliveryMode === 'Customer' && styles.deliveryModeTextSelected
//                 ]}>
//                   Customer
//                 </Text>
//               </LinearGradient>
//             </TouchableOpacity>
            
//             <TouchableOpacity
//               style={[
//                 styles.deliveryModeButton,
//                 formData.deliveryMode === 'Branch' && styles.deliveryModeSelected
//               ]}
//               onPress={() => handleDeliveryModeSelect('Branch')}
//               disabled={loading}
//             >
//               <LinearGradient
//                 colors={formData.deliveryMode === 'Branch' ? ['#7E5EA9', '#20AEBC'] : ['#7E5EA9', '#20AEBC']}
//                 start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 0 }}
//                 style={styles.deliveryModeGradient}>
//                 <Text style={[
//                   styles.deliveryModeText,
//                   formData.deliveryMode === 'Branch' && styles.deliveryModeTextSelected
//                 ]}>
//                   Branch
//                 </Text>
//               </LinearGradient>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Branch Fields - Conditionally Rendered */}
//         {formData.deliveryMode === 'Branch' && (
//           <View style={styles.branchSection}>
//             <Text style={styles.sectionHeading}>Branch Details</Text>
            
//             {/* Branch Name */}
//             <View style={styles.inputRow}>
//               <View style={styles.fullWidthInputContainer}>
//                 <LinearGradient
//                   colors={['#7E5EA9', '#20AEBC']}
//                   start={{ x: 0, y: 0 }}
//                   end={{ x: 1, y: 0 }}
//                   style={styles.inputGradient}>
//                   <TextInput
//                     style={styles.textInput}
//                     value={formData.branchName}
//                     onChangeText={(text) => handleInputChange('branchName', text)}
//                     placeholder="Branch Name"
//                     placeholderTextColor="#666"
//                     editable={!loading}
//                   />
//                 </LinearGradient>
//               </View>
//             </View>

//             {/* Branch Person Name */}
//             <View style={styles.inputRow}>
//               <View style={styles.fullWidthInputContainer}>
//                 <LinearGradient
//                   colors={['#7E5EA9', '#20AEBC']}
//                   start={{ x: 0, y: 0 }}
//                   end={{ x: 1, y: 0 }}
//                   style={styles.inputGradient}>
//                   <TextInput
//                     style={styles.textInput}
//                     value={formData.branchPersonName}
//                     onChangeText={(text) => handleInputChange('branchPersonName', text)}
//                     placeholder="Branch Person Name"
//                     placeholderTextColor="#666"
//                     editable={!loading}
//                   />
//                 </LinearGradient>
//               </View>
//             </View>

//             {/* Branch Address */}
//             <View style={styles.inputRow}>
//               <View style={styles.fullWidthInputContainer}>
//                 <LinearGradient
//                   colors={['#7E5EA9', '#20AEBC']}
//                   start={{ x: 0, y: 0 }}
//                   end={{ x: 1, y: 0 }}
//                   style={styles.inputGradient}>
//                   <TextInput
//                     style={styles.textInput}
//                     value={formData.branchAddress}
//                     onChangeText={(text) => handleInputChange('branchAddress', text)}
//                     placeholder="Branch Address"
//                     placeholderTextColor="#666"
//                     multiline
//                     numberOfLines={2}
//                     editable={!loading}
//                   />
//                 </LinearGradient>
//               </View>
//             </View>

//             {/* Branch Mobile Number */}
//             <View style={styles.inputRow}>
//               <View style={styles.fullWidthInputContainer}>
//                 <LinearGradient
//                   colors={['#7E5EA9', '#20AEBC']}
//                   start={{ x: 0, y: 0 }}
//                   end={{ x: 1, y: 0 }}
//                   style={styles.inputGradient}>
//                   <TextInput
//                     style={styles.textInput}
//                     value={formData.branchMobileNumber}
//                     onChangeText={(text) => handleInputChange('branchMobileNumber', text)}
//                     placeholder="Branch Mobile Number"
//                     placeholderTextColor="#666"
//                     keyboardType="phone-pad"
//                     editable={!loading}
//                   />
//                 </LinearGradient>
//               </View>
//             </View>
//           </View>
//         )}

//         {/* Customer Details Heading */}
//         <Text style={styles.sectionHeading}>Customer Details</Text>

//         {/* Challan Created By - Changed to TextInput */}
//         <View style={styles.inputRow}>
//           <View style={styles.inputContainer}>
//             <LinearGradient
//               colors={['#7E5EA9', '#20AEBC']}
//                start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 0 }}
//               style={styles.inputGradient}>
//               <TextInput
//                 style={styles.textInput}
//                 value={formData.challanCreatedBy}
//                 onChangeText={(text) => handleInputChange('challanCreatedBy', text)}
//                 placeholder="Challan Created By"
//                 placeholderTextColor="#666"
//                 editable={!loading}
//               />
//             </LinearGradient>
//           </View>
//         </View>

//         {/* Customer Name & Parentage */}
//         <View style={styles.inputRow}>
//           <View style={styles.inputContainer}>
//             <LinearGradient
//               colors={['#7E5EA9', '#20AEBC']}
//               start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 0 }}
//               style={styles.inputGradient}>
//               <TextInput
//                 style={styles.textInput}
//                 value={formData.customerName}
//                 onChangeText={(text) => handleInputChange('customerName', text)}
//                 placeholder="Customer Name"
//                 placeholderTextColor="#666"
//                 editable={!loading}
//               />
//             </LinearGradient>
//           </View>
//           <View style={{marginBottom: 15}} />
//           <View style={styles.inputContainer}>
//             <LinearGradient
//               colors={['#7E5EA9', '#20AEBC']}
//               start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 0 }}
//               style={styles.inputGradient}>
//               <TextInput
//                 style={styles.textInput}
//                 value={formData.parentage}
//                 onChangeText={(text) => handleInputChange('parentage', text)}
//                 placeholder="Parentage"
//                 placeholderTextColor="#666"
//                 keyboardType="numeric"
//                 editable={!loading}
//               />
//             </LinearGradient>
//           </View>
//         </View>

//         {/* Address */}
//         <View style={styles.inputRow}>
//           <View style={styles.fullWidthInputContainer}>
//             <LinearGradient
//               colors={['#7E5EA9', '#20AEBC']}
//                start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 0 }}
//               style={styles.inputGradient}>
//               <TextInput
//                 style={[styles.textInput,]}
//                 value={formData.address}
//                 onChangeText={(text) => handleInputChange('address', text)}
//                 placeholder="Enter Address"
//                 placeholderTextColor="#666"
//                 multiline
//                 numberOfLines={1}
//                 editable={!loading}
//               />
//             </LinearGradient>
//           </View>
//         </View>

//         {/* Hypothecation - Changed to Dropdown */}
//         <View style={styles.inputRow}>
//           <View style={styles.inputContainer}>
//             <LinearGradient
//               colors={['#7E5EA9', '#20AEBC']}
//                start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 0 }}
//               style={styles.inputGradient}>
//               <TouchableOpacity
//                 style={styles.dropdownInput}
//                 onPress={() => setShowHypothecationDropdown(true)}
//                 disabled={loading}
//               >
//                 <Text style={formData.hypothecation ? styles.selectedText : styles.placeholderText}>
//                   {formData.hypothecation || 'Select Hypothecation'}
//                 </Text>
//                 <Icon name="keyboard-arrow-down" size={24} color="#666" />
//               </TouchableOpacity>
//             </LinearGradient>
//           </View>
//         </View>

//         {/* Hypothecation Other - Conditionally Rendered */}
//         {formData.hypothecation === 'Other' && (
//           <View style={styles.inputRow}>
//             <View style={styles.fullWidthInputContainer}>
//               <LinearGradient
//                 colors={['#7E5EA9', '#20AEBC']}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 0 }}
//                 style={styles.inputGradient}>
//                 <TextInput
//                   style={styles.textInput}
//                   value={formData.hypothecationOther}
//                   onChangeText={(text) => handleInputChange('hypothecationOther', text)}
//                   placeholder="Enter Other Hypothecation"
//                   placeholderTextColor="#666"
//                   editable={!loading}
//                 />
//               </LinearGradient>
//             </View>
//           </View>
//         )}

//         {/* Mobile No */}
//         <View style={styles.inputRow}>
//           <View style={styles.inputContainer}>
//             <LinearGradient
//               colors={['#7E5EA9', '#20AEBC']}
//                start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 0 }}
//               style={styles.inputGradient}>
//               <TextInput
//                 style={styles.textInput}
//                 value={formData.mobileNo}
//                 onChangeText={(text) => handleInputChange('mobileNo', text)}
//                 placeholder="Mobile No."
//                 placeholderTextColor="#666"
//                 keyboardType="phone-pad"
//                 editable={!loading}
//               />
//             </LinearGradient>
//           </View>
//         </View>

//         {/* Are You Customer? */}
//         <View style={styles.radioSection}>
//           <Text style={styles.radioLabel}>Are You Customer?</Text>
//           <View style={styles.radioOptions}>
//             {['Yes', 'No'].map((option) => (
//               <TouchableOpacity
//                 key={option}
//                 style={styles.radioOption}
//                 onPress={() => handleAreYouCustomerSelect(option)}
//                 disabled={loading}
//               >
//                 <LinearGradient
//                   colors={formData.areYouCustomer === (option === 'Yes' ? '1' : '0') ? ['#12C857', '#12C857'] : ['#f0f0f0', '#f0f0f0']}
//                   style={styles.radioGradient}>
//                   <View style={styles.radioInner}>
//                     {formData.areYouCustomer === (option === 'Yes' ? '1' : '0') && (
//                       <Icon name="check" size={24} color="#fff" />
//                     )}
//                   </View>
//                 </LinearGradient>
//                 <Text style={styles.radioText}>{option}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>

//         {/* Representative Fields - Conditionally Rendered */}
//         {formData.areYouCustomer === '0' && (
//           <View style={styles.representativeSection}>
//             <Text style={styles.sectionHeading}>Representative Details</Text>
            
//             {/* Representative Name */}
//             <View style={styles.inputRow}>
//               <View style={styles.fullWidthInputContainer}>
//                 <LinearGradient
//                   colors={['#7E5EA9', '#20AEBC']}
//                   start={{ x: 0, y: 0 }}
//                   end={{ x: 1, y: 0 }}
//                   style={styles.inputGradient}>
//                   <TextInput
//                     style={styles.textInput}
//                     value={formData.representativeName}
//                     onChangeText={(text) => handleInputChange('representativeName', text)}
//                     placeholder="Representative Name"
//                     placeholderTextColor="#666"
//                     editable={!loading}
//                   />
//                 </LinearGradient>
//               </View>
//             </View>

//             {/* Representative Father's Name */}
//             <View style={styles.inputRow}>
//               <View style={styles.fullWidthInputContainer}>
//                 <LinearGradient
//                   colors={['#7E5EA9', '#20AEBC']}
//                   start={{ x: 0, y: 0 }}
//                   end={{ x: 1, y: 0 }}
//                   style={styles.inputGradient}>
//                   <TextInput
//                     style={styles.textInput}
//                     value={formData.representativeFatherName}
//                     onChangeText={(text) => handleInputChange('representativeFatherName', text)}
//                     placeholder="Father's Name"
//                     placeholderTextColor="#666"
//                     editable={!loading}
//                   />
//                 </LinearGradient>
//               </View>
//             </View>

//             {/* Representative Address */}
//             <View style={styles.inputRow}>
//               <View style={styles.fullWidthInputContainer}>
//                 <LinearGradient
//                   colors={['#7E5EA9', '#20AEBC']}
//                   start={{ x: 0, y: 0 }}
//                   end={{ x: 1, y: 0 }}
//                   style={styles.inputGradient}>
//                   <TextInput
//                     style={styles.textInput}
//                     value={formData.representativeAddress}
//                     onChangeText={(text) => handleInputChange('representativeAddress', text)}
//                     placeholder="Representative Address"
//                     placeholderTextColor="#666"
//                     multiline
//                     numberOfLines={2}
//                     editable={!loading}
//                   />
//                 </LinearGradient>
//               </View>
//             </View>

//             {/* Representative Mobile Number */}
//             <View style={styles.inputRow}>
//               <View style={styles.fullWidthInputContainer}>
//                 <LinearGradient
//                   colors={['#7E5EA9', '#20AEBC']}
//                   start={{ x: 0, y: 0 }}
//                   end={{ x: 1, y: 0 }}
//                   style={styles.inputGradient}>
//                   <TextInput
//                     style={styles.textInput}
//                     value={formData.representativeMobileNumber}
//                     onChangeText={(text) => handleInputChange('representativeMobileNumber', text)}
//                     placeholder="Representative Mobile Number"
//                     placeholderTextColor="#666"
//                     keyboardType="phone-pad"
//                     editable={!loading}
//                   />
//                 </LinearGradient>
//               </View>
//             </View>

//             {/* Relation with Owner */}
//             <View style={styles.inputRow}>
//               <View style={styles.inputContainer}>
//                 <LinearGradient
//                   colors={['#7E5EA9', '#20AEBC']}
//                   start={{ x: 0, y: 0 }}
//                   end={{ x: 1, y: 0 }}
//                   style={styles.inputGradient}>
//                   <TouchableOpacity
//                     style={styles.dropdownInput}
//                     onPress={() => setShowRelationDropdown(true)}
//                     disabled={loading}
//                   >
//                     <Text style={formData.representativeRelation ? styles.selectedText : styles.placeholderText}>
//                       {formData.representativeRelation || 'Relation with Owner'}
//                     </Text>
//                     <Icon name="keyboard-arrow-down" size={24} color="#666" />
//                   </TouchableOpacity>
//                 </LinearGradient>
//               </View>
//             </View>

//             {/* Relation Other - Conditionally Rendered */}
//             {formData.representativeRelation === 'Other' && (
//               <View style={styles.inputRow}>
//                 <View style={styles.fullWidthInputContainer}>
//                   <LinearGradient
//                     colors={['#7E5EA9', '#20AEBC']}
//                     start={{ x: 0, y: 0 }}
//                     end={{ x: 1, y: 0 }}
//                     style={styles.inputGradient}>
//                     <TextInput
//                       style={styles.textInput}
//                       value={formData.representativeRelationOther}
//                       onChangeText={(text) => handleInputChange('representativeRelationOther', text)}
//                       placeholder="Enter Other Relation"
//                       placeholderTextColor="#666"
//                       editable={!loading}
//                     />
//                   </LinearGradient>
//                 </View>
//               </View>
//             )}
//           </View>
//         )}

//         {/* Tractor Details Heading */}
//         <Text style={styles.sectionHeading}>Tractor Details</Text>

//         {/* Tractor Name & Model */}
//         <View style={styles.inputRow}>
//           <View style={styles.inputContainer}>
//             <LinearGradient
//               colors={['#7E5EA9', '#20AEBC']}
//                 start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 0 }}
//               style={styles.inputGradient}>
//               <TextInput
//                 style={styles.textInput}
//                 value={formData.tractorName}
//                 onChangeText={(text) => handleInputChange('tractorName', text)}
//                 placeholder="Tractor Name"
//                 placeholderTextColor="#666"
//                 editable={!loading}
//               />
//             </LinearGradient>
//           </View>
//           <View style={{marginBottom: 15}} />
//           <View style={styles.inputContainer}>
//             <LinearGradient
//               colors={['#7E5EA9', '#20AEBC']}
//                 start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 0 }}
//               style={styles.inputGradient}>
//               <TouchableOpacity
//                 style={styles.dropdownInput}
//                 onPress={() => setShowTractorModelDropdown(true)}
//                 disabled={loading}
//               >
//                 <Text style={formData.tractorModel ? styles.selectedText : styles.placeholderText}>
//                   {formData.tractorModel || 'Select Model'}
//                 </Text>
//                 <Icon name="keyboard-arrow-down" size={24} color="#666" />
//               </TouchableOpacity>
//             </LinearGradient>
//           </View>
//         </View>

//         {/* Chassis No & Engine No */}
//         <View style={styles.inputRow}>
//           <View style={styles.inputContainer}>
//             <LinearGradient
//               colors={['#7E5EA9', '#20AEBC']}
//                start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 0 }}
//               style={styles.inputGradient}>
//               <View style={styles.inputWithIcon}>
//                 <TextInput
//                   style={[styles.textInput, {flex: 1}]}
//                   value={formData.chassisNo}
//                   onChangeText={(text) => handleInputChange('chassisNo', text)}
//                   placeholder="Chassis No"
//                   placeholderTextColor="#666"
//                   editable={!loading}
//                 />
//                 <TouchableOpacity 
//                   style={styles.iconButton}
//                   onPress={handleChassisScanPress}
//                   disabled={loading}
//                 >
//                   <Icon name="qr-code-scanner" size={20} color="#666" />
//                 </TouchableOpacity>
//               </View>
//             </LinearGradient>
//           </View>
//           <View style={{marginBottom: 15}} />
//           <View style={styles.inputContainer}>
//             <LinearGradient
//               colors={['#7E5EA9', '#20AEBC']}
//                start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 0 }}
//               style={styles.inputGradient}>
//               <View style={styles.inputWithIcon}>
//                 <TextInput
//                   style={[styles.textInput, {flex: 1}]}
//                   value={formData.engineNo}
//                   onChangeText={(text) => handleInputChange('engineNo', text)}
//                   placeholder="Engine No"
//                   placeholderTextColor="#666"
//                   editable={!loading}
//                 />
//                 <TouchableOpacity 
//                   style={styles.iconButton}
//                   onPress={handleEngineScanPress}
//                   disabled={loading}
//                 >
//                   <Icon name="qr-code-scanner" size={20} color="#666" />
//                 </TouchableOpacity>
//               </View>
//             </LinearGradient>
//           </View>
//         </View>

//         {/* Year of Manufacture - Changed to Month/Year Picker */}
//         <View style={styles.inputRow}>
//           <View style={styles.inputContainer}>
//             <LinearGradient
//               colors={['#7E5EA9', '#20AEBC']}
//                 start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 0 }}
//               style={styles.inputGradient}>
//               <View style={styles.inputWithIcon}>
//                 <TouchableOpacity
//                   style={[styles.textInput, {flex: 1}]}
//                   onPress={handleManufactureDateIconPress}
//                   disabled={loading}
//                 >
//                   <Text style={formData.yearOfManufacture ? styles.selectedText : styles.placeholderText}>
//                     {formData.yearOfManufacture || 'Month/Year of Manufacture'}
//                   </Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity 
//                   style={styles.iconButton}
//                   onPress={handleManufactureDateIconPress}
//                   disabled={loading}
//                 >
//                   <Icon name="calendar-today" size={20} color="#666" />
//                 </TouchableOpacity>
//                 {showManufactureDatePicker && (
//                   <DateTimePicker
//                     value={new Date()}
//                     mode="date"
//                     display={Platform.OS === 'ios' ? 'spinner' : 'default'}
//                     onChange={handleManufactureDateChange}
//                   />
//                 )}
//               </View>
//             </LinearGradient>
//           </View>
//         </View>

//         {/* Tires Make with Other option */}
//         <View style={styles.inputRow}>
//           <View style={styles.inputContainer}>
//             <LinearGradient
//               colors={['#7E5EA9', '#20AEBC']}
//                 start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 0 }}
//               style={styles.inputGradient}>
//               <TouchableOpacity
//                 style={styles.dropdownInput}
//                 onPress={() => setShowTiresMakeDropdown(true)}
//                 disabled={loading}
//               >
//                 <Text style={formData.tiresMake ? styles.selectedText : styles.placeholderText}>
//                   {formData.tiresMake || 'Select Tyres Make'}
//                 </Text>
//                 <Icon name="keyboard-arrow-down" size={24} color="#666" />
//               </TouchableOpacity>
//             </LinearGradient>
//           </View>
//         </View>

//         {/* Tires Make Other - Conditionally Rendered */}
//         {formData.tiresMake === 'Other' && (
//           <View style={styles.inputRow}>
//             <View style={styles.fullWidthInputContainer}>
//               <LinearGradient
//                 colors={['#7E5EA9', '#20AEBC']}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 0 }}
//                 style={styles.inputGradient}>
//                 <TextInput
//                   style={styles.textInput}
//                   value={formData.tiresMakeOther}
//                   onChangeText={(text) => handleInputChange('tiresMakeOther', text)}
//                   placeholder="Enter Other Tyres Make"
//                   placeholderTextColor="#666"
//                   editable={!loading}
//                 />
//               </LinearGradient>
//             </View>
//           </View>
//         )}

//         {/* FIP Make with Other option */}
//         <View style={styles.inputRow}>
//           <View style={styles.inputContainer}>
//             <LinearGradient
//               colors={['#7E5EA9', '#20AEBC']}
//                 start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 0 }}
//               style={styles.inputGradient}>
//               <TouchableOpacity
//                 style={styles.dropdownInput}
//                 onPress={() => setShowFipMakeDropdown(true)}
//                 disabled={loading}
//               >
//                 <Text style={formData.fipMake ? styles.selectedText : styles.placeholderText}>
//                   {formData.fipMake || 'FIP Make'}
//                 </Text>
//                 <Icon name="keyboard-arrow-down" size={24} color="#666" />
//               </TouchableOpacity>
//             </LinearGradient>
//           </View>
//         </View>

//         {/* FIP Make Other - Conditionally Rendered */}
//         {formData.fipMake === 'Other' && (
//           <View style={styles.inputRow}>
//             <View style={styles.fullWidthInputContainer}>
//               <LinearGradient
//                 colors={['#7E5EA9', '#20AEBC']}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 0 }}
//                 style={styles.inputGradient}>
//                 <TextInput
//                   style={styles.textInput}
//                   value={formData.fipMakeOther}
//                   onChangeText={(text) => handleInputChange('fipMakeOther', text)}
//                   placeholder="Enter Other FIP Make"
//                   placeholderTextColor="#666"
//                   editable={!loading}
//                 />
//               </LinearGradient>
//             </View>
//           </View>
//         )}

//         {/* Battery Make with Other option */}
//         <View style={styles.inputRow}>
//           <View style={styles.inputContainer}>
//             <LinearGradient
//               colors={['#7E5EA9', '#20AEBC']}
//                 start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 0 }}
//               style={styles.inputGradient}>
//               <TouchableOpacity
//                 style={styles.dropdownInput}
//                 onPress={() => setShowBatteryMakeDropdown(true)}
//                 disabled={loading}
//               >
//                 <Text style={formData.batteryMake ? styles.selectedText : styles.placeholderText}>
//                   {formData.batteryMake || 'Select Battery Make'}
//                 </Text>
//                 <Icon name="keyboard-arrow-down" size={24} color="#666" />
//               </TouchableOpacity>
//             </LinearGradient>
//           </View>
//         </View>

//         {/* Battery Make Other - Conditionally Rendered */}
//         {formData.batteryMake === 'Other' && (
//           <View style={styles.inputRow}>
//             <View style={styles.fullWidthInputContainer}>
//               <LinearGradient
//                 colors={['#7E5EA9', '#20AEBC']}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 0 }}
//                 style={styles.inputGradient}>
//                 <TextInput
//                   style={styles.textInput}
//                   value={formData.batteryMakeOther}
//                   onChangeText={(text) => handleInputChange('batteryMakeOther', text)}
//                   placeholder="Enter Other Battery Make"
//                   placeholderTextColor="#666"
//                   editable={!loading}
//                 />
//               </LinearGradient>
//             </View>
//           </View>
//         )}

//         {/* Payment Details Heading */}
//         <Text style={styles.sectionHeading}>Payment Details</Text>

//         {/* Deal Price */}
//         <View style={styles.inputRow}>
//           <View style={styles.inputContainer}>
//             <LinearGradient
//               colors={['#7E5EA9', '#20AEBC']}
//                 start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 0 }}
//               style={styles.inputGradient}>
//               <TextInput
//                 style={styles.textInput}
//                 value={formData.dealPrice}
//                 onChangeText={(text) => handleInputChange('dealPrice', text)}
//                 placeholder="Deal Price"
//                 placeholderTextColor="#666"
//                 keyboardType="numeric"
//                 editable={!loading}
//               />
//             </LinearGradient>
//           </View>
//         </View>

//         {/* Cash Paid & Finance Amount Paid */}
//         <View style={styles.inputRow}>
//           <View style={styles.inputContainer}>
//             <LinearGradient
//               colors={['#7E5EA9', '#20AEBC']}
//                 start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 0 }}
//               style={styles.inputGradient}>
//               <TextInput
//                 style={styles.textInput}
//                 value={formData.cashPaid}
//                 onChangeText={(text) => handleInputChange('cashPaid', text)}
//                 placeholder="Cash Paid"
//                 placeholderTextColor="#666"
//                 keyboardType="numeric"
//                 editable={!loading}
//               />
//             </LinearGradient>
//           </View>
          
//           <View style={styles.inputContainer}>
//          <View style={{marginBottom: 15}} />
//             <LinearGradient
//               colors={['#7E5EA9', '#20AEBC']}
//                 start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 0 }}
//               style={styles.inputGradient}>
//               <TextInput
//                 style={styles.textInput}
//                 value={formData.financeAmountPaid}
//                 onChangeText={(text) => handleInputChange('financeAmountPaid', text)}
//                 placeholder="Finance Amount Paid"
//                 placeholderTextColor="#666"
//                 keyboardType="numeric"
//                 editable={!loading}
//               />
//             </LinearGradient>
//           </View>
//         </View>

//         {/* Total Paid & Balance Amount */}
//         <View style={styles.inputRow}>
//           <View style={styles.inputContainer}>
//             <Text style={{color:"#666",  fontFamily:"Inter_28pt-SemiBold",}}>Total Amount Paid</Text>
//             <LinearGradient
//               colors={['#7E5EA9', '#20AEBC']}
//                 start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 0 }}
//               style={styles.inputGradient}>
//               <TextInput
//                 style={styles.textInput}
//                 value={formData.totalPaid}
//                 onChangeText={(text) => handleInputChange('totalPaid', text)}
//                 placeholder="Total Paid"
//                 placeholderTextColor="#666"
//                 keyboardType="numeric"
//                 editable={!loading}
//               />
//             </LinearGradient>
//           </View>
//           <View style={{marginBottom: 15}} />
//           <View style={styles.inputContainer}>
//               <Text style={{color:"#666",  fontFamily:"Inter_28pt-SemiBold",}}>Total Balance Amount</Text>
//             <LinearGradient
//               colors={['#7E5EA9', '#20AEBC']}
//                 start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 0 }}
//               style={styles.inputGradient}>
//               <TextInput
//                 style={styles.textInput}
//                 value={formData.balanceAmount}
//                 onChangeText={(text) => handleInputChange('balanceAmount', text)}
//                 placeholder="Balance Amount"
//                 placeholderTextColor="#666"
//                 keyboardType="numeric"
//                 editable={!loading}
//               />
//             </LinearGradient>
//           </View>
//         </View>

//         {/* Payment Status */}
//         <View style={styles.inputRow}>
//           <View style={styles.inputContainer}>
//             <LinearGradient
//               colors={['#7E5EA9', '#20AEBC']}
//                 start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 0 }}
//               style={styles.inputGradient}>
//               <TouchableOpacity
//                 style={styles.dropdownInput}
//                 onPress={() => setShowPaymentStatusDropdown(true)}
//                 disabled={loading}
//               >
//                 <Text style={formData.paymentStatus ? styles.selectedText : styles.placeholderText}>
//                   {formData.paymentStatus || 'Select Payment Status'}
//                 </Text>
//                 <Icon name="keyboard-arrow-down" size={24} color="#666" />
//               </TouchableOpacity>
//             </LinearGradient>
//           </View>
//         </View>

//         {/* Financer Name - Changed to Hypothecation Dropdown */}
//         <View style={styles.inputRow}>
//           <View style={styles.inputContainer}>
//             <LinearGradient
//               colors={['#7E5EA9', '#20AEBC']}
//               style={styles.inputGradient}>
//               <TouchableOpacity
//                 style={styles.dropdownInput}
//                 onPress={() => setShowFinancerDropdown(true)}
//                 disabled={loading}
//               >
//                 <Text style={formData.financerName ? styles.selectedText : styles.placeholderText}>
//                   {formData.financerName || 'Hypothecation'}
//                 </Text>
//                 <Icon name="keyboard-arrow-down" size={24} color="#666" />
//               </TouchableOpacity>
//             </LinearGradient>
//           </View>
//         </View>

//         {/* Financer Other - Conditionally Rendered */}
//         {formData.financerName === 'Other' && (
//           <View style={styles.inputRow}>
//             <View style={styles.fullWidthInputContainer}>
//               <LinearGradient
//                 colors={['#7E5EA9', '#20AEBC']}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 0 }}
//                 style={styles.inputGradient}>
//                 <TextInput
//                   style={styles.textInput}
//                   value={formData.financerOther}
//                   onChangeText={(text) => handleInputChange('financerOther', text)}
//                   placeholder="Enter Other Hypothecation"
//                   placeholderTextColor="#666"
//                   editable={!loading}
//                 />
//               </LinearGradient>
//             </View>
//           </View>
//         )}

//         {/* Accessories Heading */}
//         <View style={styles.accessoriesHeader}>
//           <Text style={styles.sectionHeading}>Accessories Given With Tractor</Text>
//         </View>

//         {/* Accessories Grid */}
//         <View style={styles.accessoriesGrid}>
//           {Object.keys(accessories).map((accessory, index) => (
//             <TouchableOpacity
//               key={accessory}
//               style={styles.accessoryItem}
//               onPress={() => handleAccessoryToggle(accessory)}
//               disabled={loading}
//             >
//               <LinearGradient
//                 colors={accessories[accessory] ? ['#12C857', '#12C857'] : ['#f0f0f0', '#f0f0f0']}
//                 style={styles.accessoryCheckbox}>
//                 <View style={styles.accessoryCheckboxInner}>
//                   {accessories[accessory] && (
//                     <Icon name="check" size={22} color="#fff" />
//                   )}
//                 </View>
//               </LinearGradient>
//               <Text style={styles.accessoryText}>
//                 {accessory.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} Issued
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>
        
//         {/* <View style={{flexDirection:"row",justifyContent:"space-between",marginBottom:20}}>
//             <Text style={{fontSize:16,fontFamily:"Inter_28pt-Regular"}}>Add Item</Text>
//             <View>
//             <TouchableOpacity onPress={handleAddItem} disabled={loading}>
//              <Icon name="add" size={25} color="black" style={{marginRight:20}} />
//              </TouchableOpacity>
//              </View>
//         </View> */}

//         {/* Terms and Conditions */}
//         <View style={styles.termsSection}>
//           <Text style={styles.termsHeading}>Terms and Conditions</Text>

//          <Text style={styles.termItem}>
//    <Text style={{ fontSize: 14, fontFamily: 'Inter_28pt-SemiBold' }}>
//     Delivery Condition :
//   </Text>
//   {' '}The Tractor Has Been Delivered To The Customer In Good Physical Condition And Fully Operational Working Condition. The Customer Has Inspected The Vehicle At The Time Of Delivery And Accepts Its Condition As Satisfactory.
// </Text>

//         <Text style={styles.termItem}>
//    <Text style={{ fontSize: 14, fontFamily: 'Inter_28pt-SemiBold' }}>
//     Ownership And Registration :
//   </Text>
//   {' '}The Ownership Of The Tractor Shall Be Transferred To The Customer Upon Full Payment And Successful Registration With The Relevant Motor Vehicle Authority. The Dealer Will Assist With Documentation If Required.
// </Text>

//         <Text style={styles.termItem}>
//    <Text style={{ fontSize: 14, fontFamily: 'Inter_28pt-SemiBold' }}>
//     Warranty And Service :
//   </Text>
//   {' '}The Tractor Is Covered Under The Manufacturer's Standard Warranty Policy. All Services And Repairs During The Warranty Period Must Be Carried Out At Authorized Service Centers Only.
// </Text>

//  <Text style={styles.termItem}>
//    <Text style={{ fontSize: 14, fontFamily: 'Inter_28pt-SemiBold' }}>
//     Liability :
//   </Text>
//   {' '}The Dealer Shall Not Be Held Liable For Any Damage Or Malfunction Arising Form Misuse, Unauthorized Modifications, Or Failure To Adhere To The Maintenance Schedule After Delivery. 
// </Text>

//          <Text style={styles.termItem}>
//    <Text style={{ fontSize: 14, fontFamily: 'Inter_28pt-SemiBold' }}>
//     Payment Terms :
//   </Text>
//   {' '}Full Payment Has Been Made Prior To Or At The Time Of Delivery Unless Otherwise Agreed In Writing. Any Outstanding Amounts Must Be Cleared As Per The Mutually Agreed Timeline.
// </Text>

// <Text style={styles.termItem}>
//   <Text style={{ fontSize: 14, fontFamily: 'Inter_28pt-SemiBold' }}>
//     Dispute Resolution :
//   </Text>
//   {' '}In Case Of Any Disputes Arising From This Delivery, The Matter Shall Be Resolved Amicably Between Both Parties. If Unresolved, It Will Be Subject To The Jurisdiction Of The Dealer's Location.
// </Text>

//           <Text style={styles.termItem}>
//   <Text style={{ fontSize: 14, fontFamily:"Inter_28pt-SemiBold" }}>
//     Acknowledgement :
//   </Text>
//   {' '}The Customer Acknowledges And Agrees To The Above Terms And Confirms That The Tractor Was Received In A Good And Working Condition.
// </Text>

//           {/* Accept Terms Checkbox */}
//           <TouchableOpacity
//             style={styles.termsCheckbox}
//             onPress={() => setAcceptTerms(!acceptTerms)}
//             activeOpacity={0.8}
//             disabled={loading}
//           >
//             <LinearGradient colors={['grey', 'grey']}  style={styles.checkboxGradient}>
//               <View style={[styles.checkboxInner, acceptTerms && styles.checkboxInnerSelected]}>
//                 {acceptTerms && <Icon name="check" size={16} color="#fff" />}
//               </View>
//             </LinearGradient>
//             <Text style={styles.termsCheckboxText}>Accept All Terms And Conditions</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Signatures Section */}
//         <View style={styles.signatureSection}>
//           <View style={styles.signatureRow}>
//             <TouchableOpacity 
//               style={styles.signatureBox} 
//               onPress={() => showImagePickerOptions(setCustomerSignature)}
//               disabled={loading}
//             >
//               {customerSignature ? (
//                 <Image 
//                   source={{ uri: customerSignature.uri }} 
//                   style={styles.previewImage}
//                   resizeMode="contain"
//                 />
//               ) : (
//                 <Text style={styles.signatureText}>Customer Signature</Text>
//               )}
//             </TouchableOpacity>

//             <TouchableOpacity 
//               style={styles.signatureBox} 
//               onPress={() => showImagePickerOptions(setManagerSignature)}
//               disabled={loading}
//             >
//               {managerSignature ? (
//                 <Image 
//                   source={{ uri: managerSignature.uri }} 
//                   style={styles.previewImage}
//                   resizeMode="contain"
//                 />
//               ) : (
//                 <Text style={styles.signatureText}>Manager Signature</Text>
//               )}
//             </TouchableOpacity>

//             <TouchableOpacity 
//               style={styles.signatureBox} 
//               onPress={() => showImagePickerOptions(setDriverSignature)}
//               disabled={loading}
//             >
//               {driverSignature ? (
//                 <Image 
//                   source={{ uri: driverSignature.uri }} 
//                   style={styles.previewImage}
//                   resizeMode="contain"
//                 />
//               ) : (
//                 <Text style={styles.signatureText}>Driver Signature</Text>
//               )}
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Buttons */}
//         <View style={styles.buttonsContainer}>
//           <TouchableOpacity 
//             style={[styles.submitButton, (loading || !acceptTerms) && styles.disabledButton]} 
//             onPress={handleSubmit}
//             disabled={loading || !acceptTerms}
//           >
//             {loading ? (
//               <ActivityIndicator color="#fff" size="small" />
//             ) : (
//               <Text style={styles.buttonText}>
//                 {isEditMode ? 'Update Delivery Challan' : 'Submit Delivery Challan'}
//               </Text>
//             )}
//           </TouchableOpacity>
          
//           <TouchableOpacity 
//             style={[styles.homeButton, loading && styles.disabledButton]} 
//             onPress={handleHome}
//             disabled={loading}
//           >
//             <Text style={styles.buttonText}>Home</Text>
//           </TouchableOpacity>
//         </View>

//         {/* QR Scanner Modal */}
//         {renderQRScanner()}

//         {/* Dropdown Modals */}
//         <Modal
//           visible={showTractorModelDropdown || showTiresMakeDropdown || showFipMakeDropdown || 
//                    showBatteryMakeDropdown || showPaymentStatusDropdown || showFinancerDropdown ||
//                    showHypothecationDropdown || showRelationDropdown}
//           transparent={true}
//           animationType="slide"
//           onRequestClose={() => {
//             setShowTractorModelDropdown(false);
//             setShowTiresMakeDropdown(false);
//             setShowFipMakeDropdown(false);
//             setShowBatteryMakeDropdown(false);
//             setShowPaymentStatusDropdown(false);
//             setShowFinancerDropdown(false);
//             setShowHypothecationDropdown(false);
//             setShowRelationDropdown(false);
//           }}>
//           <View style={styles.modalOverlay}>
//             <View style={styles.modalContent}>
//               <View style={styles.modalHeader}>
//                 <Text style={styles.modalTitle}>
//                   {showTractorModelDropdown && 'Select Tractor Model'}
//                   {showTiresMakeDropdown && 'Select Tyres Make'}
//                   {showFipMakeDropdown && 'Select FIP Make'}
//                   {showBatteryMakeDropdown && 'Select Battery Make'}
//                   {showPaymentStatusDropdown && 'Select Payment Status'}
//                   {showFinancerDropdown && 'Select Hypothecation'}
//                   {showHypothecationDropdown && 'Select Hypothecation'}
//                   {showRelationDropdown && 'Select Relation'}
//                 </Text>
//                 <TouchableOpacity
//                   onPress={() => {
//                     setShowTractorModelDropdown(false);
//                     setShowTiresMakeDropdown(false);
//                     setShowFipMakeDropdown(false);
//                     setShowBatteryMakeDropdown(false);
//                     setShowPaymentStatusDropdown(false);
//                     setShowFinancerDropdown(false);
//                     setShowHypothecationDropdown(false);
//                     setShowRelationDropdown(false);
//                   }}
//                   style={styles.closeButton}>
//                   <Icon name="close" size={24} color="#000" />
//                 </TouchableOpacity>
//               </View>
//               <FlatList
//                 data={
//                   showTractorModelDropdown ? tractorModels :
//                   showTiresMakeDropdown ? tiresMakes :
//                   showFipMakeDropdown ? fipMakes :
//                   showBatteryMakeDropdown ? batteryMakes :
//                   showPaymentStatusDropdown ? paymentStatuses :
//                   showFinancerDropdown ? hypothecationOptions :
//                   showHypothecationDropdown ? hypothecationOptions :
//                   showRelationDropdown ? relationOptions : []
//                 }
//                 renderItem={renderDropdownItem}
//                 keyExtractor={(item, index) => index.toString()}
//                 style={styles.dropdownList}
//               />
//             </View>
//           </View>
//         </Modal>
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     paddingVertical: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   headerTitle: {
//     fontSize: 20,
//     color: 'white',
//     fontFamily:"Inter_28pt-SemiBold"
//   },
//   editModeText: {
//     fontSize: 12,
//     color: '#f0e6ff',
//     fontFamily: 'Inter_28pt-SemiBold',
//     marginTop: 5,
//   },
//   scrollView: {
//     flex: 1,
//     padding: 15,
//   },
//   formNoContainer: {
//     marginBottom: 15,
//   },
//   formNoInputContainer: {
//     width: '100%',
//   },
//   inputGradient: {
//     borderRadius: 8,
//     padding: 1.2,
//   },
//   textInput: {
//     backgroundColor: '#fff',
//     padding: 15,
//     borderRadius: 8,
//     fontSize: 14,
//     color: '#000',
//   },
//   iconButton: {
//     padding: 4,
//     marginRight: 8,
//   },
//   deliveryModeContainer: {
//     marginBottom: 10,
//   },
//   sectionLabel: {
//     fontSize: 17,
//     marginBottom: 10,
//     color: '#000',
//     fontFamily:"Inter_28pt-SemiBold",
//     marginTop: 15,
//   },
//   deliveryModeButtons: {
//     flexDirection: 'row',
//   },
//   deliveryModeButton: {
//     marginHorizontal: 5,
//     borderRadius: 8,
//   },
//   deliveryModeGradient: {
//     padding: 1,
//     borderRadius: 8,
//   },
//   deliveryModeText: {
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     textAlign: 'center',
//     backgroundColor: '#fff',
//     color: '#000',
//     borderRadius: 8,
//     fontSize: 14,
//   },
//   deliveryModeTextSelected: {
//     color: '#fff',
//     backgroundColor: 'transparent',
//   },
//   sectionHeading: {
//     fontSize: 17,
//     fontFamily:"Inter_28pt-SemiBold",
//     color: '#000',
//     marginBottom: 10,
//     marginTop: 10,
//   },
//   inputRow: {
//     marginVertical: 10,
//   },
//   inputContainer: {
//     flex: 1,
//   },
//   fullWidthInputContainer: {
//     width: '100%',
//     marginBottom: 1,
//   },
//   dropdownInput: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     backgroundColor: '#fff',
//     padding: 12,
//     borderRadius: 8,
//   },
//   selectedText: {
//     fontSize: 14,
//     color: '#000',
//   },
//   placeholderText: {
//     fontSize: 14,
//     color: '#666',
//   },
//   inputWithIcon: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderRadius: 8,
//   },
//   radioSection: {
//     marginBottom: 20,
//   },
//   radioLabel: {
//     fontSize: 17,
//     marginBottom: 15,
//     color: '#000',
//     fontWeight: '500',
//     marginTop: 10,
//   },
//   radioOptions: {
//     flexDirection: 'row',
//   },
//   radioOption: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginRight: 20,
//   },
//   radioGradient: {
//     width: 25,
//     height: 25,
//     borderRadius: 3,
//     marginRight: 10,
//   },
//   radioInner: {
//     width: 25,
//     height: 25,
//     borderRadius: 1,
//     backgroundColor: 'transparent',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   radioText: {
//     fontSize: 17,
//     color: '#000',
//     fontFamily:"Inter_28pt-Regular"
//   },
//   accessoriesHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 5,
//   },
//   accessoriesGrid: {
//     marginBottom: 0,
//   },
//   accessoryItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: '70%',
//     marginBottom: 25,
//   },
//   accessoryCheckbox: {
//     width: 25,
//     height: 25,
//     borderRadius: 4,
//     padding: 0,
//     marginRight: 8,
//   },
//   accessoryCheckboxInner: {
//     width: 25,
//     height: 25,
//     borderRadius: 3,
//     backgroundColor: 'transparent',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   accessoryText: {
//     fontSize: 14.5,
//     color: '#000',
//     flex: 1,
//     fontFamily:"Inter_28pt-Regular"
//   },
//   buttonsContainer: {
//     marginTop: 20,
//     marginBottom: 30,
//   },
//   submitButton: {
//     backgroundColor: '#7E5EA9',
//     padding: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   homeButton: {
//     backgroundColor: '#20AEBC',
//     padding: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontFamily:"Inter_28pt-SemiBold"
//   },
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
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     borderRadius: 10,
//     width: '90%',
//     maxHeight: '80%',
//   },
//   modalHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f0f0',
//   },
//   modalTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   closeButton: {
//     padding: 4,
//   },
//   dropdownList: {
//     maxHeight: 300,
//   },
//   dropdownItem: {
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f0f0',
//   },
//   dropdownItemText: {
//     fontSize: 14,
//     color: '#333',
//   },
//   termsSection: {
//     marginBottom: 20,
//     borderRadius: 10,
//     marginTop: 10,
//   },
//   termsHeading: {
//     fontSize: 16,
//     fontFamily:"Inter_28pt-SemiBold",
//     marginBottom: 10,
//     color: '#000',
//   },
//   termItem: {
//     fontSize: 12,
//     color: '#333',
//     marginBottom: 10,
//     lineHeight: 16,
//     fontFamily:"Inter_28pt-Medium"
//   },
//   termsCheckbox: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 10,
//     backgroundColor: '#fff',
//     borderRadius: 8,
//   },
//   checkboxGradient: { borderRadius: 4, padding: 1, marginRight: 10 },
//   checkboxInner: {
//     width: 20,
//     height: 20,
//     borderRadius: 3,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   checkboxInnerSelected: { backgroundColor: '#12C857' },
//   termsCheckboxText: {
//     fontSize: 14,
//     color: '#000',
//   },
//   signatureSection: {
//     marginBottom: 20,
//   },
//   signatureRow: {
//     marginTop: 20,
//   },
//   signatureBox: {
//     flex: 1,
//     height: 55,
//     borderWidth: 1,
//     borderColor: '#00000080',
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginHorizontal: 5,
//     borderStyle: 'dashed',
//     marginBottom: 10,
//   },
//   signatureText: {
//     fontSize: 12,
//     color: '#00000099',
//     textAlign: 'center',
//   },
//   previewImage: {
//     width: '100%',
//     height: '100%',
//     borderRadius: 10,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginBottom: 12,
//   },
//   button: {
//     paddingHorizontal: 15,
//     paddingVertical: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//    button1: {
//     paddingHorizontal: 45,
//     paddingVertical: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   buttonText1: {
//     color: '#fff',
//     fontFamily:"Inter_28pt-SemiBold",
//   },
//   disabledButton: {
//     opacity: 0.6,
//   },
//    formNo: {
//     fontSize: 13,
//     marginVertical: 10,
//     fontFamily: 'Inter_28pt-SemiBold',
//     paddingHorizontal: 5,
//   },
//   branchSection: {
//     marginBottom: 15,
//   },
//   representativeSection: {
//     marginBottom: 15,
//   },
// });

// export default DeliveryChallan;

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

// const DeliveryChallan = ({navigation, route}) => {
//   const insets = useSafeAreaInsets();
  
//   const [userId, setUserId] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [existingFormId, setExistingFormId] = useState(null);
//   const [acceptTerms, setAcceptTerms] = useState(false);

//   // QR Scanner States
//   const [showChassisScanner, setShowChassisScanner] = useState(false);
//   const [showEngineScanner, setShowEngineScanner] = useState(false);
//   const [hasCameraPermission, setHasCameraPermission] = useState(false);

//   const [showTractorModelDropdown, setShowTractorModelDropdown] = useState(false);
//   const [showTiresMakeDropdown, setShowTiresMakeDropdown] = useState(false);
//   const [showFipMakeDropdown, setShowFipMakeDropdown] = useState(false);
//   const [showBatteryMakeDropdown, setShowBatteryMakeDropdown] = useState(false);
//   const [showPaymentStatusDropdown, setShowPaymentStatusDropdown] = useState(false);
//   const [showFinancerDropdown, setShowFinancerDropdown] = useState(false);
//   const [showHypothecationDropdown, setShowHypothecationDropdown] = useState(false);
//   const [showRelationDropdown, setShowRelationDropdown] = useState(false);
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [showManufactureDatePicker, setShowManufactureDatePicker] = useState(false);

//   const [formData, setFormData] = useState({
//     formNo: '',
//     date: null,
//     deliveryMode: 'Customer',
//     challanCreatedBy: '',
//     customerName: '',
//     parentage: '',
//     address: '',
//     hypothecation: '',
//     hypothecationOther: '',
//     mobileNo: '',
//     areYouCustomer: '',
//     tractorName: '',
//     tractorModel: '',
//     chassisNo: '',
//     engineNo: '',
//     yearOfManufacture: '',
//     tiresMake: '',
//     tiresMakeOther: '',
//     fipMake: '',
//     fipMakeOther: '',
//     batteryMake: '',
//     batteryMakeOther: '',
//     dealPrice: '',
//     cashPaid: '',
//     financeAmountPaid: '',
//     totalPaid: '',
//     balanceAmount: '',
//     paymentStatus: '',
//     financerName: '',
//     financerOther: '',
//     // Branch fields
//     branchName: '',
//     branchPersonName: '',
//     branchAddress: '',
//     branchMobileNumber: '',
//     // Representative fields
//     representativeName: '',
//     representativeFatherName: '',
//     representativeAddress: '',
//     representativeMobileNumber: '',
//     representativeRelation: '',
//     representativeRelationOther: '',
//   });

//   // Image states for signatures
//   const [customerSignature, setCustomerSignature] = useState(null);
//   const [managerSignature, setManagerSignature] = useState(null);
//   const [driverSignature, setDriverSignature] = useState(null);

//   const [accessories, setAccessories] = useState({
//     bumper: false,
//     cultivator: false,
//     leveler: false,
//     rallyFenderSeats: false,
//     weightsRear: false,
//     waterTanker: false,
//     trolly: false,
//     weightFront: false,
//     rearTowingHook: false,
//     hood: false,
//     ptoPully: false,
//     drawbar: false,
//     cageWheels: false,
//     tool: false,
//     toplink: false,
//   });

//   const tractorModels = [
//     '3028EN', '3036EN', '3036E', '5105', '5105 4WD', 
//     '5050D Gear Pro', '5210 Gear Pro', '5050D 4WD Gear Pro', 
//     '5210 4WD Gear Pro', '5310 CRDI', '5310 4WD CRDI', 
//     '5405 CRDI', '5405 4WD CRDI', '5075 2WD', '5075 4WD'
//   ];

//   const tiresMakes = ['MRF', 'CEAT', 'Apollo', 'BKT', 'Goodyear', 'Bridgestone', 'Other'];
//   const fipMakes = ['Bosch', 'Delphi', 'Denso', 'Siemens', 'Stanadyne', 'Other'];
//   const batteryMakes = ['Exide', 'Amaron', 'Luminous', 'Su-Kam', 'Hankook', 'Other'];
//   const paymentStatuses = ['Paid', 'Pending', 'Partial', 'Due', 'Completed'];
//   const hypothecationOptions = [
//     'John Deere Financial India Private Limited',
//     'The Jammu and Kashmir Bank Limited',
//     'Nil',
//     'Other'
//   ];
//   const relationOptions = ['Father', 'Mother', 'Friend', 'Spouse', 'Brother', 'Sister', 'Son', 'Other'];

//   // Camera Permission Function for QR Scanner
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

//   const handleQRCodeRead = (event) => {
//     const scannedValue = event.nativeEvent.codeStringValue;
//     console.log('QR Code Scanned:', scannedValue);
    
//     if (showChassisScanner) {
//       handleInputChange('chassisNo', scannedValue);
//       setShowChassisScanner(false);
//     } else if (showEngineScanner) {
//       handleInputChange('engineNo', scannedValue);
//       setShowEngineScanner(false);
//     }
//   };

//   const closeScanner = () => {
//     setShowChassisScanner(false);
//     setShowEngineScanner(false);
//   };

//   // QR Scanner Component
//   const renderQRScanner = () => (
//     <Modal
//       visible={showChassisScanner || showEngineScanner}
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
//             {showChassisScanner ? 'Scan Chassis Number' : 'Scan Engine Number'}
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
          
//           // Pre-populate form data with API field names
//           setFormData({
//             formNo: editData.form_no || '',
//             date: editData.select_date ? new Date(editData.select_date) : null,
//             deliveryMode: editData.delivery_mode === 'Self Pickup' ? 'Customer' : 'Branch',
//             challanCreatedBy: editData.challan_created_by || '',
//             customerName: editData.customer_name || '',
//             parentage: editData.parentage || '',
//             address: editData.address || '',
//             hypothecation: editData.hypothecation || '',
//             mobileNo: editData.mobile_no || '',
//             areYouCustomer: editData.is_customer?.toString() || '',
//             tractorName: editData.tractor_name || '',
//             tractorModel: editData.tractor_model || '',
//             chassisNo: editData.chassis_no || '',
//             engineNo: editData.engine_no || '',
//             yearOfManufacture: editData.year_of_manufacture || '',
//             tiresMake: editData.tyres_make || '',
//             fipMake: editData.fip_make || '',
//             batteryMake: editData.battery_make || '',
//             dealPrice: editData.deal_price || '',
//             cashPaid: editData.amount_paid || '',
//             financeAmountPaid: editData.finance_amount_paid || '',
//             totalPaid: editData.total_paid || '',
//             balanceAmount: editData.balance_amount || '',
//             paymentStatus: editData.payment_status || '',
//             financerName: editData.financier_name || '',
//             // Initialize new fields
//             hypothecationOther: editData.hypothecation_other || '',
//             tiresMakeOther: editData.tire_make_other || '',
//             fipMakeOther: editData.fip_make_other || '',
//             batteryMakeOther: editData.battery_make_other || '',
//             financerOther: editData.financier_other || '',
//             branchName: editData.branch_name || '',
//             branchPersonName: editData.branch_person_name || '',
//             branchAddress: editData.branch_address || '',
//             branchMobileNumber: editData.branch_phone || '',
//             representativeName: editData.relative_name || '',
//             representativeFatherName: editData.relative_father_name || '',
//             representativeAddress: editData.relative_address || '',
//             representativeMobileNumber: editData.relative_phone || '',
//             representativeRelation: editData.relative_relation || '',
//             representativeRelationOther: editData.relation_other || '',
//           });

//           // Set accessories from JSON string if available
//           if (editData.accessories) {
//             try {
//               const accessoriesData = typeof editData.accessories === 'string' 
//                 ? JSON.parse(editData.accessories) 
//                 : editData.accessories;
              
//               // Convert accessories data to boolean values
//               const updatedAccessories = {...accessories};
//               Object.keys(accessoriesData).forEach(key => {
//                 if (accessoriesData[key] === 'Yes' || accessoriesData[key] === true) {
//                   const accessoryKey = key.toLowerCase().replace(/\s+/g, '');
//                   if (updatedAccessories.hasOwnProperty(accessoryKey)) {
//                     updatedAccessories[accessoryKey] = true;
//                   }
//                 }
//               });
//               setAccessories(updatedAccessories);
//             } catch (error) {
//               console.log('Error parsing accessories:', error);
//             }
//           }

//           // Set terms acceptance
//           setAcceptTerms(true);
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
//     return `DC${timestamp}`;
//   };

//   // Calculate total paid and balance amount automatically
//   useEffect(() => {
//     const cashPaid = parseFloat(formData.cashPaid) || 0;
//     const financeAmountPaid = parseFloat(formData.financeAmountPaid) || 0;
//     const totalPaid = cashPaid + financeAmountPaid;
//     const dealPrice = parseFloat(formData.dealPrice) || 0;
//     const balance = dealPrice - totalPaid;
    
//     handleInputChange('totalPaid', totalPaid.toString());
//     handleInputChange('balanceAmount', balance.toString());
//   }, [formData.cashPaid, formData.financeAmountPaid, formData.dealPrice]);

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

//   const handleDeliveryModeSelect = (mode) => {
//     handleInputChange('deliveryMode', mode);
//   };

//   const handleAreYouCustomerSelect = (value) => {
//     handleInputChange('areYouCustomer', value === 'Yes' ? '1' : '0');
//   };

//   const handleAccessoryToggle = (accessory) => {
//     setAccessories(prev => ({
//       ...prev,
//       [accessory]: !prev[accessory],
//     }));
//   };

//   const handleTractorModelSelect = (model) => {
//     handleInputChange('tractorModel', model);
//     setShowTractorModelDropdown(false);
//   };

//   const handleTiresMakeSelect = (make) => {
//     handleInputChange('tiresMake', make);
//     setShowTiresMakeDropdown(false);
//   };

//   const handleFipMakeSelect = (make) => {
//     handleInputChange('fipMake', make);
//     setShowFipMakeDropdown(false);
//   };

//   const handleBatteryMakeSelect = (make) => {
//     handleInputChange('batteryMake', make);
//     setShowBatteryMakeDropdown(false);
//   };

//   const handlePaymentStatusSelect = (status) => {
//     handleInputChange('paymentStatus', status);
//     setShowPaymentStatusDropdown(false);
//   };

//   const handleFinancerSelect = (financer) => {
//     handleInputChange('financerName', financer);
//     setShowFinancerDropdown(false);
//   };

//   const handleHypothecationSelect = (option) => {
//     handleInputChange('hypothecation', option);
//     setShowHypothecationDropdown(false);
//   };

//   const handleRelationSelect = (relation) => {
//     handleInputChange('representativeRelation', relation);
//     setShowRelationDropdown(false);
//   };

//   const handleDateChange = (event, selectedDate) => {
//     setShowDatePicker(false);
//     if (selectedDate) {
//       handleInputChange('date', selectedDate);
//     }
//   };

//   const handleManufactureDateChange = (event, selectedDate) => {
//     setShowManufactureDatePicker(false);
//     if (selectedDate) {
//       const month = selectedDate.getMonth() + 1;
//       const year = selectedDate.getFullYear();
//       handleInputChange('yearOfManufacture', `${month}/${year}`);
//     }
//   };

//   const handleDateIconPress = () => {
//     setShowDatePicker(true);
//   };

//   const handleManufactureDateIconPress = () => {
//     setShowManufactureDatePicker(true);
//   };

//   const validateForm = () => {
//     const requiredFields = [
//       'customerName', 'parentage', 'address', 
//       'mobileNo', 'tractorName', 'tractorModel', 'chassisNo', 
//       'engineNo', 'yearOfManufacture', 'dealPrice', 'paymentStatus'
//     ];

//     for (const field of requiredFields) {
//       if (!formData[field] || formData[field].toString().trim() === '') {
//         Alert.alert('Validation Error', `Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
//         return false;
//       }
//     }

//     if (!formData.areYouCustomer) {
//       Alert.alert('Validation Error', 'Please select if you are the customer');
//       return false;
//     }

//     // Branch validation
//     if (formData.deliveryMode === 'Branch') {
//       const branchFields = ['branchName', 'branchPersonName', 'branchAddress', 'branchMobileNumber'];
//       for (const field of branchFields) {
//         if (!formData[field] || formData[field].toString().trim() === '') {
//           Alert.alert('Validation Error', `Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
//           return false;
//         }
//       }
//     }

//     // Representative validation
//     if (formData.areYouCustomer === '0') {
//       const representativeFields = ['representativeName', 'representativeFatherName', 'representativeAddress', 'representativeMobileNumber', 'representativeRelation'];
//       for (const field of representativeFields) {
//         if (!formData[field] || formData[field].toString().trim() === '') {
//           Alert.alert('Validation Error', `Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
//           return false;
//         }
//       }
//       if (formData.representativeRelation === 'Other' && (!formData.representativeRelationOther || formData.representativeRelationOther.trim() === '')) {
//         Alert.alert('Validation Error', 'Please specify the relation');
//         return false;
//       }
//     }

//     if (!customerSignature) {
//       Alert.alert('Validation Error', 'Please add customer signature');
//       return false;
//     }

//     if (!managerSignature) {
//       Alert.alert('Validation Error', 'Please add manager signature');
//       return false;
//     }

//     if (!driverSignature) {
//       Alert.alert('Validation Error', 'Please add driver signature');
//       return false;
//     }

//     // Checkbox validation - form will only submit when checkbox is ticked
//     if (!acceptTerms) {
//       Alert.alert('Validation Error', 'Please accept the terms and conditions by ticking the checkbox');
//       return false;
//     }

//     return true;
//   };

//   const prepareAccessoriesData = () => {
//     const accessoriesData = {};
    
//     // Map our state keys to the expected API keys
//     const accessoryMapping = {
//       bumper: 'Bumper',
//       cultivator: 'Cultivator',
//       leveler: 'Leveler',
//       rallyFenderSeats: 'Rally Fender Seats',
//       weightsRear: 'Weights Rear',
//       waterTanker: 'Water Tanker',
//       trolly: 'Trolly',
//       weightFront: 'Weight Front',
//       rearTowingHook: 'Rear Towing Hook',
//       hood: 'Hood',
//       ptoPully: 'PTO Pully',
//       drawbar: 'Drawbar',
//       cageWheels: 'Cage Wheels',
//       tool: 'Tool',
//       toplink: 'Top Link'
//     };

//     Object.keys(accessories).forEach(key => {
//       if (accessoryMapping[key]) {
//         accessoriesData[accessoryMapping[key]] = accessories[key] ? 'Yes' : 'No';
//       }
//     });
    
//     // Add empty Other array as shown in API example
//     accessoriesData.Other = [];
    
//     return JSON.stringify(accessoriesData);
//   };

//   const prepareFormData = () => {
//     const formDataToSend = new FormData();

//     // Add form data with exact field names as expected by API
//     formDataToSend.append('user_id', userId);
//     formDataToSend.append('form_no', formData.formNo || generateFormNo());
//     formDataToSend.append('select_date', formData.date ? formData.date.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]);
//     formDataToSend.append('delivery_mode', formData.deliveryMode === 'Customer' ? 'Self Pickup' : 'Branch');
//     formDataToSend.append('challan_created_by', formData.challanCreatedBy || 'Admin');
//     formDataToSend.append('customer_name', formData.customerName);
//     formDataToSend.append('parentage', formData.parentage);
//     formDataToSend.append('address', formData.address);
//     formDataToSend.append('hypothecation', formData.hypothecation || '');
//     formDataToSend.append('hypothecation_other', formData.hypothecationOther || '');
//     formDataToSend.append('mobile_no', formData.mobileNo);
//     formDataToSend.append('is_customer', formData.areYouCustomer);
//     formDataToSend.append('tractor_name', formData.tractorName);
//     formDataToSend.append('tractor_model', formData.tractorModel);
//     formDataToSend.append('chassis_no', formData.chassisNo);
//     formDataToSend.append('engine_no', formData.engineNo);
//     formDataToSend.append('year_of_manufacture', formData.yearOfManufacture);
//     formDataToSend.append('tyres_make', formData.tiresMake || '');
//     formDataToSend.append('fip_make', formData.fipMake || '');
//     formDataToSend.append('battery_make', formData.batteryMake || '');
//     formDataToSend.append('deal_price', formData.dealPrice);
//     formDataToSend.append('amount_paid', formData.cashPaid || '0');
//     formDataToSend.append('finance_amount_paid', formData.financeAmountPaid || '0');
//     formDataToSend.append('total_paid', formData.totalPaid || '0');
//     formDataToSend.append('balance_amount', formData.balanceAmount || '0');
//     formDataToSend.append('payment_status', formData.paymentStatus);
//     formDataToSend.append('financier_name', formData.financerName || '');
//     formDataToSend.append('accessories', prepareAccessoriesData());

//     // Add branch fields with correct API field names
//     formDataToSend.append('branch_name', formData.branchName || '');
//     formDataToSend.append('branch_person_name', formData.branchPersonName || '');
//     formDataToSend.append('branch_address', formData.branchAddress || '');
//     formDataToSend.append('branch_phone', formData.branchMobileNumber || '');

//     // Add representative fields with correct API field names
//     formDataToSend.append('relative_name', formData.representativeName || '');
//     formDataToSend.append('relative_father_name', formData.representativeFatherName || '');
//     formDataToSend.append('relative_address', formData.representativeAddress || '');
//     formDataToSend.append('relative_phone', formData.representativeMobileNumber || '');
//     formDataToSend.append('relative_relation', formData.representativeRelation || '');
//     formDataToSend.append('relation_other', formData.representativeRelationOther || '');

//     // Add other fields for tires, fip, battery
//     if (formData.tiresMake === 'Other') {
//       formDataToSend.append('tire_make_other', formData.tiresMakeOther || '');
//     }
//     if (formData.fipMake === 'Other') {
//       formDataToSend.append('fip_make_other', formData.fipMakeOther || '');
//     }
//     if (formData.batteryMake === 'Other') {
//       formDataToSend.append('battery_make_other', formData.batteryMakeOther || '');
//     }

//     // Add images with proper file names
//     if (customerSignature) {
//       formDataToSend.append('customer_signature', {
//         uri: customerSignature.uri,
//         type: customerSignature.type || 'image/jpeg',
//         name: `customer_signature_${Date.now()}.jpg`,
//       });
//     }

//     if (managerSignature) {
//       formDataToSend.append('manager_signature', {
//         uri: managerSignature.uri,
//         type: managerSignature.type || 'image/jpeg',
//         name: `manager_signature_${Date.now()}.jpg`,
//       });
//     }

//     if (driverSignature) {
//       formDataToSend.append('driver_signature', {
//         uri: driverSignature.uri,
//         type: driverSignature.type || 'image/jpeg',
//         name: `driver_signature_${Date.now()}.jpg`,
//       });
//     }

//     // For update, add the form ID
//     if (isEditMode && existingFormId) {
//       formDataToSend.append('id', existingFormId);
//     }

//     // Log form data for debugging
//     console.log('Form Data being sent:');
//     formDataToSend._parts.forEach(([key, value]) => {
//       if (typeof value !== 'object') {
//         console.log(`${key}: ${value}`);
//       } else {
//         console.log(`${key}: [File]`);
//       }
//     });

//     return formDataToSend;
//   };

//   const handleSubmit = async () => {
//     if (!userId) {
//       Alert.alert('Error', 'User ID not found. Please login again.');
//       return;
//     }

//     // Check if checkbox is ticked before validation
//     if (!acceptTerms) {
//       Alert.alert('Terms Not Accepted', 'Please accept the terms and conditions by ticking the checkbox before submitting the form.');
//       return;
//     }

//     if (!validateForm()) {
//       return;
//     }

//     setLoading(true);

//     try {
//       const formDataToSend = prepareFormData();
      
//       const url = isEditMode 
//         ? 'https://argosmob.uk/makroo/public/api/v1/delivery-challan/form/update'
//         : 'https://argosmob.uk/makroo/public/api/v1/delivery-challan/form/save';

//       console.log('Making API call to:', url);

//       const response = await axios.post(url, formDataToSend, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           'Accept': 'application/json',
//         },
//         timeout: 30000,
//       });

//       console.log('API Response:', response.data);

//       if (response.data && (response.data.success === true || response.data.status === 'success' || response.data.message?.toLowerCase().includes('success'))) {
//         Alert.alert(
//           'Success', 
//           isEditMode ? 'Delivery Challan updated successfully!' : 'Delivery Challan submitted successfully!',
//           [
//             {
//               text: 'OK',
//               onPress: () => navigation.navigate('Dashboard')
//             }
//           ]
//         );
//       } else {
//         let errorMessage = 'Submission failed';
        
//         if (response.data && response.data.message) {
//           errorMessage = response.data.message;
//         } else if (response.data && response.data.error) {
//           errorMessage = response.data.error;
//         } else if (response.data && response.data.errors) {
//           const validationErrors = Object.values(response.data.errors).flat();
//           errorMessage = validationErrors.join(', ');
//         } else if (response.data) {
//           errorMessage = 'Submission completed but no success confirmation received';
//           console.log('Unclear response structure:', response.data);
//         }
        
//         Alert.alert('Submission Failed', errorMessage);
//       }
//     } catch (error) {
//       console.log('Submission Error:', error);
//       console.log('Error Response:', error.response?.data);
      
//       if (error.response) {
//         let errorMessage = 'Submission failed. Please try again.';
        
//         if (error.response.status === 422) {
//           if (error.response.data.errors) {
//             const validationErrors = Object.values(error.response.data.errors).flat();
//             errorMessage = `Validation Error: ${validationErrors.join(', ')}`;
//           } else if (error.response.data.message) {
//             errorMessage = error.response.data.message;
//           }
//         } else if (error.response.data?.message) {
//           errorMessage = error.response.data.message;
//         } else if (error.response.data?.error) {
//           errorMessage = error.response.data.error;
//         }
        
//         Alert.alert('Submission Failed', errorMessage);
//       } else if (error.request) {
//         Alert.alert('Network Error', 'Please check your internet connection and try again.');
//       } else {
//         Alert.alert('Error', 'Something went wrong. Please try again.');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleHome = () => {
//     navigation.navigate('Dashboard');
//   };

//   const handleGeneratePDF = () => {
//     Alert.alert('PDF', 'Delivery Challan PDF generated!');
//   };

//   const handleAddItem = () => {
//     Alert.alert('Add Item', 'Add new accessory item');
//   };

//   const renderDropdownItem = ({item}) => (
//     <TouchableOpacity
//       style={styles.dropdownItem}
//       onPress={() => {
//         if (showTractorModelDropdown) handleTractorModelSelect(item);
//         else if (showTiresMakeDropdown) handleTiresMakeSelect(item);
//         else if (showFipMakeDropdown) handleFipMakeSelect(item);
//         else if (showBatteryMakeDropdown) handleBatteryMakeSelect(item);
//         else if (showPaymentStatusDropdown) handlePaymentStatusSelect(item);
//         else if (showFinancerDropdown) handleFinancerSelect(item);
//         else if (showHypothecationDropdown) handleHypothecationSelect(item);
//         else if (showRelationDropdown) handleRelationSelect(item);
//       }}>
//       <Text style={styles.dropdownItemText}>{item}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={[styles.container, {paddingTop: insets.top,paddingBottom: insets.bottom}]}>
//       {/* Header */}
//       <LinearGradient
//         colors={['#7E5EA9', '#20AEBC']}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 0 }}
//         style={styles.header}>
//         <Text style={styles.headerTitle}>Delivery Challan</Text>
//         {isEditMode && <Text style={styles.editModeText}>Edit Mode</Text>}
//       </LinearGradient>

//       <ScrollView style={styles.scrollView}>
//         {/* Form No */}
//         <Text style={styles.sectionHeading}>Create Delivery Challan</Text>

//         {/* Date */}
//          <View style={styles.inputContainer}>
//             <LinearGradient
//               colors={['#7E5EA9', '#20AEBC']}
//                start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 0 }}
//               style={styles.inputGradient}>
//               <View style={styles.inputWithIcon}>
//                 <TouchableOpacity
//                   style={[styles.textInput, {flex: 1}]}
//                   onPress={handleDateIconPress}
//                   disabled={loading}
//                 >
//                   <Text style={formData.date ? styles.selectedText : styles.placeholderText}>
//                     {formData.date ? formData.date.toLocaleDateString() : 'Select Date'}
//                   </Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity 
//                   style={styles.iconButton}
//                   onPress={handleDateIconPress}
//                   disabled={loading}
//                 >
//                   <Icon name="calendar-today" size={20} color="#666" />
//                 </TouchableOpacity>
//                 {showDatePicker && (
//                   <DateTimePicker
//                     value={formData.date || new Date()}
//                     mode="date"
//                     display={Platform.OS === 'ios' ? 'spinner' : 'default'}
//                     onChange={handleDateChange}
//                   />
//                 )}
//               </View>
//             </LinearGradient>
//           </View>

//         {/* Delivery Mode */}
//         <View style={styles.deliveryModeContainer}>
//           <Text style={styles.sectionLabel}>Delivery Mode</Text>
//           <View style={styles.deliveryModeButtons}>
//             <TouchableOpacity
//               style={[
//                 styles.deliveryModeButton,
//                 formData.deliveryMode === 'Customer' && styles.deliveryModeSelected
//               ]}
//               onPress={() => handleDeliveryModeSelect('Customer')}
//               disabled={loading}
//             >
//               <LinearGradient
//                 colors={formData.deliveryMode === 'Customer' ? ['#7E5EA9', '#20AEBC'] : ['#7E5EA9', '#20AEBC']}
//                 start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 0 }}
//                 style={styles.deliveryModeGradient}>
//                 <Text style={[
//                   styles.deliveryModeText,
//                   formData.deliveryMode === 'Customer' && styles.deliveryModeTextSelected
//                 ]}>
//                   Customer
//                 </Text>
//               </LinearGradient>
//             </TouchableOpacity>
            
//             <TouchableOpacity
//               style={[
//                 styles.deliveryModeButton,
//                 formData.deliveryMode === 'Branch' && styles.deliveryModeSelected
//               ]}
//               onPress={() => handleDeliveryModeSelect('Branch')}
//               disabled={loading}
//             >
//               <LinearGradient
//                 colors={formData.deliveryMode === 'Branch' ? ['#7E5EA9', '#20AEBC'] : ['#7E5EA9', '#20AEBC']}
//                 start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 0 }}
//                 style={styles.deliveryModeGradient}>
//                 <Text style={[
//                   styles.deliveryModeText,
//                   formData.deliveryMode === 'Branch' && styles.deliveryModeTextSelected
//                 ]}>
//                   Branch
//                 </Text>
//               </LinearGradient>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Branch Fields - Conditionally Rendered */}
//         {formData.deliveryMode === 'Branch' && (
//           <View style={styles.branchSection}>
//             <Text style={styles.sectionHeading}>Branch Details</Text>
            
//             {/* Branch Name */}
//             <View style={styles.inputRow}>
//               <View style={styles.fullWidthInputContainer}>
//                 <LinearGradient
//                   colors={['#7E5EA9', '#20AEBC']}
//                   start={{ x: 0, y: 0 }}
//                   end={{ x: 1, y: 0 }}
//                   style={styles.inputGradient}>
//                   <TextInput
//                     style={styles.textInput}
//                     value={formData.branchName}
//                     onChangeText={(text) => handleInputChange('branchName', text)}
//                     placeholder="Branch Name"
//                     placeholderTextColor="#666"
//                     editable={!loading}
//                   />
//                 </LinearGradient>
//               </View>
//             </View>

//             {/* Branch Person Name */}
//             <View style={styles.inputRow}>
//               <View style={styles.fullWidthInputContainer}>
//                 <LinearGradient
//                   colors={['#7E5EA9', '#20AEBC']}
//                   start={{ x: 0, y: 0 }}
//                   end={{ x: 1, y: 0 }}
//                   style={styles.inputGradient}>
//                   <TextInput
//                     style={styles.textInput}
//                     value={formData.branchPersonName}
//                     onChangeText={(text) => handleInputChange('branchPersonName', text)}
//                     placeholder="Branch Person Name"
//                     placeholderTextColor="#666"
//                     editable={!loading}
//                   />
//                 </LinearGradient>
//               </View>
//             </View>

//             {/* Branch Address */}
//             <View style={styles.inputRow}>
//               <View style={styles.fullWidthInputContainer}>
//                 <LinearGradient
//                   colors={['#7E5EA9', '#20AEBC']}
//                   start={{ x: 0, y: 0 }}
//                   end={{ x: 1, y: 0 }}
//                   style={styles.inputGradient}>
//                   <TextInput
//                     style={styles.textInput}
//                     value={formData.branchAddress}
//                     onChangeText={(text) => handleInputChange('branchAddress', text)}
//                     placeholder="Branch Address"
//                     placeholderTextColor="#666"
//                     multiline
//                     numberOfLines={2}
//                     editable={!loading}
//                   />
//                 </LinearGradient>
//               </View>
//             </View>

//             {/* Branch Mobile Number */}
//             <View style={styles.inputRow}>
//               <View style={styles.fullWidthInputContainer}>
//                 <LinearGradient
//                   colors={['#7E5EA9', '#20AEBC']}
//                   start={{ x: 0, y: 0 }}
//                   end={{ x: 1, y: 0 }}
//                   style={styles.inputGradient}>
//                   <TextInput
//                     style={styles.textInput}
//                     value={formData.branchMobileNumber}
//                     onChangeText={(text) => handleInputChange('branchMobileNumber', text)}
//                     placeholder="Branch Mobile Number"
//                     placeholderTextColor="#666"
//                     keyboardType="phone-pad"
//                     editable={!loading}
//                   />
//                 </LinearGradient>
//               </View>
//             </View>
//           </View>
//         )}

//         {/* Customer Details Heading */}
//         <Text style={styles.sectionHeading}>Customer Details</Text>

//         {/* Challan Created By - Changed to TextInput */}
//         <View style={styles.inputRow}>
//           <View style={styles.inputContainer}>
//             <LinearGradient
//               colors={['#7E5EA9', '#20AEBC']}
//                start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 0 }}
//               style={styles.inputGradient}>
//               <TextInput
//                 style={styles.textInput}
//                 value={formData.challanCreatedBy}
//                 onChangeText={(text) => handleInputChange('challanCreatedBy', text)}
//                 placeholder="Challan Created By"
//                 placeholderTextColor="#666"
//                 editable={!loading}
//               />
//             </LinearGradient>
//           </View>
//         </View>

//         {/* Customer Name & Parentage */}
//         <View style={styles.inputRow}>
//           <View style={styles.inputContainer}>
//             <LinearGradient
//               colors={['#7E5EA9', '#20AEBC']}
//               start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 0 }}
//               style={styles.inputGradient}>
//               <TextInput
//                 style={styles.textInput}
//                 value={formData.customerName}
//                 onChangeText={(text) => handleInputChange('customerName', text)}
//                 placeholder="Customer Name"
//                 placeholderTextColor="#666"
//                 editable={!loading}
//               />
//             </LinearGradient>
//           </View>
//           <View style={{marginBottom: 15}} />
//           <View style={styles.inputContainer}>
//             <LinearGradient
//               colors={['#7E5EA9', '#20AEBC']}
//               start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 0 }}
//               style={styles.inputGradient}>
//               <TextInput
//                 style={styles.textInput}
//                 value={formData.parentage}
//                 onChangeText={(text) => handleInputChange('parentage', text)}
//                 placeholder="Parentage"
//                 placeholderTextColor="#666"
//                 keyboardType="numeric"
//                 editable={!loading}
//               />
//             </LinearGradient>
//           </View>
//         </View>

//         {/* Address */}
//         <View style={styles.inputRow}>
//           <View style={styles.fullWidthInputContainer}>
//             <LinearGradient
//               colors={['#7E5EA9', '#20AEBC']}
//                start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 0 }}
//               style={styles.inputGradient}>
//               <TextInput
//                 style={[styles.textInput,]}
//                 value={formData.address}
//                 onChangeText={(text) => handleInputChange('address', text)}
//                 placeholder="Enter Address"
//                 placeholderTextColor="#666"
//                 multiline
//                 numberOfLines={1}
//                 editable={!loading}
//               />
//             </LinearGradient>
//           </View>
//         </View>

//         {/* Hypothecation - Changed to Dropdown */}
//         <View style={styles.inputRow}>
//           <View style={styles.inputContainer}>
//             <LinearGradient
//               colors={['#7E5EA9', '#20AEBC']}
//                start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 0 }}
//               style={styles.inputGradient}>
//               <TouchableOpacity
//                 style={styles.dropdownInput}
//                 onPress={() => setShowHypothecationDropdown(true)}
//                 disabled={loading}
//               >
//                 <Text style={formData.hypothecation ? styles.selectedText : styles.placeholderText}>
//                   {formData.hypothecation || 'Select Hypothecation'}
//                 </Text>
//                 <Icon name="keyboard-arrow-down" size={24} color="#666" />
//               </TouchableOpacity>
//             </LinearGradient>
//           </View>
//         </View>

//         {/* Hypothecation Other - Conditionally Rendered */}
//         {formData.hypothecation === 'Other' && (
//           <View style={styles.inputRow}>
//             <View style={styles.fullWidthInputContainer}>
//               <LinearGradient
//                 colors={['#7E5EA9', '#20AEBC']}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 0 }}
//                 style={styles.inputGradient}>
//                 <TextInput
//                   style={styles.textInput}
//                   value={formData.hypothecationOther}
//                   onChangeText={(text) => handleInputChange('hypothecationOther', text)}
//                   placeholder="Enter Other Hypothecation"
//                   placeholderTextColor="#666"
//                   editable={!loading}
//                 />
//               </LinearGradient>
//             </View>
//           </View>
//         )}

//         {/* Mobile No */}
//         <View style={styles.inputRow}>
//           <View style={styles.inputContainer}>
//             <LinearGradient
//               colors={['#7E5EA9', '#20AEBC']}
//                start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 0 }}
//               style={styles.inputGradient}>
//               <TextInput
//                 style={styles.textInput}
//                 value={formData.mobileNo}
//                 onChangeText={(text) => handleInputChange('mobileNo', text)}
//                 placeholder="Mobile No."
//                 placeholderTextColor="#666"
//                 keyboardType="phone-pad"
//                 editable={!loading}
//               />
//             </LinearGradient>
//           </View>
//         </View>

//         {/* Are You Customer? */}
//         <View style={styles.radioSection}>
//           <Text style={styles.radioLabel}>Are You Customer?</Text>
//           <View style={styles.radioOptions}>
//             {['Yes', 'No'].map((option) => (
//               <TouchableOpacity
//                 key={option}
//                 style={styles.radioOption}
//                 onPress={() => handleAreYouCustomerSelect(option)}
//                 disabled={loading}
//               >
//                 <LinearGradient
//                   colors={formData.areYouCustomer === (option === 'Yes' ? '1' : '0') ? ['#12C857', '#12C857'] : ['#f0f0f0', '#f0f0f0']}
//                   style={styles.radioGradient}>
//                   <View style={styles.radioInner}>
//                     {formData.areYouCustomer === (option === 'Yes' ? '1' : '0') && (
//                       <Icon name="check" size={24} color="#fff" />
//                     )}
//                   </View>
//                 </LinearGradient>
//                 <Text style={styles.radioText}>{option}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>

//         {/* Representative Fields - Conditionally Rendered */}
//         {formData.areYouCustomer === '0' && (
//           <View style={styles.representativeSection}>
//             <Text style={styles.sectionHeading}>Representative Details</Text>
            
//             {/* Representative Name */}
//             <View style={styles.inputRow}>
//               <View style={styles.fullWidthInputContainer}>
//                 <LinearGradient
//                   colors={['#7E5EA9', '#20AEBC']}
//                   start={{ x: 0, y: 0 }}
//                   end={{ x: 1, y: 0 }}
//                   style={styles.inputGradient}>
//                   <TextInput
//                     style={styles.textInput}
//                     value={formData.representativeName}
//                     onChangeText={(text) => handleInputChange('representativeName', text)}
//                     placeholder="Representative Name"
//                     placeholderTextColor="#666"
//                     editable={!loading}
//                   />
//                 </LinearGradient>
//               </View>
//             </View>

//             {/* Representative Father's Name */}
//             <View style={styles.inputRow}>
//               <View style={styles.fullWidthInputContainer}>
//                 <LinearGradient
//                   colors={['#7E5EA9', '#20AEBC']}
//                   start={{ x: 0, y: 0 }}
//                   end={{ x: 1, y: 0 }}
//                   style={styles.inputGradient}>
//                   <TextInput
//                     style={styles.textInput}
//                     value={formData.representativeFatherName}
//                     onChangeText={(text) => handleInputChange('representativeFatherName', text)}
//                     placeholder="Father's Name"
//                     placeholderTextColor="#666"
//                     editable={!loading}
//                   />
//                 </LinearGradient>
//               </View>
//             </View>

//             {/* Representative Address */}
//             <View style={styles.inputRow}>
//               <View style={styles.fullWidthInputContainer}>
//                 <LinearGradient
//                   colors={['#7E5EA9', '#20AEBC']}
//                   start={{ x: 0, y: 0 }}
//                   end={{ x: 1, y: 0 }}
//                   style={styles.inputGradient}>
//                   <TextInput
//                     style={styles.textInput}
//                     value={formData.representativeAddress}
//                     onChangeText={(text) => handleInputChange('representativeAddress', text)}
//                     placeholder="Representative Address"
//                     placeholderTextColor="#666"
//                     multiline
//                     numberOfLines={2}
//                     editable={!loading}
//                   />
//                 </LinearGradient>
//               </View>
//             </View>

//             {/* Representative Mobile Number */}
//             <View style={styles.inputRow}>
//               <View style={styles.fullWidthInputContainer}>
//                 <LinearGradient
//                   colors={['#7E5EA9', '#20AEBC']}
//                   start={{ x: 0, y: 0 }}
//                   end={{ x: 1, y: 0 }}
//                   style={styles.inputGradient}>
//                   <TextInput
//                     style={styles.textInput}
//                     value={formData.representativeMobileNumber}
//                     onChangeText={(text) => handleInputChange('representativeMobileNumber', text)}
//                     placeholder="Representative Mobile Number"
//                     placeholderTextColor="#666"
//                     keyboardType="phone-pad"
//                     editable={!loading}
//                   />
//                 </LinearGradient>
//               </View>
//             </View>

//             {/* Relation with Owner */}
//             <View style={styles.inputRow}>
//               <View style={styles.inputContainer}>
//                 <LinearGradient
//                   colors={['#7E5EA9', '#20AEBC']}
//                   start={{ x: 0, y: 0 }}
//                   end={{ x: 1, y: 0 }}
//                   style={styles.inputGradient}>
//                   <TouchableOpacity
//                     style={styles.dropdownInput}
//                     onPress={() => setShowRelationDropdown(true)}
//                     disabled={loading}
//                   >
//                     <Text style={formData.representativeRelation ? styles.selectedText : styles.placeholderText}>
//                       {formData.representativeRelation || 'Relation with Owner'}
//                     </Text>
//                     <Icon name="keyboard-arrow-down" size={24} color="#666" />
//                   </TouchableOpacity>
//                 </LinearGradient>
//               </View>
//             </View>

//             {/* Relation Other - Conditionally Rendered */}
//             {formData.representativeRelation === 'Other' && (
//               <View style={styles.inputRow}>
//                 <View style={styles.fullWidthInputContainer}>
//                   <LinearGradient
//                     colors={['#7E5EA9', '#20AEBC']}
//                     start={{ x: 0, y: 0 }}
//                     end={{ x: 1, y: 0 }}
//                     style={styles.inputGradient}>
//                     <TextInput
//                       style={styles.textInput}
//                       value={formData.representativeRelationOther}
//                       onChangeText={(text) => handleInputChange('representativeRelationOther', text)}
//                       placeholder="Enter Other Relation"
//                       placeholderTextColor="#666"
//                       editable={!loading}
//                     />
//                   </LinearGradient>
//                 </View>
//               </View>
//             )}
//           </View>
//         )}

//         {/* Tractor Details Heading */}
//         <Text style={styles.sectionHeading}>Tractor Details</Text>

//         {/* Tractor Name & Model */}
//         <View style={styles.inputRow}>
//           <View style={styles.inputContainer}>
//             <LinearGradient
//               colors={['#7E5EA9', '#20AEBC']}
//                 start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 0 }}
//               style={styles.inputGradient}>
//               <TextInput
//                 style={styles.textInput}
//                 value={formData.tractorName}
//                 onChangeText={(text) => handleInputChange('tractorName', text)}
//                 placeholder="Tractor Name"
//                 placeholderTextColor="#666"
//                 editable={!loading}
//               />
//             </LinearGradient>
//           </View>
//           <View style={{marginBottom: 15}} />
//           <View style={styles.inputContainer}>
//             <LinearGradient
//               colors={['#7E5EA9', '#20AEBC']}
//                 start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 0 }}
//               style={styles.inputGradient}>
//               <TouchableOpacity
//                 style={styles.dropdownInput}
//                 onPress={() => setShowTractorModelDropdown(true)}
//                 disabled={loading}
//               >
//                 <Text style={formData.tractorModel ? styles.selectedText : styles.placeholderText}>
//                   {formData.tractorModel || 'Select Model'}
//                 </Text>
//                 <Icon name="keyboard-arrow-down" size={24} color="#666" />
//               </TouchableOpacity>
//             </LinearGradient>
//           </View>
//         </View>

//         {/* Chassis No & Engine No */}
//         <View style={styles.inputRow}>
//           <View style={styles.inputContainer}>
//             <LinearGradient
//               colors={['#7E5EA9', '#20AEBC']}
//                start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 0 }}
//               style={styles.inputGradient}>
//               <View style={styles.inputWithIcon}>
//                 <TextInput
//                   style={[styles.textInput, {flex: 1}]}
//                   value={formData.chassisNo}
//                   onChangeText={(text) => handleInputChange('chassisNo', text)}
//                   placeholder="Chassis No"
//                   placeholderTextColor="#666"
//                   editable={!loading}
//                 />
//                 <TouchableOpacity 
//                   style={styles.iconButton}
//                   onPress={handleChassisScanPress}
//                   disabled={loading}
//                 >
//                   <Icon name="qr-code-scanner" size={20} color="#666" />
//                 </TouchableOpacity>
//               </View>
//             </LinearGradient>
//           </View>
//           <View style={{marginBottom: 15}} />
//           <View style={styles.inputContainer}>
//             <LinearGradient
//               colors={['#7E5EA9', '#20AEBC']}
//                start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 0 }}
//               style={styles.inputGradient}>
//               <View style={styles.inputWithIcon}>
//                 <TextInput
//                   style={[styles.textInput, {flex: 1}]}
//                   value={formData.engineNo}
//                   onChangeText={(text) => handleInputChange('engineNo', text)}
//                   placeholder="Engine No"
//                   placeholderTextColor="#666"
//                   editable={!loading}
//                 />
//                 <TouchableOpacity 
//                   style={styles.iconButton}
//                   onPress={handleEngineScanPress}
//                   disabled={loading}
//                 >
//                   <Icon name="qr-code-scanner" size={20} color="#666" />
//                 </TouchableOpacity>
//               </View>
//             </LinearGradient>
//           </View>
//         </View>

//         {/* Year of Manufacture - Changed to Month/Year Picker */}
//         <View style={styles.inputRow}>
//           <View style={styles.inputContainer}>
//             <LinearGradient
//               colors={['#7E5EA9', '#20AEBC']}
//                 start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 0 }}
//               style={styles.inputGradient}>
//               <View style={styles.inputWithIcon}>
//                 <TouchableOpacity
//                   style={[styles.textInput, {flex: 1}]}
//                   onPress={handleManufactureDateIconPress}
//                   disabled={loading}
//                 >
//                   <Text style={formData.yearOfManufacture ? styles.selectedText : styles.placeholderText}>
//                     {formData.yearOfManufacture || 'Month/Year of Manufacture'}
//                   </Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity 
//                   style={styles.iconButton}
//                   onPress={handleManufactureDateIconPress}
//                   disabled={loading}
//                 >
//                   <Icon name="calendar-today" size={20} color="#666" />
//                 </TouchableOpacity>
//                 {showManufactureDatePicker && (
//                   <DateTimePicker
//                     value={new Date()}
//                     mode="date"
//                     display={Platform.OS === 'ios' ? 'spinner' : 'default'}
//                     onChange={handleManufactureDateChange}
//                   />
//                 )}
//               </View>
//             </LinearGradient>
//           </View>
//         </View>

//         {/* Tires Make with Other option */}
//         <View style={styles.inputRow}>
//           <View style={styles.inputContainer}>
//             <LinearGradient
//               colors={['#7E5EA9', '#20AEBC']}
//                 start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 0 }}
//               style={styles.inputGradient}>
//               <TouchableOpacity
//                 style={styles.dropdownInput}
//                 onPress={() => setShowTiresMakeDropdown(true)}
//                 disabled={loading}
//               >
//                 <Text style={formData.tiresMake ? styles.selectedText : styles.placeholderText}>
//                   {formData.tiresMake || 'Select Tires Make'}
//                 </Text>
//                 <Icon name="keyboard-arrow-down" size={24} color="#666" />
//               </TouchableOpacity>
//             </LinearGradient>
//           </View>
//         </View>

//         {/* Tires Make Other - Conditionally Rendered */}
//         {formData.tiresMake === 'Other' && (
//           <View style={styles.inputRow}>
//             <View style={styles.fullWidthInputContainer}>
//               <LinearGradient
//                 colors={['#7E5EA9', '#20AEBC']}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 0 }}
//                 style={styles.inputGradient}>
//                 <TextInput
//                   style={styles.textInput}
//                   value={formData.tiresMakeOther}
//                   onChangeText={(text) => handleInputChange('tiresMakeOther', text)}
//                   placeholder="Enter Other Tires Make"
//                   placeholderTextColor="#666"
//                   editable={!loading}
//                 />
//               </LinearGradient>
//             </View>
//           </View>
//         )}

//         {/* FIP Make with Other option */}
//         <View style={styles.inputRow}>
//           <View style={styles.inputContainer}>
//             <LinearGradient
//               colors={['#7E5EA9', '#20AEBC']}
//                 start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 0 }}
//               style={styles.inputGradient}>
//               <TouchableOpacity
//                 style={styles.dropdownInput}
//                 onPress={() => setShowFipMakeDropdown(true)}
//                 disabled={loading}
//               >
//                 <Text style={formData.fipMake ? styles.selectedText : styles.placeholderText}>
//                   {formData.fipMake || 'FIP Make'}
//                 </Text>
//                 <Icon name="keyboard-arrow-down" size={24} color="#666" />
//               </TouchableOpacity>
//             </LinearGradient>
//           </View>
//         </View>

//         {/* FIP Make Other - Conditionally Rendered */}
//         {formData.fipMake === 'Other' && (
//           <View style={styles.inputRow}>
//             <View style={styles.fullWidthInputContainer}>
//               <LinearGradient
//                 colors={['#7E5EA9', '#20AEBC']}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 0 }}
//                 style={styles.inputGradient}>
//                 <TextInput
//                   style={styles.textInput}
//                   value={formData.fipMakeOther}
//                   onChangeText={(text) => handleInputChange('fipMakeOther', text)}
//                   placeholder="Enter Other FIP Make"
//                   placeholderTextColor="#666"
//                   editable={!loading}
//                 />
//               </LinearGradient>
//             </View>
//           </View>
//         )}

//         {/* Battery Make with Other option */}
//         <View style={styles.inputRow}>
//           <View style={styles.inputContainer}>
//             <LinearGradient
//               colors={['#7E5EA9', '#20AEBC']}
//                 start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 0 }}
//               style={styles.inputGradient}>
//               <TouchableOpacity
//                 style={styles.dropdownInput}
//                 onPress={() => setShowBatteryMakeDropdown(true)}
//                 disabled={loading}
//               >
//                 <Text style={formData.batteryMake ? styles.selectedText : styles.placeholderText}>
//                   {formData.batteryMake || 'Select Battery Make'}
//                 </Text>
//                 <Icon name="keyboard-arrow-down" size={24} color="#666" />
//               </TouchableOpacity>
//             </LinearGradient>
//           </View>
//         </View>

//         {/* Battery Make Other - Conditionally Rendered */}
//         {formData.batteryMake === 'Other' && (
//           <View style={styles.inputRow}>
//             <View style={styles.fullWidthInputContainer}>
//               <LinearGradient
//                 colors={['#7E5EA9', '#20AEBC']}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 0 }}
//                 style={styles.inputGradient}>
//                 <TextInput
//                   style={styles.textInput}
//                   value={formData.batteryMakeOther}
//                   onChangeText={(text) => handleInputChange('batteryMakeOther', text)}
//                   placeholder="Enter Other Battery Make"
//                   placeholderTextColor="#666"
//                   editable={!loading}
//                 />
//               </LinearGradient>
//             </View>
//           </View>
//         )}

//         {/* Payment Details Heading */}
//         <Text style={styles.sectionHeading}>Payment Details</Text>

//         {/* Deal Price */}
//         <View style={styles.inputRow}>
//           <View style={styles.inputContainer}>
//             <LinearGradient
//               colors={['#7E5EA9', '#20AEBC']}
//                 start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 0 }}
//               style={styles.inputGradient}>
//               <TextInput
//                 style={styles.textInput}
//                 value={formData.dealPrice}
//                 onChangeText={(text) => handleInputChange('dealPrice', text)}
//                 placeholder="Deal Price"
//                 placeholderTextColor="#666"
//                 keyboardType="numeric"
//                 editable={!loading}
//               />
//             </LinearGradient>
//           </View>
//         </View>

//         {/* Cash Paid & Finance Amount Paid */}
//         <View style={styles.inputRow}>
//           <View style={styles.inputContainer}>
//             <LinearGradient
//               colors={['#7E5EA9', '#20AEBC']}
//                 start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 0 }}
//               style={styles.inputGradient}>
//               <TextInput
//                 style={styles.textInput}
//                 value={formData.cashPaid}
//                 onChangeText={(text) => handleInputChange('cashPaid', text)}
//                 placeholder="Cash Paid"
//                 placeholderTextColor="#666"
//                 keyboardType="numeric"
//                 editable={!loading}
//               />
//             </LinearGradient>
//           </View>
          
//           <View style={styles.inputContainer}>
//          <View style={{marginBottom: 15}} />
//             <LinearGradient
//               colors={['#7E5EA9', '#20AEBC']}
//                 start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 0 }}
//               style={styles.inputGradient}>
//               <TextInput
//                 style={styles.textInput}
//                 value={formData.financeAmountPaid}
//                 onChangeText={(text) => handleInputChange('financeAmountPaid', text)}
//                 placeholder="Finance Amount Paid"
//                 placeholderTextColor="#666"
//                 keyboardType="numeric"
//                 editable={!loading}
//               />
//             </LinearGradient>
//           </View>
//         </View>

//         {/* Total Paid & Balance Amount */}
//         <View style={styles.inputRow}>
//           <View style={styles.inputContainer}>
//             <Text style={{color:"#666",  fontFamily:"Inter_28pt-SemiBold",}}>Total Amount Paid</Text>
//             <LinearGradient
//               colors={['#7E5EA9', '#20AEBC']}
//                 start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 0 }}
//               style={styles.inputGradient}>
//               <TextInput
//                 style={styles.textInput}
//                 value={formData.totalPaid}
//                 onChangeText={(text) => handleInputChange('totalPaid', text)}
//                 placeholder="Total Paid"
//                 placeholderTextColor="#666"
//                 keyboardType="numeric"
//                 editable={!loading}
//               />
//             </LinearGradient>
//           </View>
//           <View style={{marginBottom: 15}} />
//           <View style={styles.inputContainer}>
//               <Text style={{color:"#666",  fontFamily:"Inter_28pt-SemiBold",}}>Total Balance Amount</Text>
//             <LinearGradient
//               colors={['#7E5EA9', '#20AEBC']}
//                 start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 0 }}
//               style={styles.inputGradient}>
//               <TextInput
//                 style={styles.textInput}
//                 value={formData.balanceAmount}
//                 onChangeText={(text) => handleInputChange('balanceAmount', text)}
//                 placeholder="Balance Amount"
//                 placeholderTextColor="#666"
//                 keyboardType="numeric"
//                 editable={!loading}
//               />
//             </LinearGradient>
//           </View>
//         </View>

//         {/* Payment Status */}
//         <View style={styles.inputRow}>
//           <View style={styles.inputContainer}>
//             <LinearGradient
//               colors={['#7E5EA9', '#20AEBC']}
//                 start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 0 }}
//               style={styles.inputGradient}>
//               <TouchableOpacity
//                 style={styles.dropdownInput}
//                 onPress={() => setShowPaymentStatusDropdown(true)}
//                 disabled={loading}
//               >
//                 <Text style={formData.paymentStatus ? styles.selectedText : styles.placeholderText}>
//                   {formData.paymentStatus || 'Select Payment Status'}
//                 </Text>
//                 <Icon name="keyboard-arrow-down" size={24} color="#666" />
//               </TouchableOpacity>
//             </LinearGradient>
//           </View>
//         </View>

//         {/* Financer Name - Changed to Hypothecation Dropdown */}
//         <View style={styles.inputRow}>
//           <View style={styles.inputContainer}>
//             <LinearGradient
//               colors={['#7E5EA9', '#20AEBC']}
//               style={styles.inputGradient}>
//               <TouchableOpacity
//                 style={styles.dropdownInput}
//                 onPress={() => setShowFinancerDropdown(true)}
//                 disabled={loading}
//               >
//                 <Text style={formData.financerName ? styles.selectedText : styles.placeholderText}>
//                   {formData.financerName || 'Hypothecation'}
//                 </Text>
//                 <Icon name="keyboard-arrow-down" size={24} color="#666" />
//               </TouchableOpacity>
//             </LinearGradient>
//           </View>
//         </View>

//         {/* Financer Other - Conditionally Rendered */}
//         {formData.financerName === 'Other' && (
//           <View style={styles.inputRow}>
//             <View style={styles.fullWidthInputContainer}>
//               <LinearGradient
//                 colors={['#7E5EA9', '#20AEBC']}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 0 }}
//                 style={styles.inputGradient}>
//                 <TextInput
//                   style={styles.textInput}
//                   value={formData.financerOther}
//                   onChangeText={(text) => handleInputChange('financerOther', text)}
//                   placeholder="Enter Other Hypothecation"
//                   placeholderTextColor="#666"
//                   editable={!loading}
//                 />
//               </LinearGradient>
//             </View>
//           </View>
//         )}

//         {/* Accessories Heading */}
//         <View style={styles.accessoriesHeader}>
//           <Text style={styles.sectionHeading}>Accessories Given With Tractor</Text>
//         </View>

//         {/* Accessories Grid */}
//         <View style={styles.accessoriesGrid}>
//           {Object.keys(accessories).map((accessory, index) => (
//             <TouchableOpacity
//               key={accessory}
//               style={styles.accessoryItem}
//               onPress={() => handleAccessoryToggle(accessory)}
//               disabled={loading}
//             >
//               <LinearGradient
//                 colors={accessories[accessory] ? ['#12C857', '#12C857'] : ['#f0f0f0', '#f0f0f0']}
//                 style={styles.accessoryCheckbox}>
//                 <View style={styles.accessoryCheckboxInner}>
//                   {accessories[accessory] && (
//                     <Icon name="check" size={22} color="#fff" />
//                   )}
//                 </View>
//               </LinearGradient>
//               <Text style={styles.accessoryText}>
//                 {accessory.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} Issued
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </View>
        
//         {/* <View style={{flexDirection:"row",justifyContent:"space-between",marginBottom:20}}>
//             <Text style={{fontSize:16,fontFamily:"Inter_28pt-Regular"}}>Add Item</Text>
//             <View>
//             <TouchableOpacity onPress={handleAddItem} disabled={loading}>
//              <Icon name="add" size={25} color="black" style={{marginRight:20}} />
//              </TouchableOpacity>
//              </View>
//         </View> */}

//         {/* Terms and Conditions */}
//         <View style={styles.termsSection}>
//           <Text style={styles.termsHeading}>Terms and Conditions</Text>

//          <Text style={styles.termItem}>
//    <Text style={{ fontSize: 14, fontFamily: 'Inter_28pt-SemiBold' }}>
//     Delivery Condition :
//   </Text>
//   {' '}The Tractor Has Been Delivered To The Customer In Good Physical Condition And Fully Operational Working Condition. The Customer Has Inspected The Vehicle At The Time Of Delivery And Accepts Its Condition As Satisfactory.
// </Text>

//         <Text style={styles.termItem}>
//    <Text style={{ fontSize: 14, fontFamily: 'Inter_28pt-SemiBold' }}>
//     Ownership And Registration :
//   </Text>
//   {' '}The Ownership Of The Tractor Shall Be Transferred To The Customer Upon Full Payment And Successful Registration With The Relevant Motor Vehicle Authority. The Dealer Will Assist With Documentation If Required.
// </Text>

//         <Text style={styles.termItem}>
//    <Text style={{ fontSize: 14, fontFamily: 'Inter_28pt-SemiBold' }}>
//     Warranty And Service :
//   </Text>
//   {' '}The Tractor Is Covered Under The Manufacturer's Standard Warranty Policy. All Services And Repairs During The Warranty Period Must Be Carried Out At Authorized Service Centers Only.
// </Text>

//  <Text style={styles.termItem}>
//    <Text style={{ fontSize: 14, fontFamily: 'Inter_28pt-SemiBold' }}>
//     Liability :
//   </Text>
//   {' '}The Dealer Shall Not Be Held Liable For Any Damage Or Malfunction Arising Form Misuse, Unauthorized Modifications, Or Failure To Adhere To The Maintenance Schedule After Delivery. 
// </Text>

//          <Text style={styles.termItem}>
//    <Text style={{ fontSize: 14, fontFamily: 'Inter_28pt-SemiBold' }}>
//     Payment Terms :
//   </Text>
//   {' '}Full Payment Has Been Made Prior To Or At The Time Of Delivery Unless Otherwise Agreed In Writing. Any Outstanding Amounts Must Be Cleared As Per The Mutually Agreed Timeline.
// </Text>

// <Text style={styles.termItem}>
//   <Text style={{ fontSize: 14, fontFamily: 'Inter_28pt-SemiBold' }}>
//     Dispute Resolution :
//   </Text>
//   {' '}In Case Of Any Disputes Arising From This Delivery, The Matter Shall Be Resolved Amicably Between Both Parties. If Unresolved, It Will Be Subject To The Jurisdiction Of The Dealer's Location.
// </Text>

//           <Text style={styles.termItem}>
//   <Text style={{ fontSize: 14, fontFamily:"Inter_28pt-SemiBold" }}>
//     Acknowledgement :
//   </Text>
//   {' '}The Customer Acknowledges And Agrees To The Above Terms And Confirms That The Tractor Was Received In A Good And Working Condition.
// </Text>

//           {/* Accept Terms Checkbox */}
//           <TouchableOpacity
//             style={styles.termsCheckbox}
//             onPress={() => setAcceptTerms(!acceptTerms)}
//             activeOpacity={0.8}
//             disabled={loading}
//           >
//             <LinearGradient colors={['grey', 'grey']}  style={styles.checkboxGradient}>
//               <View style={[styles.checkboxInner, acceptTerms && styles.checkboxInnerSelected]}>
//                 {acceptTerms && <Icon name="check" size={16} color="#fff" />}
//               </View>
//             </LinearGradient>
//             <Text style={styles.termsCheckboxText}>Accept All Terms And Conditions</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Signatures Section */}
//         <View style={styles.signatureSection}>
//           <View style={styles.signatureRow}>
//             <TouchableOpacity 
//               style={styles.signatureBox} 
//               onPress={() => showImagePickerOptions(setCustomerSignature)}
//               disabled={loading}
//             >
//               {customerSignature ? (
//                 <Image 
//                   source={{ uri: customerSignature.uri }} 
//                   style={styles.previewImage}
//                   resizeMode="contain"
//                 />
//               ) : (
//                 <Text style={styles.signatureText}>Customer Signature</Text>
//               )}
//             </TouchableOpacity>

//             <TouchableOpacity 
//               style={styles.signatureBox} 
//               onPress={() => showImagePickerOptions(setManagerSignature)}
//               disabled={loading}
//             >
//               {managerSignature ? (
//                 <Image 
//                   source={{ uri: managerSignature.uri }} 
//                   style={styles.previewImage}
//                   resizeMode="contain"
//                 />
//               ) : (
//                 <Text style={styles.signatureText}>Manager Signature</Text>
//               )}
//             </TouchableOpacity>

//             <TouchableOpacity 
//               style={styles.signatureBox} 
//               onPress={() => showImagePickerOptions(setDriverSignature)}
//               disabled={loading}
//             >
//               {driverSignature ? (
//                 <Image 
//                   source={{ uri: driverSignature.uri }} 
//                   style={styles.previewImage}
//                   resizeMode="contain"
//                 />
//               ) : (
//                 <Text style={styles.signatureText}>Driver Signature</Text>
//               )}
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Buttons */}
//         <View style={styles.buttonsContainer}>
//           <TouchableOpacity 
//             style={[styles.submitButton, (loading || !acceptTerms) && styles.disabledButton]} 
//             onPress={handleSubmit}
//             disabled={loading || !acceptTerms}
//           >
//             {loading ? (
//               <ActivityIndicator color="#fff" size="small" />
//             ) : (
//               <Text style={styles.buttonText}>
//                 {isEditMode ? 'Update Delivery Challan' : 'Submit Delivery Challan'}
//               </Text>
//             )}
//           </TouchableOpacity>
          
//           <TouchableOpacity 
//             style={[styles.homeButton, loading && styles.disabledButton]} 
//             onPress={handleHome}
//             disabled={loading}
//           >
//             <Text style={styles.buttonText}>Home</Text>
//           </TouchableOpacity>
//         </View>

//         {/* QR Scanner Modal */}
//         {renderQRScanner()}

//         {/* Dropdown Modals */}
//         <Modal
//           visible={showTractorModelDropdown || showTiresMakeDropdown || showFipMakeDropdown || 
//                    showBatteryMakeDropdown || showPaymentStatusDropdown || showFinancerDropdown ||
//                    showHypothecationDropdown || showRelationDropdown}
//           transparent={true}
//           animationType="slide"
//           onRequestClose={() => {
//             setShowTractorModelDropdown(false);
//             setShowTiresMakeDropdown(false);
//             setShowFipMakeDropdown(false);
//             setShowBatteryMakeDropdown(false);
//             setShowPaymentStatusDropdown(false);
//             setShowFinancerDropdown(false);
//             setShowHypothecationDropdown(false);
//             setShowRelationDropdown(false);
//           }}>
//           <View style={styles.modalOverlay}>
//             <View style={styles.modalContent}>
//               <View style={styles.modalHeader}>
//                 <Text style={styles.modalTitle}>
//                   {showTractorModelDropdown && 'Select Tractor Model'}
//                   {showTiresMakeDropdown && 'Select Tires Make'}
//                   {showFipMakeDropdown && 'Select FIP Make'}
//                   {showBatteryMakeDropdown && 'Select Battery Make'}
//                   {showPaymentStatusDropdown && 'Select Payment Status'}
//                   {showFinancerDropdown && 'Select Hypothecation'}
//                   {showHypothecationDropdown && 'Select Hypothecation'}
//                   {showRelationDropdown && 'Select Relation'}
//                 </Text>
//                 <TouchableOpacity
//                   onPress={() => {
//                     setShowTractorModelDropdown(false);
//                     setShowTiresMakeDropdown(false);
//                     setShowFipMakeDropdown(false);
//                     setShowBatteryMakeDropdown(false);
//                     setShowPaymentStatusDropdown(false);
//                     setShowFinancerDropdown(false);
//                     setShowHypothecationDropdown(false);
//                     setShowRelationDropdown(false);
//                   }}
//                   style={styles.closeButton}>
//                   <Icon name="close" size={24} color="#000" />
//                 </TouchableOpacity>
//               </View>
//               <FlatList
//                 data={
//                   showTractorModelDropdown ? tractorModels :
//                   showTiresMakeDropdown ? tiresMakes :
//                   showFipMakeDropdown ? fipMakes :
//                   showBatteryMakeDropdown ? batteryMakes :
//                   showPaymentStatusDropdown ? paymentStatuses :
//                   showFinancerDropdown ? hypothecationOptions :
//                   showHypothecationDropdown ? hypothecationOptions :
//                   showRelationDropdown ? relationOptions : []
//                 }
//                 renderItem={renderDropdownItem}
//                 keyExtractor={(item, index) => index.toString()}
//                 style={styles.dropdownList}
//               />
//             </View>
//           </View>
//         </Modal>
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   header: {
//     paddingVertical: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   headerTitle: {
//     fontSize: 20,
//     color: 'white',
//     fontFamily:"Inter_28pt-SemiBold"
//   },
//   editModeText: {
//     fontSize: 12,
//     color: '#f0e6ff',
//     fontFamily: 'Inter_28pt-SemiBold',
//     marginTop: 5,
//   },
//   scrollView: {
//     flex: 1,
//     padding: 15,
//   },
//   formNoContainer: {
//     marginBottom: 15,
//   },
//   formNoInputContainer: {
//     width: '100%',
//   },
//   inputGradient: {
//     borderRadius: 8,
//     padding: 1.2,
//   },
//   textInput: {
//     backgroundColor: '#fff',
//     padding: 15,
//     borderRadius: 8,
//     fontSize: 14,
//     color: '#000',
//   },
//   iconButton: {
//     padding: 4,
//     marginRight: 8,
//   },
//   deliveryModeContainer: {
//     marginBottom: 10,
//   },
//   sectionLabel: {
//     fontSize: 17,
//     marginBottom: 10,
//     color: '#000',
//     fontFamily:"Inter_28pt-SemiBold",
//     marginTop: 15,
//   },
//   deliveryModeButtons: {
//     flexDirection: 'row',
//   },
//   deliveryModeButton: {
//     marginHorizontal: 5,
//     borderRadius: 8,
//   },
//   deliveryModeGradient: {
//     padding: 1,
//     borderRadius: 8,
//   },
//   deliveryModeText: {
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     textAlign: 'center',
//     backgroundColor: '#fff',
//     color: '#000',
//     borderRadius: 8,
//     fontSize: 14,
//   },
//   deliveryModeTextSelected: {
//     color: '#fff',
//     backgroundColor: 'transparent',
//   },
//   sectionHeading: {
//     fontSize: 17,
//     fontFamily:"Inter_28pt-SemiBold",
//     color: '#000',
//     marginBottom: 10,
//     marginTop: 10,
//   },
//   inputRow: {
//     marginVertical: 10,
//   },
//   inputContainer: {
//     flex: 1,
//   },
//   fullWidthInputContainer: {
//     width: '100%',
//     marginBottom: 1,
//   },
//   dropdownInput: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     backgroundColor: '#fff',
//     padding: 12,
//     borderRadius: 8,
//   },
//   selectedText: {
//     fontSize: 14,
//     color: '#000',
//   },
//   placeholderText: {
//     fontSize: 14,
//     color: '#666',
//   },
//   inputWithIcon: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderRadius: 8,
//   },
//   radioSection: {
//     marginBottom: 20,
//   },
//   radioLabel: {
//     fontSize: 17,
//     marginBottom: 15,
//     color: '#000',
//     fontWeight: '500',
//     marginTop: 10,
//   },
//   radioOptions: {
//     flexDirection: 'row',
//   },
//   radioOption: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginRight: 20,
//   },
//   radioGradient: {
//     width: 25,
//     height: 25,
//     borderRadius: 3,
//     marginRight: 10,
//   },
//   radioInner: {
//     width: 25,
//     height: 25,
//     borderRadius: 1,
//     backgroundColor: 'transparent',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   radioText: {
//     fontSize: 17,
//     color: '#000',
//     fontFamily:"Inter_28pt-Regular"
//   },
//   accessoriesHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 5,
//   },
//   accessoriesGrid: {
//     marginBottom: 0,
//   },
//   accessoryItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: '70%',
//     marginBottom: 25,
//   },
//   accessoryCheckbox: {
//     width: 25,
//     height: 25,
//     borderRadius: 4,
//     padding: 0,
//     marginRight: 8,
//   },
//   accessoryCheckboxInner: {
//     width: 25,
//     height: 25,
//     borderRadius: 3,
//     backgroundColor: 'transparent',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   accessoryText: {
//     fontSize: 14.5,
//     color: '#000',
//     flex: 1,
//     fontFamily:"Inter_28pt-Regular"
//   },
//   buttonsContainer: {
//     marginTop: 20,
//     marginBottom: 30,
//   },
//   submitButton: {
//     backgroundColor: '#7E5EA9',
//     padding: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   homeButton: {
//     backgroundColor: '#20AEBC',
//     padding: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontFamily:"Inter_28pt-SemiBold"
//   },
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
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     borderRadius: 10,
//     width: '90%',
//     maxHeight: '80%',
//   },
//   modalHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f0f0',
//   },
//   modalTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   closeButton: {
//     padding: 4,
//   },
//   dropdownList: {
//     maxHeight: 300,
//   },
//   dropdownItem: {
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f0f0',
//   },
//   dropdownItemText: {
//     fontSize: 14,
//     color: '#333',
//   },
//   termsSection: {
//     marginBottom: 20,
//     borderRadius: 10,
//     marginTop: 10,
//   },
//   termsHeading: {
//     fontSize: 16,
//     fontFamily:"Inter_28pt-SemiBold",
//     marginBottom: 10,
//     color: '#000',
//   },
//   termItem: {
//     fontSize: 12,
//     color: '#333',
//     marginBottom: 10,
//     lineHeight: 16,
//     fontFamily:"Inter_28pt-Medium"
//   },
//   termsCheckbox: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 10,
//     backgroundColor: '#fff',
//     borderRadius: 8,
//   },
//   checkboxGradient: { borderRadius: 4, padding: 1, marginRight: 10 },
//   checkboxInner: {
//     width: 20,
//     height: 20,
//     borderRadius: 3,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   checkboxInnerSelected: { backgroundColor: '#12C857' },
//   termsCheckboxText: {
//     fontSize: 14,
//     color: '#000',
//   },
//   signatureSection: {
//     marginBottom: 20,
//   },
//   signatureRow: {
//     marginTop: 20,
//   },
//   signatureBox: {
//     flex: 1,
//     height: 55,
//     borderWidth: 1,
//     borderColor: '#00000080',
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginHorizontal: 5,
//     borderStyle: 'dashed',
//     marginBottom: 10,
//   },
//   signatureText: {
//     fontSize: 12,
//     color: '#00000099',
//     textAlign: 'center',
//   },
//   previewImage: {
//     width: '100%',
//     height: '100%',
//     borderRadius: 10,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginBottom: 12,
//   },
//   button: {
//     paddingHorizontal: 15,
//     paddingVertical: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//    button1: {
//     paddingHorizontal: 45,
//     paddingVertical: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   buttonText1: {
//     color: '#fff',
//     fontFamily:"Inter_28pt-SemiBold",
//   },
//   disabledButton: {
//     opacity: 0.6,
//   },
//    formNo: {
//     fontSize: 13,
//     marginVertical: 10,
//     fontFamily: 'Inter_28pt-SemiBold',
//     paddingHorizontal: 5,
//   },
//   branchSection: {
//     marginBottom: 15,
//   },
//   representativeSection: {
//     marginBottom: 15,
//   },
// });

// export default DeliveryChallan;


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

const DeliveryChallan = ({navigation, route}) => {
  const insets = useSafeAreaInsets();
  
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [existingFormId, setExistingFormId] = useState(null);
  const [acceptTerms, setAcceptTerms] = useState(false);

  // QR Scanner States
  const [showChassisScanner, setShowChassisScanner] = useState(false);
  const [showEngineScanner, setShowEngineScanner] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);

  const [showTractorModelDropdown, setShowTractorModelDropdown] = useState(false);
  const [showTiresMakeDropdown, setShowTiresMakeDropdown] = useState(false);
  const [showFipMakeDropdown, setShowFipMakeDropdown] = useState(false);
  const [showBatteryMakeDropdown, setShowBatteryMakeDropdown] = useState(false);
  const [showPaymentStatusDropdown, setShowPaymentStatusDropdown] = useState(false);
  const [showFinancerDropdown, setShowFinancerDropdown] = useState(false);
  const [showHypothecationDropdown, setShowHypothecationDropdown] = useState(false);
  const [showRelationDropdown, setShowRelationDropdown] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showManufactureDatePicker, setShowManufactureDatePicker] = useState(false);

  const [formData, setFormData] = useState({
    formNo: '',
    date: null,
    deliveryMode: 'Customer',
    challanCreatedBy: '',
    customerName: '',
    parentage: '',
    address: '',
    hypothecation: '',
    hypothecationOther: '',
    mobileNo: '',
    areYouCustomer: '',
    tractorName: '',
    tractorModel: '',
    chassisNo: '',
    engineNo: '',
    yearOfManufacture: '',
    tiresMake: '',
    tiresMakeOther: '',
    fipMake: '',
    fipMakeOther: '',
    batteryMake: '',
    batteryMakeOther: '',
    dealPrice: '',
    cashPaid: '',
    financeAmountPaid: '',
    totalPaid: '',
    balanceAmount: '',
    paymentStatus: '',
    financerName: '',
    financerOther: '',
    // Branch fields
    branchName: '',
    branchPersonName: '',
    branchAddress: '',
    branchMobileNumber: '',
    // Representative fields
    representativeName: '',
    representativeFatherName: '',
    representativeAddress: '',
    representativeMobileNumber: '',
    representativeRelation: '',
    representativeRelationOther: '',
  });

  // Image states for signatures
  const [customerSignature, setCustomerSignature] = useState(null);
  const [managerSignature, setManagerSignature] = useState(null);
  const [driverSignature, setDriverSignature] = useState(null);

  const [accessories, setAccessories] = useState({
    bumper: false,
    cultivator: false,
    leveler: false,
    rallyFenderSeats: false,
    weightsRear: false,
    waterTanker: false,
    trolly: false,
    weightFront: false,
    rearTowingHook: false,
    hood: false,
    ptoPully: false,
    drawbar: false,
    cageWheels: false,
    tool: false,
    toplink: false,
  });

  const tractorModels = [
    '3028EN', '3036EN', '3036E', '5105', '5105 4WD', 
    '5050D Gear Pro', '5210 Gear Pro', '5050D 4WD Gear Pro', 
    '5210 4WD Gear Pro', '5310 CRDI', '5310 4WD CRDI', 
    '5405 CRDI', '5405 4WD CRDI', '5075 2WD', '5075 4WD'
  ];

  const tiresMakes = ['MRF', 'CEAT', 'Apollo', 'BKT', 'Goodyear', 'Bridgestone', 'Other'];
  const fipMakes = ['Bosch', 'Delphi', 'Denso', 'Siemens', 'Stanadyne', 'Other'];
  const batteryMakes = ['Exide', 'Amaron', 'Luminous', 'Su-Kam', 'Hankook', 'Other'];
  const paymentStatuses = ['Paid', 'Pending', 'Partial', 'Due', 'Completed'];
  const hypothecationOptions = [
    'John Deere Financial India Private Limited',
    'The Jammu and Kashmir Bank Limited',
    'Nil',
    'Other'
  ];
  const relationOptions = ['Father', 'Mother', 'Friend', 'Spouse', 'Brother', 'Sister', 'Son', 'Other'];

  // Camera Permission Function for QR Scanner
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

  const handleQRCodeRead = (event) => {
    const scannedValue = event.nativeEvent.codeStringValue;
    console.log('QR Code Scanned:', scannedValue);
    
    if (showChassisScanner) {
      handleInputChange('chassisNo', scannedValue);
      setShowChassisScanner(false);
    } else if (showEngineScanner) {
      handleInputChange('engineNo', scannedValue);
      setShowEngineScanner(false);
    }
  };

  const closeScanner = () => {
    setShowChassisScanner(false);
    setShowEngineScanner(false);
  };

  // QR Scanner Component
  const renderQRScanner = () => (
    <Modal
      visible={showChassisScanner || showEngineScanner}
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
            {showChassisScanner ? 'Scan Chassis Number' : 'Scan Engine Number'}
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
          
          // Pre-populate form data with API field names - FIXED: Use tire_make instead of tyres_make
          setFormData({
            formNo: editData.form_no || '',
            date: editData.select_date ? new Date(editData.select_date) : null,
            deliveryMode: editData.delivery_mode === 'Self Pickup' ? 'Customer' : 'Branch',
            challanCreatedBy: editData.challan_created_by || '',
            customerName: editData.customer_name || '',
            parentage: editData.parentage || '',
            address: editData.address || '',
            hypothecation: editData.hypothecation || '',
            mobileNo: editData.mobile_no || '',
            areYouCustomer: editData.is_customer?.toString() || '',
            tractorName: editData.tractor_name || '',
            tractorModel: editData.tractor_model || '',
            chassisNo: editData.chassis_no || '',
            engineNo: editData.engine_no || '',
            yearOfManufacture: editData.year_of_manufacture || '',
            // FIXED: Use tire_make instead of tyres_make
            tiresMake: editData.tire_make || editData.tyres_make || '',
            fipMake: editData.fip_make || '',
            batteryMake: editData.battery_make || '',
            dealPrice: editData.deal_price || '',
            cashPaid: editData.amount_paid || '',
            financeAmountPaid: editData.finance_amount_paid || '',
            totalPaid: editData.total_paid || '',
            balanceAmount: editData.balance_amount || '',
            paymentStatus: editData.payment_status || '',
            financerName: editData.financier_name || '',
            // Initialize new fields
            hypothecationOther: editData.hypothecation_other || '',
            // FIXED: Use tire_make_other
            tiresMakeOther: editData.tire_make_other || '',
            fipMakeOther: editData.fip_make_other || '',
            batteryMakeOther: editData.battery_make_other || '',
            financerOther: editData.financier_other || '',
            branchName: editData.branch_name || '',
            branchPersonName: editData.branch_person_name || '',
            branchAddress: editData.branch_address || '',
            branchMobileNumber: editData.branch_phone || '',
            representativeName: editData.relative_name || '',
            representativeFatherName: editData.relative_father_name || '',
            representativeAddress: editData.relative_address || '',
            representativeMobileNumber: editData.relative_phone || '',
            representativeRelation: editData.relative_relation || '',
            representativeRelationOther: editData.relation_other || '',
          });

          // Set accessories from JSON string if available
          if (editData.accessories) {
            try {
              const accessoriesData = typeof editData.accessories === 'string' 
                ? JSON.parse(editData.accessories) 
                : editData.accessories;
              
              // Convert accessories data to boolean values
              const updatedAccessories = {...accessories};
              Object.keys(accessoriesData).forEach(key => {
                if (accessoriesData[key] === 'Yes' || accessoriesData[key] === true) {
                  const accessoryKey = key.toLowerCase().replace(/\s+/g, '');
                  if (updatedAccessories.hasOwnProperty(accessoryKey)) {
                    updatedAccessories[accessoryKey] = true;
                  }
                }
              });
              setAccessories(updatedAccessories);
            } catch (error) {
              console.log('Error parsing accessories:', error);
            }
          }

          // Set terms acceptance
          setAcceptTerms(true);
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
    return `DC${timestamp}`;
  };

  // Calculate total paid and balance amount automatically
  useEffect(() => {
    const cashPaid = parseFloat(formData.cashPaid) || 0;
    const financeAmountPaid = parseFloat(formData.financeAmountPaid) || 0;
    const totalPaid = cashPaid + financeAmountPaid;
    const dealPrice = parseFloat(formData.dealPrice) || 0;
    const balance = dealPrice - totalPaid;
    
    handleInputChange('totalPaid', totalPaid.toString());
    handleInputChange('balanceAmount', balance.toString());
  }, [formData.cashPaid, formData.financeAmountPaid, formData.dealPrice]);

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

  const handleDeliveryModeSelect = (mode) => {
    handleInputChange('deliveryMode', mode);
  };

  const handleAreYouCustomerSelect = (value) => {
    handleInputChange('areYouCustomer', value === 'Yes' ? '1' : '0');
  };

  const handleAccessoryToggle = (accessory) => {
    setAccessories(prev => ({
      ...prev,
      [accessory]: !prev[accessory],
    }));
  };

  const handleTractorModelSelect = (model) => {
    handleInputChange('tractorModel', model);
    setShowTractorModelDropdown(false);
  };

  const handleTiresMakeSelect = (make) => {
    handleInputChange('tiresMake', make);
    setShowTiresMakeDropdown(false);
  };

  const handleFipMakeSelect = (make) => {
    handleInputChange('fipMake', make);
    setShowFipMakeDropdown(false);
  };

  const handleBatteryMakeSelect = (make) => {
    handleInputChange('batteryMake', make);
    setShowBatteryMakeDropdown(false);
  };

  const handlePaymentStatusSelect = (status) => {
    handleInputChange('paymentStatus', status);
    setShowPaymentStatusDropdown(false);
  };

  const handleFinancerSelect = (financer) => {
    handleInputChange('financerName', financer);
    setShowFinancerDropdown(false);
  };

  const handleHypothecationSelect = (option) => {
    handleInputChange('hypothecation', option);
    setShowHypothecationDropdown(false);
  };

  const handleRelationSelect = (relation) => {
    handleInputChange('representativeRelation', relation);
    setShowRelationDropdown(false);
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      handleInputChange('date', selectedDate);
    }
  };

  const handleManufactureDateChange = (event, selectedDate) => {
    setShowManufactureDatePicker(false);
    if (selectedDate) {
      const month = selectedDate.getMonth() + 1;
      const year = selectedDate.getFullYear();
      handleInputChange('yearOfManufacture', `${month}/${year}`);
    }
  };

  const handleDateIconPress = () => {
    setShowDatePicker(true);
  };

  const handleManufactureDateIconPress = () => {
    setShowManufactureDatePicker(true);
  };

  const validateForm = () => {
    const requiredFields = [
      'customerName', 'parentage', 'address', 
      'mobileNo', 'tractorName', 'tractorModel', 'chassisNo', 
      'engineNo', 'yearOfManufacture', 'dealPrice', 'paymentStatus'
    ];

    for (const field of requiredFields) {
      if (!formData[field] || formData[field].toString().trim() === '') {
        Alert.alert('Validation Error', `Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }

    if (!formData.areYouCustomer) {
      Alert.alert('Validation Error', 'Please select if you are the customer');
      return false;
    }

    // Branch validation
    if (formData.deliveryMode === 'Branch') {
      const branchFields = ['branchName', 'branchPersonName', 'branchAddress', 'branchMobileNumber'];
      for (const field of branchFields) {
        if (!formData[field] || formData[field].toString().trim() === '') {
          Alert.alert('Validation Error', `Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
          return false;
        }
      }
    }

    // Representative validation
    if (formData.areYouCustomer === '0') {
      const representativeFields = ['representativeName', 'representativeFatherName', 'representativeAddress', 'representativeMobileNumber', 'representativeRelation'];
      for (const field of representativeFields) {
        if (!formData[field] || formData[field].toString().trim() === '') {
          Alert.alert('Validation Error', `Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
          return false;
        }
      }
      if (formData.representativeRelation === 'Other' && (!formData.representativeRelationOther || formData.representativeRelationOther.trim() === '')) {
        Alert.alert('Validation Error', 'Please specify the relation');
        return false;
      }
    }

    if (!customerSignature) {
      Alert.alert('Validation Error', 'Please add customer signature');
      return false;
    }

    if (!managerSignature) {
      Alert.alert('Validation Error', 'Please add manager signature');
      return false;
    }

    if (!driverSignature) {
      Alert.alert('Validation Error', 'Please add driver signature');
      return false;
    }

    // Checkbox validation - form will only submit when checkbox is ticked
    if (!acceptTerms) {
      Alert.alert('Validation Error', 'Please accept the terms and conditions by ticking the checkbox');
      return false;
    }

    return true;
  };

  const prepareAccessoriesData = () => {
    const accessoriesData = {};
    
    // Map our state keys to the expected API keys
    const accessoryMapping = {
      bumper: 'Bumper',
      cultivator: 'Cultivator',
      leveler: 'Leveler',
      rallyFenderSeats: 'Rally Fender Seats',
      weightsRear: 'Weights Rear',
      waterTanker: 'Water Tanker',
      trolly: 'Trolly',
      weightFront: 'Weight Front',
      rearTowingHook: 'Rear Towing Hook',
      hood: 'Hood',
      ptoPully: 'PTO Pully',
      drawbar: 'Drawbar',
      cageWheels: 'Cage Wheels',
      tool: 'Tool',
      toplink: 'Top Link'
    };

    Object.keys(accessories).forEach(key => {
      if (accessoryMapping[key]) {
        accessoriesData[accessoryMapping[key]] = accessories[key] ? 'Yes' : 'No';
      }
    });
    
    // Add empty Other array as shown in API example
    accessoriesData.Other = [];
    
    return JSON.stringify(accessoriesData);
  };

  const prepareFormData = () => {
    const formDataToSend = new FormData();

    // Add form data with exact field names as expected by API
    formDataToSend.append('user_id', userId);
    formDataToSend.append('form_no', formData.formNo || generateFormNo());
    formDataToSend.append('select_date', formData.date ? formData.date.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]);
    formDataToSend.append('delivery_mode', formData.deliveryMode === 'Customer' ? 'Self Pickup' : 'Branch');
    formDataToSend.append('challan_created_by', formData.challanCreatedBy || 'Admin');
    formDataToSend.append('customer_name', formData.customerName);
    formDataToSend.append('parentage', formData.parentage);
    formDataToSend.append('address', formData.address);
    formDataToSend.append('hypothecation', formData.hypothecation || '');
    formDataToSend.append('hypothecation_other', formData.hypothecationOther || '');
    formDataToSend.append('mobile_no', formData.mobileNo);
    formDataToSend.append('is_customer', formData.areYouCustomer);
    formDataToSend.append('tractor_name', formData.tractorName);
    formDataToSend.append('tractor_model', formData.tractorModel);
    formDataToSend.append('chassis_no', formData.chassisNo);
    formDataToSend.append('engine_no', formData.engineNo);
    formDataToSend.append('year_of_manufacture', formData.yearOfManufacture);
    
    // FIXED: Use 'tire_make' instead of 'tyres_make'
    formDataToSend.append('tire_make', formData.tiresMake || '');
    
    formDataToSend.append('fip_make', formData.fipMake || '');
    formDataToSend.append('battery_make', formData.batteryMake || '');
    formDataToSend.append('deal_price', formData.dealPrice);
    formDataToSend.append('amount_paid', formData.cashPaid || '0');
    formDataToSend.append('finance_amount_paid', formData.financeAmountPaid || '0');
    formDataToSend.append('total_paid', formData.totalPaid || '0');
    formDataToSend.append('balance_amount', formData.balanceAmount || '0');
    formDataToSend.append('payment_status', formData.paymentStatus);
    formDataToSend.append('financier_name', formData.financerName || '');
    formDataToSend.append('accessories', prepareAccessoriesData());

    // Add branch fields with correct API field names
    formDataToSend.append('branch_name', formData.branchName || '');
    formDataToSend.append('branch_person_name', formData.branchPersonName || '');
    formDataToSend.append('branch_address', formData.branchAddress || '');
    formDataToSend.append('branch_phone', formData.branchMobileNumber || '');

    // Add representative fields with correct API field names
    formDataToSend.append('relative_name', formData.representativeName || '');
    formDataToSend.append('relative_father_name', formData.representativeFatherName || '');
    formDataToSend.append('relative_address', formData.representativeAddress || '');
    formDataToSend.append('relative_phone', formData.representativeMobileNumber || '');
    formDataToSend.append('relative_relation', formData.representativeRelation || '');
    formDataToSend.append('relation_other', formData.representativeRelationOther || '');

    // Add other fields for tires, fip, battery - FIXED: Use correct field names
    if (formData.tiresMake === 'Other') {
      formDataToSend.append('tire_make_other', formData.tiresMakeOther || '');
    }
    if (formData.fipMake === 'Other') {
      formDataToSend.append('fip_make_other', formData.fipMakeOther || '');
    }
    if (formData.batteryMake === 'Other') {
      formDataToSend.append('battery_make_other', formData.batteryMakeOther || '');
    }

    // Add images with proper file names
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

    if (driverSignature) {
      formDataToSend.append('driver_signature', {
        uri: driverSignature.uri,
        type: driverSignature.type || 'image/jpeg',
        name: `driver_signature_${Date.now()}.jpg`,
      });
    }

    // For update, add the form ID
    if (isEditMode && existingFormId) {
      formDataToSend.append('id', existingFormId);
    }

    // Log form data for debugging
    console.log('Form Data being sent:');
    formDataToSend._parts.forEach(([key, value]) => {
      if (typeof value !== 'object') {
        console.log(`${key}: ${value}`);
      } else {
        console.log(`${key}: [File]`);
      }
    });

    return formDataToSend;
  };

  const handleSubmit = async () => {
    if (!userId) {
      Alert.alert('Error', 'User ID not found. Please login again.');
      return;
    }

    // Check if checkbox is ticked before validation
    if (!acceptTerms) {
      Alert.alert('Terms Not Accepted', 'Please accept the terms and conditions by ticking the checkbox before submitting the form.');
      return;
    }

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const formDataToSend = prepareFormData();
      
      const url = isEditMode 
        ? 'https://argosmob.uk/makroo/public/api/v1/delivery-challan/form/update'
        : 'https://argosmob.uk/makroo/public/api/v1/delivery-challan/form/save';

      console.log('Making API call to:', url);

      const response = await axios.post(url, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
        },
        timeout: 30000,
      });

      console.log('API Response:', response.data);

      if (response.data && (response.data.success === true || response.data.status === 'success' || response.data.message?.toLowerCase().includes('success'))) {
        Alert.alert(
          'Success', 
          isEditMode ? 'Delivery Challan updated successfully!' : 'Delivery Challan submitted successfully!',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Dashboard')
            }
          ]
        );
      } else {
        let errorMessage = 'Submission failed';
        
        if (response.data && response.data.message) {
          errorMessage = response.data.message;
        } else if (response.data && response.data.error) {
          errorMessage = response.data.error;
        } else if (response.data && response.data.errors) {
          const validationErrors = Object.values(response.data.errors).flat();
          errorMessage = validationErrors.join(', ');
        } else if (response.data) {
          errorMessage = 'Submission completed but no success confirmation received';
          console.log('Unclear response structure:', response.data);
        }
        
        Alert.alert('Submission Failed', errorMessage);
      }
    } catch (error) {
      console.log('Submission Error:', error);
      console.log('Error Response:', error.response?.data);
      
      if (error.response) {
        let errorMessage = 'Submission failed. Please try again.';
        
        if (error.response.status === 422) {
          if (error.response.data.errors) {
            const validationErrors = Object.values(error.response.data.errors).flat();
            errorMessage = `Validation Error: ${validationErrors.join(', ')}`;
          } else if (error.response.data.message) {
            errorMessage = error.response.data.message;
          }
        } else if (error.response.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.data?.error) {
          errorMessage = error.response.data.error;
        }
        
        Alert.alert('Submission Failed', errorMessage);
      } else if (error.request) {
        Alert.alert('Network Error', 'Please check your internet connection and try again.');
      } else {
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
    Alert.alert('PDF', 'Delivery Challan PDF generated!');
  };

  const handleAddItem = () => {
    Alert.alert('Add Item', 'Add new accessory item');
  };

  const renderDropdownItem = ({item}) => (
    <TouchableOpacity
      style={styles.dropdownItem}
      onPress={() => {
        if (showTractorModelDropdown) handleTractorModelSelect(item);
        else if (showTiresMakeDropdown) handleTiresMakeSelect(item);
        else if (showFipMakeDropdown) handleFipMakeSelect(item);
        else if (showBatteryMakeDropdown) handleBatteryMakeSelect(item);
        else if (showPaymentStatusDropdown) handlePaymentStatusSelect(item);
        else if (showFinancerDropdown) handleFinancerSelect(item);
        else if (showHypothecationDropdown) handleHypothecationSelect(item);
        else if (showRelationDropdown) handleRelationSelect(item);
      }}>
      <Text style={styles.dropdownItemText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, {paddingTop: insets.top,paddingBottom: insets.bottom}]}>
      {/* Header */}
      <LinearGradient
        colors={['#7E5EA9', '#20AEBC']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}>
        <Text style={styles.headerTitle}>Delivery Challan</Text>
        {isEditMode && <Text style={styles.editModeText}>Edit Mode</Text>}
      </LinearGradient>

      <ScrollView style={styles.scrollView}>
        {/* Form No */}
        <Text style={styles.sectionHeading}>Create Delivery Challan</Text>

        {/* Date */}
         <View style={styles.inputContainer}>
            <LinearGradient
              colors={['#7E5EA9', '#20AEBC']}
               start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
              style={styles.inputGradient}>
              <View style={styles.inputWithIcon}>
                <TouchableOpacity
                  style={[styles.textInput, {flex: 1}]}
                  onPress={handleDateIconPress}
                  disabled={loading}
                >
                  <Text style={formData.date ? styles.selectedText : styles.placeholderText}>
                    {formData.date ? formData.date.toLocaleDateString() : 'Select Date'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.iconButton}
                  onPress={handleDateIconPress}
                  disabled={loading}
                >
                  <Icon name="calendar-today" size={20} color="#666" />
                </TouchableOpacity>
                {showDatePicker && (
                  <DateTimePicker
                    value={formData.date || new Date()}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={handleDateChange}
                  />
                )}
              </View>
            </LinearGradient>
          </View>

        {/* Delivery Mode */}
        <View style={styles.deliveryModeContainer}>
          <Text style={styles.sectionLabel}>Delivery Mode</Text>
          <View style={styles.deliveryModeButtons}>
            <TouchableOpacity
              style={[
                styles.deliveryModeButton,
                formData.deliveryMode === 'Customer' && styles.deliveryModeSelected
              ]}
              onPress={() => handleDeliveryModeSelect('Customer')}
              disabled={loading}
            >
              <LinearGradient
                colors={formData.deliveryMode === 'Customer' ? ['#7E5EA9', '#20AEBC'] : ['#7E5EA9', '#20AEBC']}
                start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
                style={styles.deliveryModeGradient}>
                <Text style={[
                  styles.deliveryModeText,
                  formData.deliveryMode === 'Customer' && styles.deliveryModeTextSelected
                ]}>
                  Customer
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.deliveryModeButton,
                formData.deliveryMode === 'Branch' && styles.deliveryModeSelected
              ]}
              onPress={() => handleDeliveryModeSelect('Branch')}
              disabled={loading}
            >
              <LinearGradient
                colors={formData.deliveryMode === 'Branch' ? ['#7E5EA9', '#20AEBC'] : ['#7E5EA9', '#20AEBC']}
                start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
                style={styles.deliveryModeGradient}>
                <Text style={[
                  styles.deliveryModeText,
                  formData.deliveryMode === 'Branch' && styles.deliveryModeTextSelected
                ]}>
                  Branch
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/* Branch Fields - Conditionally Rendered */}
        {formData.deliveryMode === 'Branch' && (
          <View style={styles.branchSection}>
            <Text style={styles.sectionHeading}>Branch Details</Text>
            
            {/* Branch Name */}
            <View style={styles.inputRow}>
              <View style={styles.fullWidthInputContainer}>
                <LinearGradient
                  colors={['#7E5EA9', '#20AEBC']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.inputGradient}>
                  <TextInput
                    style={styles.textInput}
                    value={formData.branchName}
                    onChangeText={(text) => handleInputChange('branchName', text)}
                    placeholder="Branch Name"
                    placeholderTextColor="#666"
                    editable={!loading}
                  />
                </LinearGradient>
              </View>
            </View>

            {/* Branch Person Name */}
            <View style={styles.inputRow}>
              <View style={styles.fullWidthInputContainer}>
                <LinearGradient
                  colors={['#7E5EA9', '#20AEBC']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.inputGradient}>
                  <TextInput
                    style={styles.textInput}
                    value={formData.branchPersonName}
                    onChangeText={(text) => handleInputChange('branchPersonName', text)}
                    placeholder="Branch Person Name"
                    placeholderTextColor="#666"
                    editable={!loading}
                  />
                </LinearGradient>
              </View>
            </View>

            {/* Branch Address */}
            <View style={styles.inputRow}>
              <View style={styles.fullWidthInputContainer}>
                <LinearGradient
                  colors={['#7E5EA9', '#20AEBC']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.inputGradient}>
                  <TextInput
                    style={styles.textInput}
                    value={formData.branchAddress}
                    onChangeText={(text) => handleInputChange('branchAddress', text)}
                    placeholder="Branch Address"
                    placeholderTextColor="#666"
                    multiline
                    numberOfLines={2}
                    editable={!loading}
                  />
                </LinearGradient>
              </View>
            </View>

            {/* Branch Mobile Number */}
            <View style={styles.inputRow}>
              <View style={styles.fullWidthInputContainer}>
                <LinearGradient
                  colors={['#7E5EA9', '#20AEBC']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.inputGradient}>
                  <TextInput
                    style={styles.textInput}
                    value={formData.branchMobileNumber}
                    onChangeText={(text) => handleInputChange('branchMobileNumber', text)}
                    placeholder="Branch Mobile Number"
                    placeholderTextColor="#666"
                    keyboardType="phone-pad"
                    editable={!loading}
                  />
                </LinearGradient>
              </View>
            </View>
          </View>
        )}

        {/* Customer Details Heading */}
        <Text style={styles.sectionHeading}>Customer Details</Text>

        {/* Challan Created By - Changed to TextInput */}
        <View style={styles.inputRow}>
          <View style={styles.inputContainer}>
            <LinearGradient
              colors={['#7E5EA9', '#20AEBC']}
               start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
              style={styles.inputGradient}>
              <TextInput
                style={styles.textInput}
                value={formData.challanCreatedBy}
                onChangeText={(text) => handleInputChange('challanCreatedBy', text)}
                placeholder="Challan Created By"
                placeholderTextColor="#666"
                editable={!loading}
              />
            </LinearGradient>
          </View>
        </View>

        {/* Customer Name & Parentage */}
        <View style={styles.inputRow}>
          <View style={styles.inputContainer}>
            <LinearGradient
              colors={['#7E5EA9', '#20AEBC']}
              start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
              style={styles.inputGradient}>
              <TextInput
                style={styles.textInput}
                value={formData.customerName}
                onChangeText={(text) => handleInputChange('customerName', text)}
                placeholder="Customer Name"
                placeholderTextColor="#666"
                editable={!loading}
              />
            </LinearGradient>
          </View>
          <View style={{marginBottom: 15}} />
          <View style={styles.inputContainer}>
            <LinearGradient
              colors={['#7E5EA9', '#20AEBC']}
              start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
              style={styles.inputGradient}>
              <TextInput
                style={styles.textInput}
                value={formData.parentage}
                onChangeText={(text) => handleInputChange('parentage', text)}
                placeholder="Parentage"
                placeholderTextColor="#666"
                
                editable={!loading}
              />
            </LinearGradient>
          </View>
        </View>

        {/* Address */}
        <View style={styles.inputRow}>
          <View style={styles.fullWidthInputContainer}>
            <LinearGradient
              colors={['#7E5EA9', '#20AEBC']}
               start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
              style={styles.inputGradient}>
              <TextInput
                style={[styles.textInput,]}
                value={formData.address}
                onChangeText={(text) => handleInputChange('address', text)}
                placeholder="Enter Address"
                placeholderTextColor="#666"
                multiline
                numberOfLines={1}
                editable={!loading}
              />
            </LinearGradient>
          </View>
        </View>

        {/* Hypothecation - Changed to Dropdown */}
        <View style={styles.inputRow}>
          <View style={styles.inputContainer}>
            <LinearGradient
              colors={['#7E5EA9', '#20AEBC']}
               start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
              style={styles.inputGradient}>
              <TouchableOpacity
                style={styles.dropdownInput}
                onPress={() => setShowHypothecationDropdown(true)}
                disabled={loading}
              >
                <Text style={formData.hypothecation ? styles.selectedText : styles.placeholderText}>
                  {formData.hypothecation || 'Select Hypothecation'}
                </Text>
                <Icon name="keyboard-arrow-down" size={24} color="#666" />
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>

        {/* Hypothecation Other - Conditionally Rendered */}
        {formData.hypothecation === 'Other' && (
          <View style={styles.inputRow}>
            <View style={styles.fullWidthInputContainer}>
              <LinearGradient
                colors={['#7E5EA9', '#20AEBC']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.inputGradient}>
                <TextInput
                  style={styles.textInput}
                  value={formData.hypothecationOther}
                  onChangeText={(text) => handleInputChange('hypothecationOther', text)}
                  placeholder="Enter Other Hypothecation"
                  placeholderTextColor="#666"
                  editable={!loading}
                />
              </LinearGradient>
            </View>
          </View>
        )}

        {/* Mobile No */}
        <View style={styles.inputRow}>
          <View style={styles.inputContainer}>
            <LinearGradient
              colors={['#7E5EA9', '#20AEBC']}
               start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
              style={styles.inputGradient}>
              <TextInput
                style={styles.textInput}
                value={formData.mobileNo}
                onChangeText={(text) => handleInputChange('mobileNo', text)}
                placeholder="Mobile No."
                placeholderTextColor="#666"
                keyboardType="phone-pad"
                editable={!loading}
              />
            </LinearGradient>
          </View>
        </View>

        {/* Are You Customer? */}
        <View style={styles.radioSection}>
          <Text style={styles.radioLabel}>Are You Customer?</Text>
          <View style={styles.radioOptions}>
            {['Yes', 'No'].map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.radioOption}
                onPress={() => handleAreYouCustomerSelect(option)}
                disabled={loading}
              >
                <LinearGradient
                  colors={formData.areYouCustomer === (option === 'Yes' ? '1' : '0') ? ['#12C857', '#12C857'] : ['#f0f0f0', '#f0f0f0']}
                  style={styles.radioGradient}>
                  <View style={styles.radioInner}>
                    {formData.areYouCustomer === (option === 'Yes' ? '1' : '0') && (
                      <Icon name="check" size={24} color="#fff" />
                    )}
                  </View>
                </LinearGradient>
                <Text style={styles.radioText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Representative Fields - Conditionally Rendered */}
        {formData.areYouCustomer === '0' && (
          <View style={styles.representativeSection}>
            <Text style={styles.sectionHeading}>Representative Details</Text>
            
            {/* Representative Name */}
            <View style={styles.inputRow}>
              <View style={styles.fullWidthInputContainer}>
                <LinearGradient
                  colors={['#7E5EA9', '#20AEBC']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.inputGradient}>
                  <TextInput
                    style={styles.textInput}
                    value={formData.representativeName}
                    onChangeText={(text) => handleInputChange('representativeName', text)}
                    placeholder="Representative Name"
                    placeholderTextColor="#666"
                    editable={!loading}
                  />
                </LinearGradient>
              </View>
            </View>

            {/* Representative Father's Name */}
            <View style={styles.inputRow}>
              <View style={styles.fullWidthInputContainer}>
                <LinearGradient
                  colors={['#7E5EA9', '#20AEBC']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.inputGradient}>
                  <TextInput
                    style={styles.textInput}
                    value={formData.representativeFatherName}
                    onChangeText={(text) => handleInputChange('representativeFatherName', text)}
                    placeholder="Father's Name"
                    placeholderTextColor="#666"
                    editable={!loading}
                  />
                </LinearGradient>
              </View>
            </View>

            {/* Representative Address */}
            <View style={styles.inputRow}>
              <View style={styles.fullWidthInputContainer}>
                <LinearGradient
                  colors={['#7E5EA9', '#20AEBC']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.inputGradient}>
                  <TextInput
                    style={styles.textInput}
                    value={formData.representativeAddress}
                    onChangeText={(text) => handleInputChange('representativeAddress', text)}
                    placeholder="Representative Address"
                    placeholderTextColor="#666"
                    multiline
                    numberOfLines={2}
                    editable={!loading}
                  />
                </LinearGradient>
              </View>
            </View>

            {/* Representative Mobile Number */}
            <View style={styles.inputRow}>
              <View style={styles.fullWidthInputContainer}>
                <LinearGradient
                  colors={['#7E5EA9', '#20AEBC']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.inputGradient}>
                  <TextInput
                    style={styles.textInput}
                    value={formData.representativeMobileNumber}
                    onChangeText={(text) => handleInputChange('representativeMobileNumber', text)}
                    placeholder="Representative Mobile Number"
                    placeholderTextColor="#666"
                    keyboardType="phone-pad"
                    editable={!loading}
                  />
                </LinearGradient>
              </View>
            </View>

            {/* Relation with Owner */}
            <View style={styles.inputRow}>
              <View style={styles.inputContainer}>
                <LinearGradient
                  colors={['#7E5EA9', '#20AEBC']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.inputGradient}>
                  <TouchableOpacity
                    style={styles.dropdownInput}
                    onPress={() => setShowRelationDropdown(true)}
                    disabled={loading}
                  >
                    <Text style={formData.representativeRelation ? styles.selectedText : styles.placeholderText}>
                      {formData.representativeRelation || 'Relation with Owner'}
                    </Text>
                    <Icon name="keyboard-arrow-down" size={24} color="#666" />
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>

            {/* Relation Other - Conditionally Rendered */}
            {formData.representativeRelation === 'Other' && (
              <View style={styles.inputRow}>
                <View style={styles.fullWidthInputContainer}>
                  <LinearGradient
                    colors={['#7E5EA9', '#20AEBC']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.inputGradient}>
                    <TextInput
                      style={styles.textInput}
                      value={formData.representativeRelationOther}
                      onChangeText={(text) => handleInputChange('representativeRelationOther', text)}
                      placeholder="Enter Other Relation"
                      placeholderTextColor="#666"
                      editable={!loading}
                    />
                  </LinearGradient>
                </View>
              </View>
            )}
          </View>
        )}

        {/* Tractor Details Heading */}
        <Text style={styles.sectionHeading}>Tractor Details</Text>

        {/* Tractor Name & Model */}
        <View style={styles.inputRow}>
          <View style={styles.inputContainer}>
            <LinearGradient
              colors={['#7E5EA9', '#20AEBC']}
                start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
              style={styles.inputGradient}>
              <TextInput
                style={styles.textInput}
                value={formData.tractorName}
                onChangeText={(text) => handleInputChange('tractorName', text)}
                placeholder="Tractor Name"
                placeholderTextColor="#666"
                editable={!loading}
              />
            </LinearGradient>
          </View>
          <View style={{marginBottom: 15}} />
          <View style={styles.inputContainer}>
            <LinearGradient
              colors={['#7E5EA9', '#20AEBC']}
                start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
              style={styles.inputGradient}>
              <TouchableOpacity
                style={styles.dropdownInput}
                onPress={() => setShowTractorModelDropdown(true)}
                disabled={loading}
              >
                <Text style={formData.tractorModel ? styles.selectedText : styles.placeholderText}>
                  {formData.tractorModel || 'Select Model'}
                </Text>
                <Icon name="keyboard-arrow-down" size={24} color="#666" />
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>

        {/* Chassis No & Engine No */}
        <View style={styles.inputRow}>
          <View style={styles.inputContainer}>
            <LinearGradient
              colors={['#7E5EA9', '#20AEBC']}
               start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
              style={styles.inputGradient}>
              <View style={styles.inputWithIcon}>
                <TextInput
                  style={[styles.textInput, {flex: 1}]}
                  value={formData.chassisNo}
                  onChangeText={(text) => handleInputChange('chassisNo', text)}
                  placeholder="Chassis No"
                  placeholderTextColor="#666"
                  editable={!loading}
                />
                <TouchableOpacity 
                  style={styles.iconButton}
                  onPress={handleChassisScanPress}
                  disabled={loading}
                >
                  <Icon name="qr-code-scanner" size={20} color="#666" />
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
          <View style={{marginBottom: 15}} />
          <View style={styles.inputContainer}>
            <LinearGradient
              colors={['#7E5EA9', '#20AEBC']}
               start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
              style={styles.inputGradient}>
              <View style={styles.inputWithIcon}>
                <TextInput
                  style={[styles.textInput, {flex: 1}]}
                  value={formData.engineNo}
                  onChangeText={(text) => handleInputChange('engineNo', text)}
                  placeholder="Engine No"
                  placeholderTextColor="#666"
                  editable={!loading}
                />
                <TouchableOpacity 
                  style={styles.iconButton}
                  onPress={handleEngineScanPress}
                  disabled={loading}
                >
                  <Icon name="qr-code-scanner" size={20} color="#666" />
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
        </View>

        {/* Year of Manufacture - Changed to Month/Year Picker */}
        <View style={styles.inputRow}>
          <View style={styles.inputContainer}>
            <LinearGradient
              colors={['#7E5EA9', '#20AEBC']}
                start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
              style={styles.inputGradient}>
              <View style={styles.inputWithIcon}>
                <TouchableOpacity
                  style={[styles.textInput, {flex: 1}]}
                  onPress={handleManufactureDateIconPress}
                  disabled={loading}
                >
                  <Text style={formData.yearOfManufacture ? styles.selectedText : styles.placeholderText}>
                    {formData.yearOfManufacture || 'Month/Year of Manufacture'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.iconButton}
                  onPress={handleManufactureDateIconPress}
                  disabled={loading}
                >
                  <Icon name="calendar-today" size={20} color="#666" />
                </TouchableOpacity>
                {showManufactureDatePicker && (
                  <DateTimePicker
                    value={new Date()}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={handleManufactureDateChange}
                  />
                )}
              </View>
            </LinearGradient>
          </View>
        </View>

        {/* Tires Make with Other option */}
        <View style={styles.inputRow}>
          <View style={styles.inputContainer}>
            <LinearGradient
              colors={['#7E5EA9', '#20AEBC']}
                start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
              style={styles.inputGradient}>
              <TouchableOpacity
                style={styles.dropdownInput}
                onPress={() => setShowTiresMakeDropdown(true)}
                disabled={loading}
              >
                <Text style={formData.tiresMake ? styles.selectedText : styles.placeholderText}>
                  {formData.tiresMake || 'Select Tires Make'}
                </Text>
                <Icon name="keyboard-arrow-down" size={24} color="#666" />
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>

        {/* Tires Make Other - Conditionally Rendered */}
        {formData.tiresMake === 'Other' && (
          <View style={styles.inputRow}>
            <View style={styles.fullWidthInputContainer}>
              <LinearGradient
                colors={['#7E5EA9', '#20AEBC']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.inputGradient}>
                <TextInput
                  style={styles.textInput}
                  value={formData.tiresMakeOther}
                  onChangeText={(text) => handleInputChange('tiresMakeOther', text)}
                  placeholder="Enter Other Tires Make"
                  placeholderTextColor="#666"
                  editable={!loading}
                />
              </LinearGradient>
            </View>
          </View>
        )}

        {/* FIP Make with Other option */}
        <View style={styles.inputRow}>
          <View style={styles.inputContainer}>
            <LinearGradient
              colors={['#7E5EA9', '#20AEBC']}
                start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
              style={styles.inputGradient}>
              <TouchableOpacity
                style={styles.dropdownInput}
                onPress={() => setShowFipMakeDropdown(true)}
                disabled={loading}
              >
                <Text style={formData.fipMake ? styles.selectedText : styles.placeholderText}>
                  {formData.fipMake || 'FIP Make'}
                </Text>
                <Icon name="keyboard-arrow-down" size={24} color="#666" />
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>

        {/* FIP Make Other - Conditionally Rendered */}
        {formData.fipMake === 'Other' && (
          <View style={styles.inputRow}>
            <View style={styles.fullWidthInputContainer}>
              <LinearGradient
                colors={['#7E5EA9', '#20AEBC']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.inputGradient}>
                <TextInput
                  style={styles.textInput}
                  value={formData.fipMakeOther}
                  onChangeText={(text) => handleInputChange('fipMakeOther', text)}
                  placeholder="Enter Other FIP Make"
                  placeholderTextColor="#666"
                  editable={!loading}
                />
              </LinearGradient>
            </View>
          </View>
        )}

        {/* Battery Make with Other option */}
        <View style={styles.inputRow}>
          <View style={styles.inputContainer}>
            <LinearGradient
              colors={['#7E5EA9', '#20AEBC']}
                start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
              style={styles.inputGradient}>
              <TouchableOpacity
                style={styles.dropdownInput}
                onPress={() => setShowBatteryMakeDropdown(true)}
                disabled={loading}
              >
                <Text style={formData.batteryMake ? styles.selectedText : styles.placeholderText}>
                  {formData.batteryMake || 'Select Battery Make'}
                </Text>
                <Icon name="keyboard-arrow-down" size={24} color="#666" />
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>

        {/* Battery Make Other - Conditionally Rendered */}
        {formData.batteryMake === 'Other' && (
          <View style={styles.inputRow}>
            <View style={styles.fullWidthInputContainer}>
              <LinearGradient
                colors={['#7E5EA9', '#20AEBC']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.inputGradient}>
                <TextInput
                  style={styles.textInput}
                  value={formData.batteryMakeOther}
                  onChangeText={(text) => handleInputChange('batteryMakeOther', text)}
                  placeholder="Enter Other Battery Make"
                  placeholderTextColor="#666"
                  editable={!loading}
                />
              </LinearGradient>
            </View>
          </View>
        )}

        {/* Payment Details Heading */}
        <Text style={styles.sectionHeading}>Payment Details</Text>

        {/* Deal Price */}
        <View style={styles.inputRow}>
          <View style={styles.inputContainer}>
            <LinearGradient
              colors={['#7E5EA9', '#20AEBC']}
                start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
              style={styles.inputGradient}>
              <TextInput
                style={styles.textInput}
                value={formData.dealPrice}
                onChangeText={(text) => handleInputChange('dealPrice', text)}
                placeholder="Deal Price"
                placeholderTextColor="#666"
                keyboardType="numeric"
                editable={!loading}
              />
            </LinearGradient>
          </View>
        </View>

        {/* Cash Paid & Finance Amount Paid */}
        <View style={styles.inputRow}>
          <View style={styles.inputContainer}>
            <LinearGradient
              colors={['#7E5EA9', '#20AEBC']}
                start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
              style={styles.inputGradient}>
              <TextInput
                style={styles.textInput}
                value={formData.cashPaid}
                onChangeText={(text) => handleInputChange('cashPaid', text)}
                placeholder="Cash Paid"
                placeholderTextColor="#666"
                keyboardType="numeric"
                editable={!loading}
              />
            </LinearGradient>
          </View>
          
          <View style={styles.inputContainer}>
         <View style={{marginBottom: 15}} />
            <LinearGradient
              colors={['#7E5EA9', '#20AEBC']}
                start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
              style={styles.inputGradient}>
              <TextInput
                style={styles.textInput}
                value={formData.financeAmountPaid}
                onChangeText={(text) => handleInputChange('financeAmountPaid', text)}
                placeholder="Finance Amount Paid"
                placeholderTextColor="#666"
                keyboardType="numeric"
                editable={!loading}
              />
            </LinearGradient>
          </View>
        </View>

        {/* Total Paid & Balance Amount */}
        <View style={styles.inputRow}>
          <View style={styles.inputContainer}>
            <Text style={{color:"#666",  fontFamily:"Inter_28pt-SemiBold",}}>Total Amount Paid</Text>
            <LinearGradient
              colors={['#7E5EA9', '#20AEBC']}
                start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
              style={styles.inputGradient}>
              <TextInput
                style={styles.textInput}
                value={formData.totalPaid}
                onChangeText={(text) => handleInputChange('totalPaid', text)}
                placeholder="Total Paid"
                placeholderTextColor="#666"
                keyboardType="numeric"
                editable={!loading}
              />
            </LinearGradient>
          </View>
          <View style={{marginBottom: 15}} />
          <View style={styles.inputContainer}>
              <Text style={{color:"#666",  fontFamily:"Inter_28pt-SemiBold",}}>Total Balance Amount</Text>
            <LinearGradient
              colors={['#7E5EA9', '#20AEBC']}
                start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
              style={styles.inputGradient}>
              <TextInput
                style={styles.textInput}
                value={formData.balanceAmount}
                onChangeText={(text) => handleInputChange('balanceAmount', text)}
                placeholder="Balance Amount"
                placeholderTextColor="#666"
                keyboardType="numeric"
                editable={!loading}
              />
            </LinearGradient>
          </View>
        </View>

        {/* Payment Status */}
        <View style={styles.inputRow}>
          <View style={styles.inputContainer}>
            <LinearGradient
              colors={['#7E5EA9', '#20AEBC']}
                start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
              style={styles.inputGradient}>
              <TouchableOpacity
                style={styles.dropdownInput}
                onPress={() => setShowPaymentStatusDropdown(true)}
                disabled={loading}
              >
                <Text style={formData.paymentStatus ? styles.selectedText : styles.placeholderText}>
                  {formData.paymentStatus || 'Select Payment Status'}
                </Text>
                <Icon name="keyboard-arrow-down" size={24} color="#666" />
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>

        {/* Financer Name - Changed to Hypothecation Dropdown */}
        <View style={styles.inputRow}>
          <View style={styles.inputContainer}>
            <LinearGradient
              colors={['#7E5EA9', '#20AEBC']}
              style={styles.inputGradient}>
              <TouchableOpacity
                style={styles.dropdownInput}
                onPress={() => setShowFinancerDropdown(true)}
                disabled={loading}
              >
                <Text style={formData.financerName ? styles.selectedText : styles.placeholderText}>
                  {formData.financerName || 'Hypothecation'}
                </Text>
                <Icon name="keyboard-arrow-down" size={24} color="#666" />
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>

        {/* Financer Other - Conditionally Rendered */}
        {formData.financerName === 'Other' && (
          <View style={styles.inputRow}>
            <View style={styles.fullWidthInputContainer}>
              <LinearGradient
                colors={['#7E5EA9', '#20AEBC']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.inputGradient}>
                <TextInput
                  style={styles.textInput}
                  value={formData.financerOther}
                  onChangeText={(text) => handleInputChange('financerOther', text)}
                  placeholder="Enter Other Hypothecation"
                  placeholderTextColor="#666"
                  editable={!loading}
                />
              </LinearGradient>
            </View>
          </View>
        )}

        {/* Accessories Heading */}
        <View style={styles.accessoriesHeader}>
          <Text style={styles.sectionHeading}>Accessories Given With Tractor</Text>
        </View>

        {/* Accessories Grid */}
        <View style={styles.accessoriesGrid}>
          {Object.keys(accessories).map((accessory, index) => (
            <TouchableOpacity
              key={accessory}
              style={styles.accessoryItem}
              onPress={() => handleAccessoryToggle(accessory)}
              disabled={loading}
            >
              <LinearGradient
                colors={accessories[accessory] ? ['#12C857', '#12C857'] : ['#f0f0f0', '#f0f0f0']}
                style={styles.accessoryCheckbox}>
                <View style={styles.accessoryCheckboxInner}>
                  {accessories[accessory] && (
                    <Icon name="check" size={22} color="#fff" />
                  )}
                </View>
              </LinearGradient>
              <Text style={styles.accessoryText}>
                {accessory.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} Issued
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        {/* <View style={{flexDirection:"row",justifyContent:"space-between",marginBottom:20}}>
            <Text style={{fontSize:16,fontFamily:"Inter_28pt-Regular"}}>Add Item</Text>
            <View>
            <TouchableOpacity onPress={handleAddItem} disabled={loading}>
             <Icon name="add" size={25} color="black" style={{marginRight:20}} />
             </TouchableOpacity>
             </View>
        </View> */}

        {/* Terms and Conditions */}
        <View style={styles.termsSection}>
          <Text style={styles.termsHeading}>Terms and Conditions</Text>

         <Text style={styles.termItem}>
   <Text style={{ fontSize: 14, fontFamily: 'Inter_28pt-SemiBold' }}>
    Delivery Condition :
  </Text>
  {' '}The Tractor Has Been Delivered To The Customer In Good Physical Condition And Fully Operational Working Condition. The Customer Has Inspected The Vehicle At The Time Of Delivery And Accepts Its Condition As Satisfactory.
</Text>

        <Text style={styles.termItem}>
   <Text style={{ fontSize: 14, fontFamily: 'Inter_28pt-SemiBold' }}>
    Ownership And Registration :
  </Text>
  {' '}The Ownership Of The Tractor Shall Be Transferred To The Customer Upon Full Payment And Successful Registration With The Relevant Motor Vehicle Authority. The Dealer Will Assist With Documentation If Required.
</Text>

        <Text style={styles.termItem}>
   <Text style={{ fontSize: 14, fontFamily: 'Inter_28pt-SemiBold' }}>
    Warranty And Service :
  </Text>
  {' '}The Tractor Is Covered Under The Manufacturer's Standard Warranty Policy. All Services And Repairs During The Warranty Period Must Be Carried Out At Authorized Service Centers Only.
</Text>

 <Text style={styles.termItem}>
   <Text style={{ fontSize: 14, fontFamily: 'Inter_28pt-SemiBold' }}>
    Liability :
  </Text>
  {' '}The Dealer Shall Not Be Held Liable For Any Damage Or Malfunction Arising Form Misuse, Unauthorized Modifications, Or Failure To Adhere To The Maintenance Schedule After Delivery. 
</Text>

         <Text style={styles.termItem}>
   <Text style={{ fontSize: 14, fontFamily: 'Inter_28pt-SemiBold' }}>
    Payment Terms :
  </Text>
  {' '}Full Payment Has Been Made Prior To Or At The Time Of Delivery Unless Otherwise Agreed In Writing. Any Outstanding Amounts Must Be Cleared As Per The Mutually Agreed Timeline.
</Text>

<Text style={styles.termItem}>
  <Text style={{ fontSize: 14, fontFamily: 'Inter_28pt-SemiBold' }}>
    Dispute Resolution :
  </Text>
  {' '}In Case Of Any Disputes Arising From This Delivery, The Matter Shall Be Resolved Amicably Between Both Parties. If Unresolved, It Will Be Subject To The Jurisdiction Of The Dealer's Location.
</Text>

          <Text style={styles.termItem}>
  <Text style={{ fontSize: 14, fontFamily:"Inter_28pt-SemiBold" }}>
    Acknowledgement :
  </Text>
  {' '}The Customer Acknowledges And Agrees To The Above Terms And Confirms That The Tractor Was Received In A Good And Working Condition.
</Text>

          {/* Accept Terms Checkbox */}
          <TouchableOpacity
            style={styles.termsCheckbox}
            onPress={() => setAcceptTerms(!acceptTerms)}
            activeOpacity={0.8}
            disabled={loading}
          >
            <LinearGradient colors={['grey', 'grey']}  style={styles.checkboxGradient}>
              <View style={[styles.checkboxInner, acceptTerms && styles.checkboxInnerSelected]}>
                {acceptTerms && <Icon name="check" size={16} color="#fff" />}
              </View>
            </LinearGradient>
            <Text style={styles.termsCheckboxText}>Accept All Terms And Conditions</Text>
          </TouchableOpacity>
        </View>

        {/* Signatures Section */}
        <View style={styles.signatureSection}>
          <View style={styles.signatureRow}>
            <TouchableOpacity 
              style={styles.signatureBox} 
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
                <Text style={styles.signatureText}>Customer Signature</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.signatureBox} 
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
                <Text style={styles.signatureText}>Manager Signature</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.signatureBox} 
              onPress={() => showImagePickerOptions(setDriverSignature)}
              disabled={loading}
            >
              {driverSignature ? (
                <Image 
                  source={{ uri: driverSignature.uri }} 
                  style={styles.previewImage}
                  resizeMode="contain"
                />
              ) : (
                <Text style={styles.signatureText}>Driver Signature</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity 
            style={[styles.submitButton, (loading || !acceptTerms) && styles.disabledButton]} 
            onPress={handleSubmit}
            disabled={loading || !acceptTerms}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.buttonText}>
                {isEditMode ? 'Update Delivery Challan' : 'Submit Delivery Challan'}
              </Text>
            )}
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.homeButton, loading && styles.disabledButton]} 
            onPress={handleHome}
            disabled={loading}
          >
            <Text style={styles.buttonText}>Home</Text>
          </TouchableOpacity>
        </View>

        {/* QR Scanner Modal */}
        {renderQRScanner()}

        {/* Dropdown Modals */}
        <Modal
          visible={showTractorModelDropdown || showTiresMakeDropdown || showFipMakeDropdown || 
                   showBatteryMakeDropdown || showPaymentStatusDropdown || showFinancerDropdown ||
                   showHypothecationDropdown || showRelationDropdown}
          transparent={true}
          animationType="slide"
          onRequestClose={() => {
            setShowTractorModelDropdown(false);
            setShowTiresMakeDropdown(false);
            setShowFipMakeDropdown(false);
            setShowBatteryMakeDropdown(false);
            setShowPaymentStatusDropdown(false);
            setShowFinancerDropdown(false);
            setShowHypothecationDropdown(false);
            setShowRelationDropdown(false);
          }}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                  {showTractorModelDropdown && 'Select Tractor Model'}
                  {showTiresMakeDropdown && 'Select Tires Make'}
                  {showFipMakeDropdown && 'Select FIP Make'}
                  {showBatteryMakeDropdown && 'Select Battery Make'}
                  {showPaymentStatusDropdown && 'Select Payment Status'}
                  {showFinancerDropdown && 'Select Hypothecation'}
                  {showHypothecationDropdown && 'Select Hypothecation'}
                  {showRelationDropdown && 'Select Relation'}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setShowTractorModelDropdown(false);
                    setShowTiresMakeDropdown(false);
                    setShowFipMakeDropdown(false);
                    setShowBatteryMakeDropdown(false);
                    setShowPaymentStatusDropdown(false);
                    setShowFinancerDropdown(false);
                    setShowHypothecationDropdown(false);
                    setShowRelationDropdown(false);
                  }}
                  style={styles.closeButton}>
                  <Icon name="close" size={24} color="#000" />
                </TouchableOpacity>
              </View>
              <FlatList
                data={
                  showTractorModelDropdown ? tractorModels :
                  showTiresMakeDropdown ? tiresMakes :
                  showFipMakeDropdown ? fipMakes :
                  showBatteryMakeDropdown ? batteryMakes :
                  showPaymentStatusDropdown ? paymentStatuses :
                  showFinancerDropdown ? hypothecationOptions :
                  showHypothecationDropdown ? hypothecationOptions :
                  showRelationDropdown ? relationOptions : []
                }
                renderItem={renderDropdownItem}
                keyExtractor={(item, index) => index.toString()}
                style={styles.dropdownList}
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    color: 'white',
    fontFamily:"Inter_28pt-SemiBold"
  },
  editModeText: {
    fontSize: 12,
    color: '#f0e6ff',
    fontFamily: 'Inter_28pt-SemiBold',
    marginTop: 5,
  },
  scrollView: {
    flex: 1,
    padding: 15,
  },
  formNoContainer: {
    marginBottom: 15,
  },
  formNoInputContainer: {
    width: '100%',
  },
  inputGradient: {
    borderRadius: 8,
    padding: 1.2,
  },
  textInput: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    fontSize: 14,
    color: '#000',
  },
  iconButton: {
    padding: 4,
    marginRight: 8,
  },
  deliveryModeContainer: {
    marginBottom: 10,
  },
  sectionLabel: {
    fontSize: 17,
    marginBottom: 10,
    color: '#000',
    fontFamily:"Inter_28pt-SemiBold",
    marginTop: 15,
  },
  deliveryModeButtons: {
    flexDirection: 'row',
  },
  deliveryModeButton: {
    marginHorizontal: 5,
    borderRadius: 8,
  },
  deliveryModeGradient: {
    padding: 1,
    borderRadius: 8,
  },
  deliveryModeText: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    textAlign: 'center',
    backgroundColor: '#fff',
    color: '#000',
    borderRadius: 8,
    fontSize: 14,
  },
  deliveryModeTextSelected: {
    color: '#fff',
    backgroundColor: 'transparent',
  },
  sectionHeading: {
    fontSize: 17,
    fontFamily:"Inter_28pt-SemiBold",
    color: '#000',
    marginBottom: 10,
    marginTop: 10,
  },
  inputRow: {
    marginVertical: 10,
  },
  inputContainer: {
    flex: 1,
  },
  fullWidthInputContainer: {
    width: '100%',
    marginBottom: 1,
  },
  dropdownInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
  },
  selectedText: {
    fontSize: 14,
    color: '#000',
  },
  placeholderText: {
    fontSize: 14,
    color: '#666',
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  radioSection: {
    marginBottom: 20,
  },
  radioLabel: {
    fontSize: 17,
    marginBottom: 15,
    color: '#000',
    fontWeight: '500',
    marginTop: 10,
  },
  radioOptions: {
    flexDirection: 'row',
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  radioGradient: {
    width: 25,
    height: 25,
    borderRadius: 3,
    marginRight: 10,
  },
  radioInner: {
    width: 25,
    height: 25,
    borderRadius: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioText: {
    fontSize: 17,
    color: '#000',
    fontFamily:"Inter_28pt-Regular"
  },
  accessoriesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  accessoriesGrid: {
    marginBottom: 0,
  },
  accessoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '70%',
    marginBottom: 25,
  },
  accessoryCheckbox: {
    width: 25,
    height: 25,
    borderRadius: 4,
    padding: 0,
    marginRight: 8,
  },
  accessoryCheckboxInner: {
    width: 25,
    height: 25,
    borderRadius: 3,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  accessoryText: {
    fontSize: 14.5,
    color: '#000',
    flex: 1,
    fontFamily:"Inter_28pt-Regular"
  },
  buttonsContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
  submitButton: {
    backgroundColor: '#7E5EA9',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  homeButton: {
    backgroundColor: '#20AEBC',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily:"Inter_28pt-SemiBold"
  },
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '90%',
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  closeButton: {
    padding: 4,
  },
  dropdownList: {
    maxHeight: 300,
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#333',
  },
  termsSection: {
    marginBottom: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  termsHeading: {
    fontSize: 16,
    fontFamily:"Inter_28pt-SemiBold",
    marginBottom: 10,
    color: '#000',
  },
  termItem: {
    fontSize: 12,
    color: '#333',
    marginBottom: 10,
    lineHeight: 16,
    fontFamily:"Inter_28pt-Medium"
  },
  termsCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  checkboxGradient: { borderRadius: 4, padding: 1, marginRight: 10 },
  checkboxInner: {
    width: 20,
    height: 20,
    borderRadius: 3,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxInnerSelected: { backgroundColor: '#12C857' },
  termsCheckboxText: {
    fontSize: 14,
    color: '#000',
  },
  signatureSection: {
    marginBottom: 20,
  },
  signatureRow: {
    marginTop: 20,
  },
  signatureBox: {
    flex: 1,
    height: 55,
    borderWidth: 1,
    borderColor: '#00000080',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    borderStyle: 'dashed',
    marginBottom: 10,
  },
  signatureText: {
    fontSize: 12,
    color: '#00000099',
    textAlign: 'center',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
   button1: {
    paddingHorizontal: 45,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText1: {
    color: '#fff',
    fontFamily:"Inter_28pt-SemiBold",
  },
  disabledButton: {
    opacity: 0.6,
  },
   formNo: {
    fontSize: 13,
    marginVertical: 10,
    fontFamily: 'Inter_28pt-SemiBold',
    paddingHorizontal: 5,
  },
  branchSection: {
    marginBottom: 15,
  },
  representativeSection: {
    marginBottom: 15,
  },
});

export default DeliveryChallan;