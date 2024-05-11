
import {
  query,
  where,
  subscribe,
  onSnapshot
} from "firebase/firestore";
import { deleteData } from '../firebase/data'
import handleAddData from "./handleAddData";


// Function to delete a document by title field
const DeleteData = async (id) => {
  const [dataList, setDataList] = useState([]);

useEffect(() => {
  // Subscribe to changes in the Firestore collection
  const unsubscribe = subscribe(({ change }) => {
    if (change.type === 'removed') {
      // Handle the case when a document is deleted
      const deletedId = change.doc.id;
      setDataList(prevDataList => prevDataList.filter(item => item.id !== deletedId));
    }
  });

  // Fetch initial data
  const fetchData = async () => {
    const data = await getData();
    setDataList(data);
  };
  fetchData();

  // Clean up subscription
  return () => unsubscribe();
}, []);


  try {
    await deleteData(id);
    // Remove the deleted item from the local state
    setDataList(prevDataList => prevDataList.filter(item => item.id !== id));
  } catch (error) {
    console.error('Error deleting data:', error);
  }

return (
    <View>
      {dataList.map(item => (
        <View key={item.id}>
          <Text>{item.title}</Text>
          <Button title="Delete" onPress={() => handleDelete(item.id)} />
        </View>
      ))}
    </View>
  );
}
export default DeleteData;