import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'

type props = {
  onPress: () => void;
  content: string;
}

const Chat = (props: props) => {
  const { onPress, content} = props

  return (
    <View>
      <TouchableOpacity onPress={onPress}>
          <Text style={styles.message}>
            {content}
          </Text>
        </TouchableOpacity>
    </View>
  )
}

export default Chat

const styles = StyleSheet.create({
    message:{
        backgroundColor:'#71CCEF',
        paddingLeft:10,paddingRight:10,paddingTop:5,paddingBottom:5,
        borderBottomRightRadius:6,
        borderBottomLeftRadius:6,borderTopLeftRadius:6,
        fontSize:15,marginLeft:8,
      }
})
