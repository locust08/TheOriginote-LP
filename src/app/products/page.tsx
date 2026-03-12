import { ProductsPageContent } from "@/components/products-page-content";

type ProductsRouteProps = {
  searchParams: Promise<{
    query?: string;
  }>;
};

export default async function ProductsPage({ searchParams }: ProductsRouteProps) {
  const resolvedSearchParams = await searchParams;
  const initialQuery = resolvedSearchParams.query ?? "";

  return <ProductsPageContent initialQuery={initialQuery} />;
}
