
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
// import {RadioButton} from 'react-native-paper';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import {useSafeAreaInsets} from 'react-native-safe-area-context';
// import LinearGradient from 'react-native-linear-gradient';
// import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Camera } from 'react-native-camera-kit';

// const Rcpage = ({navigation, route}) => {
//   const insets = useSafeAreaInsets();
//   const [userId, setUserId] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [rcIssued, setRcIssued] = useState('yes');
//   const [noPlateIssued, setNoPlateIssued] = useState('yes');
//   const [tractorOwner, setTractorOwner] = useState('yes');
//   const [showModelDropdown, setShowModelDropdown] = useState(false);
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [existingFormId, setExistingFormId] = useState(null);
//   const [existingFormNo, setExistingFormNo] = useState(null);
//   const [acceptedTerms, setAcceptedTerms] = useState(false);

//   // QR Scanner States
//   const [showChassisScanner, setShowChassisScanner] = useState(false);
//   const [showEngineScanner, setShowEngineScanner] = useState(false);
//   const [hasCameraPermission, setHasCameraPermission] = useState(false);

//   // NEW states for added functionality
//   const [showHypoDropdown, setShowHypoDropdown] = useState(false);
//   const [hypothecationOptions] = useState([
//     'John Deere Financial India Private Limited',
//     'The Jammu and Kashmir Bank Limited',
//     'Nil',
//     'Other',
//   ]);
//   const [hypothecationOther, setHypothecationOther] = useState('');
//   const [showRcDatePicker, setShowRcDatePicker] = useState(false);
//   const [showPlateDatePicker, setShowPlateDatePicker] = useState(false);
//   const [rcIssueDate, setRcIssueDate] = useState(null);
//   const [plateIssueDate, setPlateIssueDate] = useState(null);
//   const [rcNoText, setRcNoText] = useState('');
//   const [plateNoText, setPlateNoText] = useState('');
//   const [showRelationDropdown, setShowRelationDropdown] = useState(false);
//   const [relationOptions] = useState([
//     'Father', 'Mother', 'Friend', 'Spouse', 'Brother', 'Sister', 'Son', 'Other'
//   ]);
//   const [relationOther, setRelationOther] = useState('');
//   const [ownerDetails, setOwnerDetails] = useState({
//     ownerName: '',
//     ownerFatherName: '',
//     ownerAddress: '',
//     ownerMobile: '',
//     ownerRelation: '',
//   });

//   const [formData, setFormData] = useState({
//     employeeName: '',
//     customerName: '',
//     percentage: '',
//     address: '',
//     mobileNo: '',
//     registrationNo: '',
//     tractorModel: '',
//     date: null,
//     hypothecation: '',
//     chassisNo: '',
//     engineNo: '',
//   });

//   // Image states
//   const [customerPhoto, setCustomerPhoto] = useState(null);
//   const [customerSignature, setCustomerSignature] = useState(null);
//   const [managerSignature, setManagerSignature] = useState(null);

//   const tractorModels = [
//     "3028EN",
//     "3036EN", 
//     "3036E",
//     "5105",
//     "5105 4WD",
//     "5050D Gear Pro",
//     "5210 Gear Pro",
//     "5050D 4WD Gear Pro",
//     "5210 4WD Gear Pro",
//     "5310 CRDI",
//     "5310 4WD CRDI",
//     "5405 CRDI",
//     "5405 4WD CRDI",
//     "5075 2WD",
//     "5075 4WD"
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
//           setExistingFormNo(editData.form_no); // Keep the original form number
          
//           // Pre-populate form data
//           setFormData({
//             employeeName: editData.employee_name || '',
//             customerName: editData.customer_name || '',
//             percentage: editData.percentage || '',
//             address: editData.address || '',
//             mobileNo: editData.mobile_no || '',
//             registrationNo: editData.registration_no || '',
//             tractorModel: editData.tractor_model || '',
//             date: editData.select_date ? new Date(editData.select_date) : null,
//             hypothecation: editData.hypothecation || '',
//             chassisNo: editData.chassis_no || '',
//             engineNo: editData.engine_no || '',
//           });

//           // Set radio button states
//           setRcIssued(editData.rc_issued?.toLowerCase() === 'no' ? 'no' : 'yes');
//           setNoPlateIssued(editData.plate_issued?.toLowerCase() === 'no' ? 'no' : 'yes');
//           setTractorOwner(editData.tractor_owner?.toLowerCase() === 'no' ? 'no' : 'yes');

//           // Load existing images if available
//           if (editData.customer_photo) {
//             setCustomerPhoto({uri: editData.customer_photo});
//           }
//           if (editData.customer_signature) {
//             setCustomerSignature({uri: editData.customer_signature});
//           }
//           if (editData.manager_signature) {
//             setManagerSignature({uri: editData.manager_signature});
//           }

//           // Load additional fields if present
//           if (editData.hypothecation === 'Other' && editData.hypothecation_other) {
//             setHypothecationOther(editData.hypothecation_other);
//           }

//           if (editData.rc_issue_date) {
//             setRcIssueDate(new Date(editData.rc_issue_date));
//           } else if (editData.rc_no_text) {
//             setRcNoText(editData.rc_no_text);
//           }

//           if (editData.plate_issue_date) {
//             setPlateIssueDate(new Date(editData.plate_issue_date));
//           } else if (editData.plate_no_text) {
//             setPlateNoText(editData.plate_no_text);
//           }

//           if (editData.tractor_owner === 'No') {
//             setOwnerDetails({
//               ownerName: editData.owner_name || '',
//               ownerFatherName: editData.owner_father_name || '',
//               ownerAddress: editData.owner_address || '',
//               ownerMobile: editData.owner_mobile || '',
//               ownerRelation: editData.owner_relation || '',
//             });
//             if (editData.owner_relation === 'Other' && editData.owner_relation_other) {
//               setRelationOther(editData.owner_relation_other);
//             }
//           }

//           console.log('Edit mode activated for form ID:', editData.id, 'Form No:', editData.form_no);
//         }
//       } catch (error) {
//         console.log('Error loading user data:', error);
//       }
//     };

//     getUserData();
//   }, [route.params]);

//   // Generate form number - only for new forms
//   const generateFormNo = () => {
//     if (isEditMode && existingFormNo) {
//       return existingFormNo; // Use existing form number for updates
//     }
//     const timestamp = new Date().getTime();
//     return `RC${timestamp}`;
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

//   // Special handler for percentage - ensures only numeric (number pad, no alphabets)
//   const handlePercentageChange = (text) => {
//     // allow numbers and optional single decimal point
//     const filtered = text.replace(/[^0-9.]/g, '');
//     // prevent multiple dots
//     const parts = filtered.split('.');
//     let final = filtered;
//     if (parts.length > 2) {
//       final = parts[0] + '.' + parts.slice(1).join('');
//     }
//     handleInputChange('percentage', final);
//   };

//   const handleModelSelect = (model) => {
//     handleInputChange('tractorModel', model);
//     setShowModelDropdown(false);
//   };

//   const handleHypoSelect = (option) => {
//     if (option === 'Other') {
//       // set hypothecation to Other and show other input
//       handleInputChange('hypothecation', 'Other');
//       setHypothecationOther(''); // empty to allow input
//       setShowHypoDropdown(false);
//     } else {
//       handleInputChange('hypothecation', option);
//       setHypothecationOther('');
//       setShowHypoDropdown(false);
//     }
//   };

//   const handleRelationSelect = (option) => {
//     if (option === 'Other') {
//       setOwnerDetails(prev => ({...prev, ownerRelation: 'Other'}));
//       setRelationOther('');
//       setShowRelationDropdown(false);
//     } else {
//       setOwnerDetails(prev => ({...prev, ownerRelation: option}));
//       setRelationOther('');
//       setShowRelationDropdown(false);
//     }
//   };

//   const handleDateChange = (event, selectedDate) => {
//     setShowDatePicker(false);
//     if (selectedDate) {
//       handleInputChange('date', selectedDate);
//     }
//   };

//   const handleRcDateChange = (event, selectedDate) => {
//     setShowRcDatePicker(false);
//     if (selectedDate) {
//       setRcIssueDate(selectedDate);
//     }
//   };

//   const handlePlateDateChange = (event, selectedDate) => {
//     setShowPlateDatePicker(false);
//     if (selectedDate) {
//       setPlateIssueDate(selectedDate);
//     }
//   };

//   const validateForm = () => {
//     const requiredFields = [
//       'employeeName', 'customerName', 'percentage', 'address', 
//       'mobileNo', 'registrationNo', 'tractorModel',
//       'chassisNo', 'engineNo'
//     ];

//     for (const field of requiredFields) {
//       if (!formData[field] || formData[field].toString().trim() === '') {
//         Alert.alert('Validation Error', `Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
//         return false;
//       }
//     }

//     // Hypothecation required
//     if (!formData.hypothecation || formData.hypothecation.trim() === '') {
//       Alert.alert('Validation Error', 'Please select hypothecation');
//       return false;
//     }

//     // If hypothecation is Other, ensure other text provided
//     if (formData.hypothecation === 'Other' && (!hypothecationOther || hypothecationOther.trim() === '')) {
//       Alert.alert('Validation Error', 'Please enter hypothecation details for Other');
//       return false;
//     }

//     // RC Issued conditional validation
//     if (rcIssued === 'yes') {
//       if (!rcIssueDate) {
//         Alert.alert('Validation Error', 'Please select RC issue date');
//         return false;
//       }
//     } else {
//       if (!rcNoText || rcNoText.trim() === '') {
//         Alert.alert('Validation Error', 'Please enter RC not issued details');
//         return false;
//       }
//     }

//     // Plate Issued conditional validation
//     if (noPlateIssued === 'yes') {
//       if (!plateIssueDate) {
//         Alert.alert('Validation Error', 'Please select number plate issue date');
//         return false;
//       }
//     } else {
//       if (!plateNoText || plateNoText.trim() === '') {
//         Alert.alert('Validation Error', 'Please enter number plate not issued details');
//         return false;
//       }
//     }

//     // If tractor owner is No, new owner details required
//     if (tractorOwner === 'no') {
//       if (!ownerDetails.ownerName || ownerDetails.ownerName.trim() === '') {
//         Alert.alert('Validation Error', 'Please enter owner name');
//         return false;
//       }
//       if (!ownerDetails.ownerFatherName || ownerDetails.ownerFatherName.trim() === '') {
//         Alert.alert('Validation Error', 'Please enter owner father\'s name');
//         return false;
//       }
//       if (!ownerDetails.ownerAddress || ownerDetails.ownerAddress.trim() === '') {
//         Alert.alert('Validation Error', 'Please enter owner address');
//         return false;
//       }
//       if (!ownerDetails.ownerMobile || ownerDetails.ownerMobile.trim() === '') {
//         Alert.alert('Validation Error', 'Please enter owner mobile number');
//         return false;
//       }
//       if (!ownerDetails.ownerRelation || ownerDetails.ownerRelation.trim() === '') {
//         Alert.alert('Validation Error', 'Please select owner relation');
//         return false;
//       }
//       if (ownerDetails.ownerRelation === 'Other' && (!relationOther || relationOther.trim() === '')) {
//         Alert.alert('Validation Error', 'Please enter owner relation detail for Other');
//         return false;
//       }
//     }

//     // Terms and conditions validation
//     if (!acceptedTerms) {
//       Alert.alert('Validation Error', 'Please accept all terms and conditions');
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
//       formDataToSend.append('form_no', existingFormNo); // Use existing form number
      
//       console.log('UPDATE MODE - Form ID:', existingFormId, 'Form No:', existingFormNo);
//     } else {
//       // For new forms, generate new form number
//       formDataToSend.append('form_no', generateFormNo());
//       console.log('CREATE MODE - New Form No:', generateFormNo());
//     }

//     // Common form data for both create and update
//     formDataToSend.append('user_id', userId);
//     formDataToSend.append('form_date', new Date().toISOString().split('T')[0]);
//     formDataToSend.append('employee_name', formData.employeeName);
//     formDataToSend.append('customer_name', formData.customerName);
//     formDataToSend.append('percentage', formData.percentage);
//     formDataToSend.append('address', formData.address);
//     formDataToSend.append('mobile_no', formData.mobileNo);
//     formDataToSend.append('registration_no', formData.registrationNo);
//     formDataToSend.append('tractor_model', formData.tractorModel);
//     formDataToSend.append('select_date', formData.date ? formData.date.toISOString().split('T')[0] : '');
//     // Hypothecation: if Other, send the other text as hypothecation_other and keep hypothecation as 'Other'
//     formDataToSend.append('hypothecation', formData.hypothecation);
//     if (formData.hypothecation === 'Other') {
//       formDataToSend.append('hypothecation_other', hypothecationOther);
//     }
//     formDataToSend.append('chassis_no', formData.chassisNo);
//     formDataToSend.append('engine_no', formData.engineNo);
//     formDataToSend.append('rc_issued', rcIssued === 'yes' ? 'Yes' : 'No');
//     formDataToSend.append('plate_issued', noPlateIssued === 'yes' ? 'Yes' : 'No');
//     formDataToSend.append('tractor_owner', tractorOwner === 'yes' ? 'Yes' : 'No');

//     // RC fields
//     if (rcIssued === 'yes') {
//       formDataToSend.append('rc_issue_date', rcIssueDate ? rcIssueDate.toISOString().split('T')[0] : '');
//     } else {
//       formDataToSend.append('rc_no_text', rcNoText);
//     }

//     // Plate fields
//     if (noPlateIssued === 'yes') {
//       formDataToSend.append('plate_issue_date', plateIssueDate ? plateIssueDate.toISOString().split('T')[0] : '');
//     } else {
//       formDataToSend.append('plate_no_text', plateNoText);
//     }

//     // Owner details if tractor owner is No
//     if (tractorOwner === 'no') {
//       formDataToSend.append('owner_name', ownerDetails.ownerName);
//       formDataToSend.append('owner_father_name', ownerDetails.ownerFatherName);
//       formDataToSend.append('owner_address', ownerDetails.ownerAddress);
//       formDataToSend.append('owner_mobile', ownerDetails.ownerMobile);
//       formDataToSend.append('owner_relation', ownerDetails.ownerRelation);
//       if (ownerDetails.ownerRelation === 'Other') {
//         formDataToSend.append('owner_relation_other', relationOther);
//       }
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
//         url = `https://argosmob.uk/makroo/public/api/v1/rc-no-plate-delivery/form/update`;
//         method = 'put';
//         console.log('UPDATE REQUEST - URL:', url, 'Method:', method, 'Form ID:', existingFormId);
//       } else {
//         // For create, use POST method
//         url = 'https://argosmob.uk/makroo/public/api/v1/rc-no-plate-delivery/form/save';
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
//         successMessage = 'Form updated successfully!';
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
//         successMessage = 'Form submitted successfully!';
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
//     Alert.alert('PDF', 'PDF Challan generated!');
//   };

//   // Placeholder functions for icon actions
//   const handleDateIconPress = () => {
//     setShowDatePicker(true);
//   };

//   const renderModelItem = ({item}) => (
//     <TouchableOpacity
//       style={styles.modelItem}
//       onPress={() => handleModelSelect(item)}>
//       <Text style={styles.modelItemText}>{item}</Text>
//     </TouchableOpacity>
//   );

//   const renderHypoItem = ({item}) => (
//     <TouchableOpacity
//       style={styles.modelItem}
//       onPress={() => handleHypoSelect(item)}>
//       <Text style={styles.modelItemText}>{item}</Text>
//     </TouchableOpacity>
//   );

//   const renderRelationItem = ({item}) => (
//     <TouchableOpacity
//       style={styles.modelItem}
//       onPress={() => handleRelationSelect(item)}>
//       <Text style={styles.modelItemText}>{item}</Text>
//     </TouchableOpacity>
//   );

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

//   return (
//     <View
//       style={{flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom}}>
//       {/* Header with Gradient */}
//       <LinearGradient
//         colors={['#7E5EA9', '#20AEBC']}
//         start={{x: 0, y: 0}}
//         end={{x: 1, y: 0}}
//         style={styles.header}>
//         <Text style={styles.companyName}>Makroo Motor Corporation</Text>
//         <Text style={styles.companyName}>RC And Number Plate</Text>
//         <Text style={styles.companyName}>Delivery Form</Text>
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
//           <View style={styles.row}>
//             <View style={styles.inputContainer}>
//               <LinearGradient
//                 colors={['#7E5EA9', '#20AEBC']}
//                 start={{x: 0, y: 0}}
//                 end={{x: 1, y: 0}}
//                 style={styles.inputGradient}>
//                 <TextInput
//                   style={styles.input}
//                   value={formData.employeeName}
//                   onChangeText={text => handleInputChange('employeeName', text)}
//                   placeholder="Employee name"
//                   editable={!loading}
//                 />
//               </LinearGradient>
//             </View>

//             <View style={styles.inputContainer}>
//               <LinearGradient
//                 colors={['#7E5EA9', '#20AEBC']}
//                 start={{x: 0, y: 0}}
//                 end={{x: 1, y: 0}}
//                 style={styles.inputGradient}>
//                 <TextInput
//                   style={styles.input}
//                   value={formData.customerName}
//                   onChangeText={text => handleInputChange('customerName', text)}
//                   placeholder="Customer name"
//                   editable={!loading}
//                 />
//               </LinearGradient>
//             </View>
//           </View>

//           <View style={styles.row}>
//             <View style={styles.inputContainer}>
//               <LinearGradient
//                 colors={['#7E5EA9', '#20AEBC']}
//                 start={{x: 0, y: 0}}
//                 end={{x: 1, y: 0}}
//                 style={styles.inputGradient}>
//                 <TextInput
//                   style={styles.input}
//                   value={formData.percentage}
//                   onChangeText={handlePercentageChange}
//                   placeholder="Parentage"
//                   keyboardType="numeric"
//                   editable={!loading}
//                 />
//               </LinearGradient>
//             </View>

//             <View style={styles.inputContainer}>
//               <LinearGradient
//                 colors={['#7E5EA9', '#20AEBC']}
//                 start={{x: 0, y: 0}}
//                 end={{x: 1, y: 0}}
//                 style={styles.inputGradient}>
//                 <TextInput
//                   style={styles.input}
//                   value={formData.address}
//                   onChangeText={text => handleInputChange('address', text)}
//                   placeholder="Address"
//                   editable={!loading}
//                 />
//               </LinearGradient>
//             </View>
//           </View>

//           <View style={styles.row}>
//             <View style={styles.inputContainer}>
//               <LinearGradient
//                 colors={['#7E5EA9', '#20AEBC']}
//                 start={{x: 0, y: 0}}
//                 end={{x: 1, y: 0}}
//                 style={styles.inputGradient}>
//                 <TextInput
//                   style={styles.input}
//                   value={formData.mobileNo}
//                   onChangeText={text => handleInputChange('mobileNo', text)}
//                   placeholder="Mobile No."
//                   keyboardType="phone-pad"
//                   editable={!loading}
//                 />
//               </LinearGradient>
//             </View>

//             <View style={styles.inputContainer}>
//               <LinearGradient
//                 colors={['#7E5EA9', '#20AEBC']}
//                 start={{x: 0, y: 0}}
//                 end={{x: 1, y: 0}}
//                 style={styles.inputGradient}>
//                 <TextInput
//                   style={styles.input}
//                   value={formData.registrationNo}
//                   onChangeText={text =>
//                     handleInputChange('registrationNo', text)
//                   }
//                   placeholder="Registration No."
//                   editable={!loading}
//                 />
//               </LinearGradient>
//             </View>
//           </View>

//           <View style={styles.row}>
//             <View style={styles.inputContainer}>
//               <LinearGradient
//                 colors={['#7E5EA9', '#20AEBC']}
//                 start={{x: 0, y: 0}}
//                 end={{x: 1, y: 0}}
//                 style={styles.inputGradient}>
//                 <TouchableOpacity 
//                   style={styles.input}
//                   onPress={() => setShowModelDropdown(true)}
//                   disabled={loading}
//                 >
//                   <Text style={
//                     formData.tractorModel ? 
//                     styles.selectedModelText : 
//                     styles.placeholderText
//                   }>
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
//                 start={{x: 0, y: 0}}
//                 end={{x: 1, y: 0}}
//                 style={styles.inputGradient}>
//                 <View style={styles.inputWithIcon}>
//                   <TouchableOpacity
//                     style={[styles.input, styles.inputWithIconField]}
//                     onPress={handleDateIconPress}
//                     disabled={loading}
//                   >
//                     <Text style={
//                       formData.date ? 
//                       styles.selectedModelText : 
//                       styles.placeholderText
//                     }>
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

//           {/* Hypothecation Dropdown */}
//           <View style={styles.row}>
//             <View style={styles.inputContainer}>
//               <LinearGradient
//                 colors={['#7E5EA9', '#20AEBC']}
//                 start={{x: 0, y: 0}}
//                 end={{x: 1, y: 0}}
//                 style={styles.inputGradient}>
//                 <TouchableOpacity
//                   style={styles.input}
//                   onPress={() => setShowHypoDropdown(true)}
//                   disabled={loading}
//                 >
//                   <Text style={ formData.hypothecation ? styles.selectedModelText : styles.placeholderText }>
//                     {formData.hypothecation ? (formData.hypothecation === 'Other' ? 'Other' : formData.hypothecation) : 'Select Hypothecation'}
//                   </Text>
//                   <Icon name="keyboard-arrow-down" size={25} color="#666" style={styles.dropdownIcon} />
//                 </TouchableOpacity>
//               </LinearGradient>

//               {/* If Other selected show text input (LinearGradient) */}
//               {formData.hypothecation === 'Other' && (
//                 <View style={{marginTop: 8}}>
//                   <LinearGradient
//                     colors={['#7E5EA9', '#20AEBC']}
//                     start={{x: 0, y: 0}}
//                     end={{x: 1, y: 0}}
//                     style={styles.inputGradient}>
//                     <TextInput
//                       style={styles.input}
//                       value={hypothecationOther}
//                       onChangeText={text => setHypothecationOther(text)}
//                       placeholder="Enter Hypothecation details"
//                       editable={!loading}
//                     />
//                   </LinearGradient>
//                 </View>
//               )}
//             </View>

//             <View style={styles.inputContainer}>
//               <LinearGradient
//                 colors={['#7E5EA9', '#20AEBC']}
//                 start={{x: 0, y: 0}}
//                 end={{x: 1, y: 0}}
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

//           <View style={styles.row}>
//             <View style={styles.inputContainer}>
//               <LinearGradient
//                 colors={['#7E5EA9', '#20AEBC']}
//                 start={{x: 0, y: 0}}
//                 end={{x: 1, y: 0}}
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
//         </View>

//         {/* Tractor Model Dropdown Modal */}
//         <Modal
//           visible={showModelDropdown}
//           transparent={true}
//           animationType="slide"
//           onRequestClose={() => setShowModelDropdown(false)}
//         >
//           <View style={styles.modalOverlay}>
//             <View style={styles.modalContent}>
//               <View style={styles.modalHeader}>
//                 <Text style={styles.modalTitle}>Select Tractor Model</Text>
//                 <TouchableOpacity 
//                   onPress={() => setShowModelDropdown(false)}
//                   style={styles.closeButton}
//                 >
//                   <Icon name="close" size={24} color="#000" />
//                 </TouchableOpacity>
//               </View>
//               <FlatList
//                 data={tractorModels}
//                 renderItem={renderModelItem}
//                 keyExtractor={(item, index) => index.toString()}
//                 style={styles.modelList}
//                 showsVerticalScrollIndicator={true}
//               />
//             </View>
//           </View>
//         </Modal>

//         {/* Hypothecation Dropdown Modal */}
//         <Modal
//           visible={showHypoDropdown}
//           transparent={true}
//           animationType="slide"
//           onRequestClose={() => setShowHypoDropdown(false)}
//         >
//           <View style={styles.modalOverlay}>
//             <View style={styles.modalContent}>
//               <View style={styles.modalHeader}>
//                 <Text style={styles.modalTitle}>Select Hypothecation</Text>
//                 <TouchableOpacity 
//                   onPress={() => setShowHypoDropdown(false)}
//                   style={styles.closeButton}
//                 >
//                   <Icon name="close" size={24} color="#000" />
//                 </TouchableOpacity>
//               </View>
//               <FlatList
//                 data={hypothecationOptions}
//                 renderItem={renderHypoItem}
//                 keyExtractor={(item, index) => index.toString()}
//                 style={styles.modelList}
//                 showsVerticalScrollIndicator={true}
//               />
//             </View>
//           </View>
//         </Modal>

//         {/* Relation Dropdown Modal */}
//         <Modal
//           visible={showRelationDropdown}
//           transparent={true}
//           animationType="slide"
//           onRequestClose={() => setShowRelationDropdown(false)}
//         >
//           <View style={styles.modalOverlay}>
//             <View style={styles.modalContent}>
//               <View style={styles.modalHeader}>
//                 <Text style={styles.modalTitle}>Select Relation</Text>
//                 <TouchableOpacity 
//                   onPress={() => setShowRelationDropdown(false)}
//                   style={styles.closeButton}
//                 >
//                   <Icon name="close" size={24} color="#000" />
//                 </TouchableOpacity>
//               </View>
//               <FlatList
//                 data={relationOptions}
//                 renderItem={renderRelationItem}
//                 keyExtractor={(item, index) => index.toString()}
//                 style={styles.modelList}
//                 showsVerticalScrollIndicator={true}
//               />
//             </View>
//           </View>
//         </Modal>

//         {/* QR Scanner Modal */}
//         {renderQRScanner()}

//         {/* Radio Button Sections */}
//         <View style={styles.radioSection}>
//           {/* RC Issued */}
//           <View style={styles.radioGroup}>
//             <Text style={styles.radioLabel}>RC Issued:</Text>
//             <View style={styles.radioOptionsContainer}>
//               <TouchableOpacity
//                 style={[
//                   styles.radioOptionWrapper,
//                   rcIssued === 'yes' && styles.radioOptionSelected,
//                 ]}
//                 onPress={() => setRcIssued('yes')}
//                 disabled={loading}
//               >
//                 <LinearGradient
//                   colors={['#7E5EA9', '#20AEBC']}
//                   start={{x: 0, y: 0}}
//                   end={{x: 1, y: 0}}
//                   style={styles.radioOptionGradient}>
//                   <View
//                     style={[
//                       styles.radioOptionInner,
//                       rcIssued === 'yes' && styles.radioOptionInnerSelected,
//                     ]}>
//                     <Text
//                       style={[
//                         styles.radioOptionText,
//                         rcIssued === 'yes' && styles.radioOptionTextSelected,
//                       ]}>
//                       Yes
//                     </Text>
//                   </View>
//                 </LinearGradient>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={[
//                   styles.radioOptionWrapper,
//                   rcIssued === 'no' && styles.radioOptionSelected,
//                 ]}
//                 onPress={() => setRcIssued('no')}
//                 disabled={loading}
//               >
//                 <LinearGradient
//                   colors={['#7E5EA9', '#20AEBC']}
//                   start={{x: 0, y: 0}}
//                   end={{x: 1, y: 0}}
//                   style={styles.radioOptionGradient}>
//                   <View
//                     style={[
//                       styles.radioOptionInner,
//                       rcIssued === 'no' && styles.radioOptionInnerSelected,
//                     ]}>
//                     <Text
//                       style={[
//                         styles.radioOptionText,
//                         rcIssued === 'no' && styles.radioOptionTextSelected,
//                       ]}>
//                       No
//                     </Text>
//                   </View>
//                 </LinearGradient>
//               </TouchableOpacity>
//             </View>

//             {/* Conditional UI for RC Issued */}
//             <View style={{marginTop: 8}}>
//               {rcIssued === 'yes' ? (
//                 <LinearGradient
//                   colors={['#7E5EA9', '#20AEBC']}
//                   start={{x: 0, y: 0}}
//                   end={{x: 1, y: 0}}
//                   style={styles.inputGradient}>
//                   <View style={styles.inputWithIcon}>
//                     <TouchableOpacity
//                       style={[styles.input, styles.inputWithIconField]}
//                       onPress={() => setShowRcDatePicker(true)}
//                       disabled={loading}
//                     >
//                       <Text style={ rcIssueDate ? styles.selectedModelText : styles.placeholderText }>
//                         {rcIssueDate ? rcIssueDate.toLocaleDateString() : 'Select RC Issue Date'}
//                       </Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                       onPress={() => setShowRcDatePicker(true)}
//                       style={styles.iconButton}
//                       disabled={loading}
//                     >
//                       <Icon name="calendar-today" size={20} color="#666" />
//                     </TouchableOpacity>
//                   </View>
//                   {showRcDatePicker && (
//                     <DateTimePicker
//                       value={rcIssueDate || new Date()}
//                       mode="date"
//                       display={Platform.OS === 'ios' ? 'spinner' : 'default'}
//                       onChange={handleRcDateChange}
//                     />
//                   )}
//                 </LinearGradient>
//               ) : (
//                 <LinearGradient
//                   colors={['#7E5EA9', '#20AEBC']}
//                   start={{x: 0, y: 0}}
//                   end={{x: 1, y: 0}}
//                   style={[styles.inputGradient, {marginTop: 4}]}>
//                   <TextInput
//                     style={styles.input}
//                     value={rcNoText}
//                     onChangeText={text => setRcNoText(text)}
//                     placeholder="Enter RC not issued details"
//                     editable={!loading}
//                   />
//                 </LinearGradient>
//               )}
//             </View>
//           </View>

//           {/* No. Plate Issued */}
//           <View style={styles.radioGroup}>
//             <Text style={styles.radioLabel}>No. Plate Issued:</Text>
//             <View style={styles.radioOptionsContainer}>
//               <TouchableOpacity
//                 style={[
//                   styles.radioOptionWrapper,
//                   noPlateIssued === 'yes' && styles.radioOptionSelected,
//                 ]}
//                 onPress={() => setNoPlateIssued('yes')}
//                 disabled={loading}
//               >
//                 <LinearGradient
//                   colors={['#7E5EA9', '#20AEBC']}
//                   start={{x: 0, y: 0}}
//                   end={{x: 1, y: 0}}
//                   style={styles.radioOptionGradient}>
//                   <View
//                     style={[
//                       styles.radioOptionInner,
//                       noPlateIssued === 'yes' &&
//                         styles.radioOptionInnerSelected,
//                     ]}>
//                     <Text
//                       style={[
//                         styles.radioOptionText,
//                         noPlateIssued === 'yes' &&
//                           styles.radioOptionTextSelected,
//                       ]}>
//                       Yes
//                     </Text>
//                   </View>
//                 </LinearGradient>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={[
//                   styles.radioOptionWrapper,
//                   noPlateIssued === 'no' && styles.radioOptionSelected,
//                 ]}
//                 onPress={() => setNoPlateIssued('no')}
//                 disabled={loading}
//               >
//                 <LinearGradient
//                   colors={['#7E5EA9', '#20AEBC']}
//                   start={{x: 0, y: 0}}
//                   end={{x: 1, y: 0}}
//                   style={styles.radioOptionGradient}>
//                   <View
//                     style={[
//                       styles.radioOptionInner,
//                       noPlateIssued === 'no' && styles.radioOptionInnerSelected,
//                     ]}>
//                     <Text
//                       style={[
//                         styles.radioOptionText,
//                         noPlateIssued === 'no' &&
//                           styles.radioOptionTextSelected,
//                       ]}>
//                       No
//                     </Text>
//                   </View>
//                 </LinearGradient>
//               </TouchableOpacity>
//             </View>

//             {/* Conditional UI for Plate Issued */}
//             <View style={{marginTop: 8}}>
//               {noPlateIssued === 'yes' ? (
//                 <LinearGradient
//                   colors={['#7E5EA9', '#20AEBC']}
//                   start={{x: 0, y: 0}}
//                   end={{x: 1, y: 0}}
//                   style={styles.inputGradient}>
//                   <View style={styles.inputWithIcon}>
//                     <TouchableOpacity
//                       style={[styles.input, styles.inputWithIconField]}
//                       onPress={() => setShowPlateDatePicker(true)}
//                       disabled={loading}
//                     >
//                       <Text style={ plateIssueDate ? styles.selectedModelText : styles.placeholderText }>
//                         {plateIssueDate ? plateIssueDate.toLocaleDateString() : 'Select Plate Issue Date'}
//                       </Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                       onPress={() => setShowPlateDatePicker(true)}
//                       style={styles.iconButton}
//                       disabled={loading}
//                     >
//                       <Icon name="calendar-today" size={20} color="#666" />
//                     </TouchableOpacity>
//                   </View>
//                   {showPlateDatePicker && (
//                     <DateTimePicker
//                       value={plateIssueDate || new Date()}
//                       mode="date"
//                       display={Platform.OS === 'ios' ? 'spinner' : 'default'}
//                       onChange={handlePlateDateChange}
//                     />
//                   )}
//                 </LinearGradient>
//               ) : (
//                 <LinearGradient
//                   colors={['#7E5EA9', '#20AEBC']}
//                   start={{x: 0, y: 0}}
//                   end={{x: 1, y: 0}}
//                   style={[styles.inputGradient, {marginTop: 4}]}>
//                   <TextInput
//                     style={styles.input}
//                     value={plateNoText}
//                     onChangeText={text => setPlateNoText(text)}
//                     placeholder="Enter plate not issued details"
//                     editable={!loading}
//                   />
//                 </LinearGradient>
//               )}
//             </View>
//           </View>

//           {/* Are Tractor Owner */}
//           <View style={styles.radioGroup}>
//             <Text style={styles.radioLabel}>Are Tractor Owner:</Text>
//             <View style={styles.radioOptionsContainer}>
//               <TouchableOpacity
//                 style={[
//                   styles.radioOptionWrapper,
//                   tractorOwner === 'yes' && styles.radioOptionSelected,
//                 ]}
//                 onPress={() => setTractorOwner('yes')}
//                 disabled={loading}
//               >
//                 <LinearGradient
//                   colors={['#7E5EA9', '#20AEBC']}
//                   start={{x: 0, y: 0}}
//                   end={{x: 1, y: 0}}
//                   style={styles.radioOptionGradient}>
//                   <View
//                     style={[
//                       styles.radioOptionInner,
//                       tractorOwner === 'yes' && styles.radioOptionInnerSelected,
//                     ]}>
//                     <Text
//                       style={[
//                         styles.radioOptionText,
//                         tractorOwner === 'yes' &&
//                           styles.radioOptionTextSelected,
//                       ]}>
//                       Yes
//                     </Text>
//                   </View>
//                 </LinearGradient>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 style={[
//                   styles.radioOptionWrapper,
//                   tractorOwner === 'no' && styles.radioOptionSelected,
//                 ]}
//                 onPress={() => setTractorOwner('no')}
//                 disabled={loading}
//               >
//                 <LinearGradient
//                   colors={['#7E5EA9', '#20AEBC']}
//                   start={{x: 0, y: 0}}
//                   end={{x: 1, y: 0}}
//                   style={styles.radioOptionGradient}>
//                   <View
//                     style={[
//                       styles.radioOptionInner,
//                       tractorOwner === 'no' && styles.radioOptionInnerSelected,
//                     ]}>
//                     <Text
//                       style={[
//                         styles.radioOptionText,
//                         tractorOwner === 'no' && styles.radioOptionTextSelected,
//                       ]}>
//                       No
//                     </Text>
//                   </View>
//                 </LinearGradient>
//               </TouchableOpacity>
//             </View>

//             {/* If not owner show additional fields */}
//             {tractorOwner === 'no' && (
//               <View style={{marginTop: 8}}>
//                 <View style={styles.row}>
//                   <View style={styles.inputContainer}>
//                     <LinearGradient
//                       colors={['#7E5EA9', '#20AEBC']}
//                       start={{x: 0, y: 0}}
//                       end={{x: 1, y: 0}}
//                       style={styles.inputGradient}>
//                       <TextInput
//                         style={styles.input}
//                         value={ownerDetails.ownerName}
//                         onChangeText={text => setOwnerDetails(prev => ({...prev, ownerName: text}))}
//                         placeholder="Name"
//                         editable={!loading}
//                       />
//                     </LinearGradient>
//                   </View>

//                   <View style={styles.inputContainer}>
//                     <LinearGradient
//                       colors={['#7E5EA9', '#20AEBC']}
//                       start={{x: 0, y: 0}}
//                       end={{x: 1, y: 0}}
//                       style={styles.inputGradient}>
//                       <TextInput
//                         style={styles.input}
//                         value={ownerDetails.ownerFatherName}
//                         onChangeText={text => setOwnerDetails(prev => ({...prev, ownerFatherName: text}))}
//                         placeholder="Father's Name"
//                         editable={!loading}
//                       />
//                     </LinearGradient>
//                   </View>
//                 </View>

//                 <View style={styles.row}>
//                   <View style={styles.inputContainer}>
//                     <LinearGradient
//                       colors={['#7E5EA9', '#20AEBC']}
//                       start={{x: 0, y: 0}}
//                       end={{x: 1, y: 0}}
//                       style={styles.inputGradient}>
//                       <TextInput
//                         style={styles.input}
//                         value={ownerDetails.ownerAddress}
//                         onChangeText={text => setOwnerDetails(prev => ({...prev, ownerAddress: text}))}
//                         placeholder="Address"
//                         editable={!loading}
//                       />
//                     </LinearGradient>
//                   </View>

//                   <View style={styles.inputContainer}>
//                     <LinearGradient
//                       colors={['#7E5EA9', '#20AEBC']}
//                       start={{x: 0, y: 0}}
//                       end={{x: 1, y: 0}}
//                       style={styles.inputGradient}>
//                       <TextInput
//                         style={styles.input}
//                         value={ownerDetails.ownerMobile}
//                         onChangeText={text => setOwnerDetails(prev => ({...prev, ownerMobile: text}))}
//                         placeholder="Mobile Number"
//                         keyboardType="phone-pad"
//                         editable={!loading}
//                       />
//                     </LinearGradient>
//                   </View>
//                 </View>

//                 <View style={styles.row}>
//                   <View style={styles.inputContainer}>
//                     <LinearGradient
//                       colors={['#7E5EA9', '#20AEBC']}
//                       start={{x: 0, y: 0}}
//                       end={{x: 1, y: 0}}
//                       style={styles.inputGradient}>
//                       <TouchableOpacity
//                         style={styles.input}
//                         onPress={() => setShowRelationDropdown(true)}
//                         disabled={loading}
//                       >
//                         <Text style={ ownerDetails.ownerRelation ? styles.selectedModelText : styles.placeholderText }>
//                           { ownerDetails.ownerRelation ? (ownerDetails.ownerRelation === 'Other' ? 'Other' : ownerDetails.ownerRelation) : 'Relation with Owner' }
//                         </Text>
//                         <Icon name="keyboard-arrow-down" size={25} color="#666" style={styles.dropdownIcon} />
//                       </TouchableOpacity>
//                     </LinearGradient>

//                     {ownerDetails.ownerRelation === 'Other' && (
//                       <View style={{marginTop: 8}}>
//                         <LinearGradient
//                           colors={['#7E5EA9', '#20AEBC']}
//                           start={{x: 0, y: 0}}
//                           end={{x: 1, y: 0}}
//                           style={styles.inputGradient}>
//                           <TextInput
//                             style={styles.input}
//                             value={relationOther}
//                             onChangeText={text => setRelationOther(text)}
//                             placeholder="Enter relation"
//                             editable={!loading}
//                           />
//                         </LinearGradient>
//                       </View>
//                     )}
//                   </View>

//                   <View style={styles.inputContainer}></View>
//                 </View>
//               </View>
//             )}
//           </View>
//         </View>

//         {/* Terms and Conditions Section */}
//         <View style={styles.termsContainer}>
//           <Text style={styles.termsTitle}>Terms and Conditions:</Text>
//           <View style={styles.termsList}>
//             <Text style={styles.termItem}>1. The Rc And Number Plate Will Be Delivered Only After Full Payment Clearance.</Text>
//             <Text style={styles.termItem}>2. Customer Must Provide Valid Id Proof Before Receiving The Rc Or Number Plate.</Text>
//             <Text style={styles.termItem}>3. Delivery To Branch Staff Requires Prior Written Authorization From The Head Office.</Text>
//             <Text style={styles.termItem}>4. Branch Personnel Must Verify All Customer Details Before Handover.</Text>
//             <Text style={styles.termItem}>5. Once Delivered, Makroo Motor Corporation Will Not Be Responsible For Loss Or Damage.</Text>
//             <Text style={styles.termItem}>6. Any Correction Or Reissue Request Must Be Submitted In Writing With Valid Reason.</Text>
//             <Text style={styles.termItem}>7. Rc And Number Plate Will Not Be Handed Over To Any Unauthorized Person.</Text>
//             <Text style={styles.termItem}>8. Customer Or Branch Representative Must Sign And Acknowledge Receipt At The Time Of Delivery.</Text>
//             <Text style={styles.termItem}>9. All Records Of Delivery Must Be Updated In The Company Database The Same Day.</Text>
//             <Text style={styles.termItem}>10. Duplicate Delivery Is Not Allowed Without Written Approval From The Head Office.</Text>
//             <Text style={styles.termItem}>11. If The Customer Fails To Collect The Rc Or Number Plate Within 30 Days, Storage Or Courier Charges May Apply.</Text>
//             <Text style={styles.termItem}>12. In Case Of Dispute, The Decision Of Makroo Motor Corporation Management Will Be Final.</Text>
//           </View>

//           {/* Checkbox for accepting terms */}
//           <TouchableOpacity 
//             style={styles.checkboxContainer}
//             onPress={() => setAcceptedTerms(!acceptedTerms)}
//             disabled={loading}
//           >
//             <View style={[styles.checkbox, acceptedTerms && styles.checkboxChecked]}>
//               {acceptedTerms && <Icon name="check" size={16} color="#fff" />}
//             </View>
//             <Text style={styles.checkboxLabel}>Accept All Terms And Conditions</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Photo and Signatures Section */}
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
//             style={[styles.submitButton, (loading || !acceptedTerms) && styles.disabledButton]} 
//             onPress={handleSubmit}
//             disabled={loading || !acceptedTerms}
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
// };

// const styles = StyleSheet.create({
//   container: {
//     paddingHorizontal: 15,
//   },
//   header: {
//     alignItems: 'center',
//     paddingVertical: 10,
//   },
//   companyName: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: 'white',
//     textAlign: 'center',
//   },
//   formNo: {
//     fontSize: 13,
//     marginVertical: 10,
//     fontFamily: 'Inter_28pt-SemiBold',
//     paddingHorizontal: 5,
//   },
//   Date: {
//     fontSize: 12,
//     textAlign: 'right',
//     marginVertical: 5,
//     fontFamily: 'Inter_28pt-Regular',
//     color: '#00000099',
//     paddingRight: 15,
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
//   formContainer: {
//     marginBottom: 15,
//   },
//   row: {
//     marginBottom: 0,
//   },
//   inputContainer: {
//     flex: 1,
//     marginHorizontal: 4,
//     marginBottom: 10,
//   },
//   inputGradient: {
//     borderRadius: 10,
//     padding: 1, // gradient thickness
//   },
//   input: {
//     borderRadius: 10,
//     backgroundColor: '#fff',
//     padding: 12,
//     fontSize: 14,
//     fontFamily: 'Inter_28pt-Regular',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   selectedModelText: {
//     fontSize: 14,
//     fontFamily: 'Inter_28pt-Regular',
//     color: '#000',
//   },
//   placeholderText: {
//     fontSize: 14,
//     fontFamily: 'Inter_28pt-Regular',
//     color: '#666',
//   },
//   dropdownIcon: {
//     marginLeft: 8,
//   },
//   inputWithIcon: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   inputWithIconField: {
//     flex: 1,
//   },
//   iconButton: {
//     position: 'absolute',
//     right: 12,
//     padding: 4,
//   },
//   // Modal Styles
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     borderRadius: 10,
//     width: '90%',
//     maxHeight: '70%',
//     overflow: 'hidden',
//   },
//   modalHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#e0e0e0',
//   },
//   modalTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     fontFamily: 'Inter_28pt-SemiBold',
//   },
//   closeButton: {
//     padding: 4,
//   },
//   modelList: {
//     maxHeight: 300,
//   },
//   modelItem: {
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f0f0',
//   },
//   modelItemText: {
//     fontSize: 14,
//     fontFamily: 'Inter_28pt-Regular',
//     color: '#333',
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
//   radioSection: {
//     marginBottom: 15,
//   },
//   radioGroup: {
//     marginBottom: 15,
//   },
//   radioLabel: {
//     fontSize: 12,
//     fontFamily: 'Inter_28pt-Medium',
//     marginBottom: 8,
//     color: '#000',
//   },
//   radioOptionsContainer: {
//     flexDirection: 'row',
//     justifyContent: 'flex-start',
//   },
//   radioOptionWrapper: {
//     flex: 1,
//     maxWidth: '90%',
//     marginHorizontal: 8,
//   },
//   radioOptionGradient: {
//     borderRadius: 6,
//     padding: 1,
//   },
//   radioOptionInner: {
//     borderRadius: 5,
//     paddingVertical: 10,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//   },
//   radioOptionInnerSelected: {
//     backgroundColor: '#7E5EA9',
//   },
//   radioOptionSelected: {
//     // Additional styles for selected state if needed
//   },
//   radioOptionText: {
//     fontSize: 12,
//     fontFamily: 'Inter_28pt-Medium',
//     color: '#000',
//   },
//   radioOptionTextSelected: {
//     color: '#fff',
//     fontWeight: '500',
//   },
//   // Terms and Conditions Styles
//   termsContainer: {
//     marginBottom: 15,
//     padding: 10,
//     borderRadius: 10,
//     marginBottom:50
//   },
//   termsTitle: {
//     fontSize: 14.5,
//     fontFamily: 'Inter_28pt-SemiBold',
//     color: '#000',
//     marginBottom: 10,
//   },
//   termsList: {
//     marginBottom: 15,
//   },
//   termItem: {
//     fontSize: 12.5,
//     fontFamily: 'Inter_28pt-Regular',
//     color: '#333',
//     marginBottom: 5,
//     lineHeight: 16,
//   },
//   checkboxContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 1,
//   },
//   checkbox: {
//     width: 20,
//     height: 20,
//     borderWidth: 1,
//     borderColor: '#666',
//     borderRadius: 4,
//     marginRight: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   checkboxChecked: {
//     backgroundColor: '#4CAF50', // Green background when checked
//     borderColor: '#4CAF50',
//   },
//   checkboxLabel: {
//     fontSize: 14,
//     fontFamily: 'Inter_28pt-Medium',
//     color: '#000',
//   },
//   separator: {
//     height: 1,
//     backgroundColor: '#000',
//     marginVertical: 15,
//   },
//   photoSignatureSection: {},
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
//    photoSignatureBox1: {
//     width: '100%',
//     height: 50,
//     borderWidth: 1,
//     borderColor: '#00000080',
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 20,
//      borderStyle: 'dashed',
//   },
//   photoSignatureText: {
//     fontSize: 13,
//     textAlign: 'center',
//     marginTop: 2,
//     color: '#00000099',
//     fontFamily: 'Inter_28pt-Medium',
//   },
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
//   buttonContainer: {
//     marginTop: 20,
//   },
//   submitButton: {
//     flex: 1,
//     backgroundColor: '#7E5EA9',
//     padding: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   submitButtonText: {
//     color: '#fff',
//     fontFamily: 'Inter_28pt-SemiBold',
//     fontSize: 14,
//   },
//   homeButton: {
//     flex: 1,
//     backgroundColor: '#20AEBC',
//     padding: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginBottom: 30,
//   },
//   homeButtonText: {
//     color: '#fff',
//      fontFamily: 'Inter_28pt-SemiBold',
//     fontSize: 14,
//   },
//   pdfButton: {
//     backgroundColor: '#7E5EA9',
//     padding: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   pdfButtonText: {
//     color: '#fff',
//      fontFamily: 'Inter_28pt-SemiBold',
//     fontSize: 14,
//   },
//   disabledButton: {
//     opacity: 0.6,
//   },
// });

// export default Rcpage;

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
import {RadioButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Camera } from 'react-native-camera-kit';

const Rcpage = ({navigation, route}) => {
  const insets = useSafeAreaInsets();
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rcIssued, setRcIssued] = useState('yes');
  const [noPlateIssued, setNoPlateIssued] = useState('yes');
  const [tractorOwner, setTractorOwner] = useState('yes');
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [existingFormId, setExistingFormId] = useState(null);
  const [existingFormNo, setExistingFormNo] = useState(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // QR Scanner States
  const [showChassisScanner, setShowChassisScanner] = useState(false);
  const [showEngineScanner, setShowEngineScanner] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);

  // NEW states for added functionality
  const [showHypoDropdown, setShowHypoDropdown] = useState(false);
  const [hypothecationOptions] = useState([
    'John Deere Financial India Private Limited',
    'The Jammu and Kashmir Bank Limited',
    'Nil',
    'Other',
  ]);
  const [hypothecationOther, setHypothecationOther] = useState('');
  const [showRcDatePicker, setShowRcDatePicker] = useState(false);
  const [showPlateDatePicker, setShowPlateDatePicker] = useState(false);
  const [rcIssueDate, setRcIssueDate] = useState(null);
  const [plateIssueDate, setPlateIssueDate] = useState(null);
  const [rcNoText, setRcNoText] = useState('');
  const [plateNoText, setPlateNoText] = useState('');
  const [showRelationDropdown, setShowRelationDropdown] = useState(false);
  const [relationOptions] = useState([
    'Father', 'Mother', 'Friend', 'Spouse', 'Brother', 'Sister', 'Son', 'Other'
  ]);
  const [relationOther, setRelationOther] = useState('');
  const [ownerDetails, setOwnerDetails] = useState({
    ownerName: '',
    ownerFatherName: '',
    ownerAddress: '',
    ownerMobile: '',
    ownerRelation: '',
  });

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
          setExistingFormNo(editData.form_no); // Keep the original form number
          
          // Pre-populate form data
          setFormData({
            employeeName: editData.employee_name || '',
            customerName: editData.customer_name || '',
            percentage: editData.percentage || '',
            address: editData.address || '',
            mobileNo: editData.mobile_no || '',
            registrationNo: editData.registration_no || '',
            tractorModel: editData.tractor_model || '',
            date: editData.select_date ? new Date(editData.select_date) : null,
            hypothecation: editData.hypothecation || '',
            chassisNo: editData.chassis_no || '',
            engineNo: editData.engine_no || '',
          });

          // Set radio button states
          setRcIssued(editData.rc_issued?.toLowerCase() === 'no' ? 'no' : 'yes');
          setNoPlateIssued(editData.plate_issued?.toLowerCase() === 'no' ? 'no' : 'yes');
          setTractorOwner(editData.tractor_owner?.toLowerCase() === 'no' ? 'no' : 'yes');

          // Load existing images if available
          if (editData.customer_photo) {
            setCustomerPhoto({uri: editData.customer_photo});
          }
          if (editData.customer_signature) {
            setCustomerSignature({uri: editData.customer_signature});
          }
          if (editData.manager_signature) {
            setManagerSignature({uri: editData.manager_signature});
          }

          // Load additional fields if present
          if (editData.hypothecation === 'Other' && editData.hypothecation_other) {
            setHypothecationOther(editData.hypothecation_other);
          }

          // RC fields - corrected field names
          if (editData.rc_issued_at) {
            setRcIssueDate(new Date(editData.rc_issued_at));
          } else if (editData.rc_issue_no) {
            setRcNoText(editData.rc_issue_no);
          }

          // Plate fields - corrected field names
          if (editData.plate_issued_at) {
            setPlateIssueDate(new Date(editData.plate_issued_at));
          } else if (editData.plate_issue_no) {
            setPlateNoText(editData.plate_issue_no);
          }

          // Owner details if tractor owner is No - corrected field names
          if (editData.tractor_owner === 'No') {
            setOwnerDetails({
              ownerName: editData.relative_name || '',
              ownerFatherName: editData.relative_father_name || '',
              ownerAddress: editData.relative_address || '',
              ownerMobile: editData.relative_phone || '',
              ownerRelation: editData.relative_relation || '',
            });
            if (editData.relative_relation === 'Other' && editData.relation_other) {
              setRelationOther(editData.relation_other);
            }
          }

          console.log('Edit mode activated for form ID:', editData.id, 'Form No:', editData.form_no);
        }
      } catch (error) {
        console.log('Error loading user data:', error);
      }
    };

    getUserData();
  }, [route.params]);

  // Generate form number - only for new forms
  const generateFormNo = () => {
    if (isEditMode && existingFormNo) {
      return existingFormNo; // Use existing form number for updates
    }
    const timestamp = new Date().getTime();
    return `RC${timestamp}`;
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

  // Special handler for percentage - ensures only numeric (number pad, no alphabets)
  // const handlePercentageChange = (text) => {
  //   // allow numbers and optional single decimal point
  //   const filtered = text.replace(/[^0-9.]/g, '');
  //   // prevent multiple dots
  //   const parts = filtered.split('.');
  //   let final = filtered;
  //   if (parts.length > 2) {
  //     final = parts[0] + '.' + parts.slice(1).join('');
  //   }
  //   handleInputChange('percentage', final);
  // };

  const handlePercentageChange = (text) => {
  // Allow only alphabets and spaces
  const filtered = text.replace(/[^a-zA-Z\s]/g, '');
  handleInputChange('percentage', filtered);
};

  const handleModelSelect = (model) => {
    handleInputChange('tractorModel', model);
    setShowModelDropdown(false);
  };

  const handleHypoSelect = (option) => {
    if (option === 'Other') {
      // set hypothecation to Other and show other input
      handleInputChange('hypothecation', 'Other');
      setHypothecationOther(''); // empty to allow input
      setShowHypoDropdown(false);
    } else {
      handleInputChange('hypothecation', option);
      setHypothecationOther('');
      setShowHypoDropdown(false);
    }
  };

  const handleRelationSelect = (option) => {
    if (option === 'Other') {
      setOwnerDetails(prev => ({...prev, ownerRelation: 'Other'}));
      setRelationOther('');
      setShowRelationDropdown(false);
    } else {
      setOwnerDetails(prev => ({...prev, ownerRelation: option}));
      setRelationOther('');
      setShowRelationDropdown(false);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      handleInputChange('date', selectedDate);
    }
  };

  const handleRcDateChange = (event, selectedDate) => {
    setShowRcDatePicker(false);
    if (selectedDate) {
      setRcIssueDate(selectedDate);
    }
  };

  const handlePlateDateChange = (event, selectedDate) => {
    setShowPlateDatePicker(false);
    if (selectedDate) {
      setPlateIssueDate(selectedDate);
    }
  };

  const validateForm = () => {
    const requiredFields = [
      'employeeName', 'customerName', 'percentage', 'address', 
      'mobileNo', 'registrationNo', 'tractorModel',
      'chassisNo', 'engineNo'
    ];

    for (const field of requiredFields) {
      if (!formData[field] || formData[field].toString().trim() === '') {
        Alert.alert('Validation Error', `Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }

    // Hypothecation required
    if (!formData.hypothecation || formData.hypothecation.trim() === '') {
      Alert.alert('Validation Error', 'Please select hypothecation');
      return false;
    }

    // If hypothecation is Other, ensure other text provided
    if (formData.hypothecation === 'Other' && (!hypothecationOther || hypothecationOther.trim() === '')) {
      Alert.alert('Validation Error', 'Please enter hypothecation details for Other');
      return false;
    }

    // RC Issued conditional validation
    if (rcIssued === 'yes') {
      if (!rcIssueDate) {
        Alert.alert('Validation Error', 'Please select RC issue date');
        return false;
      }
    } else {
      if (!rcNoText || rcNoText.trim() === '') {
        Alert.alert('Validation Error', 'Please enter RC not issued details');
        return false;
      }
    }

    // Plate Issued conditional validation
    if (noPlateIssued === 'yes') {
      if (!plateIssueDate) {
        Alert.alert('Validation Error', 'Please select number plate issue date');
        return false;
      }
    } else {
      if (!plateNoText || plateNoText.trim() === '') {
        Alert.alert('Validation Error', 'Please enter number plate not issued details');
        return false;
      }
    }

    // If tractor owner is No, new owner details required
    if (tractorOwner === 'no') {
      if (!ownerDetails.ownerName || ownerDetails.ownerName.trim() === '') {
        Alert.alert('Validation Error', 'Please enter owner name');
        return false;
      }
      if (!ownerDetails.ownerFatherName || ownerDetails.ownerFatherName.trim() === '') {
        Alert.alert('Validation Error', 'Please enter owner father\'s name');
        return false;
      }
      if (!ownerDetails.ownerAddress || ownerDetails.ownerAddress.trim() === '') {
        Alert.alert('Validation Error', 'Please enter owner address');
        return false;
      }
      if (!ownerDetails.ownerMobile || ownerDetails.ownerMobile.trim() === '') {
        Alert.alert('Validation Error', 'Please enter owner mobile number');
        return false;
      }
      if (!ownerDetails.ownerRelation || ownerDetails.ownerRelation.trim() === '') {
        Alert.alert('Validation Error', 'Please select owner relation');
        return false;
      }
      if (ownerDetails.ownerRelation === 'Other' && (!relationOther || relationOther.trim() === '')) {
        Alert.alert('Validation Error', 'Please enter owner relation detail for Other');
        return false;
      }
    }

    // Terms and conditions validation
    if (!acceptedTerms) {
      Alert.alert('Validation Error', 'Please accept all terms and conditions');
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

    // For updates, use POST method and include ID (based on your API example)
    if (isEditMode && existingFormId) {
      formDataToSend.append('id', existingFormId.toString());
      formDataToSend.append('form_no', existingFormNo); // Use existing form number
      
      console.log('UPDATE MODE - Form ID:', existingFormId, 'Form No:', existingFormNo);
    } else {
      // For new forms, generate new form number
      formDataToSend.append('form_no', generateFormNo());
      console.log('CREATE MODE - New Form No:', generateFormNo());
    }

    // Common form data for both create and update
    formDataToSend.append('user_id', userId);
    formDataToSend.append('form_date', new Date().toISOString().split('T')[0]);
    formDataToSend.append('employee_name', formData.employeeName);
    formDataToSend.append('customer_name', formData.customerName);
    formDataToSend.append('percentage', formData.percentage);
    formDataToSend.append('address', formData.address);
    formDataToSend.append('mobile_no', formData.mobileNo);
    formDataToSend.append('registration_no', formData.registrationNo);
    formDataToSend.append('tractor_model', formData.tractorModel);
    formDataToSend.append('select_date', formData.date ? formData.date.toISOString().split('T')[0] : '');
    
    // Hypothecation: if Other, send the other text as hypothecation_other and keep hypothecation as 'Other'
    formDataToSend.append('hypothecation', formData.hypothecation);
    if (formData.hypothecation === 'Other') {
      formDataToSend.append('hypothecation_other', hypothecationOther);
    }
    
    formDataToSend.append('chassis_no', formData.chassisNo);
    formDataToSend.append('engine_no', formData.engineNo);
    formDataToSend.append('rc_issued', rcIssued === 'yes' ? 'Yes' : 'No');
    formDataToSend.append('plate_issued', noPlateIssued === 'yes' ? 'Yes' : 'No');
    formDataToSend.append('tractor_owner', tractorOwner === 'yes' ? 'Yes' : 'No');

    // RC fields - using correct API field names
    if (rcIssued === 'yes') {
      formDataToSend.append('rc_issued_at', rcIssueDate ? rcIssueDate.toISOString().split('T')[0] : '');
    } else {
      formDataToSend.append('rc_issue_no', rcNoText);
    }

    // Plate fields - using correct API field names
    if (noPlateIssued === 'yes') {
      formDataToSend.append('plate_issued_at', plateIssueDate ? plateIssueDate.toISOString().split('T')[0] : '');
    } else {
      formDataToSend.append('plate_issue_no', plateNoText);
    }

    // Owner details if tractor owner is No - using correct API field names
    if (tractorOwner === 'no') {
      formDataToSend.append('relative_name', ownerDetails.ownerName);
      formDataToSend.append('relative_father_name', ownerDetails.ownerFatherName);
      formDataToSend.append('relative_address', ownerDetails.ownerAddress);
      formDataToSend.append('relative_phone', ownerDetails.ownerMobile);
      formDataToSend.append('relative_relation', ownerDetails.ownerRelation);
      if (ownerDetails.ownerRelation === 'Other') {
        formDataToSend.append('relation_other', relationOther);
      }
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
      
      // Use different endpoints for create vs update
      let url;
      
      if (isEditMode && existingFormId) {
        // For update
        url = `https://argosmob.uk/makroo/public/api/v1/rc-no-plate-delivery/form/update`;
        console.log('UPDATE REQUEST - URL:', url, 'Form ID:', existingFormId);
      } else {
        // For create
        url = 'https://argosmob.uk/makroo/public/api/v1/rc-no-plate-delivery/form/save';
        console.log('CREATE REQUEST - URL:', url);
      }

      // Both endpoints use POST method based on your API examples
      const config = {
        method: 'post',
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
        successMessage = 'Form updated successfully!';
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
        successMessage = 'Form submitted successfully!';
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
                // Navigate back or reset form after successful submission
                if (isEditMode) {
                  navigation.goBack();
                } else {
                  // Reset form for new entry
                  setFormData({
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
                  setRcIssued('yes');
                  setNoPlateIssued('yes');
                  setTractorOwner('yes');
                  setRcIssueDate(null);
                  setPlateIssueDate(null);
                  setRcNoText('');
                  setPlateNoText('');
                  setHypothecationOther('');
                  setRelationOther('');
                  setOwnerDetails({
                    ownerName: '',
                    ownerFatherName: '',
                    ownerAddress: '',
                    ownerMobile: '',
                    ownerRelation: '',
                  });
                  setCustomerPhoto(null);
                  setCustomerSignature(null);
                  setManagerSignature(null);
                  setAcceptedTerms(false);
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

  const handleGeneratePDF = () => {
    Alert.alert('PDF', 'PDF Challan generated!');
  };

  // Placeholder functions for icon actions
  const handleDateIconPress = () => {
    setShowDatePicker(true);
  };

  const renderModelItem = ({item}) => (
    <TouchableOpacity
      style={styles.modelItem}
      onPress={() => handleModelSelect(item)}>
      <Text style={styles.modelItemText}>{item}</Text>
    </TouchableOpacity>
  );

  const renderHypoItem = ({item}) => (
    <TouchableOpacity
      style={styles.modelItem}
      onPress={() => handleHypoSelect(item)}>
      <Text style={styles.modelItemText}>{item}</Text>
    </TouchableOpacity>
  );

  const renderRelationItem = ({item}) => (
    <TouchableOpacity
      style={styles.modelItem}
      onPress={() => handleRelationSelect(item)}>
      <Text style={styles.modelItemText}>{item}</Text>
    </TouchableOpacity>
  );

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
        <Text style={styles.Date}>{new Date().toLocaleDateString()}</Text>
        {isEditMode && (
          <View style={styles.editModeContainer}>
            <Text style={styles.editModeText}>Edit Mode - Updating Form ID: {existingFormId}</Text>
          </View>
        )}

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
                  editable={!loading}
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
                  editable={!loading}
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
                  onChangeText={handlePercentageChange}
                  placeholder="Parentage"
                  
                  editable={!loading}
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
                  editable={!loading}
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
                  editable={!loading}
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
                  editable={!loading}
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
                  disabled={loading}
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

          {/* Hypothecation Dropdown */}
          <View style={styles.row}>
            <View style={styles.inputContainer}>
              <LinearGradient
                colors={['#7E5EA9', '#20AEBC']}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                style={styles.inputGradient}>
                <TouchableOpacity
                  style={styles.input}
                  onPress={() => setShowHypoDropdown(true)}
                  disabled={loading}
                >
                  <Text style={ formData.hypothecation ? styles.selectedModelText : styles.placeholderText }>
                    {formData.hypothecation ? (formData.hypothecation === 'Other' ? 'Other' : formData.hypothecation) : 'Select Hypothecation'}
                  </Text>
                  <Icon name="keyboard-arrow-down" size={25} color="#666" style={styles.dropdownIcon} />
                </TouchableOpacity>
              </LinearGradient>

              {/* If Other selected show text input (LinearGradient) */}
              {formData.hypothecation === 'Other' && (
                <View style={{marginTop: 8}}>
                  <LinearGradient
                    colors={['#7E5EA9', '#20AEBC']}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    style={styles.inputGradient}>
                    <TextInput
                      style={styles.input}
                      value={hypothecationOther}
                      onChangeText={text => setHypothecationOther(text)}
                      placeholder="Enter Hypothecation details"
                      editable={!loading}
                    />
                  </LinearGradient>
                </View>
              )}
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

        {/* Hypothecation Dropdown Modal */}
        <Modal
          visible={showHypoDropdown}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowHypoDropdown(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select Hypothecation</Text>
                <TouchableOpacity 
                  onPress={() => setShowHypoDropdown(false)}
                  style={styles.closeButton}
                >
                  <Icon name="close" size={24} color="#000" />
                </TouchableOpacity>
              </View>
              <FlatList
                data={hypothecationOptions}
                renderItem={renderHypoItem}
                keyExtractor={(item, index) => index.toString()}
                style={styles.modelList}
                showsVerticalScrollIndicator={true}
              />
            </View>
          </View>
        </Modal>

        {/* Relation Dropdown Modal */}
        <Modal
          visible={showRelationDropdown}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowRelationDropdown(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select Relation</Text>
                <TouchableOpacity 
                  onPress={() => setShowRelationDropdown(false)}
                  style={styles.closeButton}
                >
                  <Icon name="close" size={24} color="#000" />
                </TouchableOpacity>
              </View>
              <FlatList
                data={relationOptions}
                renderItem={renderRelationItem}
                keyExtractor={(item, index) => index.toString()}
                style={styles.modelList}
                showsVerticalScrollIndicator={true}
              />
            </View>
          </View>
        </Modal>

        {/* QR Scanner Modal */}
        {renderQRScanner()}

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
                onPress={() => setRcIssued('yes')}
                disabled={loading}
              >
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
                onPress={() => setRcIssued('no')}
                disabled={loading}
              >
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

            {/* Conditional UI for RC Issued */}
            <View style={{marginTop: 8}}>
              {rcIssued === 'yes' ? (
                <LinearGradient
                  colors={['#7E5EA9', '#20AEBC']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={styles.inputGradient}>
                  <View style={styles.inputWithIcon}>
                    <TouchableOpacity
                      style={[styles.input, styles.inputWithIconField]}
                      onPress={() => setShowRcDatePicker(true)}
                      disabled={loading}
                    >
                      <Text style={ rcIssueDate ? styles.selectedModelText : styles.placeholderText }>
                        {rcIssueDate ? rcIssueDate.toLocaleDateString() : 'Select RC Issue Date'}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setShowRcDatePicker(true)}
                      style={styles.iconButton}
                      disabled={loading}
                    >
                      <Icon name="calendar-today" size={20} color="#666" />
                    </TouchableOpacity>
                  </View>
                  {showRcDatePicker && (
                    <DateTimePicker
                      value={rcIssueDate || new Date()}
                      mode="date"
                      display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                      onChange={handleRcDateChange}
                    />
                  )}
                </LinearGradient>
              ) : (
                <LinearGradient
                  colors={['#7E5EA9', '#20AEBC']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={[styles.inputGradient, {marginTop: 4}]}>
                  <TextInput
                    style={styles.input}
                    value={rcNoText}
                    onChangeText={text => setRcNoText(text)}
                    placeholder="Enter RC not issued details"
                    editable={!loading}
                  />
                </LinearGradient>
              )}
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
                onPress={() => setNoPlateIssued('yes')}
                disabled={loading}
              >
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
                onPress={() => setNoPlateIssued('no')}
                disabled={loading}
              >
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

            {/* Conditional UI for Plate Issued */}
            <View style={{marginTop: 8}}>
              {noPlateIssued === 'yes' ? (
                <LinearGradient
                  colors={['#7E5EA9', '#20AEBC']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={styles.inputGradient}>
                  <View style={styles.inputWithIcon}>
                    <TouchableOpacity
                      style={[styles.input, styles.inputWithIconField]}
                      onPress={() => setShowPlateDatePicker(true)}
                      disabled={loading}
                    >
                      <Text style={ plateIssueDate ? styles.selectedModelText : styles.placeholderText }>
                        {plateIssueDate ? plateIssueDate.toLocaleDateString() : 'Select Plate Issue Date'}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setShowPlateDatePicker(true)}
                      style={styles.iconButton}
                      disabled={loading}
                    >
                      <Icon name="calendar-today" size={20} color="#666" />
                    </TouchableOpacity>
                  </View>
                  {showPlateDatePicker && (
                    <DateTimePicker
                      value={plateIssueDate || new Date()}
                      mode="date"
                      display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                      onChange={handlePlateDateChange}
                    />
                  )}
                </LinearGradient>
              ) : (
                <LinearGradient
                  colors={['#7E5EA9', '#20AEBC']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={[styles.inputGradient, {marginTop: 4}]}>
                  <TextInput
                    style={styles.input}
                    value={plateNoText}
                    onChangeText={text => setPlateNoText(text)}
                    placeholder="Enter plate not issued details"
                    editable={!loading}
                  />
                </LinearGradient>
              )}
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
                onPress={() => setTractorOwner('yes')}
                disabled={loading}
              >
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
                onPress={() => setTractorOwner('no')}
                disabled={loading}
              >
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

            {/* If not owner show additional fields */}
            {tractorOwner === 'no' && (
              <View style={{marginTop: 8}}>
                <View style={styles.row}>
                  <View style={styles.inputContainer}>
                    <LinearGradient
                      colors={['#7E5EA9', '#20AEBC']}
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      style={styles.inputGradient}>
                      <TextInput
                        style={styles.input}
                        value={ownerDetails.ownerName}
                        onChangeText={text => setOwnerDetails(prev => ({...prev, ownerName: text}))}
                        placeholder="Name"
                        editable={!loading}
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
                        value={ownerDetails.ownerFatherName}
                        onChangeText={text => setOwnerDetails(prev => ({...prev, ownerFatherName: text}))}
                        placeholder="Father's Name"
                        editable={!loading}
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
                        value={ownerDetails.ownerAddress}
                        onChangeText={text => setOwnerDetails(prev => ({...prev, ownerAddress: text}))}
                        placeholder="Address"
                        editable={!loading}
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
                        value={ownerDetails.ownerMobile}
                        onChangeText={text => setOwnerDetails(prev => ({...prev, ownerMobile: text}))}
                        placeholder="Mobile Number"
                        keyboardType="phone-pad"
                        editable={!loading}
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
                        onPress={() => setShowRelationDropdown(true)}
                        disabled={loading}
                      >
                        <Text style={ ownerDetails.ownerRelation ? styles.selectedModelText : styles.placeholderText }>
                          { ownerDetails.ownerRelation ? (ownerDetails.ownerRelation === 'Other' ? 'Other' : ownerDetails.ownerRelation) : 'Relation with Owner' }
                        </Text>
                        <Icon name="keyboard-arrow-down" size={25} color="#666" style={styles.dropdownIcon} />
                      </TouchableOpacity>
                    </LinearGradient>

                    {ownerDetails.ownerRelation === 'Other' && (
                      <View style={{marginTop: 8}}>
                        <LinearGradient
                          colors={['#7E5EA9', '#20AEBC']}
                          start={{x: 0, y: 0}}
                          end={{x: 1, y: 0}}
                          style={styles.inputGradient}>
                          <TextInput
                            style={styles.input}
                            value={relationOther}
                            onChangeText={text => setRelationOther(text)}
                            placeholder="Enter relation"
                            editable={!loading}
                          />
                        </LinearGradient>
                      </View>
                    )}
                  </View>

                  <View style={styles.inputContainer}></View>
                </View>
              </View>
            )}
          </View>
        </View>

        {/* Terms and Conditions Section */}
        <View style={styles.termsContainer}>
          <Text style={styles.termsTitle}>Terms and Conditions:</Text>
          <View style={styles.termsList}>
            <Text style={styles.termItem}>1. The Rc And Number Plate Will Be Delivered Only After Full Payment Clearance.</Text>
            <Text style={styles.termItem}>2. Customer Must Provide Valid Id Proof Before Receiving The Rc Or Number Plate.</Text>
            <Text style={styles.termItem}>3. Delivery To Branch Staff Requires Prior Written Authorization From The Head Office.</Text>
            <Text style={styles.termItem}>4. Branch Personnel Must Verify All Customer Details Before Handover.</Text>
            <Text style={styles.termItem}>5. Once Delivered, Makroo Motor Corporation Will Not Be Responsible For Loss Or Damage.</Text>
            <Text style={styles.termItem}>6. Any Correction Or Reissue Request Must Be Submitted In Writing With Valid Reason.</Text>
            <Text style={styles.termItem}>7. Rc And Number Plate Will Not Be Handed Over To Any Unauthorized Person.</Text>
            <Text style={styles.termItem}>8. Customer Or Branch Representative Must Sign And Acknowledge Receipt At The Time Of Delivery.</Text>
            <Text style={styles.termItem}>9. All Records Of Delivery Must Be Updated In The Company Database The Same Day.</Text>
            <Text style={styles.termItem}>10. Duplicate Delivery Is Not Allowed Without Written Approval From The Head Office.</Text>
            <Text style={styles.termItem}>11. If The Customer Fails To Collect The Rc Or Number Plate Within 30 Days, Storage Or Courier Charges May Apply.</Text>
            <Text style={styles.termItem}>12. In Case Of Dispute, The Decision Of Makroo Motor Corporation Management Will Be Final.</Text>
          </View>

          {/* Checkbox for accepting terms */}
          <TouchableOpacity 
            style={styles.checkboxContainer}
            onPress={() => setAcceptedTerms(!acceptedTerms)}
            disabled={loading}
          >
            <View style={[styles.checkbox, acceptedTerms && styles.checkboxChecked]}>
              {acceptedTerms && <Icon name="check" size={16} color="#fff" />}
            </View>
            <Text style={styles.checkboxLabel}>Accept All Terms And Conditions</Text>
          </TouchableOpacity>
        </View>

        {/* Photo and Signatures Section */}
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
            style={[styles.submitButton, (loading || !acceptedTerms) && styles.disabledButton]} 
            onPress={handleSubmit}
            disabled={loading || !acceptedTerms}
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
  // Terms and Conditions Styles
  termsContainer: {
    marginBottom: 15,
    padding: 10,
    borderRadius: 10,
    marginBottom:50
  },
  termsTitle: {
    fontSize: 14.5,
    fontFamily: 'Inter_28pt-SemiBold',
    color: '#000',
    marginBottom: 10,
  },
  termsList: {
    marginBottom: 15,
  },
  termItem: {
    fontSize: 12.5,
    fontFamily: 'Inter_28pt-Regular',
    color: '#333',
    marginBottom: 5,
    lineHeight: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 1,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#666',
    borderRadius: 4,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  checkboxChecked: {
    backgroundColor: '#4CAF50', // Green background when checked
    borderColor: '#4CAF50',
  },
  checkboxLabel: {
    fontSize: 14,
    fontFamily: 'Inter_28pt-Medium',
    color: '#000',
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
    marginBottom: 30,
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
  disabledButton: {
    opacity: 0.6,
  },
});

export default Rcpage;

