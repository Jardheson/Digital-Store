INSERT INTO public.users (id, name, email, password, role, status, provider, created_at)
VALUES
    ('admin-id-123', 'Administrador', 'admin@digitalstore.com', 'Admin@1234', 'Admin', 'Ativo', 'email', NOW())
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.categories (name, image)
VALUES
    ('Camisetas', '/images/icons/camiseta.svg'),
    ('Calças', '/images/icons/calca.svg'),
    ('Bonés', '/images/icons/bone-_2_.svg'),
    ('Headphones', '/images/icons/headphones.svg'),
    ('Tênis', '/images/icons/tenis.svg')
ON CONFLICT DO NOTHING;

INSERT INTO public.products (
    id, name, category, brand, price, price_discount, rating, images, description, gender, state, colors, sizes, created_at
)
VALUES
    (1, 'Converse All Star Chuck Taylor High', 'Tênis', 'Converse', 350, 289.9, 5, ARRAY['/images/products/product-thumb-4.jpeg'], 'O tênis mais icônico do mundo, Chuck Taylor All Star.', 'Unisex', 'Novo', ARRAY['#000000', '#FFFFFF', '#FF0000'], ARRAY['39', '40', '41'], NOW()),
    (2, 'Nike Dunk High Retro Multicolor', 'Tênis', 'Nike', 900, 799.9, 5, ARRAY['/images/products/product-thumb-3.jpeg'], 'Estilo vintage retorna às ruas com o Nike Dunk High.', 'Unisex', 'Novo', ARRAY['#FF0000', '#0000FF', '#FFFF00'], ARRAY['39', '40', '41'], NOW()),
    (3, 'Sapatênis Couro Casual', 'Tênis', 'Generic', 400, 299.9, 4, ARRAY['/images/products/product-thumb-2.jpeg'], 'Elegância e conforto para o dia a dia com acabamento em couro.', 'Masculino', 'Novo', ARRAY['#8B4513', '#000000'], ARRAY['39', '40', '41'], NOW()),
    (4, 'Nike Air Jordan High Green', 'Tênis', 'Nike', 1200, 899.9, 5, ARRAY['/images/products/product-thumb-1.jpeg'], 'Design icônico e conforto premium com o Air Jordan High.', 'Masculino', 'Novo', ARRAY['#4CAF50', '#000000', '#FFFFFF'], ARRAY['39', '40', '41'], NOW()),
    (5, 'Nike Air Max SC', 'Tênis', 'Nike', 600, 459.9, 4, ARRAY['/images/products/produc-image-5.jpeg'], 'Com suas linhas fáceis, visual de pista tradicional e amortecimento Air visível.', 'Feminino', 'Novo', ARRAY['#FFC0CB', '#FFFFFF', '#808080'], ARRAY['35', '36', '37'], NOW()),
    (9, 'Nike Air Force 1 07', 'Tênis', 'Nike', 600, 499.9, 5, ARRAY['/images/products/Layer 1aa 2.png'], 'O icônico Nike Air Force 1 em branco, combinação perfeita de estilo e conforto.', 'Unisex', 'Novo', ARRAY['#FFFFFF', '#000000'], ARRAY['38', '39', '40'], NOW())
ON CONFLICT (id) DO UPDATE 
SET 
    name = EXCLUDED.name,
    price = EXCLUDED.price,
    price_discount = EXCLUDED.price_discount,
    images = EXCLUDED.images;

SELECT setval('public.products_id_seq', (SELECT MAX(id) FROM public.products));

INSERT INTO public.orders (id, customer, date, total, status, items, created_at)
VALUES
    ('#12345', 'João da Silva', '04/02/2026', 499.90, 'Entregue', '[{"id": 1, "name": "Converse All Star", "price": 499.90, "quantity": 1}]'::jsonb, NOW() - INTERVAL '2 days'),
    ('#12346', 'Maria Oliveira', '03/02/2026', 129.50, 'Enviado', '[{"id": 5, "name": "Nike Air Max", "price": 129.50, "quantity": 1}]'::jsonb, NOW() - INTERVAL '3 days'),
    ('#12347', 'Pedro Santos', '03/02/2026', 850.00, 'Processando', '[{"id": 2, "name": "Nike Dunk High", "price": 850.00, "quantity": 1}]'::jsonb, NOW() - INTERVAL '3 days'),
    ('#12348', 'Ana Costa', '02/02/2026', 249.90, 'Cancelado', '[{"id": 3, "name": "Sapatênis", "price": 249.90, "quantity": 1}]'::jsonb, NOW() - INTERVAL '4 days'),
    ('#12349', 'Carlos Pereira', '01/02/2026', 59.90, 'Entregue', '[{"id": 4, "name": "Bone", "price": 59.90, "quantity": 1}]'::jsonb, NOW() - INTERVAL '5 days')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.users (id, name, email, password, role, status, provider, created_at)
VALUES
    ('user-1', 'João da Silva', 'joao@email.com', '123456', 'Cliente', 'Ativo', 'email', NOW()),
    ('user-2', 'Maria Oliveira', 'maria@email.com', '123456', 'Cliente', 'Inativo', 'email', NOW())
ON CONFLICT (email) DO NOTHING;
