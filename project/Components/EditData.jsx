import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Pressable, Button } from 'react-native'
import NewHeader from '../homeScreen/NewHeader'
import { updateDataByTitle } from '../firebase/data'
import Navbarr from '../homeScreen/Navbarr'

const EditData = () => {
  const [title, setTitle] = useState('');
  const [fieldName, setFieldName] = useState('');
  const [fieldValue, setFieldValue] = useState('');
  const [fieldsToUpdate, setFieldsToUpdate] = useState([]);

  const handleAddField = () => {
    if (fieldName && fieldValue) {
      setFieldsToUpdate([...fieldsToUpdate, { [fieldName]: fieldValue }]);
      setFieldName('');
      setFieldValue('');
    }
  };

  const handleUpdateData = () => {
    const updatedFields = {};
    fieldsToUpdate.forEach(field => {
      const key = Object.keys(field)[0];
      updatedFields[key] = field[key];
    });
    // console.log(title)
    updateDataByTitle(title, updatedFields);
  };

  return (
    <View style={styles.container}>
      <NewHeader />
      <Navbarr />

      <TextInput
        style={styles.input}
        placeholder="Enter document title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter field name"
        value={fieldName}
        onChangeText={setFieldName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter field value"
        value={fieldValue}
        onChangeText={setFieldValue}
      />
      <Pressable style={styles.button} onPress={handleAddField} >
        <Text>Save fields</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={handleUpdateData} >
        <Text>Update Data</Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    //  margin: 30,
    paddingTop: 20,
    //  paddingHorizontal: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    //justifyContent:'center'
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    marginHorizontal: 20, // Set bottom border radius
    marginVertical: 10
  },
  button: {
    margin: 10,
    backgroundColor: '#9ad1aa',
    padding: 10,
    width: "30%",
    alignItems: 'center',
    borderRadius: 20
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10
  }
});

export default EditData;
