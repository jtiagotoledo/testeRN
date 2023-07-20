import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';

const MyComponent = ( ) => {
    let teste='oi';
    const [parameterValue, setParameterValue] = useState(teste);
    /* setParameterValue(myParameter)
    console.log('myParameter',myParameter) */

    useEffect(()=>{
        setParameterValue('oi4')
    },[teste])

    const alterar = () =>{
        teste='oi3'
    }

    return (
        <View>
        <Text>{parameterValue}</Text>
        <Button onPress={alterar} title='alterar'></Button>
        </View>
    );
};

export default MyComponent;  