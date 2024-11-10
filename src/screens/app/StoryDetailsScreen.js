import {
  StyleSheet,
  Text,
  FlatList,
  useWindowDimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import { KContainer } from "../../components";
import { TextFont } from "../../constants/themes";
import BackButton from "../../components/BackButton";
import ImgPromptScreen from "../../components/ImgPromptScreen";
import InfoContainer from "../../components/InfoContainer";
import { useEffect, useState } from "react";

const StoryDetailsScreen = ({ navigation, route }) => {
  const { name, images, data, lastViewed } = route.params;

  const { width } = useWindowDimensions();

  const [listViewData, setListViewData] = useState([]);

  useEffect(() => {
    setListViewData(data.slice(0, lastViewed));
  }, []);

  return (
    <KContainer>
      <BackButton navigation={navigation} />
      <Text
        numberOfLines={1}
        ellipsizeMode={"middle"}
        style={[TextFont.Text, styles.title]}
      >
        {name}
      </Text>
      <InfoContainer
        text={
          data.length === listViewData.length
            ? "All the generated scenes"
            : lastViewed === 0
              ? "Proceed to the VR and start your journey"
              : "Your viewed scenes"
        }
      />
      <FlatList
        data={listViewData}
        renderItem={({ item, index }) => (
          <ImgPromptScreen item={item} image={images} index={index} />
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        snapToInterval={width}
      />
      <TouchableOpacity
        onPress={() => {
          Alert.alert(
            "Spoilers alert!",
            "You've not reached the progress in the audio of all the scenes, proceed on your own.",
            [
              {
                text: "Proceed",
                onPress: () => setListViewData(data),
                style: "destructive",
              },
              {
                text: "Cancel",
                onPress: () => {},
                style: "cancel",
              },
            ],
          );
        }}
        style={styles.regenerateBtn}
      >
        <Text style={[TextFont.Text, styles.regenerateBtnTxt]}>
          See all generated frames
        </Text>
      </TouchableOpacity>
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
  subTitle: {
    fontSize: 24,
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
  regenerateBtn: {
    backgroundColor: "#ff8b60",
    width: "80%",
    height: "8%",
    marginTop: 15,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  regenerateBtnTxt: {
    color: "#6E6E6E",
    fontSize: 20,
  },
});

export default StoryDetailsScreen;
