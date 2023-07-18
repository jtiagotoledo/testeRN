import { View,Text } from 'react-native';
import { Chip } from '@rneui/themed';


const CustomChips = (props:any)=>{
    //const numbers = [1, 2, 3, 4, 5];
    let chipsClasses;
    if(!props===undefined){
        console.log('CustomChips',props);
        chipsClasses = props.map((classe:any) =>
        <Text key={classe}>{classe}</Text>
        );
        console.log('chipsClasses',chipsClasses);
    }

    
    return(
    
        <View>{chipsClasses}</View>
    );
}

export default CustomChips;