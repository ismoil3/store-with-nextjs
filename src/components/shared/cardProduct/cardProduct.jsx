"use client";

import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Button,
  Rating,
  Stack,
  Badge,
} from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { api } from "@/config/config";
import { useCartStore } from "@/store/cart/cart";
import { useHomeStore } from "@/store/home/home";

export default function ProductCard({ product }) {
  const { addProductToCart } = useCartStore();
  const [product1, setProduct1] = useState(product);
  const discountPercentage = product1.hasDiscount
    ? Math.round(
        ((product1.price - product1.discountPrice) / product1.price) * 100
      )
    : 0;

  const handleAddProductToCart = () => {
    addProductToCart(product1.id);
    setProduct1((prevState) => ({ ...prevState, productInMyCart: true }));
  };
  return (
    <Card
      sx={{
        height: "100%",
        maxWidth: "300px",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        "&:hover button": {
          display: "block",
        },
        marginBottom: "10px",
      }}
    >
      {product1.hasDiscount && (
        <Badge
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
            bgcolor: "error.main",
            color: "white",
            py: 0.5,
            px: 1,
            borderRadius: 1,
          }}
        >
          -{discountPercentage}%
        </Badge>
      )}

      <Box sx={{ position: "absolute", top: 16, right: 16 }}>
        <Stack spacing={1}>
          <IconButton
            sx={{
              bgcolor: "background.paper",
              "&:hover": { bgcolor: "red" },
            }}
          >
            <Visibility />
          </IconButton>
        </Stack>
      </Box>

      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          image={`${api}/images/${product1.image}`}
          alt={product1.productName}
          sx={{
            pt: 2,
            objectFit: "contain",
            height: 200,
          }}
        />
        <Button
          sx={{
            bgcolor: "black",
            display: "none",
            color: "white",
            width: "100%",
            position: "absolute",
            bottom: 0,
            "&.Mui-disabled": {
              bgcolor: "grey.900",
              color: "white",
              opacity: 0.7,
              cursor: "not-allowed",
            },
          }}
          onClick={(e) => {
            handleAddProductToCart();
            e.stopPropagation();
          }}
          disabled={product1.productInMyCart}
        >
          {product1.productInMyCart ? "В корзине" : "Добавить в корзину"}
        </Button>
      </Box>
      <CardContent sx={{ flexGrow: 1, pt: 2 }}>
        <Typography
          gutterBottom
          variant="h6"
          component="h2"
          sx={{ fontWeight: 500 }}
        >
          {product1.productName}
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
          <Typography variant="h6" color="error.main" sx={{ fontWeight: 600 }}>
            ${product1.hasDiscount ? product1.discountPrice : product1.price}
          </Typography>
          {product1.hasDiscount && (
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textDecoration: "line-through" }}
            >
              ${product1.price}
            </Typography>
          )}
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
          <Rating
            value={4}
            readOnly
            size="small"
            sx={{
              "& .MuiRating-iconFilled": {
                color: "error.main",
              },
            }}
          />
          <Typography variant="body2" color="text.secondary">
            ({88})
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
