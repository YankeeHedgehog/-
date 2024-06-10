import JapaneseDatePicker from "./-/warekiDatePicker/DatePickerV2/DatePickerV2";
import WarekiDatePicker from "./-/warekiDatePicker/Index";
import NavigationDrawer from "./component/Navigation/Drawer/Index";

export default function App() {
  return <NavigationDrawer>
    {/* <WarekiDatePicker /> */}
    <JapaneseDatePicker />
  </NavigationDrawer>
}