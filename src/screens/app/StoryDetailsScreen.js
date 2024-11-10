import {
  StyleSheet,
  Text,
  FlatList,
  useWindowDimensions,
  View,
} from "react-native";
import { KContainer } from "../../components";
import { TextFont } from "../../constants/themes";
import BackButton from "../../components/BackButton";
import ImgPromptScreen from "../../components/ImgPromptScreen";
import InfoContainer from "../../components/InfoContainer";

const StoryDetailsScreen = ({ navigation, route }) => {
  const { name, images, data } = route.params;

  const { width } = useWindowDimensions();

  return (
    <KContainer>
      <BackButton navigation={navigation} />
      <Text style={[TextFont.Text, styles.title]}>{name}</Text>
      <InfoContainer
        text={"These are the scenes that you have generated up until now."}
      />
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <ImgPromptScreen item={item} image={images} index={index} />
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        snapToInterval={width}
      />
    </KContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    color: "#6E6E6E",
    alignSelf: "flex-start",
    marginLeft: 30,
    marginTop: 20,
  },
  imagesContainer: {
    width: "100%",
    flex: 1,
    marginHorizontal: 20,
  },
});

export default StoryDetailsScreen;
