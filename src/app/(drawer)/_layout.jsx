import { Drawer } from 'expo-router/drawer';
import { useRouter, useSegments } from 'expo-router'; 
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../../firebase/config';
import { cleanupFirestore } from '../../firebase/config';



function CustomHeaderTitle() {
  const segments = useSegments();
  const tabName = segments[segments.length - 1] || 'Chat'; // Fallback to "Chat"

  const colorMap = {
    'chat': '#2f95dc',    // Blue for Chat
    'tab2': '#4CAF50',    // Green for Tab2
    'tab3': '#FF5722',    // Orange for Tab3
    'tab4': '#9C27B0',    // Purple for Tab4
    'profile': '#607D8B'  // Gray for Profile
  };

  // Get color from map or use default
  const headerColor = colorMap[tabName] || '#000000';
  return (
    <Text style={{ 
      fontSize: 24, 
      color: headerColor, // Dynamic color
      fontWeight: 'bold' 
    }}>
      {tabName.charAt(0).toUpperCase() + tabName.slice(1)}
    </Text>
  );
}

export default function DrawerLayout() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      //Unsubscribe from Firestore listeners
  
      cleanupFirestore();
      await auth.signOut();
      
      // Finally: Navigate to login
      router.replace('/login');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (

    <Drawer
      screenOptions={{
        drawerActiveTintColor: '#2f95dc',
        drawerLabelStyle: { marginLeft: -20 },

        headerTitle: () => <CustomHeaderTitle />,
      }}
      drawerContent={(props) => (
        <View style={{ flex: 1, paddingTop: 50 }}>
          {/* User Info */}
          <View style={{ padding: 20 }}>
            <Ionicons name="person-circle" size={48} color="#666" />
            <Text style={{ fontSize: 16, marginTop: 10 }}>
              {auth.currentUser?.email}
            </Text>
          </View>

          {/* Drawer Items */}
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', padding: 15 }}
            onPress={() => router.push('/(drawer)/(tabs)/chat')}
          >
            <Ionicons name="chatbubbles" size={24} color="#666" />
            <Text style={{ marginLeft: 15, fontSize: 16 }}>Chat</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', padding: 15 }}
            onPress={() => router.push('/(drawer)/profile')}
          >
            <Ionicons name="person" size={24} color="#666" />
            <Text style={{ marginLeft: 15, fontSize: 16 }}>Profile</Text>
          </TouchableOpacity>


          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', padding: 15, marginTop: 20 }}
            onPress={handleSignOut}
          >
            <Ionicons name="log-out" size={24} color="red" />
            <Text style={{ marginLeft: 15, fontSize: 16, color: 'red' }}>
              Sign Out
            </Text>
          </TouchableOpacity>
          
        </View>
      )}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          title: 'Chat',
          headerShown: true,
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: true,
        }}
      />
    </Drawer>
  );
}