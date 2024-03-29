import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import CartContext from "../../contexts/CartContext";
import PurchaseContext from "../../contexts/PurchaseContext";
import {
  ContainerCart,
  MainCart,
  Title,
  CartProducts,
  CheckoutMenu,
  Total,
  CheckoutButton,
  Empty,
} from "./ContainerCart";
import ItemCart from "./ItemCart";
import PurchaseItem from "./PurchaseItem";

export default function Cart() {
  const [total, setTotal] = useState(0);
  const { cart } = useContext(CartContext);
  const { purchase } = useContext(PurchaseContext);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    let totalValue = 0;
    cart?.forEach((item) => {
      setTotal(totalValue + item.value * item.quantity);
      totalValue += item.value * item.quantity;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);
  if (!cart || cart.every((item) => item.quantity === 0))
    return (
      <Empty>
        <span>Carrinho vazio</span>
      </Empty>
    );
  return (
    <ContainerCart>
      <MainCart>
        <Title>Meu carrinho</Title>
        <CartProducts>
          <thead>
            <tr>
              <th className="product-th">produto</th>
              <th className="qtd-th">qtd.</th>
              <th className="price-th">valor</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <ItemCart key={item.code} item={item} index={index} />
            ))}
          </tbody>
        </CartProducts>

        <Title>Meus produtos</Title>
        <CartProducts>
          <thead>
            <tr>
              <th className="product-th">produto</th>
              <th className="qtd-th">qtd.</th>
              <th>avaliação</th>
            </tr>
          </thead>
          <tbody>
            {purchase.map((item, index) => (
              <PurchaseItem key={index} item={item} index={index} />
            ))}
          </tbody>
        </CartProducts>
      </MainCart>
      <CheckoutMenu>
        <Title>Informações do pedido</Title>
        <Total>
          <span>Total</span>
          <span>
            {Number(total).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
        </Total>
        <Link to="/checkout/payment" className="checkout-button">
          <CheckoutButton>continuar</CheckoutButton>
        </Link>
      </CheckoutMenu>
    </ContainerCart>
  );
}
