function BlacklistedProductsList({ products, onRemove }) {
  if (!products || products.length === 0)
    return <p>No products blacklisted yet.</p>;

  return (
    <ul className="blacklisted-products-list">
      {products.map((product) => (
        <BlacklistedProductItem
          key={product.key}
          product={product}
          onRemove={onRemove}
        />
      ))}
    </ul>
  );
}
