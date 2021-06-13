import 'react-native-gesture-handler';
import React from 'react';

import {View, Button} from 'react-native';

class Profile extends React.component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View>
          <Button
            style={styles.logoutBtn}
            title="Logout"
            onPress={() => this.doLogout()}
          />
        </View>
      </View>
    );
  }
}
