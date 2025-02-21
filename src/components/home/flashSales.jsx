"use client"

import { useState, useEffect, useRef } from "react"
import { Box, Typography, Button, Container, IconButton, Rating, Stack, useTheme, useMediaQuery } from "@mui/material"
import { Heart, Eye, ChevronLeft, ChevronRight } from "lucide-react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import ProductCard from "../shared/cardProduct/cardProduct"
import { useHomeStore } from "@/store/home/home"





export default function FlashSales() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const isTablet = useMediaQuery(theme.breakpoints.down("md"))
  const sliderRef = useRef(null)
  const [isBeginning, setIsBeginning] = useState(true)
  const [isEnd, setIsEnd] = useState(false)
  const {getProducts,products} = useHomeStore()

  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 23,
    minutes: 19,
    seconds: 56,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newSeconds = prev.seconds - 1
        if (newSeconds >= 0) return { ...prev, seconds: newSeconds }

        const newMinutes = prev.minutes - 1
        if (newMinutes >= 0) return { ...prev, minutes: newMinutes, seconds: 59 }

        const newHours = prev.hours - 1
        if (newHours >= 0) return { ...prev, hours: newHours, minutes: 59, seconds: 59 }

        const newDays = prev.days - 1
        if (newDays >= 0) return { days: newDays, hours: 23, minutes: 59, seconds: 59 }

        clearInterval(timer)
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(()=>{
    getProducts()
  },[])

  const settings = {
    dots: isMobile,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: theme.breakpoints.values.lg,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: theme.breakpoints.values.md,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: {
          slidesToShow: 1,
          dots: true,
          centerMode: true,
          centerPadding: "40px",
        },
      },
    ],
    beforeChange: (current, next) => {
      setIsBeginning(next === 0)
      setIsEnd(next + (isMobile ? 1 : isTablet ? 2 : 4) >= products.length)
    },
  }

  const TimeBox = ({ value, label }) => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mx: { xs: 0.5, sm: 1 },
      }}
    >
      <Typography
        variant={isMobile ? "body1" : "h5"}
        sx={{
          fontWeight: 600,
          px: { xs: 1, sm: 2 },
          py: { xs: 0.5, sm: 1 },
          borderRadius: 1,
          minWidth: { xs: 36, sm: 48 },
          textAlign: "center",
        }}
      >
        {value.toString().padStart(2, "0")}
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: { xs: "none", sm: "block" } }}>
        {label}
      </Typography>
    </Box>
  )

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 4 } }}>
      <Box sx={{ mb: { xs: 2, sm: 4 } }}>
        <Typography
          component="span"
          sx={{
            color: "error.main",
            bgcolor: "error.light",
            px: 2,
            py: 0.5,
            borderRadius: 1,
            fontSize: { xs: "0.75rem", sm: "0.875rem" },
            fontWeight: 500,
          }}
        >
          Today's
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            mt: 2,
            gap: { xs: 2, sm: 0 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "flex-start", sm: "center" },
              gap: { xs: 2, sm: 4 },
            }}
          >
            <Typography variant={isMobile ? "h5" : "h4"} sx={{ fontWeight: 600 }}>
              Flash Sales
            </Typography>
            <Stack
              direction="row"
              spacing={0.5}
              alignItems="center"
              sx={{
                p: { xs: 2, sm: 0 },
                borderRadius: 1,
                width: { xs: "100%", sm: "auto" },
              }}
            >
              <TimeBox value={timeLeft.days} label="Days" />
              <Typography variant={isMobile ? "body1" : "h5"} sx={{ mt: { xs: 1, sm: 0 },bgcolor:"transparent" }}>
                :
              </Typography>
              <TimeBox value={timeLeft.hours} label="Hours" />
              <Typography variant={isMobile ? "body1" : "h5"} sx={{ mt: { xs: 1, sm: 0 },bgcolor:"transparent" }}>
                :
              </Typography>
              <TimeBox value={timeLeft.minutes} label="Minutes" />
              <Typography variant={isMobile ? "body1" : "h5"} sx={{ mt: { xs: 1, sm: 0 },bgcolor:"transparent" }}>
                :
              </Typography>
              <TimeBox value={timeLeft.seconds} label="Seconds" />
            </Stack>
          </Box>

          {!isMobile && (
            <Box>
              <IconButton
                onClick={() => sliderRef.current?.slickPrev()}
                disabled={isBeginning}
                sx={{
                  bgcolor: "grey.100",
                  mr: 1,
                  "&.Mui-disabled": {
                    bgcolor: "grey.100",
                    opacity: 0.5,
                  },
                }}
              >
                <ChevronLeft />
              </IconButton>
              <IconButton
                onClick={() => sliderRef.current?.slickNext()}
                disabled={isEnd}
                sx={{
                  bgcolor: "grey.100",
                  "&.Mui-disabled": {
                    bgcolor: "grey.100",
                    opacity: 0.5,
                  },
                }}
              >
                <ChevronRight />
              </IconButton>
            </Box>
          )}
        </Box>
      </Box>

      <Box
        sx={{
          mx: { xs: -2, sm: 0 },
          ".slick-dots": {
            bottom: -40,
          },
          ".slick-dots li button:before": {
            fontSize: 8,
          },
          ".slick-dots li.slick-active button:before": {
            color: "error.main",
          },
        }}
      >
        <Slider ref={sliderRef} {...settings}>
          {products.map((product) => (
           <ProductCard key={product.id} product={product} />
          ))}
        </Slider>
      </Box>

      <Box sx={{ textAlign: "center", mt: { xs: 6, sm: 4 } }}>
        <Button
          variant="contained"
          sx={{
            bgcolor: "error.main",
            "&:hover": {
              bgcolor: "error.dark",
            },
            px: { xs: 4, sm: 6 },
          }}
        >
          View All Products
        </Button>
      </Box>
    </Container>
  )
}

