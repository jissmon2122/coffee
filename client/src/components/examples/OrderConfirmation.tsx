import OrderConfirmation from "../OrderConfirmation";

export default function OrderConfirmationExample() {
  return (
    <OrderConfirmation
      orderNumber="BH847291"
      pickupTime="Ready by 2:30 PM"
      onViewMenu={() => console.log("View menu clicked")}
      onOrderAgain={() => console.log("Order again clicked")}
    />
  );
}
