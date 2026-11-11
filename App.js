import React from 'react';
import { StatusBar } from 'expo-status-bar';
import HomeView from './src/views/HomeView';
import useConverterViewModel from './src/viewmodels/useConverterViewModel';

export default function App() {
  const converter = useConverterViewModel();

  return (
    <>
      <StatusBar style="light" />
      <HomeView {...converter} />
    </>
  );
}