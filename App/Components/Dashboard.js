import React,{ Component } from 'react';
import API from '../Utils/api';
import Profile from './Profile';
import Repos from './Repos';
import Notes from './Notes';

import {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableHighlight,
	ActivityIndicatorIOS
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginTop: 65,
    flex: 1
  },
  image: {
    height: 350,
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  }
});

export default class Dashboard extends Component {
	makeBackground(btn) {
		const obj = {
			flexDirection: 'row',
			alignSelf: 'stretch',
			justifyContent: 'center',
			flex: 1
		}

		if(btn === 0){
			obj.backgroundColor = '#48BBEC';
    } else if (btn === 1){
      obj.backgroundColor = '#E77AAE';
    } else {
      obj.backgroundColor = '#758BF4';
    }
    
		return obj;
	}

	goToProfile(){
    this.props.navigator.push({
    	title: 'Profile Page',
    	component: Profile,
    	passProps: {userInfo: this.props.userInfo}
    });
  }

  goToRepos(){
    API.getRepos(this.props.userInfo.login)
      .then(res => {
        this.props.navigator.push({
          component: Repos,
          title: 'Repos Page',
          passProps: {
            userInfo: this.props.userInfo,
            repos: res
          }
        });
    });
  }

  goToNotes(){
  	API.getNotes(this.props.userInfo.login)
  	      .then(jsonRes => {
  	      	jsonRes = jsonRes || {};
  	        this.props.navigator.push({
  	          component: Notes,
  	          title: 'Notes',
  	          passProps: {
  	            userInfo: this.props.userInfo,
  	            notes: jsonRes
  	          }
  	        });
  	    });
  }

	render(){
		return (
			<View style={styles.container}>
				<Image 
					style={styles.image}
					source={{uri: this.props.userInfo.avatar_url}}
				/>
				<TouchableHighlight
					style={this.makeBackground(0)}
					onPress={() => this.goToProfile()}
					underlayColor="#88D4F5">
						<Text style={styles.buttonText}>View Profile</Text>
				</TouchableHighlight>
				<TouchableHighlight
					style={this.makeBackground(1)}
					onPress={() => this.goToRepos()}
					underlayColor="#E39EBF">
						<Text style={styles.buttonText}>View Repositories</Text>
				</TouchableHighlight>
				<TouchableHighlight
					style={this.makeBackground(2)}
					onPress={() => this.goToNotes()}
					underlayColor="#9BAAF3">
						<Text style={styles.buttonText}>Take Notes</Text>
				</TouchableHighlight>
			</View>
		);
	}
}