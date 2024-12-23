import tensorflow as tf
import tensorflowjs as tfjs

# Load the TFLite model
interpreter = tf.lite.Interpreter(model_path="assets\model\water_quality_model.tflite")
interpreter.allocate_tensors()

# Convert to a TF model
converter = tf.lite.TFLiteConverter.from_file("assets\model\water_quality_model.tflite")
tf_model = converter.convert()

# Save as TensorFlow.js format
tfjs.converters.save_keras_model(tf_model, "tfjs_model")