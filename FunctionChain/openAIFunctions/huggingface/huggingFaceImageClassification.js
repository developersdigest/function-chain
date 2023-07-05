import { HfInference } from '@huggingface/inference';
import fetch from 'node-fetch';

export const execute = async (options) => {
  const { imageUrl } = options;
  const apiKey = process.env.HUGGING_FACE_API_KEY;

  if (!apiKey) {
    return 'API key not found in process environment variables. Please ensure to input your Hugging Face API access token in the .env file for this function to work.';
  }

  const hf = new HfInference(apiKey);

  try {
    const imageResponse = await fetch(imageUrl);
    const imageData = await imageResponse.buffer();

    const output = await hf.imageClassification({
      data: imageData,
      model: 'google/vit-base-patch16-224',
    });

    return JSON.stringify(output);
  } catch (error) {
    console.error('Error classifying image:', error);
    throw error;
  }
};

export const details = {
  name: 'huggingFaceImageClassification',
  description: 'Performs image classification using the Hugging Face Inference API.',
  parameters: {
    type: 'object',
    properties: {
      imageUrl: {
        type: 'string',
        description: 'The URL of the image to classify.',
      },
    },
  },
  example: 'Classify an image using the Google VIT model',
};
