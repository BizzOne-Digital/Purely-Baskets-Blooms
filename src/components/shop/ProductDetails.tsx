"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ShoppingBag } from "lucide-react";
import type { SerializedProduct } from "@/lib/storefront";
import { PriceDisplay } from "@/components/shop/PriceDisplay";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { createCartItemFromProduct, useCartStore } from "@/store/cart-store";
import { useCartDrawer } from "@/components/layout/cart-drawer-context";
import { getEffectiveUnitPrice } from "@/lib/utils";
import Link from "next/link";

interface ProductDetailsProps {
  product: SerializedProduct;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const addItem = useCartStore((s) => s.addItem);
  const { openCart } = useCartDrawer();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product.sizeOptions[0]?.label ?? "");
  const [sizeModifier, setSizeModifier] = useState(product.sizeOptions[0]?.priceModifier ?? 0);
  const [selectedColor, setSelectedColor] = useState(
    product.colorPaletteOptions[0]?.name ?? ""
  );
  const [giftMessage, setGiftMessage] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");

  const handleSizeChange = (label: string) => {
    setSelectedSize(label);
    const size = product.sizeOptions.find((s) => s.label === label);
    setSizeModifier(size?.priceModifier ?? 0);
  };

  const handleAddToCart = () => {
    const unitPrice = getEffectiveUnitPrice(
      product.basePrice,
      product.salePrice,
      product.saleStartDate,
      product.saleEndDate
    );

    const item = createCartItemFromProduct(product, {
      quantity,
      selectedSize: selectedSize || undefined,
      sizePriceModifier: sizeModifier,
      selectedColor: selectedColor || undefined,
      giftMessage: giftMessage || undefined,
      recipientName: recipientName || undefined,
      preferredDeliveryDate: deliveryDate || undefined,
    });

    if (!item) {
      toast.error("Please contact us for pricing");
      return;
    }

    addItem({ ...item, unitPrice: unitPrice ?? item.unitPrice });
    toast.success(`${product.name} added to cart`);
    openCart();
  };

  const isQuote = product.priceType === "quote";
  const isOutOfStock = product.availability === "out_of_stock";

  return (
    <div className="space-y-6">
      <div>
        <PriceDisplay
          priceType={product.priceType}
          basePrice={product.basePrice}
          salePrice={product.salePrice}
          compareAtPrice={product.compareAtPrice}
          saleStartDate={product.saleStartDate}
          saleEndDate={product.saleEndDate}
          size="lg"
        />
        {product.leadTime ? (
          <p className="mt-2 text-sm text-cream/55">Lead time: {product.leadTime}</p>
        ) : null}
      </div>

      <p className="leading-relaxed text-cream/75">{product.shortDescription}</p>

      {product.sizeOptions.length > 0 ? (
        <Select
          label="Size"
          value={selectedSize}
          onChange={(e) => handleSizeChange(e.target.value)}
          options={product.sizeOptions.map((s) => ({
            value: s.label,
            label: s.priceModifier
              ? `${s.label} (+$${s.priceModifier})`
              : s.label,
          }))}
        />
      ) : null}

      {product.colorPaletteOptions.length > 0 ? (
        <Select
          label="Colour Palette"
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
          options={product.colorPaletteOptions.map((c) => ({
            value: c.name,
            label: c.name,
          }))}
        />
      ) : null}

      {!isQuote && !isOutOfStock ? (
        <div className="flex items-center gap-4">
          <label className="text-xs uppercase tracking-widest text-cream/70">Qty</label>
          <input
            type="number"
            min={1}
            max={99}
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 1)}
            className="w-20 rounded-xl border border-gold/25 bg-carbon px-3 py-2 text-center text-sm text-cream"
          />
        </div>
      ) : null}

      <Input
        label="Recipient Name (optional)"
        value={recipientName}
        onChange={(e) => setRecipientName(e.target.value)}
      />
      <Input
        label="Preferred Delivery Date"
        type="date"
        value={deliveryDate}
        onChange={(e) => setDeliveryDate(e.target.value)}
      />
      <Textarea
        label="Gift Message (optional)"
        value={giftMessage}
        onChange={(e) => setGiftMessage(e.target.value)}
        rows={3}
      />

      <div className="flex flex-col gap-3 sm:flex-row">
        {!isQuote && !isOutOfStock ? (
          <Button onClick={handleAddToCart} className="flex-1">
            <ShoppingBag className="h-4 w-4" />
            Add to Cart
          </Button>
        ) : isQuote ? (
          <Link href="/booking" className="flex-1">
            <Button className="w-full">Request a Quote</Button>
          </Link>
        ) : null}
        <Link href="/contact" className="flex-1">
          <Button variant="outline" className="w-full">
            Ask a Question
          </Button>
        </Link>
      </div>

      {product.careInstructions ? (
        <div className="rounded-sm border border-gold/20 bg-carbon/60 p-4">
          <h3 className="text-xs uppercase tracking-widest text-gold-light">Care Instructions</h3>
          <p className="mt-2 text-sm text-cream/70">{product.careInstructions}</p>
        </div>
      ) : null}
    </div>
  );
}
