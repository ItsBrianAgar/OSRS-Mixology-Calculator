import { useState, useCallback, useEffect, useRef } from "react";
import { useProductContext } from "../context/ProductContext";

export default function usePreferredProducts() {
  const { preferredProducts, setPreferredProducts, blacklistedProducts } =
    useProductContext();
  const [message, setMessage] = useState(null);
  const messageTimeoutRef = useRef(null);
  const removalActionRef = useRef({
    active: false,
    startCount: 0,
    currentCount: 0,
  });
  const removalTimeoutRef = useRef(null);

  const clearMessage = useCallback(() => {
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
    }
    messageTimeoutRef.current = setTimeout(() => {
      setMessage(null);
    }, 5000);
  }, []);

  const addProduct = useCallback(
    (product) => {
      if (blacklistedProducts.some((p) => p.key === product.key)) {
        setMessage({
          text: `${product.name} is already in the blacklist and cannot be preferred.`,
          type: "error",
        });
        clearMessage();
        return;
      }

      setPreferredProducts((prev) => {
        if (prev.some((p) => p.key === product.key)) {
          setMessage({
            text: `${product.name} is already in the preferred list.`,
            type: "error",
          });
          clearMessage();
          return prev;
        }

        setMessage({
          text: `${product.name} added to preferred list.`,
          type: "success",
        });
        clearMessage();
        return [...prev, product];
      });
    },
    [clearMessage, blacklistedProducts, setPreferredProducts]
  );

  const removeProduct = useCallback(
    (productKey) => {
      setPreferredProducts((prev) => {
        const newList = prev.filter((p) => p.key !== productKey);

        if (!removalActionRef.current.active) {
          removalActionRef.current = {
            active: true,
            startCount: prev.length,
            currentCount: newList.length,
          };
        } else {
          removalActionRef.current.currentCount = newList.length;
        }

        const itemsRemoved =
          removalActionRef.current.startCount -
          removalActionRef.current.currentCount;

        setMessage({
          text: `${itemsRemoved} item${
            itemsRemoved !== 1 ? "s" : ""
          } removed from your preferred list`,
          type: "success",
        });
        clearMessage();

        if (removalTimeoutRef.current) {
          clearTimeout(removalTimeoutRef.current);
        }

        removalTimeoutRef.current = setTimeout(() => {
          removalActionRef.current = {
            active: false,
            startCount: 0,
            currentCount: 0,
          };
        }, 5000);

        return newList;
      });
    },
    [clearMessage, setPreferredProducts]
  );

  useEffect(() => {
    return () => {
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
      if (removalTimeoutRef.current) {
        clearTimeout(removalTimeoutRef.current);
      }
    };
  }, []);

  return { preferredProducts, addProduct, removeProduct, message };
}
