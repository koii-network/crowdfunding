import React from "react";
import { useFunding } from "components/funding";
// Chakra
import { Box, IconButton, Image, Stack } from "@chakra-ui/react";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";
import SwiperCore, { Thumbs, Navigation } from "swiper";
import { useSwiperRef } from "hooks";

// css
import "swiper/swiper.scss";
import "./funding.scss";
import { RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri";

// install Swiper components
SwiperCore.use([Thumbs, Navigation]);

export function FundingGallery() {
  // config
  const {
    state: { config }
  } = useFunding();
  const images = config?.images;

  /* Navigation */
  const [nextEl, nextElRef] = useSwiperRef();
  const [prevEl, prevElRef] = useSwiperRef();

  // store thumbs swiper instance
  const [thumbsSwiper, setThumbsSwiper] = React.useState<any>(null);

  let params = {
    slidesPerView: 1,
    grabCursor: true,
    slideToClickedSlide: true,
    spaceBetween: 5
  };

  if (!images) return null;
  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      maxW="100%"
      position="relative"
      minW="0"
      h={{ base: "auto", lg: "550px" }}
      overflow="hidden"
      spacing="20px"
      flexBasis="640px"
      order={{ base: "2", lg: "1" }}
    >
      <Box w="100%" rounded="24px" overflow="hidden">
        <Swiper {...params} thumbs={{ swiper: thumbsSwiper }}>
          {images?.map(({ src }) => (
            <SwiperSlide key={src}>
              <Image w="100%" h="100%" objectFit="cover" rounded="24px" src={src} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      <Box pos="relative" px="55px" py="2">
        <Swiper
          onSwiper={setThumbsSwiper}
          watchOverflow
          watchSlidesProgress
          direction="horizontal"
          spaceBetween={40}
          slidesPerView={6}
          navigation={{
            prevEl,
            nextEl
          }}
          breakpoints={{
            320: {
              slidesPerView: 3,
              spaceBetween: 10
            },

            480: {
              slidesPerView: 4,
              spaceBetween: 30
            },

            640: {
              slidesPerView: 6,
              spaceBetween: 20
            }
          }}
        >
          {images?.map(({ src }) => (
            <SwiperSlide className="thumb-slider--wrapper" key={src}>
              <Image rounded="12px" shadow="0px 2px 8px rgba(0, 0, 0, 0.16)" boxSize="60px" src={src} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div>
          <NavigationButton ref={prevElRef} icon={RiArrowLeftLine} />
          <NavigationButton ref={nextElRef} icon={RiArrowRightLine} isNext />
        </div>
      </Box>
    </Stack>
  );
}

interface NavigationButtonProps {
  icon: any;
  isNext?: boolean;
}

const NavigationButton = React.forwardRef<HTMLButtonElement, NavigationButtonProps>(({ icon: NavigationIcon, isNext = false, ...rest }, ref) => {
  return (
    <IconButton
      aria-label="navigation-button"
      ref={ref}
      icon={<NavigationIcon size="20px" />}
      size="sm"
      isRound
      _focus={{ outline: "none" }}
      _active={{ background: "gray.50" }}
      _hover={{ background: "white" }}
      _disabled={{ display: "none" }}
      background="white"
      variant="ghost"
      pos="absolute"
      top="50%"
      zIndex="10"
      sx={{
        left: isNext ? "auto" : "10px",
        right: isNext ? "10px" : "auto",
        transform: "translateY(-50%)"
      }}
      {...rest}
    />
  );
});
