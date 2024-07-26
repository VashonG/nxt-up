import classNames from 'classnames';
import type {
  Dispatch,
  FC,
  ReactElement,
  RefObject,
  SetStateAction,
} from 'react';
import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import type Slider from 'react-slick';
import Carousel from 'react-slick';
import type { Picture } from '@shared/api/interfaces';
import { makeImageUrl, showDefaultImage } from '@shared/lib/helpers';
import styles from './ImageSlider.module.scss';
import { NotFoundImages, DotsWrapper, NextArrow, PrevArrow, Dot } from './ui';
import 'slick-carousel/slick/slick.scss';
import './override.scss';

interface ImageSliderProps {
  images: Picture[];
  currentSlide?: number;
  setCurrentSlide?: Dispatch<SetStateAction<number>>;
  content?: ReactElement;
  extraClassName?: string;
  isShadow?: boolean;
  sliderRef?: RefObject<Slider>;
}

export const ImageSlider: FC<ImageSliderProps> = ({
  images,
  currentSlide = null,
  setCurrentSlide = null,
  content,
  extraClassName = null,
  isShadow,
  sliderRef,
}) => {
  const [current, setCurrent] = useSliderState(currentSlide, setCurrentSlide);
  const [isLoading, setIsLoading] = useState(true);

  const cn = classNames(styles.item, extraClassName);
  const cnWrapper = classNames(
    styles.slider,
    isShadow ? 'isShadow' : 'smallArrowWrappers',
    'slider'
  );

  if (!Array.isArray(images) || images.length === 0) {
    return (
      <NotFoundImages
        cnWrapper={cnWrapper}
        extraClassName={extraClassName}
        content={content}
      />
    );
  }

  const handleStartLoading = () => {
    setIsLoading(true);
  };

  const handleFinishLoading = () => {
    setIsLoading(false);
  };

  const isFirstImage = current === 0;
  const isLastImage = current === images.length - 1;

  return (
    <div className={cnWrapper}>
      <Carousel
        ref={sliderRef}
        speed={100}
        dots={true}
        arrows={true}
        infinite={false}
        lazyLoad="ondemand"
        onLazyLoad={handleStartLoading}
        prevArrow={isFirstImage ? <></> : <PrevArrow />}
        nextArrow={isLastImage ? <></> : <NextArrow />}
        beforeChange={(prev, next: number) => setCurrent(next)}
        customPaging={(i) => <Dot isActive={i === current} />}
        appendDots={(dots) => <DotsWrapper>{dots}</DotsWrapper>}
        className={styles.carousel}
      >
        {images.map((image) => {
          return (
            <div key={image.id}>
              <img
                src={makeImageUrl(image.name)}
                alt="imagesSlider"
                onError={showDefaultImage}
                onLoad={handleFinishLoading}
                className={cn}
              ></img>
              {isLoading && <Skeleton key={image.id} className={cn} />}
              {content}
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

function useSliderState(
  currentSlide: number | null,
  setCurrentSlide: Dispatch<SetStateAction<number>> | null
): [number, Dispatch<SetStateAction<number>>] {
  const [current, setCurrent] = useState<number>(0);

  if (currentSlide !== null && setCurrentSlide !== null) {
    return [currentSlide, setCurrentSlide];
  }

  return [current, setCurrent];
}
