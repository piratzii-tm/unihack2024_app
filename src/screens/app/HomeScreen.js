import {
  Text,
  Button,
  StyleSheet,
  ScrollView,
  View,
  Image,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { KContainer } from "../../components";
import { logout } from "../../backend";
import { initStory } from "../../backend/database/stories/initStory";
import { TextFont } from "../../constants/themes";
import StoryCard from "../../components/StoryCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { auth, db } from "../../backend/config";
import { ref, onValue } from "firebase/database";
import { collections } from "../../backend/database/constants";

const MOCK_STORIES = [
  {
    name: "Story 1",
    duration: 310,
    images: [
      {
        img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/91/55/17/wonder-view.jpg?w=1200&h=-1&s=1",
        prompt: "Prompt 1",
      },
      {
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6lmNLdU-R8Beffk8a9Bckdzs4p-vQ7atM0g&s",
        prompt: "Prompt 2",
      },
      {
        img: "https://b-cdn.springnest.com/media/img/1z/20200126-105905-largejpga6e0589.jpg?aspect_ratio=620%3A383&width=620",
        prompt: "Prompt 3",
      },
    ],
  },
  {
    name: "Story 2",
    duration: 900,
    images: [
      {
        img: "https://media-cdn.tripadvisor.com/media/photo-s/10/f2/a1/3c/blyde-river.jpg",
        prompt: "Prompt 1",
      },
      {
        img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/26/d8/c8/28/wonder-view-with-fog.jpg?w=900&h=500&s=1",
        prompt: "Prompt 2",
      },
      {
        img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/24/fe/c7/69/wonder-view-inn.jpg?w=700&h=-1&s=1",
        prompt: "Prompt 3",
      },
    ],
  },
  {
    name: "Story 3",
    duration: 5730,
    images: [
      {
        img: "https://wonder-view.hotels-rajasthan.com/data/Pics/OriginalPhoto/14127/1412791/1412791340/kota-rajasthan-pic-4.JPEG",
        prompt: "Prompt 1",
      },
      {
        img: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/a1/5c/8c/wonder-view-inn.jpg?w=700&h=-1&s=1",
        prompt: "Prompt 2",
      },
      {
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBzqskIeFfKoSCdj2lZn-Gpd9WI5rCTH5X7w&s",
        prompt: "Prompt 3",
      },
    ],
  },
];

export function HomeScreen({ navigation }) {
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const usersRef = ref(db, collections.user);
    onValue(usersRef, (userSnap) => {
      if (userSnap.exists()) {
        let data = userSnap.val();
        data = data[auth.currentUser.uid];

        const storiesRef = ref(db, collections.stories);
        onValue(storiesRef, (storiesSnap) => {
          const userStories = storiesSnap.val();

          const aux = Object.keys(userStories).map((el) => {
            if ((data.stories.includes(el), el, data.stories)) {
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
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          stories?.map((story, index) => (
            <StoryCard
              key={index}
              story={story}
              onPress={() =>
                navigation.navigate("StoryDetails", {
                  name: story.title,
                  images: story?.frames?.map((frame) => {
                    console.log("AICI");
                    console.log(frame.link);
                    return frame.link;
                  }),
                  data: story.frames,
                })
              }
            />
          ))
        )}
      </View>
      <Button
        title={"Scan scenes"}
        onPress={async () => {
          try {
            await initStory();
          } catch (err) {
            if (axios.isAxiosError(err)) {
              console.log(err.response);
            }
          }
        }}
      />
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
