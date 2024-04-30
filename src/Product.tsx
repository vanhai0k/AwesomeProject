import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  Modal,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import ItemProduct from './ItemProduct';
type ItemModel = {
  id: number;
  nameProduct: string;
  image: string;
  price: number;
  priceSale: number;
  quantity: number;
};

const Product = () => {
  const [dataItem, setdataItem] = useState<ItemModel>();
  const [data, setdata] = useState([]);
  const [isModalVisible, setisModalVisible] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [nameProduct, setNameProduct] = useState('');
  const [image, setimage] = useState('')
  const [isModalVisibleUpdate, setisModalVisibleUpdate] = useState(false);
  const [isCheckbox, setisCheckbox] = useState({});
  const [selectAll, setselectAll] = useState(false);


  const dataList: ItemModel[] = [
    {
      id: 1,
      image:
        'https://i.pinimg.com/564x/18/84/24/1884248df0286062436ea23d29ef5183.jpg',
      nameProduct: 'Apple iPhone 15 Pro Max Gia sieu re cho anh em',
      price: 500000,
      priceSale: 407000,
      quantity: 220,
    },
    {
      id: 2,
      image:
        'https://i.pinimg.com/736x/04/b7/9b/04b79b4cdcec72e7ebee3464886d3be5.jpg',
      nameProduct: 'Apple iPhone 14 Pro Max Gia sieu re cho anh em',
      price: 600000,
      priceSale: 447000,
      quantity: 22,
    },
  ];

  const toggleSelectAll = () => {
    const nextState = !selectAll;
    setselectAll(nextState);

    const updatecheckBox = {};

    Object.keys(isCheckbox).forEach((itemID) =>{
      updatecheckBox[itemID] = nextState;
    });

    setisCheckbox(updatecheckBox);
  }

  const handleAddItem = () => {
    setisModalVisible(!isModalVisible)
  };

  useEffect(() => {
    setdata(dataList);
  }, []);


  const handleDelete = (itemID: number) => {
    const updateData = data.filter((item) => item.id !== itemID);
    setdata(updateData);
    setisModalVisible(false);
    setSelectedItemId(null);
  };

  const handleDeleteModal = (itemId: number) =>{
    Alert.alert("Xoa san pham", "Ban co chac muon xoa san pham???", [{
        text: "Huy",
        onPress: () => setSelectedItemId(null),
        style: "cancel",
    },{
        text: "Xoa", onPress: () => handleDelete(itemId)
    }]);
  }

  const postData = () =>{
    const newData = {
        id: data.length + 1,
        nameProduct: nameProduct,
        image: image,
        price: 0,
      priceSale: 0,
      quantity: 0,
    };
    setdata([...data, newData]);

    const updateCheckItem = { ...isCheckbox, [newData.id] : selectAll };
    setisCheckbox(updateCheckItem);

    setisModalVisible(false);
    setNameProduct("");
    setimage("");
  }
  const toggleCheckbox = (itemID) =>{
    const updateCheckBox = {
        ...isCheckbox,
        [itemID]: !isCheckbox[itemID]
    };
    setisCheckbox(updateCheckBox);

    const anyUpdateCheckBox = Object.values(updateCheckBox).some( item => !item);
    setselectAll(!anyUpdateCheckBox);
  }

  const handleShowModalUpdate = (item: ItemModel) =>{
    setisModalVisibleUpdate(!isModalVisibleUpdate);
    setdataItem(item);
    setNameProduct(item.nameProduct);
    setimage(item.image);
  }

  const updateProduct = () =>{
    const updateData = data.map((item) =>{
        if(item.id == dataItem?.id){
            return{
                ...item,
                nameProduct: nameProduct,
                image: image,
            };
        }
        return item;
    });
    setdata(updateData);
    setisModalVisibleUpdate(false);
  }

  const renderItem = ({item}: {item: ItemModel}) => {
    return (
      <View style={{flexDirection:'column'}}>
        <View style={{flexDirection:'row'}}>
        <View style={{width:"80%"}}>
        <ItemProduct nameProduct={item.nameProduct} />
        <ItemProduct image={item.image} />

        </View>

        <TouchableOpacity onPress={() => handleShowModalUpdate(item)}>
        <Image style={styles.icon11} source={require('../assets/heart.png')} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteModal(item.id)}>
        <Image style={styles.icon11} source={require('../assets/shoppingcart.png')} />
        </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={()=> toggleCheckbox(item.id)} style={{marginLeft:"20%"}}>
            <Image 
            style={styles.icon}
            source={isCheckbox[item.id] ? require("../assets/tick.png") : require("../assets/unchecked.png")}
            />
        </TouchableOpacity>

      </View>
    );
  };

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#FFC300',
          marginTop: '14%',
        }}>
        <View style={{width: '86%'}}>
          <Text style={styles.title}>Sản phẩm yêu thích</Text>
        </View>

        <TouchableOpacity onPress={toggleSelectAll} style={{alignSelf:'center',marginRight:"5%"}}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            style={{ width: 24, height: 24 }}
            source={selectAll ? require('../assets/tick.png') : require('../assets/unchecked.png')}
          />
          <Text>All</Text>
        </View>
      </TouchableOpacity>
      </View>

      <FlatList
        style={{marginTop: '5%',height:600}}
        data={data}
        keyExtractor={item => `key-${item.id}`}
        renderItem={renderItem}
      />

      <TouchableOpacity style={styles.buttonAdd} onPress={handleAddItem}>
        <Text style={styles.textColoradd}>Them san pham</Text>
        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.titleadd}>Thêm sản phẩm</Text>
              <TextInput
                style={styles.modalText}
                placeholder="Nhap name san pham"
                onChangeText={txt => setNameProduct(txt)}
              />
              <TextInput
                style={styles.modalText}
                placeholder="Nhap image san pham"
                onChangeText={txt => setimage(txt)}
              />

              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => setisModalVisible(false)} // Đóng Modal khi nhấn vào nút
                >
                  <Text style={styles.buttonText}>Đóng</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={postData}>
                  <Text style={styles.buttonText}>Them</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          visible={isModalVisibleUpdate} // Hiển thị Modal nếu isModalVisible là true
          animationType="slide"
          transparent={true}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
            <Text style={styles.titleadd}>Cập nhập sản phẩm</Text>
              <TextInput
                style={styles.modalText}
                placeholder="Nhap name san pham"
                onChangeText={(txt) => setNameProduct(txt)}
                value={nameProduct}
              />
              <TextInput
                style={styles.modalText}
                placeholder="Nhap image san pham"
                onChangeText={(txt) => setimage(txt)}
                value={image}
              />

              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => setisModalVisibleUpdate(false)} // Đóng Modal khi nhấn vào nút
                >
                  <Text style={styles.buttonText}>Đóng</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={updateProduct}
                >
                  <Text style={styles.buttonText}>Update</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </TouchableOpacity>
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({
  title: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',

    padding: 12,
  },
  selectedItem: {
    borderColor: 'blue',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  buttonText:{

  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  modalText: {
    marginBottom: 20,
    fontSize: 16,
  },
  modalButton: {
    backgroundColor: '#EEAD0E',
    width: 'auto',
    marginRight: 8,
    borderRadius: 6,
    padding: 8,
  },
  textPrice: {
    color: 'red',
    fontWeight: 'bold',
    marginRight: 20,
  },
  buttonAdd: {
    backgroundColor: '#EEAD0E',
    width: 300,
    alignSelf: 'center',
    borderRadius: 6,
    padding: 8,
    marginBottom: 20,
  },
  xoc: {
    backgroundColor: 'gray',
    height: 2,
    width: '100%',
    marginLeft: 4,
    marginRight: 4,
  },
  textPriceSale: {
    color: 'gray',
    textDecorationLine: 'line-through',
  },
  textColoradd: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  borderImage: {
    width: 100,
    height: 100,
    borderRadius: 4,
  },
  mgt5: {
    flexDirection: 'row',
    marginTop: '5%',
  },
  icon: {
    width: 20,
    height: 20,
    alignSelf: 'center',
  },
  with8: {
    width: '80%',
  },
  with2: {
    width: '20%',
  },
  with3: {
    width: '30%',
  },
  content: {
    flexDirection: 'column',
    width: '70%',
  },
  item: {
    flexDirection: 'row',
    margin: 10,
  },
  titleadd: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 18,
  },  
  icon11:{
    width: 20, height: 20, alignSelf: "center"
  },
});
