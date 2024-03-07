import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Dimensions, View, StyleSheet, Text, Image } from 'react-native';

const CustomCarousel = ({ data }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef: any = useRef(null);

  const autoRotate = () => {
    const nextIndex = (currentIndex + 1) % data.length;

    if (nextIndex >= 0 && nextIndex < data.length) {
      const nextItemOffset = (Dimensions.get('window').width + 40) * nextIndex;
      flatListRef?.current?.scrollToOffset({
        animated: true,
        offset: nextItemOffset,
      });
      setCurrentIndex(nextIndex);
    } else {
      setCurrentIndex(0);
    }
  };

  useEffect(() => {
    const interval = setInterval(autoRotate, 4000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const renderItems = ({ item }: any) => (
    <View style={styles.carouselItem}>
      <Image
        source={item.image}
        style={{
          height: Dimensions.get('window').width / 2,
          width: Dimensions.get('window').width,

          alignSelf: 'center',
          resizeMode: 'stretch',


        }}

        resizeMethod='resize'


      />
      {/* Add additional content as needed */}
    </View>
  );

  return (
    <FlatList
      ref={flatListRef}
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItems}
      contentContainerStyle={styles.flatListContainer}
      horizontal
      showsHorizontalScrollIndicator={false}
      pagingEnabled={true}
      snapToInterval={Dimensions.get('window').width + 10}
      decelerationRate="fast"
      style={{
        alignContent: 'center',
        alignSelf: 'center',
      }}
    />
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    
  },
  carouselItem: {

    display: 'flex',
    flex: 1,
    width: Dimensions.get('window').width,
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    // Customize item styling as needed
  },
});

export default CustomCarousel;