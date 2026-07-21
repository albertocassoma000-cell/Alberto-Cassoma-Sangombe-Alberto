export function getFoodImage(id: string, category: string = "Outro"): string {
  const images: Record<string, string> = {
    banana: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&q=80&w=600",
    maca: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&q=80&w=600",
    funge_bombo: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=600",
    kizaka: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&q=80&w=600",
    mandioca: "https://images.unsplash.com/photo-1590005354167-6da97870c913?auto=format&fit=crop&q=80&w=600",
    frango: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?auto=format&fit=crop&q=80&w=600",
    carapau: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?auto=format&fit=crop&q=80&w=600",
    arroz_integral: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=600",
    leite_desnatado: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=600",
    mufete_peixe: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=600",
    calulu_peixe: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&q=80&w=600",
    
    // Additional Fruits and World Foods
    abacate: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&q=80&w=600",
    manga: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=600",
    mamao: "https://images.unsplash.com/photo-1610832958506-ee5633619144?auto=format&fit=crop&q=80&w=600",
    ananas: "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?auto=format&fit=crop&q=80&w=600",
    goiaba: "https://images.unsplash.com/photo-1534482421-64566f976cfa?auto=format&fit=crop&q=80&w=600",
    morango: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&q=80&w=600",
    laranja: "https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&q=80&w=600",
    salmao: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=600",
    brocolis: "https://images.unsplash.com/photo-1583623025817-d180a2221d0a?auto=format&fit=crop&q=80&w=600",
    aveia: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&q=80&w=600",
    ovo: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&q=80&w=600",
    azeite: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=600",
    maracuja: "https://images.unsplash.com/photo-1589883661923-6476cb0ae9f2?auto=format&fit=crop&q=80&w=600",
    kiwi: "https://images.unsplash.com/photo-1585059895524-72359e061381?auto=format&fit=crop&q=80&w=600",
    melancia: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=600",
    quinoa: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&q=80&w=600",
    amendoim: "https://images.unsplash.com/photo-1568254183919-78a4f43a2877?auto=format&fit=crop&q=80&w=600",
    espinafre: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=600",
    iogurte: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=600",
    atum: "https://images.unsplash.com/photo-1501595091296-3a9f4ccf53b4?auto=format&fit=crop&q=80&w=600",
    mel: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=600",
    amendoa: "https://images.unsplash.com/photo-1508061253366-f7da158b6d4f?auto=format&fit=crop&q=80&w=600",
    milho: "https://images.unsplash.com/photo-1551754625-70c90487230d?auto=format&fit=crop&q=80&w=600",
    cereja: "https://images.unsplash.com/photo-1528821122024-e43a5b035ee4?auto=format&fit=crop&q=80&w=600"
  };

  const cleanId = id.toLowerCase().trim();
  if (images[cleanId]) {
    return images[cleanId];
  }

  // Look for sub-word matching (e.g. if id contains "banana")
  for (const key of Object.keys(images)) {
    if (cleanId.includes(key) || key.includes(cleanId)) {
      return images[key];
    }
  }

  // Fallbacks by category
  const categoryImages: Record<string, string> = {
    Fruta: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?auto=format&fit=crop&q=80&w=600",
    Legume: "https://images.unsplash.com/photo-1566385101042-1a010c129fae?auto=format&fit=crop&q=80&w=600",
    Verdura: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=600",
    Carne: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&q=80&w=600",
    Peixe: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=600",
    Cereal: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=600",
    Bebida: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=600",
    Angolano: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=600",
    Outro: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600"
  };

  return categoryImages[category] || categoryImages.Outro;
}
