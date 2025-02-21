"use client";

import React, { useEffect } from "react";

import { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
  Button,
  Container,
  Stack,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  alpha,
  Menu,
  MenuItem,
  Divider,
  SwipeableDrawer,
} from "@mui/material";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  MenuIcon,
  X,
  ChevronRight,
  LogOut,
  Settings,
  UserCircle,
} from "lucide-react";
import { useCartStore } from "@/store/cart/cart";

const navItems = ["Home", "Contact", "About", "Sign Up"];

const cartItems = [
  {
    id: 1,
    name: "Product 1",
    price: 99.99,
    quantity: 1,
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Product 2",
    price: 149.99,
    quantity: 1,
    image: "/placeholder.svg",
  },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { getProductsFromCart, productsFromCart } = useCartStore();

  useEffect(() => {
    getProductsFromCart();
  }, []);

  const handleUserMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setMobileOpen(open);
  };

  const toggleCart = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setCartOpen(open);
  };
  

  return (
    <>
      <AppBar
        position="sticky"
        color="default"
        elevation={0}
        sx={{
          borderBottom: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: "space-between", px: { xs: 0 } }}>
            {/* Logo */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={toggleDrawer(true)}
                sx={{ mr: 2, display: { lg: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <Box
                component="img"
                src="/logo.png"
                alt="Fastcart Logo"
                sx={{
                  height: 40,
                  width: "auto",
                }}
              />
            </Box>

            {/* Navigation */}
            <Stack
              direction="row"
              spacing={4}
              sx={{
                display: { xs: "none", lg: "flex" },
              }}
            >
              {navItems.map((item) => (
                <Button
                  key={item}
                  sx={{
                    color: "text.primary",
                    "&:hover": {
                      bgcolor: "transparent",
                      color: "primary.main",
                    },
                  }}
                >
                  {item}
                </Button>
              ))}
            </Stack>

            {/* Search and Icons */}
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{ flexGrow: 0 }}
            >
              <Box
                sx={{
                  position: "relative",
                  borderRadius: "full",
                  bgcolor: (theme) => alpha(theme.palette.common.black, 0.04),
                  "&:hover": {
                    bgcolor: (theme) => alpha(theme.palette.common.black, 0.06),
                  },
                  width: { xs: "100%", sm: "auto" },
                  display: { xs: "none", md: "flex" },
                }}
              >
                <Box
                  sx={{
                    py: 0,
                    px: 2,
                    height: "100%",
                    position: "absolute",
                    pointerEvents: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Search size={20} />
                </Box>
                <InputBase
                  placeholder="What are you looking for?"
                  sx={{
                    color: "inherit",
                    pl: 6,
                    pr: 2,
                    py: 1,
                    width: "100%",
                    minWidth: { sm: 240 },
                    "& .MuiInputBase-input": {
                      fontSize: "0.875rem",
                    },
                  }}
                />
              </Box>

              <IconButton
                size="large"
                aria-label="show wishlist"
                color="inherit"
                sx={{ display: { xs: "none", sm: "inline-flex" } }}
              >
                <Heart size={24} />
              </IconButton>

              <IconButton
                size="large"
                aria-label="show cart items"
                color="inherit"
                onClick={toggleCart(true)}
              >
                <Badge
                  badgeContent={productsFromCart.length}
                  color="error"
                  sx={{
                    "& .MuiBadge-badge": {
                      fontSize: "0.75rem",
                      height: "20px",
                      minWidth: "20px",
                    },
                  }}
                >
                  <ShoppingCart size={24} />
                </Badge>
              </IconButton>

              <IconButton
                size="large"
                edge="end"
                aria-label="account"
                color="inherit"
                onClick={handleUserMenuOpen}
                sx={{ display: { xs: "none", sm: "inline-flex" } }}
              >
                <User size={24} />
              </IconButton>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Navigation Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: 280,
          },
        }}
      >
        <Box sx={{ p: 2, display: "flex", justifyContent: "space-between" }}>
          <Box>
            <IconButton
              size="large"
              edge="end"
              aria-label="account"
              color="inherit"
              onClick={handleUserMenuOpen}
            >
              <User size={24} />
            </IconButton>
            <IconButton size="large" aria-label="show wishlist" color="inherit">
              <Heart size={24} />
            </IconButton>
          </Box>
          <IconButton onClick={toggleDrawer(false)}>
            <X />
          </IconButton>
        </Box>
        <Divider />
        <List>
          {navItems.map((item) => (
            <ListItem key={item} disablePadding>
              <ListItemButton>
                <ListItemText primary={item} />
                <ChevronRight size={20} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Cart Drawer */}
      <SwipeableDrawer
        anchor="right"
        open={cartOpen}
        onClose={toggleCart(false)}
        onOpen={toggleCart(true)}
        sx={{
          "& .MuiDrawer-paper": {
            width: { xs: "100%", sm: 400 },
          },
        }}
      >
        <Box sx={{ p: 2, display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">
            Shopping Cart ({cartItems.length})
          </Typography>
          <IconButton onClick={toggleCart(false)}>
            <X />
          </IconButton>
        </Box>
        <Divider />
        <List sx={{ flexGrow: 1 }}>
          {cartItems.map((item) => (
            <ListItem key={item.id}>
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  gap: 2,
                  alignItems: "center",
                }}
              >
                <Box
                  component="img"
                  src={item.image}
                  alt={item.name}
                  sx={{ width: 80, height: 80, objectFit: "cover" }}
                />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle1">{item.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Quantity: {item.quantity}
                  </Typography>
                  <Typography variant="subtitle2" color="primary">
                    ${item.price}
                  </Typography>
                </Box>
              </Box>
            </ListItem>
          ))}
        </List>
        <Box sx={{ p: 2 }}>
          <Button variant="contained" fullWidth sx={{ mb: 1 }} color="primary">
            Checkout
          </Button>
          <Button variant="outlined" fullWidth onClick={toggleCart(false)}>
            Continue Shopping
          </Button>
        </Box>
      </SwipeableDrawer>

      {/* User Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleUserMenuClose}
        PaperProps={{
          sx: {
            mt: 1.5,
            minWidth: 180,
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleUserMenuClose}>
          <UserCircle size={20} />
          <Typography sx={{ ml: 2 }}>Profile</Typography>
        </MenuItem>
        <MenuItem onClick={handleUserMenuClose}>
          <Settings size={20} />
          <Typography sx={{ ml: 2 }}>Settings</Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleUserMenuClose}>
          <LogOut size={20} />
          <Typography sx={{ ml: 2 }}>Logout</Typography>
        </MenuItem>
      </Menu>
      <Box
        sx={{
          position: "relative",
          borderRadius: "full",
          bgcolor: (theme) => alpha(theme.palette.common.black, 0.04),
          "&:hover": {
            bgcolor: (theme) => alpha(theme.palette.common.black, 0.06),
          },
          width: { xs: "100%", sm: "auto" },
          display: { xs: "flex", md: "none" },
          mt: "20px",
        }}
      >
        <Box
          sx={{
            py: 0,
            px: 2,
            height: "100%",
            position: "absolute",
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Search size={20} />
        </Box>
        <InputBase
          placeholder="What are you looking for?"
          sx={{
            color: "inherit",
            pl: 6,
            pr: 2,
            py: 1,
            width: "100%",
            minWidth: { sm: 240 },
            "& .MuiInputBase-input": {
              fontSize: "0.875rem",
            },
          }}
        />
      </Box>
    </>
  );
}
