import { Chip, withTheme, lightColors } from '@rneui/themed';
import { View } from 'react-native';

const CustomChip = (props:any)=>{
    return(
        <View>
            <Chip>{props.chip}</Chip>
        </View>
    );
    
}

export default CustomChip