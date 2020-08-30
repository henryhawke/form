import * as React from "react";
import { FlatList, StyleSheet, Text, View, Button, TextInput,  SafeAreaView  } from "react-native";
import { useForm, Controller } from "react-hook-form";
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
//import logo from './images/diagram.png'; // Tell webpack this JS file uses this image

function Calculate(data:any) {
  console.log(data);
	const V = data[0]; // Wind Speed
	const WF	= data[1];//Wind flow (1 = clear, 2 = partially obstructed, 3 = obstructed) is used in method 1-C
	const B = data[2];//Tent width
	const L = data[3];//Tent length
	const H = data[4];//Eave height
	const Hp = data[5];//Band height
	const RT = data[6];//Roof type (1 = Gable, 2 = Hip, 3 = Pyramid)
	const RH =data[7]; //Roof height
	const RL = data[8];//Ridge length (only if hip roof)
	const NB = data[9];//Number of posts in width (including corner posts)
	const NL = data[10];//Number of posts in length (including corner posts)
	const NI = data[11];//Number of ballasts per intermediate post
	const NC = data[12];//Number of ballasts per corner post

  // Intermediate variables (calculated using user input variables):
  const	wp = 0.00256*V^2 //= wind pressure
  //
  // Output variables:
   	var M1 = 0//overturn moment when wind perpendicular to length
   	var M2 = 0//overturn moment when wind perpendicular to width
   	var U = 0//Vertical uplift force per guy line
   	var BW = 0//Ballast weight per guy line
  //
  // Gable roof
  // 	Wind perpendicular to length
  // 		Open
  			M1 = wp*(L*Hp*(H-Hp/2)+L*RH*(H+RH/2));
  // 		Partially enclosed
  			M1 = wp*(L*H*H/2+L*RH*(H+RH/2))+L*RH*(H+RH/2);
  // 		Enclosed
  			M1 = wp*(L*H*H/2+L*RH*(H+RH/2));
  // 	Wind perpendicular to width
  // 		Enclosed
  			M2 = wp*(B*H*H/2+B*(RH/2)*(H+RH/3));
  // 		Partially enclosed
  			M2 = wp*(L*H*H/2+L*RH*(H+RH/2))+L*RH*(H+RH/2);
  // 		Open
  			M2 = wp*(B*Hp*(H-Hp/2)+B*(RH/2)*(H+RH/3));
  // Hip roof
  // 	Wind perpendicular to length
  // 		Enclosed
  			M1 = wp*(L*H*H/2+RL*RH*(H+RH/2)+(L-RL)*RH*(H+RH/3)/2);
  // 		Partially enclosed
  			M1 = wp*(L*H*H/2+L*RH*(H+RH/2))+L*RH*(H+RH/2);
  // 		Open
  			M1 = wp*(L*Hp*(H-Hp/2)+RL*RH*(H+RH/2)+(L-RL)*RH*(H+RH/3)/2);
  // 	Wind perpendicular to width
  // 		Enclosed
  			M2 = wp*(B*H*H/2+B*(RH/2)*(H+RH/3));
  // 		Partially enclosed
  			M2 = wp*(L*H*H/2+L*RH*(H+RH/2))+L*RH*(H+RH/2);
  // 		Open
  			M2 = wp*(B*Hp*(H-Hp/2)+B*(RH/2)*(H+RH/3));
  //
  // Pyramid roof
  // 	Wind perpendicular to length
  // 		Enclosed
  			M1 = wp*(L*H*H/2+RL*RH*(H+RH/2)+(L-RL)*RH*(H+RH/3)/2);
  // 		Partially enclosed
  			M1 = wp*(L*H*H/2+L*RH*(H+RH/2))+L*RH*(H+RH/2);
  // 		Open
  			M1 = wp*(L*Hp*(H-Hp/2)+RL*RH*(H+RH/2)+(L-RL)*RH*(H+RH/3)/2);
  // 	Wind perpendicular to width
  // 		Enclosed
  			M2 = wp*(B*H*H/2+B*(RH/2)*(H+RH/3));
  // 		Partially enclosed
  			M2 = wp*(L*H*H/2+L*RH*(H+RH/2))+L*RH*(H+RH/2);
  // 		Open
  			M2 = wp*(B*Hp*(H-Hp/2)+B*(RH/2)*(H+RH/3));
  //
  // Vertical uplift force per guy line:
  	U = Math.max(M1/B/((NL-2)*NI+2*NC), M2/L/((NB-2)*NI+2*NC));
    console.log(data);
};

export default function App() {
  const { control, handleSubmit, errors } = useForm();
  const onSubmit = data => Calculate(data);

  const sheetRef = React.useRef(null);

  const renderContent = () => (
    <View
      style={{
        padding: 20,
        paddingBottom:60,
        alignItems: 'center',
        justifyContent: 'center',
        height: 700,
        backgroundColor:'#999',
      }}
    >

    {errors.firstName && <Text>This is required.</Text>}
    <Button style={styles.submit} title="Calculate" onPress={handleSubmit(Calculate(control.getValues))} />
    <Controller
      control={control}
      render={({ onChange, onBlur, value }) => (
        <TextInput
          style={styles.input}
          onBlur={onBlur}
          onChangeText={value => onChange(value)}
          value={value}
          placeholder="Wind Speed"
        />
      )}
      name="windSpeed"
      defaultValue=""
    />
    <Controller
      control={control}
      render={({ onChange, onBlur, value }) => (
        <TextInput
          style={styles.input}
          onBlur={onBlur}
          onChangeText={value => onChange(value)}
          value={value}
          placeholder="Wind Flow"
        />
      )}
      name="windFlow"
      defaultValue=""
    />
    <Controller
      control={control}
      render={({ onChange, onBlur, value }) => (
        <TextInput
          style={styles.input}
          onBlur={onBlur}
          onChangeText={value => onChange(value)}
          value={value}
          placeholder="Tent Width"
        />
      )}
      name="tentWidth"
      defaultValue=""
    />
    <Controller
      control={control}
      render={({ onChange, onBlur, value }) => (
        <TextInput
          style={styles.input}
          onBlur={onBlur}
          onChangeText={value => onChange(value)}
          value={value}
          placeholder="Eave Height"
        />
      )}
      name="eaveHeight"
      defaultValue=""
    />
    <Controller
      control={control}
      render={({ onChange, onBlur, value }) => (
        <TextInput
          style={styles.input}
          onBlur={onBlur}
          onChangeText={value => onChange(value)}
          value={value}
          placeholder="Band Height"
        />
      )}
      name="bandHeight"
      defaultValue=""
    />
    <Controller
      control={control}
      render={({ onChange, onBlur, value }) => (
        <TextInput
          style={styles.input}
          onBlur={onBlur}
          onChangeText={value => onChange(value)}
          value={value}
          placeholder="Ridge Length"
        />
      )}
      name="ridgeLength"
      defaultValue=""
    />

    <Controller
      control={control}
      render={({ onChange, onBlur, value }) => (
        <TextInput
          style={styles.input}
          onBlur={onBlur}
          placeholder="Number of Posts in Width"
          onChangeText={value => onChange(value)}
          value={value}
        />
      )}
      name="postsInWidth"
      rules={{ required: true }}
      defaultValue=""
    />
    <Controller
      control={control}
      render={({ onChange, onBlur, value }) => (
        <TextInput
          style={styles.input}
          onBlur={onBlur}
          placeholder="Number of Posts in Height"
          onChangeText={value => onChange(value)}
          value={value}
        />
      )}
      name="postsInHeight"
      rules={{ required: true }}
      defaultValue=""
    />

    <Controller
      control={control}
      render={({ onChange, onBlur, value }) => (
        <TextInput
          style={styles.input}
          onBlur={onBlur}
          placeholder="Number of Ballasts Per Intermediate Post"
          onChangeText={value => onChange(value)}
          value={value}
        />
      )}
      name="ballastsIntermediate"
      rules={{ required: true }}
      defaultValue=""
    />
    <Controller
      control={control}
      render={({ onChange, onBlur, value }) => (
        <TextInput
          style={styles.input}
          onBlur={onBlur}
          placeholder="Number of Ballasts Per Corner Posts"
          onChangeText={value => onChange(value)}
          value={value}
        />
      )}
      name="ballastsCorner"
      rules={{ required: true }}
      defaultValue=""
    />

    </View>
  );


  return (
    <>
    <SafeAreaView style={styles.container}>
    <View style={styles.container}>

<View style={{flex: 1, padding: 20}}>
  <View style={{flex: 1}} >
  <Text style={styles.big}>Calculation of overturn moment due to horizontal wind force</Text>
  <Text style={styles.desc}>This tool calculates the load at each guy to resist overturn due to horizontal wind force.</Text>

  </View>
  <View style={{flex: 5}} >
  <Text style={[styles.red, styles.big]}>Assumptions</Text>
  <FlatList
  data={[
    {key: '(1)	Wind pressure is applied on the windward wall (if side is present) and on the roof profile vertical projection.'},
    {key: '(2)	Wind pressure is calculated from the wind speed using p = 0.00256 V2, where V is the wind speed in miles per hour (mph) and p is the pressure in pound per square foot (psf). For instance, if V = 70 mph, p = 12.5 psf.'},
    {key: '(3)	Vertical wind load (uplift) is not considered as it is a different mode of failure.'},
    {key: '(4)	The ground friction at the footings of all leeward posts is sufficiently large to prevent sliding of the whole tent.'},
    {key: '(5)	The frame is sufficiently rigid to overturn as a whole without collapsing at the onset of overturn.'},
    {key: '(6)	The number of ballasts per post along the width and the length are the same.'},
    {key: '(7)	The number of ballasts per corner post is the same for the four corners.'},
  ]}         renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>} />
  </View>

</View>
<Button
  title="Open Calculator"
  onPress={() => sheetRef.current.snapTo(0)}
/>
    </View>
      <BottomSheet
        ref={sheetRef}
        snapPoints={[600, 300, 100]}
        enabledInnerScrolling={true}
        initialSnap={1}
        enabledBottomClamp={true}
        borderRadius={10}
        renderContent={renderContent}
      />
    </SafeAreaView>

    </>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#fff',
  },
  big: {
    fontWeight: 'bold',
    fontSize:20,
  },
  desc: {
    fontSize:16,
  },
  item:{
    fontSize:16,
    padding:10,
  },
  input: {
    borderRadius: 50,
    width: 300,
    height: 50,
    padding: 15,
    color:'white',
    borderColor:'#777',
    backgroundColor: 'white',
    borderWidth:1,
    marginTop: 10,
    fontSize: 16,
  },
  submit: {
    color:'black',
    height:200,
    backgroundColor: 'white',
  },
});
