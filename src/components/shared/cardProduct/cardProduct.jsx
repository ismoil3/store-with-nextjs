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
import { Favorite, FavoriteBorder, Visibility } from "@mui/icons-material";
import { api } from "@/config/config";
import Image from "next/image";

export default function ProductCard({ product }) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const discountPercentage = product.hasDiscount
    ? Math.round(
        ((product.price - product.discountPrice) / product.price) * 100
      )
    : 0;

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
      }}
    >
      {product.hasDiscount && (
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
          image={`${api}/images/${product.image}`}
          alt={product.productName}
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
          }}
        >
          add to cart
        </Button>
      </Box>
      <CardContent sx={{ flexGrow: 1, pt: 2 }}>
        <Typography
          gutterBottom
          variant="h6"
          component="h2"
          sx={{ fontWeight: 500 }}
        >
          {product.productName}
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
          <Typography variant="h6" color="error.main" sx={{ fontWeight: 600 }}>
            ${product.hasDiscount ? product.discountPrice : product.price}
          </Typography>
          {product.hasDiscount && (
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textDecoration: "line-through" }}
            >
              ${product.price}
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
