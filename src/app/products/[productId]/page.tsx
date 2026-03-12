import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailPage } from "@/components/product-detail-page";
import {
  getProductById,
  getRecommendedProducts,
  productCatalog,
} from "@/lib/product-catalog";

type ProductDetailRouteProps = {
  params: Promise<{
    productId: string;
  }>;
};

export function generateStaticParams() {
  return productCatalog.map((product) => ({
    productId: product.id,
  }));
}

export async function generateMetadata({
  params,
}: ProductDetailRouteProps): Promise<Metadata> {
  const { productId } = await params;
  const product = getProductById(productId);

  if (!product) {
    return {
      title: "Product Not Found | The Originote",
    };
  }

  return {
    title: `${product.name} | The Originote`,
    description: product.overview,
  };
}

export default async function ProductDetailRoute({
  params,
}: ProductDetailRouteProps) {
  const { productId } = await params;
  const product = getProductById(productId);

  if (!product) {
    notFound();
  }

  return (
    <ProductDetailPage
      product={product}
      relatedProducts={getRecommendedProducts(product.id)}
    />
  );
}
