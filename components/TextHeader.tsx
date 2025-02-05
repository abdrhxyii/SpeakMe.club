import { Text } from 'react-native';
import React from 'react';
import Common from '@/constants/Common';

export default function TextHeader({ header, subheader }: any) {
  return (
    <>
      <Text style={Common.header}>{header}</Text>
      <Text style={Common.subHeader}>{subheader}</Text>
    </> 
  );
}