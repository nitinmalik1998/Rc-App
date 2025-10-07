import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from '../Screens/LoginScreen';
import Dashboard from '../Screens/Dashboard';
import Rcpage from '../Screens/Rcpage';
import Customerspage from '../Screens/Customerspage';
import Customerinternalpage from '../Screens/Customerinternalpage';
import PDIPage from '../Screens/PDIPage';
import ExpectedDeliveryPayment from '../Screens/ExpectedDeliveryPayment';
import Formstatus from '../Screens/Formstatus';
import Forminternalpage from '../Screens/Forminternalpage';
import Pdfpage from '../Screens/Pdfpage';
import DeliveryChallan from '../Screens/DeliveryChallan';
import Overview from '../Screens/StockManagement/Overview';
import Overviewinternal from '../Screens/StockManagement/Overviewinternal';
import HamburgerPage from '../Screens/StockManagement/Hamburger';
import StockLocation from '../Screens/StockManagement/StockLocation';
import TransitStatus from '../Screens/StockManagement/TransitStatus';
import Depot from '../Screens/StockManagement/Depot';
import Finance from '../Screens/StockManagement/Finance';
import Report from '../Screens/StockManagement/Report';
import AddModel from '../Screens/StockManagement/AddModel';
import Form from '../Screens/StockManagement/Form';
import StockLocationList from '../Screens/StockManagement/StockLocationList';
import ModelDetail from '../Screens/StockManagement/ModelDetail';
import DepotModelList from '../Screens/StockManagement/DepotModelList';
import ReportModelList from '../Screens/StockManagement/ReportModelList';
import FinanceModelList from '../Screens/StockManagement/FinanceModelList';




const Stack = createNativeStackNavigator();

function RootNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{headerShown: false}}
        />
          <Stack.Screen
          name="Rcpage"
          component={Rcpage}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="Customerspage"
          component={Customerspage}
          options={{headerShown: false}}
        />
          <Stack.Screen
          name="Customerinternalpage"
          component={Customerinternalpage}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="PDIPage"
          component={PDIPage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ExpectedDeliveryPayment"
          component={ExpectedDeliveryPayment}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Formstatus"
          component={Formstatus}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Forminternalpage"
          component={Forminternalpage}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="Pdfpage"
          component={Pdfpage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DeliveryChallan"
          component={DeliveryChallan}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Overview"
          component={Overview}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Overviewinternal"
          component={Overviewinternal}
          options={{headerShown: false}}
        />
         <Stack.Screen 
          screenOptions={{
    headerShown: false,
    gestureEnabled: true,
    gestureDirection: 'horizontal', // left/right swipe
    animation: 'slide_from_right',
    animationTypeForReplace: 'pop', // smooth back animation
  }}
          name="Hamburger"
          component={HamburgerPage}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="StockLocation"
          component={StockLocation}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="TransitStatus"
          component={TransitStatus}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Depot"
          component={Depot}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Finance"
          component={Finance}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Report"
          component={Report}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddModel"
          component={AddModel}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="Form"
          component={Form}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="StockLocationList"
          component={StockLocationList}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="ModelDetail"
          component={ModelDetail}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="DepotModelList"
          component={DepotModelList}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="ReportModelList"
          component={ReportModelList}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="FinanceModelList"
          component={FinanceModelList}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigation;
