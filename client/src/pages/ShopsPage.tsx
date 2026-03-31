import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { type Shop } from '../types';
import { useCart } from '../CartContext';
import './ShopsPage.css';

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name-asc';
type RatingRange = 'all' | '4-5' | '3-4' | '2-3';

const SORT_LABELS: Record<SortOption, string> = {
  'default':    'Default',
  'price-asc':  'Price: Low → High',
  'price-desc': 'Price: High → Low',
  'name-asc':   'Name: A → Z',
};

const RATING_LABELS: Record<RatingRange, string> = {
  'all': 'All Ratings',
  '4-5': '⭐ 4.0 – 5.0',
  '3-4': '⭐ 3.0 – 4.0',
  '2-3': '⭐ 2.0 – 3.0',
};

const RATING_RANGES: Record<RatingRange, [number, number] | null> = {
  'all': null,
  '4-5': [4.0, 5.0],
  '3-4': [3.0, 4.0],
  '2-3': [2.0, 3.0],
};

const ShopsPage: React.FC = () => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const [ratingFilter, setRatingFilter] = useState<RatingRange>('all');
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [ratingDropdownOpen, setRatingDropdownOpen] = useState(false);
  const categoryRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);
  const ratingRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/shops');
        setShops(response.data);
        if (response.data.length > 0) {
          setSelectedShop(response.data[0]);
        }
      } catch (error) {
        console.error("Помилка при завантаженні магазинів:", error);
      }
    };
    fetchShops();
  }, []);

  // Close all dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (categoryRef.current && !categoryRef.current.contains(e.target as Node)) {
        setCategoryDropdownOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortDropdownOpen(false);
      }
      if (ratingRef.current && !ratingRef.current.contains(e.target as Node)) {
        setRatingDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const closeAllDropdowns = () => {
    setCategoryDropdownOpen(false);
    setSortDropdownOpen(false);
    setRatingDropdownOpen(false);
  };

  const handleShopSelect = (shop: Shop) => {
    setSelectedShop(shop);
    setSelectedCategories([]);
    setSortOption('default');
    closeAllDropdowns();
  };

  // Filter shops list by rating range
  const visibleShops = shops.filter(shop => {
    const range = RATING_RANGES[ratingFilter];
    if (!range) return true;
    return shop.rating >= range[0] && shop.rating <= range[1];
  });

  // If selected shop is filtered out — deselect it
  const effectiveSelectedShop =
    visibleShops.find(s => s._id === selectedShop?._id) ?? null;

  const categories: string[] = effectiveSelectedShop
    ? [...new Set(effectiveSelectedShop.products.map(p => p.category))]
    : [];

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const getFilteredAndSorted = () => {
    if (!effectiveSelectedShop) return [];

    let products = [...effectiveSelectedShop.products];

    if (selectedCategories.length > 0) {
      products = products.filter(p => selectedCategories.includes(p.category));
    }

    switch (sortOption) {
      case 'price-asc':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        products.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return products;
  };

  const filteredProducts = getFilteredAndSorted();

  const categoryLabel =
    selectedCategories.length === 0
      ? 'All Categories'
      : selectedCategories.length === 1
      ? selectedCategories[0]
      : `${selectedCategories.length} categories`;

  const renderStars = (rating: number) => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    return (
      <span className="shop-stars">
        {'★'.repeat(full)}
        {half ? '½' : ''}
        <span className="shop-rating-value">{rating.toFixed(1)}</span>
      </span>
    );
  };

  return (
    <div className="shops-container">
      <aside className="sidebar">
        <h3 className="sidebar-title">Shops:</h3>

        {/* Rating filter inside sidebar */}
        <div className="rating-filter-wrapper" ref={ratingRef}>
          <button
            className={`dropdown-trigger rating-trigger ${ratingDropdownOpen ? 'open' : ''} ${ratingFilter !== 'all' ? 'active-filter' : ''}`}
            onClick={() => {
              setRatingDropdownOpen(prev => !prev);
              setCategoryDropdownOpen(false);
              setSortDropdownOpen(false);
            }}
          >
            <span>{RATING_LABELS[ratingFilter]}</span>
            <svg
              className={`dropdown-arrow ${ratingDropdownOpen ? 'rotated' : ''}`}
              width="16" height="16" viewBox="0 0 16 16" fill="none"
            >
              <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {ratingDropdownOpen && (
            <div className="dropdown-menu rating-menu">
              {(Object.keys(RATING_LABELS) as RatingRange[]).map(range => (
                <button
                  key={range}
                  className={`dropdown-item sort-item ${ratingFilter === range ? 'selected' : ''}`}
                  onClick={() => {
                    setRatingFilter(range);
                    setRatingDropdownOpen(false);
                    // If current shop would be hidden, deselect
                    const bounds = RATING_RANGES[range];
                    if (bounds && selectedShop) {
                      if (selectedShop.rating < bounds[0] || selectedShop.rating > bounds[1]) {
                        setSelectedShop(null);
                        setSelectedCategories([]);
                      }
                    }
                  }}
                >
                  {RATING_LABELS[range]}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="shops-list">
          {visibleShops.length > 0 ? (
            visibleShops.map(shop => (
              <button
                key={shop._id}
                onClick={() => handleShopSelect(shop)}
                className={`shop-button ${effectiveSelectedShop?._id === shop._id ? 'active' : ''}`}
              >
                <span>{shop.name}</span>
                {renderStars(shop.rating)}
              </button>
            ))
          ) : (
            <p className="no-shops-msg">No shops in this range</p>
          )}
        </div>
      </aside>

      <section className="product-section">
        {effectiveSelectedShop && (
          <div className="filter-bar">

            {/* Category filter */}
            <div className="category-dropdown" ref={categoryRef}>
              <button
                className={`dropdown-trigger ${categoryDropdownOpen ? 'open' : ''}`}
                onClick={() => {
                  setCategoryDropdownOpen(prev => !prev);
                  setSortDropdownOpen(false);
                  setRatingDropdownOpen(false);
                }}
              >
                <span>{categoryLabel}</span>
                <svg
                  className={`dropdown-arrow ${categoryDropdownOpen ? 'rotated' : ''}`}
                  width="16" height="16" viewBox="0 0 16 16" fill="none"
                >
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {categoryDropdownOpen && (
                <div className="dropdown-menu">
                  {categories.map(category => (
                    <label key={category} className="dropdown-item">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                      />
                      <span>{category}</span>
                    </label>
                  ))}
                  {selectedCategories.length > 0 && (
                    <button
                      className="clear-filters"
                      onClick={() => setSelectedCategories([])}
                    >
                      Clear all
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Sort dropdown */}
            <div className="category-dropdown" ref={sortRef}>
              <button
                className={`dropdown-trigger ${sortDropdownOpen ? 'open' : ''} ${sortOption !== 'default' ? 'active-filter' : ''}`}
                onClick={() => {
                  setSortDropdownOpen(prev => !prev);
                  setCategoryDropdownOpen(false);
                  setRatingDropdownOpen(false);
                }}
              >
                <span>{SORT_LABELS[sortOption]}</span>
                <svg
                  className={`dropdown-arrow ${sortDropdownOpen ? 'rotated' : ''}`}
                  width="16" height="16" viewBox="0 0 16 16" fill="none"
                >
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {sortDropdownOpen && (
                <div className="dropdown-menu">
                  {(Object.keys(SORT_LABELS) as SortOption[]).map(option => (
                    <button
                      key={option}
                      className={`dropdown-item sort-item ${sortOption === option ? 'selected' : ''}`}
                      onClick={() => {
                        setSortOption(option);
                        setSortDropdownOpen(false);
                      }}
                    >
                      {SORT_LABELS[option]}
                    </button>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

        <div className="product-grid">
          {effectiveSelectedShop ? (
            filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <div key={product._id} className="product-card">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />
                  <div className="product-info">
                    <span className="product-category">{product.category}</span>
                    <h4 className="product-name">{product.name}</h4>
                    <p className="product-price">Price: ${product.price}</p>
                    <button
                      className="add-to-cart-btn"
                      onClick={() => addToCart(product)}
                    >
                      add to Cart
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-selection">
                <p>No products in selected categories</p>
              </div>
            )
          ) : (
            <div className="no-selection">
              <p>Select a shop to see products</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ShopsPage;