import React from 'react';
import { BottomSheetBackdrop, BottomSheetBackdropProps } from '@gorhom/bottom-sheet';

interface CustomBackdropProps extends BottomSheetBackdropProps {
  opacity?: number;
}

const CustomBackdrop: React.FC<CustomBackdropProps> = ({ opacity = 0.5, ...props }) => {
  return (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
      opacity={opacity}
      pressBehavior="close"
    />
  );
};

export default CustomBackdrop;
