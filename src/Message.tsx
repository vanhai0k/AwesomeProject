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

type ItemModel = {
  id: number;
  content: string;
  image: string;
}

const Message = () => {
  const listData = [
    {
      id: 1,
      image:
        'https://i.pinimg.com/564x/d4/4b/fe/d44bfe400509b1846d24c9f63adba3db.jpg',
      content: 'Heloooo',
      time: '16:44',
    },
  ];

  const [data, setdata] = useState([]);
  const [content, setcontent] = useState<string>('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [editingID, seteditingID] = useState(null);
  const [editingItemContent, seteditingItemContent] = useState("");
  const [dataItem, setDataItem] = useState<ItemModel>();



  const fetchData = () => {
    setdata(listData);
  };

  const postMessage = () => {
    const newMessage = {
      id: data.length + 1,
      image:
        'https://i.pinimg.com/564x/d4/4b/fe/d44bfe400509b1846d24c9f63adba3db.jpg',
      content: content,
    };
    setdata([...data, newMessage]);
    setcontent("");
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleShowModal = (item: ItemModel) => {
    setModalVisible(!modalVisible);
    setDataItem(item)
  };

  const handleDeleteConfirmation = (itemId: number) => {
    setSelectedItemId(itemId);

    Alert.alert("Xóa sản phẩm", "Bạn có chắc chắn muốn xóa sản phẩm này?", [
      {
        text: "Hủy",
        onPress: () => setSelectedItemId(null),
        style: "cancel",
      },
      { text: "Xóa", onPress: () => handleDelete(itemId) },
    ]);
  };
  
  const handleDelete = (itemID) => {
      const updateData = data.filter((item) => item.id !== itemID);
      setdata(updateData);
      setModalVisible(false);
      setSelectedItemId(null);
  }

  const handleUpdate = (item: ItemModel) => {
    setcontent(item.content);
    seteditingID(item.id);
    setModalVisible(false);
  }

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
            <View
              style={{
                flexDirection: 'row',
                width: '97%',alignItems: 'flex-end',
                justifyContent: 'flex-end',
                alignContent:'flex-end'
              }}>
              <View
                style={{
                  alignSelf: 'center',
                  flexDirection: 'row',
                }}>
                <Chat
                  content={item.content}
                  onPress={() => handleShowModal(item)}
                  style={{alignSelf: 'flex-start'}}
                />
                <Image style={styles.borderImage1} source={{uri: item.image}} />
              </View>
            </View>
          </>
        )}
      </View>
    );
  };

  const updateMessage = () =>{
    const updateData = data.map((item) =>{
      if(item.id === dataItem?.id){
        return{
          ...item,
          content: content,
        }        
      }
      return item;
    });
    console.log("Updated Data:", updateData);
    setdata(updateData);
    setcontent("");
    seteditingID(null);
  }


  return (
    <View style={{flexDirection: 'column'}}>
      <View style={styles.info}>
        <Image
          style={styles.icon}
          source={require('../assets/leftarrow.png')}
        />
        <Image style={styles.image} source={require('../assets/anh4.jpg')} />
        <View style={{flexDirection: 'column', width: '60%', paddingLeft: 8}}>
          <Text>Camelia</Text>
          <Text style={{fontSize: 11}}>Online</Text>
        </View>
        <Image
          style={styles.phone}
          source={require('../assets/telephone.png')}
        />
        <Image
          style={styles.call}
          source={require('../assets/camrecorder.png')}
        />
      </View>

      <View
        style={{
          width: '100%',
          height: '83%',
          backgroundColor: '#DDDDDD',
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
          <Image style={styles.imageU} source={require('../assets/anh4.jpg')} />
          <Text style={{textAlign: 'center', fontSize: 23, fontWeight: 'bold'}}>
            Camelia
          </Text>
          <FlatList
            style={{margin: 10}}
            data={data}
            keyExtractor={item => `key-${item.id}`}
            renderItem={renderItem}
          />
        </View>
      </View>

      <View style={{flexDirection: 'row', marginTop: 10}}>
        <Image style={styles.phone} source={require('../assets/link.png')} />
        <Image style={styles.phone} source={require('../assets/mic.png')} />
        <TextInput
          style={styles.textChat}
          placeholder="Send a message"
          onChangeText={(txt) => {setcontent(txt), console.log(content);
          }}
          value={content}
        />
        <TouchableHighlight onPress={editingID ? () => updateMessage() : postMessage}>
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
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {/* <Text style={styles.modalText}>Hello World!</Text> */}
              <View style={{flexDirection:'column'}}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => handleUpdate(dataItem)}>
                <Text style={styles.textStyle}>Chỉnh sửa</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => handleDeleteConfirmation(dataItem?.id)}>
                <Text style={styles.textStyle}>Xóa</Text>
              </Pressable>
              </View>
            </View>
          </View>
        </Modal>
    </View>
  );
};
export default Message;
const styles = StyleSheet.create({
  info: {
    flexDirection: 'row',
    height: 90,
    paddingTop: 38,
    backgroundColor: 'white',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  message: {
    backgroundColor: '#DDDDDD',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderBottomRightRadius: 14,
    borderTopRightRadius: 14,
    borderBottomLeftRadius: 14,
    fontSize: 15,
    marginLeft: 8,
  },
  icon: {
    width: 35,
    height: 35,
  },
  image: {
    borderRadius: 50,
    width: 38,
    height: 38,
    marginLeft: 10,
  },
  call: {
    width: 29,
    height: 29,
    alignSelf: 'center',
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
    width: 22,
    height: 22,
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
  message: {
    backgroundColor: '#DDDDDD',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderBottomRightRadius: 14,
    borderTopRightRadius: 14,
    borderBottomLeftRadius: 14,
    fontSize: 15,
    marginLeft: 8,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalView: {
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
