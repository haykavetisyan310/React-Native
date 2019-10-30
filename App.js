import React, {Component} from 'react';
import {View,StyleSheet,Text,TextInput,Image} from 'react-native';
import Img1 from './assets/images/unnamed.png';


const API_KEY = '12572ba463e59145a114ce1f7063f92e';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            City: 'Gyumri',
            data:'',
            start:false,
            sunset:''
        };


    }


    GetWeather = async () => {
        const {City} = this.state;
        const api_url =
        await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${City}&APPID=${API_KEY}&units=metric`);
        const data = await api_url.json();
        let sunset = data.sys.sunset;
        let sun = new Date();
        sun.setTime(sunset);
        const sunset_date = sun.getHours() + ':' + sun.getMinutes() + ':' + sun.getSeconds();
        this.setState({data,start:true,sunset:sunset_date});
    };

    Change = (ev) => {
      let City = ev;
      this.setState({City})
    };

    render() {
        const {data,start,sunset} = this.state;
    return (
        <View style={{flex: 1}}>
            <View style={{flex:1, backgroundColor: 'powderblue'}} >
                <Text style={styles.city}>{start ? data.name : 'Enter City'}</Text>
            </View>
            <View style={{flex:2, backgroundColor: '#090912'}} >
                <View style={styles.block}>
                    <Image source={Img1} alt='/' style={styles.image}/>
                    <Text style={styles.temp}>{start ? Math.floor(data.main.temp) + '°': 22}</Text>
                </View>
            </View>
            <View style={{flex:3, backgroundColor: 'steelblue'}}>
                <Text style={styles.info}>Заход солнца : {start ? sunset : null}</Text>
                <Text style={styles.info}>Давление : {start ? data.main.pressure : null}</Text>
                <Text style={styles.info}>Местоположение : {start ? data.sys.country : null}</Text>
                <TextInput onChangeText={this.Change} placeholder='город' style={styles.input}/>
                <Text onPress={this.GetWeather} style={styles.btn}>Select</Text>
            </View>
        </View>
    );
}
}

const styles = StyleSheet.create({
   city:{
       fontSize:45,
       width:'100%',
       textAlign:'center',
       marginTop:10,
       color:'black',
   },
    block:{
       position:'absolute',
       width: 300,
       height:310,
       marginLeft:56,
       backgroundColor:'#090912',
    },
    image:{
       width:130,
       height:130,
       marginLeft:80
    },
    temp:{
       color:'white',
       fontSize: 50,
        marginLeft:120
    },
    info:{
       fontSize:30,
       color:'white',
       width:'100%',
        marginTop: 10
    },
    input:{
       width:200,
        height:40,
        borderBottomWidth:2,
        borderColor: 'black',
        marginLeft:105,
        textAlign: 'center',
        marginTop:30,
        fontSize:20,
        backgroundColor:'powderblue'
    },
    btn:{
       width:100,
       height:40,
       backgroundColor:'#090912',
       color:'white',
       marginLeft:155,
       textAlign:'center',
        paddingTop:10
    }
});

export default App;
