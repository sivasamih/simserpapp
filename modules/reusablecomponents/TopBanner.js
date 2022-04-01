import * as React from 'react';
import { Image } from 'react-native';
import { Banner } from 'react-native-paper';

const TopBanner = ({visible,onPress,message}) => {

  return (
    <Banner
      visible={visible}
      actions={[
        {
          label: 'Hide',
          onPress: () => onPress(),
        }
      ]}
      >
      {message}
    </Banner>
  );
};

export default TopBanner;