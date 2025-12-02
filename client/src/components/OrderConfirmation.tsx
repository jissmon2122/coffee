import { CheckCircle, Clock, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface OrderConfirmationProps {
  orderNumber: string;
  pickupTime?: string;
  onViewMenu: () => void;
  onOrderAgain: () => void;
}

export default function OrderConfirmation({
  orderNumber,
  pickupTime,
  onViewMenu,
  onOrderAgain,
}: OrderConfirmationProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardContent className="pt-8 pb-6 text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>

          <h1 
            className="font-serif text-2xl font-bold mb-2"
            data-testid="text-confirmation-title"
          >
            Order Confirmed!
          </h1>
          <p className="text-muted-foreground mb-6">
            Your order has been received and is being prepared. A confirmation email has been sent to your inbox.
          </p>

          <div className="bg-muted rounded-lg p-4 mb-6">
            <p className="text-sm text-muted-foreground mb-1">Order Number</p>
            <p 
              className="text-2xl font-bold font-mono tracking-wider"
              data-testid="text-order-number"
            >
              {orderNumber}
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-8">
            <Clock className="w-5 h-5" />
            <span data-testid="text-pickup-time">
              {pickupTime ? `Ready by ${pickupTime}` : "Ready in 15-20 minutes"}
            </span>
          </div>

          <div className="space-y-3">
            <Button
              className="w-full"
              size="lg"
              onClick={onOrderAgain}
              data-testid="button-order-again"
            >
              <Coffee className="w-4 h-4 mr-2" />
              Order Again
            </Button>
            <Button
              variant="outline"
              className="w-full"
              size="lg"
              onClick={onViewMenu}
              data-testid="button-view-menu"
            >
              Back to Menu
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
