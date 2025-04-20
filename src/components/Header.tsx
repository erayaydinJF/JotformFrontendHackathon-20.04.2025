import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Search, Menu, X, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  onOpenCart: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenCart }) => {
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full backdrop-blur-sm bg-background/95 border-b shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="mr-2 md:hidden"
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
          <Link to="/" className="flex items-center gap-2">
            <ShoppingBag className="h-6 w-6 text-shop-primary" />
            <span className="text-2xl font-bold bg-gradient-to-r from-shop-primary to-shop-secondary bg-clip-text text-transparent">ShopVista</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-foreground hover:text-shop-primary transition-colors font-medium">
            Home
          </Link>
          <Link to="/products" className="text-foreground hover:text-shop-primary transition-colors font-medium">
            Products
          </Link>
        </div>

        <div className="flex items-center space-x-3">
          <form onSubmit={handleSearchSubmit} className="hidden md:flex relative">
            <input
              type="text"
              placeholder="Search products..."
              className="pl-3 pr-10 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-shop-primary/30 focus:border-shop-primary w-48 lg:w-64 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full rounded-full"
              aria-label="Search"
            >
              <Search size={18} className="text-muted-foreground" />
            </Button>
          </form>

          <Button
            onClick={onOpenCart}
            variant="outline"
            size="icon"
            className="relative rounded-full bg-shop-light hover:bg-shop-primary/10 border-shop-primary/20"
            aria-label="Shopping cart"
          >
            <ShoppingCart size={20} className="text-shop-primary" />
            {totalItems > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-shop-primary h-5 w-5 flex items-center justify-center rounded-full p-0 text-xs">
                {totalItems}
              </Badge>
            )}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-b animate-fade-in shadow-md">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                className="text-foreground hover:text-shop-primary transition-colors py-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-foreground hover:text-shop-primary transition-colors py-2 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
            </div>
            <form onSubmit={handleSearchSubmit} className="flex relative">
              <input
                type="text"
                placeholder="Search products..."
                className="pl-3 pr-10 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-shop-primary/30 focus:border-shop-primary w-full text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full rounded-full"
                aria-label="Search"
              >
                <Search size={18} className="text-muted-foreground" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;