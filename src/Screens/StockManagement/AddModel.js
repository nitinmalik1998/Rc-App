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


const AddModel = ({navigation}) => {
  const insets = useSafeAreaInsets();
 
  const [showModelDropdown, setShowModelDropdown] = useState(false);

  
  const [formData, setFormData] = useState({
    ModelName: '',
    Year: '',
    EngineType: '',
    date: null,
    EngineType: '',
    Dimension: '',
    Color: '',
  });

  // Image states
  const [customerPhoto, setCustomerPhoto] = useState(null);
 

  const EngineType = [
  "Single Cylinder",
  "Twin Cylinder",
  "Three Cylinder",
  "Four Cylinder",
  "Six Cylinder",
  "Inline Engine",
  "V-Type Engine",
  "Diesel Engine",
  "Petrol Engine",
  "CRDI Engine",
  "Turbocharged Engine",
  "Naturally Aspirated Engine",
  "Water-Cooled Engine",
  "Air-Cooled Engine",
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

  

  const handleSubmit = () => {
    Alert.alert('Success', 'Model submitted successfully!');
  };


 

  // Placeholder functions for icon actions
 

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
        <Text style={styles.companyName1}>Add Model</Text>
        
      </LinearGradient>

      <ScrollView style={styles.container}>
        
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
                  value={formData.ModelName}
                  onChangeText={text => handleInputChange('ModelName', text)}
                  placeholder="Model Name"
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
                  value={formData.Year}
                  onChangeText={text => handleInputChange('Year', text)}
                  placeholder="Year"
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
                    formData.EngineType ? 
                    styles.selectedModelText : 
                    styles.placeholderText
                  }>
                    {formData.EngineType || 'Select Engine Type'}
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
                  value={formData.Horsepower}
                  onChangeText={text =>
                    handleInputChange('Horsepower', text)
                  }
                  placeholder="Horsepower"
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
                    value={formData.Dimension}
                    onChangeText={text => handleInputChange('Dimension', text)}
                    placeholder="Dimension"
                  />
               
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
                    value={formData.Color}
                    onChangeText={text => handleInputChange('Color', text)}
                    placeholder="Color"
                  />
                 
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
                <Text style={styles.modalTitle}>Select Engine Type</Text>
                <TouchableOpacity 
                  onPress={() => setShowModelDropdown(false)}
                  style={styles.closeButton}
                >
                  <Icon name="close" size={24} color="#000" />
                </TouchableOpacity>
              </View>
              <FlatList
                data={EngineType}
                renderItem={renderModelItem}
                keyExtractor={(item, index) => index.toString()}
                style={styles.modelList}
                showsVerticalScrollIndicator={true}
              />
            </View>
          </View>
        </Modal>

      
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

        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
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
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
  },
   companyName1: {
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
    marginTop:40
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

  photoSignatureSection: {},
  photoSignatureBox: {
    width: '100%',
    height: 100,
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
    marginBottom:30
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
  
 
  
  
});

export default AddModel;