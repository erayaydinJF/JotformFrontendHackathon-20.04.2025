import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const { addToCart } = useCart();
  const { name, price, image, description, category } = product;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Card 
      className="overflow-hidden group hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col h-full border-transparent hover:border-shop-primary/20" 
      onClick={() => onViewDetails(product)}
    >
      <div className="relative aspect-square overflow-hidden bg-shop-light/30">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              // Fallback if the image fails to load
              (e.target as HTMLImageElement).src = '/placeholder.svg';
            }}
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
            No image
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center">
          <Button 
            variant="secondary" 
            size="sm" 
            className="mb-4 backdrop-blur-sm bg-white/70 text-shop-dark hover:bg-white"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(product);
            }}
          >
            <Eye className="mr-2 h-4 w-4" /> Quick View
          </Button>
        </div>
        {category && (
          <Badge className="absolute top-2 left-2 bg-shop-primary/90 hover:bg-shop-primary text-white">
            {category}
          </Badge>
        )}
      </div>
      <CardContent className="pt-4 pb-2 flex-grow">
        <h3 className="font-semibold text-lg truncate group-hover:text-shop-primary transition-colors">{name}</h3>
        <p className="text-muted-foreground text-sm line-clamp-2 mt-1 mb-2 h-10">
          {description || "No description available"}
        </p>
        <div className="text-shop-primary font-bold text-lg">${price.toFixed(2)}</div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button 
          className="w-full bg-shop-primary hover:bg-shop-secondary text-white transition-all duration-300 group-hover:shadow-md"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;