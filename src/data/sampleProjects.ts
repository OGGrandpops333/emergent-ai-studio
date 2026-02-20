import { Project } from '../types/Project';

/**
 * Sample AI projects used to seed the app on first launch.
 */
export const SAMPLE_PROJECTS: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    name: 'Sentiment Analyzer',
    description:
      'NLP model that classifies customer reviews as positive, negative, or neutral with 94% accuracy.',
    status: 'completed',
    tags: ['NLP', 'sentiment', 'classification'],
  },
  {
    name: 'Image Recognition Pipeline',
    description:
      'Convolutional neural network for identifying objects in product photos for an e-commerce platform.',
    status: 'archived',
    tags: ['CNN', 'computer-vision', 'e-commerce'],
  },
  {
    name: 'Recommendation Engine',
    description:
      'Collaborative filtering system that suggests AI tools based on user interaction history.',
    status: 'completed',
    tags: ['recommendations', 'collaborative-filtering', 'personalization'],
  },
  {
    name: 'Anomaly Detector',
    description:
      'Unsupervised model for detecting unusual patterns in system metrics to pre-empt outages.',
    status: 'archived',
    tags: ['anomaly-detection', 'unsupervised', 'monitoring'],
  },
  {
    name: 'Chatbot Prototype',
    description:
      'Rule-based chatbot extended with a fine-tuned language model for handling customer support queries.',
    status: 'archived',
    tags: ['chatbot', 'LLM', 'customer-support'],
  },
  {
    name: 'Demand Forecaster',
    description:
      'Time-series model predicting inventory demand for the next 30 days with MAPE under 8%.',
    status: 'completed',
    tags: ['forecasting', 'time-series', 'inventory'],
  },
];
