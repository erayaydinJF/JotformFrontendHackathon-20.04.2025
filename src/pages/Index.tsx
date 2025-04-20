import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/services/api";
import { Button } from "@/components/ui/button";
import { CartProvider } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import { ArrowRight, ShoppingBag, TruckIcon, CreditCard, LifeBuoy } from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const featuredProducts = products.slice(0, 4);

  const handleViewProduct = (product: any) => {
    navigate(`/product/${product.id}`);
  };

  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen">
        <Header onOpenCart={() => {}} />
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-shop-light via-white to-shop-light">
          <div className="container mx-auto px-4 py-16 md:py-28">
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-1 bg-shop-primary/10 text-shop-primary rounded-full text-sm font-medium mb-4">
                Premium Shopping Experience
              </span>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-shop-primary to-shop-secondary bg-clip-text text-transparent leading-tight">
                Discover Amazing Products at ShopVista
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                Your one-stop destination for high-quality products at unbeatable prices.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  onClick={() => navigate('/products')}
                  className="bg-shop-primary hover:bg-shop-secondary text-white px-8 py-6 text-lg rounded-full transition-transform hover:scale-105"
                >
                  Browse Products <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => navigate('/products')}
                  className="border-shop-primary text-shop-primary hover:bg-shop-primary/10 px-8 py-6 text-lg rounded-full"
                >
                  Today's Deals
                </Button>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 to-transparent"></div>
        </section>

        {/* Features */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex flex-col items-center text-center p-6 rounded-xl bg-shop-light/30 hover:bg-shop-light transition-colors duration-300">
                <ShoppingBag className="h-10 w-10 text-shop-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">Quality Products</h3>
                <p className="text-gray-600">Handpicked items that meet our high standards</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-xl bg-shop-light/30 hover:bg-shop-light transition-colors duration-300">
                <TruckIcon className="h-10 w-10 text-shop-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">Fast Delivery</h3>
                <p className="text-gray-600">Quick shipping to get your items to you promptly</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-xl bg-shop-light/30 hover:bg-shop-light transition-colors duration-300">
                <CreditCard className="h-10 w-10 text-shop-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">Secure Payment</h3>
                <p className="text-gray-600">Safe transactions with multiple payment options</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-xl bg-shop-light/30 hover:bg-shop-light transition-colors duration-300">
                <LifeBuoy className="h-10 w-10 text-shop-primary mb-4" />
                <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
                <p className="text-gray-600">Our team is always ready to assist you</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1 bg-shop-primary/10 text-shop-primary rounded-full text-sm font-medium mb-4">
                Our Selection
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Featured Products</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore our most popular items handpicked for quality and value.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {isLoading ? (
                Array(4).fill(0).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 aspect-square rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))
              ) : (
                featuredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onViewDetails={handleViewProduct}
                  />
                ))
              )}
            </div>
            <div className="text-center mt-12">
              <Button
                onClick={() => navigate('/products')}
                className="bg-shop-primary hover:bg-shop-secondary text-white px-6 py-2 rounded-full"
              >
                View All Products <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-shop-primary/10 to-shop-secondary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Start Shopping?</h2>
              <p className="text-lg text-gray-600 mb-8">
                Explore our collection and find the perfect items for your needs.
              </p>
              <Button 
                onClick={() => navigate('/products')}
                className="bg-shop-primary hover:bg-shop-secondary text-white px-8 py-6 text-lg rounded-full transition-transform hover:scale-105"
              >
                Shop Now <ShoppingBag className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-100 py-8 mt-auto">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-lg mb-4">ShopVista</h3>
                <p className="text-gray-600">Your premium shopping destination with the best products at competitive prices.</p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><Link to="/" className="text-gray-600 hover:text-shop-primary transition-colors">Home</Link></li>
                  <li><Link to="/products" className="text-gray-600 hover:text-shop-primary transition-colors">Products</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4">Contact</h3>
                <p className="text-gray-600">Email: support@shopvista.com</p>
                <p className="text-gray-600">Phone: +1 (555) 123-4567</p>
              </div>
            </div>
            <div className="border-t pt-6 text-center text-sm text-gray-600">
              <p>© 2025 ShopVista. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </CartProvider>
  );
};

export default HomePage;

const Link = ({ to, children, className = "" }) => {
  const navigate = useNavigate();
  return (
    <a 
      href={to} 
      className={className}
      onClick={(e) => {
        e.preventDefault();
        navigate(to);
      }}
    >
      {children}
    </a>
  );
};