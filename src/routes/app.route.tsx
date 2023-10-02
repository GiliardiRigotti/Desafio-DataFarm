import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import StopRecords from '../screens/StopRecord';
import Records from '../screens/Records';
import { colors } from '../constants/colors';

const Tab = createBottomTabNavigator();

export default function AppRoutes() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="StopRecord"
                component={StopRecords}
                options={{
                    tabBarIcon: () => <Icon name="timer" size={30} color={colors.green} />,
                    tabBarShowLabel: false
                }}
            />
            <Tab.Screen name="Records"
                component={Records}
                options={{
                    tabBarIcon: () => <Icon name="view-list" size={30} color={colors.green} />,
                    tabBarShowLabel: false
                }}
            />
        </Tab.Navigator>
    );
}