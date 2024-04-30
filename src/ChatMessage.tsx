import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
  Modal,
  Pressable,
  TextInput,
  Alert,
} from 'react-native';
import Chat from './Chat';
import Clipboard from '@react-native-clipboard/clipboard';

type ItemModel = {
  id: number;
  content: string;
  image: string;
};

const ChatMessage = () => {
  const listData = [
    {
      id: 1,
      image:
        'https://i.pinimg.com/564x/d4/4b/fe/d44bfe400509b1846d24c9f63adba3db.jpg',
      content: 'Heloooo',
      time: '16:44',
      repliedContent: '',
    },
  ];

  const [data, setdata] = useState([]);
  const [content, setcontent] = useState<string>('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [editingID, seteditingID] = useState(null);
  const [dataItem, setDataItem] = useState<ItemModel>();
  const [repliedContent, setRepliedContent] = useState('');

  const fetchData = () => {
    setdata(listData);
  };

  const postMessage = () => {
    const newMessage = {
      id: data.length + 1,
      image:
        'https://i.pinimg.com/564x/d4/4b/fe/d44bfe400509b1846d24c9f63adba3db.jpg',
      content: content, // Chỉ lưu nội dung mới
      repliedContent: repliedContent,
    };
    setdata([...data, newMessage]);
    setcontent('');
    setRepliedContent('');
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleShowModal = (item: ItemModel) => {
    setModalVisible(!modalVisible);
    setDataItem(item);
  };

  const handleDeleteConfirmation = (itemId: number) => {
    setSelectedItemId(itemId);

    Alert.alert('Xóa sản phẩm', 'Bạn có chắc chắn muốn xóa sản phẩm này?', [
      {
        text: 'Hủy',
        onPress: () => setSelectedItemId(null),
        style: 'cancel',
      },
      {text: 'Xóa', onPress: () => handleDelete(itemId)},
    ]);
  };

  const handleDelete = itemID => {
    const updateData = data.filter(item => item.id !== itemID);
    setdata(updateData);
    setModalVisible(false);
    setSelectedItemId(null);
  };

  const handleUpdate = (item: ItemModel) => {
    setcontent(item.content);
    seteditingID(item.id);
    setModalVisible(false);
  };

  const handleCopy = (item: ItemModel) => {
    Clipboard.setString(item.content); // Replace 'Text to be copied' with the actual text you want to copy
    setModalVisible(false);
  };

  const renderItem = ({item}) => {
    return (
      <View style={{flexDirection: 'row', marginBottom: 10}}>
        {item.id === 1 ? (
          <>
            <Image style={styles.borderImage} source={{uri: item.image}} />
            <Text style={styles.message}>{item.content}</Text>
          </>
        ) : (
          <>
            <View style={styles.itemchat}>
              <View
                style={{
                  alignSelf: 'center',
                  flexDirection: 'column',
                }}>
                {item.repliedContent ? (
                  <View style={styles.repliedContentContainer}>
                    <Text>Reply</Text>
                    <Text style={styles.repliedContent}>
                      {item.repliedContent}
                    </Text>
                  </View>
                ) : null}
                <View style={{flexDirection:'row',alignSelf:'flex-end'}}>
                <Chat
                  content={item.content}
                  onPress={() => handleShowModal(item)}
                  style={{alignSelf: 'flex-start'}}
                />
                <Image style={styles.borderImage1} source={{uri: item.image}} />
                </View>
              </View>
            </View>
          </>
        )}
      </View>
    );
  };

  const updateMessage = () => {
    const updateData = data.map(item => {
      if (item.id === dataItem?.id) {
        return {
          ...item,
          content: content,
        };
      }
      return item;
    });
    console.log('Updated Data:', updateData);
    setdata(updateData);
    setcontent('');
    seteditingID(null);
  };

  const handleReply = (content: string) => {
    setRepliedContent(content);
    setModalVisible(false); // Close the modal after selecting Reply
  };
  const handleCancelReply = () => {
    setRepliedContent('');
  };

  return (
    <View style={{flexDirection: 'column'}}>
      <View style={styles.info}>
        <Image
          style={styles.icon}
          source={require('../assets/backblack.png')}
        />
        <Image style={styles.image} source={require('../assets/anh4.jpg')} />
        <View style={{flexDirection: 'column', width: '60%', paddingLeft: 8}}>
          <Text
            style={{
              fontWeight: 'bold',
              color: 'black',
              fontSize: 18,
              marginTop: 5,
            }}>
            Rr.Dave
          </Text>
        </View>
        <Image style={styles.call} source={require('../assets/more.png')} />
      </View>

      <View
        style={{
          width: '100%',
          height: '63%',
          backgroundColor: 'white',
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '95%',
            height: '96%',
            backgroundColor: 'white',
            borderRadius: 16,
          }}>
          <FlatList
            style={{margin: 10}}
            data={data}
            keyExtractor={item => `key-${item.id}`}
            renderItem={renderItem}
          />
        </View>
      </View>

      {/* Display replied content */}
      {repliedContent ? (
        <View style={styles.reply}>
          <View>
            <Text style={{fontWeight: 'bold'}}>Replied Message:</Text>
            <Text>{repliedContent}</Text>
          </View>
          <TouchableOpacity onPress={handleCancelReply}>
            <Text style={{color: 'red', fontWeight: 'bold'}}>X</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      <View style={styles.conteMess}>
        <Image style={styles.phone} source={require('../assets/link.png')} />
        <Image style={styles.phone} source={require('../assets/mic.png')} />
        <TextInput
          style={styles.textChat}
          placeholder="Send a message"
          onChangeText={txt => {
            setcontent(txt);
          }}
          value={content}
        />
        <TouchableHighlight
          onPress={editingID ? () => updateMessage() : postMessage}>
          <Image style={styles.phone} source={require('../assets/send.png')} />
        </TouchableHighlight>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <Pressable
          style={styles.modalBackground}
          onPress={() => setModalVisible(false)}>
          <View style={[styles.centeredView, {justifyContent: 'flex-end'}]}>
            <View style={styles.modalView}>
              <View style={styles.textdialog}>
                <Text style={styles.size12}>
                  Lorem ipsum dolor dit amet consectetur.
                </Text>
                <Text>Venenatis cursus et at ament aget pellentesque.</Text>
                <Text>Mi.</Text>
              </View>
              <View style={{flexDirection: 'column'}}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.copy}>Copy</Text>
                  <TouchableOpacity onPress={() => handleCopy(dataItem)}>
                    <Image
                      style={styles.phone}
                      source={require('../assets/copy.png')}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.kengang}></View>
                {/* <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => handleUpdate(dataItem)}>
                  <Text style={styles.textStyle}>Chỉnh sửa</Text>
                </Pressable>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => handleDeleteConfirmation(dataItem?.id)}>
                  <Text style={styles.textStyle}>Xóa</Text>
                </Pressable> */}

                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.copy}>Reply</Text>
                  <TouchableOpacity
                    onPress={() => handleReply(dataItem.content)}>
                    <Image
                      style={styles.phone}
                      source={require('../assets/reply.png')}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.kengang}></View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.copy}>Delete</Text>
                  <TouchableOpacity
                    onPress={() => handleDeleteConfirmation(dataItem?.id)}>
                    <Image
                      style={styles.phone}
                      source={require('../assets/bin.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default ChatMessage;

const styles = StyleSheet.create({
  repliedContentContainer: {
    width:'auto',
    height: 'auto',
    backgroundColor: '#DDDDDD',
    flexDirection:'column',
    borderRadius:16,
    padding:5,
    paddingLeft:10
  },
  repliedContent: {
    
  },
  conteMess: {
    flexDirection: 'row',
    marginTop: 10,
  },
  reply: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  info: {
    flexDirection: 'row',
    height: 90,
    paddingTop: 38,
    backgroundColor: 'white',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // Adjust the opacity as needed
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  itemchat: {
    flexDirection: 'row',
    width: '97%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
    alignSelf:'flex-end'
  },
  message: {
    backgroundColor: '#DDDDDD',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderBottomRightRadius: 6,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderTopLeftRadius: 0,
    fontSize: 15,
    marginLeft: 8,
  },
  kengang: {
    width: 300,
    backgroundColor: '#CBCBCB',
    height: 2,
    marginTop: 5,
    marginBottom: 8,
  },
  icon: {
    width: 23,
    height: 23,
    marginTop: 7,
    marginLeft: 8,
  },
  textdialog: {
    width: '94%',
    backgroundColor: '#E4E4E4',
    paddingLeft: 20,
    paddingRight: 14,
    borderRadius: 15,
    marginBottom: 15,
    paddingTop: 7,
    paddingBottom: 7,
  },
  size12: {
    fontSize: 12,
  },
  image: {
    borderRadius: 50,
    width: 38,
    height: 38,
    marginLeft: 15,
  },
  call: {
    width: 20,
    height: 20,
    alignSelf: 'center',
    marginLeft: 30,
    marginBottom: 8,
  },
  phone: {
    width: 21,
    height: 21,
    marginRight: 10,
    alignSelf: 'center',
    marginLeft: 6,
  },
  imageU: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: '8%',
  },
  textChat: {
    borderWidth: 1,
    borderRadius: 19,
    width: '70%',
    height: 40,
    paddingLeft: 15,
  },
  borderImage: {
    width: 32,
    height: 32,
    borderRadius: 50,
    marginTop: 8,
  },
  borderImage1: {
    width: 22,
    height: 22,
    borderRadius: 50,
    marginTop: 8,
    marginLeft: 8,
    alignSelf: 'flex-end',
    textAlign: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalView: {
    width: '90%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  copy: {
    width: '89%',
    color: 'black',
    fontSize: 12,
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
