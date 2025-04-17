import { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Button, } from 'react-native';
import { sendMessage, } from '../../../firebase/db';
import { auth, initializeMessagesListener, cleanupFirestore } from '../../../firebase/config';
import { useNavigation } from 'expo-router';

export default function ChatScreen() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();
  const flatListRef = useRef(null);
  const unsubscribeRef = useRef(null);

  

  useEffect(() => {
    // Initialize listener through centralized method
    initializeMessagesListener((newMessages) => {
      setMessages(newMessages);
      // Scroll to bottom when new messages arrive
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    });
  
    // Cleanup on component unmount
    return () => {
      cleanupFirestore();
    };
  }, []);

  const handleSend = async () => {
    if (message.trim()) {
      await sendMessage(message, auth.currentUser.uid);
      setMessage('');
    }
  };

  const renderMessage = ({ item }) => (
    <View style={[
      styles.messageContainer,
      item.uid === auth.currentUser?.uid ? styles.sentMessage : styles.receivedMessage
    ]}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );
  return (
    <View style={styles.container}>
      {/* Header remains the same */}

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        style={styles.messageList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message"
        />
        <Button title="Send" onPress={handleSend} style={styles.send}/>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  menuButton: {
    marginRight: 15
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  messageList: { 
    flex: 1,
    marginTop: 0 // Remove any previous paddingTop
  },
  // Keep the rest of your existing styles the same
  inputContainer: { 
    flexDirection: 'row', 
    padding: 10,
    paddingBottom: 20,
    backgroundColor: '#fff'
  },
  input: { 
    flex: 1, 
    marginRight: 10, 
    padding: 10, 
    borderWidth: 1,
    borderRadius: 20 
  },
  messageContainer: {
    padding: 10,
    margin: 5,
    borderRadius: 10,
    maxWidth: '80%',
  },
  sentMessage: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  receivedMessage: {
    backgroundColor: '#E8E8E8',
    alignSelf: 'flex-start',
  },
  messageText: { 
    fontSize: 16 
  },
  send:{

  },
});