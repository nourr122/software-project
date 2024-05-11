import { addData } from '../firebase/data';

 const handleAddData = async (title, price, quantity, image, category, setCategory,setImage,setPrice,setQuantity, setTitle) => {
    
    if (!title.trim() || !price.trim()) {
      alert('Please enter title and price');
      return;
    }
   
    const priceNumber = parseFloat(price);
    const quantityNumber = parseFloat(quantity);


   // Check if price is a valid number
    if (isNaN(priceNumber) && isNaN(quantityNumber)) {
      alert('Please enter a valid number');
      return;
    }
    const newData = {
      title: title.trim(),
      price: priceNumber,
      image: image,
      quantity: quantityNumber,
      category: category
    };

    try {
      await addData(newData);
      alert('Data added successfully');
      // Reset input fields after successful addition
      setTitle('');
      setPrice('');
      setCategory('');
      setImage('');
      setQuantity('');
    } catch (error) {
      console.error('Error adding data:', error);
      alert('An error occurred while adding data. Please try again.');
    }
  };
  export default handleAddData;