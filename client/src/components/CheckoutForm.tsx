import { useState } from "react";
import { ArrowLeft, Clock, User, Phone, MessageSquare, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/lib/cart-context";
import { useToast } from "@/hooks/use-toast";

interface CheckoutFormProps {
  onBack: () => void;
  onOrderComplete: (orderNumber: string) => void;
}

const generatePickupTimes = () => {
  const times: string[] = [];
  const now = new Date();
  const startHour = now.getHours();
  const startMinute = Math.ceil(now.getMinutes() / 15) * 15 + 15;

  for (let i = 0; i < 12; i++) {
    const time = new Date();
    time.setHours(startHour);
    time.setMinutes(startMinute + i * 15);
    
    if (time.getHours() >= 22) break;
    
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes.toString().padStart(2, "0");
    times.push(`${displayHours}:${displayMinutes} ${ampm}`);
  }
  
  return times.length > 0 ? times : ["15 minutes", "30 minutes", "45 minutes"];
};

export default function CheckoutForm({ onBack, onOrderComplete }: CheckoutFormProps) {
  const { items, subtotal, tax, total, clearCart } = useCart();
  const { toast } = useToast();
  
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pickupTimes = generatePickupTimes();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast({ title: "Please enter your name", variant: "destructive" });
      return;
    }
    if (!phone.trim()) {
      toast({ title: "Please enter your phone number", variant: "destructive" });
      return;
    }
    if (!pickupTime) {
      toast({ title: "Please select a pickup time", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    
    // todo: remove mock functionality - replace with real order submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    const orderNumber = `BH${Date.now().toString().slice(-6)}`;
    clearCart();
    onOrderComplete(orderNumber);
  };

  const formatCustomization = (item: typeof items[0]) => {
    const parts = [];
    parts.push(item.customization.size);
    if (item.customization.milk !== "none") {
      parts.push(item.customization.milk + " milk");
    }
    return parts.join(", ");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-40 bg-background border-b">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <Button
            variant="ghost"
            onClick={onBack}
            className="flex items-center gap-2"
            data-testid="button-back-to-menu"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Menu
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-8">
        <h1 className="font-serif text-3xl font-bold mb-8" data-testid="text-checkout-title">
          Checkout
        </h1>

        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Your Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    data-testid="input-checkout-name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      placeholder="(555) 123-4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pl-10"
                      data-testid="input-checkout-phone"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Pickup Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={pickupTime} onValueChange={setPickupTime}>
                  <SelectTrigger data-testid="select-pickup-time">
                    <SelectValue placeholder="Select pickup time" />
                  </SelectTrigger>
                  <SelectContent>
                    {pickupTimes.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Special Instructions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Any special requests or allergies we should know about?"
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  rows={3}
                  data-testid="textarea-special-instructions"
                />
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between gap-2">
                      <div>
                        <p className="font-medium text-sm">
                          {item.quantity}x {item.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatCustomization(item)}
                        </p>
                      </div>
                      <span className="text-sm whitespace-nowrap">
                        ${item.totalPrice.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span data-testid="text-checkout-total">${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleSubmit}
                  disabled={isSubmitting || items.length === 0}
                  data-testid="button-place-order"
                >
                  {isSubmitting ? (
                    "Placing Order..."
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Place Order
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
