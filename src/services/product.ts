import { supabase } from "./supabase";
import type { Product } from "../types/Product";

const formatProductImage = (product: any): Product => {
  const images = Array.isArray(product.images)
    ? product.images
        .map((img: any) => {
          if (typeof img === "string") return img;
          return img.path || img.content || img.url || "";
        })
        .filter(Boolean)
    : [];

  let colors: string[] = product.colors || [];
  let sizes: string[] = product.sizes || [];

  // Handle old structure if needed, but Supabase schema should match Product type now
  if (product.options && Array.isArray(product.options)) {
    product.options.forEach((opt: any) => {
      if (opt.title === "Cor" || opt.type === "color") {
        colors = opt.values.split(",");
      }
      if (opt.title === "Tamanho") {
        sizes = opt.values.split(",");
      }
    });
  }

  return {
    ...product,
    images: images.length > 0 ? images : ["/images/products/placeholder.png"],
    priceDiscount: product.price_discount ?? product.priceDiscount,
    category: product.category || "Geral",
    colors,
    sizes,
    technicalSpecs: product.technical_specs || product.technicalSpecs || {},
  };
};

export const getProducts = async (): Promise<Product[]> => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Erro ao buscar produtos no Supabase:", error);
      throw error;
    }

    if (data) {
      const formatted = data.map(formatProductImage);
      // Cache locally just in case, or remove if we want strict online mode
      localStorage.setItem("products_db", JSON.stringify(formatted));
      return formatted;
    }
  } catch (error) {
    console.warn("Supabase indisponível, tentando cache local:", error);
  }

  // Fallback to local storage
  const localProducts = localStorage.getItem("products_db");
  if (localProducts) {
    const parsed = JSON.parse(localProducts);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  }
  return [];
};

export const saveProduct = async (product: Product) => {
  const slug =
    product.slug ||
    product.name
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

  const dbPayload = {
    name: product.name,
    slug,
    category: product.category,
    brand: product.brand,
    price: product.price,
    price_discount: product.priceDiscount,
    rating: product.rating,
    images: product.images,
    description: product.description,
    gender: product.gender,
    state: product.state,
    colors: product.colors,
    sizes: product.sizes,
    technical_specs: product.technicalSpecs,
  };

  try {
    if (product.id && typeof product.id === 'number') {
      // Update
      const { data, error } = await supabase
        .from("products")
        .update(dbPayload)
        .eq("id", product.id)
        .select()
        .single();

      if (error) throw error;
      return formatProductImage(data);
    } else {
      // Insert
      const { data, error } = await supabase
        .from("products")
        .insert(dbPayload)
        .select()
        .single();

      if (error) throw error;
      return formatProductImage(data);
    }
  } catch (error) {
    console.error("Erro ao salvar produto no Supabase:", error);
    // Fallback to local
    return saveProductLocal(product);
  }
};

export const deleteProduct = async (id: string | number) => {
  try {
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) throw error;
  } catch (error) {
    console.error("Erro ao deletar produto no Supabase:", error);
    deleteProductLocal(id);
  }
};

export const saveProductLocal = (product: Product) => {
  const products = JSON.parse(localStorage.getItem("products_db") || "[]");
  const index = products.findIndex(
    (p: Product) => String(p.id) === String(product.id),
  );

  if (index >= 0) {
    products[index] = product;
  } else {
    if (!product.id) product.id = Date.now();
    products.push(product);
  }

  localStorage.setItem("products_db", JSON.stringify(products));
  return product;
};

export const deleteProductLocal = (id: string | number) => {
  const products = JSON.parse(localStorage.getItem("products_db") || "[]");
  const filtered = products.filter((p: Product) => String(p.id) !== String(id));
  localStorage.setItem("products_db", JSON.stringify(filtered));
};

export const getProductById = async (
  id: string | number,
): Promise<Product | undefined> => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    if (data) return formatProductImage(data);
  } catch (error) {
    console.warn(`Erro ao buscar produto ${id} no Supabase, tentando cache.`);
  }

  const products = await getProducts();
  return products.find((p) => String(p.id) === String(id));
};
