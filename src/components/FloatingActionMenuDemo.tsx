import FloatingActionMenu from "@/src/components/ui/floating-action-menu"
import { ShoppingBag, Wallet, History, LifeBuoy } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const FloatingActionMenuDemo = () => {
    const navigate = useNavigate();

    return (
          <FloatingActionMenu
          className="fixed bottom-8 right-8"
          options={[
            {
              label: "Order Now",
              Icon: <ShoppingBag className="w-4 h-4" />,
              onClick: () => navigate("/menu"),
            },
            {
              label: "Wallet",
              Icon: <Wallet className="w-4 h-4" />,
              onClick: () => navigate("/student-dashboard"),
            },
            {
              label: "History",
              Icon: <History className="w-4 h-4" />,
              onClick: () => navigate("/student-dashboard"),
            },
            {
              label: "Support",
              Icon: <LifeBuoy className="w-4 h-4" />,
              onClick: () => window.open("https://paruluniversity.ac.in/", "_blank"),
            },
          ]}
        />
    )
}
