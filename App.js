import React from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Button } from 'react-native';
import uuid from 'uuid/v4'
import axios from 'axios'

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      todos: [],
      text: ''
    } 

    this.handleButtonPress = this.handleButtonPress.bind(this)
    this.getItems = this.getItems.bind(this)

  }

  componentDidMount(){
    setInterval(this.getItems, 1000)
  }

  getItems(){
    axios.get('http://localhost:3000/api/todoitems')
    .then(({data}) => {
      this.setState({
        todos: data.map(datum => ({key: datum._id, value: datum.title}))
      })
      console.log(data)
    })
    .catch(console.log)
  }

  handleButtonPress(){
    axios.post('http://localhost:3000/api/additem', {
      itemTitle: this.state.text
    })
    .then(() => {
      this.setState({
        text: ''
      })
    })
    .catch(console.log)
    
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
          />
          <Button
            onPress={this.handleButtonPress}
            title="Learn More"
            color="#841584"
          />
        </View>
        <FlatList
          data={this.state.todos}
          renderItem={({item}) => <Text key={item.key} style={styles.item}>{item.value}</Text>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
