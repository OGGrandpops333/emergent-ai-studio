import React from 'react';
import { render } from '@testing-library/react-native';
import HomeScreen from '../screens/HomeScreen';
import FeaturesScreen from '../screens/FeaturesScreen';

// Minimal navigation mock
const mockNavigate = jest.fn();
const navigation = { navigate: mockNavigate };

describe('HomeScreen', () => {
  it('renders the hero title', () => {
    const { getByText } = render(<HomeScreen navigation={navigation} />);
    expect(getByText('Emergent AI Studio')).toBeTruthy();
  });

  it('renders the "What can I do?" section', () => {
    const { getByText } = render(<HomeScreen navigation={navigation} />);
    expect(getByText('What can I do?')).toBeTruthy();
  });

  it('renders all feature cards', () => {
    const { getByText } = render(<HomeScreen navigation={navigation} />);
    expect(getByText('AI Chat')).toBeTruthy();
    expect(getByText('Image Generation')).toBeTruthy();
    expect(getByText('Text Summarization')).toBeTruthy();
    expect(getByText('Smart Search')).toBeTruthy();
    expect(getByText('Translation')).toBeTruthy();
    expect(getByText('Knowledge Base')).toBeTruthy();
  });
});

describe('FeaturesScreen', () => {
  it('renders the Capabilities heading', () => {
    const { getByText } = render(<FeaturesScreen />);
    expect(getByText('Capabilities')).toBeTruthy();
  });

  it('renders all capability categories', () => {
    const { getByText } = render(<FeaturesScreen />);
    expect(getByText('Conversational AI')).toBeTruthy();
    expect(getByText('Content Creation')).toBeTruthy();
    expect(getByText('Knowledge & Research')).toBeTruthy();
    expect(getByText('Productivity')).toBeTruthy();
  });
});
