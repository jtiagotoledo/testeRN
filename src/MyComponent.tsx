import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';

const MyComponent = ( myParameter:any ) => {
    myParameter = myParameter.text
    const [parameterValue, setParameterValue] = useState(myParameter);

    
    /* setParameterValue(myParameter)
    console.log('myParameter',myParameter) */

    

    return (
        <View>
        <Text>{parameterValue}</Text>
        {/* <Button onPress={alterar} title='alterar'></Button> */}
        </View>
    );
};

export default MyComponent;  