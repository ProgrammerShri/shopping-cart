import { Button, Card } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";

type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

export function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();

  console.log("DDD", getItemQuantity);
  const quantity = getItemQuantity(id);

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={imgUrl || "https://via.placeholder.com/200"}
        height="200px"
        width="200px"
        style={{
          objectFit: "cover",
        }}
      />
      <Card.Body className="d-flex justify-content-between align-items-baseline mb-2">
        <Card.Title>{name}</Card.Title>
        <Card.Text>{formatCurrency(price)}</Card.Text>
      </Card.Body>
      <div className="mt-auto p-2">
        {quantity === 0 ? (
          <Button
            className="btn btn-primary w-100"
            onClick={() => increaseCartQuantity(id)}
          >
            Add to Cart
          </Button>
        ) : (
          <div
            className="d-flex align-items-center flex-column"
            style={{
              gap: "1rem",
            }}
          >
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                gap: "1rem",
              }}
            >
              <Button
                variant="outline-primary"
                onClick={() => decreaseCartQuantity(id)}
              >
                -
              </Button>
              <span>{quantity}</span>
              <Button
                variant="outline-primary"
                onClick={() => increaseCartQuantity(id)}
              >
                +
              </Button>
            </div>
            <Button
              className="btn btn-danger"
              size="sm"
              onClick={() => removeFromCart(id)}
            >
              Remove
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
