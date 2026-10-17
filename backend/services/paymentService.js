exports.processPaymentCheckout = async (req, res) => {
  // Xử lý cổng thanh toán (Tiền mặt, Bank Tranfer, Stripe,...)
  if (paymentMethod === "STRIPE") {
    // có thể tích hợp SDK stripe tại đây
    return { status: "COMPLETED", transactionId: `STRIPE_${Date.now()}` };
  }
  return { status: "COMPLETED", transactionId: `CASH_${Date.now()}` };
};
