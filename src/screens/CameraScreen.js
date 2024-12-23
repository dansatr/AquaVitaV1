import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Camera } from 'expo-camera';
import ModelService from '../services/ModelService';

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [modelReady, setModelReady] = useState(false);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
      
      try {
        await ModelService.loadModel();
        setModelReady(true);
      } catch (error) {
        console.error('Error loading model:', error);
      }
    })();
  }, []);

  const takePicture = async () => {
    if (!modelReady) {
      alert('Model is still loading. Please wait.');
      return;
    }

    if (cameraRef.current) {
      try {
        setIsProcessing(true);
        setPrediction(null);
        
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.5,
          skipProcessing: true,
        });
        const result = await ModelService.predict(photo.uri);
        setPrediction(result);
      } catch (error) {
        console.error('Error:', error);
        alert('Error analyzing water. Please try again.');
      } finally {
        setIsProcessing(false);
      }
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#1E88E5" />
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Camera access denied</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera 
        style={styles.camera} 
        ref={cameraRef}
      >
        <View style={styles.overlay}>
          {!modelReady && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#ffffff" />
              <Text style={styles.loadingText}>Loading model...</Text>
            </View>
          )}

          {prediction && (
            <View style={styles.resultContainer}>
              <Text style={styles.resultText}>
                Water Quality: {prediction.prediction}
              </Text>
              <Text style={styles.confidenceText}>
                Confidence: {(prediction.confidence * 100).toFixed(2)}%
              </Text>
            </View>
          )}

          <TouchableOpacity
            style={[
              styles.captureButton,
              (!modelReady || isProcessing) && styles.disabledButton
            ]}
            onPress={takePicture}
            disabled={!modelReady || isProcessing}
          >
            <Text style={styles.captureText}>
              {isProcessing ? 'Analyzing...' : 'Analyze Water'}
            </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    padding: 20,
  },
  loadingContainer: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  loadingText: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
  },
  resultContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  resultText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  confidenceText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 5,
  },
  captureButton: {
    backgroundColor: '#1E88E5',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  disabledButton: {
    backgroundColor: '#90CAF9',
  },
  captureText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default CameraScreen;