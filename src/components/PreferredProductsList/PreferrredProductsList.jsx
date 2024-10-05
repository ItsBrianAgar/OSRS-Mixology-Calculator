function PreferredProductsList({ products, onRemove }) {
  if (!products || products.length === 0) {
    return <p>No preferred products yet.</p>;
  }

  return (
    <ul className="preferred-products-list">
      {products.map((product) => (
        <PreferredProductItem
          key={product.key}
          product={product}
          onRemove={onRemove}
        />
      ))}
    </ul>
  );
}
