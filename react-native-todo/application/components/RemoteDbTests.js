'use strict';
var styles = require('../styles/styles');
var scripts = require('../lib/helpers/scripts');
var React = require('react-native');
var {View, TouchableHighlight, Text, AsyncStorage} = React;

class RemoteDbTests extends React.Component {

    constructor() {
        super();
    }
    componentWillMount() {

    }

    addItemToRemoteDB() {
      var userId = '';
      AsyncStorage.getItem('authData').then((authData) => {
        if(authData) {
          authData = JSON.parse(authData);
        }
        userId += authData.userId;
        console.log(userId, authData)

        console.log('add item to remote db', userId);
        fetch('https://4jqibux547.execute-api.us-west-2.amazonaws.com/test/sync', {
          method: 'POST',
          headers: {
            // 'Accept-Encoding': 'base64',
            'Content-Type': 'application/json',
            'X-API-Key': ''
          },
          body: JSON.stringify({
            "userId": userId,
            "logs":  [
                {
                  "obj": {
                    "name": "kitesync",
                    "syncId": "232-534-1234",
                  },
                  "usn": 1
                }
              ]
          })
        })
        .then((res) => {
          console.log('<><><>data: ', JSON.stringify(res));
          var data = res.json();
          console.log(data);
          return data
        })
        .then((data) => {
          console.log(data)
        })
        .catch((error) => {
          console.error(error);
        });
      });
    }

    //https://github.com/johanneslumpe/react-native-fs#usage
    queryItemsFromRemoteDB() {
      var userId = '';
      console.log('get items from remote db')
      AsyncStorage.getItem('authData').then((authData) => {
        if(authData) {
          authData = JSON.parse(authData);
        }
        userId += authData.userId;
        console.log(userId, authData)

        console.log('add item to remote db', userId);
        fetch('https://4jqibux547.execute-api.us-west-2.amazonaws.com/test/sync?lastUpdate=2&userId='+userId, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        })
        .then((res) => {
          console.log('<><><>data: ', JSON.stringify(res));
          var data = res.json();
          return data
        })
        .then((data) => {
          console.log(data)
        })
        .catch((error) => {
          console.error(error);
        });
      });
    }

    getItemsFromRemoteDB() {
      var userId = '';
      console.log('get items from remote db')

      AsyncStorage.getItem('authData').then((authData) => {
        if(authData) {
          authData = JSON.parse(authData);
        }
        userId += authData.userId;
        console.log(userId, authData)

        console.log('add item to remote db', userId);
        fetch('https://4jqibux547.execute-api.us-west-2.amazonaws.com/test/sync?lastUpdate=1&userId='+userId, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        })
        .then((res) => {
          console.log('<><><>data: ', JSON.stringify(res));
          var data = res.json();
          return data
        })
        .then((data) => {
          console.log(data)
        })
        .catch((error) => {
          console.error(error);
        });
      });
    }

    modifyItemInRemoteDB() {
      console.log('modify items in remote db')
    }

    deleteItemFromRemoteDB() {
      console.log('delete item from DB')
    }

    listItemsInRemoteDB() {
      console.log('delete all items from DB')
    }

    render() {
        return (
            <View style = {styles.container}>
              <TouchableHighlight
                  style={[styles.button, styles.newButton]}
                  underlayColor='#99d9f4'
                  onPress={this.addItemToRemoteDB.bind(this)}>
                  <Text style={styles.buttonText}>Add Item to Remote DB</Text>
              </TouchableHighlight>

              <TouchableHighlight
                  style={[styles.button, styles.newButton]}
                  underlayColor='#99d9f4'
                  onPress={this.queryItemsFromRemoteDB.bind(this)}>
                  <Text style={styles.buttonText}>Query items from Remote DB</Text>
              </TouchableHighlight>

              <TouchableHighlight
                  style={[styles.button, styles.newButton]}
                  underlayColor='#99d9f4'
                  onPress={this.getItemsFromRemoteDB.bind(this)}>
                  <Text style={styles.buttonText}>Get items from Remote DB</Text>
              </TouchableHighlight>

              <TouchableHighlight
                  style={[styles.button, styles.newButton]}
                  underlayColor='#99d9f4'
                  onPress={this.modifyItemInRemoteDB.bind(this)}>
                  <Text style={styles.buttonText}>Modify item in Remote DB</Text>
              </TouchableHighlight>

              <TouchableHighlight
                  style={[styles.button, styles.newButton]}
                  underlayColor='#99d9f4'
                  onPress={this.deleteItemFromRemoteDB.bind(this)}>
                  <Text style={styles.buttonText}>Delete an item from Remote DB</Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={[styles.button, styles.newButton]}
                underlayColor='#99d9f4'
                onPress={this.listItemsInRemoteDB.bind(this)}>
                <Text style={styles.buttonText}>List items in Remote DB</Text>
              </TouchableHighlight>
            </View>
        );
    }

}


module.exports = RemoteDbTests;
