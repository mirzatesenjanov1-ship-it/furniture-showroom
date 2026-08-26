export interface FurnitureOrderData {
  title: string;
  price: number | string;
  dimensions: string;
  material: string;
  slug: string;
  currency?: string;
}

export const generateWhatsAppLink = (
  whatsappNumber: string,
  furniture: FurnitureOrderData
): string => {
  const cleanNumber = (whatsappNumber || '996706035765').replace(/[^0-9]/g, '');
  const productUrl = `${window.location.origin}/furniture/${furniture.slug}`;

  const message = `Саламатсызбы!
Мен бул мебельге кызыгып жатам.

Мебель: ${furniture.title}
Баасы: ${furniture.price} ${furniture.currency || 'сом'}
Өлчөмү: ${furniture.dimensions}
Материалы: ${furniture.material}

Сайттагы товар:
${productUrl}

Ушул мебель боюнча толук маалымат бересизби?`;

  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
};

export const generateCustomRequestLink = (
  whatsappNumber: string,
  type: string,
  dimensions: string,
  material: string,
  budget: string,
  comment: string
): string => {
  const cleanNumber = (whatsappNumber || '996706035765').replace(/[^0-9]/g, '');

  const message = `Саламатсызбы! Өз өлчөмүм боюнча мебель жасатууга буйрутма бергим келет.

Мебель түрү: ${type}
Өлчөмдөрү (УхТхБ): ${dimensions}
Каалаган материал: ${material}
Божомолдуу бюджет: ${budget}
Кошумча каалоолор: ${comment}

Сураныч, баасын эсептеп берсеңиздер!`;

  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
};
