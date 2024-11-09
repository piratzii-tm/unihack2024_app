import { Text, TouchableOpacity } from "react-native";

export const KUploadButton = ({ handleFileUpload }) => {
  return (
    <TouchableOpacity onPress={handleFileUpload}>
      <Text>Upload file</Text>
    </TouchableOpacity>
  );
};
