import { Tabs } from 'expo-router/tabs';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#2f95dc',
        headerShown: false, //hide the title for all of them at once
      }}
    >
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          headerShown:false,
          tabBarIcon: ({ color }) => <Ionicons name="chatbubbles" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="tab2"
        options={{
          title: 'Tab 2',
          tabBarIcon: ({ color }) => <Ionicons name="square" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="tab3"
        options={{
          title: 'Tab 3',
          tabBarIcon: ({ color }) => <Ionicons name="square" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="tab4"
        options={{
          title: 'Tab 4',
          tabBarIcon: ({ color }) => <Ionicons name="square" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}