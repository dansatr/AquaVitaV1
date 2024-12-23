// src/services/ModelService.js
import * as ImageManipulator from 'expo-image-manipulator';

class ModelService {
  constructor() {
    this.apiUrl = 'https://aquavita.up.railway.app/predict';
    this.isModelReady = false;
  }

  async loadModel() {
    // Since we're using a remote API, we just need to set ready state
    this.isModelReady = true;
    return true;
  }

  async preprocessImage(uri) {
    try {
      return await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 224, height: 224 } }],
        { format: 'jpeg' }
      );
    } catch (error) {
      console.error('Error preprocessing image:', error);
      throw error;
    }
  }

  async predict(imageUri) {
    try {
      const processedImage = await this.preprocessImage(imageUri);
      
      // Create FormData and append the image file
      const formData = new FormData();
      formData.append('file', {
        uri: processedImage.uri,
        type: 'image/jpeg',
        name: 'image.jpg'
      });

      // Make API request to your Railway deployment
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return {
        prediction: result.prediction,
        confidence: parseFloat(result.confidence.replace('%', '')) / 100
      };
    } catch (error) {
      console.error('Error making prediction:', error);
      throw error;
    }
  }
}

export default new ModelService();