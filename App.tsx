import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Provider, useSelector, useDispatch } from "react-redux";
import store from "./src/redux/store"; // Correct path
import { addNote, editNote, deleteNote } from "./src/redux/notesSlice";

const NotesApp = () => {
  const [text, setText] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const tasks = useSelector((state) => state.notes?.tasks || []); // Avoid undefined error
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (text.trim() === "") return;
    if (editIndex !== null) {
      dispatch(editNote({ index: editIndex, text }));
      setEditIndex(null);
    } else {
      dispatch(addNote(text));
    }
    setText("");
  };

  const handleEdit = (index) => {
    setText(tasks[index]);
    setEditIndex(index);
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={text}
        onChangeText={setText}
        style={styles.input}
        placeholder="Add Notes"
      />
      <TouchableOpacity onPress={handleAdd} style={styles.button}>
        <Text style={styles.buttonText}>
          {editIndex !== null ? "Update Note" : "Add Note"}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskText}>{item}</Text>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => handleEdit(index)}>
                <Text style={styles.edit}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => dispatch(deleteNote(index))}>
                <Text style={styles.delete}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const App = () => (
  <Provider store={store}>
    <NotesApp />
  </Provider>
);

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  button: {
    backgroundColor: "blue",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: { color: "white", fontWeight: "bold" },
  taskItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
  },
  taskText: { flex: 1 },
  actions: { flexDirection: "row", gap: 10 },
  edit: { color: "green" },
  delete: { color: "red" },
});

export default App;
