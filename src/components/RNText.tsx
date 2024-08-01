import React, {ReactNode} from 'react';
import {Text, TextProps, StyleSheet} from 'react-native';

interface RNTextProps extends TextProps {
  children: ReactNode;
}

const RNText: React.FC<RNTextProps> = ({children, style, ...props}) => {
  return (
    <Text style={[styles.defaultText, style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  defaultText: {
    fontFamily: 'Open Sans',
    color: '#000000',
  },
});

export default RNText;
