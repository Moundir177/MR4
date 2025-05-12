'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { 
  CreditCardIcon, 
  TrashIcon, 
  ShoppingCartIcon, 
  ArrowLeftIcon,
  LockClosedIcon,
  CheckCircleIcon
} from '@heroicons/react/24/solid';
import toast from 'react-hot-toast';

// Checkout page dictionary
const checkoutDictionary = {
  en: {
    title: 'Checkout',
    emptyCart: 'Your cart is empty',
    continueShopping: 'Continue shopping',
    orderSummary: 'Order Summary',
    subtotal: 'Subtotal',
    discount: 'Discount',
    total: 'Total',
    paymentDetails: 'Payment Details',
    cardholderName: 'Cardholder Name',
    cardNumber: 'Card Number',
    expiryDate: 'Expiry Date',
    cvc: 'CVC',
    saveCard: 'Save card for future payments',
    billingAddress: 'Billing Address',
    fullName: 'Full Name',
    email: 'Email Address',
    address: 'Address',
    city: 'City',
    state: 'State/Province',
    zipCode: 'ZIP/Postal Code',
    country: 'Country',
    completeOrder: 'Complete Order',
    removeItem: 'Remove',
    backToCourses: 'Back to courses',
    orderProcessed: 'Order processed successfully!',
    thankYou: 'Thank you for your purchase. You can now access your courses from your account.',
    goToAccount: 'Go to My Learning',
    checkout: 'Checkout',
    cartItems: 'Cart Items',
    item: 'Item',
    price: 'Price',
    tax: 'Tax',
    paymentMethod: 'Payment Method',
    creditCard: 'Credit Card',
    paypal: 'PayPal',
    bankTransfer: 'Bank Transfer',
    cvv: 'CVV',
    sameAsShipping: 'Same as shipping address',
    placeOrder: 'Place Order',
    orderDetails: 'Order Details',
    securePurchase: 'Secure Purchase',
    securePaymentMsg: 'Your payment information is secure. We use encryption to protect your data.',
    browseCoursesBtn: 'Browse Courses',
    promoCode: 'Promo Code',
    apply: 'Apply',
    courseBy: 'by',
    invalidPromo: 'Invalid promo code',
    successPromo: 'Promo code applied',
    subtotalBeforeDiscount: 'Subtotal before discount',
    processingPayment: 'Processing payment...',
    month: 'Month',
    year: 'Year',
    selectPayment: 'Select Payment Method',
    discountCode: 'Discount code',
    summary: 'Summary',
    payNow: 'Pay Now',
    taxIncluded: 'Tax included',
    back: 'Back',
  },
  fr: {
    title: 'Paiement',
    emptyCart: 'Votre panier est vide',
    continueShopping: 'Continuer vos achats',
    orderSummary: 'Résumé de la commande',
    subtotal: 'Sous-total',
    discount: 'Remise',
    total: 'Total',
    paymentDetails: 'Détails du paiement',
    cardholderName: 'Nom du titulaire',
    cardNumber: 'Numéro de carte',
    expiryDate: 'Date d\'expiration',
    cvc: 'CVC',
    saveCard: 'Enregistrer la carte pour les paiements futurs',
    billingAddress: 'Adresse de facturation',
    fullName: 'Nom complet',
    email: 'Adresse e-mail',
    address: 'Adresse',
    city: 'Ville',
    state: 'État/Province',
    zipCode: 'Code postal',
    country: 'Pays',
    completeOrder: 'Finaliser la commande',
    removeItem: 'Supprimer',
    backToCourses: 'Retour aux cours',
    orderProcessed: 'Commande traitée avec succès!',
    thankYou: 'Merci pour votre achat. Vous pouvez maintenant accéder à vos cours depuis votre compte.',
    goToAccount: 'Aller à Mes Apprentissages',
    checkout: 'Paiement',
    cartItems: 'Articles du Panier',
    item: 'Article',
    price: 'Prix',
    tax: 'Taxe',
    paymentMethod: 'Méthode de Paiement',
    creditCard: 'Carte de Crédit',
    paypal: 'PayPal',
    bankTransfer: 'Virement Bancaire',
    cvv: 'CVV',
    sameAsShipping: 'Identique à l\'adresse de livraison',
    placeOrder: 'Passer la Commande',
    orderDetails: 'Détails de la Commande',
    securePurchase: 'Achat Sécurisé',
    securePaymentMsg: 'Vos informations de paiement sont sécurisées. Nous utilisons le cryptage pour protéger vos données.',
    browseCoursesBtn: 'Parcourir les Cours',
    promoCode: 'Code Promo',
    apply: 'Appliquer',
    courseBy: 'par',
    invalidPromo: 'Code promo invalide',
    successPromo: 'Code promo appliqué',
    subtotalBeforeDiscount: 'Sous-total avant remise',
    processingPayment: 'Traitement du paiement...',
    month: 'Mois',
    year: 'Année',
    selectPayment: 'Sélectionner une Méthode de Paiement',
    discountCode: 'Code de réduction',
    summary: 'Résumé',
    payNow: 'Payer Maintenant',
    taxIncluded: 'Taxe incluse',
    back: 'Retour',
  },
  ar: {
    title: 'الدفع',
    emptyCart: 'سلة التسوق فارغة',
    continueShopping: 'مواصلة التسوق',
    orderSummary: 'ملخص الطلب',
    subtotal: 'المجموع الفرعي',
    discount: 'الخصم',
    total: 'المجموع',
    paymentDetails: 'تفاصيل الدفع',
    cardholderName: 'اسم حامل البطاقة',
    cardNumber: 'رقم البطاقة',
    expiryDate: 'تاريخ الانتهاء',
    cvc: 'رمز التحقق',
    saveCard: 'حفظ البطاقة للمدفوعات المستقبلية',
    billingAddress: 'عنوان الفواتير',
    fullName: 'الاسم الكامل',
    email: 'البريد الإلكتروني',
    address: 'العنوان',
    city: 'المدينة',
    state: 'الولاية/المقاطعة',
    zipCode: 'الرمز البريدي',
    country: 'البلد',
    completeOrder: 'إتمام الطلب',
    removeItem: 'إزالة',
    backToCourses: 'العودة إلى الدورات',
    orderProcessed: 'تمت معالجة الطلب بنجاح!',
    thankYou: 'شكرا لك على الشراء. يمكنك الآن الوصول إلى دوراتك من حسابك.',
    goToAccount: 'الذهاب إلى التعلم الخاص بي',
    checkout: 'الدفع',
    cartItems: 'عناصر السلة',
    item: 'عنصر',
    price: 'السعر',
    tax: 'الضريبة',
    paymentMethod: 'طريقة الدفع',
    creditCard: 'بطاقة ائتمان',
    paypal: 'باي بال',
    bankTransfer: 'تحويل بنكي',
    cvv: 'رمز التحقق',
    sameAsShipping: 'نفس عنوان الشحن',
    placeOrder: 'إتمام الطلب',
    orderDetails: 'تفاصيل الطلب',
    securePurchase: 'شراء آمن',
    securePaymentMsg: 'معلومات الدفع الخاصة بك آمنة. نستخدم التشفير لحماية بياناتك.',
    browseCoursesBtn: 'تصفح الدورات',
    promoCode: 'رمز ترويجي',
    apply: 'تطبيق',
    courseBy: 'بواسطة',
    invalidPromo: 'رمز ترويجي غير صالح',
    successPromo: 'تم تطبيق الرمز الترويجي',
    subtotalBeforeDiscount: 'المجموع الفرعي قبل الخصم',
    processingPayment: 'جاري معالجة الدفع...',
    month: 'الشهر',
    year: 'السنة',
    selectPayment: 'اختر طريقة الدفع',
    discountCode: 'رمز الخصم',
    summary: 'الملخص',
    payNow: 'ادفع الآن',
    taxIncluded: 'شامل الضريبة',
    back: 'رجوع',
  },
};

export default function CheckoutPage() {
  // Get locale from pathname
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  
  const dictionary = checkoutDictionary[locale as keyof typeof checkoutDictionary] || checkoutDictionary.en;
  
  // Get cart state
  const { cartItems, removeFromCart, getCartTotal, clearCart } = useCart();
  
  // Form state
  const [formState, setFormState] = useState({
    cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    saveCard: false,
    fullName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });
  
  // Order success state
  const [orderSuccess, setOrderSuccess] = useState(false);
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormState({
      ...formState,
      [name]: type === 'checkbox' ? checked : value,
    });
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically process the payment
    // For this demo, we'll just simulate a successful order
    
    // Show loading toast
    const loadingToast = toast.loading('Processing your order...');
    
    // Simulate API delay
    setTimeout(() => {
      toast.dismiss(loadingToast);
      toast.success('Order processed successfully!');
      clearCart();
      setOrderSuccess(true);
    }, 2000);
  };
  
  // If cart is empty and no successful order, show empty cart message
  if (cartItems.length === 0 && !orderSuccess) {
    return (
      <main className="min-h-screen bg-neutral-50 pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <Link 
              href={`/${locale}/courses`}
              className="inline-flex items-center text-gray-500 hover:text-gray-700 mb-8"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-1" />
              <span>{dictionary.backToCourses}</span>
            </Link>
            
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <ShoppingCartIcon className="h-8 w-8 text-gray-400" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-3">{dictionary.emptyCart}</h1>
              <p className="text-gray-600 mb-6">
                {dictionary.continueShopping}
              </p>
              <Link
                href={`/${locale}/courses`}
                className="inline-flex items-center justify-center px-4 py-2 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors"
              >
                {dictionary.backToCourses}
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }
  
  // If order was successful, show success page
  if (orderSuccess) {
    return (
      <main className="min-h-screen bg-neutral-50 pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <div className="inline-flex justify-center items-center w-20 h-20 rounded-full bg-green-100 mb-6">
                <svg className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-3">{dictionary.orderProcessed}</h1>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                {dictionary.thankYou}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={`/${locale}/my-learning`}
                  className="inline-flex items-center justify-center px-4 py-2 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors"
                >
                  {dictionary.goToAccount}
                </Link>
                <Link
                  href={`/${locale}/courses`}
                  className="inline-flex items-center justify-center px-4 py-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium rounded-lg transition-colors"
                >
                  {dictionary.backToCourses}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
  
  return (
    <main className="min-h-screen bg-neutral-50 pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Link 
            href={`/${locale}/courses`}
            className="inline-flex items-center text-gray-500 hover:text-gray-700 mb-8"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            <span>{dictionary.backToCourses}</span>
          </Link>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-8">{dictionary.checkout}</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit}>
                {/* Payment Details */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    {dictionary.paymentDetails}
                  </h2>
                  
                  <div className="grid grid-cols-1 gap-4 mb-4">
                    <div>
                      <label htmlFor="cardholderName" className="block text-sm font-medium text-gray-700 mb-1">
                        {dictionary.cardholderName}
                      </label>
                      <input
                        type="text"
                        id="cardholderName"
                        name="cardholderName"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        value={formState.cardholderName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        {dictionary.cardNumber}
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent pl-10"
                          value={formState.cardNumber}
                          onChange={handleInputChange}
                          required
                          placeholder="•••• •••• •••• ••••"
                        />
                        <CreditCardIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                          {dictionary.expiryDate}
                        </label>
                        <input
                          type="text"
                          id="expiryDate"
                          name="expiryDate"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          value={formState.expiryDate}
                          onChange={handleInputChange}
                          required
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 mb-1">
                          {dictionary.cvc}
                        </label>
                        <input
                          type="text"
                          id="cvc"
                          name="cvc"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          value={formState.cvc}
                          onChange={handleInputChange}
                          required
                          placeholder="•••"
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="saveCard"
                        name="saveCard"
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                        checked={formState.saveCard}
                        onChange={handleInputChange}
                      />
                      <label htmlFor="saveCard" className="ml-2 block text-sm text-gray-700">
                        {dictionary.saveCard}
                      </label>
                    </div>
                  </div>
                </div>
                
                {/* Billing Address */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    {dictionary.billingAddress}
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                        {dictionary.fullName}
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        value={formState.fullName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        {dictionary.email}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        value={formState.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        {dictionary.address}
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        value={formState.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                        {dictionary.city}
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        value={formState.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                        {dictionary.state}
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        value={formState.state}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                        {dictionary.zipCode}
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        value={formState.zipCode}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                        {dictionary.country}
                      </label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        value={formState.country}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div className="lg:hidden mt-8 mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    {dictionary.orderSummary}
                  </h2>
                  
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                      {cartItems.map(item => (
                        <div key={item.id} className="flex items-start py-3">
                          <div className="relative h-16 w-16 flex-shrink-0 bg-gray-100 rounded">
                            {item.thumbnail && (
                              <Image
                                src={item.thumbnail}
                                alt={item.title}
                                fill
                                className="object-cover rounded"
                              />
                            )}
                          </div>
                          
                          <div className="ml-4 flex-1">
                            <div className="flex justify-between">
                              <h3 className="text-sm font-medium text-gray-800">{item.title}</h3>
                              <button
                                type="button"
                                onClick={() => removeFromCart(item.id)}
                                className="text-gray-400 hover:text-red-500"
                              >
                                <TrashIcon className="h-4 w-4" />
                              </button>
                            </div>
                            <div className="mt-1 text-sm font-medium text-gray-800">
                              ${item.price.toFixed(2)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="p-6">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">{dictionary.subtotal}</span>
                        <span className="font-medium text-gray-800">${getCartTotal().toFixed(2)}</span>
                      </div>
                      
                      <div className="border-t border-gray-100 my-4"></div>
                      
                      <div className="flex justify-between mb-6">
                        <span className="font-medium text-gray-800">{dictionary.total}</span>
                        <span className="font-bold text-gray-800">${getCartTotal().toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors"
                >
                  {dictionary.completeOrder}
                </button>
              </form>
            </div>
            
            {/* Order Summary (desktop) */}
            <div className="hidden lg:block">
              <div className="sticky top-28">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  {dictionary.orderSummary}
                </h2>
                
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex items-start py-3">
                        <div className="relative h-16 w-16 flex-shrink-0 bg-gray-100 rounded">
                          {item.thumbnail && (
                            <Image
                              src={item.thumbnail}
                              alt={item.title}
                              fill
                              className="object-cover rounded"
                            />
                          )}
                        </div>
                        
                        <div className="ml-4 flex-1">
                          <div className="flex justify-between">
                            <h3 className="text-sm font-medium text-gray-800">{item.title}</h3>
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.id)}
                              className="text-gray-400 hover:text-red-500"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="mt-1 text-sm font-medium text-gray-800">
                            ${item.price.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">{dictionary.subtotal}</span>
                      <span className="font-medium text-gray-800">${getCartTotal().toFixed(2)}</span>
                    </div>
                    
                    <div className="border-t border-gray-100 my-4"></div>
                    
                    <div className="flex justify-between mb-6">
                      <span className="font-medium text-gray-800">{dictionary.total}</span>
                      <span className="font-bold text-gray-800">${getCartTotal().toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 