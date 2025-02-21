"use client";

import { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { ArrowRight, ChevronRight, ArrowBack, ArrowForward } from "@mui/icons-material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useHomeStore } from "@/store/home/home";
import Container from "../shared/container/container";

/** Кастомная кнопка "следующий слайд" для react-slick */
function NextArrow(props) {
  const { onClick } = props;
  return (
    <Box
      onClick={onClick}
      sx={{
        position: "absolute",
        top: "50%",
        right: 10,
        transform: "translateY(-50%)",
        cursor: "pointer",
        zIndex: 3,
        color: "white",
        "&:hover": { color: "error.main" },
      }}
    >
      <ArrowForward fontSize="large" />
    </Box>
  );
}

/** Кастомная кнопка "предыдущий слайд" для react-slick */
function PrevArrow(props) {
  const { onClick } = props;
  return (
    <Box
      onClick={onClick}
      sx={{
        position: "absolute",
        top: "50%",
        left: 10,
        transform: "translateY(-50%)",
        cursor: "pointer",
        zIndex: 3,
        color: "white",
        "&:hover": { color: "error.main" },
      }}
    >
      <ArrowBack fontSize="large" />
    </Box>
  );
}

/** Пример анимации (fadeInUp) через keyframes */
const fadeInUp = {
  "@keyframes fadeInUp": {
    "0%": {
      opacity: 0,
      transform: "translateY(20px)",
    },
    "100%": {
      opacity: 1,
      transform: "translateY(0)",
    },
  },
};

const slides = [
  {
    id: 1,
    logo: "https://cdn.prod.website-files.com/65cafeae0d62d9e4163d1545/66b89d242c6bdb11673aaabd_66b89b13e63e989b8dfce2fa_transparent%2520apple%2520logo.webp",
    title: "iPhone 14 Series",
    subtitle: "Up to 10% off Voucher",
    image: "/iphone-14-model-unselect-gallery-2-202209_processed.jpg",
    buttonText: "Shop Now",
  },
  {
    id: 2,
    logo: "https://cdn.prod.website-files.com/65cafeae0d62d9e4163d1545/66b89d242c6bdb11673aaabd_66b89b13e63e989b8dfce2fa_transparent%2520apple%2520logo.webp",
    title: "iPhone 14 Pro",
    subtitle: "Up to 15% off Voucher",
    image: "/apple.jpg",
    buttonText: "Shop Now",
  },
  // Add more slides as needed
];

export default function HomePage() {
  const { getCategories, categories } = useHomeStore();
  const [activeCategory, setActiveCategory] = useState(null);
  const [sidebarHeight, setSidebarHeight] = useState(undefined);
  const sliderRef = useRef(null);

  // Получаем список категорий из стора
  useEffect(() => {
    getCategories();
  }, [getCategories]);

  // Рассчитываем высоту слайдера, чтобы "подгонять" высоту блока категорий на больших экранах
  useEffect(() => {
    const updateSidebarHeight = () => {
      if (sliderRef.current) {
        setSidebarHeight(sliderRef.current.clientHeight);
      }
    };
    updateSidebarHeight();
    window.addEventListener("resize", updateSidebarHeight);
    return () => {
      window.removeEventListener("resize", updateSidebarHeight);
    };
  }, []);

  // Настройки слайдера
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    // Включаем кастомные стрелки
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    // Точки (dots) стилизуем через customPaging
    customPaging: () => (
      <Box
        sx={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          backgroundColor: "grey.500",
          "&.slick-active": {
            backgroundColor: "error.main",
          },
        }}
      />
    ),
  };

  return (
    <Container>
      <Grid sx={{marginTop:"10px"}} container spacing={4}>
        {/* ======== Блок с категориями ======== */}
        <Grid item xs={12} md={3} lg={2}>
          <Box
            sx={{
              borderRadius: 1,
              overflow: "hidden",
              // На маленьких экранах высота "auto", на больших — равна высоте слайдера
              height: { xs: "auto", md: sidebarHeight },
              display: "flex",
              flexDirection: { xs: "row", md: "column" },
            }}
          >
            <List
              sx={{
                // Горизонтальная прокрутка на маленьких экранах, вертикальная на больших
                display: { xs: "flex", md: "block" },
                flexDirection: { xs: "row", md: "column" },
                overflowX: { xs: "auto", md: "none" },
                whiteSpace: "nowrap", // чтобы элементы не переносились
                py: 0,
                flexGrow: 1,
                // Стили для скроллбара (при необходимости)
                "&::-webkit-scrollbar": {
                  height: { xs: "0em", md: 0 },
                  width: { xs: 0, md: "0em" },
                },
                "&::-webkit-scrollbar-track": {
                  boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "rgba(0,0,0,.1)",
                  outline: "1px solid slategrey",
                },
              }}
            >
              {categories.map((category) => (
                <ListItem
                  key={category.id * 948}
                  sx={{
                    py: { xs: 1, md: 1.5 },
                    px: { xs: 2, md: 2 },
                    mr: { xs: 2, md: 0 },
                    borderColor: "divider",
                    borderRadius: { xs: 4, md: 0 }, // "пилюли" на маленьких экранах
                    "&:hover": {
                      bgcolor: "ButtonFace",
                      cursor: "pointer",
                    },
                    // При желании можно подсвечивать активную категорию по-другому
                    ...(activeCategory === category.categoryName && {
                      bgcolor: "action.selected",
                    }),
                  }}
                  onClick={() => setActiveCategory(category.categoryName)}
                >
                  <ListItemText
                    primary={category.categoryName}
                    sx={{
                      "& .MuiListItemText-primary": {
                        fontSize: "0.9rem",
                      },
                    }}
                  />
                  {/* Иконка подменю (ChevronRight) — только на больших экранах */}
                  {category.hasSubmenu && (
                    <ListItemIcon
                      sx={{
                        minWidth: "auto",
                        display: { xs: "none", md: "block" },
                      }}
                    >
                      <ChevronRight />
                    </ListItemIcon>
                  )}
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>

        {/* ======== Слайдер ======== */}
        <Grid item xs={12} md={9} lg={10}>
          <Box
            ref={sliderRef}
            sx={{
              // Градиентный фон + оверлей
              position: "relative",
              background: "linear-gradient(135deg, #4280d1 0%, #6ea0f5 100%)",
              color: "white",
              borderRadius: 1,
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                inset: 0,
                // backgroundColor: "rgba(0, 0, 0, 0.3)", // Полупрозрачный оверлей
                zIndex: 1,
              },
              ".slick-dots": {
                bottom: 16,
                "li button:before": {
                  display: "none",
                },
              },
            }}
          >
            <Slider  {...sliderSettings}>
              {slides.map((slide) => (
                <Box sx={{paddingLeft:"50px"}} key={slide.id}>
                  <Container maxWidth="xl">
                    <Box
                      sx={{
                        // За счёт position "relative" + zIndex:2 текст будет поверх оверлея
                        position: "relative",
                        height: { xs: 300, sm: 400, md: 500 },
                        display: "flex",
                        alignItems: "center",
                        zIndex: 2,
                        // Подключаем анимацию
                        ...fadeInUp,
                        animation: "fadeInUp 0.8s ease forwards",
                        animationDelay: "0.3s",
                      }}
                    >
                      {/* Левая часть с текстом */}
                      <Box sx={{ flex: 1 }}>
                        <Box
                          component="img"
                          src={slide.logo}
                          alt={`${slide.title} logo`}
                          sx={{
                            width: 50,
                            height: "auto",
                            mb: 2,
                            filter: "brightness(0) invert(1)",
                          }}
                        />
                        <Typography
                          variant="h3"
                          sx={{
                            fontWeight: 600,
                            mb: 1,
                            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                          }}
                        >
                          {slide.title}
                        </Typography>
                        <Typography
                          variant="h4"
                          sx={{
                            mb: 3,
                            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
                          }}
                        >
                          {slide.subtitle}
                        </Typography>
                        <Button
                          variant="text"
                          color="inherit"
                          endIcon={<ArrowRight />}
                          sx={{
                            borderBottom: "2px solid",
                            borderRadius: 0,
                            px: 0,
                            "&:hover": {
                              bgcolor: "transparent",
                              opacity: 0.8,
                            },
                          }}
                        >
                          {slide.buttonText}
                        </Button>
                      </Box>

                      {/* Правая часть с картинкой (скрыта на xs) */}
                      <Box
                        sx={{
                          position: "absolute",
                          right: 0,
                          top: "50%",
                          transform: "translateY(-50%)",
                          width: "50%",
                          height: "100%",
                          display: { xs: "none", md: "block" },
                        }}
                      >
                        <Box
                          component="img"
                          src={slide.image}
                          alt={slide.title}
                          sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                          }}
                        />
                      </Box>
                    </Box>
                  </Container>
                </Box>
              ))}
            </Slider>
          </Box>
        </Grid>
      </Grid>

</Container>
  );
}
