import { View,Text } from 'react-native';
import { Chip } from '@rneui/themed';
import {useState} from 'react'


const CustomChips = (props:any)=>{
    //const numbers = [1, 2, 3, 4, 5];
    let chipsClasses;
    
    console.log('CustomChips',props.title);
    chipsClasses = props.title.map((classe:any) =>
    <Chip key={classe} title={classe}></Chip>
    );
    console.log('chipsClasses',chipsClasses);
    

    
    return(
    
        <View>{chipsClasses}</View>
    );
}

export default CustomChips;