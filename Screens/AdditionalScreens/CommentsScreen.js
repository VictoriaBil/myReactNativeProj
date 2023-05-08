import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { Header } from "../../components/Header/Header";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { format } from "date-fns";

const selectUserProfile = (state) => state.auth;

const CommentsScreen = ({ route }) => {
  const [onFocus, setOnFocus] = useState(false);
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const { userId, userAvatar } = useSelector(selectUserProfile);
  const { photoUrl, postId, navigateFrom } = route.params;

  useEffect(() => {
    getComments();
  }, []);

  const handleSubmit = async () => {
    await createComment();
    setComment("");
  };

  const createComment = async () => {
    const commentData = {
      userId: userId,
      comment: comment,
      date: Date.now(),
      userAvatar: userAvatar,
    };
    const postRef = doc(db, "posts", `${postId}`);
    const updatedComments = [...allComments, commentData]; // Обновляем массив комментариев
    await updateDoc(postRef, { comments: updatedComments }); // Передаем обновленный массив в функцию updateDoc()
    setAllComments(updatedComments);
  };

  const getComments = async () => {
    onSnapshot(doc(db, "posts", `${postId}`), (doc) => {
      setAllComments(doc.data().comments);
    });
  };

  return (
    <>
      <View style={styles.container}>
        <Header title="Коментарі" navigateFrom={navigateFrom} />
        <ScrollView>
          <View style={styles.comWrap}>
            <View style={{ marginBottom: 32 }}>
              <Image source={{ uri: photoUrl }} style={styles.photoWrap} />
            </View>
            {allComments.map((item) => {
              return (
                <View
                  key={item.date}
                  style={{
                    ...styles.comContainer,
                    flexDirection:
                      item.userId === userId ? "row" : "row-reverse",
                  }}
                >
                  <View style={styles.com}>
                    <Text style={{ fontSize: 13 }}>{item.comment}</Text>
                    <Text style={styles.dateText}>
                      {format(item.date, "PPpp")}
                    </Text>
                  </View>
                  <Image
                    source={{ uri: item.userAvatar }}
                    style={styles.commentAva}
                  />
                </View>
              );
            })}
          </View>
        </ScrollView>
        <View style={styles.inputWrap}>
          <TextInput
            placeholder="Коментувати..."
            onFocus={() => setOnFocus(true)}
            onEndEditing={() => setOnFocus(false)}
            value={comment}
            onChangeText={setComment}
            style={{
              ...styles.input,
              borderColor: onFocus ? "#FF6C00" : "#BDBDBD",
            }}
          />
          <TouchableOpacity style={styles.inputBtn} onPress={handleSubmit}>
            <AntDesign name="arrowup" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    height: "100%",
    display: "flex",
  },
  photoWrap: {
    height: 240,
    backgroundColor: "#F6F6F6",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  comWrap: {
    backgroundColor: "#FFF",
    paddingHorizontal: "4%",
    paddingVertical: "7%",
    display: "flex",
    marginBottom: 52,
  },
  comContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "nowrap",
    width: "100%",
  },
  com: {
    padding: 16,
    backgroundColor: "#F6F6F6",
    borderRadius: 6,
    marginBottom: 16,
    flexGrow: 1,
    maxWidth: "88%",
  },
  dateText: {
    fontSize: 10,
    color: "#BDBDBD",
    marginTop: 8,
    marginLeft: "auto",
  },
  commentAva: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#F6F6F6",
  },
  inputWrap: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    bottom: 0,
    paddingVertical: 16,
    backgroundColor: "#FFF",
    width: "100%",
  },
  input: {
    borderWidth: 1,
    fontSize: 16,
    fontWeight: "500",
    backgroundColor: "#F6F6F6",
    height: 50,
    borderRadius: 25,
    width: "92%",
    paddingLeft: 16,
    paddingRight: 51,
  },
  inputBtn: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    right: "7%",
    top: 24,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#FF6C00",
  },
});

export default CommentsScreen;
