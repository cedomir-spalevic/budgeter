import React, { useState } from "react";
import { TextField, Icon } from "components";
import { TouchableOpacity } from "react-native-gesture-handler";

interface Props {
   placeholder?: string;
   errorMessage?: string;
   onChange?: (newText: string) => void;
}

const TextFieldSecret: React.FC<Props> = (props: Props) => {
   const [hidden, setHidden] = useState<boolean>(true);

   return (
      <TextField
         preRenderIcon={<Icon name="lock" />}
         placeholder={props.placeholder}
         errorMessage={props.errorMessage}
         hidden={hidden}
         postRenderIcon={hidden ?
            <TouchableOpacity onPress={() => setHidden(false)}>
               <Icon name="visibility" />
            </TouchableOpacity> : 
            <TouchableOpacity onPress={() => setHidden(true)}>
               <Icon name="visibility-off" />
            </TouchableOpacity>}
         onChange={nt => props.onChange && props.onChange(nt)}
      />
   )
}

export default TextFieldSecret;