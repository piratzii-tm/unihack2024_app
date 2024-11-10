import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { KContainer } from "../../components";
import { TextFont } from "../../constants/themes";
import StoryCard from "../../components/StoryCard";
import { useEffect, useState } from "react";
import { auth, db } from "../../backend/config";
import { onValue, ref } from "firebase/database";
import { collections } from "../../backend/database/constants";

export function HomeScreen({ navigation }) {
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});

  console.log(auth.currentUser.email);

  useEffect(() => {
    const usersRef = ref(db, collections.user);
    onValue(usersRef, (userSnap) => {
      if (userSnap.exists()) {
        let data = userSnap.val();
        data = data[auth.currentUser.uid];
        console.log(data.progress);
        setUser(data);

        const storiesRef = ref(db, collections.stories);
        onValue(storiesRef, (storiesSnap) => {
          const userStories = storiesSnap.val();

          const aux = Object.keys(userStories)?.map((el) => {
            if (data?.stories.includes(el)) {
              return userStories[el];
            }
          });
          const unique = aux.filter(
            (value, index, array) => array.indexOf(value) === index,
          );
          setStories(unique);
          setIsLoading(false);
        });
      }
    });
  }, [auth]);

  return (
    <KContainer>
      <Text style={[TextFont.Text, styles.title]}>My stories</Text>
      <View style={styles.storiesContainer}>
        {isLoading || stories?.length === 0 ? (
          <ActivityIndicator />
        ) : (
          stories?.map(
            (story, index) =>
              story && (
                <StoryCard
                  key={index}
                  story={story}
                  onPress={() =>
                    navigation.navigate("StoryDetails", {
                      name: story.title,
                      images: story?.frames?.map((frame) => {
                        return frame.thumbnail;
                      }),
                      data: story.frames,
                      lastViewed: Object.values(
                        Object.values(user.progress).filter(
                          (el) => Object.keys(el)[0] === story.id,
                        )[0],
                      )[0],
                    })
                  }
                />
              ),
          )
        )}
        {stories?.length === 0 ||
          (stories?.length === 1 && stories?.includes(undefined) && (
            <Text style={[TextFont.Text, { color: "gray" }]}>
              No stories yet
            </Text>
          ))}
      </View>
    </KContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    alignSelf: "flex-start",
    fontSize: 32,
    color: "#6E6E6E",
    marginTop: 35,
    marginLeft: 30,
  },
  storiesContainer: {
    width: "100%",
    marginTop: 35,
    alignItems: "center",
    gap: 10,
  },
});
