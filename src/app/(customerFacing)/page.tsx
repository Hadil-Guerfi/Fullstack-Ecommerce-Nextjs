import ProductCard, { ProductCardSkeleton } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { cache } from "@/lib/cache";
import db from "@/lib/db";
import { Product } from "@prisma/client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";

const getMostPopularProducts = cache(
  async () => {
    return await db.product.findMany({
      where: {
        isAvailableForPurchase: true,
      },
      orderBy: {
        orders: {
          _count: "desc",
        },
      },
      take: 6,
    });
  },
  ["/", "getMostPopularProducts"],
  { revalidate: 60 * 60 * 24 }
);

const getNewestProducts = cache(
  async () => {
    return await db.product.findMany({
      where: {
        isAvailableForPurchase: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 6,
    });
  },
  ["/", "getNewestProducts"],
  { revalidate: 60 * 60 * 24 }
);

function HomePage() {
  return (
    <main className="space-y-12">
      <ProductGridSection
        productsFetcher={getMostPopularProducts}
        title="Most Popular"
      />
      <ProductGridSection productsFetcher={getNewestProducts} title="Newest" />
    </main>
  );
}

export default HomePage;

type ProductsGridProps = {
  title: string;
  productsFetcher: () => Promise<Product[]>;
};

export function ProductGridSection({
  productsFetcher,
  title,
}: ProductsGridProps) {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <h2 className="text-3xl font-bold">{title}</h2>
        <Button asChild variant="outline">
          <Link href="/products" className="space-x-2">
            <span>View All</span>
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Suspense
          fallback={
            <>
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </>
          }>
          <ProductSuspense productsFetcher={productsFetcher} />
        </Suspense>
      </div>
    </div>
  );
}

async function ProductSuspense({
  productsFetcher,
}: {
  productsFetcher: () => Promise<Product[]>;
}) {
  return (await productsFetcher()).map((product) => {
    return <ProductCard key={product.id} {...product} />;
  });
}
