import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Notification = () => {
  const listData = [
    {
      id: 1,
      image:
        'https://i.pinimg.com/564x/25/f3/ed/25f3ed96795fe55531aca783737395cf.jpg',
      title: 'Mẫu ảnh cho công ty Global',
      content: 'Thời gian 8h30 - 15h30',
      date: '2024-04-30',
    },
    {
      id: 2,
      image:
        'https://i.pinimg.com/564x/95/df/fb/95dffb5ab70936f314237db802bbadd5.jpg',
      title: 'Mẫu ảnh cho công ty Sandal',
      content: 'Thời gian 8h30 - 15h30',
      date: '2024-04-30',
    },
    {
      id: 3,
      image:
        'https://i.pinimg.com/564x/49/5c/4b/495c4b49dd3c29a6f68c287d69eb3523.jpg',
      title: 'Mẫu ảnh cho công ty thời trang Wendly',
      content: 'Thời gian 8h30 - 15h30',
      date: '2024-05-01',
    },
    {
      id: 4,
      image:
        'https://i.pinimg.com/736x/66/a1/df/66a1df6d579392c4a8f43b4c034054ac.jpg',
      title: 'Du lịch bãi biển Dubai, khách sạn 6s',
      content: 'No comments yet! Add one to start the conversation',
      date: '2024-05-12',
    },
    {
      id: 5,
      image:
        'https://i.pinimg.com/564x/54/19/67/541967f6a4646de96f256e1b2c633703.jpg',
      title: 'Mẫu ảnh cho công ty người mẫu Handaler',
      content: 'Thời gian 8h30 - 15h30',
      date: '2024-04-12',
    },
  ];

  const formattedCurrentDate = new Date().toISOString().split('T')[0];
  // hiện tại
  const todayItems = listData.filter(
    item => item.date === formattedCurrentDate,
  );
  // tương lai
  const futureItems = listData.filter(
    item => new Date(item.date) > new Date(formattedCurrentDate),
  );
  // quá khứ
  const pastItems = listData.filter(
    item => new Date(item.date) < new Date(formattedCurrentDate),
  );

  return (
    <View style={{flexDirection: 'column'}}>
      <View style={styles.hearder}>
        <Image
          style={styles.img_back}
          source={require('../assets/backblack.png')}
        />
        <Text style={styles.heartitle}>Notification</Text>
      </View>
      <Text style={styles.new}>New</Text>
      <View style={styles.colum_update}>
        <View>
          <Image
            style={styles.img_back}
            source={require('../assets/info.png')}
          />
        </View>
        <View style={styles.colum_view}>
          <View style={styles.row_view}>
            <Text style={styles.title_update}>Update</Text>
            <Text>10 min ago</Text>
          </View>
          <Text style={styles.content_update}>You have a new scorecard</Text>
        </View>
      </View>
      {/* Today */}
      <Text style={styles.today}>Today</Text>
      {todayItems.map(item => (
        <View key={item.id} style={styles.colum_update}>
          <View>
            <Image style={styles.img_item} source={{uri: item.image}} />
          </View>
          <View style={styles.colum_view}>
            <View style={styles.row_view}>
              <Text style={styles.title_update}>{item.title}</Text>
              <Text>{item.date}</Text>
            </View>
            <Text style={styles.content_update}>{item.content}</Text>
          </View>
        </View>
      ))}
      {/* tương lai */}
      {futureItems.map(item => (
        <View>
          <Text style={styles.today}>{item.date}</Text>
          <View key={item.id} style={styles.colum_update}>
            <View>
              <Image style={styles.img_item} source={{uri: item.image}} />
            </View>
            <View style={styles.colum_view}>
              <View style={styles.row_view}>
                <Text style={styles.title_update}>{item.title}</Text>
              </View>
              <Text style={styles.content_update}>{item.content}</Text>
            </View>
          </View>
        </View>
      ))}
      {/* quá khứ */}
      <Text style={styles.today}>Last day</Text>
      {pastItems.map(item => (
        <View key={item.id} style={styles.colum_update}>
          <View>
            <Image style={styles.img_item} source={{uri: item.image}} />
          </View>
          <View style={styles.colum_view}>
            <View style={styles.row_view}>
              <Text style={styles.title_update}>{item.title}</Text>
              <Text>{item.date}</Text>
            </View>
            <Text style={styles.content_update}>{item.content}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  today: {
    fontSize: 17,
    color: 'black',
    marginLeft: 14,
    fontWeight: 'bold',
    marginTop: 24,
  },
  img_item: {
    borderRadius: 50,
    width: 25,
    height: 25,
  },
  content_update: {
    paddingLeft: 10,
    marginTop: 3,
    color: '#ABABAB',
  },
  title_update: {
    color: 'black',
    width: '75%',
    paddingLeft: 10,
  },
  row_view: {
    flexDirection: 'row',
  },
  colum_view: {
    flexDirection: 'column',
  },
  colum_update: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    marginTop: 16,
  },
  new: {
    fontSize: 17,
    color: 'black',
    marginLeft: 14,
    marginTop: 20,
    fontWeight: 'bold',
  },
  hearder: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
    flexDirection: 'row',
  },
  img_back: {
    width: 23,
    height: 23,
  },
  heartitle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 120,
  },
});
