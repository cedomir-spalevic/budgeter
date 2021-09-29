import React from "react";
import { Dialog } from "components";

interface Props {
   visible: boolean;
   loading: boolean;
   title: string;
   type: string;
   close: () => void;
   delete: () => void;
}

const DeleteDialog: React.FC<Props> = (props: Props) => {
   let title = `Delete ${props.title}?`;
   let message = `Are you sure want to delete this ${props.type}? This will be removed from all of your budgets.`;
   if (props.loading) {
      title = `Deleting ${props.title}`;
      message = "";
   }
   return (
      <Dialog
         loading={props.loading}
         visible={props.visible}
         title={title}
         onTouchOutside={props.close}
         message={message}
         positiveButton={{
            title: "Yes",
            onPress: props.delete
         }}
         negativeButton={{
            title: "No",
            onPress: props.close
         }}
      />
   );
};

export default DeleteDialog;
